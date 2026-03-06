import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  FileText,
  Clock,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  Shield,
  PlusCircle,
  Calendar,
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
  ECONOMIC_LICENSES_BY_TYPE,
  ECONOMIC_SUMMARY,
  GA_SUMMARY,
  GA_GROWTH_TREND,
} from "@/lib/ajwaa-mock-data";
import { SectionTooltip } from "@/components/section-tooltip";

const renewalDonutData = [
  { name: "Success", value: ECONOMIC_SUMMARY.renewalSuccessPct },
  { name: "Failed", value: 100 - ECONOMIC_SUMMARY.renewalSuccessPct },
];

export default function DashboardAjwaaEconomic() {
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
      key: "licenseType",
      label: t("ajwaa.filter.licenseType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "scheduled", label: t("ajwaa.filter.scheduled") },
        { value: "nonScheduled", label: t("ajwaa.filter.nonScheduled") },
        { value: "cargo", label: t("filter.cargoAc") },
        { value: "lcc", label: t("filter.lcc") },
      ],
      defaultValue: "all",
    },
    {
      key: "sector",
      label: t("ajwaa.filter.sector"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "economic", label: t("ajwaa.filter.economic") },
        { value: "ga", label: t("ajwaa.filter.ga") },
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

  const licenseBarData = ECONOMIC_LICENSES_BY_TYPE.map((item) => ({
    name: isAr ? item.typeAr : item.type,
    active: item.active,
    newThisYear: item.newThisYear,
    violations: item.violations,
    revenue: item.revenueSAR / 1_000_000,
  }));

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-economic-title">
            {t("ajwaa.economic.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5" data-testid="text-economic-subtitle">
            {t("ajwaa.economic.subtitle")}
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
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2" data-testid="text-section-economic-licenses">
            {t("ajwaa.economic.economicLicenses")}
            <SectionTooltip tooltip={isAr ? "مؤشرات أداء التراخيص الاقتصادية للناقلات الجوية" : "Economic licensing metrics for air carriers"} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="p-5" data-testid="card-kpi-el01">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.activeLicenses")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي التراخيص الاقتصادية النشطة" : "Total active economic licenses"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-el01-value">{ECONOMIC_SUMMARY.totalActiveLicenses}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "عبر 5 فئات ناقل" : "Across 5 carrier types"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-el02">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.timeToIssue")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "متوسط الأشهر لإصدار ترخيص اقتصادي" : "Average months to issue an economic license"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-el02-value">{ECONOMIC_SUMMARY.avgTimeToIssueMonths}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "شهر في المتوسط" : "months average"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-el03">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.renewalSuccess")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "نسبة نجاح تجديد التراخيص الاقتصادية" : "Economic license renewal success rate"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-el03-value">{ECONOMIC_SUMMARY.renewalSuccessPct}%</p>
                </div>
              </div>
              <Progress value={ECONOMIC_SUMMARY.renewalSuccessPct} className="h-1.5" dir="ltr" />
            </Card>

            <Card className="p-5" data-testid="card-kpi-el04">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.violations")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي المخالفات المسجلة هذا العام" : "Total violations recorded this year"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-el04-value">{ECONOMIC_SUMMARY.totalViolations}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "هذا العام" : "this year"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-el05">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.revenue")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "إجمالي الإيرادات من رسوم التراخيص الاقتصادية" : "Total revenue from economic licensing fees"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-el05-value">
                    {(ECONOMIC_SUMMARY.totalRevenueSAR / 1_000_000).toFixed(1)}M
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">SAR</p>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2" data-testid="text-section-general-aviation">
            {t("ajwaa.economic.generalAviation")}
            <SectionTooltip tooltip={isAr ? "مؤشرات أداء قطاع الطيران العام" : "General aviation sector performance metrics"} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-ga01">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.gaApprovals")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "عدد الموافقات النشطة للطيران العام" : "Number of active general aviation approvals"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-ga01-value">{GA_SUMMARY.activeApprovals}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "موافقات نشطة" : "active approvals"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ga02">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(45 90% 48% / 0.12)", color: "hsl(45 90% 48%)" }}>
                  <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.newGa")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "موافقات الطيران العام الجديدة هذا العام" : "New general aviation approvals this year"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-ga02-value">{GA_SUMMARY.newApprovalsThisYear}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "موافقات جديدة هذا العام" : "new this year"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ga03">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.gaProcessing")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "متوسط أيام معالجة موافقات الطيران العام" : "Average processing days for GA approvals"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-ga03-value">{GA_SUMMARY.avgProcessingDays}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "يوم في المتوسط" : "days average"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ga04">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t("ajwaa.economic.auditPass")}
                    </p>
                    <SectionTooltip tooltip={isAr ? "نسبة نجاح التدقيق للطيران العام" : "Audit pass rate for general aviation"} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-ga04-value">{GA_SUMMARY.auditPassRatePct}%</p>
                </div>
              </div>
              <Progress value={GA_SUMMARY.auditPassRatePct} className="h-1.5" dir="ltr" />
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" data-testid="text-chart-by-carrier">
              {t("ajwaa.economic.byCarrierType")}
              <SectionTooltip tooltip={isAr ? "التراخيص النشطة والجديدة حسب نوع الناقل" : "Active and new licenses by carrier type"} />
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={licenseBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Bar dataKey="active" name={isAr ? "نشطة" : "Active"} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="newThisYear" name={isAr ? "جديدة" : "New"} fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              {t("ajwaa.economic.renewalSuccess")}
              <SectionTooltip tooltip={isAr ? "نسبة نجاح تجديد التراخيص الاقتصادية بشكل دائري" : "Economic license renewal success rate donut chart"} />
            </h2>
            <div className="h-[220px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={renewalDonutData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                  >
                    <Cell fill={CHART_COLORS[5]} />
                    <Cell fill="hsl(210, 5%, 88%)" />
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value.toFixed(1)}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center -mt-2">
              <p className="text-3xl font-bold">{ECONOMIC_SUMMARY.renewalSuccessPct}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isAr ? "معدل نجاح التجديد" : "Renewal Success Rate"}
              </p>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" data-testid="text-chart-ga-growth">
              {t("ajwaa.economic.gaGrowth")}
              <SectionTooltip tooltip={isAr ? "اتجاه نمو موافقات الطيران العام عبر السنوات" : "General aviation approvals growth trend over years"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={GA_GROWTH_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="approvals"
                    name={isAr ? "الموافقات" : "Approvals"}
                    stroke={CHART_COLORS[3]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              {isAr ? "ملخص تراخيص حسب النوع" : "License Details by Type"}
              <SectionTooltip tooltip={isAr ? "تفاصيل الإيرادات حسب نوع الترخيص" : "Revenue details by license type"} />
            </h2>
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={licenseBarData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}M SAR`, ""]} />
                  <Legend />
                  <Bar dataKey="revenue" name={isAr ? "الإيرادات (م ر.س)" : "Revenue (M SAR)"} radius={[0, 4, 4, 0]}>
                    {licenseBarData.map((_, index) => (
                      <Cell key={`rev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            {t("ajwaa.economic.auditPass")}
            <SectionTooltip tooltip={isAr ? "مقياس نسبة نجاح التدقيق للطيران العام" : "General aviation audit pass rate gauge"} />
          </h2>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="hsl(210, 5%, 88%)"
                  strokeWidth="16"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke={CHART_COLORS[5]}
                  strokeWidth="16"
                  strokeDasharray={`${(GA_SUMMARY.auditPassRatePct / 100) * 2 * Math.PI * 85} ${2 * Math.PI * 85}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" data-testid="text-audit-gauge-value">{GA_SUMMARY.auditPassRatePct}%</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {isAr ? "معدل النجاح" : "Pass Rate"}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
