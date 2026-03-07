import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, type CatalogProduct } from "./catalog-data";

export type BuyerType = "Airlines" | "Airport Operators" | "Investors" | "Consulting Firms" | "Researchers" | "Government Agencies" | "Travel Tech" | "Media" | "Other";

export interface BuyerOrg {
  id: string;
  name: string;
  type: BuyerType;
  country: string;
  region: string;
  status: "Active" | "Inactive";
  firstPurchaseDate: string;
  contactEmail: string;
}

export interface Transaction {
  id: string;
  date: string;
  productId: string;
  buyerOrgId: string;
  amount: number;
  paymentMethod: "Credit Card" | "Bank Transfer" | "Invoice" | "Platform Credits";
  downloadCount: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  transactions: number;
}

export interface ProductPerformance {
  product: CatalogProduct;
  unitsSold: number;
  revenue: number;
  revenuePercent: number;
  avgRating: number;
  status: "Active" | "Draft" | "Archived";
  monthlyRevenue: number[];
}

export interface BuyerLeaderboardEntry {
  rank: number;
  org: BuyerOrg;
  totalPurchases: number;
  totalSpend: number;
  lastPurchaseDate: string;
  products: string[];
}

const BUYER_TYPES: BuyerType[] = ["Airlines", "Airport Operators", "Investors", "Consulting Firms", "Researchers", "Government Agencies", "Travel Tech", "Media", "Other"];

