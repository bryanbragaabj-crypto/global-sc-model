"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UsuarioLogado = {
  autenticado?: boolean;
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [acessoLiberado, setAcessoLiberado] = useState(false);

  useEffect(() => {
    /*
      A rota /admin é a tela pública de login.
      Todas as outras rotas administrativas exigem sessão autenticada.
    */
    if (pathname === "/admin") {
      setAcessoLiberado(true);
      return;
    }

    try {
      const salvo = window.localStorage.getItem("global-sc-usuario-logado");

      if (salvo) {
        const usuario = JSON.parse(salvo) as UsuarioLogado;

        if (usuario.autenticado === true) {
          setAcessoLiberado(true);
          return;
        }
      }
    } catch {
      // Caso o armazenamento esteja inválido, volta para o login.
    }

    setAcessoLiberado(false);
    router.replace("/admin");
  }, [pathname, router]);

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  if (!acessoLiberado) {
    return (
      <main
        style={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        Verificando acesso...
      </main>
    );
  }

  return <>{children}</>;
}