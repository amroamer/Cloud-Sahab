import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import {
  Users,
  Building2,
  Plane,
  Globe,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Shield,
  Cloud,
  Languages,
  Sun,
  Moon,
  Package,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function randomize(base: number, variance: number) {
  return Math.round(base + (Math.random() - 0.5) * 2 * variance);
}

function generateData() {
  const totalPassengers = randomize(140, 15);
  const totalAirports = 29;
  const totalAirlines = randomize(85, 10);
  const connectivityIndex = randomize(87, 8);

  const airportRankings = [
    { rank: 1, code: "KAIA", name: "King Abdulaziz Intl", nameAr: "مطار الملك عبدالعزيز الدولي", city: "Jeddah", cityAr: "جدة", volume: randomize(47000, 3000), change: +(Math.random() * 8 + 2).toFixed(1) },
    { rank: 2, code: "KKIA", name: "King Khalid Intl", nameAr: "مطار الملك خالد الدولي", city: "Riyadh", cityAr: "الرياض", volume: randomize(39000, 3000), change: +(Math.random() * 10 + 3).toFixed(1) },
    { rank: 3, code: "KFIA", name: "King Fahd Intl", nameAr: "مطار الملك فهد الدولي", city: "Dammam", cityAr: "الدمام", volume: randomize(16500, 2000), change: +(Math.random() * 6 + 1).toFixed(1) },
    { rank: 4, code: "PMIA", name: "Prince Mohammed Intl", nameAr: "مطار الأمير محمد الدولي", city: "Madinah", cityAr: "المدينة المنورة", volume: randomize(11200, 1500), change: +(Math.random() * 7 + 2).toFixed(1) },
    { rank: 5, code: "TAIA", name: "Ta'if Intl", nameAr: "مطار الطائف الدولي", city: "Ta'if", cityAr: "الطائف", volume: randomize(4200, 500), change: +(Math.random() * 5 + 1).toFixed(1) },
    { rank: 6, code: "ARNA", name: "Abha Regional", nameAr: "مطار أبها الإقليمي", city: "Abha", cityAr: "أبها", volume: randomize(3200, 400), change: +(Math.random() * 4 + 1).toFixed(1) },
    { rank: 7, code: "JZNA", name: "Jazan Regional", nameAr: "مطار جازان الإقليمي", city: "Jazan", cityAr: "جازان", volume: randomize(2000, 300), change: +(Math.random() * 5).toFixed(1) },
    { rank: 8, code: "TABS", name: "Tabuk Regional", nameAr: "مطار تبوك الإقليمي", city: "Tabuk", cityAr: "تبوك", volume: randomize(1700, 200), change: +(Math.random() * 6 + 1).toFixed(1) },
    { rank: 9, code: "QSMA", name: "Qassim Domestic", nameAr: "مطار القصيم المحلي", city: "Buraidah", cityAr: "بريدة", volume: randomize(1500, 200), change: +(Math.random() * 4).toFixed(1) },
    { rank: 10, code: "HAIL", name: "Ha'il Domestic", nameAr: "مطار حائل المحلي", city: "Ha'il", cityAr: "حائل", volume: randomize(1200, 150), change: +(Math.random() * 5).toFixed(1) },
  ];

  const airlineOtp = [
    { rank: 1, name: "Saudia", nameAr: "الخطوط السعودية", code: "SV", otp: randomize(89, 3), flights: randomize(192000, 5000) },
    { rank: 2, name: "Emirates", nameAr: "طيران الإمارات", code: "EK", otp: randomize(88, 3), flights: randomize(31000, 2000) },
    { rank: 3, name: "Qatar Airways", nameAr: "الخطوط القطرية", code: "QR", otp: randomize(86, 3), flights: randomize(20000, 1500) },
    { rank: 4, name: "British Airways", nameAr: "الخطوط البريطانية", code: "BA", otp: randomize(85, 3), flights: randomize(8000, 500) },
    { rank: 5, name: "Turkish Airlines", nameAr: "الخطوط التركية", code: "TK", otp: randomize(84, 3), flights: randomize(18500, 1000) },
    { rank: 6, name: "flyadeal", nameAr: "طيران أديل", code: "F3", otp: randomize(83, 3), flights: randomize(55000, 3000) },
    { rank: 7, name: "flynas", nameAr: "طيران ناس", code: "XY", otp: randomize(81, 4), flights: randomize(82000, 4000) },
    { rank: 8, name: "EgyptAir", nameAr: "مصر للطيران", code: "MS", otp: randomize(78, 4), flights: randomize(15500, 1000) },
    { rank: 9, name: "Air India", nameAr: "طيران الهند", code: "AI", otp: randomize(76, 4), flights: randomize(10500, 800) },
    { rank: 10, name: "PIA", nameAr: "الخطوط الباكستانية", code: "PK", otp: randomize(74, 4), flights: randomize(12200, 800) },
  ].sort((a, b) => b.otp - a.otp).map((a, i) => ({ ...a, rank: i + 1 }));

  const passengerTrend = [
    { year: "2021", passengers: randomize(62, 5), cargo: randomize(580, 40) },
    { year: "2022", passengers: randomize(85, 6), cargo: randomize(680, 40) },
    { year: "2023", passengers: randomize(105, 7), cargo: randomize(750, 45) },
    { year: "2024", passengers: randomize(120, 8), cargo: randomize(810, 50) },
    { year: "2025", passengers: randomize(135, 8), cargo: randomize(850, 50) },
  ];

  const connectivityStats = {
    countries: randomize(78, 5),
    routes: randomize(237, 15),
    domesticRoutes: randomize(48, 5),
    internationalRoutes: randomize(189, 10),
    regions: 6,
  };

  return {
    totalPassengers,
    totalAirports,
    totalAirlines,
    connectivityIndex,
    airportRankings,
    airlineOtp,
    passengerTrend,
    connectivityStats,
  };
}

const CHART_COLORS = {
  primary: "hsl(210, 85%, 42%)",
  secondary: "hsl(185, 75%, 38%)",
  tertiary: "hsl(28, 85%, 48%)",
  muted: "hsl(210, 8%, 70%)",
};

export default function TransparencyPage() {
  const { t, language, setLanguage } = useTranslation();
  const { toggleTheme, isDark } = useTheme();
  const isAr = language === "ar";
  const [data, setData] = useState(generateData);

  const handleRefresh = useCallback(() => {
    setData(generateData());
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={isAr ? "rtl" : "ltr"}>
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer" data-testid="link-home-logo">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary relative">
                  <Cloud className="h-6 w-6 text-primary-foreground/40 absolute" />
                  <Plane className="h-5 w-5 text-primary-foreground relative z-10" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight">
                    {isAr ? "سحاب" : "Sahab"}
                  </span>
                  <span className="text-xs text-muted-foreground block leading-none">
                    {isAr ? "لوحة البيانات العامة" : "Public Dashboard"}
                  </span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-1.5">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRefresh}
                data-testid="button-refresh-data"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                data-testid="button-transparency-language"
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-transparency-theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/login">
                <Button data-testid="button-transparency-sign-in">
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <ScrollArea className="h-screen">
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 no-default-active-elevate">
              <Shield className="h-3 w-3 me-1.5" />
              {isAr ? "الهيئة العامة للطيران المدني" : "General Authority of Civil Aviation"}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-transparency-title">
              {isAr
                ? "المملكة العربية السعودية — الجهة التنظيمية الأكثر شفافية في قطاع الطيران"
                : "Saudi Arabia — The Most Transparent Aviation Regulator"}
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              {isAr
                ? "بيانات أداء الطيران المدني في المملكة العربية السعودية متاحة للجمهور بشفافية كاملة"
                : "Saudi Arabia's civil aviation performance data, openly available for full public transparency"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiStrip
              icon={<Users className="h-5 w-5" />}
              label={isAr ? "إجمالي المسافرين" : "Total Passengers"}
              value={`${data.totalPassengers}M`}
              color="210 85% 42%"
              testId="kpi-total-passengers"
            />
            <KpiStrip
              icon={<Building2 className="h-5 w-5" />}
              label={isAr ? "المطارات" : "Airports"}
              value={data.totalAirports.toString()}
              color="185 75% 38%"
              testId="kpi-total-airports"
            />
            <KpiStrip
              icon={<Plane className="h-5 w-5" />}
              label={isAr ? "شركات الطيران" : "Airlines"}
              value={data.totalAirlines.toString()}
              color="28 85% 48%"
              testId="kpi-total-airlines"
            />
            <KpiStrip
              icon={<Globe className="h-5 w-5" />}
              label={isAr ? "مؤشر الاتصال" : "Connectivity Index"}
              value={data.connectivityIndex.toString()}
              color="280 70% 42%"
              testId="kpi-connectivity-index"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4" data-testid="text-airport-rankings-title">
                {isAr ? "تصنيف المطارات حسب حجم الحركة" : "Airport Rankings by Traffic Volume"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-airport-rankings">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-start py-2 pe-3 font-medium">#</th>
                      <th className="text-start py-2 pe-3 font-medium">{isAr ? "المطار" : "Airport"}</th>
                      <th className="text-start py-2 pe-3 font-medium">{isAr ? "المدينة" : "City"}</th>
                      <th className="text-end py-2 pe-3 font-medium">{isAr ? "المسافرون (ألف)" : "Pax (K)"}</th>
                      <th className="text-end py-2 font-medium">{isAr ? "التغيير %" : "Change %"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.airportRankings.map((a) => (
                      <tr key={a.code} className="border-b last:border-0" data-testid={`row-airport-${a.code}`}>
                        <td className="py-2.5 pe-3 text-muted-foreground">{a.rank}</td>
                        <td className="py-2.5 pe-3 font-medium">{isAr ? a.nameAr : a.name}</td>
                        <td className="py-2.5 pe-3 text-muted-foreground">{isAr ? a.cityAr : a.city}</td>
                        <td className="py-2.5 pe-3 text-end font-medium">{(a.volume / 1000).toFixed(1)}</td>
                        <td className="py-2.5 text-end">
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="h-3 w-3" />
                            +{a.change}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4" data-testid="text-otp-rankings-title">
                {isAr ? "تصنيف شركات الطيران حسب الأداء في الوقت" : "Airline On-Time Performance Ranking"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-otp-rankings">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-start py-2 pe-3 font-medium">#</th>
                      <th className="text-start py-2 pe-3 font-medium">{isAr ? "شركة الطيران" : "Airline"}</th>
                      <th className="text-end py-2 pe-3 font-medium">{isAr ? "الالتزام بالمواعيد %" : "OTP %"}</th>
                      <th className="text-end py-2 font-medium">{isAr ? "الرحلات" : "Flights"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.airlineOtp.map((a) => (
                      <tr key={a.code} className="border-b last:border-0" data-testid={`row-airline-${a.code}`}>
                        <td className="py-2.5 pe-3 text-muted-foreground">{a.rank}</td>
                        <td className="py-2.5 pe-3 font-medium">{isAr ? a.nameAr : a.name}</td>
                        <td className="py-2.5 pe-3 text-end">
                          <Badge
                            variant={a.otp >= 85 ? "default" : a.otp >= 80 ? "secondary" : "destructive"}
                            className="text-xs no-default-active-elevate"
                          >
                            {a.otp}%
                          </Badge>
                        </td>
                        <td className="py-2.5 text-end text-muted-foreground">{(a.flights / 1000).toFixed(1)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-2" data-testid="text-connectivity-title">
              {isAr ? "إحصائيات الاتصال الجوي" : "Air Connectivity Statistics"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isAr
                ? "نظرة عامة على شبكة الطيران السعودية حول العالم"
                : "Overview of Saudi Arabia's air connectivity network worldwide"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <StatBox
                label={isAr ? "الدول" : "Countries"}
                value={data.connectivityStats.countries.toString()}
                testId="stat-countries"
              />
              <StatBox
                label={isAr ? "إجمالي المسارات" : "Total Routes"}
                value={data.connectivityStats.routes.toString()}
                testId="stat-total-routes"
              />
              <StatBox
                label={isAr ? "مسارات محلية" : "Domestic Routes"}
                value={data.connectivityStats.domesticRoutes.toString()}
                testId="stat-domestic-routes"
              />
              <StatBox
                label={isAr ? "مسارات دولية" : "International Routes"}
                value={data.connectivityStats.internationalRoutes.toString()}
                testId="stat-intl-routes"
              />
              <StatBox
                label={isAr ? "المناطق" : "Regions"}
                value={data.connectivityStats.regions.toString()}
                testId="stat-regions"
              />
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4" data-testid="text-passenger-trend-title">
                {isAr ? "اتجاه المسافرين (آخر 5 سنوات)" : "Passenger Trend (Last 5 Years)"}
              </h2>
              <div className="h-[280px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.passengerTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="hsl(210, 6%, 50%)"
                      label={{
                        value: isAr ? "مليون مسافر" : "Passengers (M)",
                        angle: -90,
                        position: "insideLeft",
                        style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}M`, ""]}
                    />
                    <Legend />
                    <defs>
                      <linearGradient id="gradTransPax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="passengers"
                      name={isAr ? "المسافرون (مليون)" : "Passengers (M)"}
                      stroke={CHART_COLORS.primary}
                      strokeWidth={2}
                      fill="url(#gradTransPax)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4" data-testid="text-cargo-trend-title">
                {isAr ? "اتجاه الشحن الجوي (آخر 5 سنوات)" : "Cargo Trend (Last 5 Years)"}
              </h2>
              <div className="h-[280px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.passengerTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="hsl(210, 6%, 50%)"
                      label={{
                        value: isAr ? "ألف طن" : "Tonnes (K)",
                        angle: -90,
                        position: "insideLeft",
                        style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}K`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="cargo"
                      name={isAr ? "الشحن (ألف طن)" : "Cargo (K Tonnes)"}
                      fill={CHART_COLORS.tertiary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <footer className="border-t pt-8 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>
                  {isAr
                    ? "الهيئة العامة للطيران المدني - المملكة العربية السعودية"
                    : "General Authority of Civil Aviation - Kingdom of Saudi Arabia"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "© 2026 جميع الحقوق محفوظة • البيانات لأغراض التوضيح" : "© 2026 All rights reserved • Data for illustration purposes"}
              </p>
            </div>
          </footer>
        </div>
      </ScrollArea>
    </div>
  );
}

function KpiStrip({
  icon,
  label,
  value,
  color,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  testId: string;
}) {
  return (
    <Card className="p-4" data-testid={testId}>
      <div className="flex items-center gap-2 mb-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md shrink-0"
          style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
        >
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight" data-testid={`${testId}-value`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </Card>
  );
}

function StatBox({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <div className="text-center p-4 rounded-lg bg-muted/40" data-testid={testId}>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
