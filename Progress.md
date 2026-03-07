# Sahab — Development Progress

## March 6, 2026

### Phase 1: Foundation (Complete)
- Login page with GACA branding, SSO placeholder, language/theme toggles
- Mock auth system with sessionStorage
- Home dashboard with 3 KPI cards, quick alerts, favorites, recent activity
- Bilingual i18n system (AR/EN) with RTL support
- Dark mode with localStorage persistence
- Collapsible sidebar navigation
- Top nav with search, notifications, language/theme toggles, user menu

### Phase 2: Landing Page & Auth Update (Complete)
- Public landing page at "/" with hero, features, dashboards, capabilities, CTA sections
- Login moved to "/login" with username/password validation
- User account: amro/amro (Platform Admin)
- Route restructuring: public routes (/, /login) and protected routes

### Phase 3: All 10 KPI Dashboards (Complete)
- **Dashboard 1 — National Aviation Overview** (8 KPIs): Connectivity Index gauge, Travelers/Cargo progress bars, traffic trend, connectivity map placeholder, quick-read counters (airports, routes, fleet, countries)
- **Dashboard 2 — Flight Operations** (6 KPIs): Aircraft movements per airport, flights by airline, delay analysis with donut chart, private flights, airspace airlines table, airport utilization heatmap
- **Dashboard 3 — Passenger Intelligence** (6 KPIs): Passenger movements pivot table, transit travelers, domestic/intl donut, volume by class, nationality bar chart, gate infrastructure
- **Dashboard 4 — Connectivity & Market Share** (7 KPIs): Connectivity gauge (87/250), countries counter, routes breakdown, foreign airline share donut, LCC share donut, airline×airport pivot, airspace table
- **Dashboard 5 — Airport Infrastructure & Capacity** (11 KPIs): National totals strip, airport selector with profile cards, capacity vs utilization chart, gates breakdown, parking breakdown, comparison table
- **Dashboard 6 — Cargo & Logistics** (5 KPIs): Shipments with 3M target, tonnage/growth/cost cards, monthly trend with import/export toggle, commodity donut, airport cargo ranking, shipments by mode
- **Dashboard 7 — Financial & Economic** (10 KPIs): Revenue/expense/margin/investment cards, revenue vs expense dual bar, investment breakdown, BOP flows chart+table, aircraft purchases trend, capital value trend
- **Dashboard 8 — Balance of Payments** (6 KPIs): Credits/debits/net balance cards, waterfall chart, quarterly trend bars, net BOP trend line, individual component cards
- **Dashboard 9 — Fleet & Aircraft** (3 KPIs): Commercial/private fleet counters, fleet composition stacked bar by age band, purchase trend chart, fleet by airline table
- **Dashboard 10 — Digital, Sustainability & CX** (7 KPIs): Three-zone layout — sustainability (CO2/fuel), digital services (e-checkin/e-ticket/adoption), customer experience (Skytrax/complaints)
- Shared mock data module with realistic Saudi aviation datasets
- Updated sidebar navigation with all 10 dashboards
- All dashboards bilingual (AR/EN) with proper RTL support

### Phase 4: Real Data Calibration (Complete)
- Updated `client/src/lib/mock-data.ts` with verified 2023–2024 figures from GACA/industry sources
- **Passengers**: 2024 = 128M (59M domestic, 69M international), 2023 = 112M; monthly traffic recalibrated
- **Cargo**: 2024 = 1.2M tonnes (+34% YoY), 2023 = 918K tonnes; cargo monthly recalibrated to ~1.35M for 2025
- **Flights**: 2024 = 905K (474K domestic, 431K international), 2023 = 815K; airport flight counts aligned
- **Countries/Destinations**: Updated from 78 to 170+ worldwide destinations
- **Fleet**: 284 commercial aircraft (176 NB + 108 WB); Saudia 167, flynas 71, flyadeal 45, Riyadh Air 1
- **Airlines**: Saudia 192,560 flights, OTP 89% (departure 88.82%, arrival 86.35%)
- **Airports**: 29 airports (12 international, 3 regional, 14 domestic); airport types corrected; passenger/flight totals aligned to 128M/905K baselines
- **Cargo by airport**: Proportionally scaled to match 1.2M tonnes national total
- **Air shipments**: Updated to 1.2M tonnes (from 852K) in shipments-by-mode
- Passenger class/nationality distributions scaled to 128M base
- All 10 dashboards automatically reflect updated data (single source of truth)

