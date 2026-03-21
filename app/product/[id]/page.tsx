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
  
  // Fetch the solitary product whose 'id' exactly matches the URL segment
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
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

  return (
    <Container>
      <ProductPage 
        title={product.name}
        price={product.actual_price_ngn}
        description={product.description}
        imageUrl={finalImageUrl}
      />
      <MightLike />
    </Container>
  );
}
