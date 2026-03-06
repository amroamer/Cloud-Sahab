export const AIRPORTS = [
  { code: "KAIA", name: "King Abdulaziz Intl", nameAr: "مطار الملك عبدالعزيز الدولي", city: "Jeddah", cityAr: "جدة", region: "Western", type: "international", capacity: 80, passengers: 42.5, flights: 285000, movements: 312000, utilization: 85, terminals: 4, runways: 2, runwayLengths: [4000, 3800], gates: 92, gatesWithBridges: 68, gatesWithout: 24, shortParking: 12500, longParking: 8200, landArea: 105, cargoFacilities: 4, cargoTonnage: 285000, lat: 21.67, lon: 39.16 },
  { code: "KKIA", name: "King Khalid Intl", nameAr: "مطار الملك خالد الدولي", city: "Riyadh", cityAr: "الرياض", region: "Central", type: "international", capacity: 70, passengers: 35.2, flights: 248000, movements: 270000, utilization: 78, terminals: 5, runways: 2, runwayLengths: [4200, 4000], gates: 84, gatesWithBridges: 62, gatesWithout: 22, shortParking: 11000, longParking: 7500, landArea: 225, cargoFacilities: 3, cargoTonnage: 195000, lat: 24.96, lon: 46.70 },
  { code: "KFIA", name: "King Fahd Intl", nameAr: "مطار الملك فهد الدولي", city: "Dammam", cityAr: "الدمام", region: "Eastern", type: "international", capacity: 40, passengers: 14.8, flights: 95000, movements: 108000, utilization: 62, terminals: 2, runways: 2, runwayLengths: [4000, 3800], gates: 42, gatesWithBridges: 30, gatesWithout: 12, shortParking: 6500, longParking: 4200, landArea: 780, cargoFacilities: 2, cargoTonnage: 125000, lat: 26.47, lon: 49.80 },
  { code: "PMIA", name: "Prince Mohammed Intl", nameAr: "مطار الأمير محمد الدولي", city: "Madinah", cityAr: "المدينة المنورة", region: "Western", type: "international", capacity: 28, passengers: 10.2, flights: 68000, movements: 74000, utilization: 72, terminals: 2, runways: 1, runwayLengths: [3600], gates: 28, gatesWithBridges: 20, gatesWithout: 8, shortParking: 4500, longParking: 3000, landArea: 48, cargoFacilities: 1, cargoTonnage: 32000, lat: 24.55, lon: 39.70 },
  { code: "TAIA", name: "Ta'if Intl", nameAr: "مطار الطائف الدولي", city: "Ta'if", cityAr: "الطائف", region: "Western", type: "international", capacity: 12, passengers: 3.8, flights: 28000, movements: 31000, utilization: 55, terminals: 1, runways: 1, runwayLengths: [3800], gates: 12, gatesWithBridges: 8, gatesWithout: 4, shortParking: 2200, longParking: 1400, landArea: 22, cargoFacilities: 1, cargoTonnage: 8500, lat: 21.48, lon: 40.54 },
  { code: "ARNA", name: "Abha Regional", nameAr: "مطار أبها الإقليمي", city: "Abha", cityAr: "أبها", region: "Southern", type: "domestic", capacity: 8, passengers: 2.9, flights: 21000, movements: 24000, utilization: 68, terminals: 1, runways: 1, runwayLengths: [3200], gates: 8, gatesWithBridges: 4, gatesWithout: 4, shortParking: 1500, longParking: 800, landArea: 15, cargoFacilities: 1, cargoTonnage: 4200, lat: 18.24, lon: 42.66 },
  { code: "JZNA", name: "Jazan Regional", nameAr: "مطار جازان الإقليمي", city: "Jazan", cityAr: "جازان", region: "Southern", type: "domestic", capacity: 5, passengers: 1.8, flights: 14000, movements: 16000, utilization: 58, terminals: 1, runways: 1, runwayLengths: [3050], gates: 6, gatesWithBridges: 3, gatesWithout: 3, shortParking: 1100, longParking: 600, landArea: 12, cargoFacilities: 0, cargoTonnage: 1800, lat: 16.90, lon: 42.59 },
  { code: "TABS", name: "Tabuk Regional", nameAr: "مطار تبوك الإقليمي", city: "Tabuk", cityAr: "تبوك", region: "Northern", type: "domestic", capacity: 4, passengers: 1.5, flights: 11000, movements: 13000, utilization: 52, terminals: 1, runways: 1, runwayLengths: [3000], gates: 5, gatesWithBridges: 2, gatesWithout: 3, shortParking: 900, longParking: 500, landArea: 18, cargoFacilities: 0, cargoTonnage: 1200, lat: 28.37, lon: 36.63 },
  { code: "HAIL", name: "Ha'il Regional", nameAr: "مطار حائل الإقليمي", city: "Ha'il", cityAr: "حائل", region: "Northern", type: "domestic", capacity: 3, passengers: 1.1, flights: 8500, movements: 9800, utilization: 48, terminals: 1, runways: 1, runwayLengths: [3000], gates: 4, gatesWithBridges: 2, gatesWithout: 2, shortParking: 700, longParking: 400, landArea: 10, cargoFacilities: 0, cargoTonnage: 950, lat: 27.44, lon: 41.69 },
  { code: "QSMA", name: "Qassim Regional", nameAr: "مطار القصيم الإقليمي", city: "Buraidah", cityAr: "بريدة", region: "Central", type: "domestic", capacity: 4, passengers: 1.3, flights: 9500, movements: 11000, utilization: 50, terminals: 1, runways: 1, runwayLengths: [3100], gates: 5, gatesWithBridges: 2, gatesWithout: 3, shortParking: 800, longParking: 450, landArea: 14, cargoFacilities: 0, cargoTonnage: 1100, lat: 26.30, lon: 43.77 },
];

