"use server";
import { createClient } from "@/utils/supabase/server";

export async function searchProductsAction(query: string) {
  if (!query || query.trim().length === 0) return [];

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, actual_price_ngn, discount_price_ngn, images, has_variants, product_variants(*)')
    .ilike('name', `%${query}%`)
    .order('name', { ascending: true }); // Ensure consistent sorting from all results

  if (error) {
    console.error("Search Action Error:", error);
    return [];
  }
  
  return data || [];
}
