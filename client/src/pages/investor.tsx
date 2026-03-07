import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  DollarSign,
  Building2,
  Plane,
  Globe,
  Briefcase,
  RefreshCw,
  ArrowUpRight,
  BarChart3,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { generateInvestorData } from "@/lib/investor-data";
import { SectionTooltip } from "@/components/section-tooltip";

const CHART_COLORS = [
  "hsl(210, 85%, 42%)",
  "hsl(185, 75%, 38%)",
  "hsl(28, 85%, 48%)",
  "hsl(340, 72%, 48%)",
  "hsl(160, 70%, 38%)",
  "hsl(265, 60%, 50%)",
  "hsl(35, 80%, 50%)",
];

const LABELS = {
  en: {
    title: "Investor Intelligence",
    subtitle: "Saudi Aviation Deal Room & Market Analysis",
    refreshData: "Refresh Data",
    marketOverview: "Market Overview",
    investmentThesis: "Saudi Aviation Investment Thesis",
    marketSize: "Market Size",
    cagr: "CAGR",
    opportunities: "Key Opportunities",
    privatizationPipeline: "Airport Privatization Pipeline",
    airport: "Airport",
    status: "Status",
    timeline: "Timeline",
    expectedValue: "Expected Value ($B)",
    fleetExpansion: "Airline Fleet Expansion Plans",
    airline: "Airline",
    currentFleet: "Current Fleet",
    orders: "Orders",
    delivery: "Delivery Timeline",
    type: "Type",
    routeGrowth: "Route Network Growth",
    routesPerYear: "Routes Added Per Year",
    competitiveBenchmark: "Competitive Benchmarking",
    country: "Country",
    passengers: "Passengers (M)",
    routes: "Routes",
    airports: "Airports",
    growthRate: "Growth Rate (%)",
    marketGrowthChart: "Market Size Trajectory ($B)",
    actual: "Actual",
    projected: "Projected",
    planned: "Planned",
    inProgress: "In Progress",
    completed: "Completed",
    totalRoutes: "Total Routes",
    yoyGrowth: "YoY Growth",
  },
  ar: {
    title: "ذكاء المستثمرين",
    subtitle: "غرفة صفقات الطيران السعودي وتحليل السوق",
    refreshData: "تحديث البيانات",
    marketOverview: "نظرة عامة على السوق",
    investmentThesis: "أطروحة الاستثمار في الطيران السعودي",
    marketSize: "حجم السوق",
    cagr: "معدل النمو السنوي المركب",
    opportunities: "الفرص الرئيسية",
    privatizationPipeline: "خط أنابيب خصخصة المطارات",
    airport: "المطار",
    status: "الحالة",
    timeline: "الجدول الزمني",
    expectedValue: "القيمة المتوقعة (مليار $)",
    fleetExpansion: "خطط توسيع أسطول الطيران",
    airline: "الناقل الجوي",
    currentFleet: "الأسطول الحالي",
    orders: "الطلبيات",
    delivery: "جدول التسليم",
    type: "النوع",
    routeGrowth: "نمو شبكة الخطوط",
    routesPerYear: "الخطوط المضافة سنوياً",
    competitiveBenchmark: "المقارنة التنافسية",
    country: "الدولة",
    passengers: "المسافرون (مليون)",
    routes: "الخطوط",
    airports: "المطارات",
    growthRate: "معدل النمو (%)",
    marketGrowthChart: "مسار حجم السوق (مليار $)",
    actual: "فعلي",
    projected: "متوقع",
    planned: "مخطط",
    inProgress: "قيد التنفيذ",
    completed: "مكتمل",
    totalRoutes: "إجمالي الخطوط",
    yoyGrowth: "النمو السنوي",
  },
};

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(210, 5%, 96%)",
  border: "1px solid hsl(210, 5%, 88%)",
  borderRadius: "6px",
  fontSize: "12px",
};

const METRIC_ICONS: Record<string, typeof DollarSign> = {
  market: DollarSign,
  growth: TrendingUp,
  infra: Building2,
  tourism: Globe,
  fdi: Briefcase,
  deals: Target,
};

