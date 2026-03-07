export interface CountryPilgrimData {
  country: string;
  countryAr: string;
  arrived: number;
  expected: number;
  flag: string;
}

export interface AirportCongestion {
  code: string;
  name: string;
  nameAr: string;
  level: "low" | "moderate" | "high" | "critical";
  utilization: number;
}

export interface AirlineCapacity {
  airline: string;
  airlineAr: string;
  capacity: number;
  demand: number;
  flights: number;
}

export interface CongestionAlert {
  time: string;
  airport: string;
  airportAr: string;
  expectedLevel: "moderate" | "high" | "critical";
  reason: string;
  reasonAr: string;
  confidence: number;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export function generateCountryData(): CountryPilgrimData[] {
  const countries = [
    { country: "Indonesia", countryAr: "إندونيسيا", flag: "ID", base: 221000 },
    { country: "Pakistan", countryAr: "باكستان", flag: "PK", base: 179000 },
    { country: "India", countryAr: "الهند", flag: "IN", base: 170000 },
    { country: "Bangladesh", countryAr: "بنغلاديش", flag: "BD", base: 127000 },
    { country: "Egypt", countryAr: "مصر", flag: "EG", base: 108000 },
    { country: "Turkey", countryAr: "تركيا", flag: "TR", base: 89000 },
    { country: "Nigeria", countryAr: "نيجيريا", flag: "NG", base: 77000 },
    { country: "Malaysia", countryAr: "ماليزيا", flag: "MY", base: 60000 },
    { country: "Algeria", countryAr: "الجزائر", flag: "DZ", base: 52000 },
    { country: "Morocco", countryAr: "المغرب", flag: "MA", base: 45000 },
  ];
  return countries.map((c) => {
    const expected = c.base + rand(-5000, 10000);
    const arrived = Math.round(expected * (0.55 + Math.random() * 0.4));
    return { ...c, arrived, expected };
  });
}

const ALL_AIRPORTS: { code: string; name: string; nameAr: string }[] = [
  { code: "JED", name: "King Abdulaziz Intl", nameAr: "الملك عبدالعزيز الدولي" },
  { code: "MED", name: "Prince Mohammad Intl", nameAr: "الأمير محمد الدولي" },
  { code: "RUH", name: "King Khalid Intl", nameAr: "الملك خالد الدولي" },
  { code: "DMM", name: "King Fahd Intl", nameAr: "الملك فهد الدولي" },
  { code: "TIF", name: "Ta'if Intl", nameAr: "الطائف الدولي" },
  { code: "AHB", name: "Abha Intl", nameAr: "أبها الدولي" },
  { code: "GIZ", name: "Jazan", nameAr: "جازان" },
  { code: "TUU", name: "Tabuk", nameAr: "تبوك" },
  { code: "ELQ", name: "Prince Nayef", nameAr: "الأمير نايف" },
  { code: "ABT", name: "Al-Baha", nameAr: "الباحة" },
  { code: "HAS", name: "Ha'il", nameAr: "حائل" },
  { code: "AJF", name: "Al-Jouf", nameAr: "الجوف" },
  { code: "RAE", name: "Arar", nameAr: "عرعر" },
  { code: "TUI", name: "Turaif", nameAr: "طريف" },
  { code: "YNB", name: "Yanbu", nameAr: "ينبع" },
  { code: "HOF", name: "Al-Ahsa", nameAr: "الأحساء" },
  { code: "DWD", name: "Dawadmi", nameAr: "الدوادمي" },
  { code: "WAE", name: "Wadi Al-Dawasir", nameAr: "وادي الدواسر" },
  { code: "SHW", name: "Sharurah", nameAr: "شرورة" },
  { code: "BHH", name: "Bisha", nameAr: "بيشة" },
  { code: "URY", name: "Gurayat", nameAr: "القريات" },
  { code: "EAM", name: "Najran", nameAr: "نجران" },
  { code: "SLF", name: "Sulayel", nameAr: "السليل" },
  { code: "RAH", name: "Rafha", nameAr: "رفحاء" },
  { code: "QJB", name: "Qaisumah", nameAr: "القيصومة" },
  { code: "AKH", name: "Al-Kharj", nameAr: "الخرج" },
  { code: "NUM", name: "NEOM Bay", nameAr: "خليج نيوم" },
  { code: "AUL", name: "AlUla", nameAr: "العلا" },
  { code: "RSI", name: "Red Sea Intl", nameAr: "البحر الأحمر الدولي" },
];

export function generateCongestionGrid(): AirportCongestion[] {
  return ALL_AIRPORTS.map((a) => {
    const isHajjHub = ["JED", "MED", "TIF"].includes(a.code);
    const isMajor = ["RUH", "DMM"].includes(a.code);
    let utilization: number;
    if (isHajjHub) {
      utilization = rand(65, 98);
    } else if (isMajor) {
      utilization = rand(45, 80);
    } else {
      utilization = rand(10, 60);
    }
    let level: AirportCongestion["level"];
    if (utilization >= 90) level = "critical";
    else if (utilization >= 75) level = "high";
    else if (utilization >= 50) level = "moderate";
    else level = "low";
    return { ...a, level, utilization };
  });
}

export function generateAirlineCapacity(): AirlineCapacity[] {
  const airlines = [
    { airline: "Saudia", airlineAr: "الخطوط السعودية" },
    { airline: "flynas", airlineAr: "طيران ناس" },
    { airline: "flyadeal", airlineAr: "طيران أديل" },
    { airline: "Egypt Air", airlineAr: "مصر للطيران" },
    { airline: "Turkish Airlines", airlineAr: "الخطوط التركية" },
    { airline: "Pakistan Intl Airlines", airlineAr: "الخطوط الباكستانية" },
  ];
  return airlines.map((a) => {
    const capacity = rand(8000, 25000);
    const demand = Math.round(capacity * (0.7 + Math.random() * 0.45));
    const flights = rand(30, 120);
    return { ...a, capacity, demand, flights };
  });
}

export function generateCongestionAlerts(): CongestionAlert[] {
  const now = new Date();
  const alerts: CongestionAlert[] = [];
  const reasons = [
    { en: "Multiple wide-body arrivals clustered", ar: "تجمع وصولات طائرات واسعة البدن" },
    { en: "Terminal capacity nearing limit", ar: "سعة الصالة تقترب من الحد الأقصى" },
    { en: "Baggage handling backlog expected", ar: "تأخر متوقع في مناولة الأمتعة" },
    { en: "Peak departures overlap with arrivals", ar: "تداخل ذروة المغادرات مع الوصولات" },
    { en: "Ground crew shift change window", ar: "فترة تغيير نوبة طاقم الأرض" },
    { en: "Increased transfer passenger volume", ar: "زيادة حجم الركاب العابرين" },
  ];
  const airports = [
    { en: "King Abdulaziz Intl (JED)", ar: "الملك عبدالعزيز الدولي (JED)" },
    { en: "Prince Mohammad Intl (MED)", ar: "الأمير محمد الدولي (MED)" },
    { en: "King Khalid Intl (RUH)", ar: "الملك خالد الدولي (RUH)" },
    { en: "Ta'if Intl (TIF)", ar: "الطائف الدولي (TIF)" },
    { en: "King Fahd Intl (DMM)", ar: "الملك فهد الدولي (DMM)" },
    { en: "Abha Intl (AHB)", ar: "أبها الدولي (AHB)" },
  ];
  const levels: CongestionAlert["expectedLevel"][] = ["moderate", "high", "critical"];

  for (let i = 0; i < 6; i++) {
    const futureHours = randFloat(0.5, 6);
    const futureTime = new Date(now.getTime() + futureHours * 3600000);
    const hh = String(futureTime.getHours()).padStart(2, "0");
    const mm = String(futureTime.getMinutes()).padStart(2, "0");
    const ap = airports[i % airports.length];
    const reason = reasons[i % reasons.length];
    alerts.push({
      time: `${hh}:${mm}`,
      airport: ap.en,
      airportAr: ap.ar,
      expectedLevel: levels[rand(0, levels.length - 1)],
      reason: reason.en,
      reasonAr: reason.ar,
      confidence: rand(65, 95),
    });
  }
  return alerts.sort((a, b) => a.time.localeCompare(b.time));
}

export function getHajjCountdown(): { days: number; hours: number; minutes: number; seconds: number; peakDate: string } {
  const now = new Date();
  const currentYear = now.getFullYear();
  let peakDate = new Date(currentYear, 5, 15);
  if (peakDate.getTime() < now.getTime()) {
    peakDate = new Date(currentYear + 1, 5, 15);
  }
  const diff = peakDate.getTime() - now.getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const peakDateStr = peakDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return { days, hours, minutes, seconds, peakDate: peakDateStr };
}

export const CHART_COLORS = [
  "#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444",
  "#6366f1", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
];
