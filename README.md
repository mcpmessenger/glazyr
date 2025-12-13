# Glazyr — Web Control Plane (Mission Control, not the cockpit)

Glazyr is building a **safety-first automation stack** where the UI stays calm and the execution stays contained.

This repo contains the **Glazyr Web Control Plane**: a control surface to **authenticate (dev cookie session for now)**, **configure agent behavior**, **define safety boundaries**, and **review outcomes**.

If you’re looking for a toy that runs wild: wrong project.  
If you’re looking for **cutting-edge automation that behaves like it belongs in production**: welcome.

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

![Glazyr architecture](assets/architecture.png)

## Product shape (routes)
- **Public**
  - `/` Home
  - `/how-it-works`
  - `/privacy-security`
  - `/privacy-policy` (Chrome extension privacy policy URL)
  - `/install-extension`
  - `/login`
- **Dashboard**
  - `/dashboard` Overview (mode, extension status, last task summary, **emergency stop**)
  - `/dashboard/agent-modes`
  - `/dashboard/safety-permissions` (**critical**)
  - `/dashboard/task-history` (summaries only)
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

## Deploy (fast URL: Vercel)

This repo can be deployed to Vercel immediately to get a shareable HTTPS URL.

- Import the GitHub repo in Vercel
- Use the default Next.js settings
- Package manager: **npm** (recommended here because `package-lock.json` is present)

Notes:
- This repo includes route handlers under `app/api/**/route.ts`, so it must be deployed to a platform that supports Next.js server functions.

## Deploy (AWS)

Because this repo contains route handlers (`app/api/**/route.ts`), **static S3 export is not compatible**. Deploy using a Next.js server/SSR-capable platform (e.g., Amplify/Vercel), or containerize and run behind ALB/CloudFront.

Build the static site:

```bash
npm run build
```

Upload the generated `out/` directory to an S3 bucket configured for static website hosting (ideally behind CloudFront).

## Current state (important)
- **Auth**: dev cookie session endpoints at `/api/auth/*`
- **Config**: `/api/control-plane/config`
- **Task summaries**: `/api/tasks` (summaries only)
- **Extension status**: `/api/extension/status` (heartbeat/permissions + enforcement signals like `policyEnforced`, `killSwitchEngaged`, etc.)
- **Emergency stop**: `/api/killswitch`

## Non-negotiables
- The web control plane **never executes actions**.
- The web control plane **does not display** screenshots, internal traces, or model reasoning.
- Enforcement lives outside the UI: **orchestrator + extension**.