import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  TrendingUp,
  TrendingDown,
  Download,
  Warehouse,
  DollarSign,
  Truck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import {
  CARGO_MONTHLY,
  CARGO_COMMODITY_SPLIT,
  AIRPORTS,
  COST_PER_CONTAINER,
  SHIPMENTS_BY_MODE,
  CHART_COLORS,
} from "@/lib/mock-data";

const TOTAL_SHIPMENTS = CARGO_MONTHLY.reduce((acc, m) => acc + m.shipments, 0);
const TOTAL_TONNAGE = CARGO_MONTHLY.reduce((acc, m) => acc + m.tonnage, 0);
const TARGET_SHIPMENTS = 3000;
const SHIPMENT_PROGRESS = (TOTAL_SHIPMENTS / TARGET_SHIPMENTS) * 100;
const FREIGHT_GROWTH = 12.5;
const TOTAL_CARGO_FACILITIES = AIRPORTS.reduce((acc, a) => acc + a.cargoFacilities, 0);

const airportCargoRanking = AIRPORTS
  .filter((a) => a.cargoTonnage > 0)
  .sort((a, b) => b.cargoTonnage - a.cargoTonnage);

export default function DashboardCargo() {
  const { t, language } = useTranslation();
  const [cargoView, setCargoView] = useState<"combined" | "split">("combined");

  const isAr = language === "ar";

  const chartTooltipStyle = {
    backgroundColor: "hsl(210, 5%, 96%)",
    border: "1px solid hsl(210, 5%, 88%)",
    borderRadius: "6px",
    fontSize: "12px",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-cargo-title">
              {isAr ? "الشحن واللوجستيات" : "Cargo & Logistics"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("dashboard.dataAsOf")} {isAr ? "٦ مارس ٢٠٢٦، ٠٨:٠٠ ص" : "March 6, 2026, 08:00 AM"}
            </p>
          </div>
          <Button variant="secondary" size="sm" data-testid="button-export-cargo">
            <Download className="h-3.5 w-3.5" />
            {t("dashboard.export")}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5" data-testid="card-kpi-shipments">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "إجمالي الشحنات" : "Total Shipments"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-total-shipments">{TOTAL_SHIPMENTS.toLocaleString()}K</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 3M</span>
                <span className="font-medium">{SHIPMENT_PROGRESS.toFixed(0)}%</span>
              </div>
              <Progress value={SHIPMENT_PROGRESS} className="h-1.5" dir="ltr" />
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-tonnage">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                <Warehouse className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "إجمالي الحمولة" : "Total Tonnage"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-total-tonnage">{(TOTAL_TONNAGE / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+{FREIGHT_GROWTH}%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-cost">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "تكلفة الحاوية" : "Cost / Container"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-cost-container">
                  {isAr ? "٢,٧٠٠ ر.س" : "SAR 2,700"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">-3.8%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-facilities">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "مرافق الشحن" : "Cargo Facilities"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-cargo-facilities">{TOTAL_CARGO_FACILITIES}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isAr ? `عبر ${airportCargoRanking.length} مطارات` : `Across ${airportCargoRanking.length} airports`}
            </p>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="text-base font-semibold">
                {isAr ? "اتجاه الشحن الشهري" : "Monthly Cargo Trend"}
              </h2>
              <Tabs value={cargoView} onValueChange={(v) => setCargoView(v as "combined" | "split")}>
                <TabsList>
                  <TabsTrigger value="combined" data-testid="tab-cargo-combined">
                    {isAr ? "مدمج" : "Combined"}
                  </TabsTrigger>
                  <TabsTrigger value="split" data-testid="tab-cargo-split">
                    {isAr ? "استيراد/تصدير" : "Import/Export"}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                {cargoView === "combined" ? (
                  <ComposedChart data={CARGO_MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: isAr ? "شحنات (ألف)" : "Shipments (K)", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: isAr ? "طن" : "Tonnage", angle: 90, position: "insideRight", style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="shipments" name={isAr ? "الشحنات" : "Shipments"} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="tonnage" name={isAr ? "الحمولة" : "Tonnage"} stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                  </ComposedChart>
                ) : (
                  <BarChart data={CARGO_MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}K`, ""]} />
                    <Legend />
                    <Bar dataKey="imports" name={isAr ? "واردات" : "Imports"} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} stackId="cargo" />
                    <Bar dataKey="exports" name={isAr ? "صادرات" : "Exports"} fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} stackId="cargo" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {isAr ? "تصنيف البضائع" : "Commodity Split"}
            </h2>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CARGO_COMMODITY_SPLIT}
                    dataKey="value"
                    nameKey={isAr ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {CARGO_COMMODITY_SPLIT.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {CARGO_COMMODITY_SPLIT.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-xs text-muted-foreground">{isAr ? item.nameAr : item.name}</span>
                  </div>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {isAr ? "ترتيب المطارات حسب الشحن" : "Airport Cargo Ranking"}
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>{isAr ? "المطار" : "Airport"}</TableHead>
                    <TableHead className="text-right">{isAr ? "الحمولة (طن)" : "Tonnage"}</TableHead>
                    <TableHead className="text-right">{isAr ? "المرافق" : "Facilities"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {airportCargoRanking.map((airport, idx) => (
                    <TableRow key={airport.code} data-testid={`row-cargo-airport-${airport.code}`}>
                      <TableCell className="font-medium text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="font-medium">{isAr ? airport.nameAr : airport.name}</TableCell>
                      <TableCell className="text-right">{airport.cargoTonnage.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{airport.cargoFacilities}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {isAr ? "تكلفة الحاوية (ر.س)" : "Cost per Container (SAR)"}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={COST_PER_CONTAINER}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "quarterAr" : "quarter"} tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" domain={["auto", "auto"]} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`SAR ${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="domestic" name={isAr ? "محلي" : "Domestic"} stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="international" name={isAr ? "دولي" : "International"} stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "الشحنات حسب وسيلة النقل" : "Shipments by Transport Mode"}
          </h2>
          <div className="h-[250px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SHIPMENTS_BY_MODE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <YAxis dataKey={isAr ? "nameAr" : "name"} type="category" width={80} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value.toLocaleString()}K`, ""]} />
                <Bar dataKey="value" name={isAr ? "شحنات (ألف)" : "Shipments (K)"} radius={[0, 4, 4, 0]}>
                  {SHIPMENTS_BY_MODE.map((_, index) => (
                    <Cell key={`mode-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
