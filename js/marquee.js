/* ═══════════════════════════════════════════════
   marquee.js — 无缝滚动带（index / works 使用）
   原理：动画把 .marquee-inner 平移 -50%，要无缝需满足
   「一半宽度 ≥ 视口宽度」。这里自动把内容翻倍克隆到够宽，
   并按最终宽度校准时长，保证不同屏宽下速度一致、无空档。
   ═══════════════════════════════════════════════ */
document.querySelectorAll('.marquee-inner').forEach(inner => {
  let guard = 0;
  while (inner.scrollWidth < window.innerWidth * 2 && guard < 6) {
    inner.innerHTML += inner.innerHTML;
    guard++;
  }
  /* 恒定速度约 45px/s */
  inner.style.animationDuration = (inner.scrollWidth / 2 / 45).toFixed(2) + 's';
});
