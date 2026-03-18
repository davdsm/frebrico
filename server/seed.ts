/**
 * Seed script: populates the content table with all current hardcoded values.
 * Run: npx tsx seed.ts (from server/ or project root)
 */
import { upsertContent } from "./db.js";

type SeedRow = {
  page_slug: string;
  section_key: string;
  field_key: string;
  field_type: string;
  value: string;
};

const seedData: SeedRow[] = [
  // --- Global: header ---
  { page_slug: "header", section_key: "nav", field_key: "about", field_type: "text", value: "Sobre Nós" },
  { page_slug: "header", section_key: "nav", field_key: "products", field_type: "text", value: "Produtos" },
  { page_slug: "header", section_key: "nav", field_key: "contact", field_type: "text", value: "Contactos" },
  { page_slug: "header", section_key: "logo", field_key: "desktop", field_type: "image", value: "/logo.svg" },
  { page_slug: "header", section_key: "logo", field_key: "mobile", field_type: "image", value: "/logo-mobile.svg" },

  // --- Global: footer ---
  { page_slug: "footer", section_key: "cta", field_key: "title", field_type: "text", value: "Vamos Conversar" },
  { page_slug: "footer", section_key: "cta", field_key: "description", field_type: "textarea", value: "Conte-nos o que precisa: estudamos a melhor solução de vedação, portão ou estrutura metálica para o seu espaço, em qualquer ponto de Portugal." },
  { page_slug: "footer", section_key: "cta", field_key: "button", field_type: "text", value: "Falar com a equipa" },
  { page_slug: "footer", section_key: "cta", field_key: "button_url", field_type: "text", value: "/contact" },
  { page_slug: "footer", section_key: "company", field_key: "name", field_type: "text", value: "Frebrico" },
  { page_slug: "footer", section_key: "company", field_key: "description", field_type: "textarea", value: "Especialistas em arames, redes de vedação, portões e estruturas metálicas para habitação, indústria e agricultura, com acompanhamento técnico em todo o país." },
  { page_slug: "footer", section_key: "social", field_key: "twitter", field_type: "text", value: "#" },
  { page_slug: "footer", section_key: "social", field_key: "facebook", field_type: "text", value: "#" },
  { page_slug: "footer", section_key: "social", field_key: "instagram", field_type: "text", value: "#" },
  { page_slug: "footer", section_key: "social", field_key: "linkedin", field_type: "text", value: "#" },
  { page_slug: "footer", section_key: "links_loja", field_key: "title", field_type: "text", value: "Loja" },
  { page_slug: "footer", section_key: "links_loja", field_key: "items", field_type: "json", value: JSON.stringify([{ label: "Entrar", url: "/login" }, { label: "Criar conta", url: "/register" }, { label: "Postes", url: "#" }, { label: "Painéis de Vedação", url: "#" }]) },
  { page_slug: "footer", section_key: "links_empresa", field_key: "title", field_type: "text", value: "Empresa" },
  { page_slug: "footer", section_key: "links_empresa", field_key: "items", field_type: "json", value: JSON.stringify([{ label: "Início", url: "/" }, { label: "Sobre Nós", url: "/about" }, { label: "Produtos", url: "/products" }, { label: "Serviços", url: "#" }, { label: "Contactos", url: "/contact" }]) },
  { page_slug: "footer", section_key: "links_legais", field_key: "title", field_type: "text", value: "Links Legais" },
  { page_slug: "footer", section_key: "links_legais", field_key: "items", field_type: "json", value: JSON.stringify([{ label: "Política de Privacidade", url: "#" }, { label: "Termos e Condições", url: "#" }, { label: "Livro de Reclamações", url: "#" }]) },
  { page_slug: "footer", section_key: "bottom", field_key: "copyright", field_type: "text", value: "© Frebrico. Todos os direitos reservados." },
  { page_slug: "footer", section_key: "bottom", field_key: "back_to_top", field_type: "text", value: "Voltar ao topo" },

  // --- Home ---
  { page_slug: "home", section_key: "seo", field_key: "title", field_type: "text", value: "Vedações, portões e bricolage" },
  { page_slug: "home", section_key: "seo", field_key: "description", field_type: "textarea", value: "Na Frebrico encontra soluções completas em vedações, portões, arames e bricolage, com produtos de alta qualidade e apoio técnico especializado em Portugal." },
  { page_slug: "home", section_key: "hero", field_key: "title", field_type: "text", value: "VEDAÇÕES" },
  { page_slug: "home", section_key: "hero", field_key: "title2", field_type: "text", value: "BRICOLAGE" },
  { page_slug: "home", section_key: "hero", field_key: "subtitle", field_type: "text", value: "vedações, bricolage e construção" },
  { page_slug: "home", section_key: "hero", field_key: "description", field_type: "text", value: "Produtos de confiança. Apoio técnico. Resultados duradouros." },
  { page_slug: "home", section_key: "hero", field_key: "link_text", field_type: "text", value: "Explorar produtos" },
  { page_slug: "home", section_key: "features", field_key: "title", field_type: "text", value: "Cada espaço tem desafios diferentes." },
  { page_slug: "home", section_key: "features", field_key: "description", field_type: "textarea", value: "Na Frebrico desenvolvemos soluções completas em vedações e bricolage, adaptadas ao tipo de espaço, nível de segurança, durabilidade e estética que pretende." },
  { page_slug: "home", section_key: "features", field_key: "overlay_title", field_type: "text", value: "Construídas para durar." },
  { page_slug: "home", section_key: "features", field_key: "overlay_description", field_type: "text", value: "Soluções específicas para habitação, agricultura, indústria e espaços profissionais, com instalação e acompanhamento técnico em todo o país." },
  { page_slug: "home", section_key: "features", field_key: "button", field_type: "text", value: "Saber mais sobre serviços" },
  { page_slug: "home", section_key: "features", field_key: "button_mobile", field_type: "text", value: "Saber mais" },
  { page_slug: "home", section_key: "features", field_key: "button_url", field_type: "text", value: "/contact" },
  { page_slug: "home", section_key: "features", field_key: "image_alt", field_type: "text", value: "Soluções de vedação e estruturas metálicas para habitação, agricultura e indústria" },
  { page_slug: "home", section_key: "carousel", field_key: "title", field_type: "text", value: "Produtos pensados e preparados para si" },
  { page_slug: "home", section_key: "carousel", field_key: "products", field_type: "json", value: JSON.stringify([
    { name: "Armatek", price: "5.85", badge: "Destaque 🔥" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
    { name: "Armatek", price: "5.85" },
  ]) },
  { page_slug: "home", section_key: "faq", field_key: "badge", field_type: "text", value: "FAQs" },
  { page_slug: "home", section_key: "faq", field_key: "title", field_type: "text", value: "Perguntas\nFrequentes" },
  { page_slug: "home", section_key: "faq", field_key: "card_title", field_type: "text", value: "Ainda tem dúvidas?" },
  { page_slug: "home", section_key: "faq", field_key: "card_description", field_type: "textarea", value: "Estamos aqui para ajudar. Consulte as perguntas mais frequentes sobre os nossos produtos e serviços de vedações, portões e bricolage, ou contacte-nos diretamente." },
  { page_slug: "home", section_key: "faq", field_key: "button_url", field_type: "text", value: "/contact" },
  { page_slug: "home", section_key: "faq", field_key: "button", field_type: "text", value: "Contactos" },
  { page_slug: "home", section_key: "faq", field_key: "items", field_type: "json", value: JSON.stringify([
    { question: "Que tipo de produtos a Frebrico comercializa?", answer: "A Frebrico é especializada no comércio de produtos de bricolage, ferragens e soluções de vedação. A nossa oferta inclui vedações residenciais, agrícolas e industriais, redes metálicas, painéis soldados, postes, portões, fixações e diversos materiais de apoio à construção." },
    { question: "Prestam serviços de montagem de vedações?", answer: "Sim, prestamos serviços completos de montagem e instalação de vedações. A nossa equipa técnica especializada garante uma instalação profissional e duradoura." },
    { question: "Posso pedir apoio técnico antes de comprar?", answer: "Claro! A nossa equipa de apoio técnico está disponível para esclarecer todas as suas dúvidas e ajudá-lo a escolher a solução mais adequada às suas necessidades." },
    { question: "A Frebrico tem stock permanente?", answer: "Sim, mantemos stock permanente dos nossos produtos principais. Para artigos específicos, podemos encomendar com prazos de entrega rápidos." },
  ]) },

  // --- Products ---
  { page_slug: "products", section_key: "seo", field_key: "title", field_type: "text", value: "Produtos de vedação, portões e arames" },
  { page_slug: "products", section_key: "seo", field_key: "description", field_type: "textarea", value: "Gama completa de produtos de vedação, portões, arames e soluções para construção e bricolage. Frebrico, em Portugal." },
  { page_slug: "products", section_key: "hero", field_key: "badge", field_type: "text", value: "Produtos e Serviços" },
  { page_slug: "products", section_key: "hero", field_key: "title", field_type: "text", value: "Pensados para desempenho real" },
  { page_slug: "products", section_key: "hero", field_key: "description", field_type: "textarea", value: "Produtos desenvolvidos para garantir durabilidade, segurança e fiabilidade em qualquer contexto." },
  { page_slug: "products", section_key: "hero", field_key: "cta_primary", field_type: "text", value: "Explorar produtos" },
  { page_slug: "products", section_key: "hero", field_key: "cta_secondary", field_type: "text", value: "Apoio Técnico" },
  { page_slug: "products", section_key: "hero", field_key: "categories", field_type: "json", value: JSON.stringify([{ name: "Arames", slug: "arames" }, { name: "Vedações", slug: "vedacoes" }, { name: "Correntes", slug: "correntes" }]) },
  { page_slug: "products", section_key: "services", field_key: "badge", field_type: "text", value: "Serviços" },
  { page_slug: "products", section_key: "services", field_key: "title", field_type: "text", value: "Soluções que vão além do produto" },
  { page_slug: "products", section_key: "services", field_key: "description", field_type: "textarea", value: "Serviços especializados que complementam a nossa gama de produtos: apoio técnico, orçamentos à medida e execução profissional, para que cada projeto seja realizado com segurança, eficiência e durabilidade." },
  { page_slug: "products", section_key: "services", field_key: "items", field_type: "json", value: JSON.stringify([
    { number: "01", title: "Apoio técnico", description: "Aconselhamento para escolher os produtos mais adequados a cada aplicação, com foco em segurança e durabilidade." },
    { number: "02", title: "Orçamentos à medida", description: "Propostas claras e personalizadas, ajustadas às necessidades reais de cada projeto, sem compromisso." },
    { number: "03", title: "Execução e montagem", description: "Montagem dos nossos produtos através de parceiros especializados, com resultados profissionais e duradouros." },
  ]) },
  { page_slug: "products", section_key: "services", field_key: "button", field_type: "text", value: "Contactos" },
  { page_slug: "products", section_key: "grid", field_key: "products", field_type: "json", value: JSON.stringify(
    Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: "Armatek", price: 5.85, featured: i === 0 }))
  ) },

  // --- Cart ---
  { page_slug: "cart", section_key: "seo", field_key: "title", field_type: "text", value: "Carrinho" },
  { page_slug: "cart", section_key: "seo", field_key: "description", field_type: "textarea", value: "Revise os produtos no carrinho e conclua a sua compra na Frebrico com segurança." },
  { page_slug: "cart", section_key: "header", field_key: "back_link", field_type: "text", value: "Voltar à loja" },
  { page_slug: "cart", section_key: "header", field_key: "title", field_type: "text", value: "Finalizar compra" },
  { page_slug: "cart", section_key: "summary", field_key: "title", field_type: "text", value: "Resumo do pedido" },
  { page_slug: "cart", section_key: "summary", field_key: "discount_placeholder", field_type: "text", value: "Código de desconto" },
  { page_slug: "cart", section_key: "summary", field_key: "apply_button", field_type: "text", value: "Aplicar" },
  { page_slug: "cart", section_key: "summary", field_key: "subtotal_label", field_type: "text", value: "Subtotal" },
  { page_slug: "cart", section_key: "summary", field_key: "total_label", field_type: "text", value: "Total" },
  { page_slug: "cart", section_key: "summary", field_key: "currency", field_type: "text", value: "EUR" },
  { page_slug: "cart", section_key: "summary", field_key: "remove_button", field_type: "text", value: "Remover" },
  { page_slug: "cart", section_key: "checkout", field_key: "contact_title", field_type: "text", value: "Contacto" },
  { page_slug: "cart", section_key: "checkout", field_key: "login_link", field_type: "text", value: "Já tem conta? Entrar" },
  { page_slug: "cart", section_key: "checkout", field_key: "newsletter_label", field_type: "text", value: "Quero receber novidades e ofertas por e-mail" },
  { page_slug: "cart", section_key: "checkout", field_key: "address_title", field_type: "text", value: "Morada de envio" },
  { page_slug: "cart", section_key: "checkout", field_key: "placeholders", field_type: "json", value: JSON.stringify({ email: "E-mail", nome: "Nome", apelido: "Apelido", morada: "Morada", apartamento: "Apartamento, andar, etc. (opcional)", codigo_postal: "Código postal", cidade: "Localidade", pais: "País", telemovel: "Telemóvel" }) },
  { page_slug: "cart", section_key: "checkout", field_key: "countries", field_type: "json", value: JSON.stringify(["Portugal", "Espanha", "França"]) },
  { page_slug: "cart", section_key: "checkout", field_key: "submit_button", field_type: "text", value: "Concluir pedido" },
  { page_slug: "cart", section_key: "checkout", field_key: "continue_shopping", field_type: "text", value: "Continuar a comprar" },

  // --- Contact ---
  { page_slug: "contact", section_key: "seo", field_key: "title", field_type: "text", value: "Contacto" },
  { page_slug: "contact", section_key: "seo", field_key: "description", field_type: "textarea", value: "Contacte a equipa Frebrico para pedidos, orçamentos e apoio técnico em vedações, portões, arames e bricolage em Portugal." },
  { page_slug: "contact", section_key: "hero", field_key: "badge", field_type: "text", value: "Contactos" },
  { page_slug: "contact", section_key: "hero", field_key: "title", field_type: "text", value: "Deixe a sua mensagem" },
  { page_slug: "contact", section_key: "hero", field_key: "description", field_type: "textarea", value: "Disponibilizamos os nossos contactos para uma comunicação mais simples e eficaz. Peça orçamentos, esclareça dúvidas técnicas ou solicite informações sobre os nossos produtos." },

  // --- Mobile menu (stored under header or global) ---
  { page_slug: "header", section_key: "mobile", field_key: "nav_home", field_type: "text", value: "Início" },
  { page_slug: "header", section_key: "mobile", field_key: "nav_about", field_type: "text", value: "Sobre Nós" },
  { page_slug: "header", section_key: "mobile", field_key: "nav_products", field_type: "text", value: "Produtos" },
  { page_slug: "header", section_key: "mobile", field_key: "nav_contact", field_type: "text", value: "Contactos" },
  { page_slug: "header", section_key: "mobile", field_key: "categories_title", field_type: "text", value: "Categorias de produtos" },
  { page_slug: "header", section_key: "mobile", field_key: "categories", field_type: "json", value: JSON.stringify([
    { title: "Arames", slug: "arames", description: "Rebabado, farpado, liso, malha metálica e mais." },
    { title: "Portões", slug: "portoes", description: "Automáticos, manuais, industriais e residenciais." },
    { title: "Grades & Vedações", slug: "grades", description: "Soluções completas para segurança e delimitação." },
    { title: "Correntes", slug: "correntes", description: "Transmissão, elevação e proteção em vários formatos." },
  ]) },

  // --- Category (titles map) ---
  { page_slug: "category", section_key: "seo", field_key: "title_template", field_type: "text", value: "{{title}} | Frebrico" },
  { page_slug: "category", section_key: "seo", field_key: "description_template", field_type: "text", value: "Produtos da categoria {{title}}. Vedações, portões, arames e bricolage na Frebrico." },
  { page_slug: "category", section_key: "titles", field_key: "map", field_type: "json", value: JSON.stringify({
    vedacoes: "Vedações", arames: "Arames", correntes: "Correntes", portoes: "Portões", grades: "Grades",
    "arames-rebarbado": "Arame Rebarbado", "arames-farpado": "Arame Farpado", "arames-liso": "Arame Liso", "arames-malha": "Malha Metálica", "arames-galvanizado": "Arame Galvanizado",
    "portoes-automaticos": "Portões Automáticos", "portoes-manuais": "Portões Manuais", "portoes-garagem": "Portões de Garagem", "portoes-vedacao": "Portões de Vedação", "portoes-industriais": "Portões Industriais",
    "grades-seguranca": "Grades de Segurança", "grades-varanda": "Grades de Varanda", "grades-decorativas": "Grades Decorativas", "grades-industriais": "Grades Industriais", "grades-obra": "Grades de Obra",
    "vedacoes-residenciais": "Vedações Residenciais", "vedacoes-industriais": "Vedações Industriais", "vedacoes-rede-simples": "Rede Simples", "vedacoes-rede-dupla": "Rede Dupla", "vedacoes-agricolas": "Vedações Agrícolas",
    "correntes-transmissao": "Correntes de Transmissão", "correntes-elevacao": "Correntes de Elevação", "correntes-protecao": "Correntes de Proteção", "correntes-soldadas": "Correntes Soldadas", "correntes-galvanizadas": "Correntes Galvanizadas",
  }) },

  // --- Product detail ---
  { page_slug: "product-detail", section_key: "seo", field_key: "title", field_type: "text", value: "Detalhes do produto" },
  { page_slug: "product-detail", section_key: "seo", field_key: "description", field_type: "textarea", value: "Consulte detalhes técnicos, especificações e perguntas frequentes sobre os produtos de vedação, portões e arames da Frebrico." },
  { page_slug: "product-detail", section_key: "hero", field_key: "breadcrumb_home", field_type: "text", value: "Início" },
  { page_slug: "product-detail", section_key: "hero", field_key: "breadcrumb_category", field_type: "text", value: "Vedações" },
  { page_slug: "product-detail", section_key: "hero", field_key: "badge", field_type: "text", value: "Extração de poeiras industriais" },
  { page_slug: "product-detail", section_key: "hero", field_key: "title", field_type: "text", value: "HV Curved branch 90°" },
  { page_slug: "product-detail", section_key: "hero", field_key: "description", field_type: "textarea", value: "Tubos soldados a laser 2 m para uso em sistemas de sobrepressão, subpressão e sem pressão." },
  { page_slug: "product-detail", section_key: "hero", field_key: "type_label", field_type: "text", value: "Tipo" },
  { page_slug: "product-detail", section_key: "hero", field_key: "type_text", field_type: "textarea", value: "Chapa soldada a laser com bordas de 6 mm para anéis de fixação." },
  { page_slug: "product-detail", section_key: "hero", field_key: "variant_error", field_type: "text", value: "Por favor, selecione uma variante antes de encomendar." },
  { page_slug: "product-detail", section_key: "hero", field_key: "order_button", field_type: "text", value: "Encomendar produto" },
  { page_slug: "product-detail", section_key: "hero", field_key: "added_button", field_type: "text", value: "Adicionado ao carrinho" },
  { page_slug: "product-detail", section_key: "hero", field_key: "downloads_label", field_type: "text", value: "Downloads" },
  { page_slug: "product-detail", section_key: "hero", field_key: "availability_badge", field_type: "text", value: "Disponível" },
  { page_slug: "product-detail", section_key: "specs", field_key: "product_name", field_type: "text", value: "HV Curved branch 90°" },
  { page_slug: "product-detail", section_key: "specs", field_key: "add_button", field_type: "text", value: "Adicionar" },
  { page_slug: "product-detail", section_key: "specs", field_key: "added_button", field_type: "text", value: "Adicionado" },
  { page_slug: "product-detail", section_key: "related", field_key: "badge", field_type: "text", value: "Produtos" },
  { page_slug: "product-detail", section_key: "related", field_key: "title", field_type: "text", value: "Produtos Recomendados" },
  { page_slug: "product-detail", section_key: "related", field_key: "products", field_type: "json", value: JSON.stringify(Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: "Armatek", price: 5.85 }))) },
  { page_slug: "product-detail", section_key: "faq", field_key: "badge", field_type: "text", value: "FAQs" },
  { page_slug: "product-detail", section_key: "faq", field_key: "title", field_type: "text", value: "Perguntas Frequentes" },
  { page_slug: "product-detail", section_key: "faq", field_key: "description", field_type: "text", value: "Encontre aqui as respostas às perguntas que nos fazem com mais frequência." },
  { page_slug: "product-detail", section_key: "faq", field_key: "button", field_type: "text", value: "Falar com a equipa" },
  { page_slug: "product-detail", section_key: "faq", field_key: "items", field_type: "json", value: JSON.stringify([
    { question: "A Frebrico consegue gerir um projeto completo?", answer: "Sim. Acompanhamos todo o processo desde a conceção até à instalação." },
    { question: "Os sistemas cumprem normas e regulamentação?", answer: "Sim, todos os nossos sistemas são projetados para cumprir as normas aplicáveis." },
    { question: "Disponibilizam assistência técnica e manutenção?", answer: "Sim, oferecemos serviços completos de assistência técnica e manutenção." },
  ]) },

  // --- About ---
  { page_slug: "about", section_key: "seo", field_key: "title", field_type: "text", value: "Sobre a Frebrico" },
  { page_slug: "about", section_key: "seo", field_key: "description", field_type: "textarea", value: "Conheça a Frebrico: experiência em soluções de vedação, portões e bricolage em Portugal, com foco em qualidade, segurança e acompanhamento próximo ao cliente." },

  // --- Login ---
  { page_slug: "login", section_key: "seo", field_key: "title", field_type: "text", value: "Entrar | Frebrico" },
  { page_slug: "login", section_key: "branding", field_key: "title", field_type: "text", value: "Bem-vindo de volta" },
  { page_slug: "login", section_key: "branding", field_key: "subtitle", field_type: "text", value: "A qualidade que conhece, sempre à sua disposição." },
  { page_slug: "login", section_key: "branding", field_key: "description", field_type: "textarea", value: "Aceda à sua conta para consultar encomendas e gerir os seus dados." },
  { page_slug: "login", section_key: "branding", field_key: "stat", field_type: "text", value: "Mais de 1 200 clientes satisfeitos" },
  { page_slug: "login", section_key: "form", field_key: "heading", field_type: "text", value: "Entrar na conta" },
  { page_slug: "login", section_key: "form", field_key: "register_link", field_type: "text", value: "Não tem conta? Criar conta" },
  { page_slug: "login", section_key: "form", field_key: "email_label", field_type: "text", value: "E-mail" },
  { page_slug: "login", section_key: "form", field_key: "email_placeholder", field_type: "text", value: "o.seu@email.pt" },
  { page_slug: "login", section_key: "form", field_key: "password_label", field_type: "text", value: "Palavra-passe" },
  { page_slug: "login", section_key: "form", field_key: "password_placeholder", field_type: "text", value: "••••••••" },
  { page_slug: "login", section_key: "form", field_key: "forgot_link", field_type: "text", value: "Esqueceu-se da palavra-passe?" },
  { page_slug: "login", section_key: "form", field_key: "remember_label", field_type: "text", value: "Manter sessão iniciada" },
  { page_slug: "login", section_key: "form", field_key: "submit", field_type: "text", value: "Entrar" },
  { page_slug: "login", section_key: "form", field_key: "divider", field_type: "text", value: "ou continuar com" },
  { page_slug: "login", section_key: "form", field_key: "google_button", field_type: "text", value: "Entrar com Google" },
  { page_slug: "login", section_key: "footer", field_key: "copyright", field_type: "text", value: "© Frebrico. Todos os direitos reservados." },

  // --- Register ---
  { page_slug: "register", section_key: "seo", field_key: "title", field_type: "text", value: "Criar conta | Frebrico" },
  { page_slug: "register", section_key: "branding", field_key: "title", field_type: "text", value: "Junte-se a nós" },
  { page_slug: "register", section_key: "branding", field_key: "subtitle", field_type: "text", value: "Soluções para cada projeto, ao alcance de um registo." },
  { page_slug: "register", section_key: "branding", field_key: "description", field_type: "textarea", value: "Crie a sua conta Frebrico e aceda a ofertas e apoio técnico." },
  { page_slug: "register", section_key: "branding", field_key: "benefits", field_type: "json", value: JSON.stringify([
    "Acesso ao histórico de encomendas",
    "Orçamentos personalizados",
    "Apoio técnico dedicado",
  ]) },
  { page_slug: "register", section_key: "form", field_key: "heading", field_type: "text", value: "Criar conta" },
  { page_slug: "register", section_key: "form", field_key: "login_link", field_type: "text", value: "Já tem conta? Entrar" },
  { page_slug: "register", section_key: "form", field_key: "name_placeholder", field_type: "text", value: "João" },
  { page_slug: "register", section_key: "form", field_key: "surname_placeholder", field_type: "text", value: "Silva" },
  { page_slug: "register", section_key: "form", field_key: "email_placeholder", field_type: "text", value: "o.seu@email.pt" },
  { page_slug: "register", section_key: "form", field_key: "phone_placeholder", field_type: "text", value: "+351 900 000 000" },
  { page_slug: "register", section_key: "form", field_key: "password_placeholder", field_type: "text", value: "Mínimo 8 caracteres" },
  { page_slug: "register", section_key: "form", field_key: "confirm_password_placeholder", field_type: "text", value: "Repita a palavra-passe" },
  { page_slug: "register", section_key: "form", field_key: "terms_label", field_type: "text", value: "Aceito os Termos de Serviço e a Política de Privacidade" },
  { page_slug: "register", section_key: "form", field_key: "submit", field_type: "text", value: "Criar conta" },
  { page_slug: "register", section_key: "form", field_key: "divider", field_type: "text", value: "ou registar com" },
  { page_slug: "register", section_key: "form", field_key: "google_button", field_type: "text", value: "Registar com Google" },

  // --- Recover password ---
  { page_slug: "recover-password", section_key: "seo", field_key: "title", field_type: "text", value: "Recuperar palavra-passe | Frebrico" },
  { page_slug: "recover-password", section_key: "branding", field_key: "title", field_type: "text", value: "Recuperar acesso" },
  { page_slug: "recover-password", section_key: "branding", field_key: "subtitle", field_type: "text", value: "Sem problemas. Recupere o acesso em segundos." },
  { page_slug: "recover-password", section_key: "branding", field_key: "description", field_type: "textarea", value: "Indique o seu endereço de e-mail e enviaremos um link para redefinir a palavra-passe." },
  { page_slug: "recover-password", section_key: "branding", field_key: "security", field_type: "text", value: "Processo seguro e encriptado" },
  { page_slug: "recover-password", section_key: "form", field_key: "back_link", field_type: "text", value: "Voltar ao login" },
  { page_slug: "recover-password", section_key: "form", field_key: "heading", field_type: "text", value: "Recuperar palavra-passe" },
  { page_slug: "recover-password", section_key: "form", field_key: "description", field_type: "text", value: "Introduza o e-mail associado à sua conta. Enviaremos um link para recuperar o acesso." },
  { page_slug: "recover-password", section_key: "form", field_key: "email_label", field_type: "text", value: "E-mail" },
  { page_slug: "recover-password", section_key: "form", field_key: "email_placeholder", field_type: "text", value: "o.seu@email.pt" },
  { page_slug: "recover-password", section_key: "form", field_key: "submit", field_type: "text", value: "Enviar link de recuperação" },
  { page_slug: "recover-password", section_key: "form", field_key: "register_link", field_type: "text", value: "Não tem conta? Criar conta" },
  { page_slug: "recover-password", section_key: "form", field_key: "success_title", field_type: "text", value: "E-mail enviado!" },
  { page_slug: "recover-password", section_key: "form", field_key: "success_message", field_type: "text", value: "Enviamos um link de recuperação para" },
  { page_slug: "recover-password", section_key: "form", field_key: "success_help", field_type: "text", value: "Não recebeu o e-mail? Verifique a pasta de spam ou tente novamente." },
];

function run() {
  console.log("Seeding content table...");
  for (const row of seedData) {
    upsertContent(row.page_slug, row.section_key, row.field_key, row.field_type, row.value);
  }
  console.log(`Seeded ${seedData.length} content rows.`);
}

run();
