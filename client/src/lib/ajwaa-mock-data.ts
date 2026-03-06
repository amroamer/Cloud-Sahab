export const CHART_COLORS = [
  "hsl(210, 85%, 42%)",
  "hsl(185, 75%, 38%)",
  "hsl(28, 85%, 48%)",
  "hsl(280, 70%, 42%)",
  "hsl(340, 75%, 45%)",
  "hsl(160, 70%, 38%)",
  "hsl(45, 90%, 48%)",
];

export const PILOT_LICENSE_MONTHLY = [
  { month: "Jan", monthAr: "يناير", atpl: 185, cpl: 310, ppl: 145, validation: 92, conversion: 48 },
  { month: "Feb", monthAr: "فبراير", atpl: 172, cpl: 295, ppl: 138, validation: 88, conversion: 42 },
  { month: "Mar", monthAr: "مارس", atpl: 198, cpl: 340, ppl: 162, validation: 105, conversion: 55 },
  { month: "Apr", monthAr: "أبريل", atpl: 210, cpl: 355, ppl: 158, validation: 110, conversion: 52 },
  { month: "May", monthAr: "مايو", atpl: 195, cpl: 328, ppl: 148, validation: 98, conversion: 46 },
  { month: "Jun", monthAr: "يونيو", atpl: 220, cpl: 365, ppl: 170, validation: 115, conversion: 58 },
  { month: "Jul", monthAr: "يوليو", atpl: 235, cpl: 380, ppl: 175, validation: 120, conversion: 62 },
  { month: "Aug", monthAr: "أغسطس", atpl: 228, cpl: 372, ppl: 168, validation: 118, conversion: 60 },
  { month: "Sep", monthAr: "سبتمبر", atpl: 205, cpl: 348, ppl: 155, validation: 102, conversion: 50 },
  { month: "Oct", monthAr: "أكتوبر", atpl: 215, cpl: 358, ppl: 160, validation: 108, conversion: 54 },
  { month: "Nov", monthAr: "نوفمبر", atpl: 190, cpl: 320, ppl: 142, validation: 95, conversion: 45 },
  { month: "Dec", monthAr: "ديسمبر", atpl: 178, cpl: 305, ppl: 135, validation: 90, conversion: 40 },
];

export const PILOT_LICENSE_SUMMARY = {
  totalApplications: 9742,
  onTimeRenewalPct: 94.2,
  avgProcessingDays: 8.3,
  firstTimeApprovalPct: 87.6,
  digitalCompletionPct: 78.5,
  revenueSAR: 42_500_000,
};

export const CABIN_CREW_SUMMARY = {
  activeLicenses: 14_820,
  onTimeRenewalPct: 96.1,
  avgProcessingDays: 4.2,
  applicationsPer1000: 285,
};

export const PERSONNEL_BY_CATEGORY = [
  { category: "Pilot", categoryAr: "طيار", active: 8450, nonCompliancePct: 0.8, avgDays: 8.3, onlinePct: 78.5 },
  { category: "Cabin Crew", categoryAr: "طاقم الضيافة", active: 14820, nonCompliancePct: 0.3, avgDays: 4.2, onlinePct: 85.2 },
  { category: "ATCO", categoryAr: "مراقب جوي", active: 2180, nonCompliancePct: 0.5, avgDays: 12.5, onlinePct: 72.0 },
  { category: "Maintenance", categoryAr: "صيانة", active: 6340, nonCompliancePct: 1.2, avgDays: 10.8, onlinePct: 68.4 },
  { category: "Dispatch", categoryAr: "إرسال", active: 1250, nonCompliancePct: 0.6, avgDays: 6.5, onlinePct: 82.1 },
];

