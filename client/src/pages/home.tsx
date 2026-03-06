import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import {
  Globe,
  Users,
  Package,
  AlertCircle,
  AlertTriangle,
  Info,
  BarChart3,
  FileText,
  Database,
  Code,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Plane,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";

const alertsData = [
  {
    id: "1",
    severity: "critical",
    title: "Connectivity Index trajectory below 2030 pace",
    titleAr: "مسار مؤشر الاتصال أقل من وتيرة ٢٠٣٠",
    time: "10 min ago",
    timeAr: "منذ ١٠ دقائق",
  },
  {
    id: "2",
    severity: "warning",
    title: "KKIA departures delayed avg 45min due to weather",
    titleAr: "تأخر رحلات مطار الملك خالد بمعدل ٤٥ دقيقة بسبب الطقس",
    time: "1 hour ago",
    timeAr: "منذ ساعة",
  },
  {
    id: "3",
    severity: "info",
    title: "New route: Riyadh-Barcelona launched by Saudia",
    titleAr: "مسار جديد: الرياض-برشلونة أطلقته الخطوط السعودية",
    time: "3 hours ago",
    timeAr: "منذ ٣ ساعات",
  },
];

const recentActivity = [
  { id: "1", title: "National Overview Dashboard", titleAr: "لوحة النظرة العامة الوطنية", type: "dashboard", time: "Today, 9:15 AM", timeAr: "اليوم، ٩:١٥ ص" },
  { id: "2", title: "Monthly Traffic Report - Feb 2026", titleAr: "تقرير حركة المرور الشهري - فبراير ٢٠٢٦", type: "report", time: "Today, 8:30 AM", timeAr: "اليوم، ٨:٣٠ ص" },
  { id: "3", title: "KAIA Airport Performance", titleAr: "أداء مطار الملك عبدالعزيز", type: "dashboard", time: "Yesterday, 4:22 PM", timeAr: "أمس، ٤:٢٢ م" },
  { id: "4", title: "Airline Market Share Analysis", titleAr: "تحليل الحصة السوقية لشركات الطيران", type: "analysis", time: "Yesterday, 2:10 PM", timeAr: "أمس، ٢:١٠ م" },
  { id: "5", title: "Cargo Intelligence Dashboard", titleAr: "لوحة استخبارات الشحن", type: "dashboard", time: "Mar 4, 11:05 AM", timeAr: "٤ مارس، ١١:٠٥ ص" },
];

const newReports = [
  { id: "1", title: "Monthly Aviation Statistics - February 2026", titleAr: "إحصائيات الطيران الشهرية - فبراير ٢٠٢٦", date: "Mar 5, 2026", dateAr: "٥ مارس ٢٠٢٦" },
  { id: "2", title: "Q4 2025 Connectivity Assessment", titleAr: "تقييم الاتصال للربع الرابع ٢٠٢٥", date: "Mar 3, 2026", dateAr: "٣ مارس ٢٠٢٦" },
  { id: "3", title: "Airport Benchmarking Report - Annual", titleAr: "تقرير مقارنة المطارات - سنوي", date: "Mar 1, 2026", dateAr: "١ مارس ٢٠٢٦" },
];

const favorites = [
  { id: "1", title: "National Overview", titleAr: "النظرة العامة الوطنية", type: "Dashboard", icon: LayoutDashboard, href: "/dashboards/overview" },
  { id: "2", title: "KAIA Performance", titleAr: "أداء مطار الملك عبدالعزيز", type: "Dashboard", icon: TrendingUp, href: "/dashboards/airports" },
  { id: "3", title: "Traffic Explorer", titleAr: "مستكشف الحركة", type: "Analysis", icon: BarChart3, href: "/explorer" },
];

function getGreeting(language: string): { text: string; icon: typeof Sun } {
  const hour = new Date().getHours();
  if (hour < 12) {
    return {
      text: language === "ar" ? "صباح الخير" : "Good morning",
      icon: Sun,
    };
  } else if (hour < 18) {
    return {
      text: language === "ar" ? "مساء الخير" : "Good afternoon",
      icon: Sunset,
    };
  } else {
    return {
      text: language === "ar" ? "مساء الخير" : "Good evening",
      icon: Moon,
    };
  }
}

export default function HomePage() {
  const { t, language } = useTranslation();
  const { user } = useAuth();

  const severityIcons: Record<string, typeof Info> = {
    critical: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const severityColors: Record<string, string> = {
    critical: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };

  const severityBg: Record<string, string> = {
    critical: "bg-red-500/10",
    warning: "bg-amber-500/10",
    info: "bg-blue-500/10",
  };

  const userName = language === "ar" ? user?.nameAr : user?.name;
  const greeting = getGreeting(language);
  const GreetingIcon = greeting.icon;
  const orgName = language === "ar" ? user?.organizationAr : user?.organization;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GreetingIcon className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight" data-testid="text-welcome">
                  {greeting.text}, {userName?.split(" ")[0]}
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="secondary" className="text-xs" data-testid="badge-role">
                  {user?.role}
                </Badge>
                <span className="text-xs text-muted-foreground">{orgName}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {language === "ar" ? "٦ مارس ٢٠٢٦ - ٦ رمضان ١٤٤٧" : "March 6, 2026 - 6 Ramadan 1447"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground" data-testid="text-summary">
                {t("home.summary", { passengers: "12.4M", change: "+7.2%" })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard
            title={t("kpi.connectivity")}
            value="87"
            target="250"
            progress={34.8}
            change={5.2}
            sparklineData={[62, 65, 68, 71, 73, 75, 72, 78, 80, 82, 85, 87]}
            href="/dashboards/overview"
            icon={<Globe className="h-5 w-5" />}
            color="210 53% 23%"
          />
          <KpiCard
            title={t("kpi.travelers")}
            value="98.5M"
            target="330M"
            progress={29.8}
            change={7.2}
            sparklineData={[5.8, 6.2, 7.1, 8.5, 9.2, 10.1, 11.2, 10.8, 9.5, 11.5, 12.1, 12.4]}
            href="/dashboards/overview"
            icon={<Users className="h-5 w-5" />}
            color="168 74% 42%"
          />
          <KpiCard
            title={t("kpi.cargo")}
            value="852K"
            target="3M"
            progress={28.4}
            change={12.5}
            sparklineData={[55, 58, 62, 68, 72, 75, 71, 78, 82, 85, 88, 92]}
            href="/dashboards/overview"
            icon={<Package className="h-5 w-5" />}
            color="207 62% 47%"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold">{t("home.favorites")}</h2>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {favorites.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/40 hover-elevate cursor-pointer" data-testid={`link-favorite-${item.id}`}>
                      <item.icon className="h-4 w-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{language === "ar" ? item.titleAr : item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold">{t("home.recentActivity")}</h2>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                {recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-md hover-elevate cursor-pointer"
                    data-testid={`link-recent-${item.id}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-2 w-2 rounded-full bg-primary/40 shrink-0" />
                      <p className="text-sm truncate">{language === "ar" ? item.titleAr : item.title}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {language === "ar" ? item.timeAr : item.time}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold">{t("home.newReports")}</h2>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {newReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/30 hover-elevate cursor-pointer"
                    data-testid={`link-report-${report.id}`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{language === "ar" ? report.titleAr : report.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? report.dateAr : report.date}</p>
                    </div>
                    <Button variant="secondary" size="sm" data-testid={`button-view-report-${report.id}`}>
                      {language === "ar" ? "عرض" : "View"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold">{t("home.alerts")}</h2>
                <Link href="/notifications">
                  <Button variant="ghost" size="sm" data-testid="link-view-all-alerts">
                    {t("home.viewAll")}
                    <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {alertsData.map((alert) => {
                  const Icon = severityIcons[alert.severity];
                  return (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-md cursor-pointer hover-elevate"
                      style={{ backgroundColor: `var(--elevate-1)` }}
                      data-testid={`alert-${alert.id}`}
                    >
                      <div className={`mt-0.5 p-1 rounded ${severityBg[alert.severity]}`}>
                        <Icon className={`h-3.5 w-3.5 ${severityColors[alert.severity]}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">{language === "ar" ? alert.titleAr : alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? alert.timeAr : alert.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4">{t("home.quickLinks")}</h2>
              <div className="space-y-2">
                {[
                  { label: t("home.exploreTraffic"), icon: BarChart3, href: "/explorer" },
                  { label: t("home.buildReport"), icon: FileText, href: "/self-service" },
                  { label: t("home.browseCatalog"), icon: Database, href: "/catalog" },
                  { label: t("home.viewApiDocs"), icon: Code, href: "/api-portal" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover-elevate cursor-pointer" data-testid={`link-quick-${link.href.replace(/\//g, "-")}`}>
                      <link.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{link.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ms-auto rtl:rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4">{t("dashboard.snapshot")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: t("dashboard.totalAirports"), value: "29" },
                  { label: t("dashboard.activeAirlines"), value: "47" },
                  { label: t("dashboard.totalRoutes"), value: "892" },
                  { label: t("dashboard.totalDestinations"), value: "183" },
                  { label: t("dashboard.avgLoadFactor"), value: "78%" },
                  { label: t("dashboard.avgOTP"), value: "82%" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2.5 rounded-md bg-muted/30" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <p className="text-lg font-bold text-primary">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
