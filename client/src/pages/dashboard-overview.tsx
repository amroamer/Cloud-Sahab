import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Globe,
  Users,
  Package,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Plane,
  Building2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const trafficTrendData = [
  { month: "Mar", monthAr: "مارس", passengers: 9.8, flights: 82, lastYear: 9.1 },
  { month: "Apr", monthAr: "أبريل", passengers: 10.5, flights: 88, lastYear: 9.6 },
  { month: "May", monthAr: "مايو", passengers: 11.2, flights: 94, lastYear: 10.2 },
  { month: "Jun", monthAr: "يونيو", passengers: 12.8, flights: 102, lastYear: 11.5 },
  { month: "Jul", monthAr: "يوليو", passengers: 14.1, flights: 112, lastYear: 12.8 },
  { month: "Aug", monthAr: "أغسطس", passengers: 13.5, flights: 108, lastYear: 12.2 },
  { month: "Sep", monthAr: "سبتمبر", passengers: 11.0, flights: 92, lastYear: 10.0 },
  { month: "Oct", monthAr: "أكتوبر", passengers: 10.8, flights: 90, lastYear: 9.8 },
  { month: "Nov", monthAr: "نوفمبر", passengers: 10.2, flights: 86, lastYear: 9.3 },
  { month: "Dec", monthAr: "ديسمبر", passengers: 12.0, flights: 98, lastYear: 10.8 },
  { month: "Jan", monthAr: "يناير", passengers: 11.5, flights: 95, lastYear: 10.5 },
  { month: "Feb", monthAr: "فبراير", passengers: 12.4, flights: 100, lastYear: 11.2 },
];

const domesticIntlData = [
  { month: "Mar", domestic: 5.2, international: 4.6 },
  { month: "Apr", domestic: 5.5, international: 5.0 },
  { month: "May", domestic: 5.8, international: 5.4 },
  { month: "Jun", domestic: 6.5, international: 6.3 },
  { month: "Jul", domestic: 7.2, international: 6.9 },
  { month: "Aug", domestic: 6.8, international: 6.7 },
  { month: "Sep", domestic: 5.6, international: 5.4 },
  { month: "Oct", domestic: 5.5, international: 5.3 },
  { month: "Nov", domestic: 5.2, international: 5.0 },
  { month: "Dec", domestic: 6.2, international: 5.8 },
  { month: "Jan", domestic: 5.9, international: 5.6 },
  { month: "Feb", domestic: 6.4, international: 6.0 },
];

const splitPieData = [
  { name: "Domestic", nameAr: "محلي", value: 55, color: "hsl(210, 85%, 42%)" },
  { name: "International", nameAr: "دولي", value: 45, color: "hsl(185, 75%, 38%)" },
];

const topAirports = [
  { rank: 1, name: "King Abdulaziz Intl (KAIA)", nameAr: "مطار الملك عبدالعزيز الدولي", passengers: "28.2M", flights: "186K", yoy: 8.5, loadFactor: "81%" },
  { rank: 2, name: "King Khalid Intl (KKIA)", nameAr: "مطار الملك خالد الدولي", passengers: "24.8M", flights: "168K", yoy: 6.2, loadFactor: "79%" },
  { rank: 3, name: "King Fahd Intl (KFIA)", nameAr: "مطار الملك فهد الدولي", passengers: "12.5M", flights: "92K", yoy: 9.1, loadFactor: "76%" },
  { rank: 4, name: "Prince Mohammed (Madinah)", nameAr: "مطار الأمير محمد (المدينة)", passengers: "8.9M", flights: "64K", yoy: 11.2, loadFactor: "83%" },
  { rank: 5, name: "Abha Regional", nameAr: "مطار أبها الإقليمي", passengers: "4.2M", flights: "35K", yoy: 4.5, loadFactor: "72%" },
  { rank: 6, name: "Taif Regional", nameAr: "مطار الطائف الإقليمي", passengers: "3.8M", flights: "28K", yoy: 15.3, loadFactor: "68%" },
  { rank: 7, name: "Tabuk Regional", nameAr: "مطار تبوك الإقليمي", passengers: "2.9M", flights: "22K", yoy: 7.8, loadFactor: "71%" },
  { rank: 8, name: "Hail Regional", nameAr: "مطار حائل الإقليمي", passengers: "2.1M", flights: "18K", yoy: 5.4, loadFactor: "65%" },
  { rank: 9, name: "Jazan Regional", nameAr: "مطار جازان الإقليمي", passengers: "1.8M", flights: "15K", yoy: 12.1, loadFactor: "70%" },
  { rank: 10, name: "Yanbu Regional", nameAr: "مطار ينبع الإقليمي", passengers: "1.5M", flights: "12K", yoy: 9.8, loadFactor: "67%" },
];

