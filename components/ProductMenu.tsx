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

  return (
    <div className="w-full flex flex-col">
      {/* Category Links Menu */}
      <div className='flex flex-wrap w-full items-center px-8 gap-5 md:gap-7 text-sm capitalize font-semibold text-lightcolor'>
        {productCategories?.map((item) => (
          <Link key={item?.title} href={item?.href} className={`hover:text-primary-bg relative group ${pathname === item?.href && "text-primary-bg"}`}>
            {item?.title}
            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-primary-bg group-hover:w-1/2  hoverEffect  group-hover:left-0 ${pathname === item?.href && "text-primary-bg"}`} />
            <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-primary-bg group-hover:w-1/2  hoverEffect  group-hover:right-0 ${pathname === item?.href && "text-primary-bg"}`} />
          </Link>
        ))}
      </div>

      {/* Dynamically Mapped Products Array */}
      {products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-3 place-items-center sm:place-items-stretch">
          {products.map((product) => (
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