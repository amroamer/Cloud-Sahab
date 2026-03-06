import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Globe,
  Map,
  Route,
  Plane,
  TrendingUp,
  ArrowUpRight,
  Navigation,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AIRLINES,
  AIRPORTS,
  CONNECTIVITY_INDEX_TREND,
  COUNTRIES_REACHED,
  DOMESTIC_ROUTES,
  INTERNATIONAL_ROUTES,
  AIRSPACE_AIRLINES,
  CHART_COLORS,
} from "@/lib/mock-data";

const saudiAirlines = AIRLINES.filter((a) => a.nationality === "Saudi");
const foreignAirlines = AIRLINES.filter((a) => a.nationality !== "Saudi");
const lccAirlines = AIRLINES.filter((a) => a.type === "lcc");

const totalFlights = AIRLINES.reduce((sum, a) => sum + a.flights, 0);
const saudiFlights = saudiAirlines.reduce((sum, a) => sum + a.flights, 0);
const foreignFlights = foreignAirlines.reduce((sum, a) => sum + a.flights, 0);
const lccFlights = lccAirlines.reduce((sum, a) => sum + a.flights, 0);

const foreignSharePct = ((foreignFlights / totalFlights) * 100).toFixed(1);
const lccSharePct = ((lccFlights / totalFlights) * 100).toFixed(1);

const marketShareData = [
  { name: "Saudi Carriers", nameAr: "ناقلات سعودية", value: parseFloat(((saudiFlights / totalFlights) * 100).toFixed(1)), color: CHART_COLORS[0] },
  { name: "Foreign Airlines", nameAr: "ناقلات أجنبية", value: parseFloat(foreignSharePct), color: CHART_COLORS[1] },
];

const lccShareData = [
  { name: "LCC", nameAr: "منخفضة التكلفة", value: parseFloat(lccSharePct), color: CHART_COLORS[2] },
  { name: "Full-Service", nameAr: "خدمة كاملة", value: parseFloat((100 - parseFloat(lccSharePct)).toFixed(1)), color: CHART_COLORS[0] },
];

const routeGrowthData = [
  { year: "2018", domestic: 28, international: 120 },
  { year: "2019", domestic: 30, international: 135 },
  { year: "2020", domestic: 22, international: 85 },
  { year: "2021", domestic: 25, international: 95 },
  { year: "2022", domestic: 32, international: 140 },
  { year: "2023", domestic: 36, international: 160 },
  { year: "2024", domestic: 40, international: 180 },
  { year: "2025", domestic: DOMESTIC_ROUTES, international: INTERNATIONAL_ROUTES },
];

const airlineAirportMatrix = AIRLINES.slice(0, 6).map((airline) => ({
  airline: airline.name,
  airlineAr: airline.nameAr,
  KAIA: Math.round(airline.flights * 0.35 / 1000),
  KKIA: Math.round(airline.flights * 0.30 / 1000),
  KFIA: Math.round(airline.flights * 0.15 / 1000),
  PMIA: Math.round(airline.flights * 0.12 / 1000),
  Other: Math.round(airline.flights * 0.08 / 1000),
}));

const currentIndex = CONNECTIVITY_INDEX_TREND[CONNECTIVITY_INDEX_TREND.length - 1].actual;
const targetIndex = 250;
const indexProgress = (currentIndex / targetIndex) * 100;

