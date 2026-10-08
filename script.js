/* ============================================================
   Wael Qubaisi — Portfolio
   Vanilla JS. Theme, mobile nav, scroll reveals, score,
   a Konami-code easter egg and a playable canvas mini-game.
   No dependencies, no build step.
   ============================================================ */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var THEME_KEY = 'theme';

  // Enable reveal styling (content stays visible if JS never runs).
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var themeToggle = doc.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '\u263E' : '\u2600';
      themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  setTheme(currentTheme());

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

  /* ---------- Scroll-triggered reveals ---------- */
  var revealEls = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));

  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
          setTimeout(function () {
            en.target.removeAttribute('data-reveal');
            en.target.classList.remove('is-in');
          }, 700);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Header score counter ---------- */
  var scoreEl = doc.getElementById('score');
  if (scoreEl && !reduceMotion) {
    var score = 0;
    var target = 1000;
    var tick = setInterval(function () {
      score += 37;
      if (score >= target) { score = target; clearInterval(tick); }
      scoreEl.textContent = String(Math.floor(score)).padStart(6, '0');
    }, 40);
  }

  /* ---------- Konami-code easter egg ---------- */
  var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var konamiIdx = 0;

  function activateCheat() {
    var toast = doc.getElementById('cheat-toast');
    if (toast) {
      toast.textContent = 'CHEAT ACCEPTED — +1000 EXP · PLAYER 2 JOINED';
      toast.classList.add('is-on');
      clearTimeout(activateCheat.t);
      activateCheat.t = setTimeout(function () { toast.classList.remove('is-on'); }, 3400);
    }
    doc.body.classList.add('cheat-mode');
    if (scoreEl) scoreEl.textContent = '001000';
  }

  doc.addEventListener('keydown', function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) { konamiIdx = 0; activateCheat(); }
    } else {
      konamiIdx = (key === konami[0]) ? 1 : 0;
    }
  });

  /* ---------- Arcade mini-game: block dodger ---------- */
  var game = (function () {
    var canvas = doc.getElementById('game');
    if (!canvas) return null;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;

    var state = 'idle'; // idle | playing | over
    var paddle = { x: W / 2 - 24, y: H - 18, w: 48, h: 8 };
    var blocks = [];
    var score = 0, lives = 3;
    var spawnTimer = 0, last = 0, raf = null;
    var keys = { left: false, right: false };

    var scoreEl = doc.getElementById('game-score');
    var livesEl = doc.getElementById('game-lives');
    var startBtn = doc.getElementById('game-start');

    function updateHud() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (livesEl) livesEl.textContent = String(lives);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#2a2113';
      ctx.fillRect(0, H - 2, W, 2);
      ctx.fillStyle = '#ffb238';
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
      ctx.fillStyle = '#ff5a4e';
      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }
      ctx.font = '12px Silkscreen, monospace';
      ctx.textAlign = 'center';
      if (state === 'idle') {
        ctx.fillStyle = '#f4e7cb';
        ctx.fillText('PRESS INSERT COIN', W / 2, H / 2);
      } else if (state === 'over') {
        ctx.fillStyle = '#ff5a4e';
        ctx.fillText('GAME OVER', W / 2, H / 2);
        ctx.fillStyle = '#f4e7cb';
        ctx.fillText('PRESS R TO RETRY', W / 2, H / 2 + 22);
      }
    }

    function reset() {
      blocks = [];
      score = 0; lives = 3;
      paddle.x = W / 2 - 24;
      spawnTimer = 0;
      updateHud();
    }

    function spawn() {
      var s = 12;
      blocks.push({ x: Math.random() * (W - s), y: -s, w: s, h: s });
    }

    function update(dt) {
      var dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      paddle.x += dir * 260 * dt;
      paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

      spawnTimer += dt;
      if (spawnTimer > (1.0 - Math.min(0.6, score * 0.004))) {
        spawnTimer = 0;
        spawn();
      }

      var speed = 90 + score * 1.2;
      for (var i = blocks.length - 1; i >= 0; i--) {
        var b = blocks[i];
        b.y += speed * dt;
        if (b.y + b.h >= paddle.y && b.y <= paddle.y + paddle.h &&
            b.x + b.w >= paddle.x && b.x <= paddle.x + paddle.w) {
          blocks.splice(i, 1);
          score++;
          updateHud();
          continue;
        }
        if (b.y > H) {
          blocks.splice(i, 1);
          lives--;
          updateHud();
          if (lives <= 0) { state = 'over'; return; }
        }
      }
    }

    function loop(ts) {
      if (state !== 'playing') { draw(); return; }
      var dt = Math.min(0.05, (ts - last) / 1000 || 0);
      last = ts;
      update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (state === 'playing') return;
      state = 'playing';
      reset();
      last = performance.now();
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }

    function moveTo(px) {
      var rect = canvas.getBoundingClientRect();
      var scale = W / (rect.width || W);
      paddle.x = Math.max(0, Math.min(W - paddle.w, (px - rect.left) * scale - paddle.w / 2));
    }

    if (startBtn) {
      startBtn.addEventListener('click', function () { start(); });
    }

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (state !== 'over') e.preventDefault();
      }
      if (e.key === 'ArrowLeft') { keys.left = true; }
      if (e.key === 'ArrowRight') { keys.right = true; }
      if (e.key === 'r' || e.key === 'R') { if (state !== 'playing') start(); }
    });
    doc.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft') { keys.left = false; }
      if (e.key === 'ArrowRight') { keys.right = false; }
    });

    canvas.addEventListener('pointermove', function (e) { if (state === 'playing') moveTo(e.clientX); });
    canvas.addEventListener('pointerdown', function (e) { if (state === 'playing') moveTo(e.clientX); });

    draw();

    return {
      start: start,
      isPlaying: function () { return state === 'playing'; }
    };
  })();
})();
