const PAGINA_ORIGINAL =
  "https://screpresentacoes.com/solucoes-digitais";

const BOTAO_VOLTAR = `
  <a
    href="https://globalscaltoatacado.com/"
    aria-label="Voltar para Global SC"
    style="
      position: fixed;
      z-index: 2147483647;
      top: 18px;
      left: 18px;
      display: inline-flex;
      min-height: 44px;
      align-items: center;
      justify-content: center;
      padding: 0 18px;
      border: 1px solid rgba(255, 255, 255, 0.34);
      border-radius: 999px;
      background: #d6b56d;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
      color: #061616;
      font: 700 14px/1 Arial, sans-serif;
      text-decoration: none;
    "
  >
    ← Voltar para Global SC
  </a>
`;

export const revalidate = 3600;

export async function GET() {
  try {
    const resposta = await fetch(PAGINA_ORIGINAL, {
      next: { revalidate },
    });

    if (!resposta.ok) {
      throw new Error(`Página original respondeu ${resposta.status}`);
    }

    const htmlOriginal = await resposta.text();
    const htmlComBaseExterna = htmlOriginal.replace(
      '<base href="/solucoes-digitais/">',
      '<base href="https://screpresentacoes.com/solucoes-digitais/">',
    );
    const htmlFinal = htmlComBaseExterna.replace(
      "</body>",
      `${BOTAO_VOLTAR}</body>`,
    );

    return new Response(htmlFinal, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response(
      `<!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Global SC | Soluções Digitais</title>
        </head>
        <body style="margin:0;background:#0d2222;color:#fff;font-family:Arial,sans-serif">
          ${BOTAO_VOLTAR}
          <main style="min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center">
            <div>
              <h1>Soluções Digitais</h1>
              <p>Não foi possível carregar a apresentação neste momento.</p>
            </div>
          </main>
        </body>
      </html>`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
