import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
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
  Building2,
  PlaneTakeoff,
  Ruler,
  ParkingSquare,
  DoorOpen,
  MapPin,
  Layers,
  BarChart3,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ComposedChart,
  Line,
} from "recharts";
import { AIRPORTS, CHART_COLORS } from "@/lib/mock-data";

const nationalTotals = {
  airports: AIRPORTS.length,
  terminals: AIRPORTS.reduce((s, a) => s + a.terminals, 0),
  runways: AIRPORTS.reduce((s, a) => s + a.runways, 0),
  gates: AIRPORTS.reduce((s, a) => s + a.gates, 0),
  gatesWithBridges: AIRPORTS.reduce((s, a) => s + a.gatesWithBridges, 0),
  gatesWithout: AIRPORTS.reduce((s, a) => s + a.gatesWithout, 0),
  shortParking: AIRPORTS.reduce((s, a) => s + a.shortParking, 0),
  longParking: AIRPORTS.reduce((s, a) => s + a.longParking, 0),
  totalCapacity: AIRPORTS.reduce((s, a) => s + a.capacity, 0),
  totalPassengers: AIRPORTS.reduce((s, a) => s + a.passengers, 0),
  totalLandArea: AIRPORTS.reduce((s, a) => s + a.landArea, 0),
};

const avgUtilization = Math.round(
  AIRPORTS.reduce((s, a) => s + a.utilization, 0) / AIRPORTS.length
);

export default function DashboardAirports() {
  const { t, language } = useTranslation();

  const airportFilterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: "airport",
      label: t("dashboard.airport"),
      options: [
        { value: "ALL", label: language === "ar" ? "جميع المطارات" : "All Airports" },
        ...AIRPORTS.map((a) => ({ value: a.code, label: language === "ar" ? a.nameAr : a.name })),
      ],
      defaultValue: "ALL",
    },
    {
      key: "airportType",
      label: t("filter.airportType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "international", label: t("dashboard.international") },
        { value: "regional", label: t("filter.regional") },
        { value: "domestic", label: t("dashboard.domestic") },
      ],
      defaultValue: "all",
    },
    {
      key: "region",
      label: t("filter.region"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "western", label: t("filter.western") },
        { value: "central", label: t("filter.central") },
        { value: "eastern", label: t("filter.eastern") },
        { value: "southern", label: t("filter.southern") },
        { value: "northern", label: t("filter.northern") },
      ],
      defaultValue: "all",
    },
  ], [t, language]);

  const { values: airportFilterValues, onChange: onAirportFilterChange, onReset: onAirportFilterReset } = useFilterState(airportFilterConfigs);
  const selectedAirport = airportFilterValues.airport;

  const airport = useMemo(
    () => AIRPORTS.find((a) => a.code === selectedAirport),
    [selectedAirport]
  );

  const capacityChartData = useMemo(
    () =>
      AIRPORTS.map((a) => ({
        name: language === "ar" ? a.nameAr.replace(/مطار\s*/, "").slice(0, 12) : a.code,
        capacity: a.capacity,
        throughput: a.passengers,
        utilization: a.utilization,
      })),
    [language]
  );

  const counterItems = [
    {
      label: language === "ar" ? "المطارات" : "Airports",
      value: nationalTotals.airports,
      icon: Building2,
    },
    {
      label: language === "ar" ? "الصالات" : "Terminals",
      value: nationalTotals.terminals,
      icon: Layers,
    },
    {
      label: language === "ar" ? "المدارج" : "Runways",
      value: nationalTotals.runways,
      icon: PlaneTakeoff,
    },
    {
      label: language === "ar" ? "البوابات" : "Gates",
      value: nationalTotals.gates,
      icon: DoorOpen,
    },
    {
      label: language === "ar" ? "مواقف قصيرة" : "Short Parking",
      value: nationalTotals.shortParking.toLocaleString(),
      icon: ParkingSquare,
    },
    {
      label: language === "ar" ? "مواقف طويلة" : "Long Parking",
      value: nationalTotals.longParking.toLocaleString(),
      icon: ParkingSquare,
    },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            data-testid="text-airports-title"
          >
            {language === "ar"
              ? "البنية التحتية للمطارات والسعة"
              : "Airport Infrastructure & Capacity"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {language === "ar"
              ? "نظرة شاملة على البنية التحتية والقدرة الاستيعابية للمطارات السعودية"
              : "Comprehensive view of Saudi airport infrastructure and capacity"}
          </p>
        </div>

        <DashboardFilters
          filters={airportFilterConfigs}
          values={airportFilterValues}
          onChange={onAirportFilterChange}
          onReset={onAirportFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {counterItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="p-4"
                data-testid={`card-counter-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.label}
                  </span>
                </div>
                <p className="text-2xl font-bold tracking-tight">{item.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <Card className="p-5" data-testid="card-total-capacity">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {language === "ar" ? "السعة الإجمالية" : "Total Capacity"}
            </p>
            <p className="text-2xl font-bold">
              {nationalTotals.totalCapacity}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === "ar" ? "مسافر/سنة" : "pax/year"}
            </p>
          </Card>
          <Card className="p-5" data-testid="card-throughput">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {language === "ar" ? "الإنتاجية الفعلية" : "Actual Throughput"}
            </p>
            <p className="text-2xl font-bold">
              {nationalTotals.totalPassengers.toFixed(1)}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === "ar" ? "مسافر/سنة" : "pax/year"}
            </p>
          </Card>
          <Card className="p-5" data-testid="card-utilization">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {language === "ar" ? "نسبة الاستخدام" : "Avg Utilization"}
            </p>
            <p className="text-2xl font-bold">{avgUtilization}%</p>
            <Progress value={avgUtilization} className="h-1.5 mt-2" dir="ltr" />
          </Card>
          <Card className="p-5" data-testid="card-land-area">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {language === "ar" ? "المساحة الإجمالية" : "Total Land Area"}
            </p>
            <p className="text-2xl font-bold">
              {nationalTotals.totalLandArea.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === "ar" ? "كم²" : "km²"}
            </p>
          </Card>
        </div>

        {airport && (
          <Card className="p-5" data-testid="card-airport-profile">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">
                {language === "ar" ? airport.nameAr : airport.name}
              </h2>
              <Badge variant="secondary" className="no-default-active-elevate">
                {language === "ar"
                  ? airport.type === "international"
                    ? "دولي"
                    : "محلي"
                  : airport.type === "international"
                    ? "International"
                    : "Domestic"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {airport.city} ({airport.code})
              </span>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "السعة" : "Capacity"}
                </p>
                <p className="text-lg font-bold">{airport.capacity}M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "المسافرون" : "Passengers"}
                </p>
                <p className="text-lg font-bold">{airport.passengers}M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "الاستخدام" : "Utilization"}
                </p>
                <p className="text-lg font-bold">{airport.utilization}%</p>
                <Progress value={airport.utilization} className="h-1 mt-1" dir="ltr" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "الصالات" : "Terminals"}
                </p>
                <p className="text-lg font-bold">{airport.terminals}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "المدارج" : "Runways"}
                </p>
                <p className="text-lg font-bold">{airport.runways}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {airport.runwayLengths.join("m, ")}m
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "المساحة" : "Land Area"}
                </p>
                <p className="text-lg font-bold">{airport.landArea} km²</p>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "بوابات بجسور" : "Gates w/ Bridges"}
                </p>
                <p className="text-lg font-bold">{airport.gatesWithBridges}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "بوابات بدون جسور" : "Gates w/o Bridges"}
                </p>
                <p className="text-lg font-bold">{airport.gatesWithout}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "مواقف قصيرة" : "Short-Stay Parking"}
                </p>
                <p className="text-lg font-bold">
                  {airport.shortParking.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? "مواقف طويلة" : "Long-Stay Parking"}
                </p>
                <p className="text-lg font-bold">
                  {airport.longParking.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">
              {language === "ar"
                ? "السعة مقابل الإنتاجية والاستخدام"
                : "Capacity vs Throughput & Utilization"}
            </h2>
          </div>
          <div className="h-[350px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={capacityChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(210, 6%, 50%)"
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  label={{
                    value: language === "ar" ? "مليون مسافر" : "Passengers (M)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" },
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  domain={[0, 100]}
                  label={{
                    value: language === "ar" ? "الاستخدام %" : "Utilization %",
                    angle: 90,
                    position: "insideRight",
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
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="capacity"
                  name={language === "ar" ? "السعة (م)" : "Capacity (M)"}
                  fill={CHART_COLORS[0]}
                  radius={[3, 3, 0, 0]}
                  opacity={0.3}
                />
                <Bar
                  yAxisId="left"
                  dataKey="throughput"
                  name={language === "ar" ? "الإنتاجية (م)" : "Throughput (M)"}
                  fill={CHART_COLORS[0]}
                  radius={[3, 3, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="utilization"
                  name={language === "ar" ? "الاستخدام %" : "Utilization %"}
                  stroke={CHART_COLORS[2]}
                  strokeWidth={2}
                  dot={{ r: 4, fill: CHART_COLORS[2] }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">
              {language === "ar"
                ? "مقارنة المطارات"
                : "Airport Comparison"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === "ar" ? "المطار" : "Airport"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "السعة (م)" : "Capacity (M)"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "المسافرون (م)" : "Pax (M)"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "الاستخدام" : "Util %"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "الصالات" : "Terminals"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "المدارج" : "Runways"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "أطول مدرج" : "Max Runway"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "البوابات" : "Gates"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "بجسور" : "w/ Bridge"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "بدون" : "w/o"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "مواقف ق" : "Short P"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "ar" ? "مواقف ط" : "Long P"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AIRPORTS.map((a) => (
                  <TableRow
                    key={a.code}
                    className={`cursor-pointer ${selectedAirport === a.code ? "bg-muted/50" : ""}`}
                    onClick={() => setSelectedAirport(a.code)}
                    data-testid={`row-airport-${a.code}`}
                  >
                    <TableCell className="font-medium">
                      {language === "ar" ? a.nameAr : a.name}
                    </TableCell>
                    <TableCell className="text-right">{a.capacity}</TableCell>
                    <TableCell className="text-right">{a.passengers}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress
                          value={a.utilization}
                          className="h-1.5 w-16"
                          dir="ltr"
                        />
                        <span className="text-xs font-medium w-8 text-right">
                          {a.utilization}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{a.terminals}</TableCell>
                    <TableCell className="text-right">{a.runways}</TableCell>
                    <TableCell className="text-right">
                      {Math.max(...a.runwayLengths)}m
                    </TableCell>
                    <TableCell className="text-right">{a.gates}</TableCell>
                    <TableCell className="text-right">
                      {a.gatesWithBridges}
                    </TableCell>
                    <TableCell className="text-right">{a.gatesWithout}</TableCell>
                    <TableCell className="text-right">
                      {a.shortParking.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {a.longParking.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "البوابات: بجسور مقابل بدون" : "Gates: With vs Without Bridges"}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={AIRPORTS.map((a) => ({
                    name: language === "ar" ? a.cityAr : a.code,
                    withBridge: a.gatesWithBridges,
                    withoutBridge: a.gatesWithout,
                  }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    stroke="hsl(210, 6%, 50%)"
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="withBridge"
                    name={language === "ar" ? "بجسور" : "With Bridge"}
                    fill={CHART_COLORS[0]}
                    stackId="gates"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="withoutBridge"
                    name={language === "ar" ? "بدون جسور" : "Without Bridge"}
                    fill={CHART_COLORS[1]}
                    stackId="gates"
                    radius={[0, 3, 3, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "مواقف السيارات حسب المطار" : "Parking Spots by Airport"}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={AIRPORTS.map((a) => ({
                    name: language === "ar" ? a.cityAr : a.code,
                    short: a.shortParking,
                    long: a.longParking,
                  }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    stroke="hsl(210, 6%, 50%)"
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="short"
                    name={language === "ar" ? "قصيرة المدى" : "Short-Stay"}
                    fill={CHART_COLORS[3]}
                    stackId="parking"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="long"
                    name={language === "ar" ? "طويلة المدى" : "Long-Stay"}
                    fill={CHART_COLORS[4]}
                    stackId="parking"
                    radius={[0, 3, 3, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
