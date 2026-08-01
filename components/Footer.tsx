import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid #262626',
        padding: '48px 0 32px 0',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(0, 203, 111, 0.15)',
                border: '1px solid rgba(0, 203, 111, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={18} color="#00CB6F" fill="#00CB6F" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              send<span style={{ color: '#00CB6F' }}>zap</span>
            </span>
          </div>

          {/* Institutional Links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="#vantagens" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Vantagens
            </a>
            <a href="#como-funciona" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Como Funciona
            </a>
            <a href="#planos" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Planos
            </a>
            <a href="#faqs" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Perguntas Frequentes
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Termos de Uso
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Privacidade
            </a>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          style={{
            borderTop: '1px solid #1c1c1c',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span>Sendzap © 2026. Todos os direitos reservados.</span>
          <span>Tecnologia de Maturação & Contingência em WhatsApp</span>
        </div>
      </div>
    </footer>
  );
};
