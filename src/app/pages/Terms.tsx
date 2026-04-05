import React from "react";
import { Link } from "react-router";
import { SEO } from "../components/common/SEO";
import { DominoFadeInDown } from "../components/atoms/DominoFadeInDown";

export default function Terms() {
  return (
    <>
      <SEO
        title="Termos e Condições"
        description="Termos e Condições Gerais de Utilização e Venda do website Frebrico. Consulte as condições aplicáveis à navegação e compra no nosso site."
        path="/terms"
      />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <section className="w-full bg-white py-16 md:py-24 lg:py-[136px]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#131313] mb-4">
              Termos e Condições
            </h1>
            <p className="text-sm text-[#5a5a59] mb-12">
              Última atualização: fevereiro de 2026
            </p>

            <div className="prose prose-neutral max-w-none space-y-10 text-[#3f3f3f] text-base leading-relaxed">
              {/* 1 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">1. Identificação do Responsável</h2>
                <p>
                  O presente website é propriedade e gerido por <strong>Frebrico, Lda.</strong> (doravante
                  designada "Frebrico"), com sede em Portugal, dedicada à comercialização de vedações,
                  portões, arames, estruturas metálicas e materiais de bricolage e construção.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Denominação social: Frebrico, Lda.</li>
                  <li>NIPC: [a preencher]</li>
                  <li>Sede: [a preencher]</li>
                  <li>Email: [a preencher]</li>
                  <li>Telefone: [a preencher]</li>
                </ul>
              </div>

              {/* 2 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">2. Objeto e Âmbito de Aplicação</h2>
                <p>
                  Os presentes Termos e Condições Gerais ("Termos") regulam o acesso e utilização do
                  website <strong>frebrico.pt</strong> ("Site"), bem como as condições aplicáveis às
                  encomendas, compras e pedidos de orçamento efetuados através do mesmo. Ao aceder e
                  utilizar este Site, o utilizador declara ter lido, compreendido e aceite na íntegra os
                  presentes Termos, a{" "}
                  <Link to="/privacy" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
                    Política de Privacidade
                  </Link>{" "}
                  e demais condições aqui mencionadas.
                </p>
                <p className="mt-3">
                  A Frebrico reserva-se o direito de alterar os presentes Termos a qualquer momento,
                  sendo as alterações eficazes a partir da sua publicação nesta página. A data da última
                  atualização é indicada no topo do documento.
                </p>
              </div>

              {/* 3 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">3. Acesso e Utilização do Site</h2>
                <p>
                  O acesso ao Site é gratuito, sem prejuízo dos custos de ligação à Internet suportados
                  pelo utilizador. O utilizador compromete-se a utilizar o Site em conformidade com a lei,
                  os bons costumes e os presentes Termos, abstendo-se de o utilizar para fins ilícitos,
                  lesivos dos direitos ou interesses de terceiros, ou que possam danificar, inutilizar,
                  sobrecarregar ou deteriorar o Site ou impedir a sua normal utilização.
                </p>
              </div>

              {/* 4 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">4. Produtos e Informações</h2>
                <p>
                  As informações sobre produtos e serviços apresentadas no Site (incluindo imagens,
                  descrições, especificações técnicas e preços) são fornecidas de boa-fé e com a maior
                  exatidão possível, podendo, contudo, conter imprecisões ou erros tipográficos. As
                  imagens dos produtos são meramente ilustrativas, podendo existir variações de cor,
                  dimensão ou acabamento em relação ao produto efetivamente entregue.
                </p>
                <p className="mt-3">
                  A Frebrico reserva-se o direito de atualizar, modificar ou descontinuar produtos e
                  respetivas informações a qualquer momento, sem aviso prévio.
                </p>
              </div>

              {/* 5 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">5. Preços e Condições de Pagamento</h2>
                <p>
                  Todos os preços indicados no Site incluem IVA à taxa legal em vigor em Portugal, salvo
                  indicação expressa em contrário. Os custos de transporte, quando aplicáveis, serão
                  discriminados antes da confirmação da encomenda.
                </p>
                <p className="mt-3">
                  Os preços podem ser alterados pela Frebrico a qualquer momento, sem aviso prévio. O preço
                  aplicável à encomenda é o vigente no momento da sua confirmação.
                </p>
              </div>

              {/* 6 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">6. Encomendas e Formação do Contrato</h2>
                <p>
                  A submissão de uma encomenda ou pedido de orçamento através do Site constitui uma
                  proposta contratual por parte do utilizador, ficando sujeita à aceitação pela Frebrico. O
                  contrato de compra e venda considera-se celebrado com o envio da confirmação da encomenda
                  por parte da Frebrico, por email ou através do próprio Site.
                </p>
                <p className="mt-3">
                  A Frebrico reserva-se o direito de recusar ou cancelar encomendas em caso de
                  indisponibilidade de stock, erro nos preços publicados, suspeita de fraude ou outras
                  circunstâncias que o justifiquem, informando o cliente e procedendo ao reembolso integral
                  de eventuais valores já pagos.
                </p>
              </div>

              {/* 7 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">7. Entregas</h2>
                <p>
                  Os prazos de entrega indicados são meramente estimativos e não vinculativos, podendo
                  variar em função da disponibilidade de stock, localização e volume da encomenda. A
                  Frebrico empreenderá todos os esforços razoáveis para cumprir os prazos estimados e
                  informará o cliente em caso de atraso significativo.
                </p>
                <p className="mt-3">
                  Os custos de transporte serão comunicados ao cliente antes da confirmação da encomenda.
                  A entrega considera-se efetuada com a receção da mercadoria pelo cliente ou por pessoa
                  por si designada no endereço indicado na encomenda.
                </p>
              </div>

              {/* 8 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  8. Direito de Livre Resolução (Devoluções)
                </h2>
                <p>
                  Nos termos do Decreto-Lei n.º 24/2014, de 14 de fevereiro (que transpõe a Diretiva
                  2011/83/UE), o consumidor dispõe de um prazo de <strong>14 (catorze) dias corridos</strong>{" "}
                  para exercer o direito de livre resolução do contrato celebrado à distância, sem
                  necessidade de indicar qualquer motivo e sem incorrer em custos, para além dos custos
                  diretos de devolução da mercadoria.
                </p>
                <p className="mt-3">
                  O prazo inicia-se a partir do dia em que o consumidor ou um terceiro por si indicado
                  (que não o transportador) adquira a posse física dos bens. Para exercer este direito,
                  o consumidor deverá comunicar a sua decisão à Frebrico por escrito (email ou carta),
                  identificando claramente a encomenda em causa.
                </p>
                <p className="mt-3">
                  Os bens devolvidos devem encontrar-se no estado original, sem sinais de uso, na
                  embalagem original e acompanhados de todos os acessórios e documentação. A Frebrico
                  procederá ao reembolso no prazo máximo de 14 dias após a receção dos bens devolvidos
                  ou apresentação de prova de envio.
                </p>
                <p className="mt-3">
                  O direito de livre resolução não se aplica a bens produzidos de acordo com
                  especificações do consumidor (sob medida), bens selados que não possam ser devolvidos
                  por razões de proteção da saúde ou higiene e cujo selo tenha sido retirado após a
                  entrega, e demais situações previstas no artigo 17.º do referido diploma.
                </p>
              </div>

              {/* 9 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">9. Garantias</h2>
                <p>
                  Os bens vendidos pela Frebrico beneficiam da garantia legal de conformidade prevista no
                  Decreto-Lei n.º 84/2021, de 18 de outubro, pelo prazo de <strong>3 (três) anos</strong>{" "}
                  para bens novos, contados a partir da entrega. As não conformidades que se manifestem
                  no prazo de dois anos a contar da entrega presumem-se existentes à data da entrega do
                  bem, salvo quando tal for incompatível com a natureza do bem ou com as características
                  da falta de conformidade.
                </p>
                <p className="mt-3">
                  A garantia não cobre defeitos resultantes de uso indevido, instalação incorreta,
                  desgaste normal, negligência, alterações ou reparações efetuadas por terceiros não
                  autorizados, danos provocados por condições ambientais extremas ou acidentes.
                </p>
              </div>

              {/* 10 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">10. Propriedade Intelectual</h2>
                <p>
                  Todos os conteúdos do Site — incluindo, sem limitação, textos, fotografias, imagens,
                  ilustrações, gráficos, logótipos, marcas, nomes comerciais, design, software e código
                  fonte — são propriedade da Frebrico ou dos respetivos titulares de direitos, estando
                  protegidos pelas leis portuguesas e internacionais de propriedade intelectual e
                  industrial. É proibida a reprodução, distribuição, transformação, comunicação pública
                  ou qualquer outra forma de exploração dos conteúdos do Site sem autorização prévia e
                  escrita da Frebrico.
                </p>
              </div>

              {/* 11 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">11. Limitação de Responsabilidade</h2>
                <p>
                  A Frebrico não garante a disponibilidade contínua e ininterrupta do Site, podendo
                  ocorrer interrupções temporárias por razões de manutenção, atualização ou outras
                  circunstâncias de força maior. A Frebrico não será responsável por quaisquer danos
                  diretos ou indiretos decorrentes da utilização ou impossibilidade de utilização do Site,
                  incluindo, mas não se limitando a, danos causados por vírus, falhas de sistema,
                  interrupção de comunicações ou perda de dados.
                </p>
                <p className="mt-3">
                  Os links para websites de terceiros constantes deste Site são disponibilizados apenas
                  para conveniência do utilizador, não implicando qualquer responsabilidade da Frebrico
                  pelos conteúdos, políticas de privacidade ou práticas desses websites.
                </p>
              </div>

              {/* 12 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  12. Resolução Alternativa de Litígios
                </h2>
                <p>
                  Em caso de litígio de consumo, o consumidor pode recorrer a uma Entidade de Resolução
                  Alternativa de Litígios de consumo (RAL), nos termos da Lei n.º 144/2015, de 8 de
                  setembro. Poderá consultar a lista de entidades RAL disponível no site da Direção-Geral
                  do Consumidor em{" "}
                  <a
                    href="https://www.consumidor.gov.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#313b2e] underline hover:text-[#313b2e]/70"
                  >
                    www.consumidor.gov.pt
                  </a>
                  .
                </p>
                <p className="mt-3">
                  O consumidor pode igualmente recorrer à Plataforma Europeia de Resolução de Litígios em
                  Linha (RLL), disponível em{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#313b2e] underline hover:text-[#313b2e]/70"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  .
                </p>
              </div>

              {/* 13 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">
                  13. Livro de Reclamações Eletrónico
                </h2>
                <p>
                  A Frebrico disponibiliza o acesso ao Livro de Reclamações Eletrónico, nos termos do
                  Decreto-Lei n.º 156/2005, de 15 de setembro, na sua redação atual, acessível em{" "}
                  <a
                    href="https://www.livroreclamacoes.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#313b2e] underline hover:text-[#313b2e]/70"
                  >
                    www.livroreclamacoes.pt
                  </a>
                  .
                </p>
              </div>

              {/* 14 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">14. Lei Aplicável e Foro Competente</h2>
                <p>
                  Os presentes Termos são regidos pela lei portuguesa. Para a resolução de quaisquer
                  litígios emergentes da interpretação ou execução dos presentes Termos, é competente o
                  foro da comarca da sede da Frebrico, sem prejuízo de normas legais imperativas
                  aplicáveis, nomeadamente as que conferem ao consumidor o direito de demandar no foro
                  do seu domicílio.
                </p>
              </div>

              {/* 15 */}
              <div>
                <h2 className="text-xl font-semibold text-[#131313] mb-3">15. Contacto</h2>
                <p>
                  Para qualquer questão relacionada com os presentes Termos e Condições, o utilizador
                  poderá contactar a Frebrico através da{" "}
                  <Link to="/contact" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
                    página de contacto
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </DominoFadeInDown>
    </>
  );
}
