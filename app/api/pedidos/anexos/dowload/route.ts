import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  encodeStoragePath,
  getErrorMessage,
  getSupabaseHeaders,
  getSupabaseServerConfig,
} from "../../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PEDIDOS_BUCKET = "pedido-anexos";

type SignedDownloadResponse = {
  signedURL?: string;
  signedUrl?: string;
};

function isSafeStoragePath(value: string) {
  return (
    value.startsWith("pedidos/") &&
    value.length < 500 &&
    !value.includes("..")
  );
}

function getSafeDownloadName(value: string) {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const safeName = normalized
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);

  return safeName || "anexo";
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const isAdmin =
      cookieStore.get("global-sc-admin-session")?.value ===
      "autorizado";

    if (!isAdmin) {
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

    const requestUrl = new URL(request.url);

    const caminho =
      requestUrl.searchParams.get("caminho")?.trim() || "";

    const nome =
      requestUrl.searchParams.get("nome")?.trim() || "anexo";

    if (!isSafeStoragePath(caminho)) {
      return NextResponse.json(
        {
          ok: false,
          message: "O caminho do anexo é inválido.",
        },
        {
          status: 400,
        },
      );
    }

    const config = getSupabaseServerConfig();

    const response = await fetch(
      `${config.url}/storage/v1/object/sign/${PEDIDOS_BUCKET}/${encodeStoragePath(
        caminho,
      )}`,
      {
        method: "POST",
        headers: getSupabaseHeaders(config, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          expiresIn: 300,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const mensagemSupabase = await getErrorMessage(response);

      console.error("Erro ao gerar link de download:", {
        bucket: PEDIDOS_BUCKET,
        caminho,
        status: response.status,
        mensagemSupabase,
      });

      throw new Error(mensagemSupabase);
    }

    const data =
      (await response.json()) as SignedDownloadResponse;

    const signedPath =
      data.signedURL || data.signedUrl || "";

    if (!signedPath) {
      throw new Error(
        "O Supabase não retornou o link para download.",
      );
    }

    const signedUrl = new URL(
      signedPath.startsWith("http")
        ? signedPath
        : `${config.url}/storage/v1${signedPath}`,
    );

    signedUrl.searchParams.set(
      "download",
      getSafeDownloadName(nome),
    );

    return NextResponse.redirect(signedUrl.toString(), {
      status: 302,
    });
  } catch (error) {
    console.error("Erro no download do anexo:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível baixar o anexo.",
      },
      {
        status: 500,
      },
    );
  }
}