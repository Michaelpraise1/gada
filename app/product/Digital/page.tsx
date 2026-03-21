import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function DigitalProductsPage() {
  const supabase = await createClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'Digital'); 

  if (error) {
    console.error('Error fetching digital products:', error);
  }

  return (
   <Container>
    <div className='flex items-center px-3'>
      <HeadLine/>
      <SearchBar/>
    </div>
    
    <ProductMenu products={products || []} />
    
   </Container>
  )
}
