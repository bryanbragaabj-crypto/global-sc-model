import { createClient } from "@supabase/supabase-js";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`A variável ${name} não foi configurada.`);
  }

  return value;
}

/*
  Conexão privada do servidor com o Supabase.
  Nunca importe este arquivo em páginas com "use client".
*/
export function getSupabaseAdmin() {
  return createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}