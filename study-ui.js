(() => {
  'use strict';
  const chapters = window.STUDY_CHAPTERS || [];
  const siteRoot = new URL('.', document.currentScript.src);
  const homeURL = new URL('index.html', siteRoot).href;
  const href = chapter => new URL(chapter.href, siteRoot).href;
  const current = chapters.find(chapter => decodeURIComponent(new URL(href(chapter)).pathname) === decodeURIComponent(location.pathname));
  const isChapter = Boolean(current && document.querySelector('#questions'));
  const activePhase = current ? current.phase : Number(document.body.dataset.phase) || null;
  const phaseURL = phase => {
    const chapter = chapters.find(item => item.phase === phase);
    return new URL(chapter.href.split('/')[0] + '/index.html', siteRoot).href;
  };
  const storageKey = 'recall.reviewed.v1';
  let reviewed = {};
  let lastChapter = null;
  let storageFailed = false;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) reviewed = stored;
    lastChapter = localStorage.getItem('recall.last-chapter');
  } catch { storageFailed = true; }
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const icon = name => {
    const paths = {
      book: '<path d="M4 5h6a3 3 0 0 1 3 3v12a4 4 0 0 0-4-3H4z"/><path d="M13 8a3 3 0 0 1 3-3h4v12h-3a4 4 0 0 0-4 3"/>',
      grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
      menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
      search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>'
    };
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [key, value] of Object.entries({width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false'})) element.setAttribute(key, value);
    element.innerHTML = paths[name] || paths.book;
    return element;
  };
  const link = (text, url, className) => {
    const element = create('a', className, text);
    element.href = url;
    return element;
  };
  const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.count, 0);
  const countReviewed = chapter => Object.keys(reviewed).filter(key => reviewed[key] === true && key.startsWith(chapter.id + ':')).length;
  const totalReviewed = () => chapters.reduce((sum, chapter) => sum + Math.min(chapter.count, countReviewed(chapter)), 0);
  const progressElements = [];
  function progressBlock(chapter) {
    const block = create('div', chapter ? 'chapter-progress' : 'sidebar-progress');
    if (!chapter) block.append(create('strong', '', 'Your revision progress'));
    const progress = create('progress');
    progress.max = chapter ? chapter.count : totalQuestions;
    progress.setAttribute('aria-label', chapter ? 'Chapter questions reviewed' : 'All questions reviewed');
    const text = create(chapter ? 'span' : 'small');
    block.append(progress, text);
    if (!chapter) block.append(create('small', '', 'Saved in this browser'));
    progressElements.push({progress, text, chapter});
    return block;
  }
  function refreshProgress() {
    for (const item of progressElements) {
      const count = item.chapter ? Math.min(item.chapter.count, countReviewed(item.chapter)) : totalReviewed();
      item.progress.value = count;
      item.text.textContent = `${count} of ${item.progress.max} reviewed`;
    }
    document.querySelectorAll('[data-chapter-progress]').forEach(element => {
      const chapter = chapters.find(c => c.id === element.dataset.chapterProgress);
      if (!chapter) return;
      const count = Math.min(chapter.count, countReviewed(chapter));
      element.textContent = count ? `${count} of ${chapter.count} reviewed` : 'Ready when you are';
    });
  }
  function navigation() {
    const nav = create('nav');
    nav.setAttribute('aria-label', 'Study chapters');
    const overview = link('', homeURL, 'sidebar-home');
    overview.append(icon('grid'), create('span', '', 'Your library'));
    if (!activePhase) overview.setAttribute('aria-current', 'page');
    nav.append(overview);
    const phaseLabels = {3: 'Machine learning', 4: 'Deep learning', 5: 'NLP & transformers'};
    for (const phase of [...new Set(chapters.map(chapter => chapter.phase))]) {
      const group = create('details', 'sidebar-phase');
      group.open = activePhase === phase;
      const parent = create('summary', 'sidebar-phase-parent');
      const title = create('span');
      title.append(create('small', '', `Phase ${phase}`), create('span', '', phaseLabels[phase] || `Learning phase ${phase}`));
      parent.append(title);
      group.append(parent);
      const children = create('div', 'sidebar-phase-children');
      const phaseLink = link('Phase overview', phaseURL(phase), 'sidebar-phase-overview');
      if (!isChapter && activePhase === phase) phaseLink.setAttribute('aria-current', 'page');
      children.append(phaseLink);
      for (const chapter of chapters.filter(c => c.phase === phase)) {
        const item = link('', href(chapter), 'sidebar-link');
        item.append(create('span', 'sidebar-id', chapter.id), create('span', '', chapter.title));
        if (current && current.id === chapter.id) item.setAttribute('aria-current', 'page');
        children.append(item);
      }
      group.append(children);
      nav.append(group);
    }
    return nav;
  }
  document.body.classList.add(isChapter ? 'study-page' : 'library-page');
  const main = document.querySelector('main');
  main.id = main.id || 'study-content';
  main.tabIndex = -1;
  const skip = link('Skip to content', '#' + main.id, 'skip-link');
  const header = create('header', 'app-header');
  const brand = link('', homeURL, 'app-brand');
  const mark = create('span', 'brand-mark');
  mark.append(icon('book'));
  brand.append(mark, create('span', '', 'Recall'), create('small', '', 'AI ENGINEERING NOTES'));
  const headerActions = create('div', 'header-actions');
  if (isChapter) {
    headerActions.append(create('span', 'header-note', 'Make one concept stick.'));
    const focus = create('button', 'focus-button', 'Focus mode');
    focus.type = 'button';
    focus.setAttribute('aria-pressed', 'false');
    focus.addEventListener('click', () => {
      const active = document.body.classList.toggle('focus-mode');
      focus.setAttribute('aria-pressed', String(active));
      focus.textContent = active ? 'Exit focus mode' : 'Focus mode';
    });
    headerActions.append(focus);
  } else {
    const resume = chapters.find(chapter => chapter.id === lastChapter);
    if (resume) headerActions.append(link('Continue learning', href(resume), 'ui-button'));
  }
  const menu = create('button', 'menu-button');
  menu.type = 'button';
  menu.setAttribute('aria-label', 'Open chapter navigation');
  menu.setAttribute('aria-haspopup', 'dialog');
  menu.setAttribute('aria-controls', 'mobile-navigation');
  menu.append(icon('menu'));
  headerActions.append(menu);
  header.append(brand, headerActions);
  const sidebar = create('aside', 'app-sidebar');
  sidebar.append(navigation(), progressBlock());
  const dialog = create('dialog', 'mobile-navigation');
  dialog.id = 'mobile-navigation';
  dialog.setAttribute('aria-labelledby', 'mobile-navigation-title');
  const dialogHeading = create('div', 'dialog-heading');
  const dialogTitle = create('h2', '', 'Your library');
  dialogTitle.id = 'mobile-navigation-title';
  const close = create('button', '', 'Close');
  close.type = 'button';
  close.addEventListener('click', () => dialog.close());
  dialogHeading.append(dialogTitle, close);
  dialog.append(dialogHeading, navigation());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  menu.addEventListener('click', () => dialog.showModal());
  document.body.prepend(skip, header, sidebar);
  document.body.append(dialog);
  if (!isChapter) {
    refreshProgress();
    return;
  }
  try { localStorage.setItem('recall.last-chapter', current.id); } catch { storageFailed = true; }
  const hero = document.querySelector('.hero .container');
  if (current.topics === 1) {
    const chapterHeading = hero.querySelector('h1');
    chapterHeading.id = 'chapter-heading';
    for (const section of document.querySelectorAll('#questions .topic')) {
      section.querySelector('h2').hidden = true;
      section.setAttribute('aria-labelledby', chapterHeading.id);
    }
  }
  const breadcrumbs = create('nav', 'breadcrumbs');
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
  const trail = create('ol');
  for (const [text, url] of [['Library', homeURL], [`Phase ${current.phase}`, phaseURL(current.phase)], [current.title, null]]) {
    const item = create('li');
    if (url) item.append(link(text, url));
    else { const textNode = create('span', '', text); textNode.setAttribute('aria-current', 'page'); item.append(textNode); }
    trail.append(item);
  }
  breadcrumbs.append(trail);
  hero.querySelector('h1').before(breadcrumbs);
  const eyebrow = create('p', 'study-eyebrow', `Phase ${current.phase} / Chapter ${current.id}`);
  hero.querySelector('h1').before(eyebrow);
  hero.append(create('p', 'study-description', current.description));
  const overview = create('div', 'chapter-overview');
  overview.append(create('span', '', `${current.count} questions`));
  if (current.topics > 1) overview.append(create('span', '', `${current.topics} topics`));
  overview.append(progressBlock(current));
  hero.append(overview);
  const search = document.querySelector('#search');
  search.placeholder = 'Search a question or concept...';
  document.querySelector('label[for="search"]').textContent = 'Search this chapter';
  const searchField = create('div', 'search-field');
  search.before(searchField);
  const shortcut = create('kbd', 'search-key', '/');
  shortcut.setAttribute('aria-hidden', 'true');
  const clear = create('button', 'clear-search', 'Clear');
  clear.type = 'button';
  clear.setAttribute('aria-label', 'Clear chapter search');
  clear.hidden = true;
  searchField.append(icon('search'), search, shortcut, clear);
  const resetSearch = () => { search.value = ''; search.dispatchEvent(new Event('input', {bubbles: true})); };
  clear.addEventListener('click', () => { resetSearch(); search.focus(); });
  search.addEventListener('input', () => { clear.hidden = !search.value; shortcut.hidden = Boolean(search.value); });
  document.addEventListener('keydown', event => {
    const editing = event.target.matches('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open) { event.preventDefault(); search.focus(); }
    if (event.key === 'Escape' && document.activeElement === search && search.value) { event.preventDefault(); resetSearch(); }
  });
  const filters = document.querySelector('#filters');
  const filterButtons = [...filters.querySelectorAll('button')];
  const topicField = create('div', 'topic-field');
  const label = create('label', '', 'Topic');
  label.htmlFor = 'topic-select';
  const select = create('select');
  select.id = 'topic-select';
  for (const [index, button] of filterButtons.entries()) {
    const option = create('option', '', button.textContent);
    option.value = String(index);
    select.append(option);
  }
  select.addEventListener('change', () => filterButtons[Number(select.value)].click());
  topicField.append(label, select);
  topicField.hidden = current.topics === 1;
  filters.before(topicField);
  filters.hidden = true;
  const status = create('p', 'sr-only');
  status.setAttribute('role', 'status');
  main.append(status);
  const reviewControls = [];
  const hash = text => { let value = 2166136261; for (let i = 0; i < text.length; i++) value = Math.imul(value ^ text.charCodeAt(i), 16777619); return (value >>> 0).toString(36); };
  function syncReviewControls() {
    for (const {key, button, badge} of reviewControls) {
      const done = reviewed[key] === true;
      button.setAttribute('aria-pressed', String(done));
      button.querySelector('span').textContent = done ? 'Reviewed' : 'Mark as reviewed';
      badge.hidden = !done;
    }
    refreshProgress();
  }
  for (const detail of document.querySelectorAll('#questions details')) {
    const summary = detail.querySelector('summary');
    const number = summary.querySelector('.q-number').textContent;
    const question = summary.children[1].textContent;
    const key = `${current.id}:${hash(question)}`;
    detail.id = `question-${number}`;
    const badge = create('span', 'reviewed-label', 'Reviewed');
    summary.append(badge);
    const actions = create('div', 'review-actions');
    const button = create('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Mark question ${number} as reviewed`);
    button.append(icon('check'), create('span', '', 'Mark as reviewed'));
    button.addEventListener('click', () => {
      const done = reviewed[key] !== true;
      if (done) reviewed[key] = true; else delete reviewed[key];
      try { localStorage.setItem(storageKey, JSON.stringify(reviewed)); }
      catch { storageFailed = true; }
      status.textContent = `Question ${number} ${done ? 'marked as reviewed' : 'marked as not reviewed'}.${storageFailed ? ' Progress is available for this visit, but could not be saved in this browser.' : ''}`;
      syncReviewControls();
    });
    actions.append(button, link('Link to this question', `#${detail.id}`));
    detail.querySelector('.answer').append(actions);
    reviewControls.push({key, button, badge});
  }
  const pagination = create('nav', 'chapter-pagination');
  pagination.setAttribute('aria-label', 'Previous and next chapter');
  const siblings = chapters.filter(chapter => chapter.phase === current.phase);
  const index = siblings.indexOf(current);
  for (const [labelText, chapter] of [['Previous chapter', siblings[index - 1]], ['Next chapter', siblings[index + 1]]]) {
    const destination = chapter ? href(chapter) : phaseURL(current.phase);
    const item = link('', destination);
    item.append(create('small', '', chapter ? labelText : `Phase ${current.phase}`), create('span', '', chapter ? `${chapter.id} ${chapter.title}` : 'Back to phase overview'));
    pagination.append(item);
  }
  main.append(pagination);
  const empty = document.querySelector('#empty');
  empty.textContent = current.topics === 1 ? 'No matching questions. Try a shorter search.' : 'No matching questions. Try a shorter search or choose All topics.';
  function openHash() {
    const id = location.hash.slice(1);
    if (!/^question-\d+$/.test(id)) return;
    const target = document.getElementById(id);
    if (!target) return;
    select.value = '0';
    filterButtons[0].click();
    resetSearch();
    target.open = true;
    requestAnimationFrame(() => {
      target.scrollIntoView({block: 'start'});
      target.querySelector('summary').focus({preventScroll: true});
    });
  }
  window.addEventListener('hashchange', openHash);
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    try { const value = JSON.parse(event.newValue || '{}'); if (value && typeof value === 'object' && !Array.isArray(value)) { reviewed = value; syncReviewControls(); } } catch { /* Keep the current session state for malformed storage. */ }
  });
  if (typeof ResizeObserver !== 'undefined') {
    const resize = new ResizeObserver(entries => {
      for (const {target} of entries) {
        if (target.scrollWidth > target.clientWidth + 1) { target.tabIndex = 0; target.setAttribute('role', 'region'); target.setAttribute('aria-label', 'Scrollable comparison table'); }
        else { target.removeAttribute('tabindex'); target.removeAttribute('role'); target.removeAttribute('aria-label'); }
      }
    });
    document.querySelectorAll('.table-wrap').forEach(table => resize.observe(table));
  }
  syncReviewControls();
  openHash();
})();
