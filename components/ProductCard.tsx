"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext';

interface ProductCardProps {
  id?: string | number;
  name?: string;
  actual_price_ngn?: number;
  discount_price_ngn?: number;
  images?: string;
  has_variants?: boolean;
  product_variants?: any[];
}

export default function ProductCard({
  id = "",
  name = "Becoming mitchell obama",
  actual_price_ngn = 0,
  discount_price_ngn = 0,
  images = "",
  has_variants = false,
  product_variants = []
}: ProductCardProps) {
  const { formatPrice } = useCart();

  // Dynamically resolve the absolute lowest variant price if a product has sub-options (e.g., sizes, colors)
  let displayActual: number = actual_price_ngn;
  let displayDiscount: number | undefined = discount_price_ngn;

  if (has_variants && product_variants && product_variants.length > 0) {
    const validVariants = product_variants.map(v => v.actual_price_ngn || v.price || v.amount || 0).filter(p => p > 0);
    if (validVariants.length > 0) {
      displayActual = Math.min(...validVariants);
      displayDiscount = undefined; // Drop static discount crossover if we show "Starting At" variant price
    }
  }

  // Gracefully handle strings, empty whitespace strings, or database arrays
  const parsedImage = Array.isArray(images) ? images[0] : images;
  const hasValidImage = typeof parsedImage === 'string' && parsedImage.trim().length > 0;

  return (
    <Link href={`/product/${id}`} className="flex flex-col gap-3 font-sans w-full max-w-[260px] group cursor-pointer hover:no-underline">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        {hasValidImage ? (
          <Image
            src={parsedImage}
            alt={name || "Product Image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#97b4c6] via-[#ebb4d0] to-[#f49e61] transition-opacity hover:opacity-90" />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col px-0.5">
        <h3 className="text-[15px] font-medium text-gray-900 leading-tight mb-1.5">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          {has_variants && product_variants && product_variants.length > 0 && (
            <span className="text-[12px] text-gray-500 font-medium mr-[-4px]">From</span>
          )}
          <span className="text-[15px] font-bold text-gray-900">
            {formatPrice(displayActual)}
          </span>
          {displayDiscount && displayDiscount > 0 && (
            <span className="text-[13px] text-gray-400 line-through">
              {formatPrice(displayDiscount)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