const topAirlines = [
  { rank: 1, name: "Saudia", nameAr: "الخطوط السعودية", passengers: "32.5M", marketShare: "33.0%", flights: "195K", yoy: 5.8 },
  { rank: 2, name: "flynas", nameAr: "طيران ناس", passengers: "18.2M", marketShare: "18.5%", flights: "128K", yoy: 12.3 },
  { rank: 3, name: "flyadeal", nameAr: "طيران أديل", passengers: "12.8M", marketShare: "13.0%", flights: "95K", yoy: 15.1 },
  { rank: 4, name: "Riyadh Air", nameAr: "طيران الرياض", passengers: "8.5M", marketShare: "8.6%", flights: "52K", yoy: 142.0 },
  { rank: 5, name: "Emirates", nameAr: "طيران الإمارات", passengers: "4.2M", marketShare: "4.3%", flights: "22K", yoy: 3.2 },
  { rank: 6, name: "Qatar Airways", nameAr: "الخطوط القطرية", passengers: "3.8M", marketShare: "3.9%", flights: "18K", yoy: 4.5 },
  { rank: 7, name: "Turkish Airlines", nameAr: "الخطوط التركية", passengers: "3.5M", marketShare: "3.6%", flights: "16K", yoy: 6.8 },
  { rank: 8, name: "EgyptAir", nameAr: "مصر للطيران", passengers: "2.9M", marketShare: "2.9%", flights: "14K", yoy: 2.1 },
  { rank: 9, name: "Pakistan Intl (PIA)", nameAr: "الخطوط الباكستانية", passengers: "2.2M", marketShare: "2.2%", flights: "11K", yoy: -1.5 },
  { rank: 10, name: "Gulf Air", nameAr: "طيران الخليج", passengers: "1.8M", marketShare: "1.8%", flights: "9K", yoy: 3.9 },
];

const trajectoryData = [
  { year: "2020", actual: 42, target: 42 },
  { year: "2021", actual: 48, target: 70 },
  { year: "2022", actual: 58, target: 98 },
  { year: "2023", actual: 68, target: 126 },
  { year: "2024", actual: 76, target: 154 },
  { year: "2025", actual: 83, target: 182 },
  { year: "2026", actual: 87, target: 210 },
  { year: "2027", target: 222 },
  { year: "2028", target: 234 },
  { year: "2029", target: 242 },
  { year: "2030", target: 250 },
];

