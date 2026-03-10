import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Database,
  Code,
  Bell,
  Settings,
  Building2,
  Plane,
  Map,
  Package,
  Shield,
  Construction,
} from "lucide-react";

const pageConfig: Record<string, { icon: typeof BarChart3; titleEn: string; titleAr: string; descEn: string; descAr: string }> = {
  "/explorer": {
    icon: BarChart3,
    titleEn: "Air Traffic Intelligence Explorer",
    titleAr: "مستكشف حركة الطيران",
    descEn: "Explore trip-level air traffic data across every dimension with interactive visualizations.",
    descAr: "استكشف بيانات حركة الطيران على مستوى الرحلة عبر كل بُعد مع تصورات تفاعلية.",
  },
  "/self-service": {
    icon: TrendingUp,
    titleEn: "Self-Service Analytics Workspace",
    titleAr: "مساحة عمل التحليلات الذاتية",
    descEn: "Build custom reports and dashboards by combining multiple data visualizations.",
    descAr: "أنشئ تقارير ولوحات معلومات مخصصة من خلال دمج تصورات بيانات متعددة.",
  },
  "/reports": {
    icon: FileText,
    titleEn: "Report Center",
    titleAr: "مركز التقارير",
    descEn: "Browse, search, and download published aviation reports and analytics.",
    descAr: "تصفح وابحث وحمّل تقارير وتحليلات الطيران المنشورة.",
  },
  "/data-products": {
    icon: Database,
    titleEn: "Data Marketplace",
    titleAr: "سوق البيانات",
    descEn: "Browse, preview, and download aviation data products with rich metadata.",
    descAr: "تصفح ومعاينة وتحميل منتجات بيانات الطيران مع بيانات وصفية غنية.",
  },
  "/api-portal": {
    icon: Code,
    titleEn: "API Developer Portal",
    titleAr: "بوابة المطورين",
    descEn: "Access API documentation, manage keys, and test endpoints in the sandbox.",
    descAr: "الوصول إلى وثائق API وإدارة المفاتيح واختبار نقاط النهاية.",
  },
  "/notifications": {
    icon: Bell,
    titleEn: "Notification Center",
    titleAr: "مركز الإشعارات",
    descEn: "View all alerts, system messages, and updates in one place.",
    descAr: "عرض جميع التنبيهات ورسائل النظام والتحديثات في مكان واحد.",
  },
  "/settings": {
    icon: Settings,
    titleEn: "Settings & Preferences",
    titleAr: "الإعدادات والتفضيلات",
    descEn: "Manage your profile, display preferences, and notification settings.",
    descAr: "إدارة ملفك الشخصي وتفضيلات العرض وإعدادات الإشعارات.",
  },
  "/dashboards/airports": {
    icon: Building2,
    titleEn: "Airport Performance",
    titleAr: "أداء المطارات",
    descEn: "Detailed performance analytics for each of the 29 Saudi airports.",
    descAr: "تحليلات أداء تفصيلية لكل من المطارات السعودية الـ 29.",
  },
  "/dashboards/airlines": {
    icon: Plane,
    titleEn: "Airline Market Intelligence",
    titleAr: "استخبارات سوق الطيران",
    descEn: "Market intelligence for all airlines operating in Saudi Arabia.",
    descAr: "استخبارات السوق لجميع شركات الطيران العاملة في السعودية.",
  },
  "/dashboards/connectivity": {
    icon: Map,
    titleEn: "Connectivity Map",
    titleAr: "خريطة الاتصال",
    descEn: "Interactive visualization of Saudi Arabia's air connectivity with the world.",
    descAr: "تصور تفاعلي لاتصال المملكة العربية السعودية الجوي بالعالم.",
  },
  "/dashboards/cargo": {
    icon: Package,
    titleEn: "Cargo Intelligence",
    titleAr: "استخبارات الشحن",
    descEn: "Track air cargo performance and progress toward the 3 million shipments target.",
    descAr: "تتبع أداء الشحن الجوي والتقدم نحو هدف 3 ملايين شحنة.",
  },
  "/dashboards/regulatory": {
    icon: Shield,
    titleEn: "Regulatory Oversight",
    titleAr: "الرقابة التنظيمية",
    descEn: "Regulatory monitoring including licensing, violations, and compliance.",
    descAr: "المراقبة التنظيمية بما في ذلك التراخيص والمخالفات والامتثال.",
  },
};

export function PlaceholderPage({ path }: { path: string }) {
  const { language } = useTranslation();
  const config = pageConfig[path];

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <Card className="max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <Construction className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Coming Soon</h1>
            <p className="text-sm text-muted-foreground mb-4">This section is under development.</p>
            <Link href="/home"><Button>Back to Home</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="max-w-lg w-full text-center">
        <CardContent className="pt-10 pb-10 space-y-4">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-7 w-7 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-placeholder-title">
              {language === "ar" ? config.titleAr : config.titleEn}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
              {language === "ar" ? config.descAr : config.descEn}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Construction className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-muted-foreground font-medium">
              {language === "ar" ? "قيد التطوير" : "Coming Soon"}
            </span>
          </div>
          <Link href="/home">
            <Button variant="secondary" data-testid="button-back-home">
              {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
