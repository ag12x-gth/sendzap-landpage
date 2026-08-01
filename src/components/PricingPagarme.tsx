import React, { useState, useEffect, useRef } from 'react';
import { Check, Zap, Tag, X, Clock, ShoppingBag } from 'lucide-react';

interface PurchaseProof {
  name: string;
  city: string;
  plan: string;
  time: string;
  avatar: string;
}

const PURCHASE_POOL: PurchaseProof[] = [
  { name: "Matheus S.", city: "São Paulo - SP", plan: "Plano PRO (10 Chips)", time: "há 2 min", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
  { name: "Lucas M.", city: "Belo Horizonte - MG", plan: "Plano MAX (20 Chips)", time: "há 1 min", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { name: "Camila R.", city: "Rio de Janeiro - RJ", plan: "Plano BLACK Anual", time: "há 4 min", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { name: "Rodrigo F.", city: "Curitiba - PR", plan: "Plano PRO (10 Chips)", time: "há 3 min", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
  { name: "Beatriz A.", city: "Porto Alegre - RS", plan: "Plano Starter (5 Chips)", time: "há 6 min", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" },
  { name: "Rafael B.", city: "Campinas - SP", plan: "Plano MAXX Anual", time: "há 2 min", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" },
  { name: "Gustavo H.", city: "Brasília - DF", plan: "Plano PRO (10 Chips)", time: "há 1 min", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" },
  { name: "Larissa M.", city: "Florianópolis - SC", plan: "Plano BLACK Anual", time: "há 5 min", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
  { name: "Vinícius P.", city: "Goiânia - GO", plan: "Plano MAX (20 Chips)", time: "há 2 min", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
  { name: "Fernanda T.", city: "Salvador - BA", plan: "Plano PRO (10 Chips)", time: "há 4 min", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
  { name: "Felipe S.", city: "Recife - PE", plan: "Plano SAFIRR Anual", time: "há 8 min", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80" },
  { name: "Juliana K.", city: "Vitória - ES", plan: "Plano MAXX Anual", time: "há 3 min", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" }
];

const getRandomElapsedTime = (): string => {
  const totalMinutes = Math.floor(Math.random() * 2879) + 1; // 1 to 2879 min (up to 48h)
  if (totalMinutes < 60) {
    return `há ${totalMinutes} min`;
  } else if (totalMinutes < 1440) {
    const hours = Math.floor(totalMinutes / 60);
    return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else {
    const days = Math.floor(totalMinutes / 1440);
    return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
  }
};

export const PricingPagarme: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal');
  const [chipTier, setChipTier] = useState<number>(10);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  
  // Toast Mode: 'voucher' | 'expiration' | 'expired' | 'closed'
  const [toastMode, setToastMode] = useState<'voucher' | 'expiration' | 'expired' | 'closed'>('closed');
  const [countdown, setCountdown] = useState<number>(420); // 7 minutes (420 seconds)
  const [isVoucherExpired, setIsVoucherExpired] = useState<boolean>(false);

  // Checkout Modal State (Pagar.me v5 Standard Link)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  
  // Dados do Cliente Básicos
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string>('');
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);


  // Social Proof Toast State
  const [currentSocialProof, setCurrentSocialProof] = useState<PurchaseProof | null>(null);
  const unusedProofIndices = useRef<number[]>(PURCHASE_POOL.map((_, i) => i));

  const sectionRef = useRef<HTMLElement | null>(null);

  const mapPlanToProductID = (planName: string, cycle: 'mensal' | 'anual'): string => {
    const lowerName = planName.toLowerCase();
    if (cycle === 'mensal') {
      if (lowerName.includes('teste')) return 'sendzap_test_mensal';
      if (lowerName.includes('starter')) return 'sendzap_starter_mensal';
      if (lowerName.includes('pro')) return 'sendzap_pro_mensal';
      if (lowerName.includes('max')) return 'sendzap_max_mensal';
    } else {
      if (lowerName.includes('safirr') || lowerName.includes('starter')) return 'sendzap_starter_anual';
      if (lowerName.includes('black') || lowerName.includes('pro')) return 'sendzap_pro_anual';
      if (lowerName.includes('maxx') || lowerName.includes('max')) return 'sendzap_max_anual';
    }
    return 'sendzap_pro_mensal'; // fallback seguro
  };

  useEffect(() => {
    const handlePageShow = () => {
      setIsSubmittingCheckout(false);
      setIsCheckoutModalOpen(false);
      
      
      setCheckoutSuccess(false);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const handleOpenCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setIsCheckoutModalOpen(true);
  };


  const handleConfirmCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadEmail.includes('@')) {
      setCheckoutError('Por favor, insira um e-mail válido para continuar.');
      return;
    }

    setIsSubmittingCheckout(true);
    setCheckoutError('');

    const productId = mapPlanToProductID(selectedPlan?.name || '', billingCycle);

    try {
      const response = await fetch('https://agente-funil-checkout-production.up.railway.app/api/v1/checkout/sendzap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          lead_email: leadEmail,
          customer_name: customerName,
          manychat_id: ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar link de pagamento. Tente novamente.');
      }

      if (data.checkout_url) {
        setCheckoutSuccess(true);
        window.location.href = data.checkout_url;
      } else {
        throw new Error('URL de checkout não retornada pelo servidor.');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'Falha na conexão com servidor. Verifique sua rede.');
      setIsSubmittingCheckout(false);
    }
  };


  // Visit Count & Expiration Tracker (localStorage)
  useEffect(() => {
    try {
      const now = Date.now();
      const rawCount = localStorage.getItem('sendzap_visit_count');
      const rawFirstVisit = localStorage.getItem('sendzap_first_visit_time');

      let count = rawCount ? parseInt(rawCount, 10) : 0;
      count += 1;
      localStorage.setItem('sendzap_visit_count', count.toString());

      let firstVisit = rawFirstVisit ? parseInt(rawFirstVisit, 10) : now;
      if (!rawFirstVisit) {
        localStorage.setItem('sendzap_first_visit_time', now.toString());
      }

      const elapsedMinutes = (now - firstVisit) / (1000 * 60);

      // Expire if visit count >= 3 OR first visit was > 11 minutes ago
      if (count >= 3 || elapsedMinutes >= 11) {
        setIsVoucherExpired(true);
        setToastMode('expired');
      }
    } catch {
      // Fallback if localStorage is restricted
    }
  }, []);

  // Scroll Trigger Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
            setToastMode((prev) => {
              if (prev === 'expired') return 'expired';
              return prev === 'closed' ? 'voucher' : prev;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 15 seconds timer to switch from 'voucher' to 'expiration'
  useEffect(() => {
    if (toastMode === 'voucher') {
      const timer = setTimeout(() => {
        setToastMode('expiration');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [toastMode]);

  // Live 7-minute countdown decrement
  useEffect(() => {
    if (toastMode === 'expiration') {
      if (countdown > 0) {
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              setIsVoucherExpired(true);
              setToastMode('expired');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setIsVoucherExpired(true);
        setToastMode('expired');
      }
    }
  }, [toastMode, countdown]);

  // Social proof purchase notifications scheduler (Non-Repeating with Dynamic Random Elapsed Time)
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const triggerNextProof = () => {
      if (unusedProofIndices.current.length === 0) return; // Pool exhausted, never repeat

      const randomIndex = Math.floor(Math.random() * unusedProofIndices.current.length);
      const selectedPoolIndex = unusedProofIndices.current[randomIndex];

      // Remove selected index so it NEVER repeats
      unusedProofIndices.current.splice(randomIndex, 1);

      const rawProof = PURCHASE_POOL[selectedPoolIndex];
      setCurrentSocialProof({
        ...rawProof,
        time: getRandomElapsedTime()
      });

      // Hide toast after 6 seconds
      hideTimer = setTimeout(() => {
        setCurrentSocialProof(null);

        // Schedule next proof after 12-18 seconds delay
        if (unusedProofIndices.current.length > 0) {
          const delay = Math.floor(Math.random() * 6000) + 12000;
          nextTimer = setTimeout(triggerNextProof, delay);
        }
      }, 6000);
    };

    // First social proof appears 4 seconds after mounting
    const initialTimer = setTimeout(triggerNextProof, 4000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const plansData = {
    mensal: [
      {
        chips: 1,
        name: "TESTE",
        price: "3,00",
        originalPrice: "6,00",
        period: "/teste",
        popular: false,
        badge: "TESTE",
        subtext: "Apenas para teste de webhook",
        description: "Compre este plano para verificar se o evento InfinitePay está chegando no painel do Webhook.",
        features: [
          "Dispara Webhook 100%",
          "Custo de R$ 3,00 (PIX)"
        ],
        cta: "COMPRAR TESTE ⚡"
      },
      {
        chips: 5,
        name: "Starter",
        price: "139,77",
        originalPrice: "279,54",
        period: "/mês",
        popular: false,
        badge: "",
        subtext: "5 chips no total",
        description: "Ideal para operações iniciais de aquecimento e disparo.",
        features: [
          "5 Chips no total (5 base + 0 bônus)",
          "Relatórios de maturação por chip",
          "Suporte WhatsApp: Horário comercial, sem prioridade",
          "Overview básico de métricas",
          "Pagamento 100% seguro"
        ],
        cta: "Garantir Plano Starter ⚡"
      },
      {
        chips: 10,
        name: "PRO",
        price: "198,77",
        originalPrice: "397,54",
        period: "/mês",
        popular: true,
        badge: "★ RECOMENDADO",
        subtext: "10 chips no total",
        description: "A estrutura favorita da comunidade Sendzap.",
        features: [
          "10 Chips no total (5 base + 5 bônus)",
          "Relatórios de maturação por chip",
          "Suporte WhatsApp: Horário comercial, com prioridade",
          "Overview completo de métricas",
          "Grupo Individual com time Sendzap"
        ],
        cta: "Garantir Plano PRO ⚡"
      },
      {
        chips: 20,
        name: "MAX",
        price: "358,77",
        originalPrice: "717,54",
        period: "/mês",
        popular: false,
        badge: "",
        subtext: "20 chips no total",
        description: "Para quem necessita de alta escala e contingência total.",
        features: [
          "20 Chips no total (10 base + 5 bônus)",
          "Relatórios de maturação por chip",
          "Suporte WhatsApp: Prioridade HIGH",
          "Overview avançado",
          "Plano de Contingência para Escala"
        ],
        cta: "Garantir Plano MAX ⚡"
      }
    ],
    anual: [
      {
        chips: 5,
        name: "SAFIRR",
        price: "1.007,77",
        originalPrice: "2.015,54",
        period: "/ano",
        popular: false,
        badge: "",
        subtext: "≈ R$ 84/mês (≈ R$ 201/chip/ano)",
        description: "Plano anual de entrada com 5 chips incluídos.",
        features: [
          "5 Chips incluídos no plano",
          "Custo médio: ≈ R$ 84/mês",
          "Custo por chip: ≈ R$ 201/chip/ano",
          "Suporte WhatsApp: Horário comercial, prioridade normal",
          "Sem janelas agendadas"
        ],
        cta: "Garantir Plano SAFIRR ⚡"
      },
      {
        chips: 10,
        name: "BLACK",
        price: "1.419,77",
        originalPrice: "2.839,54",
        period: "/ano",
        popular: true,
        badge: "★ MAIS VENDIDO",
        subtext: "≈ R$ 118/mês (≈ R$ 142/chip/ano)",
        description: "Plano anual VIP para 10 chips e suporte prioritário.",
        features: [
          "10 Chips incluídos no plano",
          "Custo médio: ≈ R$ 118/mês",
          "Custo por chip: ≈ R$ 142/chip/ano",
          "Suporte WhatsApp: Prioridade máxima",
          "Janelas de atendimento mensais via WhatsApp"
        ],
        cta: "Garantir Plano BLACK ⚡"
      },
      {
        chips: 20,
        name: "MAXX",
        price: "2.148,77",
        originalPrice: "4.297,54",
        period: "/ano",
        popular: false,
        badge: "",
        subtext: "≈ R$ 179/mês (≈ R$ 107/chip/ano)",
        description: "Estrutura anual máxima com 20 chips e janelas semanais.",
        features: [
          "20 Chips incluídos no plano",
          "Custo médio: ≈ R$ 179/mês",
          "Custo por chip: ≈ R$ 107/chip/ano (Melhor Valor)",
          "Suporte WhatsApp: Prioridade máxima",
          "Janelas quinzenais ou semanais via WhatsApp"
        ],
        cta: "Garantir Plano MAXX ⚡"
      }
    ]
  };

  const currentPlans = plansData[billingCycle];



  return (
    <section id="planos" ref={sectionRef} style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Zap size={14} />
            <span>PLANOS DE INVESTIMENTO</span>
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
            Escolha o plano ideal para a sua estrutura
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '17px' }}>
            Pagamento 100% seguro e transparente.
          </p>

          {/* Toggle Mensal / Anual */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '28px',
              padding: '6px',
              borderRadius: '100px',
              background: '#161616',
              border: '1px solid #262626'
            }}
          >
            <button
              onClick={() => setBillingCycle('mensal')}
              style={{
                padding: '10px 28px',
                borderRadius: '100px',
                border: 'none',
                background: billingCycle === 'mensal' ? '#00CB6F' : 'transparent',
                color: billingCycle === 'mensal' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('anual')}
              style={{
                padding: '10px 28px',
                borderRadius: '100px',
                border: 'none',
                background: billingCycle === 'anual' ? '#00CB6F' : 'transparent',
                color: billingCycle === 'anual' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Anual <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>ECONOMIA</span>
            </button>
          </div>

          {/* Chips Selector */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginTop: '20px'
            }}
          >
            {[5, 10, 20].map((chips) => (
              <button
                key={chips}
                onClick={() => setChipTier(chips)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '100px',
                  border: chipTier === chips ? '1px solid #00CB6F' : '1px solid #262626',
                  background: chipTier === chips ? 'rgba(0, 203, 111, 0.12)' : '#161616',
                  color: chipTier === chips ? '#00CB6F' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Até {chips} chips
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
          {currentPlans.map((plan, idx) => {
            const isSelected = chipTier === plan.chips;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderColor: plan.popular || isSelected ? '#00CB6F' : '#262626',
                  boxShadow: plan.popular || isSelected ? '0 0 30px rgba(0, 203, 111, 0.25)' : 'none',
                  background: plan.popular || isSelected ? 'linear-gradient(180deg, rgba(0,203,111,0.08) 0%, #161616 100%)' : '#161616',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#00CB6F',
                      color: '#000000',
                      fontWeight: '800',
                      fontSize: '12px',
                      padding: '4px 16px',
                      borderRadius: '999px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      boxShadow: '0 0 12px rgba(0, 203, 111, 0.5)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#00CB6F', fontWeight: '700', marginBottom: '8px' }}>
                    {plan.subtext}
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', minHeight: '42px', marginBottom: '20px' }}>
                    {plan.description}
                  </p>

                  {/* 50% OFF Original Price & Dynamic Discount Display */}
                  <div style={{ minHeight: '80px', marginBottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {!isVoucherExpired && (
                      <div
                        className={isSectionVisible ? "price-strike-active" : ""}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '4px'
                        }}
                      >
                        <span className="price-strike-line">
                          De R$ {plan.originalPrice}{plan.period}
                        </span>
                        {isSectionVisible && (
                          <span
                            className="discount-badge-pop"
                            style={{
                              background: 'linear-gradient(135deg, #00CB6F 0%, #009953 100%)',
                              color: '#000000',
                              fontSize: '11px',
                              fontWeight: '900',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              boxShadow: '0 0 10px rgba(0, 203, 111, 0.5)',
                              letterSpacing: '0.05em'
                            }}
                          >
                            50% OFF
                          </span>
                        )}
                      </div>
                    )}

                    <div className={(isSectionVisible && !isVoucherExpired) ? "discount-price-drop" : ""} style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#00CB6F' }}>R$</span>
                      <span style={{ fontSize: '42px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500' }}>{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(0, 203, 111, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Check size={13} color="#00CB6F" strokeWidth={3} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenCheckout(plan)}
                  className={plan.popular || isSelected ? "btn-primary" : "btn-secondary"}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', border: 'none', cursor: 'pointer' }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Voucher Applied Toast (First 15 Seconds) */}
      {toastMode === 'voucher' && (
        <div className="voucher-toast-container">
          <div className="voucher-toast">
            <div className="green-pulse-dot" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '800', color: '#00CB6F' }}>
                <Tag size={14} />
                <span>VOUCHER APLICADO: SENDZAP50</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.3 }}>
                Desconto de <strong>50% OFF</strong> ativado automaticamente para a sua sessão!
              </p>
            </div>
            <button
              onClick={() => setToastMode('closed')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'color 0.2s ease'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating 7-Minute Expiration Countdown Toast (No X button per requirement) */}
      {toastMode === 'expiration' && (
        <div className="voucher-toast-container">
          <div className="timer-toast">
            <div className="red-pulse-dot" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '900', color: '#FF4757' }}>
                <Clock size={15} />
                <span>SEU VOUCHER EXPIRA EM: <strong style={{ fontSize: '15px', color: '#FFFFFF', background: 'rgba(255, 71, 87, 0.25)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(255, 71, 87, 0.5)' }}>{formatTimer(countdown)}</strong></span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.3 }}>
                Garanta o desconto de <strong>50% OFF</strong> antes que a oferta expire!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Expired Toast (Triggered on >= 3 visits or > 11min elapsed or timer 00:00) */}
      {toastMode === 'expired' && (
        <div className="voucher-toast-container">
          <div
            className="expired-toast"
            style={{
              background: 'linear-gradient(135deg, rgba(28, 14, 16, 0.96) 0%, rgba(18, 18, 22, 0.96) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 71, 87, 0.45)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 71, 87, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxWidth: '380px',
              width: '100%',
              color: '#FFFFFF',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF4757', fontWeight: '900', fontSize: '13px', letterSpacing: '0.04em' }}>
              <div className="red-pulse-dot" />
              <span>VOUCHER EXPIRADO - 50% OFF</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.4 }}>
              O seu voucher de 50% OFF expirou. Para solicitar a reativação do desconto com a nossa equipe, envie uma mensagem no WhatsApp:
            </p>
            <a
              href="https://wa.me/5564999526870?text=Ol%C3%A1%2C%20gostaria%20de%20resgatar%20meu%20voucher%20de%2050%25%20OFF"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '13px',
                padding: '10px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 0 15px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.2s ease',
                marginTop: '4px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Solicitar Resgate no WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating Social Proof Purchase Toast (Non-Repeating) */}
      {currentSocialProof && (
        <div className="social-proof-container">
          <div className="social-proof-toast">
            <img
              src={currentSocialProof.avatar}
              alt={currentSocialProof.name}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #00CB6F',
                boxShadow: '0 0 10px rgba(0, 203, 111, 0.4)',
                flexShrink: 0
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>{currentSocialProof.name}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.45)', fontWeight: '500' }}>{currentSocialProof.time}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>{currentSocialProof.city}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: '#00CB6F', marginTop: '1px' }}>
                <ShoppingBag size={11} />
                <span>Garantiu o {currentSocialProof.plan}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Checkout Pagar.me v5 */}
      {isCheckoutModalOpen && selectedPlan && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#161616',
              border: '1px solid #00CB6F',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0, 203, 111, 0.25)',
              position: 'relative',
              color: '#FFFFFF'
            }}
          >
            <button
              onClick={() => {
                setIsCheckoutModalOpen(false);
                setIsSubmittingCheckout(false);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00CB6F', fontWeight: '800', fontSize: '14px', marginBottom: '12px' }}>
              <Zap size={16} />
              <span>FINALIZAR ASSINATURA SENDZAP</span>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}>
              {selectedPlan.name} ({billingCycle === 'mensal' ? 'Mensal' : 'Anual'})
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
              Finalize seu pagamento de forma 100% segura.
            </p>

            {checkoutSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 203, 111, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Check size={30} color="#00CB6F" />
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#00CB6F', marginBottom: '8px' }}>Pagamento Aprovado!</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Redirecionando você para o acesso...</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>
                  Preencha seus dados básicos abaixo. Você será redirecionado para o ambiente 100% seguro da Pagar.me para concluir o pagamento.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.9)' }}>
                      Nome Completo *
                    </label>
                    <input type="text" required placeholder="Seu nome" value={customerName} onChange={(e: any) => setCustomerName(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0D0D0D', border: '1px solid #262626', color: '#FFF', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.9)' }}>
                      E-mail Principal *
                    </label>
                    <input type="email" required placeholder="exemplo@empresa.com" value={leadEmail} onChange={(e: any) => setLeadEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0D0D0D', border: '1px solid #262626', color: '#FFF', fontSize: '14px', outline: 'none' }} />
                  </div>
                </div>

                {checkoutError && (
                  <div style={{ color: '#FF4757', fontSize: '13px', background: 'rgba(255, 71, 87, 0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255, 71, 87, 0.3)' }}>
                    {checkoutError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingCheckout}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    marginTop: '8px',
                    opacity: isSubmittingCheckout ? 0.7 : 1,
                    cursor: isSubmittingCheckout ? 'wait' : 'pointer'
                  }}
                >
                  {isSubmittingCheckout ? 'Redirecionando...' : 'Ir para o Pagamento Seguro 🔒'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};



