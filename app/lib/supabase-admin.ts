/*
  Cliente REST privado do Supabase sem dependência externa.

  ATENÇÃO:
  Este arquivo deve ser usado somente em rotas do servidor.
  Nunca importe este arquivo em componentes com "use client".
*/

export type SupabaseServerConfig = {
  url: string;
  secretKey: string;
};

type ErrorWithCause = Error & {
  cause?: {
    code?: string;
    errno?: string | number;
    syscall?: string;
    hostname?: string;
    address?: string;
    port?: number;
    message?: string;
  };
};

function getOptionalEnv(name: string) {
  return process.env[name]?.trim() || "";
}

function getRequiredEnv(name: string) {
  const value = getOptionalEnv(name);

  if (!value) {
    throw new Error(
      `A variável ${name} não foi configurada na Vercel.`,
    );
  }

  return value;
}

function normalizeSupabaseUrl(value: string) {
  const cleanedValue = value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/+$/, "");

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(cleanedValue);
  } catch {
    throw new Error(
      "A variável NEXT_PUBLIC_SUPABASE_URL não contém uma URL válida.",
    );
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error(
      "A URL do Supabase precisa começar com https://.",
    );
  }

  if (
    parsedUrl.pathname !== "/" &&
    parsedUrl.pathname !== ""
  ) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL deve conter somente a URL raiz do projeto, sem /rest/v1, /storage/v1 ou /dashboard.",
    );
  }

  return parsedUrl.origin;
}

export function getSupabaseServerConfig(): SupabaseServerConfig {
  const rawUrl = getRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
  );

  const url = normalizeSupabaseUrl(rawUrl);

  /*
    Aceita tanto a chave antiga service_role quanto
    a chave secreta nova do Supabase.
  */
  const secretKey =
    getOptionalEnv("SUPABASE_SECRET_KEY") ||
    getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!secretKey) {
    throw new Error(
      "Configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY na Vercel.",
    );
  }

  return {
    url,
    secretKey,
  };
}

export function getSupabaseHeaders(
  config: SupabaseServerConfig,
  extraHeaders: HeadersInit = {},
): HeadersInit {
  return {
    apikey: config.secretKey,
    Authorization: `Bearer ${config.secretKey}`,
    ...extraHeaders,
  };
}

export function encodeStoragePath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export async function getErrorMessage(
  response: Response,
) {
  const contentType =
    response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const data = (await response.json()) as {
        message?: string;
        error?: string;
        error_description?: string;
        hint?: string;
        details?: string;
        statusCode?: string | number;
      };

      const message =
        data.message ||
        data.error_description ||
        data.error ||
        data.details ||
        data.hint;

      if (message) {
        return `${message} (HTTP ${response.status})`;
      }

      return `Erro no Supabase. HTTP ${response.status}.`;
    }

    const text = await response.text();

    if (text) {
      return `${text} (HTTP ${response.status})`;
    }

    return `Erro no Supabase. HTTP ${response.status}.`;
  } catch {
    return `Erro no Supabase. HTTP ${response.status}.`;
  }
}

export function getThrownErrorMessage(
  error: unknown,
) {
  if (!(error instanceof Error)) {
    return "Erro desconhecido ao conectar com o Supabase.";
  }

  const errorWithCause = error as ErrorWithCause;
  const cause = errorWithCause.cause;

  if (!cause) {
    return error.message;
  }

  const details = [
    cause.code
      ? `código: ${cause.code}`
      : "",
    cause.syscall
      ? `operação: ${cause.syscall}`
      : "",
    cause.hostname
      ? `servidor: ${cause.hostname}`
      : "",
    cause.address
      ? `endereço: ${cause.address}`
      : "",
    cause.port
      ? `porta: ${cause.port}`
      : "",
    cause.message
      ? `causa: ${cause.message}`
      : "",
  ].filter(Boolean);

  if (details.length === 0) {
    return error.message;
  }

  return `${error.message} — ${details.join(" | ")}`;
}