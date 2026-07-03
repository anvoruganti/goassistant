// Product result card — surfaces the matched product in hero/store demo animations.
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductResultCardProps {
  productName: string;
  productDetail: string;
  imageSrc: string;
  imageAlt: string;
  visible: boolean;
}

export function ProductResultCard({
  productName,
  productDetail,
  imageSrc,
  imageAlt,
  visible,
}: ProductResultCardProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-sky/30 bg-navy/80"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={320}
          height={200}
          className="h-32 w-full object-cover"
          unoptimized
        />
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cobalt text-xs text-white">
          ✓
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-offwhite">{productName}</p>
        <p className="mt-0.5 text-xs text-offwhite/60">{productDetail}</p>
      </div>
    </motion.div>
  );
}
