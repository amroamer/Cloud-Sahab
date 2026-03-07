import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAirportPulse, type AirportState, type PulseStatus, type NationalStats, type AlertItem } from "@/lib/airport-pulse-data";
import { HeartbeatWaveform } from "@/components/heartbeat-waveform";
import { X, TrendingUp, TrendingDown, Minus, Plane, Terminal } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const STATUS_CONFIG: Record<PulseStatus, { label: string; labelAr: string; color: string; dotColor: string; glowShadow: string; bgOpacity: string }> = {
  flowing: { label: "FLOWING", labelAr: "سلس", color: "#10B981", dotColor: "bg-emerald-500", glowShadow: "0 0 15px rgba(16,185,129,0.15)", bgOpacity: "rgba(16,185,129,0.2)" },
  congested: { label: "CONGESTED", labelAr: "مزدحم", color: "#F59E0B", dotColor: "bg-amber-500", glowShadow: "0 0 15px rgba(245,158,11,0.15)", bgOpacity: "rgba(245,158,11,0.2)" },
  critical: { label: "CRITICAL", labelAr: "حرج", color: "#EF4444", dotColor: "bg-red-500", glowShadow: "0 0 20px rgba(239,68,68,0.25)", bgOpacity: "rgba(239,68,68,0.2)" },
};

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function TrendIcon({ trend }: { trend: number }) {
  if (trend > 0.02) return <TrendingUp className="w-3 h-3" />;
  if (trend < -0.02) return <TrendingDown className="w-3 h-3" />;
  return <Minus className="w-3 h-3" />;
}

function StatusBadge({ status, language, pulse = false }: { status: PulseStatus; language: string; pulse?: boolean }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${pulse && status === "critical" ? "animate-pulse-badge" : ""}`}
      style={{ backgroundColor: cfg.bgOpacity, color: cfg.color }}
      data-testid={`badge-status-${status}`}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
      {language === "ar" ? cfg.labelAr : cfg.label}
    </span>
  );
}

function UtilizationBar({ utilization, status }: { utilization: number; status: PulseStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "#1F2937" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, utilization)}%`, backgroundColor: cfg.color }}
      />
    </div>
  );
}

function HubCard({ airport, language, onClick }: { airport: AirportState; language: string; onClick: () => void }) {
  const cfg = STATUS_CONFIG[airport.status];
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1F2937",
        boxShadow: cfg.glowShadow,
      }}
      onClick={onClick}
      data-testid={`hub-card-${airport.code}`}
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="text-[28px] font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }} data-testid={`hub-code-${airport.code}`}>
            {airport.code}
          </div>
          <div className="text-sm text-[#9CA3AF]">{language === "ar" ? airport.nameAr : airport.name}</div>
          <div className="text-xs text-[#6B7280]">{language === "ar" ? airport.cityAr : airport.city}</div>
        </div>
        <StatusBadge status={airport.status} language={language} pulse />
      </div>

      <div className="my-3 rounded-lg overflow-hidden" style={{ backgroundColor: "#0A0E1A" }}>
        <HeartbeatWaveform
          dataHistory={airport.history}
          status={airport.status}
          width={380}
          height={80}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid={`hub-throughput-${airport.code}`}>
            {formatNumber(airport.currentThroughput)}
          </span>
          <span className="text-xs text-[#6B7280]">{language === "ar" ? "مسافر/دقيقة" : "pax/min"}</span>
          <span style={{ color: cfg.color }}><TrendIcon trend={airport.trend} /></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid={`hub-util-${airport.code}`}>{airport.utilization}%</span>
        </div>
      </div>
      <UtilizationBar utilization={airport.utilization} status={airport.status} />
    </div>
  );
}

