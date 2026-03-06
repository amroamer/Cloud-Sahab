import { useLocation, Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import {
  Home,
  LayoutDashboard,
  Globe,
  BarChart3,
  FileText,
  Database,
  Code,
  Bell,
  Settings,
  Plane,
  Building2,
  TrendingUp,
  Map,
  Package,
  Shield,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const dashboardItems = [
    { title: t("nav.overview"), url: "/dashboards/overview", icon: Globe },
    { title: t("nav.airports"), url: "/dashboards/airports", icon: Building2 },
    { title: t("nav.airlines"), url: "/dashboards/airlines", icon: Plane },
    { title: t("nav.connectivity"), url: "/dashboards/connectivity", icon: Map },
    { title: t("nav.cargo"), url: "/dashboards/cargo", icon: Package },
    { title: t("nav.regulatory"), url: "/dashboards/regulatory", icon: Shield },
  ];

  const mainItems = [
    { title: t("nav.home"), url: "/", icon: Home },
  ];

  const toolItems = [
    { title: t("nav.explorer"), url: "/explorer", icon: BarChart3 },
    { title: t("nav.selfService"), url: "/self-service", icon: TrendingUp },
    { title: t("nav.reports"), url: "/reports", icon: FileText },
    { title: t("nav.catalog"), url: "/catalog", icon: Database },
    { title: t("nav.api"), url: "/api-portal", icon: Code },
  ];

  const systemItems = [
    { title: t("nav.notifications"), url: "/notifications", icon: Bell },
    { title: t("nav.settings"), url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" data-testid="link-home-logo">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{t("app.name")}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{t("app.tagline")}</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    data-active={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-nav-${item.url.replace(/\//g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-1">
                {t("nav.dashboards")}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {dashboardItems.map((item) => (
                        <SidebarMenuSubItem key={item.url}>
                          <SidebarMenuSubButton
                            asChild
                            data-active={location === item.url}
                          >
                            <Link href={item.url} data-testid={`link-nav-${item.url.replace(/\//g, "-")}`}>
                              <item.icon className="h-3.5 w-3.5" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.explorer")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    data-active={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-nav-${item.url.replace(/\//g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    data-active={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-nav-${item.url.replace(/\//g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="text-[10px] text-muted-foreground text-center leading-relaxed">
          {t("app.gaca")}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
