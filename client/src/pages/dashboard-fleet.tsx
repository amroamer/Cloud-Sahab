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
import { Plane, ShieldCheck, Gauge, TrendingUp, TrendingDown } from "lucide-react";
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
  LineChart,
  Line,
} from "recharts";
import {
  TOTAL_FLEET_COMMERCIAL,
  TOTAL_FLEET_PRIVATE,
  AVG_FLEET_AGE,
  FLEET_BY_CATEGORY,
  AIRCRAFT_PURCHASES,
  FLEET_BY_AIRLINE,
  CHART_COLORS,
} from "@/lib/mock-data";
import { SectionTooltip } from "@/components/section-tooltip";

const AGE_BANDS = [
  { key: "age0_5", label: "0–5 yrs", labelAr: "0–5 سنوات", color: CHART_COLORS[0] },
  { key: "age6_10", label: "6–10 yrs", labelAr: "6–10 سنوات", color: CHART_COLORS[1] },
  { key: "age11_15", label: "11–15 yrs", labelAr: "11–15 سنة", color: CHART_COLORS[2] },
  { key: "age16_20", label: "16–20 yrs", labelAr: "16–20 سنة", color: CHART_COLORS[3] },
  { key: "age20plus", label: "20+ yrs", labelAr: "20+ سنة", color: CHART_COLORS[4] },
];

const PURCHASE_SERIES = [
  { key: "narrowBody", label: "Narrow-body", labelAr: "ضيقة البدن", color: CHART_COLORS[0] },
  { key: "wideBody", label: "Wide-body", labelAr: "واسعة البدن", color: CHART_COLORS[1] },
  { key: "regional", label: "Regional", labelAr: "إقليمية", color: CHART_COLORS[2] },
  { key: "cargo", label: "Cargo", labelAr: "شحن", color: CHART_COLORS[3] },
  { key: "private", label: "Private", labelAr: "خاص", color: CHART_COLORS[5] },
];

const fleetSplitData = [
  { name: "Commercial", nameAr: "تجاري", value: TOTAL_FLEET_COMMERCIAL, color: CHART_COLORS[0] },
  { name: "Private", nameAr: "خاص", value: TOTAL_FLEET_PRIVATE, color: CHART_COLORS[5] },
];

