export type AnomalySeverity = "critical" | "warning" | "info";
export type EntityType = "airport" | "airline";
export type RecommendedAction = "investigate" | "monitor" | "no-action";

export interface Anomaly {
  id: string;
  metric: string;
  metricAr: string;
  entity: string;
  entityAr: string;
  entityType: EntityType;
  percentageChange: number;
  severity: AnomalySeverity;
  narrative: string;
  narrativeAr: string;
  historicalRef: string;
  historicalRefAr: string;
  recommendedAction: RecommendedAction;
  detectedAt: string;
}

export interface AnomalyTimelinePoint {
  date: string;
  critical: number;
  warning: number;
  info: number;
}

const METRICS = [
  { en: "Passenger Throughput", ar: "حركة المسافرين" },
  { en: "On-Time Performance", ar: "الأداء في الوقت المحدد" },
  { en: "Baggage Mishandling Rate", ar: "معدل سوء التعامل مع الأمتعة" },
  { en: "Load Factor", ar: "عامل الحمولة" },
  { en: "Cargo Volume", ar: "حجم الشحن" },
  { en: "Flight Cancellation Rate", ar: "معدل إلغاء الرحلات" },
  { en: "Revenue per ASK", ar: "الإيرادات لكل مقعد-كم" },
  { en: "Gate Utilization", ar: "استخدام البوابات" },
  { en: "Turnaround Time", ar: "وقت التحول" },
  { en: "Security Screening Wait", ar: "وقت انتظار التفتيش الأمني" },
  { en: "Check-in Queue Time", ar: "وقت انتظار تسجيل الوصول" },
  { en: "Fuel Efficiency", ar: "كفاءة الوقود" },
];

const AIRPORTS = [
  { en: "King Abdulaziz International (JED)", ar: "مطار الملك عبدالعزيز الدولي (JED)" },
  { en: "King Khalid International (RUH)", ar: "مطار الملك خالد الدولي (RUH)" },
  { en: "King Fahd International (DMM)", ar: "مطار الملك فهد الدولي (DMM)" },
  { en: "Prince Mohammad bin Abdulaziz (MED)", ar: "مطار الأمير محمد بن عبدالعزيز (MED)" },
  { en: "Abha Regional (AHB)", ar: "مطار أبها الإقليمي (AHB)" },
];

const AIRLINES = [
  { en: "Saudia", ar: "الخطوط السعودية" },
  { en: "flynas", ar: "طيران ناس" },
  { en: "flyadeal", ar: "طيران أديل" },
  { en: "Riyadh Air", ar: "طيران الرياض" },
];

const NARRATIVES: { en: string; ar: string }[] = [
  {
    en: "Sudden spike detected likely due to seasonal travel surge. Ground handling capacity may be insufficient for current demand levels. The metric exceeded the 3-sigma threshold from the rolling 90-day average.",
    ar: "تم اكتشاف ارتفاع مفاجئ يرجح أنه بسبب ذروة السفر الموسمية. قد تكون قدرة المناولة الأرضية غير كافية لمستويات الطلب الحالية. تجاوز المؤشر حد 3-سيجما من المتوسط المتحرك لـ 90 يومًا.",
  },
  {
    en: "Metric dropped below the expected range. Analysis indicates potential operational bottleneck in terminal processing. Weather-related delays in connecting hub airports may be a contributing factor.",
    ar: "انخفض المؤشر عن النطاق المتوقع. يشير التحليل إلى عنق زجاجة تشغيلي محتمل في معالجة المبنى. قد تكون التأخيرات المرتبطة بالطقس في مطارات الربط المحورية عاملاً مساهمًا.",
  },
  {
    en: "Unusual pattern detected compared to historical norms. The deviation correlates with recent schedule changes by multiple carriers. Capacity reallocation may be needed to address the imbalance.",
    ar: "تم اكتشاف نمط غير عادي مقارنة بالمعايير التاريخية. يرتبط الانحراف بالتغييرات الأخيرة في الجدول الزمني من قبل عدة ناقلات. قد يكون إعادة تخصيص السعة ضروريًا لمعالجة الخلل.",
  },
  {
    en: "Performance degradation observed across multiple shifts. Root cause analysis suggests staffing shortages during peak hours combined with increased international flight arrivals.",
    ar: "لوحظ تراجع في الأداء عبر عدة نوبات عمل. يشير تحليل السبب الجذري إلى نقص الموظفين خلال ساعات الذروة مع زيادة رحلات الوصول الدولية.",
  },
  {
    en: "Metric is trending upward beyond seasonal expectations. This may indicate a structural shift in demand patterns. Further monitoring recommended to distinguish from temporary fluctuation.",
    ar: "يتجه المؤشر صعودًا بما يتجاوز التوقعات الموسمية. قد يشير هذا إلى تحول هيكلي في أنماط الطلب. يوصى بمزيد من المراقبة للتمييز عن التقلب المؤقت.",
  },
  {
    en: "Anomaly triggered by a sudden change in cargo throughput. Investigation reveals a large one-time shipment combined with routine operations, causing temporary congestion.",
    ar: "تم تشغيل الشذوذ بسبب تغيير مفاجئ في حركة الشحن. يكشف التحقيق عن شحنة كبيرة لمرة واحدة مع العمليات الروتينية مما تسبب في ازدحام مؤقت.",
  },
  {
    en: "System detected a deviation in fuel efficiency metrics. This correlates with routing changes implemented last week and increased headwinds on primary routes.",
    ar: "اكتشف النظام انحرافًا في مقاييس كفاءة الوقود. يرتبط هذا بتغييرات المسار المطبقة الأسبوع الماضي وزيادة الرياح المعاكسة على المسارات الرئيسية.",
  },
  {
    en: "Queue time exceeded acceptable thresholds consistently over the past 48 hours. Contributing factors include new security protocols and a 15% increase in departing passengers.",
    ar: "تجاوز وقت الانتظار الحدود المقبولة باستمرار خلال الـ 48 ساعة الماضية. تشمل العوامل المساهمة بروتوكولات أمنية جديدة وزيادة بنسبة 15% في المسافرين المغادرين.",
  },
  {
    en: "Baggage handling system showing elevated error rates. Preliminary analysis points to a software update in the sorting system that may have introduced a processing delay.",
    ar: "يُظهر نظام معالجة الأمتعة معدلات خطأ مرتفعة. يشير التحليل الأولي إلى تحديث برمجي في نظام الفرز قد يكون أدخل تأخيرًا في المعالجة.",
  },
  {
    en: "Revenue metrics show unexpected decline despite stable traffic volumes. Analysis suggests increased competition on key routes is driving yield compression.",
    ar: "تُظهر مقاييس الإيرادات انخفاضًا غير متوقع رغم استقرار أحجام الحركة. يشير التحليل إلى أن المنافسة المتزايدة على المسارات الرئيسية تؤدي إلى ضغط العوائد.",
  },
  {
    en: "Gate utilization has spiked beyond capacity planning models. This coincides with schedule concentration during morning peak hours and delayed departures cascading from the previous evening.",
    ar: "ارتفع استخدام البوابات متجاوزًا نماذج تخطيط السعة. يتزامن هذا مع تركز الجدول خلال ساعات ذروة الصباح وتأخر المغادرات المتتالية من المساء السابق.",
  },
  {
    en: "Cancellation rate elevated above the 95th percentile threshold. Weather disruptions at connecting hubs and crew scheduling constraints identified as primary drivers.",
    ar: "ارتفع معدل الإلغاء فوق حد النسبة المئوية 95. تم تحديد اضطرابات الطقس في مطارات الربط وقيود جدولة الطاقم كمحركات رئيسية.",
  },
];

