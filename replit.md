# Sahab (سحاب) - National Aviation Data Platform

## Overview
Sahab is a national aviation data platform for GACA (General Authority of Civil Aviation) - Kingdom of Saudi Arabia. It provides comprehensive aviation analytics, dashboards, and intelligence for tracking Vision 2030 aviation targets.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Recharts + Framer Motion
- **Backend**: Express.js (Node.js)
- **Storage**: In-memory (mock data for MVP)
- **Routing**: wouter (client-side)

## Key Features (MVP)
1. **Landing Page** - Public marketing page at "/" with hero, features, stats, dashboards showcase, CTA sections, and links to login
2. **Login Page** - Branded login at "/login" with username/password auth, GACA SSO option, language/theme toggles, back-to-home link
3. **Home Dashboard** - Personalized home at "/home" with 3 KPI cards (Connectivity Index, Travelers, Cargo), quick alerts, favorites, recent activity, aviation snapshot
4. **National Aviation Overview** - Executive dashboard with target trajectory chart, traffic trend, domestic/international split, top 10 airports/airlines tables
5. **Collapsible Sidebar** - Full navigation with all platform sections (dashboards, explorer, reports, catalog, etc.)
6. **Top Navigation** - Global search, notification bell with dropdown, language toggle, dark mode toggle, user menu
7. **Bilingual Support** - Arabic (RTL) and English (LTR) with runtime switching, charts force LTR
8. **Dark Mode** - Full dark/light mode support with localStorage persistence
9. **Placeholder Pages** - Coming soon pages for Explorer, Self-Service, Reports, Catalog, API Portal, Notifications, Settings, and additional dashboards

## Authentication
- Mock auth with credential validation
- Users: amro/amro (Platform Admin, full access)
- Session stored in sessionStorage
- Public routes: "/" (landing), "/login"
- Protected routes: everything else (redirects to "/" if not authenticated)

## Route Structure
- `/` - Landing page (public)
- `/login` - Login page (public)
- `/home` - Home dashboard (authenticated)
- `/dashboards/*` - Dashboard pages (authenticated)
- `/explorer`, `/self-service`, `/reports`, `/catalog`, `/api-portal` - Tool pages (authenticated)
- `/notifications`, `/settings` - User pages (authenticated)

## File Structure
```
client/src/
  lib/
    i18n.tsx        - Translation system (AR/EN) with context provider
    theme.tsx       - Dark/light mode provider
    auth.tsx        - Auth context with credential validation
    queryClient.ts  - TanStack Query setup
  components/
    app-sidebar.tsx - Navigation sidebar with collapsible dashboard sub-menu
    top-nav.tsx     - Top navigation bar (search, notifications, language, theme, user)
    kpi-card.tsx    - Reusable KPI metric card with sparkline chart
    ui/             - shadcn/ui components
  pages/
    landing.tsx     - Public landing page with hero, features, dashboard showcase
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

## Important Notes
- Do NOT add hover:bg-* classes to buttons or badges; elevation system is automatic
- Always use `dir="ltr"` wrapper div around Recharts components to prevent RTL layout issues
- RTL: Document dir attribute controlled by i18n provider; logical CSS properties used where possible

## Running
- `npm run dev` starts both Express backend and Vite frontend on port 5000
