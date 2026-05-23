// supabase/functions/monitor-page/index.ts

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') || '';
const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID') || '';

async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not set. Mocking message send:', message);
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { url, condition, lastKnownContent } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    // Mock fetching via Jina Reader
    console.log(`Fetching ${url} via Jina Reader...`);
    // const jinaUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;

    // In a real scenario, we'd fetch this. For this mock, we'll simulate a response.
    // const response = await fetch(jinaUrl);
    // const content = await response.text();
    const content = `Mock content for ${url} retrieved via Jina at ${new Date().toISOString()}`;

    // Compare content
    if (content !== lastKnownContent) {
       console.log(`Changes detected for ${url}. Sending alert...`);
       await sendTelegramMessage(`Alert! Changes detected on ${url}.\nCondition: ${condition || 'Page Changed'}`);

       return new Response(JSON.stringify({
         status: 'changed',
         message: 'Changes detected and alert sent.',
         newContent: content
       }), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      status: 'unchanged',
      message: 'No changes detected.'
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
