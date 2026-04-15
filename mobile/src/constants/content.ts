import { bannerAssets, iconAssets } from "../services/assets";

export const promoMessages = [
  "Frete Grátis para Compras Acima de R$ 299,00",
  "10% OFF na sua primeira compra",
  "5% OFF no pagamento via Pix",
];

export const benefitsBar = [
  { title: "Frete Grátis", subtitle: "Acima de R$ 299", icon: iconAssets.benefitFrete },
  { title: "5% OFF", subtitle: "Pagamento via Pix", icon: iconAssets.benefitPix },
  { title: "10% OFF", subtitle: "Primeira Compra", icon: iconAssets.benefitPrimeiraCompra },
  { title: "10x sem juros", subtitle: "Em todos os cartões", icon: iconAssets.benefitParcelamento },
];

export const collectionBanners = [
  bannerAssets.collection1,
  bannerAssets.collection2,
  bannerAssets.collection3,
  bannerAssets.collection4,
  bannerAssets.collection5,
];

export const testimonials = [
  {
    author: "Maria Silva",
    city: "São Paulo, SP",
    text: "Qualidade excepcional! Os sapatos são lindos e super confortáveis. Virei cliente fiel.",
  },
  {
    author: "Ana Costa",
    city: "Rio de Janeiro, RJ",
    text: "Adorei o atendimento e a entrega super rápida. Os produtos são exatamente como nas fotos.",
  },
  {
    author: "Juliana Mendes",
    city: "Belo Horizonte, MG",
    text: "Já comprei 3 pares e pretendo comprar mais. O melhor custo-benefício que encontrei!",
  },
];

export const faqItems = [
  {
    question: "Como eu crio uma conta no site?",
    answer: 'Para criar uma conta, clique em "Cadastrar", preencha seus dados básicos e confirme o e-mail enviado para ativação da conta.',
  },
  {
    question: "Esqueci minha senha — como recupero o acesso?",
    answer: 'Use a opção "Esqueci a senha" na tela de login; você receberá um e-mail com instruções para redefinição em poucos minutos.',
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartões de crédito, boleto bancário e PIX. A disponibilidade pode variar conforme a sua região.",
  },
  {
    question: "Qual o prazo de entrega dos produtos?",
    answer: "O prazo estimado aparece na finalização da compra e varia conforme o frete escolhido e o CEP de destino.",
  },
  {
    question: "Posso devolver ou trocar um produto?",
    answer: "Sim — trocas e devoluções são realizadas dentro do prazo legal mediante produto intacto; entre em contato com nosso suporte para iniciar o processo.",
  },
  {
    question: "Como acompanho o status do meu pedido?",
    answer: "Você pode acompanhar pelo link de rastreamento enviado por e-mail ou acessando sua área de pedidos ao fazer login.",
  },
];

export const newsletterBenefits = [
  { badge: "10%", title: "Desconto na Primeira Compra", text: "Ganhe 10% de desconto imediato ao se cadastrar em nossa newsletter." },
  { badge: "PRESENTE", title: "Ofertas Exclusivas", text: "Receba em primeira mão promoções e lançamentos antes de todo mundo." },
  { badge: "FRETE", title: "Frete Grátis", text: "Aproveite frete grátis em compras acima de R$ 299 e receba em casa." },
  { badge: "CASH", title: "Programa de Cashback", text: "Acumule pontos a cada compra e troque por descontos futuros." },
];

export const sizeGuideRows = [
  ["34", "5", "35", "22.0"],
  ["35", "6", "36", "22.5"],
  ["36", "7", "37", "23.0"],
  ["37", "8", "38", "23.5"],
  ["38", "9", "39", "24.0"],
  ["39", "10", "40", "24.5"],
  ["40", "11", "41", "25.0"],
  ["41", "12", "42", "25.5"],
  ["42", "13", "43", "30.0"],
];

export const sizeGuideTips = [
  "Meça seus pés no final do dia quando estão levemente inchados",
  "Use as meias que você pretende usar com os sapatos",
  "Meça ambos os pés e use a medida do pé maior",
  "Em caso de dúvida, escolha o tamanho maior",
];

export const registerBenefits = [
  "10% OFF na primeira compra",
  "Acesso a promoções exclusivas",
  "Acompanhe seus pedidos em tempo real",
  "Lista de favoritos personalizada",
];

export const loginBenefits = [
  "Checkout rápido e seguro",
  "Rastreamento de pedidos",
  "Histórico de compras",
];
