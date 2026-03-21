import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function PhysicalProductsPage() {
  const supabase = await createClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', 'Physical'); 

  if (error) {
    console.error('Error fetching physical products:', error);
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
