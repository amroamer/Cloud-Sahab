import { useState, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AIRPORTS, AIRLINES, AIRLINE_ROUTES } from "@/lib/mock-data";
import { Plane, Navigation, Users, Route, Globe, MapPin } from "lucide-react";

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

function createAirportIcon(isDark: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:hsl(185,75%,38%);border:2px solid ${isDark ? "#1a1a2e" : "#fff"};box-shadow:0 0 6px rgba(26,188,156,0.5);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function createDestIcon(isDark: boolean, isHighVolume: boolean) {
  const color = isHighVolume ? "hsl(28,85%,48%)" : "hsl(210,85%,42%)";
  const size = isHighVolume ? 10 : 8;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid ${isDark ? "#1a1a2e" : "#fff"};box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function ArcLines({ routes, originMap, isDark }: {
  routes: typeof AIRLINE_ROUTES;
  originMap: Record<string, { lat: number; lon: number }>;
  isDark: boolean;
}) {
  const map = useMap();
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.clearLayers();
      map.removeLayer(layerRef.current);
    }

    const group = L.layerGroup();
    layerRef.current = group;

    routes.forEach((route) => {
      const origin = originMap[route.origin];
      if (!origin) return;
      if (origin.lat === route.destLat && origin.lon === route.destLon) return;

      const midLat = (origin.lat + route.destLat) / 2;
      const midLon = (origin.lon + route.destLon) / 2;
      const dist = Math.sqrt(
        Math.pow(route.destLat - origin.lat, 2) +
        Math.pow(route.destLon - origin.lon, 2)
      );
      const curvature = Math.min(dist * 0.15, 8);
      const perpLat = midLat + curvature;
      const perpLon = midLon;

      const points: L.LatLngExpression[] = [];
      for (let t = 0; t <= 1; t += 0.05) {
        const lat = (1 - t) * (1 - t) * origin.lat + 2 * (1 - t) * t * perpLat + t * t * route.destLat;
        const lon = (1 - t) * (1 - t) * origin.lon + 2 * (1 - t) * t * perpLon + t * t * route.destLon;
        points.push([lat, lon]);
      }

      const maxPax = 4200000;
      const intensity = Math.max(0.3, Math.min(1, route.passengers / maxPax));
      const weight = 1 + intensity * 2.5;
      const color = isDark
        ? `rgba(46, 134, 193, ${intensity * 0.8})`
        : `rgba(27, 58, 92, ${intensity * 0.6})`;

      const polyline = L.polyline(points, {
        color,
        weight,
        dashArray: route.frequency < 7 ? "4 6" : undefined,
      });

      const airline = AIRLINES.find((a) => a.code === route.airline);
      polyline.bindPopup(`
        <div style="font-family:system-ui;min-width:160px;font-size:13px;">
          <strong>${airline?.name || route.airline}</strong><br/>
          <span style="color:#888;">${origin.lat === AIRPORTS.find(a => a.code === route.origin)?.lat ? AIRPORTS.find(a => a.code === route.origin)?.city : route.origin} → ${route.destination}</span><br/>
          <hr style="margin:4px 0;border-color:#eee;"/>
          <span>Frequency: <strong>${route.frequency}/week</strong></span><br/>
          <span>Passengers: <strong>${(route.passengers / 1000000).toFixed(1)}M</strong>/year</span>
        </div>
      `);

      group.addLayer(polyline);
    });

    group.addTo(map);

    return () => {
      if (layerRef.current) {
        layerRef.current.clearLayers();
        map.removeLayer(layerRef.current);
      }
    };
  }, [routes, originMap, isDark, map]);

  return null;
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
  }, [isDark, map]);

  return null;
}

