import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Languages,
  User,
  Settings,
  HelpCircle,
  LogOut,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    type: "critical",
    title: "Connectivity Index Below Target Pace",
    titleAr: "مؤشر الاتصال أقل من المسار المستهدف",
    time: "2 min ago",
    timeAr: "منذ ٢ دقيقة",
  },
  {
    id: "2",
    type: "warning",
    title: "KKIA Passenger Volume Drop -8% WoW",
    titleAr: "انخفاض حجم المسافرين في مطار الملك خالد -٨٪ أسبوعياً",
    time: "1 hour ago",
    timeAr: "منذ ١ ساعة",
  },
  {
    id: "3",
    type: "info",
    title: "Monthly Traffic Report Published",
    titleAr: "تم نشر تقرير حركة المرور الشهري",
    time: "3 hours ago",
    timeAr: "منذ ٣ ساعات",
  },
];

export function TopNav() {
  const { t, language, setLanguage, isRTL } = useTranslation();
  const { toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);

  const notificationIcons: Record<string, typeof Info> = {
    critical: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const notificationColors: Record<string, string> = {
    critical: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b px-3 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger data-testid="button-sidebar-toggle" />

        <div className={`relative max-w-md flex-1 transition-all ${searchFocused ? "max-w-lg" : ""}`}>
          <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground start-3" />
          <Input
            type="search"
            placeholder={t("common.search")}
            className="ps-9 pe-3 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background transition-colors"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            data-testid="input-global-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          data-testid="button-language-toggle"
        >
          <Languages className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative" data-testid="button-notifications">
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center no-default-active-elevate"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-80">
            <div className="p-2 font-semibold text-sm">{t("nav.notifications")}</div>
            <DropdownMenuSeparator />
            {mockNotifications.map((notif) => {
              const Icon = notificationIcons[notif.type];
              return (
                <DropdownMenuItem key={notif.id} className="flex items-start gap-3 p-3 cursor-pointer" data-testid={`notification-item-${notif.id}`}>
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${notificationColors[notif.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{language === "ar" ? notif.titleAr : notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? notif.timeAr : notif.time}</p>
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary text-sm cursor-pointer" data-testid="link-view-all-notifications">
              {t("home.viewAll")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2" data-testid="button-user-menu">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">
                {language === "ar" ? user?.nameAr : user?.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
            <div className="p-2">
              <p className="text-sm font-semibold">{language === "ar" ? user?.nameAr : user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
              <p className="text-xs text-muted-foreground">{language === "ar" ? user?.organizationAr : user?.organization}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="link-profile">
              <User className="h-4 w-4" />
              <span>{t("common.profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="link-preferences">
              <Settings className="h-4 w-4" />
              <span>{t("common.preferences")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="link-help">
              <HelpCircle className="h-4 w-4" />
              <span>{t("common.help")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} data-testid="button-sign-out">
              <LogOut className="h-4 w-4" />
              <span>{t("common.signOut")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
