/* ═══════════════════════════════════════════════
   common.js — 全站共用行为（index 除外，它自带一套）
   1. 自定义光标跟随 + hover 放大
   2. 返回顶部按钮
   ═══════════════════════════════════════════════ */
(() => {
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    /* 需要光标放大的元素在这里加选择器 */
    document.querySelectorAll('a, button, .meta-chip, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  /* 带 data-trailer="URL" 的元素：hover 光标变 PLAY TRAILER，点击新标签页打开 */
  document.querySelectorAll('[data-trailer]').forEach(el => {
    if (cursor) {
      el.addEventListener('mouseenter', () => cursor.classList.add('play-mode'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('play-mode'));
    }
    el.addEventListener('click', () => window.open(el.dataset.trailer, '_blank', 'noopener'));
  });

  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
  }

  /* 滚动叙事 .design-scroll：按滚动进度切换 .ds-stage-text / figure / .ds-progress span */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 760px)');
  document.querySelectorAll('.design-scroll').forEach(wrap => {
    const stageTexts = wrap.querySelectorAll('.ds-stage-text');
    const figures = wrap.querySelectorAll('.ds-visuals figure');
    const dots = wrap.querySelectorAll('.ds-progress span');
    const count = figures.length;
    if (!count) return;
    let current = 0;
    let ticking = false;

    const setStage = i => {
      if (i === current) return;
      current = i;
      [stageTexts, figures, dots].forEach(list =>
        list.forEach((el, n) => el.classList.toggle('is-active', n === i))
      );
    };

    const update = () => {
      ticking = false;
      if (mobileLayout.matches || reduceMotion.matches) return;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setStage(Math.min(count - 1, Math.floor(progress * count)));
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  });
})();
