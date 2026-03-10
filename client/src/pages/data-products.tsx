import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAuth, isInternalRole } from "@/lib/auth";
import { useCart } from "@/lib/cart-context";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
  downloadProductCSV,
  type CatalogProduct,
} from "@/lib/catalog-data";
import {
  Search,
  Star,
  Download,
  Database,
  FileSpreadsheet,
  FileText,
  FileJson,
  File,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  X,
  ShoppingCart,
  Check,
  Building2,
  CalendarDays,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CATEGORY_TABS = [
  { key: "All", labelEn: "All", labelAr: "الكل" },
  { key: "Traffic", labelEn: "Traffic", labelAr: "حركة المرور" },
  { key: "Connectivity", labelEn: "Connectivity", labelAr: "الاتصال" },
  { key: "Market Share", labelEn: "Market", labelAr: "السوق" },
  { key: "Flight Operations", labelEn: "Ops", labelAr: "العمليات" },
  { key: "Cargo", labelEn: "Cargo", labelAr: "الشحن" },
  { key: "Infrastructure", labelEn: "Infra", labelAr: "البنية" },
  { key: "Financial", labelEn: "Financial", labelAr: "المالية" },
  { key: "Fleet", labelEn: "Fleet", labelAr: "الأسطول" },
  { key: "Sustainability", labelEn: "Sustainability", labelAr: "الاستدامة" },
  { key: "Digital & CX", labelEn: "CX", labelAr: "تجربة العملاء" },
  { key: "Bundles", labelEn: "Bundles", labelAr: "الحزم" },
  { key: "Free", labelEn: "Free", labelAr: "مجاني" },
];

const FREQUENCIES = ["Monthly", "Quarterly", "Annual", "One-time"];
const FORMATS = ["XLSX", "CSV", "PDF", "JSON"];

type SortOption = "newest" | "popular" | "price-asc" | "price-desc";

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

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;

  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && partial > 0
                ? "fill-amber-400/50 text-amber-400"
                : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function MarketplaceProductCard({
  product,
  language,
  isExternal,
}: {
  product: CatalogProduct;
  language: string;
  isExternal: boolean;
}) {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const name = language === "ar" ? product.nameAr : product.name;
  const desc = language === "ar" ? product.descriptionAr : product.description;
  const category = language === "ar" ? product.categoryAr : product.category;
  const period = language === "ar" ? product.periodAr : product.period;
  const scope = language === "ar" ? product.scopeAr : product.scope;
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
      toast({
        title: language === "ar" ? "تمت الإضافة للسلة" : "Added to Cart",
        description: name,
      });
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    downloadProductCSV(product);
  };

  return (
    <Link href={`/data-products/${product.id}`}>
      <Card
        className="p-4 hover-elevate cursor-pointer flex flex-col h-full"
        data-testid={`card-product-${product.id}`}
      >
        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
          <Badge variant="secondary" className="text-[10px]" data-testid={`badge-category-${product.id}`}>
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2"
          data-testid={`text-product-name-${product.id}`}
        >
          {name}
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2 flex-wrap">
          <span className="flex items-center gap-0.5">
            <CalendarDays className="h-3 w-3" />
            {period}
          </span>
          <span className="flex items-center gap-0.5">
            {getFormatIcon(product.format)}
            {product.format}
          </span>
          <span className="flex items-center gap-0.5">
            <Building2 className="h-3 w-3" />
            {scope}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{desc}</p>

        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t flex-wrap">
          {product.isFree ? (
            <>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 no-default-hover-elevate no-default-active-elevate text-xs">
                {language === "ar" ? "مجاني" : "Free"}
              </Badge>
              <Button
                size="sm"
                variant="default"
                data-testid={`button-download-${product.id}`}
                onClick={handleDownload}
              >
                <Download className="h-3.5 w-3.5" />
                {language === "ar" ? "تحميل" : "Download"}
              </Button>
            </>
          ) : isExternal ? (
            <>
              <span className="text-sm font-bold" data-testid={`text-price-${product.id}`}>
                {product.price.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}
              </span>
              {inCart ? (
                <Button
                  size="sm"
                  variant="secondary"
                  data-testid={`button-in-cart-${product.id}`}
                  onClick={handleAddToCart}
                  disabled
                >
                  <Check className="h-3.5 w-3.5" />
                  {language === "ar" ? "في السلة" : "In Cart"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="default"
                  data-testid={`button-add-cart-${product.id}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                </Button>
              )}
            </>
          ) : (
            <>
              <span className="text-sm font-bold" data-testid={`text-price-${product.id}`}>
                {product.price.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}
              </span>
              <Button
                size="sm"
                variant="default"
                data-testid={`button-access-${product.id}`}
              >
                {language === "ar" ? "الوصول للبيانات" : "Access Dataset"}
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Button>
            </>
          )}
        </div>

        {product.classification === "Confidential" && (
          <Badge variant="destructive" className="text-[10px] mt-2 w-fit">
            {language === "ar" ? "سري" : "Confidential"}
          </Badge>
        )}
      </Card>
    </Link>
  );
}

const ITEMS_PER_PAGE = 12;

export default function DataProductsPage() {
  const { language } = useTranslation();
  const { user } = useAuth();
  const isExternal = user ? !isInternalRole(user.role) : false;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(true);

  const maxPrice = useMemo(() => Math.max(...CATALOG_PRODUCTS.map((p) => p.price)), []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const toggleFrequency = (freq: string) => {
    setSelectedFrequencies((prev) =>
      prev.includes(freq) ? prev.filter((f) => f !== freq) : [...prev, freq]
    );
  };
  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveTab("All");
    setSelectedCategories([]);
    setSelectedFrequencies([]);
    setSelectedFormats([]);
    setFreeOnly(false);
    setPriceRange([0, maxPrice]);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filteredProducts = useMemo(() => {
    let products = [...CATALOG_PRODUCTS];
    if (activeTab === "Free") {
      products = products.filter((p) => p.isFree);
    } else if (activeTab !== "All") {
      products = products.filter((p) => p.category === activeTab);
    }
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedFrequencies.length > 0) {
      products = products.filter((p) => selectedFrequencies.includes(p.frequency));
    }
    if (selectedFormats.length > 0) {
      products = products.filter((p) => selectedFormats.includes(p.format));
    }
    if (freeOnly) {
      products = products.filter((p) => p.isFree);
    }
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.descriptionAr.includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.schema.some((s) => s.name.toLowerCase().includes(q) || s.nameAr.includes(q))
      );
    }
    switch (sortBy) {
      case "popular":
        products.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case "newest":
        products.sort((a, b) => b.recordCount - a.recordCount);
        break;
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
    }
    return products;
  }, [activeTab, selectedCategories, selectedFrequencies, selectedFormats, freeOnly, priceRange, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const activeFilterCount =
    selectedCategories.length +
    selectedFrequencies.length +
    selectedFormats.length +
    (freeOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  const freeCount = CATALOG_PRODUCTS.filter((p) => p.isFree).length;
  const newReleasesCount = 6;

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col">
        {isExternal && (
          <div
            className="relative bg-primary px-6 py-10 overflow-visible"
            data-testid="section-hero"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <div className="relative z-10 max-w-[1400px] mx-auto">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="max-w-xl">
                  <Badge className="mb-3 bg-accent text-accent-foreground border-accent-border text-xs">
                    <Sparkles className="h-3 w-3" />
                    {language === "ar" ? "سوق البيانات" : "Data Marketplace"}
                  </Badge>
                  <h1
                    className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight mb-2"
                    data-testid="text-hero-title"
                  >
                    {language === "ar"
                      ? "استخبارات الطيران السعودي — مباشرة من الجهة المنظمة"
                      : "Saudi Aviation Intelligence — Direct from the Regulator"}
                  </h1>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md">
                    {language === "ar"
                      ? "اكتشف مجموعات بيانات موثوقة وشاملة من الهيئة العامة للطيران المدني"
                      : "Discover trusted, comprehensive datasets from the General Authority of Civil Aviation"}
                  </p>
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-primary-foreground border-white/20">
                      {CATALOG_PRODUCTS.length} {language === "ar" ? "منتج" : "Products"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-primary-foreground border-white/20">
                      {freeCount} {language === "ar" ? "مجاني" : "Free"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-200 border-emerald-400/20">
                      {newReleasesCount} {language === "ar" ? "جديد" : "New"}
                    </Badge>
                  </div>
                </div>
                <Card className="p-4 max-w-xs w-full bg-card/95">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold">
                      {language === "ar" ? "المنتج المميز" : "Featured Product"}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1" data-testid="text-featured-product">
                    {language === "ar"
                      ? CATALOG_PRODUCTS[0].nameAr
                      : CATALOG_PRODUCTS[0].name}
                  </p>
                  <div className="flex items-center gap-1 mb-1">
                    <StarRating rating={CATALOG_PRODUCTS[0].rating} />
                    <span className="text-[10px] text-muted-foreground">
                      ({CATALOG_PRODUCTS[0].reviewCount})
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">
                    {CATALOG_PRODUCTS[0].price.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}
                  </p>
                  <Link href={`/data-products/${CATALOG_PRODUCTS[0].id}`}>
                    <Button size="sm" variant="secondary" className="w-full" data-testid="button-view-featured">
                      {language === "ar" ? "عرض المنتج" : "View Product"}
                      <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 max-w-[1400px] mx-auto w-full space-y-4">
          {!isExternal && (
            <div>
              <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
                {language === "ar" ? "واجهة سوق البيانات" : "Data Marketplace Storefront"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {language === "ar"
                  ? "تصفح واكتشف مجموعات البيانات المتاحة في المنصة"
                  : "Browse and discover available datasets on the platform"}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={
                  language === "ar"
                    ? "البحث في المنتجات والحقول..."
                    : "Search products, fields..."
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="ps-9"
                data-testid="input-search-products"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[160px]" data-testid="select-sort-products">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                  </SelectItem>
                  <SelectItem value="newest">
                    {language === "ar" ? "الأحدث" : "Newest"}
                  </SelectItem>
                  <SelectItem value="price-asc">
                    {language === "ar" ? "السعر: الأقل" : "Price: Low to High"}
                  </SelectItem>
                  <SelectItem value="price-desc">
                    {language === "ar" ? "السعر: الأعلى" : "Price: High to Low"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <Filter className="h-3.5 w-3.5" />
                {language === "ar" ? "فلاتر" : "Filters"}
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <ScrollArea className="w-full">
            <div className="flex items-center gap-1.5 pb-2 min-w-max">
              {CATEGORY_TABS.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? "default" : "ghost"}
                  size="sm"
                  className="text-xs whitespace-nowrap"
                  onClick={() => {
                    setActiveTab(tab.key);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  data-testid={`tab-${tab.key.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {language === "ar" ? tab.labelAr : tab.labelEn}
                  {tab.key !== "All" && (
                    <span className="text-[10px] opacity-60 ms-1">
                      {tab.key === "Free"
                        ? freeCount
                        : CATALOG_PRODUCTS.filter((p) => p.category === tab.key).length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            <Card
              className={`p-4 space-y-5 self-start ${showFilters ? "" : "hidden sm:block"}`}
              data-testid="panel-filters"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5" />
                  {language === "ar" ? "الفلاتر" : "Filters"}
                </h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={clearAllFilters}
                    data-testid="button-clear-filters"
                  >
                    <X className="h-3 w-3" />
                    {language === "ar" ? "مسح" : "Clear"}
                  </Button>
                )}
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  {language === "ar" ? "الفئة" : "Category"}
                </h4>
                <div className="space-y-1.5">
                  {CATALOG_CATEGORIES.map((cat) => (
                    <div key={cat.key} className="flex items-center gap-2">
                      <Checkbox
                        id={`dp-cat-${cat.key}`}
                        checked={selectedCategories.includes(cat.key)}
                        onCheckedChange={() => {
                          toggleCategory(cat.key);
                          setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        data-testid={`checkbox-cat-${cat.key.toLowerCase().replace(/\s+/g, "-")}`}
                      />
                      <Label htmlFor={`dp-cat-${cat.key}`} className="text-xs cursor-pointer">
                        {language === "ar" ? cat.labelAr : cat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  {language === "ar" ? "التكرار" : "Frequency"}
                </h4>
                <div className="space-y-1.5">
                  {FREQUENCIES.map((freq) => (
                    <div key={freq} className="flex items-center gap-2">
                      <Checkbox
                        id={`dp-freq-${freq}`}
                        checked={selectedFrequencies.includes(freq)}
                        onCheckedChange={() => {
                          toggleFrequency(freq);
                          setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        data-testid={`checkbox-freq-${freq.toLowerCase()}`}
                      />
                      <Label htmlFor={`dp-freq-${freq}`} className="text-xs cursor-pointer">
                        {freq}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  {language === "ar" ? "التنسيق" : "Format"}
                </h4>
                <div className="space-y-1.5">
                  {FORMATS.map((fmt) => (
                    <div key={fmt} className="flex items-center gap-2">
                      <Checkbox
                        id={`dp-fmt-${fmt}`}
                        checked={selectedFormats.includes(fmt)}
                        onCheckedChange={() => {
                          toggleFormat(fmt);
                          setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        data-testid={`checkbox-fmt-${fmt.toLowerCase()}`}
                      />
                      <Label htmlFor={`dp-fmt-${fmt}`} className="text-xs cursor-pointer flex items-center gap-1">
                        {getFormatIcon(fmt)}
                        {fmt}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  {language === "ar" ? "نطاق السعر (ر.س)" : "Price Range (SAR)"}
                </h4>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={500}
                  value={priceRange}
                  onValueChange={(val) => {
                    setPriceRange(val as [number, number]);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="mt-3"
                  data-testid="slider-price"
                />
                <div className="flex items-center justify-between gap-2 mt-2 text-[10px] text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="dp-free-only" className="text-xs cursor-pointer">
                  {language === "ar" ? "المجاني فقط" : "Free Only"}
                </Label>
                <Switch
                  id="dp-free-only"
                  checked={freeOnly}
                  onCheckedChange={(checked) => {
                    setFreeOnly(checked);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  data-testid="switch-free-only"
                />
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs text-muted-foreground" data-testid="text-result-count">
                  {language === "ar"
                    ? `${filteredProducts.length} منتج`
                    : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <Card className="p-10 text-center">
                  <Database className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    {language === "ar" ? "لا توجد منتجات" : "No products found"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {language === "ar"
                      ? "جرب تعديل الفلاتر أو مصطلح البحث"
                      : "Try adjusting your filters or search term"}
                  </p>
                  <Button variant="outline" size="sm" onClick={clearAllFilters} data-testid="button-clear-all">
                    {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {visibleProducts.map((product) => (
                      <MarketplaceProductCard
                        key={product.id}
                        product={product}
                        language={language}
                        isExternal={isExternal}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                        data-testid="button-load-more"
                      >
                        {language === "ar"
                          ? `تحميل المزيد (${filteredProducts.length - visibleCount} متبقي)`
                          : `Load More (${filteredProducts.length - visibleCount} remaining)`}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
