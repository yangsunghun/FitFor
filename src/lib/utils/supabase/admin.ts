import type { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY as string;

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export { adminAuthClient };
