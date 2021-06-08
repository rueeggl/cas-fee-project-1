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
  isDark ? document.getElementById('dark-theme').setAttribute('selected', 'selected') : document.getElementById('light-theme').setAttribute('selected', 'selected');
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

/**
 * Theme Persistance after Reload and Redirect
 */
function getThemeAfterReload() {
  if (themeToggle !== null) {
    if (currentTheme === 'light-theme') {
      document.getElementById('light-theme').setAttribute('selected', 'selected');
    } else if (currentTheme === 'dark-theme') {
      document.getElementById('dark-theme').setAttribute('selected', 'selected');
    } else {
      document.getElementById('light-theme').setAttribute('selected', 'selected');
    }
  }
}
document.addEventListener('DOMContentLoaded', getThemeAfterReload);
