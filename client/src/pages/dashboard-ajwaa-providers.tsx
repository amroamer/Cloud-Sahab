import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Building2,
  ShieldCheck,
  FileCheck,
  Clock,
  Monitor,
  Award,
  CheckCircle,
  ClipboardList,
  DollarSign,
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
  Cell,
} from "recharts";
import {
  CHART_COLORS,
  AIRPORT_OPERATORS_SUMMARY,
  SERVICE_PROVIDERS_BY_CATEGORY,
  PROVIDER_COMPLIANCE_TREND,
} from "@/lib/ajwaa-mock-data";

const totalCertified = SERVICE_PROVIDERS_BY_CATEGORY.reduce((s, p) => s + p.certified, 0);
const avgOnTimePct = SERVICE_PROVIDERS_BY_CATEGORY.reduce((s, p) => s + p.onTimePct, 0) / SERVICE_PROVIDERS_BY_CATEGORY.length;
const avgProcessingDays = SERVICE_PROVIDERS_BY_CATEGORY.reduce((s, p) => s + p.avgDays, 0) / SERVICE_PROVIDERS_BY_CATEGORY.length;
const avgFindings = SERVICE_PROVIDERS_BY_CATEGORY.reduce((s, p) => s + p.findingsPerAudit, 0) / SERVICE_PROVIDERS_BY_CATEGORY.length;
const totalRevenue = SERVICE_PROVIDERS_BY_CATEGORY.reduce((s, p) => s + p.revenueSAR, 0);

