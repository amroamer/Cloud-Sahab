import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardFilters, useFilterState, type FilterConfig } from "@/components/dashboard-filters";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Landmark,
  Banknote,
  PiggyBank,
  Plane,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import {
  FINANCIAL_QUARTERLY,
  CAPITAL_VALUES,
  BOP_COMPONENTS,
  AIRCRAFT_PURCHASES,
  CHART_COLORS,
} from "@/lib/mock-data";

const LABELS = {
  en: {
    title: "Financial & Economic",
    dataAsOf: "Data as of",
    dateValue: "March 6, 2026, 08:00 AM",
    ticketRevenue: "Ticket Revenue",
    opRevenue: "Operating Revenue",
    opExpenses: "Operating Expenses",
    netMargin: "Net Margin",
    totalInvestment: "Total Investment",
    capitalValue: "Capital Value",
    tangibleInvestment: "Tangible Asset Investment",
    aircraftPurchases: "Aircraft Purchases",
    bopCredits: "BOP Credits",
    bopDebits: "BOP Debits",
    maintenance: "Maintenance Spending",
    revenueVsExpense: "Revenue vs. Expenses",
    investmentBreakdown: "Investment Breakdown",
    bopFlows: "Balance of Payments Flows",
    purchaseTrend: "Aircraft Purchases Trend",
    capitalTrend: "Capital Value Trend",
    revenue: "Revenue",
    expenses: "Expenses",
    ticket: "Ticket",
    operating: "Operating",
    investment: "Investment",
    quarterly: "Quarterly",
    credits: "Credits",
    debits: "Debits",
    net: "Net",
    narrowBody: "Narrow-body",
    wideBody: "Wide-body",
    regional: "Regional",
    cargo: "Cargo",
    private: "Private",
    sar: "SAR",
    billion: "B",
    million: "M",
    component: "Component",
    amount: "Amount (SAR B)",
    type: "Type",
    credit: "Credit",
    debit: "Debit",
  },
  ar: {
    title: "المالية والاقتصاد",
    dataAsOf: "البيانات حتى",
    dateValue: "٦ مارس ٢٠٢٦، ٠٨:٠٠ ص",
    ticketRevenue: "إيرادات التذاكر",
    opRevenue: "الإيرادات التشغيلية",
    opExpenses: "المصاريف التشغيلية",
    netMargin: "صافي الهامش",
    totalInvestment: "إجمالي الاستثمار",
    capitalValue: "القيمة الرأسمالية",
    tangibleInvestment: "استثمار الأصول الملموسة",
    aircraftPurchases: "مشتريات الطائرات",
    bopCredits: "ائتمانات ميزان المدفوعات",
    bopDebits: "مدينات ميزان المدفوعات",
    maintenance: "الإنفاق على الصيانة",
    revenueVsExpense: "الإيرادات مقابل المصاريف",
    investmentBreakdown: "توزيع الاستثمار",
    bopFlows: "تدفقات ميزان المدفوعات",
    purchaseTrend: "اتجاه مشتريات الطائرات",
    capitalTrend: "اتجاه القيمة الرأسمالية",
    revenue: "الإيرادات",
    expenses: "المصاريف",
    ticket: "التذاكر",
    operating: "التشغيلية",
    investment: "الاستثمار",
    quarterly: "ربع سنوي",
    credits: "ائتمانات",
    debits: "مدينات",
    net: "صافي",
    narrowBody: "ضيقة البدن",
    wideBody: "واسعة البدن",
    regional: "إقليمية",
    cargo: "شحن",
    private: "خاصة",
    sar: "ر.س",
    billion: "مليار",
    million: "مليون",
    component: "المكون",
    amount: "المبلغ (مليار ر.س)",
    type: "النوع",
    credit: "دائن",
    debit: "مدين",
  },
};

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(210, 5%, 96%)",
  border: "1px solid hsl(210, 5%, 88%)",
  borderRadius: "6px",
  fontSize: "12px",
};

