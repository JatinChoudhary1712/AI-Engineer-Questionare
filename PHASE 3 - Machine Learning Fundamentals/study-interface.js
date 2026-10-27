(() => {
  const chapters = [
    ['3.1 Core ML Concepts', '3.1 Core concepts'],
    ['3.2 Linear & Logistic Regression', '3.2 Regression'],
    ['3.3 Decision Trees & Ensembles', '3.3 Trees & ensembles']
  ];
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'Machine learning chapters');
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
