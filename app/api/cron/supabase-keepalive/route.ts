import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SUPABASE_MANAGEMENT_URL =
  "https://api.supabase.com/v1";

type SupabaseProjectResponse = {
  id?: string;
  ref?: string;
  name?: string;
  status?: string;
  databases?: Array<{
    status?: string;
  }>;
};

type KeepAliveResult = {
  ok: boolean;
  status: number;
  message: string;
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

  return parsedUrl.origin;
}

function getSupabaseServerKey() {
  const secretKey =
    getOptionalEnv("SUPABASE_SECRET_KEY") ||
    getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!secretKey) {
    throw new Error(
      "Configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY na Vercel.",
    );
  }

  return secretKey;
}

function getSupabaseDataHeaders(
  serverKey: string,
): HeadersInit {
  /*
    A nova chave sb_secret_ é enviada no cabeçalho apikey.

    A chave service_role antiga é um JWT e também pode
    ser enviada no cabeçalho Authorization.
  */
  if (serverKey.startsWith("sb_secret_")) {
    return {
      apikey: serverKey,
      Accept: "application/json",
    };
  }

  return {
    apikey: serverKey,
    Authorization: `Bearer ${serverKey}`,
    Accept: "application/json",
  };
}

function getManagementHeaders(
  accessToken: string,
): HeadersInit {
  return {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMilliseconds = 15000,
) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMilliseconds);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readResponseMessage(
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
        details?: string;
        hint?: string;
      };

      return (
        data.message ||
        data.error_description ||
        data.error ||
        data.details ||
        data.hint ||
        `HTTP ${response.status}`
      );
    }

    const text = await response.text();

    return text || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function testSupabaseConnection(): Promise<KeepAliveResult> {
  const supabaseUrl = normalizeSupabaseUrl(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  );

  const serverKey = getSupabaseServerKey();

  /*
    Faz uma leitura mínima e real da tabela pedidos.
    Apenas um ID é solicitado.
  */
  const endpoint =
    `${supabaseUrl}/rest/v1/pedidos` +
    "?select=id&limit=1";

  try {
    const response = await fetchWithTimeout(
      endpoint,
      {
        method: "GET",
        headers: getSupabaseDataHeaders(serverKey),
      },
      15000,
    );

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        message:
          "Supabase respondeu normalmente e o projeto está ativo.",
      };
    }

    return {
      ok: false,
      status: response.status,
      message: await readResponseMessage(response),
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.name === "AbortError"
          ? "A conexão com o Supabase excedeu 15 segundos."
          : error.message
        : "Erro desconhecido ao conectar com o Supabase.";

    return {
      ok: false,
      status: 0,
      message,
    };
  }
}

async function getProjectStatus(
  projectRef: string,
  accessToken: string,
) {
  const response = await fetchWithTimeout(
    `${SUPABASE_MANAGEMENT_URL}/projects/${encodeURIComponent(
      projectRef,
    )}`,
    {
      method: "GET",
      headers: getManagementHeaders(accessToken),
    },
    15000,
  );

  if (!response.ok) {
    throw new Error(
      `Não foi possível consultar o estado do projeto: ${await readResponseMessage(
        response,
      )}`,
    );
  }

  const data =
    (await response.json()) as SupabaseProjectResponse;

  const databaseStatus =
    Array.isArray(data.databases) &&
    data.databases.length > 0
      ? data.databases[0]?.status || ""
      : "";

  return {
    project: data,
    projectStatus: data.status || "",
    databaseStatus,
  };
}

async function requestProjectRestore(
  projectRef: string,
  accessToken: string,
) {
  const response = await fetchWithTimeout(
    `${SUPABASE_MANAGEMENT_URL}/projects/${encodeURIComponent(
      projectRef,
    )}/restore`,
    {
      method: "POST",
      headers: getManagementHeaders(accessToken),
      body: JSON.stringify({}),
    },
    20000,
  );

  if (!response.ok) {
    throw new Error(
      `O Supabase recusou a restauração: ${await readResponseMessage(
        response,
      )}`,
    );
  }

  let responseData: unknown = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  return {
    status: response.status,
    data: responseData,
  };
}

function isInactiveStatus(
  projectStatus: string,
  databaseStatus: string,
) {
  const statuses = [
    projectStatus,
    databaseStatus,
  ]
    .filter(Boolean)
    .map((status) => status.toUpperCase());

  return statuses.some(
    (status) =>
      status === "INACTIVE" ||
      status === "PAUSED" ||
      status.includes("PAUSED"),
  );
}