export const AIRLINES = [
  { code: "SV", name: "Saudia", nameAr: "الخطوط السعودية", type: "full-service", nationality: "Saudi", flights: 185000, passengers: 38.5, marketShare: 34.2, onTime: 82, delays: 8200, fleet: 148, avgAge: 7.2 },
  { code: "XY", name: "flynas", nameAr: "طيران ناس", type: "lcc", nationality: "Saudi", flights: 72000, passengers: 15.8, marketShare: 14.0, onTime: 79, delays: 5100, fleet: 52, avgAge: 5.1 },
  { code: "F3", name: "flyadeal", nameAr: "طيران أديل", type: "lcc", nationality: "Saudi", flights: 48000, passengers: 9.2, marketShare: 8.2, onTime: 81, delays: 3400, fleet: 35, avgAge: 3.8 },
  { code: "EK", name: "Emirates", nameAr: "طيران الإمارات", type: "full-service", nationality: "UAE", flights: 28000, passengers: 6.8, marketShare: 6.0, onTime: 88, delays: 1200, fleet: 0, avgAge: 0 },
  { code: "QR", name: "Qatar Airways", nameAr: "الخطوط القطرية", type: "full-service", nationality: "Qatar", flights: 18000, passengers: 4.2, marketShare: 3.7, onTime: 86, delays: 950, fleet: 0, avgAge: 0 },
  { code: "TK", name: "Turkish Airlines", nameAr: "الخطوط التركية", type: "full-service", nationality: "Turkey", flights: 16500, passengers: 3.9, marketShare: 3.5, onTime: 84, delays: 1050, fleet: 0, avgAge: 0 },
  { code: "MS", name: "EgyptAir", nameAr: "مصر للطيران", type: "full-service", nationality: "Egypt", flights: 14000, passengers: 3.1, marketShare: 2.8, onTime: 78, delays: 1400, fleet: 0, avgAge: 0 },
  { code: "PK", name: "PIA", nameAr: "الخطوط الباكستانية", type: "full-service", nationality: "Pakistan", flights: 11000, passengers: 2.5, marketShare: 2.2, onTime: 74, delays: 1600, fleet: 0, avgAge: 0 },
  { code: "AI", name: "Air India", nameAr: "طيران الهند", type: "full-service", nationality: "India", flights: 9500, passengers: 2.1, marketShare: 1.9, onTime: 76, delays: 1100, fleet: 0, avgAge: 0 },
  { code: "BA", name: "British Airways", nameAr: "الخطوط البريطانية", type: "full-service", nationality: "UK", flights: 7200, passengers: 1.7, marketShare: 1.5, onTime: 85, delays: 620, fleet: 0, avgAge: 0 },
];

