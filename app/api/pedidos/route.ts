import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  encodeStoragePath,
  getErrorMessage,
  getSupabaseHeaders,
  getSupabaseServerConfig,
} from "../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PEDIDOS_BUCKET = "pedido-anexos";
const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024;

const ALLOWED_FILE_TYPES: Record<string, "PDF" | "PNG" | "JPG"> = {
  "application/pdf": "PDF",
  "image/png": "PNG",
  "image/jpeg": "JPG",
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function safeFileName(name: string) {
  const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalized
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function createOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const sequence = String(now.getTime()).slice(-8);

  return `GS${year}-${sequence}`;
}

export async function POST(request: Request) {
  const uploadedPaths: string[] = [];

  try {
    const formData = await request.formData();

    const cnpj = getText(formData, "cnpj");
    const nome = getText(formData, "nome");
    const nomeFantasia = getText(formData, "nomeFantasia");
    const endereco = getText(formData, "endereco");
    const numeroEndereco = getText(formData, "numero");
    const bairro = getText(formData, "bairro");
    const cep = getText(formData, "cep");
    const cidade = getText(formData, "cidade");
    const telefone = getText(formData, "telefone");
    const email = getText(formData, "email").toLowerCase();
    const representante = getText(formData, "representante");
    const mensagem = getText(formData, "mensagem");
    const origemSolicitada = getText(formData, "origem");

    if (
      !cnpj ||
      !nome ||
      !nomeFantasia ||
      !endereco ||
      !numeroEndereco ||
      !bairro ||
      !cep ||
      !cidade ||
      !telefone ||
      !email ||
      !representante
    ) {
      return NextResponse.json(
        { ok: false, message: "Preencha todos os campos obrigatórios do pedido." },
        { status: 400 },
      );
    }

    if (onlyNumbers(cnpj).length !== 14) {
      return NextResponse.json(
        { ok: false, message: "Informe um CNPJ válido com 14 números." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    const attachmentFiles = formData
      .getAll("anexos")
      .filter((item): item is File => item instanceof File);

    if (!mensagem && attachmentFiles.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Escreva uma mensagem ou adicione ao menos um anexo." },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const isAdmin =
      cookieStore.get("global-sc-admin-session")?.value === "autorizado";

    const origem =
      isAdmin && origemSolicitada === "MANUAL" ? "MANUAL" : "SITE";

    const config = getSupabaseServerConfig();
    const pedidoId = crypto.randomUUID();
    const numeroPedido = createOrderNumber();

    const anexos: Array<{
      id: string;
      nome: string;
      tipo: "PDF" | "PNG" | "JPG";
      tamanho: string;
      caminho: string;
    }> = [];

    for (const file of attachmentFiles) {
      const tipo = ALLOWED_FILE_TYPES[file.type];

      if (!tipo) {
        return NextResponse.json(
          { ok: false, message: "Envie somente arquivos PDF, PNG ou JPG." },
          { status: 400 },
        );
      }

      if (file.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json(
          { ok: false, message: "Cada arquivo pode ter no máximo 20 MB." },
          { status: 400 },
        );
      }

      const attachmentId = crypto.randomUUID();
      const caminho = `${pedidoId}/${attachmentId}-${safeFileName(file.name)}`;
      const uploadUrl = `${config.url}/storage/v1/object/${PEDIDOS_BUCKET}/${encodeStoragePath(caminho)}`;

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: getSupabaseHeaders(config, {
          "Content-Type": file.type,
          "x-upsert": "false",
        }),
        body: new Uint8Array(await file.arrayBuffer()),
      });

      if (!uploadResponse.ok) {
        const motivo = await getErrorMessage(uploadResponse);
        throw new Error(
          `Não foi possível salvar o anexo "${file.name}": ${motivo}`,
        );
      }

      uploadedPaths.push(caminho);

      anexos.push({
        id: attachmentId,
        nome: file.name,
        tipo,
        tamanho: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        caminho,
      });
    }

    const insertResponse = await fetch(`${config.url}/rest/v1/pedidos`, {
      method: "POST",
      headers: getSupabaseHeaders(config, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify({
        id: pedidoId,
        numero: numeroPedido,
        cliente: nomeFantasia || nome,
        email,
        telefone,
        cnpj,
        nome,
        nome_fantasia: nomeFantasia,
        inscricao_estadual: getText(formData, "inscricaoEstadual"),
        endereco,
        numero_endereco: numeroEndereco,
        bairro,
        cep,
        cidade,
        representante,
        assunto: `Pedido - ${nomeFantasia || nome}`,
        mensagem: mensagem || "Pedido enviado com anexos.",
        importadora: "A definir",
        origem,
        status: "RECEBIDO",
        responsavel: isAdmin ? "Admin Global SC" : null,
        anexos,
      }),
    });

    if (!insertResponse.ok) {
      const motivo = await getErrorMessage(insertResponse);
      throw new Error(`Não foi possível registrar o pedido: ${motivo}`);
    }

    return NextResponse.json({ ok: true, numero: numeroPedido }, { status: 201 });
  } catch (error) {
    /*
      Em caso de falha depois de anexar arquivos, tenta remover o que foi enviado.
      Isso evita deixar arquivos soltos no Storage.
    */
    if (uploadedPaths.length > 0) {
      try {
        const config = getSupabaseServerConfig();

        await fetch(`${config.url}/storage/v1/object/${PEDIDOS_BUCKET}`, {
          method: "DELETE",
          headers: getSupabaseHeaders(config, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            prefixes: uploadedPaths,
          }),
        });
      } catch {
        // Mantém a mensagem do erro principal.
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar o pedido. Tente novamente.",
      },
      { status: 500 },
    );
  }
}
