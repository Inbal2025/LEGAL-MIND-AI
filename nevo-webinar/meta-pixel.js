/* Meta Pixel של LEGAL MIND.
   מזהה הפיקסל נכתב כאן פעם אחת, ושני הדפים (דף הנחיתה ודף התודה) טוענים את הקובץ הזה.
   בלי מזהה, הקובץ לא עושה כלום, ולכן אפשר לפרסם אותו לפני שהפיקסל קיים.
   דף שרוצה לשלוח אירוע המרה מסמן אותו ב-<html data-lm-event="Lead">. */
(function () {
  var PIXEL_ID = "2234362747126278";   /* Legal Mind - legalmind.co.il (נוצר 18.10.2026 בחשבון המודעות של צחי) */
  if (!PIXEL_ID) return;

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  /* אירוע המרה של הדף (למשל Lead בדף התודה) */
  var ev = document.documentElement.getAttribute('data-lm-event');
  if (ev) fbq('track', ev, { content_name: document.documentElement.getAttribute('data-lm-content') || document.title });

  /* לחיצה על כפתור הרשמה בדף הנחיתה: אירוע ביניים, עוזר למטא ללמוד גם לפני שיש הרשמות */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.js-reg, a#reg-btn');
    if (a) fbq('trackCustom', 'RegisterClick', { content_name: 'nevo-webinar' });
  }, true);
})();
