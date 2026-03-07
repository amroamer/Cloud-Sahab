import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIRLINES = ["Saudia", "flynas", "flyadeal", "Riyadh Air", "Qatar Airways", "Emirates", "Etihad", "Turkish Airlines", "Lufthansa", "British Airways"];
const PRODUCTS = [
  { en: "Route-Level Traffic Data", ar: "بيانات حركة المرور على مستوى المسار", price: 2000 },
  { en: "Monthly Passenger Intelligence", ar: "ذكاء المسافرين الشهري", price: 1500 },
  { en: "Airport Capacity Report", ar: "تقرير سعة المطارات", price: 3500 },
  { en: "Airline Market Share Bundle", ar: "حزمة حصة سوق الطيران", price: 5000 },
  { en: "Cargo Volume Dataset", ar: "مجموعة بيانات حجم الشحن", price: 2500 },
  { en: "Connectivity Index Data", ar: "بيانات مؤشر الاتصال", price: 1800 },
  { en: "Fleet Composition Report", ar: "تقرير تكوين الأسطول", price: 1200 },
  { en: "Seasonal Traffic Patterns", ar: "أنماط حركة المرور الموسمية", price: 3000 },
  { en: "OTP Performance Data", ar: "بيانات أداء الانتظام", price: 2200 },
  { en: "Financial Benchmarks Pack", ar: "حزمة المعايير المالية", price: 8000 },
];

function generateEvents(count: number, language: string): string[] {
  const events: string[] = [];
  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const minutes = Math.floor(Math.random() * 120) + 1;
    const productName = language === "ar" ? product.ar : product.en;
    const timeAgo = language === "ar" ? `منذ ${minutes} د` : `${minutes}m ago`;
    events.push(
      language === "ar"
        ? `${airline} اشترى ${productName} — ${product.price.toLocaleString("en-US")} ر.س • ${timeAgo}`
        : `${airline} purchased ${productName} — SAR ${product.price.toLocaleString("en-US")} • ${timeAgo}`
    );
  }
  return events;
}

export function RevenueTicker() {
  const { language } = useTranslation();
  const [events, setEvents] = useState(() => generateEvents(18, language));

  const refresh = useCallback(() => {
    setEvents(generateEvents(18, language));
  }, [language]);

  const tickerContent = events.join("     ·     ");

  return (
    <div
      className="relative bg-emerald-950/80 dark:bg-emerald-950/60 border-b border-emerald-900/40 overflow-hidden"
      data-testid="revenue-ticker"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-emerald-600 px-3 py-2 text-[11px] font-semibold text-white flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {language === "ar" ? "المبيعات" : "SALES"}
        </div>
        <div className="flex-1 overflow-hidden py-2">
          <div
            className="whitespace-nowrap text-[11px] text-emerald-100/90 font-mono animate-[ticker_60s_linear_infinite]"
            style={{ display: "inline-block" }}
          >
            {tickerContent}{"     ·     "}{tickerContent}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refresh}
          className="flex-shrink-0 text-emerald-300 h-7 w-7 p-0 me-2"
          data-testid="button-refresh-ticker"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
