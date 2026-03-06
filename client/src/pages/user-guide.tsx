import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  LayoutDashboard,
  BarChart3,
  Users,
  Shield,
  Filter,
  HelpCircle,
  Globe,
  Plane,
  Package,
  Map,
  Building2,
  DollarSign,
  Scale,
  Leaf,
  Radar,
  Award,
  FileCheck,
  Landmark,
  Warehouse,
  Monitor,
  ChevronRight,
  Database,
} from "lucide-react";

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  icon: typeof BookOpen;
  contentEn: string;
  contentAr: string;
}

const GUIDE_SECTIONS: Section[] = [
  {
    id: "overview",
    titleEn: "Platform Overview",
    titleAr: "نظرة عامة على المنصة",
    icon: BookOpen,
    contentEn: "Sahab is the National Aviation Data Platform developed for the General Authority of Civil Aviation (GACA). It provides comprehensive analytics across 15 dashboards covering 108 KPIs aligned with Saudi Arabia's Vision 2030 aviation targets: 330 million travelers, 250 connectivity index, and 3 million cargo shipments.",
    contentAr: "سحاب هي المنصة الوطنية لبيانات الطيران المطورة للهيئة العامة للطيران المدني. توفر تحليلات شاملة عبر ١٥ لوحة معلومات تغطي ١٠٨ مؤشرات أداء رئيسية متوافقة مع أهداف رؤية المملكة العربية السعودية ٢٠٣٠ للطيران: ٣٣٠ مليون مسافر، ٢٥٠ مؤشر اتصال، و٣ مليون شحنة.",
  },
  {
    id: "navigation",
    titleEn: "Navigation Guide",
    titleAr: "دليل التنقل",
    icon: LayoutDashboard,
    contentEn: "The sidebar provides organized access to all platform features. The Home page shows your personalized dashboard with KPIs, alerts, and quick links. Dashboards are grouped into Aviation Operations (10 dashboards) and Ajwaa E-Services (5 dashboards). The Tools section gives access to the Explorer, Reports, Data Catalog, and API Portal. Your navigation is tailored to your role — you only see the sections relevant to your responsibilities.",
    contentAr: "يوفر الشريط الجانبي وصولاً منظماً لجميع ميزات المنصة. تعرض الصفحة الرئيسية لوحة المعلومات المخصصة لك مع مؤشرات الأداء والتنبيهات والروابط السريعة. يتم تجميع لوحات المعلومات في عمليات الطيران (١٠ لوحات) وخدمات أجواء الإلكترونية (٥ لوحات). يمنح قسم الأدوات الوصول إلى المستكشف والتقارير وكتالوج البيانات وبوابة API. يتم تخصيص التنقل الخاص بك وفقاً لدورك.",
  },
  {
    id: "dashboards",
    titleEn: "Dashboard Descriptions",
    titleAr: "وصف لوحات المعلومات",
    icon: Globe,
    contentEn: "",
    contentAr: "",
  },
  {
    id: "roles",
    titleEn: "User Roles & Access",
    titleAr: "أدوار المستخدمين والصلاحيات",
    icon: Users,
    contentEn: "",
    contentAr: "",
  },
  {
    id: "filters",
    titleEn: "Using Filters",
    titleAr: "استخدام الفلاتر",
    icon: Filter,
    contentEn: "Every dashboard includes a collapsible filter bar below the title. Filters allow you to narrow data by time period, airport, airline, or flight type. Click the filter bar to expand it, select your criteria, then click Apply. Filters persist while you navigate between sections. Use the Reset button to clear all filters and return to the default view.",
    contentAr: "تتضمن كل لوحة معلومات شريط فلتر قابل للطي أسفل العنوان. تتيح لك الفلاتر تضييق البيانات حسب الفترة الزمنية أو المطار أو شركة الطيران أو نوع الرحلة. انقر على شريط الفلتر لتوسيعه، واختر معاييرك، ثم انقر على تطبيق. تستمر الفلاتر أثناء التنقل بين الأقسام. استخدم زر إعادة التعيين لمسح جميع الفلاتر.",
  },
  {
    id: "explorer",
    titleEn: "Explorer Guide",
    titleAr: "دليل المستكشف",
    icon: BarChart3,
    contentEn: "The Air Traffic Explorer is your analytical workspace for custom data exploration. Select a Dimension (Month, Airport, Airline, or Flight Type) from the left panel to define your X-axis. Choose one or more Metrics (Passengers, Flights, Cargo, Load Factor, OTP, Revenue) from the right panel. Pick a Chart Type from the toolbar (Bar, Stacked Bar, Line, Area, Pie, or Donut). Charts can be downloaded as PNG or data exported as CSV using the toolbar that appears on hover.",
    contentAr: "مستكشف حركة الطيران هو مساحة العمل التحليلية لاستكشاف البيانات المخصصة. اختر بُعداً (الشهر، المطار، شركة الطيران، أو نوع الرحلة) من اللوحة اليسرى لتحديد المحور السيني. اختر مقياساً واحداً أو أكثر من اللوحة اليمنى. اختر نوع الرسم البياني من شريط الأدوات. يمكن تحميل الرسوم البيانية كصورة PNG أو تصدير البيانات كملف CSV.",
  },
  {
    id: "catalog",
    titleEn: "Data Catalog & Marketplace",
    titleAr: "كتالوج البيانات وسوق البيانات",
    icon: Database,
    contentEn: "The Data Catalog is Sahab's storefront for aviation data products. Internal GACA users can browse and access 32 datasets covering traffic, connectivity, market share, operations, cargo, infrastructure, financial, fleet, sustainability, and digital metrics. External users (airlines, airports, investors, researchers) see a Data Marketplace where they can preview, evaluate, and purchase data products. Use the faceted filters on the left panel to narrow by category, frequency, format, or price range. Click any product card to view its full detail page including schema, data preview, reviews, and version history. Free products (factsheets, sample data, summaries) are available for immediate download by all users.",
    contentAr: "كتالوج البيانات هو واجهة سحاب لمنتجات بيانات الطيران. يمكن لمستخدمي هيئة الطيران المدني الداخليين تصفح والوصول إلى ٣٢ مجموعة بيانات تغطي حركة المرور والاتصال وحصة السوق والعمليات والشحن والبنية التحتية والمالية والأسطول والاستدامة والمقاييس الرقمية. يرى المستخدمون الخارجيون (شركات الطيران والمطارات والمستثمرون والباحثون) سوق البيانات حيث يمكنهم معاينة وتقييم وشراء منتجات البيانات. استخدم الفلاتر الجانبية لتضييق النتائج حسب الفئة أو التكرار أو التنسيق أو نطاق السعر. انقر على أي بطاقة منتج لعرض صفحة التفاصيل الكاملة بما في ذلك المخطط ومعاينة البيانات والمراجعات وسجل الإصدارات. المنتجات المجانية متاحة للتحميل الفوري لجميع المستخدمين.",
  },
  {
    id: "faq",
    titleEn: "Frequently Asked Questions",
    titleAr: "الأسئلة الشائعة",
    icon: HelpCircle,
    contentEn: "",
    contentAr: "",
  },
];

