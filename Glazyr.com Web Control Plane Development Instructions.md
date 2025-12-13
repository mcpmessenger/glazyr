# Glazyr.com Web Control Plane Development Instructions

This document provides comprehensive development instructions for the **Glazyr Web Control Plane** (the Glazyr.com website), based on the analysis of the `mcpmessenger/glazyr` repository and its architectural relationship with the `mcpmessenger/glazyr-chrome-extension`.

## 1. Project Scope and Architecture

The Glazyr Web Control Plane is explicitly defined as the **Mission Control** for the Glazyr ecosystem, not the cockpit. Its primary function is to provide a safety-first control surface for the agent, focusing on configuration, safety boundaries, and outcome review.

### 1.1. Technology Stack

The Glazyr Web Control Plane is a modern, full-stack web application built with the following technologies:

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js (v16.0.10) | React framework for server-side rendering, routing, and API routes. |
| **Language** | TypeScript (v5) | Type-safe JavaScript for improved code quality and maintainability. |
| **Styling** | Tailwind CSS (v4.1.9) | Utility-first CSS framework for rapid UI development. |
| **UI Components** | Radix UI / Shadcn/ui | Headless component library for accessible and customizable UI primitives. |
| **State/Data** | Next.js route handlers + in-memory dev store | The control plane persists config/status/tasks via `app/api/**/route.ts` (dev store today; replace with DB/KV for production). |

### 1.2. Separation of Responsibility

The architecture is strictly separated to ensure safety and stability. The Web Control Plane is designed to be a configuration and monitoring surface, **never** an execution environment.

| Component | Responsibility | Status Display |
| :--- | :--- | :--- |
| **Web Control Plane** (`glazyr`) | Authentication, Agent Configuration, Safety Boundaries, Task Summaries, Emergency Stop. | Calm UI, no real-time traces or screenshots. |
| **Browser Extension** (`glazyr-chrome-extension`) | Sensing (page context, screenshot), Acting (clicks, typing), Heartbeat, User Chat UI (the "cockpit"). | Interactive, real-time status (STT, Capture, Agent progress). |
| **Orchestrator/Runtime** | Execution, Safety Enforcement, Tool Gateway, API services. | Headless, provides structured data to the Web Control Plane APIs. |

### 1.3. Key Routes and Functionality

The application is divided into Public and Dashboard routes:

| Route Category | Example Routes | Core Functionality |
| :--- | :--- | :--- |
| **Public** | `/`, `/how-it-works`, `/privacy-security`, `/install-extension`, `/login` | Marketing, documentation, and authentication entry points. |
| **Dashboard** | `/dashboard`, `/dashboard/agent-modes`, `/dashboard/safety-permissions`, `/dashboard/task-history` | Configuration of agent behavior, setting safety thresholds, and reviewing task outcomes. **The `/dashboard/safety-permissions` route is critical.** |

## 2. Development Environment Setup

### 2.1. Prerequisites

Ensure you have the following installed:

1.  **Node.js**: Version 20 or higher (recommended by Next.js).
2.  **npm/pnpm**: The project uses `package-lock.json` and `pnpm-lock.yaml`, indicating both `npm` and `pnpm` are supported. `npm` is used in the quickstart.
3.  **Git**: For cloning the repository.

### 2.2. Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mcpmessenger/glazyr glazyr.com
    cd glazyr.com
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If using `pnpm`, run `pnpm install` instead.*

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the application:**
    The application will be available at `http://localhost:3000/`.
    The dashboard, which includes a **guest mode** for immediate access, is at `http://localhost:3000/dashboard`.

## 3. Core Development Tasks

The control plane is wired for API-backed persistence via Next.js route handlers (`app/api/**/route.ts`). For production, replace the in-memory dev store with a real persistence layer (DB/KV) and real auth.

### 3.1. API Integration (Next Steps)

The Web Control Plane must be wired to the following APIs, which are expected to be provided by the Orchestrator/Runtime team:

| API Service | Purpose | Current Implementation |
| :--- | :--- | :--- |
| **Auth service** | User authentication and session management. | Dev cookie session (`/api/auth/*`). |
| **Config API** | Read/write `ControlPlaneConfig` (modes, budgets, domains, etc.). | `/api/control-plane/config` |
| **Task Summary API** | Read/write `TaskSummary[]` (summaries only). | `/api/tasks` |
| **Extension Status API** | Read/write `ExtensionStatus` (heartbeat/permissions/enforcement). | `/api/extension/status` |
| **Kill switch API** | Engage/disengage emergency stop. | `/api/killswitch` |

**Development Instruction:**
1. Keep the web UI as “mission control” (config + summaries + stop), not execution.
2. Validate all writes conservatively (never silently expand permissions).
3. Treat the kill switch as safety-critical and high priority.

### 3.2. Safety and Permissions

The `/dashboard/safety-permissions` route is a **non-negotiable** critical component.

**Development Instruction:**
1.  Implement the UI for configuring safety boundaries, such as:
    *   Agent mode selection (Observe / Assist / Automate).
    *   Budget limits and human-in-the-loop thresholds.
    *   Allowed/disallowed domains and actions.
2.  Ensure the **Emergency Stop** button is prominently displayed on the `/dashboard` overview and is wired to a dedicated, high-priority endpoint in the Orchestrator/Runtime API. This endpoint must be designed for immediate, non-reversible action.

### 3.3. Deployment

This repo now includes route handlers under `app/api/**/route.ts`, so **static export** is not compatible. Deploy to a platform that supports Next.js server functions (e.g., Vercel, Amplify, or equivalent).

## 4. Relationship with the Chrome Extension

The Web Control Plane and the Chrome Extension serve distinct purposes and should be developed with their separation of concerns in mind.

| Feature | Web Control Plane (`glazyr`) | Chrome Extension (`glazyr-chrome-extension`) |
| :--- | :--- | :--- |
| **User Interface** | Mission Control (Configuration, History) | Cockpit (Chat UI, Real-time Status) |
| **Data Source** | Auth, Config, Task Summary APIs | Page Context, Voice Input, Framed Screenshot |
| **Action** | Configure, Review, Emergency Stop | Sense, Act, Communicate with Agent Backend |

**Development Instruction:**
1.  The Web Control Plane should provide a clear, up-to-date link and instructions on the `/install-extension` page, referencing the `mcpmessenger/glazyr-chrome-extension` repository.
2.  Implement the **Extension Status** UI on the `/dashboard` to show connection/permissions/heartbeat, which will be wired to a dedicated status API endpoint. This is a monitoring function, not a control function.

---
