// ─── STATE ───────────────────────────────────────────────────────────────────

const state = { searchOpen: false, sheetOpen: false, currentTab: EDIT_CFG.initialTab, ddOpen: false };

// ─── EDIT MODE: LOAD OVERRIDES AT BOOT ───────────────────────────────────────
// Synchronous overlay from localStorage (instant; offline-safe)
(function applyCachedEdits() {
  try {
    const cached = localStorage.getItem(EDIT_CFG.storageKey);
    if (!cached) return;
    const parsed = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.length) DAYS = parsed;
  } catch (e) { /* swallow */ }
})();

// ─── EDIT MODE: STATE ────────────────────────────────────────────────────────
Object.assign(state, { editing: null, settingsOpen: false, saving: false });

// ─── INIT ─────────────────────────────────────────────────────────────────────

function init() {
  setupSearch();
  setupSheet();
  document.getElementById('deep-dive-close-btn').addEventListener('click', closeDeepDive);
  document.getElementById('header-back').addEventListener('click', onBackClick);
  window.addEventListener('popstate', renderRoute);
  window.addEventListener('online',  updateOnlineBadge);
  window.addEventListener('offline', updateOnlineBadge);
  updateOnlineBadge();
  setupServiceWorker();
  bindEditButtons();
  renderRoute();
  fetchRemoteEdits();
}

// ─── RENDER DAYS ──────────────────────────────────────────────────────────────

function renderDays(filterFn) {
  const list = filterFn ? DAYS.filter(filterFn) : DAYS;
  document.getElementById('main-content').innerHTML =
    list.map(day => `
      <div class="day-card ${day.theme}" data-day="${day.id}">
        <div class="day-header" onclick="toggleDay(${day.id})">
          <div class="day-header-text">
            <div class="day-label">Day ${day.id}</div>
            <div class="day-date">${esc(day.date)}</div>
            <div class="day-loc">${esc(day.location)}${day.sublocation ? ` · ${esc(day.sublocation)}` : ''}</div>
            <div class="day-stay">🏨 ${esc(day.stay)}</div>
          </div>
          <div class="chevron">▼</div>
        </div>
        <div class="sections">
          ${day.sections.map(s => renderSection(day.id, s)).join('')}
          ${day.deepDive ? `
          <div class="deep-dive-btn-wrap">
            <button class="deep-dive-btn" onclick="openDeepDive(${day.id})">
              <span>📖</span><span>${esc(day.deepDive.title)}</span><span class="deep-dive-btn-arrow">→</span>
            </button>
          </div>` : ''}
        </div>
      </div>
    `).join('');
}

function renderSection(dayId, section) {
  const alertBadges = (section.notes || [])
    .filter(n => n.type !== 'info')
    .slice(0, 3)
    .map(n => `<span class="badge">${noteIcon(n.type)}</span>`)
    .join('');

  const notesHtml = (section.notes || []).map(n =>
    `<div class="note ${noteClass(n.type, section.label)}"><span class="note-icon">${noteIcon(n.type)}</span><span class="note-text">${esc(n.text)}</span></div>`
  ).join('');

  return `
    <div class="section" data-day="${dayId}" data-label="${esc(section.label)}">
      <div class="section-header" onclick="toggleSection(this.parentElement)">
        <span class="section-icon">${section.icon}</span>
        <span class="section-label-text">${esc(section.label)}</span>
        ${alertBadges ? `<div class="section-badges">${alertBadges}</div>` : ''}
        <span class="section-chev">▼</span>
      </div>
      <div class="section-body">
        <div class="section-content">${esc(section.content)}</div>
        ${section.address ? `<div class="section-address"><span>📍</span><span>${esc(section.address)}</span></div>` : ''}
        ${section.url ? `<div class="section-address"><span>🔗</span><a href="${esc(section.url)}" target="_blank" rel="noopener">${esc(section.url)}</a></div>` : ''}
        ${notesHtml ? `<div class="section-notes">${notesHtml}</div>` : ''}
      </div>
    </div>
  `;
}

function toggleDay(dayId) {
  document.querySelector(`.day-card[data-day="${dayId}"]`).classList.toggle('open');
}

