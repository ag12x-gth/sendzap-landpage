import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Quantas contas posso conectar na Sendzap?",
      a: "Você pode conectar a quantidade de contas contratada no seu plano (por exemplo, 5, 10 ou 20 chips no plano base, com a opção de expansão sob demanda para qualquer volume)."
    },
    {
      q: "Posso comprar mais de um plano?",
      a: "Sim! Você pode contratar múltiplos planos caso gerencie operações separadas ou precise de uma estrutura expandida de contingência."
    },
    {
      q: "Como solicitar suporte?",
      a: "O suporte é prestado através do nosso canal oficial no WhatsApp e grupo dedicado (para assinantes Pro e Premium), além de documentação completa e tutoriais em vídeo."
    },
    {
      q: "O que acontece se eu não fizer a maturação dos meus chips?",
      a: "Chips novos sem aquecimento prévio sofrem banimento quase imediato ao realizar disparos em massa. A maturação simula interações humanas realistas para construir reputação positiva junto aos servidores do WhatsApp."
    },
    {
      q: "Qual a diferença entre a Sendzap e outras soluções do mercado?",
      a: "A Sendzap utiliza algoritmo avançado de IA comportamental que simula digitação humana natural, variação de horários e troca de áudios/textos com isolamento exclusivo de IP e fingerprint por chip."
    },
    {
      q: "A Sendzap faz disparo de mensagens?",
      a: "Sim! Temos um módulo integrado para disparo inteligente que distribui suas mensagens entre chips maturados com intervalos calculados dinamicamente para proteger a saúde das suas contas."
    },
    {
      q: "Posso usar a Sendzap junto com ferramentas de automação?",
      a: "Perfeitamente. A Sendzap opera de forma transparente em conjunto com N8N, Typebot, ManyChat, Make, Evolution API e sistemas proprietários via webhook/API."
    },
    {
      q: "Quanto tempo leva para maturar um chip?",
      a: "O ciclo de aquecimento recomendado é de 3 a 7 dias, momento em que o chip atinge a maturação ideal para suportar altas cargas de disparo e atendimento."
    },
    {
      q: "O que está incluso no bônus de chips adicionais?",
      a: "Os bônus concedem slots de aquecimento extras totalmente gratuitos nos planos Pro e Premium, permitindo que você mantenha números de contingência maturando sem pagar nada a mais."
    },
    {
      q: "Posso solicitar suporte a qualquer momento?",
      a: "Nosso suporte atende de segunda a sexta em horário comercial, contando também com suporte 24/7 prioritário exclusivo para planos Premium."
    },
    {
      q: "Existe algum tipo de garantia?",
      a: "Sim, oferecemos 7 dias de garantia incondicional de reembolso. Se por qualquer motivo você decidir que a ferramenta não atende sua necessidade, devolvemos 100% do valor."
    },
    {
      q: "Como funciona a renovação do plano?",
      a: "A renovação é mensal e automática. Você pode cancelar ou alterar de plano a qualquer momento no seu painel sem multas, carência ou fidelidade."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" style={{ padding: '90px 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <HelpCircle size={14} />
            <span>TIRA-DÚVIDAS</span>
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
            Perguntas Frequentes (FAQs)
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '17px' }}>
            Tudo o que você precisa saber antes de iniciar sua assinatura.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#161616',
                  border: isOpen ? '1px solid #00CB6F' : '1px solid #262626',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: isOpen ? '#00CB6F' : 'rgba(255, 255, 255, 0.5)',
                      flexShrink: 0,
                      marginLeft: '16px'
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '16px'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
