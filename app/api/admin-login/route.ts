import { NextResponse } from "next/server";

const COOKIE_NAME = "global-sc-admin-session";

/*
  Credenciais iniciais para apresentação.
  Depois podemos mover estas duas variáveis para o painel master / Supabase.
  Na Vercel, variáveis de ambiente com estes nomes substituem os valores abaixo.
*/
const LOGIN_EMAIL =
  process.env.ADMIN_LOGIN_EMAIL?.trim().toLowerCase() ||
  "admin@globalsc.com.br";

const LOGIN_SENHA =
  process.env.ADMIN_LOGIN_SENHA || "GlobalSC@2026";

type LoginBody = {
  email?: unknown;
  senha?: unknown;
  lembrar?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const senha = typeof body.senha === "string" ? body.senha.trim() : "";

    const lembrar = body.lembrar === true;

    if (!email || !senha) {
      return NextResponse.json(
        {
          ok: false,
          message: "Preencha o e-mail e a senha para continuar.",
        },
        { status: 400 },
      );
    }

    if (email !== LOGIN_EMAIL || senha !== LOGIN_SENHA) {
      return NextResponse.json(
        {
          ok: false,
          message: "E-mail ou senha incorretos.",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      ok: true,
      usuario: {
        nome: "Admin Global SC",
        perfil: "Administrador Master",
        email: LOGIN_EMAIL,
      },
    });

    response.cookies.set(COOKIE_NAME, "autorizado", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: lembrar ? 60 * 60 * 24 * 30 : 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível processar o login.",
      },
      { status: 400 },
    );
  }
}
