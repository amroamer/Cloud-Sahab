# Sahab (سحاب) — National Aviation Data Platform

Saudi Arabia's comprehensive aviation analytics platform built for the General Authority of Civil Aviation (GACA). Sahab provides executive dashboards, KPI tracking, and data intelligence aligned with Vision 2030 aviation targets.

## Vision 2030 Targets
- **Air Connectivity Index**: 250
- **Total Travelers**: 330 million passengers
- **Cargo Shipments**: 3 million shipments

## Features

### 10 KPI Dashboards (60 KPIs Total)
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

### Platform Features
- Fully bilingual (Arabic RTL / English LTR)
- Dark mode support
- Collapsible sidebar navigation
- Global search, notifications, user preferences
- Public landing page with platform overview
- Username/password authentication

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
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

## Running
```bash
npm run dev
```
Starts Express backend and Vite frontend on port 5000.

## Authentication
- Username: `amro` / Password: `amro` (Platform Admin, full access)
