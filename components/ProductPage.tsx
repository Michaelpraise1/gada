"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Share } from 'lucide-react';
import { useCart } from './CartContext';

interface ProductPageProps {
  id?: string | number;
  title?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export default function ProductPage({
  id = "",
  title = "Becoming Mitchel Obama",
  price = 200,
  description = "Becoming – Michelle Obama is an inspiring memoir...",
  imageUrl = ""
}: ProductPageProps) {
  const router = useRouter();
  const { addItem, formatPrice } = useCart();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-[15px] font-medium text-gray-800 hover:text-gray-600 transition-colors mb-10 w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
          Back
        </button>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column - Image & Description */}
          <div className="flex-1 flex flex-col gap-10">

            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              ) : (
                /* Fallback gradient matching screenshot */
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5500B6] via-[#8500D6] to-[#A300E6]" />
              )}
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                Description
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed font-medium opacity-90">
                {description}
              </p>
            </div>
          </div>

          {/* Right Column - Title & Actions */}
          <div className="w-full lg:w-[420px] flex flex-col">
            <h1 className="text-[32px] font-bold text-gray-800 leading-tight mb-4">
              {title}
            </h1>

            <div className="mb-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] border border-gray-100 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <Share className="w-[15px] h-[15px] stroke-[1.5]" />
                Share
              </button>
            </div>

            <div className="text-[26px] font-bold text-gray-800 mb-6">
              {formatPrice(price)}
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  addItem({ id: id || title, name: title, price: price, image: imageUrl });
                  router.push('/cart');
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#754DEB] hover:bg-[#623bc9] text-white rounded-[14px] font-medium transition-colors shadow-sm">
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
                Add to cart
              </button>

              <div className="flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] border border-gray-100 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <Share className="w-[15px] h-[15px] stroke-[1.5]" />
                  Share
                </button>
                <button className="flex-[1.2] flex items-center justify-center gap-2 py-3 rounded-[12px] border border-gray-100 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <Share className="w-[15px] h-[15px] stroke-[1.5]" />
                  Contact seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
