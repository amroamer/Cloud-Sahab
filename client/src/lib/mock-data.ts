export const AIRPORTS = [
  { code: "KAIA", name: "King Abdulaziz Intl", nameAr: "مطار الملك عبدالعزيز الدولي", city: "Jeddah", cityAr: "جدة", region: "Western", type: "international", capacity: 80, passengers: 47.0, flights: 312000, movements: 342000, utilization: 88, terminals: 4, runways: 2, runwayLengths: [4000, 3800], gates: 92, gatesWithBridges: 68, gatesWithout: 24, shortParking: 12500, longParking: 8200, landArea: 105, cargoFacilities: 4, cargoTonnage: 480000, lat: 21.67, lon: 39.16 },
  { code: "KKIA", name: "King Khalid Intl", nameAr: "مطار الملك خالد الدولي", city: "Riyadh", cityAr: "الرياض", region: "Central", type: "international", capacity: 70, passengers: 39.0, flights: 272000, movements: 298000, utilization: 82, terminals: 5, runways: 2, runwayLengths: [4200, 4000], gates: 84, gatesWithBridges: 62, gatesWithout: 22, shortParking: 11000, longParking: 7500, landArea: 225, cargoFacilities: 3, cargoTonnage: 340000, lat: 24.96, lon: 46.70 },
  { code: "KFIA", name: "King Fahd Intl", nameAr: "مطار الملك فهد الدولي", city: "Dammam", cityAr: "الدمام", region: "Eastern", type: "international", capacity: 40, passengers: 16.5, flights: 105000, movements: 118000, utilization: 65, terminals: 2, runways: 2, runwayLengths: [4000, 3800], gates: 42, gatesWithBridges: 30, gatesWithout: 12, shortParking: 6500, longParking: 4200, landArea: 780, cargoFacilities: 2, cargoTonnage: 198000, lat: 26.47, lon: 49.80 },
  { code: "PMIA", name: "Prince Mohammed Intl", nameAr: "مطار الأمير محمد الدولي", city: "Madinah", cityAr: "المدينة المنورة", region: "Western", type: "international", capacity: 28, passengers: 11.2, flights: 75000, movements: 82000, utilization: 75, terminals: 2, runways: 1, runwayLengths: [3600], gates: 28, gatesWithBridges: 20, gatesWithout: 8, shortParking: 4500, longParking: 3000, landArea: 48, cargoFacilities: 1, cargoTonnage: 56000, lat: 24.55, lon: 39.70 },
  { code: "TAIA", name: "Ta'if Intl", nameAr: "مطار الطائف الدولي", city: "Ta'if", cityAr: "الطائف", region: "Western", type: "international", capacity: 12, passengers: 4.2, flights: 31000, movements: 34000, utilization: 58, terminals: 1, runways: 1, runwayLengths: [3800], gates: 12, gatesWithBridges: 8, gatesWithout: 4, shortParking: 2200, longParking: 1400, landArea: 22, cargoFacilities: 1, cargoTonnage: 15200, lat: 21.48, lon: 40.54 },
  { code: "ARNA", name: "Abha Regional", nameAr: "مطار أبها الإقليمي", city: "Abha", cityAr: "أبها", region: "Southern", type: "regional", capacity: 8, passengers: 3.2, flights: 23000, movements: 26000, utilization: 70, terminals: 1, runways: 1, runwayLengths: [3200], gates: 8, gatesWithBridges: 4, gatesWithout: 4, shortParking: 1500, longParking: 800, landArea: 15, cargoFacilities: 1, cargoTonnage: 7500, lat: 18.24, lon: 42.66 },
  { code: "JZNA", name: "Jazan Regional", nameAr: "مطار جازان الإقليمي", city: "Jazan", cityAr: "جازان", region: "Southern", type: "regional", capacity: 5, passengers: 2.0, flights: 15500, movements: 17500, utilization: 62, terminals: 1, runways: 1, runwayLengths: [3050], gates: 6, gatesWithBridges: 3, gatesWithout: 3, shortParking: 1100, longParking: 600, landArea: 12, cargoFacilities: 0, cargoTonnage: 3200, lat: 16.90, lon: 42.59 },
  { code: "TABS", name: "Tabuk Regional", nameAr: "مطار تبوك الإقليمي", city: "Tabuk", cityAr: "تبوك", region: "Northern", type: "regional", capacity: 4, passengers: 1.7, flights: 12200, movements: 14000, utilization: 55, terminals: 1, runways: 1, runwayLengths: [3000], gates: 5, gatesWithBridges: 2, gatesWithout: 3, shortParking: 900, longParking: 500, landArea: 18, cargoFacilities: 0, cargoTonnage: 2100, lat: 28.37, lon: 36.63 },
  { code: "HAIL", name: "Ha'il Domestic", nameAr: "مطار حائل المحلي", city: "Ha'il", cityAr: "حائل", region: "Northern", type: "domestic", capacity: 3, passengers: 1.2, flights: 9400, movements: 10800, utilization: 50, terminals: 1, runways: 1, runwayLengths: [3000], gates: 4, gatesWithBridges: 2, gatesWithout: 2, shortParking: 700, longParking: 400, landArea: 10, cargoFacilities: 0, cargoTonnage: 1650, lat: 27.44, lon: 41.69 },
  { code: "QSMA", name: "Qassim Domestic", nameAr: "مطار القصيم المحلي", city: "Buraidah", cityAr: "بريدة", region: "Central", type: "domestic", capacity: 4, passengers: 1.5, flights: 10500, movements: 12100, utilization: 52, terminals: 1, runways: 1, runwayLengths: [3100], gates: 5, gatesWithBridges: 2, gatesWithout: 3, shortParking: 800, longParking: 450, landArea: 14, cargoFacilities: 0, cargoTonnage: 1950, lat: 26.30, lon: 43.77 },
];

