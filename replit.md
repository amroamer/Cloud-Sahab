# Sahab (سحاب) - National Aviation Data Platform

## Overview
Sahab is a national aviation data platform for GACA (General Authority of Civil Aviation) - Kingdom of Saudi Arabia. It provides comprehensive aviation analytics, dashboards, and intelligence for tracking Vision 2030 aviation targets.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Recharts
- **Backend**: Express.js (Node.js)
- **Storage**: In-memory (mock data for MVP)
- **Routing**: wouter (client-side)

## Key Features (MVP)
1. **Login Page** - Branded login with GACA SSO option, language/theme toggles
2. **Home Dashboard** - Personalized home with 3 KPI cards (Connectivity Index, Travelers, Cargo), quick alerts, favorites, recent activity, aviation snapshot
3. **National Aviation Overview** - Executive dashboard with target trajectory chart, traffic trend, domestic/international split, top 10 airports/airlines tables
4. **Collapsible Sidebar** - Full navigation with all platform sections (dashboards, explorer, reports, catalog, etc.)
5. **Top Navigation** - Global search, notification bell with dropdown, language toggle, dark mode toggle, user menu
6. **Bilingual Support** - Arabic (RTL) and English (LTR) with runtime switching, charts force LTR
7. **Dark Mode** - Full dark/light mode support with localStorage persistence
8. **Placeholder Pages** - Coming soon pages for Explorer, Self-Service, Reports, Catalog, API Portal, Notifications, Settings, and additional dashboards

## File Structure
```
client/src/
  lib/
    i18n.tsx        - Translation system (AR/EN) with context provider
    theme.tsx       - Dark/light mode provider
    auth.tsx        - Auth context (mock login)
    queryClient.ts  - TanStack Query setup
  components/
    app-sidebar.tsx - Navigation sidebar with collapsible dashboard sub-menu
    top-nav.tsx     - Top navigation bar (search, notifications, language, theme, user)
    kpi-card.tsx    - Reusable KPI metric card with sparkline chart
    ui/             - shadcn/ui components
  pages/
    login.tsx       - Login page with split layout and GACA branding
    home.tsx        - Home dashboard with KPIs, alerts, activity, quick links
    dashboard-overview.tsx - National Aviation Overview with charts and tables
    placeholder.tsx - Coming soon pages for unimplemented sections
    not-found.tsx   - 404 page
```

## Design Tokens
- Font: Inter (English) + Noto Sans Arabic (Arabic)
- Primary color: Blue (210 hue) - aviation themed
- Chart colors: Blue (210), Teal (185), Orange (28), Purple (280), Pink (340)
- Dark mode: Full support with semantic color tokens

## Running
- `npm run dev` starts both Express backend and Vite frontend on port 5000
