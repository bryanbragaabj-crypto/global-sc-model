"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

/*
  Credenciais iniciais para apresentação.
  Esta validação impede entrar no painel com dados vazios ou incorretos.
*/
const LOGIN_ADMIN = {
  email: "admin@globalsc.com.br",
  senha: "GlobalSC@2026",
  nome: "Admin Global SC",
  perfil: "Administrador Master",
};

function MailIcon() {
  return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5.2" y="10.3" width="13.6" height="9.6" rx="2" />
      <path d="M8.3 10.3V7.6a3.7 3.7 0 0 1 7.4 0v2.7" />
      <path d="M12 14.2v2.1" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg className={styles.eyeIcon} viewBox="0 0 24 24" aria-hidden="true">
      {visible ? (
        <>
          <path d="M2.5 12s3.2-5.6 9.5-5.6S21.5 12 21.5 12s-3.2 5.6-9.5 5.6S2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.6" />
        </>
      ) : (
        <>
          <path d="M3 3 21 21" />
          <path d="M10.5 6.5A10.8 10.8 0 0 1 12 6.4c6.3 0 9.5 5.6 9.5 5.6a15.6 15.6 0 0 1-3.2 3.7" />
          <path d="M6.3 6.3A15.3 15.3 0 0 0 2.5 12S5.7 17.6 12 17.6a10.6 10.6 0 0 0 3.5-.6" />
          <path d="M9.6 9.6a3.4 3.4 0 0 0 4.8 4.8" />
        </>
      )}
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className={styles.shieldIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 19 6v5.7c0 4.5-3 7.7-7 9.3-4-1.6-7-4.8-7-9.3V6l7-3Z" />
      <path d="m9.5 12.1 1.6 1.6 3.5-3.5" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [feedback, setFeedback] = useState("");

  function mostrarMensagem(texto: string) {
    setFeedback(texto);
  }

  function entrarNoPainel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailDigitado = email.trim().toLowerCase();
    const senhaDigitada = senha.trim();

    if (!emailDigitado || !senhaDigitada) {
      mostrarMensagem("Preencha o e-mail e a senha para continuar.");
      return;
    }

    if (
      emailDigitado !== LOGIN_ADMIN.email ||
      senhaDigitada !== LOGIN_ADMIN.senha
    ) {
      mostrarMensagem("E-mail ou senha incorretos.");
      return;
    }

    window.localStorage.setItem(
      "global-sc-usuario-logado",
      JSON.stringify({
        autenticado: true,
        nome: LOGIN_ADMIN.nome,
        perfil: LOGIN_ADMIN.perfil,
        email: LOGIN_ADMIN.email,
        lembrar,
      }),
    );

    router.push("/admin/painel");
  }

  return (
    <main className={styles.page}>
      <div className={styles.curveTopLeft} aria-hidden="true" />
      <div className={styles.curveBottomLeft} aria-hidden="true" />
      <div className={styles.curveRight} aria-hidden="true" />
      <div className={styles.dotsLeft} aria-hidden="true" />
      <div className={styles.dotsRight} aria-hidden="true" />

      <section className={styles.loginArea}>
        <Image
          src="/logo-admin.png"
          alt="Global SC Fábricas e Importadora"
          width={620}
          height={300}
          priority
          className={styles.logo}
        />

        <form className={styles.card} onSubmit={entrarNoPainel}>
          <h1>Entrar</h1>
          <p className={styles.subtitle}>Acesse sua conta</p>
          <div className={styles.titleLine} />

          <label className={styles.field}>
            <span>E-mail</span>

            <div className={styles.inputBox}>
              <MailIcon />

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setFeedback("");
                }}
                placeholder="seu@email.com"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Senha</span>

            <div className={styles.inputBox}>
              <LockIcon />

              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(event) => {
                  setSenha(event.target.value);
                  setFeedback("");
                }}
                placeholder="Sua senha"
                autoComplete="current-password"
                required
              />

              <button
                className={styles.passwordToggle}
                type="button"
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setMostrarSenha((current) => !current)}
              >
                <EyeIcon visible={mostrarSenha} />
              </button>
            </div>
          </label>

          <div className={styles.optionsRow}>
            <label className={styles.rememberLabel}>
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(event) => setLembrar(event.target.checked)}
              />
              <span>Lembrar de mim</span>
            </label>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() =>
                mostrarMensagem(
                  "A recuperação de senha será configurada na próxima etapa.",
                )
              }
            >
              Esqueci minha senha
            </button>
          </div>

          {feedback && <p className={styles.feedback}>{feedback}</p>}

          <button className={styles.enterButton} type="submit">
            Entrar
          </button>
        </form>

        <div className={styles.security}>
          <ShieldIcon />
          <span>Seguro, rápido e confiável</span>
        </div>
      </section>
    </main>
  );
}