const METRIC_COLORS = [
  "210, 85%, 42%",
  "160, 70%, 38%",
  "28, 85%, 48%",
  "265, 60%, 50%",
  "185, 75%, 38%",
  "340, 72%, 48%",
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function InvestorIntelligence() {
  const { language } = useTranslation();
  const l = LABELS[language];

  const [data, setData] = useState(() => generateInvestorData());

  const handleRefresh = useCallback(() => {
    setData(generateInvestorData());
  }, []);

  const statusBadge = (status: "planned" | "in-progress" | "completed") => {
    const map = {
      planned: { label: l.planned, variant: "secondary" as const },
      "in-progress": { label: l.inProgress, variant: "default" as const },
      completed: { label: l.completed, variant: "secondary" as const },
    };
    const s = map[status];
    return (
      <Badge
        variant={s.variant}
        className={`no-default-active-elevate ${status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : status === "in-progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""}`}
      >
        {s.label}
      </Badge>
    );
  };

  const latestRoutes = data.routeGrowth[data.routeGrowth.length - 1];
  const prevRoutes = data.routeGrowth[data.routeGrowth.length - 2];
  const routeYoyGrowth = prevRoutes ? (((latestRoutes.routes - prevRoutes.routes) / prevRoutes.routes) * 100).toFixed(1) : "0";

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-investor-title">
              {l.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{l.subtitle}</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" data-testid="button-refresh-investor">
            <RefreshCw className="h-4 w-4 me-2" />
            {l.refreshData}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.marketMetrics.map((metric, i) => {
            const IconComp = METRIC_ICONS[metric.icon] || DollarSign;
            const color = METRIC_COLORS[i % METRIC_COLORS.length];
            return (
              <Card key={metric.label} className="p-4" data-testid={`card-metric-${i}`}>
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className="flex items-center justify-center h-9 w-9 rounded-md shrink-0"
                    style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
                  >
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{language === "ar" ? metric.labelAr : metric.label}</p>
                    <p className="text-xl font-bold" data-testid={`text-metric-value-${i}`}>
                      {language === "ar" ? metric.valueAr : metric.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+{metric.change}%</span>
                  <span className="text-xs text-muted-foreground ms-1">YoY</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">{l.marketGrowthChart}</h2>
              <SectionTooltip tooltip={language === "ar" ? "مسار نمو سوق الطيران السعودي الفعلي والمتوقع" : "Saudi aviation market actual and projected growth trajectory"} />
            </div>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.marketGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="marketSize"
                    name={l.actual}
                    stroke={CHART_COLORS[0]}
                    fill={CHART_COLORS[0]}
                    fillOpacity={0.15}
                    strokeWidth={2}
                    connectNulls={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    name={l.projected}
                    stroke={CHART_COLORS[4]}
                    fill={CHART_COLORS[4]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="6 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">{l.routeGrowth}</h2>
              <SectionTooltip tooltip={language === "ar" ? "عدد خطوط الطيران المضافة سنوياً" : "Number of airline routes added per year"} />
            </div>
            <div className="flex items-center gap-6 mb-4 flex-wrap">
              <div>
                <p className="text-xs text-muted-foreground">{l.totalRoutes}</p>
                <p className="text-3xl font-bold" data-testid="text-route-counter">
                  <AnimatedCounter target={latestRoutes.routes} />
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{l.yoyGrowth}</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400" data-testid="text-route-growth">+{routeYoyGrowth}%</p>
                </div>
              </div>
            </div>
            <div className="h-[240px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.routeGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="routes" name={l.routesPerYear} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">{l.privatizationPipeline}</h2>
            <SectionTooltip tooltip={language === "ar" ? "حالة خصخصة المطارات والقيمة المتوقعة" : "Airport privatization status and expected valuation"} />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{l.airport}</TableHead>
                  <TableHead>{l.status}</TableHead>
                  <TableHead>{l.timeline}</TableHead>
                  <TableHead className="text-end">{l.expectedValue}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.privatizationPipeline.map((entry, i) => (
                  <TableRow key={entry.airport} data-testid={`row-privatization-${i}`}>
                    <TableCell className="font-medium text-sm">
                      {language === "ar" ? entry.airportAr : entry.airport}
                    </TableCell>
                    <TableCell>{statusBadge(entry.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {language === "ar" ? entry.timelineAr : entry.timeline}
                    </TableCell>
                    <TableCell className="text-end font-medium">${entry.expectedValue}B</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">{l.fleetExpansion}</h2>
            <SectionTooltip tooltip={language === "ar" ? "خطط توسيع أسطول الناقلات الجوية السعودية" : "Saudi airline fleet expansion plans and aircraft orders"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.fleetExpansions.map((fleet, i) => (
              <Card key={fleet.airline} className="p-4" data-testid={`card-fleet-${i}`}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-sm">{language === "ar" ? fleet.airlineAr : fleet.airline}</h3>
                  <Badge variant="secondary" className="no-default-active-elevate">{fleet.type}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{l.currentFleet}</span>
                    <span className="text-sm font-bold" data-testid={`text-fleet-current-${i}`}>{fleet.currentFleet}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{l.orders}</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400" data-testid={`text-fleet-orders-${i}`}>+{fleet.orders}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{l.delivery}</span>
                    <span className="text-xs text-muted-foreground">{language === "ar" ? fleet.deliveryTimelineAr : fleet.deliveryTimeline}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">{l.competitiveBenchmark}</h2>
            <SectionTooltip tooltip={language === "ar" ? "مقارنة أداء الطيران السعودي مع دول المنطقة" : "Saudi aviation performance compared to regional competitors"} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{l.country}</TableHead>
                    <TableHead className="text-end">{l.passengers}</TableHead>
                    <TableHead className="text-end">{l.routes}</TableHead>
                    <TableHead className="text-end">{l.airports}</TableHead>
                    <TableHead className="text-end">{l.growthRate}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.benchmarkData.map((row, i) => (
                    <TableRow key={row.country} data-testid={`row-benchmark-${i}`}>
                      <TableCell className="font-medium text-sm">
                        {language === "ar" ? row.countryAr : row.country}
                      </TableCell>
                      <TableCell className="text-end">{row.passengers}</TableCell>
                      <TableCell className="text-end">{row.routes}</TableCell>
                      <TableCell className="text-end">{row.airports}</TableCell>
                      <TableCell className="text-end">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">+{row.growthRate}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.benchmarkData.map(r => ({
                    name: language === "ar" ? r.countryAr : r.country,
                    passengers: r.passengers,
                    routes: r.routes / 10,
                    growthRate: r.growthRate,
                  }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" width={90} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend />
                  <Bar dataKey="passengers" name={l.passengers} fill={CHART_COLORS[0]} radius={[0, 3, 3, 0]} />
                  <Bar dataKey="growthRate" name={l.growthRate} fill={CHART_COLORS[4]} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
