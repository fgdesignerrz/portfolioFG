/* ============================================================
   FG DESIGNS — dados do site (fonte única de conteúdo)
   Plain JS (sem Babel) para carregar de forma síncrona e robusta.
   ============================================================ */
window.FG_DATA = {
  profile: {
    name: 'Kauê Felix Garzaro',
    alias: 'FG Designs',
    role: 'Designer gráfico & web · freelancer',
    location: 'Curitiba · PR · Brasil',
    photo: 'assets/kaue-portrait.jpg',
    experience: '3+ anos em produção · 200+ projetos entregues',
  },

  contact: {
    whatsappLabel: '+55 41 99591-7905',
    whatsappUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Vi seu site e queria conversar sobre um projeto.'),
    whatsappQuoteUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Quero um orçamento de peça gráfica.'),
    email: 'fgdesignerrz@gmail.com',
    instagramLabel: '@fgdesigns._',
    instagramUrl: 'https://www.instagram.com/fgdesigns._',
  },

  nav: [
    { id: 'inicio',    label: 'Início' },
    { id: 'servicos',  label: 'Serviços' },
    { id: 'trabalhos', label: 'Trabalhos' },
    { id: 'sites',     label: 'No ar' },
    { id: 'precos',    label: 'Preços' },
    { id: 'sobre',     label: 'Sobre' },
    { id: 'processo',  label: 'Processo' },
  ],

  stats: [
    { value: '200+',  label: 'Projetos entregues', accent: 'var(--accent)' },
    { value: '3+',    label: 'Anos em produção',   accent: 'var(--text-strong)' },
    { value: '24h',   label: 'Pra te responder',   accent: 'var(--premium)' },
  ],

  services: [
    { icon: 'MonitorSmartphone', tone: 'var(--accent)',  title: 'Landing pages & web', desc: 'Páginas que respiram e convertem — copy, design e código, do conceito ao deploy.' },
    { icon: 'PenTool',           tone: 'var(--aurora)',  title: 'UX/UI & interfaces',  desc: 'Fluxos, protótipos e telas de produto pensados no detalhe, com carinho de vibe coding.' },
    { icon: 'Image',             tone: 'var(--premium)', title: 'Tratamento de imagem', desc: 'Retoque, recorte e ajuste de cor com qualidade de impressão — sem susto na hora de imprimir.' },
    { icon: 'Printer',           tone: 'var(--fg-danger)', title: 'Consultoria de produção', desc: 'Para empresas de comunicação visual: cor, sangria, encaixe, registro e CMYK.' },
  ],

  liveSites: [
    { name: 'GRIFFT Gráficos', title: 'GRIFFT', url: 'https://fgdesignerrz.github.io/grifft/',   role: 'Loja / catálogo de gráficos de motocross', tags: ['Web', 'Loja', 'Motocross'], g: 'radial-gradient(120% 120% at 20% 0%, #2C1A3A, #0A0A14)', tone: 'var(--accent)' },
    { name: 'BF Studio',       title: 'BF STUDIO', url: 'https://fgdesignerrz.github.io/StudioBF/', role: 'Estúdio / portfólio', tags: ['Web', 'Studio', 'Portfólio'], g: 'radial-gradient(120% 120% at 80% 0%, #102A3A, #0A0A14)', tone: 'var(--aurora)' },
    { name: 'KAC',             title: 'KAC', url: 'https://fgdesignerrz.github.io/KAC/', role: 'Vitrine de roupa', tags: ['Web', 'Loja', 'Moda'], g: 'radial-gradient(120% 120% at 50% 0%, #3A2E10, #0A0A14)', tone: 'var(--premium)' },
  ],

  /* Cada projeto abre uma tela de detalhe (gallery = imagens grandes + legenda) */
  works: [
    {
      slug: 'ktm-petrosol',
      title: 'KTM SX-F #19 — Rede Petrosol',
      type: 'Kit gráfico de motocross',
      image: 'assets/ktm-milani-19-graphic.jpg',
      specs: ['GRÁFICO BRILHANTE', 'CMYK', 'VINIL'],
      featured: true,
      desc: 'Kit gráfico criado sob medida pra KTM 350 SX-F #19, com patrocínio da Rede Petrosol — número, logos e cores pensados peça por peça pra carenagem da moto. Impresso em vinil brilhante com arte final conferida: cor calibrada, sangria e registro no lugar.',
      gallery: [
        { src: 'assets/ktm-milani-19-graphic.jpg',    cap: 'Layout do kit gráfico' },
        { src: 'assets/ktm-milani-19-bike-photo.jpg', cap: 'Aplicado na moto' },
      ],
    },
    {
      slug: 'bananalama-2026',
      title: 'Bananalama 2026 — MXF',
      type: 'Adesivo do evento',
      image: 'assets/bananalama-adesivo.jpg',
      specs: ['ADESIVO', 'RECORTE', 'SÉRIE'],
      featured: false,
      desc: 'Adesivo comemorativo do Bananalama 2026, da MXF — piloto, bananas e as datas do evento numa composição só. Arte fechada com faca de recorte contornando o desenho e rodada em série na plotter, pronta pra distribuir na trilha.',
      gallery: [
        { src: 'assets/bananalama-adesivo.jpg',  cap: 'Layout do adesivo' },
        { src: 'assets/bananalama-impresso.jpg', cap: 'Saindo da impressora, em série' },
      ],
    },
    {
      slug: 'honda-939-militao',
      title: 'Honda CRF #939 — Militão',
      type: 'Adesivo ilustrado (vetor)',
      image: 'assets/honda-939-militao-sticker.jpg',
      specs: ['ILUSTRAÇÃO', 'RECORTE'],
      featured: false,
      desc: 'Boneco criado exclusivamente pro Militão — pensado na moto, no nome e nas cores da CRF #939. Ilustração vetorial do capacete ao pneu, fechada com faca de recorte pra virar adesivo com acabamento limpo.',
      gallery: [
        { src: 'assets/honda-939-militao-sticker.jpg', cap: 'Ilustração vetorial exclusiva' },
      ],
    },
    {
      slug: 'gasgas-86-gael',
      title: 'GasGas #86 — Gael Rodrigues',
      type: 'Adesivo ilustrado (vetor)',
      image: 'assets/gasgas-gael-86-sticker.jpg',
      specs: ['ILUSTRAÇÃO', 'RECORTE'],
      featured: false,
      desc: 'Boneco exclusivo do Gael Rodrigues: a GasGas #86 ilustrada em vetor, com as cores oficiais da moto e o número em destaque. Cada detalhe desenhado pra funcionar em adesivo — de longe e de perto.',
      gallery: [
        { src: 'assets/gasgas-gael-86-sticker.jpg', cap: 'Ilustração vetorial exclusiva' },
      ],
    },
    {
      slug: 'mauriti-832',
      title: 'Mauriti Jr. #832 — cartela',
      type: 'Cartela de adesivos',
      image: 'assets/mauriti-jr-832-patches.jpg',
      specs: ['2–11cm', 'CARTELA', 'RECORTE'],
      featured: false,
      desc: 'Cartela de adesivos do Mauriti Jr. #832 com peças de 2 a 11 cm — logos, números e mascote organizados pra aproveitar o material ao máximo e facilitar a aplicação, tudo com faca de recorte individual.',
      gallery: [
        { src: 'assets/mauriti-jr-832-patches.jpg', cap: 'Cartela completa, peças de 2 a 11 cm' },
      ],
    },
    {
      slug: 'arte-final-corel',
      title: 'Adesivos — vinil & perfurado',
      type: 'Arte final · CorelDraw',
      image: 'assets/workspace-ktm-molde.png',
      specs: ['VINIL', 'PERFURADO', 'CMYK'],
      featured: false,
      desc: 'Bastidor da arte final no CorelDraw: moldes, facas e encaixes prontos pra impressão em vinil e perfurado. É aqui que a cor é calibrada e o registro conferido antes de rodar — a parte que a gráfica agradece.',
      gallery: [
        { src: 'assets/workspace-ktm-molde.png', cap: 'Arte final aberta no CorelDraw' },
      ],
    },
  ],

  testimonials: [
    { quote: 'Amei o site, ficou perfeito!',                    author: 'Studio BF', tag: 'Site no ar' },
    { quote: 'Ficou fera, combinou totalmente com a empresa.',  author: 'GRIFFT',    tag: 'Loja no ar' },
    { quote: 'O gráfico ficou animal!',                         author: 'Foguinho',  tag: 'Kit gráfico' },
    { quote: 'Ótimo acabamento nos bonecos, fera demais.',      author: 'Dudu',      tag: 'Adesivos ilustrados' },
  ],

  pricing: {
    kicker: 'Preços',
    title: 'Quanto custa lançar sua página.',
    sub: 'Valores de referência pra landing pages — o número final depende do escopo, fechado junto com você antes de começar.',
    plans: [
      {
        name: 'Starter',
        price: 'R$ 690–900',
        tagline: 'Pra colocar sua presença no ar, sem enrolação.',
        features: ['1 página · até 5 seções', 'Layout limpo com componentes prontos', 'Você manda os textos (sem copy)', 'Publicação no ar inclusa'],
        featured: false,
      },
      {
        name: 'Premium',
        price: 'R$ 990–1.500',
        tagline: 'Design do zero, com a cara da sua marca.',
        features: ['Design próprio, feito pra sua marca', 'Animações e microinterações', 'Responsivo — perfeito em qualquer tela', '1 página · seções sob medida', 'Publicação + ajustes finos'],
        featured: true,
      },
    ],
    graphic: {
      title: 'Peças gráficas — sob orçamento',
      desc: 'Kits, adesivos, bonecos e artes em geral variam com tamanho, quantidade e se já existe arte pronta. Me chama no WhatsApp que eu te passo o valor certinho.',
    },
    note: 'Meu foco hoje é criação de landing pages — páginas feitas pra apresentar bem o seu negócio e gerar leads qualificados (os exemplos estão na seção “No ar”). Sites mais complexos, com sistema de pagamento, login ou área de cliente, eu ainda não faço, por envolverem outra camada de complexidade.',
  },

  specs: ['CMYK 0/12/40/4', 'SANGRIA 3mm', '300 DPI', 'REGISTRO ✓', 'PANTONE 871C', 'OVERPRINT', 'FACA / VINCO', 'ICC PROFILE'],

  process: [
    { n: '01', t: 'Briefing',  d: 'Entendo objetivo, público e referências. Sem enrolação.' },
    { n: '02', t: 'Design',    d: 'Conceito, protótipo e iteração junto com você.' },
    { n: '03', t: 'Build',     d: 'Código limpo ou arte final pronta pra máquina.' },
    { n: '04', t: 'Entrega',   d: 'Deploy, arquivos e prova de gráfica conferida.' },
  ],

  about: {
    kicker: 'Quem faz',
    heading: 'O FG é o meu sobrenome — e o meu jeito de fazer.',
    body: [
      'Sou o Kauê, de Curitiba. O FG vem de Felix Garzaro. Trabalho sozinho, do começo ao fim: eu desenho, eu codifico e eu preparo a arte pra gráfica.',
      'Vim da produção gráfica — anos ajustando cor, sangria e registro — e hoje o foco cresce pro digital: landing pages, interfaces e vibe coding. Gosto da vastidão da galáxia: interfaces que parecem ilimitadas.',
    ],
    tags: ['Curitiba · PR', 'Freelancer', 'Web + Impressão'],
  },
};
