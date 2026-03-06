import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  CreditCard,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  Cell,
  ReferenceLine,
} from "recharts";
import { BOP_COMPONENTS, BOP_QUARTERLY, CHART_COLORS } from "@/lib/mock-data";

export default function DashboardBop() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";

  const totalCredits = BOP_COMPONENTS.filter(c => c.type === "credit").reduce((s, c) => s + c.value, 0);
  const totalDebits = BOP_COMPONENTS.filter(c => c.type === "debit").reduce((s, c) => s + Math.abs(c.value), 0);
  const netBalance = totalCredits - totalDebits;

  const waterfallData = (() => {
    const items: Array<{
      name: string;
      nameAr: string;
      value: number;
      base: number;
      fill: string;
      isTotal?: boolean;
    }> = [];

    let runningTotal = 0;

    const credits = BOP_COMPONENTS.filter(c => c.type === "credit");
    credits.forEach(c => {
      items.push({
        name: c.name,
        nameAr: c.nameAr,
        value: c.value,
        base: runningTotal,
        fill: "hsl(160, 70%, 38%)",
      });
      runningTotal += c.value;
    });

    items.push({
      name: "Total Credits",
      nameAr: "إجمالي الإيرادات",
      value: runningTotal,
      base: 0,
      fill: "hsl(160, 55%, 30%)",
      isTotal: true,
    });

    const creditTotal = runningTotal;

    const debits = BOP_COMPONENTS.filter(c => c.type === "debit");
    debits.forEach(c => {
      const absVal = Math.abs(c.value);
      runningTotal -= absVal;
      items.push({
        name: c.name,
        nameAr: c.nameAr,
        value: absVal,
        base: runningTotal,
        fill: "hsl(0, 70%, 45%)",
      });
    });

    items.push({
      name: "Net Balance",
      nameAr: "صافي الميزان",
      value: runningTotal,
      base: 0,
      fill: runningTotal >= 0 ? "hsl(210, 85%, 42%)" : "hsl(0, 70%, 45%)",
      isTotal: true,
    });

    return items;
  })();

  const creditItems = BOP_COMPONENTS.filter(c => c.type === "credit");
  const debitItems = BOP_COMPONENTS.filter(c => c.type === "debit");

  const latestQ = BOP_QUARTERLY[BOP_QUARTERLY.length - 1];
  const prevQ = BOP_QUARTERLY[BOP_QUARTERLY.length - 2];
  const netChange = latestQ && prevQ ? ((latestQ.net - prevQ.net) / prevQ.net) * 100 : 0;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-bop-title">
            {isAr ? "ميزان المدفوعات" : "Balance of Payments"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isAr ? "تدفقات الطيران المدني — القيم بمليار ريال سعودي" : "Civil aviation flows — Values in SAR Billion"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5" data-testid="card-bop-credits">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                  <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? "إجمالي الإيرادات" : "Total Credits"}</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400" data-testid="text-bop-credits-value">
                    {totalCredits.toFixed(1)}B
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="no-default-active-elevate">
                SAR
              </Badge>
            </div>
            <div className="mt-3 space-y-1.5">
              {creditItems.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate" data-testid={`text-credit-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
                    {isAr ? item.nameAr : item.name}
                  </span>
                  <span className="font-medium">{item.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5" data-testid="card-bop-debits">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-red-100 dark:bg-red-900/30">
                  <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? "إجمالي المدفوعات" : "Total Debits"}</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400" data-testid="text-bop-debits-value">
                    {totalDebits.toFixed(1)}B
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="no-default-active-elevate">
                SAR
              </Badge>
            </div>
            <div className="mt-3 space-y-1.5">
              {debitItems.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate" data-testid={`text-debit-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
                    {isAr ? item.nameAr : item.name}
                  </span>
                  <span className="font-medium">{Math.abs(item.value).toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5" data-testid="card-bop-net">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-9 w-9 rounded-md bg-blue-100 dark:bg-blue-900/30">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? "صافي الميزان" : "Net Balance"}</p>
                  <p className="text-2xl font-bold" data-testid="text-bop-net-value">
                    {netBalance >= 0 ? "+" : ""}{netBalance.toFixed(1)}B
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 text-sm font-medium ${netChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {netChange >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {netChange >= 0 ? "+" : ""}{netChange.toFixed(1)}%
                </span>
                <Badge variant="secondary" className="no-default-active-elevate">
                  SAR
                </Badge>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-md bg-muted/50">
                <p className="text-xs text-muted-foreground">{isAr ? "الإيرادات" : "Credits"}</p>
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{totalCredits.toFixed(1)}B</p>
              </div>
              <div className="text-center p-3 rounded-md bg-muted/50">
                <p className="text-xs text-muted-foreground">{isAr ? "المدفوعات" : "Debits"}</p>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">{totalDebits.toFixed(1)}B</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5" data-testid="card-bop-waterfall">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "تحليل مكونات ميزان المدفوعات (شلال)" : "BOP Component Breakdown (Waterfall)"}
          </h2>
          <div className="h-[380px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey={isAr ? "nameAr" : "name"}
                  tick={{ fontSize: 9 }}
                  stroke="hsl(210, 6%, 50%)"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  label={{
                    value: isAr ? "مليار ريال" : "SAR Billion",
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
                  formatter={(value: number, name: string) => {
                    if (name === "base") return [null, null];
                    return [`${value.toFixed(1)}B SAR`, isAr ? "القيمة" : "Value"];
                  }}
                />
                <ReferenceLine y={0} stroke="hsl(210, 6%, 50%)" />
                <Bar dataKey="base" stackId="waterfall" fill="transparent" />
                <Bar dataKey="value" stackId="waterfall" radius={[3, 3, 0, 0]}>
                  {waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5" data-testid="card-bop-quarterly-trend">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "اتجاه ميزان المدفوعات الربعي" : "Quarterly BOP Trend"}
          </h2>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BOP_QUARTERLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey={isAr ? "quarterAr" : "quarter"}
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  label={{
                    value: isAr ? "مليار ريال" : "SAR Billion",
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
                  formatter={(value: number) => [`${value.toFixed(1)}B SAR`, ""]}
                />
                <Legend />
                <Bar
                  dataKey="credits"
                  name={isAr ? "الإيرادات" : "Credits"}
                  fill="hsl(160, 70%, 38%)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="debits"
                  name={isAr ? "المدفوعات" : "Debits"}
                  fill="hsl(0, 70%, 45%)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="net"
                  name={isAr ? "الصافي" : "Net"}
                  fill="hsl(210, 85%, 42%)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5" data-testid="card-bop-net-trend-line">
          <h2 className="text-base font-semibold mb-4">
            {isAr ? "اتجاه صافي ميزان المدفوعات" : "Net BOP Trend"}
          </h2>
          <div className="h-[260px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BOP_QUARTERLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                <XAxis
                  dataKey={isAr ? "quarterAr" : "quarter"}
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(210, 6%, 50%)"
                  label={{
                    value: isAr ? "مليار ريال" : "SAR Billion",
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
                  formatter={(value: number) => [`${value.toFixed(1)}B SAR`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="credits"
                  name={isAr ? "الإيرادات" : "Credits"}
                  stroke="hsl(160, 70%, 38%)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(160, 70%, 38%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="debits"
                  name={isAr ? "المدفوعات" : "Debits"}
                  stroke="hsl(0, 70%, 45%)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(0, 70%, 45%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  name={isAr ? "الصافي" : "Net Balance"}
                  stroke="hsl(210, 85%, 42%)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(210, 85%, 42%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BOP_COMPONENTS.filter(c => c.type === "credit").map(item => (
            <Card key={item.name} className="p-4" data-testid={`card-kpi-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm font-medium">{isAr ? item.nameAr : item.name}</p>
              </div>
              <p className="text-xl font-bold">{item.value.toFixed(1)}B <span className="text-sm font-normal text-muted-foreground">SAR</span></p>
              <div className="mt-1">
                <Badge variant="secondary" className="no-default-active-elevate text-emerald-600 dark:text-emerald-400">
                  {isAr ? "إيراد" : "Credit"}
                </Badge>
              </div>
            </Card>
          ))}
          {BOP_COMPONENTS.filter(c => c.type === "debit").map(item => (
            <Card key={item.name} className="p-4" data-testid={`card-kpi-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-sm font-medium">{isAr ? item.nameAr : item.name}</p>
              </div>
              <p className="text-xl font-bold">{Math.abs(item.value).toFixed(1)}B <span className="text-sm font-normal text-muted-foreground">SAR</span></p>
              <div className="mt-1">
                <Badge variant="secondary" className="no-default-active-elevate text-red-600 dark:text-red-400">
                  {isAr ? "مدفوعات" : "Debit"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