export default function DashboardOverview() {
  const { t, language } = useTranslation();
  const [granularity, setGranularity] = useState("monthly");

  const CHART_COLORS = {
    primary: "hsl(210, 85%, 42%)",
    secondary: "hsl(185, 75%, 38%)",
    tertiary: "hsl(28, 85%, 48%)",
    muted: "hsl(210, 8%, 70%)",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-dashboard-title">
              {t("dashboard.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("dashboard.dataAsOf")} {language === "ar" ? "٦ مارس ٢٠٢٦، ٠٨:٠٠ ص" : "March 6, 2026, 08:00 AM"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select defaultValue="ytd">
              <SelectTrigger className="w-[160px]" data-testid="select-date-range">
                <SelectValue placeholder={t("dashboard.dateRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">{t("dashboard.ytd")}</SelectItem>
                <SelectItem value="lastMonth">{t("dashboard.lastMonth")}</SelectItem>
                <SelectItem value="lastQuarter">{t("dashboard.lastQuarter")}</SelectItem>
                <SelectItem value="lastYear">{t("dashboard.lastYear")}</SelectItem>
                <SelectItem value="trailing12">{t("dashboard.trailing12")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" size="sm" data-testid="button-export-dashboard">
              <Download className="h-3.5 w-3.5" />
              {t("dashboard.export")}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard
            title={t("kpi.connectivity")}
            value="87"
            target="250"
            progress={34.8}
            change={5.2}
            sparklineData={[62, 65, 68, 71, 73, 75, 72, 78, 80, 82, 85, 87]}
            href="/dashboards/overview"
            icon={<Globe className="h-5 w-5" />}
            color="210 85% 42%"
          />
          <KpiCard
            title={t("kpi.travelers")}
            value="98.5M"
            target="330M"
            progress={29.8}
            change={7.2}
            sparklineData={[5.8, 6.2, 7.1, 8.5, 9.2, 10.1, 11.2, 10.8, 9.5, 11.5, 12.1, 12.4]}
            href="/dashboards/overview"
            icon={<Users className="h-5 w-5" />}
            color="185 75% 38%"
          />
          <KpiCard
            title={t("kpi.cargo")}
            value="852K"
            target="3M"
            progress={28.4}
            change={12.5}
            sparklineData={[55, 58, 62, 68, 72, 75, 71, 78, 82, 85, 88, 92]}
            href="/dashboards/overview"
            icon={<Package className="h-5 w-5" />}
            color="28 85% 48%"
          />
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className="text-base font-semibold">{t("dashboard.targetTrajectory")} - {t("kpi.connectivity")}</h2>
          </div>
          <div className="h-[280px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 6%, 50%)" domain={[0, 280]} />
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
                  dataKey="actual"
                  name={language === "ar" ? "الفعلي" : "Actual"}
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: CHART_COLORS.primary }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name={language === "ar" ? "المستهدف" : "Target Pace"}
                  stroke={CHART_COLORS.muted}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: CHART_COLORS.muted }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="text-base font-semibold">{t("dashboard.trafficTrend")}</h2>
              <Tabs value={granularity} onValueChange={setGranularity}>
                <TabsList>
                  <TabsTrigger value="monthly" data-testid="tab-monthly">{t("dashboard.monthly")}</TabsTrigger>
                  <TabsTrigger value="quarterly" data-testid="tab-quarterly">{t("dashboard.quarterly")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis
                    dataKey={language === "ar" ? "monthAr" : "month"}
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(210, 6%, 50%)"
                    label={{
                      value: language === "ar" ? "مليون مسافر" : "Passengers (M)",
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
                    formatter={(value: number) => [`${value}M`, ""]}
                  />
                  <Legend />
                  <defs>
                    <linearGradient id="gradPassengers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="passengers"
                    name={language === "ar" ? "المسافرون ٢٠٢٦" : "Passengers 2026"}
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                    fill="url(#gradPassengers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="lastYear"
                    name={language === "ar" ? "المسافرون ٢٠٢٥" : "Passengers 2025"}
                    stroke={CHART_COLORS.muted}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">{t("dashboard.domesticVsIntl")}</h2>
            <div className="h-[200px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={splitPieData}
                    dataKey="value"
                    nameKey={language === "ar" ? "nameAr" : "name"}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {splitPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 5%, 96%)",
                      border: "1px solid hsl(210, 5%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {splitPieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {language === "ar" ? item.nameAr : item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-base font-semibold">{t("dashboard.topAirports")}</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">{t("dashboard.rank")}</TableHead>
                    <TableHead>{t("dashboard.airport")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.passengers")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.flights")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.yoyChange")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.loadFactor")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topAirports.map((airport) => (
                    <TableRow key={airport.rank} className="cursor-pointer" data-testid={`row-airport-${airport.rank}`}>
                      <TableCell className="font-medium text-muted-foreground">{airport.rank}</TableCell>
                      <TableCell className="font-medium">{language === "ar" ? airport.nameAr : airport.name}</TableCell>
                      <TableCell className="text-right">{airport.passengers}</TableCell>
                      <TableCell className="text-right">{airport.flights}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${airport.yoy >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {airport.yoy >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {airport.yoy >= 0 ? "+" : ""}{airport.yoy}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{airport.loadFactor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2">
            <h2 className="text-base font-semibold mb-4">{t("dashboard.domesticVsIntl")} - {t("dashboard.trafficTrend")}</h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domesticIntlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
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
                  <Bar
                    dataKey="domestic"
                    name={language === "ar" ? "محلي" : "Domestic"}
                    fill={CHART_COLORS.primary}
                    radius={[3, 3, 0, 0]}
                    stackId="a"
                  />
                  <Bar
                    dataKey="international"
                    name={language === "ar" ? "دولي" : "International"}
                    fill={CHART_COLORS.secondary}
                    radius={[3, 3, 0, 0]}
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">{t("dashboard.topAirlines")}</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">{t("dashboard.rank")}</TableHead>
                  <TableHead>{t("dashboard.airline")}</TableHead>
                  <TableHead className="text-right">{t("dashboard.passengers")}</TableHead>
                  <TableHead className="text-right">{t("dashboard.marketShare")}</TableHead>
                  <TableHead className="text-right">{t("dashboard.flights")}</TableHead>
                  <TableHead className="text-right">{t("dashboard.yoyChange")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAirlines.map((airline) => (
                  <TableRow key={airline.rank} className="cursor-pointer" data-testid={`row-airline-${airline.rank}`}>
                    <TableCell className="font-medium text-muted-foreground">{airline.rank}</TableCell>
                    <TableCell className="font-medium">{language === "ar" ? airline.nameAr : airline.name}</TableCell>
                    <TableCell className="text-right">{airline.passengers}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="no-default-active-elevate">{airline.marketShare}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{airline.flights}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${airline.yoy >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                        {airline.yoy >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {airline.yoy >= 0 ? "+" : ""}{airline.yoy}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