### Phase 5: Dashboard Filter Bars (Complete)
- Created shared `DashboardFilters` component (`client/src/components/dashboard-filters.tsx`) with collapsible/expandable filter bar using shadcn Collapsible
- `useFilterState` hook for filter state management with reset capability
- Active filter count badge, reset button, and export button in collapsed header
- Added 30+ bilingual filter i18n keys (EN + AR) for all filter labels and options
- Wired dashboard-specific filters into all 10 dashboards:
  - **Overview**: Date Range, Granularity
  - **Flight Operations**: Date Range, Airport, Airline, Flight Type
  - **Passenger Intelligence**: Date Range, Airport, Passenger Type, Travel Class
  - **Connectivity & Market**: Date Range, Airline Type
  - **Airport Infrastructure**: Airport, Airport Type, Region
  - **Cargo & Logistics**: Date Range, Airport, Flow Direction, Commodity
  - **Financial & Economic**: Quarter, Revenue Type
  - **Balance of Payments**: Quarter, Flow Type
  - **Fleet & Aircraft**: Airline, Aircraft Category
  - **Digital & Sustainability**: Date Range, Section Focus
- Consistent placement: filter bar sits below page title, above charts on every dashboard
- Replaced all inline Select/Button filter controls with unified DashboardFilters component

### Phase 6: Ajwaa e-Services Dashboards (Complete)
- Added 5 new Ajwaa dashboards covering 48 additional KPIs (total: 108 KPIs across 15 dashboards)
- Created `client/src/lib/ajwaa-mock-data.ts` with realistic regulatory/e-service data
- Added ~200 bilingual i18n keys (EN + AR) for all Ajwaa KPIs, filters, and navigation
- **Dashboard 11 — Licensing & Personnel Services** (14 KPIs): Pilot/cabin crew/ATCO/maintenance licensing, applications by type, processing times, approval rates, digital completion, revenue, active licenses by category
- **Dashboard 12 — Flight & Operation Permits** (12 KPIs): Single/annual/overflight/landing permits, issuance rates, processing times, rejection rates, compliance violations, revenue
- **Dashboard 13 — Economic & Regulatory Approvals** (9 KPIs): Economic licenses by carrier type, issuance timelines, renewal rates, violations, general aviation approvals, audit pass rates
- **Dashboard 14 — Airport & Service-Provider Services** (9 KPIs): Approved operators, concessions, filing compliance, certified providers by category, audit findings, certification revenue
- **Dashboard 15 — Ajwaa e-Service Performance** (4 KPIs): Total applications by service group, average digital processing time, CSAT scores, digitization percentage
- New "Ajwaa Services" collapsible sidebar section with 5 sub-items
- All 5 dashboards include collapsible filter bars with dashboard-specific filters using shared DashboardFilters component
- Filters: License Category, Application Type, Permit Type, Operator Type, License Type, Sector, Provider Category, Service Type, Service Group

### Phase 7: Design System, RBAC, Explorer & Chart Toolbar (Complete)
- **Design System Update**: Replaced blue palette with GACA Navy design system
  - Primary Navy `#1B3A5C` (HSL 210 53% 23%), Accent Blue `#2E86C1` (207 62% 47%), Teal `#1ABC9C` (168 74% 42%)
  - Navy sidebar with teal accent highlights, white card backgrounds
  - Updated chart colors to navy/teal/blue/amber/red palette
  - Full dark mode support with adjusted navy-based dark tokens
