import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  ArrowRightLeft,
  Globe,
  Armchair,
  Flag,
  DoorOpen,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  MONTHLY_TRAFFIC,
  AIRPORTS,
  AIRLINES,
  PASSENGER_BY_CLASS,
  PASSENGER_BY_NATIONALITY,
  CHART_COLORS,
} from "@/lib/mock-data";

const COLORS = {
  primary: "hsl(210, 85%, 42%)",
  secondary: "hsl(185, 75%, 38%)",
  tertiary: "hsl(28, 85%, 48%)",
  purple: "hsl(280, 70%, 42%)",
  muted: "hsl(210, 8%, 70%)",
};

const totalPassengers = MONTHLY_TRAFFIC.reduce((s, m) => s + m.passengers, 0);
const totalTransit = MONTHLY_TRAFFIC.reduce((s, m) => s + m.transit, 0);
const totalDomestic = MONTHLY_TRAFFIC.reduce((s, m) => s + m.domestic, 0);
const totalInternational = MONTHLY_TRAFFIC.reduce((s, m) => s + m.international, 0);
const totalGates = AIRPORTS.reduce((s, a) => s + a.gates, 0);
const totalGatesBridges = AIRPORTS.reduce((s, a) => s + a.gatesWithBridges, 0);
const totalGatesWithout = AIRPORTS.reduce((s, a) => s + a.gatesWithout, 0);

const domIntlDonut = [
  { name: "Domestic", nameAr: "محلي", value: Math.round((totalDomestic / totalPassengers) * 100), color: COLORS.primary },
  { name: "International", nameAr: "دولي", value: Math.round((totalInternational / totalPassengers) * 100), color: COLORS.secondary },
  { name: "Transit", nameAr: "ترانزيت", value: Math.round((totalTransit / totalPassengers) * 100), color: COLORS.tertiary },
];

const passengerByAirport = AIRPORTS
  .slice()
  .sort((a, b) => b.passengers - a.passengers)
  .map((a, i) => ({
    rank: i + 1,
    code: a.code,
    name: a.name,
    nameAr: a.nameAr,
    passengers: a.passengers,
    gates: a.gates,
    gatesWithBridges: a.gatesWithBridges,
    gatesWithout: a.gatesWithout,
  }));

const passengerByAirline = AIRLINES
  .slice()
  .sort((a, b) => b.passengers - a.passengers)
  .map((a, i) => ({
    rank: i + 1,
    name: a.name,
    nameAr: a.nameAr,
    passengers: a.passengers,
    marketShare: a.marketShare,
  }));

