import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  FileText,
  Clock,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  DollarSign,
  Plane,
  CalendarCheck,
  AlertTriangle,
  Timer,
  RefreshCw,
  CheckCircle,
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
} from "recharts";
import {
  CHART_COLORS,
  SINGLE_PERMIT_MONTHLY,
  PERMIT_SUMMARY,
  PERMIT_PROCESSING_TREND,
  OVERFLIGHT_LANDING_MONTHLY,
} from "@/lib/ajwaa-mock-data";
import { SectionTooltip } from "@/components/section-tooltip";

const OVERFLIGHT_LANDING_TOTALS = [
  { name: "Overflight", nameAr: "عبور", value: PERMIT_SUMMARY.overflightPermits },
  { name: "Landing", nameAr: "هبوط", value: PERMIT_SUMMARY.landingPermits },
];

const COMPLIANCE_TREND = OVERFLIGHT_LANDING_MONTHLY.map((m, i) => ({
  month: m.month,
  monthAr: m.monthAr,
  violations: [3, 2, 1, 2, 1, 2, 3, 2, 2, 1, 2, 3][i],
}));

const REVENUE_TREND = SINGLE_PERMIT_MONTHLY.map((m) => {
  const total = m.commercial + m.businessJet + m.humanitarian + m.diplomatic;
  return {
    month: m.month,
    monthAr: m.monthAr,
    revenue: Math.round(total * 16.8),
  };
});

