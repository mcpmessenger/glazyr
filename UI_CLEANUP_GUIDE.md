# UI Cleanup Guide: What's Real vs Slop

## 🎯 Quick Summary

**Essential Pages (Keep):** 8 pages
**Marketing/Info (Maybe Remove):** 7 pages  
**Placeholder (Remove/Update):** 1 page

---

## ✅ ESSENTIAL PAGES (Keep - Core Functionality)

### Public
1. **`/` (Home)** ✅
   - Landing page with value prop
   - Links to dashboard
   - **Keep**

2. **`/login`** ✅
   - Authentication entry point
   - **Keep**

3. **`/install-extension`** ✅
   - Instructions for installing extension
   - **Keep**

### Dashboard (All Essential)
4. **`/dashboard`** ✅ **CRITICAL**
   - Overview, kill switch, status
   - **Keep**

5. **`/dashboard/agent-modes`** ✅ **CRITICAL**
   - Configure Observe/Assist/Automate
   - **Keep**

6. **`/dashboard/safety-permissions`** ✅ **MOST CRITICAL**
   - Domain allowlists, action restrictions, budgets
   - **Keep**

7. **`/dashboard/task-history`** ✅
   - View task summaries and outcomes
   - **Keep**

8. **`/dashboard/extension-status`** ✅
   - Extension connection, heartbeat, permissions
   - **Keep**

---

## 🤔 MARKETING/INFO PAGES (Consider Removing/Consolidating)

### Investor-Focused (Maybe Remove)
1. **`/investors`** 🤔
   - Investor deck, resources
   - **Decision:** Keep if actively fundraising, remove if not

2. **`/market`** 🤔
   - Market analysis, TAM, positioning
   - **Decision:** Consolidate into `/about` or remove

3. **`/pricing`** 🤔
   - Pricing tiers
   - **Decision:** Keep if selling, remove if not

### Documentation/Info (Maybe Consolidate)
4. **`/about`** 🤔
   - Company/product overview
   - **Decision:** Keep as main info page, consolidate others here

5. **`/how-it-works`** 🤔
   - Architecture explanation
   - **Decision:** Merge into `/about` or `/docs`

6. **`/docs`** 🤔
   - Operator documentation
   - **Decision:** Keep if you have real docs, remove if placeholder

7. **`/status`** 🤔
   - Service status page
   - **Decision:** Keep if you have status monitoring, remove if placeholder

### Legal (Required)
8. **`/privacy-policy`** ✅ **REQUIRED**
   - Chrome extension privacy policy (legally required)
   - **Keep**

9. **`/privacy-security`** 🤔
   - Control plane privacy info
   - **Decision:** Merge into `/privacy-policy` or keep separate

---

## 🗑️ PLACEHOLDER/JUNK (Remove or Fix)

1. **`/dashboard/account`** 🗑️
   - Shows "UI-only placeholder for now"
   - **Action:** Remove placeholder text or implement real features

---

## 📊 Current Navigation Structure

### Site Header (Public Navigation)
```
Operator Nav:  Dashboard | Docs | Status
Investor Nav:  About | Market | Pricing | Investors
```

### Dashboard Sidebar
```
Overview
Agent modes
Safety & permissions
Task history
Extension status
Account
```

---

## 🎨 Recommended Cleanup Options

### Option 1: Minimal (Focus on Operators)
**Keep:**
- `/` (Home)
- `/login`
- `/install-extension`
- `/dashboard/*` (all 6 pages)
- `/privacy-policy` (legal requirement)

**Remove:**
- `/investors`
- `/market`
- `/pricing`
- `/about`
- `/how-it-works`
- `/docs` (if placeholder)
- `/status` (if placeholder)
- `/privacy-security` (merge into privacy-policy)

**Result:** ~8 pages total (clean, focused)

---

### Option 2: Balanced (Keep Essential Info)
**Keep:**
- `/` (Home)
- `/login`
- `/install-extension`
- `/dashboard/*` (all 6 pages)
- `/about` (consolidate info here)
- `/privacy-policy` (legal)

**Remove:**
- `/investors`
- `/market`
- `/pricing`
- `/how-it-works` (merge into `/about`)
- `/docs` (if placeholder)
- `/status` (if placeholder)
- `/privacy-security` (merge into privacy-policy)

**Result:** ~9 pages total

---

### Option 3: Keep Marketing (If Fundraising/Selling)
**Keep everything but:**
- Remove placeholder text from `/dashboard/account`
- Consolidate `/privacy-security` into `/privacy-policy`
- Merge `/how-it-works` into `/about` or `/docs`

**Result:** ~15 pages (full marketing site)

---

## 🔧 Specific Cleanup Actions

### 1. Fix Account Page
**File:** `app/dashboard/account/page.tsx`
- Remove "UI-only placeholder for now" text
- Keep basic email display and sign out

### 2. Simplify Site Header Navigation
**File:** `components/site-header.tsx`
- Remove investor nav if not fundraising
- Keep only: Dashboard, Docs (if real), Status (if real)

### 3. Consolidate Info Pages
- Merge `/how-it-works` content into `/about`
- Merge `/privacy-security` into `/privacy-policy`

### 4. Remove Unused Pages
If removing pages, also:
- Delete the page file
- Remove from navigation
- Update any links pointing to them

---

## 📋 Recommended: Option 1 (Minimal)

**Why:** Focus on operability, remove marketing fluff

**Pages to Keep (8):**
1. `/` - Home
2. `/login` - Auth
3. `/install-extension` - Setup
4. `/dashboard` - Overview
5. `/dashboard/agent-modes` - Config
6. `/dashboard/safety-permissions` - Critical config
7. `/dashboard/task-history` - Monitoring
8. `/dashboard/extension-status` - Status
9. `/privacy-policy` - Legal

**Pages to Remove (7):**
- `/investors`
- `/market`
- `/pricing`
- `/about`
- `/how-it-works`
- `/docs` (if placeholder)
- `/status` (if placeholder)
- `/privacy-security` (merge)

**Clean Navigation:**
```
Header: Dashboard | Sign in
Dashboard Sidebar: Overview | Agent modes | Safety & permissions | Task history | Extension status | Account
```

---

## 🚀 Quick Wins

1. **Remove placeholder text** from account page (1 min)
2. **Remove investor nav** from header if not fundraising (2 min)
3. **Delete unused pages** you don't need (5 min each)
4. **Consolidate info pages** into `/about` (10 min)

**Total cleanup time:** ~30-60 minutes
