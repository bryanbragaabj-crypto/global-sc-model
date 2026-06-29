/*
  Cliente REST privado do Supabase sem dependência externa.
  Este arquivo é usado somente em rotas do servidor.
*/

type SupabaseServerConfig = {
  url: string;
  secretKey: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`A variável ${name} não foi configurada na Vercel.`);
  }

  return value;
}

export function getSupabaseServerConfig(): SupabaseServerConfig {
  const url = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
  const secretKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  return {
    url,
    secretKey,
  };
}

export function getSupabaseHeaders(
  config: SupabaseServerConfig,
  extraHeaders: HeadersInit = {},
) {
  return {
    apikey: config.secretKey,
    Authorization: `Bearer ${config.secretKey}`,
    ...extraHeaders,
  };
}

export function encodeStoragePath(path: string) {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export async function getErrorMessage(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const data = (await response.json()) as {
        message?: string;
        error?: string;
        hint?: string;
      };

      return data.message || data.error || "Erro desconhecido no Supabase.";
    }

    const text = await response.text();
    return text || "Erro desconhecido no Supabase.";
  } catch {
    return "Erro desconhecido no Supabase.";
  }
}
