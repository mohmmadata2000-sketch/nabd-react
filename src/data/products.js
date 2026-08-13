// Product catalog, brand labels, and small formatting helpers for the Nabd store.

// أسماء الماركات المعروضة بالفلاتر وشريط الفئات.
export const BRANDS = {
  apple: "آبل",
  samsung: "سامسونج",
  xiaomi: "شاومي",
};
export const CATEGORY_KEYS = ["all", ...Object.keys(BRANDS)];

// بيانات المنتجات: كل عنصر يمثل جهاز واحد بكل تفاصيله
// (الألوان المتاحة، السعات التخزينية، المواصفات، وصورته في public/images).
export const PRODUCTS = [
  {
    id: 1,
    brandKey: "apple",
    image: "/images/iphone-15-pro.jpg",
    name: "آيفون 15 برو",
    price: 4999,
    oldPrice: 5499,
    rating: 4.8,
    reviews: 214,
    colors: [
      { hex: "#3a3a3c", name: "تيتانيوم أسود" },
      { hex: "#8c8a86", name: "تيتانيوم طبيعي" },
      { hex: "#3b4a5a", name: "تيتانيوم أزرق" },
    ],
    storages: ["128GB", "256GB", "512GB"],
    badge: "الأكثر مبيعًا",
    badgeType: "hot",
    specs: [
      { label: "الشاشة", value: "6.1 بوصة OLED" },
      { label: "المعالج", value: "A17 Pro" },
      { label: "الكاميرا", value: "48 ميجابكسل" },
      { label: "البطارية", value: "3274mAh" },
      { label: "الرام", value: "8GB" },
    ],
  },
  {
    id: 2,
    brandKey: "samsung",
    image: "/images/galaxy-s24-ultra.jpg",
    name: "جالكسي S24 ألترا",
    price: 5299,
    oldPrice: 5799,
    rating: 4.9,
    reviews: 301,
    colors: [
      { hex: "#2b2b30", name: "أسود تيتانيوم" },
      { hex: "#6c6f75", name: "رمادي تيتانيوم" },
      { hex: "#7c6f8f", name: "بنفسجي تيتانيوم" },
    ],
    storages: ["256GB", "512GB", "1TB"],
    badge: "خصم 9%",
    badgeType: "sale",
    specs: [
      { label: "الشاشة", value: "6.8 بوصة AMOLED" },
      { label: "المعالج", value: "Snapdragon 8 Gen 3" },
      { label: "الكاميرا", value: "200 ميجابكسل" },
      { label: "البطارية", value: "5000mAh" },
      { label: "الرام", value: "12GB" },
    ],
  },
  {
    id: 3,
    brandKey: "xiaomi",
    image: "/images/xiaomi-14-pro.jpg",
    name: "شاومي 14 برو",
    price: 3299,
    oldPrice: null,
    rating: 4.5,
    reviews: 76,
    colors: [
      { hex: "#1c1c1e", name: "أسود" },
      { hex: "#eceef0", name: "أبيض" },
      { hex: "#7a9e85", name: "أخضر" },
    ],
    storages: ["256GB", "512GB"],
    badge: "جديد",
    badgeType: "new",
    specs: [
      { label: "الشاشة", value: "6.73 بوصة LTPO OLED" },
      { label: "المعالج", value: "Snapdragon 8 Gen 3" },
      { label: "الكاميرا", value: "50 ميجابكسل ليكا" },
      { label: "البطارية", value: "4880mAh" },
      { label: "الرام", value: "12GB" },
    ],
  },
  {
    id: 4,
    brandKey: "xiaomi",
    image: "/images/redmi-note-13-pro.jpg",
    name: "ريدمي نوت 13 برو",
    price: 999,
    oldPrice: 1199,
    rating: 4.4,
    reviews: 412,
    colors: [
      { hex: "#232326", name: "أسود" },
      { hex: "#3f5a48", name: "أخضر غابي" },
      { hex: "#8a8d92", name: "رمادي" },
    ],
    storages: ["128GB", "256GB"],
    badge: "خصم 17%",
    badgeType: "sale",
    specs: [
      { label: "الشاشة", value: "6.67 بوصة AMOLED" },
      { label: "المعالج", value: "Snapdragon 7s Gen 2" },
      { label: "الكاميرا", value: "200 ميجابكسل" },
      { label: "البطارية", value: "5100mAh" },
      { label: "الرام", value: "8GB" },
    ],
  },
];

export const TICKER_ITEMS = [
  "شحن مجاني للطلبات فوق 300 ر.س",
  "ضمان رسمي سنتان",
  "استرجاع خلال 14 يوم",
  "دعم فني 24/7",
  "تقسيط بدون فوائد حتى 12 شهر",
  "شبكات 5G",
  "شاشات AMOLED",
  "بطاريات تدوم يوم كامل",
];

// تنسيق السعر بفواصل الآلاف (مثال: 4999 -> "4,999").
export const money = (n) => n.toLocaleString("en-US");
export const CURRENCY = "ر.س";
