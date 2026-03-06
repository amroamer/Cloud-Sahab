import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Filter, ChevronDown, RotateCcw, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  defaultValue: string;
}

interface DashboardFiltersProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
  onExport?: () => void;
}

export function DashboardFilters({
  filters,
  values,
  onChange,
  onReset,
  onExport,
}: DashboardFiltersProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const activeCount = filters.filter(
    (f) => values[f.key] !== f.defaultValue
  ).length;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            data-testid="button-toggle-filters"
            className="gap-2"
          >
            <Filter className="h-3.5 w-3.5" />
            {t("dashboard.filters")}
            {activeCount > 0 && (
              <Badge
                variant="default"
                className="no-default-active-elevate h-5 min-w-5 px-1.5 text-[10px] font-bold"
              >
                {activeCount}
              </Badge>
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        {onExport && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onExport}
            data-testid="button-export-dashboard"
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            {t("dashboard.export")}
          </Button>
        )}
      </div>
      <CollapsibleContent>
        <div className="mt-3 flex flex-wrap items-end gap-3 rounded-lg border bg-muted/30 p-3">
          {filters.map((f) => (
            <div key={f.key} className="space-y-1">
              <label className="text-[11px] font-medium text-muted-foreground">
                {f.label}
              </label>
              <Select
                value={values[f.key]}
                onValueChange={(v) => onChange(f.key, v)}
              >
                <SelectTrigger
                  className="w-[170px] h-8 text-xs"
                  data-testid={`filter-${f.key}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              data-testid="button-reset-filters"
              className="gap-1.5 text-xs h-8"
            >
              <RotateCcw className="h-3 w-3" />
              {t("dashboard.reset")}
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function useFilterState(filters: FilterConfig[]) {
  const defaults: Record<string, string> = {};
  filters.forEach((f) => {
    defaults[f.key] = f.defaultValue;
  });
  const [values, setValues] = useState(defaults);

  const onChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onReset = () => {
    setValues(defaults);
  };

  return { values, onChange, onReset };
}
