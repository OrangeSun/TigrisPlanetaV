/* 虎卫五 — 横屏分镜、三语切换、截图位渲染 */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var COPY = window.COPY || {};
  var SUPPORTED = ['zh', 'en', 'ja'];
  var LANG_KEY = 'tgv-lang';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var deck = document.getElementById('deck');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var bars = document.getElementById('bars');
  var pageNow = document.getElementById('pageNow');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var shots = document.getElementById('shots');
  var shotsPrev = document.getElementById('shotsPrev');
  var shotsNext = document.getElementById('shotsNext');
  var quarkBtn = document.getElementById('quarkBtn');
  var dlPending = document.getElementById('dlPending');
  var logoSlot = document.getElementById('logoSlot');
  var toastEl = document.getElementById('toast');
  var warning = document.getElementById('warning');
  var warningAccept = document.getElementById('warningAccept');

  var currentLang = 'zh';
  var index = 0;
  var wheelLock = 0;
  var toastTimer = null;

  /* ---------------- 语言 ---------------- */

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { saved = null; }
    if (saved && SUPPORTED.indexOf(saved) > -1) return saved;

    var primary = (navigator.languages && navigator.languages[0]) || navigator.language || 'zh';
    var code = String(primary).toLowerCase().slice(0, 2);
    return SUPPORTED.indexOf(code) > -1 ? code : 'zh';
  }

  function resolve(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = 'zh';
    currentLang = lang;

    var dict = COPY[lang] || COPY.zh || {};
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var key = el.getAttribute('data-i18n');
      var value = resolve(dict, key);
      if (value === undefined) value = resolve(COPY.zh || {}, key);
      if (typeof value === 'string') el.textContent = value;
    });

    if (dict.meta) {
      document.title = dict.meta.title || document.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && dict.meta.desc) desc.setAttribute('content', dict.meta.desc);
    }

    Array.prototype.forEach.call(document.querySelectorAll('.lang button, .warning-lang button'), function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (bgmBtn) bgmBtn.setAttribute('aria-label', dict.bgm || '背景音乐');

    Array.prototype.forEach.call(bars.querySelectorAll('button'), function (btn, i) {
      var nav = dict.nav || {};
      var key = ['home', 'world', 'excerpt', 'gameplay', 'download'][i];
      btn.setAttribute('aria-label', nav[key] || key);
    });

    renderShots();
    syncDownload();

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  }

  /* ---------------- 分屏导航 ---------------- */

  function clamp(n) { return Math.max(0, Math.min(panels.length - 1, n)); }

  function go(n, silent) {
    index = clamp(n);
    deck.style.transform = 'translate3d(' + (-index * 20) + '%,0,0)';
    document.documentElement.style.setProperty('--i', index);

    panels.forEach(function (p, i) {
      var active = i === index;
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (!silent) p.inert = !active;
    });

    Array.prototype.forEach.call(bars.children, function (b, i) {
      b.classList.toggle('is-active', i === index);
      b.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    Array.prototype.forEach.call(document.querySelectorAll('.hud-nav button'), function (b, i) {
      b.classList.toggle('is-active', i === index);
    });

    pageNow.textContent = String(index + 1).padStart(2, '0');
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === panels.length - 1;

    if (history.replaceState) {
      history.replaceState(null, '', '#' + panels[index].id);
    }
  }

  function buildBars() {
    panels.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.innerHTML = '<i></i>';
      b.addEventListener('click', function () { go(i); });
      bars.appendChild(b);
    });
    prevBtn.addEventListener('click', function () { go(index - 1); });
    nextBtn.addEventListener('click', function () { go(index + 1); });

    Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        go(parseInt(el.getAttribute('data-go'), 10));
      });
    });
  }

  /* 滚轮：纵向滚动 → 切换分屏；在截图条上横向滚动 → 浏览截图 */
  window.addEventListener('wheel', function (e) {
    if (warningOpen()) return;
    if (e.ctrlKey) return;
    var inShots = e.target.closest && e.target.closest('.shots');
    if (inShots && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    if (Math.abs(e.deltaY) < 12) return;

    var now = Date.now();
    if (now - wheelLock < 760) return;
    wheelLock = now;
    go(index + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  /* 键盘 */
  window.addEventListener('keydown', function (e) {
    if (warningOpen()) return;
    if (e.target.closest('input, textarea')) return;
    var focusInShots = document.activeElement && document.activeElement.closest('.shots');
    if (focusInShots && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;

    var handled = true;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': go(index + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': go(index - 1); break;
      case 'Home': go(0); break;
      case 'End': go(panels.length - 1); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  });

  /* 触摸滑动 */
  var touchX = 0, touchY = 0, tracking = false;
  deck.addEventListener('touchstart', function (e) {
    if (warningOpen()) return;
    if (e.touches.length !== 1) return;
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  deck.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy)) return;
    if (e.target.closest('.shots')) return;
    go(index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ---------------- 截图位 ---------------- */

  function captionOf(item) {
    var cap = item.caption;
    if (!cap) return '';
    if (typeof cap === 'string') return cap;
    return cap[currentLang] || cap.zh || cap.en || '';
  }

  function renderShots() {
    if (!shots) return;
    var list = Array.isArray(SITE.screenshots) ? SITE.screenshots.filter(function (s) { return s && s.src; }) : [];
    var dict = COPY[currentLang] || COPY.zh || {};
    shots.innerHTML = '';

    if (!list.length) {
      for (var n = 0; n < 4; n++) {
        var ph = document.createElement('figure');
        ph.className = 'shot shot--empty';
        ph.innerHTML =
          '<span class="shot-code">SHOT ' + String(n + 1).padStart(2, '0') + '</span>' +
          '<figcaption class="shot-empty"><b>' + String(n + 1).padStart(2, '0') + '</b>' +
          '<span>' + ((dict.gameplay && dict.gameplay.empty) || '截图待接入') + '</span></figcaption>';
        shots.appendChild(ph);
      }
    } else {
      list.forEach(function (item, i) {
        var fig = document.createElement('figure');
        fig.className = 'shot';

        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 1600;
        img.height = 900;
        fig.appendChild(img);

        var cap = captionOf(item);
        if (cap) {
          var fc = document.createElement('figcaption');
          fc.className = 'shot-cap';
          fc.textContent = cap;
          fig.appendChild(fc);
        }
        fig.setAttribute('data-i', String(i));
        shots.appendChild(fig);
      });
    }
    updateShotsArrows();
  }

  function updateShotsArrows() {
    if (!shots || !shotsPrev) return;
    var max = shots.scrollWidth - shots.clientWidth - 2;
    shotsPrev.disabled = shots.scrollLeft <= 2;
    shotsNext.disabled = shots.scrollLeft >= max;
  }

  function slideShots(dir) {
    var first = shots.querySelector('.shot');
    var step = first ? first.getBoundingClientRect().width + 16 : 420;
    shots.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' });
  }

  if (shots) {
    shotsPrev.addEventListener('click', function () { slideShots(-1); });
    shotsNext.addEventListener('click', function () { slideShots(1); });
    shots.addEventListener('scroll', updateShotsArrows, { passive: true });
    window.addEventListener('resize', updateShotsArrows);

    /* 鼠标拖拽横向浏览 */
    var down = false, startX = 0, startLeft = 0, moved = false;
    shots.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false;
      startX = e.clientX;
      startLeft = shots.scrollLeft;
      shots.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      shots.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      shots.classList.remove('is-dragging');
    });
    shots.addEventListener('click', function (e) { if (moved) e.preventDefault(); }, true);
  }

  /* ---------------- 下载 ---------------- */

  function quarkUrl() {
    return (SITE.download && typeof SITE.download.quark === 'string') ? SITE.download.quark.trim() : '';
  }

  function syncDownload() {
    var url = quarkUrl();
    var open = !!url;
    quarkBtn.href = open ? url : '#';
    quarkBtn.classList.toggle('is-pending', !open);
    quarkBtn.setAttribute('aria-disabled', open ? 'false' : 'true');
    dlPending.hidden = open;
  }

  quarkBtn.addEventListener('click', function (e) {
    if (!quarkUrl()) {
      e.preventDefault();
      showToast((COPY[currentLang] || COPY.zh).download.toast);
    }
  });

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('is-on');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400);
  }

  /* ---------------- LOGO 位 ---------------- */

  function mountLogo() {
    var src = (SITE.logo || '').trim();
    if (!src || !logoSlot) return;
    logoSlot.innerHTML = '';
    logoSlot.classList.add('has-logo');
    var img = document.createElement('img');
    img.src = src;
    img.alt = '虎卫五';
    logoSlot.appendChild(img);
  }

  /* ---------------- 内容预警 ---------------- */

  function warningOpen() { return !!warning && !warning.hidden; }

  function setBehindInert(on) {
    ['.hud', '.deck', '.deck-foot'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.inert = on;
    });
  }

  if (warning && warningAccept) {
    setBehindInert(true);
    window.setTimeout(function () { warningAccept.focus({ preventScroll: true }); }, 120);

    warningAccept.addEventListener('click', function () {
      /* 在用户手势内启动音乐，避免被浏览器自动播放策略拦截 */
      if (bgmWanted) playBgm();
      warning.classList.add('is-closing');
      window.setTimeout(function () {
        warning.hidden = true;
        warning.classList.remove('is-closing');
        setBehindInert(false);
        var brand = document.querySelector('.brand');
        if (brand) brand.focus({ preventScroll: true });
      }, 380);
    });
  }

  /* ---------------- 背景音乐 ---------------- */

  var bgm = document.getElementById('bgm');
  var bgmBtn = document.getElementById('bgmBtn');
  var BGM_KEY = 'tgv-bgm';
  var bgmWanted = true;
  try { bgmWanted = localStorage.getItem(BGM_KEY) !== 'off'; } catch (e) { bgmWanted = true; }

  function syncBgm() {
    if (!bgm || !bgmBtn) return;
    var playing = !bgm.paused && !bgm.ended;
    bgmBtn.classList.toggle('is-on', playing);
    bgmBtn.classList.toggle('is-off', !playing);
    bgmBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  function playBgm() {
    if (!bgm) return;
    bgm.volume = 0.42;
    var p = bgm.play();
    if (p && typeof p.catch === 'function') p.catch(function () { syncBgm(); });
  }

  if (bgm && bgmBtn) {
    syncBgm();
    bgmBtn.addEventListener('click', function () {
      if (bgm.paused) {
        bgmWanted = true;
        playBgm();
      } else {
        bgmWanted = false;
        bgm.pause();
      }
      try { localStorage.setItem(BGM_KEY, bgmWanted ? 'on' : 'off'); } catch (e) { /* ignore */ }
      syncBgm();
    });
    bgm.addEventListener('play', syncBgm);
    bgm.addEventListener('pause', syncBgm);
  }

  /* ---------------- 页尾声明（悬停 / 点击） ---------------- */
  function closeLegal() {
    Array.prototype.forEach.call(document.querySelectorAll('.legal-item.is-open'), function (item) {
      item.classList.remove('is-open');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.legal-item'), function (item) {
    var btn = item.querySelector('.legal-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = item.classList.contains('is-open');
      closeLegal();
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  document.addEventListener('click', closeLegal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLegal();
  });

  /* ---------------- 初始化 ---------------- */

  buildBars();
  mountLogo();

  var initial = 0;
  var hash = (location.hash || '').replace('#', '');
  panels.forEach(function (p, i) { if (p.id === hash) initial = i; });
  go(initial, true);

  Array.prototype.forEach.call(document.querySelectorAll('.lang button, .warning-lang button'), function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); });
  });

  applyLang(detectLang());
  go(initial, false);
})();
