"use client"
import { productCategories } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ProductCard from './ProductCard'; // Ensure this is imported

// Define the shape of our products prop mapping to Supabase structure
interface Product {
  id: string | number;
  name: string;
  actual_price_ngn: number;
  discount_price_ngn?: number;
  description?: string;
  images?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  href?: string;
  has_variants?: boolean;
  product_variants?: any[];
}

interface ProductMenuProps {
  products?: Product[];
}

const ProductMenu = ({ products }: ProductMenuProps) => {
  const pathname = usePathname();

  // Helper function to calculate the absolute lowest price for accurate sorting across variant matrices
  const getEffectivePrice = (prod: Product) => {
    if (prod.has_variants && prod.product_variants && prod.product_variants.length > 0) {
      const validVariants = prod.product_variants
        .map(v => v.actual_price_ngn || v.price || v.amount || 0)
        .filter(p => p > 0);
      if (validVariants.length > 0) {
        return Math.min(...validVariants);
      }
    }
    return prod.actual_price_ngn || 0;
  };

  // Dynamically sort the incoming products array from lowest to highest price ("smallest to biggest")
  const sortedProducts = products ? [...products].sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b)) : [];

  return (
    <div className="w-full flex flex-col">
      {/* Category Links Menu Row */}
      <div className='flex overflow-x-auto flex-nowrap md:justify-center items-center px-4 md:px-8 gap-6 md:gap-8 text-sm capitalize font-semibold text-lightcolor scrollbar-none py-3 w-full border-b border-gray-100/50 md:border-b-0'>
        {productCategories?.map((item) => (
          <Link  key={item?.title} href={item?.href} className={`hover:text-primary-bg relative group whitespace-nowrap pb-1 ${pathname === item?.href ? "text-primary-bg" : ""}`}>
            {item?.title}
            <span className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-primary-bg hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item?.href ? "w-1/2 left-0" : "w-0"}`} />
            <span className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-primary-bg hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item?.href ? "w-1/2 right-0" : "w-0"}`} />
          </Link>
        ))}
      </div>

      {/* Dynamically Mapped & Sorted Products Array */}
      {sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-3 place-items-center sm:place-items-stretch">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              discount_price_ngn={product.discount_price_ngn}
              actual_price_ngn={product.actual_price_ngn}
              images={product.images}
              has_variants={product.has_variants}
              product_variants={product.product_variants}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductMenu;