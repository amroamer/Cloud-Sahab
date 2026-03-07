import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import {
  generateCalendarData,
  getFirstDayOfMonth,
  getDaysInMonth,
  SEASON_COLORS,
  SEASON_LABELS,
  CALENDAR_EVENTS,
  MONTH_NAMES,
  type SeasonType,
  type DayData,
  type MonthSummary,
} from "@/lib/seasonal-data";

const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_AR = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

export default function SeasonalCalendarPage() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const [data, setData] = useState(() => generateCalendarData());

  const handleRefresh = useCallback(() => {
    setData(generateCalendarData());
  }, []);

  const weekdays = isAr ? WEEKDAYS_AR : WEEKDAYS_EN;

  const eventsByMonth = useMemo(() => {
    const map: Record<number, typeof CALENDAR_EVENTS> = {};
    for (const evt of CALENDAR_EVENTS) {
      if (!map[evt.month]) map[evt.month] = [];
      const exists = map[evt.month].find(e => e.name === evt.name && e.startDay === evt.startDay);
      if (!exists) map[evt.month].push(evt);
    }
    return map;
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-seasonal-title">
              {isAr ? "التقويم الموسمي" : "Seasonal Pattern Calendar"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr
                ? "تصور حركة الطيران الموسمية والأحداث على مدار العام"
                : "Visualize seasonal aviation traffic patterns and events throughout the year"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            data-testid="button-refresh-seasonal"
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isAr ? "تحديث البيانات" : "Refresh Data"}
          </Button>
        </div>

        <Card className="p-4" data-testid="card-season-legend">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">
              {isAr ? "دليل الألوان" : "Color Legend"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(SEASON_COLORS) as SeasonType[]).map((key) => (
              <div key={key} className="flex items-center gap-1.5" data-testid={`legend-${key}`}>
                <div
                  className="h-3 w-3 rounded-sm shrink-0"
                  style={{ backgroundColor: SEASON_COLORS[key] }}
                />
                <span className="text-xs text-muted-foreground">
                  {isAr ? SEASON_LABELS[key].ar : SEASON_LABELS[key].en}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t">
            {[
              { color: "#f59e0b", en: "Riyadh/Jeddah Season", ar: "موسم الرياض/جدة" },
              { color: "#ec4899", en: "FIFA Matches", ar: "مباريات فيفا" },
              { color: "#14b8a6", en: "NEOM Events", ar: "فعاليات نيوم" },
            ].map((item) => (
              <div key={item.en} className="flex items-center gap-1.5">
                <div
                  className="h-2 w-5 rounded-sm shrink-0 border"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}30` }}
                />
                <span className="text-xs text-muted-foreground">
                  {isAr ? item.ar : item.en}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.months.map((monthDays, monthIndex) => (
            <MonthCalendar
              key={monthIndex}
              monthIndex={monthIndex}
              days={monthDays}
              weekdays={weekdays}
              isAr={isAr}
              events={eventsByMonth[monthIndex] || []}
            />
          ))}
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3" data-testid="text-monthly-summary-title">
            {isAr ? "ملخص حركة المرور الشهرية" : "Monthly Traffic Summary"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.summaries.map((summary) => (
              <MonthlySummaryCard key={summary.month} summary={summary} isAr={isAr} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function MonthCalendar({
  monthIndex,
  days,
  weekdays,
  isAr,
  events,
}: {
  monthIndex: number;
  days: DayData[];
  weekdays: string[];
  isAr: boolean;
  events: typeof CALENDAR_EVENTS;
}) {
  const firstDay = getFirstDayOfMonth(monthIndex);
  const daysInMonth = getDaysInMonth(monthIndex);
  const monthName = isAr ? MONTH_NAMES.ar[monthIndex] : MONTH_NAMES.en[monthIndex];

  const cells: (DayData | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 0; d < daysInMonth; d++) cells.push(days[d]);

  return (
    <Card className="p-3" data-testid={`card-month-${monthIndex}`}>
      <h3 className="text-sm font-semibold mb-2 text-center">{monthName}</h3>
      <div className="grid grid-cols-7 gap-px mb-1">
        {weekdays.map((wd) => (
          <div key={wd} className="text-[10px] text-muted-foreground text-center font-medium py-0.5">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {cells.map((cell, idx) =>
          cell ? (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <div
                  className="relative aspect-square flex items-center justify-center rounded-sm text-[10px] font-medium cursor-default transition-opacity"
                  style={{
                    backgroundColor: `${SEASON_COLORS[cell.season]}${Math.round((cell.trafficLevel / 100) * 200 + 55).toString(16).padStart(2, "0")}`,
                    color: cell.trafficLevel > 60 ? "white" : undefined,
                  }}
                  data-testid={`day-${monthIndex}-${cell.day}`}
                >
                  {cell.day}
                  {cell.events.length > 0 && (
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-px">
                      {cell.events.slice(0, 2).map((_, i) => (
                        <div key={i} className="h-1 w-1 rounded-full bg-white/80" />
                      ))}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px] text-xs">
                <p className="font-semibold">
                  {monthName} {cell.day}
                </p>
                <p>
                  {isAr ? "مستوى الحركة" : "Traffic Level"}: {cell.trafficLevel}%
                </p>
                <p>
                  {isAr ? SEASON_LABELS[cell.season].ar : SEASON_LABELS[cell.season].en}
                </p>
                {cell.events.length > 0 && (
                  <p className="mt-1 text-muted-foreground">
                    {cell.events.join(", ")}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
      {events.length > 0 && (
        <div className="mt-2 pt-2 border-t flex flex-wrap gap-1">
          {events.slice(0, 3).map((evt, i) => (
            <Badge key={i} variant="secondary" className="text-[9px] no-default-active-elevate">
              <div className="h-1.5 w-1.5 rounded-full shrink-0 me-1" style={{ backgroundColor: evt.color }} />
              {isAr ? evt.nameAr : evt.name}
            </Badge>
          ))}
          {events.length > 3 && (
            <Badge variant="secondary" className="text-[9px] no-default-active-elevate">
              +{events.length - 3}
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}

function MonthlySummaryCard({ summary, isAr }: { summary: MonthSummary; isAr: boolean }) {
  const diff = summary.actualTraffic - summary.expectedTraffic;
  const diffPercent = summary.expectedTraffic > 0 ? ((diff / summary.expectedTraffic) * 100).toFixed(1) : "0";
  const isPositive = diff >= 0;

  return (
    <Card className="p-3" data-testid={`card-summary-${summary.month}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-semibold">{isAr ? summary.nameAr : summary.name}</span>
        <div
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: SEASON_COLORS[summary.season] }}
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            {isAr ? "المتوقع" : "Expected"}
          </span>
          <span className="text-xs font-medium">{formatNumber(summary.expectedTraffic)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            {isAr ? "الفعلي" : "Actual"}
          </span>
          <span className="text-xs font-medium">{formatNumber(summary.actualTraffic)}</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1 border-t">
          <span className="text-[11px] text-muted-foreground">
            {isAr ? "الفرق" : "Variance"}
          </span>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs font-semibold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{diffPercent}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
