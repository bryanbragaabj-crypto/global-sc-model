"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./pedido.module.css";

type FormData = {
  cnpj: string;
  nome: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  endereco: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  telefone: string;
  email: string;
  representante: string;
  mensagem: string;
};

type Attachment = {
  id: string;
  file: File;
  type: "PDF" | "PNG" | "JPG";
};

type CnpjResponse = {
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  municipio?: string;
  uf?: string;
  ddd_telefone_1?: string;
  ddd_telefone_2?: string;
  email?: string;
  descricao_situacao_cadastral?: string;
};

const initialFormData: FormData = {
  cnpj: "",
  nome: "",
  nomeFantasia: "",
  inscricaoEstadual: "",
  endereco: "",
  numero: "",
  bairro: "",
  cep: "",
  cidade: "",
  telefone: "",
  email: "",
  representante: "",
  mensagem: "",
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h13v-9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.88 11.88 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.18-3.47-8.41ZM12.06 21.8a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5a9.04 9.04 0 0 1-1.68-2.1c-.18-.3-.02-.46.14-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4m0 0L7 9m5-5 5 5M5 16.5A4.5 4.5 0 0 0 5.5 21h13a4.5 4.5 0 0 0 .5-8.97A7 7 0 0 0 5 16.5Z" />
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

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 3-8.5 18-3-7-7-3L21 3Z" />
      <path d="m9.5 14 4-4" />
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function getOnlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function formatCnpj(value: string) {
  const numbers = getOnlyNumbers(value).slice(0, 14);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatCep(value: string) {
  const numbers = getOnlyNumbers(value).slice(0, 8);

  return numbers.replace(/^(\d{5})(\d)/, "$1-$2");
}

function getAttachmentType(file: File): Attachment["type"] | null {
  if (file.type === "application/pdf") {
    return "PDF";
  }

  if (file.type === "image/png") {
    return "PNG";
  }

  if (file.type === "image/jpeg") {
    return "JPG";
  }

  return null;
}


const PEDIDOS_STORAGE_KEY = "global-sc-pedidos";
const PEDIDOS_UPDATED_EVENT = "global-sc-pedidos-updated";

function createOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const sequence = String(now.getTime()).slice(-6);

  return `GS${year}-${sequence}`;
}

function formatOrderDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function saveOrderInAdminQueue(
  formData: FormData,
  attachments: Attachment[],
  isAdminOrder: boolean,
) {
  const now = new Date();
  const orderId = `pedido-${now.getTime()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const newOrder = {
    id: orderId,
    numero: createOrderNumber(),
    cliente: formData.nomeFantasia || formData.nome,
    email: formData.email,
    telefone: formData.telefone,
    cnpj: formData.cnpj,
    nome: formData.nome,
    nomeFantasia: formData.nomeFantasia,
    inscricaoEstadual: formData.inscricaoEstadual,
    endereco: formData.endereco,
    numeroEndereco: formData.numero,
    bairro: formData.bairro,
    cep: formData.cep,
    cidade: formData.cidade,
    representante: formData.representante,
    assunto: `Pedido - ${formData.nomeFantasia || formData.nome}`,
    mensagem: formData.mensagem.trim() || "Pedido enviado com anexos.",
    importadora: "A definir",
    origem: isAdminOrder ? "MANUAL" : "SITE",
    status: "RECEBIDO",
    responsavel: isAdminOrder ? "Admin Global SC" : "",
    dataFormatada: formatOrderDate(now),
    criadoEm: now.toISOString(),
    anexos: attachments.map((attachment) => ({
      id: attachment.id,
      nome: attachment.file.name,
      tipo: attachment.type,
    })),
  };

  try {
    const currentData = window.localStorage.getItem(PEDIDOS_STORAGE_KEY);
    const currentOrders = currentData ? JSON.parse(currentData) : [];
    const orders = Array.isArray(currentOrders) ? currentOrders : [];

    window.localStorage.setItem(
      PEDIDOS_STORAGE_KEY,
      JSON.stringify([newOrder, ...orders]),
    );

    window.dispatchEvent(new Event(PEDIDOS_UPDATED_EVENT));
  } catch {
    throw new Error(
      "Não foi possível registrar o pedido neste navegador. Tente novamente.",
    );
  }

  return newOrder;
}

export default function PedidoPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [activeTab, setActiveTab] = useState<"arquivo" | "mensagem" | "foto">(
    "arquivo",
  );
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [cnpjFeedback, setCnpjFeedback] = useState("");
  const [cnpjFeedbackType, setCnpjFeedbackType] = useState<
    "neutral" | "success" | "error"
  >("neutral");
  const [isSearchingCnpj, setIsSearchingCnpj] = useState(false);
  const [lastFetchedCnpj, setLastFetchedCnpj] = useState("");
  const [isAdminOrder, setIsAdminOrder] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    setIsAdminOrder(parameters.get("origem") === "admin");
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleCnpjChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedCnpj = formatCnpj(event.target.value);
    const onlyNumbers = getOnlyNumbers(formattedCnpj);

    setFormData((current) => ({
      ...current,
      cnpj: formattedCnpj,
    }));

    setCnpjFeedback("");
    setCnpjFeedbackType("neutral");

    if (onlyNumbers.length === 14 && onlyNumbers !== lastFetchedCnpj) {
      void searchCnpjData(onlyNumbers);
    }
  }

  async function searchCnpjData(cnpjValue?: string) {
    const cleanCnpj = getOnlyNumbers(cnpjValue || formData.cnpj);

    if (cleanCnpj.length !== 14) {
      setCnpjFeedback("Digite um CNPJ válido com 14 números.");
      setCnpjFeedbackType("error");
      return;
    }

    try {
      setIsSearchingCnpj(true);
      setCnpjFeedback("Buscando dados do CNPJ...");
      setCnpjFeedbackType("neutral");

      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
      );

      if (!response.ok) {
        throw new Error("CNPJ não encontrado.");
      }

      const data = (await response.json()) as CnpjResponse;

      const cidadeUf = [data.municipio, data.uf].filter(Boolean).join(" - ");
      const telefoneApi = data.ddd_telefone_1 || data.ddd_telefone_2 || "";

      setFormData((current) => ({
        ...current,
        cnpj: formatCnpj(data.cnpj || cleanCnpj),
        nome: data.razao_social || current.nome,
        nomeFantasia: data.nome_fantasia || current.nomeFantasia,
        endereco: data.logradouro || current.endereco,
        numero: data.numero || current.numero,
        bairro: data.bairro || current.bairro,
        cep: data.cep ? formatCep(data.cep) : current.cep,
        cidade: cidadeUf || current.cidade,
        telefone: telefoneApi || current.telefone,
        email: data.email || current.email,
      }));

      setLastFetchedCnpj(cleanCnpj);
      setCnpjFeedback("Dados encontrados e preenchidos automaticamente.");
      setCnpjFeedbackType("success");
    } catch {
      setCnpjFeedback(
        "Não foi possível buscar este CNPJ. Confira o número ou preencha manualmente.",
      );
      setCnpjFeedbackType("error");
    } finally {
      setIsSearchingCnpj(false);
    }
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    const selectedFiles = Array.from(fileList);
    const maxSize = 20 * 1024 * 1024;
    const validAttachments: Attachment[] = [];
    let errorMessage = "";

    selectedFiles.forEach((file) => {
      const type = getAttachmentType(file);

      if (!type) {
        errorMessage = "Envie somente arquivos PDF, PNG ou JPG.";
        return;
      }

      if (file.size > maxSize) {
        errorMessage = "Cada arquivo pode ter no máximo 20 MB.";
        return;
      }

      validAttachments.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        type,
      });
    });

    if (errorMessage) {
      setFeedback(errorMessage);
    } else {
      setFeedback("");
    }

    setAttachments((current) => [...current, ...validAttachments]);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  function removeAttachment(id: string) {
    setAttachments((current) =>
      current.filter((attachment) => attachment.id !== id),
    );
  }

  function clearForm() {
    setFormData(initialFormData);
    setAttachments([]);
    setFeedback("");
    setCnpjFeedback("");
    setCnpjFeedbackType("neutral");
    setLastFetchedCnpj("");
    setActiveTab("arquivo");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.mensagem.trim() && attachments.length === 0) {
      setFeedback(
        "Escreva uma mensagem ou adicione ao menos um anexo para enviar o pedido.",
      );
      return;
    }

    try {
      saveOrderInAdminQueue(formData, attachments, isAdminOrder);
      setFeedback("");

      if (isAdminOrder) {
        window.location.href = "/admin/pedidos?enviado=1";
        return;
      }

      setShowSuccess(true);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o pedido. Tente novamente.",
      );
    }
  }

  return (
    <main className={styles.pedidoPage}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Image
            src="/global-sc-logo.png"
            alt="Global SC Fábricas e Importadora"
            width={350}
            height={190}
            priority
            className={styles.logo}
          />
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.sidebarIcon}>
            <FileIcon />
          </div>

          <h1>Enviar Pedido</h1>

          <p>
            Preencha os dados ao lado e envie seu pedido para nossa equipe.
          </p>
        </div>

        <a
          className={styles.supportBox}
          href="https://wa.me/554892070377?text=Olá!%20Estou%20com%20dúvidas%20para%20enviar%20meu%20pedido%20na%20Global%20SC."
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />

          <div>
            <strong>Dúvidas?</strong>
            <span>Fale com a equipe de atendimento.</span>
          </div>
        </a>

        <div className={styles.worldDecoration} aria-hidden="true" />
      </aside>

      <section className={styles.contentArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>
            <span>GLOBAL SC</span>
            <strong>Central de Pedidos</strong>
          </div>

          <a
            className={styles.homeButton}
            href={isAdminOrder ? "/admin/pedidos" : "/"}
          >
            <HomeIcon />
            {isAdminOrder ? "Voltar para Pedidos" : "Voltar à Página Inicial"}
          </a>
        </header>

        <div className={styles.formWrapper}>
          <form className={styles.orderCard} onSubmit={handleSubmit}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Adicionar Pedido</h2>
                <p>Preencha os dados abaixo e envie seu pedido.</p>
              </div>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>
                  CNPJ: <b>*</b>
                </span>

                <div className={styles.cnpjRow}>
                  <input
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleCnpjChange}
                    onBlur={() => void searchCnpjData()}
                    placeholder="00.000.000/0000-00"
                    required
                  />

                  <button
                    className={styles.cnpjButton}
                    type="button"
                    onClick={() => void searchCnpjData()}
                    disabled={isSearchingCnpj}
                  >
                    {isSearchingCnpj ? "Buscando..." : "Buscar"}
                  </button>
                </div>

                {cnpjFeedback && (
                  <small
                    className={`${styles.cnpjFeedback} ${
                      cnpjFeedbackType === "success"
                        ? styles.cnpjFeedbackSuccess
                        : cnpjFeedbackType === "error"
                          ? styles.cnpjFeedbackError
                          : ""
                    }`}
                  >
                    {cnpjFeedback}
                  </small>
                )}
              </label>

              <label className={styles.field}>
                <span>
                  NOME: <b>*</b>
                </span>

                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Razão social"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  NOME FANTASIA: <b>*</b>
                </span>

                <input
                  name="nomeFantasia"
                  value={formData.nomeFantasia}
                  onChange={handleChange}
                  placeholder="Nome fantasia"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>INSCRIÇÃO ESTADUAL:</span>

                <input
                  name="inscricaoEstadual"
                  value={formData.inscricaoEstadual}
                  onChange={handleChange}
                  placeholder="Digite a inscrição estadual"
                />
              </label>

              <label className={styles.field}>
                <span>
                  ENDEREÇO: <b>*</b>
                </span>

                <input
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Endereço"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  Nº: <b>*</b>
                </span>

                <input
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Número"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  BAIRRO: <b>*</b>
                </span>

                <input
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  CEP: <b>*</b>
                </span>

                <input
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  CIDADE: <b>*</b>
                </span>

                <input
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Cidade - UF"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  TELEFONE: <b>*</b>
                </span>

                <input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  E-MAIL: <b>*</b>
                </span>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  REPRESENTANTE: <b>*</b>
                </span>

                <input
                  name="representante"
                  value={formData.representante}
                  onChange={handleChange}
                  placeholder="Digite o nome do representante"
                  required
                />
              </label>
            </div>

            <section className={styles.attachSection}>
              <div className={styles.sectionDivider} />

              <div className={styles.attachHeader}>
                <h3>Anexar Pedido</h3>
                <p>Envie seu pedido com arquivos, mensagem ou foto.</p>
              </div>

              <div className={styles.attachTabs}>
                <button
                  className={`${styles.attachTab} ${
                    activeTab === "arquivo" ? styles.attachTabActive : ""
                  }`}
                  type="button"
                  onClick={() => setActiveTab("arquivo")}
                >
                  <FileIcon />
                  Enviar Arquivo
                </button>

                <button
                  className={`${styles.attachTab} ${
                    activeTab === "mensagem" ? styles.attachTabActive : ""
                  }`}
                  type="button"
                  onClick={() => setActiveTab("mensagem")}
                >
                  <MessageIcon />
                  Mensagem
                </button>

                <button
                  className={`${styles.attachTab} ${
                    activeTab === "foto" ? styles.attachTabActive : ""
                  }`}
                  type="button"
                  onClick={() => setActiveTab("foto")}
                >
                  <CameraIcon />
                  Tirar Foto
                </button>
              </div>

              {activeTab === "arquivo" && (
                <label className={styles.dropzone}>
                  <UploadIcon />

                  <strong>
                    Arraste e solte seu arquivo aqui ou clique para selecionar
                  </strong>

                  <span>Formatos aceitos: PDF, PNG, JPG (máx. 20MB)</span>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,image/png,image/jpeg"
                    multiple
                    onChange={handleFileInput}
                  />
                </label>
              )}

              {activeTab === "mensagem" && (
                <label className={styles.messageArea}>
                  <span>Mensagem do pedido</span>

                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Escreva detalhes do pedido, produtos, referências, quantidades, dúvidas ou observações."
                  />
                </label>
              )}

              {activeTab === "foto" && (
                <div className={styles.cameraArea}>
                  <CameraIcon />

                  <strong>Tire uma foto do pedido ou documento</strong>

                  <span>
                    Use a câmera do celular para enviar um pedido, anotação,
                    catálogo ou produto.
                  </span>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <CameraIcon />
                    Abrir Câmera
                  </button>

                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    capture="environment"
                    onChange={handleFileInput}
                  />
                </div>
              )}

              {attachments.length > 0 && (
                <div className={styles.attachmentList}>
                  {attachments.map((attachment) => (
                    <article
                      className={styles.attachmentItem}
                      key={attachment.id}
                    >
                      <span
                        className={`${styles.fileType} ${
                          attachment.type === "PDF"
                            ? styles.pdf
                            : attachment.type === "PNG"
                              ? styles.png
                              : styles.jpg
                        }`}
                      >
                        {attachment.type}
                      </span>

                      <span className={styles.fileName}>
                        {attachment.file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        aria-label={`Remover ${attachment.file.name}`}
                      >
                        <CloseIcon />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {feedback && (
              <p className={styles.feedback} role="status">
                {feedback}
              </p>
            )}

            <div className={styles.cardFooter}>
              <div className={styles.securityText}>
                <LockIcon />
                <span>Seu pedido será enviado com segurança.</span>
              </div>

              <div className={styles.actionButtons}>
                <button
                  className={styles.clearButton}
                  type="button"
                  onClick={clearForm}
                >
                  Limpar
                </button>

                <button className={styles.submitButton} type="submit">
                  <SendIcon />
                  Enviar Pedido
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {showSuccess && !isAdminOrder && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <section className={styles.successModal}>
            <div className={styles.successIcon}>
              <CheckIcon />
            </div>

            <h2>Pedido enviado com sucesso!</h2>

            <p>
              Seu pedido foi recebido e será analisado pela nossa equipe. Em
              breve entraremos em contato.
            </p>

            <button type="button" onClick={() => setShowSuccess(false)}>
              OK
            </button>
          </section>
        </div>
      )}
    </main>
  );
}