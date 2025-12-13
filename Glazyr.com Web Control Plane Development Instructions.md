# Glazyr.com Web Control Plane Development Instructions

This document is the practical development guide for the **Glazyr Web Control Plane** (the `glazyr-main` Next.js app in this repo).

The Web Control Plane is **Mission Control**:
- Configure agent behavior and safety boundaries.
- Review high-level outcomes (summaries only).
- Provide a prominent **Emergency Stop**.

It is **not** the “cockpit”:
- No chat UI.
- No execution environment.
- No screenshots/traces/reasoning display.

---

## 1. Project scope and architecture

### 1.1 Technology stack (as implemented in this repo)

- **Framework**: Next.js `16.0.10` (App Router)
- **UI**: React `19.2.0`
- **Language**: TypeScript `^5`
- **Styling**: Tailwind CSS `^4.1.9` (+ `tailwindcss-animate`)
- **UI primitives**: Radix UI + shadcn-style components in `components/ui/`

### 1.2 Separation of responsibility (safety-critical)

- **Web Control Plane (this repo)**: Auth entry (demo/guest today), configuration UI, safety boundaries, task summaries, emergency stop.
- **Browser Extension (`glazyr-chrome-extension`)**: sensing/acting (clicks/typing), permissions, heartbeat, cockpit UI.
- **Orchestrator/Runtime**: execution + safety enforcement + tool gateway.

**Rule:** the Web Control Plane stores **intent** and displays **outcomes**. Enforcement and action stay outside the UI.

### 1.3 Routes (App Router)

Public routes live under `app/`:
- `/` → `app/page.tsx`
- `/how-it-works` → `app/how-it-works/page.tsx`
- `/privacy-security` → `app/privacy-security/page.tsx`
- `/install-extension` → `app/install-extension/page.tsx`
- `/login` → `app/login/page.tsx`

Dashboard routes live under `app/dashboard/`:
- `/dashboard` → `app/dashboard/page.tsx`
- `/dashboard/agent-modes` → `app/dashboard/agent-modes/page.tsx`
- `/dashboard/safety-permissions` → `app/dashboard/safety-permissions/page.tsx` (**critical**)
- `/dashboard/task-history` → `app/dashboard/task-history/page.tsx`
- `/dashboard/extension-status` → `app/dashboard/extension-status/page.tsx`
- `/dashboard/account` → `app/dashboard/account/page.tsx`

---

## 2. Development environment setup

### 2.1 Prerequisites

- **Node.js**: 20+
- **npm** (or pnpm)

### 2.2 Local setup

Install and run:

```bash
npm install
npm run dev
```

Then open:
- `http://localhost:3000/`
- `http://localhost:3000/dashboard` (includes **guest mode**)

---

## 3. Current state (what is placeholder today)

This app intentionally has **no Next.js API routes** in this repo (there are no `app/**/route.ts` files).

Today, the Control Plane uses `localStorage` as a demo persistence layer:

- **Config**: key `glazyr-control-plane-config`
  - Used by `app/dashboard/page.tsx`, `app/dashboard/safety-permissions/page.tsx`, and other dashboard pages via `hooks/use-local-storage-state.ts`.
- **Extension status** (placeholder monitoring): key `glazyr-extension-status`
- **Task summaries**: key `glazyr-task-summaries`
- **Theme**: key `glazyr-theme` via `hooks/use-theme.ts`

The main persistence hook is:
- `hooks/use-local-storage-state.ts`

Defaults and types live in:
- `lib/control-plane-defaults.ts`
- `lib/control-plane-types.ts`

---

## 4. Core development tasks

### 4.1 Replace localStorage with real APIs (primary next step)

Expected upstream services (owned by Orchestrator/Runtime team):
- **Auth service**: session + identity
- **Config API**: read/write `ControlPlaneConfig`
- **Task Summary API**: list recent `TaskSummary` items
- **Extension Status API**: read-only heartbeat/permissions status

Implementation guidance for this repo:
- Create a small API client layer (e.g. `lib/api/*`) that wraps `fetch` and centralizes:
  - base URL / headers / credentials
  - error handling and retry policy
  - response validation (Zod is already a dependency)
- Replace direct `useLocalStorageState(...)` usage for config/status/history with a single “store” abstraction:
  - **Local adapter** (current behavior) for demo/guest mode
  - **Remote adapter** (API-backed) for authenticated mode
- Keep the UI safety posture:
  - Any write to Config API must be validated and conservative (never silently expand permissions).

### 4.2 Safety & permissions page (non-negotiable)

The `/dashboard/safety-permissions` route (`app/dashboard/safety-permissions/page.tsx`) must remain the primary surface for:
- Allowed domains
- Disallowed actions
- Human-in-the-loop threshold
- Runtime + action budgets

**Important:** the UI stores policy; enforcement must be implemented in the orchestrator/extension.

### 4.3 Emergency stop

The “Emergency stop” in `app/dashboard/page.tsx` is currently a local kill-switch toggle.

When wiring to a runtime:
- Add a dedicated, high-priority endpoint (e.g. `POST /killswitch/engage`) designed for immediate effect.
- Treat it as irreversible in the short term (resume should be an explicit, audited action).

---

## 5. Deployment (Amazon S3)

### 5.1 Static export to S3 (works for this repo today)

Because this repo currently contains only static App Router pages and client-side behavior (no server route handlers), it can be deployed as a static export, with the Control Plane calling external APIs from the browser.

Recommended configuration:
- In `next.config.mjs`:
  - set `output: 'export'`
  - set `trailingSlash: true` (simplifies S3 static hosting for nested routes)

Build/export:

```bash
npm run build
```

Upload the generated output directory to S3 and serve via S3 static website hosting (ideally behind CloudFront).

### 5.2 When you need serverless/SSR

If you later add any of the following, static export may no longer be sufficient:
- Next.js route handlers (`app/**/route.ts`)
- server-side auth/session enforcement
- server-only integrations that must not run in the browser

In that case, deploy to a platform that supports Next.js SSR/server functions (e.g. Vercel, AWS Amplify, or Lambda@Edge/CloudFront setups).

---

## 6. Relationship with the Chrome extension

The Web Control Plane and the extension should remain separate:
- The extension provides sensing/acting and real-time cockpit UX.
- This web app provides configuration, monitoring summaries, and safety controls.

Development tasks:
- Keep `/install-extension` up to date with install instructions and the extension repo reference.
- Implement “Extension status” in the dashboard as **monitoring only** (no action controls), wired to the status API when available.
