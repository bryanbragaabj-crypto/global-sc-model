"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pedido,
  PedidoAnexo,
  PedidoStatus,
  getOrigemLabel,
  getStatusLabel,
  pedidosIniciais,
} from "../pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  atualizarPedido,
  atualizarStatusPedido,
  getPedidos,
} from "../pedidos-storage";
import styles from "./detalhe.module.css";

type ModalType = "RESPONDER" | "ENCAMINHAR" | "ANEXO" | null;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5 7 12l7 7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 8 4 12l5 4" />
      <path d="M4 12h8a7 7 0 0 1 7 7" />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14 8 5 4-5 4" />
      <path d="M19 12h-8a7 7 0 0 0-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.7 2.7L16.5 9" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8V3h12v5" />
      <path d="M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h3l1.4 4.3-2 1.6a14.2 14.2 0 0 0 5.6 5.6l1.6-2L21 14v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

function ClipIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 12 6.8-6.8a4 4 0 1 1 5.7 5.7L11 21.4A6 6 0 0 1 2.6 13L12 3.6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function getAttachmentClass(tipo: PedidoAnexo["tipo"]) {
  if (tipo === "PDF") {
    return styles.pdfFile;
  }

  if (tipo === "PNG") {
    return styles.pngFile;
  }

  if (tipo === "JPG") {
    return styles.jpgFile;
  }

  return styles.txtFile;
}

function getPrimaryAction(status: PedidoStatus) {
  if (status === "RECEBIDO") {
    return {
      label: "Marcar em andamento",
      nextStatus: "EM_ANDAMENTO" as PedidoStatus,
    };
  }

  if (status === "EM_ANDAMENTO") {
    return {
      label: "Finalizar pedido",
      nextStatus: "FINALIZADO" as PedidoStatus,
    };
  }

  return {
    label: "Pedido finalizado",
    nextStatus: "FINALIZADO" as PedidoStatus,
  };
}

function normalizeWhatsapp(phone?: string) {
  return (phone || "").replace(/\D/g, "");
}

function getAttachmentSize(anexo: PedidoAnexo) {
  const anexoComTamanho = anexo as PedidoAnexo & { tamanho?: string };
  return anexoComTamanho.tamanho || "Não informado";
}

