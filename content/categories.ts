// Category-flip examples — add new verticals via data, not component rewrites.
import type { CategoryExample } from "@/types/content";

export const categoryExamples: CategoryExample[] = [
  {
    id: "fashion",
    category: "Fashion",
    customerMessage:
      "lighter, brighter, smaller border design",
    productName: "Indigo Block Kurta",
    productDetail: "Light cotton · Brighter indigo · Minimal border",
    imageSrc: "/images/product-kurta.svg",
    imageAlt: "Indigo kurta product",
  },
  {
    id: "electronics",
    category: "Electronics",
    customerMessage:
      "something slimmer that still protects the camera",
    productName: "Slim Shield Case",
    productDetail: "0.8mm profile · Raised camera lip · Matte finish",
    imageSrc: "/images/product-phone-case.svg",
    imageAlt: "Slim phone case product",
  },
  {
    id: "home",
    category: "Home & Furniture",
    customerMessage:
      "less bulky, same fabric, but a warmer tone",
    productName: "Linen Lounge Sofa",
    productDetail: "Slim profile · Same linen weave · Warm terracotta",
    imageSrc: "/images/product-sofa.svg",
    imageAlt: "Warm-toned linen sofa",
  },
];
