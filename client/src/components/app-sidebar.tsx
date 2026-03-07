import { useLocation, Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { useAuth, isPathAllowed, isInternalRole, type UserRole } from "@/lib/auth";
import {
  Home,
  LayoutDashboard,
  Globe,
  BarChart3,
  FileText,
  Code,
  Bell,
  Settings,
  Plane,
  Cloud,
  Building2,
  TrendingUp,
  Map,
  Package,
  Shield,
  ChevronDown,
  Navigation,
  Users,
  DollarSign,
  Scale,
  Leaf,
  Radar,
  ClipboardCheck,
  Award,
  FileCheck,
  Landmark,
  Warehouse,
  Monitor,
  BookOpen,
  ShoppingBag,
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

type NavItem = { title: string; url: string; icon: typeof Home };

function filterByRole(items: NavItem[], role: UserRole): NavItem[] {
  return items.filter((item) => isPathAllowed(role, item.url));
}

export function AppSidebar() {
  const { t, language, isRTL } = useTranslation();
  const [location] = useLocation();
  const { user } = useAuth();
  const role = (user?.role || "Platform Admin") as UserRole;
  const external = !isInternalRole(role);

  const dashboardItems: NavItem[] = [
    { title: t("nav.overview"), url: "/dashboards/overview", icon: Globe },
    { title: t("nav.flightOps"), url: "/dashboards/flight-ops", icon: Radar },
    { title: t("nav.passengers"), url: "/dashboards/passengers", icon: Users },
    { title: t("nav.connectivity"), url: "/dashboards/connectivity", icon: Map },
    { title: t("nav.airports"), url: "/dashboards/airports", icon: Building2 },
    { title: t("nav.cargo"), url: "/dashboards/cargo", icon: Package },
    { title: t("nav.financial"), url: "/dashboards/financial", icon: DollarSign },
    { title: t("nav.bop"), url: "/dashboards/bop", icon: Scale },
    { title: t("nav.fleet"), url: "/dashboards/fleet", icon: Plane },
    { title: t("nav.digital"), url: "/dashboards/digital", icon: Leaf },
  ];

  const ajwaaItems: NavItem[] = [
    { title: t("nav.ajwaaLicensing"), url: "/dashboards/ajwaa-licensing", icon: Award },
    { title: t("nav.ajwaaPermits"), url: "/dashboards/ajwaa-permits", icon: FileCheck },
    { title: t("nav.ajwaaEconomic"), url: "/dashboards/ajwaa-economic", icon: Landmark },
    { title: t("nav.ajwaaProviders"), url: "/dashboards/ajwaa-providers", icon: Warehouse },
    { title: t("nav.ajwaaEservices"), url: "/dashboards/ajwaa-eservices", icon: Monitor },
  ];

  const mainItems: NavItem[] = [
    { title: t("nav.home"), url: "/home", icon: Home },
  ];

  const catalogLabel = t("nav.dataMarketplace");
  const catalogIcon = ShoppingBag;

  const toolItems: NavItem[] = [
    { title: t("nav.explorer"), url: "/explorer", icon: BarChart3 },
    { title: t("nav.routeMap"), url: "/route-map", icon: Navigation },
    { title: t("nav.selfService"), url: "/self-service", icon: TrendingUp },
    { title: t("nav.reports"), url: "/reports", icon: FileText },
    { title: catalogLabel, url: "/catalog", icon: catalogIcon },
    { title: t("nav.api"), url: "/api-portal", icon: Code },
  ];

  const systemItems: NavItem[] = [
    { title: t("nav.notifications"), url: "/notifications", icon: Bell },
    { title: t("nav.settings"), url: "/settings", icon: Settings },
    { title: t("nav.userGuide"), url: "/guide", icon: BookOpen },
  ];

  const filteredDashboards = filterByRole(dashboardItems, role);
  const filteredAjwaa = filterByRole(ajwaaItems, role);
  const filteredTools = filterByRole(toolItems, role);
  const filteredSystem = filterByRole(systemItems, role);
  const showDashboards = filteredDashboards.length > 0;
  const showAjwaa = filteredAjwaa.length > 0 && showDashboards;

  return (
    <Sidebar side={isRTL ? "right" : "left"}>
      <SidebarHeader className="p-4">
        <Link href="/home" data-testid="link-home-logo">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sidebar-primary relative">
              <Cloud className="h-6 w-6 text-sidebar-primary-foreground/40 absolute" />
              <Plane className="h-5 w-5 text-sidebar-primary-foreground relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{t("app.name")}</span>
              <span className="text-[10px] text-sidebar-foreground/60 leading-tight">{t("app.tagline")}</span>
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

        {showDashboards && (
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
                        {filteredDashboards.map((item) => (
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
        )}

        {showAjwaa && (
          <SidebarGroup>
            <Collapsible defaultOpen className="group/ajwaa">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-1">
                  {t("nav.ajwaaServices")}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]/ajwaa:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuSub>
                        {filteredAjwaa.map((item) => (
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
        )}

        {filteredTools.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("nav.tools")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredTools.map((item) => (
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
        )}

        {filteredSystem.length > 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredSystem.map((item) => (
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
        )}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="text-[10px] text-sidebar-foreground/50 text-center leading-relaxed">
          {t("app.gaca")}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