export default function DashboardConnectivity() {
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
      key: "airlineType",
      label: t("filter.airlineType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "saudi", label: t("filter.saudi") },
        { value: "foreign", label: t("filter.foreign") },
        { value: "lcc", label: t("filter.lcc") },
        { value: "fullService", label: t("filter.fullService") },
      ],
      defaultValue: "all",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const gaugeAngle = (currentIndex / targetIndex) * 180;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-dashboard-title">
            {language === "ar" ? "الاتصال والحصة السوقية" : "Connectivity & Market Share"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("dashboard.dataAsOf")} {language === "ar" ? "٦ مارس ٢٠٢٦" : "March 6, 2026"}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5" data-testid="card-connectivity-index">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `hsl(210 85% 42% / 0.12)`, color: `hsl(210 85% 42%)` }}>
                <Globe className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "مؤشر الاتصال الجوي" : "Air Connectivity Index"}
              </p>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold" data-testid="text-connectivity-index-value">{currentIndex}</span>
              <span className="text-sm text-muted-foreground mb-0.5">/ {targetIndex}</span>
            </div>
            <div className="h-[100px] relative" dir="ltr">
              <svg viewBox="0 0 200 110" className="w-full h-full">
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(210, 5%, 88%)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(210, 85%, 42%)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(gaugeAngle / 180) * 251.2} 251.2`} />
                <text x="100" y="95" textAnchor="middle" className="text-xs fill-muted-foreground" fontSize="11">
                  {indexProgress.toFixed(0)}%
                </text>
              </svg>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+6.1%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-countries-reached">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `hsl(185 75% 38% / 0.12)`, color: `hsl(185 75% 38%)` }}>
                <Map className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "الدول المخدومة" : "Countries Reached"}
              </p>
            </div>
            <span className="text-3xl font-bold" data-testid="text-countries-value">{COUNTRIES_REACHED}</span>
            <div className="mt-3 p-3 rounded-md bg-muted/50 text-center">
              <Navigation className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">
                {language === "ar" ? "خريطة تفاعلية قريباً" : "Interactive map coming soon"}
              </p>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-routes">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `hsl(28 85% 48% / 0.12)`, color: `hsl(28 85% 48%)` }}>
                <Route className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "المسارات" : "Routes"}
              </p>
            </div>
            <span className="text-3xl font-bold" data-testid="text-routes-total">{DOMESTIC_ROUTES + INTERNATIONAL_ROUTES}</span>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "محلي" : "Domestic"}</p>
                <p className="text-lg font-semibold" data-testid="text-domestic-routes">{DOMESTIC_ROUTES}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "دولي" : "International"}</p>
                <p className="text-lg font-semibold" data-testid="text-intl-routes">{INTERNATIONAL_ROUTES}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-airspace-airlines">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `hsl(280 70% 42% / 0.12)`, color: `hsl(280 70% 42%)` }}>
                <Plane className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {language === "ar" ? "خطوط المجال الجوي" : "Airlines Using Airspace"}
              </p>
            </div>
            <span className="text-3xl font-bold" data-testid="text-airspace-count">{AIRLINES.length + AIRSPACE_AIRLINES.length}</span>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "ناقلات" : "Carriers"}</p>
                <p className="text-lg font-semibold">{AIRLINES.length}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "عبور جوي" : "Overflight"}</p>
                <p className="text-lg font-semibold">{AIRSPACE_AIRLINES.filter((a) => a.overflight).length}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "اتجاه مؤشر الاتصال" : "Connectivity Index Trend"}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CONNECTIVITY_INDEX_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" domain={[0, 280]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name={language === "ar" ? "الفعلي" : "Actual"}
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: CHART_COLORS[0] }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name={language === "ar" ? "المستهدف" : "Target (250)"}
                    stroke="hsl(210, 8%, 70%)"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={{ r: 3, fill: "hsl(210, 8%, 70%)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "نمو المسارات" : "Route Growth"}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
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
                    dataKey="domestic"
                    name={language === "ar" ? "محلي" : "Domestic"}
                    fill={CHART_COLORS[0]}
                    radius={[3, 3, 0, 0]}
                    stackId="routes"
                  />
                  <Bar
                    dataKey="international"
                    name={language === "ar" ? "دولي" : "International"}
                    fill={CHART_COLORS[1]}
                    radius={[3, 3, 0, 0]}
                    stackId="routes"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "حصة الناقلات الأجنبية" : "Foreign Airlines Share"}
            </h2>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    dataKey="value"
                    nameKey={language === "ar" ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`ms-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {marketShareData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {language === "ar" ? item.nameAr : item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {language === "ar" ? "حصة الطيران منخفض التكلفة" : "LCC Market Share"}
            </h2>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lccShareData}
                    dataKey="value"
                    nameKey={language === "ar" ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {lccShareData.map((entry, index) => (
                      <Cell key={`lcc-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {lccShareData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {language === "ar" ? item.nameAr : item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">
              {language === "ar" ? "الرحلات حسب الناقل والمطار (بالآلاف)" : "Flights by Airline & Airport (Thousands)"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "ar" ? "شركة الطيران" : "Airline"}</TableHead>
                  <TableHead className="text-right">KAIA</TableHead>
                  <TableHead className="text-right">KKIA</TableHead>
                  <TableHead className="text-right">KFIA</TableHead>
                  <TableHead className="text-right">PMIA</TableHead>
                  <TableHead className="text-right">{language === "ar" ? "أخرى" : "Other"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {airlineAirportMatrix.map((row, idx) => (
                  <TableRow key={idx} data-testid={`row-airline-airport-${idx}`}>
                    <TableCell className="font-medium">{language === "ar" ? row.airlineAr : row.airline}</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-block min-w-[3rem] text-right">{row.KAIA}K</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-block min-w-[3rem] text-right">{row.KKIA}K</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-block min-w-[3rem] text-right">{row.KFIA}K</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-block min-w-[3rem] text-right">{row.PMIA}K</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-block min-w-[3rem] text-right">{row.Other}K</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">
              {language === "ar" ? "شركات الطيران المستخدمة للمجال الجوي" : "Airlines Using Saudi Airspace"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "ar" ? "شركة الطيران" : "Airline"}</TableHead>
                  <TableHead>{language === "ar" ? "الدولة" : "Country"}</TableHead>
                  <TableHead className="text-right">{language === "ar" ? "الحركات" : "Movements"}</TableHead>
                  <TableHead className="text-center">{language === "ar" ? "عبور جوي" : "Overflight"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AIRSPACE_AIRLINES.map((airline, idx) => (
                  <TableRow key={idx} data-testid={`row-airspace-${idx}`}>
                    <TableCell className="font-medium">{language === "ar" ? airline.airlineAr : airline.airline}</TableCell>
                    <TableCell className="text-muted-foreground">{language === "ar" ? airline.countryAr : airline.country}</TableCell>
                    <TableCell className="text-right">{(airline.movements / 1000).toFixed(1)}K</TableCell>
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
      </div>
    </ScrollArea>
  );
}
