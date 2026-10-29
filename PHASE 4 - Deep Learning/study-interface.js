(() => {
  const chapters = [
  [
    "4.1 Neural Network Fundamentals",
    "4.1 Neural Network Fundamentals"
  ],
  [
    "4.2 Training Techniques",
    "4.2 Training Techniques"
  ],
  [
    "4.3 Convolutional Neural Networks (CNN)",
    "4.3 Convolutional Neural Networks (CNN)"
  ],
  [
    "4.4 Recurrent Neural Networks (RNN)",
    "4.4 Recurrent Neural Networks (RNN)"
  ],
  [
    "4.5 Attention Mechanism (Pre-Transformer)",
    "4.5 Attention Mechanism (Pre-Transformer)"
  ],
  [
    "4.6 PyTorch (Master This)",
    "4.6 PyTorch (Master This)"
  ],
  [
    "4.7 Transfer Learning",
    "4.7 Transfer Learning"
  ]
];
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'Deep learning chapters');
  const home = document.createElement('a');
  home.href = '../../index.html';
  home.textContent = 'Home';
  nav.append(home);
  const overview = document.createElement('a');
  overview.href = '../index.html';
  overview.textContent = 'Phase 4';
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
