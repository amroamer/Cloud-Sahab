# Sahab (سحاب) — National Aviation Data Platform

Saudi Arabia's comprehensive aviation analytics platform built for the General Authority of Civil Aviation (GACA). Sahab provides executive dashboards, KPI tracking, and data intelligence aligned with Vision 2030 aviation targets.

## Vision 2030 Targets
- **Air Connectivity Index**: 250
- **Total Travelers**: 330 million passengers
- **Cargo Shipments**: 3 million shipments

## Features

### 15 KPI Dashboards (108 KPIs Total)

#### Aviation Operations (Dashboards 1–10, 60 KPIs)
| # | Dashboard | KPIs | Description |
|---|-----------|------|-------------|
| 1 | National Aviation Overview | 8 | Executive-level Vision 2030 KPIs and sector health |
| 2 | Flight Operations | 6 | Aircraft movements, delays, and operational performance |
| 3 | Passenger Intelligence | 6 | Passenger volumes, transit, domestic/international splits |
| 4 | Connectivity & Market | 7 | Route network, airline market shares, connectivity index |
| 5 | Airport Infrastructure & Capacity | 11 | Physical infrastructure, capacity, terminals, runways |
| 6 | Cargo & Logistics | 5 | Cargo volumes, freight growth, facilities, cost benchmarks |
| 7 | Financial & Economic | 10 | Revenue, expenses, investment, BOP flows |
| 8 | Balance of Payments | 6 | Cross-border aviation service flows |
| 9 | Fleet & Aircraft | 3 | Fleet composition, purchases, age breakdown |
| 10 | Digital, Sustainability & CX | 7 | Emissions, digital services, Skytrax rankings |

#### Ajwaa e-Services (Dashboards 11–15, 48 KPIs)
| # | Dashboard | KPIs | Description |
|---|-----------|------|-------------|
| 11 | Licensing & Personnel Services | 14 | Pilot/crew/ATCO/maintenance licensing, processing times, revenue |
| 12 | Flight & Operation Permits | 12 | Single/annual/overflight/landing permits, compliance |
| 13 | Economic & Regulatory Approvals | 9 | Economic licenses, general aviation approvals, audit rates |
| 14 | Airport & Service-Provider Services | 9 | Airport operators, ground handling, MRO, service certifications |
| 15 | Ajwaa e-Service Performance | 4 | Cross-cutting digital platform metrics, CSAT, digitization |

### Platform Features
- Fully bilingual (Arabic RTL / English LTR)
- Dark mode support with GACA Navy design system (`#1B3A5C` primary, `#2E86C1` accent, `#1ABC9C` teal)
- Role-based access control with 8 user roles and role-filtered sidebar navigation
- Collapsible sidebar navigation with role-aware menu items
- Info tooltip icons on every KPI card, chart, and table section across all 15 dashboards with bilingual descriptions
- Collapsible per-dashboard filter bars with dashboard-specific filters (date range, airport, airline, flight type, passenger type, etc.)
- Route Map — interactive geographic visualization of airline routes from Saudi airports to worldwide destinations with Leaflet
- Airport Pulse View — real-time Leaflet map (CartoDB tiles, light/dark auto-switch) of Saudi Arabia with 29 breathing circle markers representing airports, color-coded by congestion status (green/amber/red), sized by traffic volume, with hover tooltips and detail drawers
- Air Traffic Explorer — interactive analytical workspace with dimension/metric selectors and 6 chart types
- Chart toolbar — hover to reveal fullscreen, download PNG, and export CSV on any chart
- Data Marketplace — 32 aviation data products with faceted filters, product detail pages, schema preview, and universal CSV download
- User Guide — bilingual reference page with platform overview, dashboard descriptions, role access, FAQ
- Global search, notifications, user preferences
- Public landing page with platform overview
- Multi-user authentication with demo accounts

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts, Leaflet/react-leaflet, Framer Motion
- **Backend**: Express.js (Node.js)
- **Routing**: wouter (client-side)
- **Data**: Real-calibrated datasets (2023–2024 verified GACA/industry figures, 2025 projections)

## Routes
| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Login page |
| `/home` | Auth | Home dashboard |
| `/dashboards/overview` | Auth | National Aviation Overview |
| `/dashboards/flight-ops` | Auth | Flight Operations |
| `/dashboards/passengers` | Auth | Passenger Intelligence |
| `/dashboards/connectivity` | Auth | Connectivity & Market Share |
| `/dashboards/airports` | Auth | Airport Infrastructure & Capacity |
| `/dashboards/cargo` | Auth | Cargo & Logistics |
| `/dashboards/financial` | Auth | Financial & Economic |
| `/dashboards/bop` | Auth | Balance of Payments |
| `/dashboards/fleet` | Auth | Fleet & Aircraft |
| `/dashboards/digital` | Auth | Digital, Sustainability & CX |
| `/dashboards/ajwaa-licensing` | Auth | Licensing & Personnel Services |
| `/dashboards/ajwaa-permits` | Auth | Flight & Operation Permits |
| `/dashboards/ajwaa-economic` | Auth | Economic & Regulatory Approvals |
| `/dashboards/ajwaa-providers` | Auth | Airport & Service-Provider Services |
| `/dashboards/ajwaa-eservices` | Auth | Ajwaa e-Service Performance |
| `/explorer` | Auth | Air Traffic Explorer |
| `/route-map` | Auth | Route Map |
| `/airport-pulse` | Auth | Airport Pulse View |
| `/catalog` | Auth | Data Marketplace |
| `/catalog/:productId` | Auth | Product Detail Page |
| `/guide` | Auth | User Guide & Use Cases |

## Running
```bash
npm run dev
```
Starts Express backend and Vite frontend on port 5000.

## Authentication
| Username | Password | Role | Access |
|----------|----------|------|--------|
| `amro` | `amro` | Platform Admin | Full access |
| `executive` | `exec123` | GACA Executive | All dashboards, reports, catalog |
| `analyst` | `analyst123` | GACA Analyst | All dashboards, explorer, self-service, reports |
| `airline` | `airline123` | Airline Operator | Filtered dashboards, reports, catalog, API |
| `admin` | `admin123` | Marketplace Admin | Full access |

### Additional Roles (assignable)
- GACA Regulator, Airport Operator, Investor/Analyst, Researcher
