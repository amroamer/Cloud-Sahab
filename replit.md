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
- Mock auth with credential validation (client-side, no JWT)
- 5 demo accounts:
  - amro/amro (Platform Admin), executive/exec123 (GACA Executive), analyst/analyst123 (GACA Analyst), airline/airline123 (Airline Operator), admin/admin123 (Marketplace Admin)
- 8 roles: Platform Admin, Marketplace Admin, GACA Executive, GACA Analyst, GACA Regulator, Airline Operator, Airport Operator, Investor/Analyst, Researcher
- Role-based navigation filtering via `ROLE_ALLOWED_PATHS` in auth.tsx
- Session stored in sessionStorage
- Public routes: "/" (landing), "/login"
- Protected routes: everything else (redirects to "/" if not authenticated)

## Route Structure
- `/` - Landing page (public)
- `/login` - Login page (public)
- `/home` - Home dashboard (authenticated)
- `/dashboards/overview` - National Aviation Overview (8 KPIs)
- `/dashboards/flight-ops` - Flight Operations (6 KPIs)
- `/dashboards/passengers` - Passenger Intelligence (6 KPIs)
- `/dashboards/connectivity` - Connectivity & Market Share (7 KPIs)
- `/dashboards/airports` - Airport Infrastructure & Capacity (11 KPIs)
- `/dashboards/cargo` - Cargo & Logistics (5 KPIs)
- `/dashboards/financial` - Financial & Economic (10 KPIs)
- `/dashboards/bop` - Balance of Payments (6 KPIs)
- `/dashboards/fleet` - Fleet & Aircraft (3 KPIs)
- `/dashboards/digital` - Digital, Sustainability & CX (7 KPIs)
- `/dashboards/ajwaa-licensing` - Licensing & Personnel Services (14 KPIs)
- `/dashboards/ajwaa-permits` - Flight & Operation Permits (12 KPIs)
- `/dashboards/ajwaa-economic` - Economic & Regulatory Approvals (9 KPIs)
- `/dashboards/ajwaa-providers` - Airport & Service-Provider Services (9 KPIs)
- `/dashboards/ajwaa-eservices` - Ajwaa e-Service Performance (4 KPIs)
- `/explorer` - Air Traffic Explorer (interactive analytical workspace)
- `/guide` - User Guide & Use Cases (bilingual reference page)
- `/catalog` - Data Marketplace (32 products, faceted filters, universal download)
- `/catalog/:productId` - Product Detail Page (schema, preview, reviews, versions)
- `/self-service`, `/reports`, `/api-portal` - Tool pages (authenticated, placeholder)
- `/notifications`, `/settings` - User pages (authenticated, placeholder)

## File Structure
```
client/src/
  lib/
    i18n.tsx        - Translation system (AR/EN) with context provider
    theme.tsx       - Dark/light mode provider
    auth.tsx        - Auth context with credential validation
    queryClient.ts  - TanStack Query setup
    ajwaa-mock-data.ts - Ajwaa e-services regulatory data (licensing, permits, economic, providers)
    catalog-data.ts   - 32 aviation data products with schemas, preview data, and metadata
  components/
    app-sidebar.tsx       - Navigation sidebar with collapsible dashboard sub-menu
    top-nav.tsx           - Top navigation bar (search, notifications, language, theme, user)
    kpi-card.tsx          - Reusable KPI metric card with sparkline chart
    dashboard-filters.tsx - Shared collapsible filter bar component + useFilterState hook
    ui/                   - shadcn/ui components
  pages/
    landing.tsx           - Public landing page with hero, features, dashboard showcase
    login.tsx             - Login page with split layout and GACA branding
    home.tsx              - Home dashboard with KPIs, alerts, activity, quick links
    dashboard-overview.tsx    - Dashboard 1: National Aviation Overview (8 KPIs)
    dashboard-flight-ops.tsx  - Dashboard 2: Flight Operations (6 KPIs)
    dashboard-passengers.tsx  - Dashboard 3: Passenger Intelligence (6 KPIs)
    dashboard-connectivity.tsx - Dashboard 4: Connectivity & Market Share (7 KPIs)
    dashboard-airports.tsx    - Dashboard 5: Airport Infrastructure & Capacity (11 KPIs)
    dashboard-cargo.tsx       - Dashboard 6: Cargo & Logistics (5 KPIs)
    dashboard-financial.tsx   - Dashboard 7: Financial & Economic (10 KPIs)
    dashboard-bop.tsx         - Dashboard 8: Balance of Payments (6 KPIs)
    dashboard-fleet.tsx       - Dashboard 9: Fleet & Aircraft (3 KPIs)
    dashboard-digital.tsx     - Dashboard 10: Digital, Sustainability & CX (7 KPIs)
    dashboard-ajwaa-licensing.tsx  - Dashboard 11: Licensing & Personnel Services (14 KPIs)
    dashboard-ajwaa-permits.tsx    - Dashboard 12: Flight & Operation Permits (12 KPIs)
    dashboard-ajwaa-economic.tsx   - Dashboard 13: Economic & Regulatory Approvals (9 KPIs)
    dashboard-ajwaa-providers.tsx  - Dashboard 14: Airport & Service-Provider Services (9 KPIs)
    dashboard-ajwaa-eservices.tsx  - Dashboard 15: Ajwaa e-Service Performance (4 KPIs)
    explorer.tsx              - Air Traffic Explorer with dimension/metric/chart selectors
    catalog.tsx               - Data Marketplace browser with filters, search, category tabs
    catalog-detail.tsx        - Product detail page with schema, preview, reviews, versions
    user-guide.tsx            - Bilingual user guide with dashboard descriptions, roles, FAQ
    placeholder.tsx           - Coming soon pages for unimplemented tool sections
    not-found.tsx             - 404 page
  components/
    chart-toolbar.tsx         - Reusable chart wrapper with fullscreen, PNG download, CSV export
```

## Design Tokens
- Font: Inter (English) + Noto Sans Arabic (Arabic)
- GACA Navy design system:
  - Primary Navy: #1B3A5C (210 53% 23%)
  - Accent Blue: #2E86C1 (207 62% 47%)
  - Teal Green: #1ABC9C (168 74% 42%)
  - Warning Amber: #F39C12 (37 90% 51%)
  - Alert Red: #E74C3C (6 78% 57%)
- Chart colors: Navy, Teal, Blue, Amber, Red
- Dark mode: Full support with navy-based dark tokens
- Sidebar: Dark navy background with teal accent highlights

## Important Notes
- Do NOT add hover:bg-* classes to buttons or badges; elevation system is automatic
- Always use `dir="ltr"` wrapper div around Recharts components to prevent RTL layout issues
- RTL: Document dir attribute controlled by i18n provider; logical CSS properties (ms-, me-, ps-, pe-, start-, end-, text-end) used throughout
- Sidebar uses `side={isRTL ? "right" : "left"}` to flip correctly in Arabic mode
- Directional icons (ArrowLeft, ChevronRight) use `rtl:rotate-180` to flip in RTL
- Never use `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right` — use logical equivalents instead

## Running
- `npm run dev` starts both Express backend and Vite frontend on port 5000