export default function RouteMapPage() {
  const { t, language, isRTL } = useTranslation();
  const { isDark } = useTheme();
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const originMap = useMemo(() => {
    const m: Record<string, { lat: number; lon: number; name: string; nameAr: string }> = {};
    AIRPORTS.forEach((a) => {
      m[a.code] = { lat: a.lat, lon: a.lon, name: a.city, nameAr: a.cityAr };
    });
    return m;
  }, []);

  const filteredRoutes = useMemo(() => {
    return AIRLINE_ROUTES.filter((r) => {
      if (r.frequency === 0) return false;
      if (selectedAirline !== "all" && r.airline !== selectedAirline) return false;
      if (selectedPeriod !== "all" && r.period !== selectedPeriod) return false;
      if (selectedOrigin !== "all" && r.origin !== selectedOrigin) return false;
      return true;
    });
  }, [selectedAirline, selectedPeriod, selectedOrigin]);

  const stats = useMemo(() => {
    const destinations = new Set(filteredRoutes.map((r) => r.destination));
    const countries = new Set(filteredRoutes.filter(r => r.country !== "Saudi Arabia").map((r) => r.country));
    const totalPax = filteredRoutes.reduce((sum, r) => sum + r.passengers, 0);
    const totalFreq = filteredRoutes.reduce((sum, r) => sum + r.frequency, 0);
    return {
      routes: filteredRoutes.length,
      destinations: destinations.size,
      countries: countries.size,
      passengers: totalPax,
      frequency: totalFreq,
    };
  }, [filteredRoutes]);

  const destMarkers = useMemo(() => {
    const seen = new Map<string, { lat: number; lon: number; name: string; nameAr: string; country: string; countryAr: string; pax: number; routes: number }>();
    filteredRoutes.forEach((r) => {
      const key = `${r.destLat},${r.destLon}`;
      const isOriginAirport = AIRPORTS.some(a => a.lat === r.destLat && a.lon === r.destLon);
      if (isOriginAirport) return;
      if (seen.has(key)) {
        const existing = seen.get(key)!;
        existing.pax += r.passengers;
        existing.routes += 1;
      } else {
        seen.set(key, {
          lat: r.destLat,
          lon: r.destLon,
          name: r.destination,
          nameAr: r.destinationAr,
          country: r.country,
          countryAr: r.countryAr,
          pax: r.passengers,
          routes: 1,
        });
      }
    });
    return Array.from(seen.values());
  }, [filteredRoutes]);

  const activeOrigins = useMemo(() => {
    const codes = new Set(filteredRoutes.map((r) => r.origin));
    return AIRPORTS.filter((a) => codes.has(a.code));
  }, [filteredRoutes]);

  const saudiAirlines = AIRLINES.filter(a => a.nationality === "Saudi");
  const foreignAirlines = AIRLINES.filter(a => a.nationality !== "Saudi");

  const formatPax = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-4" data-testid="page-route-map">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
              {language === "ar" ? "خريطة المسارات" : "Route Map"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "ar"
                ? "تصور مسارات شركات الطيران ووجهاتها من المطارات السعودية"
                : "Visualize airline routes and destinations from Saudi airports"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-end relative z-[500]">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {language === "ar" ? "شركة الطيران" : "Airline"}
            </label>
            <Select value={selectedAirline} onValueChange={setSelectedAirline}>
              <SelectTrigger className="w-[180px]" data-testid="select-airline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" data-testid="option-airline-all">
                  {language === "ar" ? "جميع الشركات" : "All Airlines"}
                </SelectItem>
                {saudiAirlines.map((a) => (
                  <SelectItem key={a.code} value={a.code} data-testid={`option-airline-${a.code}`}>
                    {language === "ar" ? a.nameAr : a.name}
                  </SelectItem>
                ))}
                {foreignAirlines.map((a) => (
                  <SelectItem key={a.code} value={a.code} data-testid={`option-airline-${a.code}`}>
                    {language === "ar" ? a.nameAr : a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {language === "ar" ? "المطار المصدر" : "Origin Airport"}
            </label>
            <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
              <SelectTrigger className="w-[180px]" data-testid="select-origin">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" data-testid="option-origin-all">
                  {language === "ar" ? "جميع المطارات" : "All Airports"}
                </SelectItem>
                {AIRPORTS.map((a) => (
                  <SelectItem key={a.code} value={a.code} data-testid={`option-origin-${a.code}`}>
                    {language === "ar" ? a.cityAr : a.city} ({a.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {language === "ar" ? "الفترة" : "Period"}
            </label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[130px]" data-testid="select-period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" data-testid="option-period-all">
                  {language === "ar" ? "الكل" : "All"}
                </SelectItem>
                <SelectItem value="2024" data-testid="option-period-2024">2024</SelectItem>
                <SelectItem value="2025" data-testid="option-period-2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2 ms-auto">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
              <Route className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "المسارات" : "Routes"}</p>
                <p className="text-sm font-bold" data-testid="text-stat-routes">{stats.routes}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
              <MapPin className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "الوجهات" : "Destinations"}</p>
                <p className="text-sm font-bold" data-testid="text-stat-destinations">{stats.destinations}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
              <Globe className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "الدول" : "Countries"}</p>
                <p className="text-sm font-bold" data-testid="text-stat-countries">{stats.countries}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "ar" ? "المسافرون" : "Passengers"}</p>
                <p className="text-sm font-bold" data-testid="text-stat-passengers">{formatPax(stats.passengers)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          <Card className="overflow-hidden relative" style={{ minHeight: "520px" }} data-testid="card-map">
            <MapContainer
              center={[24.5, 45]}
              zoom={4}
              style={{ height: "100%", width: "100%", minHeight: "520px" }}
              zoomControl={!isRTL}
              attributionControl={true}
            >
              <TileSwitch isDark={isDark} />
              <ArcLines routes={filteredRoutes} originMap={originMap} isDark={isDark} />

              {activeOrigins.map((airport) => (
                <Marker
                  key={airport.code}
                  position={[airport.lat, airport.lon]}
                  icon={createAirportIcon(isDark)}
                >
                  <Popup>
                    <div style={{ fontFamily: "system-ui", fontSize: "13px", minWidth: "140px" }}>
                      <strong>{language === "ar" ? airport.cityAr : airport.city}</strong>
                      <br />
                      <span style={{ color: "#888" }}>{airport.code} — {language === "ar" ? airport.nameAr : airport.name}</span>
                      <hr style={{ margin: "4px 0", borderColor: "#eee" }} />
                      <span>{language === "ar" ? "الرحلات السنوية" : "Annual Flights"}: <strong>{(airport.flights / 1000).toFixed(0)}K</strong></span>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {destMarkers.map((dest, i) => (
                <Marker
                  key={`dest-${i}`}
                  position={[dest.lat, dest.lon]}
                  icon={createDestIcon(isDark, dest.pax > 1000000)}
                >
                  <Popup>
                    <div style={{ fontFamily: "system-ui", fontSize: "13px", minWidth: "140px" }}>
                      <strong>{language === "ar" ? dest.nameAr : dest.name}</strong>
                      <br />
                      <span style={{ color: "#888" }}>{language === "ar" ? dest.countryAr : dest.country}</span>
                      <hr style={{ margin: "4px 0", borderColor: "#eee" }} />
                      <span>{language === "ar" ? "المسارات" : "Routes"}: <strong>{dest.routes}</strong></span><br />
                      <span>{language === "ar" ? "المسافرون" : "Passengers"}: <strong>{formatPax(dest.pax)}</strong></span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <div className="absolute bottom-3 start-3 z-[400] flex gap-2 flex-wrap" data-testid="map-legend">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(185,75%,38%)" }}></span>
                {language === "ar" ? "مطار سعودي" : "Saudi Airport"}
              </Badge>
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(210,85%,42%)" }}></span>
                {language === "ar" ? "وجهة" : "Destination"}
              </Badge>
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(28,85%,48%)" }}></span>
                {language === "ar" ? "حجم عالي (1M+)" : "High Volume (1M+)"}
              </Badge>
            </div>
          </Card>

          <div className="space-y-3">
            <Card className="p-4" data-testid="card-route-list">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-primary" />
                {language === "ar" ? "قائمة المسارات" : "Route List"}
                <Badge variant="secondary" className="ms-auto text-xs">{filteredRoutes.length}</Badge>
              </h3>
              <ScrollArea className="h-[420px]">
                <div className="space-y-1.5">
                  {filteredRoutes
                    .sort((a, b) => b.passengers - a.passengers)
                    .map((route, i) => {
                      const airline = AIRLINES.find((a) => a.code === route.airline);
                      const originAirport = AIRPORTS.find((a) => a.code === route.origin);
                      return (
                        <div
                          key={`${route.airline}-${route.origin}-${route.destination}-${i}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-xs"
                          data-testid={`route-item-${i}`}
                        >
                          <Plane className="h-3 w-3 text-muted-foreground shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">
                              {language === "ar" ? originAirport?.cityAr : originAirport?.city} → {language === "ar" ? route.destinationAr : route.destination}
                            </p>
                            <p className="text-muted-foreground truncate">
                              {language === "ar" ? airline?.nameAr : airline?.name} · {route.frequency}/{language === "ar" ? "أسبوع" : "wk"}
                            </p>
                          </div>
                          <span className="font-semibold text-end shrink-0 tabular-nums">
                            {formatPax(route.passengers)}
                          </span>
                        </div>
                      );
                    })}
                  {filteredRoutes.length === 0 && (
                    <div className="text-center text-muted-foreground py-8 text-sm">
                      {language === "ar" ? "لا توجد مسارات تطابق الفلاتر" : "No routes match the selected filters"}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
