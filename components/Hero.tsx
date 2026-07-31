import React from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section style={{ padding: '80px 0 60px 0', position: 'relative', textAlign: 'center' }}>
      {/* Radial purple/blue ambient glow behind hero */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1200px',
          height: '650px',
          background: 'radial-gradient(ellipse at center, rgba(112, 23, 255, 0.45) 0%, rgba(46, 8, 102, 0.3) 45%, rgba(8, 3, 18, 0) 75%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '920px' }}>
        {/* Top Tag / Pill Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div className="pill-badge animate-float">
            <Sparkles size={16} />
            <span>Maturador & Isolador de Chips nº 1 para WhatsApp</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="heading-xl" style={{ marginBottom: '24px' }}>
          Chega de bloqueios no WhatsApp.{' '}
          <span className="text-gradient-green">Aquecimento e maturação automática</span> em 3 cliques.
        </h1>

        {/* Subtitle Copy */}
        <p
          style={{
            fontSize: '19px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            fontWeight: '400'
          }}
        >
          A única plataforma inteligente que simula conversas humanas realistas, isola suas instâncias e garante contingência blindada para operações de disparo e atendimento.
        </p>

        {/* CTA Button & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <a
            href="#planos"
            className="btn-primary"
            style={{
              fontSize: '18px',
              padding: '18px 40px',
              borderRadius: '14px',
            }}
          >
            <span>Ver Planos Disponíveis</span>
            <Zap size={22} fill="#000000" />
          </a>

          {/* Micro Guarantee Copy */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#00CB6F" /> Sem cartão no cadastro
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#00CB6F" /> Configuração em 2 minutos
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#00CB6F" /> Garantia total anti-ban
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