export const MONTHLY_TRAFFIC = [
  { month: "Jan", monthAr: "يناير", passengers: 8.2, flights: 72, cargo: 68, lastYearPax: 7.5, domestic: 4.1, international: 4.1, transit: 0.8 },
  { month: "Feb", monthAr: "فبراير", passengers: 7.8, flights: 68, cargo: 65, lastYearPax: 7.1, domestic: 3.9, international: 3.9, transit: 0.7 },
  { month: "Mar", monthAr: "مارس", passengers: 9.8, flights: 82, cargo: 72, lastYearPax: 9.1, domestic: 4.8, international: 5.0, transit: 0.9 },
  { month: "Apr", monthAr: "أبريل", passengers: 10.5, flights: 88, cargo: 78, lastYearPax: 9.6, domestic: 5.0, international: 5.5, transit: 1.0 },
  { month: "May", monthAr: "مايو", passengers: 11.2, flights: 94, cargo: 82, lastYearPax: 10.2, domestic: 5.3, international: 5.9, transit: 1.1 },
  { month: "Jun", monthAr: "يونيو", passengers: 12.8, flights: 102, cargo: 88, lastYearPax: 11.5, domestic: 5.8, international: 7.0, transit: 1.3 },
  { month: "Jul", monthAr: "يوليو", passengers: 14.1, flights: 112, cargo: 92, lastYearPax: 12.8, domestic: 6.2, international: 7.9, transit: 1.5 },
  { month: "Aug", monthAr: "أغسطس", passengers: 13.5, flights: 108, cargo: 90, lastYearPax: 12.2, domestic: 6.0, international: 7.5, transit: 1.4 },
  { month: "Sep", monthAr: "سبتمبر", passengers: 11.0, flights: 92, cargo: 80, lastYearPax: 10.0, domestic: 5.2, international: 5.8, transit: 1.0 },
  { month: "Oct", monthAr: "أكتوبر", passengers: 10.2, flights: 86, cargo: 76, lastYearPax: 9.4, domestic: 4.9, international: 5.3, transit: 0.9 },
  { month: "Nov", monthAr: "نوفمبر", passengers: 9.5, flights: 80, cargo: 70, lastYearPax: 8.7, domestic: 4.5, international: 5.0, transit: 0.8 },
  { month: "Dec", monthAr: "ديسمبر", passengers: 10.8, flights: 90, cargo: 75, lastYearPax: 9.8, domestic: 5.0, international: 5.8, transit: 1.0 },
];

export const CONNECTIVITY_INDEX_TREND = [
  { year: "2018", actual: 52, target: 250 },
  { year: "2019", actual: 58, target: 250 },
  { year: "2020", actual: 35, target: 250 },
  { year: "2021", actual: 42, target: 250 },
  { year: "2022", actual: 55, target: 250 },
  { year: "2023", actual: 65, target: 250 },
  { year: "2024", actual: 74, target: 250 },
  { year: "2025", actual: 82, target: 250 },
  { year: "2026", actual: 87, target: 250 },
];

export const COUNTRIES_REACHED = 78;
export const DOMESTIC_ROUTES = 42;
export const INTERNATIONAL_ROUTES = 195;
export const TOTAL_FLEET_COMMERCIAL = 285;
export const TOTAL_FLEET_PRIVATE = 142;
export const AVG_FLEET_AGE = 6.8;

export const FLEET_BY_CATEGORY = [
  { category: "Narrow-body", categoryAr: "ضيقة البدن", count: 168, age0_5: 82, age6_10: 52, age11_15: 24, age16_20: 8, age20plus: 2 },
  { category: "Wide-body", categoryAr: "واسعة البدن", count: 72, age0_5: 28, age6_10: 22, age11_15: 14, age16_20: 6, age20plus: 2 },
  { category: "Regional", categoryAr: "إقليمية", count: 28, age0_5: 12, age6_10: 10, age11_15: 4, age16_20: 2, age20plus: 0 },
  { category: "Cargo", categoryAr: "شحن", count: 17, age0_5: 4, age6_10: 5, age11_15: 5, age16_20: 2, age20plus: 1 },
];

