import React from "react";
import { Link } from "react-router";
import { SEO } from "../components/common/SEO";
import { DominoFadeInDown } from "../components/atoms/DominoFadeInDown";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Política de Privacidade"
        description="Política de Privacidade da Frebrico. Saiba como recolhemos, tratamos e protegemos os seus dados pessoais em conformidade com o RGPD."
        path="/privacy"
      />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <section className="w-full bg-white py-16 md:py-24 lg:py-[136px]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#131313] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-sm text-[#5a5a59] mb-12">
              Última atualização: fevereiro de 2026
            </p>

            <div className="prose prose-neutral max-w-none space-y-10 text-[#3f3f3f] text-base leading-relaxed">
              {/* 1 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  1. Responsável pelo Tratamento de Dados
                </h2>
                <p>
                  O responsável pelo tratamento dos dados pessoais recolhidos através deste website é
                  a <strong>Frebrico, Lda.</strong> (doravante designada "Frebrico"), com sede em Portugal.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Denominação social: Frebrico - Comércio de Bricolage, Lda.</li>
                  <li>NIPC: 507027825</li>
                  <li>Sede: Urbanização Industrial do Soeiro, Lote 21, 4745-458 São Mamede do Coronado, Trofa</li>
                  <li>Email para proteção de dados: info@frebrico.pt</li>
                </ul>
                <p className="mt-3">
                  A Frebrico compromete-se a proteger a privacidade e os dados pessoais dos utilizadores
                  do seu website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (UE)
                  2016/679 ("RGPD"), a Lei n.º 58/2019, de 8 de agosto (que assegura a execução do RGPD
                  em Portugal), e demais legislação aplicável.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  2. Dados Pessoais Recolhidos
                </h2>
                <p>
                  A Frebrico pode recolher os seguintes dados pessoais, consoante a interação do
                  utilizador com o website:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    <strong>Dados de identificação:</strong> nome completo, endereço de email, número de
                    telefone, morada de entrega e/ou faturação.
                  </li>
                  <li>
                    <strong>Dados de conta:</strong> endereço de email e palavra-passe (armazenada de
                    forma encriptada), no caso de criação de conta de utilizador.
                  </li>
                  <li>
                    <strong>Dados de encomenda:</strong> produtos selecionados, quantidades, valores,
                    dados de entrega e informações de pagamento.
                  </li>
                  <li>
                    <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, sistema
                    operativo, páginas visitadas, tempo de permanência e dados de cookies (conforme a
                    política de cookies abaixo).
                  </li>
                  <li>
                    <strong>Dados de comunicação:</strong> conteúdo de mensagens enviadas através do
                    formulário de contacto ou de pedidos de orçamento.
                  </li>
                </ul>
              </div>

              {/* 3 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  3. Finalidades do Tratamento
                </h2>
                <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    Processamento e gestão de encomendas, pedidos de orçamento e prestação de serviços.
                  </li>
                  <li>Comunicação com o cliente sobre o estado de encomendas e apoio técnico.</li>
                  <li>Gestão de contas de utilizador registado.</li>
                  <li>
                    Cumprimento de obrigações legais e fiscais (nomeadamente faturação e contabilidade).
                  </li>
                  <li>
                    Melhoria do website e da experiência de utilização, através de análise estatística
                    anonimizada.
                  </li>
                  <li>
                    Envio de comunicações comerciais e promocionais, caso o utilizador tenha prestado o
                    seu consentimento prévio e expresso para o efeito.
                  </li>
                  <li>
                    Exercício ou defesa de direitos em processos judiciais, administrativos ou
                    arbitrais.
                  </li>
                </ul>
              </div>

              {/* 4 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  4. Fundamentos Jurídicos do Tratamento
                </h2>
                <p>O tratamento de dados pessoais pela Frebrico tem por base:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    <strong>Execução de contrato</strong> (artigo 6.º, n.º 1, alínea b) do RGPD): quando
                    necessário para a celebração ou execução de um contrato de compra e venda ou
                    prestação de serviços.
                  </li>
                  <li>
                    <strong>Obrigação legal</strong> (artigo 6.º, n.º 1, alínea c) do RGPD): para
                    cumprimento de obrigações legais a que a Frebrico está sujeita (ex.: obrigações
                    fiscais e contabilísticas).
                  </li>
                  <li>
                    <strong>Consentimento</strong> (artigo 6.º, n.º 1, alínea a) do RGPD): para o envio
                    de comunicações comerciais e marketing direto. O consentimento pode ser retirado a
                    qualquer momento, sem que isso comprometa a licitude do tratamento efetuado
                    anteriormente.
                  </li>
                  <li>
                    <strong>Interesse legítimo</strong> (artigo 6.º, n.º 1, alínea f) do RGPD): para
                    melhoria dos serviços, análise estatística e prevenção de fraude, desde que não
                    prevaleçam os direitos e liberdades fundamentais do titular dos dados.
                  </li>
                </ul>
              </div>

              {/* 5 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  5. Partilha de Dados com Terceiros
                </h2>
                <p>
                  A Frebrico não vende, aluga ou cede dados pessoais a terceiros para fins de marketing.
                  Os dados pessoais podem, contudo, ser partilhados com:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    <strong>Prestadores de serviços</strong> que atuam em nome da Frebrico (ex.:
                    transportadoras, serviços de alojamento web, processadores de pagamento), estando
                    estes vinculados por obrigações de confidencialidade e limitados a tratar os dados
                    exclusivamente para as finalidades contratadas.
                  </li>
                  <li>
                    <strong>Autoridades públicas</strong>, quando tal seja exigido por lei, decisão
                    judicial ou regulamentar.
                  </li>
                </ul>
                <p className="mt-3">
                  Não são efetuadas transferências de dados pessoais para países fora do Espaço Económico
                  Europeu (EEE), salvo quando asseguradas as garantias adequadas previstas no RGPD
                  (nomeadamente decisões de adequação, cláusulas contratuais-tipo da Comissão Europeia ou
                  outros mecanismos legais aplicáveis).
                </p>
              </div>

              {/* 6 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  6. Prazo de Conservação dos Dados
                </h2>
                <p>
                  Os dados pessoais são conservados apenas pelo período estritamente necessário para as
                  finalidades para as quais foram recolhidos, ou conforme exigido pela legislação
                  aplicável:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    <strong>Dados de clientes e encomendas:</strong> conservados durante a vigência da
                    relação contratual e, após o seu término, pelo prazo legalmente exigido para
                    cumprimento de obrigações fiscais e legais (em regra, 10 anos para efeitos fiscais,
                    nos termos do artigo 123.º do CIRC).
                  </li>
                  <li>
                    <strong>Dados de conta:</strong> conservados enquanto a conta estiver ativa. Após
                    pedido de eliminação, os dados são anonimizados ou eliminados no prazo máximo de 30
                    dias, sem prejuízo dos prazos legais de conservação obrigatória.
                  </li>
                  <li>
                    <strong>Dados de comunicação (formulários de contacto):</strong> conservados pelo
                    prazo necessário ao tratamento do pedido e, no máximo, por 2 anos após a última
                    interação.
                  </li>
                  <li>
                    <strong>Dados de navegação e cookies:</strong> conforme descrito na secção "Cookies"
                    abaixo.
                  </li>
                </ul>
              </div>

              {/* 7 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  7. Direitos dos Titulares dos Dados
                </h2>
                <p>
                  Em conformidade com o RGPD e a legislação portuguesa, o titular dos dados tem os
                  seguintes direitos:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Direito de acesso</strong> — obter confirmação de que os seus dados pessoais
                    são objeto de tratamento e aceder a uma cópia dos mesmos.
                  </li>
                  <li>
                    <strong>Direito de retificação</strong> — solicitar a correção de dados pessoais
                    inexatos ou o completamento de dados incompletos.
                  </li>
                  <li>
                    <strong>Direito ao apagamento ("direito a ser esquecido")</strong> — solicitar a
                    eliminação dos dados pessoais, quando aplicável (ex.: quando os dados deixem de ser
                    necessários para a finalidade que motivou a recolha).
                  </li>
                  <li>
                    <strong>Direito à limitação do tratamento</strong> — solicitar a limitação do
                    tratamento em determinadas circunstâncias previstas no RGPD.
                  </li>
                  <li>
                    <strong>Direito à portabilidade</strong> — receber os dados pessoais num formato
                    estruturado, de uso corrente e de leitura automática, e transmiti-los a outro
                    responsável pelo tratamento.
                  </li>
                  <li>
                    <strong>Direito de oposição</strong> — opor-se ao tratamento dos dados pessoais,
                    nomeadamente para fins de marketing direto.
                  </li>
                  <li>
                    <strong>Direito de retirar o consentimento</strong> — quando o tratamento se baseie
                    no consentimento, retirá-lo a qualquer momento, sem comprometer a licitude do
                    tratamento anterior.
                  </li>
                </ul>
                <p className="mt-3">
                  Para exercer qualquer destes direitos, o titular poderá contactar a Frebrico através da{" "}
                  <Link to="/contact" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
                    página de contacto
                  </Link>{" "}
                  ou diretamente para o email indicado na secção 1. A Frebrico responderá no prazo máximo
                  de 30 dias, podendo este prazo ser prorrogado por mais 60 dias em caso de complexidade
                  ou volume elevado de pedidos, nos termos do artigo 12.º, n.º 3, do RGPD.
                </p>
                <p className="mt-3">
                  O titular dos dados tem ainda o direito de apresentar reclamação junto da{" "}
                  <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>, autoridade de controlo
                  em Portugal:{" "}
                  <a
                    href="https://www.cnpd.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#313b2e] underline hover:text-[#313b2e]/70"
                  >
                    www.cnpd.pt
                  </a>
                  .
                </p>
              </div>

              {/* 8 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">8. Cookies</h2>
                <p>
                  O website da Frebrico utiliza cookies — pequenos ficheiros de texto armazenados no
                  dispositivo do utilizador — para garantir o correto funcionamento do site, melhorar a
                  experiência de navegação e recolher dados estatísticos anonimizados.
                </p>
                <h3 className="text-lg font-medium text-[#131313] mt-5 mb-2">Tipos de cookies utilizados:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cookies estritamente necessários:</strong> indispensáveis para o funcionamento
                    do website (ex.: sessão de utilizador, carrinho de compras). Não requerem
                    consentimento.
                  </li>
                  <li>
                    <strong>Cookies de desempenho/analíticos:</strong> permitem analisar a utilização do
                    website de forma anónima e agregada, para melhorar a navegação e os conteúdos
                    oferecidos. Requerem consentimento prévio.
                  </li>
                  <li>
                    <strong>Cookies de funcionalidade:</strong> permitem memorizar preferências do
                    utilizador (ex.: idioma, região). Requerem consentimento prévio.
                  </li>
                </ul>
                <p className="mt-3">
                  O utilizador pode, a qualquer momento, gerir as suas preferências de cookies através das
                  configurações do seu navegador, desativando ou eliminando cookies. A desativação de
                  cookies estritamente necessários poderá comprometer o funcionamento do website.
                </p>
              </div>

              {/* 9 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  9. Segurança dos Dados
                </h2>
                <p>
                  A Frebrico adota medidas técnicas e organizativas adequadas para proteger os dados
                  pessoais contra o acesso não autorizado, a perda, a destruição ou a alteração acidental
                  ou ilícita, incluindo:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Encriptação de dados em trânsito (HTTPS/TLS).</li>
                  <li>Armazenamento seguro de palavras-passe (hashing).</li>
                  <li>Controlo de acessos e autenticação.</li>
                  <li>Cópias de segurança regulares.</li>
                  <li>
                    Revisão periódica das medidas de segurança implementadas.
                  </li>
                </ul>
              </div>

              {/* 10 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  10. Dados de Menores
                </h2>
                <p>
                  O website da Frebrico não se destina a menores de 16 anos. A Frebrico não recolhe
                  intencionalmente dados pessoais de menores de 16 anos. Caso tome conhecimento de que
                  foram recolhidos dados de um menor sem o consentimento do titular das responsabilidades
                  parentais, a Frebrico procederá à sua eliminação imediata.
                </p>
              </div>

              {/* 11 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  11. Alterações à Política de Privacidade
                </h2>
                <p>
                  A Frebrico reserva-se o direito de alterar a presente Política de Privacidade a
                  qualquer momento, sendo as alterações publicadas nesta página com indicação da data de
                  atualização. Recomenda-se a consulta periódica desta página.
                </p>
              </div>

              {/* 12 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">12. Contacto</h2>
                <p>
                  Para quaisquer questões, pedidos ou reclamações relacionados com a proteção dos seus
                  dados pessoais, o utilizador poderá contactar a Frebrico através da{" "}
                  <Link to="/contact" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
                    página de contacto
                  </Link>{" "}
                  ou diretamente para o email indicado na secção 1 desta política.
                </p>
              </div>

              {/* 13 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  13. Legislação Aplicável
                </h2>
                <p>
                  A presente Política de Privacidade é regida pela legislação portuguesa e europeia
                  aplicável, nomeadamente:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>
                    Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho, de 27 de abril de
                    2016 (Regulamento Geral sobre a Proteção de Dados — RGPD).
                  </li>
                  <li>
                    Lei n.º 58/2019, de 8 de agosto (que assegura a execução do RGPD na ordem jurídica
                    portuguesa).
                  </li>
                  <li>
                    Lei n.º 41/2004, de 18 de agosto, alterada pela Lei n.º 46/2012, de 29 de agosto
                    (relativa ao tratamento de dados pessoais e à proteção da privacidade no setor das
                    comunicações eletrónicas).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </DominoFadeInDown>
    </>
  );
}
