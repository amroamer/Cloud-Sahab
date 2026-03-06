import { useState, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { CATALOG_PRODUCTS, downloadProductCSV, getExpandedPreviewData, type CatalogProduct } from "@/lib/catalog-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Star,
  Download,
  Database,
  FileText,
  Calendar,
  Globe,
  Layers,
  Shield,
  BarChart3,
  HardDrive,
  RefreshCw,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

type TabKey = "schema" | "preview" | "reviews" | "versions";

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "Ahmed Al-Rashid",
    authorAr: "أحمد الراشد",
    org: "Saudia Airlines",
    orgAr: "الخطوط السعودية",
    rating: 5,
    date: "2025-03-15",
    comment: "Excellent data quality and comprehensive coverage. The granularity is exactly what we needed for our route planning analysis.",
    commentAr: "جودة بيانات ممتازة وتغطية شاملة. الدقة هي بالضبط ما احتجناه لتحليل تخطيط المسارات.",
  },
  {
    id: 2,
    author: "Noura Al-Dosari",
    authorAr: "نورة الدوسري",
    org: "GACA Research",
    orgAr: "أبحاث الطيران المدني",
    rating: 4,
    date: "2025-02-28",
    comment: "Very useful dataset. Would appreciate even more historical depth, but overall a solid product.",
    commentAr: "مجموعة بيانات مفيدة جداً. نأمل في عمق تاريخي أكبر، لكنها منتج متين بشكل عام.",
  },
  {
    id: 3,
    author: "Khalid Ibrahim",
    authorAr: "خالد إبراهيم",
    org: "McKinsey Aviation",
    orgAr: "ماكنزي للطيران",
    rating: 5,
    date: "2025-01-10",
    comment: "The best aviation dataset available in the region. Clean, well-documented, and regularly updated.",
    commentAr: "أفضل مجموعة بيانات طيران متاحة في المنطقة. نظيفة وموثقة جيداً ومحدثة بانتظام.",
  },
];

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<Star key={i} className={`${iconClass} fill-amber-400 text-amber-400`} />);
    } else if (i === full && hasHalf) {
      stars.push(<Star key={i} className={`${iconClass} fill-amber-400/50 text-amber-400`} />);
    } else {
      stars.push(<Star key={i} className={`${iconClass} text-muted-foreground/30`} />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function ClassificationBadge({ classification, language }: { classification: string; language: string }) {
  const labels: Record<string, { en: string; ar: string }> = {
    Public: { en: "Public", ar: "عام" },
    Restricted: { en: "Restricted", ar: "مقيد" },
    Confidential: { en: "Confidential", ar: "سري" },
  };
  const variant = classification === "Public" ? "secondary" : classification === "Restricted" ? "default" : "destructive";
  return (
    <Badge variant={variant} data-testid="badge-classification">
      <Shield className="h-3 w-3 me-1" />
      {language === "ar" ? labels[classification]?.ar : labels[classification]?.en}
    </Badge>
  );
}

function SchemaTab({ product, language }: { product: CatalogProduct; language: string }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="th-field-name">{language === "ar" ? "اسم الحقل" : "Field Name"}</TableHead>
            <TableHead data-testid="th-type">{language === "ar" ? "النوع" : "Type"}</TableHead>
            <TableHead data-testid="th-description">{language === "ar" ? "الوصف" : "Description"}</TableHead>
            <TableHead data-testid="th-sample">{language === "ar" ? "مثال" : "Sample"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.schema.map((field, idx) => (
            <TableRow key={idx} data-testid={`row-schema-${idx}`}>
              <TableCell className="font-mono text-sm">{language === "ar" ? field.nameAr : field.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">{field.type}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {language === "ar" ? field.descriptionAr : field.description}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{field.sample}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PreviewTab({ product, language }: { product: CatalogProduct; language: string }) {
  const columns = product.schema.slice(0, 8);
  const rows = getExpandedPreviewData(product);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className="text-xs whitespace-nowrap">
                {language === "ar" ? col.nameAr : col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIdx) => (
            <TableRow key={rowIdx} data-testid={`row-preview-${rowIdx}`}>
              {columns.map((col, colIdx) => (
                <TableCell key={colIdx} className="text-xs whitespace-nowrap font-mono">
                  {row[col.name] !== undefined ? String(row[col.name]) : "—"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ReviewsTab({ product, language }: { product: CatalogProduct; language: string }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold" data-testid="text-avg-rating">{product.rating.toFixed(1)}</div>
          <StarRating rating={product.rating} />
          <p className="text-xs text-muted-foreground mt-1">
            {product.reviewCount} {language === "ar" ? "تقييم" : "reviews"}
          </p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = star === 5 ? 65 : star === 4 ? 25 : star === 3 ? 7 : star === 2 ? 2 : 1;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-muted-foreground">{star}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-visible">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-muted-foreground text-end">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t">
        {MOCK_REVIEWS.map((review) => (
          <Card key={review.id} className="p-4" data-testid={`card-review-${review.id}`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-sm font-medium">{language === "ar" ? review.authorAr : review.author}</p>
                <p className="text-xs text-muted-foreground">{language === "ar" ? review.orgAr : review.org}</p>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{language === "ar" ? review.commentAr : review.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VersionsTab({ product, language }: { product: CatalogProduct; language: string }) {
  const frequencyMap: Record<string, string[]> = {
    Monthly: ["Apr 2025", "Mar 2025", "Feb 2025", "Jan 2025", "Dec 2024", "Nov 2024"],
    Quarterly: ["Q1 2025", "Q4 2024", "Q3 2024", "Q2 2024"],
    Annual: ["2024", "2023", "2022"],
    "One-time": [],
  };

  const editions = frequencyMap[product.frequency] || [];

  if (editions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <FileText className="h-8 w-8 mb-3" />
        <p className="text-sm" data-testid="text-no-versions">
          {language === "ar" ? "هذا منتج لمرة واحدة — لا توجد إصدارات سابقة" : "This is a one-time product — no previous editions"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {editions.map((edition, idx) => (
        <div
          key={edition}
          className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md border"
          data-testid={`row-version-${idx}`}
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{product.name} — {edition}</p>
              <p className="text-xs text-muted-foreground">
                {language === "ar" ? "تم النشر" : "Published"}: {idx === 0 ? (language === "ar" ? "أحدث إصدار" : "Latest") : edition}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {idx === 0 && (
              <Badge variant="default" className="text-xs">
                {language === "ar" ? "الأحدث" : "Current"}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              data-testid={`button-version-download-${idx}`}
              onClick={() => downloadProductCSV(product)}
            >
              <Download className="h-3.5 w-3.5 me-1.5" />
              {language === "ar" ? "تحميل" : "Download"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CatalogDetailPage() {
  const { language } = useTranslation();
  const [, params] = useRoute("/catalog/:productId");
  const [activeTab, setActiveTab] = useState<TabKey>("schema");

  const productId = params?.productId;
  const product = useMemo(() => CATALOG_PRODUCTS.find((p) => p.id === productId), [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return CATALOG_PRODUCTS
      .filter((p) => p.id !== product.id && (p.category === product.category || p.isFree === product.isFree))
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <ScrollArea className="h-full">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2" data-testid="text-not-found">
            {language === "ar" ? "المنتج غير موجود" : "Product Not Found"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === "ar" ? "لم يتم العثور على منتج البيانات المطلوب" : "The requested data product could not be found"}
          </p>
          <Link href="/catalog">
            <Button data-testid="button-back-catalog">
              <ArrowLeft className="h-4 w-4 me-2 rtl:rotate-180" />
              {language === "ar" ? "العودة إلى سوق البيانات" : "Back to Marketplace"}
            </Button>
          </Link>
        </div>
      </ScrollArea>
    );
  }

  const tabs: { key: TabKey; labelEn: string; labelAr: string }[] = [
    { key: "schema", labelEn: "Schema", labelAr: "المخطط" },
    { key: "preview", labelEn: "Preview", labelAr: "معاينة" },
    { key: "reviews", labelEn: "Reviews", labelAr: "التقييمات" },
    { key: "versions", labelEn: "Versions", labelAr: "الإصدارات" },
  ];

  const formatPrice = (price: number) => {
    if (product.isFree) return language === "ar" ? "مجاني" : "Free";
    return `${price.toLocaleString()} SAR`;
  };

  const actionButton = () => {
    return (
      <Button
        className="w-full"
        data-testid="button-download-product"
        onClick={() => downloadProductCSV(product)}
      >
        <Download className="h-4 w-4 me-2" />
        {language === "ar" ? "تحميل" : "Download"}
      </Button>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <Link href="/catalog">
          <Button variant="ghost" size="sm" className="gap-1.5" data-testid="button-back-catalog">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {language === "ar" ? "العودة إلى سوق البيانات" : "Back to Marketplace"}
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary" data-testid="badge-category">
                  {language === "ar" ? product.categoryAr : product.category}
                </Badge>
                <Badge variant="outline" data-testid="badge-frequency">
                  <RefreshCw className="h-3 w-3 me-1" />
                  {product.frequency}
                </Badge>
                <ClassificationBadge classification={product.classification} language={language} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight mb-2" data-testid="text-product-name">
                {language === "ar" ? product.nameAr : product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm font-medium" data-testid="text-rating">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} {language === "ar" ? "تقييم" : "reviews"})
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  {product.downloadCount.toLocaleString()} {language === "ar" ? "تحميل" : "downloads"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-description">
                {language === "ar" ? product.descriptionAr : product.description}
              </p>
            </div>

            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3" data-testid="text-coverage-title">
                {language === "ar" ? "تفاصيل التغطية" : "Coverage Details"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-2.5">
                  <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "النطاق" : "Scope"}</p>
                    <p className="text-sm font-medium" data-testid="text-scope">{language === "ar" ? product.scopeAr : product.scope}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "الفترة" : "Period"}</p>
                    <p className="text-sm font-medium" data-testid="text-period">{language === "ar" ? product.periodAr : product.period}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "الدقة" : "Granularity"}</p>
                    <p className="text-sm font-medium" data-testid="text-granularity">{language === "ar" ? product.granularityAr : product.granularity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "التحديث" : "Update Frequency"}</p>
                    <p className="text-sm font-medium" data-testid="text-update-freq">{product.frequency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "جودة البيانات" : "Quality Score"}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium" data-testid="text-quality-score">{product.qualityScore}%</p>
                      <Badge variant={product.qualityScore >= 90 ? "default" : "secondary"} className="text-[10px]">
                        {product.qualityScore >= 95 ? (language === "ar" ? "ممتاز" : "Excellent") : product.qualityScore >= 90 ? (language === "ar" ? "جيد جداً" : "Very Good") : (language === "ar" ? "جيد" : "Good")}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ar" ? "آخر تحديث" : "Last Updated"}</p>
                    <p className="text-sm font-medium" data-testid="text-last-updated">Apr 2025</p>
                  </div>
                </div>
              </div>
            </Card>

            <div>
              <div className="flex border-b mb-4 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                      activeTab === tab.key
                        ? "text-foreground"
                        : "text-muted-foreground hover-elevate"
                    }`}
                    data-testid={`tab-${tab.key}`}
                  >
                    {language === "ar" ? tab.labelAr : tab.labelEn}
                    {activeTab === tab.key && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <Card className="p-4" data-testid="card-tab-content">
                {activeTab === "schema" && <SchemaTab product={product} language={language} />}
                {activeTab === "preview" && <PreviewTab product={product} language={language} />}
                {activeTab === "reviews" && <ReviewsTab product={product} language={language} />}
                {activeTab === "versions" && <VersionsTab product={product} language={language} />}
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-5 space-y-4 sticky top-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{language === "ar" ? "السعر" : "Price"}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" data-testid="text-price">
                    {formatPrice(product.price)}
                  </span>
                  {!product.isFree && (
                    <span className="text-xs text-muted-foreground">
                      {language === "ar" ? "غير شامل ضريبة القيمة المضافة" : "excl. VAT"}
                    </span>
                  )}
                </div>
              </div>

              {actionButton()}

              <div className="space-y-3 pt-3 border-t">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" />
                    {language === "ar" ? "الصيغة" : "Format"}
                  </span>
                  <Badge variant="outline" data-testid="text-format">{product.format}</Badge>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <HardDrive className="h-3.5 w-3.5" />
                    {language === "ar" ? "حجم الملف" : "File Size"}
                  </span>
                  <span className="font-medium" data-testid="text-file-size">{product.fileSize}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="h-3.5 w-3.5" />
                    {language === "ar" ? "عدد السجلات" : "Records"}
                  </span>
                  <span className="font-medium" data-testid="text-record-count">{product.recordCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-3.5 w-3.5" />
                    {language === "ar" ? "التحميلات" : "Downloads"}
                  </span>
                  <span className="font-medium" data-testid="text-downloads">{product.downloadCount.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4" data-testid="text-related-title">
              {language === "ar" ? "منتجات ذات صلة" : "Related Products"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/catalog/${rp.id}`}>
                  <Card className="p-4 hover-elevate cursor-pointer h-full" data-testid={`card-related-${rp.id}`}>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {language === "ar" ? rp.categoryAr : rp.category}
                    </Badge>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">
                      {language === "ar" ? rp.nameAr : rp.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={rp.rating} size="sm" />
                      <span className="text-xs text-muted-foreground">{rp.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold" data-testid={`text-related-price-${rp.id}`}>
                        {rp.isFree ? (language === "ar" ? "مجاني" : "Free") : `${rp.price.toLocaleString()} SAR`}
                      </span>
                      <Badge variant="outline" className="text-[10px]">{rp.format}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
