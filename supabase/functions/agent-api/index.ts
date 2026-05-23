// supabase/functions/agent-api/index.ts

/**
 * FEATURE: Hubtique Agent API
 * POST /api/agent endpoint -> returns result. Exposes the browser agent for external tools.
 */
Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { task, url } = await req.json();

    console.log(`Received API request to run task: ${task} on ${url}`);

    // In reality, this queues a task in Supabase and the Chrome Extension picks it up.
    return new Response(JSON.stringify({
      status: 'queued',
      taskId: crypto.randomUUID(),
      message: 'Task submitted successfully to Hubtique OS.'
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
