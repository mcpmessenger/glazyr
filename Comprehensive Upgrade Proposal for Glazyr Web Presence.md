# Comprehensive Upgrade Proposal for Glazyr Web Presence

**Prepared by:** Manus AI
**Date:** December 13, 2025

## 1. Introduction and Project Analysis

The Glazyr project is a sophisticated, **safety-first web automation stack** built on a modern, high-performance technology foundation. The current architecture is intelligently split into three core responsibilities: the **Control Plane (Web UI)**, the **Extension (Execution Surface)**, and the **Runtime (Orchestrator Backend)**.

### 1.1 Current Technology Stack

The project currently utilizes a highly modern and capable stack, which is a significant strength:

| Component | Repository | Primary Technology | Key Features |
| :--- | :--- | :--- | :--- |
| **Web Control Plane** | `glazyr` | Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI | Mission Control for configuration, safety, and monitoring. |
| **Monorepo Structure** | `glazyr-control` | Monorepo structure (Lerna/Turborepo likely) | Orchestrates the main components and deployment scripts. |
| **Extension** | `glazyr-chrome-extension` | Chrome Extension (Manifest V3) | Local execution and policy enforcement in the browser. |
| **Runtime** | `glazyr-control/runtime-aws` | AWS Lambda, SQS, DynamoDB | Backend for orchestration and vision services (OCR). |

The existing use of Next.js 16 and React 19 places the project at the forefront of web technology. The proposed upgrade will focus on maximizing the benefits of this stack and addressing the separation of the public-facing site from the private application dashboard.

### 1.2 Core Philosophy: Mission Control vs. Cockpit

The project's philosophy, "Mission Control, not the cockpit," is a critical design constraint. The web application is intentionally designed to be a configuration and monitoring surface, **not** an interactive execution environment. This separation is a strength for security and stability and must be maintained.

## 2. Architectural Recommendations: Monorepo Consolidation

The current structure, spread across multiple repositories (`glazyr-control`, `glazyr`, `glazyr-chrome-extension`), introduces friction for shared code and development.

**Recommendation:** Consolidate all components into a single, unified monorepo using a tool like **Turborepo** or **Nx**.

| Current State | Proposed Monorepo Structure | Benefit |
| :--- | :--- | :--- |
| Multiple Repositories | Single Monorepo (e.g., using Turborepo) | Simplified dependency management and single source of truth. |
| Shared Code Duplication | `packages/` directory for shared code | **Maximum code reuse** between the Next.js app and the Chrome extension (e.g., types, UI components, utility functions). |
| Fragmented Development | Atomic build/test/deploy commands | Faster build times and improved developer experience. |

This consolidation will allow for a shared `packages/ui` library, ensuring **visual consistency** between the public marketing site, the private control plane, and the extension's UI elements.

## 3. Website Upgrade: Public-Facing Marketing Site

The current public routes are embedded within the application, which is a common pattern but limits marketing flexibility. The public-facing site needs to be a dedicated, high-impact marketing tool.

**Recommendation:** Refactor the public routes into a distinct, performance-optimized marketing site within the monorepo.

| Improvement Area | Proposed Action | Rationale |
| :--- | :--- | :--- |
| **Branding & Messaging** | Develop a clear, compelling narrative around "safety-first automation." | Clearly communicate the unique value proposition to potential users. |
| **Performance** | Optimize the public site for Core Web Vitals using Next.js 16 features. | Improve SEO and user experience for first-time visitors. |
| **Content Strategy** | Dedicated pages for: **How It Works** (Architecture Diagram), **Safety & Security** (Trust model), **Pricing**, and a clear **Call-to-Action** (Install Extension/Sign Up). | Address user concerns about automation safety and guide them to the next step. |
| **Design** | Implement a modern, professional design that evokes trust and technical sophistication. | A high-quality public site builds immediate credibility. |

## 4. Control Plane (Dashboard) Improvement

