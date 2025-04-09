// js/theme-handler.js
export function initThemeHandler() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  function applyTheme(shouldBeDark) {
    if (shouldBeDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    [themeToggle, themeToggleMobile].forEach(toggle => {
      if (toggle) toggle.checked = shouldBeDark;
    });
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      applyTheme(savedTheme === 'dark');
    } else {
      applyTheme(systemPrefersDark);
    }
  }

  function setupThemeToggles() {
    [themeToggle, themeToggleMobile].forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('change', (e) => {
          applyTheme(e.target.checked);
        });
      }
    });
  }

  function watchSystemPreference() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
      }
    });
  }

  initTheme();
  setupThemeToggles();
  watchSystemPreference();
}