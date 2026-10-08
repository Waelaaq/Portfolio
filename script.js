/* ============================================================
   Wael Qubaisi — Portfolio
   Vanilla JS. No dependencies, no build step.
   ============================================================ */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var THEME_KEY = 'theme';

  /* ---------- Theme toggle ---------- */
  var themeToggle = doc.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    // Update the toggle's icon + state to reflect what the user can switch TO.
    if (themeToggle) {
      // Sun icon while dark (click to go light), moon icon while light.
      themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '\u2600' : '\u263E';
      themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // Sync UI to whatever theme the inline head script already applied.
  setTheme(currentTheme());

  /* ---------- Project tag filters ----------
     Filter chips are generated from the tags present on each card, so you
     never edit this list. To add a project, just add a <span class="tag">
     in its card and it will appear here automatically. */
  var filterBar = doc.getElementById('filter-bar');
  var grid = doc.getElementById('projects-grid');
  var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.project-card')) : [];

  function cardTags(card) {
    return Array.prototype.map.call(card.querySelectorAll('.tag'), function (t) {
      return t.textContent.trim();
    });
  }

  function uniqueTags() {
    var seen = [];
    cards.forEach(function (card) {
      cardTags(card).forEach(function (tag) {
        if (seen.indexOf(tag) === -1) seen.push(tag);
      });
    });
    return seen;
  }

  function buildFilters() {
    if (!filterBar) return;
    var tags = ['All'].concat(uniqueTags());
    filterBar.innerHTML = '';
    tags.forEach(function (tag) {
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-chip';
      btn.textContent = tag;
      btn.setAttribute('data-filter', tag);
      btn.setAttribute('aria-pressed', tag === 'All' ? 'true' : 'false');
      btn.addEventListener('click', function () { applyFilter(tag); });
      filterBar.appendChild(btn);
    });
  }

  function applyFilter(filter) {
    var chips = filterBar.querySelectorAll('.filter-chip');
    Array.prototype.forEach.call(chips, function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === filter));
    });

    cards.forEach(function (card) {
      var tags = cardTags(card);
      var show = filter === 'All' || tags.indexOf(filter) !== -1;
      card.classList.toggle('is-hidden', !show);
    });
  }

  if (filterBar && grid) {
    buildFilters();
  }

  /* ---------- Mobile navigation ---------- */
  var menuToggle = doc.getElementById('menu-toggle');
  var nav = doc.getElementById('site-nav');

  function setMenu(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    // Close the menu when a link is chosen or Escape is pressed.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
