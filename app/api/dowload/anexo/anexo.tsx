type DownloadAnexoButtonProps = {
  caminho: string;
  nome: string;
  className?: string;
  texto?: string;
};

export default function DownloadAnexoButton({
  caminho,
  nome,
  className,
  texto = "Baixar anexo",
}: DownloadAnexoButtonProps) {
  const href =
    `/api/pedidos/anexos/download?caminho=${encodeURIComponent(
      caminho,
    )}&nome=${encodeURIComponent(nome)}`;

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {texto}
    </a>
  );
}
