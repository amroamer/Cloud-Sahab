import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAirportPulse, type AirportState, type PulseStatus } from "@/lib/airport-pulse-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TrendingUp, TrendingDown, Minus, Terminal } from "lucide-react";
import { SectionTooltip } from "@/components/section-tooltip";

const STATUS_CONFIG: Record<PulseStatus, { label: string; labelAr: string; color: string; bg: string }> = {
  flowing: { label: "Flowing", labelAr: "سلس", color: "#10B981", bg: "rgba(16,185,129,0.15)" },
  congested: { label: "Congested", labelAr: "مزدحم", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  critical: { label: "Critical", labelAr: "حرج", color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
};

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function TrendIcon({ trend }: { trend: number }) {
  if (trend > 0.02) return <TrendingUp className="w-3 h-3" />;
  if (trend < -0.02) return <TrendingDown className="w-3 h-3" />;
  return <Minus className="w-3 h-3" />;
}

const LAT_MIN = 16.0;
const LAT_MAX = 32.5;
const LON_MIN = 34.5;
const LON_MAX = 51.0;

function latLonToSvg(lat: number, lon: number, width: number, height: number): { x: number; y: number } {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * width;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * height;
  return { x, y };
}

function getCircleRadius(tier: 1 | 2 | 3): number {
  if (tier === 1) return 18;
  if (tier === 2) return 11;
  return 7;
}

function getBreathSpeed(status: PulseStatus): string {
  if (status === "critical") return "1s";
  if (status === "congested") return "2s";
  return "3.5s";
}

function geoToSvg(lat: number, lon: number): string {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 850;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 550;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

const SAUDI_BORDER_COORDS: [number, number][] = [
  [29.37, 34.96], [29.18, 34.84], [28.03, 34.66], [27.88, 35.17],
  [28.57, 35.55], [28.54, 36.49], [29.20, 36.07], [29.63, 36.07],
  [29.90, 36.74], [30.46, 37.00], [30.52, 37.67], [31.35, 37.50],
  [31.50, 37.22], [31.96, 37.01], [32.16, 39.01], [32.00, 39.20],
  [32.15, 39.37], [31.75, 39.97], [31.35, 40.38], [31.20, 41.25],
  [31.37, 42.08], [30.88, 41.40], [30.10, 42.46], [29.23, 43.78],
  [28.54, 44.70], [28.07, 46.53], [27.84, 47.17], [28.99, 48.42],
  [29.08, 48.42], [29.33, 47.95], [29.88, 47.73], [30.09, 48.03],
  [30.10, 47.68], [29.98, 47.52], [30.06, 47.38], [29.37, 46.56],
  [29.19, 46.48], [29.04, 46.37], [28.53, 45.77],
  [28.26, 45.51], [27.73, 45.50], [27.25, 45.46],
  [27.03, 49.00], [26.42, 50.06], [26.07, 50.15],
  [25.85, 50.24], [25.80, 50.46], [25.58, 50.53],
  [25.30, 50.50], [25.20, 50.61], [24.91, 50.62],
  [24.63, 50.56], [24.47, 51.00], [24.29, 51.20],
  [24.20, 51.19], [24.07, 51.59],
  [23.93, 51.58], [23.76, 51.40], [23.54, 51.30],
  [23.30, 51.23], [22.93, 50.66], [22.58, 50.82],
  [22.22, 50.45], [22.02, 50.52],
  [21.48, 49.44], [20.59, 49.52], [20.30, 49.18],
  [20.11, 48.75], [19.90, 48.38], [19.76, 48.18],
  [19.50, 47.97], [19.33, 47.80], [19.00, 48.04],
  [18.80, 47.95], [18.47, 47.45], [18.35, 47.18],
  [18.23, 47.17], [18.17, 46.98], [17.86, 47.07],
  [17.47, 46.90], [17.32, 46.73], [17.16, 46.68],
  [16.96, 46.73], [16.89, 46.41], [16.73, 46.36],
  [16.65, 45.41], [16.37, 45.39], [16.53, 44.58],
  [16.99, 43.60], [17.17, 43.47], [17.29, 43.26],
  [17.37, 43.19], [17.48, 43.08],
  [17.63, 43.41], [18.17, 43.00],
  [18.26, 42.82], [18.68, 42.40],
  [19.03, 42.18], [19.25, 42.12], [19.65, 41.87],
  [20.07, 41.40], [20.49, 41.26],
  [20.75, 40.78], [20.95, 40.45], [21.17, 40.30],
  [21.43, 39.97], [21.58, 39.78], [21.60, 39.21],
  [22.02, 39.04], [22.55, 39.07], [22.77, 39.07],
  [23.25, 38.81], [24.02, 38.16], [24.42, 37.51],
  [24.59, 37.25], [24.94, 37.15], [25.35, 37.35],
  [25.79, 36.93], [26.29, 36.65], [26.57, 36.43],
  [27.09, 36.14], [27.33, 35.84], [27.59, 35.71],
  [27.88, 35.52], [28.17, 35.26], [28.55, 35.07],
  [28.57, 34.78], [29.37, 34.96],
];

const SAUDI_OUTLINE = "M " + SAUDI_BORDER_COORDS.map(([lat, lon]) => geoToSvg(lat, lon)).join(" L ") + " Z";

function BreathingCircle({
  airport,
  x,
  y,
  language,
  onHover,
  onLeave,
  onClick,
}: {
  airport: AirportState;
  x: number;
  y: number;
  language: string;
  onHover: (airport: AirportState, x: number, y: number) => void;
  onLeave: () => void;
  onClick: (airport: AirportState) => void;
}) {
  const cfg = STATUS_CONFIG[airport.status];
  const radius = getCircleRadius(airport.tier);
  const breathSpeed = getBreathSpeed(airport.status);
  const animName = `breathe-${airport.code}`;

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={(e) => {
        const svgEl = e.currentTarget.closest("svg");
        if (svgEl) {
          const rect = svgEl.getBoundingClientRect();
          onHover(airport, rect.left + (x / 850) * rect.width, rect.top + (y / 550) * rect.height);
        }
      }}
      onMouseLeave={onLeave}
      onClick={() => onClick(airport)}
      data-testid={`circle-${airport.code}`}
    >
      <circle
        cx={x}
        cy={y}
        r={radius * 1.8}
        fill={cfg.color}
        opacity={0.08}
      >
        <animate
          attributeName="r"
          values={`${radius * 1.5};${radius * 2.2};${radius * 1.5}`}
          dur={breathSpeed}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.08;0.18;0.08"
          dur={breathSpeed}
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={cfg.color}
        opacity={0.85}
      >
        <animate
          attributeName="r"
          values={`${radius * 0.85};${radius * 1.15};${radius * 0.85}`}
          dur={breathSpeed}
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={x}
        cy={y}
        r={radius * 0.35}
        fill="white"
        opacity={0.6}
      >
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur={breathSpeed}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

function AirportTooltip({
  airport,
  x,
  y,
  language,
}: {
  airport: AirportState;
  x: number;
  y: number;
  language: string;
}) {
  const cfg = STATUS_CONFIG[airport.status];
  return (
    <div
      className="fixed z-50 pointer-events-none bg-popover border border-border rounded-lg shadow-lg p-3 min-w-[200px]"
      style={{ left: x + 12, top: y - 10, transform: "translateY(-50%)" }}
      data-testid="airport-tooltip"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-base font-bold text-foreground" data-testid="tooltip-code">{airport.code}</span>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
          {language === "ar" ? cfg.labelAr : cfg.label}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mb-2 truncate" data-testid="tooltip-name">
        {language === "ar" ? airport.nameAr : airport.name}
      </div>
      <div className="text-xs text-muted-foreground mb-2" data-testid="tooltip-city">
        {language === "ar" ? airport.cityAr : airport.city}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-muted-foreground">{language === "ar" ? "الاستخدام" : "Utilization"}</span>
        <span className="font-semibold text-end" style={{ color: cfg.color }} data-testid="tooltip-utilization">{airport.utilization}%</span>
        <span className="text-muted-foreground">{language === "ar" ? "الإنتاجية" : "Throughput"}</span>
        <span className="font-semibold text-end text-foreground" data-testid="tooltip-throughput">
          {formatNumber(airport.currentThroughput)}
          <span className="text-muted-foreground ms-1 font-normal">{language === "ar" ? "م/د" : "p/m"}</span>
        </span>
        <span className="text-muted-foreground">{language === "ar" ? "الاتجاه" : "Trend"}</span>
        <span className="flex items-center justify-end gap-1" style={{ color: cfg.color }}>
          <TrendIcon trend={airport.trend} />
        </span>
      </div>
    </div>
  );
}

function DetailDrawer({ airport, language, open, onClose }: { airport: AirportState | null; language: string; open: boolean; onClose: () => void }) {
  if (!airport) return null;
  const cfg = STATUS_CONFIG[airport.status];

  const terminalData = Array.from({ length: airport.terminals }, (_, i) => ({
    id: i + 1,
    throughput: Math.round(airport.currentThroughput / airport.terminals * (0.7 + Math.random() * 0.6)),
    utilization: Math.min(100, Math.round(airport.utilization * (0.8 + Math.random() * 0.4))),
  }));

  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hourMultiplier = i >= 6 && i <= 10 ? 1.3 : i >= 16 && i <= 20 ? 1.2 : i >= 0 && i <= 5 ? 0.4 : 0.9;
    return {
      hour: i,
      throughput: Math.round(airport.baseRate * hourMultiplier * (0.8 + Math.random() * 0.4)),
    };
  });

  const maxHourly = Math.max(...hourlyData.map((h) => h.throughput));

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-[90vw] sm:w-[480px] p-0 border-border overflow-y-auto"
        data-testid="detail-drawer"
      >
        <div className="p-5 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{airport.code}</div>
              <div className="text-sm text-muted-foreground">{language === "ar" ? airport.nameAr : airport.name}</div>
              <div className="text-xs text-muted-foreground">
                {language === "ar" ? airport.cityAr : airport.city}, {language === "ar" ? airport.regionAr : airport.region}
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
              {language === "ar" ? cfg.labelAr : cfg.label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">{language === "ar" ? "الإنتاجية" : "Throughput"}</div>
              <div className="text-lg font-bold" style={{ color: cfg.color }} data-testid="detail-throughput">
                {formatNumber(airport.currentThroughput)}
              </div>
              <div className="text-[10px] text-muted-foreground">{language === "ar" ? "مسافر/دقيقة" : "pax/min"}</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">{language === "ar" ? "الاستخدام" : "Utilization"}</div>
              <div className="text-lg font-bold" style={{ color: cfg.color }} data-testid="detail-utilization">
                {airport.utilization}%
              </div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">{language === "ar" ? "الإجمالي اليوم" : "Total Today"}</div>
              <div className="text-lg font-bold text-foreground" data-testid="detail-total-today">
                {formatNumber(airport.totalToday)}
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {language === "ar" ? "تفاصيل الصالات" : "Terminal Breakdown"}
            </h3>
            <div className="space-y-2">
              {terminalData.map((t) => {
                const tStatus = t.utilization > 90 ? "critical" : t.utilization > 75 ? "congested" : "flowing";
                const tCfg = STATUS_CONFIG[tStatus as PulseStatus];
                return (
                  <Card key={t.id} className="p-2.5 flex items-center justify-between" data-testid={`terminal-${t.id}`}>
                    <span className="text-xs text-muted-foreground">
                      {language === "ar" ? `صالة ${t.id}` : `Terminal ${t.id}`}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: tCfg.color }}>
                        {formatNumber(t.throughput)} {language === "ar" ? "م/د" : "pax/min"}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: tCfg.color }}>
                        {t.utilization}%
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {language === "ar" ? "اتجاه 24 ساعة" : "24-Hour Trend"}
            </h3>
            <div className="flex items-end gap-[2px] h-16" dir="ltr">
              {hourlyData.map((h) => {
                const barHeight = maxHourly > 0 ? (h.throughput / maxHourly) * 100 : 0;
                const barStatus = h.throughput / airport.capacity > 0.9 ? "critical" : h.throughput / airport.capacity > 0.75 ? "congested" : "flowing";
                return (
                  <div
                    key={h.hour}
                    className="flex-1 rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${barHeight}%`,
                      backgroundColor: STATUS_CONFIG[barStatus as PulseStatus].color,
                      opacity: 0.7,
                    }}
                    title={`${String(h.hour).padStart(2, "0")}:00 - ${formatNumber(h.throughput)} pax/min`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1" dir="ltr">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="text-xs text-muted-foreground">{language === "ar" ? "ذروة اليوم" : "Peak Today"}</div>
              <div className="text-sm font-bold text-foreground">
                {formatNumber(airport.peakToday)} <span className="text-xs text-muted-foreground">{language === "ar" ? "في" : "at"} {airport.peakTimeToday}</span>
              </div>
            </Card>
            <Card className="p-3">
              <div className="text-xs text-muted-foreground">{language === "ar" ? "البوابات" : "Gates"}</div>
              <div className="text-sm font-bold text-foreground">{airport.gates}</div>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function AirportPulsePage() {
  const { t, language } = useTranslation();
  const { airports, national } = useAirportPulse();
  const [selectedAirport, setSelectedAirport] = useState<AirportState | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredAirport, setHoveredAirport] = useState<{ airport: AirportState; x: number; y: number } | null>(null);

  const handleCardClick = useCallback((airport: AirportState) => {
    setSelectedAirport(airport);
    setDrawerOpen(true);
    setHoveredAirport(null);
  }, []);

  const handleHover = useCallback((airport: AirportState, x: number, y: number) => {
    setHoveredAirport({ airport, x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredAirport(null);
  }, []);

  const flowingCount = airports.filter((a) => a.status === "flowing").length;
  const congestedCount = airports.filter((a) => a.status === "congested").length;
  const criticalCount = airports.filter((a) => a.status === "critical").length;

  const SVG_W = 850;
  const SVG_H = 550;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6" data-testid="airport-pulse-page">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">{t("nav.airportPulse")}</h1>
            <SectionTooltip
              contentEn="Real-time visualization of all 29 Saudi airports showing live health status, utilization, and throughput on an interactive map."
              contentAr="تصور فوري لجميع المطارات السعودية الـ 29 يعرض حالة الصحة والاستخدام والإنتاجية على خريطة تفاعلية."
            />
          </div>
          <p className="text-sm text-muted-foreground" data-testid="page-subtitle">
            {language === "ar"
              ? "مراقبة حية لحالة جميع المطارات السعودية"
              : "Live monitoring of all Saudi airport operations"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: STATUS_CONFIG.flowing.bg, color: STATUS_CONFIG.flowing.color }} data-testid="pill-flowing">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_CONFIG.flowing.color }} />
            {flowingCount} {language === "ar" ? "سلس" : "Flowing"}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: STATUS_CONFIG.congested.bg, color: STATUS_CONFIG.congested.color }} data-testid="pill-congested">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_CONFIG.congested.color }} />
            {congestedCount} {language === "ar" ? "مزدحم" : "Congested"}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: STATUS_CONFIG.critical.bg, color: STATUS_CONFIG.critical.color }} data-testid="pill-critical">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_CONFIG.critical.color }} />
            {criticalCount} {language === "ar" ? "حرج" : "Critical"}
          </div>
          <div className="ms-auto text-sm text-muted-foreground" data-testid="national-total">
            {language === "ar" ? "الإجمالي الوطني:" : "National Total:"}{" "}
            <span className="font-semibold text-foreground" data-testid="national-total-value">{formatNumber(national.totalPaxPerMin)}</span>{" "}
            {language === "ar" ? "مسافر/دقيقة" : "pax/min"}
          </div>
        </div>

        <Card className="p-4 relative overflow-hidden" data-testid="map-card">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-auto"
            style={{ maxHeight: "70vh", minHeight: "400px" }}
            data-testid="saudi-map"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="[stop-color:hsl(var(--muted))]" stopOpacity="0.5" />
                <stop offset="100%" className="[stop-color:hsl(var(--muted))]" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <path
              d={SAUDI_OUTLINE}
              fill="url(#mapGradient)"
              className="stroke-border"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {airports.map((airport) => {
              const pos = latLonToSvg(airport.lat, airport.lon, SVG_W, SVG_H);
              return (
                <BreathingCircle
                  key={airport.code}
                  airport={airport}
                  x={pos.x}
                  y={pos.y}
                  language={language}
                  onHover={handleHover}
                  onLeave={handleLeave}
                  onClick={handleCardClick}
                />
              );
            })}
          </svg>

          <div className="flex items-center gap-6 mt-3 px-2 text-xs text-muted-foreground" data-testid="map-legend">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
                {language === "ar" ? "سلس" : "Flowing"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                {language === "ar" ? "مزدحم" : "Congested"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                {language === "ar" ? "حرج" : "Critical"}
              </div>
            </div>
            <div className="flex items-center gap-3 ms-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-muted-foreground/30" />
                {language === "ar" ? "محور رئيسي" : "Major Hub"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                {language === "ar" ? "إقليمي" : "Regional"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                {language === "ar" ? "محلي" : "Domestic"}
              </div>
            </div>
          </div>
        </Card>

        {national.alerts.length > 0 && (
          <Card className="p-4" data-testid="alerts-card">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {language === "ar" ? "تنبيهات نشطة" : "Active Alerts"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {national.alerts.map((alert) => {
                const aCfg = STATUS_CONFIG[alert.status];
                return (
                  <span
                    key={alert.code}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: aCfg.bg, color: aCfg.color }}
                    data-testid={`alert-${alert.code}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aCfg.color }} />
                    {alert.code} — {alert.utilization}%
                  </span>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {hoveredAirport && (
        <AirportTooltip
          airport={hoveredAirport.airport}
          x={hoveredAirport.x}
          y={hoveredAirport.y}
          language={language}
        />
      )}

      <DetailDrawer
        airport={selectedAirport}
        language={language}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </ScrollArea>
  );
}
