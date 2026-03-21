"use server";
import { createClient } from "@/utils/supabase/server";

export async function searchProductsAction(query: string) {
  if (!query || query.trim().length === 0) return [];

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, actual_price_ngn, discount_price_ngn, images')
    .ilike('name', `%${query}%`)
    .limit(5);

  if (error) {
    console.error("Search Action Error:", error);
    return [];
  }
  
  return data || [];
}
