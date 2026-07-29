import type { Metadata } from "next";
import Link from "next/link";
import styles from "./solucoes-digitais.module.css";

export const metadata: Metadata = {
  title: "Global SC | Soluções Digitais",
  description:
    "Implantação de catálogos digitais inteligentes empresariais B2B e B2C.",
};

const planos = [
  {
    numero: "01",
    nome: "Plano 1 | Base Inicial",
    chamada: "Página Home + Domínio + PedidoOK Orientado.",
    descricao:
      "Modelo simples para empresas que desejam iniciar com uma estrutura digital pronta para personalização.",
    itens: [
      "Página Home institucional",
      "Domínio próprio",
      "Visão, missão, valores, categorias e dados institucionais",
      "Edições realizadas pelo contratante",
      "Abertura da loja online PedidoOK",
      "Orientação para cadastro de produtos",
    ],
    entrega:
      "Entregamos a base da plataforma e orientamos o contratante para realizar os cadastros e ajustes dentro do ecossistema PedidoOK.",
    parcelas: "10x de R$ 138,00",
    vista: "ou R$ 1.200,00 à vista",
    manutencao:
      "Manutenção vitalícia: R$ 190,00/mês para B2C ou R$ 250,00/mês para B2B.",
  },
  {
    numero: "02",
    nome: "Plano 2 | Implantação Profissional",
    chamada: "Home + Domínio + até 1.000 Produtos com 1 Imagem.",
    descricao:
      "Modelo ideal para empresas que querem receber a plataforma operacional configurada pela equipe Global SC.",
    itens: [
      "Página Home e páginas complementares",
      "Edições realizadas pela equipe Global SC",
      "Cadastramento de categorias",
      "Cadastro de até 1.000 produtos disponibilizados em até 30 dias",
      "1 imagem por produto",
      "Assistência técnica geral da Home e PedidoOK",
      "Entrega em até 30 dias após fechamento do contrato",
    ],
    entrega:
      "Entregamos a plataforma operacional com suas principais funções ativadas e produtos cadastrados conforme informações fornecidas pelo contratante.",
    parcelas: "10x de R$ 574,00",
    vista: "ou R$ 4.990,00 à vista",
    manutencao:
      "Manutenção vitalícia: R$ 190,00/mês para B2C ou R$ 250,00/mês para B2B.",
  },
  {
    numero: "03",
    nome: "Plano 3 | Catálogo Completo Premium",
    chamada: "Home + Domínio + até 1.000 Produtos com 5 Imagens e Vídeo.",
    descricao:
      "Modelo completo para empresas que desejam um catálogo mais profissional, visual e comercial.",
    itens: [
      "Página Home e páginas complementares",
      "Edições realizadas pela equipe Global SC",
      "Cadastramento de categorias",
      "Cadastro de até 1.000 produtos disponibilizados em até 30 dias",
      "5 imagens + 1 vídeo por produto",
      "Orientação e assistência técnica geral",
      "Entrega em até 30 dias após fechamento do contrato",
    ],
    entrega:
      "Entregamos uma plataforma operacional completa, com apresentação visual mais robusta para cada produto cadastrado.",
    parcelas: "10x de R$ 1.149,00",
    vista: "ou R$ 9.990,00 à vista",
    manutencao:
      "Manutenção vitalícia: R$ 190,00/mês para B2C ou R$ 250,00/mês para B2B.",
  },
];

const whatsapp =
  "https://wa.me/5548920703577?text=Olá!%20Gostaria%20de%20receber%20uma%20proposta%20de%20Soluções%20Digitais.";

