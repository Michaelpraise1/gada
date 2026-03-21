import Container from '@/components/Container'
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import HeaderBg from '@/components/HeaderBg';


export default async function Home() {
  // Initialize Supabase on the Server side (securely reads cookies + session)
  const supabase = await createClient();

  // Fetch the data from your database (assuming a 'products' table)
  // Feel free to modify the select string to what columns you actually need
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Supabase Error Code:', error.code);
    console.error('Supabase Error Message:', error.message);
    console.error('Supabase Raw Error:', JSON.stringify(error, null, 2));
  }

  return (
    <Container>
      <HeaderBg />
      <div className='flex items-center px-3'>
        <HeadLine />
        <SearchBar />
      </div>
      <ProductMenu products={products || []} />

    </Container>

  )
}