export const AIRCRAFT_PURCHASES = [
  { year: "2020", narrowBody: 8, wideBody: 2, regional: 1, cargo: 0, private: 5 },
  { year: "2021", narrowBody: 12, wideBody: 3, regional: 2, cargo: 1, private: 8 },
  { year: "2022", narrowBody: 18, wideBody: 5, regional: 3, cargo: 2, private: 12 },
  { year: "2023", narrowBody: 25, wideBody: 8, regional: 4, cargo: 2, private: 15 },
  { year: "2024", narrowBody: 32, wideBody: 12, regional: 5, cargo: 3, private: 18 },
  { year: "2025", narrowBody: 28, wideBody: 10, regional: 3, cargo: 2, private: 14 },
];

export const FLEET_BY_AIRLINE = [
  { airline: "Saudia", airlineAr: "الخطوط السعودية", total: 148, avgAge: 7.2, newest: "2025", oldest: "2008" },
  { airline: "flynas", airlineAr: "طيران ناس", total: 52, avgAge: 5.1, newest: "2025", oldest: "2016" },
  { airline: "flyadeal", airlineAr: "طيران أديل", total: 35, avgAge: 3.8, newest: "2025", oldest: "2019" },
  { airline: "Riyadh Air", airlineAr: "طيران الرياض", total: 22, avgAge: 0.8, newest: "2026", oldest: "2024" },
  { airline: "Other", airlineAr: "أخرى", total: 28, avgAge: 8.5, newest: "2024", oldest: "2010" },
];

export const CARGO_MONTHLY = [
  { month: "Jan", monthAr: "يناير", imports: 32, exports: 36, shipments: 68, tonnage: 48500 },
  { month: "Feb", monthAr: "فبراير", imports: 30, exports: 35, shipments: 65, tonnage: 46200 },
  { month: "Mar", monthAr: "مارس", imports: 34, exports: 38, shipments: 72, tonnage: 52100 },
  { month: "Apr", monthAr: "أبريل", imports: 36, exports: 42, shipments: 78, tonnage: 55800 },
  { month: "May", monthAr: "مايو", imports: 38, exports: 44, shipments: 82, tonnage: 58200 },
  { month: "Jun", monthAr: "يونيو", imports: 42, exports: 46, shipments: 88, tonnage: 62100 },
  { month: "Jul", monthAr: "يوليو", imports: 44, exports: 48, shipments: 92, tonnage: 65400 },
  { month: "Aug", monthAr: "أغسطس", imports: 43, exports: 47, shipments: 90, tonnage: 63800 },
  { month: "Sep", monthAr: "سبتمبر", imports: 38, exports: 42, shipments: 80, tonnage: 57200 },
  { month: "Oct", monthAr: "أكتوبر", imports: 36, exports: 40, shipments: 76, tonnage: 54500 },
  { month: "Nov", monthAr: "نوفمبر", imports: 33, exports: 37, shipments: 70, tonnage: 50100 },
  { month: "Dec", monthAr: "ديسمبر", imports: 35, exports: 40, shipments: 75, tonnage: 53600 },
];

export const CARGO_COMMODITY_SPLIT = [
  { name: "General Goods", nameAr: "بضائع عامة", value: 42 },
  { name: "Perishables", nameAr: "سلع قابلة للتلف", value: 18 },
  { name: "E-commerce", nameAr: "تجارة إلكترونية", value: 22 },
  { name: "Pharma", nameAr: "أدوية", value: 10 },
  { name: "Dangerous Goods", nameAr: "بضائع خطرة", value: 8 },
];

export const FINANCIAL_QUARTERLY = [
  { quarter: "Q1 2025", quarterAr: "الربع الأول ٢٠٢٥", ticketRevenue: 12.4, opRevenue: 8.2, opExpenses: 6.8, investment: 4.5, maintenance: 1.2, bopCredits: 3.8, bopDebits: 2.1 },
  { quarter: "Q2 2025", quarterAr: "الربع الثاني ٢٠٢٥", ticketRevenue: 14.8, opRevenue: 9.5, opExpenses: 7.2, investment: 5.2, maintenance: 1.4, bopCredits: 4.2, bopDebits: 2.3 },
  { quarter: "Q3 2025", quarterAr: "الربع الثالث ٢٠٢٥", ticketRevenue: 16.2, opRevenue: 10.8, opExpenses: 7.8, investment: 6.1, maintenance: 1.5, bopCredits: 4.8, bopDebits: 2.5 },
  { quarter: "Q4 2025", quarterAr: "الربع الرابع ٢٠٢٥", ticketRevenue: 13.5, opRevenue: 9.0, opExpenses: 7.0, investment: 5.8, maintenance: 1.3, bopCredits: 4.0, bopDebits: 2.2 },
  { quarter: "Q1 2026", quarterAr: "الربع الأول ٢٠٢٦", ticketRevenue: 13.8, opRevenue: 9.1, opExpenses: 7.1, investment: 5.0, maintenance: 1.3, bopCredits: 4.1, bopDebits: 2.2 },
];

