/* LEGAL MIND client area: shared logic.
   Real mode = Supabase (auth + RPC + edge functions). Until the project is set up (see /supabase/README.md),
   every page can be reviewed with MOCK data: add ?mock=1 to any /clients/ page. */
(function () {
  var CFG = {
    url: 'https://obkhgzrnfhvmiokduvlz.supabase.co',
    key: 'sb_publishable_ZBg3oMoN_Cw-EKicCD3W-Q_BqRVvxWF',
    home: '/clients/home.html',
    maxDevices: 2
  };
  var params = new URLSearchParams(location.search);
  var MOCK = params.has('mock') || !window.supabase;
  var EMPTY = params.get('mock') === 'empty';   // ?mock=empty: a member whose area has no content or requests yet

  var sb = null;
  if (!MOCK) {
    sb = window.supabase.createClient(CFG.url, CFG.key, {
      auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }

  // one random id per browser = one "device" (protection 5)
  function deviceId() {
    var id = null;
    try { id = localStorage.getItem('lm_device'); } catch (e) {}
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
      try { localStorage.setItem('lm_device', id); } catch (e) {}
    }
    return id;
  }
  function deviceLabel() {
    var ua = navigator.userAgent, os = /iPhone|iPad/.test(ua) ? 'iPhone / iPad' : /Android/.test(ua) ? 'Android' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : 'מכשיר';
    var br = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : '';
    return (os + ' ' + br).trim();
  }

  // demo data only (fictitious office and person)
  var MOCKDATA = {
    profile: { full_name: 'דנה לוי', first_name: 'דנה', office_name: 'משרד לדוגמה ושות׳', office_id: 'demo', is_admin: true },
    companion: { name: 'עו״ד אסף אברמזון', role: 'מלווה את המשרד', phone: '03-000-0000', contact: 'דרך קבוצת הוואטסאפ של המשרד' },
    devices: [
      { device_id: 'this', label: 'Windows Chrome', last_seen: new Date().toISOString(), current: true },
      { device_id: 'phone', label: 'iPhone / iPad Safari', last_seen: new Date(Date.now() - 86400000 * 2).toISOString() }
    ],
    items: [
      { id: 'b1', kind: 'booklet', topic: 'Claude במשרד', title: 'חוברת הדרכה: Claude לעורכי דין', desc: 'מהחשבון הראשון ועד עבודה יומיומית על מסמכי המשרד.', is_new: true, progress: 0.4, office_only: false, pages: 32, updated_at: new Date(Date.now() - 86400000 * 6).toISOString() },
      { id: 'v1', kind: 'video', topic: 'Claude במשרד', title: 'סרטון: עוזר משרדי ב-Claude', desc: 'בונים עוזר שמכיר את נהלי המשרד.', is_new: true, progress: 0, office_only: false, duration_sec: 734 },
      { id: 'b2', kind: 'booklet', topic: 'Word ו-Outlook', title: 'חוברת: Copilot בתוך Word', desc: 'ניסוח, השוואת גרסאות וסיכום מסמכים.', is_new: false, progress: 1, office_only: false, pages: 18, updated_at: new Date(Date.now() - 86400000 * 21).toISOString() },
      { id: 'v2', kind: 'video', topic: 'נבו', title: 'סרטון: הקונקטור של נבו בתוך Claude', desc: 'שאלה משפטית, ותשובה עם מקורות לאימות.', is_new: false, progress: 0.95, office_only: false, duration_sec: 512 },
      { id: 'v3', kind: 'video', topic: 'Claude במשרד', title: 'סרטון: החשבון הראשון ב-Claude', desc: 'הרשמה, הגדרות פרטיות ושיחה ראשונה.', is_new: false, progress: 1, office_only: false, duration_sec: 405 },
      { id: 'o1', kind: 'booklet', topic: 'חומרים של המשרד', title: 'נוהל העבודה עם בינה מלאכותית במשרד', desc: 'הכללים שנקבעו יחד באפיון.', is_new: true, progress: 0, office_only: true, pages: 6, updated_at: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 's1', kind: 'skill', topic: 'סקילים', title: 'סקיל: קליטת לקוח חדש', desc: 'מסכם שיחת היכרות לכרטיס לקוח ורשימת מסמכים חסרים.', file_name: 'lm-client-intake.skill', is_new: true, progress: 0, office_only: false, related: 'v1' },
      { id: 's2', kind: 'skill', topic: 'סקילים', title: 'סקיל: תזכורות מועדים מתוך החלטה', desc: 'מחלץ מועדים מהחלטה ומכין רשימה לבדיקה.', file_name: 'lm-deadlines.skill', is_new: false, progress: 1, office_only: false, related: 'v2' },
      { id: 'p1', kind: 'prompt', topic: 'פרומפטים', title: 'סיכום פסק דין לשני עמודים', desc: 'כשצריך להבין פסק דין ארוך לפני פגישה.', body: 'לפניך פסק דין. סכם אותו בשני עמודים לכל היותר: העובדות הרלוונטיות, השאלות שהוכרעו, ההכרעה והנימוקים המרכזיים. ציין מספרי עמודים לכל טענה, וסמן במפורש כל מקום שבו אינך בטוח.', is_new: true, progress: 0, office_only: false },
      { id: 'p2', kind: 'prompt', topic: 'פרומפטים', title: 'מכתב ללקוח בשפה פשוטה', desc: 'הסבר מצב התיק ללקוח בלי מונחים משפטיים.', body: 'כתוב מכתב קצר ללקוח שמסביר את מצב התיק בשפה פשוטה וללא מונחים משפטיים. פתח במה שקרה, המשך במה שיקרה עכשיו, וסיים במה שנדרש מהלקוח ועד מתי. שמור על טון אדיב ומקצועי.', is_new: false, progress: 0, office_only: false },
      { id: 'p3', kind: 'prompt', topic: 'פרומפטים', title: 'השוואת שתי גרסאות של הסכם', desc: 'רשימת השינויים המהותיים בין טיוטות.', body: 'לפניך שתי גרסאות של אותו הסכם. הכן טבלה של כל השינויים המהותיים ביניהן: מספר הסעיף, הנוסח הקודם, הנוסח החדש, ומשמעות השינוי לצד שלנו. התעלם משינויי ניסוח ופיסוק שאינם משנים משמעות.', is_new: false, progress: 0, office_only: false }
    ],
    paths: [
      { id: 'start', title: 'מתחילים עם Claude', desc: 'מהחשבון הראשון ועד סקיל ראשון שעובד במשרד.', steps: ['v3', 'b1', 'v1', 's1'] },
      { id: 'research', title: 'מחקר משפטי עם נבו', desc: 'שאלה, מקורות ואימות, בשלושה צעדים.', steps: ['v2', 'b2', 's2'] }
    ],
    tickets: [
      { ref: 'LM-1004', subject: 'הקונקטור של נבו לא מופיע אצל אחת העובדות', category: 'technical', status: 'waiting_client', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), updated_at: new Date(Date.now() - 3600000 * 3).toISOString(), unread: true },
      { ref: 'LM-1003', subject: 'בקשה לסקיל שמסכם פרוטוקולים של דיונים', category: 'skill_request', status: 'in_progress', created_at: new Date(Date.now() - 86400000 * 5).toISOString(), updated_at: new Date(Date.now() - 86400000).toISOString(), unread: false },
      { ref: 'LM-1001', subject: 'הדרכה נוספת לצוות המזכירות', category: 'training', status: 'closed', created_at: new Date(Date.now() - 86400000 * 20).toISOString(), updated_at: new Date(Date.now() - 86400000 * 16).toISOString(), unread: false }
    ],
    threads: {
      'LM-1004': [
        { id: 1, author_type: 'client', author_name: 'דנה לוי', body: 'שלום, אצל מיכל במשרד הקונקטור של נבו לא מופיע ברשימת הכלים של Claude, למרות שאצלי הוא עובד. ניסינו להתנתק ולהתחבר מחדש.', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), attachment_name: 'צילום-מסך.png', has_file: true },
        { id: 2, author_type: 'staff', author_name: 'עו״ד אסף אברמזון', body: 'תודה דנה, זה מוכר לנו. אפשר לבקש ממיכל לפתוח את Claude, ללחוץ על התמונה שלה למטה, ואז Settings ו-Connectors? אם נבו לא מופיע שם, נחבר אותו יחד בשיחה קצרה של עשר דקות. מתי נוח לה מחר?', created_at: new Date(Date.now() - 3600000 * 3).toISOString() }
      ],
      'LM-1003': [
        { id: 3, author_type: 'client', author_name: 'דנה לוי', body: 'נשמח לסקיל שלוקח פרוטוקול דיון ומוציא ממנו סיכום קצר, מועדים והחלטות.', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
        { id: 4, author_type: 'staff', author_name: 'עו״ד רועי נימצוביץ׳', body: 'רעיון מצוין. התחלנו לבנות, ונשלח גרסה ראשונה לבדיקה בתחילת השבוע הבא.', created_at: new Date(Date.now() - 86400000).toISOString() }
      ],
      'LM-1001': [
        { id: 5, author_type: 'client', author_name: 'דנה לוי', body: 'אפשר לקבוע הדרכה של שעה לצוות המזכירות?', created_at: new Date(Date.now() - 86400000 * 20).toISOString() },
        { id: 6, author_type: 'staff', author_name: 'עו״ד אסף אברמזון', body: 'בשמחה. קבענו ליום שלישי ב-10:00, ההזמנה נשלחה לכולן.', created_at: new Date(Date.now() - 86400000 * 19).toISOString() },
        { id: 7, author_type: 'system', author_name: '', body: 'דנה לוי סימנו שהפנייה נפתרה.', created_at: new Date(Date.now() - 86400000 * 16).toISOString() }
      ]
    }
  };

  if (EMPTY) { MOCKDATA.items = []; MOCKDATA.paths = []; MOCKDATA.tickets = []; MOCKDATA.threads = {}; MOCKDATA.devices = MOCKDATA.devices.slice(0, 1); }

  var TICKET = {
    categories: { tool_question: 'שאלה על כלי', training: 'בקשת הדרכה', technical: 'בעיה טכנית', skill_request: 'בקשה לסקיל או תבנית', other: 'אחר' },
    status: { open: 'פתוחה', in_progress: 'בטיפול', waiting_client: 'ממתינה לתשובתכם', closed: 'נסגרה' },
    staffStatus: { open: 'חדשה / ממתינה לנו', in_progress: 'בטיפול', waiting_client: 'ממתינה ללקוח', closed: 'סגורה' }
  };
  function when(iso) {
    var d = new Date(iso), now = new Date(), diff = (now - d) / 60000;
    if (diff < 1) return 'עכשיו';
    if (diff < 60) return 'לפני ' + Math.round(diff) + ' דקות';
    if (diff < 60 * 24 && d.getDate() === now.getDate()) return 'היום, ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' }) + ', ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  }
  // upload one file to a private bucket through a one-time signed slot from an edge function
  async function upload(fnName, file) {
    if (!file) return { path: null, name: null };
    if (file.size > 10 * 1024 * 1024) throw new Error('הקובץ גדול מ-10MB');
    if (MOCK) return { path: 'mock/' + file.name, name: file.name };
    var r = await fn(fnName, { action: 'upload_url', filename: file.name });
    if (r.error || !r.data || !r.data.path) throw new Error((r.data && r.data.error) || 'לא הצלחנו להעלות את הקובץ');
    var up = await sb.storage.from('ticket-files').uploadToSignedUrl(r.data.path, r.data.token, file);
    if (up.error) throw new Error('לא הצלחנו להעלות את הקובץ');
    return { path: r.data.path, name: file.name };
  }

  async function rpc(name, args) {
    if (MOCK) return { data: null, error: null };
    return sb.rpc(name, args || {});
  }
  async function fn(name, body) {
    if (MOCK) return { data: null, error: null };
    return sb.functions.invoke(name, { body: body || {} });
  }

  // gate a protected page: session + allowlisted member + device check (protections 1, 5, 6, 9)
  async function requireMember() {
    if (MOCK) return MOCKDATA.profile;
    var s = await sb.auth.getSession();
    if (!s.data.session) {
      // came from an email link that did not work: old/used/expired link, or opened in another browser
      var q = location.search + location.hash, why = '';
      if (/error_code=otp_expired|error_description/.test(q)) why = 'link';
      else if (/[?&]code=/.test(q)) why = 'browser';
      location.replace('/clients/' + (why ? '?out=' + why : ''));
      return null;
    }
    var r = await rpc('portal_register_device', { p_device: deviceId(), p_label: deviceLabel() });
    if (r.error || !r.data || r.data.ok === false) {
      await sb.auth.signOut();
      location.replace('/clients/?out=' + encodeURIComponent((r.data && r.data.reason) || 'denied'));
      return null;
    }
    return r.data.profile;
  }

  // personal watermark (protection 13): drawn only inside the content viewer, not over the navigation pages
  function watermark(profile, container) {
    container = container || document.body;
    var old = container.querySelector(':scope > .wm'); if (old) old.remove();
    var wm = document.createElement('div'); wm.className = 'wm'; wm.setAttribute('aria-hidden', 'true');
    var txt = profile.full_name + ' · ' + profile.office_name + ' · ' + new Date().toLocaleDateString('he-IL');
    for (var y = -1; y < 9; y++) for (var x = -1; x < 5; x++) {
      var s = document.createElement('span'); s.textContent = txt;
      s.style.top = (y * 13 + 4) + '%'; s.style.left = (x * 26 + (y % 2) * 13) + '%'; wm.appendChild(s);
    }
    container.appendChild(wm);
    return wm;
  }

  // icons
  var ICONS = {
    clip: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 12.2l-8.1 8.1a5.4 5.4 0 0 1-7.7-7.7l8.6-8.6a3.6 3.6 0 0 1 5.1 5.1l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9"/></svg>',
    booklet: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M8.5 9h6.5M8.5 12.5h6.5"/></svg>',
    video: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.2l5-2.7v9l-5-2.7"/></svg>',
    skill: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l7.5 4.2v8.6L12 20.5l-7.5-4.2V7.7z"/><path d="M4.8 7.9L12 12l7.2-4.1M12 12v8.3"/></svg>',
    prompt: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5h15M4.5 11h15M4.5 15.5h9"/><path d="M16.5 15.5l3 2.5-3 2.5"/></svg>',
    check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12.5l4 4 8-9"/></svg>',
    copy: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>',
    chat: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4.5 3.5v-3.5h0a2 2 0 0 1-2-2z"/><path d="M8.5 9h7M8.5 12h4.5"/></svg>',
    back: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>'
  };
  // light / dark switch: device setting on first visit, then the user's choice (localStorage, guarded)
  var THEMEBTN = '<div class="theme-seg" id="themeSeg" role="group" aria-label="מצב תצוגה"><button type="button" data-th="light" aria-pressed="false"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg><span>בהיר</span></button><button type="button" data-th="dark" aria-pressed="false"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg><span>כהה</span></button></div>';
  function theme() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function markTheme(g) { [].forEach.call(g.querySelectorAll('[data-th]'), function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-th') === theme())); }); }
  function bindTheme() {
    var g = document.getElementById('themeSeg'); if (!g || g.dataset.bound) return; g.dataset.bound = '1'; markTheme(g);
    g.addEventListener('click', function (e) {
      var x = e.target.closest('[data-th]'); if (!x) return;
      var t = x.getAttribute('data-th');
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('lm-theme', t); } catch (err) {}
      markTheme(g);
    });
  }
  document.addEventListener('DOMContentLoaded', bindTheme);
  // shared header: logo (home), theme switch, and one account menu (requests, devices, admin, sign out). No tabs.
  var devList = null;
  function drawDevs() {
    var box = document.getElementById('acctDevs'); if (!box) return;
    if (!devList) { box.innerHTML = '<a class="am-link" href="' + link('/clients/home.html') + '#devices">לרשימת המכשירים</a>'; return; }
    box.innerHTML = devList.map(function (v) {
      var cur = v.current || v.device_id === deviceId();
      return '<div class="am-dev"><span><b dir="ltr">' + esc(v.label) + '</b><small>' + (cur ? 'המכשיר הזה' : 'פעילות אחרונה ' + new Date(v.last_seen).toLocaleDateString('he-IL')) + '</small></span>' + (cur ? '' : '<button class="link" data-dev="' + esc(v.device_id) + '" type="button">ניתוק</button>') + '</div>';
    }).join('') || '<p class="am-note">אין מכשירים מחוברים.</p>';
  }
  function setDevices(list) { devList = list || []; drawDevs(); }
  function openMenu(on) {
    var b = document.getElementById('acctBtn'), m = document.getElementById('acctMenu'); if (!b || !m) return;
    m.hidden = !on; b.setAttribute('aria-expanded', String(on));
  }
  function header(me, active) {
    var h = document.querySelector('header.top'); if (!h) return;
    var nm = me ? (me.full_name || '') : '';
    h.innerHTML = '<a class="brand" href="' + link('/clients/home.html') + '" aria-label="LEGAL MIND - לדף הבית של האזור האישי"><img class="logo-light" src="/brand/legalmind-logo-light.webp" alt="LEGAL MIND" width="800" height="152"><img class="logo-dark" src="/brand/legalmind-logo.webp" alt="LEGAL MIND" width="800" height="152"><span class="brand-sub">האזור האישי</span></a>'
      + '<div class="hdr">' + THEMEBTN
      + '<a class="hbtn" href="/" aria-label="חזרה לאתר של LEGAL MIND"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5L12 5l8 6.5"/><path d="M6.5 10v9h11v-9"/></svg><span class="hl">לאתר <span dir="ltr">LEGAL MIND</span></span></a>'
      + (me ? '<button type="button" class="hbtn hbtn-out" id="logoutTop"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"/><path d="M14 8l-4 4 4 4M10 12h10"/></svg><span>יציאה</span></button>' : '')
      + (me ? '<div class="acct"><button type="button" class="acct-btn" id="acctBtn" aria-haspopup="true" aria-expanded="false" aria-controls="acctMenu"><span class="av" aria-hidden="true">' + esc(nm.trim().charAt(0)) + '</span><span class="nm">' + esc(me.first_name || nm) + '</span><span class="dot hide" id="acctDot" aria-hidden="true"></span><svg class="ico chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6"/></svg></button>'
        + '<div class="acct-menu" id="acctMenu" hidden>'
        + '<div class="am-who"><b>' + esc(nm) + '</b><span>' + esc(me.office_name || '') + '</span></div>'
        + '<a class="am-link" href="' + link('/clients/support.html') + '#mine">הפניות שלי <span class="badge hide" id="navUnread"></span></a>'
        + '<div class="am-sec"><span class="am-h">המכשירים שלי</span><p class="am-note">אפשר להיות מחוברים משני מכשירים. כניסה ממכשיר שלישי מנתקת את הוותיק מביניהם.</p><div id="acctDevs"></div></div>'
        + (me.is_admin ? '<a class="am-link" href="' + link('/clients/admin.html') + '"' + (active === 'admin' ? ' aria-current="page"' : '') + '>ניהול</a>' : '')
        + '<button type="button" class="am-link am-out" id="logoutBtn">יציאה</button></div></div>' : '')
      + '</div>';
    bindTheme(); drawDevs();
    var lo = document.getElementById('logoutBtn'); if (lo) lo.addEventListener('click', logout);
    var lt = document.getElementById('logoutTop'); if (lt) lt.addEventListener('click', logout);
    var b = document.getElementById('acctBtn'), m = document.getElementById('acctMenu');
    if (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); openMenu(m.hidden); });
      m.addEventListener('click', async function (e) {
        e.stopPropagation();
        var d = e.target.closest('[data-dev]'); if (!d) return;
        var id = d.getAttribute('data-dev');
        if (!MOCK) await rpc('portal_forget_device', { p_device: id });
        devList = (devList || []).filter(function (v) { return v.device_id !== id; }); drawDevs();
      });
      document.addEventListener('click', function () { openMenu(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !m.hidden) { openMenu(false); b.focus(); } });
    }
  }
  function setUnread(n) {
    var b = document.getElementById('navUnread'), d = document.getElementById('acctDot');
    if (b) { b.textContent = n || ''; b.classList.toggle('hide', !n); }
    if (d) d.classList.toggle('hide', !n);
  }

  async function logout() {
    if (!MOCK) { await rpc('portal_forget_device', { p_device: deviceId() }); await sb.auth.signOut(); }
    location.href = '/clients/' + (MOCK ? '?mock=' + (EMPTY ? 'empty' : '1') : '');
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; } catch (e) {
      var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e2) {} a.remove(); return ok;
    }
  }
  function dur(sec) { if (!sec) return ''; var m = Math.floor(sec / 60), r = sec % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  var KINDS = { video: 'סרטון', booklet: 'חוברת', skill: 'סקיל', prompt: 'פרומפט' };
  function link(path) { return path + (MOCK ? (path.indexOf('?') < 0 ? '?' : '&') + 'mock=' + (EMPTY ? 'empty' : '1') : ''); }

  // the four library sections, shared by the home tiles and the library page
  var SECTIONS = [
    { kind: 'video', hash: 'videos', tone: 't-teal', title: 'סרטונים', line: 'הדרכות קצרות, צעד אחר צעד', one: 'סרטון אחד', many: 'סרטונים', soon: 'בקרוב יעלו לכאן סרטונים' },
    { kind: 'booklet', hash: 'booklets', tone: 't-sand', title: 'חוברות הדרכה', line: 'מדריכים כתובים לקריאה בנחת', one: 'חוברת אחת', many: 'חוברות', soon: 'בקרוב יעלו לכאן חוברות הדרכה' },
    { kind: 'skill', hash: 'skills', tone: 't-sage', title: 'סקילים', line: 'כלים מוכנים להתקנה ב-<span dir="ltr">Claude</span>', one: 'סקיל אחד', many: 'סקילים', soon: 'בקרוב יעלו לכאן סקילים' },
    { kind: 'prompt', hash: 'prompts', tone: 't-gold', title: 'פרומפטים מוכנים', line: 'מעתיקים, מדביקים, וזה עובד', one: 'פרומפט אחד', many: 'פרומפטים', soon: 'בקרוב יעלו לכאן פרומפטים' }
  ];
  function countText(sec, n) { return !n ? 'בקרוב' : n === 1 ? sec.one : n + ' ' + sec.many; }
  var COVERS = ['v-claude-intro', 'v-office-assistant', 'v-writing-coach'];
  function artFor(kind) {
    if (kind === 'video') return '<span class="art art-v" aria-hidden="true">' + COVERS.map(function (c, i) { return '<img class="cv' + i + '" src="/clients/covers/' + c + '.webp" alt="" loading="lazy" decoding="async">'; }).join('') + '</span>';
    if (kind === 'booklet') return '<span class="art art-b" aria-hidden="true"><i></i><i></i><i><b></b><em></em><em></em><em></em><em></em><em></em></i></span>';
    if (kind === 'skill') return '<span class="art art-s" aria-hidden="true"><i dir="ltr"><b>SKILL.md</b><em></em><em></em><em></em></i></span>';
    if (kind === 'prompt') return '<span class="art art-p" aria-hidden="true"><i><em></em><em></em><em></em><u>העתקה</u></i></span>';
    if (kind === 'chat') return '<span class="art art-c" aria-hidden="true"><i></i><i></i></span>';
    return '';
  }
  function sectionTile(sec, n, href) {
    return '<a class="tile k-' + sec.kind + ' ' + sec.tone + '" href="' + href + '">' + artFor(sec.kind) + '<span class="tb">' + ICONS[sec.kind] + '</span><span class="tt">' + sec.title + '</span><span class="td">' + sec.line + '</span><span class="tc">' + countText(sec, n) + '</span></a>';
  }


  // gentle 3D tilt that follows the pointer on home tiles (light mode only, mouse only, not with reduced motion)
  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || document.documentElement.getAttribute('data-theme') !== 'light') return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var t = e.target.closest && e.target.closest('.tiles .tile'); if (!t) return;
    var r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    t.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg'); t.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
    t.style.setProperty('--mx', ((x + .5) * 100).toFixed(1) + '%'); t.style.setProperty('--my', ((y + .5) * 100).toFixed(1) + '%');
  });
  document.addEventListener('pointerout', function (e) { var t = e.target.closest && e.target.closest('.tiles .tile'); if (t && !t.contains(e.relatedTarget)) { t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); } });
  window.LM = { copyText: copyText, dur: dur, KINDS: KINDS, EMPTY: EMPTY, ICONS: ICONS, header: header, setUnread: setUnread, setDevices: setDevices, openMenu: openMenu, SECTIONS: SECTIONS, countText: countText, sectionTile: sectionTile, artFor: artFor, TICKET: TICKET, when: when, upload: upload, CFG: CFG, MOCK: MOCK, MOCKDATA: MOCKDATA, sb: sb, rpc: rpc, fn: fn, requireMember: requireMember, deviceId: deviceId, deviceLabel: deviceLabel, watermark: watermark, logout: logout, esc: esc, link: link };
})();
