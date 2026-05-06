import React from 'react';
import ProductCard from './ProductCard';

export default async function MightLike() {
  let recommendedProducts: any[] = [];

  try {
    const response = await fetch(
      'https://gada-web-backend.vercel.app/v1/products',
      { next: { revalidate: 60 } }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      recommendedProducts = result.data
        .filter((p: any) => p.status === 'Active')
        .slice(0, 4)
        .map((p: any) => ({
          ...p,
          actual_price_ngn: parseFloat(p.actual_price_ngn || '0'),
          discount_price_ngn: p.discount_price_ngn ? parseFloat(p.discount_price_ngn) : undefined,
          images: p.images?.[0] || ''
        }));
    }
  } catch (error) {
    console.error('Error fetching recommended products:', error);
  }

  // If there are no products yet, simply hide the section gracefully
  if (recommendedProducts.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 mt-12">
      <h2 className="text-[22px] font-bold text-gray-800 mb-6">
        You may also like
      </h2>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 place-items-center sm:place-items-stretch">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            actual_price_ngn={product.actual_price_ngn}
            discount_price_ngn={product.discount_price_ngn}
            images={product.images}
            has_variants={product.has_variants}
          />
        ))}
      </div>
    </section>
  );
}
