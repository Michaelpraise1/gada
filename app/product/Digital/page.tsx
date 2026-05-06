import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import HeaderBg from '@/components/HeaderBg';

export default async function DigitalProductsPage() {
  let products = [];
  let title = "Daniels Place";
  let description = "Discover a variety of products tailored to your needs.";
  let logoUrl = "/Logo.png";
  let headerBg = "/headerbg.png";

  try {
    // Fetch store info and products in parallel
    const [storeResponse, productsResponse] = await Promise.all([
      fetch('https://gada-web-backend.vercel.app/v1/store', { next: { revalidate: 60 } }),
      fetch('https://gada-web-backend.vercel.app/v1/products', { next: { revalidate: 60 } }),
    ]);

    const [storeResult, productsResult] = await Promise.all([
      storeResponse.json(),
      productsResponse.json(),
    ]);

    if (storeResult.success && storeResult.data) {
      const store = Array.isArray(storeResult.data) ? storeResult.data[0] : storeResult.data;
      title = store.business_name;
      description = store.business_description;
      logoUrl = store.business_logo;
      headerBg = store.business_bg_image;
    }

    if (productsResult.success && Array.isArray(productsResult.data)) {
      products = productsResult.data
        .filter((p: any) => p.type === 'Digital' && p.status === 'Active')
        .map((p: any) => ({
          ...p,
          actual_price_ngn: parseFloat(p.actual_price_ngn || '0'),
          discount_price_ngn: p.discount_price_ngn ? parseFloat(p.discount_price_ngn) : undefined,
          images: p.images?.[0] || ''
        }));
    }
  } catch (error) {
    console.error('Error fetching store/products from API:', error);
  }

  return (
    <Container>
      <HeaderBg imageUrl={headerBg} />
      <div className='flex items-center px-3'>
        <HeadLine title={title} description={description} logoUrl={logoUrl} />
        <SearchBar />
      </div>

      <ProductMenu products={products} />

    </Container>
  )
}