The dashboard is the core user experience for existing customers. Improvements should focus on clarity, performance, and adherence to dashboard design best practices [7] [8].

### 4.1 User Experience (UX) and Information Architecture

The dashboard should prioritize the most critical information first to minimize cognitive load [10].

| Current Route | Proposed UX Improvement | Rationale |
| :--- | :--- | :--- |
| `/dashboard` (Overview) | **Immediate Status:** Clearly display the Kill Switch status and Extension Heartbeat. Use prominent, color-coded indicators. | Provide instant "at-a-glance" status for the most critical safety features. |
| `/dashboard/safety-permissions` | **Simplified Policy Editor:** Use a clear, form-based interface for configuring allowed domains and disallowed actions. Use Zod schemas for client-side validation. | Reduce the risk of configuration errors in critical safety settings. |
| `/dashboard/task-history` | **Enhanced Monitoring:** Improve the display of task summaries. Use simple charts (e.g., bar charts for task volume, line charts for success rate over time) [9]. | Provide valuable insights into automation performance without displaying sensitive traces. |

### 4.2 Technical Implementation (Next.js 16 Optimization)

The existing Next.js 16 stack should be fully leveraged for maximum performance [1] [4].

1.  **Server Components (RSC):** Use Server Components by default for all static or slow-changing parts of the dashboard (e.g., layout, navigation, configuration forms). This reduces client-side JavaScript and improves initial load time [6].
2.  **Route Handlers:** Ensure all API endpoints (`/api/*`) are implemented as Next.js Route Handlers for cleaner separation of concerns and better performance compared to older API Routes [6].
3.  **Data Fetching & Caching:** Implement a robust data fetching strategy using React Query or a similar library, combined with Next.js's built-in caching mechanisms. Use `revalidate` options to ensure monitoring data is fresh while configuration data is stable [5].

## 5. Phased Upgrade Plan

The upgrade should be executed in three distinct phases to minimize risk and ensure continuous delivery.

| Phase | Focus Area | Key Deliverables | Estimated Duration |
| :--- | :--- | :--- | :--- |
| **Phase 1: Architectural Foundation** | Monorepo setup and shared component library. | Unified Monorepo (Turborepo/Nx). Shared `packages/ui` library with all Radix/Tailwind components. Migration of `glazyr-extension` to use shared types. | 4-6 Weeks |
| **Phase 2: Public Marketing Site** | Refactor and redesign the public-facing web presence. | New, high-performance marketing site (`/how-it-works`, `/security`, `/pricing`). Clear Call-to-Action for extension installation. | 6-8 Weeks |
| **Phase 3: Control Plane Optimization** | Dashboard UX/UI and performance improvements. | Redesigned `/dashboard` with key status indicators. Enhanced `/safety-permissions` policy editor. Task history visualization improvements. Full adoption of Next.js 16 RSC best practices. | 8-12 Weeks |

## References

[1] Next.js 16: The Hidden Performance Features Nobody's Talking About. (2025). *Medium*.
[2] Next.js 16. (2025). *Next.js Blog*.
[3] App Router: Guides. (2025). *Next.js Documentation*.
[4] Guides: Production. (2025). *Next.js Documentation*.
[5] Optimizing Performance in Next.js and React.js. (2025). *Dev.to*.
[6] Next.js 16 Best Practices for Production-Ready Apps. (2025). *Dharmsy*.
[7] Learn 25 Dashboard Design Principles & BI Best Practices. (Unknown). *RIB Software*.
[8] Effective Dashboard Design: Principles, Best Practices. (2025). *DataCamp*.
[9] 30 Proven Dashboard Design Principles for Better Data. (Unknown). *Aufait UX*.
[10] 10 Key Dashboard Design Principles: Analytics Best Practice. (Unknown). *Yellowfin BI*.
[11] Monorepo setup with TypeScript, Tailwind, NextJs, and WXT. (2024). *weberdominik.com*.
[12] Advanced Best Practices for Managing a Next.js Monorepo. (Unknown). *Medium*.
