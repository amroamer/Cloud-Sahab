export interface MarketMetric {
  label: string;
  labelAr: string;
  value: string;
  valueAr: string;
  change: number;
  icon: string;
}

export interface PrivatizationEntry {
  airport: string;
  airportAr: string;
  status: "planned" | "in-progress" | "completed";
  timeline: string;
  timelineAr: string;
  expectedValue: number;
}

export interface FleetExpansion {
  airline: string;
  airlineAr: string;
  currentFleet: number;
  orders: number;
  deliveryTimeline: string;
  deliveryTimelineAr: string;
  type: string;
}

export interface BenchmarkRow {
  country: string;
  countryAr: string;
  passengers: number;
  routes: number;
  airports: number;
  growthRate: number;
}

export interface MarketGrowthPoint {
  year: number;
  marketSize: number;
  projected: number;
}

export interface RouteGrowthPoint {
  year: number;
  routes: number;
}

function rand(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateInvestorData() {
  const marketMetrics: MarketMetric[] = [
    { label: "Saudi Aviation Market Size", labelAr: "حجم سوق الطيران السعودي", value: `$${rand(28, 35)}B`, valueAr: `${rand(28, 35)} مليار دولار`, change: rand(8, 15), icon: "market" },
    { label: "CAGR (2024-2030)", labelAr: "معدل النمو السنوي المركب", value: `${rand(7, 12)}%`, valueAr: `${rand(7, 12)}%`, change: rand(1, 4), icon: "growth" },
    { label: "Airport Infrastructure Pipeline", labelAr: "خط أنابيب البنية التحتية للمطارات", value: `$${rand(40, 65)}B`, valueAr: `${rand(40, 65)} مليار دولار`, change: rand(12, 22), icon: "infra" },
    { label: "Tourism Revenue Target", labelAr: "هدف إيرادات السياحة", value: `$${rand(80, 120)}B`, valueAr: `${rand(80, 120)} مليار دولار`, change: rand(15, 28), icon: "tourism" },
    { label: "FDI in Aviation", labelAr: "الاستثمار الأجنبي في الطيران", value: `$${rand(5, 12)}B`, valueAr: `${rand(5, 12)} مليار دولار`, change: rand(18, 35), icon: "fdi" },
    { label: "Active Investment Deals", labelAr: "صفقات الاستثمار النشطة", value: `${randInt(12, 28)}`, valueAr: `${randInt(12, 28)}`, change: rand(5, 20), icon: "deals" },
  ];

  const privatizationPipeline: PrivatizationEntry[] = [
    { airport: "Riyadh (KKIA)", airportAr: "الرياض (مطار الملك خالد)", status: "in-progress", timeline: "2025-2027", timelineAr: "٢٠٢٥-٢٠٢٧", expectedValue: rand(8, 14) },
    { airport: "Jeddah (KAIA)", airportAr: "جدة (مطار الملك عبدالعزيز)", status: "in-progress", timeline: "2025-2028", timelineAr: "٢٠٢٥-٢٠٢٨", expectedValue: rand(10, 18) },
    { airport: "Dammam (KFIA)", airportAr: "الدمام (مطار الملك فهد)", status: "planned", timeline: "2026-2029", timelineAr: "٢٠٢٦-٢٠٢٩", expectedValue: rand(4, 8) },
    { airport: "Madinah (PMIA)", airportAr: "المدينة (مطار الأمير محمد)", status: "completed", timeline: "2022-2024", timelineAr: "٢٠٢٢-٢٠٢٤", expectedValue: rand(2, 5) },
    { airport: "NEOM Bay Airport", airportAr: "مطار خليج نيوم", status: "planned", timeline: "2026-2030", timelineAr: "٢٠٢٦-٢٠٣٠", expectedValue: rand(6, 12) },
    { airport: "Red Sea Intl", airportAr: "مطار البحر الأحمر الدولي", status: "in-progress", timeline: "2024-2026", timelineAr: "٢٠٢٤-٢٠٢٦", expectedValue: rand(3, 7) },
  ];

  const fleetExpansions: FleetExpansion[] = [
    { airline: "Saudia", airlineAr: "الخطوط السعودية", currentFleet: randInt(155, 175), orders: randInt(80, 120), deliveryTimeline: "2025-2032", deliveryTimelineAr: "٢٠٢٥-٢٠٣٢", type: "Full-Service" },
    { airline: "Riyadh Air", airlineAr: "طيران الرياض", currentFleet: randInt(0, 5), orders: randInt(60, 80), deliveryTimeline: "2025-2030", deliveryTimelineAr: "٢٠٢٥-٢٠٣٠", type: "Full-Service" },
    { airline: "flynas", airlineAr: "طيران ناس", currentFleet: randInt(65, 75), orders: randInt(40, 60), deliveryTimeline: "2025-2029", deliveryTimelineAr: "٢٠٢٥-٢٠٢٩", type: "LCC" },
    { airline: "flyadeal", airlineAr: "طيران أديل", currentFleet: randInt(40, 50), orders: randInt(30, 50), deliveryTimeline: "2025-2028", deliveryTimelineAr: "٢٠٢٥-٢٠٢٨", type: "LCC" },
    { airline: "NEOM Airlines", airlineAr: "طيران نيوم", currentFleet: 0, orders: randInt(15, 30), deliveryTimeline: "2026-2030", deliveryTimelineAr: "٢٠٢٦-٢٠٣٠", type: "Regional" },
  ];

  const benchmarkData: BenchmarkRow[] = [
    { country: "Saudi Arabia", countryAr: "المملكة العربية السعودية", passengers: rand(110, 135), routes: randInt(580, 680), airports: 29, growthRate: rand(12, 18) },
    { country: "UAE", countryAr: "الإمارات", passengers: rand(140, 170), routes: randInt(700, 850), airports: 12, growthRate: rand(6, 10) },
    { country: "Qatar", countryAr: "قطر", passengers: rand(38, 50), routes: randInt(180, 230), airports: 3, growthRate: rand(5, 9) },
    { country: "Turkey", countryAr: "تركيا", passengers: rand(180, 220), routes: randInt(800, 1000), airports: 56, growthRate: rand(8, 14) },
  ];

  const marketGrowth: MarketGrowthPoint[] = [
    { year: 2019, marketSize: 18.2, projected: 18.2 },
    { year: 2020, marketSize: 6.8, projected: 20.1 },
    { year: 2021, marketSize: 11.4, projected: 22.0 },
    { year: 2022, marketSize: 19.5, projected: 24.1 },
    { year: 2023, marketSize: 24.8, projected: 26.3 },
    { year: 2024, marketSize: rand(28, 32), projected: 28.8 },
    { year: 2025, marketSize: 0, projected: rand(31, 35) },
    { year: 2026, marketSize: 0, projected: rand(34, 39) },
    { year: 2027, marketSize: 0, projected: rand(38, 44) },
    { year: 2028, marketSize: 0, projected: rand(42, 50) },
    { year: 2029, marketSize: 0, projected: rand(47, 56) },
    { year: 2030, marketSize: 0, projected: rand(52, 63) },
  ];

  const routeGrowth: RouteGrowthPoint[] = [
    { year: 2019, routes: 420 },
    { year: 2020, routes: 280 },
    { year: 2021, routes: 350 },
    { year: 2022, routes: 460 },
    { year: 2023, routes: 530 },
    { year: 2024, routes: randInt(580, 640) },
    { year: 2025, routes: randInt(640, 720) },
    { year: 2026, routes: randInt(720, 800) },
  ];

  return {
    marketMetrics,
    privatizationPipeline,
    fleetExpansions,
    benchmarkData,
    marketGrowth,
    routeGrowth,
  };
}
