import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Plane,
  Clock,
  AlertTriangle,
  Activity,
  Radio,
  Gauge,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
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
  AIRPORTS,
  AIRLINES,
  MONTHLY_TRAFFIC,
  PRIVATE_FLIGHTS_MONTHLY,
  AIRSPACE_AIRLINES,
  CHART_COLORS,
} from "@/lib/mock-data";

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(210, 5%, 96%)",
  border: "1px solid hsl(210, 5%, 88%)",
  borderRadius: "6px",
  fontSize: "12px",
};

export default function DashboardFlightOps() {
  const { t, language } = useTranslation();

  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: "dateRange",
      label: t("dashboard.dateRange"),
      options: [
        { value: "ytd", label: t("dashboard.ytd") },
        { value: "lastMonth", label: t("dashboard.lastMonth") },
        { value: "lastQuarter", label: t("dashboard.lastQuarter") },
        { value: "lastYear", label: t("dashboard.lastYear") },
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
      key: "airline",
      label: t("dashboard.airline"),
      options: [
        { value: "all", label: t("dashboard.all") },
        ...AIRLINES.map((a) => ({ value: a.code, label: language === "ar" ? a.nameAr : a.name })),
      ],
      defaultValue: "all",
    },
    {
      key: "flightType",
      label: t("filter.flightType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "domestic", label: t("dashboard.domestic") },
        { value: "international", label: t("dashboard.international") },
      ],
      defaultValue: "all",
    },
  ], [t, language]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);
  const selectedAirport = filterValues.airport;

  const totalMovements = useMemo(() => {
    if (selectedAirport === "all") {
      return AIRPORTS.reduce((sum, a) => sum + a.movements, 0);
    }
    const airport = AIRPORTS.find((a) => a.code === selectedAirport);
    return airport ? airport.movements : 0;
  }, [selectedAirport]);

  const totalDelayed = useMemo(() => {
    return AIRLINES.reduce((sum, a) => sum + a.delays, 0);
  }, []);

  const avgOnTime = useMemo(() => {
    const totalFlights = AIRLINES.reduce((sum, a) => sum + a.flights, 0);
    const weightedOtp = AIRLINES.reduce((sum, a) => sum + a.onTime * a.flights, 0);
    return (weightedOtp / totalFlights).toFixed(1);
  }, []);

  const totalPrivateFlights = useMemo(() => {
    return PRIVATE_FLIGHTS_MONTHLY.reduce((sum, m) => sum + m.domestic + m.international, 0);
  }, []);

  const movementsByAirport = useMemo(() => {
    return AIRPORTS
      .map((a) => ({
        name: language === "ar" ? a.nameAr : a.code,
        movements: Math.round(a.movements / 1000),
        flights: Math.round(a.flights / 1000),
      }))
      .sort((a, b) => b.movements - a.movements);
  }, [language]);

  const delayByAirline = useMemo(() => {
    return AIRLINES.map((a) => ({
      name: language === "ar" ? a.nameAr : a.name,
      delayed: a.delays,
      onTime: a.flights - a.delays,
      delayRate: ((a.delays / a.flights) * 100).toFixed(1),
    })).sort((a, b) => b.delayed - a.delayed);
  }, [language]);

  const onTimeVsDelayed = useMemo(() => {
    const totalFlights = AIRLINES.reduce((sum, a) => sum + a.flights, 0);
    return [
      {
        name: language === "ar" ? "في الموعد" : "On-Time",
        value: totalFlights - totalDelayed,
        color: CHART_COLORS[0],
      },
      {
        name: language === "ar" ? "متأخرة" : "Delayed",
        value: totalDelayed,
        color: CHART_COLORS[4],
      },
    ];
  }, [language, totalDelayed]);

  const utilizationData = useMemo(() => {
    return AIRPORTS.map((a) => ({
      code: a.code,
      name: language === "ar" ? a.nameAr : a.name,
      city: language === "ar" ? a.cityAr : a.city,
      utilization: a.utilization,
      capacity: a.capacity,
      passengers: a.passengers,
    })).sort((a, b) => b.utilization - a.utilization);
  }, [language]);

  const privateFlightsData = useMemo(() => {
    return PRIVATE_FLIGHTS_MONTHLY.map((m) => ({
      month: language === "ar" ? m.monthAr : m.month,
      domestic: m.domestic,
      international: m.international,
    }));
  }, [language]);

  const getUtilizationColor = (util: number) => {
    if (util >= 80) return "bg-red-500/80 dark:bg-red-600/80";
    if (util >= 65) return "bg-amber-500/70 dark:bg-amber-600/70";
    if (util >= 50) return "bg-emerald-500/60 dark:bg-emerald-600/60";
    return "bg-sky-500/50 dark:bg-sky-600/50";
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-flight-ops-title">
            {language === "ar" ? "عمليات الطيران" : "Flight Operations"}
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {language === "ar" ? "إجمالي الحركات" : "Total Movements"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-total-movements">
                  {(totalMovements / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+6.8%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {language === "ar" ? "معدل الالتزام بالمواعيد" : "On-Time Rate"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-on-time-rate">
                  {avgOnTime}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+2.1%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {language === "ar" ? "الرحلات المتأخرة" : "Delayed Flights"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-delayed-flights">
                  {(totalDelayed / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">-3.2%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {language === "ar" ? "رحلات خاصة" : "Private Flights"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-private-flights">
                  {(totalPrivateFlights / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+14.5%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "حركة الطائرات حسب المطار" : "Aircraft Movements by Airport"}
              </h2>
            </div>
            <div className="h-[340px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={movementsByAirport} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={100} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${value}K`, ""]} />
                  <Legend />
                  <Bar dataKey="movements" name={language === "ar" ? "الحركات (ألف)" : "Movements (K)"} fill={CHART_COLORS[0]} radius={[0, 3, 3, 0]} />
                  <Bar dataKey="flights" name={language === "ar" ? "الرحلات (ألف)" : "Flights (K)"} fill={CHART_COLORS[1]} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "في الموعد مقابل التأخير" : "On-Time vs Delayed"}
              </h2>
            </div>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={onTimeVsDelayed}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {onTimeVsDelayed.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {onTimeVsDelayed.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "الرحلات المتأخرة حسب شركة الطيران" : "Delayed Flights by Airline"}
              </h2>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={delayByAirline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} height={60} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend />
                  <Bar dataKey="delayed" name={language === "ar" ? "متأخرة" : "Delayed"} fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} stackId="stack" />
                  <Bar dataKey="onTime" name={language === "ar" ? "في الموعد" : "On-Time"} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? "الرحلات الخاصة (شهري)" : "Private Flights (Monthly)"}
              </h2>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={privateFlightsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend />
                  <Bar dataKey="domestic" name={language === "ar" ? "محلي" : "Domestic"} fill={CHART_COLORS[3]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="international" name={language === "ar" ? "دولي" : "International"} fill={CHART_COLORS[5]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">
              {language === "ar" ? "شركات الطيران المستخدمة للمجال الجوي" : "Airlines Using Airspace"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "ar" ? "شركة الطيران" : "Airline"}</TableHead>
                  <TableHead>{language === "ar" ? "الدولة" : "Country"}</TableHead>
                  <TableHead className="text-right">{language === "ar" ? "الحركات" : "Movements"}</TableHead>
                  <TableHead className="text-center">{language === "ar" ? "عبور المجال الجوي" : "Overflight"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AIRSPACE_AIRLINES.map((airline) => (
                  <TableRow key={airline.airline} data-testid={`row-airspace-${airline.airline.toLowerCase().replace(/\s+/g, "-")}`}>
                    <TableCell className="font-medium">
                      {language === "ar" ? airline.airlineAr : airline.airline}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {language === "ar" ? airline.countryAr : airline.country}
                    </TableCell>
                    <TableCell className="text-right">
                      {(airline.movements / 1000).toFixed(1)}K
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={airline.overflight ? "default" : "secondary"} className="no-default-active-elevate">
                        {airline.overflight
                          ? (language === "ar" ? "نعم" : "Yes")
                          : (language === "ar" ? "لا" : "No")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">
              {language === "ar" ? "نسبة استخدام المطارات" : "Airport Utilization"}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {utilizationData.map((airport) => (
              <Card key={airport.code} className="p-4" data-testid={`card-utilization-${airport.code}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold truncate">{airport.code}</span>
                  <Badge variant="secondary" className="no-default-active-elevate text-xs">
                    {airport.utilization}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-2">{airport.city}</p>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden" dir="ltr">
                  <div
                    className={`h-full rounded-full transition-all ${getUtilizationColor(airport.utilization)}`}
                    style={{ width: `${airport.utilization}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{airport.passengers}M</span>
                  <span>{language === "ar" ? "سعة" : "Cap"}: {airport.capacity}M</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="text-xs text-muted-foreground">{language === "ar" ? "مستوى الاستخدام:" : "Utilization level:"}</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-6 rounded-sm bg-sky-500/50" />
              <span className="text-xs text-muted-foreground">&lt;50%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-6 rounded-sm bg-emerald-500/60" />
              <span className="text-xs text-muted-foreground">50-65%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-6 rounded-sm bg-amber-500/70" />
              <span className="text-xs text-muted-foreground">65-80%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-6 rounded-sm bg-red-500/80" />
              <span className="text-xs text-muted-foreground">&gt;80%</span>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
