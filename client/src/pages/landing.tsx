import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Plane,
  Cloud,
  Languages,
  Sun,
  Moon,
  ArrowRight,
  BarChart3,
  Globe,
  Shield,
  Database,
  Users,
  Package,
  TrendingUp,
  Building2,
  Map,
  FileText,
  Code,
  ChevronRight,
  Zap,
  Lock,
  Eye,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function LandingPage() {
  const { t, language, setLanguage } = useTranslation();
  const { toggleTheme, isDark } = useTheme();
  const isAr = language === "ar";

  const stats = [
    { value: "29", label: isAr ? "مطار" : "Airports", labelSub: isAr ? "في المملكة" : "Nationwide" },
    { value: "330M", label: isAr ? "هدف المسافرين" : "Traveler Target", labelSub: isAr ? "رؤية 2030" : "Vision 2030" },
    { value: "250", label: isAr ? "مؤشر الاتصال" : "Connectivity Index", labelSub: isAr ? "الهدف" : "Target" },
    { value: "3M", label: isAr ? "شحنات البضائع" : "Cargo Shipments", labelSub: isAr ? "الهدف السنوي" : "Annual Target" },
  ];

  const features = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: isAr ? "لوحات معلومات تنفيذية" : "Executive Dashboards",
      desc: isAr ? "ست لوحات معلومات متخصصة تغطي كل جانب من الطيران السعودي" : "Six specialized dashboards covering every aspect of Saudi aviation performance.",
      color: "210 85% 42%",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: isAr ? "خريطة الاتصال العالمية" : "Global Connectivity Map",
      desc: isAr ? "تصور تفاعلي لشبكة الطيران السعودية مع العالم" : "Interactive visualization of Saudi Arabia's air connectivity with the world.",
      color: "185 75% 38%",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: isAr ? "مستكشف حركة الطيران" : "Air Traffic Explorer",
      desc: isAr ? "أداة تحليلية متقدمة لاستكشاف بيانات الطيران عبر كل بُعد" : "Advanced analytical tool to explore air traffic data across every dimension.",
      color: "28 85% 48%",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: isAr ? "تقارير آلية" : "Automated Reports",
      desc: isAr ? "تقارير معيارية ومخصصة مع جدولة وتوزيع تلقائي" : "Standard and custom reports with automated scheduling and distribution.",
      color: "280 70% 42%",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: isAr ? "سوق البيانات" : "Data Marketplace",
      desc: isAr ? "اكتشف واستكشف جميع مجموعات البيانات المتاحة مع بيانات وصفية غنية" : "Discover and explore all available datasets with rich metadata and quality scores.",
      color: "340 75% 45%",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: isAr ? "بوابة API للمطورين" : "API Developer Portal",
      desc: isAr ? "وصول برمجي للبيانات مع وثائق تفاعلية وبيئة اختبار" : "Programmatic data access with interactive documentation and sandbox testing.",
      color: "160 70% 38%",
    },
  ];

  const dashboards = [
    { icon: <Globe className="h-4 w-4" />, name: isAr ? "النظرة العامة الوطنية" : "National Overview", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { icon: <Building2 className="h-4 w-4" />, name: isAr ? "أداء المطارات" : "Airport Performance", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
    { icon: <Plane className="h-4 w-4" />, name: isAr ? "استخبارات الطيران" : "Airline Intelligence", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
    { icon: <Map className="h-4 w-4" />, name: isAr ? "خريطة الاتصال" : "Connectivity Map", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { icon: <Package className="h-4 w-4" />, name: isAr ? "استخبارات الشحن" : "Cargo Intelligence", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
    { icon: <Shield className="h-4 w-4" />, name: isAr ? "الرقابة التنظيمية" : "Regulatory Oversight", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  ];

  const capabilities = [
    { icon: <Zap className="h-5 w-5" />, title: isAr ? "بيانات في الوقت الفعلي" : "Real-Time Data", desc: isAr ? "تحديثات يومية من جميع مصادر البيانات" : "Daily refreshed data from all aviation data sources." },
    { icon: <Lock className="h-5 w-5" />, title: isAr ? "أمان على مستوى المؤسسات" : "Enterprise Security", desc: isAr ? "التحكم بالوصول المبني على الأدوار والتشفير الشامل" : "Role-based access control with end-to-end encryption." },
    { icon: <Eye className="h-5 w-5" />, title: isAr ? "ثنائي اللغة" : "Fully Bilingual", desc: isAr ? "واجهة كاملة بالعربية والإنجليزية مع دعم RTL" : "Complete Arabic and English interface with RTL support." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary relative">
                <Cloud className="h-6 w-6 text-primary-foreground/40 absolute" />
                <Plane className="h-5 w-5 text-primary-foreground relative z-10" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">
                  {isAr ? "سحاب" : "Sahab"}
                </span>
                <span className="text-xs text-muted-foreground block leading-none">
                  {isAr ? "سحاب" : "سحاب"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                data-testid="button-landing-language"
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-landing-theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/login">
                <Button data-testid="button-nav-sign-in">
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              <Badge variant="secondary" className="mb-6 text-xs px-3 py-1 no-default-active-elevate">
                <Shield className="h-3 w-3 me-1.5" />
                {isAr ? "الهيئة العامة للطيران المدني" : "General Authority of Civil Aviation"}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              data-testid="text-hero-title"
            >
              {isAr ? (
                <>
                  <span className="text-primary">سحاب</span>
                  <br />
                  المنصة الوطنية لبيانات الطيران
                </>
              ) : (
                <>
                  <span className="text-primary">Sahab</span>
                  <br />
                  National Aviation Data Platform
                </>
              )}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              {isAr
                ? "منصة تحليلات متكاملة للطيران المدني في المملكة العربية السعودية. بيانات حية، رؤى ذكية، وتتبع أهداف رؤية 2030 في الوقت الفعلي."
                : "A comprehensive analytics platform for civil aviation in the Kingdom of Saudi Arabia. Live data, intelligent insights, and real-time Vision 2030 target tracking."}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
            >
              <Link href="/login">
                <Button size="lg" data-testid="button-hero-sign-in">
                  {isAr ? "الدخول إلى المنصة" : "Access the Platform"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/transparency">
                <Button size="lg" variant="outline" data-testid="button-hero-public-dashboard">
                  {isAr ? "عرض لوحة البيانات العامة" : "View Public Dashboard"}
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" data-testid="button-hero-learn-more"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                {isAr ? "اكتشف المزيد" : "Learn More"}
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i + 4}
                variants={scaleIn}
                className="text-center p-5 rounded-xl bg-card border border-card-border"
                data-testid={`stat-hero-${i}`}
              >
                <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium mt-1.5">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.labelSub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 no-default-active-elevate">
              {isAr ? "الميزات" : "Features"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-features-title">
              {isAr ? "كل ما تحتاجه لاتخاذ قرارات مبنية على البيانات" : "Everything you need for data-driven decisions"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {isAr
                ? "أدوات تحليلية متقدمة مصممة خصيصاً لقطاع الطيران السعودي"
                : "Advanced analytical tools purpose-built for Saudi Arabia's aviation sector."}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={i} className="p-6 hover-elevate transition-all group" data-testid={`card-feature-${i}`}>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg mb-4"
                  style={{ backgroundColor: `hsl(${feature.color} / 0.1)`, color: `hsl(${feature.color})` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 no-default-active-elevate">
                {isAr ? "لوحات المعلومات" : "Dashboards"}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-dashboards-title">
                {isAr ? "ست لوحات معلومات متخصصة" : "Six specialized dashboards"}
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                {isAr
                  ? "كل لوحة مصممة لتقديم رؤى عميقة مع إمكانية التصفية والمقارنة والتنقل التفصيلي والتصدير."
                  : "Each dashboard is designed to deliver deep insights with filtering, comparison, drill-down navigation, and export capabilities."}
              </p>

              <div className="mt-8 space-y-3">
                {dashboards.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate cursor-default"
                    data-testid={`dashboard-item-${i}`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-md shrink-0 ${d.color}`}>
                      {d.icon}
                    </div>
                    <span className="text-sm font-medium">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{isAr ? "مؤشر الاتصال الجوي" : "Air Connectivity Index"}</p>
                    <p className="text-4xl font-bold text-primary mt-1">87</p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm text-muted-foreground">{isAr ? "الهدف" : "Target"}</p>
                    <p className="text-2xl font-semibold text-muted-foreground mt-1">250</p>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden" dir="ltr">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: "35%" }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>34.8% {isAr ? "تقدم" : "progress"}</span>
                  <span>+5.2% {isAr ? "سنوياً" : "YoY"}</span>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/40">
                    <Users className="h-4 w-4 mx-auto text-teal-500 mb-1.5" />
                    <p className="text-lg font-bold">98.5M</p>
                    <p className="text-[10px] text-muted-foreground">{isAr ? "مسافرون" : "Travelers YTD"}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/40">
                    <Package className="h-4 w-4 mx-auto text-orange-500 mb-1.5" />
                    <p className="text-lg font-bold">852K</p>
                    <p className="text-[10px] text-muted-foreground">{isAr ? "شحنات" : "Cargo YTD"}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/40">
                    <Plane className="h-4 w-4 mx-auto text-purple-500 mb-1.5" />
                    <p className="text-lg font-bold">892</p>
                    <p className="text-[10px] text-muted-foreground">{isAr ? "مسارات" : "Routes"}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -bottom-3 -left-3 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {isAr ? "مبني لتلبية معايير المؤسسات" : "Built for enterprise standards"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {capabilities.map((cap, i) => (
              <div key={i} className="text-center p-6" data-testid={`capability-${i}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                  {cap.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-primary p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20l-4-4h8l-4 4zm0 0l4 4h-8l4-4z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight" data-testid="text-cta-title">
                {isAr ? "ابدأ باتخاذ قرارات مبنية على البيانات اليوم" : "Start making data-driven decisions today"}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                {isAr
                  ? "انضم إلى منصة سحاب واحصل على وصول فوري لأشمل بيانات الطيران في المملكة."
                  : "Join the Sahab platform and get instant access to the most comprehensive aviation data in the Kingdom."}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/login">
                  <Button size="lg" variant="secondary" data-testid="button-cta-sign-in">
                    {isAr ? "تسجيل الدخول" : "Sign In"}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary relative">
                <Cloud className="h-5 w-5 text-primary-foreground/40 absolute" />
                <Plane className="h-4 w-4 text-primary-foreground relative z-10" />
              </div>
              <div>
                <span className="text-sm font-bold">{isAr ? "سحاب" : "Sahab"}</span>
                <span className="text-xs text-muted-foreground block leading-none">{isAr ? "سحاب" : "سحاب"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>
                {isAr
                  ? "الهيئة العامة للطيران المدني - المملكة العربية السعودية"
                  : "General Authority of Civil Aviation - Kingdom of Saudi Arabia"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isAr ? "© 2026 جميع الحقوق محفوظة" : "© 2026 All rights reserved"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
