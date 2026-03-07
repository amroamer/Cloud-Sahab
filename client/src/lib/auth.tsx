import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole =
  | "Platform Admin"
  | "Marketplace Admin"
  | "GACA Executive"
  | "GACA Analyst"
  | "GACA Regulator"
  | "Airline Operator"
  | "Airport Operator"
  | "Investor/Analyst"
  | "Researcher";

export interface AuthUser {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  role: UserRole;
  organization: string;
  organizationAr: string;
  avatar?: string;
}

export interface DemoAccount {
  username: string;
  password: string;
  label: string;
  labelAr: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS: { username: string; password: string; user: AuthUser }[] = [
  {
    username: "amro",
    password: "amro",
    user: {
      id: "1",
      name: "Amro",
      nameAr: "عمرو",
      email: "amro@gaca.gov.sa",
      role: "Platform Admin",
      organization: "General Authority of Civil Aviation",
      organizationAr: "الهيئة العامة للطيران المدني",
    },
  },
  {
    username: "executive",
    password: "exec123",
    user: {
      id: "2",
      name: "Sultan Al-Rashid",
      nameAr: "سلطان الراشد",
      email: "sultan@gaca.gov.sa",
      role: "GACA Executive",
      organization: "General Authority of Civil Aviation",
      organizationAr: "الهيئة العامة للطيران المدني",
    },
  },
  {
    username: "analyst",
    password: "analyst123",
    user: {
      id: "3",
      name: "Noura Al-Dosari",
      nameAr: "نورة الدوسري",
      email: "noura@gaca.gov.sa",
      role: "GACA Analyst",
      organization: "General Authority of Civil Aviation",
      organizationAr: "الهيئة العامة للطيران المدني",
    },
  },
  {
    username: "airline",
    password: "airline123",
    user: {
      id: "4",
      name: "Fahd Al-Otaibi",
      nameAr: "فهد العتيبي",
      email: "fahd@saudia.com",
      role: "Airline Operator",
      organization: "Saudia Airlines",
      organizationAr: "الخطوط السعودية",
    },
  },
  {
    username: "admin",
    password: "admin123",
    user: {
      id: "5",
      name: "Reem Al-Harbi",
      nameAr: "ريم الحربي",
      email: "reem@gaca.gov.sa",
      role: "Marketplace Admin",
      organization: "General Authority of Civil Aviation",
      organizationAr: "الهيئة العامة للطيران المدني",
    },
  },
];

export const DEMO_ACCOUNTS: DemoAccount[] = USERS.map((u) => ({
  username: u.username,
  password: u.password,
  label: `${u.user.name} (${u.user.role})`,
  labelAr: `${u.user.nameAr} (${u.user.role})`,
  role: u.user.role,
}));

const INTERNAL_ROLES: UserRole[] = [
  "Platform Admin",
  "Marketplace Admin",
  "GACA Executive",
  "GACA Analyst",
  "GACA Regulator",
];

export function isInternalRole(role: UserRole): boolean {
  return INTERNAL_ROLES.includes(role);
}

export const ROLE_ALLOWED_PATHS: Record<UserRole, string[]> = {
  "Platform Admin": ["*"],
  "Marketplace Admin": ["*"],
  "GACA Executive": [
    "/home", "/dashboards/overview", "/dashboards/flight-ops", "/dashboards/passengers",
    "/dashboards/connectivity", "/dashboards/airports", "/dashboards/cargo",
    "/dashboards/financial", "/dashboards/bop", "/dashboards/fleet", "/dashboards/digital",
    "/dashboards/ajwaa-licensing", "/dashboards/ajwaa-permits", "/dashboards/ajwaa-economic",
    "/dashboards/ajwaa-providers", "/dashboards/ajwaa-eservices",
    "/route-map", "/reports", "/catalog", "/notifications", "/guide",
  ],
  "GACA Analyst": [
    "/home", "/dashboards/overview", "/dashboards/flight-ops", "/dashboards/passengers",
    "/dashboards/connectivity", "/dashboards/airports", "/dashboards/cargo",
    "/dashboards/financial", "/dashboards/bop", "/dashboards/fleet", "/dashboards/digital",
    "/dashboards/ajwaa-licensing", "/dashboards/ajwaa-permits", "/dashboards/ajwaa-economic",
    "/dashboards/ajwaa-providers", "/dashboards/ajwaa-eservices",
    "/explorer", "/route-map", "/self-service", "/reports", "/catalog", "/notifications", "/guide",
  ],
  "GACA Regulator": [
    "/home", "/dashboards/overview", "/dashboards/flight-ops", "/dashboards/passengers",
    "/dashboards/connectivity", "/dashboards/airports", "/dashboards/cargo",
    "/dashboards/financial", "/dashboards/bop", "/dashboards/fleet", "/dashboards/digital",
    "/dashboards/ajwaa-licensing", "/dashboards/ajwaa-permits", "/dashboards/ajwaa-economic",
    "/dashboards/ajwaa-providers", "/dashboards/ajwaa-eservices",
    "/explorer", "/route-map", "/reports", "/catalog", "/notifications", "/guide",
  ],
  "Airline Operator": [
    "/home", "/dashboards/overview", "/dashboards/connectivity", "/dashboards/flight-ops",
    "/dashboards/financial", "/route-map", "/reports", "/catalog", "/api-portal", "/guide",
  ],
  "Airport Operator": [
    "/home", "/dashboards/overview", "/dashboards/airports", "/dashboards/passengers",
    "/dashboards/cargo", "/reports", "/catalog", "/api-portal", "/guide",
  ],
  "Investor/Analyst": [
    "/home", "/dashboards/overview", "/reports", "/catalog", "/api-portal", "/guide",
  ],
  "Researcher": [
    "/home", "/dashboards/overview", "/reports", "/catalog", "/api-portal", "/guide",
  ],
};

export function isPathAllowed(role: UserRole, path: string): boolean {
  const allowed = ROLE_ALLOWED_PATHS[role];
  if (allowed.includes("*")) return true;
  const pathname = path.split("?")[0].split("#")[0];
  return allowed.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem("sahab-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const match = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!match) return false;
    setUser(match.user);
    sessionStorage.setItem("sahab-user", JSON.stringify(match.user));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("sahab-user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
