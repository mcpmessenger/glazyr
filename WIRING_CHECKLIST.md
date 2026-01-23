# Wiring Checklist: What Needs to Be Connected

## 🎯 Quick Summary
**3 main things to wire up:**
1. **Database** - Replace in-memory store
2. **Auth** - Replace dev sessions  
3. **Account page** - Remove placeholder

**Plus cleanup:**
4. Remove MCP invoke/manifest routes (AI loop)

---

## 1. Database Persistence ⚠️ **CRITICAL**

### Current State
- `lib/server/store.ts` uses `globalThis.__glazyrStore` (in-memory)
- Data lost on server restart
- Comment: "Cap growth for dev store"

### What to Wire
Replace `lib/server/store.ts` with real database:

**Options:**
- **PostgreSQL** (via Prisma/Drizzle)
- **DynamoDB** (AWS)
- **Vercel KV** (Redis-compatible)
- **Supabase** (PostgreSQL + auth)

**What needs persistence:**
- ✅ `store.getConfig()` / `store.setConfig()` - Control plane config
- ✅ `store.listTasks()` / `store.addTask()` - Task summaries
- ✅ `store.getExtensionStatus()` / `store.updateExtensionStatus()` - Extension status
- ✅ `store.engageKillSwitch()` / `store.disengageKillSwitch()` - Kill switch state

**Files to modify:**
- `lib/server/store.ts` - Replace implementation

---

## 2. Authentication ⚠️ **IMPORTANT**

### Current State
- `lib/server/session.ts` - Cookie-based sessions in memory
- `app/api/auth/login/route.ts` - Accepts any email/password (dev-only)
- Comment: "This is a frontend-only placeholder. Wire to your auth service later."

### What to Wire
Replace with real auth service:

**Options:**
- **Clerk** - Easy integration, good Next.js support
- **Auth0** - Enterprise-grade
- **Supabase Auth** - Open source, includes DB
- **NextAuth.js** - Self-hosted, flexible

**What needs wiring:**
- ✅ `app/api/auth/login/route.ts` - Real password verification
- ✅ `app/api/auth/guest/route.ts` - Guest mode (optional)
- ✅ `lib/server/session.ts` - Real session management
- ✅ `lib/server/store.ts` - Remove in-memory sessions

**Files to modify:**
- `app/api/auth/login/route.ts`
- `app/api/auth/guest/route.ts` (if keeping)
- `lib/server/session.ts`
- `lib/server/store.ts` (remove session storage)

---

## 3. Account Page 🧹 **MINOR**

### Current State
- `app/dashboard/account/page.tsx` shows: "UI-only placeholder for now."

### What to Wire
**Option A:** Remove placeholder text, keep basic display
**Option B:** Add real account features (change password, profile, etc.)

**Files to modify:**
- `app/dashboard/account/page.tsx` - Remove placeholder text

---

## 4. Cleanup: Remove AI Loop 🗑️ **CLEANUP**

### Current State
- MCP invoke/manifest routes exist but aren't used in UI
- Defined in contract but no client code calls them

### What to Remove
1. Delete `app/api/runtime/mcp/invoke/route.ts`
2. Delete `app/api/runtime/mcp/manifest/route.ts`
3. Remove from `lib/api/contract.ts`:
   - `runtimeMcpManifest: "/api/runtime/mcp/manifest"`
   - `runtimeMcpInvoke: "/api/runtime/mcp/invoke"`
4. Update `README.md` - Remove MCP routes from docs

**Files to delete:**
- `app/api/runtime/mcp/invoke/route.ts`
- `app/api/runtime/mcp/manifest/route.ts`

**Files to modify:**
- `lib/api/contract.ts` - Remove MCP route definitions
- `README.md` - Update documentation

---

## 📋 Priority Order

### Priority 1: Database (Blocking Production)
- Without this, data is lost on restart
- **Effort:** Medium (1-2 days)
- **Impact:** Critical

### Priority 2: Auth (Security)
- Dev auth is insecure
- **Effort:** Medium (1-2 days)
- **Impact:** High

### Priority 3: Cleanup (Code Quality)
- Remove unused AI loop code
- **Effort:** Low (30 mins)
- **Impact:** Low (but good practice)

### Priority 4: Account Page (Polish)
- Just remove placeholder text
- **Effort:** Low (5 mins)
- **Impact:** Low

---

## 🔌 Environment Variables Needed

### For Database
```bash
# PostgreSQL example
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Or DynamoDB
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
```

### For Auth
```bash
# Clerk example
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."

# Or Auth0
AUTH0_SECRET="..."
AUTH0_BASE_URL="..."
AUTH0_ISSUER_BASE_URL="..."
```

### Existing (Keep)
```bash
GLAZYR_CONTROL_RUNTIME_URL="..."  # For runtime tasks API
GLAZYR_CONTROL_RUNTIME_API_KEY="..."  # Optional
GLAZYR_SESSION_SECRET="..."  # Or use auth service secret
GLAZYR_API_KEY="..."  # For API key auth
```

---

## ✅ What's Already Wired (No Changes Needed)

- ✅ All dashboard pages functional
- ✅ Config API endpoints
- ✅ Kill switch API
- ✅ Task summaries API
- ✅ Extension status API
- ✅ Runtime tasks API (monitoring only)
- ✅ All UI components
- ✅ All hooks and state management

---

## 🚀 Quick Start: Minimal Viable Wiring

**Fastest path to production:**

1. **Database:** Use Vercel KV or Supabase (easiest setup)
2. **Auth:** Use Clerk (15 min setup)
3. **Cleanup:** Delete MCP routes (5 min)
4. **Account:** Remove placeholder text (1 min)

**Total effort:** ~1 day for basic production setup
