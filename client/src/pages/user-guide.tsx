import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  LayoutDashboard,
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
  Info,
  Activity,
  Bot,
  Target,
  Trophy,
  Briefcase,
  AlertTriangle,
  CalendarDays,
  Eye,
  TrendingUp,
  ShoppingBag,
  ShoppingCart,
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
    contentAr: "سحاب هي المنصة الوطنية لبيانات الطيران المطورة للهيئة العامة للطيران المدني. توفر تحليلات شاملة عبر 15 لوحة معلومات تغطي 108 مؤشرات أداء رئيسية متوافقة مع أهداف رؤية المملكة العربية السعودية 2030 للطيران: 330 مليون مسافر، 250 مؤشر اتصال، و3 مليون شحنة.",
  },
  {
    id: "navigation",
    titleEn: "Navigation Guide",
    titleAr: "دليل التنقل",
    icon: LayoutDashboard,
    contentEn: "The sidebar provides organized access to all platform features. The Home page shows your personalized dashboard with KPIs, alerts, and quick links. Dashboards (expanded by default) group 10 Aviation Operations dashboards. Ajwaa E-Services, Data Marketplace, and Tools are collapsible groups — collapsed by default to keep the sidebar compact. Data Marketplace contains Aviation Data Products and Investor Intelligence. Tools includes AI Copilot, Airport Pulse, Hajj & Umrah, War Room, FIFA 2034, Route Map, Seasonal Calendar, and Anomaly Detection. The System group holds Notifications, Settings, API Portal, and User Guide. Navigation is tailored to your role — you only see the sections relevant to your responsibilities.",
    contentAr: "يوفر الشريط الجانبي وصولاً منظماً لجميع ميزات المنصة. تعرض الصفحة الرئيسية لوحة المعلومات المخصصة لك. لوحات المعلومات (مفتوحة افتراضياً) تضم 10 لوحات لعمليات الطيران. خدمات أجواء الإلكترونية وسوق البيانات والأدوات هي مجموعات قابلة للطي — مطوية افتراضياً. يتضمن سوق البيانات منتجات بيانات الطيران واستخبارات المستثمرين. الأدوات تشمل المساعد الذكي ونبض المطارات والحج والعمرة وغرفة الحرب وفيفا 2034 وخريطة المسارات والتقويم الموسمي وكشف الشذوذ. مجموعة النظام تحتوي على الإشعارات والإعدادات وبوابة API ودليل المستخدم.",
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
    id: "tooltips",
    titleEn: "Dashboard Tooltips",
    titleAr: "تلميحات لوحة المعلومات",
    icon: Info,
    contentEn: "Every KPI card, chart, and table section across all 15 dashboards includes a small info icon (i). Hover over it to see a brief description of what that component measures, its data source, and its relevance. Tooltips are available in both English and Arabic and help users quickly understand each metric without leaving the dashboard.",
    contentAr: "يتضمن كل بطاقة مؤشر أداء رئيسي ورسم بياني وقسم جدول عبر جميع لوحات المعلومات الـ 15 رمز معلومات صغير (i). مرر فوقه لرؤية وصف موجز لما يقيسه هذا المكون ومصدر بياناته وأهميته. التلميحات متاحة باللغتين العربية والإنجليزية وتساعد المستخدمين على فهم كل مقياس بسرعة دون مغادرة لوحة المعلومات.",
  },
  {
    id: "route-map",
    titleEn: "Route Map",
    titleAr: "خريطة المسارات",
    icon: Globe,
    contentEn: "The Route Map is an interactive geographic visualization tool that displays airline routes from Saudi airports to destinations worldwide. Use the Airline filter to focus on a specific carrier (Saudia, flynas, flyadeal, or foreign airlines), the Origin Airport filter to view routes from a particular airport, and the Period filter to narrow by year. The map shows Saudi airports as teal markers, destination cities as blue/amber markers, and curved arc lines connecting origins to destinations. Line thickness reflects passenger volume. Click any route line or destination marker for detailed route information including frequency and annual passengers. A summary strip shows total routes, destinations, countries, and passengers for the current selection.",
    contentAr: "خريطة المسارات هي أداة تصور جغرافي تفاعلية تعرض مسارات شركات الطيران من المطارات السعودية إلى الوجهات حول العالم. استخدم فلتر شركة الطيران للتركيز على ناقل محدد (السعودية، طيران ناس، طيران أديل، أو شركات أجنبية)، وفلتر المطار المصدر لعرض المسارات من مطار معين، وفلتر الفترة للتضييق حسب السنة. تعرض الخريطة المطارات السعودية كعلامات فيروزية، ومدن الوجهة كعلامات زرقاء/برتقالية، وخطوط قوسية تربط المصادر بالوجهات. يعكس سمك الخط حجم المسافرين. انقر على أي خط مسار أو علامة وجهة للحصول على معلومات تفصيلية عن المسار.",
  },
  {
    id: "airport-pulse",
    titleEn: "Airport Pulse View",
    titleAr: "نبض المطارات",
    icon: Activity,
    contentEn: "The Airport Pulse View displays all 29 Saudi airports as breathing circles on an interactive Saudi Arabia silhouette map. Each airport is a pulsing dot positioned at its real geographic location. The pulse speed reflects utilization: slow breathing means normal flow, faster breathing means congestion, and rapid pulsing means critical capacity. Airports are color-coded by congestion status: Green (Flowing) means throughput is within normal capacity, Amber (Congested) means approaching capacity limits, and Red (Critical) means capacity is exceeded. Circle size represents the airport's tier: large circles for major hubs (RUH, JED, DMM), medium for regional airports, and small for domestic airports. Hover over any circle to see a tooltip with the IATA code, airport name, city, status, utilization percentage, throughput (passengers per minute), and trend. Click any circle to open a detailed drawer with per-terminal breakdown, 24-hour color-coded trend chart, and key metrics. Status summary pills at the top show flowing, congested, and critical counts with national total throughput.",
    contentAr: "تعرض نبض المطارات جميع المطارات السعودية الـ 29 كدوائر نابضة على خريطة تفاعلية لشبه الجزيرة العربية. كل مطار عبارة عن نقطة نابضة موضوعة في موقعها الجغرافي الحقيقي. تعكس سرعة النبض مستوى الاستخدام: النبض البطيء يعني التدفق الطبيعي، والنبض الأسرع يعني الازدحام، والنبض السريع يعني السعة الحرجة. المطارات مُرمّزة بالألوان حسب حالة الازدحام: الأخضر (سلس) يعني أن الإنتاجية ضمن السعة الطبيعية، والبرتقالي (مزدحم) يعني الاقتراب من حدود السعة، والأحمر (حرج) يعني تجاوز السعة. يمثل حجم الدائرة فئة المطار: دوائر كبيرة للمحاور الرئيسية (RUH، JED، DMM)، ومتوسطة للمطارات الإقليمية، وصغيرة للمطارات المحلية. مرر الماوس فوق أي دائرة لرؤية تلميح يحتوي على رمز IATA واسم المطار والمدينة والحالة ونسبة الاستخدام والإنتاجية والاتجاه. انقر على أي دائرة لفتح درج تفصيلي مع تفاصيل الصالات ورسم بياني ملون لاتجاه 24 ساعة والمقاييس الرئيسية.",
  },
  {
    id: "catalog",
    titleEn: "Data Marketplace",
    titleAr: "سوق البيانات",
    icon: Database,
    contentEn: "The Aviation Data Products page is the marketplace hub for Sahab's 32 aviation datasets. At the top, a live revenue ticker scrolls real-time purchase events showing which airline bought which dataset and for how much. Below, admin users see four KPI cards (Total Revenue, Total Transactions, Average Order Value, Top Seller) and a full Product Revenue Table listing every product with purchase counts and revenue. Click any row to expand and see recent individual purchase details including buyer name, date, and amount. Below the revenue section, all users can browse product cards using search, category tabs, faceted filters (category, frequency, format, price range), and sort options. Click any product card to view its detail page with schema, preview, and reviews.",
    contentAr: "صفحة منتجات بيانات الطيران هي مركز سوق البيانات لـ 32 مجموعة بيانات طيران في سحاب. في الأعلى، شريط إيرادات مباشر يعرض أحداث الشراء في الوقت الفعلي. أدناه، يرى المسؤولون أربع بطاقات مؤشرات أداء (إجمالي الإيرادات، إجمالي المعاملات، متوسط قيمة الطلب، المنتج الأعلى مبيعاً) وجدول إيرادات المنتجات الكامل مع أعداد المشتريات والإيرادات. انقر على أي صف للتوسيع ورؤية تفاصيل المشتريات الفردية. أسفل قسم الإيرادات، يمكن لجميع المستخدمين تصفح بطاقات المنتجات باستخدام البحث وعلامات التصنيف والفلاتر وخيارات الترتيب.",
  },
  {
    id: "data-products",
    titleEn: "Data Products Storefront",
    titleAr: "واجهة منتجات البيانات",
    icon: ShoppingBag,
    contentEn: "The Data Products page is the e-commerce-style storefront for browsing and purchasing aviation datasets. External/marketplace users see a hero banner with a featured product spotlight and new release counts. The page includes a horizontal category tab bar (All, Traffic, Connectivity, Market, Ops, Cargo, Infra, Financial, Fleet, Sustainability, CX, Bundles, Free), a prominent search bar with sort options (Most Popular, Newest, Price), and a left-side filter panel with category checkboxes, frequency, format, price range slider, and a Free Only toggle. Product cards show category badge, star rating, metadata, description, and role-based action buttons: 'Add to Cart' for external users, 'Access Dataset' for GACA internal users, or 'Download' for free products. Click any card to view the full product detail page. Use 'Load More' to see additional products.",
    contentAr: "صفحة منتجات البيانات هي واجهة المتجر الإلكتروني لتصفح وشراء مجموعات بيانات الطيران. يرى المستخدمون الخارجيون لافتة رئيسية مع منتج مميز وعدد الإصدارات الجديدة. تتضمن الصفحة شريط فئات أفقي، وشريط بحث بارز مع خيارات ترتيب، ولوحة فلاتر جانبية. تعرض بطاقات المنتجات شارة الفئة والتقييم بالنجوم والبيانات الوصفية وأزرار إجراء حسب الدور.",
  },
  {
    id: "shopping-cart",
    titleEn: "Shopping Cart & Checkout",
    titleAr: "سلة التسوق والدفع",
    icon: ShoppingCart,
    contentEn: "The Shopping Cart page shows all items you've added from the Data Products storefront. Each item displays the product name, category, format, period, and price with a remove button. Enter a promo code (e.g., GACA2026 for 10% off) and click Apply to get a discount. The order summary shows Subtotal, Discount, VAT (15%), and Total. Click 'Pay' to complete your mock checkout — you'll see a processing animation followed by a success confirmation with an order number and ZATCA invoice reference. The cart icon in the top navigation bar shows your item count and is visible to external/marketplace users (Airline Operator, Airport Operator, Investor/Analyst, Researcher).",
    contentAr: "تعرض صفحة سلة التسوق جميع العناصر التي أضفتها من واجهة منتجات البيانات. يعرض كل عنصر اسم المنتج والفئة والتنسيق والفترة والسعر مع زر إزالة. أدخل رمز ترويجي للحصول على خصم. يعرض ملخص الطلب المجموع الفرعي والخصم وضريبة القيمة المضافة (15%) والإجمالي. انقر على 'ادفع' لإكمال عملية الدفع.",
  },
  {
    id: "hajj-umrah",
    titleEn: "Hajj & Umrah Live Operations",
    titleAr: "عمليات الحج والعمرة",
    icon: Landmark,
    contentEn: "The Hajj & Umrah Live Operations Mode provides a real-time operational dashboard for pilgrimage season management. Features include a countdown to peak Hajj day, pilgrims arrived vs. expected progress tracking by nationality (top 10 countries), an airport congestion heatmap grid covering all 29 Saudi airports with color-coded congestion levels, airline capacity vs. demand gauge cards for the top 6 airlines serving Hajj/Umrah routes, and predictive congestion alerts with a 6-hour lookahead. Use the Refresh Data button to regenerate simulated operational values.",
    contentAr: "يوفر وضع عمليات الحج والعمرة الحية لوحة تحكم تشغيلية في الوقت الفعلي لإدارة موسم الحج. يتضمن عد تنازلي ليوم ذروة الحج، وتتبع تقدم الحجاج القادمين مقابل المتوقعين حسب الجنسية (أعلى 10 دول)، وشبكة خريطة حرارية لازدحام المطارات تغطي جميع المطارات السعودية الـ 29 مع مستويات ازدحام مرمزة بالألوان، وبطاقات مقياس السعة مقابل الطلب لأفضل 6 خطوط طيران تخدم مسارات الحج والعمرة، وتنبيهات ازدحام تنبؤية مع استشراف 6 ساعات.",
  },
  {
    id: "copilot",
    titleEn: "AI Regulatory Copilot",
    titleAr: "المساعد الذكي التنظيمي",
    icon: Bot,
    contentEn: "The AI Copilot is a chat-style assistant that answers common GACA regulatory and aviation questions. Type your question or click a suggested question chip to get an instant response. The copilot supports both English and Arabic questions and provides responses with embedded data tables and charts. Responses include follow-up suggestions for deeper exploration. Use the New Chat button to clear the conversation history and start fresh.",
    contentAr: "المساعد الذكي هو مساعد بأسلوب المحادثة يجيب على الأسئلة الشائعة المتعلقة بالتنظيم والطيران في الهيئة العامة للطيران المدني. اكتب سؤالك أو انقر على شريحة سؤال مقترح للحصول على إجابة فورية. يدعم المساعد الأسئلة بالعربية والإنجليزية ويقدم ردوداً مع جداول بيانات ورسوم بيانية مدمجة. استخدم زر محادثة جديدة لمسح سجل المحادثة والبدء من جديد.",
  },
  {
    id: "war-room",
    titleEn: "Vision 2030 War Room",
    titleAr: "غرفة عمليات رؤية 2030",
    icon: Target,
    contentEn: "The Vision 2030 War Room is a strategic command dashboard tracking progress toward Saudi Arabia's three aviation targets: Air Connectivity Index (250), Total Travelers (330M), and Cargo Shipments (3M). Features include a live countdown clock to the 330M travelers milestone, traffic-light status indicators (green/amber/red) showing days ahead or behind schedule, interactive scenario modeling with sliders for Riyadh Air routes, oil price changes, and tourism growth, and growth trajectory charts showing historical and projected paths to each target.",
    contentAr: "غرفة عمليات رؤية 2030 هي لوحة قيادة استراتيجية تتبع التقدم نحو أهداف الطيران الثلاثة للمملكة: مؤشر الاتصال الجوي (250)، إجمالي المسافرين (330 مليون)، وشحنات البضائع (3 ملايين). تتضمن ساعة عد تنازلي حية لمعلم 330 مليون مسافر، ومؤشرات إشارة ضوئية تظهر الأيام المتقدمة أو المتأخرة عن الجدول، ونمذجة سيناريوهات تفاعلية مع أشرطة تمرير لمسارات طيران الرياض وتغيرات أسعار النفط ونمو السياحة.",
  },
  {
    id: "fifa-2034",
    titleEn: "FIFA 2034 Readiness Tracker",
    titleAr: "متتبع جاهزية فيفا 2034",
    icon: Trophy,
    contentEn: "The FIFA 2034 Readiness Tracker monitors airport infrastructure preparedness for the FIFA World Cup 2034 across 5 host cities: Riyadh, Jeddah, Al Khobar/Dammam, Abha, and NEOM. View overall readiness scores with traffic-light indicators, airport-by-airport capacity comparisons (current vs. required), infrastructure project timelines with progress bars, a match calendar showing which airports face peak demand on which match days, and capacity gap analysis cards per host city.",
    contentAr: "يراقب متتبع جاهزية فيفا 2034 استعداد البنية التحتية للمطارات لكأس العالم فيفا 2034 عبر 5 مدن مستضيفة: الرياض وجدة والخبر/الدمام وأبها ونيوم. اعرض درجات الجاهزية الإجمالية مع مؤشرات الإشارة الضوئية، ومقارنات السعة بين المطارات (الحالية مقابل المطلوبة)، والجداول الزمنية لمشاريع البنية التحتية مع أشرطة التقدم، وتقويم المباريات الذي يوضح المطارات الأكثر ازدحاماً.",
  },
  {
    id: "investor",
    titleEn: "Investor Intelligence",
    titleAr: "ذكاء المستثمرين",
    icon: Briefcase,
    contentEn: "The Investor Intelligence dashboard provides a Bloomberg-style view of Saudi aviation investment opportunities. Features include market overview KPI cards (market size, CAGR, infrastructure pipeline, FDI), market size trajectory charts, route network growth counters, airport privatization pipeline table with status tracking, airline fleet expansion plans, and competitive benchmarking comparing Saudi Arabia against UAE, Qatar, and Turkey across key metrics.",
    contentAr: "توفر لوحة ذكاء المستثمرين عرضاً بأسلوب بلومبرج لفرص الاستثمار في قطاع الطيران السعودي. تتضمن بطاقات مؤشرات أداء نظرة السوق (حجم السوق، معدل النمو السنوي المركب، خط أنابيب البنية التحتية، الاستثمار الأجنبي المباشر)، ومخططات مسار حجم السوق، وعدادات نمو شبكة المسارات، وجدول خط أنابيب خصخصة المطارات، وخطط توسيع أسطول الخطوط الجوية، ومقارنة معيارية تنافسية.",
  },
  {
    id: "anomalies",
    titleEn: "Anomaly Detection",
    titleAr: "كشف الشذوذ",
    icon: AlertTriangle,
    contentEn: "The Anomaly Detection page identifies unusual patterns across aviation metrics. Each anomaly card displays the metric name, affected entity (airport or airline), percentage change, severity badge (critical/warning/info), an AI-generated root-cause narrative, historical pattern references, and recommended action badges. Filter anomalies by severity or entity type. The anomaly timeline chart shows occurrence frequency over the last 30 days. Use the Refresh Data button to generate new random anomalies.",
    contentAr: "تحدد صفحة كشف الشذوذ الأنماط غير العادية عبر مقاييس الطيران. تعرض كل بطاقة شذوذ اسم المقياس والكيان المتأثر (مطار أو خطوط جوية) ونسبة التغيير وشارة الخطورة (حرج/تحذير/معلومات) وسرد تحليلي للسبب الجذري ومراجع أنماط تاريخية وشارات الإجراء الموصى به. فلتر الشذوذ حسب الخطورة أو نوع الكيان.",
  },
  {
    id: "transparency",
    titleEn: "Public Transparency Dashboard",
    titleAr: "لوحة الشفافية العامة",
    icon: Eye,
    contentEn: "The Public Transparency Dashboard is accessible without login at /transparency. It showcases Saudi Arabia's commitment to aviation transparency with headline KPIs (total passengers, airports, airlines, connectivity index), airport rankings by traffic volume, airline on-time performance (OTP) rankings, connectivity statistics, and 5-year passenger and cargo trend charts. A link to this dashboard is available on the landing page.",
    contentAr: "لوحة الشفافية العامة متاحة بدون تسجيل دخول على المسار /transparency. تعرض التزام المملكة العربية السعودية بالشفافية في الطيران مع مؤشرات أداء رئيسية (إجمالي المسافرين، المطارات، الخطوط الجوية، مؤشر الاتصال)، وتصنيفات المطارات حسب حجم الحركة، وتصنيفات أداء الانتظام للخطوط الجوية، وإحصاءات الاتصال، ورسوم بيانية للاتجاهات على مدى 5 سنوات.",
  },
  {
    id: "seasonal-calendar",
    titleEn: "Seasonal Pattern Calendar",
    titleAr: "التقويم الموسمي",
    icon: CalendarDays,
    contentEn: "The Seasonal Pattern Calendar displays a 12-month annual view with each day color-coded by expected traffic volume and season type: Red for Hajj peak, Orange for summer, Purple for Ramadan, Green for National Day, and Blue for low season. Event overlays show FIFA matches, Riyadh Season, Jeddah Season, NEOM events, Eid holidays, and National Day celebrations. Monthly summary cards compare expected vs. actual traffic with variance indicators.",
    contentAr: "يعرض التقويم الموسمي عرضاً سنوياً لـ 12 شهراً مع تلوين كل يوم حسب حجم الحركة المتوقع ونوع الموسم: أحمر لذروة الحج، برتقالي للصيف، بنفسجي لرمضان، أخضر لليوم الوطني، وأزرق للموسم المنخفض. تظهر تراكبات الأحداث مباريات فيفا وموسم الرياض وموسم جدة وفعاليات نيوم وأعياد الفطر والأضحى واليوم الوطني.",
  },
  {
    id: "revenue-ticker",
    titleEn: "Revenue Ticker",
    titleAr: "شريط الإيرادات",
    icon: TrendingUp,
    contentEn: "The Revenue Ticker is a stock-ticker-style scrolling marquee at the top of the Aviation Data Products page, visible to all users. It shows simulated real-time purchase events in the format '[Airline] just purchased [Product] — SAR [amount] · Xm ago', providing a live view of marketplace activity. Click the refresh button to generate new events. For admin users, the ticker is complemented by revenue KPI cards and a detailed product revenue table with drill-down purchase details.",
    contentAr: "شريط الإيرادات هو شريط تمرير بأسلوب بورصة الأسهم يظهر في أعلى صفحة منتجات بيانات الطيران، مرئي لجميع المستخدمين. يعرض أحداث شراء محاكاة في الوقت الفعلي. انقر على زر التحديث لإنشاء أحداث جديدة. للمسؤولين، يُكمل الشريط ببطاقات مؤشرات إيرادات وجدول إيرادات تفصيلي مع تفاصيل المشتريات.",
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
  { icon: Globe, nameEn: "National Overview", nameAr: "النظرة العامة الوطنية", descEn: "High-level KPIs, Vision 2030 progress, traffic trends, and connectivity index tracking.", descAr: "مؤشرات الأداء الرئيسية، تقدم رؤية 2030، اتجاهات الحركة، وتتبع مؤشر الاتصال." },
  { icon: Radar, nameEn: "Flight Operations", nameAr: "عمليات الطيران", descEn: "Flight movements, on-time performance, delays, and operational efficiency.", descAr: "حركات الطيران، الالتزام بالمواعيد، التأخيرات، والكفاءة التشغيلية." },
  { icon: Users, nameEn: "Passengers", nameAr: "المسافرون", descEn: "Passenger volumes, growth trends, nationality breakdown, and seasonal patterns.", descAr: "أحجام المسافرين، اتجاهات النمو، توزيع الجنسيات، والأنماط الموسمية." },
  { icon: Map, nameEn: "Connectivity", nameAr: "الاتصال", descEn: "Global connectivity index, route network analysis, and destination coverage.", descAr: "مؤشر الاتصال العالمي، تحليل شبكة المسارات، وتغطية الوجهات." },
  { icon: Building2, nameEn: "Airports", nameAr: "المطارات", descEn: "Airport performance metrics for all 29 Saudi airports including capacity utilization.", descAr: "مقاييس أداء المطارات لجميع المطارات السعودية الـ 29 بما في ذلك استخدام السعة." },
  { icon: Package, nameEn: "Cargo", nameAr: "الشحن", descEn: "Cargo tonnage, shipment tracking, and progress toward the 3M target.", descAr: "حمولة الشحن، تتبع الشحنات، والتقدم نحو هدف 3 مليون." },
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
                  <ChevronRight className="h-3 w-3 text-muted-foreground ms-auto rtl:rotate-180" />
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
