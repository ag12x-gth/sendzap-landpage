import React from 'react';
import { Flame, Send, ShieldCheck, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', background: 'rgba(22, 22, 22, 0.4)', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} />
            <span>TECNOLOGIA EXCLUSIVA SENDZAP</span>
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
            Tecnologia de ponta para automatizar a saúde do seu WhatsApp
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '17px', lineHeight: '1.6' }}>
            Tudo o que sua operação precisa para rodar dispara em massa e atendimento consultivo sem medo de perder números.
          </p>
        </div>

        {/* 3 AI Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Card 1: Aquecimento em Massa */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(0, 203, 111, 0.15)',
                  border: '1px solid rgba(0, 203, 111, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}
              >
                <Flame size={24} color="#00CB6F" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px' }}>
                Aquecimento em massa
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                Maturação progressiva de chips simulando padrões de digitação humanos, horários realistas e trocas de mensagens contextuais.
              </p>
            </div>

            {/* Visual Widget 1 */}
            <div style={{ background: '#0D0D0D', borderRadius: '14px', padding: '18px', border: '1px solid #262626' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Maturação em Lote</span>
                <span style={{ color: '#00CB6F', fontWeight: '700' }}>+450% Eficiência</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px', paddingTop: '10px' }}>
                {[40, 65, 80, 55, 95, 85, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${h}%`,
                        background: i === 6 ? '#00CB6F' : 'rgba(0, 203, 111, 0.3)',
                        borderRadius: '4px',
                        transition: 'height 0.5s ease'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Disparo Inteligente */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(0, 203, 111, 0.15)',
                  border: '1px solid rgba(0, 203, 111, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}
              >
                <Send size={24} color="#00CB6F" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px' }}>
                Disparo Inteligente
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                Distribua mensagens entre chips maturados com intervalos dinâmicos calculados por IA para proteger a saúde das suas contas.
              </p>
            </div>

            {/* Visual Widget 2 */}
            <div style={{ background: '#0D0D0D', borderRadius: '14px', padding: '18px', border: '1px solid #262626' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161616', padding: '10px 14px', borderRadius: '8px', border: '1px solid #262626' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF' }}>
                    <MessageSquare size={16} color="#00CB6F" /> Rotação de Chips Ativa
                  </div>
                  <span style={{ fontSize: '11px', color: '#00CB6F', background: 'rgba(0,203,111,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>OK</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161616', padding: '10px 14px', borderRadius: '8px', border: '1px solid #262626' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF' }}>
                    <CheckCircle2 size={16} color="#00CB6F" /> Intervalo Humano Adaptativo
                  </div>
                  <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '600' }}>12s–35s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Ativar Campanhas Sem Risco */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(0, 203, 111, 0.15)',
                  border: '1px solid rgba(0, 203, 111, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}
              >
                <ShieldCheck size={24} color="#00CB6F" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px' }}>
                Ativar as Campanhas sem Risco de Perda
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                Contingência ativa instantânea. Se um chip sofrer aviso, o sistema redireciona o tráfego em milissegundos sem interromper a operação.
              </p>
            </div>

            {/* Visual Widget 3 */}
            <div style={{ background: '#0D0D0D', borderRadius: '14px', padding: '18px', border: '1px solid #262626' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: '600' }}>Escudo de Proteção</span>
                <span style={{ fontSize: '12px', color: '#00CB6F', fontWeight: '700' }}>100% Protegido</span>
              </div>
              <div style={{ height: '6px', background: '#262626', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: '#00CB6F' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
