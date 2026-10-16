(() => {
  const english = document.documentElement.lang === 'en';
  const input = document.getElementById('guide-search');
  const category = document.getElementById('guide-category');
  const normalize = value => value.toLocaleLowerCase().normalize('NFKC').replace(/\s+/g, ' ').trim();
  function filterCatalog() {
    const query = normalize(input?.value || '');
    const selected = category?.value || '';
    let count = 0;
    document.querySelectorAll('#catalog-list .entry').forEach(entry => {
      const show = normalize(entry.dataset.search).includes(query) && (!selected || entry.dataset.category === selected);
      entry.hidden = !show;
      if (show) count++;
    });
    const status = document.getElementById('search-count');
    if (status) status.textContent = english ? `${count} feature ${count === 1 ? 'page' : 'pages'} found` : `找到 ${count} 個功能頁`;
    const empty = document.getElementById('no-results');
    if (empty) empty.hidden = count > 0;
  }
  input?.addEventListener('input', filterCatalog);
  category?.addEventListener('change', filterCatalog);
  if (input) filterCatalog();
  const ledger = document.getElementById('ledger-search');
  ledger?.addEventListener('input', () => {
    const query = normalize(ledger.value);
    document.querySelectorAll('tbody tr').forEach(row => { row.hidden = !normalize(row.textContent).includes(query); });
  });
  document.getElementById('print-manual')?.addEventListener('click', () => window.print());
  if (matchMedia('(max-width:700px)').matches) document.querySelector('aside details')?.removeAttribute('open');
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.guide-nav a').forEach(a => {
    if (a.getAttribute('href').split('/').pop().split('#')[0] === path) a.setAttribute('aria-current', 'page');
  });
})();

// Open raw evidence links in the same device presentation, keeping source files unmodified.
(() => {
  const english = document.documentElement.lang === 'en';
  const dialog = document.createElement('dialog');
  dialog.className = 'media-viewer';
  dialog.setAttribute('aria-label', english ? 'MAG1 device screen' : 'MAG1 手機畫面');
  dialog.innerHTML = english
    ? '<div class="viewer-bar"><span>MAG1 · WHITE / DEVICE CAPTURE</span><button class="viewer-close" type="button" aria-label="Close enlarged view">Close ×</button></div><div class="viewer-content"></div><p class="viewer-caption"></p>'
    : '<div class="viewer-bar"><span>MAG1 · WHITE / 真機畫面</span><button class="viewer-close" type="button" aria-label="關閉放大畫面">關閉 ×</button></div><div class="viewer-content"></div><p class="viewer-caption"></p>';
  const firmware = document.querySelector('meta[name="guide-capture-firmware"]')?.content || document.querySelector('meta[name="guide-firmware"]')?.content || '';
  dialog.querySelector('.viewer-caption').textContent = `${english ? 'White device display frame' : '白色機身展示框'} · English UI · ${firmware}`;
  document.querySelector('.mag1-guide').append(dialog);
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog && (e.clientX < dialog.getBoundingClientRect().left || e.clientX > dialog.getBoundingClientRect().right)) dialog.close(); });
  dialog.addEventListener('close', () => { dialog.querySelector('video')?.pause(); dialog.querySelector('.viewer-content').replaceChildren(); });
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link || !/assets\/mag1-guide\/[^/]+\/(screenshots|videos)\/[^?#]+\.(png|mp4)$/.test(link.getAttribute('href')) || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const assetBuild = new URL(link.href).pathname.match(/assets\/mag1-guide\/([^/]+)\//)?.[1];
    const capturedBuild = assetBuild === 'MAG1CM60-1' ? 'MAG1WW60-1' : (assetBuild || firmware);
    dialog.querySelector('.viewer-caption').textContent = `${english ? 'White device display frame' : '白色機身展示框'} · English UI · ${capturedBuild}`;
    const media = document.createElement(link.href.endsWith('.mp4') ? 'video' : 'img');
    media.src = link.href;
    if (media.tagName === 'VIDEO') { media.controls = true; media.playsInline = true; media.preload = 'none'; }
    else media.alt = english ? 'Enlarged MAG1 English device capture' : 'MAG1 英文真機介面放大畫面';
    const shell = document.createElement('div'); shell.className = 'mag1-device';
    shell.innerHTML = '<span class="device-key key-volume" aria-hidden="true"></span><span class="device-key key-power" aria-hidden="true"></span><div class="device-bezel"><div class="device-screen"><span class="device-camera" aria-hidden="true"></span></div></div>';
    shell.querySelector('.device-screen').prepend(media);
    dialog.querySelector('.viewer-content').replaceChildren(shell); dialog.showModal();
  });
  // Large galleries must not allocate a decoder for every clip at once.
  const restorePosition = v => {
    if (v.tagName !== 'VIDEO' || v.paused || v.readyState === 0 || !v.dataset.resumeTime) return;
    const saved = Number(v.dataset.resumeTime);
    delete v.dataset.resumeTime;
    if (Number.isFinite(saved) && saved < v.duration) v.currentTime = saved;
  };
  document.addEventListener('loadedmetadata', e => restorePosition(e.target), true);
  document.addEventListener('play', e => {
    if (e.target.tagName !== 'VIDEO') return;
    restorePosition(e.target);
    document.querySelectorAll('video').forEach(v => {
      if (v === e.target || v.readyState === 0) return;
      v.dataset.resumeTime = String(v.currentTime);
      v.pause();
      v.preload = 'none';
      v.load();
    });
  }, true);
})();
