/**
 * Default (fallback) content when API is unavailable or field is missing.
 * Keys: page_slug -> section_key -> field_key -> value.
 */
export type DefaultsMap = Record<string, Record<string, Record<string, string>>>;

const defaults: DefaultsMap = {
  header: {
    nav: {
      about: "Sobre Nós",
      products: "Produtos",
      contact: "Contactos",
      items: JSON.stringify([
        { label: "Sobre Nós", url: "/about" },
        { label: "Produtos", url: "/products" },
        { label: "Contactos", url: "/contact" },
      ]),
    },
    logo: { desktop: "/logo.svg", mobile: "/logo-mobile.svg" },
    mobile: {
      nav_home: "Início",
      nav_about: "Sobre Nós",
      nav_products: "Produtos",
      nav_contact: "Contactos",
      categories_title: "Categorias de produtos",
      categories: JSON.stringify([
        { title: "Arames", slug: "arames", description: "Rebabado, farpado, liso, malha metálica e mais." },
        { title: "Portões", slug: "portoes", description: "Automáticos, manuais, industriais e residenciais." },
        { title: "Grades & Vedações", slug: "grades", description: "Soluções completas para segurança e delimitação." },
        { title: "Correntes", slug: "correntes", description: "Transmissão, elevação e proteção em vários formatos." },
      ]),
    },
  },
  footer: {
    cta: {
      title: "Vamos Conversar",
      description: "Conte-nos o que precisa: estudamos a melhor solução de vedação, portão ou estrutura metálica para o seu espaço, em qualquer ponto de Portugal.",
      button: "Falar com a equipa",
      button_url: "/contact",
    },
    company: {
      name: "Frebrico",
      description: "Especialistas em arames, redes de vedação, portões e estruturas metálicas para habitação, indústria e agricultura, com acompanhamento técnico em todo o país.",
    },
    social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
    links_loja: {
      title: "Loja",
      items: JSON.stringify([
        { label: "Entrar", url: "/login" },
        { label: "Criar conta", url: "/register" },
        { label: "Postes", url: "#" },
        { label: "Painéis de Vedação", url: "#" },
      ]),
    },
    links_empresa: {
      title: "Empresa",
      items: JSON.stringify([
        { label: "Início", url: "/" },
        { label: "Sobre Nós", url: "/about" },
        { label: "Produtos", url: "/products" },
        { label: "Serviços", url: "#" },
        { label: "Contactos", url: "/contact" },
      ]),
    },
    links_legais: {
      title: "Links Legais",
      items: JSON.stringify([
        { label: "Política de Privacidade", url: "#" },
        { label: "Termos e Condições", url: "#" },
        { label: "Livro de Reclamações", url: "#" },
      ]),
    },
    bottom: { copyright: "© Frebrico. Todos os direitos reservados.", back_to_top: "Voltar ao topo" },
  },
  home: {
    seo: {
      title: "Vedações, portões e bricolage",
      description: "Na Frebrico encontra soluções completas em vedações, portões, arames e bricolage, com produtos de alta qualidade e apoio técnico especializado em Portugal.",
    },
    hero: {
      title: "VEDAÇÕES",
      title2: "BRICOLAGE",
      subtitle: "vedações, bricolage e construção",
      description: "Produtos de confiança. Apoio técnico. Resultados duradouros.",
      link_text: "Explorar produtos",
      link_url: "/products",
    },
    features: {
      title: "Cada espaço tem desafios diferentes.",
      description: "Na Frebrico desenvolvemos soluções completas em vedações e bricolage, adaptadas ao tipo de espaço, nível de segurança, durabilidade e estética que pretende.",
      overlay_title: "Construídas para durar.",
      overlay_description: "Soluções específicas para habitação, agricultura, indústria e espaços profissionais, com instalação e acompanhamento técnico em todo o país.",
      button: "Saber mais sobre serviços",
      button_mobile: "Saber mais",
      button_url: "/contact",
      image_alt: "Soluções de vedação e estruturas metálicas para habitação, agricultura e indústria",
    },
    carousel: {
      title: "Produtos pensados e preparados para si",
      products: JSON.stringify([
        { name: "Armatek", price: "5.85", badge: "Destaque 🔥" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
        { name: "Armatek", price: "5.85" },
      ]),
    },
    faq: {
      badge: "FAQs",
      title: "Perguntas\nFrequentes",
      card_title: "Ainda tem dúvidas?",
      card_description: "Estamos aqui para ajudar. Consulte as perguntas mais frequentes sobre os nossos produtos e serviços de vedações, portões e bricolage, ou contacte-nos diretamente.",
      button: "Contactos",
      button_url: "/contact",
      items: JSON.stringify([
        { question: "Que tipo de produtos a Frebrico comercializa?", answer: "A Frebrico é especializada em bricolage, ferragens e soluções de vedação. A nossa oferta inclui vedações residenciais, agrícolas e industriais, redes metálicas, painéis soldados, postes, portões, fixações e materiais de apoio à construção." },
        { question: "Prestam serviços de montagem de vedações?", answer: "Sim. Prestamos serviços completos de montagem e instalação de vedações. A nossa equipa técnica especializada garante uma instalação profissional e duradoura." },
        { question: "Posso pedir apoio técnico antes de comprar?", answer: "Claro. A nossa equipa de apoio técnico está disponível para esclarecer dúvidas e ajudá-lo a escolher a solução mais adequada às suas necessidades." },
        { question: "A Frebrico tem stock permanente?", answer: "Sim. Mantemos stock permanente dos nossos produtos principais. Para artigos específicos, podemos encomendar com prazos de entrega rápidos." },
      ]),
    },
  },
  products: {
    seo: { title: "Produtos de vedação, portões e arames", description: "Gama completa de produtos de vedação, portões, arames e soluções para construção e bricolage. Frebrico, em Portugal." },
    hero: {
      badge: "Produtos e Serviços",
      title: "Pensados para desempenho real",
      description: "Produtos desenvolvidos para garantir durabilidade, segurança e fiabilidade em qualquer contexto.",
      cta_primary: "Explorar produtos",
      cta_primary_url: "/products",
      cta_secondary: "Apoio Técnico",
      cta_secondary_url: "/contact",
      categories: JSON.stringify([{ name: "Arames", slug: "arames" }, { name: "Vedações", slug: "vedacoes" }, { name: "Correntes", slug: "correntes" }]),
    },
    services: {
      badge: "Serviços",
      title: "Soluções que vão além do produto",
      description: "Serviços especializados que complementam a nossa gama de produtos: apoio técnico, orçamentos à medida e execução profissional, para que cada projeto seja realizado com segurança, eficiência e durabilidade.",
      items: JSON.stringify([
        { number: "01", title: "Apoio técnico", description: "Aconselhamento para escolher os produtos mais adequados a cada aplicação, com foco em segurança e durabilidade." },
        { number: "02", title: "Orçamentos à medida", description: "Propostas claras e personalizadas, ajustadas às necessidades reais de cada projeto, sem compromisso." },
        { number: "03", title: "Execução e montagem", description: "Montagem dos nossos produtos através de parceiros especializados, com resultados profissionais e duradouros." },
      ]),
      button: "Contactos",
      button_url: "/contact",
    },
    grid: { products: JSON.stringify(Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: "Armatek", price: 5.85, featured: i === 0 }))) },
  },
  cart: {
    seo: { title: "Carrinho", description: "Revise os produtos no carrinho e conclua a sua compra na Frebrico com segurança." },
    header: { back_link: "Voltar à loja", back_link_url: "/", title: "Finalizar compra" },
    summary: { title: "Resumo do pedido", discount_placeholder: "Código de desconto", apply_button: "Aplicar", subtotal_label: "Subtotal", total_label: "Total", currency: "EUR", remove_button: "Remover" },
    checkout: {
      contact_title: "Contacto",
      login_link: "Já tem conta? Entrar",
      login_link_url: "/login",
      newsletter_label: "Quero receber novidades e ofertas por e-mail",
      address_title: "Morada de envio",
      placeholders: JSON.stringify({ email: "E-mail", nome: "Nome", apelido: "Apelido", morada: "Morada", apartamento: "Apartamento, andar, etc. (opcional)", codigo_postal: "Código postal", cidade: "Localidade", pais: "País", telemovel: "Telemóvel" }),
      countries: JSON.stringify(["Portugal", "Espanha", "França"]),
      submit_button: "Concluir pedido",
      continue_shopping: "Continuar a comprar",
      continue_shopping_url: "/products",
    },
  },
  contact: {
    seo: { title: "Contacto", description: "Contacte a equipa Frebrico para pedidos, orçamentos e apoio técnico em vedações, portões, arames e bricolage em Portugal." },
    hero: {
      badge: "Contactos",
      title: "Deixe a sua mensagem",
      description: "Disponibilizamos os nossos contactos para uma comunicação mais simples e eficaz. Peça orçamentos, esclareça dúvidas técnicas ou solicite informações sobre os nossos produtos.",
    },
  },
  category: {
    seo: { title_template: "{{title}} | Frebrico", description_template: "Produtos da categoria {{title}}. Vedações, portões, arames e bricolage na Frebrico." },
    titles: {
      map: JSON.stringify({
        vedacoes: "Vedações", arames: "Arames", correntes: "Correntes", portoes: "Portões", grades: "Grades",
        "arames-rebarbado": "Arame Rebarbado", "arames-farpado": "Arame Farpado", "arames-liso": "Arame Liso", "arames-malha": "Malha Metálica", "arames-galvanizado": "Arame Galvanizado",
        "portoes-automaticos": "Portões Automáticos", "portoes-manuais": "Portões Manuais", "portoes-garagem": "Portões de Garagem", "portoes-vedacao": "Portões de Vedação", "portoes-industriais": "Portões Industriais",
        "grades-seguranca": "Grades de Segurança", "grades-varanda": "Grades de Varanda", "grades-decorativas": "Grades Decorativas", "grades-industriais": "Grades Industriais", "grades-obra": "Grades de Obra",
        "vedacoes-residenciais": "Vedações Residenciais", "vedacoes-industriais": "Vedações Industriais", "vedacoes-rede-simples": "Rede Simples", "vedacoes-rede-dupla": "Rede Dupla", "vedacoes-agricolas": "Vedações Agrícolas",
        "correntes-transmissao": "Correntes de Transmissão", "correntes-elevacao": "Correntes de Elevação", "correntes-protecao": "Correntes de Proteção", "correntes-soldadas": "Correntes Soldadas", "correntes-galvanizadas": "Correntes Galvanizadas",
      }),
    },
  },
  "product-detail": {
    seo: { title: "Detalhes do produto", description: "Consulte detalhes técnicos, especificações e perguntas frequentes sobre os produtos de vedação, portões e arames da Frebrico." },
    hero: {
      breadcrumb_home: "Início",
      breadcrumb_category: "Vedações",
      badge: "Extração de poeiras industriais",
      title: "HV Curved branch 90°",
      description: "Tubos soldados a laser 2 m para uso em sistemas de sobrepressão, subpressão e sem pressão.",
      type_label: "Tipo",
      type_text: "Chapa soldada a laser com bordas de 6 mm para anéis de fixação.",
      variant_error: "Por favor, selecione uma variante antes de encomendar.",
      order_button: "Encomendar produto",
      added_button: "Adicionado ao carrinho",
      downloads_label: "Downloads",
      availability_badge: "Disponível",
    },
    specs: { product_name: "HV Curved branch 90°", add_button: "Adicionar", added_button: "Adicionado" },
    related: {
      badge: "Produtos",
      title: "Produtos Recomendados",
      products: JSON.stringify(Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: "Armatek", price: 5.85 }))),
    },
    faq: {
      badge: "FAQs",
      title: "Perguntas Frequentes",
      description: "Encontre aqui as respostas às perguntas que nos fazem com mais frequência.",
      button: "Falar com a equipa",
      button_url: "/contact",
      items: JSON.stringify([
        { question: "A Frebrico consegue gerir um projeto completo?", answer: "Sim. Acompanhamos todo o processo desde a conceção até à instalação." },
        { question: "Os sistemas cumprem normas e regulamentação?", answer: "Sim, todos os nossos sistemas são projetados para cumprir as normas aplicáveis." },
        { question: "Disponibilizam assistência técnica e manutenção?", answer: "Sim, oferecemos serviços completos de assistência técnica e manutenção." },
      ]),
    },
  },
  about: {
    seo: { title: "Sobre a Frebrico", description: "Conheça a Frebrico: experiência em soluções de vedação, portões e bricolage em Portugal, com foco em qualidade, segurança e acompanhamento próximo ao cliente." },
    hero: {
      badge: "Experiência sólida",
      title: "Soluções de\nconfiança.",
      description: "Fundada em 2004, a Frebrico nasceu com um objetivo claro: disponibilizar produtos fiáveis, duradouros e tecnicamente adequados, acompanhados por um serviço próximo e especializado.",
      cta_primary: "Saber mais",
      cta_primary_url: "/about",
      cta_secondary: "Contactos",
      cta_secondary_url: "/contact",
      image: "",
    },
    content_tab1: {
      label: "Experiência e Conhecimento Técnico",
      number: "01",
      title: "20+ anos de experiência em ",
      title_gray: "vedações e bricolage profissional",
    },
    content_tab2: {
      label: "Soluções Completas e Personalizadas",
      number: "02",
      title: "Oferecemos soluções completas e ",
      title_gray: "personalizadas para cada cliente",
    },
    content_tab3: {
      label: "Stock, Logística e Fiabilidade",
      number: "03",
      title: "Stock amplo e logística ",
      title_gray: "rápida e fiável",
    },
    solutions: {
      title: "Soluções Completas",
      description: "As nossas áreas de foco: soluções para cada mercado, tendo em conta tipos de utilização, níveis de segurança e estética do espaço.",
      cta_button: "Ver todos os produtos",
      cta_button_url: "/products",
      items: JSON.stringify([
        { number: "01/03", title: "Vedações residenciais", description: "Soluções de vedação para habitação, jardins e perímetros residenciais, com foco em durabilidade e estética." },
        { number: "02/03", title: "Redes metálicas", description: "Redes e malhas metálicas para aplicações agrícolas, industriais e de segurança." },
        { number: "03/03", title: "Portões metálicos", description: "Portões automáticos e manuais para garagens, entradas e áreas industriais." },
      ]),
    },
  },
  login: {
    branding: { title: "Bem-vindo de volta", subtitle: "A qualidade que conhece, sempre à sua disposição.", description: "Aceda à sua conta para consultar encomendas e gerir os seus dados.", stat: "Mais de 1 200 clientes satisfeitos" },
    form: { heading: "Entrar na conta", register_link: "Não tem conta? Criar conta", email_label: "E-mail", email_placeholder: "o.seu@email.pt", password_label: "Palavra-passe", password_placeholder: "••••••••", forgot_link: "Esqueceu-se da palavra-passe?", remember_label: "Manter sessão iniciada", submit: "Entrar", divider: "ou continuar com", google_button: "Entrar com Google" },
    footer: { copyright: "© Frebrico. Todos os direitos reservados." },
  },
  register: {
    branding: { title: "Junte-se a nós", subtitle: "Soluções para cada projeto, ao alcance de um registo.", description: "Crie a sua conta Frebrico e aceda a ofertas e apoio técnico.", benefits: JSON.stringify(["Acesso ao histórico de encomendas", "Orçamentos personalizados", "Apoio técnico dedicado"]) },
    form: { heading: "Criar conta", login_link: "Já tem conta? Entrar", name_placeholder: "João", surname_placeholder: "Silva", email_placeholder: "o.seu@email.pt", phone_placeholder: "+351 900 000 000", password_placeholder: "Mínimo 8 caracteres", confirm_password_placeholder: "Repita a palavra-passe", terms_label: "Aceito os Termos de Serviço e a Política de Privacidade", submit: "Criar conta", divider: "ou registar com", google_button: "Registar com Google" },
  },
  "recover-password": {
    branding: { title: "Recuperar acesso", subtitle: "Sem problemas. Recupere o acesso em segundos.", description: "Indique o seu endereço de e-mail e enviaremos um link para redefinir a palavra-passe.", security: "Processo seguro e encriptado" },
    form: { back_link: "Voltar ao login", heading: "Recuperar palavra-passe", description: "Introduza o e-mail associado à sua conta. Enviaremos um link para recuperar o acesso.", email_label: "E-mail", email_placeholder: "o.seu@email.pt", submit: "Enviar link de recuperação", register_link: "Não tem conta? Criar conta", success_title: "E-mail enviado!", success_message: "Enviamos um link de recuperação para", success_help: "Não recebeu o e-mail? Verifique a pasta de spam ou tente novamente." },
  },
};

export function getDefault(page: string, section: string, field: string): string | undefined {
  return defaults[page]?.[section]?.[field];
}

export { defaults };
