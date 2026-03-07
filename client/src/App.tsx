import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider, useAuth, isPathAllowed, type UserRole } from "@/lib/auth";
import { useLocation as useWouterLocation } from "wouter";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import DashboardOverview from "@/pages/dashboard-overview";
import DashboardFlightOps from "@/pages/dashboard-flight-ops";
import DashboardPassengers from "@/pages/dashboard-passengers";
import DashboardConnectivity from "@/pages/dashboard-connectivity";
import DashboardAirports from "@/pages/dashboard-airports";
import DashboardCargo from "@/pages/dashboard-cargo";
import DashboardFinancial from "@/pages/dashboard-financial";
import DashboardBop from "@/pages/dashboard-bop";
import DashboardFleet from "@/pages/dashboard-fleet";
import DashboardDigital from "@/pages/dashboard-digital";
import DashboardAjwaaLicensing from "@/pages/dashboard-ajwaa-licensing";
import DashboardAjwaaPermits from "@/pages/dashboard-ajwaa-permits";
import DashboardAjwaaEconomic from "@/pages/dashboard-ajwaa-economic";
import DashboardAjwaaProviders from "@/pages/dashboard-ajwaa-providers";
import DashboardAjwaaEservices from "@/pages/dashboard-ajwaa-eservices";
import ExplorerPage from "@/pages/explorer";
import UserGuidePage from "@/pages/user-guide";
import CatalogPage from "@/pages/catalog";
import CatalogDetailPage from "@/pages/catalog-detail";
import RouteMapPage from "@/pages/route-map";
import AirportPulsePage from "@/pages/airport-pulse";
import { PlaceholderPage } from "@/pages/placeholder";
import { Redirect } from "wouter";

function RoleGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [location] = useWouterLocation();
  if (!user) return <Redirect to="/" />;
  if (!isPathAllowed(user.role as UserRole, location)) {
    return <Redirect to="/home" />;
  }
  return <>{children}</>;
}

function AuthenticatedRouter() {
  return (
    <RoleGuard>
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/dashboards/overview" component={DashboardOverview} />
      <Route path="/dashboards/flight-ops" component={DashboardFlightOps} />
      <Route path="/dashboards/passengers" component={DashboardPassengers} />
      <Route path="/dashboards/connectivity" component={DashboardConnectivity} />
      <Route path="/dashboards/airports" component={DashboardAirports} />
      <Route path="/dashboards/cargo" component={DashboardCargo} />
      <Route path="/dashboards/financial" component={DashboardFinancial} />
      <Route path="/dashboards/bop" component={DashboardBop} />
      <Route path="/dashboards/fleet" component={DashboardFleet} />
      <Route path="/dashboards/digital" component={DashboardDigital} />
      <Route path="/dashboards/ajwaa-licensing" component={DashboardAjwaaLicensing} />
      <Route path="/dashboards/ajwaa-permits" component={DashboardAjwaaPermits} />
      <Route path="/dashboards/ajwaa-economic" component={DashboardAjwaaEconomic} />
      <Route path="/dashboards/ajwaa-providers" component={DashboardAjwaaProviders} />
      <Route path="/dashboards/ajwaa-eservices" component={DashboardAjwaaEservices} />
      <Route path="/explorer" component={ExplorerPage} />
      <Route path="/route-map" component={RouteMapPage} />
      <Route path="/guide" component={UserGuidePage} />
      <Route path="/self-service">{() => <PlaceholderPage path="/self-service" />}</Route>
      <Route path="/reports">{() => <PlaceholderPage path="/reports" />}</Route>
      <Route path="/catalog/:productId" component={CatalogDetailPage} />
      <Route path="/catalog" component={CatalogPage} />
      <Route path="/api-portal">{() => <PlaceholderPage path="/api-portal" />}</Route>
      <Route path="/notifications">{() => <PlaceholderPage path="/notifications" />}</Route>
      <Route path="/settings">{() => <PlaceholderPage path="/settings" />}</Route>
      <Route component={NotFound} />
    </Switch>
    </RoleGuard>
  );
}

function AuthenticatedLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <TopNav />
          <main className="flex-1 overflow-hidden">
            <AuthenticatedRouter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function FullScreenRoute({ component: Component }: { component: React.ComponentType }) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/" />;
  return <Component />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {() => isAuthenticated ? <Redirect to="/home" /> : <LandingPage />}
      </Route>
      <Route path="/login">
        {() => isAuthenticated ? <Redirect to="/home" /> : <LoginPage />}
      </Route>
      <Route path="/airport-pulse">
        {() => <FullScreenRoute component={AirportPulsePage} />}
      </Route>
      <Route>
        {() => isAuthenticated ? <AuthenticatedLayout /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <AppContent />
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