export const AIRLINES = [
  { code: "SV", name: "Saudia", nameAr: "الخطوط السعودية", type: "full-service", nationality: "Saudi", flights: 192560, passengers: 43.8, marketShare: 34.2, onTime: 89, delays: 10800, fleet: 167, avgAge: 7.2 },
  { code: "XY", name: "flynas", nameAr: "طيران ناس", type: "lcc", nationality: "Saudi", flights: 82000, passengers: 17.9, marketShare: 14.0, onTime: 81, delays: 5800, fleet: 71, avgAge: 5.1 },
  { code: "F3", name: "flyadeal", nameAr: "طيران أديل", type: "lcc", nationality: "Saudi", flights: 55000, passengers: 10.5, marketShare: 8.2, onTime: 83, delays: 3600, fleet: 45, avgAge: 3.8 },
  { code: "EK", name: "Emirates", nameAr: "طيران الإمارات", type: "full-service", nationality: "UAE", flights: 31000, passengers: 7.7, marketShare: 6.0, onTime: 88, delays: 1350, fleet: 0, avgAge: 0 },
  { code: "QR", name: "Qatar Airways", nameAr: "الخطوط القطرية", type: "full-service", nationality: "Qatar", flights: 20000, passengers: 4.7, marketShare: 3.7, onTime: 86, delays: 1050, fleet: 0, avgAge: 0 },
  { code: "TK", name: "Turkish Airlines", nameAr: "الخطوط التركية", type: "full-service", nationality: "Turkey", flights: 18500, passengers: 4.5, marketShare: 3.5, onTime: 84, delays: 1150, fleet: 0, avgAge: 0 },
  { code: "MS", name: "EgyptAir", nameAr: "مصر للطيران", type: "full-service", nationality: "Egypt", flights: 15500, passengers: 3.6, marketShare: 2.8, onTime: 78, delays: 1550, fleet: 0, avgAge: 0 },
  { code: "PK", name: "PIA", nameAr: "الخطوط الباكستانية", type: "full-service", nationality: "Pakistan", flights: 12200, passengers: 2.8, marketShare: 2.2, onTime: 74, delays: 1750, fleet: 0, avgAge: 0 },
  { code: "AI", name: "Air India", nameAr: "طيران الهند", type: "full-service", nationality: "India", flights: 10500, passengers: 2.4, marketShare: 1.9, onTime: 76, delays: 1200, fleet: 0, avgAge: 0 },
  { code: "BA", name: "British Airways", nameAr: "الخطوط البريطانية", type: "full-service", nationality: "UK", flights: 8000, passengers: 1.9, marketShare: 1.5, onTime: 85, delays: 680, fleet: 0, avgAge: 0 },
];