- **Role-Based Access Control**: 8 user roles with 5 demo accounts
  - Roles: Platform Admin, Marketplace Admin, GACA Executive, GACA Analyst, GACA Regulator, Airline Operator, Airport Operator, Investor/Analyst, Researcher
  - Demo accounts: amro/amro, executive/exec123, analyst/analyst123, airline/airline123, admin/admin123
  - Role→navigation path mapping with `isPathAllowed()` utility
  - Login page demo account selector dropdown for quick access
- **Role-Based Sidebar Filtering**: Sidebar items filtered by role
  - Internal roles see all dashboards; external roles see filtered dashboards
  - External users see "Data Marketplace" instead of "Catalog" with shopping bag icon
  - User Guide link added to sidebar under System section
- **Enhanced Home Screen**: Dynamic welcome banner
  - Time-of-day greeting (Good morning/afternoon/evening) with icon
  - User role badge and organization name displayed
  - Updated KPI card colors to match new palette
- **Air Traffic Explorer** (`/explorer`): Interactive analytical workspace
  - Three-panel layout: Dimensions (left), Chart Canvas (center), Metrics (right)
  - 4 dimensions: Month, Airport, Airline, Flight Type
  - 6 metrics: Passengers, Flights, Cargo, Load Factor, OTP, Revenue
  - 6 chart types: Bar, Stacked Bar, Line, Area, Pie, Donut
  - Uses existing mock data from `mock-data.ts`
  - Chart toolbar integration with fullscreen, PNG download, CSV export
- **Chart Toolbar Component** (`client/src/components/chart-toolbar.tsx`): Reusable wrapper
  - Appears on hover over any chart card
  - Fullscreen mode (dialog/modal), Download PNG (html2canvas), Export CSV
  - Integrated into Explorer page
- **User Guide** (`/guide`): Bilingual reference page
  - Sections: Platform Overview, Navigation Guide, Dashboard Descriptions (all 15), User Roles & Access, Using Filters, Explorer Guide, FAQ
  - Table of contents with anchor links
  - All content available in English and Arabic

### Phase 8: Data Marketplace (Complete)
- **Data Marketplace Page** (`/catalog`): Full-featured data product browser
  - 32 pre-seeded aviation data products (28 paid + 4 free) across 12 categories
  - Categories: Traffic (5), Connectivity (3), Market Share (3), Flight Operations (3), Cargo (3), Infrastructure (2), Financial (2), Fleet (2), Sustainability (1), Digital & CX (2), Bundles (2), Free (4)
  - Hero banner for external/marketplace users with featured product
  - Category tabs for quick filtering (All, Traffic, Connectivity, Market, Ops, etc.)
  - Left faceted filters panel: category checkboxes, frequency, format, price range slider, "Free Only" toggle
  - Full-text search across product names, descriptions, and schema fields (bilingual)
  - Sort options: Most Popular, Newest, Price Low-to-High, Price High-to-Low
  - Product card grid with category badge, star rating, price, format icons, role-aware action buttons
  - "Load More" pagination
- **Product Detail Page** (`/catalog/:productId`): Comprehensive product information
  - Two-column layout: product info (left) + purchase panel (right)
  - Purchase panel with price (SAR + VAT), role-aware action button, format/size/record count
  - Coverage details: scope, period, granularity, update frequency, quality score
  - Tabbed content: Schema (field table), Preview (sample data with blur overlay for paid), Reviews (star ratings), Versions (edition history)
  - Related products section with 4 cards
  - Back to Catalog navigation
- **Universal Download**: All products downloadable as CSV by all users — no purchase or role restrictions
- Created `client/src/lib/catalog-data.ts` with full product metadata, schemas (8-11 fields each), and 55 rows of expanded preview data per product
- `downloadProductCSV()` utility generates CSV from product schema and triggers browser download
- No blur/lock overlay on preview — all data visible to all users
- Updated User Guide with Data Marketplace section
- Renamed "Data Catalog" → "Data Marketplace" across all UI, sidebar, i18n, landing page, user guide, and documentation
- All pages fully bilingual (EN/AR) with GACA Navy design system