function toggleSection(el) {
  el.classList.toggle('open');
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────

function setupSearch() {
  const toggleBtn = document.getElementById('search-toggle');
  const input     = document.getElementById('search-input');
  const closeBtn  = document.getElementById('search-close-btn');
  const bar       = document.getElementById('search-bar');
  const results   = document.getElementById('search-results');
  const history   = document.getElementById('search-history');
  const main      = document.getElementById('main-content');
  const legend    = document.getElementById('legend');

  toggleBtn.addEventListener('click', () => {
    state.searchOpen = !state.searchOpen;
    bar.classList.toggle('hidden', !state.searchOpen);
    if (state.searchOpen) {
      input.focus();
      showHistory();
    } else {
      closeSearch();
    }
  });

  closeBtn.addEventListener('click', closeSearch);

  input.addEventListener('input', () => {
    const q = input.value.trim();
    history.classList.add('hidden');
    if (q.length >= 2) {
      const res = doSearch(q);
      renderSearchResults(res, q);
      results.classList.remove('hidden');
      main.classList.add('hidden');
      legend.classList.add('hidden');
    } else if (q.length === 0) {
      results.classList.add('hidden');
      main.classList.remove('hidden');
      if (state.route && state.route.view === 'overview') legend.classList.remove('hidden');
      showHistory();
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) saveHistory(input.value.trim());
    if (e.key === 'Escape') closeSearch();
  });
}

function closeSearch() {
  state.searchOpen = false;
  document.getElementById('search-bar').classList.add('hidden');
  document.getElementById('search-history').classList.add('hidden');
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');
  if (state.route && state.route.view === 'overview') {
    document.getElementById('legend').classList.remove('hidden');
  }
  document.getElementById('search-input').value = '';
}

function doSearch(query) {
  const q = query.toLowerCase();
  const results = [];

  DAYS.forEach(day => {
    day.sections.forEach(section => {
      const haystack = [
        section.label, section.content, section.address || '',
        day.location, day.sublocation || '', day.stay, day.date,
        ...(section.notes || []).map(n => n.text)
      ].join(' ').toLowerCase();

      if (haystack.includes(q)) {
        results.push({ type: 'section', day, section });
      }
    });
  });

  const catLabels = EDIT_CFG.catLabels;
  Object.entries(QUICK_REF).forEach(([cat, items]) => {
    items.forEach(item => {
      if (`${item.name} ${item.detail}`.toLowerCase().includes(q)) {
        results.push({ type: 'ref', cat, catLabel: catLabels[cat], item });
      }
    });
  });

  return results;
}

function renderSearchResults(results, query) {
  const container = document.getElementById('search-results');
  if (results.length === 0) {
    container.innerHTML = `<div class="search-empty">No results for "<strong>${esc(query)}</strong>"</div>`;
    return;
  }

  container.innerHTML = results.map(r => {
    if (r.type === 'section') {
      const snippet = r.section.content.replace(/\n/g, ' ').slice(0, 120);
      return `
        <div class="search-result" onclick="jumpTo(${r.day.id}, ${JSON.stringify(r.section.label).replace(/"/g, '&quot;')})">
          <div class="result-tag">Day ${r.day.id} · ${esc(r.day.date)}</div>
          <div class="result-main">${hilite(r.section.label, query)}</div>
          <div class="result-sub">${hilite(snippet, query)}${r.section.content.length > 120 ? '…' : ''}</div>
          ${r.section.address ? `<div class="result-sub">📍 ${hilite(r.section.address, query)}</div>` : ''}
        </div>
      `;
    } else {
      return `
        <div class="search-result" onclick="openSheet('${r.cat}')">
          <div class="result-tag">Quick Ref · ${esc(r.catLabel)}</div>
          <div class="result-main">${hilite(r.item.name, query)}</div>
          <div class="result-sub">${hilite(r.item.detail, query)}</div>
        </div>
      `;
    }
  }).join('');
}

function jumpTo(dayId, sectionLabel) {
  closeSearch();
  const onSameDay = state.route && state.route.view === 'day' && state.route.id === dayId;
  if (!onSameDay) navigateTo('?day=' + dayId);
  // Open the named section after the day detail has rendered
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const card = document.querySelector(`.day-card[data-day="${dayId}"]`);
    if (!card) return;
    card.classList.add('open');
    const sel = `.section[data-label="${sectionLabel.replace(/"/g, '\\"')}"]`;
    const section = card.querySelector(sel);
    if (section) {
      section.classList.add('open');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));
}

function hilite(text, query) {
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.split(new RegExp(`(${safe})`, 'gi'))
    .map(p => p.toLowerCase() === query.toLowerCase() ? `<mark>${esc(p)}</mark>` : esc(p))
    .join('');
}

// ─── SEARCH HISTORY ───────────────────────────────────────────────────────────

function saveHistory(q) {
  let h = getHistory().filter(x => x !== q);
  h.unshift(q);
  localStorage.setItem(EDIT_CFG.tripId + ':history', JSON.stringify(h.slice(0, 6)));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(EDIT_CFG.tripId + ':history') || '[]'); } catch { return []; }
}

function showHistory() {
  const div = document.getElementById('search-history');
  const h = getHistory();
  if (!h.length) { div.classList.add('hidden'); return; }
  div.innerHTML = h.map(q =>
    `<button class="history-chip" onclick="applyHistory(${JSON.stringify(q)})">${esc(q)}</button>`
  ).join('');
  div.classList.remove('hidden');
}

function applyHistory(q) {
  const input = document.getElementById('search-input');
  input.value = q;
  input.dispatchEvent(new Event('input'));
}

// ─── QUICK REF SHEET ──────────────────────────────────────────────────────────

function setupSheet() {
  document.getElementById('sheet-close-btn').addEventListener('click', closeSheet);
  document.getElementById('sheet-backdrop').addEventListener('click', () => {
    if (state.sheetOpen) closeSheet();
    else if (state.ddOpen) closeDeepDive();
  });

  document.querySelectorAll('.sheet-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.currentTab = tab.dataset.tab;
      document.querySelectorAll('.sheet-tab').forEach(t => t.classList.toggle('active', t === tab));
      renderSheetContent(state.currentTab);
    });
  });
}

function openSheet(tab) {
  if (state.ddOpen) closeDeepDive();
  if (tab) {
    state.currentTab = tab;
    document.querySelectorAll('.sheet-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.tab === tab)
    );
  }
  renderSheetContent(state.currentTab);

  const backdrop = document.getElementById('sheet-backdrop');
  const sheet    = document.getElementById('quick-ref-sheet');

  backdrop.style.display = 'block';
  sheet.style.display = 'flex';

  requestAnimationFrame(() => requestAnimationFrame(() => {
    backdrop.classList.add('vis');
    sheet.classList.add('vis');
  }));

  state.sheetOpen = true;
}

function closeSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  const sheet    = document.getElementById('quick-ref-sheet');
  backdrop.classList.remove('vis');
  sheet.classList.remove('vis');
  setTimeout(() => {
    backdrop.style.display = 'none';
    sheet.style.display = 'none';
  }, 260);
  state.sheetOpen = false;
}

function renderSheetContent(tab) {
  const items = QUICK_REF[tab] || [];
  document.getElementById('sheet-content').innerHTML = items.map(item => `
    <div class="ref-item">
      <div class="ref-name">${esc(item.name)}</div>
      <div class="ref-detail">${esc(item.detail)}</div>
    </div>
  `).join('');
}

// ─── SERVICE WORKER ───────────────────────────────────────────────────────────

function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

const VALID_NOTE_TYPES = new Set(['cash', 'warning', 'reservation', 'info']);

function noteClass(type, sectionTitle) {
  if (!VALID_NOTE_TYPES.has(type)) console.warn(`Unknown note type "${type}" in section "${sectionTitle}"`);
  return type === 'cash' ? 'note-cash' : type === 'warning' ? 'note-warn' : type === 'reservation' ? 'note-res' : 'note-info';
}

