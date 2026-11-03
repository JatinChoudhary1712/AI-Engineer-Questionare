// Runs in the document head so a saved theme is applied before content paints.
(() => {
  'use strict';
  const key = 'recall.theme.v1';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => value === 'dark' || value === 'light';
  let selected = null;
  try { const stored = localStorage.getItem(key); if (valid(stored)) selected = stored; } catch { /* Use device preference when storage is unavailable. */ }
  const apply = () => {
    document.documentElement.dataset.theme = selected || 'light';
    window.dispatchEvent(new Event('recall:theme'));
  };
  window.RecallTheme = {
    get current() { return document.documentElement.dataset.theme; },
    set(value) {
      if (!valid(value)) return;
      selected = value;
      try { localStorage.setItem(key, value); } catch { /* The selection still works for this visit. */ }
      apply();
    }
  };
  preference.addEventListener('change', () => { if (!selected) apply(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    selected = valid(event.newValue) ? event.newValue : null;
    apply();
  });
  apply();
})();