const DASHBOARD_LIST = [
  { icon: Globe, nameEn: "National Overview", nameAr: "النظرة العامة الوطنية", descEn: "High-level KPIs, Vision 2030 progress, traffic trends, and connectivity index tracking.", descAr: "مؤشرات الأداء الرئيسية، تقدم رؤية ٢٠٣٠، اتجاهات الحركة، وتتبع مؤشر الاتصال." },
  { icon: Radar, nameEn: "Flight Operations", nameAr: "عمليات الطيران", descEn: "Flight movements, on-time performance, delays, and operational efficiency.", descAr: "حركات الطيران، الالتزام بالمواعيد، التأخيرات، والكفاءة التشغيلية." },
  { icon: Users, nameEn: "Passengers", nameAr: "المسافرون", descEn: "Passenger volumes, growth trends, nationality breakdown, and seasonal patterns.", descAr: "أحجام المسافرين، اتجاهات النمو، توزيع الجنسيات، والأنماط الموسمية." },
  { icon: Map, nameEn: "Connectivity", nameAr: "الاتصال", descEn: "Global connectivity index, route network analysis, and destination coverage.", descAr: "مؤشر الاتصال العالمي، تحليل شبكة المسارات، وتغطية الوجهات." },
  { icon: Building2, nameEn: "Airports", nameAr: "المطارات", descEn: "Airport performance metrics for all 29 Saudi airports including capacity utilization.", descAr: "مقاييس أداء المطارات لجميع المطارات السعودية الـ ٢٩ بما في ذلك استخدام السعة." },
  { icon: Package, nameEn: "Cargo", nameAr: "الشحن", descEn: "Cargo tonnage, shipment tracking, and progress toward the 3M target.", descAr: "حمولة الشحن، تتبع الشحنات، والتقدم نحو هدف ٣ مليون." },
  { icon: DollarSign, nameEn: "Financial", nameAr: "المالية", descEn: "Revenue analysis, cost metrics, and financial performance indicators.", descAr: "تحليل الإيرادات، مقاييس التكلفة، ومؤشرات الأداء المالي." },
  { icon: Scale, nameEn: "Balance of Payments", nameAr: "ميزان المدفوعات", descEn: "Aviation sector impact on balance of payments and economic contribution.", descAr: "تأثير قطاع الطيران على ميزان المدفوعات والمساهمة الاقتصادية." },
  { icon: Plane, nameEn: "Fleet", nameAr: "الأسطول", descEn: "Fleet composition, aircraft age analysis, and procurement tracking.", descAr: "تكوين الأسطول، تحليل عمر الطائرات، وتتبع المشتريات." },
  { icon: Leaf, nameEn: "Digital & Sustainability", nameAr: "الرقمي والاستدامة", descEn: "Digital transformation metrics and environmental sustainability indicators.", descAr: "مقاييس التحول الرقمي ومؤشرات الاستدامة البيئية." },
  { icon: Award, nameEn: "Ajwaa - Licensing", nameAr: "أجواء - التراخيص", descEn: "Personnel licensing, processing times, and certification analytics.", descAr: "تراخيص الموظفين، أوقات المعالجة، وتحليلات الشهادات." },
  { icon: FileCheck, nameEn: "Ajwaa - Permits", nameAr: "أجواء - التصاريح", descEn: "Permit applications, approval rates, and processing workflows.", descAr: "طلبات التصاريح، معدلات الموافقة، وسير عمل المعالجة." },
  { icon: Landmark, nameEn: "Ajwaa - Economic", nameAr: "أجواء - الاقتصادي", descEn: "Economic licensing, revenue from fees, and regulatory economics.", descAr: "التراخيص الاقتصادية، الإيرادات من الرسوم، والاقتصاد التنظيمي." },
  { icon: Warehouse, nameEn: "Ajwaa - Providers", nameAr: "أجواء - مزودي الخدمات", descEn: "Service provider compliance, performance ratings, and contract management.", descAr: "امتثال مزودي الخدمات، تقييمات الأداء، وإدارة العقود." },
  { icon: Monitor, nameEn: "Ajwaa - E-Services", nameAr: "أجواء - الخدمات الإلكترونية", descEn: "Digital service usage, satisfaction scores, and e-services adoption rates.", descAr: "استخدام الخدمات الرقمية، درجات الرضا، ومعدلات تبني الخدمات الإلكترونية." },
];

