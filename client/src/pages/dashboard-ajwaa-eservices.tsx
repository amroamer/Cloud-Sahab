import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  FileText,
  Clock,
  Star,
  Monitor,
  TrendingUp,
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
} from "recharts";
import {
  ESERVICE_APPLICATIONS_MONTHLY,
  ESERVICE_SUMMARY,
  ESERVICE_BY_GROUP,
  CSAT_TREND,
  CHART_COLORS,
} from "@/lib/ajwaa-mock-data";

export default function DashboardAjwaaEservices() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

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
      key: "serviceGroup",
      label: t("ajwaa.filter.serviceGroup"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "licensing", label: t("ajwaa.filter.licensing") },
        { value: "permits", label: t("ajwaa.filter.permits") },
        { value: "economic", label: t("ajwaa.filter.economic") },
        { value: "airport", label: t("ajwaa.filter.airport") },
        { value: "providers", label: t("ajwaa.filter.providers") },
      ],
      defaultValue: "all",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const chartTooltipStyle = {
    backgroundColor: "hsl(210, 5%, 96%)",
    border: "1px solid hsl(210, 5%, 88%)",
    borderRadius: "6px",
    fontSize: "12px",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-eservices-title">
            {t("ajwaa.eservices.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("ajwaa.eservices.subtitle")}
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
          <Card className="p-5" data-testid="card-kpi-total-apps">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.eservices.totalApps")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-total-apps">
                  {ESERVICE_SUMMARY.totalApplications.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+8.4%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-avg-processing">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.eservices.avgProcessing")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-avg-processing">
                  {ESERVICE_SUMMARY.avgDigitalProcessingDays} {t("ajwaa.eservices.days")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">-12.5%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-csat">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.eservices.csat")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-csat-score">
                  {ESERVICE_SUMMARY.csatScore} <span className="text-sm font-normal text-muted-foreground">{t("ajwaa.eservices.outOf5")}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+0.3</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-digitized">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.eservices.digitized")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-digitized-pct">
                  {ESERVICE_SUMMARY.fullyDigitizedPct}%
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 85%</span>
                <span className="font-medium">{((ESERVICE_SUMMARY.fullyDigitizedPct / 85) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(ESERVICE_SUMMARY.fullyDigitizedPct / 85) * 100} className="h-1.5" dir="ltr" />
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-by-group">
              {t("ajwaa.eservices.byGroup")}
            </h2>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ESERVICE_APPLICATIONS_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Bar dataKey="licensing" name={isAr ? "التراخيص" : "Licensing"} fill={CHART_COLORS[0]} stackId="apps" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="permits" name={isAr ? "التصاريح" : "Permits"} fill={CHART_COLORS[1]} stackId="apps" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="economic" name={isAr ? "الاقتصادية" : "Economic"} fill={CHART_COLORS[2]} stackId="apps" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="airport" name={isAr ? "المطارات" : "Airport"} fill={CHART_COLORS[3]} stackId="apps" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="providers" name={isAr ? "مزودي الخدمات" : "Providers"} fill={CHART_COLORS[4]} stackId="apps" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-processing-comparison">
              {t("ajwaa.eservices.processingComparison")}
            </h2>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ESERVICE_BY_GROUP} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: isAr ? "أيام" : "Days", position: "insideBottomRight", offset: -5, style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                  <YAxis dataKey={isAr ? "groupAr" : "group"} type="category" width={100} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value} ${isAr ? "يوم" : "days"}`, ""]} />
                  <Bar dataKey="avgDays" name={isAr ? "متوسط الأيام" : "Avg Days"} fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-csat-trend">
              {t("ajwaa.eservices.csatTrend")}
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CSAT_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis domain={[3.5, 4.5]} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value} / 5`, ""]} />
                  <Line type="monotone" dataKey="score" name={isAr ? "رضا العملاء" : "CSAT Score"} stroke={CHART_COLORS[2]} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS[2] }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-digitization">
              {t("ajwaa.eservices.digitizationProgress")}
            </h2>
            <div className="space-y-5 pt-2">
              {ESERVICE_BY_GROUP.map((group, i) => (
                <div key={group.group} className="space-y-2" data-testid={`digitization-group-${group.group.toLowerCase()}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-sm font-medium">{isAr ? group.groupAr : group.group}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {group.applications.toLocaleString()} {isAr ? "طلب" : "apps"}
                      </span>
                      <span className="text-sm font-semibold">{group.digitizedPct}%</span>
                    </div>
                  </div>
                  <Progress value={group.digitizedPct} className="h-2" dir="ltr" />
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{isAr ? "رضا العملاء" : "CSAT"}: {group.csat}/5</span>
                    <span>{isAr ? "متوسط المعالجة" : "Avg Processing"}: {group.avgDays} {t("ajwaa.eservices.days")}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
