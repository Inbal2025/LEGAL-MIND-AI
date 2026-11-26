// Keeps the client-area database (Supabase project obkhgzrnfhvmiokduvlz, Free plan) awake.
// Free projects are paused after 7 days without activity, so Vercel Cron calls this once a day
// (see "crons" in vercel.json) and it makes one real database write through portal_keepalive_ping().
// The key below is the public (publishable) key that /clients/portal.js already ships to every browser.
const URL = 'https://obkhgzrnfhvmiokduvlz.supabase.co/rest/v1/rpc/portal_keepalive_ping';
const KEY = 'sb_publishable_ZBg3oMoN_Cw-EKicCD3W-Q_BqRVvxWF';

module.exports = async function handler(req, res) {
  try {
    const r = await fetch(URL, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: '{}'
    });
    const body = await r.text();
    res.setHeader('Cache-Control', 'no-store');
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, pinged_at: r.ok ? JSON.parse(body) : null });
  } catch (e) {
    res.status(502).json({ ok: false, error: String(e && e.message || e) });
  }
};
