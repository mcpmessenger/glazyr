# Glazyr — Web Control Plane (Mission Control, not the cockpit)

Glazyr is building a **safety-first automation stack** where the UI stays calm and the execution stays contained.

This repo contains the **Glazyr Web Control Plane**: a control surface to **authenticate (demo auth for now)**, **configure agent behavior**, **define safety boundaries**, and **review outcomes**.

If you’re looking for a toy that runs wild: wrong project.  
If you’re looking for **cutting-edge automation that behaves like it belongs in production**: welcome.

## What this web app *is*
- **Configuration**: agent mode (Observe / Assist / Automate), budgets, allowed domains, disallowed actions
- **Trust + safety**: human-in-the-loop thresholds and an **emergency stop**
- **Outcomes**: task summaries and status — **no screenshots, no traces**
- **Extension status**: connection/permissions/heartbeat (UI-only placeholder until wired to an API)

## What this web app is *not* (by design)
- **No chat UI**
- **No freeform “tell the agent what to do”**
- **No automation execution**
- **No chain-of-thought / reasoning display**
- **No direct MCP calls**

If it feels interactive like a cockpit, it’s probably wrong.

## Architecture (separation of responsibility)

```mermaid
flowchart LR
  subgraph Web [Web Control Plane (this repo)]
    Auth[Auth]
    Config[Config UI]
    Safety[Safety & permissions]
    History[Task summaries]
    Stop[Emergency stop]
  end

  subgraph Extension [Browser Extension]
    Sense[Sensing + acting]
    Heartbeat[Heartbeat + permissions]
  end

  subgraph Orchestrator [Orchestrator / Runtime]
    Exec[Execution + safety enforcement]
  end

  subgraph APIs [APIs]
    AuthAPI[Auth service]
    ConfigAPI[Config API]
    TaskAPI[Task summary API]
  end

  Web --> AuthAPI
  Web --> ConfigAPI
  Web --> TaskAPI
  Extension --> Heartbeat
  Extension --> Exec
```

## Product shape (routes)
- **Public**
  - `/` Home
  - `/how-it-works`
  - `/privacy-security`
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

## Current state (important)
- **Auth**: demo/local (supports **guest** and a simple “email/password” placeholder)
- **Config + status + task history**: stored in `localStorage` for now
- **Next step**: replace local storage with the real **Auth service**, **Config API**, and **Task summary API** (web talks only to these)

## Non-negotiables
- The web control plane **never executes actions**.
- The web control plane **does not display** screenshots, internal traces, or model reasoning.
- Enforcement lives outside the UI: **orchestrator + extension**.