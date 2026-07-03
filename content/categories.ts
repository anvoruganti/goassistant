// Category-flip examples — add new verticals via data, not component rewrites.
import type { CategoryExample } from "@/types/content";

export const categoryExamples: CategoryExample[] = [
  {
    id: "fashion",
    category: "Fashion",
    customerMessage: "a bright floral co-ord I can wear to daytime events",
    productName: "Crimson Floral Co-ord",
    productDetail: "Soft rayon · Bold red floral · Kurta + pant set",
    imageSrc: "/images/kurta-1.png",
    imageAlt: "Red floral kurta co-ord set",
  },
  {
    id: "electronics",
    category: "Electronics",
    customerMessage: "a mirrorless camera light enough to travel with",
    productName: "Nikon Z50II Mirrorless",
    productDetail: "20.9MP · Z DX 18-140mm kit · Lightweight body",
    imageSrc: "/images/electronics.png",
    imageAlt: "Nikon Z50II mirrorless camera with kit lens",
  },
  {
    id: "home",
    category: "Home & Furniture",
    customerMessage: "less bulky, same comfort, in a warmer tone",
    productName: "Two-Tone Lounge Sofa",
    productDetail: "Cream + grey · Wooden legs · Compact 3-seater",
    imageSrc: "/images/sofa.png",
    imageAlt: "Cream and grey two-tone sofa",
  },
];
