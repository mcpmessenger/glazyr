
# Glazyr Web Control Plane – Product Spec
## (Frontend Team Handoff)

This document defines **exactly what the website is and is not**.
It is the authoritative spec for the Glazyr frontend refactor.

---

## 1. Executive Direction (Read First)

**Do NOT rebuild from scratch.**
Refactor the existing FE around a *new responsibility model*.

The website is a **control plane**, not:
- an agent
- a chat interface
- a real‑time automation surface

---

## 2. What the Website Is

The website exists to:
- Authenticate users
- Configure agent behavior
- Define safety & permissions
- Display outcomes and summaries
- Provide an emergency stop

The website **never executes actions**.

---

## 3. Core Mental Model

Think of the site as **mission control**, not the cockpit.

- Configuration > Interaction
- Intent > Instructions
- Outcomes > Reasoning

---

## 4. Information Architecture

### Public
- Home
- How It Works
- Privacy & Security
- Install Extension

### Authenticated Dashboard
- Overview
- Agent Modes
- Safety & Permissions
- Task History
- Extension Status
- Account

---

## 5. Dashboard Pages

### Overview
- Current agent mode
- Extension connection status
- Last task summary
- Emergency stop

**No chat. No freeform input.**

---

### Agent Modes
Behavioral envelopes only:
- Observe (read‑only)
- Assist (confirm before action)
- Automate (pre‑approved actions)

Modes map directly to safety profiles.

---

### Safety & Permissions (Critical)
- Allowed domains
- Disallowed actions
- Human‑in‑loop thresholds
- Runtime & action budgets

This is the most important page.

---

### Task History
Shows:
- Task name
- Outcome
- Timestamp
- Summary

Explicitly hide:
- Screenshots
- Model reasoning
- Internal traces

---

### Extension Status
- Connected / disconnected
- Browser type
- Permissions granted
- Last heartbeat

---

## 6. Explicit Non‑Goals

The website must NOT:
- Become a chat UI
- Execute automation
- Display chain‑of‑thought
- Control per‑action behavior

If it feels interactive, it is probably wrong.

---

## 7. Integration Rules

The website talks ONLY to:
- Auth service
- Config API
- Task summary API

It never talks directly to MCPs.

---

## 8. Ownership Boundaries

- Website: intent, configuration, trust
- Orchestrator: execution, safety, verification
- Extension: sensing and acting

This separation is non‑negotiable.

---

## 9. MVP Completion Criteria

The site is complete when a user can:
- Install the extension
- Configure behavior
- See what happened
- Stop everything instantly

Nothing more.

---

## 10. Success Definition

A successful UI feels:
- Calm
- Predictable
- Safe

If users “play” with it, it is doing too much.
