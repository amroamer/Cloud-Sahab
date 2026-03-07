import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Bot, Send, RefreshCw, User, BarChart3, Table2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  chart?: { type: "bar"; data: { name: string; value: number }[]; label: string };
  table?: { headers: string[]; rows: string[][] };
  timestamp: Date;
}

const QA_PAIRS_EN: { patterns: string[]; answer: string; chart?: ChatMessage["chart"]; table?: ChatMessage["table"] }[] = [
  {
    patterns: ["total passengers", "how many passengers", "passenger count", "passenger numbers"],
    answer: "Saudi Arabia's aviation sector served approximately 111.4 million passengers in 2025, representing a 12.3% year-over-year increase. Domestic travel accounted for 54% of total traffic, while international routes contributed 46%.",
    chart: {
      type: "bar",
      data: [
        { name: "2021", value: 42 },
        { name: "2022", value: 68 },
        { name: "2023", value: 85 },
        { name: "2024", value: 99 },
        { name: "2025", value: 111 },
      ],
      label: "Passengers (Millions)",
    },
  },
  {
    patterns: ["top airports", "busiest airports", "airport ranking", "largest airports"],
    answer: "The top 5 busiest airports in Saudi Arabia by passenger volume are listed below. King Abdulaziz International Airport (OEJN) leads with significant margin due to Hajj and Umrah traffic.",
    table: {
      headers: ["Rank", "Airport", "IATA", "Passengers (M)"],
      rows: [
        ["1", "King Abdulaziz Intl", "OEJN", "38.2"],
        ["2", "King Khalid Intl", "OERK", "32.7"],
        ["3", "King Fahd Intl", "OEDF", "14.1"],
        ["4", "Prince Mohammad Intl", "OEMA", "8.9"],
        ["5", "Abha Regional", "OEAB", "4.3"],
      ],
    },
  },
  {
    patterns: ["on-time", "otp", "delay", "punctuality", "on time performance"],
    answer: "The average on-time performance (OTP) across all Saudi carriers is 82.4% for 2025. Saudia leads with 85.1%, followed by flynas at 81.7% and flyadeal at 80.2%. Weather-related delays account for 34% of all delays, followed by operational issues at 28%.",
    chart: {
      type: "bar",
      data: [
        { name: "Saudia", value: 85.1 },
        { name: "flynas", value: 81.7 },
        { name: "flyadeal", value: 80.2 },
        { name: "Riyadh Air", value: 79.5 },
      ],
      label: "OTP (%)",
    },
  },
  {
    patterns: ["cargo", "freight", "shipment", "logistics"],
    answer: "Saudi aviation cargo reached 1.24 million tonnes in 2025, growing 9.7% YoY. King Khalid International Airport handles the largest share at 38%, followed by King Abdulaziz at 31%. E-commerce has been a key driver, contributing to 22% of total cargo volume.",
  },
  {
    patterns: ["vision 2030", "target", "goals", "strategy"],
    answer: "Saudi aviation is tracking well against Vision 2030 targets:\n\n• Air Connectivity Index: Currently at 218 (target: 250) — 87.2% achieved\n• Total Travelers: 111.4M (target: 330M by 2030) — 33.8% achieved\n• Cargo Volume: 1.24M tonnes (target: 3M) — 41.3% achieved\n\nAt current growth rates, the connectivity target is projected to be met by Q2 2029.",
  },
  {
    patterns: ["airline", "carriers", "fleet", "aircraft", "planes"],
    answer: "The Saudi aviation fleet comprises 347 commercial aircraft across 4 major carriers. Saudia operates the largest fleet with 168 aircraft, followed by flynas (62), flyadeal (45), and the newly launched Riyadh Air (32). The average fleet age is 6.8 years, among the youngest in the region.",
    table: {
      headers: ["Airline", "Fleet Size", "Avg Age (yrs)", "Orders"],
      rows: [
        ["Saudia", "168", "7.2", "39"],
        ["flynas", "62", "5.8", "120"],
        ["flyadeal", "45", "4.1", "30"],
        ["Riyadh Air", "32", "0.8", "72"],
      ],
    },
  },
  {
    patterns: ["hajj", "umrah", "pilgrims", "pilgrim"],
    answer: "During Hajj 2025, Saudi airports processed 2.8 million international pilgrims across a 45-day arrival window. King Abdulaziz International Airport (Jeddah) handled 71% of pilgrim arrivals. Peak congestion was recorded on 5th Dhul Hijjah with 127,000 arrivals in a single day.",
  },
  {
    patterns: ["regulation", "compliance", "gaca", "rules", "policy"],
    answer: "GACA currently oversees 47 active regulations covering safety, security, economic, and environmental domains. In 2025, 12 regulatory amendments were issued and 3 new regulations were introduced. Compliance audit pass rate across airlines stands at 94.2%, with ground handling services at 91.8%.",
  },
  {
    patterns: ["route", "routes", "connectivity", "destinations", "network"],
    answer: "Saudi carriers operate 847 unique routes connecting to 167 international destinations across 78 countries. The top international routes by frequency are Riyadh-Dubai (42 weekly), Jeddah-Cairo (38 weekly), and Riyadh-Cairo (31 weekly). 124 new routes were added in 2025.",
    chart: {
      type: "bar",
      data: [
        { name: "2021", value: 512 },
        { name: "2022", value: 623 },
        { name: "2023", value: 701 },
        { name: "2024", value: 768 },
        { name: "2025", value: 847 },
      ],
      label: "Total Routes",
    },
  },
  {
    patterns: ["safety", "accident", "incident", "safety record"],
    answer: "Saudi aviation maintains an exemplary safety record with zero hull-loss accidents since 2001. The 2025 safety audit score from ICAO was 89.4/100, placing Saudi Arabia in the top 15 globally. There were 142 reported safety occurrences in 2025, all classified as minor, with a 98% closure rate within 90 days.",
  },
  {
    patterns: ["revenue", "financial", "economy", "gdp", "economic impact"],
    answer: "The Saudi aviation sector contributed SAR 68.4 billion to GDP in 2025, representing 2.1% of total GDP. Direct employment in aviation reached 142,000 jobs. Airport non-aeronautical revenue grew 18.3% YoY, driven by retail and F&B concessions at major airports.",
  },
];

