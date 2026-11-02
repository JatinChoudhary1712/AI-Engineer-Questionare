(() => {
  const chapters = [
  [
    "7.1 Why Multi-LLM Architecture",
    "7.1 Why Multi-LLM Architecture"
  ],
  [
    "7.2 Routing Strategies",
    "7.2 Routing Strategies"
  ],
  [
    "7.3 Fallback Architecture",
    "7.3 Fallback Architecture"
  ],
  [
    "7.4 Model Context Protocol (MCP)",
    "7.4 Model Context Protocol (MCP)"
  ],
  [
    "7.5 LLM Orchestration Frameworks",
    "7.5 LLM Orchestration Frameworks"
  ],
  [
    "7.6 Building PrinceSinghAI - PrinceSinghDev Style Systems",
    "7.6 Building PrinceSinghAI - PrinceSinghDev Style Systems"
  ]
];
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'Multi-LLM orchestration chapters');
  const home = document.createElement('a');
  home.href = '../../index.html';
  home.textContent = 'Home';
  nav.append(home);
  const overview = document.createElement('a');
  overview.href = '../index.html';
  overview.textContent = 'Phase 7';
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
