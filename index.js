function toggle() {
  document.body.classList.add('animation-ready');
  document.body.classList.toggle('dark');
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    toggle();
  }
});

document.getElementById('theme-toggle').addEventListener('change', function() {
  toggle();
});
