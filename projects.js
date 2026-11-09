(() => {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  const cfg = window.AUREX_SUPABASE_URL && window.AUREX_SUPABASE_ANON_KEY;
  if (!cfg || window.AUREX_SUPABASE_URL.includes('PASTE_') || window.AUREX_SUPABASE_ANON_KEY.includes('PASTE_')) {
    grid.innerHTML = '<div class="gallery-message">Our project gallery is being prepared. Please check back soon.</div>'; return;
  }
  const client = window.supabase.createClient(window.AUREX_SUPABASE_URL, window.AUREX_SUPABASE_ANON_KEY);
  let allProjects = [];
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mediaMarkup = media => media.map(m => m.media_type === 'video'
    ? `<a href="${esc(m.public_url)}" target="_blank" rel="noopener" aria-label="Open project video"><video src="${esc(m.public_url)}" muted playsinline preload="metadata"></video></a>`
    : `<a href="${esc(m.public_url)}" target="_blank" rel="noopener"><img src="${esc(m.public_url)}" alt="${esc(m.alt_text || 'AUREX project photo')}" loading="lazy"></a>`).join('');
  function render(filter='All') {
    const list = allProjects.filter(p => filter === 'All' || p.category === filter);
    if (!list.length) { grid.innerHTML = '<div class="gallery-message">No projects have been published in this category yet.</div>'; return; }
    grid.innerHTML = list.map(p => {
      const media = (p.project_media || []).sort((a,b) => a.sort_order-b.sort_order);
      const cover = media.find(m => m.media_type === 'image') || media[0];
      const coverHtml = cover ? (cover.media_type === 'video' ? `<video src="${esc(cover.public_url)}" muted playsinline preload="metadata"></video>` : `<img src="${esc(cover.public_url)}" alt="${esc(p.title)}" loading="lazy">`) : '';
      return `<article class="project-card"><div class="project-cover">${coverHtml}<span class="media-count">${media.length} MEDIA</span></div><div class="project-card-body"><span class="category">${esc(p.category)}</span><h3>${esc(p.title)}</h3>${p.description ? `<p>${esc(p.description)}</p>` : ''}${p.location ? `<span class="project-location">${esc(p.location)}</span>` : ''}<div class="project-media">${mediaMarkup(media)}</div></div></article>`;
    }).join('');
  }
  async function load() {
    const { data, error } = await client.from('projects').select('*, project_media(*)').eq('is_published', true).order('created_at', {ascending:false});
    if (error) { grid.innerHTML = '<div class="gallery-message">The gallery is temporarily unavailable. Please try again later.</div>'; console.error(error); return; }
    allProjects = data || []; render();
  }
  document.getElementById('galleryFilters')?.addEventListener('click', e => { const btn=e.target.closest('button[data-filter]'); if(!btn)return; document.querySelectorAll('.gallery-filters button').forEach(b=>b.classList.toggle('active',b===btn)); render(btn.dataset.filter); });
  load();
})();
