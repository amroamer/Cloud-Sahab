import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Globe,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Plane,
  Building2,
  Route,
  MapPin,
  Map,
} from "lucide-react";
import { SectionTooltip } from "@/components/section-tooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  AIRPORTS,
  MONTHLY_TRAFFIC,
  CONNECTIVITY_INDEX_TREND,
  COUNTRIES_REACHED,
  DOMESTIC_ROUTES,
  INTERNATIONAL_ROUTES,
  TOTAL_FLEET_COMMERCIAL,
  TOTAL_FLEET_PRIVATE,
} from "@/lib/mock-data";

const CHART_COLORS = {
  primary: "hsl(210, 85%, 42%)",
  secondary: "hsl(185, 75%, 38%)",
  tertiary: "hsl(28, 85%, 48%)",
  muted: "hsl(210, 8%, 70%)",
};

const totalAirports = AIRPORTS.length;
const totalRoutes = DOMESTIC_ROUTES + INTERNATIONAL_ROUTES;
const totalFleet = TOTAL_FLEET_COMMERCIAL + TOTAL_FLEET_PRIVATE;
const totalFlightsYTD = AIRPORTS.reduce((sum, a) => sum + a.flights, 0);

export default function DashboardOverview() {
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
        { value: "trailing12", label: t("dashboard.trailing12") },
      ],
      defaultValue: "ytd",
    },
    {
      key: "granularity",
      label: t("filter.granularity"),
      options: [
        { value: "monthly", label: t("dashboard.monthly") },
        { value: "quarterly", label: t("dashboard.quarterly") },
      ],
      defaultValue: "monthly",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-dashboard-title">
            {t("dashboard.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("dashboard.dataAsOf")} {language === "ar" ? "6 مارس 2026، 08:00 ص" : "March 6, 2026, 08:00 AM"}
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
          <KpiCard
            title={t("kpi.connectivity")}
            value="87"
            target="250"
            progress={34.8}
            change={5.2}
            sparklineData={[62, 65, 68, 71, 73, 75, 72, 78, 80, 82, 85, 87]}
            href="/dashboards/connectivity"
            icon={<Globe className="h-5 w-5" />}
            color="210 85% 42%"
            tooltip={language === "ar" ? "مؤشر الاتصال الجوي يقيس عدد الوجهات المباشرة وتكرار الرحلات" : "Air Connectivity Index measuring direct destinations and flight frequency"}
          />
          <KpiCard
            title={t("kpi.travelers")}
            value="98.5M"
            target="330M"
            progress={29.8}
            change={7.2}
            sparklineData={[5.8, 6.2, 7.1, 8.5, 9.2, 10.1, 11.2, 10.8, 9.5, 11.5, 12.1, 12.4]}
            href="/dashboards/passengers"
            icon={<Users className="h-5 w-5" />}
            color="185 75% 38%"
            tooltip={language === "ar" ? "إجمالي عدد المسافرين عبر جميع المطارات السعودية منذ بداية العام" : "Total passengers across all Saudi airports year-to-date"}
          />
          <KpiCard
            title={t("kpi.cargo")}
            value="852K"
            target="3M"
            progress={28.4}
            change={12.5}
            sparklineData={[55, 58, 62, 68, 72, 75, 71, 78, 82, 85, 88, 92]}
            href="/dashboards/cargo"
            icon={<Package className="h-5 w-5" />}
            color="28 85% 48%"
            tooltip={language === "ar" ? "إجمالي حجم الشحن الجوي بالأطنان عبر جميع المطارات السعودية" : "Total air cargo volume in tonnes across all Saudi airports"}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-semibold">{t("dashboard.trafficTrend")}</h2>
                <SectionTooltip tooltip={language === "ar" ? "اتجاه حركة المسافرين الشهرية مقارنة بالعام السابق" : "Monthly passenger traffic trend compared to previous year"} />
              </div>
              <Tabs value={filterValues.granularity} onValueChange={(v) => onFilterChange("granularity", v)}>
                <TabsList>
                  <TabsTrigger value="monthly" data-testid="tab-monthly">{t("dashboard.monthly")}</TabsTrigger>
                  <TabsTrigger value="quarterly" data-testid="tab-quarterly">{t("dashboard.quarterly")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_TRAFFIC}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis
                    dataKey={language === "ar" ? "monthAr" : "month"}
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                    label={{
                      value: language === "ar" ? "مليون مسافر" : "Passengers (M)",
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
                    <linearGradient id="gradPassengers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="passengers"
                    name={language === "ar" ? "المسافرون 2026" : "Passengers 2026"}
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                    fill="url(#gradPassengers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="lastYearPax"
                    name={language === "ar" ? "المسافرون 2025" : "Passengers 2025"}
                    stroke={CHART_COLORS.muted}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">{t("dashboard.connectivityMap")}</h2>
              <SectionTooltip tooltip={language === "ar" ? "خريطة تفاعلية توضح الوجهات والمسارات الجوية المباشرة" : "Interactive map showing direct air destinations and routes"} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/30 min-h-[260px]">
              <Globe className="h-16 w-16 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground text-center px-4">
                {t("dashboard.connectivityMapDesc")}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1.5">
                {language === "ar" ? "78 دولة • 237 مساراً" : "78 Countries • 237 Routes"}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-semibold">{t("dashboard.targetTrajectory")} - {t("kpi.connectivity")}</h2>
              <SectionTooltip tooltip={language === "ar" ? "مسار التقدم نحو هدف مؤشر الاتصال 250 بحلول 2030" : "Progress trajectory toward the connectivity index target of 250 by 2030"} />
            </div>
          </div>
          <div className="h-[260px]" dir="ltr">
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
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: CHART_COLORS.primary }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name={language === "ar" ? "المستهدف 2030" : "Target 2030"}
                  stroke={CHART_COLORS.muted}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: CHART_COLORS.muted }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <QuickCounter
            icon={<Building2 className="h-5 w-5" />}
            label={t("dashboard.numberOfAirports")}
            value={totalAirports.toString()}
            color="210 85% 42%"
            href="/dashboards/airports"
            tooltip={language === "ar" ? "إجمالي عدد المطارات العاملة في المملكة" : "Total number of operating airports in Saudi Arabia"}
          />
          <QuickCounter
            icon={<Route className="h-5 w-5" />}
            label={t("dashboard.totalRoutes")}
            value={totalRoutes.toString()}
            subValues={[
              { label: language === "ar" ? "محلي" : "Dom", value: DOMESTIC_ROUTES.toString() },
              { label: language === "ar" ? "دولي" : "Intl", value: INTERNATIONAL_ROUTES.toString() },
            ]}
            color="185 75% 38%"
            href="/dashboards/connectivity"
            tooltip={language === "ar" ? "عدد المسارات الجوية المحلية والدولية النشطة" : "Number of active domestic and international air routes"}
          />
          <QuickCounter
            icon={<Plane className="h-5 w-5" />}
            label={t("dashboard.numberOfPlanes")}
            value={totalFleet.toString()}
            subValues={[
              { label: language === "ar" ? "تجاري" : "Com", value: TOTAL_FLEET_COMMERCIAL.toString() },
              { label: language === "ar" ? "خاص" : "Pvt", value: TOTAL_FLEET_PRIVATE.toString() },
            ]}
            color="28 85% 48%"
            href="/dashboards/fleet"
            tooltip={language === "ar" ? "إجمالي حجم الأسطول الجوي بما في ذلك الطائرات التجارية والخاصة" : "Total fleet size including commercial and private aircraft"}
          />
          <QuickCounter
            icon={<MapPin className="h-5 w-5" />}
            label={t("dashboard.countriesReached")}
            value={COUNTRIES_REACHED.toString()}
            color="280 70% 42%"
            href="/dashboards/connectivity"
            tooltip={language === "ar" ? "عدد الدول التي تصلها رحلات مباشرة من المملكة" : "Number of countries with direct flights from Saudi Arabia"}
          />
          <QuickCounter
            icon={<Plane className="h-5 w-5" />}
            label={t("dashboard.totalFlights")}
            value={`${(totalFlightsYTD / 1000).toFixed(0)}K`}
            color="160 70% 38%"
            href="/dashboards/flight-ops"
            tooltip={language === "ar" ? "إجمالي عدد الرحلات الجوية منذ بداية العام" : "Total number of flights year-to-date"}
          />
        </div>
      </div>
    </ScrollArea>
  );
}

function QuickCounter({
  icon,
  label,
  value,
  subValues,
  color,
  href,
  tooltip,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValues?: { label: string; value: string }[];
  color: string;
  href: string;
  tooltip?: string;
}) {
  return (
    <a href={href} data-testid={`counter-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <Card className="p-4 cursor-pointer hover-elevate transition-all">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md shrink-0"
            style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
          >
            {icon}
          </div>
          <p className="text-xs text-muted-foreground font-medium leading-tight">{label}</p>
          {tooltip && <SectionTooltip tooltip={tooltip} />}
        </div>
        <p className="text-2xl font-bold tracking-tight" data-testid={`text-counter-${label.toLowerCase().replace(/\s+/g, "-")}`}>
          {value}
        </p>
        {subValues && (
          <div className="flex items-center gap-3 mt-1.5">
            {subValues.map((sv) => (
              <span key={sv.label} className="text-xs text-muted-foreground">
                {sv.label}: <span className="font-medium text-foreground">{sv.value}</span>
              </span>
            ))}
          </div>
        )}
      </Card>
    </a>
  );
}
