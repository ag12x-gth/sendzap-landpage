// api/webhook.ts
export default async function handler(req, res) {
  // Apenas aceita requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    console.log("Webhook Recebido da InfinitePay:", JSON.stringify(payload, null, 2));

    const promises = [];

    // 1. Salvar no Supabase (se configurado)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      console.log("Encaminhando para o Supabase...");
      promises.push(
        fetch(`${supabaseUrl}/rest/v1/vendas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            invoice_slug: payload.invoice_slug,
            amount: payload.amount,
            paid_amount: payload.paid_amount,
            status: payload.status || 'approved',
            customer_name: payload.customer?.name || '',
            customer_email: payload.customer?.email || '',
            raw_data: payload
          })
        }).catch(err => console.error("Erro Supabase:", err))
      );
    }

    // 2. Enviar notificação no Discord (se configurado)
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || "https://webhook.site/2081efca-755d-4b4b-b21d-4ee948c0b8a8";
    if (discordWebhookUrl) {
      console.log("Enviando notificação para o Discord...");
      const valorFormatado = payload.paid_amount 
        ? `R$ ${(payload.paid_amount / 100).toFixed(2).replace('.', ',')}` 
        : (payload.amount ? `R$ ${(payload.amount / 100).toFixed(2).replace('.', ',')}` : 'Valor não informado');
        
      promises.push(
        fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🎉 **NOVA VENDA APROVADA - SENDZAP** 🎉\n\n**Cliente:** ${payload.customer?.name || 'N/A'}\n**Email:** ${payload.customer?.email || 'N/A'}\n**Valor:** ${valorFormatado}\n**ID:** ${payload.invoice_slug || 'N/A'}`,
          })
        }).catch(err => console.error("Erro Discord:", err))
      );
    }

    // 3. Encaminhar para a API Principal (Go) (se configurado)
    const coreApiUrl = process.env.CORE_API_URL;
    if (coreApiUrl) {
      console.log("Encaminhando para o Core API (sendzap-api)...");
      promises.push(
        fetch(coreApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error("Erro Core API:", err))
      );
    }

    // Aguarda todas as chamadas assíncronas (ou até 3 segundos para não segurar o webhook da InfinitePay)
    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }

    // Retorna Sucesso 200 OK obrigatoriamente para a InfinitePay parar de tentar enviar o mesmo evento
    return res.status(200).json({ received: true, message: "Webhook processado na Vercel" });

  } catch (error) {
    console.error("Erro geral no webhook:", error);
    // Mesmo em erro, retornamos 200 para a InfinitePay, mas idealmente seria um 500 para eles retentarem.
    // Pela estabilidade, vamos retornar 200 para não encher a fila se for erro na nossa integração.
    return res.status(200).json({ received: false, error: "Internal processing error" });
  }
}
