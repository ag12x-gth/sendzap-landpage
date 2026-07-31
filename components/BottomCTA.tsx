import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export const BottomCTA: React.FC = () => {
  return (
    <section style={{ padding: '80px 0 100px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div
          className="glass-card"
          style={{
            padding: '60px 32px',
            textAlign: 'center',
            background: 'radial-gradient(circle at 50% 0%, rgba(0, 203, 111, 0.25) 0%, #161616 80%)',
            border: '1px solid #00CB6F',
            boxShadow: '0 0 50px rgba(0, 203, 111, 0.2)',
            borderRadius: '28px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(0, 203, 111, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={26} color="#00CB6F" fill="#00CB6F" />
            </div>
          </div>

          <h2 className="heading-lg" style={{ marginBottom: '20px', color: '#FFFFFF' }}>
            Pronto para nunca mais perder chips e escalar suas vendas?
          </h2>

          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '680px',
              margin: '0 auto 36px auto',
              lineHeight: '1.6'
            }}
          >
            Assine a inteligência Sendzap e blinde sua operação contra bloqueios no WhatsApp hoje mesmo.
          </p>

          <a
            href="#planos"
            className="btn-primary"
            style={{
              fontSize: '18px',
              padding: '18px 42px',
              borderRadius: '14px',
            }}
          >
            <span>Ver Planos Disponíveis</span>
            <Zap size={22} fill="#000000" />
          </a>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
            <ShieldCheck size={16} color="#00CB6F" /> Satisfação Garantida ou Reembolso em 7 dias
          </div>
        </div>
      </div>
    </section>
  );
};
