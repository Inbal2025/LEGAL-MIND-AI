/* Legal Mind — רכיב טופס "השארת פרטים" שמוזרק לעמוד.
   נטען עם <script src="/waitlist-widget.js" defer></script>.
   מוזרק בשני מקומות: לפני מקטע "בוא נדבר" (#contact) ולפני הפוטר.
   שולח ישירות ל-Supabase (מפתח publishable ציבורי + RLS insert-only). */
(function () {
  if (window.__wlWidgetLoaded) return;
  window.__wlWidgetLoaded = true;

  var SUPABASE_URL = "https://fezwwmvdcnbunxnlndxf.supabase.co";
  var PUBLISHABLE = "sb_publishable_TBXgx4aqWDM1crgOavZcCw_eidoQKFa";

  var css = ""
    + ".wl-widget{padding:clamp(56px,9vw,104px) 20px;background:transparent}"
    + ".wl-widget .wl-in{max-width:720px;margin:0 auto;text-align:center}"
    + ".wl-widget .wl-eyebrow{display:inline-block;font-family:'Assistant',sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--c-teal-soft,#A8D9D5);margin-bottom:8px}"
    + ".wl-widget h2{font-family:'Assistant',sans-serif;font-weight:700;font-size:clamp(26px,4.5vw,42px);line-height:1.15;color:var(--ink,#EDEDF3);margin:6px 0 8px}"
    + ".wl-widget .wl-sub{font-family:'Assistant',sans-serif;color:var(--body,#C3C3CC);font-size:18px;margin:0 0 26px}"
    + ".wl-widget form{background:rgba(255,255,255,.04);border:1px solid rgba(168,217,213,.18);border-radius:18px;padding:clamp(20px,4vw,34px);display:flex;flex-direction:column;gap:15px;text-align:right}"
    + ".wl-widget .wl-row{display:flex;gap:14px;flex-wrap:wrap}"
    + ".wl-widget .wl-row .wl-f{flex:1;min-width:200px}"
    + ".wl-widget .wl-f{display:flex;flex-direction:column;gap:6px}"
    + ".wl-widget .wl-f>span{font-family:'Assistant',sans-serif;font-size:14px;color:var(--body,#C3C3CC)}"
    + ".wl-widget input,.wl-widget select{font-family:'Assistant',sans-serif;font-size:16px;padding:12px 14px;border-radius:10px;border:1px solid rgba(168,217,213,.25);background:rgba(255,255,255,.05);color:var(--ink,#EDEDF3);width:100%}"
    + ".wl-widget input:focus,.wl-widget select:focus{outline:none;border-color:var(--c-teal,#25A99C);box-shadow:0 0 0 2px rgba(37,169,156,.25)}"
    + ".wl-widget select option{color:#0B1C28}"
    + ".wl-widget .wl-consent{display:flex;gap:10px;align-items:flex-start;font-family:'Assistant',sans-serif;font-size:14px;color:var(--body,#C3C3CC)}"
    + ".wl-widget .wl-consent input{width:18px;height:18px;flex:0 0 auto;margin-top:3px;accent-color:var(--c-teal,#25A99C)}"
    + ".wl-widget .wl-consent a{color:var(--c-teal-soft,#A8D9D5)}"
    + ".wl-widget button{font-family:'Assistant',sans-serif;font-weight:600;font-size:17px;padding:14px 20px;border:none;border-radius:12px;background:var(--c-teal,#25A99C);color:#fff;cursor:pointer;transition:.2s;margin-top:4px}"
    + ".wl-widget button:hover{background:#1f968a}.wl-widget button:disabled{opacity:.6;cursor:default}"
    + ".wl-widget .wl-msg{margin:4px 0 0;font-family:'Assistant',sans-serif;font-size:15px;min-height:1.2em}"
    + ".wl-widget .wl-msg.ok{color:#5fd0a0}.wl-widget .wl-msg.err{color:#ff9a8a}"
    + ".wl-widget .wl-hp{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);border:0}"
    + ".wl-widget .wl-done{display:none;text-align:center;padding:10px 0}"
    + ".wl-widget.done form{display:none}.wl-widget.done .wl-done{display:block}"
    + ".wl-widget .wl-done .wl-big{font-size:46px;line-height:1}";

  var html = ""
    + "<div class='wl-in'>"
    + "<span class='wl-eyebrow'>הצטרפות לרשימה</span>"
    + "<h2>רוצים לשמוע עוד? השאירו פרטים.</h2>"
    + "<p class='wl-sub'>נחזור אליכם אישית, בלי התחייבות.</p>"
    + "<form class='wlw-form' novalidate>"
    + "<div class='wl-row'>"
    + "<label class='wl-f'><span>שם מלא *</span><input type='text' name='full_name' required autocomplete='name'></label>"
    + "<label class='wl-f'><span>טלפון *</span><input type='tel' name='phone' required autocomplete='tel' inputmode='tel'></label>"
    + "</div>"
    + "<div class='wl-row'>"
    + "<label class='wl-f'><span>אימייל *</span><input type='email' name='email' required autocomplete='email' inputmode='email' dir='ltr'></label>"
    + "<label class='wl-f'><span>תחום עיסוק</span><select name='area'><option value=''>בחר/י</option><option>עורך/ת דין</option><option>איש/אשת נדל\"ן</option><option>מחלקה משפטית</option><option>אחר</option></select></label>"
    + "</div>"
    + "<label class='wl-f'><span>איך הגעתם אלינו?</span><select name='source'><option value=''>בחר/י</option><option>חיפוש בגוגל</option><option>לינקדאין</option><option>פייסבוק / אינסטגרם</option><option>המלצה</option><option>קהילת וואטסאפ</option><option>אחר</option></select></label>"
    + "<div class='wl-hp'><label>אל תמלאו<input type='text' name='company' tabindex='-1' autocomplete='off'></label></div>"
    + "<label class='wl-consent'><input type='checkbox' name='consent' required><span>אני מאשר/ת קבלת תכנים ועדכונים מ-Legal Mind בהתאם ל<a href='privacy.html' target='_blank' rel='noopener'>מדיניות הפרטיות</a>.</span></label>"
    + "<button type='submit' class='wlw-btn'>שליחה</button>"
    + "<p class='wl-msg' role='status' aria-live='polite'></p>"
    + "</form>"
    + "<div class='wl-done'><div class='wl-big'>🎉</div><h2>תודה! קיבלנו את הפרטים.</h2><p class='wl-sub' style='margin:0'>נחזור אליכם בהקדם.</p></div>"
    + "</div>";

  function buildSection() {
    var sec = document.createElement('section');
    sec.className = 'wl-widget';
    sec.innerHTML = html;
    return sec;
  }

  function wire(sec) {
    var f = sec.querySelector('.wlw-form');
    var msg = sec.querySelector('.wl-msg');
    var btn = sec.querySelector('.wlw-btn');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'wl-msg'; msg.textContent = '';
      var d = {};
      new FormData(f).forEach(function (v, k) { d[k] = v; });
      if (d.company) return;
      var consent = f.querySelector('[name=consent]').checked;
      if (!d.full_name || !d.phone || !d.email) { msg.classList.add('err'); msg.textContent = 'נא למלא שם, טלפון ואימייל.'; return; }
      if (!consent) { msg.classList.add('err'); msg.textContent = 'נא לאשר את מדיניות הפרטיות.'; return; }
      btn.disabled = true; var orig = btn.textContent; btn.textContent = 'שולח...';
      fetch(SUPABASE_URL + '/rest/v1/waitlist', {
        method: 'POST',
        headers: { 'apikey': PUBLISHABLE, 'Authorization': 'Bearer ' + PUBLISHABLE, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          full_name: (d.full_name || '').trim(), phone: (d.phone || '').trim(), email: (d.email || '').trim(),
          area: d.area || null, source: d.source || null, consent: true, user_agent: navigator.userAgent.slice(0, 300)
        })
      }).then(function (r) {
        if (r.ok) { sec.classList.add('done'); sec.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        else { msg.classList.add('err'); msg.textContent = 'אופס, משהו השתבש. נסו שוב או פנו אלינו בוואטסאפ.'; btn.disabled = false; btn.textContent = orig; }
      }).catch(function () {
        msg.classList.add('err'); msg.textContent = 'אין חיבור כרגע. נסו שוב בעוד רגע.'; btn.disabled = false; btn.textContent = orig;
      });
    });
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
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // טופס עליון: מיד אחרי שורת "בין לקוחותינו" (.trust-band). גיבוי: לפני "בוא נדבר" (#contact).
    var trust = document.querySelector('.trust-band');
    var contact = document.getElementById('contact');
    if (trust) inject(trust, 'after');
    else if (contact) inject(contact, 'before');

    // טופס תחתון: לפני הפוטר האחרון (האמיתי בתחתית).
    var footers = document.querySelectorAll('footer');
    var footer = footers.length ? footers[footers.length - 1] : null;
    if (footer) inject(footer, 'before');

    // גיבוי: אם שום עוגן לא נמצא, להוסיף עותק אחד בסוף.
    if (!document.querySelector('.wl-widget')) {
      var only = buildSection();
      document.body.appendChild(only);
      wire(only);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
