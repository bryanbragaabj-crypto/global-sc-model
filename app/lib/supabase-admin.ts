/*
  Cliente REST privado do Supabase sem dependência externa.

  Este arquivo deve ser usado somente em rotas do servidor.
  Nunca importe este arquivo em componentes com "use client".
*/

export type SupabaseServerConfig = {
  url: string;
  secretKey: string;
  keyType: "LEGACY_SERVICE_ROLE" | "SECRET";
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
      "NEXT_PUBLIC_SUPABASE_URL não contém uma URL válida.",
    );
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL precisa começar com https://.",
    );
  }

  if (
    parsedUrl.pathname !== "/" &&
    parsedUrl.pathname !== ""
  ) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL deve conter somente a URL raiz do projeto.",
    );
  }

  return parsedUrl.origin;
}

function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const normalizedPayload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padding =
      normalizedPayload.length % 4 === 0
        ? ""
        : "=".repeat(4 - (normalizedPayload.length % 4));

    const decoded = Buffer.from(
      normalizedPayload + padding,
      "base64",
    ).toString("utf8");

    return JSON.parse(decoded) as {
      role?: string;
      ref?: string;
      iss?: string;
    };
  } catch {
    return null;
  }
}

export function getSupabaseServerConfig(): SupabaseServerConfig {
  const url = normalizeSupabaseUrl(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  );

  const newSecretKey = getOptionalEnv(
    "SUPABASE_SECRET_KEY",
  );

  const legacyServiceRoleKey = getOptionalEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
  );

  if (newSecretKey) {
    if (!newSecretKey.startsWith("sb_secret_")) {
      throw new Error(
        "SUPABASE_SECRET_KEY não possui o formato esperado sb_secret_...",
      );
    }

    return {
      url,
      secretKey: newSecretKey,
      keyType: "SECRET",
    };
  }

  if (!legacyServiceRoleKey) {
    throw new Error(
      "Configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY na Vercel.",
    );
  }

  /*
    A chave service_role antiga é um JWT.
    Esta validação evita colocar a chave anon por engano.
  */
  const payload = decodeJwtPayload(
    legacyServiceRoleKey,
  );

  if (!payload) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não é um JWT válido. Se estiver usando uma chave sb_secret_, coloque-a em SUPABASE_SECRET_KEY.",
    );
  }

  if (payload.role !== "service_role") {
    throw new Error(
      `A chave colocada em SUPABASE_SERVICE_ROLE_KEY possui role "${
        payload.role || "desconhecida"
      }", mas deveria ser "service_role". Você provavelmente colocou a chave anon.`,
    );
  }

  return {
    url,
    secretKey: legacyServiceRoleKey,
    keyType: "LEGACY_SERVICE_ROLE",
  };
}

export function getSupabaseHeaders(
  config: SupabaseServerConfig,
  extraHeaders: HeadersInit = {},
): HeadersInit {
  /*
    Chaves novas sb_secret_ não são JWTs.
    Elas devem ser enviadas somente no cabeçalho apikey.

    A chave service_role antiga é JWT e pode ser enviada
    também em Authorization: Bearer.
  */
  if (config.keyType === "SECRET") {
    return {
      apikey: config.secretKey,
      ...extraHeaders,
    };
  }

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

      return message
        ? `${message} (HTTP ${response.status})`
        : `Erro no Supabase. HTTP ${response.status}.`;
    }

    const text = await response.text();

    return text
      ? `${text} (HTTP ${response.status})`
      : `Erro no Supabase. HTTP ${response.status}.`;
  } catch {
    return `Erro no Supabase. HTTP ${response.status}.`;
  }
}