export default function DashboardFinancial() {
  const { t, language } = useTranslation();
  const l = LABELS[language];

  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: "quarter",
      label: t("filter.quarter"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "q1", label: "Q1" },
        { value: "q2", label: "Q2" },
        { value: "q3", label: "Q3" },
        { value: "q4", label: "Q4" },
      ],
      defaultValue: "all",
    },
    {
      key: "revenueType",
      label: t("filter.revenueType"),
      options: [
        { value: "all", label: t("dashboard.all") },
        { value: "ticket", label: t("filter.ticket") },
        { value: "operating", label: t("filter.operating") },
      ],
      defaultValue: "all",
    },
  ], [t]);

  const { values: filterValues, onChange: onFilterChange, onReset: onFilterReset } = useFilterState(filterConfigs);

  const totalTicketRevenue = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.ticketRevenue, 0);
  const totalOpRevenue = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.opRevenue, 0);
  const totalOpExpenses = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.opExpenses, 0);
  const totalInvestment = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.investment, 0);
  const totalMaintenance = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.maintenance, 0);
  const totalBopCredits = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.bopCredits, 0);
  const totalBopDebits = FINANCIAL_QUARTERLY.reduce((s, q) => s + q.bopDebits, 0);
  const netMargin = totalTicketRevenue + totalOpRevenue - totalOpExpenses;
  const latestCapital = CAPITAL_VALUES[CAPITAL_VALUES.length - 1].value;

  const revenueExpenseData = FINANCIAL_QUARTERLY.map((q) => ({
    quarter: language === "ar" ? q.quarterAr : q.quarter,
    ticketRevenue: q.ticketRevenue,
    opRevenue: q.opRevenue,
    opExpenses: q.opExpenses,
    net: +(q.ticketRevenue + q.opRevenue - q.opExpenses).toFixed(1),
  }));

  const investmentData = FINANCIAL_QUARTERLY.map((q) => ({
    quarter: language === "ar" ? q.quarterAr : q.quarter,
    investment: q.investment,
    maintenance: q.maintenance,
  }));

  const bopFlowData = FINANCIAL_QUARTERLY.map((q) => ({
    quarter: language === "ar" ? q.quarterAr : q.quarter,
    credits: q.bopCredits,
    debits: q.bopDebits,
    net: +(q.bopCredits - q.bopDebits).toFixed(1),
  }));

  const purchaseData = AIRCRAFT_PURCHASES.map((p) => ({
    year: p.year,
    narrowBody: p.narrowBody,
    wideBody: p.wideBody,
    regional: p.regional,
    cargo: p.cargo,
    private: p.private,
  }));

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-financial-title">
            {l.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {l.dataAsOf} {l.dateValue}
          </p>
        </div>

        <DashboardFilters
          filters={filterConfigs}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
          onExport={() => {}}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center justify-center h-9 w-9 rounded-md" style={{ backgroundColor: "hsl(210, 85%, 42%, 0.12)" }}>
                <DollarSign className="h-5 w-5" style={{ color: CHART_COLORS[0] }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{l.ticketRevenue}</p>
                <p className="text-xl font-bold" data-testid="text-ticket-revenue">{totalTicketRevenue.toFixed(1)} {l.sar} {l.billion}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8.2%</span>
              <span className="text-xs text-muted-foreground ms-1">YoY</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center justify-center h-9 w-9 rounded-md" style={{ backgroundColor: "hsl(185, 75%, 38%, 0.12)" }}>
                <Banknote className="h-5 w-5" style={{ color: CHART_COLORS[1] }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{l.opRevenue} / {l.opExpenses}</p>
                <p className="text-xl font-bold" data-testid="text-op-revenue">{totalOpRevenue.toFixed(1)} / {totalOpExpenses.toFixed(1)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+5.4%</span>
              <span className="text-xs text-muted-foreground ms-1">{l.sar} {l.billion}</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center justify-center h-9 w-9 rounded-md" style={{ backgroundColor: "hsl(160, 70%, 38%, 0.12)" }}>
                <TrendingUp className="h-5 w-5" style={{ color: CHART_COLORS[5] }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{l.netMargin}</p>
                <p className="text-xl font-bold" data-testid="text-net-margin">{netMargin.toFixed(1)} {l.sar} {l.billion}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12.1%</span>
              <span className="text-xs text-muted-foreground ms-1">YoY</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center justify-center h-9 w-9 rounded-md" style={{ backgroundColor: "hsl(28, 85%, 48%, 0.12)" }}>
                <Landmark className="h-5 w-5" style={{ color: CHART_COLORS[2] }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{l.totalInvestment}</p>
                <p className="text-xl font-bold" data-testid="text-total-investment">{totalInvestment.toFixed(1)} {l.sar} {l.billion}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+15.8%</span>
              <span className="text-xs text-muted-foreground ms-1">YoY</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{l.capitalValue}</p>
                <p className="text-lg font-bold" data-testid="text-capital-value">{latestCapital} {l.sar} {l.billion}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{l.maintenance}</p>
                <p className="text-lg font-bold" data-testid="text-maintenance">{totalMaintenance.toFixed(1)} {l.sar} {l.billion}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{l.bopCredits} / {l.bopDebits}</p>
                <p className="text-lg font-bold" data-testid="text-bop-summary">
                  <span className="text-emerald-600 dark:text-emerald-400">{totalBopCredits.toFixed(1)}</span>
                  {" / "}
                  <span className="text-red-600 dark:text-red-400">{totalBopDebits.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ms-1">{l.sar} {l.billion}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">{l.revenueVsExpense}</h2>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${value} ${l.sar} ${l.billion}`, ""]} />
                  <Legend />
                  <Bar dataKey="ticketRevenue" name={l.ticketRevenue} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="opRevenue" name={l.opRevenue} fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="opExpenses" name={l.opExpenses} fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} />
                  <Line type="monotone" dataKey="net" name={l.netMargin} stroke={CHART_COLORS[5]} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS[5] }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">{l.investmentBreakdown}</h2>
            <div className="h-[320px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${value} ${l.sar} ${l.billion}`, ""]} />
                  <Legend />
                  <Bar dataKey="investment" name={l.investment} fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} stackId="inv" />
                  <Bar dataKey="maintenance" name={l.maintenance} fill={CHART_COLORS[6]} radius={[3, 3, 0, 0]} stackId="inv" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">{l.bopFlows}</h2>
            <div className="h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bopFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 10 }} stroke="hsl(210, 6%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${value} ${l.sar} ${l.billion}`, ""]} />
                  <Legend />
                  <Bar dataKey="credits" name={l.credits} fill={CHART_COLORS[5]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="debits" name={l.debits} fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} />
                  <Line type="monotone" dataKey="net" name={l.net} stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS[0] }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{l.component}</TableHead>
                    <TableHead className="text-right">{l.amount}</TableHead>
                    <TableHead className="text-right">{l.type}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BOP_COMPONENTS.map((comp) => (
                    <TableRow key={comp.name} data-testid={`row-bop-${comp.name.replace(/\s+/g, "-").toLowerCase()}`}>
                      <TableCell className="font-medium text-sm">{language === "ar" ? comp.nameAr : comp.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={comp.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                          {comp.value > 0 ? "+" : ""}{comp.value}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="no-default-active-elevate">
                          {comp.type === "credit" ? l.credit : l.debit}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4">{l.purchaseTrend}</h2>
              <div className="h-[300px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={purchaseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend />
                    <Bar dataKey="narrowBody" name={l.narrowBody} fill={CHART_COLORS[0]} stackId="p" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="wideBody" name={l.wideBody} fill={CHART_COLORS[1]} stackId="p" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="regional" name={l.regional} fill={CHART_COLORS[2]} stackId="p" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="cargo" name={l.cargo} fill={CHART_COLORS[3]} stackId="p" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="private" name={l.private} fill={CHART_COLORS[6]} stackId="p" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4">{l.capitalTrend}</h2>
              <div className="h-[220px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CAPITAL_VALUES}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" domain={[100, 250]} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number) => [`${value} ${l.sar} ${l.billion}`, ""]} />
                    <defs>
                      <linearGradient id="gradCapital" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS[2]} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={CHART_COLORS[2]} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Line type="monotone" dataKey="value" name={l.capitalValue} stroke={CHART_COLORS[2]} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS[2] }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
