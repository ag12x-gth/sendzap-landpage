import React, { useState } from 'react';
import { Play, Shield, Cpu, Radio, Signal, Lock, Zap } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const pills = [
    { icon: <Zap size={16} color="#00CB6F" />, label: "3 Cliques para Configurar" },
    { icon: <Shield size={16} color="#00CB6F" />, label: "Isolação Total de Instâncias" },
    { icon: <Cpu size={16} color="#00CB6F" />, label: "Simulador Humano Avançado" },
    { icon: <Lock size={16} color="#00CB6F" />, label: "Anti-Ban de Alta Performance" }
  ];

  return (
    <section id="vantagens" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Main Video & App Preview Frame */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            background: '#161616',
            border: '1px solid #262626',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0, 203, 111, 0.15)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {/* Mac Style Top Bar */}
          <div
            style={{
              padding: '14px 20px',
              background: '#0D0D0D',
              borderBottom: '1px solid #262626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Signal size={14} color="#00CB6F" /> Sendzap Cluster Active — Maturação & Proteção em Execução
            </div>
            <div style={{ width: '50px' }} />
          </div>

          {/* Video / Interactive Dashboard Mock */}
          <div
            style={{
              position: 'relative',
              minHeight: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, #161616 0%, #0D0D0D 100%)',
              padding: '40px 24px'
            }}
          >
            {/* Grid Overlay Graphic */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }}
            />

            {!isPlaying ? (
              <div style={{ textAlign: 'center', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <button
                  onClick={() => setIsPlaying(true)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: '#00CB6F',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 40px rgba(0, 203, 111, 0.5)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 203, 111, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 203, 111, 0.5)';
                  }}
                  aria-label="Assistir demonstração"
                >
                  <Play size={36} color="#000000" fill="#000000" style={{ marginLeft: '4px' }} />
                </button>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '18px', marginBottom: '4px' }}>
                    Veja a Sendzap em Ação (2 min)
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    Entenda como aquecer chips e evitar bloqueios automaticamente
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: '800px', zIndex: 2 }}>
                <div
                  style={{
                    background: '#0D0D0D',
                    borderRadius: '16px',
                    border: '1px solid #262626',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Radio size={20} color="#00CB6F" className="animate-pulse" />
                      <span style={{ fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>Simulação de Maturação Humana</span>
                    </div>
                    <span style={{ background: 'rgba(0, 203, 111, 0.15)', color: '#00CB6F', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px' }}>
                      ● AO VIVO (99.8% Saúde)
                    </span>
                  </div>

                  {/* Simulated Chip Progress Bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { name: 'Chip Comercial #1 (+55 11 98765-4321)', progress: 98, status: 'Maturado & Blindado', speed: '240 msg/dia' },
                      { name: 'Chip Contingência #2 (+55 11 97654-3210)', progress: 85, status: 'Aquecimento Avançado', speed: '180 msg/dia' },
                      { name: 'Chip Disparo #3 (+55 21 96543-2109)', progress: 62, status: 'Aquecimento Inicial', speed: '90 msg/dia' },
                    ].map((chip, idx) => (
                      <div key={idx} style={{ background: '#161616', padding: '16px', borderRadius: '12px', border: '1px solid #262626' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                          <span style={{ fontWeight: '600', color: '#FFFFFF' }}>{chip.name}</span>
                          <span style={{ color: '#00CB6F', fontWeight: '700' }}>{chip.status}</span>
                        </div>
                        <div style={{ height: '8px', width: '100%', background: '#262626', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${chip.progress}%`, background: 'linear-gradient(90deg, #00CB6F, #00E37C)', borderRadius: '4px', transition: 'width 1s ease' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                          <span>Frequência IA: {chip.speed}</span>
                          <span>Score de Segurança: {chip.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlaying(false)}
                    style={{
                      marginTop: '20px',
                      background: 'transparent',
                      border: '1px solid #333',
                      color: 'rgba(255,255,255,0.7)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      width: '100%'
                    }}
                  >
                    Fechar Demonstração Interactive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Pills under Video */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '36px'
          }}
        >
          {pills.map((pill, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '999px',
                background: activeTab === idx ? 'rgba(0, 203, 111, 0.15)' : '#161616',
                border: activeTab === idx ? '1px solid #00CB6F' : '1px solid #262626',
                color: activeTab === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {pill.icon}
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
