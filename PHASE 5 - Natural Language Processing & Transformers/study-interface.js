(() => {
  const chapters = [
  [
    "5.1 Text Preprocessing",
    "5.1 Text Preprocessing"
  ],
  [
    "5.2 Classical Text Representation",
    "5.2 Classical Text Representation"
  ],
  [
    "5.3 Word Embeddings",
    "5.3 Word Embeddings"
  ],
  [
    "5.4 Subword Tokenization (Modern)",
    "5.4 Subword Tokenization (Modern)"
  ],
  [
    "5.5 Transformer Architecture (Master This)",
    "5.5 Transformer Architecture (Master This)"
  ],
  [
    "5.6 Language Modeling",
    "5.6 Language Modeling"
  ],
  [
    "5.7 Key Pretrained Models",
    "5.7 Key Pretrained Models"
  ],
  [
    "5.8 NLP Evaluation Metrics",
    "5.8 NLP Evaluation Metrics"
  ],
  [
    "5.9 Key Python Libraries",
    "5.9 Key Python Libraries"
  ]
];
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'NLP and transformer chapters');
  const home = document.createElement('a');
  home.href = '../../index.html';
  home.textContent = 'Home';
  nav.append(home);
  const overview = document.createElement('a');
  overview.href = '../index.html';
  overview.textContent = 'Phase 5';
  nav.append(overview);
  for (const [folder, text] of chapters) {
    const link = document.createElement('a');
    link.href = '../' + encodeURIComponent(folder) + '/index.html';
    link.textContent = text;
    if (decodeURIComponent(location.pathname).includes('/' + folder + '/')) {
      link.setAttribute('aria-current', 'page');
    }
    nav.append(link);
  }
  document.querySelector('.hero .container').prepend(nav);
  document.querySelector('label[for="search"]').textContent = 'Search notes';
  document.querySelector('#search').placeholder = 'Search a concept...';
  for (const actions of document.querySelectorAll('.actions')) actions.remove();

  const toolbar = document.querySelector('.toolbar');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'toggle-all-sections';
  toggle.setAttribute('aria-controls', 'study-content');
  const main = document.querySelector('main');
  main.id = 'study-content';
  toolbar.append(toggle);
  const visibleRows = () => [...main.querySelectorAll('details')].filter(row => !row.closest('[hidden]'));
  function updateToggle() {
    const rows = visibleRows();
    toggle.textContent = rows.length && rows.every(row => row.open) ? 'Collapse all' : 'Expand all';
    toggle.disabled = !rows.length;
  }
  toggle.addEventListener('click', () => {
    const rows = visibleRows();
    const open = !rows.every(row => row.open);
    for (const row of rows) row.open = open;
    updateToggle();
  });
  for (const row of main.querySelectorAll('details')) row.addEventListener('toggle', updateToggle);
  new MutationObserver(updateToggle).observe(main, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  updateToggle();
})();
