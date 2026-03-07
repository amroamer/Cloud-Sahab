import { useState, useMemo, useCallback, Fragment } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  ShoppingBag,
  Crown,
  RefreshCw,
  Search,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Star,
  X,
  BarChart3,
  Calendar,
  Target,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  Building2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  ComposedChart,
} from "recharts";
import {
  getTransactions,
  getDailyRevenue,
  aggregateByPeriod,
  getRevenueByCategory,
  getRevenueByBuyerType,
  getProductPerformance,
  getBuyerLeaderboard,
  getCalendarHeatmapData,
  getRevenueTargets,
  getKPIs,
  filterTransactions,
  getProductTransactions,
  DONUT_COLORS,
  BUYER_TYPE_COLORS,
  BUYER_ORGS,
  type BuyerType,
  type Transaction,
  type ProductPerformance,
  type BuyerLeaderboardEntry,
} from "@/lib/revenue-data";
import { CATALOG_PRODUCTS } from "@/lib/catalog-data";
import { useToast } from "@/hooks/use-toast";

function formatSAR(amount: number): string {
  if (amount >= 1000000) return `SAR ${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `SAR ${(amount / 1000).toFixed(1)}K`;
  return `SAR ${amount.toLocaleString()}`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

function MiniSparkline({ data, color = "#1ABC9C" }: { data: number[]; color?: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <div dir="ltr" className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#spark-${color.replace("#", "")})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function RevenueTrackerPage() {
  const { t, isRTL } = useTranslation();
  const { toast } = useToast();

  const [refreshKey, setRefreshKey] = useState(0);
  const [granularity, setGranularity] = useState<"daily" | "weekly" | "monthly" | "quarterly">("monthly");
  const [showCompare, setShowCompare] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBuyerType, setActiveBuyerType] = useState<BuyerType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"revenue" | "unitsSold" | "revenuePercent" | "avgRating">("revenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [frequencyFilter, setFrequencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [buyerSheetOpen, setBuyerSheetOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerLeaderboardEntry | null>(null);

  const transactions = useMemo(() => getTransactions(refreshKey), [refreshKey]);
  const kpis = useMemo(() => getKPIs(transactions), [transactions]);

  const filteredTx = useMemo(() => {
    return filterTransactions(transactions, {
      category: activeCategory || undefined,
      buyerType: activeBuyerType || undefined,
    });
  }, [transactions, activeCategory, activeBuyerType]);

  const dailyRevenue = useMemo(() => getDailyRevenue(filteredTx), [filteredTx]);
  const chartData = useMemo(() => aggregateByPeriod(dailyRevenue, granularity), [dailyRevenue, granularity]);
  const categoryData = useMemo(() => getRevenueByCategory(filteredTx), [filteredTx]);
  const buyerTypeData = useMemo(() => getRevenueByBuyerType(filteredTx), [filteredTx]);
  const productPerformance = useMemo(() => getProductPerformance(filteredTx), [filteredTx]);
  const buyerLeaderboard = useMemo(() => getBuyerLeaderboard(transactions), [transactions]);
  const heatmapData = useMemo(() => getCalendarHeatmapData(transactions), [transactions]);
  const targets = useMemo(() => getRevenueTargets(), [refreshKey]);

  const filteredProducts = useMemo(() => {
    let items = productPerformance;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.product.name.toLowerCase().includes(q) || p.product.category.toLowerCase().includes(q));
    }
    if (categoryFilter !== "all") items = items.filter((p) => p.product.category === categoryFilter);
    if (frequencyFilter !== "all") items = items.filter((p) => p.product.frequency === frequencyFilter);
    if (statusFilter !== "all") items = items.filter((p) => p.status === statusFilter);

    items.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      return mul * ((a[sortField] as number) - (b[sortField] as number));
    });
    return items;
  }, [productPerformance, searchQuery, categoryFilter, frequencyFilter, statusFilter, sortField, sortDir]);

  const handleSort = useCallback((field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  }, [sortField]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    toast({ title: t("rev.refreshed"), description: t("rev.refreshedDesc") });
  }, [toast, t]);

  const handleExport = useCallback((format: string, period: string) => {
    toast({ title: t("rev.exportStarted"), description: `${period} ${format.toUpperCase()} ${t("rev.exportQueued")}` });
    setExportMenuOpen(false);
  }, [toast, t]);

  const totalCategoryRevenue = categoryData.reduce((s, c) => s + c.revenue, 0);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-page-title">{t("rev.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("rev.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} data-testid="button-refresh">
              <RefreshCw className="h-4 w-4 me-1" />
              {t("rev.refresh")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4" data-testid="kpi-revenue-today">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.revenueToday")}</span>
            </div>
            <p className="text-2xl font-bold">{formatSAR(kpis.revenueToday)}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpis.revenueTodayChange >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span className={`text-xs font-medium ${kpis.revenueTodayChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {kpis.revenueTodayChange >= 0 ? "+" : ""}{kpis.revenueTodayChange.toFixed(1)}% {t("rev.vsLastWeek")}
              </span>
            </div>
          </Card>

          <Card className="p-4" data-testid="kpi-revenue-mtd">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10 text-blue-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.revenueMTD")}</span>
            </div>
            <p className="text-2xl font-bold">{formatSAR(kpis.revenueMTD)}</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={Math.min(kpis.mtdTargetPercent, 100)} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground">{kpis.mtdTargetPercent.toFixed(0)}%</span>
            </div>
          </Card>

          <Card className="p-4" data-testid="kpi-revenue-ytd">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-violet-500/10 text-violet-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.revenueYTD")}</span>
            </div>
            <p className="text-2xl font-bold">{formatSAR(kpis.revenueYTD)}</p>
            <MiniSparkline data={kpis.monthlyRevenueSparkline} color="#8B5CF6" />
          </Card>

          <Card className="p-4" data-testid="kpi-transactions-today">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500/10 text-amber-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.transactionsToday")}</span>
            </div>
            <p className="text-2xl font-bold">{kpis.transactionsToday}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t("rev.avgOrder")}: {formatSAR(Math.round(kpis.avgOrderValue))}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4" data-testid="kpi-active-buyers">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.activeBuyers")}</span>
            </div>
            <p className="text-2xl font-bold">{kpis.activeBuyers}</p>
            <p className="text-xs text-muted-foreground">{t("rev.last30days")}</p>
          </Card>

          <Card className="p-4" data-testid="kpi-new-buyers">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-500/10 text-green-600">
                <UserPlus className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.newBuyers")}</span>
            </div>
            <p className="text-2xl font-bold">{kpis.newBuyersThisMonth}</p>
            <p className="text-xs text-muted-foreground">{t("rev.thisMonth")}</p>
          </Card>

          <Card className="p-4" data-testid="kpi-best-selling">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.bestSelling")}</span>
            </div>
            <p className="text-sm font-semibold truncate">{kpis.bestSellingProduct.name}</p>
            <p className="text-xs text-muted-foreground">{kpis.bestSellingProduct.units} {t("rev.unitsSold")}</p>
          </Card>

          <Card className="p-4" data-testid="kpi-highest-revenue">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-500/10 text-rose-600">
                <Crown className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase">{t("rev.highestRevenue")}</span>
            </div>
            <p className="text-sm font-semibold truncate">{kpis.highestRevenueProduct.name}</p>
            <p className="text-xs text-muted-foreground">{formatSAR(kpis.highestRevenueProduct.revenue)}</p>
          </Card>
        </div>

        <Card className="p-5" data-testid="chart-revenue-trend">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h2 className="text-lg font-semibold">{t("rev.revenueTrend")}</h2>
            <div className="flex items-center gap-2">
              <Tabs value={granularity} onValueChange={(v) => setGranularity(v as typeof granularity)}>
                <TabsList className="h-8">
                  <TabsTrigger value="daily" className="text-xs px-2" data-testid="tab-daily">{t("rev.daily")}</TabsTrigger>
                  <TabsTrigger value="weekly" className="text-xs px-2" data-testid="tab-weekly">{t("rev.weekly")}</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs px-2" data-testid="tab-monthly">{t("rev.monthly")}</TabsTrigger>
                  <TabsTrigger value="quarterly" className="text-xs px-2" data-testid="tab-quarterly">{t("rev.quarterly")}</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant={showCompare ? "default" : "outline"}
                size="sm"
                onClick={() => setShowCompare(!showCompare)}
                data-testid="button-compare"
              >
                {t("rev.compare")}
              </Button>
            </div>
          </div>
          <div dir="ltr" className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="revenue" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="tx" orientation="right" tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  formatter={(value: number, name: string) =>
                    name === "transactions" ? [value, t("rev.transactions")] : [formatSAR(value), t("rev.revenue")]
                  }
                />
                <Bar yAxisId="revenue" dataKey="revenue" fill="#2E86C1" radius={[3, 3, 0, 0]} opacity={0.85} />
                <Line yAxisId="tx" type="monotone" dataKey="transactions" stroke="#F39C12" strokeWidth={2} dot={false} />
                {showCompare && (
                  <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#1B3A5C" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.5} />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5" data-testid="chart-revenue-category">
            <h2 className="text-lg font-semibold mb-4">{t("rev.revenueByCategory")}</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div dir="ltr" className="w-[220px] h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      dataKey="revenue"
                      nameKey="category"
                      onClick={(entry) => setActiveCategory(activeCategory === entry.category ? null : entry.category)}
                      cursor="pointer"
                    >
                      {categoryData.map((entry, idx) => (
                        <Cell
                          key={entry.category}
                          fill={DONUT_COLORS[idx % DONUT_COLORS.length]}
                          opacity={activeCategory && activeCategory !== entry.category ? 0.3 : 1}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => [formatSAR(value)]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">{t("rev.total")}</p>
                    <p className="text-sm font-bold">{formatSAR(totalCategoryRevenue)}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1.5 max-h-[220px] overflow-y-auto">
                {categoryData.map((cat, idx) => (
                  <button
                    key={cat.category}
                    className={`flex items-center gap-2 w-full px-2 py-1 rounded text-start text-sm transition-colors ${activeCategory === cat.category ? "bg-accent" : ""}`}
                    onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                    data-testid={`filter-category-${cat.category.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                    <span className="truncate flex-1">{cat.category}</span>
                    <span className="text-xs text-muted-foreground">{formatSAR(cat.revenue)}</span>
                    <span className="text-xs text-muted-foreground">({cat.percentage.toFixed(1)}%)</span>
                  </button>
                ))}
              </div>
            </div>
            {activeCategory && (
              <Button variant="ghost" size="sm" onClick={() => setActiveCategory(null)} className="mt-2">
                <X className="h-3 w-3 me-1" /> {t("rev.clearFilter")}
              </Button>
            )}
          </Card>

          <Card className="p-5" data-testid="chart-revenue-buyer-type">
            <h2 className="text-lg font-semibold mb-4">{t("rev.revenueByBuyerType")}</h2>
            <div dir="ltr" className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buyerTypeData} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="buyerType" tick={{ fontSize: 11 }} width={100} />
                  <RechartsTooltip
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? formatSAR(value) : value,
                      name === "revenue" ? t("rev.revenue") : t("rev.transactions"),
                    ]}
                  />
                  <Bar
                    dataKey="revenue"
                    radius={[0, 4, 4, 0]}
                    cursor="pointer"
                    onClick={(entry) => setActiveBuyerType(activeBuyerType === entry.buyerType ? null : entry.buyerType)}
                  >
                    {buyerTypeData.map((entry) => (
                      <Cell
                        key={entry.buyerType}
                        fill={BUYER_TYPE_COLORS[entry.buyerType]}
                        opacity={activeBuyerType && activeBuyerType !== entry.buyerType ? 0.3 : 1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {activeBuyerType && (
              <Button variant="ghost" size="sm" onClick={() => setActiveBuyerType(null)} className="mt-2">
                <X className="h-3 w-3 me-1" /> {t("rev.clearFilter")}
              </Button>
            )}
          </Card>
        </div>

        <Card className="p-5" data-testid="table-product-performance">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h2 className="text-lg font-semibold">{t("rev.productPerformance")}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("rev.searchProducts")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 h-8 w-48"
                  data-testid="input-search-products"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-8 w-36" data-testid="select-category-filter">
                  <SelectValue placeholder={t("rev.category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("rev.allCategories")}</SelectItem>
                  {["Traffic", "Connectivity", "Market Share", "Cargo", "Infrastructure", "Financial", "Fleet", "Sustainability", "Digital & CX", "Bundles"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                <SelectTrigger className="h-8 w-32" data-testid="select-frequency-filter">
                  <SelectValue placeholder={t("rev.frequency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("rev.allFreq")}</SelectItem>
                  <SelectItem value="Monthly">{t("rev.monthly")}</SelectItem>
                  <SelectItem value="Quarterly">{t("rev.quarterly")}</SelectItem>
                  <SelectItem value="Annual">{t("rev.annual")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-28" data-testid="select-status-filter">
                  <SelectValue placeholder={t("rev.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("rev.allStatus")}</SelectItem>
                  <SelectItem value="Active">{t("rev.active")}</SelectItem>
                  <SelectItem value="Draft">{t("rev.draft")}</SelectItem>
                  <SelectItem value="Archived">{t("rev.archived")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">{t("rev.productName")}</TableHead>
                  <TableHead>{t("rev.category")}</TableHead>
                  <TableHead>{t("rev.price")}</TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("unitsSold")}>
                    <div className="flex items-center gap-1">
                      {t("rev.unitsSoldCol")}
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("revenue")}>
                    <div className="flex items-center gap-1">
                      {t("rev.revenueCol")}
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("revenuePercent")}>
                    <div className="flex items-center gap-1">
                      % {t("rev.ofTotal")}
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>{t("rev.trend")}</TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("avgRating")}>
                    <div className="flex items-center gap-1">
                      {t("rev.rating")}
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>{t("rev.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((item) => (
                  <Fragment key={item.product.id}>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => setExpandedProduct(expandedProduct === item.product.id ? null : item.product.id)}
                      data-testid={`row-product-${item.product.id}`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {expandedProduct === item.product.id ? <ChevronUp className="h-3.5 w-3.5 shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 shrink-0" />}
                          <span className="truncate max-w-[200px]">{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{item.product.category}</Badge>
                      </TableCell>
                      <TableCell>{item.product.isFree ? t("rev.free") : `SAR ${item.product.price.toLocaleString()}`}</TableCell>
                      <TableCell>{item.unitsSold}</TableCell>
                      <TableCell className="font-semibold">{formatSAR(item.revenue)}</TableCell>
                      <TableCell>{item.revenuePercent.toFixed(1)}%</TableCell>
                      <TableCell><MiniSparkline data={item.monthlyRevenue} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs">{item.avgRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Active" ? "default" : item.status === "Draft" ? "secondary" : "outline"} className="text-xs">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>

                    {expandedProduct === item.product.id && (
                      <TableRow>
                        <TableCell colSpan={9} className="p-0 bg-muted/30">
                          <ProductDrillDown productId={item.product.id} transactions={transactions} t={t} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t("rev.showing")} {filteredProducts.length} {t("rev.of")} {productPerformance.length} {t("rev.products")}
          </p>
        </Card>

        <Card className="p-5" data-testid="table-buyer-leaderboard">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("rev.buyerLeaderboard")}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("xlsx", "Buyer List")}
              data-testid="button-export-buyers"
            >
              <Download className="h-4 w-4 me-1" />
              {t("rev.exportBuyerList")}
            </Button>
          </div>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">{t("rev.rank")}</TableHead>
                  <TableHead>{t("rev.organization")}</TableHead>
                  <TableHead>{t("rev.buyerType")}</TableHead>
                  <TableHead>{t("rev.country")}</TableHead>
                  <TableHead>{t("rev.purchases")}</TableHead>
                  <TableHead>{t("rev.totalSpend")}</TableHead>
                  <TableHead>{t("rev.lastPurchase")}</TableHead>
                  <TableHead>{t("rev.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyerLeaderboard.map((entry) => (
                  <TableRow
                    key={entry.org.id}
                    className="cursor-pointer"
                    onClick={() => { setSelectedBuyer(entry); setBuyerSheetOpen(true); }}
                    data-testid={`row-buyer-${entry.org.id}`}
                  >
                    <TableCell>
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-bold">
                        {entry.rank <= 3 ? (
                          <span className={entry.rank === 1 ? "text-amber-500" : entry.rank === 2 ? "text-slate-400" : "text-orange-600"}>
                            {entry.rank}
                          </span>
                        ) : entry.rank}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{entry.org.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{entry.org.type}</Badge>
                    </TableCell>
                    <TableCell>{entry.org.country}</TableCell>
                    <TableCell>{entry.totalPurchases}</TableCell>
                    <TableCell className="font-semibold">{formatSAR(entry.totalSpend)}</TableCell>
                    <TableCell className="text-sm">{entry.lastPurchaseDate}</TableCell>
                    <TableCell>
                      <Badge variant={entry.org.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {entry.org.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-5" data-testid="chart-revenue-heatmap">
          <h2 className="text-lg font-semibold mb-4">{t("rev.revenueHeatmap")}</h2>
          <RevenueHeatmap heatmapData={heatmapData} t={t} />
        </Card>

        <Card className="p-5" data-testid="section-targets">
          <h2 className="text-lg font-semibold mb-4">{t("rev.targetsForecasting")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TargetCard
              label={t("rev.monthlyTarget")}
              actual={targets.monthly.actual}
              target={targets.monthly.target}
              projected={targets.monthly.projected}
              daysRemaining={targets.monthly.daysRemaining}
              onPace={targets.monthly.onPace}
              t={t}
            />
            <TargetCard
              label={t("rev.quarterlyTarget")}
              actual={targets.quarterly.actual}
              target={targets.quarterly.target}
              projected={targets.quarterly.projected}
              daysRemaining={targets.quarterly.daysRemaining}
              onPace={targets.quarterly.onPace}
              t={t}
            />
            <TargetCard
              label={t("rev.annualTarget")}
              actual={targets.annual.actual}
              target={targets.annual.target}
              projected={targets.annual.projected}
              daysRemaining={targets.annual.daysRemaining}
              onPace={targets.annual.onPace}
              t={t}
            />
          </div>
        </Card>

        <Card className="p-5" data-testid="section-export">
          <h2 className="text-lg font-semibold mb-4">{t("rev.exportReporting")}</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => handleExport("pdf", "Monthly Summary")} data-testid="button-export-monthly-pdf">
              <FileText className="h-4 w-4 me-2" />
              {t("rev.monthlyPDF")}
            </Button>
            <Button variant="outline" onClick={() => handleExport("xlsx", "Monthly Summary")} data-testid="button-export-monthly-xlsx">
              <Download className="h-4 w-4 me-2" />
              {t("rev.monthlyXLSX")}
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf", "Quarterly Summary")} data-testid="button-export-quarterly-pdf">
              <FileText className="h-4 w-4 me-2" />
              {t("rev.quarterlyPDF")}
            </Button>
            <Button variant="outline" onClick={() => handleExport("xlsx", "Annual Summary")} data-testid="button-export-annual-xlsx">
              <Download className="h-4 w-4 me-2" />
              {t("rev.annualXLSX")}
            </Button>
            <Separator orientation="vertical" className="h-9" />
            <Button variant="outline" onClick={() => handleExport("xlsx", "All Transactions")} data-testid="button-export-all-tx">
              <Download className="h-4 w-4 me-2" />
              {t("rev.exportAllTx")}
            </Button>
            <Button variant="outline" onClick={() => toast({ title: t("rev.scheduleReport"), description: t("rev.scheduleDesc") })} data-testid="button-schedule-report">
              <Clock className="h-4 w-4 me-2" />
              {t("rev.scheduleReport")}
            </Button>
          </div>
        </Card>

        <Sheet open={buyerSheetOpen} onOpenChange={setBuyerSheetOpen}>
          <SheetContent side={isRTL ? "left" : "right"} className="w-[420px] sm:w-[540px]">
            {selectedBuyer && (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedBuyer.org.name}</SheetTitle>
                </SheetHeader>
                <BuyerDetailPanel buyer={selectedBuyer} transactions={transactions} t={t} />
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </ScrollArea>
  );
}

function ProductDrillDown({ productId, transactions, t }: { productId: string; transactions: Transaction[]; t: (k: string, p?: Record<string, string>) => string }) {
  const data = useMemo(() => getProductTransactions(transactions, productId), [transactions, productId]);
  const product = CATALOG_PRODUCTS.find((p) => p.id === productId);

  if (!product) return null;

  return (
    <div className="p-5 space-y-5" data-testid={`drilldown-${productId}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold text-base mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{product.description.substring(0, 120)}...</p>
          <div className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">{t("rev.price")}:</span> SAR {product.price.toLocaleString()}</p>
            <p><span className="text-muted-foreground">{t("rev.format")}:</span> {product.format}</p>
            <p>
              <span className="text-muted-foreground">{t("rev.rating")}:</span>{" "}
              <Star className="h-3 w-3 text-amber-500 fill-amber-500 inline" /> {product.rating.toFixed(1)} ({product.reviewCount} {t("rev.reviews")})
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{t("rev.lifetimeRevenue")}</p>
          <p className="text-2xl font-bold">{formatSAR(data.totalRevenue)}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("rev.totalUnitsSold")}</p>
          <p className="text-xl font-semibold">{data.totalUnits}</p>
        </div>

        <div dir="ltr" className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthlyRevenue}>
              <defs>
                <linearGradient id="drillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E86C1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2E86C1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Area type="monotone" dataKey="revenue" stroke="#2E86C1" fill="url(#drillGrad)" strokeWidth={2} />
              <RechartsTooltip formatter={(value: number) => [formatSAR(value), t("rev.revenue")]} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2">{t("rev.topBuyers")}</h4>
          <div className="space-y-1.5">
            {data.topBuyers.map((b, i) => (
              <div key={b.org.id} className="flex items-center justify-between text-sm px-2 py-1 rounded bg-muted/50">
                <span className="truncate flex-1">{i + 1}. {b.org.name}</span>
                <span className="text-muted-foreground ms-2">{b.purchaseCount}x</span>
                <span className="font-medium ms-2">{formatSAR(b.totalSpent)}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">{t("rev.geoBreakdown")}</h4>
          <div dir="ltr" className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.geoBreakdown} cx="50%" cy="50%" outerRadius={60} dataKey="revenue" nameKey="country" label={({ country }) => country}>
                  {data.geoBreakdown.map((_, idx) => (
                    <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number) => [formatSAR(value)]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">{t("rev.recentPurchases")}</h4>
        <div className="rounded-md border overflow-auto max-h-[200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("rev.date")}</TableHead>
                <TableHead>{t("rev.buyer")}</TableHead>
                <TableHead>{t("rev.amount")}</TableHead>
                <TableHead>{t("rev.payment")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentTransactions.slice(0, 10).map((tx) => {
                const buyer = BUYER_ORGS.find((b) => b.id === tx.buyerOrgId);
                return (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm">{tx.date}</TableCell>
                    <TableCell className="text-sm">{buyer?.name || "Unknown"}</TableCell>
                    <TableCell className="text-sm font-medium">{formatSAR(tx.amount)}</TableCell>
                    <TableCell className="text-sm">{tx.paymentMethod}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => {}} data-testid="button-edit-price">
          <DollarSign className="h-3.5 w-3.5 me-1" /> {t("rev.editPrice")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => {}} data-testid="button-set-featured">
          <Star className="h-3.5 w-3.5 me-1" /> {t("rev.setFeatured")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => {}} data-testid="button-archive">
          <X className="h-3.5 w-3.5 me-1" /> {t("rev.archive")}
        </Button>
      </div>
    </div>
  );
}

function RevenueHeatmap({ heatmapData, t }: { heatmapData: Map<string, { revenue: number; transactions: number }>; t: (k: string) => string }) {
  const { weeks, months, maxRevenue } = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: { date: string; revenue: number; transactions: number; day: number }[][] = [];
    let currentWeek: { date: string; revenue: number; transactions: number; day: number }[] = [];
    let maxRev = 0;

    const monthSet = new Map<number, string>();

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const data = heatmapData.get(dateStr) || { revenue: 0, transactions: 0 };
      if (data.revenue > maxRev) maxRev = data.revenue;

      currentWeek.push({ date: dateStr, revenue: data.revenue, transactions: data.transactions, day: d.getDay() });

      if (d.getDay() === 6 || d.getTime() === today.getTime()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      if (d.getDate() === 1) {
        monthSet.set(weeks.length, d.toLocaleString("en", { month: "short" }));
      }
    }

    return { weeks, months: monthSet, maxRevenue: maxRev };
  }, [heatmapData]);

  const getColor = (revenue: number) => {
    if (revenue === 0) return "bg-muted";
    const intensity = revenue / maxRevenue;
    if (intensity < 0.25) return "bg-emerald-200 dark:bg-emerald-900";
    if (intensity < 0.5) return "bg-emerald-400 dark:bg-emerald-700";
    if (intensity < 0.75) return "bg-emerald-500 dark:bg-emerald-500";
    return "bg-emerald-700 dark:bg-emerald-400";
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[2px] min-w-[700px]" dir="ltr">
        <div className="flex flex-col gap-[2px] text-[10px] text-muted-foreground pe-1 pt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="h-[13px] flex items-center">{d}</div>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex gap-[2px] mb-1">
            {weeks.map((_, wIdx) => (
              <div key={wIdx} className="w-[13px] text-[9px] text-muted-foreground text-center">
                {months.get(wIdx) || ""}
              </div>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[2px]">
                {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                  const cell = week.find((c) => c.day === dayIdx);
                  if (!cell) return <div key={dayIdx} className="w-[13px] h-[13px]" />;
                  return (
                    <TooltipProvider key={dayIdx} delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`w-[13px] h-[13px] rounded-[2px] ${getColor(cell.revenue)} cursor-pointer`} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs font-medium">{cell.date}</p>
                          <p className="text-xs">{t("rev.revenue")}: {formatSAR(cell.revenue)}</p>
                          <p className="text-xs">{t("rev.transactions")}: {cell.transactions}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground" dir="ltr">
        <span>{t("rev.less")}</span>
        <div className="flex gap-[2px]">
          <div className="w-[13px] h-[13px] rounded-[2px] bg-muted" />
          <div className="w-[13px] h-[13px] rounded-[2px] bg-emerald-200 dark:bg-emerald-900" />
          <div className="w-[13px] h-[13px] rounded-[2px] bg-emerald-400 dark:bg-emerald-700" />
          <div className="w-[13px] h-[13px] rounded-[2px] bg-emerald-500 dark:bg-emerald-500" />
          <div className="w-[13px] h-[13px] rounded-[2px] bg-emerald-700 dark:bg-emerald-400" />
        </div>
        <span>{t("rev.more")}</span>
      </div>
    </div>
  );
}

function TargetCard({
  label, actual, target, projected, daysRemaining, onPace, t,
}: {
  label: string; actual: number; target: number; projected: number; daysRemaining: number; onPace: boolean;
  t: (k: string, p?: Record<string, string>) => string;
}) {
  const percent = Math.min((actual / target) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{label}</span>
        <Badge variant={onPace ? "default" : "destructive"} className="text-xs">
          {onPace ? (
            <><CheckCircle className="h-3 w-3 me-1" /> {t("rev.onPace")}</>
          ) : (
            <><AlertCircle className="h-3 w-3 me-1" /> {t("rev.behindPace")}</>
          )}
        </Badge>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold">{formatSAR(actual)}</span>
        <span className="text-sm text-muted-foreground">/ {formatSAR(target)}</span>
      </div>
      <Progress value={percent} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t("rev.projected")}: {formatSAR(Math.round(projected))}</span>
        <span>{daysRemaining} {t("rev.daysRemaining")}</span>
      </div>
    </div>
  );
}

function BuyerDetailPanel({ buyer, transactions, t }: { buyer: BuyerLeaderboardEntry; transactions: Transaction[]; t: (k: string) => string }) {
  const buyerTx = useMemo(
    () => transactions.filter((tx) => tx.buyerOrgId === buyer.org.id).sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, buyer.org.id]
  );

  const productMap = new Map(CATALOG_PRODUCTS.map((p) => [p.id, p]));

  return (
    <div className="mt-6 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{buyer.org.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">{t("rev.buyerType")}:</span>
            <Badge variant="outline" className="ms-1 text-xs">{buyer.org.type}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">{t("rev.country")}:</span>{" "}
            <span>{buyer.org.country}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t("rev.status")}:</span>{" "}
            <Badge variant={buyer.org.status === "Active" ? "default" : "secondary"} className="text-xs">{buyer.org.status}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">{t("rev.since")}:</span>{" "}
            <span>{buyer.org.firstPurchaseDate}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xl font-bold">{formatSAR(buyer.totalSpend)}</p>
          <p className="text-xs text-muted-foreground">{t("rev.totalSpend")}</p>
        </div>
        <div>
          <p className="text-xl font-bold">{buyer.totalPurchases}</p>
          <p className="text-xs text-muted-foreground">{t("rev.purchases")}</p>
        </div>
        <div>
          <p className="text-xl font-bold">{buyer.products.length}</p>
          <p className="text-xs text-muted-foreground">{t("rev.products")}</p>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium text-sm mb-2">{t("rev.purchaseHistory")}</h4>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {buyerTx.slice(0, 30).map((tx) => {
              const product = productMap.get(tx.productId);
              return (
                <div key={tx.id} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{product?.name || tx.productId}</p>
                    <p className="text-xs text-muted-foreground">{tx.date} · {tx.paymentMethod}</p>
                  </div>
                  <span className="font-semibold ms-2">{formatSAR(tx.amount)}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
