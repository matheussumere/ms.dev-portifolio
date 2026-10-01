// Events describe navigation intent, never a confirmed sale or message delivery.
(function () {
  let settings = { enabled: false };
  const names = new Set(['pageview', 'demo_view', 'demo_open', 'quote_intent', 'quote_whatsapp_click', 'contact_click']);
  window.configureAnalytics = config => { settings = config || { enabled: false }; };
  window.trackContactEvent = (name, properties = {}) => {
    if (!names.has(name)) return;
    const props = {};
    for (const key of ['template', 'service', 'source', 'channel']) {
      if (typeof properties[key] === 'string') props[key] = properties[key].slice(0, 80);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...props });
    window.dispatchEvent(new CustomEvent('msdev:analytics', { detail: { event: name, ...props } }));
    if (!settings.enabled || !settings.domain) return;
    try {
      const endpoint = new URL(settings.endpoint);
      if (endpoint.protocol !== 'https:') return;
      const payload = JSON.stringify({ name, url: location.origin + location.pathname, domain: settings.domain, referrer: null, props });
      // No query string, form values, cookies or referrer in the event payload.
      fetch(endpoint.href, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: payload, credentials: 'omit', keepalive: true }).catch(() => {});
    } catch { /* Analytics must never prevent a contact. */ }
  };
})();
