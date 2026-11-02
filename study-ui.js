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
  let lastPosition = null;
  let storageFailed = false;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) reviewed = stored;
    lastChapter = localStorage.getItem('recall.last-chapter');
    const position = JSON.parse(localStorage.getItem('recall.position.v1') || 'null');
    if (position && typeof position === 'object' && typeof position.chapterId === 'string' && /^question-\d+$/.test(position.questionId)) lastPosition = position;
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
  const studyURL = (chapter, position) => {
    const url = new URL(href(chapter));
    url.searchParams.set('view', 'reading');
    if (position && position.chapterId === chapter.id) url.hash = position.questionId;
    return url.href;
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
    const phaseLabels = {3: 'Machine learning', 4: 'Deep learning', 5: 'NLP & transformers', 6: 'LLMs & AI engineering', 7: 'Multi-LLM orchestration', 8: 'RAG & vector databases', 9: 'AI agents & agentic systems', 11: 'Generative AI beyond text'};
    for (const phase of [...new Set(chapters.map(chapter => chapter.phase))]) {
      const group = create('details', 'sidebar-phase');
      group.dataset.phase = String(phase);
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
    const upcoming = link('Phase 10 · Fine-tuning — Coming soon', new URL('PHASE%2010%20-%20Fine-Tuning%20%26%20Model%20Customization/index.html', siteRoot).href, 'sidebar-home');
    if (activePhase === 10) upcoming.setAttribute('aria-current', 'page');
    const laterPhase = [...nav.children].find(element => Number(element.dataset.phase) > 10);
    nav.insertBefore(upcoming, laterPhase || null);
    return nav;
  }
  document.body.classList.add('guided-ui', isChapter ? 'study-page' : 'library-page');
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
    headerActions.append(link('Library', homeURL, 'study-exit'));
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
  dialog.append(progressBlock());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  menu.addEventListener('click', () => dialog.showModal());
  document.body.prepend(skip, header, sidebar);
  document.body.append(dialog);
  if (!isChapter) {
    if (document.body.classList.contains('roadmap-page')) {
      refreshProgress();
      return;
    }
    if (!activePhase) {
      const resume = chapters.find(chapter => chapter.id === (lastPosition ? lastPosition.chapterId : lastChapter)) || chapters[0];
      if (resume) {
        const card = create('section', 'resume-card');
        card.setAttribute('aria-labelledby', 'resume-title');
        const content = create('div');
        content.append(create('p', 'study-eyebrow', lastChapter || lastPosition ? 'PICK UP WHERE YOU LEFT OFF' : 'YOUR NEXT READ'));
        const title = create('h2', '', resume.title);
        title.id = 'resume-title';
        content.append(title);
        const saved = lastPosition && lastPosition.chapterId === resume.id ? lastPosition : null;
        const number = saved ? Number(saved.questionId.split('-')[1]) : 1;
        content.append(create('p', 'resume-location', `Phase ${resume.phase} · Chapter ${resume.id} · Question ${number} of ${resume.count}`));
        if (saved && saved.question) content.append(create('p', 'resume-question', saved.question));
        else content.append(create('p', 'resume-question', 'Read at your own pace, or focus on one question.'));
        card.append(content, link('Continue learning', studyURL(resume, saved), 'ui-button ui-button-primary'));
        main.querySelector('.library-heading').after(card);
      }
    } else {
      for (const row of main.querySelectorAll('.chapter-row')) {
        const chapter = chapters.find(c => c.id === row.querySelector('.card-number').textContent.trim());
        if (!chapter) continue;
        const progress = create('small', 'row-progress');
        progress.dataset.chapterProgress = chapter.id;
        row.querySelector('.row-title').append(progress);
      }
    }
    refreshProgress();
    return;
  }
  const hero = document.querySelector('.hero .container');
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
    if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open && document.body.dataset.view === 'index') { event.preventDefault(); search.focus(); }
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
    reviewControls.push({key, button, badge, detail, number, question});
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
  setupStudyMode();

  function setupStudyMode() {
    // The reader owns the original answer nodes. Focus temporarily borrows one;
    // the index contains navigation links only and never duplicates answers.
    const reader = create('section', 'chapter-reader');
    reader.id = 'chapter-reader';
    reader.setAttribute('aria-label', 'Reading mode');
    const indexView = create('section', 'chapter-index');
    indexView.id = 'chapter-index';
    indexView.setAttribute('aria-label', 'Chapter content index');
    const controls = main.querySelector('.controls');
    const catalogue = main.querySelector('#questions');
    const mathStatus = main.querySelector('#math-status');
    for (const child of [...main.children]) if (child !== status && child !== controls && child !== empty) reader.append(child);
    const indexIntro = create('p', 'index-intro', 'Find a question, then open it in Reading Mode.');
    const indexTopics = create('div', 'index-topics');
    indexView.append(indexIntro, controls, indexTopics, empty);
    const readerTools = create('div', 'reading-tools');
    readerTools.append(controls.querySelector('#toggle-all-sections'));
    reader.prepend(readerTools);
    const viewNav = create('nav', 'view-switcher');
    viewNav.setAttribute('aria-label', 'Chapter views');
    const viewLinks = new Map();
    for (const [view, title] of [['index', 'Content / Index'], ['reading', 'Reading Mode'], ['focus', 'Focus Mode']]) {
      const anchor = link(title, '?view=' + view);
      viewLinks.set(view, anchor);
      viewNav.append(anchor);
    }
    const records = reviewControls.map(item => ({...item, answer: item.detail.querySelector('.answer'), topic: item.detail.closest('.topic')}));
    const groups = [];
    for (const [topicIndex, section] of [...catalogue.querySelectorAll('.topic')].entries()) {
      const heading = section.querySelector('h2');
      const title = heading.textContent.replace(/^\d+\s*/, '').trim();
      const group = create('section', 'index-topic');
      const indexHeading = create('h2', '', title);
      indexHeading.id = 'index-topic-' + topicIndex;
      group.setAttribute('aria-labelledby', indexHeading.id);
      group.append(indexHeading);
      const list = create('ol', 'index-questions');
      const items = records.filter(item => item.topic === section).map(item => {
        const li = create('li');
        const anchor = link('', '?view=reading#' + item.detail.id);
        anchor.append(create('span', 'index-number', item.number), create('span', '', item.question));
        li.append(anchor);
        list.append(li);
        return {li, item};
      });
      const count = create('span', 'index-topic-count', `${items.length} ${items.length === 1 ? 'question' : 'questions'}`);
      group.append(count, list);
      indexTopics.append(group);
      groups.push({group, items});
    }
    function syncIndex() {
      for (const {group, items} of groups) {
        for (const {li, item} of items) li.hidden = item.detail.hidden;
        group.hidden = items.every(({li}) => li.hidden);
      }
    }
    search.addEventListener('input', syncIndex);
    select.addEventListener('change', syncIndex);
    for (const button of filterButtons) button.addEventListener('click', syncIndex);

    const focusView = create('section', 'study-session');
    focusView.id = 'focus-view';
    focusView.setAttribute('aria-label', 'Focus mode');
    const focusHeading = create('div', 'session-heading');
    focusHeading.append(create('p', 'study-eyebrow', 'FOCUS MODE'), create('h1', '', current.title));
    const position = create('p', 'session-position');
    const focusProgress = create('progress');
    focusProgress.max = records.length;
    focusProgress.setAttribute('aria-label', 'Question position in chapter');
    focusHeading.append(position, focusProgress);
    const card = create('article', 'study-question');
    const topic = create('p', 'session-topic');
    const questionTitle = create('h2');
    questionTitle.id = 'study-question-title';
    questionTitle.tabIndex = -1;
    card.setAttribute('aria-labelledby', questionTitle.id);
    const answerSlot = create('div');
    answerSlot.id = 'study-answer';
    const review = create('button');
    review.type = 'button';
    const actions = create('div', 'study-question-actions');
    actions.append(review);
    card.append(topic, questionTitle, answerSlot, actions);
    const questionNav = create('nav', 'study-navigation');
    questionNav.setAttribute('aria-label', 'Focus questions');
    const previous = create('button', '', 'Previous');
    const next = create('button', '', 'Next');
    previous.type = next.type = 'button';
    questionNav.append(previous, next);
    const returnLinks = create('div', 'focus-return');
    returnLinks.append(link('Return to Reading Mode', '?view=reading', 'secondary-link'), link('Content / Index', '?view=index', 'secondary-link'));
    focusView.append(focusHeading, card, questionNav, returnLinks);
    main.append(viewNav, indexView, reader, focusView);

    let mode = 'reading';
    let index = Math.max(0, records.findIndex(item => lastPosition && lastPosition.chapterId === current.id && item.detail.id === lastPosition.questionId));
    let borrowed = null;
    // Reading starts expanded. Later view changes keep individual disclosure states.
    for (const item of records) item.detail.open = true;
    const savePosition = item => {
      lastPosition = {chapterId: current.id, questionId: item.detail.id, question: item.question, topic: item.topic.querySelector('h2').textContent.replace(/^\d+\s*/, '').trim()};
      try {
        localStorage.setItem('recall.last-chapter', current.id);
        localStorage.setItem('recall.position.v1', JSON.stringify(lastPosition));
      } catch {
        status.textContent = 'Your place could not be saved in this browser. Reading is still available.';
      }
    };
    const restoreAnswer = () => {
      if (borrowed) { borrowed.detail.append(borrowed.answer); borrowed = null; }
    };
    const syncReview = () => {
      const done = reviewed[records[index].key] === true;
      review.textContent = done ? 'Reviewed · Undo' : 'Mark as reviewed';
      review.setAttribute('aria-pressed', String(done));
    };
    function renderFocus(focus) {
      const item = records[index];
      borrowed = item;
      answerSlot.replaceChildren(item.answer);
      questionTitle.textContent = item.question;
      topic.textContent = item.topic.querySelector('h2').textContent.replace(/^\d+\s*/, '').trim();
      topic.hidden = topic.textContent.toLowerCase() === item.question.toLowerCase();
      position.textContent = `Question ${index + 1} of ${records.length}`;
      focusProgress.value = index + 1;
      previous.disabled = index === 0;
      next.disabled = index === records.length - 1;
      syncReview();
      if (focus) { window.scrollTo(0, 0); questionTitle.focus({preventScroll: true}); }
    }
    function urlFor(view, at = null) {
      const url = new URL(location.href);
      url.searchParams.delete('question');
      url.searchParams.set('view', view);
      url.hash = at === null ? '' : records[at].detail.id;
      return url;
    }
    function show(view, at = null, focus = false) {
      restoreAnswer();
      mode = view;
      if (at !== null) index = at;
      document.body.dataset.view = view;
      document.querySelector('.hero').hidden = view === 'focus';
      indexView.hidden = view !== 'index';
      reader.hidden = view !== 'reading';
      focusView.hidden = view !== 'focus';
      for (const [name, anchor] of viewLinks) {
        if (name === view) anchor.setAttribute('aria-current', 'page');
        else anchor.removeAttribute('aria-current');
        anchor.href = urlFor(name, name === 'index' ? null : index).href;
      }
      if (view === 'focus') {
        renderFocus(focus);
        if (mathStatus) focusHeading.after(mathStatus);
        for (const anchor of returnLinks.querySelectorAll('a')) anchor.href = urlFor(anchor.search.includes('index') ? 'index' : 'reading', anchor.search.includes('index') ? null : index).href;
      } else {
        if (mathStatus) catalogue.before(mathStatus);
        if (view === 'reading') {
          // Index filters must never suppress questions in the continuous reader.
          select.value = '0';
          filterButtons[0].click();
          resetSearch();
          if (at !== null) {
            const item = records[index];
            item.detail.open = true;
            requestAnimationFrame(() => {
              if (mode !== 'reading') return;
              item.detail.scrollIntoView({block: 'start'});
              if (focus) item.detail.querySelector('summary').focus({preventScroll: true});
            });
          } else if (focus) { window.scrollTo(0, 0); main.focus({preventScroll: true}); }
        } else {
          syncIndex();
          if (focus) { window.scrollTo(0, 0); search.focus({preventScroll: true}); }
        }
      }
      if (view !== 'index') savePosition(records[index]);
    }
    function navigate(view, at = null) {
      history.pushState({}, '', urlFor(view, at));
      show(view, at, true);
    }
    // Native links still work with modifier clicks, copied URLs, and new tabs.
    function handleViewLink(event) {
      const anchor = event.target.closest('a');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.target) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.searchParams.has('view')) return;
      const view = url.searchParams.get('view');
      if (!['index', 'reading', 'focus'].includes(view)) return;
      event.preventDefault();
      const at = records.findIndex(item => '#' + item.detail.id === url.hash);
      navigate(view, at < 0 ? null : at);
    }
    main.addEventListener('click', handleViewLink);
    previous.addEventListener('click', () => { if (index > 0) navigate('focus', index - 1); });
    next.addEventListener('click', () => { if (index + 1 < records.length) navigate('focus', index + 1); });
    review.addEventListener('click', () => { records[index].button.click(); syncReview(); });
    for (const [at, item] of records.entries()) {
      item.detail.querySelector('.review-actions').prepend(link('Focus on this question', '?view=focus#' + item.detail.id, 'secondary-link'));
      item.detail.querySelector('summary').addEventListener('click', () => {
        if (mode === 'reading') { index = at; savePosition(item); }
      });
      item.button.addEventListener('click', () => { index = at; savePosition(item); });
    }
    // Save the question actually reached while scrolling a long-form reader.
    let scrollPending = false;
    function rememberVisibleQuestion() {
      scrollPending = false;
      if (mode !== 'reading') return;
      let visible = null;
      for (const item of records) {
        const rect = item.detail.getBoundingClientRect();
        if (rect.bottom > 110 && rect.top < innerHeight) {
          visible = item;
          break;
        }
      }
      if (visible && (!lastPosition || lastPosition.chapterId !== current.id || lastPosition.questionId !== visible.detail.id)) {
        index = records.indexOf(visible);
        savePosition(visible);
        viewLinks.get('focus').href = urlFor('focus', index).href;
      }
    }
    window.addEventListener('scroll', () => {
      if (!scrollPending && mode === 'reading') { scrollPending = true; requestAnimationFrame(rememberVisibleQuestion); }
    }, {passive: true});
    window.addEventListener('storage', event => { if (event.key === storageKey && mode === 'focus') syncReview(); });
    function readLocation(initial = false) {
      const params = new URL(location.href).searchParams;
      const aliases = {study: 'focus', browse: 'reading', overview: 'index'};
      const requested = params.get('view');
      const view = aliases[requested] || (['index', 'reading', 'focus'].includes(requested) ? requested : 'reading');
      const id = location.hash.slice(1) || params.get('question');
      const at = records.findIndex(item => item.detail.id === id);
      if (view === 'reading' && at < 0) index = 0;
      show(view, at < 0 ? null : at, !initial);
    }
    window.addEventListener('hashchange', () => readLocation());
    window.addEventListener('popstate', () => readLocation());
    readLocation(true);
  }
})();
