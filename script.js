
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var PRINTING_KEY = 'printing';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  /* Day night printing */
  var printingToggle = doc.getElementById('printing-toggle');

  function currentPrinting() {
    var set = root.getAttribute('data-printing');
    if (set === 'day' || set === 'night') return set;
    return prefersDark.matches ? 'night' : 'day';
  }

  function syncPrintingToggle() {
    if (!printingToggle) return;
    var night = currentPrinting() === 'night';
    printingToggle.setAttribute('aria-pressed', String(night));
    printingToggle.setAttribute('aria-label', night ? 'Night printing on' : 'Night printing off');
  }

  if (printingToggle) {
    printingToggle.addEventListener('click', function () {
      var next = currentPrinting() === 'night' ? 'day' : 'night';
      root.setAttribute('data-printing', next);
      try { localStorage.setItem(PRINTING_KEY, next); } catch (e) {}
      syncPrintingToggle();
      if (thurayya) thurayya.repaint();
    });
  }
  prefersDark.addEventListener('change', function () {
    syncPrintingToggle();
    if (thurayya) thurayya.repaint();
  });
  syncPrintingToggle();

  /* Mobile navigation */
  var menuToggle = doc.getElementById('menu-toggle');
  var nav = doc.getElementById('site-nav');

  function setMenu(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuToggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  /* Footer year */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Active section in the nav */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];

  if ('IntersectionObserver' in window && navLinks.length) {
    var sections = navLinks
      .map(function (a) { return doc.querySelector(a.getAttribute('href')); })
      .concat([doc.getElementById('top'), doc.getElementById('education')])
      .filter(Boolean);

    var sectionIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        // Bands without a nav entry (poster, education) clear the marker
        var id = '#' + en.target.id;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { sectionIo.observe(s); });
  }

  /* Mobile dock: hide while a tear-off strip is on screen */
  var dock = doc.getElementById('dock');
  var strips = Array.prototype.slice.call(doc.querySelectorAll('.tearoff'));

  if (dock && 'IntersectionObserver' in window && strips.length) {
    var visibleStrips = 0;
    var dockIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        visibleStrips += en.isIntersecting ? 1 : -1;
      });
      visibleStrips = Math.max(0, visibleStrips);
      dock.classList.toggle('is-hidden', visibleStrips > 0);
    });
    strips.forEach(function (s) { dockIo.observe(s); });
  }

  /* Konami: the plates slip out of register */
  var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var konamiIdx = 0;
  var toast = doc.getElementById('toast');

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('is-on');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove('is-on'); }, 3400);
  }

  doc.addEventListener('keydown', function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        var on = doc.body.classList.toggle('misprint');
        showToast(on ? 'Misprint: the plates slipped out of register.' : 'Back in register.');
      }
    } else {
      konamiIdx = key === konami[0] ? 1 : 0;
    }
  });

  /* ثريا: the Pleiades settle into the letter dots */
  var thurayya = (function () {
    var wrap = doc.getElementById('thurayya');
    if (!wrap || !window.HTMLCanvasElement) return null;

    var word = wrap.querySelector('.thurayya-word');
    var full = wrap.querySelector('.tw-full');
    if (!word || !full) return null;

    var FULL = full.textContent.trim();

    // Pleiades, as fractions of the cluster box (matches the poster's cluster)
    var STARS = [
      [0.50, 0.46], [0.18, 0.40], [0.16, 0.66], [0.80, 0.28],
      [0.66, 0.12], [0.72, 0.70], [0.56, 0.90]
    ];

    var SVG = 'http://www.w3.org/2000/svg';

    var layer = null;      // nodes added for the live version
    var dots = [];         // { el, dot, star, sx, sy, ex, ey }
    var ticking = false;

    // Draws the word centred in the inner box, leaving a margin so no dot is clipped
    function drawWord(ctx, cw, ch, pad, font, color) {
      ctx.clearRect(0, 0, cw, ch);
      ctx.font = font;
      ctx.direction = 'rtl';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = color;
      var m = ctx.measureText(FULL);
      var inner = ch - 2 * pad;
      var y = pad + (inner + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      ctx.fillText(FULL, cw / 2, y);
    }

    function makeStar(size) {
      var s = doc.createElementNS(SVG, 'svg');
      s.setAttribute('class', 'star');
      s.setAttribute('aria-hidden', 'true');
      s.style.width = s.style.height = size + 'px';
      var use = doc.createElementNS(SVG, 'use');
      use.setAttribute('href', '#i-star');
      s.appendChild(use);
      return s;
    }

    // Split the drawn word into connected shapes; the small ones are its letter dots
    function findDots(a, w, h) {
      var mask = new Uint8Array(w * h);
      for (var i = 0; i < w * h; i++) {
        if (a[i * 4 + 3] > 8) mask[i] = 1;
      }
      var blobs = [];
      var stack = [];
      for (var p = 0; p < w * h; p++) {
        if (mask[p] !== 1) continue;
        var blob = { minX: w, minY: h, maxX: 0, maxY: 0, px: [] };
        mask[p] = 2;
        stack.push(p);
        while (stack.length) {
          var q = stack.pop();
          var x = q % w, y = (q / w) | 0;
          blob.px.push(q);
          if (x < blob.minX) blob.minX = x;
          if (x > blob.maxX) blob.maxX = x;
          if (y < blob.minY) blob.minY = y;
          if (y > blob.maxY) blob.maxY = y;
          if (x > 0 && mask[q - 1] === 1) { mask[q - 1] = 2; stack.push(q - 1); }
          if (x < w - 1 && mask[q + 1] === 1) { mask[q + 1] = 2; stack.push(q + 1); }
          if (y > 0 && mask[q - w] === 1) { mask[q - w] = 2; stack.push(q - w); }
          if (y < h - 1 && mask[q + w] === 1) { mask[q + w] = 2; stack.push(q + w); }
        }
        blobs.push(blob);
      }
      var largest = 0;
      blobs.forEach(function (bl) { if (bl.px.length > largest) largest = bl.px.length; });
      return blobs.filter(function (bl) {
        return bl.px.length > 24 && bl.px.length < largest * 0.08;
      });
    }

    function teardown() {
      if (layer) layer.forEach(function (n) { n.remove(); });
      layer = null;
      dots = [];
      wrap.classList.remove('is-live');
    }

    function build() {
      teardown();
      var box = word.getBoundingClientRect();
      var w = Math.ceil(box.width), h = Math.ceil(box.height);
      if (!w || !h) return;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var pad = Math.ceil(h * 0.2);
      var cw = Math.ceil((w + 2 * pad) * dpr), ch = Math.ceil((h + 2 * pad) * dpr);
      var cs = getComputedStyle(word);
      var color = cs.color;
      var font = cs.fontWeight + ' ' + parseFloat(cs.fontSize) * dpr + 'px ' + cs.fontFamily;

      var canvas = doc.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      var ctx = canvas.getContext('2d', { willReadFrequently: true });
      drawWord(ctx, cw, ch, pad * dpr, font, color);

      var image = ctx.getImageData(0, 0, cw, ch);
      var da = new Uint8ClampedArray(image.data);
      var blobs = findDots(da, cw, ch);

      // Anything other than a handful of dots means an unexpected font: keep the plain word.
      if (blobs.length < 3 || blobs.length > STARS.length) return;

      // The word with its dots lifted out, drawn where the real word sits
      blobs.forEach(function (bl) {
        bl.px.forEach(function (q) { image.data[q * 4 + 3] = 0; });
      });
      ctx.putImageData(image, 0, 0);

      layer = [];
      canvas.className = 'tw-canvas';
      canvas.style.width = w + 2 * pad + 'px';
      canvas.style.height = h + 2 * pad + 'px';
      canvas.style.left = canvas.style.top = -pad + 'px';
      canvas.setAttribute('aria-hidden', 'true');
      word.appendChild(canvas);
      layer.push(canvas);

      // The cluster hangs in the open sky the band leaves above the word, on the axis
      var sky = box.top - wrap.getBoundingClientRect().top;
      var clusterH = Math.min(sky * 0.8, h * 0.6), clusterW = clusterH * 1.15;
      var cx0 = w / 2 - clusterW / 2, cy0 = -sky + (sky - clusterH) / 2;
      var starSize = Math.max(14, clusterW * 0.2);

      blobs.sort(function (p, q) { return p.minX - q.minX; });
      var order = STARS.map(function (s, i) { return i; }).sort(function (p, q) { return STARS[p][0] - STARS[q][0]; });
      var used = {};
      // Spread landing dots across the cluster's stars from left to right
      var pick = blobs.map(function (bl, i) {
        var idx = order[Math.round(i * (order.length - 1) / Math.max(1, blobs.length - 1))];
        while (used[idx]) idx = order[(order.indexOf(idx) + 1) % order.length];
        used[idx] = true;
        return idx;
      });

      blobs.forEach(function (bl, i) {
        var bw = bl.maxX - bl.minX + 1, bh = bl.maxY - bl.minY + 1;
        var c = doc.createElement('canvas');
        c.width = bw;
        c.height = bh;
        var cx = c.getContext('2d');
        var img = cx.createImageData(bw, bh);
        bl.px.forEach(function (q) {
          var x = q % cw - bl.minX, y = ((q / cw) | 0) - bl.minY;
          var o = (y * bw + x) * 4, s = q * 4;
          img.data[o] = da[s]; img.data[o + 1] = da[s + 1]; img.data[o + 2] = da[s + 2]; img.data[o + 3] = da[s + 3];
        });
        cx.putImageData(img, 0, 0);
        c.style.width = bw / dpr + 'px';
        c.style.height = bh / dpr + 'px';

        // Each traveller is a star that becomes its letter dot as it lands
        var el = doc.createElement('span');
        el.className = 'tw-dot';
        el.style.width = bw / dpr + 'px';
        el.style.height = bh / dpr + 'px';
        el.setAttribute('aria-hidden', 'true');
        var star = makeStar(pick[i] === 0 ? starSize * 1.35 : starSize);
        el.appendChild(c);
        el.appendChild(star);
        word.appendChild(el);
        layer.push(el);

        var at = STARS[pick[i]];
        dots.push({
          el: el,
          dot: c,
          star: star,
          ex: bl.minX / dpr - pad,
          ey: bl.minY / dpr - pad,
          sx: cx0 + at[0] * clusterW - bw / dpr / 2,
          sy: cy0 + at[1] * clusterH - bh / dpr / 2
        });
      });

      // Stars with no letter to land in stay in the sky
      STARS.forEach(function (at, i) {
        if (used[i]) return;
        var el = doc.createElement('span');
        el.className = 'tw-dot';
        el.setAttribute('aria-hidden', 'true');
        el.appendChild(makeStar(i === 0 ? starSize * 1.35 : starSize));
        el.style.transform = 'translate(' + (cx0 + at[0] * clusterW).toFixed(2) + 'px,' + (cy0 + at[1] * clusterH).toFixed(2) + 'px)';
        word.appendChild(el);
        layer.push(el);
      });

      wrap.classList.add('is-live');
      update();
    }

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

    function progress() {
      if (reduceMotion.matches) return 1;
      var r = word.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      return clamp((vh * 0.92 - r.top) / (vh * 0.6));
    }

    function update() {
      ticking = false;
      if (!dots.length) return;
      var p = progress();
      var n = dots.length;
      dots.forEach(function (d, i) {
        var t = ease(clamp((p - i * 0.07) / (1 - (n - 1) * 0.07)));
        var x = d.sx + (d.ex - d.sx) * t;
        var y = d.sy + (d.ey - d.sy) * t;
        d.el.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
        // The star gives way to the dot over the last stretch of the flight
        var land = clamp((t - 0.55) / 0.45);
        d.dot.style.opacity = land.toFixed(3);
        d.star.style.opacity = (1 - land).toFixed(3);
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    var resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    }

    function start() {
      build();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      reduceMotion.addEventListener('change', update);
    }

    if (doc.fonts && doc.fonts.load) {
      var cs = getComputedStyle(word);
      doc.fonts.load(cs.fontWeight + ' 100px ' + cs.fontFamily, FULL)
        .then(function () { return doc.fonts.ready; })
        .then(start, start);
    } else {
      window.addEventListener('load', start);
    }

    return { repaint: function () { if (layer) build(); } };
  })();
})();
