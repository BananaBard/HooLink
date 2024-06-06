import { createClient } from "@supabase/supabase-js";

const supabase_url: string = import.meta.env.VITE_SUPABASE_URL;
const supabase_key: string = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabase_url, supabase_key);

