import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChartToolbar } from "@/components/chart-toolbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MONTHLY_TRAFFIC, AIRPORTS, AIRLINES } from "@/lib/mock-data";
import {
  BarChart3,
  Layers,
  TrendingUp,
  AreaChartIcon,
  PieChartIcon,
  CircleDot,
  Calendar,
  MapPin,
  Plane,
  Filter,
} from "lucide-react";

type ChartType = "bar" | "stacked" | "line" | "area" | "pie" | "donut";
type DimensionType = "month" | "airport" | "airline" | "flightType";
type MetricKey = "passengers" | "flights" | "cargo" | "loadFactor" | "otp" | "revenue";

const CHART_TYPES: { key: ChartType; labelEn: string; labelAr: string; icon: typeof BarChart3 }[] = [
  { key: "bar", labelEn: "Bar", labelAr: "أعمدة", icon: BarChart3 },
  { key: "stacked", labelEn: "Stacked", labelAr: "مكدس", icon: Layers },
  { key: "line", labelEn: "Line", labelAr: "خطي", icon: TrendingUp },
  { key: "area", labelEn: "Area", labelAr: "مساحة", icon: AreaChartIcon },
  { key: "pie", labelEn: "Pie", labelAr: "دائري", icon: PieChartIcon },
  { key: "donut", labelEn: "Donut", labelAr: "حلقي", icon: CircleDot },
];

const DIMENSIONS: { key: DimensionType; labelEn: string; labelAr: string; icon: typeof Calendar }[] = [
  { key: "month", labelEn: "Month", labelAr: "الشهر", icon: Calendar },
  { key: "airport", labelEn: "Airport", labelAr: "المطار", icon: MapPin },
  { key: "airline", labelEn: "Airline", labelAr: "شركة الطيران", icon: Plane },
  { key: "flightType", labelEn: "Flight Type", labelAr: "نوع الرحلة", icon: Filter },
];

const METRICS: { key: MetricKey; labelEn: string; labelAr: string; unit: string }[] = [
  { key: "passengers", labelEn: "Passengers (M)", labelAr: "المسافرون (مليون)", unit: "M" },
  { key: "flights", labelEn: "Flights (K)", labelAr: "الرحلات (ألف)", unit: "K" },
  { key: "cargo", labelEn: "Cargo (K tons)", labelAr: "الشحن (ألف طن)", unit: "K" },
  { key: "loadFactor", labelEn: "Load Factor (%)", labelAr: "عامل الحمولة (%)", unit: "%" },
  { key: "otp", labelEn: "On-Time (%)", labelAr: "الالتزام بالمواعيد (%)", unit: "%" },
  { key: "revenue", labelEn: "Revenue (B SAR)", labelAr: "الإيرادات (مليار ريال)", unit: "B" },
];

const CHART_COLORS = [
  "hsl(210, 53%, 23%)",
  "hsl(168, 74%, 42%)",
  "hsl(207, 62%, 47%)",
  "hsl(37, 90%, 51%)",
  "hsl(6, 78%, 57%)",
  "hsl(280, 60%, 50%)",
  "hsl(150, 60%, 40%)",
  "hsl(340, 70%, 50%)",
];