export const CAPITAL_VALUES = [
  { year: "2022", value: 145 },
  { year: "2023", value: 162 },
  { year: "2024", value: 185 },
  { year: "2025", value: 208 },
  { year: "2026", value: 225 },
];

export const BOP_COMPONENTS = [
  { name: "Ticket Sales to Non-Residents", nameAr: "مبيعات التذاكر لغير المقيمين", value: 4.1, type: "credit" as const },
  { name: "Cargo Transport Receipts", nameAr: "إيرادات النقل الجوي للبضائع", value: 1.8, type: "credit" as const },
  { name: "Airport Service Fees Collected", nameAr: "رسوم خدمات المطار المحصلة", value: 2.4, type: "credit" as const },
  { name: "Aircraft Leasing Revenue", nameAr: "إيرادات تأجير الطائرات", value: 0.9, type: "credit" as const },
  { name: "Maintenance & Repair Receipts", nameAr: "إيرادات الصيانة والإصلاح", value: 0.6, type: "credit" as const },
  { name: "Ticket Purchases from Non-Residents", nameAr: "شراء التذاكر من غير المقيمين", value: -2.2, type: "debit" as const },
  { name: "Airport Fees Paid Abroad", nameAr: "رسوم المطارات المدفوعة بالخارج", value: -1.5, type: "debit" as const },
  { name: "Aircraft Lease Payments", nameAr: "مدفوعات تأجير الطائرات", value: -1.2, type: "debit" as const },
];

export const BOP_QUARTERLY = [
  { quarter: "Q1 2025", quarterAr: "الربع الأول ٢٠٢٥", credits: 9.2, debits: 4.5, net: 4.7 },
  { quarter: "Q2 2025", quarterAr: "الربع الثاني ٢٠٢٥", credits: 10.8, debits: 5.1, net: 5.7 },
  { quarter: "Q3 2025", quarterAr: "الربع الثالث ٢٠٢٥", credits: 11.5, debits: 5.4, net: 6.1 },
  { quarter: "Q4 2025", quarterAr: "الربع الرابع ٢٠٢٥", credits: 10.2, debits: 4.8, net: 5.4 },
  { quarter: "Q1 2026", quarterAr: "الربع الأول ٢٠٢٦", credits: 9.8, debits: 4.9, net: 4.9 },
];

export const PASSENGER_BY_CLASS = [
  { name: "Economy", nameAr: "اقتصادية", value: 82, passengers: 80.8 },
  { name: "Business", nameAr: "رجال أعمال", value: 14, passengers: 13.8 },
  { name: "First", nameAr: "درجة أولى", value: 4, passengers: 3.9 },
];

export const PASSENGER_BY_NATIONALITY = [
  { name: "Saudi", nameAr: "سعودي", passengers: 38.2 },
  { name: "Indian", nameAr: "هندي", passengers: 12.5 },
  { name: "Egyptian", nameAr: "مصري", passengers: 8.8 },
  { name: "Pakistani", nameAr: "باكستاني", passengers: 7.2 },
  { name: "Bangladeshi", nameAr: "بنجلاديشي", passengers: 5.1 },
  { name: "Indonesian", nameAr: "إندونيسي", passengers: 4.8 },
  { name: "Yemeni", nameAr: "يمني", passengers: 3.5 },
  { name: "Jordanian", nameAr: "أردني", passengers: 3.2 },
  { name: "Turkish", nameAr: "تركي", passengers: 2.8 },
  { name: "Other", nameAr: "أخرى", passengers: 12.4 },
];

