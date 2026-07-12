import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROBOS_DE_COMPARTILHAMENTO =
  /WhatsApp|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot/i;

export function proxy(request: NextRequest) {
  const userAgent =
    request.headers.get("user-agent") ?? "";

  const estaNaPaginaInicial =
    request.nextUrl.pathname === "/";

  const ehRoboDeCompartilhamento =
    ROBOS_DE_COMPARTILHAMENTO.test(userAgent);

  if (
    estaNaPaginaInicial &&
    ehRoboDeCompartilhamento
  ) {
    return NextResponse.rewrite(
      new URL("/share-preview.html", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};