function buildChartData(
  dimension: DimensionType,
  selectedMetrics: MetricKey[],
  language: string
) {
  if (dimension === "month") {
    return MONTHLY_TRAFFIC.map((m) => {
      const row: Record<string, string | number> = {
        name: language === "ar" ? m.monthAr : m.month,
      };
      if (selectedMetrics.includes("passengers")) row.passengers = m.passengers;
      if (selectedMetrics.includes("flights")) row.flights = m.flights;
      if (selectedMetrics.includes("cargo")) row.cargo = m.cargo;
      if (selectedMetrics.includes("loadFactor")) row.loadFactor = 75 + Math.round(Math.random() * 10);
      if (selectedMetrics.includes("otp")) row.otp = 78 + Math.round(Math.random() * 8);
      if (selectedMetrics.includes("revenue")) row.revenue = +(m.passengers * 0.82).toFixed(1);
      return row;
    });
  }

  if (dimension === "airport") {
    return AIRPORTS.slice(0, 8).map((a) => {
      const row: Record<string, string | number> = {
        name: language === "ar" ? a.nameAr.split(" ").slice(0, 3).join(" ") : a.code,
      };
      if (selectedMetrics.includes("passengers")) row.passengers = a.passengers;
      if (selectedMetrics.includes("flights")) row.flights = +(a.flights / 1000).toFixed(0);
      if (selectedMetrics.includes("cargo")) row.cargo = +(a.cargoTonnage / 1000).toFixed(0);
      if (selectedMetrics.includes("loadFactor")) row.loadFactor = a.utilization;
      if (selectedMetrics.includes("otp")) row.otp = 75 + Math.round(Math.random() * 12);
      if (selectedMetrics.includes("revenue")) row.revenue = +(a.passengers * 0.85).toFixed(1);
      return row;
    });
  }

  if (dimension === "airline") {
    return AIRLINES.slice(0, 8).map((a) => {
      const row: Record<string, string | number> = {
        name: language === "ar" ? a.nameAr : a.name,
      };
      if (selectedMetrics.includes("passengers")) row.passengers = a.passengers;
      if (selectedMetrics.includes("flights")) row.flights = +(a.flights / 1000).toFixed(0);
      if (selectedMetrics.includes("cargo")) row.cargo = Math.round(a.passengers * 12);
      if (selectedMetrics.includes("loadFactor")) row.loadFactor = 70 + Math.round(Math.random() * 15);
      if (selectedMetrics.includes("otp")) row.otp = a.onTime;
      if (selectedMetrics.includes("revenue")) row.revenue = +(a.passengers * 0.9).toFixed(1);
      return row;
    });
  }

  const types = [
    { name: language === "ar" ? "محلي" : "Domestic", key: "domestic" },
    { name: language === "ar" ? "دولي" : "International", key: "international" },
    { name: language === "ar" ? "ترانزيت" : "Transit", key: "transit" },
  ];
  const totals = MONTHLY_TRAFFIC.reduce(
    (acc, m) => ({ domestic: acc.domestic + m.domestic, international: acc.international + m.international, transit: acc.transit + m.transit }),
    { domestic: 0, international: 0, transit: 0 }
  );
  return types.map((t) => {
    const val = totals[t.key as keyof typeof totals];
    const row: Record<string, string | number> = { name: t.name };
    if (selectedMetrics.includes("passengers")) row.passengers = +val.toFixed(1);
    if (selectedMetrics.includes("flights")) row.flights = Math.round(val * 7.2);
    if (selectedMetrics.includes("cargo")) row.cargo = Math.round(val * 8.5);
    if (selectedMetrics.includes("loadFactor")) row.loadFactor = 72 + Math.round(Math.random() * 12);
    if (selectedMetrics.includes("otp")) row.otp = 78 + Math.round(Math.random() * 8);
    if (selectedMetrics.includes("revenue")) row.revenue = +(val * 0.8).toFixed(1);
    return row;
  });
}

function getMetricLabel(key: MetricKey, language: string): string {
  const metric = METRICS.find((m) => m.key === key);
  return language === "ar" ? metric?.labelAr || key : metric?.labelEn || key;
}