export const PROCESSING_TIME_TREND = [
  { month: "Jan", monthAr: "يناير", pilot: 9.2, cabin: 4.8, atco: 13.5, maintenance: 11.5 },
  { month: "Feb", monthAr: "فبراير", pilot: 8.8, cabin: 4.5, atco: 13.0, maintenance: 11.2 },
  { month: "Mar", monthAr: "مارس", pilot: 8.5, cabin: 4.3, atco: 12.8, maintenance: 10.9 },
  { month: "Apr", monthAr: "أبريل", pilot: 8.3, cabin: 4.2, atco: 12.5, maintenance: 10.8 },
  { month: "May", monthAr: "مايو", pilot: 8.1, cabin: 4.0, atco: 12.2, maintenance: 10.5 },
  { month: "Jun", monthAr: "يونيو", pilot: 8.0, cabin: 3.9, atco: 12.0, maintenance: 10.3 },
  { month: "Jul", monthAr: "يوليو", pilot: 8.5, cabin: 4.3, atco: 12.8, maintenance: 11.0 },
  { month: "Aug", monthAr: "أغسطس", pilot: 8.8, cabin: 4.5, atco: 13.2, maintenance: 11.4 },
  { month: "Sep", monthAr: "سبتمبر", pilot: 8.2, cabin: 4.1, atco: 12.3, maintenance: 10.6 },
  { month: "Oct", monthAr: "أكتوبر", pilot: 8.0, cabin: 3.8, atco: 12.0, maintenance: 10.2 },
  { month: "Nov", monthAr: "نوفمبر", pilot: 8.3, cabin: 4.2, atco: 12.5, maintenance: 10.8 },
  { month: "Dec", monthAr: "ديسمبر", pilot: 8.5, cabin: 4.4, atco: 12.8, maintenance: 11.0 },
];

export const LICENSE_REVENUE_TREND = [
  { month: "Jan", monthAr: "يناير", pilot: 3200, cabin: 1800, atco: 850, maintenance: 1400 },
  { month: "Feb", monthAr: "فبراير", pilot: 3050, cabin: 1720, atco: 810, maintenance: 1350 },
  { month: "Mar", monthAr: "مارس", pilot: 3580, cabin: 1950, atco: 920, maintenance: 1520 },
  { month: "Apr", monthAr: "أبريل", pilot: 3650, cabin: 2010, atco: 950, maintenance: 1560 },
  { month: "May", monthAr: "مايو", pilot: 3400, cabin: 1880, atco: 880, maintenance: 1460 },
  { month: "Jun", monthAr: "يونيو", pilot: 3800, cabin: 2100, atco: 980, maintenance: 1620 },
  { month: "Jul", monthAr: "يوليو", pilot: 3950, cabin: 2180, atco: 1020, maintenance: 1680 },
  { month: "Aug", monthAr: "أغسطس", pilot: 3880, cabin: 2140, atco: 1000, maintenance: 1650 },
  { month: "Sep", monthAr: "سبتمبر", pilot: 3520, cabin: 1960, atco: 910, maintenance: 1500 },
  { month: "Oct", monthAr: "أكتوبر", pilot: 3650, cabin: 2020, atco: 940, maintenance: 1540 },
  { month: "Nov", monthAr: "نوفمبر", pilot: 3280, cabin: 1850, atco: 860, maintenance: 1420 },
  { month: "Dec", monthAr: "ديسمبر", pilot: 3150, cabin: 1780, atco: 830, maintenance: 1380 },
];

export const SINGLE_PERMIT_MONTHLY = [
  { month: "Jan", monthAr: "يناير", commercial: 420, businessJet: 285, humanitarian: 35, diplomatic: 18 },
  { month: "Feb", monthAr: "فبراير", commercial: 395, businessJet: 268, humanitarian: 28, diplomatic: 15 },
  { month: "Mar", monthAr: "مارس", commercial: 480, businessJet: 320, humanitarian: 42, diplomatic: 22 },
  { month: "Apr", monthAr: "أبريل", commercial: 510, businessJet: 340, humanitarian: 38, diplomatic: 20 },
  { month: "May", monthAr: "مايو", commercial: 465, businessJet: 305, humanitarian: 32, diplomatic: 17 },
  { month: "Jun", monthAr: "يونيو", commercial: 540, businessJet: 365, humanitarian: 45, diplomatic: 25 },
  { month: "Jul", monthAr: "يوليو", commercial: 580, businessJet: 395, humanitarian: 48, diplomatic: 28 },
  { month: "Aug", monthAr: "أغسطس", commercial: 560, businessJet: 380, humanitarian: 42, diplomatic: 24 },
  { month: "Sep", monthAr: "سبتمبر", commercial: 490, businessJet: 325, humanitarian: 36, diplomatic: 19 },
  { month: "Oct", monthAr: "أكتوبر", commercial: 520, businessJet: 345, humanitarian: 40, diplomatic: 21 },
  { month: "Nov", monthAr: "نوفمبر", commercial: 445, businessJet: 295, humanitarian: 30, diplomatic: 16 },
  { month: "Dec", monthAr: "ديسمبر", commercial: 410, businessJet: 275, humanitarian: 25, diplomatic: 14 },
];