export default function SolucoesDigitaisPage() {
  return (
    <main className={styles.page}>
      <Link className={styles.backButton} href="/">
        ← Voltar para Global SC
      </Link>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          Global SC | Soluções Comerciais Digitais
        </p>
        <h1>Catálogo Digital Inteligente Empresarial</h1>
        <p className={styles.heroText}>
          Ecossistema de plataforma comercial digital inteligente que reúne
          catálogo online, controle de estoque em tempo real, gestão de pedidos,
          vendas B2B e B2C, site institucional e domínio próprio.
        </p>
        <a className={styles.primaryButton} href="#propostas">
          Ver propostas de Orçamento
        </a>
      </section>

      <section className={styles.intro}>
        <h2>Solução completa para empresas que querem vender mais.</h2>
        <p>
          Desenvolvemos uma estrutura digital para organizar produtos, facilitar
          pedidos, fortalecer a presença online da empresa e profissionalizar o
          atendimento comercial. A solução pode ser aplicada para Fabricantes,
          Importadoras, Distribuidoras, Atacadistas, Representantes e Empresas
          que desejam vender de forma mais organizada.
        </p>
      </section>

      <section className={styles.plansSection} id="propostas">
        <div className={styles.sectionHeading}>
          <span>Propostas</span>
          <h2>Portfólio de Orçamento</h2>
        </div>

        <div className={styles.plansGrid}>
          {planos.map((plano) => (
            <article className={styles.planCard} key={plano.numero}>
              <div className={styles.planNumber}>{plano.numero}</div>
              <h3>{plano.nome}</h3>
              <h4>{plano.chamada}</h4>
              <p>{plano.descricao}</p>
              <ul>
                {plano.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.delivery}>{plano.entrega}</p>
              <div className={styles.price}>
                <strong>{plano.parcelas}</strong>
                <span>{plano.vista}</span>
              </div>
              <p className={styles.maintenance}>{plano.manutencao}</p>
              <a
                className={styles.planButton}
                href={`${whatsapp}%20Tenho%20interesse%20no%20${encodeURIComponent(plano.nome)}.`}
                target="_blank"
                rel="noreferrer"
              >
                Contratar Plano
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.comparison}>
        <h2>Compare os planos</h2>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Plano</th>
                <th>Indicado para</th>
                <th>Investimento</th>
                <th>Manutenção</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plano 1</td>
                <td>
                  Empresa que quer começar com a base pronta e cadastrar por
                  conta própria.
                </td>
                <td>10x R$ 138,00 ou R$ 1.200,00 à vista</td>
                <td>R$ 190 B2C / R$ 250 B2B</td>
              </tr>
              <tr>
                <td>Plano 2</td>
                <td>
                  Empresa que quer a estrutura pronta com até 1.000 produtos
                  cadastrados.
                </td>
                <td>10x R$ 574,00 ou R$ 4.990,00 à vista</td>
                <td>R$ 190 B2C / R$ 250 B2B</td>
              </tr>
              <tr>
                <td>Plano 3</td>
                <td>
                  Empresa que quer catálogo completo com fotos, vídeo e
                  apresentação premium.
                </td>
                <td>10x R$ 1.149,00 ou R$ 9.990,00 à vista</td>
                <td>R$ 190 B2C / R$ 250 B2B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.addons}>
        <div>
          <h2>Adicionais de Orçamento</h2>
          <h3>Shopify ou Nuvemshop</h3>
          <p>
            Para implantação em plataformas com base estrutural em Shopify ou
            Nuvemshop, haverá acréscimo de R$ 500,00 para o Plano 1 e R$
            1.000,00 para os Planos 2 e 3.
          </p>
          <p>
            A manutenção vitalícia poderá ser ajustada conforme as exigências e
            custos de cada plataforma.
          </p>
        </div>
        <div>
          <h2>Itens adicionais após 1.000 produtos</h2>
          <p>
            Acima de 1.000 itens ou após o prazo limite de 30 dias para envio
            dos materiais, será cobrado valor adicional por produto cadastrado.
          </p>
          <p>
            <strong>Plano 1 e Plano 2:</strong> R$ 6,00 por item com 1 foto e
            informações gerais.
          </p>
          <p>
            <strong>Plano 3:</strong> R$ 11,50 por item com 5 fotos, 1 vídeo e
            informações gerais.
          </p>
        </div>
      </section>

      <section className={styles.notes}>
        <h2>Observações importantes</h2>
        <p>
          Os prazos de entrega dependem do envio correto das informações,
          imagens, vídeos, descrições, códigos, preços e demais dados necessários
          dentro do prazo limite de 30 dias. O contratante é responsável pela
          veracidade das informações comerciais, fiscais, institucionais e de
          produtos fornecidas para implantação.
        </p>
        <h3>Funcionalidades Opcionais e Serviços Adicionais</h3>
        <div className={styles.notesColumns}>
          <p>
            Os valores contemplam exclusivamente os recursos descritos.
            Funcionalidades, integrações, licenças, usuários adicionais e
            serviços não especificados poderão ser contratados mediante
            orçamento complementar.
          </p>
          <ul>
            <li>Emissão e integração com Nota Fiscal Eletrônica</li>
            <li>Integrações com ERPs, marketplaces e sistemas de terceiros</li>
            <li>Aplicativos, módulos e extensões adicionais</li>
            <li>Usuários, vendedores e representantes adicionais</li>
            <li>Domínios, hospedagens e serviços de terceiros</li>
            <li>Personalizações e novas funcionalidades</li>
          </ul>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Pronto para profissionalizar sua operação comercial?</h2>
        <a
          className={styles.primaryButton}
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          Solicitar Orçamento
        </a>
      </section>

      <footer className={styles.footer}>
        <strong>
          Global SC — Implantação de Catálogos Digitais Inteligentes
          Empresariais
        </strong>
        <span>
          Catálogo online • PedidoOK • B2B • B2C • Domínio próprio • Presença
          digital
        </span>
      </footer>
    </main>
  );
}
