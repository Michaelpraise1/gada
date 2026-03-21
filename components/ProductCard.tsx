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
}

export default function ProductCard({
  id = "",
  name = "Becoming mitchell obama",
  actual_price_ngn = 200,
  discount_price_ngn = 200,
  images = ""
}: ProductCardProps) {
  const { formatPrice } = useCart();

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
          <span className="text-[15px] font-bold text-gray-900">
            {formatPrice(actual_price_ngn)}
          </span>
          {discount_price_ngn && (
            <span className="text-[13px] text-gray-400 line-through">
              {formatPrice(discount_price_ngn)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
