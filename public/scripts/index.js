const themeSwitch = document.querySelector('select');
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});
