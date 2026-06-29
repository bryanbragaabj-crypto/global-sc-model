import { ImageResponse } from "next/og";

export const alt =
  "Global SC Alto Atacado - Catálogos de fábricas e importadoras";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/*
  Miniatura exclusiva para WhatsApp e redes sociais.
  O Next.js publica automaticamente esta imagem em:
  /opengraph-image
*/
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#090909",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-220px",
            right: "-140px",
            width: "720px",
            height: "720px",
            display: "flex",
            borderRadius: "50%",
            backgroundColor: "#b9923e",
            opacity: 0.16,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-290px",
            left: "-180px",
            width: "620px",
            height: "620px",
            display: "flex",
            borderRadius: "50%",
            backgroundColor: "#b9923e",
            opacity: 0.12,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 82px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#d2ad58",
                marginRight: "16px",
              }}
            />

            <div
              style={{
                display: "flex",
                fontSize: "26px",
                letterSpacing: "5px",
                color: "#e4c477",
                fontWeight: 700,
              }}
            >
              GLOBAL SC
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: "70px",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-2px",
              }}
            >
              ALTO ATACADO
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "24px",
                fontSize: "31px",
                lineHeight: 1.2,
                color: "#e3e3e3",
                fontWeight: 500,
              }}
            >
              Catálogos de fábricas e importadoras
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "15px",
                fontSize: "25px",
                color: "#d2ad58",
                fontWeight: 700,
              }}
            >
              Plataforma B2B para lojistas
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "21px",
              color: "#e2e2e2",
              letterSpacing: "1px",
            }}
          >
            CONSULTE OS CATÁLOGOS • ENVIE SEU PEDIDO • ATENDIMENTO HUMANO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
