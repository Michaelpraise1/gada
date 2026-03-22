import { supabase } from '../lib/supabase';


export const productCategories = [
  { title: "All", href: "/" },
  { title: "Physical products", href: "/product/Physical", type: "Physical" },
  { title: "Digital products", href: "/product/Digital", type: "Digital" },
];




// Define the shape of our product matching your database schema
export interface Product {
  id: string | number;
  name: string;
  actual_price_ngn: number;
  discount_price_ngn?: number;
  description?: string;
  images?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all products from the 'products' table
 * You would use this for a main shop page or product listing
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products from Supabase:', error.message);
    return [];
  }

  return data as Product[];
}

/**
 * Fetch a single product by its ID
 * You would use this inside ProductPage.tsx to get the specific product details
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    return null;
  }

  return data as Product;
}

/**
 * Fetch recommended products
 * You would use this inside MightLike.tsx to get the "You may also like" products
 */
export async function getRecommendedProducts(limit: number = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .limit(limit);

  if (error) {
    console.error('Error fetching recommended products:', error.message);
    return [];
  }

  return data as Product[];
}
