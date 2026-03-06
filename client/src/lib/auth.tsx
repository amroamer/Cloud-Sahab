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
];

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
