import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { SectionTooltip } from "@/components/section-tooltip";
import {
  Trophy,
  RefreshCw,
  Building2,
  Plane,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
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
} from "recharts";
import { generateFifa2034Data, type Fifa2034Data, type HostCity, type MatchDay } from "@/lib/fifa-2034-data";

const INTENSITY_COLORS: Record<string, string> = {
  peak: "hsl(0, 72%, 51%)",
  high: "hsl(25, 95%, 53%)",
  medium: "hsl(45, 93%, 47%)",
  low: "hsl(142, 71%, 45%)",
};

const STATUS_CONFIG = {
  planned: { color: "text-muted-foreground", bg: "bg-muted", icon: Clock },
  "in-progress": { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30", icon: AlertTriangle },
  complete: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30", icon: CheckCircle2 },
};

const TRAFFIC_LIGHT: Record<string, { color: string; label: string; labelAr: string }> = {
  green: { color: "bg-emerald-500", label: "On Track", labelAr: "على المسار" },
  amber: { color: "bg-amber-500", label: "At Risk", labelAr: "في خطر" },
  red: { color: "bg-red-500", label: "Behind Schedule", labelAr: "متأخر" },
};

export default function Fifa2034Page() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const [data, setData] = useState<Fifa2034Data>(() => generateFifa2034Data());

  const handleRefresh = useCallback(() => {
    setData(generateFifa2034Data());
  }, []);

  const capacityChartData = useMemo(() =>
    data.hostCities.map((c) => ({
      name: isAr ? c.nameAr : c.name,
      current: c.currentCapacity,
      required: c.requiredCapacity,
    })),
    [data, isAr]
  );

  const tl = TRAFFIC_LIGHT[data.trafficLight];

  const monthNames = isAr
    ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const timelineMonths = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-fifa2034-title">
              {isAr ? "متتبع جاهزية فيفا 2034" : "FIFA 2034 Readiness Tracker"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr
                ? "تتبع جاهزية البنية التحتية للمطارات لاستضافة كأس العالم 2034"
                : "Track airport infrastructure readiness for hosting FIFA World Cup 2034"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            data-testid="button-refresh-fifa2034"
            className="gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isAr ? "تحديث البيانات" : "Refresh Data"}
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="p-5" data-testid="card-overall-readiness">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isAr ? "الجاهزية العامة" : "Overall Readiness"}
              </span>
              <SectionTooltip tooltip={isAr ? "النسبة المئوية الإجمالية لجاهزية جميع المدن المستضيفة" : "Overall readiness percentage across all host cities"} />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-4xl font-bold" data-testid="text-overall-readiness">{data.overallReadiness}%</p>
              <div className={`h-5 w-5 rounded-full ${tl.color} shrink-0`} data-testid="indicator-traffic-light" />
              <Badge variant="secondary" className="no-default-active-elevate">
                {isAr ? tl.labelAr : tl.label}
              </Badge>
            </div>
            <Progress value={data.overallReadiness} className="h-2 mt-3" dir="ltr" />
          </Card>

          <Card className="p-5" data-testid="card-cities-count">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isAr ? "المدن المستضيفة" : "Host Cities"}
              </span>
            </div>
            <p className="text-4xl font-bold">{data.hostCities.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? "مدن مع مطارات مخصصة" : "cities with designated airports"}
            </p>
          </Card>

          <Card className="p-5" data-testid="card-matches-count">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isAr ? "إجمالي المباريات" : "Total Matches"}
              </span>
            </div>
            <p className="text-4xl font-bold">{data.matchDays.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? "مباراة مجدولة عبر جميع المدن" : "matches scheduled across all cities"}
            </p>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          {data.hostCities.map((city) => (
            <CityReadinessCard key={city.id} city={city} isAr={isAr} />
          ))}
        </div>

        <Card className="p-5" data-testid="card-capacity-chart">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">
              {isAr ? "السعة الحالية مقابل المطلوبة" : "Current vs Required Capacity"}
            </h2>
            <SectionTooltip tooltip={isAr ? "مقارنة الطاقة الاستيعابية الحالية مع المطلوبة لكل مدينة مستضيفة" : "Comparison of current airport capacity vs required for each host city"} />
          </div>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityChartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  label={{
                    value: isAr ? "مليون مسافر" : "Capacity (M pax)",
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
                />
                <Legend />
                <Bar
                  dataKey="current"
                  name={isAr ? "السعة الحالية (م)" : "Current (M)"}
                  fill="hsl(210, 70%, 55%)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="required"
                  name={isAr ? "السعة المطلوبة (م)" : "Required (M)"}
                  fill="hsl(210, 70%, 55%)"
                  opacity={0.3}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5" data-testid="card-timeline">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">
              {isAr ? "الجدول الزمني لمشاريع الترقية" : "Upgrade Project Timeline"}
            </h2>
            <SectionTooltip tooltip={isAr ? "الجدول الزمني لجميع مشاريع البنية التحتية عبر جميع المدن المستضيفة" : "Timeline of all infrastructure projects across host cities"} />
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="flex items-center border-b pb-2 mb-3 gap-2">
                <div className="w-48 shrink-0 text-xs font-medium text-muted-foreground">
                  {isAr ? "المشروع" : "Project"}
                </div>
                <div className="flex-1 flex">
                  {timelineMonths.map((m) => (
                    <div key={m} className="flex-1 text-center text-[10px] text-muted-foreground">
                      {m % 3 === 0 ? `M${m}` : ""}
                    </div>
                  ))}
                </div>
                <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground text-end">
                  {isAr ? "التقدم" : "Progress"}
                </div>
              </div>
              {data.hostCities.map((city) => (
                <div key={city.id} className="mb-3">
                  <p className="text-xs font-semibold mb-1.5 text-muted-foreground">
                    {isAr ? city.nameAr : city.name} ({city.airportCode})
                  </p>
                  {city.projects.map((proj) => {
                    const cfg = STATUS_CONFIG[proj.status];
                    return (
                      <div key={proj.id} className="flex items-center gap-2 mb-1.5" data-testid={`row-project-${proj.id}`}>
                        <div className="w-48 shrink-0 text-xs truncate" title={isAr ? proj.nameAr : proj.name}>
                          {isAr ? proj.nameAr : proj.name}
                        </div>
                        <div className="flex-1 flex relative h-5">
                          {timelineMonths.map((m) => (
                            <div key={m} className="flex-1 border-r border-muted/30" />
                          ))}
                          <div
                            className={`absolute top-0.5 h-4 rounded-sm ${cfg.bg} border`}
                            style={{
                              left: `${((proj.startMonth - 1) / 24) * 100}%`,
                              width: `${((proj.endMonth - proj.startMonth + 1) / 24) * 100}%`,
                            }}
                          >
                            <div
                              className={`h-full rounded-sm ${proj.status === "complete" ? "bg-emerald-500/40" : proj.status === "in-progress" ? "bg-amber-500/40" : "bg-muted-foreground/20"}`}
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-16 shrink-0 text-xs font-medium text-end">
                          {proj.progress}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t flex-wrap">
                {(["planned", "in-progress", "complete"] as const).map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  const Icon = cfg.icon;
                  return (
                    <div key={s} className="flex items-center gap-1.5">
                      <Icon className={`h-3 w-3 ${cfg.color}`} />
                      <span className="text-[11px] text-muted-foreground capitalize">{s === "in-progress" ? (isAr ? "قيد التنفيذ" : "In Progress") : s === "complete" ? (isAr ? "مكتمل" : "Complete") : (isAr ? "مخطط" : "Planned")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5" data-testid="card-match-calendar">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">
              {isAr ? "تقويم المباريات - ضغط المطارات" : "Match Calendar - Airport Pressure"}
            </h2>
            <SectionTooltip tooltip={isAr ? "تقويم يوضح أيام المباريات وشدة الضغط على كل مطار" : "Calendar showing match days and the intensity of pressure on each airport"} />
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 mb-4">
            {data.hostCities.map((city) => {
              const cityMatches = data.matchDays.filter((m) => m.cityId === city.id);
              const peakCount = cityMatches.filter((m) => m.intensity === "peak" || m.intensity === "high").length;
              return (
                <Card key={city.id} className="p-3" data-testid={`card-city-calendar-${city.id}`}>
                  <p className="text-xs font-semibold">{isAr ? city.nameAr : city.name}</p>
                  <p className="text-lg font-bold mt-1">{cityMatches.length}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {isAr ? "مباريات" : "matches"} ({peakCount} {isAr ? "ذروة/عالي" : "peak/high"})
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid gap-1" style={{ gridTemplateColumns: "80px repeat(31, 1fr)" }}>
                <div className="text-xs font-medium text-muted-foreground">{isAr ? "الشهر" : "Month"}</div>
                {Array.from({ length: 31 }, (_, i) => (
                  <div key={i} className="text-center text-[10px] text-muted-foreground">{i + 1}</div>
                ))}

                {[11, 12].map((month) => {
                  const monthLabel = monthNames[month - 1];
                  const daysInMonth = month === 11 ? 30 : 31;
                  return (
                    <div key={month} className="contents" data-testid={`row-month-${month}`}>
                      <div className="text-xs font-medium flex items-center">{monthLabel}</div>
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        if (day > daysInMonth) {
                          return <div key={i} />;
                        }
                        const match = data.matchDays.find((m) => m.month === month && m.day === day);
                        return (
                          <div
                            key={i}
                            className="aspect-square rounded-sm flex items-center justify-center text-[9px] font-medium"
                            style={{
                              backgroundColor: match ? INTENSITY_COLORS[match.intensity] : undefined,
                              color: match ? "#fff" : undefined,
                            }}
                            title={match ? `${isAr ? match.matchLabelAr : match.matchLabel} - ${isAr ? data.hostCities.find((c) => c.id === match.cityId)?.nameAr : data.hostCities.find((c) => c.id === match.cityId)?.name}` : ""}
                            data-testid={match ? `cell-match-${month}-${day}` : undefined}
                          >
                            {match ? (isAr ? data.hostCities.find((c) => c.id === match.cityId)?.nameAr?.charAt(0) : data.hostCities.find((c) => c.id === match.cityId)?.name?.substring(0, 3)) : ""}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t flex-wrap">
            {(["low", "medium", "high", "peak"] as const).map((level) => (
              <div key={level} className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: INTENSITY_COLORS[level] }} />
                <span className="text-[11px] text-muted-foreground capitalize">
                  {level === "peak" ? (isAr ? "ذروة" : "Peak") : level === "high" ? (isAr ? "عالي" : "High") : level === "medium" ? (isAr ? "متوسط" : "Medium") : (isAr ? "منخفض" : "Low")}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          {data.hostCities.map((city) => (
            <GapAnalysisCard key={city.id} city={city} isAr={isAr} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function CityReadinessCard({ city, isAr }: { city: HostCity; isAr: boolean }) {
  const readinessColor = city.readiness >= 70 ? "text-emerald-600 dark:text-emerald-400" : city.readiness >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";
  const statusCounts = {
    planned: city.projects.filter((p) => p.status === "planned").length,
    inProgress: city.projects.filter((p) => p.status === "in-progress").length,
    complete: city.projects.filter((p) => p.status === "complete").length,
  };

  return (
    <Card className="p-5" data-testid={`card-city-readiness-${city.id}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-semibold">{isAr ? city.nameAr : city.name}</h3>
          <p className="text-xs text-muted-foreground">{isAr ? city.airportNameAr : city.airportName} ({city.airportCode})</p>
        </div>
        <div className="text-end">
          <p className={`text-2xl font-bold ${readinessColor}`} data-testid={`text-readiness-${city.id}`}>{city.readiness}%</p>
          <p className="text-[10px] text-muted-foreground">{isAr ? "جاهزية" : "readiness"}</p>
        </div>
      </div>
      <Progress value={city.readiness} className="h-1.5 mb-3" dir="ltr" />
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-[10px] text-muted-foreground">{isAr ? "السعة الحالية" : "Current Cap."}</p>
          <p className="text-sm font-bold">{city.currentCapacity}M</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">{isAr ? "السعة المطلوبة" : "Required Cap."}</p>
          <p className="text-sm font-bold">{city.requiredCapacity}M</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">{isAr ? "الزيادة المتوقعة" : "Est. Surge"}</p>
          <p className="text-sm font-bold">{(city.estimatedSurge / 1000).toFixed(0)}K</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {statusCounts.complete > 0 && (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            <span className="text-[11px] text-muted-foreground">{statusCounts.complete} {isAr ? "مكتمل" : "complete"}</span>
          </div>
        )}
        {statusCounts.inProgress > 0 && (
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            <span className="text-[11px] text-muted-foreground">{statusCounts.inProgress} {isAr ? "قيد التنفيذ" : "in progress"}</span>
          </div>
        )}
        {statusCounts.planned > 0 && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">{statusCounts.planned} {isAr ? "مخطط" : "planned"}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

function GapAnalysisCard({ city, isAr }: { city: HostCity; isAr: boolean }) {
  const gaps = [
    { label: isAr ? "فجوة الصالات" : "Terminal Gap", value: city.gapAnalysis.terminalGap, unit: isAr ? "صالات" : "terminals" },
    { label: isAr ? "فجوة المدارج" : "Runway Gap", value: city.gapAnalysis.runwayGap, unit: isAr ? "مدارج" : "runways" },
    { label: isAr ? "فجوة المواقف" : "Parking Gap", value: city.gapAnalysis.parkingGap.toLocaleString(), unit: isAr ? "موقف" : "spots" },
    { label: isAr ? "فجوة الصالات VIP" : "Lounge Gap", value: city.gapAnalysis.loungeGap, unit: isAr ? "صالات" : "lounges" },
  ];

  return (
    <Card className="p-5" data-testid={`card-gap-analysis-${city.id}`}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <h3 className="text-sm font-semibold">
          {isAr ? `تحليل الفجوة - ${city.nameAr}` : `Gap Analysis - ${city.name}`}
        </h3>
        <SectionTooltip tooltip={isAr ? "تحليل الفجوة بين البنية التحتية الحالية والمطلوبة" : "Gap between current and required infrastructure"} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {gaps.map((g) => (
          <div key={g.label} className="rounded-md border p-3">
            <p className="text-[10px] text-muted-foreground mb-1">{g.label}</p>
            <p className="text-lg font-bold">{g.value}</p>
            <p className="text-[10px] text-muted-foreground">{isAr ? "مطلوب إضافة" : "needed"} ({g.unit})</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
