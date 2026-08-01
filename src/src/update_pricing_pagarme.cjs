const fs = require('fs');
const file = 'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace component name export const Pricing to PricingPagarme
content = content.replace('export const Pricing: React.FC = () => {', 'export const PricingPagarme: React.FC = () => {');

// Replace the states
const stateStartStr = '  // Checkout Modal State (Pagar.me v5)';
const stateEndStr = '  // Social Proof Toast State';

const stateStartIdx = content.indexOf(stateStartStr);
const stateEndIdx = content.indexOf(stateEndStr);
if(stateStartIdx !== -1 && stateEndIdx !== -1) {
  const replacementState = `  // Checkout Modal State (Pagar.me v5 Standard Link)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  
  // Dados do Cliente Básicos
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string>('');
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

`;
  content = content.substring(0, stateStartIdx) + replacementState + content.substring(stateEndIdx);
} else {
  console.log('State block not found');
}

// Replace the handle Confirm
const handleStartStr = '  const generatePagarmeToken';
const handleEndStr = '  // Visit Count & Expiration Tracker';

const handleStartIdx = content.indexOf(handleStartStr);
const handleEndIdx = content.indexOf(handleEndStr);
if(handleStartIdx !== -1 && handleEndIdx !== -1) {
  const replacementHandle = `  const handleConfirmCheckout = async (e: React.FormEvent) => {
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
        // Redireciona para o checkout da Pagar.me
        window.location.href = data.checkout_url;
      } else {
        throw new Error('URL de checkout não retornada pelo servidor.');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'Falha na conexão com servidor. Verifique sua rede.');
      setIsSubmittingCheckout(false);
    }
  };

`;
  content = content.substring(0, handleStartIdx) + replacementHandle + content.substring(handleEndIdx);
} else {
  console.log('Handle block not found');
}

// Replace the modal UI
const formStartStr = '              <form onSubmit={handleConfirmCheckout} style={{ display: \'flex\', flexDirection: \'column\', gap: \'16px\' }}>';
const formEndStr = '              </form>';

const formStartIdx = content.indexOf(formStartStr);
const formEndIdx = content.indexOf(formEndStr, formStartIdx);

if (formStartIdx !== -1 && formEndIdx !== -1) {
    const replacementForm = `              <form onSubmit={handleConfirmCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>
                  Preencha seus dados básicos abaixo. Você será redirecionado para o ambiente 100% seguro da Pagar.me para concluir o pagamento.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.9)' }}>
                      Nome Completo *
                    </label>
                    <input type="text" required placeholder="Seu nome" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0D0D0D', border: '1px solid #262626', color: '#FFF', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.9)' }}>
                      E-mail Principal *
                    </label>
                    <input type="email" required placeholder="exemplo@empresa.com" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)}
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
              </form>`;
    content = content.substring(0, formStartIdx) + replacementForm + content.substring(formEndIdx + formEndStr.length);
} else {
    console.log('Form block not found');
}

// Remove handleZipCodeChange function which is no longer needed
const zipStartStr = '  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {';
const zipEndStr = '  return (';
const zipStartIdx = content.indexOf(zipStartStr);
const zipEndIdx = content.indexOf(zipEndStr);
if (zipStartIdx !== -1 && zipEndIdx !== -1) {
  content = content.substring(0, zipStartIdx) + content.substring(zipEndIdx);
}

fs.writeFileSync(file, content);
console.log('File updated successfully.');
