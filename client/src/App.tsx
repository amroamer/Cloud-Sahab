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
import { AuthProvider, useAuth } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import DashboardOverview from "@/pages/dashboard-overview";
import { PlaceholderPage } from "@/pages/placeholder";
import { Redirect } from "wouter";

function AuthenticatedRouter() {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/dashboards/overview" component={DashboardOverview} />
      <Route path="/dashboards/airports">{() => <PlaceholderPage path="/dashboards/airports" />}</Route>
      <Route path="/dashboards/airlines">{() => <PlaceholderPage path="/dashboards/airlines" />}</Route>
      <Route path="/dashboards/connectivity">{() => <PlaceholderPage path="/dashboards/connectivity" />}</Route>
      <Route path="/dashboards/cargo">{() => <PlaceholderPage path="/dashboards/cargo" />}</Route>
      <Route path="/dashboards/regulatory">{() => <PlaceholderPage path="/dashboards/regulatory" />}</Route>
      <Route path="/explorer">{() => <PlaceholderPage path="/explorer" />}</Route>
      <Route path="/self-service">{() => <PlaceholderPage path="/self-service" />}</Route>
      <Route path="/reports">{() => <PlaceholderPage path="/reports" />}</Route>
      <Route path="/catalog">{() => <PlaceholderPage path="/catalog" />}</Route>
      <Route path="/api-portal">{() => <PlaceholderPage path="/api-portal" />}</Route>
      <Route path="/notifications">{() => <PlaceholderPage path="/notifications" />}</Route>
      <Route path="/settings">{() => <PlaceholderPage path="/settings" />}</Route>
      <Route component={NotFound} />
    </Switch>
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
