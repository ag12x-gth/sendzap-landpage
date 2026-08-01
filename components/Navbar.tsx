import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(13, 13, 13, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '16px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(0, 203, 111, 0.15)',
              border: '1px solid rgba(0, 203, 111, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0, 203, 111, 0.2)'
            }}
          >
            <Zap size={20} color="#00CB6F" fill="#00CB6F" />
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            send<span style={{ color: '#00CB6F' }}>zap</span>
          </span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#vantagens" style={{ color: '#E5E5E5', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}>
            Vantagens
          </a>
          <a href="#como-funciona" style={{ color: '#E5E5E5', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}>
            Como Funciona
          </a>
          <a href="#depoimentos" style={{ color: '#E5E5E5', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}>
            Depoimentos
          </a>
          <a href="#faqs" style={{ color: '#E5E5E5', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}>
            FAQs
          </a>
        </nav>

        {/* CTA Action Buttons */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#planos" className="btn-ghost">
            Entrar
          </a>
          <a href="#planos" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Ver Planos ⚡
          </a>
        </div>

        {/* Mobile Toggle Icon */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#161616',
            borderBottom: '1px solid #262626',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <a
            href="#vantagens"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
          >
            Vantagens
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
          >
            Como Funciona
          </a>
          <a
            href="#depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
          >
            Depoimentos
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
          >
            FAQs
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <a href="#planos" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Entrar
            </a>
            <a href="#planos" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Ver Planos ⚡
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-menu, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
