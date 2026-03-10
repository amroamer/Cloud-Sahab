import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useCart } from "@/lib/cart-context";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ShoppingCart,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
  FileSpreadsheet,
  FileText,
  FileJson,
  File,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function getFormatIcon(format: string) {
  switch (format) {
    case "XLSX":
    case "CSV":
      return <FileSpreadsheet className="h-3.5 w-3.5" />;
    case "PDF":
      return <FileText className="h-3.5 w-3.5" />;
    case "JSON":
      return <FileJson className="h-3.5 w-3.5" />;
    default:
      return <File className="h-3.5 w-3.5" />;
  }
}

export default function CartPage() {
  const { language } = useTranslation();
  const { items, itemCount, subtotal, discount, vat, total, promoCode, removeFromCart, clearCart, applyPromo, removePromo } = useCart();
  const { toast } = useToast();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleApplyPromo = () => {
    setPromoError(false);
    if (!promoInput.trim()) return;
    const code = promoInput.trim().toUpperCase();
    const PROMO_RATES: Record<string, number> = { GACA2026: 10, SAHAB10: 10, AVIATION20: 20 };
    const valid = applyPromo(code);
    if (valid) {
      toast({
        title: language === "ar" ? "تم تطبيق الرمز" : "Promo Applied",
        description: language === "ar"
          ? `خصم ${PROMO_RATES[code] || 10}%`
          : `${PROMO_RATES[code] || 10}% discount applied`,
      });
      setPromoInput("");
    } else {
      setPromoError(true);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    const orderNum = `SAH-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
    setOrderNumber(orderNum);
    setCheckoutComplete(true);
    toast({
      title: language === "ar" ? "تم الدفع بنجاح!" : "Payment Successful!",
      description: language === "ar" ? `رقم الطلب: ${orderNum}` : `Order #${orderNum}`,
    });
  };

  if (checkoutComplete) {
    return (
      <ScrollArea className="h-full">
        <div className="p-6 max-w-[600px] mx-auto">
          <Card className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2" data-testid="text-checkout-success">
              {language === "ar" ? "تم الدفع بنجاح!" : "Payment Successful!"}
            </h1>
            <p className="text-sm text-muted-foreground mb-1">
              {language === "ar" ? "رقم الطلب:" : "Order Number:"}{" "}
              <span className="font-mono font-semibold" dir="ltr" data-testid="text-order-number">{orderNumber}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {language === "ar"
                ? "فاتورة ZATCA الخاصة بك جاهزة للتحميل"
                : "Your ZATCA invoice is ready for download"}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/data-products">
                <Button className="w-full" data-testid="button-continue-shopping">
                  <ShoppingBag className="h-4 w-4" />
                  {language === "ar" ? "متابعة التسوق" : "Continue Shopping"}
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  clearCart();
                  setCheckoutComplete(false);
                }}
                data-testid="button-new-order"
              >
                {language === "ar" ? "طلب جديد" : "New Order"}
              </Button>
            </div>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  if (itemCount === 0) {
    return (
      <ScrollArea className="h-full">
        <div className="p-6 max-w-[600px] mx-auto">
          <Card className="p-8 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2" data-testid="text-empty-cart">
              {language === "ar" ? "سلة التسوق فارغة" : "Your Cart is Empty"}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              {language === "ar"
                ? "تصفح كتالوج البيانات وأضف منتجات إلى سلتك"
                : "Browse the data catalog and add products to your cart"}
            </p>
            <Link href="/data-products">
              <Button data-testid="button-browse-products">
                <ShoppingBag className="h-4 w-4" />
                {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
              </Button>
            </Link>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1000px] mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2" data-testid="text-cart-title">
            <ShoppingCart className="h-6 w-6" />
            {language === "ar" ? "سلة التسوق" : "Shopping Cart"}
            <Badge variant="secondary" className="text-xs">
              {itemCount} {language === "ar" ? "عنصر" : itemCount === 1 ? "item" : "items"}
            </Badge>
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-destructive"
            onClick={() => {
              clearCart();
              toast({
                title: language === "ar" ? "تم مسح السلة" : "Cart Cleared",
              });
            }}
            data-testid="button-clear-cart"
          >
            <Trash2 className="h-3 w-3" />
            {language === "ar" ? "مسح الكل" : "Clear All"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {items.map((item) => {
              const name = language === "ar" ? item.product.nameAr : item.product.name;
              const category = language === "ar" ? item.product.categoryAr : item.product.category;
              const period = language === "ar" ? item.product.periodAr : item.product.period;

              return (
                <Card key={item.product.id} className="p-4" data-testid={`cart-item-${item.product.id}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">{category}</Badge>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          {getFormatIcon(item.format)}
                          {item.format}
                        </span>
                      </div>
                      <Link href={`/data-products/${item.product.id}`}>
                        <h3 className="text-sm font-semibold leading-snug mb-1 hover:underline" data-testid={`text-cart-product-${item.product.id}`}>
                          {name}
                        </h3>
                      </Link>
                      <p className="text-[10px] text-muted-foreground">{period}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-bold" dir="ltr" data-testid={`text-cart-price-${item.product.id}`}>
                        SAR {item.product.price.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground"
                        onClick={() => removeFromCart(item.product.id)}
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <Card className="p-4 space-y-4" data-testid="card-order-summary">
              <h3 className="text-sm font-semibold">
                {language === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{language === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-mono" dir="ltr">SAR {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between gap-2 text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {language === "ar" ? "خصم" : "Discount"} ({promoCode})
                    </span>
                    <span className="font-mono" dir="ltr">-SAR {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{language === "ar" ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}</span>
                  <span className="font-mono" dir="ltr">SAR {vat.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex items-center justify-between gap-2 font-bold">
                  <span>{language === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="text-lg font-mono" dir="ltr" data-testid="text-cart-total">SAR {total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={processing}
                data-testid="button-checkout"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {language === "ar" ? "جاري المعالجة..." : "Processing..."}
                  </span>
                ) : (
                  <>
                    {language === "ar" ? `ادفع ${total.toLocaleString()} ر.س` : `Pay SAR ${total.toLocaleString()}`}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-4 space-y-3" data-testid="card-promo">
              <h3 className="text-sm font-semibold flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                {language === "ar" ? "رمز ترويجي" : "Promo Code"}
              </h3>
              {promoCode ? (
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-500/10 rounded-md">
                  <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">{promoCode}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={removePromo} data-testid="button-remove-promo">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder={language === "ar" ? "أدخل الرمز" : "Enter code"}
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError(false);
                    }}
                    className={`text-xs ${promoError ? "border-destructive" : ""}`}
                    data-testid="input-promo-code"
                  />
                  <Button size="sm" variant="outline" onClick={handleApplyPromo} data-testid="button-apply-promo">
                    {language === "ar" ? "تطبيق" : "Apply"}
                  </Button>
                </div>
              )}
              {promoError && (
                <p className="text-[10px] text-destructive">
                  {language === "ar" ? "رمز غير صالح" : "Invalid promo code"}
                </p>
              )}
            </Card>

            <Link href="/data-products">
              <Button variant="outline" className="w-full text-xs" data-testid="button-continue-shopping">
                {language === "ar" ? "← متابعة التسوق" : "← Continue Shopping"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