export default function DashboardPassengers() {
  const { t, language } = useTranslation();
  const [trendView, setTrendView] = useState<"stacked" | "split">("stacked");
  const [pivotView, setPivotView] = useState<"airport" | "airline">("airport");

  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: "dateRange",
      label: t("dashboard.dateRange"),
      options: [
        { value: "ytd", label: t("dashboard.ytd") },
        { value: "lastMonth", label: t("dashboard.lastMonth") },
        { value: "lastQuarter", label: t("dashboard.lastQuarter") },
        { value: "trailing12", label: t("dashboard.trailing12") },
      ],
      defaultValue: "ytd",
    },
    {
      key: "airport",
      label: t("dashboard.airport"),
      options: [
        { value: "all", label: t("dashboard.all") },
        ...AIRPORTS.map((a) => ({ value: a.code, label: language === "ar" ? a.nameAr : a.name })),
      ],
      defaultValue: "all",
    },
    {
      key: "passengerType",
      label: t("filter.passengerType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "domestic", label: t("dashboard.domestic") },
        { value: "international", label: t("dashboard.international") },
        { value: "transit", label: t("filter.transit") },
      ],
      defaultValue: "all",
    },
    {
      key: "travelClass",
      label: t("filter.travelClass"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "economy", label: t("filter.economy") },
        { value: "business", label: t("filter.business") },
        { value: "first", label: t("filter.first") },
      ],
      defaultValue: "all",
    },
  ], [t, language]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-passengers-title">
            {t("nav.passengers")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("dashboard.dataAsOf")} {language === "ar" ? "٦ مارس ٢٠٢٦، ٠٨:٠٠ ص" : "March 6, 2026, 08:00 AM"}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185, 75%, 38%, 0.12)", color: COLORS.secondary }}>
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {language === "ar" ? "إجمالي المسافرين" : "Total Passengers"}
                  </p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5" data-testid="text-total-passengers">
                    {totalPassengers.toFixed(1)}M
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 330M</span>
                <span className="font-medium">{((totalPassengers / 330) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5" dir="ltr">
                <div className="h-1.5 rounded-full" style={{ width: `${(totalPassengers / 330) * 100}%`, backgroundColor: COLORS.secondary }} />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+7.2%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28, 85%, 48%, 0.12)", color: COLORS.tertiary }}>
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {language === "ar" ? "مسافرو الترانزيت" : "Transit Travelers"}
                  </p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5" data-testid="text-transit-passengers">
                    {totalTransit.toFixed(1)}M
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-muted-foreground">{language === "ar" ? "نسبة الترانزيت" : "Transit Share"}</span>
                <span className="font-medium">{((totalTransit / totalPassengers) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5" dir="ltr">
                <div className="h-1.5 rounded-full" style={{ width: `${(totalTransit / totalPassengers) * 100}%`, backgroundColor: COLORS.tertiary }} />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+15.8%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210, 85%, 42%, 0.12)", color: COLORS.primary }}>
                <Globe className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "محلي / دولي / ترانزيت" : "Domestic / Intl / Transit"}
              </p>
            </div>
            <div className="h-[140px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domIntlDonut}
                    dataKey="value"
                    nameKey={language === "ar" ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={60}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {domIntlDonut.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1">
              {domIntlDonut.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {language === "ar" ? item.nameAr : item.name} {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="text-base font-semibold">
                {language === "ar" ? "اتجاه المسافرين الشهري" : "Monthly Passenger Trend"}
              </h2>
              <Tabs value={trendView} onValueChange={(v) => setTrendView(v as "stacked" | "split")}>
                <TabsList>
                  <TabsTrigger value="stacked" data-testid="tab-stacked">
                    {language === "ar" ? "تراكمي" : "Stacked"}
                  </TabsTrigger>
                  <TabsTrigger value="split" data-testid="tab-split">
                    {language === "ar" ? "مقسم" : "Split"}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                {trendView === "stacked" ? (
                  <AreaChart data={MONTHLY_TRAFFIC}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey={language === "ar" ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: language === "ar" ? "مليون" : "Million", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }} formatter={(value: number) => [`${value}M`, ""]} />
                    <Legend />
                    <defs>
                      <linearGradient id="gradDom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradIntl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.secondary} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={COLORS.secondary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradTransit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.tertiary} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={COLORS.tertiary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="domestic" name={language === "ar" ? "محلي" : "Domestic"} stackId="1" stroke={COLORS.primary} strokeWidth={1.5} fill="url(#gradDom)" />
                    <Area type="monotone" dataKey="international" name={language === "ar" ? "دولي" : "International"} stackId="1" stroke={COLORS.secondary} strokeWidth={1.5} fill="url(#gradIntl)" />
                    <Area type="monotone" dataKey="transit" name={language === "ar" ? "ترانزيت" : "Transit"} stackId="1" stroke={COLORS.tertiary} strokeWidth={1.5} fill="url(#gradTransit)" />
                  </AreaChart>
                ) : (
                  <BarChart data={MONTHLY_TRAFFIC}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey={language === "ar" ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }} formatter={(value: number) => [`${value}M`, ""]} />
                    <Legend />
                    <Bar dataKey="domestic" name={language === "ar" ? "محلي" : "Domestic"} fill={COLORS.primary} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="international" name={language === "ar" ? "دولي" : "International"} fill={COLORS.secondary} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="transit" name={language === "ar" ? "ترانزيت" : "Transit"} fill={COLORS.tertiary} radius={[3, 3, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280, 70%, 42%, 0.12)", color: COLORS.purple }}>
                <Armchair className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "المسافرون حسب الدرجة" : "Passengers by Class"}
              </p>
            </div>
            <div className="h-[160px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PASSENGER_BY_CLASS}
                    dataKey="value"
                    nameKey={language === "ar" ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {PASSENGER_BY_CLASS.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {PASSENGER_BY_CLASS.map((c, idx) => (
                <div key={c.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[idx] }} />
                    <span className="text-xs text-muted-foreground">{language === "ar" ? c.nameAr : c.name}</span>
                  </div>
                  <span className="text-xs font-medium">{c.passengers}M ({c.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">
              {language === "ar" ? "حركة المسافرين" : "Passenger Movements"}
            </h2>
            <Tabs value={pivotView} onValueChange={(v) => setPivotView(v as "airport" | "airline")}>
              <TabsList>
                <TabsTrigger value="airport" data-testid="tab-pivot-airport">
                  {language === "ar" ? "حسب المطار" : "By Airport"}
                </TabsTrigger>
                <TabsTrigger value="airline" data-testid="tab-pivot-airline">
                  {language === "ar" ? "حسب الناقل" : "By Airline"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            {pivotView === "airport" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>{t("dashboard.airport")}</TableHead>
                    <TableHead className="text-end">{language === "ar" ? "المسافرون (مليون)" : "Passengers (M)"}</TableHead>
                    <TableHead className="text-end">{language === "ar" ? "البوابات" : "Gates"}</TableHead>
                    <TableHead className="text-end">{language === "ar" ? "بجسور" : "With Bridges"}</TableHead>
                    <TableHead className="text-end">{language === "ar" ? "بدون جسور" : "Without"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengerByAirport.map((a) => (
                    <TableRow key={a.code} data-testid={`row-pax-airport-${a.code}`}>
                      <TableCell className="font-medium text-muted-foreground">{a.rank}</TableCell>
                      <TableCell className="font-medium">{language === "ar" ? a.nameAr : a.name}</TableCell>
                      <TableCell className="text-end">{a.passengers.toFixed(1)}</TableCell>
                      <TableCell className="text-end">{a.gates}</TableCell>
                      <TableCell className="text-end">{a.gatesWithBridges}</TableCell>
                      <TableCell className="text-end">{a.gatesWithout}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>{t("dashboard.airline")}</TableHead>
                    <TableHead className="text-end">{language === "ar" ? "المسافرون (مليون)" : "Passengers (M)"}</TableHead>
                    <TableHead className="text-end">{t("dashboard.marketShare")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengerByAirline.map((a) => (
                    <TableRow key={a.name} data-testid={`row-pax-airline-${a.rank}`}>
                      <TableCell className="font-medium text-muted-foreground">{a.rank}</TableCell>
                      <TableCell className="font-medium">{language === "ar" ? a.nameAr : a.name}</TableCell>
                      <TableCell className="text-end">{a.passengers.toFixed(1)}</TableCell>
                      <TableCell className="text-end">
                        <Badge variant="secondary" className="no-default-active-elevate">{a.marketShare.toFixed(1)}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "المسافرون حسب الجنسية" : "Passengers by Nationality"}
              </h2>
            </div>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PASSENGER_BY_NATIONALITY} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis
                    type="category"
                    dataKey={language === "ar" ? "nameAr" : "name"}
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}M`, ""]}
                  />
                  <Bar dataKey="passengers" name={language === "ar" ? "المسافرون (مليون)" : "Passengers (M)"} radius={[0, 4, 4, 0]}>
                    {PASSENGER_BY_NATIONALITY.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <DoorOpen className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "البنية التحتية للبوابات" : "Gate Infrastructure"}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold" data-testid="text-total-gates">{totalGates}</p>
                <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? "إجمالي البوابات" : "Total Gates"}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" data-testid="text-gates-bridges">{totalGatesBridges}</p>
                <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? "بجسور" : "With Bridges"}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" data-testid="text-gates-no-bridges">{totalGatesWithout}</p>
                <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? "بدون جسور" : "Without Bridges"}</p>
              </div>
            </div>
            <div className="h-[230px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={AIRPORTS.slice(0, 6).map((a) => ({
                    name: language === "ar" ? a.nameAr.split(" ").slice(0, 2).join(" ") : a.code,
                    withBridges: a.gatesWithBridges,
                    without: a.gatesWithout,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(210, 5%, 96%)", border: "1px solid hsl(210, 5%, 88%)", borderRadius: "6px", fontSize: "12px" }} />
                  <Legend />
                  <Bar dataKey="withBridges" name={language === "ar" ? "بجسور" : "With Bridges"} fill={COLORS.primary} radius={[3, 3, 0, 0]} stackId="gates" />
                  <Bar dataKey="without" name={language === "ar" ? "بدون جسور" : "Without Bridges"} fill={COLORS.muted} radius={[3, 3, 0, 0]} stackId="gates" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
