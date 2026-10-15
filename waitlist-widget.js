/* Legal Mind — טופס "בחינת התאמה" שמוזרק לעמוד (זהה לטופס בדף ההטמעות /nevo/).
   נטען עם <script src="/waitlist-widget.js" defer></script>.
   מוזרק אחרי שורת "בין לקוחותינו" ולפני הפוטר.
   שולח לדף הלידים "Legal Mind - לידים AI" דרך אותו מחבר כמו /ai/; המחבר שולח גם מייל ל-info@legalmind.co.il. */
(function () {
  if (window.__wlWidgetLoaded) return;
  window.__wlWidgetLoaded = true;

  var ENDPOINT = "https://script.google.com/macros/s/AKfycbzuDDI1SZ2ivpyxRWAKItnbCcVzXgT3Tf9MPLF_WbnZSSUwioEW9PNBitIR5S3jYDYF/exec";
  var TOKEN = "lm-sheets-2f9KdQ7xZ";
  var CSS = ".lmfit{--bg:#07130F;--bg-2:#0B1B16;--bg-3:#0F241E;--ink:#F3F0E8;--ink-2:#C3CCC7;--ink-3:#8FA09A;--teal:#63C2B8;--teal-l:#96E0D6;--teal-d:#1D7A70;--hair:rgba(243,240,232,.09);--hair-2:rgba(243,240,232,.16);--serif:\"Heebo\",\"Assistant\",system-ui,sans-serif;--sans:\"Assistant\",system-ui,sans-serif;--ease:cubic-bezier(.2,.7,.2,1);padding:clamp(48px,8vw,96px) 20px;font-family:var(--sans);direction:rtl}\n.lmfit *{box-sizing:border-box}\n.lmfit .h2{margin:10px 0 0;font-family:var(--serif);font-weight:800;line-height:1.12}\n.lmfit .cl{justify-content:center}\n.lmfit .cl{display:inline-flex;align-items:center;gap:12px;font-family:var(--serif);font-weight:600;font-size:1rem;color:var(--teal-l);letter-spacing:.01em}\n.lmfit .cl::before{content:\"\";width:34px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--teal),transparent)}\n.lmfit .h2{font-size:clamp(1.9rem,3.8vw,3rem)}\n.lmfit .lede{font-size:clamp(1.02rem,1.35vw,1.15rem);line-height:1.75;color:var(--ink-2);max-width:46rem}\n.lmfit .lede b{color:var(--ink);font-weight:600}\n.lmfit .formp{max-width:860px;margin-inline:auto;border-radius:24px;border:1px solid rgba(99,194,184,.3);background:linear-gradient(160deg,rgba(15,36,30,.9),rgba(7,19,15,.9));box-shadow:0 0 0 1px rgba(99,194,184,.08),0 40px 110px rgba(0,0,0,.55),0 0 120px rgba(99,194,184,.12);padding:clamp(26px,4vw,52px);text-align:center;position:relative;overflow:hidden}\n.lmfit .formp::before{content:\"\";position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 0%,rgba(99,194,184,.14),transparent 70%);pointer-events:none}\n.lmfit .formp>*{position:relative}\n.lmfit .formp .h2{margin-top:10px}\n.lmfit .formp .lede{margin:12px auto 0}\n.lmfit .form{margin-top:28px;display:grid;gap:16px;text-align:start}\n.lmfit .g2{display:grid;gap:16px}\n@media(min-width:600px){.lmfit .g2{grid-template-columns:1fr 1fr}}\n.lmfit .fx{position:relative}\n.lmfit .fx input{width:100%;height:60px;padding:22px 16px 6px;border-radius:14px;border:1px solid var(--hair-2);background:rgba(243,240,232,.04);color:var(--ink);font:inherit;font-size:1rem;outline:none;transition:border-color .2s,box-shadow .2s}\n.lmfit .fx input:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(99,194,184,.15)}\n.lmfit .fx label{position:absolute;inset-inline-start:16px;top:19px;color:var(--ink-3);font-size:1rem;pointer-events:none;transition:top .18s,font-size .18s,color .18s}\n.lmfit .fx input:focus+label,.lmfit .fx input:not(:placeholder-shown)+label{top:8px;font-size:.75rem;color:var(--teal-l)}\n.lmfit .fx input[type=email],.lmfit .fx input[type=tel]{text-align:right}\n.lmfit .fx.bad input{border-color:#E8836B!important;box-shadow:0 0 0 4px rgba(232,131,107,.14)!important}\n.lmfit .fmsg{display:none;gap:8px;margin-top:8px;font-weight:500;font-size:.875rem;color:#F2A08C;direction:rtl}\n.lmfit .fx.bad .fmsg{display:flex}\n.lmfit .fmsg button{font:inherit;font-weight:700;color:var(--teal-l);background:none;border:0;border-bottom:1px solid currentColor;padding:0;cursor:pointer;direction:ltr}\n.lmfit .pills{border:0;margin:0;padding:0;min-width:0;text-align:center}\n.lmfit .pills legend{padding:0;margin:0 auto 8px;font-weight:600;font-size:.9375rem;color:var(--ink);width:100%;text-align:center}\n.lmfit .pills div{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}\n.lmfit .pills label{cursor:pointer}\n.lmfit .pills input{position:absolute;opacity:0;pointer-events:none}\n.lmfit .pills span{display:inline-flex;align-items:center;height:40px;padding:0 14px;border-radius:99px;border:1px solid var(--hair-2);background:rgba(243,240,232,.03);font-size:.9rem;color:var(--ink-2);transition:all .2s}\n.lmfit .pills input:checked+span{background:var(--teal-l);color:#07130F;border-color:var(--teal-l);font-weight:700}\n.lmfit .pills input:focus-visible+span{outline:2px solid var(--teal-l);outline-offset:2px}\n@media(max-width:560px){.lmfit .pills span{height:44px}}\n.lmfit .switch{display:flex;align-items:flex-start;justify-content:center;gap:12px;cursor:pointer;font-size:.9375rem;color:var(--ink-2);line-height:1.5;text-align:center}\n.lmfit .switch input{position:absolute;opacity:0;pointer-events:none}\n.lmfit .switch i{position:relative;flex:none;width:22px;height:22px;border-radius:5px;background:rgba(243,240,232,.06);border:1.5px solid rgba(243,240,232,.45);margin-top:2px;transition:background .15s,border-color .15s}\n.lmfit .switch i::after{content:\"\";position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #07130F;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform .15s var(--ease)}\n.lmfit .switch input:checked+i{background:var(--teal-l);border-color:var(--teal-l)}\n.lmfit .switch input:checked+i::after{transform:rotate(45deg) scale(1)}\n.lmfit .switch input:focus-visible+i{outline:2px solid var(--teal-l);outline-offset:2px}\n.lmfit .switch a{color:var(--teal-l);border-bottom:1px solid currentColor}\n.lmfit .hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}\n.lmfit .go{width:100%;height:62px;border:0;border-radius:14px;cursor:pointer;font:inherit;font-weight:700;font-size:1.125rem;color:#fff;background:linear-gradient(135deg,#0F8A7C,#0A6459);box-shadow:0 14px 40px rgba(99,194,184,.25);transition:transform .25s var(--ease),box-shadow .25s}\n.lmfit .go:hover{transform:translateY(-2px);box-shadow:0 20px 50px rgba(99,194,184,.35)}\n.lmfit .go.busy{opacity:.7;pointer-events:none;cursor:progress}\n.lmfit .fsend{display:none;margin-top:4px;font-weight:500;font-size:.9375rem;color:#F2A08C;text-align:center}\n.lmfit .fsend.on{display:block}\n.lmfit .pnote{margin-top:6px;font-size:.8125rem;line-height:1.55;color:var(--ink-3);text-align:center}\n.lmfit .pnote a{color:var(--teal-l);text-decoration:underline;text-underline-offset:2px}\n.lmfit .ok-check{width:58px;height:58px;border-radius:50%;margin:0 auto 18px;background:linear-gradient(135deg,var(--teal-l),var(--teal));position:relative;box-shadow:0 0 30px rgba(99,194,184,.5)}\n.lmfit .ok-check::after{content:\"\";position:absolute;left:21px;top:14px;width:12px;height:22px;border:solid #07130F;border-width:0 3px 3px 0;transform:rotate(45deg)}\n.lmfit .h2{font-size:clamp(2rem,4.4vw,3.5rem);background:linear-gradient(120deg,#FFFFFF 0%,var(--ink) 40%,var(--teal-l) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}\n.lmfit .formp{border:1px solid rgba(150,224,214,.32);box-shadow:0 0 0 1px rgba(99,194,184,.08),0 50px 130px rgba(0,0,0,.65),0 0 160px rgba(99,194,184,.16)}\n.lmfit .cl{font-size:1.5rem}";

  var AREAS = ["מקרקעין ונדל״ן", "מסחרי וחברות", "דיני משפחה", "דיני עבודה", "נזיקין וביטוח", "משפט פלילי", "מיסים", "משפט מנהלי ושלטון מקומי", "הוצאה לפועל וחדלות פירעון", "תכנון ובנייה", "מגוון תחומים", "אחר"];
  var SIZES = ["1", "1–5", "6–10", "11 ומעלה"];
  var seq = 0;

  function radios(name, list) {
    return list.map(function (v) {
      var label = /^\d/.test(v) && v.indexOf('–') > 0 ? "<bdi dir='ltr'>" + v + "</bdi>" : v;
      return "<label><input type='radio' name='" + name + "' value='" + v + "'><span>" + label + "</span></label>";
    }).join("");
  }

  function html(id) {
    return ""
      + "<div class='formp'>"
      + "<span class='cl'>בואו נתחיל</span>"
      + "<h2 class='h2'>בואו נכיר את המשרד שלכם</h2>"
      + "<p class='lede'>השאירו פרטים, ונחזור אליכם אישית לבחינת התאמה. ללא התחייבות.</p>"
      + "<form class='form' novalidate>"
      + "<div class='g2'>"
      + "<div class='fx'><input id='" + id + "n' name='fullName' type='text' autocomplete='name' placeholder=' ' required maxlength='80'><label for='" + id + "n'>שם מלא *</label><div class='fmsg' role='alert'></div></div>"
      + "<div class='fx'><input id='" + id + "p' name='phone' type='tel' inputmode='tel' autocomplete='tel' placeholder=' ' required maxlength='20' dir='ltr'><label for='" + id + "p'>טלפון *</label><div class='fmsg' role='alert'></div></div>"
      + "</div>"
      + "<div class='fx'><input id='" + id + "e' name='email' type='email' autocomplete='email' placeholder=' ' required maxlength='120' dir='ltr' spellcheck='false' autocapitalize='off'><label for='" + id + "e'>אימייל *</label><div class='fmsg' role='alert'></div></div>"
      + "<fieldset class='pills'><legend>מספר עורכי הדין במשרד</legend><div>" + radios('firmSize', SIZES) + "</div></fieldset>"
      + "<fieldset class='pills'><legend>תחום העיסוק העיקרי</legend><div>" + radios('practiceArea', AREAS) + "</div></fieldset>"
      + "<label class='switch'><input type='checkbox' name='privacyConsent' value='yes' required aria-required='true'><i></i><span>קראתי ואני מסכים/ה ל<a href='https://www.legalmind.co.il/privacy.html' target='_blank' rel='noopener'>מדיניות הפרטיות</a>. *</span></label>"
      + "<label class='switch'><input type='checkbox' name='marketingConsent' value='yes'><i></i><span>אני מאשר/ת קבלת תכנים ועדכונים מ-LEGAL MIND בהתאם ל<a href='https://www.legalmind.co.il/privacy.html' target='_blank' rel='noopener'>מדיניות הפרטיות</a>.</span></label>"
      + "<div class='hp' aria-hidden='true'><label>אל תמלאו שדה זה<input type='text' name='lm_hp_xq' tabindex='-1' autocomplete='off'></label></div>"
      + "<button class='go' type='submit'>לבחינת התאמה</button>"
      + "<p class='fsend' role='alert'></p>"
      + "<p class='pnote'>מסירת הפרטים אינה חובה ונעשית בהסכמתכם. הפרטים נשמרים אצל א.ר. ליגל מיינד בע״מ, ישמשו למענה לפנייה ולבחינת התאמה בלבד, ולא יועברו לצד שלישי אלא כמפורט ב<a href='https://www.legalmind.co.il/privacy.html' target='_blank' rel='noopener'>מדיניות הפרטיות</a>. ניתן לבקש לעיין בפרטים, לתקנם או למחקם, כמפורט במדיניות הפרטיות.</p>"
      + "</form>"
      + "</div>";
  }

  var utm = {};
  try { var up = new URLSearchParams(location.search); ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) { if (up.get(k)) utm[k] = up.get(k).slice(0, 200); }); } catch (_) {}
  var FIX = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gmail.cm': 'gmail.com', 'gmail.om': 'gmail.com', 'gmail.co.il': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmail.con': 'hotmail.com', 'walla.co': 'walla.co.il', 'walla.com': 'walla.co.il', 'wala.co.il': 'walla.co.il', 'yahoo.con': 'yahoo.com', 'yaho.com': 'yahoo.com', 'outlook.con': 'outlook.com', 'outlok.com': 'outlook.com', 'outlook.co': 'outlook.com', 'icloud.con': 'icloud.com' };
  function chkEmail(v) { v = v.trim(); if (!v) return { err: 'נא למלא כתובת אימייל' }; if (/[֐-׿]/.test(v)) return { err: 'נראה שהמקלדת בעברית. החליפו לאנגלית והקלידו שוב' }; if (/\s/.test(v)) return { err: 'יש רווח בתוך כתובת האימייל' }; var at = (v.match(/@/g) || []).length; if (at === 0) return { err: 'חסר @ בכתובת האימייל' }; if (at > 1) return { err: 'יש בכתובת יותר מ־@ אחד' }; var parts = v.split('@'), local = parts[0], dom = parts[1].toLowerCase(); if (!local) return { err: 'חסר שם לפני ה־@' }; if (!dom) return { err: 'חסר דומיין אחרי ה־@, למשל gmail.com' }; if (dom.indexOf('.') < 0) return { err: 'חסרה סיומת, למשל ‎.com או ‎.co.il' }; if (!/^[^@\s]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(v)) return { err: 'כתובת האימייל לא תקינה, בדקו שוב' }; if (FIX[dom]) return { warn: local + '@' + FIX[dom] }; return {}; }
  function fieldMsg(inp, err) { var box = inp.closest('.fx'), m = box.querySelector('.fmsg'); box.classList.toggle('bad', !!err); inp.setAttribute('aria-invalid', err ? 'true' : 'false'); if (m) m.textContent = err || ''; return !err; }
  function chkName(v) { v = v.trim(); if (!v) return 'נא למלא שם מלא'; if (v.length < 2) return 'השם קצר מדי'; return ''; }
  function normPhone(v) { var d = v.replace(/[\s\-().]/g, ''); if (/^\+972/.test(d)) d = '0' + d.slice(4); else if (/^972/.test(d)) d = '0' + d.slice(3); return d; }
  function chkPhone(v) { if (!v.trim()) return 'נא למלא מספר טלפון'; if (!/^0\d{8,9}$/.test(normPhone(v))) return 'מספר הטלפון לא תקין, בדקו שוב'; return ''; }

  function wire(sec) {
    var f = sec.querySelector('form');
    var n = f.elements.fullName, p = f.elements.phone, em = f.elements.email, btn = f.querySelector('.go'), note = f.querySelector('.fsend'), sending = false;
    [[n, chkName], [p, chkPhone]].forEach(function (a) { var t = false; a[0].addEventListener('blur', function () { if (a[0].value.trim()) { t = true; fieldMsg(a[0], a[1](a[0].value)); } }); a[0].addEventListener('input', function () { if (t) fieldMsg(a[0], a[1](a[0].value)); else a[0].closest('.fx').classList.remove('bad'); }); });
    var et = false;
    function showEm(r) { var box = em.closest('.fx'), m = box.querySelector('.fmsg'); box.classList.remove('bad'); m.textContent = ''; em.setAttribute('aria-invalid', r.err ? 'true' : 'false'); if (r.err) { box.classList.add('bad'); m.textContent = r.err; } else if (r.warn) { box.classList.add('bad'); m.textContent = 'התכוונתם ל־ '; var b = document.createElement('button'); b.type = 'button'; b.textContent = r.warn + '?'; b.onclick = function () { em.value = r.warn; showEm({}); em.focus(); }; m.appendChild(b); } return !r.err; }
    em.addEventListener('blur', function () { if (em.value.trim()) { et = true; showEm(chkEmail(em.value)); } });
    em.addEventListener('input', function () { if (et) showEm(chkEmail(em.value)); else em.closest('.fx').classList.remove('bad'); });
    function success() { var d = document.createElement('div'); d.setAttribute('role', 'status'); d.style.textAlign = 'center'; d.innerHTML = '<div class="ok-check"></div><h3 style="font-family:var(--serif);font-weight:700;font-size:2rem;color:var(--ink);margin:0" tabindex="-1">קיבלנו.</h3><p style="color:var(--ink-2);margin-top:10px">נחזור אליכם אישית לבחינת התאמה.</p>'; f.replaceWith(d); var h = d.querySelector('h3'); if (h) h.focus(); }
    f.addEventListener('submit', function (e) {
      e.preventDefault(); if (sending) return; note.classList.remove('on'); note.textContent = '';
      var ok = [fieldMsg(n, chkName(n.value)), fieldMsg(p, chkPhone(p.value)), (et = true, showEm(chkEmail(em.value)))], first = [n, p, em][ok.indexOf(false)];
      if (first) { first.focus(); first.closest('.fx').scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      if (!f.elements.privacyConsent.checked) { note.textContent = 'יש למלא את כל השדות המסומנים בכוכבית ולאשר את מדיניות הפרטיות.'; note.classList.add('on'); f.elements.privacyConsent.focus(); return; }
      if (f.elements.lm_hp_xq.value) { success(); return; }
      function pick(k) { var x = f.querySelector('input[name=' + k + ']:checked'); return x ? x.value : ''; }
      var page = location.pathname.indexOf('mobile') !== -1 ? 'דף הבית (נייד)' : 'דף הבית';
      var extra = [page, 'עורכי דין במשרד: ' + (pick('firmSize') || 'לא צוין'), 'דיוור: ' + (f.elements.marketingConsent.checked ? 'כן' : 'לא')];
      for (var uk in utm) extra.push(uk.replace('utm_', '') + ': ' + utm[uk]);
      var payload = { token: TOKEN, full_name: n.value.trim(), phone: normPhone(p.value), email: em.value.trim(), area: pick('practiceArea') || '', source: extra.join(' | ') };
      sending = true; btn.classList.add('busy'); btn.setAttribute('aria-busy', 'true');
      var ctl = ('AbortController' in window) ? new AbortController() : null, tm = setTimeout(function () { if (ctl) ctl.abort(); }, 15000);
      fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(payload), signal: ctl ? ctl.signal : undefined })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json().catch(function () { return { ok: true }; }); })
        .then(function (j) { if (j && j.error) throw new Error(j.error); success(); })
        .catch(function () { note.textContent = 'השליחה לא הצליחה. נסו שוב בעוד רגע.'; note.classList.add('on'); })
        .then(function () { clearTimeout(tm); sending = false; btn.classList.remove('busy'); btn.removeAttribute('aria-busy'); });
    });
  }

  function buildSection() {
    var sec = document.createElement('section');
    sec.className = 'wl-widget lmfit';
    sec.id = seq === 0 ? 'fit' : 'fit-' + seq;
    sec.innerHTML = html('lmf' + (seq++) + '-');
    return sec;
  }

  function inject(refEl, where) {
    if (!refEl) return false;
    var sec = buildSection();
    if (where === 'after') refEl.parentNode.insertBefore(sec, refEl.nextSibling);
    else refEl.parentNode.insertBefore(sec, refEl);
    wire(sec);
    return true;
  }

  function init() {
    if (document.querySelector('.wl-widget')) return;
    if (!document.querySelector('link[href*="family=Heebo"]')) { var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Heebo:wght@600;700;800&display=swap'; document.head.appendChild(fl); }
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    var trust = document.querySelector('.trust-band');
    var contact = document.getElementById('contact');
    if (trust) inject(trust, 'after');
    else if (contact) inject(contact, 'before');
    var footers = document.querySelectorAll('footer');
    var footer = footers.length ? footers[footers.length - 1] : null;
    if (footer) inject(footer, 'before');
    if (!document.querySelector('.wl-widget')) { var only = buildSection(); document.body.appendChild(only); wire(only); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