const ROLES_DATA = [
  { role: "GACA Executive", roleAr: "التنفيذي في GACA", descEn: "Full dashboard access, reports, and catalog. Strategic overview of all aviation KPIs.", descAr: "وصول كامل للوحات المعلومات والتقارير والكتالوج. نظرة استراتيجية على جميع مؤشرات الطيران." },
  { role: "GACA Analyst", roleAr: "محلل GACA", descEn: "Full dashboard access plus Explorer, Self-Service analytics, and report generation.", descAr: "وصول كامل للوحات المعلومات بالإضافة إلى المستكشف والتحليلات الذاتية وإنشاء التقارير." },
  { role: "GACA Regulator", roleAr: "منظم GACA", descEn: "Full dashboard access plus Explorer for regulatory monitoring and compliance tracking.", descAr: "وصول كامل للوحات المعلومات بالإضافة إلى المستكشف للمراقبة التنظيمية وتتبع الامتثال." },
  { role: "Airline Operator", roleAr: "مشغل شركة طيران", descEn: "Access to Connectivity, Flight Ops, Financial dashboards, Reports, Catalog, and API Portal.", descAr: "الوصول إلى لوحات الاتصال وعمليات الطيران والمالية والتقارير والكتالوج وبوابة API." },
  { role: "Airport Operator", roleAr: "مشغل مطار", descEn: "Access to Airports, Passengers, Cargo dashboards, Reports, Catalog, and API Portal.", descAr: "الوصول إلى لوحات المطارات والمسافرين والشحن والتقارير والكتالوج وبوابة API." },
  { role: "Investor/Analyst", roleAr: "مستثمر/محلل", descEn: "Access to National Overview dashboard, Reports, Catalog, and API Portal.", descAr: "الوصول إلى لوحة النظرة العامة الوطنية والتقارير والكتالوج وبوابة API." },
  { role: "Researcher", roleAr: "باحث", descEn: "Access to National Overview dashboard, Reports, Catalog, and API Portal.", descAr: "الوصول إلى لوحة النظرة العامة الوطنية والتقارير والكتالوج وبوابة API." },
  { role: "Platform Admin", roleAr: "مدير المنصة", descEn: "Full access to all features, dashboards, tools, and system settings.", descAr: "وصول كامل لجميع الميزات ولوحات المعلومات والأدوات وإعدادات النظام." },
];

