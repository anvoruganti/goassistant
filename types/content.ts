// Shared content interfaces — one shape per repeating UI pattern so components stay consistent.
export interface CategoryExample {
  id: string;
  category: string;
  customerMessage: string;
  productName: string;
  productDetail: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface HeroAnimationBeat {
  id: string;
  language: "en" | "hi";
  customerMessage: string;
  productName: string;
  productDetail: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface WaitlistFormData {
  name: string;
  storeName: string;
  storeUrl: string;
  category: string;
  monthlyOrders: string;
  platform: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
}

export interface WaitlistFieldErrors {
  name?: string;
  storeName?: string;
  storeUrl?: string;
  category?: string;
  monthlyOrders?: string;
  platform?: string;
  email?: string;
  phone?: string;
  form?: string;
}

export interface WaitlistSubmitResult {
  success: boolean;
  queuePosition?: number;
  error?: string;
}