const QA_PAIRS_AR: { patterns: string[]; answer: string; chart?: ChatMessage["chart"]; table?: ChatMessage["table"] }[] = [
  {
    patterns: ["المسافرين", "عدد المسافرين", "الركاب", "كم مسافر"],
    answer: "خدم قطاع الطيران السعودي ما يقارب 111.4 مليون مسافر في عام 2025، بزيادة 12.3% مقارنة بالعام السابق. شكّل السفر الداخلي 54% من إجمالي الحركة، بينما ساهمت الرحلات الدولية بـ 46%.",
    chart: QA_PAIRS_EN[0].chart,
  },
  {
    patterns: ["أكبر المطارات", "أنشط المطارات", "ترتيب المطارات"],
    answer: "أكبر 5 مطارات في المملكة العربية السعودية من حيث حجم المسافرين مدرجة أدناه. يتصدر مطار الملك عبدالعزيز الدولي بفارق كبير بسبب حركة الحج والعمرة.",
    table: {
      headers: ["الترتيب", "المطار", "IATA", "المسافرون (مليون)"],
      rows: [
        ["1", "مطار الملك عبدالعزيز الدولي", "OEJN", "38.2"],
        ["2", "مطار الملك خالد الدولي", "OERK", "32.7"],
        ["3", "مطار الملك فهد الدولي", "OEDF", "14.1"],
        ["4", "مطار الأمير محمد الدولي", "OEMA", "8.9"],
        ["5", "مطار أبها الإقليمي", "OEAB", "4.3"],
      ],
    },
  },
  {
    patterns: ["الانضباط", "التأخير", "الالتزام بالمواعيد"],
    answer: "متوسط أداء الالتزام بالمواعيد عبر جميع الناقلات السعودية هو 82.4% لعام 2025. تتصدر الخطوط السعودية بنسبة 85.1%، تليها طيران ناس بنسبة 81.7% وطيران أديل بنسبة 80.2%.",
    chart: QA_PAIRS_EN[2].chart,
  },
  {
    patterns: ["الشحن", "البضائع", "اللوجستيات"],
    answer: "بلغ حجم الشحن الجوي السعودي 1.24 مليون طن في 2025، بنمو 9.7% مقارنة بالعام السابق. يتعامل مطار الملك خالد الدولي مع أكبر حصة بنسبة 38%.",
  },
  {
    patterns: ["رؤية 2030", "الأهداف", "الاستراتيجية"],
    answer: "يسير قطاع الطيران السعودي بشكل جيد نحو أهداف رؤية 2030:\n\n• مؤشر الاتصال الجوي: حالياً 218 (الهدف: 250) — تحقق 87.2%\n• إجمالي المسافرين: 111.4 مليون (الهدف: 330 مليون بحلول 2030) — تحقق 33.8%\n• حجم الشحن: 1.24 مليون طن (الهدف: 3 مليون) — تحقق 41.3%",
  },
];

const SUGGESTED_EN = [
  "How many passengers in 2025?",
  "What are the top airports?",
  "Show airline on-time performance",
  "What is the cargo volume?",
  "Vision 2030 aviation targets",
  "Show airline fleet data",
  "Hajj & Umrah statistics",
  "Route network overview",
  "Safety record summary",
  "Aviation economic impact",
];

const SUGGESTED_AR = [
  "كم عدد المسافرين في 2025؟",
  "ما هي أكبر المطارات؟",
  "أداء الالتزام بالمواعيد",
  "ما حجم الشحن الجوي؟",
  "أهداف رؤية 2030 للطيران",
];

