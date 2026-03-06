import { useState, useRef, useCallback, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/i18n";
import { Maximize2, Download, FileDown } from "lucide-react";

interface ChartToolbarProps {
  children: ReactNode;
  title?: string;
  csvData?: Record<string, string | number>[];
  csvFilename?: string;
}

export function ChartToolbar({ children, title, csvData, csvFilename }: ChartToolbarProps) {
  const { language } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownloadPng = useCallback(async () => {
    if (!chartRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `${title || "chart"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      const canvas = document.createElement("canvas");
      const svgEl = chartRef.current.querySelector("svg");
      if (!svgEl) return;
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(2, 2);
          ctx.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.download = `${title || "chart"}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    }
  }, [title]);

  const handleDownloadCsv = useCallback(() => {
    if (!csvData || csvData.length === 0) return;
    const headers = Object.keys(csvData[0]);
    const csv = [
      headers.join(","),
      ...csvData.map((row) => headers.map((h) => `"${row[h]}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = `${csvFilename || title || "data"}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }, [csvData, csvFilename, title]);

  return (
    <div className="relative group/chart">
      <div className="absolute top-2 z-10 flex items-center gap-1 opacity-0 group-hover/chart:opacity-100 transition-opacity" style={{ insetInlineEnd: "0.5rem" }}>
        {csvData && csvData.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 bg-background/80 backdrop-blur-sm"
            onClick={handleDownloadCsv}
            title={language === "ar" ? "تحميل CSV" : "Download CSV"}
            data-testid="button-download-csv"
          >
            <FileDown className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 backdrop-blur-sm"
          onClick={handleDownloadPng}
          title={language === "ar" ? "تحميل PNG" : "Download PNG"}
          data-testid="button-download-png"
        >
          <Download className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsFullscreen(true)}
          title={language === "ar" ? "ملء الشاشة" : "Fullscreen"}
          data-testid="button-fullscreen"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div ref={chartRef}>
        {children}
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] h-[85vh] p-6">
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          <div className="flex-1 overflow-auto h-full">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
