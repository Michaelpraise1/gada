"use server";
import { createClient } from "@/utils/supabase/server";

export async function getSocialsAction() {
  const supabase = await createClient();


  const { data, error } = await supabase
    .from('user_socials')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user_socials:", error.message);
    return null;
  }

  return data;
}
