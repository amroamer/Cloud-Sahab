export type SeasonType = "hajj" | "summer" | "ramadan" | "nationalDay" | "low" | "normal";

export interface SeasonEvent {
  name: string;
  nameAr: string;
  startDay: number;
  endDay: number;
  month: number;
  color: string;
  type: string;
}

export interface MonthSummary {
  month: number;
  name: string;
  nameAr: string;
  expectedTraffic: number;
  actualTraffic: number;
  season: SeasonType;
}

export interface DayData {
  day: number;
  month: number;
  season: SeasonType;
  trafficLevel: number;
  events: string[];
}

export const SEASON_COLORS: Record<SeasonType, string> = {
  hajj: "#ef4444",
  summer: "#f97316",
  ramadan: "#a855f7",
  nationalDay: "#22c55e",
  low: "#3b82f6",
  normal: "#94a3b8",
};

export const SEASON_LABELS: Record<SeasonType, { en: string; ar: string }> = {
  hajj: { en: "Hajj Peak", ar: "ذروة الحج" },
  summer: { en: "Summer Peak", ar: "ذروة الصيف" },
  ramadan: { en: "Ramadan", ar: "رمضان" },
  nationalDay: { en: "National Day", ar: "اليوم الوطني" },
  low: { en: "Low Season", ar: "موسم منخفض" },
  normal: { en: "Normal", ar: "عادي" },
};

export const MONTH_NAMES = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

export const CALENDAR_EVENTS: SeasonEvent[] = [
  { name: "Eid Al-Fitr", nameAr: "عيد الفطر", startDay: 10, endDay: 14, month: 3, color: "#a855f7", type: "eid" },
  { name: "Ramadan Start", nameAr: "بداية رمضان", startDay: 1, endDay: 30, month: 2, color: "#a855f7", type: "ramadan" },
  { name: "Eid Al-Adha", nameAr: "عيد الأضحى", startDay: 15, endDay: 19, month: 5, color: "#ef4444", type: "eid" },
  { name: "Hajj Season", nameAr: "موسم الحج", startDay: 5, endDay: 20, month: 5, color: "#ef4444", type: "hajj" },
  { name: "Riyadh Season", nameAr: "موسم الرياض", startDay: 15, endDay: 30, month: 9, color: "#f59e0b", type: "entertainment" },
  { name: "Riyadh Season", nameAr: "موسم الرياض", startDay: 1, endDay: 28, month: 1, color: "#f59e0b", type: "entertainment" },
  { name: "Jeddah Season", nameAr: "موسم جدة", startDay: 1, endDay: 30, month: 5, color: "#06b6d4", type: "entertainment" },
  { name: "Jeddah Season", nameAr: "موسم جدة", startDay: 1, endDay: 31, month: 6, color: "#06b6d4", type: "entertainment" },
  { name: "FIFA Qualifier", nameAr: "تصفيات فيفا", startDay: 10, endDay: 12, month: 2, color: "#ec4899", type: "fifa" },
  { name: "FIFA Qualifier", nameAr: "تصفيات فيفا", startDay: 5, endDay: 7, month: 8, color: "#ec4899", type: "fifa" },
  { name: "NEOM Event", nameAr: "فعالية نيوم", startDay: 15, endDay: 18, month: 3, color: "#14b8a6", type: "neom" },
  { name: "NEOM Event", nameAr: "فعالية نيوم", startDay: 10, endDay: 13, month: 10, color: "#14b8a6", type: "neom" },
  { name: "National Day", nameAr: "اليوم الوطني", startDay: 21, endDay: 25, month: 8, color: "#22c55e", type: "nationalDay" },
  { name: "Summer Vacation", nameAr: "الإجازة الصيفية", startDay: 1, endDay: 31, month: 6, color: "#f97316", type: "summer" },
  { name: "Summer Vacation", nameAr: "الإجازة الصيفية", startDay: 1, endDay: 31, month: 7, color: "#f97316", type: "summer" },
];

function getSeasonForMonth(month: number): SeasonType {
  if (month === 5) return "hajj";
  if (month === 6 || month === 7) return "summer";
  if (month === 2) return "ramadan";
  if (month === 8) return "nationalDay";
  if (month === 0 || month === 10 || month === 11) return "low";
  return "normal";
}

function getDaysInMonth(month: number): number {
  return new Date(2025, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number): number {
  return new Date(2025, month, 1).getDay();
}

export function generateCalendarData(): { months: DayData[][]; summaries: MonthSummary[] } {
  const months: DayData[][] = [];
  const summaries: MonthSummary[] = [];

  for (let m = 0; m < 12; m++) {
    const daysInMonth = getDaysInMonth(m);
    const season = getSeasonForMonth(m);
    const days: DayData[] = [];

    const baseTraffic = season === "hajj" ? 85 : season === "summer" ? 75 : season === "ramadan" ? 70 : season === "nationalDay" ? 65 : season === "low" ? 35 : 50;
    let totalExpected = 0;
    let totalActual = 0;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEvents: string[] = [];
      let daySeason = season;

      for (const evt of CALENDAR_EVENTS) {
        if (evt.month === m && d >= evt.startDay && d <= evt.endDay) {
          dayEvents.push(evt.name);
          if (evt.type === "hajj") daySeason = "hajj";
          else if (evt.type === "ramadan" && daySeason === "normal") daySeason = "ramadan";
          else if (evt.type === "nationalDay") daySeason = "nationalDay";
        }
      }

      const trafficLevel = baseTraffic + Math.floor(Math.random() * 20) - 10 + (dayEvents.length > 0 ? 10 : 0);
      totalExpected += baseTraffic + 5;
      totalActual += trafficLevel;

      days.push({ day: d, month: m, season: daySeason, trafficLevel: Math.min(100, Math.max(0, trafficLevel)), events: dayEvents });
    }

    months.push(days);
    summaries.push({
      month: m,
      name: MONTH_NAMES.en[m],
      nameAr: MONTH_NAMES.ar[m],
      expectedTraffic: Math.round(totalExpected * 1200),
      actualTraffic: Math.round(totalActual * 1200),
      season,
    });
  }

  return { months, summaries };
}

export { getFirstDayOfMonth, getDaysInMonth };
