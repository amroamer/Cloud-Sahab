import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface KpiCardProps {
  title: string;
  value: string;
  target: string;
  progress: number;
  change: number;
  sparklineData: number[];
  href: string;
  icon: React.ReactNode;
  color: string;
}

export function KpiCard({
  title,
  value,
  target,
  progress,
  change,
  sparklineData,
  href,
  icon,
  color,
}: KpiCardProps) {
  const { t } = useTranslation();
  const isPositive = change >= 0;
  const gradientId = useMemo(() => `sparkGrad-${title.replace(/\s+/g, "")}`, [title]);
  const chartData = useMemo(() => sparklineData.map((v, i) => ({ value: v, index: i })), [sparklineData]);

  return (
    <Link href={href} data-testid={`kpi-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <Card className="p-5 cursor-pointer hover-elevate transition-all group">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
            >
              {icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
              <p className="text-2xl font-bold tracking-tight mt-0.5" data-testid={`text-kpi-value-${title.toLowerCase().replace(/\s+/g, "-")}`}>{value}</p>
            </div>
          </div>
          <div className="w-20 h-10 shrink-0" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`hsl(${color})`} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={`hsl(${color})`} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={`hsl(${color})`}
                  strokeWidth={1.5}
                  fill={`url(#${gradientId})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground">{t("kpi.target")}: {target}</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" dir="ltr" />
          <div className="flex items-center gap-1.5 flex-wrap">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={`text-xs font-semibold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-muted-foreground">{t("kpi.yoy")}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
