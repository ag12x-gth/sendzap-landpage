// api/leads.ts
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    console.log("Novo Lead Iniciando Checkout:", payload);

    // Enviar notificação para o Discord (se configurado)
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || "https://webhook.site/2081efca-755d-4b4b-b21d-4ee948c0b8a8";
    
    if (discordWebhookUrl) {
      const discordMessage = {
        content: `👤 **NOVO LEAD NO CHECKOUT** 👤\n\n**Nome:** ${payload.customer_name || 'N/A'}\n**Email:** ${payload.customer_email || 'N/A'}\n**Telefone:** ${payload.customer_phone || 'N/A'}\n**Plano Escolhido:** ${payload.plan_name || 'N/A'}`
      };

      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
      }).catch(err => console.error("Erro Discord Lead:", err));
    }

    return res.status(200).json({ success: true, message: 'Lead salvo com sucesso.' });
  } catch (error) {
    console.error('Erro na API de Leads:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
