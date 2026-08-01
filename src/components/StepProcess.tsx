import React from 'react';
import { Box, RefreshCw, ShieldAlert, ArrowRight } from 'lucide-react';

export const StepProcess: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Conexão de Contas Isoladas",
      description: "Conecte seus números via QR Code com isolamento de IP e fingerprint de dispositivo para evitar associação de bloqueios entre contas.",
      icon: <Box size={28} color="#00CB6F" />,
      detail: "Isolamento via Proxies Dedicados"
    },
    {
      number: "02",
      title: "Aquecimento e Maturação",
      description: "Defina os parâmetros desejados e deixe nossa IA conversar entre suas instâncias simulando comportamento humano real de forma automatizada.",
      icon: <RefreshCw size={28} color="#00CB6F" />,
      detail: "Simulação de Diálogo Natural 24/7"
    },
    {
      number: "03",
      title: "Segurança Total e Disparo Blindado",
      description: "Dispare suas mensagens com proteção de saúde e contingência automática. Se um número oscilar, outro assume sem perder leads.",
      icon: <ShieldAlert size={28} color="#00CB6F" />,
      detail: "Failover Instantâneo em Milissegundos"
    }
  ];

  return (
    <section id="como-funciona" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px auto' }}>
          <span style={{ color: '#00CB6F', fontWeight: '700', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            PASSO A PASSO SIMPLES
          </span>
          <h2 className="heading-lg" style={{ marginTop: '10px', marginBottom: '16px' }}>
            Como funciona a Sendzap em 3 passos
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '17px' }}>
            Configuração rápida e guiada para você começar a aquecer seus chips hoje mesmo.
          </p>
        </div>

        {/* 3 Steps Row Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', position: 'relative' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(0, 203, 111, 0.12)',
                      border: '1px solid rgba(0, 203, 111, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '36px',
                      fontWeight: '800',
                      color: 'rgba(255, 255, 255, 0.15)',
                      fontFamily: 'monospace'
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '14px' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  {step.description}
                </p>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#0D0D0D',
                  border: '1px solid #262626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#00CB6F',
                  fontWeight: '600'
                }}
              >
                <ArrowRight size={14} />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