function CompactCard({ airport, language, onClick }: { airport: AirportState; language: string; onClick: () => void }) {
  const cfg = STATUS_CONFIG[airport.status];
  return (
    <div
      className="rounded-lg p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: "#111827",
        border: "1px solid #1F2937",
        boxShadow: cfg.glowShadow,
      }}
      onClick={onClick}
      data-testid={`compact-card-${airport.code}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[18px] font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }} data-testid={`compact-code-${airport.code}`}>
          {airport.code}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
          <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid={`compact-util-${airport.code}`}>
            {airport.utilization}%
          </span>
        </div>
      </div>
      <div className="text-xs text-[#9CA3AF] truncate mb-2">{language === "ar" ? airport.nameAr : airport.name}</div>

      <div className="rounded overflow-hidden mb-2" style={{ backgroundColor: "#0A0E1A" }}>
        <HeartbeatWaveform
          dataHistory={airport.history.slice(-100)}
          status={airport.status}
          width={160}
          height={40}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid={`compact-throughput-${airport.code}`}>
          {formatNumber(airport.currentThroughput)}
        </span>
        <span style={{ color: cfg.color }}><TrendIcon trend={airport.trend} /></span>
      </div>
    </div>
  );
}

function BottomTicker({ national, language }: { national: NationalStats; language: string }) {
  const alertTexts = national.alerts.map((a) => {
    const cfg = STATUS_CONFIG[a.status];
    return `<span style="color:${cfg.color}">● ${a.code} ${a.utilization}%</span>`;
  }).join("  |  ");

  const tickerContent = language === "ar"
    ? `الإجمالي الوطني: ${formatNumber(national.totalPaxPerMin)} مسافر/دقيقة عبر 29 مطار  ·  الذروة اليوم: ${formatNumber(national.peakToday)} في ${national.peakTimeToday}  ·  المتوسط: ${formatNumber(national.averageToday)} مسافر/دقيقة  ·  إجمالي المسافرين اليوم: ${formatNumber(national.totalPassengersToday)}${national.alerts.length > 0 ? "  ·  تنبيهات نشطة: " : ""}`
    : `National Total: ${formatNumber(national.totalPaxPerMin)} pax/min across 29 airports  ·  Peak Today: ${formatNumber(national.peakToday)} at ${national.peakTimeToday} AST  ·  Average Today: ${formatNumber(national.averageToday)} pax/min  ·  Saudi airports have served ${formatNumber(national.totalPassengersToday)} passengers today${national.alerts.length > 0 ? "  ·  Active Alerts: " : ""}`;

  return (
    <div
      className="fixed bottom-0 inset-x-0 h-10 flex items-center overflow-hidden"
      style={{ backgroundColor: "#0F172A", borderTop: "1px solid #1F2937", zIndex: 50 }}
      data-testid="bottom-ticker"
    >
      <div className="ticker-scroll whitespace-nowrap text-sm text-[#9CA3AF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <span>{tickerContent}</span>
        {alertTexts && <span dangerouslySetInnerHTML={{ __html: alertTexts }} />}
        <span className="mx-8">{"  ·  "}</span>
        <span>{tickerContent}</span>
        {alertTexts && <span dangerouslySetInnerHTML={{ __html: alertTexts }} />}
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
    utilization: Math.round(airport.utilization * (0.8 + Math.random() * 0.4)),
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
        className="w-[90vw] sm:w-[480px] p-0 border-0 overflow-y-auto"
        style={{ backgroundColor: "#0D1117", color: "#E5E7EB" }}
        data-testid="detail-drawer"
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {airport.code}
              </div>
              <div className="text-sm text-[#9CA3AF]">{language === "ar" ? airport.nameAr : airport.name}</div>
              <div className="text-xs text-[#6B7280]">
                {language === "ar" ? airport.cityAr : airport.city}, {language === "ar" ? airport.regionAr : airport.region}
              </div>
            </div>
            <StatusBadge status={airport.status} language={language} pulse />
          </div>

          <div className="rounded-lg overflow-hidden mb-4" style={{ backgroundColor: "#0A0E1A" }}>
            <HeartbeatWaveform
              dataHistory={airport.history}
              status={airport.status}
              width={430}
              height={100}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#111827" }}>
              <div className="text-xs text-[#6B7280] mb-1">{language === "ar" ? "الإنتاجية" : "Throughput"}</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid="detail-throughput">
                {formatNumber(airport.currentThroughput)}
              </div>
              <div className="text-[10px] text-[#6B7280]">{language === "ar" ? "مسافر/دقيقة" : "pax/min"}</div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#111827" }}>
              <div className="text-xs text-[#6B7280] mb-1">{language === "ar" ? "الاستخدام" : "Utilization"}</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cfg.color }} data-testid="detail-utilization">
                {airport.utilization}%
              </div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#111827" }}>
              <div className="text-xs text-[#6B7280] mb-1">{language === "ar" ? "الإجمالي اليوم" : "Total Today"}</div>
              <div className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#E5E7EB" }} data-testid="detail-total-today">
                {formatNumber(airport.totalToday)}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {language === "ar" ? "تفاصيل الصالات" : "Terminal Breakdown"}
            </h3>
            <div className="space-y-2">
              {terminalData.map((t) => {
                const tStatus = t.utilization > 90 ? "critical" : t.utilization > 75 ? "congested" : "flowing";
                const tCfg = STATUS_CONFIG[tStatus as PulseStatus];
                return (
                  <div key={t.id} className="rounded-lg p-2.5 flex items-center justify-between" style={{ backgroundColor: "#111827" }}>
                    <span className="text-xs text-[#9CA3AF]">
                      {language === "ar" ? `صالة ${t.id}` : `Terminal ${t.id}`}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: tCfg.color }}>
                        {formatNumber(t.throughput)} pax/min
                      </span>
                      <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: tCfg.color }}>
                        {t.utilization}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white mb-3">
              {language === "ar" ? "اتجاه 24 ساعة" : "24-Hour Trend"}
            </h3>
            <div className="flex items-end gap-[2px] h-16" style={{ direction: "ltr" }}>
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
            <div className="flex justify-between text-[10px] text-[#6B7280] mt-1" style={{ direction: "ltr" }}>
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3" style={{ backgroundColor: "#111827" }}>
              <div className="text-xs text-[#6B7280]">{language === "ar" ? "ذروة اليوم" : "Peak Today"}</div>
              <div className="text-sm font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatNumber(airport.peakToday)} <span className="text-xs text-[#6B7280]">{language === "ar" ? "في" : "at"} {airport.peakTimeToday}</span>
              </div>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: "#111827" }}>
              <div className="text-xs text-[#6B7280]">{language === "ar" ? "البوابات" : "Gates"}</div>
              <div className="text-sm font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {airport.gates}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function AirportPulsePage() {
  const { language, setLanguage } = useTranslation();
  const { airports, national } = useAirportPulse();
  const [selectedAirport, setSelectedAirport] = useState<AirportState | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => {
      if (!wasDark) root.classList.remove("dark");
    };
  }, []);

  const handleCardClick = useCallback((airport: AirportState) => {
    setSelectedAirport(airport);
    setDrawerOpen(true);
  }, []);

  const hubAirports = airports.filter((a) => a.tier === 1);
  const otherAirports = airports.filter((a) => a.tier !== 1);

  const flowingCount = airports.filter((a) => a.status === "flowing").length;
  const congestedCount = airports.filter((a) => a.status === "congested").length;
  const criticalCount = airports.filter((a) => a.status === "critical").length;

  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ backgroundColor: "#0A0E1A", fontFamily: "Inter, sans-serif" }} data-testid="airport-pulse-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        .ticker-scroll {
          display: inline-block;
          animation: ticker-scroll 60s linear infinite;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-pulse-badge {
          animation: pulse-badge 2s ease-in-out infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .live-dot {
          animation: live-pulse 1.5s ease-in-out infinite;
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .scanline-overlay {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 100;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.015) 2px,
            rgba(255,255,255,0.015) 4px
          );
        }
      `}</style>

      <div className="scanline-overlay" />

      <header
        className="fixed top-0 inset-x-0 h-12 flex items-center justify-between px-4 z-50"
        style={{ backgroundColor: "#0F172A", borderBottom: "1px solid #1F293766", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        data-testid="pulse-header"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Plane className="w-5 h-5" style={{ color: "#2E86C1" }} />
            <span className="text-base font-bold" style={{ color: "#2E86C1" }}>SAHAB</span>
          </div>
          <span className="text-[#4B5563]">|</span>
          <span className="text-sm font-medium text-white">{language === "ar" ? "نبض المطارات" : "Airport Pulse View"}</span>
          <span className="text-[#4B5563] hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#10B981" }} data-testid="pill-flowing">
              {flowingCount} {language === "ar" ? "سلس" : "Flowing"}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#F59E0B" }} data-testid="pill-congested">
              {congestedCount} {language === "ar" ? "مزدحم" : "Congested"}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#EF4444" }} data-testid="pill-critical">
              {criticalCount} {language === "ar" ? "حرج" : "Critical"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" data-testid="live-indicator">
            <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
            <span className="text-xs font-semibold text-red-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
          </div>
          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="px-2 py-0.5 rounded text-xs font-medium border transition-colors"
            style={{ borderColor: "#374151", color: "#9CA3AF" }}
            data-testid="btn-language-toggle"
          >
            {language === "ar" ? "EN" : "AR"}
          </button>
        </div>
      </header>

      <main className="pt-14 pb-12 px-4 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {hubAirports.map((airport) => (
            <HubCard
              key={airport.code}
              airport={airport}
              language={language}
              onClick={() => handleCardClick(airport)}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {otherAirports.map((airport) => (
            <CompactCard
              key={airport.code}
              airport={airport}
              language={language}
              onClick={() => handleCardClick(airport)}
            />
          ))}
        </div>
      </main>

      <BottomTicker national={national} language={language} />

      <DetailDrawer
        airport={selectedAirport}
        language={language}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
