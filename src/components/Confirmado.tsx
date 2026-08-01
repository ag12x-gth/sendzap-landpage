import { CheckCircle } from 'lucide-react';

export const Confirmado = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', padding: '20px', textAlign: 'center' }}>
      <CheckCircle size={80} color="#22c55e" style={{ marginBottom: '20px' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>Pagamento Confirmado!</h1>
      <p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: '500px', lineHeight: '1.6' }}>
        Sua assinatura foi processada com sucesso. Em instantes você receberá os detalhes e o acesso no seu e-mail cadastrado.
      </p>
      <a href="/" style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#22c55e', color: '#000', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
        Voltar para a Home
      </a>
    </div>
  );
};