export const PERMIT_SUMMARY = {
  singlePermitApps: 10_632,
  onTimeIssuancePct: 91.5,
  avgProcessingHours: 6.8,
  rejectionRatePct: 4.2,
  activeAnnualPermits: 1_245,
  annualRenewalOnTimePct: 93.8,
  avgAnnualProcessingDays: 18.5,
  permitRevenueSAR: 128_000_000,
  overflightPermits: 45_800,
  landingPermits: 32_600,
  complianceViolations: 23,
  avgClearanceHours: 2.4,
};

export const PERMIT_PROCESSING_TREND = [
  { month: "Jan", monthAr: "يناير", singleHours: 7.2, annualDays: 20.5, clearanceHours: 2.8 },
  { month: "Feb", monthAr: "فبراير", singleHours: 7.0, annualDays: 19.8, clearanceHours: 2.6 },
  { month: "Mar", monthAr: "مارس", singleHours: 6.8, annualDays: 19.2, clearanceHours: 2.5 },
  { month: "Apr", monthAr: "أبريل", singleHours: 6.5, annualDays: 18.5, clearanceHours: 2.3 },
  { month: "May", monthAr: "مايو", singleHours: 6.3, annualDays: 18.0, clearanceHours: 2.2 },
  { month: "Jun", monthAr: "يونيو", singleHours: 7.0, annualDays: 19.0, clearanceHours: 2.5 },
  { month: "Jul", monthAr: "يوليو", singleHours: 7.5, annualDays: 20.0, clearanceHours: 2.7 },
  { month: "Aug", monthAr: "أغسطس", singleHours: 7.2, annualDays: 19.5, clearanceHours: 2.6 },
  { month: "Sep", monthAr: "سبتمبر", singleHours: 6.5, annualDays: 18.2, clearanceHours: 2.3 },
  { month: "Oct", monthAr: "أكتوبر", singleHours: 6.2, annualDays: 17.8, clearanceHours: 2.2 },
  { month: "Nov", monthAr: "نوفمبر", singleHours: 6.8, annualDays: 18.5, clearanceHours: 2.4 },
  { month: "Dec", monthAr: "ديسمبر", singleHours: 7.0, annualDays: 19.0, clearanceHours: 2.5 },
];

export const OVERFLIGHT_LANDING_MONTHLY = [
  { month: "Jan", monthAr: "يناير", overflight: 3600, landing: 2550 },
  { month: "Feb", monthAr: "فبراير", overflight: 3400, landing: 2420 },
  { month: "Mar", monthAr: "مارس", overflight: 3950, landing: 2800 },
  { month: "Apr", monthAr: "أبريل", overflight: 4100, landing: 2920 },
  { month: "May", monthAr: "مايو", overflight: 3750, landing: 2680 },
  { month: "Jun", monthAr: "يونيو", overflight: 4200, landing: 3000 },
  { month: "Jul", monthAr: "يوليو", overflight: 4500, landing: 3200 },
  { month: "Aug", monthAr: "أغسطس", overflight: 4350, landing: 3100 },
  { month: "Sep", monthAr: "سبتمبر", overflight: 3850, landing: 2750 },
  { month: "Oct", monthAr: "أكتوبر", overflight: 4000, landing: 2850 },
  { month: "Nov", monthAr: "نوفمبر", overflight: 3550, landing: 2520 },
  { month: "Dec", monthAr: "ديسمبر", overflight: 3350, landing: 2380 },
];