export default function DetalhePedidoPage() {
  const params = useParams<{ id: string }>();
  const pedidoId = params.id;

  const [pedido, setPedido] = useState<Pedido | null>(() => {
    return pedidosIniciais.find((item) => item.id === pedidoId) || null;
  });

  const [modal, setModal] = useState<ModalType>(null);
  const [anexoSelecionado, setAnexoSelecionado] =
    useState<PedidoAnexo | null>(null);
  const [mensagemResposta, setMensagemResposta] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    function carregarPedido() {
      const pedidoEncontrado = getPedidos().find(
        (item) => item.id === pedidoId,
      );

      setPedido(pedidoEncontrado || null);
    }

    carregarPedido();

    window.addEventListener(PEDIDOS_UPDATED_EVENT, carregarPedido);
    window.addEventListener("storage", carregarPedido);

    return () => {
      window.removeEventListener(PEDIDOS_UPDATED_EVENT, carregarPedido);
      window.removeEventListener("storage", carregarPedido);
    };
  }, [pedidoId]);

  if (!pedido) {
    return (
      <main className={styles.notFound}>
        <h1>Pedido não encontrado</h1>
        <p>Este pedido não está disponível no sistema.</p>
        <Link href="/admin/pedidos">Voltar para Pedidos</Link>
      </main>
    );
  }

  const primaryAction = getPrimaryAction(pedido.status);

  function atualizarStatus() {
    if (!pedido) {
      return;
    }

    if (pedido.status === "FINALIZADO") {
      setFeedback("Este pedido já está finalizado.");
      return;
    }

    const pedidoAtualizado = atualizarStatusPedido(
      pedido.id,
      primaryAction.nextStatus,
    );

    if (pedidoAtualizado) {
      setPedido(pedidoAtualizado);

      if (primaryAction.nextStatus === "EM_ANDAMENTO") {
        setFeedback(
          "Pedido marcado como Em andamento e enviado para a pasta correspondente.",
        );
      }

      if (primaryAction.nextStatus === "FINALIZADO") {
        setFeedback(
          "Pedido finalizado com sucesso e enviado para a pasta Finalizados.",
        );
      }
    }
  }

  function encaminharPedido() {
    if (!pedido) {
      return;
    }

    if (!destinatario) {
      setFeedback("Selecione um responsável para encaminhar o pedido.");
      return;
    }

    const pedidoAtualizado = atualizarPedido(pedido.id, {
      responsavel: destinatario,
    });

    if (pedidoAtualizado) {
      setPedido(pedidoAtualizado);
      setFeedback(`Pedido encaminhado para ${destinatario}.`);
      setModal(null);
      setDestinatario("");
    }
  }

  function abrirWhatsapp() {
    if (!pedido) {
      return;
    }

    const telefone = normalizeWhatsapp(pedido.telefone);

    if (!telefone) {
      setFeedback("Este pedido não possui telefone cadastrado.");
      return;
    }

    const texto = encodeURIComponent(
      mensagemResposta ||
        `Olá, ${pedido.representante}. Recebemos o seu pedido ${pedido.numero} e estamos analisando as informações.`,
    );

    window.open(
      `https://wa.me/55${telefone}?text=${texto}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function abrirEmail() {
    if (!pedido) {
      return;
    }

    const assunto = encodeURIComponent(`Retorno sobre o pedido ${pedido.numero}`);
    const corpo = encodeURIComponent(
      mensagemResposta ||
        `Olá, ${pedido.representante}.\n\nRecebemos o seu pedido ${pedido.numero} e estamos analisando as informações.\n\nAtenciosamente,\nEquipe Global SC`,
    );

    window.location.href = `mailto:${pedido.email}?subject=${assunto}&body=${corpo}`;
  }

  function abrirAnexo(anexo: PedidoAnexo) {
    setAnexoSelecionado(anexo);
    setModal("ANEXO");
  }

  function baixarAnexo(anexo: PedidoAnexo) {
    const conteudo = `Arquivo demonstrativo: ${anexo.nome}\nTipo: ${anexo.tipo}\nTamanho: ${getAttachmentSize(anexo)}`;

    const blob = new Blob([conteudo], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${anexo.nome}.txt`;
    link.click();

    URL.revokeObjectURL(url);

    setFeedback(
      "O download demonstrativo foi iniciado. Os arquivos reais serão vinculados quando o armazenamento estiver conectado.",
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div />

        <div className={styles.userArea}>
          <button type="button" className={styles.notification}>
            <BellIcon />
            <span>3</span>
          </button>

          <div className={styles.userIcon}>
            <UserIcon />
          </div>

          <div>
            <strong>Administrador</strong>
            <span>Global SC</span>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.breadcrumb}>
          <Link href="/admin/pedidos">Pedidos</Link>
          <span>›</span>
          <Link href="/admin/pedidos">Caixa de Entrada</Link>
          <span>›</span>
          <strong>Pedido {pedido.numero}</strong>
        </nav>

        <section className={styles.mainCard}>
          <header className={styles.orderHeader}>
            <div className={styles.orderTitle}>
              <div className={styles.mailCircle}>
                <MailIcon />
              </div>

              <div>
                <h1>Novo Pedido Recebido</h1>
                <p>Pedido recebido através do formulário do site</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={() => setModal("RESPONDER")}>
                <ReplyIcon />
                Responder
              </button>

              <button type="button" onClick={() => setModal("ENCAMINHAR")}>
                <ForwardIcon />
                Encaminhar
              </button>

              <button
                type="button"
                className={styles.primaryAction}
                disabled={pedido.status === "FINALIZADO"}
                onClick={atualizarStatus}
              >
                <CheckIcon />
                {primaryAction.label}
              </button>

              <button type="button" onClick={() => window.print()}>
                <PrintIcon />
                Imprimir
              </button>
            </div>
          </header>

          <section className={styles.statusBar}>
            <div>
              <span>Status</span>
              <strong className={styles.statusValue}>
                <i
                  className={
                    pedido.status === "FINALIZADO"
                      ? styles.statusFinalizado
                      : pedido.status === "EM_ANDAMENTO"
                        ? styles.statusAndamento
                        : styles.statusRecebido
                  }
                />
                {getStatusLabel(pedido.status)}
              </strong>
            </div>

            <div>
              <span>Data e Hora</span>
              <strong>
                <CalendarIcon />
                {pedido.dataFormatada}
              </strong>
            </div>

            <div>
              <span>Origem</span>
              <strong>
                <GlobeIcon />
                {getOrigemLabel(pedido.origem)}
              </strong>
            </div>

            <div>
              <span>Nº do Pedido</span>
              <strong>{pedido.numero}</strong>
            </div>
          </section>

          {feedback && <div className={styles.feedback}>{feedback}</div>}

          <section className={styles.contentGrid}>
            <div className={styles.leftColumn}>
              <article className={styles.infoCard}>
                <header>
                  <UserIcon />
                  <h2>Dados da Empresa / Cliente</h2>
                </header>

                <div className={styles.companyGrid}>
                  <div>
                    <span>CNPJ</span>
                    <strong>{pedido.cnpj}</strong>
                  </div>

                  <div>
                    <span>Bairro</span>
                    <strong>{pedido.bairro}</strong>
                  </div>

                  <div>
                    <span>Nome</span>
                    <strong>{pedido.cliente}</strong>
                  </div>

                  <div>
                    <span>CEP</span>
                    <strong>{pedido.cep}</strong>
                  </div>

                  <div>
                    <span>Nome Fantasia</span>
                    <strong>{pedido.nomeFantasia}</strong>
                  </div>

                  <div>
                    <span>Cidade</span>
                    <strong>{pedido.cidade}</strong>
                  </div>

                  <div>
                    <span>Inscrição Estadual</span>
                    <strong>{pedido.inscricaoEstadual}</strong>
                  </div>

                  <div>
                    <span>Telefone</span>
                    <strong>{pedido.telefone}</strong>
                  </div>

                  <div>
                    <span>Endereço</span>
                    <strong>{pedido.endereco}</strong>
                  </div>

                  <div>
                    <span>E-mail</span>
                    <strong>{pedido.email}</strong>
                  </div>

                  <div>
                    <span>Nº</span>
                    <strong>{pedido.numeroEndereco}</strong>
                  </div>

                  <div>
                    <span>Representante</span>
                    <strong>{pedido.representante}</strong>
                  </div>
                </div>
              </article>

              <article className={styles.messageCard}>
                <header>
                  <MessageIcon />
                  <h2>Mensagem do Cliente</h2>
                </header>

                <p>{pedido.mensagem}</p>
              </article>

              <article className={styles.filesCard}>
                <header>
                  <ClipIcon />
                  <h2>Arquivos Enviados</h2>
                </header>

                <div className={styles.filesList}>
                  {pedido.anexos.map((anexo) => (
                    <article className={styles.fileItem} key={anexo.id}>
                      <span
                        className={`${styles.fileBadge} ${getAttachmentClass(
                          anexo.tipo,
                        )}`}
                      >
                        {anexo.tipo}
                      </span>

                      <strong>{anexo.nome}</strong>
                      <small>
                        {anexo.tipo} · {getAttachmentSize(anexo)}
                      </small>

                      <div>
                        <button
                          type="button"
                          title="Baixar arquivo"
                          onClick={() => baixarAnexo(anexo)}
                        >
                          <DownloadIcon />
                        </button>

                        <button
                          type="button"
                          title="Visualizar arquivo"
                          onClick={() => abrirAnexo(anexo)}
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </article>
                  ))}

                  {pedido.anexos.length === 0 && (
                    <p className={styles.noFiles}>
                      Nenhum arquivo foi enviado neste pedido.
                    </p>
                  )}
                </div>

                <footer>
                  Total de <b>{pedido.anexos.length}</b> anexos
                </footer>
              </article>
            </div>

            <aside className={styles.summaryColumn}>
              <article className={styles.summaryCard}>
                <header>
                  <ClipIcon />
                  <h2>Resumo do Pedido</h2>
                </header>

                <div className={styles.summaryItem}>
                  <MailIcon />
                  <div>
                    <span>Cliente</span>
                    <strong>{pedido.cliente}</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <UserIcon />
                  <div>
                    <span>Representante</span>
                    <strong>{pedido.representante}</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <PhoneIcon />
                  <div>
                    <span>Telefone</span>
                    <strong>{pedido.telefone}</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <MailIcon />
                  <div>
                    <span>E-mail</span>
                    <strong>{pedido.email}</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <ClipIcon />
                  <div>
                    <span>Total de Anexos</span>
                    <strong>{pedido.anexos.length} arquivos</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <ShieldIcon />
                  <div>
                    <span>Origem</span>
                    <strong>{getOrigemLabel(pedido.origem)}</strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <CheckIcon />
                  <div>
                    <span>Status</span>
                    <strong className={styles.statusText}>
                      {getStatusLabel(pedido.status)}
                    </strong>
                  </div>
                </div>

                <div className={styles.summaryItem}>
                  <ClockIcon />
                  <div>
                    <span>Pedido recebido em</span>
                    <strong>{pedido.dataFormatada}</strong>
                  </div>
                </div>

                {pedido.responsavel && (
                  <div className={styles.summaryItem}>
                    <UserIcon />
                    <div>
                      <span>Responsável</span>
                      <strong>{pedido.responsavel}</strong>
                    </div>
                  </div>
                )}

                <div className={styles.attentionBox}>
                  <InfoIcon />
                  <p>
                    Este pedido será analisado pela equipe Global SC. Em breve
                    entraremos em contato.
                  </p>
                </div>
              </article>
            </aside>
          </section>
        </section>
      </div>

      {modal === "RESPONDER" && (
        <div className={styles.modalOverlay}>
          <section className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setModal(null)}
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>

            <h2>Responder ao cliente</h2>

            <p>
              A resposta pode ser enviada pelo WhatsApp ou pelo e-mail
              informado no pedido.
            </p>

            <textarea
              value={mensagemResposta}
              onChange={(event) => setMensagemResposta(event.target.value)}
              placeholder="Digite sua mensagem para o cliente"
            />

            <div className={styles.modalActions}>
              <button type="button" onClick={abrirEmail}>
                Enviar por E-mail
              </button>

              <button
                type="button"
                className={styles.modalPrimary}
                onClick={abrirWhatsapp}
              >
                Abrir WhatsApp
              </button>
            </div>
          </section>
        </div>
      )}

      {modal === "ENCAMINHAR" && (
        <div className={styles.modalOverlay}>
          <section className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setModal(null)}
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>

            <h2>Encaminhar pedido</h2>

            <p>Selecione o responsável que assumirá este pedido.</p>

            <select
              value={destinatario}
              onChange={(event) => setDestinatario(event.target.value)}
            >
              <option value="">Selecione um responsável</option>
              <option value="Operador 01">Operador 01</option>
              <option value="Operador 02">Operador 02</option>
              <option value="Operador 03">Operador 03</option>
              <option value="Administrador Global SC">
                Administrador Global SC
              </option>
            </select>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setModal(null)}>
                Cancelar
              </button>

              <button
                type="button"
                className={styles.modalPrimary}
                onClick={encaminharPedido}
              >
                Encaminhar Pedido
              </button>
            </div>
          </section>
        </div>
      )}

      {modal === "ANEXO" && anexoSelecionado && (
        <div className={styles.modalOverlay}>
          <section className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => {
                setModal(null);
                setAnexoSelecionado(null);
              }}
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>

            <h2>{anexoSelecionado.nome}</h2>

            <p>
              Tipo: <b>{anexoSelecionado.tipo}</b>
            </p>

            <p>
              Tamanho: <b>{getAttachmentSize(anexoSelecionado)}</b>
            </p>

            <div className={styles.filePreview}>
              Visualização do arquivo disponível quando os anexos reais forem
              conectados ao armazenamento do sistema.
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => baixarAnexo(anexoSelecionado)}
              >
                Baixar Informações
              </button>

              <button
                type="button"
                className={styles.modalPrimary}
                onClick={() => {
                  setModal(null);
                  setAnexoSelecionado(null);
                }}
              >
                Fechar
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}