export default function DashboardFleet() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: "airline",
      label: t("dashboard.airline"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "saudia", label: isAr ? "الخطوط السعودية" : "Saudia" },
        { value: "flynas", label: isAr ? "طيران ناس" : "flynas" },
        { value: "flyadeal", label: isAr ? "طيران أديل" : "flyadeal" },
        { value: "riyadhair", label: isAr ? "طيران الرياض" : "Riyadh Air" },
      ],
      defaultValue: "all",
    },
    {
      key: "aircraftCategory",
      label: t("filter.aircraftCategory"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "narrowBody", label: t("filter.narrowBody") },
        { value: "wideBody", label: t("filter.wideBody") },
        { value: "regional", label: t("filter.regional") },
        { value: "cargo", label: t("filter.cargoAc") },
      ],
      defaultValue: "all",
    },
  ], [t, isAr]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const totalFleet = TOTAL_FLEET_COMMERCIAL + TOTAL_FLEET_PRIVATE;
  const ageGaugePercent = Math.min((AVG_FLEET_AGE / 20) * 100, 100);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-fleet-title">
            {isAr ? "الأسطول والطائرات" : "Fleet & Aircraft"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isAr ? "البيانات حتى" : "Data as of"}{" "}
            {isAr ? "6 مارس 2026، 08:00 ص" : "March 6, 2026, 08:00 AM"}
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
          <Card className="p-5" data-testid="card-commercial-fleet">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[0]}20`, color: CHART_COLORS[0] }}>
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isAr ? "الأسطول التجاري" : "Commercial Fleet"}
                  </p>
                  <SectionTooltip tooltip={isAr ? "إجمالي عدد الطائرات التجارية المسجلة لدى شركات الطيران السعودية" : "Total number of commercial aircraft registered with Saudi airlines"} />
                </div>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-commercial-count">
                  {TOTAL_FLEET_COMMERCIAL}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+8.4%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-private-fleet">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[5]}20`, color: CHART_COLORS[5] }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isAr ? "الأسطول الخاص" : "Private Fleet"}
                  </p>
                  <SectionTooltip tooltip={isAr ? "إجمالي عدد الطائرات الخاصة المسجلة في المملكة العربية السعودية" : "Total number of private aircraft registered in Saudi Arabia"} />
                </div>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-private-count">
                  {TOTAL_FLEET_PRIVATE}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+12.6%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-avg-age">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[2]}20`, color: CHART_COLORS[2] }}>
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isAr ? "متوسط عمر الأسطول" : "Average Fleet Age"}
                  </p>
                  <SectionTooltip tooltip={isAr ? "متوسط عمر جميع الطائرات في الأسطول السعودي بالسنوات" : "Average age of all aircraft in the Saudi fleet in years"} />
                </div>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-avg-age">
                  {AVG_FLEET_AGE} {isAr ? "سنوات" : "years"}
                </p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${ageGaugePercent}%`, backgroundColor: CHART_COLORS[2] }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>{isAr ? "سنوات" : "years"}</span>
              <span>20</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3" data-testid="card-fleet-donut">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">
                {isAr ? "تقسيم الأسطول" : "Fleet Split"}
              </h2>
              <SectionTooltip tooltip={isAr ? "توزيع الأسطول بين الطائرات التجارية والخاصة" : "Fleet distribution between commercial and private aircraft"} />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="h-[200px] w-[200px] shrink-0" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetSplitData}
                      dataKey="value"
                      nameKey={isAr ? "nameAr" : "name"}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {fleetSplitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1">
                {fleetSplitData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{isAr ? item.nameAr : item.name}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-lg font-bold">{item.value}</span>
                      <span className="text-xs text-muted-foreground ms-1">
                        ({((item.value / totalFleet) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">{isAr ? "الإجمالي" : "Total"}</span>
                  <span className="text-lg font-bold">{totalFleet}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2" data-testid="card-category-breakdown">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">
                {isAr ? "حسب الفئة" : "By Category"}
              </h2>
              <SectionTooltip tooltip={isAr ? "توزيع الأسطول حسب فئة الطائرة (ضيقة البدن، واسعة البدن، إقليمية، شحن)" : "Fleet breakdown by aircraft category (narrow-body, wide-body, regional, cargo)"} />
            </div>
            <div className="space-y-3">
              {FLEET_BY_CATEGORY.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm">{isAr ? cat.categoryAr : cat.category}</span>
                    <Badge variant="secondary" className="no-default-active-elevate" data-testid={`badge-category-${cat.category.toLowerCase()}`}>
                      {cat.count}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(cat.count / TOTAL_FLEET_COMMERCIAL) * 100}%`,
                        backgroundColor: CHART_COLORS[FLEET_BY_CATEGORY.indexOf(cat)],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5" data-testid="card-fleet-age-composition">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">
              {isAr ? "تكوين الأسطول حسب الفئة العمرية" : "Fleet Composition by Age Band"}
            </h2>
            <SectionTooltip tooltip={isAr ? "توزيع الطائرات حسب الفئة والعمر لتقييم حداثة الأسطول" : "Aircraft distribution by category and age band to assess fleet modernity"} />
          </div>
          <div className="h-[320px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FLEET_BY_CATEGORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey={isAr ? "categoryAr" : "category"}
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(210, 5%, 96%)",
                    border: "1px solid hsl(210, 5%, 88%)",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                {AGE_BANDS.map((band) => (
                  <Bar
                    key={band.key}
                    dataKey={band.key}
                    name={isAr ? band.labelAr : band.label}
                    stackId="a"
                    fill={band.color}
                    radius={band.key === "age20plus" ? [3, 3, 0, 0] : undefined}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5" data-testid="card-purchase-trend">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">
                {isAr ? "اتجاه شراء الطائرات السنوي" : "Annual Aircraft Purchase Trend"}
              </h2>
              <SectionTooltip tooltip={isAr ? "عدد الطائرات المشتراة سنوياً حسب نوع الطائرة" : "Number of aircraft purchased annually by aircraft type"} />
            </div>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AIRCRAFT_PURCHASES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  {PURCHASE_SERIES.map((s) => (
                    <Bar
                      key={s.key}
                      dataKey={s.key}
                      name={isAr ? s.labelAr : s.label}
                      stackId="purchases"
                      fill={s.color}
                      radius={s.key === "private" ? [3, 3, 0, 0] : undefined}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-fleet-by-airline">
            <div className="flex items-center gap-1.5 mb-4">
              <h2 className="text-base font-semibold">
                {isAr ? "الأسطول حسب شركة الطيران" : "Fleet by Airline"}
              </h2>
              <SectionTooltip tooltip={isAr ? "تفاصيل أسطول كل شركة طيران بما في ذلك العدد ومتوسط العمر" : "Fleet details per airline including count and average age"} />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isAr ? "شركة الطيران" : "Airline"}</TableHead>
                    <TableHead className="text-end">{isAr ? "الإجمالي" : "Total"}</TableHead>
                    <TableHead className="text-end">{isAr ? "متوسط العمر" : "Avg Age"}</TableHead>
                    <TableHead className="text-end">{isAr ? "أحدث" : "Newest"}</TableHead>
                    <TableHead className="text-end">{isAr ? "أقدم" : "Oldest"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FLEET_BY_AIRLINE.map((row, idx) => (
                    <TableRow key={row.airline} data-testid={`row-fleet-airline-${idx}`}>
                      <TableCell className="font-medium">
                        {isAr ? row.airlineAr : row.airline}
                      </TableCell>
                      <TableCell className="text-end">
                        <Badge variant="secondary" className="no-default-active-elevate">
                          {row.total}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-end">
                        {row.avgAge} {isAr ? "سنوات" : "yrs"}
                      </TableCell>
                      <TableCell className="text-end">{row.newest}</TableCell>
                      <TableCell className="text-end">{row.oldest}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <Card className="p-5" data-testid="card-purchase-line-trend">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">
              {isAr ? "اتجاه الشراء حسب النوع" : "Purchase Trend by Type"}
            </h2>
            <SectionTooltip tooltip={isAr ? "اتجاه خطي لمشتريات الطائرات حسب النوع عبر السنوات" : "Line trend of aircraft purchases by type over the years"} />
          </div>
          <div className="h-[280px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={AIRCRAFT_PURCHASES}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(210, 5%, 96%)",
                    border: "1px solid hsl(210, 5%, 88%)",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                {PURCHASE_SERIES.map((s) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={isAr ? s.labelAr : s.label}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={{ r: 3, fill: s.color }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
