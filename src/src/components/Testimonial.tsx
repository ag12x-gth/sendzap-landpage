import React from 'react';
import { Star, TrendingUp, Users, MessageSquare } from 'lucide-react';

export const Testimonial: React.FC = () => {
  return (
    <section id="depoimentos" style={{ padding: '80px 0', background: 'rgba(22, 22, 22, 0.4)', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Testimonial Quote Card */}
        <div
          className="glass-card"
          style={{
            padding: '48px 40px',
            background: 'linear-gradient(135deg, #161616 0%, #0D0D0D 100%)',
            border: '1px solid rgba(0, 203, 111, 0.3)',
            position: 'relative',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} color="#FFBD2E" fill="#FFBD2E" />
            ))}
          </div>

          <p
            style={{
              fontSize: '22px',
              lineHeight: '1.5',
              color: '#FFFFFF',
              fontWeight: '600',
              maxWidth: '820px',
              margin: '0 auto 28px auto',
              fontStyle: 'italic'
            }}
          >
            "A Sendzap foi a única solução que zerou nossa taxa de bloqueios em campanhas de escala. Conseguimos rodar mais de 50 mil disparos/dia sem perder chips."
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '28px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#00CB6F' }}>
              Vinicius Junior
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
              CEO da LexyIA
            </span>
          </div>

          <a href="#planos" className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
            Quero Escalar sem Bloqueios ⚡
          </a>
        </div>

        {/* Social Proof Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginTop: '60px',
            textAlign: 'center'
          }}
        >
          <div style={{ background: '#161616', padding: '24px', borderRadius: '16px', border: '1px solid #262626' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <Users size={24} color="#00CB6F" />
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              2.475+
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
              Contas Maturadas Ativas
            </div>
          </div>

          <div style={{ background: '#161616', padding: '24px', borderRadius: '16px', border: '1px solid #262626' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <MessageSquare size={24} color="#00CB6F" />
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              31MM+
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
              Mensagens Processadas
            </div>
          </div>

          <div style={{ background: '#161616', padding: '24px', borderRadius: '16px', border: '1px solid #262626' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <TrendingUp size={24} color="#00CB6F" />
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              4.8 / 5.0
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
              Satisfação Média dos Clientes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
