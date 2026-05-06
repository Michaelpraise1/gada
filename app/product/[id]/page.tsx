import React from 'react';
import ProductPage from '@/components/ProductPage';
import MightLike from '@/components/MightLike';
import Container from '@/components/Container';
import { notFound } from 'next/navigation';

interface Props {
  // In Next.js App Router (>= v15), dynamic params are passed as a Promise
  params: Promise<{ id: string }>;
}

export default async function DynamicProductPage({ params }: Props) {
  // Await the dynamic URL parameters explicitly
  const { id } = await params;

  // Fetch all products from the backend API and find the matching one
  let product: any = null;
  try {
    const response = await fetch(
      'https://gada-web-backend.vercel.app/v1/products',
      { next: { revalidate: 60 } }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      product = result.data.find((p: any) => p.id === id) ?? null;
    }
  } catch (err) {
    console.error(`Error fetching products from API:`, err);
  }

  // If no product found with this ID, show 404
  if (!product) {
    return notFound();
  }

  // Resolve the first image URL
  const finalImageUrl: string | undefined =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : typeof product.images === 'string' && product.images.trim().length > 0
      ? product.images
      : undefined;

  // Resolve the display price
  const resolvedPrice: number = parseFloat(product.actual_price_ngn) || 0;

  return (
    <Container>
      <ProductPage 
        title={product.name}
        price={resolvedPrice}
        description={product.description}
        imageUrl={finalImageUrl}
      />
      <MightLike />
    </Container>
  );
}