export default function ExplorerPage() {
  const { language } = useTranslation();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [dimension, setDimension] = useState<DimensionType>("month");
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>(["passengers"]);

  const toggleMetric = (key: MetricKey) => {
    setSelectedMetrics((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
    );
  };

  const chartData = useMemo(
    () => buildChartData(dimension, selectedMetrics, language),
    [dimension, selectedMetrics, language]
  );

  const isPieType = chartType === "pie" || chartType === "donut";
  const pieMetric = selectedMetrics[0] || "passengers";

  const renderChart = () => {
    if (selectedMetrics.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          {language === "ar" ? "اختر مقياساً واحداً على الأقل" : "Select at least one metric"}
        </div>
      );
    }

    if (isPieType) {
      const pieData = chartData.map((d) => ({
        name: d.name as string,
        value: d[pieMetric] as number,
      }));
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={chartType === "donut" ? 120 : 140}
              innerRadius={chartType === "donut" ? 70 : 0}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            {selectedMetrics.map((m, i) => (
              <Line
                key={m}
                type="monotone"
                dataKey={m}
                name={getMetricLabel(m, language)}
                stroke={CHART_COLORS[i % CHART_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            {selectedMetrics.map((m, i) => (
              <Area
                key={m}
                type="monotone"
                dataKey={m}
                name={getMetricLabel(m, language)}
                stroke={CHART_COLORS[i % CHART_COLORS.length]}
                fill={CHART_COLORS[i % CHART_COLORS.length]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          {selectedMetrics.map((m, i) => (
            <Bar
              key={m}
              dataKey={m}
              name={getMetricLabel(m, language)}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              stackId={chartType === "stacked" ? "stack" : undefined}
              radius={chartType === "stacked" ? undefined : [4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-explorer-title">
            {language === "ar" ? "مستكشف حركة الطيران" : "Air Traffic Explorer"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {language === "ar"
              ? "استكشف بيانات حركة الطيران عبر أبعاد ومقاييس متعددة"
              : "Explore air traffic data across multiple dimensions and metrics"}
          </p>
        </div>

        <Card className="p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {language === "ar" ? "نوع الرسم:" : "Chart:"}
            </span>
            {CHART_TYPES.map((ct) => {
              const Icon = ct.icon;
              return (
                <Button
                  key={ct.key}
                  variant={chartType === ct.key ? "default" : "ghost"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setChartType(ct.key)}
                  data-testid={`button-chart-${ct.key}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {language === "ar" ? ct.labelAr : ct.labelEn}
                </Button>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[240px_1fr_240px]">
          <Card className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3" data-testid="text-dimensions-title">
                {language === "ar" ? "الأبعاد" : "Dimensions"}
              </h3>
              <div className="space-y-1">
                {DIMENSIONS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.key}
                      onClick={() => setDimension(d.key)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-md text-sm transition-colors ${
                        dimension === d.key
                          ? "bg-primary text-primary-foreground"
                          : "hover-elevate"
                      }`}
                      data-testid={`button-dim-${d.key}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {language === "ar" ? d.labelAr : d.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {isPieType && selectedMetrics.length > 1 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  {language === "ar" ? "المقياس للرسم الدائري" : "Pie Metric"}
                </h4>
                <Select value={pieMetric} onValueChange={(v) => {
                  setSelectedMetrics([v as MetricKey, ...selectedMetrics.filter(m => m !== v)]);
                }}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMetrics.map((m) => (
                      <SelectItem key={m} value={m}>
                        {getMetricLabel(m, language)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </Card>

          <Card className="p-4">
            <ChartToolbar
              title={language === "ar" ? "مستكشف حركة الطيران" : "Air Traffic Explorer"}
              csvData={chartData as Record<string, string | number>[]}
              csvFilename="explorer-data"
            >
              <div dir="ltr" className="w-full h-[420px]" data-testid="chart-explorer">
                {renderChart()}
              </div>
            </ChartToolbar>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3" data-testid="text-metrics-title">
              {language === "ar" ? "المقاييس" : "Metrics"}
            </h3>
            <div className="space-y-2">
              {METRICS.map((m) => (
                <div key={m.key} className="flex items-center gap-2.5">
                  <Checkbox
                    id={`metric-${m.key}`}
                    checked={selectedMetrics.includes(m.key)}
                    onCheckedChange={() => toggleMetric(m.key)}
                    data-testid={`checkbox-metric-${m.key}`}
                  />
                  <Label htmlFor={`metric-${m.key}`} className="text-sm cursor-pointer">
                    {language === "ar" ? m.labelAr : m.labelEn}
                  </Label>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">
                {language === "ar" ? "ملخص البيانات" : "Data Summary"}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{language === "ar" ? "النقاط" : "Data Points"}</span>
                  <Badge variant="secondary" className="text-[10px]">{chartData.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{language === "ar" ? "المقاييس" : "Metrics"}</span>
                  <Badge variant="secondary" className="text-[10px]">{selectedMetrics.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{language === "ar" ? "البُعد" : "Dimension"}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {DIMENSIONS.find(d => d.key === dimension)?.[language === "ar" ? "labelAr" : "labelEn"]}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