function noteIcon(type) {
  return type === 'cash' ? '💵' : type === 'warning' ? '⚠️' : type === 'reservation' ? '📋' : 'ℹ️';
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── DEEP DIVE ────────────────────────────────────────────────────────────────

function openDeepDive(dayId) {
  if (state.sheetOpen) closeSheet();
  const day = DAYS.find(d => d.id === dayId);
  if (!day || !day.deepDive) return;
  const dd = day.deepDive;

  document.getElementById('dd-day-badge').textContent = `Day ${day.id} · ${day.date}`;
  document.getElementById('dd-title').textContent = dd.title;
  document.getElementById('dd-subtitle').textContent = dd.subtitle;

  const content = document.getElementById('dd-content');
  content.innerHTML = [
    renderDDTimeline(dd.timeline),
    dd.stops.length ? `<div class="dd-group-label">Stop-by-Stop</div>` + dd.stops.map(renderDDSection).join('') : '',
    dd.logistics.length ? `<div class="dd-group-label">Logistics</div>` + dd.logistics.map(renderDDSection).join('') : '',
    dd.checklists.length ? `<div class="dd-group-label">Checklists</div>` + dd.checklists.map(renderChecklist).join('') : '',
  ].join('');

  const backdrop = document.getElementById('sheet-backdrop');
  const sheet    = document.getElementById('deep-dive-sheet');
  backdrop.style.display = 'block';
  sheet.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    backdrop.classList.add('vis');
    sheet.classList.add('vis');
  }));
  state.ddOpen = true;
}

function closeDeepDive() {
  const backdrop = document.getElementById('sheet-backdrop');
  const sheet    = document.getElementById('deep-dive-sheet');
  backdrop.classList.remove('vis');
  sheet.classList.remove('vis');
  setTimeout(() => {
    backdrop.style.display = 'none';
    sheet.style.display = 'none';
  }, 260);
  state.ddOpen = false;
}

