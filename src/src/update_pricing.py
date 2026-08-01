import sys

with open('e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Component Name (line 41 is index 40)
lines[40] = lines[40].replace('export const Pricing:', 'export const PricingPagarme:')

# 2. State (Lines 51 to 81 -> indices 50 to 80)
state_new = """  // Checkout Modal State (Pagar.me v5 Standard Link)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  
  // Dados do Cliente Básicos
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string>('');
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
"""
lines[50] = state_new + '\n'
for i in range(51, 81):
    lines[i] = ''

# 3. handleZipCodeChange & handleOpenCheckout (Lines 116 to 144 -> indices 115 to 143)
handle_open_new = """  const handleOpenCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setCheckoutError('');
    setIsSubmittingCheckout(false);
    setCheckoutSuccess(false);
    setIsCheckoutModalOpen(true);
  };
"""
lines[115] = handle_open_new + '\n'
for i in range(116, 144):
    lines[i] = ''

# 4. handleConfirmCheckout (Lines 146 to 388 -> indices 145 to 387)
handle_confirm_new = """  const handleConfirmCheckout = async (e: React.FormEvent) => {
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
"""
lines[145] = handle_confirm_new + '\n'
for i in range(146, 388):
    lines[i] = ''

# 5. Form Modal (Lines 1178 to 1493 -> indices 1177 to 1492)
form_new = """              <form onSubmit={handleConfirmCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              </form>"""
lines[1177] = form_new + '\n'
for i in range(1178, 1493):
    lines[i] = ''

with open('e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
