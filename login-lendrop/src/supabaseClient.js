import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// TEMPORARY DEBUG LINE — delete this once the values show up correctly
console.log("ENV CHECK:", supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
