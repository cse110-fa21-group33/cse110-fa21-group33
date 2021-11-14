// test.js
/**
 * Initialize event listeners
 */
function init() {
  const title = document.querySelector('h1');
  title.addEventListener('click', () => {
    title.textContent = 'This should be the new text';
  });
}

window.addEventListener('DOMContentLoaded', init);
