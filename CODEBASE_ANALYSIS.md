# Glazyr Codebase Analysis: Functional vs Placeholder/Scaffolding

## Summary
**~60% Functional, ~40% Placeholder/Scaffolding**

The site has a solid foundation but uses in-memory storage and dev-only auth. The MCP runtime proxy routes may be part of the "AI loop" you want to remove.

---

## ✅ FUNCTIONAL FEATURES (Keep & Enhance)

### Core Control Plane Features
1. **Dashboard Pages** - All functional:
   - `/dashboard` - Overview with kill switch ✅
   - `/dashboard/agent-modes` - Mode selection ✅
   - `/dashboard/safety-permissions` - **CRITICAL** - Domain/action allowlists ✅
   - `/dashboard/task-history` - Task summaries display ✅
   - `/dashboard/extension-status` - Extension connection status ✅
   - `/dashboard/account` - Basic account page ✅

2. **API Routes (Functional but need persistence layer)**:
   - `/api/control-plane/config` - GET/PUT config ✅
   - `/api/killswitch` - Emergency stop ✅
   - `/api/tasks` - Task summaries CRUD ✅
   - `/api/extension/status` - Extension status updates ✅
   - `/api/auth/*` - Dev cookie sessions (works but needs real auth) ⚠️

3. **Public Pages** - All functional:
   - Home, About, Docs, How It Works, Status, Market, Investors, etc. ✅

---

## ⚠️ PLACEHOLDER/SCAFFOLDING (Needs Replacement)

### 1. **In-Memory Store** (`lib/server/store.ts`)
**Status:** Placeholder/Scaffolding
- Uses `globalThis.__glazyrStore` - in-memory only
- Data lost on server restart
- Comment says: "Cap growth for dev store"
- **Action:** Replace with real DB (PostgreSQL, DynamoDB, or KV store)

### 2. **Dev-Only Auth** (`lib/server/session.ts` + `lib/server/store.ts`)
**Status:** Placeholder
- Cookie-based sessions stored in memory
- No real user database
- Comment in login page: "This is a frontend-only placeholder. Wire to your auth service later."
- **Action:** Integrate real auth (Auth0, Clerk, Supabase, etc.)

### 3. **Account Page** (`app/dashboard/account/page.tsx`)
**Status:** Placeholder
- Shows: "UI-only placeholder for now."
- **Action:** Implement real account management or remove

---

## 🗑️ POTENTIAL "AI LOOP" CODE (Consider Removing)

### MCP Runtime Proxy Routes
These proxy to the external MCP runtime and may be part of the AI execution loop:

1. **`/api/runtime/mcp/invoke`** (`app/api/runtime/mcp/invoke/route.ts`)
   - Proxies POST requests to `{RUNTIME}/mcp/invoke`
   - This is likely the "AI loop" - allows invoking MCP tools
   - **Recommendation:** **REMOVE** if you want to eliminate AI execution from control plane

2. **`/api/runtime/mcp/manifest`** (`app/api/runtime/mcp/manifest/route.ts`)
   - Proxies GET requests to `{RUNTIME}/mcp/manifest`
   - Fetches available MCP tools
   - **Recommendation:** **REMOVE** if you don't need tool discovery in UI

3. **`/api/runtime/tasks`** (`app/api/runtime/tasks/route.ts` + `[taskId]/route.ts`)
   - Proxies to `{RUNTIME}/api/tasks` - fetches runtime task list
   - Used by `/dashboard/task-history` to show runtime tasks
   - **Recommendation:** **KEEP** - This is monitoring, not execution
   - But verify it's not triggering AI loops

### Client-Side Code Using MCP
Check these files for MCP invocation:
- `lib/api/runtime.ts` - Client helper for runtime API
- `app/dashboard/task-history/page.tsx` - Uses `listRuntimeTasks()`

---

## 📊 File-by-File Breakdown

### Keep & Enhance
- ✅ `app/dashboard/**` - All dashboard pages
- ✅ `app/api/control-plane/config/route.ts` - Config API
- ✅ `app/api/killswitch/route.ts` - Kill switch
- ✅ `app/api/tasks/route.ts` - Task summaries
- ✅ `app/api/extension/status/route.ts` - Extension status
- ✅ `lib/control-plane-*.ts` - Type definitions & schemas
- ✅ `components/**` - UI components
- ✅ `hooks/**` - React hooks for state management

### Replace with Real Implementation
- ⚠️ `lib/server/store.ts` - Replace in-memory store with DB
- ⚠️ `lib/server/session.ts` - Replace with real auth
- ⚠️ `app/api/auth/**` - Replace with real auth service

### Remove (AI Loop)
- 🗑️ `app/api/runtime/mcp/invoke/route.ts` - **REMOVE** - AI execution
- 🗑️ `app/api/runtime/mcp/manifest/route.ts` - **REMOVE** - Tool discovery
- 🗑️ Check `lib/api/runtime.ts` - Remove MCP invoke functions

### Keep (Monitoring Only)
- ✅ `app/api/runtime/tasks/route.ts` - Task list (monitoring)
- ✅ `app/api/runtime/tasks/[taskId]/route.ts` - Task details (monitoring)

---

## 🎯 Recommended Actions

### Priority 1: Remove AI Loop
1. Delete `app/api/runtime/mcp/invoke/route.ts`
2. Delete `app/api/runtime/mcp/manifest/route.ts`
3. Remove MCP invoke functions from `lib/api/runtime.ts`
4. Update `app/dashboard/task-history/page.tsx` if it uses MCP invoke

### Priority 2: Replace Placeholders
1. Replace `lib/server/store.ts` with real database
2. Replace `lib/server/session.ts` with real auth
3. Update `app/dashboard/account/page.tsx` or remove placeholder message

### Priority 3: Clean Up
1. Remove any unused MCP-related imports
2. Update documentation to reflect removed MCP routes
3. Remove environment variables for MCP if no longer needed

---

## 📝 Notes

- The control plane is **correctly designed** as "mission control, not cockpit"
- All dashboard pages are functional and well-structured
- The in-memory store is the main blocker for production
- MCP invoke/manifest routes are the "AI loop" - remove these to focus on operability
- Runtime tasks API is monitoring-only, so it's safe to keep
