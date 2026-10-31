'use strict';
(() => {
  const root = document.documentElement;
  let theme = 'dark';
  try {
    if (localStorage.getItem('theme') === 'light') theme = 'light';
  } catch { /* Browsing with storage disabled still supports toggling. */ }

  function applyTheme() {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f6f8f2' : '#101510';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.textContent = 'Light mode';
      button.setAttribute('aria-pressed', String(theme === 'light'));
    }
  }

  // Run in the head before styles load to prevent a flash of the wrong theme.
  applyTheme();
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', theme); } catch { /* Optional persistence. */ }
      applyTheme();
    });
  });
})();