const HISTORICAL_REFS = [
  { en: "Similar pattern observed in March 2024 during Ramadan peak", ar: "لوحظ نمط مشابه في مارس 2024 خلال ذروة رمضان" },
  { en: "Similar pattern observed in June 2025 during Hajj season", ar: "لوحظ نمط مشابه في يونيو 2025 خلال موسم الحج" },
  { en: "Similar pattern observed in December 2024 during year-end holidays", ar: "لوحظ نمط مشابه في ديسمبر 2024 خلال عطلة نهاية العام" },
  { en: "Similar pattern observed in October 2024 during Riyadh Season", ar: "لوحظ نمط مشابه في أكتوبر 2024 خلال موسم الرياض" },
  { en: "Similar pattern observed in August 2024 during summer travel peak", ar: "لوحظ نمط مشابه في أغسطس 2024 خلال ذروة سفر الصيف" },
  { en: "No similar historical pattern found in recent records", ar: "لم يتم العثور على نمط تاريخي مشابه في السجلات الأخيرة" },
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function generateAnomaly(index: number): Anomaly {
  const metric = randomPick(METRICS);
  const isAirport = Math.random() > 0.4;
  const entity = isAirport ? randomPick(AIRPORTS) : randomPick(AIRLINES);
  const severity: AnomalySeverity = randomPick(["critical", "warning", "info"]);
  const percentageChange = severity === "critical"
    ? randomFloat(-45, 60, 1)
    : severity === "warning"
    ? randomFloat(-25, 35, 1)
    : randomFloat(-15, 20, 1);

  const narrative = NARRATIVES[index % NARRATIVES.length];
  const historicalRef = randomPick(HISTORICAL_REFS);

  const actionMap: Record<AnomalySeverity, RecommendedAction[]> = {
    critical: ["investigate"],
    warning: ["monitor", "investigate"],
    info: ["no-action", "monitor"],
  };
  const recommendedAction = randomPick(actionMap[severity]);

  const hoursAgo = randomInt(0, 72);
  const detectedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

  return {
    id: `ANM-${String(1000 + index).slice(1)}`,
    metric: metric.en,
    metricAr: metric.ar,
    entity: entity.en,
    entityAr: entity.ar,
    entityType: isAirport ? "airport" : "airline",
    percentageChange,
    severity,
    narrative: narrative.en,
    narrativeAr: narrative.ar,
    historicalRef: historicalRef.en,
    historicalRefAr: historicalRef.ar,
    recommendedAction,
    detectedAt,
  };
}

export function generateAnomalies(count = 10): Anomaly[] {
  return Array.from({ length: count }, (_, i) => generateAnomaly(i)).sort(
    (a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
  );
}

export function generateTimelineData(): AnomalyTimelinePoint[] {
  const data: AnomalyTimelinePoint[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      critical: randomInt(0, 3),
      warning: randomInt(1, 6),
      info: randomInt(2, 8),
    });
  }
  return data;
}

export const ACTION_LABELS: Record<RecommendedAction, { en: string; ar: string }> = {
  investigate: { en: "Investigate", ar: "تحقيق" },
  monitor: { en: "Monitor", ar: "مراقبة" },
  "no-action": { en: "No Action Needed", ar: "لا إجراء مطلوب" },
};

export const SEVERITY_LABELS: Record<AnomalySeverity, { en: string; ar: string }> = {
  critical: { en: "Critical", ar: "حرج" },
  warning: { en: "Warning", ar: "تحذير" },
  info: { en: "Info", ar: "معلومات" },
};