function renderDDTimeline(rows) {
  return `
    <div class="dd-timeline">
      <div class="dd-group-label" style="padding:0 0 8px">Timeline</div>
      ${rows.map(r => `
        <div class="timeline-row">
          <div class="timeline-time">${esc(r.time)}</div>
          <div class="timeline-info">
            <div class="timeline-activity">${esc(r.activity)}</div>
            ${r.note ? `<div class="timeline-note">${esc(r.note)}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderDDSection(s) {
  const notesHtml = (s.notes || []).map(n =>
    `<div class="note ${noteClass(n.type, s.label)}" style="margin-top:6px"><span class="note-icon">${noteIcon(n.type)}</span><span class="note-text">${esc(n.text)}</span></div>`
  ).join('');

  const tipsHtml = (s.tips || []).length
    ? `<div class="dd-tips">${s.tips.map(t => `<div class="dd-tip"><div class="dd-tip-dot"></div><span>${esc(t)}</span></div>`).join('')}</div>`
    : '';

  return `
    <div class="dd-section">
      <div class="dd-section-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="dd-section-icon">${s.icon}</span>
        <div class="dd-section-label-wrap">
          <div class="dd-section-label">${esc(s.label)}</div>
          ${s.meta ? `<div class="dd-section-meta">${esc(s.meta)}</div>` : ''}
        </div>
        <span class="dd-chev">▼</span>
      </div>
      <div class="dd-section-body">
        ${s.address ? `<div class="dd-address"><span>📍</span><span>${esc(s.address)}</span></div>` : ''}
        <div class="dd-content-text">${esc(s.content)}</div>
        ${tipsHtml}
        ${notesHtml}
      </div>
    </div>
  `;
}

function renderChecklist(cl) {
  return `
    <div class="dd-checklist">
      <div class="dd-group-label" style="padding:8px 0 6px;font-size:13px">${esc(cl.label)}</div>
      ${cl.items.map((item, i) => {
        const key = EDIT_CFG.tripId + ':check:' + cl.id + '-' + i;
        const checked = localStorage.getItem(key) === '1';
        return `
          <div class="checklist-item${checked ? ' checked' : ''}" onclick="toggleCheck('${key}', this)">
            <div class="checklist-cb">${checked ? '✓' : ''}</div>
            <div class="checklist-text">${esc(item)}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function toggleCheck(key, el) {
  const isChecked = el.classList.toggle('checked');
  el.querySelector('.checklist-cb').textContent = isChecked ? '✓' : '';
  localStorage.setItem(key, isChecked ? '1' : '0');
}

// ─── ROUTING (Overview ↔ Day Detail) ──────────────────────────────────────────

function getRoute() {
  const params = new URLSearchParams(location.search);
  const rawDay = params.get('day');
  if (rawDay) {
    const id = parseInt(rawDay, 10);
    if (Number.isFinite(id) && DAYS.some(d => d.id === id)) {
      return { view: 'day', id };
    }
  }
  return { view: 'overview' };
}

function renderRoute() {
  // Cancel any active search UI when route changes
  if (state.searchOpen) closeSearch();

  const route = getRoute();
  state.route = route;

  const legend = document.getElementById('legend');
  const back   = document.getElementById('header-back');

  // Toggle body class for route-aware CSS (e.g. show edit button on day-detail)
  document.body.classList.toggle('day-detail', route.view === 'day');
  document.body.classList.toggle('editable-route', route.view === 'day');

  if (state.editing && route.view === 'day' && route.id === state.editing.dayId) {
    legend.classList.add('hidden');
    back.setAttribute('href', './');
    back.setAttribute('aria-label', 'Back to overview');
    renderDayEdit();
    updateEditTitle();
    return;
  }

  if (route.view === 'overview') {
    legend.classList.remove('hidden');
    back.setAttribute('href', '../../');
    back.setAttribute('aria-label', 'All trips');
    renderOverview();
  } else {
    legend.classList.add('hidden');
    back.setAttribute('href', './');
    back.setAttribute('aria-label', 'Back to overview');
    renderDayDetail(route.id);
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

function navigateTo(url) {
  history.pushState({}, '', url);
  renderRoute();
}

function onBackClick(e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  if (state.route && state.route.view === 'day') {
    e.preventDefault();
    navigateTo('./');
  }
}

// ─── OVERVIEW VIEW ────────────────────────────────────────────────────────────

function renderOverview() {
  const todayId = getTodayDayId();
  const todayIdx = todayId ? DAYS.findIndex(d => d.id === todayId) : -1;

  const html = DAYS.map((day, i) => {
    const prev = i > 0 ? DAYS[i - 1] : null;
    const chips = detectChips(day, prev);
    const isToday = day.id === todayId;
    const isPast = todayIdx >= 0 && i < todayIdx;
    const isoDate = getDayDate(day, i);
    const shortDate = formatShortDate(day.date, isoDate);
    return `
      <a class="ov-card ${day.theme}${isToday ? ' today' : ''}${isPast ? ' past' : ''}"
         data-ov-day="${day.id}"
         href="?day=${day.id}"
         onclick="onOverviewCardClick(event, ${day.id})">
        <div class="ov-accent"></div>
        <div class="ov-head">
          <div class="ov-day">Day ${day.id}${isToday ? '<span class="ov-today-pill">Today</span>' : ''}</div>
          <div class="ov-date">${esc(shortDate)}</div>
        </div>
        <div class="ov-loc">${esc(day.location)}</div>
        ${day.sublocation ? `<div class="ov-sub">${esc(day.sublocation)}</div>` : ''}
        ${chips.length ? `<div class="ov-chips">${chips.map(c =>
          `<span class="ov-chip"><span class="ov-chip-i">${c.icon}</span><span class="ov-chip-t">${esc(c.text)}</span></span>`
        ).join('')}</div>` : ''}
      </a>
    `;
  }).join('');

  document.getElementById('main-content').innerHTML =
    `<div class="overview-list">${html}</div>`;

  // Scroll today's card into view (centered) on the next frame
  if (todayId) {
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-ov-day="${todayId}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

function onOverviewCardClick(e, dayId) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  navigateTo('?day=' + dayId);
}

// ─── DAY DETAIL VIEW ──────────────────────────────────────────────────────────

function renderDayDetail(dayId) {
  const day = DAYS.find(d => d.id === dayId);
  if (!day) { history.replaceState({}, '', './'); return renderOverview(); }

  const idx     = DAYS.findIndex(d => d.id === dayId);
  const prev    = idx > 0 ? DAYS[idx - 1] : null;
  const next    = idx < DAYS.length - 1 ? DAYS[idx + 1] : null;
  const todayId = getTodayDayId();
  const isToday = dayId === todayId;

  // 1) Render the day card via the existing pipeline (filtered to one day)
  renderDays(d => d.id === dayId);

  // 2) Auto-expand it
  const card = document.querySelector(`.day-card[data-day="${dayId}"]`);
  if (card) card.classList.add('open');

  // 3) Prepend a prev / center / next nav strip
  const navHtml = `
    <div class="day-nav">
      ${prev
        ? `<a class="day-nav-btn" href="?day=${prev.id}" onclick="onDayNavClick(event, ${prev.id})">← Day ${prev.id}</a>`
        : `<span class="day-nav-btn disabled">←</span>`}
      <div class="day-nav-center">
        ${isToday ? '<span class="day-nav-today-mark"></span><b>Today</b> · ' : ''}<b>Day ${day.id}</b> of ${DAYS.length}
      </div>
      ${next
        ? `<a class="day-nav-btn" href="?day=${next.id}" onclick="onDayNavClick(event, ${next.id})">Day ${next.id} →</a>`
        : `<span class="day-nav-btn disabled">→</span>`}
    </div>
  `;
  document.getElementById('main-content').insertAdjacentHTML('afterbegin', navHtml);
}

function onDayNavClick(e, dayId) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  navigateTo('?day=' + dayId);
}

// ─── CHIPS (auto-detect highlights for overview cards) ───────────────────────

const TOD_LABELS = /^(morning|afternoon|evening|night|late\s*night|lunch|late\s*lunch|dinner|breakfast|brunch|free|rest)$/i;

function detectChips(day, prevDay) {
  const chips = [];
  const seen = new Set();
  const push = (icon, text) => {
    if (!text || chips.length >= 4) return;
    const key = text.toLowerCase().trim();
    if (seen.has(key)) return;
    seen.add(key);
    chips.push({ icon: icon || '•', text });
  };
  const truncate = (s, n) => s.length > n ? s.slice(0, n - 1) + '…' : s;
  const labelLeft = (s) => (s.label || '').replace(/[—–-].*$/, '').trim();
  const labelRight = (s) => {
    const i = (s.label || '').search(/[—–]/);
    return i >= 0 ? (s.label || '').slice(i + 1).trim() : '';
  };

  // 0) Explicit override on the day (future trips can set this)
  if (Array.isArray(day.highlights) && day.highlights.length) {
    day.highlights.forEach(h => {
      if (typeof h === 'string') {
        const m = h.match(/^(\S+)\s+(.+)$/);
        if (m && /\p{Extended_Pictographic}/u.test(m[1])) push(m[1], m[2]);
        else push('•', h);
      } else if (h) {
        push(h.icon || '•', h.text);
      }
    });
    return chips;
  }

  const sections = day.sections || [];

  // 1) Flight
  const flight = sections.find(s => s.icon === '✈️');
  if (flight) {
    const codes = (flight.content || '').match(/\b([A-Z]{3})\s*[→\-➔>]+\s*([A-Z]{3})\b/);
    push('✈️', codes ? `${codes[1]} → ${codes[2]}` : (labelRight(flight) || labelLeft(flight) || 'Flight'));
  }

  // 2) Drive — label "Drive*" OR location includes "→"
  // (A bare 🚗 icon on an evening section is usually return-transit, not a drive day — don't trigger on icon alone.)
  const driveSec = sections.find(s => /^drive\b/i.test(labelLeft(s)));
  const locationHasArrow = !!(day.location && day.location.includes('→'));
  const isDriveDay = !!driveSec || locationHasArrow;
  if (isDriveDay) {
    // Look in the drive section + ALL sections' content + ALL notes for a duration.
    const noteText = sections.flatMap(s => (s.notes || []).map(n => n.text || '')).join(' ');
    const src = (driveSec && driveSec.content)
      || (sections.map(s => s.content || '').join(' ') + ' ' + noteText)
      + ' ' + noteText;
    // Match e.g. "4h", "4 hr", "4–5 hrs", "3.5–4 hrs". Guard against ".5" being matched as just "5".
    const dur = src.match(/(?:^|[^\d.])(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)\s*(?:h|hr|hrs|hour|hours)\b/i);
    let text;
    if (day.location && day.location.includes('→')) {
      const dest = day.location.split('→').pop().trim().split(',')[0];
      text = dur ? `${dest} · ${dur[1].replace(/\s+/g,'')}h` : dest;
    } else {
      text = dur ? `Drive ${dur[1].replace(/\s+/g,'')}h` : 'Driving day';
    }
    push('🚗', truncate(text, 26));
  }

  // 3) New hotel (only if stay changed from prev day)
  if (day.stay && (!prevDay || day.stay !== prevDay.stay)) {
    const hotel = day.stay.split('·')[0].split(',')[0].trim();
    push('🏨', truncate(hotel, 24));
  }

  // 4) Hike (any of the hike/peak icons)
  const HIKE = ['🥾','🏔️','⛰️','🌄'];
  const hikeSec = sections.find(s => HIKE.includes(s.icon));
  if (hikeSec) {
    const right = labelRight(hikeSec);
    const left = labelLeft(hikeSec);
    const fallback = TOD_LABELS.test(left) ? extractContentTitle(hikeSec.content) : '';
    push(hikeSec.icon, truncate(right || fallback || left, 24));
  }

  // 5) Deep dive
  if (day.deepDive) {
    const t = (day.deepDive.title || '').replace(/\b(Guide|Deep Dive)\b/gi, '').trim() || 'Deep Dive';
    push('📖', truncate(t, 24));
  }

  // 6) Any other distinctive sections (skip generic time-of-day labels & already-claimed icons)
  const claimed = new Set(chips.map(c => c.icon));
  // Icons that are interesting enough to surface even with a generic label.
  // Excludes pure "time of day / atmosphere" icons (☕ 🌙 ☀️ 🌅).
  const GENERIC_AMBIENT = new Set(['☕','🌙','☀️','🌅','🌃','🍞','🌿','🎒']);
  for (const s of sections) {
    if (chips.length >= 4) break;
    if (claimed.has(s.icon)) continue;
    if (['✈️','🚗','🏨'].includes(s.icon)) continue;
    const left = labelLeft(s);
    const right = labelRight(s);
    let text;
    if (right) {
      text = right;          // "Dinner — Bavette's Steakhouse" → "Bavette's…"
    } else if (!TOD_LABELS.test(left)) {
      text = left;           // "Welcome Party" / "The Wedding"
    } else if (s.icon && !GENERIC_AMBIENT.has(s.icon)) {
      text = extractContentTitle(s.content);  // distinctive icon + generic label → derive from content
    }
    if (text) push(s.icon || '•', truncate(text, 22));
  }

  return chips;
}

// Pull a short title from a section's content text — first phrase before — or .
// Used when a section has a distinctive icon but a generic label like "Morning".
function extractContentTitle(content) {
  if (!content) return '';
  // Strip leading whitespace + take the first line
  let firstLine = content.replace(/^[\s\n]+/, '').split(/\n/)[0];
  // Strip "Option A —" / "Option 1 —" / "Choice B —" prefixes
  const opt = firstLine.match(/^(?:Option|Choice|Pick|Plan)\s+[A-Z0-9]\s*[—–-]\s*(.+)/i);
  if (opt) firstLine = opt[1];
  // Break at em-dash, period, comma, or colon — whichever comes first
  const m = firstLine.match(/^[^—.,:]+/);
  let title = (m ? m[0] : firstLine).trim();
  // Strip trailing decorative punctuation
  title = title.replace(/[:\s]+$/, '');
  return title;
}

// ─── TODAY DETECTION ─────────────────────────────────────────────────────────

function getTodayDayId() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < DAYS.length; i++) {
    const d = getDayDate(DAYS[i], i);
    if (d && d.getTime() === today.getTime()) return DAYS[i].id;
  }
  return null;
}

function getDayDate(day, idx) {
  // Priority: explicit day.dateISO > parsed day.date > inferred from TRIP_META.startDate
  if (day.dateISO) {
    const parts = day.dateISO.split('-');
    if (parts.length === 3) return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  const parsed = parseDateString(day.date);
  if (parsed) return parsed;
  if (TRIP_META.startDate) {
    const p = TRIP_META.startDate.split('-');
    if (p.length === 3) {
      const d = new Date(+p[0], +p[1] - 1, +p[2]);
      d.setDate(d.getDate() + idx);
      return d;
    }
  }
  return null;
}

const MONTH_MAP = {
  jan:0,january:0, feb:1,february:1, mar:2,march:2, apr:3,april:3,
  may:4, jun:5,june:5, jul:6,july:6, aug:7,august:7,
  sep:8,sept:8,september:8, oct:9,october:9, nov:10,november:10, dec:11,december:11
};

function parseDateString(s) {
  if (!s) return null;
  // "Friday, May 29" / "Thursday, August 13 — Departure"
  const m = s.match(/\b(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)\s+(\d{1,2})\b/i);
  if (!m) return null;
  const month = MONTH_MAP[m[1].toLowerCase()];
  const day = parseInt(m[2], 10);

  // Determine year: prefer TRIP_META start year; else current year
  let year = (new Date()).getFullYear();
  if (TRIP_META.startDate) {
    year = parseInt(TRIP_META.startDate.split('-')[0], 10);
  }
  return new Date(year, month, day);
}

function formatShortDate(rawDate, isoDate) {
  // Prefer ISO-derived "Sat · May 30" when available; else trim the raw "Friday, May 29" → "Fri · May 29"
  if (isoDate) {
    const dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][isoDate.getDay()];
    const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][isoDate.getMonth()];
    return `${dow} · ${mon} ${isoDate.getDate()}`;
  }
  if (!rawDate) return '';
  // Strip suffix after — and shorten weekday
  const noSuffix = rawDate.replace(/\s*[—–]\s*.*$/, '').trim();
  const m = noSuffix.match(/^([A-Za-z]+),?\s*(.*)$/);
  if (m) {
    const dow = m[1].slice(0, 3);
    return `${dow} · ${m[2]}`.replace(/\s+·\s*$/, '');
  }
  return noSuffix;
}

// ─── SHARE ────────────────────────────────────────────────────────────────────

async function shareTrip() {
  const url = location.href;
  const route = state.route || { view: 'overview' };

  let title = TRIP_META.name;
  let text  = `${TRIP_META.shortName || TRIP_META.name} · ${TRIP_META.dates}`;
  if (route.view === 'day') {
    const day = DAYS.find(d => d.id === route.id);
    if (day) {
      title = `Day ${day.id} · ${TRIP_META.shortName}`;
      text  = `${TRIP_META.shortName} — Day ${day.id}: ${day.location}`;
    }
  }

  // Web Share API (iOS / Android) — opens native share sheet
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (e) {
      // User cancelled — silently fall through to clipboard
      if (e && e.name === 'AbortError') return;
    }
  }

  // Clipboard fallback (desktop)
  const fullText = `${text}\n${url}`;
  try {
    await navigator.clipboard.writeText(fullText);
    showShareToast('Link copied');
  } catch (e) {
    // Last-resort fallback: select & copy via legacy execCommand
    const ta = document.createElement('textarea');
    ta.value = fullText;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showShareToast('Link copied'); }
    catch { showShareToast('Copy failed'); }
    document.body.removeChild(ta);
  }
}

function showShareToast(message) {
  const t = document.getElementById('share-toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('vis');
  clearTimeout(showShareToast._t);
  showShareToast._t = setTimeout(() => t.classList.remove('vis'), 1800);
}

// ─── ONLINE / OFFLINE ─────────────────────────────────────────────────────────

function updateOnlineBadge() {
  document.body.classList.toggle('is-offline', !navigator.onLine);
}

// ─── EDIT MODE: ENTRY/EXIT ───────────────────────────────────────────────────
function enterEditMode(dayId) {
  const day = DAYS.find(d => d.id === dayId);
  if (!day) return;
  state.editing = { dayId, draft: JSON.parse(JSON.stringify(day)) };
  document.body.classList.add('editing');
  updateEditTitle();
  renderRoute();
}

function exitEditMode() {
  state.editing = null;
  document.body.classList.remove('editing');
  renderRoute();
}

function updateEditTitle() {
  if (!state.editing) return;
  const d = state.editing.draft;
  document.getElementById('edit-title-main').textContent = 'Edit Day ' + d.id;
  document.getElementById('edit-title-sub').textContent = d.date || '';
}

// ─── EDIT MODE: RENDER ───────────────────────────────────────────────────────
function renderDayEdit() {
  const draft = state.editing.draft;
  const theme = draft.theme || '';
  const totalSections = (draft.sections || []).length;

  const NOTE_TYPES = [
    { key: 'info',        label: 'ℹ️ Info',     cls: 'pill-info' },
    { key: 'warning',     label: '⚠️ Warning',  cls: 'pill-warning' },
    { key: 'cash',        label: '💵 Cash',      cls: 'pill-cash' },
    { key: 'reservation', label: '📋 Res\'n',    cls: 'pill-reservation' },
  ];

  const sectionsHtml = (draft.sections || []).map(function (sec, i) {
    // Note pills + active text inputs
    var activeNotes = {};
    (sec.notes || []).forEach(function (n) { activeNotes[n.type] = n.text; });
    var pillsHtml = NOTE_TYPES.map(function (t) {
      var isActive = t.key in activeNotes;
      return '<button type="button" class="note-pill ' + t.cls + (isActive ? ' active' : '') + '" onclick="toggleEditNote(' + i + ', \'' + t.key + '\')">' + t.label + '</button>';
    }).join('');
    var textInputsHtml = NOTE_TYPES.filter(function (t) { return t.key in activeNotes; }).map(function (t) {
      return '<div class="note-active-row">'
        + '<span class="note-type-icon">' + noteIcon(t.key) + '</span>'
        + '<input type="text" class="edit-input" data-note-sec="' + i + '" data-note-type="' + t.key + '" value="' + esc(activeNotes[t.key] || '') + '" placeholder="' + t.key + ' note…">'
        + '</div>';
    }).join('');

    return ''
      + '<div class="section editing-section" data-sec="' + i + '">'
      +   '<div class="section-header" onclick="toggleSection(this.parentElement)">'
      +     '<div class="section-move-group" onclick="event.stopPropagation()">'
      +       '<button class="section-move-btn" ' + (i === 0 ? 'disabled' : '') + ' onclick="moveEditSection(' + i + ', -1)" aria-label="Move up">↑</button>'
      +       '<button class="section-move-btn" ' + (i === totalSections - 1 ? 'disabled' : '') + ' onclick="moveEditSection(' + i + ', 1)" aria-label="Move down">↓</button>'
      +     '</div>'
      +     '<span class="section-icon">' + esc(sec.icon || '·') + '</span>'
      +     '<span class="section-label-text">' + esc(sec.label || '(untitled section)') + '</span>'
      +     '<span class="section-chev">▼</span>'
      +   '</div>'
      +   '<div class="section-body section-edit-body">'
      +     '<div class="edit-field-row">'
      +       '<div class="edit-field icon-field">'
      +         '<label>Icon</label>'
      +         '<input type="text" class="edit-input" data-path="sections.' + i + '.icon" value="' + esc(sec.icon || '') + '" maxlength="4" placeholder="·">'
      +       '</div>'
      +       '<div class="edit-field" style="flex:1">'
      +         '<label>Label</label>'
      +         '<input type="text" class="edit-input" data-path="sections.' + i + '.label" value="' + esc(sec.label || '') + '" placeholder="Morning — Activity">'
      +       '</div>'
      +     '</div>'
      +     '<div class="edit-field">'
      +       '<label>Content</label>'
      +       '<textarea class="edit-input edit-textarea" data-path="sections.' + i + '.content" placeholder="Narrative — what you\'re doing, time, vibe…">' + esc(sec.content || '') + '</textarea>'
      +     '</div>'
      +     '<div class="edit-field">'
      +       '<label>Address (optional)</label>'
      +       '<input type="text" class="edit-input" data-path="sections.' + i + '.address" value="' + esc(sec.address || '') + '" placeholder="Venue · 123 Address">'
      +     '</div>'
      +     '<div class="edit-field">'
      +       '<label>Notes (optional)</label>'
      +       '<div class="note-type-pills">' + pillsHtml + '</div>'
      +       (textInputsHtml ? '<div class="note-active-inputs">' + textInputsHtml + '</div>' : '')
      +     '</div>'
      +     '<button class="edit-section-delete" onclick="deleteEditSection(' + i + ')">🗑 Delete this section</button>'
      +   '</div>'
      + '</div>';
  }).join('');

  const hasPAT = !!getPAT();
  const noticeText = hasPAT
    ? 'Hitting Done will save & publish to GitHub.'
    : 'Hitting Done saves to this browser only. Tap ⚙ to add a GitHub token to publish.';

  const noticeHtml = ''
    + '<div class="edit-mode-notice">'
    +   '<b>Editing Day ' + draft.id + '.</b> ' + noticeText
    + '</div>';

  const html = noticeHtml
    + '<div class="day-card editing-card ' + theme + '" data-day="' + draft.id + '">'
    +   '<div class="edit-day-header">'
    +     '<div class="edit-day-num">Day ' + draft.id + '</div>'
    +     '<div class="edit-field">'
    +       '<label>Date</label>'
    +       '<input type="text" class="edit-input" data-path="date" value="' + esc(draft.date || '') + '" placeholder="Friday, May 29">'
    +     '</div>'
    +     '<div class="edit-field">'
    +       '<label>Location</label>'
    +       '<input type="text" class="edit-input" data-path="location" value="' + esc(draft.location || '') + '" placeholder="City / Region">'
    +     '</div>'
    +     '<div class="edit-field">'
    +       '<label>Sublocation (optional)</label>'
    +       '<input type="text" class="edit-input" data-path="sublocation" value="' + esc(draft.sublocation || '') + '" placeholder="Neighborhood">'
    +     '</div>'
    +     '<div class="edit-field">'
    +       '<label>Stay (hotel · address)</label>'
    +       '<input type="text" class="edit-input" data-path="stay" value="' + esc(draft.stay || '') + '" placeholder="Hotel Name · Address">'
    +     '</div>'
    +   '</div>'
    +   '<div class="edit-sections">'
    +     sectionsHtml
    +     '<button class="edit-add-section" onclick="addEditSection()">+ Add section</button>'
    +   '</div>'
    + '</div>';

  document.getElementById('main-content').innerHTML = html;

  // Wire up data-path inputs
  document.querySelectorAll('#main-content [data-path]').forEach(function (input) {
    input.addEventListener('input', onEditInput);
  });
  // Wire up note text inputs
  document.querySelectorAll('#main-content [data-note-sec]').forEach(function (input) {
    input.addEventListener('input', function (e) {
      var secIdx = parseInt(e.target.dataset.noteSec, 10);
      var type = e.target.dataset.noteType;
      var sec = state.editing.draft.sections[secIdx];
      if (!sec.notes) sec.notes = [];
      var note = sec.notes.find(function (n) { return n.type === type; });
      if (note) note.text = e.target.value;
    });
  });
}

function onEditInput(e) {
  setDraftField(e.target.dataset.path, e.target.value);
}

function setDraftField(path, value) {
  const draft = state.editing.draft;
  const parts = path.split('.');
  let obj = draft;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const num = parseInt(key, 10);
    obj = (!isNaN(num) && String(num) === key) ? obj[num] : obj[key];
  }
  const last = parts[parts.length - 1];
  if (value === '' && (last === 'sublocation' || last === 'address' || last === 'stay')) {
    delete obj[last];
    return;
  }
  obj[last] = value;
}

function addEditSection() {
  const draft = state.editing.draft;
  if (!draft.sections) draft.sections = [];
  const newIdx = draft.sections.length;
  draft.sections.push({ label: '', icon: '·', content: '' });
  renderDayEdit();
  requestAnimationFrame(function () {
    const el = document.querySelector('.editing-section[data-sec="' + newIdx + '"]');
    if (el) {
      el.classList.add('open');
      const labelInput = el.querySelector('.edit-input[data-path*="label"]');
      if (labelInput) labelInput.focus();
    }
  });
}

function deleteEditSection(idx) {
  const draft = state.editing.draft;
  const sec = draft.sections[idx];
  const label = sec.label || '(untitled section)';
  if (!confirm('Delete "' + label + '"?')) return;
  draft.sections.splice(idx, 1);
  renderDayEdit();
}

function moveEditSection(idx, dir) {
  const draft = state.editing.draft;
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= draft.sections.length) return;
  const tmp = draft.sections[idx];
  draft.sections[idx] = draft.sections[newIdx];
  draft.sections[newIdx] = tmp;
  renderDayEdit();
  requestAnimationFrame(function () {
    const el = document.querySelector('.editing-section[data-sec="' + newIdx + '"]');
    if (el) { el.classList.add('open'); el.scrollIntoView({ block: 'nearest' }); }
  });
}

function toggleEditNote(secIdx, type) {
  const sec = state.editing.draft.sections[secIdx];
  if (!sec.notes) sec.notes = [];
  const existing = sec.notes.findIndex(function (n) { return n.type === type; });
  if (existing >= 0) {
    sec.notes.splice(existing, 1);
  } else {
    sec.notes.push({ type: type, text: '' });
  }
  renderDayEdit();
  requestAnimationFrame(function () {
    // Keep the section open and focus the new text input
    const secEl = document.querySelector('.editing-section[data-sec="' + secIdx + '"]');
    if (secEl) secEl.classList.add('open');
    const input = document.querySelector('[data-note-sec="' + secIdx + '"][data-note-type="' + type + '"]');
    if (input) input.focus();
  });
}

// ─── EDIT MODE: SAVE ─────────────────────────────────────────────────────────
async function saveEdits() {
  if (state.saving) return;
  if (!state.editing) return;
  state.saving = true;

  const draft = state.editing.draft;
  const idx = DAYS.findIndex(function (d) { return d.id === draft.id; });
  if (idx < 0) {
    state.saving = false;
    showToast('Day not found — could not save', 'err');
    return;
  }
  DAYS[idx] = draft;

  try {
    localStorage.setItem(EDIT_CFG.storageKey, JSON.stringify(DAYS));
  } catch (e) { console.warn('localStorage save failed', e); }

  const pat = getPAT();
  if (pat) {
    showToast('Publishing to GitHub…', 'info');
    try {
      await commitToGitHub(DAYS, pat);
      showToast('Saved & published ✓', 'ok');
    } catch (e) {
      console.error('GitHub commit failed', e);
      showToast('Saved here, but GitHub publish failed: ' + (e.message || 'unknown'), 'warn');
    }
  } else {
    showToast('Saved in this browser', 'ok');
  }

  state.saving = false;
  exitEditMode();
}

async function commitToGitHub(days, pat) {
  const apiUrl = 'https://api.github.com/repos/'
    + EDIT_CFG.githubOwner + '/' + EDIT_CFG.githubRepo
    + '/contents/' + EDIT_CFG.editsPath;

  // Get current SHA (file may not exist)
  let sha;
  const getRes = await fetch(apiUrl + '?ref=' + EDIT_CFG.githubBranch, {
    headers: { 'Authorization': 'Bearer ' + pat, 'Accept': 'application/vnd.github+json' },
  });
  if (getRes.ok) {
    const d = await getRes.json();
    sha = d.sha;
  } else if (getRes.status !== 404) {
    throw new Error('GET ' + getRes.status);
  }

  const newPayload = JSON.stringify({
    updatedAt: new Date().toISOString(),
    days: days,
  }, null, 2);

  // Base64-encode the UTF-8 bytes
  const base64 = btoa(unescape(encodeURIComponent(newPayload)));

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + pat,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Edit Day ' + (state.editing ? state.editing.draft.id : '?') + ' on ' + TRIP_META.shortName,
      content: base64,
      sha: sha,
      branch: EDIT_CFG.githubBranch,
    }),
  });
  if (!putRes.ok) {
    const t = await putRes.text();
    throw new Error('PUT ' + putRes.status + ': ' + t.slice(0, 120));
  }
}

// ─── EDIT MODE: SETTINGS SHEET ───────────────────────────────────────────────
function openSettings() {
  const sheet = document.getElementById('settings-sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  document.getElementById('pat-input').value = getPAT() || '';
  updateSettingsStatus();
  backdrop.style.display = 'block';
  sheet.style.display = 'flex';
  requestAnimationFrame(function () {
    backdrop.classList.add('vis');
    sheet.classList.add('vis');
  });
  state.settingsOpen = true;
}

function closeSettings() {
  const sheet = document.getElementById('settings-sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  sheet.classList.remove('vis');
  backdrop.classList.remove('vis');
  setTimeout(function () {
    sheet.style.display = 'none';
    backdrop.style.display = 'none';
  }, 220);
  state.settingsOpen = false;
}

function updateSettingsStatus() {
  const el = document.getElementById('settings-status');
  const pat = getPAT();
  if (pat) {
    el.className = 'settings-status ok';
    el.textContent = 'Token saved on this device (' + pat.length + ' chars). Edits will publish to GitHub.';
  } else {
    el.className = 'settings-status';
    el.textContent = 'No token set. Edits save to this browser only.';
  }
}

function savePAT() {
  const pat = document.getElementById('pat-input').value.trim();
  if (pat) localStorage.setItem(EDIT_CFG.patKey, pat);
  else localStorage.removeItem(EDIT_CFG.patKey);
  closeSettings();
  showToast(pat ? 'Token saved' : 'Token cleared', 'ok');
}

function getPAT() {
  try { return localStorage.getItem(EDIT_CFG.patKey); } catch (e) { return null; }
}

// ─── EDIT MODE: TOAST ────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, kind) {
  let t = document.getElementById('edit-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'edit-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast-' + (kind || 'info');
  requestAnimationFrame(function () { t.classList.add('vis'); });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('vis'); }, 3800);
}

// ─── EDIT MODE: WIRE UP ──────────────────────────────────────────────────────
function bindEditButtons() {
  document.getElementById('edit-btn').addEventListener('click', function () {
    if (state.route && state.route.view === 'day') enterEditMode(state.route.id);
  });
  document.getElementById('edit-cancel-btn').addEventListener('click', function () {
    if (state.saving) return;
    exitEditMode();
  });
  document.getElementById('edit-save-btn').addEventListener('click', function () {
    saveEdits().catch(function (e) { console.error(e); showToast('Save error: ' + e.message, 'err'); });
  });
  document.getElementById('edit-settings-btn').addEventListener('click', openSettings);
  document.getElementById('settings-cancel-btn').addEventListener('click', closeSettings);
  document.getElementById('settings-save-btn').addEventListener('click', savePAT);
}

// ─── EDIT MODE: ASYNC OVERLAY FROM REMOTE ────────────────────────────────────
async function fetchRemoteEdits() {
  try {
    const res = await fetch('edits.json', { cache: 'no-cache' });
    if (!res.ok) return; // 404 is fine — no published edits yet
    const data = await res.json();
    if (!data || !Array.isArray(data.days) || !data.days.length) return;
    const incoming = JSON.stringify(data.days);
    const cached = localStorage.getItem(EDIT_CFG.storageKey);
    if (cached === incoming) return; // No change
    DAYS = data.days;
    try { localStorage.setItem(EDIT_CFG.storageKey, incoming); } catch (e) {}
    if (!state.editing && state.route) renderRoute();
  } catch (e) { /* offline, swallow */ }
}

document.addEventListener('DOMContentLoaded', init);
