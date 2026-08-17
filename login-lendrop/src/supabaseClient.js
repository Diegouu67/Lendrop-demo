import { createClient } from "@supabase/supabase-js";
 
const supabaseUrl = console.log(import.meta.env.VITE_SUPABASE_URL);
const supabaseKey = console.log(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
 
export const supabase = createClient(supabaseUrl, supabaseKey);
 
