# Glazyr — Web Control Plane (Mission Control, not the cockpit)

Glazyr is building a **safety-first automation stack** where the UI stays calm and the execution stays contained.

This app is the **control plane**: a control surface to **authenticate (dev cookie session for now)**, **configure agent behavior**, **define safety boundaries**, and **monitor status + outcomes**.

## What this web app *is*

- **Configuration**: agent mode (Observe / Assist / Automate), budgets, allowed domains, disallowed actions
- **Trust + safety**: human-in-the-loop thresholds and an **emergency stop**
- **Outcomes**: task summaries and status — **no screenshots, no traces**
- **Extension status**: connection/permissions/heartbeat + **policy enforcement signals** (reported by the extension)

## What this web app is *not* (by design)

- **No chat UI**
- **No freeform “tell the agent what to do”**
- **No automation execution**
- **No chain-of-thought / reasoning display**
- **No direct MCP calls**

If it feels interactive like a cockpit, it’s probably wrong.

## Architecture (separation of responsibility)

- **Control plane (this app)**: config + monitoring
- **Extension (`../glazyr-extension/`)**: local execution + local policy enforcement
- **MCP runtime (`glazyr-control`)**: MCP tools + task orchestration (LangChain Assistant MCP runtime)
- **Vision runtime (`../runtime-aws/`)**: vision-first pipeline (OCR/vision endpoints; receives derived text, not raw UI by default)

![Glazyr architecture](assets/architecture.png)

### Control plane ↔ MCP runtime wiring (proxy routes)

The control plane talks to `glazyr-control` **server-side** via proxy routes (microservice-friendly, keeps keys off the client).

**Required server environment variables (Next.js server runtime only):**

- `GLAZYR_CONTROL_RUNTIME_URL`: base URL of the hosted `glazyr-control` service (no trailing slash)
- `GLAZYR_CONTROL_RUNTIME_API_KEY` (optional): upstream key if `glazyr-control` auth is enabled

**Proxy API routes (implemented in `app/api/runtime/**`):**

- `GET /api/runtime/mcp/manifest` → `{RUNTIME}/mcp/manifest`
- `POST /api/runtime/mcp/invoke` → `{RUNTIME}/mcp/invoke`
- `GET /api/runtime/tasks?limit=` → `{RUNTIME}/api/tasks`
- `GET /api/runtime/tasks/[taskId]` → `{RUNTIME}/api/tasks/{task_id}`

**Client helper:**

- `lib/api/runtime.ts` (calls `GLAZYR_API_ROUTES.runtimeTasks`, etc.)

### Flow chart (control module)

```mermaid
flowchart LR
  subgraph CP[glazyr-main (Control Plane)]
    UI[Dashboard UI]
    Proxy[Next.js API proxy<br/>/api/runtime/**]
  end

  subgraph EXT[glazyr-extension]
    Widget[Extension widget]
  end

  subgraph MCP[glazyr-control (MCP runtime)]
    MCPManifest[GET /mcp/manifest]
    MCPInvoke[POST /mcp/invoke]
    Tasks[GET /api/tasks<br/>GET /api/tasks/:id]
  end

  subgraph VISION[runtime-aws (vision)]
    Vision[POST /runtime/vision/analyze]
  end

  UI --> Proxy --> MCP
  Widget --> MCP
  Widget --> Vision
  Vision -. derived text .-> MCP
```

## Product shape (routes)

- **Public**
  - `/` Home
  - `/about`
  - `/docs`
  - `/how-it-works`
  - `/status`
  - `/market`
  - `/investors`
  - `/privacy-security`
  - `/privacy-policy` (Chrome extension privacy policy URL)
  - `/install-extension`
  - `/login`
- **Dashboard**
  - `/dashboard` Overview (mode, extension status, last task summary, **emergency stop**)
  - `/dashboard/agent-modes`
  - `/dashboard/safety-permissions` (**critical**)
  - `/dashboard/task-history` (summaries only + runtime task list via `/api/runtime/tasks`)
  - `/dashboard/extension-status`
  - `/dashboard/account`

## Quickstart

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/` (home)
- `http://localhost:3000/dashboard` (dashboard — includes **guest mode**)

## Deploy

### Vercel

This app can be deployed to Vercel to get a shareable HTTPS URL.

- Import the GitHub repo in Vercel
- Use default Next.js settings
- Package manager: **npm** (recommended because `package-lock.json` is present)

> This repo includes route handlers under `app/api/**/route.ts`, so it must be deployed to a platform that supports Next.js server functions.

### AWS

Because this repo contains route handlers (`app/api/**/route.ts`), **static S3 export is not compatible**. Deploy using a Next.js server/SSR-capable platform (e.g., AWS Amplify Hosting, Vercel), or containerize and run behind ALB/CloudFront.

Build:

```bash
npm run build
```

Run:

```bash
npm run start
```

## Current state (important)

- **Auth**: dev cookie session endpoints at `/api/auth/*`
- **Config**: `/api/control-plane/config`
- **Task summaries**: `/api/tasks` (summaries only)
- **MCP runtime monitoring**: `/api/runtime/tasks` (proxy to `glazyr-control`)
- **Extension status**: `/api/extension/status` (heartbeat/permissions + enforcement signals like `policyEnforced`, `killSwitchEngaged`, etc.)
- **Emergency stop**: `/api/killswitch`

## Vision POC status

The vision-first “cockpit” experience (chat + framed screenshot OCR) currently lives in the **Chrome extension** and the **AWS runtime**:

- Extension framed screenshot capture → `POST /runtime/vision/ocr` (Google Vision OCR)
- OCR output is displayed in the extension widget chat

This web app intentionally remains “mission control” (config + monitoring), and does **not** display screenshots or run OCR itself.

## Non-negotiables

- The web control plane **never executes actions**.
- The web control plane **does not display** screenshots, internal traces, or model reasoning.
- Enforcement lives outside the UI: **runtime + extension**.
