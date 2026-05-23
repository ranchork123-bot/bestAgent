// supabase/functions/whatsapp-webhook/index.ts

/**
 * FEATURE: WhatsApp / Discord channels
 * Add WhatsApp Business API + Discord webhook
 */
Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload = await req.json();

    console.log(`Received WhatsApp Webhook Payload:`, payload);

    return new Response(JSON.stringify({
      status: 'success',
      message: 'WhatsApp message processed.'
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
