"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

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

  // Dynamically resolve the absolute lowest and highest variant prices if a product has sub-options
  let displayMin: number = actual_price_ngn;
  let displayMax: number = actual_price_ngn;
  let displayDiscount: number | undefined = discount_price_ngn;

  if (has_variants && product_variants && product_variants.length > 0) {
    const prices = product_variants
      .map(v => v.actual_price_ngn || v.price || v.amount || 0)
      .filter(p => p > 0);

    if (prices.length > 0) {
      displayMin = Math.min(...prices);
      displayMax = Math.max(...prices);
      displayDiscount = undefined; // Drop static discount if we show a dynamic variant range
    }
  }

  // Gracefully handle strings, empty whitespace strings, or database arrays
  const parsedImage = Array.isArray(images) ? images[0] : images;
  const hasValidImage = typeof parsedImage === 'string' && parsedImage.trim().length > 0;

  return (
    <Link href={`/product/${id}`} className="flex flex-col gap-3 font-sans w-300px h-294px mx-4 max-w-65 group cursor-pointer hover:no-underline active:scale-[0.98] transition-transform duration-200">
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
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-bold text-gray-900">
            {displayMin !== displayMax ? (
              <>From {formatPrice(displayMin)} to {formatPrice(displayMax)}</>
            ) : (
              formatPrice(displayMin)
            )}
          </span>
          {displayDiscount && displayDiscount > 0 && (
            <span className="text-[13px] text-gray-400 line-through">
              {formatPrice(displayDiscount)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
