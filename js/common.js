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

  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
  }
})();