export default function DashboardAjwaaPermits() {
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
      key: "permitType",
      label: t("ajwaa.filter.permitType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "single", label: t("ajwaa.filter.single") },
        { value: "annual", label: t("ajwaa.filter.annual") },
        { value: "overflight", label: t("ajwaa.filter.overflightPerm") },
        { value: "landing", label: t("ajwaa.filter.landingPerm") },
      ],
      defaultValue: "all",
    },
    {
      key: "operatorType",
      label: t("ajwaa.filter.operatorType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "commercial", label: t("ajwaa.filter.commercial") },
        { value: "private", label: t("ajwaa.filter.private") },
        { value: "charter", label: t("ajwaa.filter.charter") },
        { value: "humanitarian", label: t("ajwaa.filter.humanitarian") },
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
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-permits-title">
            {t("ajwaa.permits.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("ajwaa.permits.subtitle")}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2" data-testid="text-single-permits-section">
            {t("ajwaa.permits.singlePermits")}
            <SectionTooltip tooltip={isAr ? "مؤشرات أداء تصاريح الرحلات الفردية" : "Single flight permit performance metrics"} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-fp01">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.singleApps")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي طلبات التصاريح الفردية المقدمة" : "Total single permit applications submitted"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-single-apps">
                    {PERMIT_SUMMARY.singlePermitApps.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+8.3%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp02">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.onTimeIssuance")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "نسبة التصاريح الصادرة في الوقت المحدد" : "Percentage of permits issued within target timeframe"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-ontime-issuance">
                    {PERMIT_SUMMARY.onTimeIssuancePct}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={PERMIT_SUMMARY.onTimeIssuancePct} className="h-1.5" dir="ltr" />
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp03">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.avgProcessingHrs")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "متوسط ساعات معالجة طلب التصريح الفردي" : "Average hours to process a single permit application"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-avg-processing-hrs">
                    {PERMIT_SUMMARY.avgProcessingHours}h
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">-12.8%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp04">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.rejectionRate")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "نسبة طلبات التصاريح المرفوضة" : "Percentage of permit applications rejected"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-rejection-rate">
                    {PERMIT_SUMMARY.rejectionRatePct}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">-0.5pp</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2" data-testid="text-annual-permits-section">
            {t("ajwaa.permits.annualPermits")}
            <SectionTooltip tooltip={isAr ? "مؤشرات أداء التصاريح السنوية" : "Annual permit performance metrics"} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-fp05">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.activeAnnual")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "عدد التصاريح السنوية النشطة حالياً" : "Number of currently active annual permits"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-active-annual">
                    {PERMIT_SUMMARY.activeAnnualPermits.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+5.2%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp06">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.annualRenewal")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "نسبة التصاريح السنوية المجددة في الوقت المحدد" : "On-time renewal rate for annual permits"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-annual-renewal">
                    {PERMIT_SUMMARY.annualRenewalOnTimePct}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={PERMIT_SUMMARY.annualRenewalOnTimePct} className="h-1.5" dir="ltr" />
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp07">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                  <Timer className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.avgAnnualDays")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "متوسط أيام معالجة التصريح السنوي" : "Average processing days for annual permits"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-avg-annual-days">
                    {PERMIT_SUMMARY.avgAnnualProcessingDays}d
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">-2.1d</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp08">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(45 90% 48% / 0.12)", color: "hsl(45 90% 38%)" }}>
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.revenue")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي الإيرادات من رسوم التصاريح" : "Total revenue from permit fees"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-permit-revenue">
                    {(PERMIT_SUMMARY.permitRevenueSAR / 1_000_000).toFixed(0)}M SAR
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+11.5%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2" data-testid="text-overflight-landing-section">
            {t("ajwaa.permits.overflightLanding")}
            <SectionTooltip tooltip={isAr ? "مؤشرات تصاريح العبور والهبوط" : "Overflight and landing permit metrics"} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-fp09">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                  <Plane className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.overflight")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي تصاريح العبور الصادرة" : "Total overflight permits issued"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-overflight">
                    {PERMIT_SUMMARY.overflightPermits.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+6.8%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <Plane className="h-5 w-5 rotate-90" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.landing")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي تصاريح الهبوط الصادرة" : "Total landing permits issued"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-landing">
                    {PERMIT_SUMMARY.landingPermits.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+4.2%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp11">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.violations")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "عدد مخالفات الامتثال المسجلة" : "Number of compliance violations recorded"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-violations">
                    {PERMIT_SUMMARY.complianceViolations}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">-8</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-fp12">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                  <Timer className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.permits.clearanceHrs")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "متوسط ساعات التخليص للعبور والهبوط" : "Average clearance hours for overflight and landing"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-clearance-hrs">
                    {PERMIT_SUMMARY.avgClearanceHours}h
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">-0.4h</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" data-testid="text-volume-trend-chart">
              {t("ajwaa.permits.volumeTrend")}
              <SectionTooltip tooltip={isAr ? "اتجاه حجم التصاريح الشهرية حسب النوع" : "Monthly permit volume trend by type"} />
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SINGLE_PERMIT_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Bar dataKey="commercial" name={isAr ? "تجاري" : "Commercial"} fill={CHART_COLORS[0]} stackId="permits" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="businessJet" name={isAr ? "طائرة خاصة" : "Business Jet"} fill={CHART_COLORS[1]} stackId="permits" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="humanitarian" name={isAr ? "إنساني" : "Humanitarian"} fill={CHART_COLORS[2]} stackId="permits" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="diplomatic" name={isAr ? "دبلوماسي" : "Diplomatic"} fill={CHART_COLORS[3]} stackId="permits" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" data-testid="text-overflight-vs-landing-chart">
              {t("ajwaa.permits.overflightVsLanding")}
              <SectionTooltip tooltip={isAr ? "مقارنة بين تصاريح العبور والهبوط" : "Comparison of overflight vs landing permits"} />
            </h2>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={OVERFLIGHT_LANDING_TOTALS}
                    dataKey="value"
                    nameKey={isAr ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    <Cell fill={CHART_COLORS[0]} />
                    <Cell fill={CHART_COLORS[1]} />
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toLocaleString(), ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {OVERFLIGHT_LANDING_TOTALS.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{isAr ? item.nameAr : item.name}</span>
                  </div>
                  <span className="text-xs font-medium">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" data-testid="text-processing-trend-chart">
              {t("ajwaa.permits.processingTrend")}
              <SectionTooltip tooltip={isAr ? "اتجاه وقت المعالجة للتصاريح الفردية والسنوية والتخليص" : "Processing time trend for single, annual, and clearance permits"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PERMIT_PROCESSING_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="singleHours" name={isAr ? "تصريح فردي (ساعات)" : "Single (hours)"} stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="annualDays" name={isAr ? "سنوي (أيام)" : "Annual (days)"} stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="clearanceHours" name={isAr ? "تخليص (ساعات)" : "Clearance (hours)"} stroke={CHART_COLORS[4]} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              {isAr ? "اتجاه الإيرادات (SAR K)" : "Revenue Trend (SAR K)"}
              <SectionTooltip tooltip={isAr ? "اتجاه الإيرادات الشهرية من رسوم التصاريح" : "Monthly revenue trend from permit fees"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value.toLocaleString()} SAR K`, ""]} />
                  <Bar dataKey="revenue" name={isAr ? "الإيرادات" : "Revenue"} fill={CHART_COLORS[5]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              {isAr ? "حركة العبور والهبوط الشهرية" : "Monthly Overflight & Landing"}
              <SectionTooltip tooltip={isAr ? "الحركة الشهرية لتصاريح العبور والهبوط" : "Monthly overflight and landing permit activity"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OVERFLIGHT_LANDING_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toLocaleString(), ""]} />
                  <Legend />
                  <Bar dataKey="overflight" name={isAr ? "عبور" : "Overflight"} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="landing" name={isAr ? "هبوط" : "Landing"} fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              {isAr ? "اتجاه مخالفات الامتثال" : "Compliance Violation Trend"}
              <SectionTooltip tooltip={isAr ? "اتجاه مخالفات الامتثال الشهرية" : "Monthly compliance violation trend"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={COMPLIANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" allowDecimals={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Line type="monotone" dataKey="violations" name={isAr ? "المخالفات" : "Violations"} stroke={CHART_COLORS[4]} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
