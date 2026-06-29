import type { ReactNode } from "react";

/*
  A proteção das rotas administrativas é feita por middleware.ts no servidor.
  Este layout não altera nenhum visual do painel.
*/
export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
