/* Meta Pixel של LEGAL MIND, עם בקשת הסכמה לפני הפעלה.
   הפיקסל לא נטען ולא שולח דבר עד שהגולש לוחץ "אישור" בהודעה שבתחתית הדף.
   הבחירה נשמרת בדפדפן (localStorage, מפתח lm_ads_consent), ואפשר לשנות אותה בדף מדיניות הפרטיות.
   תשתית אחת לכל הדפים: דף שרוצה לשלוח אירוע המרה מסמן <html data-lm-event="Lead" data-lm-content="...">.
   דף שמנהל בעצמו את אירוע ההרשמה מסמן <html data-lm-reg="manual">.
   אירועים מהקוד של הדף: window.lmTrack('Lead', {content_name: '...'}) - נשלח רק אם ניתנה הסכמה. */
(function () {
  var PIXEL_ID = "2234362747126278";   /* Legal Mind - legalmind.co.il (נוצר 18.10.2026 בחשבון המודעות של צחי) */
  var KEY = "lm_ads_consent";
  var html = document.documentElement;
  var page = (location.pathname.split("/")[1] || "home");
  var loaded = false;

  function getChoice() { try { var v = JSON.parse(localStorage.getItem(KEY) || "null"); return v && v.c; } catch (e) { return null; } }
  function setChoice(c) { try { localStorage.setItem(KEY, JSON.stringify({ c: c, t: new Date().toISOString(), v: 1 })); } catch (e) {} }

  function loadPixel() {
    if (loaded || !PIXEL_ID) return; loaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('set', 'autoConfig', false, PIXEL_ID);   /* בלי איסוף אוטומטי של כפתורים ושדות מהדף */
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    var ev = html.getAttribute('data-lm-event');
    if (ev) fbq('track', ev, { content_name: html.getAttribute('data-lm-content') || page });
    window.lmPixelOn = true;
  }

  /* API לקוד של הדף */
  window.lmTrack = function (name, params) {
    if (!loaded || !window.fbq) return false;
    var std = ['Lead', 'CompleteRegistration', 'Contact', 'Schedule', 'SubmitApplication'];
    if (std.indexOf(name) >= 0) fbq('track', name, params || {}); else fbq('trackCustom', name, params || {});
    return true;
  };
  window.lmConsentReset = function () { try { localStorage.removeItem(KEY); } catch (e) {} showBanner(); };

  /* לחיצה על כפתור הרשמה בדפי הוובינרים: אירוע ביניים */
  if (html.getAttribute('data-lm-reg') !== 'manual') {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.js-reg, a#reg-btn');
      if (a) window.lmTrack('RegisterClick', { content_name: page });
    }, true);
  }

  function showBanner() {
    if (document.getElementById('lm-consent')) return;
    var css = '#lm-consent{position:fixed;inset:auto 12px 12px 12px;z-index:2147483000;display:flex;justify-content:center;pointer-events:none}'
      + '#lm-consent .b{pointer-events:auto;direction:rtl;text-align:right;max-width:720px;width:100%;box-sizing:border-box;background:#fff;color:#14243A;border:1px solid #cfe3e0;border-radius:16px;box-shadow:0 12px 40px rgba(20,36,58,.22);padding:16px 18px;font:15px/1.6 Assistant,Heebo,Arial,sans-serif}'
      + '#lm-consent p{margin:0 0 12px}#lm-consent a{color:#0F8F86;text-decoration:underline}'
      + '#lm-consent .r{display:flex;gap:10px;flex-wrap:wrap}'
      + '#lm-consent button{flex:1 1 140px;min-height:44px;border-radius:999px;font:700 15px Assistant,Heebo,Arial,sans-serif;cursor:pointer;border:2px solid #1FA89E}'
      + '#lm-consent .y{background:#1FA89E;color:#fff}#lm-consent .n{background:#fff;color:#14243A}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var w = document.createElement('div'); w.id = 'lm-consent';
    w.innerHTML = '<div class="b" role="dialog" aria-live="polite" aria-label="הסכמה לעוגיות ולפיקסל של Meta">'
      + '<p>נשמח להשתמש בעוגיות ובפיקסל של <span dir="ltr">Meta</span> (פייסבוק ואינסטגרם), כדי למדוד את יעילות המודעות שלנו ולהציג מודעות של LEGAL MIND למי שביקר באתר. הכלי יופעל רק אם תאשרו, והאתר יעבוד כרגיל גם אם לא. '
      + '<a href="https://www.legalmind.co.il/privacy.html#cookies" target="_blank" rel="noopener">פרטים במדיניות הפרטיות</a></p>'
      + '<div class="r"><button type="button" class="y">אישור</button><button type="button" class="n">לא, תודה</button></div></div>';
    function done(c) { setChoice(c); w.remove(); if (c === 'yes') loadPixel(); }
    w.querySelector('.y').addEventListener('click', function () { done('yes'); });
    w.querySelector('.n').addEventListener('click', function () { done('no'); });
    (document.body || html).appendChild(w);
  }

  var c = getChoice();
  if (c === 'yes') loadPixel();
  else if (c !== 'no') {
    if (document.body) showBanner(); else document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
