import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useAirportPulse, type AirportState, type PulseStatus } from "@/lib/airport-pulse-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TrendingUp, TrendingDown, Minus, Terminal } from "lucide-react";
import { SectionTooltip } from "@/components/section-tooltip";
import { MapContainer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

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

function getCircleSize(tier: 1 | 2 | 3): number {
  if (tier === 1) return 28;
  if (tier === 2) return 18;
  return 12;
}

function getBreathSpeed(status: PulseStatus): string {
  if (status === "critical") return "1s";
  if (status === "congested") return "2s";
  return "3.5s";
}

function TileSwitch({ isDark }: { isDark: boolean }) {
  const map = useMap();
  const tileRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (tileRef.current) {
      map.removeLayer(tileRef.current);
    }
    tileRef.current = L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, { attribution: TILE_ATTR });
    tileRef.current.addTo(map);

    return () => {
      if (tileRef.current) {
        map.removeLayer(tileRef.current);
        tileRef.current = null;
      }
    };
  }, [isDark, map]);

  return null;
}

function createBreathingIcon(status: PulseStatus, tier: 1 | 2 | 3, code: string): L.DivIcon {
  const cfg = STATUS_CONFIG[status];
  const size = getCircleSize(tier);
  const outerSize = size * 2.2;
  const speed = getBreathSpeed(status);

  return L.divIcon({
    className: "",
    html: `
      <div data-testid="circle-${code}" style="width:${outerSize}px;height:${outerSize}px;position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
        <div style="position:absolute;width:${outerSize}px;height:${outerSize}px;border-radius:50%;background:${cfg.color};opacity:0.12;animation:pulse-outer ${speed} ease-in-out infinite;"></div>
        <div style="width:${size}px;height:${size}px;border-radius:50%;background:${cfg.color};opacity:0.85;animation:pulse-inner ${speed} ease-in-out infinite;position:relative;display:flex;align-items:center;justify-content:center;">
          <div style="width:${size * 0.35}px;height:${size * 0.35}px;border-radius:50%;background:white;opacity:0.6;"></div>
        </div>
      </div>
    `,
    iconSize: [outerSize, outerSize],
    iconAnchor: [outerSize / 2, outerSize / 2],
  });
}

function AirportMarkers({
  airports,
  language,
  onHover,
  onLeave,
  onClick,
}: {
  airports: AirportState[];
  language: string;
  onHover: (airport: AirportState, x: number, y: number) => void;
  onLeave: () => void;
  onClick: (airport: AirportState) => void;
}) {
  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    airports.forEach((a) => {
      map.set(a.code, createBreathingIcon(a.status, a.tier, a.code));
    });
    return map;
  }, [airports]);

  return (
    <>
      {airports.map((airport) => {
        const icon = icons.get(airport.code);
        if (!icon) return null;
        return (
          <Marker
            key={airport.code}
            position={[airport.lat, airport.lon]}
            icon={icon}
            eventHandlers={{
              mouseover: (e) => {
                const el = e.originalEvent;
                onHover(airport, el.clientX, el.clientY);
              },
              mouseout: () => onLeave(),
              click: () => onClick(airport),
            }}
          />
        );
      })}
    </>
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
      className="fixed z-[1100] pointer-events-none bg-popover border border-border rounded-lg shadow-lg p-3 min-w-[200px]"
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
  const { isDark } = useTheme();
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

        <Card className="p-0 relative overflow-hidden rounded-lg" data-testid="map-card">
          <div style={{ height: "65vh", minHeight: "450px" }} data-testid="saudi-map">
            <MapContainer
              center={[23.8, 44.5]}
              zoom={6}
              minZoom={5}
              maxZoom={8}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", borderRadius: "var(--radius)" }}
              zoomControl={true}
              attributionControl={true}
            >
              <TileSwitch isDark={isDark} />
              <AirportMarkers
                airports={airports}
                language={language}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleCardClick}
              />
            </MapContainer>
          </div>

          <div className="flex flex-wrap items-center gap-6 p-3 px-4 text-xs text-muted-foreground border-t border-border" data-testid="map-legend">
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