export const DIGITAL_MONTHLY = [
  { month: "Jan", monthAr: "يناير", eCheckins: 4.2, eTickets: 6.8, complaints: 12500, digitalComplaints: 8200 },
  { month: "Feb", monthAr: "فبراير", eCheckins: 4.0, eTickets: 6.5, complaints: 11800, digitalComplaints: 7900 },
  { month: "Mar", monthAr: "مارس", eCheckins: 5.1, eTickets: 8.2, complaints: 14200, digitalComplaints: 9800 },
  { month: "Apr", monthAr: "أبريل", eCheckins: 5.5, eTickets: 8.8, complaints: 15100, digitalComplaints: 10500 },
  { month: "May", monthAr: "مايو", eCheckins: 5.9, eTickets: 9.4, complaints: 16000, digitalComplaints: 11200 },
  { month: "Jun", monthAr: "يونيو", eCheckins: 6.8, eTickets: 10.8, complaints: 18500, digitalComplaints: 13200 },
  { month: "Jul", monthAr: "يوليو", eCheckins: 7.5, eTickets: 11.9, complaints: 20200, digitalComplaints: 14800 },
  { month: "Aug", monthAr: "أغسطس", eCheckins: 7.2, eTickets: 11.4, complaints: 19500, digitalComplaints: 14200 },
  { month: "Sep", monthAr: "سبتمبر", eCheckins: 5.8, eTickets: 9.2, complaints: 15800, digitalComplaints: 11000 },
  { month: "Oct", monthAr: "أكتوبر", eCheckins: 5.4, eTickets: 8.6, complaints: 14800, digitalComplaints: 10200 },
  { month: "Nov", monthAr: "نوفمبر", eCheckins: 5.0, eTickets: 8.0, complaints: 13500, digitalComplaints: 9400 },
  { month: "Dec", monthAr: "ديسمبر", eCheckins: 5.7, eTickets: 9.1, complaints: 15000, digitalComplaints: 10600 },
];

export const COMPLAINT_CATEGORIES = [
  { name: "Delays", nameAr: "تأخيرات", value: 32 },
  { name: "Baggage", nameAr: "أمتعة", value: 24 },
  { name: "Service", nameAr: "خدمة", value: 22 },
  { name: "Ticketing", nameAr: "تذاكر", value: 14 },
  { name: "Other", nameAr: "أخرى", value: 8 },
];

export const COMPLAINT_CHANNELS = [
  { name: "Mobile App", nameAr: "تطبيق الجوال", value: 38 },
  { name: "Website", nameAr: "الموقع الإلكتروني", value: 28 },
  { name: "Call Center", nameAr: "مركز الاتصال", value: 22 },
  { name: "Social Media", nameAr: "وسائل التواصل", value: 12 },
];

export const SKYTRAX_RANKINGS = [
  { entity: "Saudia", entityAr: "الخطوط السعودية", type: "airline" as const, rank2024: 28, rank2025: 24, rank2026: 22, stars: 4 },
  { entity: "flynas", entityAr: "طيران ناس", type: "airline" as const, rank2024: 65, rank2025: 58, rank2026: 52, stars: 3 },
  { entity: "KAIA Jeddah", entityAr: "مطار جدة", type: "airport" as const, rank2024: 42, rank2025: 38, rank2026: 35, stars: 4 },
  { entity: "KKIA Riyadh", entityAr: "مطار الرياض", type: "airport" as const, rank2024: 55, rank2025: 48, rank2026: 42, stars: 4 },
];

export const SUSTAINABILITY_QUARTERLY = [
  { quarter: "Q1 2025", quarterAr: "الربع الأول ٢٠٢٥", co2: 4.2, fuel: 1.65, co2PerPaxKm: 89, fuelPerAsk: 3.2 },
  { quarter: "Q2 2025", quarterAr: "الربع الثاني ٢٠٢٥", co2: 4.8, fuel: 1.88, co2PerPaxKm: 86, fuelPerAsk: 3.1 },
  { quarter: "Q3 2025", quarterAr: "الربع الثالث ٢٠٢٥", co2: 5.2, fuel: 2.05, co2PerPaxKm: 84, fuelPerAsk: 3.0 },
  { quarter: "Q4 2025", quarterAr: "الربع الرابع ٢٠٢٥", co2: 4.5, fuel: 1.78, co2PerPaxKm: 85, fuelPerAsk: 3.05 },
  { quarter: "Q1 2026", quarterAr: "الربع الأول ٢٠٢٦", co2: 4.3, fuel: 1.70, co2PerPaxKm: 83, fuelPerAsk: 2.95 },
];

