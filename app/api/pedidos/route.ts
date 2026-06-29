import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabase-admin";

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

/*
  Garante que o local privado para anexos exista antes de enviar arquivo.
  Esta ação ocorre somente no servidor, usando a chave secreta do Supabase.
*/
async function garantirBucketDeAnexos() {
  const supabase = getSupabaseAdmin();

  const { data: bucket, error: bucketError } = await supabase.storage.getBucket(
    PEDIDOS_BUCKET,
  );

  if (bucket && !bucketError) {
    return;
  }

  const { error: createBucketError } = await supabase.storage.createBucket(
    PEDIDOS_BUCKET,
    {
      public: false,
      fileSizeLimit: MAX_ATTACHMENT_SIZE,
      allowedMimeTypes: [
        "application/pdf",
        "image/png",
        "image/jpeg",
      ],
    },
  );

  /*
    Se duas pessoas enviarem ao mesmo tempo, uma pode criar primeiro.
    Nesse caso, consulta novamente para confirmar que ele existe.
  */
  if (createBucketError) {
    const { data: bucketAfterCreate } = await supabase.storage.getBucket(
      PEDIDOS_BUCKET,
    );

    if (!bucketAfterCreate) {
      throw new Error(
        `Não foi possível preparar o armazenamento de anexos: ${createBucketError.message}`,
      );
    }
  }
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
        {
          ok: false,
          message: "Preencha todos os campos obrigatórios do pedido.",
        },
        { status: 400 },
      );
    }

    if (onlyNumbers(cnpj).length !== 14) {
      return NextResponse.json(
        {
          ok: false,
          message: "Informe um CNPJ válido com 14 números.",
        },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          ok: false,
          message: "Informe um e-mail válido.",
        },
        { status: 400 },
      );
    }

    const attachmentFiles = formData
      .getAll("anexos")
      .filter((item): item is File => item instanceof File);

    if (!mensagem && attachmentFiles.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Escreva uma mensagem ou adicione ao menos um anexo.",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const isAdmin =
      cookieStore.get("global-sc-admin-session")?.value === "autorizado";

    const origem =
      isAdmin && origemSolicitada === "MANUAL" ? "MANUAL" : "SITE";

    const supabase = getSupabaseAdmin();
    const pedidoId = crypto.randomUUID();
    const numeroPedido = createOrderNumber();

    const anexos: Array<{
      id: string;
      nome: string;
      tipo: "PDF" | "PNG" | "JPG";
      tamanho: string;
      caminho: string;
    }> = [];

    if (attachmentFiles.length > 0) {
      await garantirBucketDeAnexos();
    }

    for (const file of attachmentFiles) {
      const tipo = ALLOWED_FILE_TYPES[file.type];

      if (!tipo) {
        return NextResponse.json(
          {
            ok: false,
            message: "Envie somente arquivos PDF, PNG ou JPG.",
          },
          { status: 400 },
        );
      }

      if (file.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json(
          {
            ok: false,
            message: "Cada arquivo pode ter no máximo 20 MB.",
          },
          { status: 400 },
        );
      }

      const attachmentId = crypto.randomUUID();
      const caminho = `${pedidoId}/${attachmentId}-${safeFileName(
        file.name,
      )}`;

      const fileData = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(PEDIDOS_BUCKET)
        .upload(caminho, fileData, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(
          `Não foi possível salvar o anexo "${file.name}": ${uploadError.message}`,
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

    const { error: insertError } = await supabase.from("pedidos").insert({
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
    });

    if (insertError) {
      throw new Error(
        `Não foi possível registrar o pedido no banco: ${insertError.message}`,
      );
    }

    return NextResponse.json(
      {
        ok: true,
        numero: numeroPedido,
      },
      { status: 201 },
    );
  } catch (error) {
    if (uploadedPaths.length > 0) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase.storage.from(PEDIDOS_BUCKET).remove(uploadedPaths);
      } catch {
        // Mantém a mensagem do problema principal.
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
