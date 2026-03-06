import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SectionTooltipProps {
  tooltip: string;
  testId?: string;
}

export function SectionTooltip({ tooltip, testId }: SectionTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="button"
            tabIndex={0}
            className="inline-flex items-center"
            data-testid={testId || "tooltip-section-info"}
          >
            <Info className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px] text-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