export const PRIVATE_FLIGHTS_MONTHLY = [
  { month: "Jan", monthAr: "يناير", domestic: 280, international: 190 },
  { month: "Feb", monthAr: "فبراير", domestic: 260, international: 175 },
  { month: "Mar", monthAr: "مارس", domestic: 320, international: 220 },
  { month: "Apr", monthAr: "أبريل", domestic: 350, international: 240 },
  { month: "May", monthAr: "مايو", domestic: 380, international: 260 },
  { month: "Jun", monthAr: "يونيو", domestic: 420, international: 310 },
  { month: "Jul", monthAr: "يوليو", domestic: 460, international: 340 },
  { month: "Aug", monthAr: "أغسطس", domestic: 440, international: 320 },
  { month: "Sep", monthAr: "سبتمبر", domestic: 360, international: 250 },
  { month: "Oct", monthAr: "أكتوبر", domestic: 340, international: 230 },
  { month: "Nov", monthAr: "نوفمبر", domestic: 300, international: 200 },
  { month: "Dec", monthAr: "ديسمبر", domestic: 370, international: 260 },
];

export const AIRSPACE_AIRLINES = [
  { airline: "Emirates", airlineAr: "طيران الإمارات", country: "UAE", countryAr: "الإمارات", movements: 28000, overflight: true },
  { airline: "Qatar Airways", airlineAr: "الخطوط القطرية", country: "Qatar", countryAr: "قطر", movements: 18000, overflight: true },
  { airline: "Turkish Airlines", airlineAr: "الخطوط التركية", country: "Turkey", countryAr: "تركيا", movements: 16500, overflight: true },
  { airline: "EgyptAir", airlineAr: "مصر للطيران", country: "Egypt", countryAr: "مصر", movements: 14000, overflight: false },
  { airline: "Etihad", airlineAr: "الاتحاد", country: "UAE", countryAr: "الإمارات", movements: 12000, overflight: true },
  { airline: "PIA", airlineAr: "الباكستانية", country: "Pakistan", countryAr: "باكستان", movements: 11000, overflight: false },
  { airline: "Air India", airlineAr: "طيران الهند", country: "India", countryAr: "الهند", movements: 9500, overflight: false },
  { airline: "Gulf Air", airlineAr: "طيران الخليج", country: "Bahrain", countryAr: "البحرين", movements: 8200, overflight: true },
];

export const COST_PER_CONTAINER = [
  { quarter: "Q1 2025", quarterAr: "الربع الأول ٢٠٢٥", domestic: 2850, international: 5200 },
  { quarter: "Q2 2025", quarterAr: "الربع الثاني ٢٠٢٥", domestic: 2780, international: 5050 },
  { quarter: "Q3 2025", quarterAr: "الربع الثالث ٢٠٢٥", domestic: 2820, international: 5120 },
  { quarter: "Q4 2025", quarterAr: "الربع الرابع ٢٠٢٥", domestic: 2750, international: 4980 },
  { quarter: "Q1 2026", quarterAr: "الربع الأول ٢٠٢٦", domestic: 2700, international: 4900 },
];

export const SHIPMENTS_BY_MODE = [
  { name: "Air", nameAr: "جوي", value: 852, unit: "K" },
  { name: "Sea", nameAr: "بحري", value: 4200, unit: "K" },
  { name: "Land", nameAr: "بري", value: 8500, unit: "K" },
  { name: "Rail", nameAr: "سكك حديد", value: 320, unit: "K" },
];

export const CHART_COLORS = [
  "hsl(210, 85%, 42%)",
  "hsl(185, 75%, 38%)",
  "hsl(28, 85%, 48%)",
  "hsl(280, 70%, 42%)",
  "hsl(340, 75%, 45%)",
  "hsl(160, 70%, 38%)",
  "hsl(45, 85%, 48%)",
  "hsl(0, 70%, 45%)",
  "hsl(220, 60%, 55%)",
  "hsl(130, 60%, 40%)",
];
