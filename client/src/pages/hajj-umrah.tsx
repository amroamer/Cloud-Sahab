import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw, Clock, Users, Plane, AlertTriangle } from "lucide-react";
import {
  generateCountryData,
  generateCongestionGrid,
  generateAirlineCapacity,
  generateCongestionAlerts,
  getHajjCountdown,
  CHART_COLORS,
  type CountryPilgrimData,
  type AirportCongestion,
  type AirlineCapacity,
  type CongestionAlert,
} from "@/lib/hajj-umrah-data";

function CongestionColor({ level }: { level: AirportCongestion["level"] }) {
  const colors: Record<string, string> = {
    low: "bg-emerald-500",
    moderate: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  };
  return <div className={`h-3 w-3 rounded-full ${colors[level]}`} />;
}

export default function HajjUmrahPage() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const [countries, setCountries] = useState<CountryPilgrimData[]>([]);
  const [congestionGrid, setCongestionGrid] = useState<AirportCongestion[]>([]);
  const [airlines, setAirlines] = useState<AirlineCapacity[]>([]);
  const [alerts, setAlerts] = useState<CongestionAlert[]>([]);
  const [countdown, setCountdown] = useState(getHajjCountdown());

  const refreshData = useCallback(() => {
    setCountries(generateCountryData());
    setCongestionGrid(generateCongestionGrid());
    setAirlines(generateAirlineCapacity());
    setAlerts(generateCongestionAlerts());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getHajjCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalArrived = countries.reduce((s, c) => s + c.arrived, 0);
  const totalExpected = countries.reduce((s, c) => s + c.expected, 0);
  const overallProgress = totalExpected > 0 ? Math.round((totalArrived / totalExpected) * 100) : 0;

  const levelLabels: Record<string, { en: string; ar: string }> = {
    low: { en: "Low", ar: "منخفض" },
    moderate: { en: "Moderate", ar: "متوسط" },
    high: { en: "High", ar: "مرتفع" },
    critical: { en: "Critical", ar: "حرج" },
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-hajj-title">
              {isAr ? "عمليات الحج والعمرة" : "Hajj & Umrah Live Operations"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr ? "مراقبة مباشرة لعمليات الحج والعمرة" : "Live monitoring of Hajj & Umrah operations"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData} className="gap-2" data-testid="button-refresh-data">
            <RefreshCw className="h-3.5 w-3.5" />
            {isAr ? "تحديث البيانات" : "Refresh Data"}
          </Button>
        </div>

        <Card className="p-5" data-testid="card-countdown">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[0]}20`, color: CHART_COLORS[0] }}>
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isAr ? "العد التنازلي لذروة الحج" : "Countdown to Peak Hajj Day"}
              </p>
              <p className="text-sm text-muted-foreground">{countdown.peakDate}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { value: countdown.days, label: isAr ? "يوم" : "Days" },
              { value: countdown.hours, label: isAr ? "ساعة" : "Hours" },
              { value: countdown.minutes, label: isAr ? "دقيقة" : "Minutes" },
              { value: countdown.seconds, label: isAr ? "ثانية" : "Seconds" },
            ].map((unit) => (
              <div key={unit.label} className="text-center min-w-[70px]">
                <p className="text-3xl font-bold tabular-nums" data-testid={`text-countdown-${unit.label.toLowerCase()}`}>
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{unit.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5" data-testid="card-pilgrim-progress">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[3]}20`, color: CHART_COLORS[3] }}>
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isAr ? "الحجاج: الوصول مقابل المتوقع" : "Pilgrims: Arrived vs. Expected"}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold" data-testid="text-total-arrived">{totalArrived.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/ {totalExpected.toLocaleString()}</span>
                <Badge variant="secondary" className="no-default-active-elevate">{overallProgress}%</Badge>
              </div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2 mb-4" dir="ltr" />

          <div className="space-y-2">
            {countries.map((c, idx) => {
              const pct = c.expected > 0 ? Math.round((c.arrived / c.expected) * 100) : 0;
              return (
                <div key={c.country} className="flex items-center gap-3" data-testid={`row-country-${idx}`}>
                  <span className="text-xs text-muted-foreground w-5 text-end">{idx + 1}</span>
                  <span className="text-sm w-28 truncate">{isAr ? c.countryAr : c.country}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                    />
                  </div>
                  <span className="text-xs font-medium w-20 text-end tabular-nums">
                    {c.arrived.toLocaleString()} / {c.expected.toLocaleString()}
                  </span>
                  <Badge variant="outline" className="no-default-active-elevate min-w-[42px] justify-center">{pct}%</Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <div>
          <h2 className="text-base font-semibold mb-3">
            {isAr ? "خريطة ازدحام المطارات" : "Airport Congestion Heatmap"}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2" data-testid="grid-congestion">
            {congestionGrid.map((ap) => {
              const bgColors: Record<string, string> = {
                low: "bg-emerald-500/10 border-emerald-500/30",
                moderate: "bg-yellow-500/10 border-yellow-500/30",
                high: "bg-orange-500/10 border-orange-500/30",
                critical: "bg-red-500/10 border-red-500/30",
              };
              return (
                <TooltipProvider key={ap.code} delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`rounded-md border p-2 text-center cursor-default ${bgColors[ap.level]}`}
                        data-testid={`cell-airport-${ap.code}`}
                      >
                        <p className="text-xs font-bold">{ap.code}</p>
                        <p className="text-[10px] text-muted-foreground tabular-nums">{ap.utilization}%</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <p className="font-medium">{isAr ? ap.nameAr : ap.name}</p>
                      <p>{isAr ? "الاستخدام" : "Utilization"}: {ap.utilization}%</p>
                      <p>{isAr ? "المستوى" : "Level"}: {isAr ? levelLabels[ap.level].ar : levelLabels[ap.level].en}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {Object.entries(levelLabels).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <CongestionColor level={key as AirportCongestion["level"]} />
                <span className="text-xs text-muted-foreground">{isAr ? val.ar : val.en}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3">
            {isAr ? "سعة شركات الطيران مقابل الطلب" : "Airline Capacity vs. Demand"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {airlines.map((al, idx) => {
              const ratio = al.capacity > 0 ? Math.round((al.demand / al.capacity) * 100) : 0;
              const isOver = ratio > 100;
              return (
                <Card className="p-4" key={al.airline} data-testid={`card-airline-${idx}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[idx % CHART_COLORS.length]}20`, color: CHART_COLORS[idx % CHART_COLORS.length] }}>
                      <Plane className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{isAr ? al.airlineAr : al.airline}</p>
                      <p className="text-xs text-muted-foreground">{al.flights} {isAr ? "رحلة" : "flights"}</p>
                    </div>
                    <Badge
                      variant={isOver ? "destructive" : "secondary"}
                      className="no-default-active-elevate"
                    >
                      {ratio}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{isAr ? "السعة" : "Capacity"}: {al.capacity.toLocaleString()}</span>
                      <span>{isAr ? "الطلب" : "Demand"}: {al.demand.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(ratio, 100)}%`,
                          backgroundColor: isOver ? "#ef4444" : CHART_COLORS[idx % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-5" data-testid="card-alerts-table">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md shrink-0" style={{ backgroundColor: `${CHART_COLORS[4]}20`, color: CHART_COLORS[4] }}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">
                {isAr ? "تنبيهات الازدحام المتوقعة (6 ساعات قادمة)" : "Predictive Congestion Alerts (6-Hour Lookahead)"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isAr ? "تنبؤات محاكاة بناءً على بيانات تاريخية" : "Simulated predictions based on historical data"}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isAr ? "الوقت" : "Time"}</TableHead>
                  <TableHead>{isAr ? "المطار" : "Airport"}</TableHead>
                  <TableHead>{isAr ? "المستوى المتوقع" : "Expected Level"}</TableHead>
                  <TableHead>{isAr ? "السبب" : "Reason"}</TableHead>
                  <TableHead className="text-end">{isAr ? "الثقة" : "Confidence"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, idx) => {
                  const severityVariant: Record<string, "secondary" | "destructive" | "default"> = {
                    moderate: "secondary",
                    high: "default",
                    critical: "destructive",
                  };
                  return (
                    <TableRow key={idx} data-testid={`row-alert-${idx}`}>
                      <TableCell className="font-mono text-sm">{alert.time}</TableCell>
                      <TableCell className="font-medium">{isAr ? alert.airportAr : alert.airport}</TableCell>
                      <TableCell>
                        <Badge variant={severityVariant[alert.expectedLevel]} className="no-default-active-elevate">
                          {isAr ? levelLabels[alert.expectedLevel]?.ar : levelLabels[alert.expectedLevel]?.en}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{isAr ? alert.reasonAr : alert.reason}</TableCell>
                      <TableCell className="text-end tabular-nums">{alert.confidence}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
