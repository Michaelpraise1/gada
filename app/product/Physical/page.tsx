import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import HeaderBg from '@/components/HeaderBg';

export default async function PhysicalProductsPage() {
  const supabase = await createClient();

  // Fetch the Business profile
  const { data: businessData, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .limit(1);

  if (businessError) {
    console.error('Business fetch error:', businessError.message);
  }

  const business = businessData?.[0] || null;

  // Universal Fallbacks
  const headerBg = business?.header_bg_image || business?.banner_url || business?.banner_image || business?.headerBg || "/headerbg.png";
  const logoUrl = business?.logo_image || business?.logo_url || business?.logo || "/Logo.png";
  const title = business?.title || business?.name || business?.business_name || "Daniels Place";
  const description = business?.description || "Discover a variety of products tailored to your needs. Shop digital goods, exclusive services, and more. Seamless browsing and secure checkout guaranteed.";

  const { data: allProducts, error } = await supabase
    .from('products')
    .select('*, product_variants(*)');

  if (error) {
    console.error('Error fetching physical products:', error);
  }

  // Filter products in JavaScript "from all" results
  const products = allProducts?.filter(p => p.type === 'Physical') || [];

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