const FAQ_DATA = [
  { qEn: "How do I switch between English and Arabic?", qAr: "كيف أبدل بين الإنجليزية والعربية؟", aEn: "Click the language toggle icon (globe) in the top navigation bar. The interface will switch immediately including RTL/LTR layout.", aAr: "انقر على أيقونة تبديل اللغة في شريط التنقل العلوي. ستتبدل الواجهة فوراً بما في ذلك تخطيط RTL/LTR." },
  { qEn: "Can I download chart data?", qAr: "هل يمكنني تحميل بيانات الرسوم البيانية؟", aEn: "Yes. Hover over any chart to reveal the toolbar, then click the download icon to export as PNG image or CSV data file.", aAr: "نعم. مرر المؤشر فوق أي رسم بياني للكشف عن شريط الأدوات، ثم انقر على أيقونة التحميل للتصدير كصورة PNG أو ملف بيانات CSV." },
  { qEn: "What data does the Explorer use?", qAr: "ما البيانات التي يستخدمها المستكشف؟", aEn: "The Explorer uses the same aviation dataset available across all dashboards, allowing you to slice and visualize it across custom dimensions and metrics.", aAr: "يستخدم المستكشف نفس مجموعة بيانات الطيران المتاحة عبر جميع لوحات المعلومات، مما يتيح لك تقسيمها وتصورها عبر أبعاد ومقاييس مخصصة." },
  { qEn: "How do I toggle dark mode?", qAr: "كيف أفعّل الوضع الداكن؟", aEn: "Click the sun/moon icon in the top navigation bar to toggle between light and dark themes.", aAr: "انقر على أيقونة الشمس/القمر في شريط التنقل العلوي للتبديل بين السمات الفاتحة والداكنة." },
  { qEn: "Why can't I see certain dashboards?", qAr: "لماذا لا أستطيع رؤية بعض لوحات المعلومات؟", aEn: "Dashboard visibility is based on your assigned role. Contact your administrator if you need access to additional dashboards.", aAr: "تعتمد رؤية لوحات المعلومات على الدور المخصص لك. تواصل مع المسؤول إذا كنت بحاجة للوصول إلى لوحات معلومات إضافية." },
];

export default function UserGuidePage() {
  const { language } = useTranslation();

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1000px] mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-guide-title">
              {language === "ar" ? "دليل المستخدم" : "User Guide"}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {language === "ar"
              ? "دليل شامل لاستخدام منصة سحاب الوطنية لبيانات الطيران"
              : "Comprehensive guide for using the Sahab National Aviation Data Platform"}
          </p>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">{language === "ar" ? "المحتويات" : "Contents"}</h3>
          <div className="grid gap-1 sm:grid-cols-2">
            {GUIDE_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 p-2 rounded-md text-sm hover-elevate"
                  data-testid={`link-toc-${s.id}`}
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span>{language === "ar" ? s.titleAr : s.titleEn}</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                </a>
              );
            })}
          </div>
        </Card>

        {GUIDE_SECTIONS.map((section) => {
          const Icon = section.icon;

          if (section.id === "dashboards") {
            return (
              <Card key={section.id} id={section.id} className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{language === "ar" ? section.titleAr : section.titleEn}</h2>
                </div>
                <div className="space-y-3">
                  {DASHBOARD_LIST.map((d, idx) => {
                    const DIcon = d.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                        <DIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{language === "ar" ? d.nameAr : d.nameEn}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? d.descAr : d.descEn}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          }

          if (section.id === "roles") {
            return (
              <Card key={section.id} id={section.id} className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{language === "ar" ? section.titleAr : section.titleEn}</h2>
                </div>
                <div className="space-y-3">
                  {ROLES_DATA.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                      <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{language === "ar" ? r.roleAr : r.role}</p>
                          <Badge variant="secondary" className="text-[10px]">{r.role}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? r.descAr : r.descEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          }

          if (section.id === "faq") {
            return (
              <Card key={section.id} id={section.id} className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{language === "ar" ? section.titleAr : section.titleEn}</h2>
                </div>
                <div className="space-y-4">
                  {FAQ_DATA.map((faq, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-sm font-medium">{language === "ar" ? faq.qAr : faq.qEn}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{language === "ar" ? faq.aAr : faq.aEn}</p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          }

          return (
            <Card key={section.id} id={section.id} className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{language === "ar" ? section.titleAr : section.titleEn}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ar" ? section.contentAr : section.contentEn}
              </p>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
