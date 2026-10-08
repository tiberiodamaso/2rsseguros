/*
 * Comportamento do site: links de WhatsApp + dataLayer, indicador de horário
 * e banner de cookies (Consent Mode v2). Depende de config.js.
 */
(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  window.dataLayer = window.dataLayer || [];
  if (!C) return;

  /* ---------- WhatsApp ---------- */

  function waUrl(product) {
    var msg = C.messages[product] || C.messages['saude-geral'];
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  var waLinks = document.querySelectorAll('a.js-whatsapp');
  for (var i = 0; i < waLinks.length; i++) {
    var a = waLinks[i];
    a.href = waUrl(a.getAttribute('data-wa-product'));
    a.target = '_blank';
    a.rel = 'noopener';
  }

  // E-mail montado em tempo de execução: o HTML não contém "@", o que afasta robôs coletores.
  var emails = document.querySelectorAll('a.js-email');
  for (var m = 0; m < emails.length; m++) {
    var addr = emails[m].getAttribute('data-u') + String.fromCharCode(64) + emails[m].getAttribute('data-d');
    emails[m].href = 'mailto:' + addr;
    emails[m].textContent = addr;
  }

  var numbers = document.querySelectorAll('.js-wa-number');
  for (var n = 0; n < numbers.length; n++) numbers[n].textContent = C.whatsappDisplay;

  // Não chama preventDefault: o link abre normalmente em nova aba.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a.js-whatsapp') : null;
    if (!a) return;
    window.dataLayer.push({
      event: 'whatsapp_click',
      wa_location: a.getAttribute('data-wa-location'),
      wa_page: a.getAttribute('data-wa-page'),
      wa_product: a.getAttribute('data-wa-product')
    });
  });

  /* ---------- Indicador de horário ---------- */

  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return +p[0] * 60 + +p[1];
  }

  function isOpen(date) {
    var parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: C.timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(date).forEach(function (p) { parts[p.type] = p.value; });
    var range = C.hours[DAYS[parts.weekday]];
    if (!range) return false;
    var now = +parts.hour * 60 + +parts.minute;
    return now >= toMinutes(range[0]) && now < toMinutes(range[1]);
  }

  function updateStatus() {
    var open;
    try { open = isOpen(new Date()); } catch (err) { return; }
    var els = document.querySelectorAll('.js-wa-status');
    for (var s = 0; s < els.length; s++) {
      els[s].setAttribute('data-open', open ? 'true' : 'false');
      var t = els[s].querySelector('.js-wa-status-text');
      if (t) t.textContent = open ? C.statusText.open : C.statusText.closed;
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Banner de cookies (LGPD + Consent Mode v2) ---------- */
  // O consentimento padrão ("denied") é definido inline no <head>, antes do GTM.

  var KEY = '2rs-consent';
  var banner = document.getElementById('cookie-banner');

  function stored() {
    try { return localStorage.getItem(KEY); } catch (err) { return null; }
  }

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (err) { /* modo privado: vale só nesta página */ }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value
      });
    }
    window.dataLayer.push({ event: 'consent_update', consent_status: value });
    if (banner) banner.hidden = true;
  }

  if (banner) {
    if (!stored()) banner.hidden = false;
    banner.querySelector('.js-consent-accept').addEventListener('click', function () { choose('granted'); });
    banner.querySelector('.js-consent-reject').addEventListener('click', function () { choose('denied'); });
  }

  var prefs = document.querySelectorAll('.js-cookie-prefs');
  for (var c = 0; c < prefs.length; c++) {
    prefs[c].addEventListener('click', function () { if (banner) banner.hidden = false; });
  }
})();
