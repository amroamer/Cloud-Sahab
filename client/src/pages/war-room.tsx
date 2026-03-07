import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SectionTooltip } from "@/components/section-tooltip";
import {
  Target,
  RefreshCw,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Plane,
  Fuel,
  Palmtree,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  generateWarRoomData,
  SCENARIO_SLIDERS,
  calculateScenarioImpact,
  type VisionTarget,
} from "@/lib/war-room-data";

const CHART_COLORS = {
  actual: "hsl(210, 85%, 42%)",
  projected: "hsl(160, 70%, 40%)",
  target: "hsl(0, 0%, 65%)",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string; labelAr: string }> = {
  green: { bg: "bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-400", label: "On Track", labelAr: "على المسار" },
  amber: { bg: "bg-amber-500/15", text: "text-amber-600 dark:text-amber-400", label: "At Risk", labelAr: "في خطر" },
  red: { bg: "bg-red-500/15", text: "text-red-600 dark:text-red-400", label: "Behind", labelAr: "متأخر" },
};

const SLIDER_ICONS: Record<string, typeof Plane> = {
  riyadhAirRoutes: Plane,
  oilPriceChange: Fuel,
  tourismGrowth: Palmtree,
};

export default function WarRoomPage() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const [data, setData] = useState(() => generateWarRoomData());
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    SCENARIO_SLIDERS.forEach((s) => { defaults[s.id] = s.defaultValue; });
    return defaults;
  });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(() => {
    setData(generateWarRoomData());
    const defaults: Record<string, number> = {};
    SCENARIO_SLIDERS.forEach((s) => { defaults[s.id] = s.defaultValue; });
    setSliderValues(defaults);
  }, []);

  const scenario = useMemo(
    () => calculateScenarioImpact(sliderValues, data),
    [sliderValues, data]
  );

  const formatDate = (d: Date) => {
    if (isAr) {
      return d.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
    }
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-war-room-title">
              {isAr ? "غرفة عمليات رؤية 2030" : "Vision 2030 War Room"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr ? "متابعة مباشرة لأهداف الطيران في رؤية 2030" : "Live tracking of Vision 2030 aviation targets"}
            </p>
          </div>
          <Button variant="outline" onClick={handleRefresh} data-testid="button-refresh-data">
            <RefreshCw className="h-4 w-4" />
            {isAr ? "تحديث البيانات" : "Refresh Data"}
          </Button>
        </div>

        <Card className="p-5" data-testid="card-countdown">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                {isAr ? "العد التنازلي نحو 330 مليون مسافر" : "Countdown to 330M Travelers"}
              </span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap justify-center">
              <CountdownUnit value={Math.floor(scenario.adjustedDaysRemaining / 365)} labelEn="Years" labelAr="سنة" />
              <CountdownUnit value={Math.floor((scenario.adjustedDaysRemaining % 365) / 30)} labelEn="Months" labelAr="شهر" />
              <CountdownUnit value={scenario.adjustedDaysRemaining % 30} labelEn="Days" labelAr="يوم" />
            </div>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? `عند معدل النمو الحالي، الموعد المتوقع: ${formatDate(scenario.adjustedDate)}`
                : `At current growth, projected date: ${formatDate(scenario.adjustedDate)}`}
            </p>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-muted-foreground/60 tabular-nums">
                {now.toLocaleTimeString(isAr ? "ar-SA" : "en-US")}
              </span>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {data.targets.map((target) => (
            <TargetCard key={target.id} target={target} isAr={isAr} scenario={scenario} />
          ))}
        </div>

        <Card className="p-5" data-testid="card-scenario-modeling">
          <div className="flex items-center gap-1.5 mb-5">
            <h2 className="text-base font-semibold">
              {isAr ? "نمذجة السيناريوهات" : "Scenario Modeling"}
            </h2>
            <SectionTooltip tooltip={isAr ? "حرّك المؤشرات لرؤية تأثيرها على التوقعات" : "Adjust sliders to see impact on projections"} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {SCENARIO_SLIDERS.map((slider) => {
              const Icon = SLIDER_ICONS[slider.id] || Target;
              return (
                <div key={slider.id} className="space-y-3" data-testid={`slider-${slider.id}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {isAr ? slider.labelAr : slider.labelEn}
                      </span>
                    </div>
                    <Badge variant="secondary" className="no-default-active-elevate tabular-nums">
                      {sliderValues[slider.id]}{isAr ? slider.unitAr : slider.unit}
                    </Badge>
                  </div>
                  <Slider
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={[sliderValues[slider.id]]}
                    onValueChange={([v]) =>
                      setSliderValues((prev) => ({ ...prev, [slider.id]: v }))
                    }
                    data-testid={`input-slider-${slider.id}`}
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/60">
                    <span>{slider.min}{isAr ? slider.unitAr : slider.unit}</span>
                    <span>{slider.max}{isAr ? slider.unitAr : slider.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t">
            <h3 className="text-sm font-semibold mb-3">
              {isAr ? "تأثير السيناريو" : "Scenario Impact"}
            </h3>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              <ImpactCard
                labelEn="Date Shift"
                labelAr="تغيير التاريخ"
                value={`${scenario.totalImpactDays > 0 ? "+" : ""}${scenario.totalImpactDays}`}
                unitEn="days earlier"
                unitAr="يوم مبكراً"
                positive={scenario.totalImpactDays > 0}
              />
              <ImpactCard
                labelEn="Connectivity Boost"
                labelAr="دفعة الاتصال"
                value={`${scenario.connectivityBoost > 0 ? "+" : ""}${scenario.connectivityBoost}`}
                unitEn="points"
                unitAr="نقطة"
                positive={scenario.connectivityBoost > 0}
              />
              <ImpactCard
                labelEn="Travelers Boost"
                labelAr="دفعة المسافرين"
                value={`${scenario.travelersBoost > 0 ? "+" : ""}${scenario.travelersBoost}`}
                unitEn="M pax"
                unitAr="مليون مسافر"
                positive={scenario.travelersBoost > 0}
              />
              <ImpactCard
                labelEn="Cargo Boost"
                labelAr="دفعة الشحن"
                value={`${scenario.cargoBoost > 0 ? "+" : ""}${scenario.cargoBoost}`}
                unitEn="M tonnes"
                unitAr="مليون طن"
                positive={scenario.cargoBoost > 0}
              />
            </div>
          </div>
        </Card>

        <Card className="p-5" data-testid="card-trajectory-chart">
          <div className="flex items-center gap-1.5 mb-4">
            <h2 className="text-base font-semibold">
              {isAr ? "مسار النمو نحو الأهداف" : "Growth Trajectory to Targets"}
            </h2>
            <SectionTooltip tooltip={isAr ? "الأداء التاريخي والمسار المتوقع نحو أهداف 2030" : "Historical performance and projected path toward 2030 targets"} />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {data.targets.map((target) => (
              <div key={target.id} className="space-y-2">
                <p className="text-sm font-medium text-center">
                  {isAr ? target.nameAr : target.nameEn}
                </p>
                <div className="h-[220px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={target.historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                      <YAxis tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(210, 5%, 96%)",
                          border: "1px solid hsl(210, 5%, 88%)",
                          borderRadius: "6px",
                          fontSize: "11px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px" }} />
                      <ReferenceLine y={target.targetValue} stroke="hsl(0, 70%, 55%)" strokeDasharray="3 3" label={{ value: isAr ? "الهدف" : "Target", fontSize: 9, fill: "hsl(0, 70%, 55%)" }} />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        name={isAr ? "الفعلي" : "Actual"}
                        stroke={CHART_COLORS.actual}
                        strokeWidth={2}
                        dot={{ r: 3, fill: CHART_COLORS.actual }}
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="projected"
                        name={isAr ? "المتوقع" : "Projected"}
                        stroke={CHART_COLORS.projected}
                        strokeWidth={2}
                        strokeDasharray="5 3"
                        dot={{ r: 3, fill: CHART_COLORS.projected }}
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name={isAr ? "المستهدف" : "Target Path"}
                        stroke={CHART_COLORS.target}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}

function CountdownUnit({ value, labelEn, labelAr }: { value: number; labelEn: string; labelAr: string }) {
  const { language } = useTranslation();
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold tabular-nums" data-testid={`text-countdown-${labelEn.toLowerCase()}`}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{language === "ar" ? labelAr : labelEn}</span>
    </div>
  );
}

function TargetCard({
  target,
  isAr,
  scenario,
}: {
  target: VisionTarget;
  isAr: boolean;
  scenario: ReturnType<typeof calculateScenarioImpact>;
}) {
  const statusInfo = STATUS_COLORS[target.status];
  const isAhead = target.daysAheadBehind >= 0;

  return (
    <Card className="p-5" data-testid={`card-target-${target.id}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${target.status === "green" ? "bg-emerald-500" : target.status === "amber" ? "bg-amber-500" : "bg-red-500"}`}
            data-testid={`indicator-status-${target.id}`}
          />
          <h3 className="text-sm font-semibold">{isAr ? target.nameAr : target.nameEn}</h3>
        </div>
        <Badge variant="secondary" className={`no-default-active-elevate ${statusInfo.bg} ${statusInfo.text} border-0`}>
          {isAr ? statusInfo.labelAr : statusInfo.label}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums" data-testid={`text-current-${target.id}`}>
            {target.currentValue}
          </span>
          <span className="text-sm text-muted-foreground">
            / {target.targetValue} {isAr ? target.unitAr : target.unit}
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden" dir="ltr">
          <div
            className={`h-full rounded-full transition-all ${target.status === "green" ? "bg-emerald-500" : target.status === "amber" ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${Math.min(target.progressPercent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{target.progressPercent.toFixed(1)}%</span>
          <span>{isAr ? "الهدف 2030" : "Target 2030"}</span>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {isAhead ? (
            <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span className={`text-xs font-semibold ${isAhead ? "text-emerald-500" : "text-red-500"}`}>
            {Math.abs(target.daysAheadBehind)} {isAr ? "يوم" : "days"}{" "}
            {isAhead
              ? (isAr ? "متقدم على الجدول" : "ahead of schedule")
              : (isAr ? "متأخر عن الجدول" : "behind schedule")}
          </span>
        </div>
      </div>
    </Card>
  );
}

function ImpactCard({
  labelEn,
  labelAr,
  value,
  unitEn,
  unitAr,
  positive,
}: {
  labelEn: string;
  labelAr: string;
  value: string;
  unitEn: string;
  unitAr: string;
  positive: boolean;
}) {
  const { language } = useTranslation();
  const isAr = language === "ar";
  const isZero = value === "0" || value === "+0" || value === "+0.0" || value === "+0.00";

  return (
    <Card className="p-3">
      <p className="text-xs text-muted-foreground mb-1">{isAr ? labelAr : labelEn}</p>
      <div className="flex items-center gap-1.5">
        {isZero ? (
          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
        ) : positive ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
        )}
        <span className={`text-lg font-bold tabular-nums ${isZero ? "" : positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
          {value}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{isAr ? unitAr : unitEn}</p>
    </Card>
  );
}
