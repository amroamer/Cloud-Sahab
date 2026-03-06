import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plane,
  Cloud,
  Eye,
  EyeOff,
  Languages,
  Sun,
  Moon,
  Loader2,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";

export default function LoginPage() {
  const { t, language, setLanguage } = useTranslation();
  const { toggleTheme, isDark } = useTheme();
  const { login } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (!success) {
        setError(t("login.error"));
      } else {
        navigate("/home");
      }
    } catch {
      setError(t("login.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground w-full">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm relative">
                <Cloud className="h-8 w-8 text-white/40 absolute" />
                <Plane className="h-7 w-7 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {language === "ar" ? "سحاب" : "Sahab"}
                </h1>
                <p className="text-sm opacity-80 font-medium">
                  {language === "ar" ? "سحاب" : "سحاب"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight max-w-lg">
                {language === "ar"
                  ? "المنصة الوطنية لبيانات الطيران"
                  : "National Aviation Data Platform"}
              </h2>
              <p className="text-lg opacity-80 mt-4 max-w-md leading-relaxed">
                {language === "ar"
                  ? "تحليلات شاملة للطيران المدني في المملكة العربية السعودية. بيانات في الوقت الفعلي، رؤى ذكية، وتتبع رؤية ٢٠٣٠."
                  : "Comprehensive civil aviation analytics for the Kingdom of Saudi Arabia. Real-time data, intelligent insights, and Vision 2030 tracking."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">29</p>
                <p className="text-xs opacity-70 mt-1">
                  {language === "ar" ? "مطار" : "Airports"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">330M</p>
                <p className="text-xs opacity-70 mt-1">
                  {language === "ar" ? "هدف المسافرين" : "Traveler Target"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">250</p>
                <p className="text-xs opacity-70 mt-1">
                  {language === "ar" ? "هدف الاتصال" : "Connectivity Target"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs opacity-60">
            <Shield className="h-3.5 w-3.5" />
            <span>{t("app.gaca")} - {language === "ar" ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-sm">
          <div className="absolute top-4 flex items-center gap-1" style={{ insetInlineStart: "1rem" }}>
            <Link href="/">
              <Button size="sm" variant="ghost" className="text-xs gap-1.5" data-testid="button-back-home">
                <ArrowLeft className="h-3.5 w-3.5" />
                {language === "ar" ? "الرئيسية" : "Home"}
              </Button>
            </Link>
          </div>
          <div className="absolute top-4 flex gap-1" style={{ insetInlineEnd: "1rem" }}>
            <Button size="icon" variant="ghost" onClick={() => setLanguage(language === "en" ? "ar" : "en")} data-testid="button-login-language">
              <Languages className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={toggleTheme} data-testid="button-login-theme">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary relative">
              <Cloud className="h-7 w-7 text-primary-foreground/40 absolute" />
              <Plane className="h-5 w-5 text-primary-foreground relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{language === "ar" ? "سحاب" : "Sahab"}</h1>
              <p className="text-xs text-muted-foreground">{t("app.tagline")}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight" data-testid="text-login-title">{t("login.title")}</h2>
            <p className="text-sm text-muted-foreground mt-1.5">{t("login.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{language === "ar" ? "اسم المستخدم" : "Username"}</Label>
              <Input
                id="username"
                type="text"
                placeholder={language === "ar" ? "اسم المستخدم" : "Enter your username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                data-testid="input-username"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("login.password")}</Label>
                <button type="button" className="text-xs text-primary" data-testid="link-forgot-password">
                  {t("login.forgot")}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${language === "ar" ? "left-3" : "right-3"}`}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive" data-testid="text-login-error">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-sign-in">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("login.signIn")}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">{t("login.or")}</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="secondary"
            className="w-full"
            data-testid="button-sso"
            onClick={() => toast({
              title: language === "ar" ? "تسجيل الدخول الموحد" : "SSO Login",
              description: language === "ar" ? "سيتم إعادة توجيهك إلى نظام GACA للمصادقة." : "You would be redirected to GACA's identity provider for authentication.",
            })}
          >
            <Shield className="h-4 w-4" />
            {t("login.sso")}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <button className="text-primary font-medium" data-testid="link-request-access">
              {t("login.requestAccess")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