export async function GET(request: Request) {
  const startedAt = new Date().toISOString();

  try {
    /*
      A Vercel envia automaticamente:
      Authorization: Bearer CRON_SECRET
    */
    const cronSecret = getRequiredEnv("CRON_SECRET");

    const authorization =
      request.headers.get("authorization") || "";

    if (authorization !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        {
          ok: false,
          message: "Acesso não autorizado.",
        },
        {
          status: 401,
        },
      );
    }

    const projectRef = getRequiredEnv(
      "SUPABASE_PROJECT_REF",
    );

    const accessToken = getRequiredEnv(
      "SUPABASE_ACCESS_TOKEN",
    );

    /*
      1. Primeiro tenta manter o projeto ativo.
    */
    const keepAlive =
      await testSupabaseConnection();

    if (keepAlive.ok) {
      console.log(
        "Supabase keep-alive concluído:",
        keepAlive,
      );

      return NextResponse.json({
        ok: true,
        action: "KEEP_ALIVE",
        projectRef,
        startedAt,
        finishedAt: new Date().toISOString(),
        supabase: {
          online: true,
          status: keepAlive.status,
          message: keepAlive.message,
        },
      });
    }

    console.warn(
      "Supabase não respondeu ao keep-alive:",
      keepAlive,
    );

    /*
      2. Consulta a Management API para saber
         se o projeto realmente está pausado.
    */
    const projectState = await getProjectStatus(
      projectRef,
      accessToken,
    );

    const projectStatus =
      projectState.projectStatus;

    const databaseStatus =
      projectState.databaseStatus;

    console.log("Estado atual do projeto:", {
      projectRef,
      projectStatus,
      databaseStatus,
    });

    /*
      Se a restauração já estiver acontecendo,
      não dispara uma segunda solicitação.
    */
    const currentStatus = [
      projectStatus,
      databaseStatus,
    ]
      .join(" ")
      .toUpperCase();

    if (
      currentStatus.includes("RESTOR") ||
      currentStatus.includes("COMING_UP") ||
      currentStatus.includes("STARTING")
    ) {
      return NextResponse.json({
        ok: true,
        action: "RESTORE_IN_PROGRESS",
        projectRef,
        startedAt,
        finishedAt: new Date().toISOString(),
        projectStatus,
        databaseStatus,
        keepAliveError: keepAlive.message,
        message:
          "O projeto já está em processo de restauração.",
      });
    }

    /*
      3. Se estiver INACTIVE ou PAUSED,
         solicita a restauração.
    */
    if (
      isInactiveStatus(
        projectStatus,
        databaseStatus,
      )
    ) {
      const restoreResult =
        await requestProjectRestore(
          projectRef,
          accessToken,
        );

      console.log(
        "Restauração solicitada ao Supabase:",
        restoreResult,
      );

      return NextResponse.json({
        ok: true,
        action: "RESTORE_REQUESTED",
        projectRef,
        startedAt,
        finishedAt: new Date().toISOString(),
        previousProjectStatus: projectStatus,
        previousDatabaseStatus: databaseStatus,
        keepAliveError: keepAlive.message,
        restoreStatus: restoreResult.status,
        message:
          "O projeto estava inativo e a restauração automática foi solicitada.",
      });
    }

    /*
      Se o projeto estiver marcado como ativo, mas a
      consulta falhar, pode existir outro problema:
      chave incorreta, indisponibilidade ou erro na tabela.
    */
    return NextResponse.json(
      {
        ok: false,
        action: "ACTIVE_BUT_UNREACHABLE",
        projectRef,
        startedAt,
        finishedAt: new Date().toISOString(),
        projectStatus,
        databaseStatus,
        keepAliveStatus: keepAlive.status,
        keepAliveError: keepAlive.message,
        message:
          "O projeto não está marcado como inativo. Verifique as chaves, os logs ou uma possível indisponibilidade.",
      },
      {
        status: 503,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido no monitoramento.";

    console.error(
      "Erro no monitoramento do Supabase:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        action: "ERROR",
        startedAt,
        finishedAt: new Date().toISOString(),
        message,
      },
      {
        status: 500,
      },
    );
  }
}