export const MONTHLY_TRAFFIC = [
  { month: "Jan", monthAr: "يناير", passengers: 9.0, flights: 72, cargo: 88, lastYearPax: 8.2, domestic: 4.1, international: 4.9, transit: 0.9 },
  { month: "Feb", monthAr: "فبراير", passengers: 8.5, flights: 68, cargo: 84, lastYearPax: 7.8, domestic: 3.9, international: 4.6, transit: 0.8 },
  { month: "Mar", monthAr: "مارس", passengers: 11.2, flights: 80, cargo: 95, lastYearPax: 10.2, domestic: 5.1, international: 6.1, transit: 1.0 },
  { month: "Apr", monthAr: "أبريل", passengers: 11.5, flights: 82, cargo: 101, lastYearPax: 10.5, domestic: 5.2, international: 6.3, transit: 1.1 },
  { month: "May", monthAr: "مايو", passengers: 11.8, flights: 82, cargo: 106, lastYearPax: 10.8, domestic: 5.4, international: 6.4, transit: 1.2 },
  { month: "Jun", monthAr: "يونيو", passengers: 13.4, flights: 88, cargo: 113, lastYearPax: 12.2, domestic: 5.9, international: 7.5, transit: 1.4 },
  { month: "Jul", monthAr: "يوليو", passengers: 14.8, flights: 94, cargo: 119, lastYearPax: 13.5, domestic: 6.5, international: 8.3, transit: 1.6 },
  { month: "Aug", monthAr: "أغسطس", passengers: 14.0, flights: 90, cargo: 116, lastYearPax: 12.8, domestic: 6.2, international: 7.8, transit: 1.5 },
  { month: "Sep", monthAr: "سبتمبر", passengers: 11.5, flights: 80, cargo: 104, lastYearPax: 10.5, domestic: 5.2, international: 6.3, transit: 1.0 },
  { month: "Oct", monthAr: "أكتوبر", passengers: 11.0, flights: 76, cargo: 99, lastYearPax: 10.0, domestic: 5.0, international: 6.0, transit: 1.0 },
  { month: "Nov", monthAr: "نوفمبر", passengers: 10.0, flights: 70, cargo: 91, lastYearPax: 9.2, domestic: 4.6, international: 5.4, transit: 0.8 },
  { month: "Dec", monthAr: "ديسمبر", passengers: 13.3, flights: 82, cargo: 98, lastYearPax: 12.3, domestic: 6.0, international: 7.3, transit: 1.2 },
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

export const COUNTRIES_REACHED = 170;
export const DOMESTIC_ROUTES = 42;
export const INTERNATIONAL_ROUTES = 195;
export const TOTAL_FLEET_COMMERCIAL = 284;
export const TOTAL_FLEET_PRIVATE = 142;
export const AVG_FLEET_AGE = 6.8;

export const FLEET_BY_CATEGORY = [
  { category: "Narrow-body", categoryAr: "ضيقة البدن", count: 156, age0_5: 76, age6_10: 48, age11_15: 22, age16_20: 8, age20plus: 2 },
  { category: "Wide-body", categoryAr: "واسعة البدن", count: 108, age0_5: 42, age6_10: 34, age11_15: 20, age16_20: 8, age20plus: 4 },
  { category: "Regional", categoryAr: "إقليمية", count: 12, age0_5: 6, age6_10: 4, age11_15: 2, age16_20: 0, age20plus: 0 },
  { category: "Cargo", categoryAr: "شحن", count: 8, age0_5: 2, age6_10: 3, age11_15: 2, age16_20: 1, age20plus: 0 },
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
  { airline: "Saudia", airlineAr: "الخطوط السعودية", total: 167, avgAge: 7.2, newest: "2025", oldest: "2008" },
  { airline: "flynas", airlineAr: "طيران ناس", total: 71, avgAge: 5.1, newest: "2025", oldest: "2016" },
  { airline: "flyadeal", airlineAr: "طيران أديل", total: 45, avgAge: 3.8, newest: "2025", oldest: "2019" },
  { airline: "Riyadh Air", airlineAr: "طيران الرياض", total: 1, avgAge: 0.5, newest: "2025", oldest: "2025" },
];

export const CARGO_MONTHLY = [
  { month: "Jan", monthAr: "يناير", imports: 48, exports: 54, shipments: 102, tonnage: 98000 },
  { month: "Feb", monthAr: "فبراير", imports: 45, exports: 52, shipments: 97, tonnage: 93500 },
  { month: "Mar", monthAr: "مارس", imports: 52, exports: 58, shipments: 110, tonnage: 105500 },
  { month: "Apr", monthAr: "أبريل", imports: 55, exports: 63, shipments: 118, tonnage: 112800 },
  { month: "May", monthAr: "مايو", imports: 58, exports: 66, shipments: 124, tonnage: 117700 },
  { month: "Jun", monthAr: "يونيو", imports: 64, exports: 70, shipments: 134, tonnage: 125500 },
  { month: "Jul", monthAr: "يوليو", imports: 67, exports: 73, shipments: 140, tonnage: 132200 },
  { month: "Aug", monthAr: "أغسطس", imports: 65, exports: 71, shipments: 136, tonnage: 129000 },
  { month: "Sep", monthAr: "سبتمبر", imports: 58, exports: 63, shipments: 121, tonnage: 115700 },
  { month: "Oct", monthAr: "أكتوبر", imports: 55, exports: 60, shipments: 115, tonnage: 110200 },
  { month: "Nov", monthAr: "نوفمبر", imports: 50, exports: 56, shipments: 106, tonnage: 101300 },
  { month: "Dec", monthAr: "ديسمبر", imports: 53, exports: 60, shipments: 113, tonnage: 108400 },
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
  { name: "Economy", nameAr: "اقتصادية", value: 82, passengers: 104.96 },
  { name: "Business", nameAr: "رجال أعمال", value: 14, passengers: 17.92 },
  { name: "First", nameAr: "درجة أولى", value: 4, passengers: 5.12 },
];

export const PASSENGER_BY_NATIONALITY = [
  { name: "Saudi", nameAr: "سعودي", passengers: 42.2 },
  { name: "Indian", nameAr: "هندي", passengers: 14.1 },
  { name: "Egyptian", nameAr: "مصري", passengers: 10.5 },
  { name: "Pakistani", nameAr: "باكستاني", passengers: 8.6 },
  { name: "Bangladeshi", nameAr: "بنجلاديشي", passengers: 6.1 },
  { name: "Indonesian", nameAr: "إندونيسي", passengers: 5.8 },
  { name: "Yemeni", nameAr: "يمني", passengers: 4.2 },
  { name: "Jordanian", nameAr: "أردني", passengers: 3.8 },
  { name: "Turkish", nameAr: "تركي", passengers: 3.4 },
  { name: "Other", nameAr: "أخرى", passengers: 29.3 },
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
  { airline: "Emirates", airlineAr: "طيران الإمارات", country: "UAE", countryAr: "الإمارات", movements: 31000, overflight: true },
  { airline: "Qatar Airways", airlineAr: "الخطوط القطرية", country: "Qatar", countryAr: "قطر", movements: 20000, overflight: true },
  { airline: "Turkish Airlines", airlineAr: "الخطوط التركية", country: "Turkey", countryAr: "تركيا", movements: 18500, overflight: true },
  { airline: "EgyptAir", airlineAr: "مصر للطيران", country: "Egypt", countryAr: "مصر", movements: 15500, overflight: false },
  { airline: "Etihad", airlineAr: "الاتحاد", country: "UAE", countryAr: "الإمارات", movements: 13500, overflight: true },
  { airline: "PIA", airlineAr: "الباكستانية", country: "Pakistan", countryAr: "باكستان", movements: 12200, overflight: false },
  { airline: "Air India", airlineAr: "طيران الهند", country: "India", countryAr: "الهند", movements: 10500, overflight: false },
  { airline: "Gulf Air", airlineAr: "طيران الخليج", country: "Bahrain", countryAr: "البحرين", movements: 9200, overflight: true },
];

export const COST_PER_CONTAINER = [
  { quarter: "Q1 2025", quarterAr: "الربع الأول ٢٠٢٥", domestic: 2850, international: 5200 },
  { quarter: "Q2 2025", quarterAr: "الربع الثاني ٢٠٢٥", domestic: 2780, international: 5050 },
  { quarter: "Q3 2025", quarterAr: "الربع الثالث ٢٠٢٥", domestic: 2820, international: 5120 },
  { quarter: "Q4 2025", quarterAr: "الربع الرابع ٢٠٢٥", domestic: 2750, international: 4980 },
  { quarter: "Q1 2026", quarterAr: "الربع الأول ٢٠٢٦", domestic: 2700, international: 4900 },
];

export const SHIPMENTS_BY_MODE = [
  { name: "Air", nameAr: "جوي", value: 1200, unit: "K" },
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