### Phase 9: RTL / Arabic Layout Fix (Complete)
- **Sidebar RTL Positioning**: Sidebar now dynamically sets `side="right"` in Arabic mode, fixing the fixed-position `left-0` → `right-0` issue so sidebar appears on the correct side
- **Logical CSS Properties**: Replaced physical directional Tailwind classes with logical equivalents across the entire app:
  - `ml-*` → `ms-*`, `mr-*` → `me-*` (margin-start / margin-end)
  - `pl-*` → `ps-*`, `pr-*` → `pe-*` (padding-start / padding-end)
  - `left-*` → `start-*`, `right-*` → `end-*` (positioning)
  - `text-right` → `text-end`, `text-left` → `text-start` (alignment)
- **Arrow Icons**: `ArrowLeft` and `ChevronRight` icons now rotate 180° in RTL mode (`rtl:rotate-180`)
- **Search Inputs**: Top nav and catalog search bars use `start-3` / `ps-9` instead of conditional `isRTL` logic
- **Dashboard Tables**: All `text-right` table headers/cells across 8 dashboards converted to `text-end`
- **Pages Fixed**: catalog.tsx, catalog-detail.tsx, top-nav.tsx, app-sidebar.tsx, home.tsx, landing.tsx, user-guide.tsx, login.tsx, dashboard-airports, dashboard-cargo, dashboard-connectivity, dashboard-digital, dashboard-financial, dashboard-fleet, dashboard-flight-ops, dashboard-passengers

### Phase 10: English Numerals, Marketplace RTL, & Dashboard Tooltips (Complete)
- **English Numerals Enforcement**: Replaced all Arabic-Indic numerals (٠-٩) with Western numerals (0-9) across the entire codebase
  - Files fixed: i18n.tsx, mock-data.ts, home.tsx, top-nav.tsx, dashboard-overview.tsx, dashboard-ajwaa-licensing.tsx, placeholder.tsx, user-guide.tsx, dashboard-cargo.tsx, dashboard-connectivity.tsx, dashboard-digital.tsx, dashboard-financial.tsx, dashboard-fleet.tsx, dashboard-flight-ops.tsx, dashboard-passengers.tsx, landing.tsx, login.tsx
  - All numbers now display consistently as 0-9 regardless of language setting
- **Data Marketplace RTL Optimization**:
  - Fixed currency label in catalog-detail.tsx: "SAR" → conditional "ر.س" in Arabic mode
  - Added Arabic translation for "Last Updated" date on product detail page
  - Verified filter panel, product grid, and two-column layouts flip correctly via CSS grid + `dir="rtl"`
- **Dashboard Tooltip Icons**: Added info tooltip (ℹ) icon to every KPI card, chart section, and table section across all 15 dashboards
  - Created `SectionTooltip` component (`client/src/components/section-tooltip.tsx`) — reusable info icon with shadcn Tooltip
  - Extended `KpiCard` component with optional `tooltip` prop for inline info icons
  - All 108 KPIs and ~80 chart/table sections now have bilingual (EN/AR) tooltip descriptions
  - Tooltips describe what each KPI measures, its data source, and relevance
  - Dashboards 1-5: Overview, Flight Ops, Passengers, Connectivity, Airports
  - Dashboards 6-10: Cargo, Financial, BoP, Fleet, Digital
  - Dashboards 11-15: Ajwaa Licensing, Permits, Economic, Providers, eServices

