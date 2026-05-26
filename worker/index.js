export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, X-Edit-Passphrase',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return new Response('Not found', { status: 404, headers: cors });

    if (req.headers.get('X-Edit-Passphrase') !== env.EDIT_PASSPHRASE)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });

    let body;
    try { body = await req.json(); } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
    }
    const { editsPath, days, message } = body;
    if (!editsPath || !Array.isArray(days) || !message)
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: cors });

    const apiBase = 'https://api.github.com/repos/georgelgore/trip-itinerary/contents/' + editsPath;
    const ghHeaders = {
      'Authorization': 'Bearer ' + env.GITHUB_PAT,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'trip-itinerary-worker',
    };

    // Get current SHA (file may not exist yet)
    let sha;
    const getRes = await fetch(apiBase + '?ref=main', { headers: ghHeaders });
    if (getRes.ok) {
      sha = (await getRes.json()).sha;
    } else if (getRes.status !== 404) {
      return new Response(JSON.stringify({ error: 'GET ' + getRes.status }), { status: 502, headers: cors });
    }

    const payload = JSON.stringify({ updatedAt: new Date().toISOString(), days }, null, 2);
    // btoa is available in the Workers runtime
    const base64 = btoa(unescape(encodeURIComponent(payload)));

    const putBody = { message, content: base64, branch: 'main' };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(putBody),
    });

    const putText = await putRes.text();
    return new Response(putText, {
      status: putRes.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  },
};
