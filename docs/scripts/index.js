/**
 * Theme Logic
 */

const themeToggle = document.querySelector('#theme-selection');
const currentTheme = localStorage.getItem('theme');
const pageTheme = document.body;

let isDark = false;

if (currentTheme === 'dark-theme') {
  pageTheme.classList.toggle('dark-theme');
}

function themeMode() {
  isDark = !isDark;
  isDark ? document.getElementById('dark-theme').selected = true : document.getElementById('light-theme').selected = true;
  pageTheme.classList.toggle('dark-theme');

  let theme = 'light-theme';
  if (pageTheme.classList.contains('dark-theme')) {
    theme = 'dark-theme';
  }
  localStorage.setItem('theme', theme);
}

if (themeToggle !== null) {
  themeToggle.addEventListener('change', themeMode);
}