function findResponse(input: string, isAr: boolean) {
  const lower = input.toLowerCase();
  const pairs = isAr ? QA_PAIRS_AR : QA_PAIRS_EN;
  for (const qa of pairs) {
    if (qa.patterns.some((p) => lower.includes(p.toLowerCase()))) {
      return qa;
    }
  }
  if (!isAr) {
    for (const qa of QA_PAIRS_EN) {
      if (qa.patterns.some((p) => lower.includes(p.toLowerCase()))) {
        return qa;
      }
    }
  }
  return null;
}

const DEFAULT_RESPONSE_EN = "I can help you with Saudi aviation data and GACA regulations. Try asking about passengers, airports, airlines, cargo, routes, safety, or Vision 2030 targets. You can also click one of the suggested questions below.";
const DEFAULT_RESPONSE_AR = "يمكنني مساعدتك في بيانات الطيران السعودي ولوائح الهيئة العامة للطيران المدني. جرّب السؤال عن المسافرين أو المطارات أو شركات الطيران أو الشحن أو المسارات أو السلامة أو أهداف رؤية 2030.";

export default function CopilotPage() {
  const { t, language } = useTranslation();
  const isAr = language === "ar";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      const match = findResponse(text, isAr);
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: match?.answer || (isAr ? DEFAULT_RESPONSE_AR : DEFAULT_RESPONSE_EN),
        chart: match?.chart,
        table: match?.table,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  }, [isAr]);

  const handleClear = () => {
    setMessages([]);
    setIsTyping(false);
    setInput("");
  };

  const suggestedQuestions = isAr ? SUGGESTED_AR : SUGGESTED_EN;

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col h-full min-h-[calc(100vh-4rem)]">
        <div className="p-6 pb-3 flex items-center justify-between gap-4 flex-wrap border-b">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-copilot-title">
              {isAr ? "المساعد الذكي" : "AI Regulatory Copilot"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isAr
                ? "اسأل أي سؤال حول بيانات الطيران السعودي ولوائح GACA"
                : "Ask any question about Saudi aviation data and GACA regulations"}
            </p>
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={handleClear}
            data-testid="button-refresh-copilot"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="ms-2">{isAr ? "محادثة جديدة" : "New Chat"}</span>
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
          data-testid="container-chat-messages"
        >
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold" data-testid="text-copilot-welcome">
                  {isAr ? "مرحباً! أنا المساعد الذكي لمنصة سحاب" : "Welcome! I'm the Sahab AI Copilot"}
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  {isAr
                    ? "اسألني عن إحصائيات الطيران والمطارات وشركات الطيران واللوائح التنظيمية"
                    : "Ask me about aviation statistics, airports, airlines, and regulatory information"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                {suggestedQuestions.map((q, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="cursor-pointer text-xs px-3 py-1.5"
                    onClick={() => handleSend(q)}
                    data-testid={`chip-suggestion-${i}`}
                  >
                    {q}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              data-testid={`message-${msg.role}-${msg.id}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] space-y-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5"
                    : ""
                }`}
              >
                <div className={msg.role === "assistant" ? "bg-muted/50 rounded-2xl rounded-bl-sm px-4 py-2.5" : ""}>
                  <p className="text-sm whitespace-pre-line" data-testid={`text-message-content-${msg.id}`}>
                    {msg.content}
                  </p>
                </div>
                {msg.chart && (
                  <Card className="p-4" data-testid={`chart-response-${msg.id}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">{msg.chart.label}</span>
                    </div>
                    <div className="h-[180px]" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={msg.chart.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 5%, 88%)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                          <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 6%, 50%)" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(210, 5%, 96%)",
                              border: "1px solid hsl(210, 5%, 88%)",
                              borderRadius: "6px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                )}
                {msg.table && (
                  <Card className="p-4 overflow-x-auto" data-testid={`table-response-${msg.id}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Table2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {isAr ? "بيانات مفصلة" : "Detailed Data"}
                      </span>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {msg.table.headers.map((h, i) => (
                            <th key={i} className="py-2 px-3 text-start text-xs font-medium text-muted-foreground">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.table.rows.map((row, ri) => (
                          <tr key={ri} className="border-b last:border-0">
                            {row.map((cell, ci) => (
                              <td key={ci} className="py-2 px-3 text-xs">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted shrink-0 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start" data-testid="indicator-typing">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted/50 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {messages.length > 0 && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestedQuestions.slice(0, 5).map((q, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="cursor-pointer text-xs"
                  onClick={() => handleSend(q)}
                  data-testid={`chip-followup-${i}`}
                >
                  {q}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? "اكتب سؤالك هنا..." : "Type your question here..."}
              disabled={isTyping}
              className="flex-1"
              data-testid="input-chat-message"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </ScrollArea>
  );
}
