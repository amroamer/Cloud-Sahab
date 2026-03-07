export interface HostCity {
  id: string;
  name: string;
  nameAr: string;
  airportCode: string;
  airportName: string;
  airportNameAr: string;
  currentCapacity: number;
  requiredCapacity: number;
  estimatedSurge: number;
  readiness: number;
  projects: InfraProject[];
  gapAnalysis: GapAnalysis;
}

export interface InfraProject {
  id: string;
  name: string;
  nameAr: string;
  status: "planned" | "in-progress" | "complete";
  startMonth: number;
  endMonth: number;
  progress: number;
}

export interface GapAnalysis {
  terminalGap: number;
  runwayGap: number;
  parkingGap: number;
  loungeGap: number;
}

export interface MatchDay {
  day: number;
  month: number;
  cityId: string;
  intensity: "low" | "medium" | "high" | "peak";
  matchLabel: string;
  matchLabelAr: string;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomStatus(): "planned" | "in-progress" | "complete" {
  const r = Math.random();
  if (r < 0.25) return "complete";
  if (r < 0.65) return "in-progress";
  return "planned";
}

export function generateFifa2034Data() {
  const hostCities: HostCity[] = [
    {
      id: "riyadh",
      name: "Riyadh",
      nameAr: "الرياض",
      airportCode: "RUH",
      airportName: "King Khalid International Airport",
      airportNameAr: "مطار الملك خالد الدولي",
      currentCapacity: rand(32, 38),
      requiredCapacity: 55,
      estimatedSurge: rand(180000, 250000),
      readiness: rand(55, 80),
      projects: [
        { id: "ruh-t5", name: "Terminal 5 Expansion", nameAr: "توسعة الصالة 5", status: randomStatus(), startMonth: 1, endMonth: 18, progress: rand(20, 90) },
        { id: "ruh-rwy", name: "New Runway 3", nameAr: "المدرج الجديد 3", status: randomStatus(), startMonth: 6, endMonth: 24, progress: rand(10, 70) },
        { id: "ruh-pkg", name: "Multi-Level Parking Complex", nameAr: "مجمع مواقف متعدد الطوابق", status: randomStatus(), startMonth: 3, endMonth: 20, progress: rand(30, 85) },
        { id: "ruh-lounge", name: "VIP Lounge Upgrade", nameAr: "ترقية صالة كبار الشخصيات", status: randomStatus(), startMonth: 12, endMonth: 22, progress: rand(15, 60) },
        { id: "ruh-sec", name: "Smart Security Gates", nameAr: "بوابات أمنية ذكية", status: randomStatus(), startMonth: 8, endMonth: 16, progress: rand(40, 95) },
      ],
      gapAnalysis: { terminalGap: rand(2, 5), runwayGap: rand(1, 2), parkingGap: rand(3000, 8000), loungeGap: rand(4, 10) },
    },
    {
      id: "jeddah",
      name: "Jeddah",
      nameAr: "جدة",
      airportCode: "JED",
      airportName: "King Abdulaziz International Airport",
      airportNameAr: "مطار الملك عبدالعزيز الدولي",
      currentCapacity: rand(28, 35),
      requiredCapacity: 48,
      estimatedSurge: rand(160000, 220000),
      readiness: rand(60, 85),
      projects: [
        { id: "jed-t2", name: "Terminal 2 Modernization", nameAr: "تحديث الصالة 2", status: randomStatus(), startMonth: 2, endMonth: 16, progress: rand(25, 80) },
        { id: "jed-taxi", name: "Taxiway Expansion", nameAr: "توسعة ممرات الإقلاع", status: randomStatus(), startMonth: 4, endMonth: 14, progress: rand(35, 90) },
        { id: "jed-bag", name: "Baggage System Upgrade", nameAr: "ترقية نظام الأمتعة", status: randomStatus(), startMonth: 6, endMonth: 18, progress: rand(20, 75) },
        { id: "jed-transit", name: "Transit Hub Expansion", nameAr: "توسعة مركز العبور", status: randomStatus(), startMonth: 1, endMonth: 20, progress: rand(15, 65) },
      ],
      gapAnalysis: { terminalGap: rand(1, 4), runwayGap: rand(0, 1), parkingGap: rand(2000, 6000), loungeGap: rand(3, 8) },
    },
    {
      id: "alkhobar",
      name: "Al Khobar / Dammam",
      nameAr: "الخبر / الدمام",
      airportCode: "DMM",
      airportName: "King Fahd International Airport",
      airportNameAr: "مطار الملك فهد الدولي",
      currentCapacity: rand(15, 22),
      requiredCapacity: 30,
      estimatedSurge: rand(90000, 140000),
      readiness: rand(45, 70),
      projects: [
        { id: "dmm-t2", name: "New Terminal Building", nameAr: "مبنى صالة جديد", status: randomStatus(), startMonth: 3, endMonth: 22, progress: rand(10, 55) },
        { id: "dmm-apron", name: "Apron Expansion", nameAr: "توسعة ساحة الطائرات", status: randomStatus(), startMonth: 5, endMonth: 15, progress: rand(30, 80) },
        { id: "dmm-access", name: "Airport Access Road", nameAr: "طريق وصول المطار", status: randomStatus(), startMonth: 1, endMonth: 12, progress: rand(50, 95) },
      ],
      gapAnalysis: { terminalGap: rand(2, 4), runwayGap: rand(1, 2), parkingGap: rand(2500, 5000), loungeGap: rand(3, 7) },
    },
    {
      id: "abha",
      name: "Abha",
      nameAr: "أبها",
      airportCode: "AHB",
      airportName: "Abha Regional Airport",
      airportNameAr: "مطار أبها الإقليمي",
      currentCapacity: rand(4, 8),
      requiredCapacity: 15,
      estimatedSurge: rand(40000, 70000),
      readiness: rand(30, 55),
      projects: [
        { id: "ahb-new", name: "New International Terminal", nameAr: "صالة دولية جديدة", status: randomStatus(), startMonth: 1, endMonth: 24, progress: rand(5, 40) },
        { id: "ahb-rwy", name: "Runway Extension", nameAr: "تمديد المدرج", status: randomStatus(), startMonth: 4, endMonth: 18, progress: rand(15, 60) },
        { id: "ahb-nav", name: "Navigation Systems Upgrade", nameAr: "ترقية أنظمة الملاحة", status: randomStatus(), startMonth: 8, endMonth: 14, progress: rand(30, 80) },
      ],
      gapAnalysis: { terminalGap: rand(3, 6), runwayGap: rand(1, 3), parkingGap: rand(1500, 4000), loungeGap: rand(5, 12) },
    },
    {
      id: "neom",
      name: "NEOM",
      nameAr: "نيوم",
      airportCode: "NUM",
      airportName: "NEOM Bay Airport",
      airportNameAr: "مطار خليج نيوم",
      currentCapacity: rand(2, 5),
      requiredCapacity: 20,
      estimatedSurge: rand(50000, 90000),
      readiness: rand(20, 45),
      projects: [
        { id: "num-main", name: "Main Terminal Construction", nameAr: "بناء الصالة الرئيسية", status: randomStatus(), startMonth: 1, endMonth: 24, progress: rand(5, 35) },
        { id: "num-rwy1", name: "Primary Runway", nameAr: "المدرج الرئيسي", status: randomStatus(), startMonth: 1, endMonth: 20, progress: rand(10, 50) },
        { id: "num-rwy2", name: "Secondary Runway", nameAr: "المدرج الثانوي", status: randomStatus(), startMonth: 6, endMonth: 24, progress: rand(0, 30) },
        { id: "num-infra", name: "Ground Transport Hub", nameAr: "مركز النقل البري", status: randomStatus(), startMonth: 8, endMonth: 24, progress: rand(5, 25) },
      ],
      gapAnalysis: { terminalGap: rand(5, 10), runwayGap: rand(2, 3), parkingGap: rand(4000, 8000), loungeGap: rand(8, 15) },
    },
  ];

  const overallReadiness = Math.round(
    hostCities.reduce((sum, c) => sum + c.readiness, 0) / hostCities.length
  );

  const matchDays: MatchDay[] = [
    { day: 15, month: 11, cityId: "riyadh", intensity: "peak", matchLabel: "Opening Match", matchLabelAr: "مباراة الافتتاح" },
    { day: 16, month: 11, cityId: "jeddah", intensity: "high", matchLabel: "Group A", matchLabelAr: "المجموعة أ" },
    { day: 17, month: 11, cityId: "alkhobar", intensity: "medium", matchLabel: "Group B", matchLabelAr: "المجموعة ب" },
    { day: 18, month: 11, cityId: "riyadh", intensity: "high", matchLabel: "Group C", matchLabelAr: "المجموعة ج" },
    { day: 19, month: 11, cityId: "neom", intensity: "medium", matchLabel: "Group D", matchLabelAr: "المجموعة د" },
    { day: 20, month: 11, cityId: "abha", intensity: "medium", matchLabel: "Group A", matchLabelAr: "المجموعة أ" },
    { day: 21, month: 11, cityId: "jeddah", intensity: "high", matchLabel: "Group B", matchLabelAr: "المجموعة ب" },
    { day: 22, month: 11, cityId: "riyadh", intensity: "high", matchLabel: "Group C", matchLabelAr: "المجموعة ج" },
    { day: 23, month: 11, cityId: "alkhobar", intensity: "medium", matchLabel: "Group D", matchLabelAr: "المجموعة د" },
    { day: 24, month: 11, cityId: "neom", intensity: "low", matchLabel: "Group A", matchLabelAr: "المجموعة أ" },
    { day: 25, month: 11, cityId: "jeddah", intensity: "high", matchLabel: "Group B", matchLabelAr: "المجموعة ب" },
    { day: 26, month: 11, cityId: "abha", intensity: "medium", matchLabel: "Group C", matchLabelAr: "المجموعة ج" },
    { day: 27, month: 11, cityId: "riyadh", intensity: "high", matchLabel: "Group D", matchLabelAr: "المجموعة د" },
    { day: 28, month: 11, cityId: "alkhobar", intensity: "medium", matchLabel: "Round of 16", matchLabelAr: "دور الـ 16" },
    { day: 29, month: 11, cityId: "jeddah", intensity: "high", matchLabel: "Round of 16", matchLabelAr: "دور الـ 16" },
    { day: 30, month: 11, cityId: "riyadh", intensity: "peak", matchLabel: "Round of 16", matchLabelAr: "دور الـ 16" },
    { day: 1, month: 12, cityId: "neom", intensity: "medium", matchLabel: "Round of 16", matchLabelAr: "دور الـ 16" },
    { day: 2, month: 12, cityId: "abha", intensity: "medium", matchLabel: "Round of 16", matchLabelAr: "دور الـ 16" },
    { day: 5, month: 12, cityId: "riyadh", intensity: "high", matchLabel: "Quarter Final", matchLabelAr: "ربع النهائي" },
    { day: 6, month: 12, cityId: "jeddah", intensity: "high", matchLabel: "Quarter Final", matchLabelAr: "ربع النهائي" },
    { day: 7, month: 12, cityId: "alkhobar", intensity: "high", matchLabel: "Quarter Final", matchLabelAr: "ربع النهائي" },
    { day: 8, month: 12, cityId: "neom", intensity: "high", matchLabel: "Quarter Final", matchLabelAr: "ربع النهائي" },
    { day: 11, month: 12, cityId: "riyadh", intensity: "peak", matchLabel: "Semi Final", matchLabelAr: "نصف النهائي" },
    { day: 12, month: 12, cityId: "jeddah", intensity: "peak", matchLabel: "Semi Final", matchLabelAr: "نصف النهائي" },
    { day: 15, month: 12, cityId: "riyadh", intensity: "peak", matchLabel: "Final", matchLabelAr: "النهائي" },
  ];

  const trafficLight = overallReadiness >= 70 ? "green" : overallReadiness >= 50 ? "amber" : "red";

  return { hostCities, overallReadiness, trafficLight, matchDays };
}

export type Fifa2034Data = ReturnType<typeof generateFifa2034Data>;