export const ECONOMIC_LICENSES_BY_TYPE = [
  { type: "Scheduled", typeAr: "مجدولة", active: 8, newThisYear: 1, avgMonths: 4.5, renewalPct: 100, violations: 0, revenueSAR: 12_500_000 },
  { type: "Non-Scheduled", typeAr: "غير مجدولة", active: 15, newThisYear: 3, avgMonths: 3.2, renewalPct: 93.3, violations: 1, revenueSAR: 8_200_000 },
  { type: "Cargo", typeAr: "شحن", active: 6, newThisYear: 1, avgMonths: 3.8, renewalPct: 100, violations: 0, revenueSAR: 5_800_000 },
  { type: "LCC", typeAr: "منخفضة التكلفة", active: 3, newThisYear: 0, avgMonths: 5.0, renewalPct: 100, violations: 0, revenueSAR: 6_500_000 },
  { type: "Charter", typeAr: "تأجير", active: 12, newThisYear: 2, avgMonths: 2.8, renewalPct: 91.7, violations: 2, revenueSAR: 4_100_000 },
];

export const ECONOMIC_SUMMARY = {
  totalActiveLicenses: 44,
  avgTimeToIssueMonths: 3.9,
  renewalSuccessPct: 95.5,
  totalViolations: 3,
  totalRevenueSAR: 37_100_000,
};

export const GA_SUMMARY = {
  activeApprovals: 128,
  newApprovalsThisYear: 18,
  avgProcessingDays: 45,
  auditPassRatePct: 88.3,
};

export const GA_GROWTH_TREND = [
  { year: "2019", approvals: 72 },
  { year: "2020", approvals: 68 },
  { year: "2021", approvals: 82 },
  { year: "2022", approvals: 95 },
  { year: "2023", approvals: 110 },
  { year: "2024", approvals: 128 },
];

export const SERVICE_PROVIDERS_BY_CATEGORY = [
  { category: "Ground Handling", categoryAr: "مناولة أرضية", certified: 24, onTimePct: 92.5, avgDays: 28, findingsPerAudit: 2.3, revenueSAR: 8_500_000 },
  { category: "MRO", categoryAr: "صيانة وإصلاح", certified: 18, onTimePct: 88.9, avgDays: 42, findingsPerAudit: 3.1, revenueSAR: 12_200_000 },
  { category: "Catering", categoryAr: "تموين", certified: 12, onTimePct: 95.0, avgDays: 22, findingsPerAudit: 1.8, revenueSAR: 4_800_000 },
  { category: "Fuel", categoryAr: "وقود", certified: 8, onTimePct: 100, avgDays: 35, findingsPerAudit: 2.0, revenueSAR: 6_200_000 },
  { category: "Security", categoryAr: "أمن", certified: 15, onTimePct: 93.3, avgDays: 30, findingsPerAudit: 2.5, revenueSAR: 5_100_000 },
  { category: "Cargo Handler", categoryAr: "مناولة شحن", certified: 10, onTimePct: 90.0, avgDays: 25, findingsPerAudit: 2.8, revenueSAR: 3_900_000 },
];

export const AIRPORT_OPERATORS_SUMMARY = {
  approvedOperators: 12,
  majorConcessions: 8,
  filingCompliancePct: 91.2,
  avgProcessingMonths: 6.8,
  digitalSharePct: 65.4,
};

export const PROVIDER_COMPLIANCE_TREND = [
  { month: "Jan", monthAr: "يناير", compliancePct: 89.5, digitalPct: 60.2, findings: 2.8 },
  { month: "Feb", monthAr: "فبراير", compliancePct: 90.1, digitalPct: 61.5, findings: 2.7 },
  { month: "Mar", monthAr: "مارس", compliancePct: 90.8, digitalPct: 62.8, findings: 2.5 },
  { month: "Apr", monthAr: "أبريل", compliancePct: 91.2, digitalPct: 63.5, findings: 2.4 },
  { month: "May", monthAr: "مايو", compliancePct: 91.5, digitalPct: 64.0, findings: 2.3 },
  { month: "Jun", monthAr: "يونيو", compliancePct: 91.0, digitalPct: 64.8, findings: 2.5 },
  { month: "Jul", monthAr: "يوليو", compliancePct: 90.5, digitalPct: 65.2, findings: 2.6 },
  { month: "Aug", monthAr: "أغسطس", compliancePct: 91.2, digitalPct: 65.4, findings: 2.4 },
  { month: "Sep", monthAr: "سبتمبر", compliancePct: 91.8, digitalPct: 66.0, findings: 2.3 },
  { month: "Oct", monthAr: "أكتوبر", compliancePct: 92.0, digitalPct: 66.5, findings: 2.2 },
  { month: "Nov", monthAr: "نوفمبر", compliancePct: 91.5, digitalPct: 67.0, findings: 2.4 },
  { month: "Dec", monthAr: "ديسمبر", compliancePct: 91.2, digitalPct: 67.5, findings: 2.5 },
];

