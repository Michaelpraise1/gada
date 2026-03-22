import React from 'react';
import ProductPage from '@/components/ProductPage';
import MightLike from '@/components/MightLike';
import Container from '@/components/Container';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

interface Props {
  // In Next.js App Router (>= v15), dynamic params are passed as a Promise
  params: Promise<{ id: string }>;
}

export default async function DynamicProductPage({ params }: Props) {
  // Await the dynamic URL parameters explicitly
  const { id } = await params;
  
  // Securely initialize Server-Side Supabase client
  const supabase = await createClient();
  
  // Fetch the solitary product whose 'id' exactly matches the URL segment including child variants
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', id)
    .single();

  // If Supabase finds no product with this ID or a network error occurs, throw 404
  if (error || !product) {
    if (error) console.error(`Error fetching product [${id}]:`, error.message);
    return notFound();
  }

  // Gracefully protect against missing/array image schema representations
  const parsedImage = Array.isArray(product.images) ? product.images[0] : product.images;
  const finalImageUrl = typeof parsedImage === 'string' && parsedImage.trim().length > 0 ? parsedImage : undefined;

  // Dynamically resolve baseline actual price evaluating variant matrices securely
  let resolvedPrice = product.actual_price_ngn || 0;
  if (product.has_variants && product.product_variants && product.product_variants.length > 0) {
    const validVariants = product.product_variants.map((v: any) => v.actual_price_ngn || v.price || v.amount || 0).filter((p: number) => p > 0);
    if (validVariants.length > 0) {
      resolvedPrice = Math.min(...validVariants);
    }
  }

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
