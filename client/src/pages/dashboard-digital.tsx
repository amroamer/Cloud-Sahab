import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  Leaf,
  Fuel,
  Gauge,
  Smartphone,
  Ticket,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  SUSTAINABILITY_QUARTERLY,
  DIGITAL_MONTHLY,
  SKYTRAX_RANKINGS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_CHANNELS,
  CHART_COLORS,
} from "@/lib/mock-data";
import { SectionTooltip } from "@/components/section-tooltip";

const totalECheckins = DIGITAL_MONTHLY.reduce((sum, m) => sum + m.eCheckins, 0);
const totalETickets = DIGITAL_MONTHLY.reduce((sum, m) => sum + m.eTickets, 0);
const totalComplaints = DIGITAL_MONTHLY.reduce((sum, m) => sum + m.complaints, 0);
const totalDigitalComplaints = DIGITAL_MONTHLY.reduce((sum, m) => sum + m.digitalComplaints, 0);
const digitalAdoptionRate = Math.round((totalDigitalComplaints / totalComplaints) * 100);

const latestSustainability = SUSTAINABILITY_QUARTERLY[SUSTAINABILITY_QUARTERLY.length - 1];
const prevSustainability = SUSTAINABILITY_QUARTERLY[SUSTAINABILITY_QUARTERLY.length - 2];
const co2Change = ((latestSustainability.co2 - prevSustainability.co2) / prevSustainability.co2 * 100);
const fuelChange = ((latestSustainability.fuel - prevSustainability.fuel) / prevSustainability.fuel * 100);

