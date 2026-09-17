(() => {
  // ── Mobile navigation ──
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // ── Required DOM dropdown activity ──
  const dropdownButton = document.querySelector('#dropdownBtn');
  const dropdownMenu = document.querySelector('#dropdownMenu');
  const dropdownArrow = document.querySelector('#dropdownArrow');

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener('click', function (event) {
      event.stopPropagation();

      // Required: add/remove the CSS class instead of setting display in JS.
      const isOpen = dropdownMenu.classList.toggle('show');
      dropdownButton.setAttribute('aria-expanded', String(isOpen));

      // Bonus: change the arrow while the dropdown is open.
      if (dropdownArrow) {
        dropdownArrow.textContent = isOpen ? '▲' : '▼';
      }
    });

    // Bonus: close the dropdown when clicking anywhere outside it.
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.nav-dropdown')) {
        dropdownMenu.classList.remove('show');
        dropdownButton.setAttribute('aria-expanded', 'false');

        if (dropdownArrow) {
          dropdownArrow.textContent = '▼';
        }
      }
    });

    // Close after selecting a dropdown page.
    dropdownMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        dropdownMenu.classList.remove('show');
        dropdownButton.setAttribute('aria-expanded', 'false');
        if (dropdownArrow) dropdownArrow.textContent = '▼';
      });
    });
  }

  // Keep the original mobile navbar behavior.
  if (toggle && nav) {
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
