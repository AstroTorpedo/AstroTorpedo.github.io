(() => {
  'use strict';
  // 使用系统偏好决定滚动背景是否需要连续过渡。
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const closeMenu = () => {
    navigation?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // 渐入只运行一次，避免滚动返回时反复闪烁。
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
    document.documentElement.classList.add('reveal-enabled');
  }

  const sections = [...document.querySelectorAll('[data-background]')];
  const layers = [...document.querySelectorAll('[data-sky]')];
  let stops = [];
  let scheduled = false;
  const layerIndex = key => layers.findIndex(layer => layer.dataset.sky === key);
  const loadLayer = key => {
    const layer = layers[layerIndex(key)];
    if (layer?.dataset.src && !layer.getAttribute('src')) layer.src = layer.dataset.src;
  };
  const measure = () => {
    // 过滤后隐藏的照片不再作为背景切换点，避免零高度元素干扰顺序。
    stops = sections.filter(section => !section.hidden && section.getClientRects().length)
      .map(section => ({key:section.dataset.background, top:section.getBoundingClientRect().top + window.scrollY}));
  };
  const paintSky = () => {
    scheduled = false;
    if (!stops.length) return;
    const focus = window.scrollY + window.innerHeight * 0.45;
    let index = 0;
    stops.forEach((stop, current) => { if (focus >= stop.top) index = current; });
    const active = stops[index];
    const previous = stops[Math.max(0, index - 1)];
    loadLayer(active.key);
    loadLayer(previous.key);
    if (stops[index + 1]) loadLayer(stops[index + 1].key);
    // 透明度按滚动距离连续变化；减少动态效果时直接使用当前作品。
    const fraction = motion.matches || active.key === previous.key ? 1 : Math.min(1, Math.max(0, (focus - active.top) / (window.innerHeight * 0.3)));
    const layer = layers[layerIndex(active.key)];
    // 新图尚未下载完成时保留已有背景，快速跳转不会出现黑屏。
    if (layer?.complete && layer.naturalWidth > 0) {
      layers.forEach(item => { item.style.opacity = String(item.dataset.sky === active.key ? fraction : item.dataset.sky === previous.key ? 1 - fraction : 0); });
      const caption = document.querySelector('#background-title');
      if (caption) caption.textContent = (fraction < 0.5 ? layers[layerIndex(previous.key)] : layer).dataset.title;
    }
  };
  const requestPaint = () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(paintSky); }
  };
  if (sections.length) {
    measure();
    layers.forEach(layer => layer.addEventListener('load', requestPaint));
    if (stops[1]) loadLayer(stops[1].key);
    window.addEventListener('scroll', requestPaint, { passive:true });
    window.addEventListener('resize', () => { measure(); requestPaint(); });
    motion.addEventListener('change', requestPaint);
    window.addEventListener('load', () => { measure(); requestPaint(); });
    requestPaint();
  }

  // 分类使用原生按钮与隐藏状态，大图序列只包含当前筛选中的作品。
  const cards = [...document.querySelectorAll('.photo-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      card.classList.add('is-visible');
    });
    const count = document.querySelector('#gallery-count');
    if (count) count.textContent = String(cards.filter(card => !card.hidden).length);
    measure();
    requestPaint();
  }));

  const dialog = document.querySelector('#photo-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const items = [...document.querySelectorAll('[data-lightbox]')];
  const image = document.querySelector('#photo-image');
  let sequence = [];
  let current = 0;
  let opener = null;
  const showPhoto = index => {
    current = (index + sequence.length) % sequence.length;
    const item = sequence[current];
    image.src = item.href;
    image.alt = item.dataset.title;
    document.querySelector('#photo-title').textContent = item.dataset.title;
    document.querySelector('#photo-label').textContent = item.dataset.label || '';
    document.querySelector('#photo-note').textContent = item.dataset.note || '';
    document.querySelector('#photo-count').textContent = `${String(current + 1).padStart(2, '0')} / ${String(sequence.length).padStart(2, '0')}`;
    document.querySelector('#photo-full').href = item.href;
  };
  items.forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    opener = item;
    sequence = items.filter(candidate => candidate.dataset.group === item.dataset.group && !candidate.hidden);
    showPhoto(sequence.indexOf(item));
    dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  dialog.querySelector('.photo-prev').addEventListener('click', () => showPhoto(current - 1));
  dialog.querySelector('.photo-next').addEventListener('click', () => showPhoto(current + 1));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  } });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
})();