### Phase 11: Route Map (Complete)
- **Interactive Route Map** (`/route-map`): Geographic visualization of airline routes from Saudi airports
  - Built with Leaflet + react-leaflet (open-source, no API key required)
  - Map centered on Saudi Arabia with CartoDB tiles (auto-switches between light/dark themes)
  - **Filters**: Airline selector (10 airlines), Origin Airport (10 airports), Period (2024/2025/All)
  - **Route Data**: 55 airline routes covering 3 Saudi carriers + 7 foreign airlines, domestic + international
  - **Visualization**: Saudi airports as teal markers, destinations as blue/amber markers, curved arc lines connecting origins to destinations with thickness proportional to passenger volume
  - **Interactivity**: Click route lines or destination markers for popup with airline, frequency, passengers
  - **Summary Stats**: Live counter strip showing routes, destinations, countries, passengers for current filter selection
  - **Route List Panel**: Scrollable sidebar listing all filtered routes sorted by passenger volume
  - **Legend**: Color-coded map legend for airport types and high-volume routes
  - Replaced "Interactive map coming soon" placeholder in Connectivity dashboard with "View Route Map" link
  - Added to sidebar under Tools with Navigation icon
  - Role access: Platform Admin, Marketplace Admin, GACA Executive, GACA Analyst, GACA Regulator, Airline Operator
  - Fully bilingual (EN/AR), RTL-compatible, dark mode support
  - Files: `route-map.tsx`, `mock-data.ts` (AIRLINE_ROUTES), `App.tsx`, `app-sidebar.tsx`, `auth.tsx`, `i18n.tsx`, `dashboard-connectivity.tsx`

### Phase 12: Airport Pulse View (Complete)
- **Airport Pulse View** (`/airport-pulse`): Full-screen real-time command center monitoring 29 Saudi airports
  - Dark-mode-only design (#0A0E1A background) — standalone page without sidebar/topnav, command center aesthetic
  - **29 Saudi Airports**: All airports with IATA codes, EN/AR names, cities, regions, tiers, capacity profiles
  - **3 Major Hub Cards** (RUH, JED, DMM): Large cards with IATA code (28px monospace), status badge, airport name/city, large EKG heartbeat waveform (200-point history), throughput number + trend arrow, utilization bar
  - **26 Compact Airport Cards**: Responsive grid (6/5/4/3 columns), IATA code, status dot, utilization %, mini waveform, throughput + trend
  - **Heartbeat Waveform** (`heartbeat-waveform.tsx`): HTML5 Canvas component with EKG spike-and-dip pattern, 60fps animation via requestAnimationFrame, three render layers (grid, glow, crisp line), color-coded by status (green/amber/red)
  - **Simulation Engine** (`airport-pulse-data.ts`): Client-side simulator updating every 2 seconds with natural-feeling throughput variations — smooth baseline, flight-arrival spikes, dips, gradual trends. Scenario simulation: random flight wave arrivals (40-60% spike for 2-3 min). Status logic: flowing (≤75%), congested (75-90%), critical (>90%)
  - **Header Bar**: SAHAB logo, "Airport Pulse View" label, 3 status summary pills (flowing/congested/critical counts updating in real-time), pulsing LIVE indicator, AR/EN language toggle
  - **Bottom Ticker Bar**: Horizontally scrolling marquee with national total pax/min, peak today, average today, total passengers today, active alerts color-coded
  - **Airport Detail Modal**: Right-side sheet/drawer on click — expanded waveform, throughput/utilization/total-today metrics, per-terminal breakdown, 24-hour trend bar chart, peak today, gates count
  - **Visual Effects**: JetBrains Mono font for numbers, subtle CRT scanline overlay (3-5% opacity), card border glow matching status, pulse animation on critical badges
  - Renders as full-screen page (no sidebar/topnav wrapper) with dedicated route handling
  - Added to sidebar under Tools with Activity icon
  - Role access: Platform Admin, Marketplace Admin, GACA Executive, GACA Analyst, GACA Regulator, Airline Operator
  - Fully bilingual (EN/AR) with useLanguage hook
  - Files: `airport-pulse.tsx`, `heartbeat-waveform.tsx`, `airport-pulse-data.ts`, `App.tsx`, `app-sidebar.tsx`, `auth.tsx`, `i18n.tsx`
