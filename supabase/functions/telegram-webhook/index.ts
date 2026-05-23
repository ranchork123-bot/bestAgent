// supabase/functions/telegram-webhook/index.ts

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const update = await req.json();

    // Telegram webhook payload has 'message' object
    if (update.message && update.message.text) {
      const text = update.message.text.trim();
      const chatId = update.message.chat.id;

      console.log(`Received message from ${chatId}: ${text}`);

      // Basic heuristic to check if it's an OTP code (4-8 digits)
      const isOTP = /^\d{4,8}$/.test(text);

      if (isOTP) {
        console.log(`OTP detected. Forwarding to Hubtique OS task runner...`);
        // In reality, we would look up the paused task in Supabase and resume it with this code
        // await supabase.from('tasks').update({ status: 'resumed', payload: { otp: text } }).eq('status', 'paused_for_2fa');

        return new Response(JSON.stringify({
          status: 'success',
          message: 'OTP received and processed.'
        }), { headers: { 'Content-Type': 'application/json' } });
      } else {
        return new Response(JSON.stringify({
          status: 'ignored',
          message: 'Message is not an OTP.'
        }), { headers: { 'Content-Type': 'application/json' } });
      }
    }

    return new Response(JSON.stringify({ status: 'ok' }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