export default function DashboardDigital() {
  const { t, language } = useTranslation();

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
      key: "section",
      label: t("filter.section"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "sustainability", label: t("filter.sustainability") },
        { value: "digital", label: t("filter.digital") },
        { value: "cx", label: t("filter.cx") },
      ],
      defaultValue: "all",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const COLORS = {
    green: "hsl(160, 70%, 38%)",
    blue: "hsl(210, 85%, 42%)",
    teal: "hsl(185, 75%, 38%)",
    orange: "hsl(28, 85%, 48%)",
    purple: "hsl(280, 70%, 42%)",
    red: "hsl(340, 75%, 45%)",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-digital-title">
            {t("digital.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {language === "ar" ? "7 مؤشرات أداء رئيسية في 3 محاور" : "7 KPIs across 3 zones"}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4" style={{ color: COLORS.green }} />
              <h2 className="text-base font-semibold">{t("digital.sustainability")}</h2>
              <SectionTooltip tooltip={language === "ar" ? "مؤشرات الاستدامة البيئية لقطاع الطيران المدني" : "Environmental sustainability indicators for the civil aviation sector"} />
            </div>

            <div className="grid gap-3 grid-cols-2">
              <Card className="p-4" data-testid="card-co2-emissions">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("digital.co2Emissions")}</p>
                  <SectionTooltip tooltip={language === "ar" ? "إجمالي انبعاثات ثاني أكسيد الكربون من الطيران المدني بالمليون طن" : "Total CO2 emissions from civil aviation in million tonnes"} />
                </div>
                <p className="text-2xl font-bold mt-1">{latestSustainability.co2}</p>
                <p className="text-xs text-muted-foreground">{t("digital.millionTonnes")}</p>
                <div className="flex items-center gap-1 mt-2">
                  {co2Change <= 0 ? (
                    <ArrowDown className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowUp className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-semibold ${co2Change <= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {co2Change > 0 ? "+" : ""}{co2Change.toFixed(1)}%
                  </span>
                </div>
              </Card>

              <Card className="p-4" data-testid="card-fuel-consumption">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("digital.fuelConsumption")}</p>
                  <SectionTooltip tooltip={language === "ar" ? "إجمالي استهلاك الوقود للطيران المدني بمليار لتر" : "Total fuel consumption for civil aviation in billion liters"} />
                </div>
                <p className="text-2xl font-bold mt-1">{latestSustainability.fuel}</p>
                <p className="text-xs text-muted-foreground">{t("digital.billionLiters")}</p>
                <div className="flex items-center gap-1 mt-2">
                  {fuelChange <= 0 ? (
                    <ArrowDown className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowUp className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-semibold ${fuelChange <= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {fuelChange > 0 ? "+" : ""}{fuelChange.toFixed(1)}%
                  </span>
                </div>
              </Card>
            </div>

            <Card className="p-4" data-testid="card-co2-intensity-gauge">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium">{t("digital.co2Intensity")}</p>
                <Badge variant="secondary" className="no-default-active-elevate">
                  {latestSustainability.co2PerPaxKm} {t("digital.gPerPaxKm")}
                </Badge>
              </div>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden" dir="ltr">
                <div
                  className="absolute inset-y-0 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (latestSustainability.co2PerPaxKm / 120) * 100)}%`,
                    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.orange})`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1" dir="ltr">
                <span>0</span>
                <span>120</span>
              </div>
            </Card>

            <Card className="p-4" data-testid="card-fuel-intensity-gauge">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium">{t("digital.fuelIntensity")}</p>
                <Badge variant="secondary" className="no-default-active-elevate">
                  {latestSustainability.fuelPerAsk} {t("digital.lPerAsk")}
                </Badge>
              </div>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden" dir="ltr">
                <div
                  className="absolute inset-y-0 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (latestSustainability.fuelPerAsk / 5) * 100)}%`,
                    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.orange})`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1" dir="ltr">
                <span>0</span>
                <span>5.0</span>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">{t("digital.co2Emissions")} & {t("digital.fuelConsumption")} {t("digital.trend")}</h3>
              <div className="h-[200px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SUSTAINABILITY_QUARTERLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis
                      dataKey={language === "ar" ? "quarterAr" : "quarter"}
                      tick={{ fontSize: 10 }}
                      stroke="hsl(210, 6%, 50%)"
                    />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="co2"
                      name={language === "ar" ? "CO2 (مليون طن)" : "CO2 (M Tonnes)"}
                      stroke={COLORS.green}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="fuel"
                      name={language === "ar" ? "الوقود (مليار لتر)" : "Fuel (B Liters)"}
                      stroke={COLORS.orange}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" style={{ color: COLORS.blue }} />
              <h2 className="text-base font-semibold">{t("digital.digitalZone")}</h2>
              <SectionTooltip tooltip={language === "ar" ? "مؤشرات التحول الرقمي في خدمات الطيران" : "Digital transformation indicators for aviation services"} />
            </div>

            <div className="grid gap-3 grid-cols-2">
              <Card className="p-4" data-testid="card-e-checkins">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("digital.eCheckins")}</p>
                  <SectionTooltip tooltip={language === "ar" ? "عدد عمليات تسجيل الوصول الإلكتروني عبر التطبيقات والمواقع" : "Number of electronic check-ins via apps and websites"} />
                </div>
                <p className="text-2xl font-bold">{totalECheckins.toFixed(1)}{t("digital.million")}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-500">+14.2%</span>
                </div>
              </Card>

              <Card className="p-4" data-testid="card-e-tickets">
                <div className="flex items-center gap-2 mb-1">
                  <Ticket className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("digital.eTickets")}</p>
                  <SectionTooltip tooltip={language === "ar" ? "عدد التذاكر الإلكترونية المصدرة رقمياً" : "Number of electronically issued e-tickets"} />
                </div>
                <p className="text-2xl font-bold">{totalETickets.toFixed(1)}{t("digital.million")}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-500">+11.8%</span>
                </div>
              </Card>
            </div>

            <Card className="p-4" data-testid="card-digital-adoption">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium">{t("digital.digitalAdoption")}</p>
                <Badge variant="secondary" className="no-default-active-elevate">{digitalAdoptionRate}%</Badge>
              </div>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden" dir="ltr">
                <div
                  className="absolute inset-y-0 rounded-full transition-all"
                  style={{
                    width: `${digitalAdoptionRate}%`,
                    backgroundColor: COLORS.blue,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1" dir="ltr">
                <span>0%</span>
                <span>100%</span>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">{t("digital.eCheckins")} & {t("digital.eTickets")} {t("digital.trend")}</h3>
              <div className="h-[200px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DIGITAL_MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis
                      dataKey={language === "ar" ? "monthAr" : "month"}
                      tick={{ fontSize: 10 }}
                      stroke="hsl(210, 6%, 50%)"
                    />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}M`, ""]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="eCheckins"
                      name={language === "ar" ? "تسجيل الوصول" : "E-Check-ins"}
                      stroke={COLORS.blue}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="eTickets"
                      name={language === "ar" ? "التذاكر الإلكترونية" : "E-Tickets"}
                      stroke={COLORS.teal}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4" data-testid="card-digital-complaints">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("digital.digitalComplaints")}</p>
                <SectionTooltip tooltip={language === "ar" ? "عدد الشكاوى المقدمة عبر القنوات الرقمية" : "Number of complaints submitted through digital channels"} />
              </div>
              <p className="text-2xl font-bold">{(totalDigitalComplaints / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ar" ? "من إجمالي" : "of total"} {(totalComplaints / 1000).toFixed(1)}K
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" style={{ color: COLORS.orange }} />
              <h2 className="text-base font-semibold">{t("digital.customerExperience")}</h2>
              <SectionTooltip tooltip={language === "ar" ? "مؤشرات تجربة العملاء بما في ذلك التصنيفات والشكاوى" : "Customer experience indicators including rankings and complaints"} />
            </div>

            <Card className="p-4" data-testid="card-skytrax-rankings">
              <h3 className="text-sm font-medium mb-3">{t("digital.skytraxRankings")}</h3>
              <div className="space-y-3">
                {SKYTRAX_RANKINGS.map((item) => (
                  <div key={item.entity} className="flex items-center justify-between gap-2 flex-wrap" data-testid={`skytrax-${item.entity.replace(/\s+/g, "-").toLowerCase()}`}>
                    <div>
                      <p className="text-sm font-medium">{language === "ar" ? item.entityAr : item.entity}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: item.stars }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - item.stars }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-muted-foreground/30" />
                        ))}
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="text-lg font-bold">#{item.rank2026}</p>
                      <div className="flex items-center gap-1">
                        {item.rank2026 < item.rank2025 ? (
                          <ArrowUp className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs font-semibold ${item.rank2026 < item.rank2025 ? "text-emerald-500" : "text-red-500"}`}>
                          {Math.abs(item.rank2025 - item.rank2026)} {language === "ar" ? "مراكز" : "spots"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">{t("digital.totalComplaints")} {t("digital.trend")}</h3>
              <div className="h-[200px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DIGITAL_MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis
                      dataKey={language === "ar" ? "monthAr" : "month"}
                      tick={{ fontSize: 10 }}
                      stroke="hsl(210, 6%, 50%)"
                    />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(210, 5%, 96%)",
                        border: "1px solid hsl(210, 5%, 88%)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name={language === "ar" ? "إجمالي الشكاوى" : "Total Complaints"}
                      stroke={COLORS.red}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="digitalComplaints"
                      name={language === "ar" ? "الشكاوى الرقمية" : "Digital Complaints"}
                      stroke={COLORS.purple}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid gap-3 grid-cols-2">
              <Card className="p-4">
                <h3 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">{t("digital.complaintCategories")}</h3>
                <div className="h-[150px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={COMPLAINT_CATEGORIES}
                        dataKey="value"
                        nameKey={language === "ar" ? "nameAr" : "name"}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={55}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {COMPLAINT_CATEGORIES.map((_, index) => (
                          <Cell key={`cat-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(210, 5%, 96%)",
                          border: "1px solid hsl(210, 5%, 88%)",
                          borderRadius: "6px",
                          fontSize: "11px",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-1">
                  {COMPLAINT_CATEGORIES.slice(0, 3).map((cat, i) => (
                    <div key={cat.name} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i] }} />
                      <span className="text-[10px] text-muted-foreground truncate">{language === "ar" ? cat.nameAr : cat.name} ({cat.value}%)</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">{t("digital.complaintChannels")}</h3>
                <div className="h-[150px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={COMPLAINT_CHANNELS}
                        dataKey="value"
                        nameKey={language === "ar" ? "nameAr" : "name"}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={55}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {COMPLAINT_CHANNELS.map((_, index) => (
                          <Cell key={`ch-${index}`} fill={CHART_COLORS[(index + 5) % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(210, 5%, 96%)",
                          border: "1px solid hsl(210, 5%, 88%)",
                          borderRadius: "6px",
                          fontSize: "11px",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-1">
                  {COMPLAINT_CHANNELS.slice(0, 3).map((ch, i) => (
                    <div key={ch.name} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[(i + 5) % CHART_COLORS.length] }} />
                      <span className="text-[10px] text-muted-foreground truncate">{language === "ar" ? ch.nameAr : ch.name} ({ch.value}%)</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
