import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import HeaderBg from '@/components/HeaderBg';

export default async function PhysicalProductsPage() {
  let products = [];
  try {
    const response = await fetch('https://gada-web-backend.vercel.app/v1/products', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const result = await response.json();
    if (result.success) {
      products = result.data
        .filter((p: any) => p.type === 'Physical')
        .map((p: any) => ({
          ...p,
          actual_price_ngn: parseFloat(p.actual_price_ngn || '0'),
          discount_price_ngn: p.discount_price_ngn ? parseFloat(p.discount_price_ngn) : undefined,
          images: p.images?.[0] || '' // Take the first image
        }));
    }
  } catch (error) {
    console.error('Error fetching physical products from API:', error);
  }
  
  return (
   <Container>
     <HeaderBg />
    <div className='flex items-center px-3'>
      <HeadLine/>
      <SearchBar/>
    </div>
    
    <ProductMenu products={products || []} />
    
   </Container>
  )
}