export default function DashboardAjwaaProviders() {
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
      key: "providerCategory",
      label: t("ajwaa.filter.providerCategory"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "groundHandling", label: t("ajwaa.filter.groundHandling") },
        { value: "mro", label: t("ajwaa.filter.mro") },
        { value: "catering", label: t("ajwaa.filter.catering") },
        { value: "fuel", label: t("ajwaa.filter.fuel") },
        { value: "security", label: t("ajwaa.filter.security") },
      ],
      defaultValue: "all",
    },
    {
      key: "serviceType",
      label: t("ajwaa.filter.serviceType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "airportOps", label: t("ajwaa.filter.airportOps") },
        { value: "serviceProviders", label: t("ajwaa.filter.serviceProviders") },
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
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-providers-title">
            {t("ajwaa.providers.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5" data-testid="text-providers-subtitle">
            {t("ajwaa.providers.subtitle")}
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
          <h2 className="text-base font-semibold mb-3" data-testid="text-section-airport-ops">
            {t("ajwaa.providers.airportOps")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5" data-testid="card-kpi-ao-01">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.approvedOperators")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-approved-operators">
                    {AIRPORT_OPERATORS_SUMMARY.approvedOperators}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? `${AIRPORT_OPERATORS_SUMMARY.majorConcessions} امتيازات رئيسية` : `${AIRPORT_OPERATORS_SUMMARY.majorConcessions} major concessions`}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ao-02">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.filingCompliance")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-filing-compliance">
                    {AIRPORT_OPERATORS_SUMMARY.filingCompliancePct}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+1.8%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ao-03">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(28 85% 48% / 0.12)", color: "hsl(28 85% 48%)" }}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.processingMonths")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-processing-months">
                    {AIRPORT_OPERATORS_SUMMARY.avgProcessingMonths}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "أشهر في المتوسط" : "months average"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-ao-04">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(280 70% 42% / 0.12)", color: "hsl(280 70% 42%)" }}>
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.digitalShare")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-digital-share">
                    {AIRPORT_OPERATORS_SUMMARY.digitalSharePct}%
                  </p>
                </div>
              </div>
              <Progress value={AIRPORT_OPERATORS_SUMMARY.digitalSharePct} className="h-1.5" dir="ltr" />
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" data-testid="text-section-service-providers">
            {t("ajwaa.providers.serviceProviders")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="p-5" data-testid="card-kpi-sp-01">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(160 70% 38% / 0.12)", color: "hsl(160 70% 38%)" }}>
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.certifiedProviders")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-certified-providers">
                    {totalCertified}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? `${SERVICE_PROVIDERS_BY_CATEGORY.length} فئات` : `${SERVICE_PROVIDERS_BY_CATEGORY.length} categories`}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-sp-02">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(340 75% 45% / 0.12)", color: "hsl(340 75% 45%)" }}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.certOnTime")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-cert-ontime">
                    {avgOnTimePct.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+2.1%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-kpi-sp-03">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(45 90% 48% / 0.12)", color: "hsl(45 90% 48%)" }}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.avgDays")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-avg-processing-days">
                    {avgProcessingDays.toFixed(0)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "يوم في المتوسط" : "days average"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-sp-04">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(210 85% 42% / 0.12)", color: "hsl(210 85% 42%)" }}>
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.findingsPerAudit")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-findings-per-audit">
                    {avgFindings.toFixed(1)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "متوسط لكل تدقيق" : "avg per audit"}
              </p>
            </Card>

            <Card className="p-5" data-testid="card-kpi-sp-05">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: "hsl(185 75% 38% / 0.12)", color: "hsl(185 75% 38%)" }}>
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t("ajwaa.providers.revenue")}
                  </p>
                  <p className="text-2xl font-bold tracking-tight" data-testid="text-provider-revenue">
                    {isAr ? `${(totalRevenue / 1_000_000).toFixed(1)} م ر.س` : `${(totalRevenue / 1_000_000).toFixed(1)}M SAR`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">+8.5%</span>
                <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-by-category">
              {t("ajwaa.providers.byCategory")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SERVICE_PROVIDERS_BY_CATEGORY} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis
                    dataKey={isAr ? "categoryAr" : "category"}
                    type="category"
                    width={100}
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="certified" name={isAr ? "مقدمين معتمدين" : "Certified"} radius={[0, 4, 4, 0]}>
                    {SERVICE_PROVIDERS_BY_CATEGORY.map((_, index) => (
                      <Cell key={`cat-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-compliance-trend">
              {t("ajwaa.providers.complianceTrend")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PROVIDER_COMPLIANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" domain={[85, 100]} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}%`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="compliancePct" name={isAr ? "الامتثال %" : "Compliance %"} stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="digitalPct" name={isAr ? "رقمي %" : "Digital %"} stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4" data-testid="text-chart-audit-findings">
              {t("ajwaa.providers.auditFindings")}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PROVIDER_COMPLIANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "monthAr" : "month"} tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" domain={[0, 4]} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(1), ""]} />
                  <Bar dataKey="findings" name={isAr ? "نتائج لكل تدقيق" : "Findings per Audit"} fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">
              {isAr ? "الإيرادات حسب الفئة" : "Revenue by Category"}
            </h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SERVICE_PROVIDERS_BY_CATEGORY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey={isAr ? "categoryAr" : "category"} tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`SAR ${(value / 1_000_000).toFixed(1)}M`, ""]} />
                  <Bar dataKey="revenueSAR" name={isAr ? "الإيرادات (ر.س)" : "Revenue (SAR)"} radius={[3, 3, 0, 0]}>
                    {SERVICE_PROVIDERS_BY_CATEGORY.map((_, index) => (
                      <Cell key={`rev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "حصة الرقمنة — التقدم" : "Digital Share — Progress"}
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{t("ajwaa.providers.airportOps")}</span>
                <span className="text-sm font-semibold">{AIRPORT_OPERATORS_SUMMARY.digitalSharePct}%</span>
              </div>
              <Progress value={AIRPORT_OPERATORS_SUMMARY.digitalSharePct} className="h-2" dir="ltr" />
            </div>
            {SERVICE_PROVIDERS_BY_CATEGORY.map((p, i) => (
              <div key={p.category} className="space-y-2" data-testid={`progress-digital-${p.category.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{isAr ? p.categoryAr : p.category}</span>
                  <span className="text-sm font-semibold">{p.onTimePct}%</span>
                </div>
                <Progress value={p.onTimePct} className="h-2" dir="ltr" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
