export interface VisionTarget {
  id: string;
  nameEn: string;
  nameAr: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  unitAr: string;
  status: "green" | "amber" | "red";
  daysAheadBehind: number;
  progressPercent: number;
  historicalData: { year: number; actual: number | null; projected: number | null; target: number | null }[];
}

export interface ScenarioSlider {
  id: string;
  labelEn: string;
  labelAr: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  unitAr: string;
}

export function generateWarRoomData() {
  const baseConnectivity = 85 + Math.floor(Math.random() * 10);
  const baseTravelers = 95 + Math.floor(Math.random() * 15);
  const baseCargo = 0.8 + Math.random() * 0.4;

  const connectivityStatus: "green" | "amber" | "red" =
    baseConnectivity >= 90 ? "green" : baseConnectivity >= 75 ? "amber" : "red";
  const travelersStatus: "green" | "amber" | "red" =
    baseTravelers >= 100 ? "green" : baseTravelers >= 85 ? "amber" : "red";
  const cargoStatus: "green" | "amber" | "red" =
    baseCargo >= 1.0 ? "green" : baseCargo >= 0.7 ? "amber" : "red";

  const connectivityDays = connectivityStatus === "green" ? Math.floor(Math.random() * 60) + 10 : -(Math.floor(Math.random() * 90) + 15);
  const travelersDays = travelersStatus === "green" ? Math.floor(Math.random() * 45) + 5 : -(Math.floor(Math.random() * 120) + 30);
  const cargoDays = cargoStatus === "green" ? Math.floor(Math.random() * 30) + 5 : -(Math.floor(Math.random() * 100) + 20);

  const targets: VisionTarget[] = [
    {
      id: "connectivity",
      nameEn: "Air Connectivity Index",
      nameAr: "مؤشر الاتصال الجوي",
      currentValue: baseConnectivity,
      targetValue: 250,
      unit: "index points",
      unitAr: "نقطة",
      status: connectivityStatus,
      daysAheadBehind: connectivityDays,
      progressPercent: (baseConnectivity / 250) * 100,
      historicalData: [
        { year: 2019, actual: 52, projected: null, target: 71 },
        { year: 2020, actual: 38, projected: null, target: 107 },
        { year: 2021, actual: 45, projected: null, target: 143 },
        { year: 2022, actual: 58, projected: null, target: 143 },
        { year: 2023, actual: 67, projected: null, target: 161 },
        { year: 2024, actual: 78, projected: null, target: 179 },
        { year: 2025, actual: baseConnectivity - 5, projected: null, target: 196 },
        { year: 2026, actual: baseConnectivity, projected: null, target: 214 },
        { year: 2027, actual: null, projected: baseConnectivity + 18, target: 232 },
        { year: 2028, actual: null, projected: baseConnectivity + 40, target: 241 },
        { year: 2029, actual: null, projected: baseConnectivity + 65, target: 246 },
        { year: 2030, actual: null, projected: baseConnectivity + 95, target: 250 },
      ],
    },
    {
      id: "travelers",
      nameEn: "Total Travelers",
      nameAr: "إجمالي المسافرين",
      currentValue: baseTravelers,
      targetValue: 330,
      unit: "M passengers",
      unitAr: "مليون مسافر",
      status: travelersStatus,
      daysAheadBehind: travelersDays,
      progressPercent: (baseTravelers / 330) * 100,
      historicalData: [
        { year: 2019, actual: 62, projected: null, target: 94 },
        { year: 2020, actual: 29, projected: null, target: 141 },
        { year: 2021, actual: 42, projected: null, target: 188 },
        { year: 2022, actual: 68, projected: null, target: 188 },
        { year: 2023, actual: 78, projected: null, target: 212 },
        { year: 2024, actual: 88, projected: null, target: 235 },
        { year: 2025, actual: baseTravelers - 8, projected: null, target: 259 },
        { year: 2026, actual: baseTravelers, projected: null, target: 282 },
        { year: 2027, actual: null, projected: baseTravelers + 25, target: 294 },
        { year: 2028, actual: null, projected: baseTravelers + 55, target: 306 },
        { year: 2029, actual: null, projected: baseTravelers + 90, target: 318 },
        { year: 2030, actual: null, projected: baseTravelers + 130, target: 330 },
      ],
    },
    {
      id: "cargo",
      nameEn: "Cargo Shipments",
      nameAr: "شحنات البضائع",
      currentValue: parseFloat(baseCargo.toFixed(2)),
      targetValue: 3,
      unit: "M tonnes",
      unitAr: "مليون طن",
      status: cargoStatus,
      daysAheadBehind: cargoDays,
      progressPercent: (baseCargo / 3) * 100,
      historicalData: [
        { year: 2019, actual: 0.42, projected: null, target: 0.86 },
        { year: 2020, actual: 0.35, projected: null, target: 1.29 },
        { year: 2021, actual: 0.48, projected: null, target: 1.71 },
        { year: 2022, actual: 0.55, projected: null, target: 1.71 },
        { year: 2023, actual: 0.62, projected: null, target: 1.93 },
        { year: 2024, actual: 0.72, projected: null, target: 2.14 },
        { year: 2025, actual: parseFloat((baseCargo - 0.1).toFixed(2)), projected: null, target: 2.36 },
        { year: 2026, actual: parseFloat(baseCargo.toFixed(2)), projected: null, target: 2.57 },
        { year: 2027, actual: null, projected: parseFloat((baseCargo + 0.3).toFixed(2)), target: 2.71 },
        { year: 2028, actual: null, projected: parseFloat((baseCargo + 0.65).toFixed(2)), target: 2.86 },
        { year: 2029, actual: null, projected: parseFloat((baseCargo + 1.0).toFixed(2)), target: 2.93 },
        { year: 2030, actual: null, projected: parseFloat((baseCargo + 1.4).toFixed(2)), target: 3.0 },
      ],
    },
  ];

  const projectedDateBase = new Date(2030, 11, 31);
  const daysRemaining = Math.ceil((projectedDateBase.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return {
    targets,
    projectedDate: projectedDateBase,
    daysRemaining: Math.max(0, daysRemaining),
    currentTravelers: baseTravelers,
  };
}

export const SCENARIO_SLIDERS: ScenarioSlider[] = [
  {
    id: "riyadhAirRoutes",
    labelEn: "Riyadh Air New Routes",
    labelAr: "مسارات طيران الرياض الجديدة",
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 15,
    unit: "routes",
    unitAr: "مسار",
  },
  {
    id: "oilPriceChange",
    labelEn: "Oil Price Change",
    labelAr: "تغير سعر النفط",
    min: -50,
    max: 50,
    step: 5,
    defaultValue: 0,
    unit: "%",
    unitAr: "%",
  },
  {
    id: "tourismGrowth",
    labelEn: "Tourism Growth",
    labelAr: "نمو السياحة",
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 10,
    unit: "%",
    unitAr: "%",
  },
];

export function calculateScenarioImpact(
  sliderValues: Record<string, number>,
  baseData: ReturnType<typeof generateWarRoomData>
) {
  const routeImpact = (sliderValues.riyadhAirRoutes || 0) * 0.8;
  const oilImpact = (sliderValues.oilPriceChange || 0) * -0.3;
  const tourismImpact = (sliderValues.tourismGrowth || 0) * 1.5;

  const totalImpactDays = Math.round(routeImpact + oilImpact + tourismImpact);

  const adjustedDate = new Date(baseData.projectedDate);
  adjustedDate.setDate(adjustedDate.getDate() - totalImpactDays);

  const adjustedDaysRemaining = Math.ceil(
    (adjustedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const connectivityBoost = (sliderValues.riyadhAirRoutes || 0) * 0.5 + (sliderValues.tourismGrowth || 0) * 0.3;
  const travelersBoost = (sliderValues.tourismGrowth || 0) * 2.5 + (sliderValues.riyadhAirRoutes || 0) * 1.2 + (sliderValues.oilPriceChange || 0) * -0.5;
  const cargoBoost = (sliderValues.oilPriceChange || 0) * 0.01 + (sliderValues.tourismGrowth || 0) * 0.02;

  return {
    adjustedDate,
    adjustedDaysRemaining: Math.max(0, adjustedDaysRemaining),
    totalImpactDays,
    connectivityBoost: parseFloat(connectivityBoost.toFixed(1)),
    travelersBoost: parseFloat(travelersBoost.toFixed(1)),
    cargoBoost: parseFloat(cargoBoost.toFixed(2)),
  };
}