export const BUYER_ORGS: BuyerOrg[] = [
  { id: "b1", name: "Saudi Arabian Airlines (Saudia)", type: "Airlines", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-15", contactEmail: "data@saudia.com" },
  { id: "b2", name: "flynas", type: "Airlines", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-02-20", contactEmail: "analytics@flynas.com" },
  { id: "b3", name: "flyadeal", type: "Airlines", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-03-10", contactEmail: "ops@flyadeal.com" },
  { id: "b4", name: "Emirates Group", type: "Airlines", country: "UAE", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-05", contactEmail: "research@emirates.com" },
  { id: "b5", name: "Qatar Airways", type: "Airlines", country: "Qatar", region: "Middle East", status: "Active", firstPurchaseDate: "2024-04-12", contactEmail: "data@qatarairways.com" },
  { id: "b6", name: "Turkish Airlines", type: "Airlines", country: "Turkey", region: "Europe", status: "Active", firstPurchaseDate: "2024-05-08", contactEmail: "analytics@thy.com" },
  { id: "b7", name: "DAMMAM Airports Company", type: "Airport Operators", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-20", contactEmail: "data@daco.sa" },
  { id: "b8", name: "MATARAT Holding", type: "Airport Operators", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-02-01", contactEmail: "insights@matarat.sa" },
  { id: "b9", name: "Riyadh Airports Company", type: "Airport Operators", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-10", contactEmail: "data@riyadhairports.sa" },
  { id: "b10", name: "Jeddah Airports Company", type: "Airport Operators", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-03-15", contactEmail: "analytics@jac.sa" },
  { id: "b11", name: "McKinsey & Company", type: "Consulting Firms", country: "USA", region: "North America", status: "Active", firstPurchaseDate: "2024-02-28", contactEmail: "ksa@mckinsey.com" },
  { id: "b12", name: "Boston Consulting Group", type: "Consulting Firms", country: "USA", region: "North America", status: "Active", firstPurchaseDate: "2024-04-05", contactEmail: "riyadh@bcg.com" },
  { id: "b13", name: "Oliver Wyman", type: "Consulting Firms", country: "UK", region: "Europe", status: "Active", firstPurchaseDate: "2024-06-01", contactEmail: "aviation@oliverwyman.com" },
  { id: "b14", name: "Public Investment Fund (PIF)", type: "Investors", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-08", contactEmail: "research@pif.gov.sa" },
  { id: "b15", name: "Saudi Tourism Authority", type: "Government Agencies", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-02-10", contactEmail: "data@sta.gov.sa" },
  { id: "b16", name: "IATA", type: "Other", country: "Switzerland", region: "Europe", status: "Active", firstPurchaseDate: "2024-03-20", contactEmail: "stats@iata.org" },
  { id: "b17", name: "ACI World", type: "Other", country: "Canada", region: "North America", status: "Active", firstPurchaseDate: "2024-05-15", contactEmail: "research@aci.aero" },
  { id: "b18", name: "Amadeus IT Group", type: "Travel Tech", country: "Spain", region: "Europe", status: "Active", firstPurchaseDate: "2024-04-22", contactEmail: "data@amadeus.com" },
  { id: "b19", name: "Sabre Corporation", type: "Travel Tech", country: "USA", region: "North America", status: "Active", firstPurchaseDate: "2024-06-10", contactEmail: "analytics@sabre.com" },
  { id: "b20", name: "Travelport", type: "Travel Tech", country: "UK", region: "Europe", status: "Active", firstPurchaseDate: "2024-07-01", contactEmail: "data@travelport.com" },
  { id: "b21", name: "KAUST Research", type: "Researchers", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-03-05", contactEmail: "research@kaust.edu.sa" },
  { id: "b22", name: "King Fahd University", type: "Researchers", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-08-12", contactEmail: "aviation@kfupm.edu.sa" },
  { id: "b23", name: "Aviation Week Network", type: "Media", country: "USA", region: "North America", status: "Active", firstPurchaseDate: "2024-05-20", contactEmail: "data@aviationweek.com" },
  { id: "b24", name: "FlightGlobal", type: "Media", country: "UK", region: "Europe", status: "Active", firstPurchaseDate: "2024-09-01", contactEmail: "research@flightglobal.com" },
  { id: "b25", name: "Ministry of Transport", type: "Government Agencies", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-01-25", contactEmail: "analytics@mot.gov.sa" },
  { id: "b26", name: "Neom Aviation", type: "Airport Operators", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-07-15", contactEmail: "ops@neom.com" },
  { id: "b27", name: "Gulf Air", type: "Airlines", country: "Bahrain", region: "Middle East", status: "Active", firstPurchaseDate: "2024-06-20", contactEmail: "data@gulfair.com" },
  { id: "b28", name: "Cirium", type: "Travel Tech", country: "UK", region: "Europe", status: "Active", firstPurchaseDate: "2024-08-05", contactEmail: "analytics@cirium.com" },
  { id: "b29", name: "Roland Berger", type: "Consulting Firms", country: "Germany", region: "Europe", status: "Inactive", firstPurchaseDate: "2024-04-18", contactEmail: "aviation@rolandberger.com" },
  { id: "b30", name: "General Authority of Statistics", type: "Government Agencies", country: "Saudi Arabia", region: "Middle East", status: "Active", firstPurchaseDate: "2024-02-15", contactEmail: "data@stats.gov.sa" },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateTransactions(): Transaction[] {
  const rand = seededRandom(42);
  const transactions: Transaction[] = [];
  const products = CATALOG_PRODUCTS;
  const paymentMethods: Transaction["paymentMethod"][] = ["Credit Card", "Bank Transfer", "Invoice", "Platform Credits"];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);

  const productWeights = products.map((p) => {
    if (p.category === "Traffic") return 3;
    if (p.category === "Connectivity") return 2.5;
    if (p.category === "Financial") return 2;
    if (p.category === "Market Share") return 1.8;
    if (p.category === "Cargo") return 1.5;
    if (p.isFree) return 0.5;
    return 1;
  });

  const buyerWeights = BUYER_ORGS.map((b) => {
    if (b.type === "Airlines") return 3;
    if (b.type === "Airport Operators") return 2.5;
    if (b.type === "Government Agencies") return 2;
    if (b.type === "Consulting Firms") return 1.8;
    if (b.type === "Investors") return 1.5;
    return 1;
  });

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const month = d.getMonth();

    let baseTx = 3 + Math.floor(rand() * 5);
    if (dayOfWeek === 5 || dayOfWeek === 6) baseTx = Math.max(1, baseTx - 2);
    if (month === 0 || month === 6) baseTx += 2;
    if (month === 2 || month === 3) baseTx += 1;

    for (let t = 0; t < baseTx; t++) {
      const pIdx = weightedPick(productWeights, rand);
      const bIdx = weightedPick(buyerWeights, rand);
      const product = products[pIdx];
      const buyer = BUYER_ORGS[bIdx];

      const price = product.isFree ? 0 : product.price * (0.85 + rand() * 0.3);

      transactions.push({
        id: `tx-${transactions.length + 1}`,
        date: d.toISOString().split("T")[0],
        productId: product.id,
        buyerOrgId: buyer.id,
        amount: Math.round(price),
        paymentMethod: paymentMethods[Math.floor(rand() * paymentMethods.length)],
        downloadCount: 1 + Math.floor(rand() * 5),
      });
    }
  }
  return transactions;
}

function weightedPick(weights: number[], rand: () => number): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

let _cachedTransactions: Transaction[] | null = null;
let _cacheKey = 0;
export function getTransactions(refreshKey?: number): Transaction[] {
  if (!_cachedTransactions || (refreshKey !== undefined && refreshKey !== _cacheKey)) {
    _cacheKey = refreshKey ?? 0;
    _cachedTransactions = generateTransactions();
  }
  return _cachedTransactions;
}

export function getDailyRevenue(transactions: Transaction[]): DailyRevenue[] {
  const map = new Map<string, DailyRevenue>();
  for (const tx of transactions) {
    const existing = map.get(tx.date);
    if (existing) {
      existing.revenue += tx.amount;
      existing.transactions += 1;
    } else {
      map.set(tx.date, { date: tx.date, revenue: tx.amount, transactions: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function aggregateByPeriod(daily: DailyRevenue[], granularity: "daily" | "weekly" | "monthly" | "quarterly"): DailyRevenue[] {
  if (granularity === "daily") return daily;

  const map = new Map<string, DailyRevenue>();
  for (const d of daily) {
    let key: string;
    const date = new Date(d.date);
    if (granularity === "weekly") {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      key = startOfWeek.toISOString().split("T")[0];
    } else if (granularity === "monthly") {
      key = d.date.substring(0, 7);
    } else {
      const q = Math.floor(date.getMonth() / 3) + 1;
      key = `${date.getFullYear()}-Q${q}`;
    }
    const existing = map.get(key);
    if (existing) {
      existing.revenue += d.revenue;
      existing.transactions += d.transactions;
    } else {
      map.set(key, { date: key, revenue: d.revenue, transactions: d.transactions });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function getRevenueByCategory(transactions: Transaction[]): { category: string; revenue: number; percentage: number }[] {
  const products = CATALOG_PRODUCTS;
  const productMap = new Map(products.map((p) => [p.id, p]));
  const catMap = new Map<string, number>();
  let total = 0;

  for (const tx of transactions) {
    const product = productMap.get(tx.productId);
    if (product) {
      const cat = product.category;
      catMap.set(cat, (catMap.get(cat) || 0) + tx.amount);
      total += tx.amount;
    }
  }

  return Array.from(catMap.entries())
    .map(([category, revenue]) => ({
      category,
      revenue,
      percentage: total > 0 ? (revenue / total) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getRevenueByBuyerType(transactions: Transaction[]): { buyerType: BuyerType; revenue: number; transactions: number }[] {
  const buyerMap = new Map(BUYER_ORGS.map((b) => [b.id, b]));
  const typeMap = new Map<BuyerType, { revenue: number; transactions: number }>();

  for (const tx of transactions) {
    const buyer = buyerMap.get(tx.buyerOrgId);
    if (buyer) {
      const existing = typeMap.get(buyer.type);
      if (existing) {
        existing.revenue += tx.amount;
        existing.transactions += 1;
      } else {
        typeMap.set(buyer.type, { revenue: tx.amount, transactions: 1 });
      }
    }
  }

  return Array.from(typeMap.entries())
    .map(([buyerType, data]) => ({ buyerType, ...data }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getProductPerformance(transactions: Transaction[]): ProductPerformance[] {
  const productMap = new Map<string, { units: number; revenue: number; monthlyRev: Map<string, number> }>();
  let totalRevenue = 0;

  for (const tx of transactions) {
    const existing = productMap.get(tx.productId);
    const monthKey = tx.date.substring(0, 7);
    if (existing) {
      existing.units += 1;
      existing.revenue += tx.amount;
      existing.monthlyRev.set(monthKey, (existing.monthlyRev.get(monthKey) || 0) + tx.amount);
    } else {
      const monthlyRev = new Map<string, number>();
      monthlyRev.set(monthKey, tx.amount);
      productMap.set(tx.productId, { units: 1, revenue: tx.amount, monthlyRev });
    }
    totalRevenue += tx.amount;
  }

  const catalogMap = new Map(CATALOG_PRODUCTS.map((p) => [p.id, p]));
  const today = new Date();
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  return CATALOG_PRODUCTS.map((product) => {
    const data = productMap.get(product.id);
    const units = data?.units || 0;
    const revenue = data?.revenue || 0;
    const monthlyRevenue = months.map((m) => data?.monthlyRev.get(m) || 0);

    return {
      product,
      unitsSold: units,
      revenue,
      revenuePercent: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0,
      avgRating: product.rating,
      status: product.isFree ? "Active" as const : (units > 5 ? "Active" as const : "Draft" as const),
      monthlyRevenue,
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

export function getBuyerLeaderboard(transactions: Transaction[]): BuyerLeaderboardEntry[] {
  const buyerStats = new Map<string, { spend: number; count: number; lastDate: string; products: Set<string> }>();

  for (const tx of transactions) {
    const existing = buyerStats.get(tx.buyerOrgId);
    if (existing) {
      existing.spend += tx.amount;
      existing.count += 1;
      if (tx.date > existing.lastDate) existing.lastDate = tx.date;
      existing.products.add(tx.productId);
    } else {
      buyerStats.set(tx.buyerOrgId, {
        spend: tx.amount,
        count: 1,
        lastDate: tx.date,
        products: new Set([tx.productId]),
      });
    }
  }

  const orgMap = new Map(BUYER_ORGS.map((b) => [b.id, b]));

  return Array.from(buyerStats.entries())
    .map(([orgId, stats]) => ({
      rank: 0,
      org: orgMap.get(orgId)!,
      totalPurchases: stats.count,
      totalSpend: stats.spend,
      lastPurchaseDate: stats.lastDate,
      products: Array.from(stats.products),
    }))
    .filter((e) => e.org)
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 20)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

export function getCalendarHeatmapData(transactions: Transaction[]): Map<string, { revenue: number; transactions: number }> {
  const map = new Map<string, { revenue: number; transactions: number }>();
  for (const tx of transactions) {
    const existing = map.get(tx.date);
    if (existing) {
      existing.revenue += tx.amount;
      existing.transactions += 1;
    } else {
      map.set(tx.date, { revenue: tx.amount, transactions: 1 });
    }
  }
  return map;
}

export function getRevenueTargets() {
  const transactions = getTransactions();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyTarget = 850000;
  const quarterlyTarget = 2500000;
  const annualTarget = 10000000;

  const mtdTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const mtdRevenue = mtdTransactions.reduce((s, tx) => s + tx.amount, 0);

  const currentQuarter = Math.floor(currentMonth / 3);
  const qtdTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return Math.floor(d.getMonth() / 3) === currentQuarter && d.getFullYear() === currentYear;
  });
  const qtdRevenue = qtdTransactions.reduce((s, tx) => s + tx.amount, 0);

  const ytdTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getFullYear() === currentYear;
  });
  const ytdRevenue = ytdTransactions.reduce((s, tx) => s + tx.amount, 0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayOfMonth = today.getDate();
  const daysRemainingMonth = daysInMonth - dayOfMonth;
  const dailyRunRate = dayOfMonth > 0 ? mtdRevenue / dayOfMonth : 0;
  const projectedMonthly = mtdRevenue + dailyRunRate * daysRemainingMonth;

  const quarterStartMonth = currentQuarter * 3;
  const quarterEndMonth = quarterStartMonth + 3;
  const daysInQuarter = Math.round(((new Date(currentYear, quarterEndMonth, 0).getTime() - new Date(currentYear, quarterStartMonth, 0).getTime()) / 86400000));
  const dayOfQuarter = Math.round(((today.getTime() - new Date(currentYear, quarterStartMonth, 1).getTime()) / 86400000)) + 1;
  const quarterDailyRate = dayOfQuarter > 0 ? qtdRevenue / dayOfQuarter : 0;
  const projectedQuarterly = qtdRevenue + quarterDailyRate * (daysInQuarter - dayOfQuarter);

  return {
    monthly: { target: monthlyTarget, actual: mtdRevenue, projected: projectedMonthly, daysRemaining: daysRemainingMonth, onPace: projectedMonthly >= monthlyTarget },
    quarterly: { target: quarterlyTarget, actual: qtdRevenue, projected: projectedQuarterly, daysRemaining: daysInQuarter - dayOfQuarter, onPace: projectedQuarterly >= quarterlyTarget },
    annual: { target: annualTarget, actual: ytdRevenue, projected: (ytdRevenue / (getDayOfYear(today))) * 365, daysRemaining: 365 - getDayOfYear(today), onPace: (ytdRevenue / getDayOfYear(today)) * 365 >= annualTarget },
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function getKPIs(transactions: Transaction[]) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const lastWeekDate = new Date(today);
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeekStr = lastWeekDate.toISOString().split("T")[0];

  const todayTx = transactions.filter((tx) => tx.date === todayStr);
  const lastWeekTx = transactions.filter((tx) => tx.date === lastWeekStr);

  const revenueToday = todayTx.reduce((s, tx) => s + tx.amount, 0);
  const revenueLastWeek = lastWeekTx.reduce((s, tx) => s + tx.amount, 0);

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const mtdTx = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const revenueMTD = mtdTx.reduce((s, tx) => s + tx.amount, 0);

  const ytdTx = transactions.filter((tx) => new Date(tx.date).getFullYear() === currentYear);
  const revenueYTD = ytdTx.reduce((s, tx) => s + tx.amount, 0);

  const monthlyRevenue: number[] = [];
  for (let i = 11; i >= 0; i--) {
    const m = new Date(currentYear, currentMonth - i, 1);
    const mKey = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
    const rev = transactions
      .filter((tx) => tx.date.startsWith(mKey))
      .reduce((s, tx) => s + tx.amount, 0);
    monthlyRevenue.push(rev);
  }

  const transactionsToday = todayTx.length;
  const avgOrderValue = transactionsToday > 0 ? revenueToday / transactionsToday : 0;

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0];
  const recentTx = transactions.filter((tx) => tx.date >= thirtyDaysAgoStr);
  const activeBuyers = new Set(recentTx.map((tx) => tx.buyerOrgId)).size;

  const monthStartStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
  const monthTx = transactions.filter((tx) => tx.date >= monthStartStr);
  const allTimeBuyersBefore = new Set(transactions.filter((tx) => tx.date < monthStartStr).map((tx) => tx.buyerOrgId));
  const newBuyers = new Set(
    monthTx.map((tx) => tx.buyerOrgId).filter((id) => !allTimeBuyersBefore.has(id))
  ).size;

  const productSales = new Map<string, { units: number; revenue: number }>();
  for (const tx of mtdTx) {
    const existing = productSales.get(tx.productId);
    if (existing) {
      existing.units += 1;
      existing.revenue += tx.amount;
    } else {
      productSales.set(tx.productId, { units: 1, revenue: tx.amount });
    }
  }

  const catalogMap = new Map(CATALOG_PRODUCTS.map((p) => [p.id, p]));
  let bestSellingProduct = { name: "N/A", units: 0 };
  let highestRevenueProduct = { name: "N/A", revenue: 0 };
  for (const [pid, data] of productSales) {
    const p = catalogMap.get(pid);
    if (p && data.units > bestSellingProduct.units) {
      bestSellingProduct = { name: p.name, units: data.units };
    }
    if (p && data.revenue > highestRevenueProduct.revenue) {
      highestRevenueProduct = { name: p.name, revenue: data.revenue };
    }
  }

  return {
    revenueToday,
    revenueLastWeekSameDay: revenueLastWeek,
    revenueTodayChange: revenueLastWeek > 0 ? ((revenueToday - revenueLastWeek) / revenueLastWeek) * 100 : 0,
    revenueMTD,
    monthlyTarget: 850000,
    mtdTargetPercent: (revenueMTD / 850000) * 100,
    revenueYTD,
    monthlyRevenueSparkline: monthlyRevenue,
    transactionsToday,
    avgOrderValue,
    activeBuyers,
    newBuyersThisMonth: newBuyers,
    bestSellingProduct,
    highestRevenueProduct,
  };
}

export function filterTransactions(
  transactions: Transaction[],
  filters: {
    startDate?: string;
    endDate?: string;
    category?: string;
    buyerType?: BuyerType;
    productId?: string;
  }
): Transaction[] {
  const productMap = new Map(CATALOG_PRODUCTS.map((p) => [p.id, p]));
  const buyerMap = new Map(BUYER_ORGS.map((b) => [b.id, b]));

  return transactions.filter((tx) => {
    if (filters.startDate && tx.date < filters.startDate) return false;
    if (filters.endDate && tx.date > filters.endDate) return false;
    if (filters.category) {
      const product = productMap.get(tx.productId);
      if (!product || product.category !== filters.category) return false;
    }
    if (filters.buyerType) {
      const buyer = buyerMap.get(tx.buyerOrgId);
      if (!buyer || buyer.type !== filters.buyerType) return false;
    }
    if (filters.productId && tx.productId !== filters.productId) return false;
    return true;
  });
}

export function getProductTransactions(transactions: Transaction[], productId: string) {
  const productTx = transactions.filter((tx) => tx.productId === productId);
  const buyerMap = new Map(BUYER_ORGS.map((b) => [b.id, b]));

  const buyerStats = new Map<string, { count: number; spend: number }>();
  for (const tx of productTx) {
    const existing = buyerStats.get(tx.buyerOrgId);
    if (existing) {
      existing.count += 1;
      existing.spend += tx.amount;
    } else {
      buyerStats.set(tx.buyerOrgId, { count: 1, spend: tx.amount });
    }
  }

  const topBuyers = Array.from(buyerStats.entries())
    .map(([orgId, stats]) => ({
      org: buyerMap.get(orgId)!,
      purchaseCount: stats.count,
      totalSpent: stats.spend,
    }))
    .filter((e) => e.org)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);

  const countryBreakdown = new Map<string, number>();
  for (const tx of productTx) {
    const buyer = buyerMap.get(tx.buyerOrgId);
    if (buyer) {
      countryBreakdown.set(buyer.country, (countryBreakdown.get(buyer.country) || 0) + tx.amount);
    }
  }

  const geoData = Array.from(countryBreakdown.entries())
    .map(([country, revenue]) => ({ country, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const today = new Date();
  const monthlyRev: { month: string; revenue: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const rev = productTx
      .filter((tx) => tx.date.startsWith(mKey))
      .reduce((s, tx) => s + tx.amount, 0);
    monthlyRev.push({ month: mKey, revenue: rev });
  }

  return {
    totalRevenue: productTx.reduce((s, tx) => s + tx.amount, 0),
    totalUnits: productTx.length,
    topBuyers,
    geoBreakdown: geoData,
    monthlyRevenue: monthlyRev,
    recentTransactions: productTx.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 50),
  };
}

export const DONUT_COLORS = [
  "#1B3A5C", "#2E86C1", "#1ABC9C", "#F39C12", "#E74C3C",
  "#8E44AD", "#27AE60", "#D35400", "#2C3E50", "#16A085",
  "#C0392B", "#7F8C8D",
];

export const BUYER_TYPE_COLORS: Record<BuyerType, string> = {
  Airlines: "#2E86C1",
  "Airport Operators": "#1ABC9C",
  Investors: "#F39C12",
  "Consulting Firms": "#8E44AD",
  Researchers: "#27AE60",
  "Government Agencies": "#1B3A5C",
  "Travel Tech": "#D35400",
  Media: "#E74C3C",
  Other: "#7F8C8D",
};
