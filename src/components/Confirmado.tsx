import { CheckCircle } from 'lucide-react';

export const Confirmado = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', padding: '20px', textAlign: 'center' }}>
      <CheckCircle size={80} color="#22c55e" style={{ marginBottom: '20px' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>Pagamento Confirmado!</h1>
      <p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: '500px', lineHeight: '1.6' }}>
        Sua assinatura foi processada com sucesso. Para resgatar o seu acesso imediatamente, clique no botão abaixo e envie uma mensagem para o nosso suporte no WhatsApp.
      </p>
      <a href="https://wa.me/5564999526870?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20minha%20compra%20e%20gostaria%20de%20resgatar%20meu%20acesso!" target="_blank" rel="noopener noreferrer" style={{ marginTop: '30px', padding: '15px 30px', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Resgatar Acesso via WhatsApp
      </a>
    </div>
  );
};
