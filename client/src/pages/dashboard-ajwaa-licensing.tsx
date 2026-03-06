import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Users,
  Clock,
  CheckCircle,
  Monitor,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
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
  CHART_COLORS,
  PILOT_LICENSE_MONTHLY,
  PILOT_LICENSE_SUMMARY,
  CABIN_CREW_SUMMARY,
  PERSONNEL_BY_CATEGORY,
  PROCESSING_TIME_TREND,
  LICENSE_REVENUE_TREND,
} from "@/lib/ajwaa-mock-data";

const chartTooltipStyle = {
  backgroundColor: "hsl(210, 5%, 96%)",
  border: "1px solid hsl(210, 5%, 88%)",
  borderRadius: "6px",
  fontSize: "12px",
};

export default function DashboardAjwaaLicensing() {
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
      key: "licenseCategory",
      label: t("ajwaa.filter.licenseCategory"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "pilot", label: t("ajwaa.filter.pilot") },
        { value: "cabinCrew", label: t("ajwaa.filter.cabinCrew") },
        { value: "atco", label: t("ajwaa.filter.atco") },
        { value: "maintenance", label: t("ajwaa.filter.maintenance") },
        { value: "dispatch", label: t("ajwaa.filter.dispatch") },
      ],
      defaultValue: "all",
    },
    {
      key: "applicationType",
      label: t("ajwaa.filter.applicationType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "new", label: t("ajwaa.filter.new") },
        { value: "renewal", label: t("ajwaa.filter.renewal") },
        { value: "validation", label: t("ajwaa.filter.validation") },
        { value: "conversion", label: t("ajwaa.filter.conversion") },
      ],
      defaultValue: "all",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const totalActive = PERSONNEL_BY_CATEGORY.reduce((sum, p) => sum + p.active, 0);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-ajwaa-licensing-title">
            {t("ajwaa.licensing.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("ajwaa.licensing.subtitle")}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-5" data-testid="card-kpi-pl01">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.applications")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl01-value">
                  {PILOT_LICENSE_SUMMARY.totalApplications.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+8.2%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-pl02">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.onTimeRenewal")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl02-value">
                  {PILOT_LICENSE_SUMMARY.onTimeRenewalPct}%
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 95%</span>
                <span className="font-medium">{((PILOT_LICENSE_SUMMARY.onTimeRenewalPct / 95) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(PILOT_LICENSE_SUMMARY.onTimeRenewalPct / 95) * 100} className="h-1.5" dir="ltr" />
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-pl03">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.avgProcessing")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl03-value">
                  {PILOT_LICENSE_SUMMARY.avgProcessingDays} {isAr ? "يوم" : "days"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">-12.5%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-pl04">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.firstTimeApproval")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl04-value">
                  {PILOT_LICENSE_SUMMARY.firstTimeApprovalPct}%
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 90%</span>
                <span className="font-medium">{((PILOT_LICENSE_SUMMARY.firstTimeApprovalPct / 90) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(PILOT_LICENSE_SUMMARY.firstTimeApprovalPct / 90) * 100} className="h-1.5" dir="ltr" />
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-pl05">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.digitalCompletion")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl05-value">
                  {PILOT_LICENSE_SUMMARY.digitalCompletionPct}%
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("kpi.target")}: 85%</span>
                <span className="font-medium">{((PILOT_LICENSE_SUMMARY.digitalCompletionPct / 85) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(PILOT_LICENSE_SUMMARY.digitalCompletionPct / 85) * 100} className="h-1.5" dir="ltr" />
            </div>
          </Card>

          <Card className="p-5" data-testid="card-kpi-pl06">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {t("ajwaa.licensing.revenue")}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-pl06-value">
                  {isAr ? "٤٢.٥ م ر.س" : "SAR 42.5M"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">+5.8%</span>
              <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold" data-testid="text-cabin-crew-section">
            {t("ajwaa.licensing.cabinCrew")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-cc01">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.activeLicenses")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-cc01-value">
                {CABIN_CREW_SUMMARY.activeLicenses.toLocaleString()}
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-cc02">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.onTimeRenewal")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-cc02-value">
                {CABIN_CREW_SUMMARY.onTimeRenewalPct}%
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-cc03">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.avgProcessing")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-cc03-value">
                {CABIN_CREW_SUMMARY.avgProcessingDays} {isAr ? "يوم" : "days"}
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-cc04">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.appsPer1000")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-cc04-value">
                {CABIN_CREW_SUMMARY.applicationsPer1000}
              </p>
            </Card>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold" data-testid="text-other-personnel-section">
            {t("ajwaa.licensing.otherPersonnel")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-ap01">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.activeLicenses")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-ap01-value">
                {totalActive.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isAr ? "عبر جميع الفئات" : "Across all categories"}
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-ap02">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.nonCompliance")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-ap02-value">
                {(PERSONNEL_BY_CATEGORY.reduce((sum, p) => sum + p.nonCompliancePct, 0) / PERSONNEL_BY_CATEGORY.length).toFixed(1)}%
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-ap03">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.avgProcessing")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-ap03-value">
                {(PERSONNEL_BY_CATEGORY.reduce((sum, p) => sum + p.avgDays, 0) / PERSONNEL_BY_CATEGORY.length).toFixed(1)} {isAr ? "يوم" : "days"}
              </p>
            </Card>
            <Card className="p-5" data-testid="card-kpi-ap04">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {t("ajwaa.licensing.onlineRenewal")}
              </p>
              <p className="text-2xl font-bold tracking-tight" data-testid="text-ap04-value">
                {(PERSONNEL_BY_CATEGORY.reduce((sum, p) => sum + p.onlinePct, 0) / PERSONNEL_BY_CATEGORY.length).toFixed(1)}%
              </p>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-by-type">
              {t("ajwaa.licensing.byType")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PILOT_LICENSE_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Bar dataKey="atpl" name="ATPL" fill={CHART_COLORS[0]} stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="cpl" name="CPL" fill={CHART_COLORS[1]} stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="ppl" name="PPL" fill={CHART_COLORS[2]} stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="validation" name={isAr ? "تحقق" : "Validation"} fill={CHART_COLORS[3]} stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="conversion" name={isAr ? "تحويل" : "Conversion"} fill={CHART_COLORS[4]} stackId="a" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-processing-trend">
              {t("ajwaa.licensing.processingTrend")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PROCESSING_TIME_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: isAr ? "أيام" : "Days", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="pilot" name={isAr ? "طيار" : "Pilot"} stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="cabin" name={isAr ? "طاقم الضيافة" : "Cabin Crew"} stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="atco" name={isAr ? "مراقب جوي" : "ATCO"} stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="maintenance" name={isAr ? "صيانة" : "Maintenance"} stroke={CHART_COLORS[3]} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-revenue-trend">
              {t("ajwaa.licensing.revenueTrend")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LICENSE_REVENUE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" label={{ value: isAr ? "ألف ر.س" : "SAR K", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210, 6%, 50%)" } }} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Bar dataKey="pilot" name={isAr ? "طيار" : "Pilot"} fill={CHART_COLORS[0]} stackId="rev" />
                  <Bar dataKey="cabin" name={isAr ? "طاقم الضيافة" : "Cabin Crew"} fill={CHART_COLORS[1]} stackId="rev" />
                  <Bar dataKey="atco" name={isAr ? "مراقب جوي" : "ATCO"} fill={CHART_COLORS[2]} stackId="rev" />
                  <Bar dataKey="maintenance" name={isAr ? "صيانة" : "Maintenance"} fill={CHART_COLORS[3]} stackId="rev" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-personnel-breakdown">
              {t("ajwaa.licensing.personnelBreakdown")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERSONNEL_BY_CATEGORY} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis dataKey={isAr ? "categoryAr" : "category"} type="category" width={90} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toLocaleString(), ""]} />
                  <Bar dataKey="active" name={isAr ? "تراخيص نشطة" : "Active Licenses"} fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