export const ESERVICE_APPLICATIONS_MONTHLY = [
  { month: "Jan", monthAr: "يناير", licensing: 2850, permits: 3200, economic: 180, airport: 95, providers: 220 },
  { month: "Feb", monthAr: "فبراير", licensing: 2680, permits: 3050, economic: 165, airport: 88, providers: 205 },
  { month: "Mar", monthAr: "مارس", licensing: 3100, permits: 3580, economic: 210, airport: 110, providers: 250 },
  { month: "Apr", monthAr: "أبريل", licensing: 3250, permits: 3720, economic: 225, airport: 115, providers: 265 },
  { month: "May", monthAr: "مايو", licensing: 3000, permits: 3450, economic: 195, airport: 102, providers: 238 },
  { month: "Jun", monthAr: "يونيو", licensing: 3400, permits: 3900, economic: 240, airport: 120, providers: 275 },
  { month: "Jul", monthAr: "يوليو", licensing: 3580, permits: 4150, economic: 255, airport: 128, providers: 290 },
  { month: "Aug", monthAr: "أغسطس", licensing: 3450, permits: 4000, economic: 245, airport: 125, providers: 280 },
  { month: "Sep", monthAr: "سبتمبر", licensing: 3150, permits: 3600, economic: 205, airport: 105, providers: 245 },
  { month: "Oct", monthAr: "أكتوبر", licensing: 3300, permits: 3750, economic: 218, airport: 112, providers: 258 },
  { month: "Nov", monthAr: "نوفمبر", licensing: 2900, permits: 3300, economic: 175, airport: 92, providers: 215 },
  { month: "Dec", monthAr: "ديسمبر", licensing: 2750, permits: 3120, economic: 160, airport: 85, providers: 200 },
];

export const ESERVICE_SUMMARY = {
  totalApplications: 82_400,
  avgDigitalProcessingDays: 5.2,
  csatScore: 4.1,
  fullyDigitizedPct: 72.8,
};

export const ESERVICE_BY_GROUP = [
  { group: "Licensing", groupAr: "التراخيص", applications: 37_410, avgDays: 7.5, csat: 4.2, digitizedPct: 78.5 },
  { group: "Permits", groupAr: "التصاريح", applications: 42_820, avgDays: 3.8, csat: 4.0, digitizedPct: 82.0 },
  { group: "Economic", groupAr: "الاقتصادية", applications: 2_473, avgDays: 18.5, csat: 3.8, digitizedPct: 55.2 },
  { group: "Airport", groupAr: "المطارات", applications: 1_277, avgDays: 25.0, csat: 3.9, digitizedPct: 65.4 },
  { group: "Providers", groupAr: "مزودي الخدمات", applications: 2_941, avgDays: 12.5, csat: 4.1, digitizedPct: 68.0 },
];

export const CSAT_TREND = [
  { month: "Jan", monthAr: "يناير", score: 3.9 },
  { month: "Feb", monthAr: "فبراير", score: 3.9 },
  { month: "Mar", monthAr: "مارس", score: 4.0 },
  { month: "Apr", monthAr: "أبريل", score: 4.0 },
  { month: "May", monthAr: "مايو", score: 4.1 },
  { month: "Jun", monthAr: "يونيو", score: 4.0 },
  { month: "Jul", monthAr: "يوليو", score: 3.9 },
  { month: "Aug", monthAr: "أغسطس", score: 4.0 },
  { month: "Sep", monthAr: "سبتمبر", score: 4.1 },
  { month: "Oct", monthAr: "أكتوبر", score: 4.1 },
  { month: "Nov", monthAr: "نوفمبر", score: 4.2 },
  { month: "Dec", monthAr: "ديسمبر", score: 4.1 },
];
