import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Building2,
  Plane,
  Search,
  ShieldAlert,
  Info,
  Clock,
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
} from "recharts";
import {
  generateAnomalies,
  generateTimelineData,
  ACTION_LABELS,
  SEVERITY_LABELS,
  type Anomaly,
  type AnomalySeverity,
  type EntityType,
  type RecommendedAction,
} from "@/lib/anomaly-data";

const SEVERITY_STYLES: Record<AnomalySeverity, string> = {
  critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

const ACTION_STYLES: Record<RecommendedAction, string> = {
  investigate: "bg-red-500/10 text-red-600 dark:text-red-400",
  monitor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "no-action": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const CHART_COLORS = {
  critical: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};

export default function AnomaliesPage() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const [anomalies, setAnomalies] = useState<Anomaly[]>(() => generateAnomalies(10));
  const [timelineData, setTimelineData] = useState(() => generateTimelineData());
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");

  const handleRefresh = useCallback(() => {
    setAnomalies(generateAnomalies(randomInt(8, 12)));
    setTimelineData(generateTimelineData());
  }, []);

  const filteredAnomalies = useMemo(() => {
    return anomalies.filter((a) => {
      if (severityFilter !== "all" && a.severity !== severityFilter) return false;
      if (entityFilter !== "all" && a.entityType !== entityFilter) return false;
      return true;
    });
  }, [anomalies, severityFilter, entityFilter]);

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, info: 0 };
    anomalies.forEach((a) => counts[a.severity]++);
    return counts;
  }, [anomalies]);

  function formatTimeAgo(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return isAr ? "منذ أقل من ساعة" : "Less than 1 hour ago";
    if (hours === 1) return isAr ? "منذ ساعة واحدة" : "1 hour ago";
    if (hours < 24) return isAr ? `منذ ${hours} ساعات` : `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return isAr ? "منذ يوم واحد" : "1 day ago";
    return isAr ? `منذ ${days} أيام` : `${days} days ago`;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-anomalies-title">
              {isAr ? "كشف الشذوذ" : "Anomaly Detection"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr
                ? "تحليل الشذوذ مع سرد الأسباب الجذرية المدعوم بالذكاء الاصطناعي"
                : "AI-powered anomaly analysis with root-cause narratives"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            data-testid="button-refresh-anomalies"
            className="gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isAr ? "تحديث البيانات" : "Refresh Data"}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5" data-testid="card-critical-count">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0 bg-red-500/10">
                <ShieldAlert className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "حرج" : "Critical"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-critical-count">
                  {severityCounts.critical}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5" data-testid="card-warning-count">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0 bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "تحذير" : "Warning"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-warning-count">
                  {severityCounts.warning}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5" data-testid="card-info-count">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0 bg-blue-500/10">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {isAr ? "معلومات" : "Info"}
                </p>
                <p className="text-2xl font-bold tracking-tight" data-testid="text-info-count">
                  {severityCounts.info}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground">
              {isAr ? "الشدة" : "Severity"}
            </label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px] h-8 text-xs" data-testid="filter-severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isAr ? "الكل" : "All"}</SelectItem>
                <SelectItem value="critical">{isAr ? "حرج" : "Critical"}</SelectItem>
                <SelectItem value="warning">{isAr ? "تحذير" : "Warning"}</SelectItem>
                <SelectItem value="info">{isAr ? "معلومات" : "Info"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground">
              {isAr ? "نوع الكيان" : "Entity Type"}
            </label>
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[160px] h-8 text-xs" data-testid="filter-entity-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isAr ? "الكل" : "All"}</SelectItem>
                <SelectItem value="airport">{isAr ? "مطار" : "Airport"}</SelectItem>
                <SelectItem value="airline">{isAr ? "شركة طيران" : "Airline"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAnomalies.map((anomaly) => (
            <Card key={anomaly.id} className="p-5" data-testid={`card-anomaly-${anomaly.id}`}>
              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`no-default-active-elevate ${SEVERITY_STYLES[anomaly.severity]}`}
                      data-testid={`badge-severity-${anomaly.id}`}
                    >
                      {isAr
                        ? SEVERITY_LABELS[anomaly.severity].ar
                        : SEVERITY_LABELS[anomaly.severity].en}
                    </Badge>
                    <span className="text-sm font-semibold" data-testid={`text-metric-${anomaly.id}`}>
                      {isAr ? anomaly.metricAr : anomaly.metric}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span data-testid={`text-time-${anomaly.id}`}>
                      {formatTimeAgo(anomaly.detectedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {anomaly.entityType === "airport" ? (
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-sm" data-testid={`text-entity-${anomaly.id}`}>
                      {isAr ? anomaly.entityAr : anomaly.entity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {anomaly.percentageChange >= 0 ? (
                      <ArrowUp className="h-3.5 w-3.5 text-red-500" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className="text-sm font-semibold text-red-500" data-testid={`text-change-${anomaly.id}`}>
                      {anomaly.percentageChange >= 0 ? "+" : ""}
                      {anomaly.percentageChange}%
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-narrative-${anomaly.id}`}>
                  {isAr ? anomaly.narrativeAr : anomaly.narrative}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Search className="h-3 w-3" />
                    <span data-testid={`text-historical-${anomaly.id}`}>
                      {isAr ? anomaly.historicalRefAr : anomaly.historicalRef}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`no-default-active-elevate ${ACTION_STYLES[anomaly.recommendedAction]}`}
                    data-testid={`badge-action-${anomaly.id}`}
                  >
                    {isAr
                      ? ACTION_LABELS[anomaly.recommendedAction].ar
                      : ACTION_LABELS[anomaly.recommendedAction].en}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}

          {filteredAnomalies.length === 0 && (
            <Card className="p-8">
              <p className="text-center text-muted-foreground" data-testid="text-no-anomalies">
                {isAr
                  ? "لا توجد شذوذات مطابقة للفلاتر المحددة"
                  : "No anomalies match the selected filters"}
              </p>
            </Card>
          )}
        </div>

        <Card className="p-5" data-testid="card-anomaly-timeline">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "الجدول الزمني للشذوذ (آخر 30 يومًا)" : "Anomaly Timeline (Last 30 Days)"}
          </h2>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(210, 6%, 50%)"
                  interval={4}
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
                <Bar
                  dataKey="critical"
                  name={isAr ? "حرج" : "Critical"}
                  stackId="anomalies"
                  fill={CHART_COLORS.critical}
                />
                <Bar
                  dataKey="warning"
                  name={isAr ? "تحذير" : "Warning"}
                  stackId="anomalies"
                  fill={CHART_COLORS.warning}
                />
                <Bar
                  dataKey="info"
                  name={isAr ? "معلومات" : "Info"}
                  stackId="anomalies"
                  fill={CHART_COLORS.info}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
