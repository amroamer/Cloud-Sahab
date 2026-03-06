import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  role: string;
  organization: string;
  organizationAr: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: AuthUser = {
  id: "1",
  name: "Mohammed Al-Rashid",
  nameAr: "محمد الراشد",
  email: "m.alrashid@gaca.gov.sa",
  role: "GACA Analyst",
  organization: "General Authority of Civil Aviation",
  organizationAr: "الهيئة العامة للطيران المدني",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem("sahab-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USER);
    sessionStorage.setItem("sahab-user", JSON.stringify(MOCK_USER));
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
