/* Shared product shell. Original sheet renderers remain the source of all answers. */
(() => {
  'use strict';
  const root = new URL('.', document.currentScript.src);
  const data = window.RECALL_ROADMAP;
  if (!data) return;
  const sheets = window.STUDY_CHAPTERS;
  const questions = data.questions;
  const home = new URL('index.html', root);
  const current = sheets.find(c => decodeURIComponent(new URL(c.href, root).pathname) === decodeURIComponent(location.pathname));
  const reading = Boolean(current && document.querySelector('#questions'));
  const el = (tag, cls, text) => { const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n; };
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    brain:'M12 18V5a3 3 0 0 0-5.8-1A4 4 0 0 0 3 11a4 4 0 0 0 2 7 4 4 0 0 0 7 2M12 5a3 3 0 0 1 5.8-1A4 4 0 0 1 21 11a4 4 0 0 1-2 7 4 4 0 0 1-7 2M8 6v3H5m14 0h-3V6M5 14h3v4m8 0v-4h3',
    overview:'m3 10 9-7 9 7v11H3V10m6 11v-8h6v8',
    roadmap:'m12 3 10 6-10 6L2 9l10-6M2 13l10 6 10-6M2 17l10 6 10-6',
    search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    revision:'M3 10a9 9 0 0 1 16-5l2 3M21 3v5h-5M21 14a9 9 0 0 1-16 5l-2-3M3 21v-5h5',
    bookmarks:'M5 3h14v19l-7-5-7 5V3',
    projects:'m7 5-6 7 6 7m10-14 6 7-6 7M14 2l-4 20',
    book:'M12 5C8 2 4 3 1 4v17c4-2 7-2 11 0 4-2 7-2 11 0V4c-3-1-7-2-11 1v16',
    check:'M8 12l3 3 5-6M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
    chart:'M3 22v-7h4v7M10 22V8h4v14M17 22V2h4v20',
    sun:'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon:'M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10',
    resources:'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2',
    interviews:'M4 5h16v12H9l-5 4V5m4 4h8m-8 4h5',
    miscellaneous:'M8 4h8m-7-2h6v4H9V2M6 4H4v18h16V4h-2M8 11h8m-8 5h6',
    menu:'M3 6h18M3 12h18M3 18h18', arrow:'M4 12h16m-6-6 6 6-6 6',chevron:'m9 5 7 7-7 7'
  };
  const icon = name => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.book}"/></svg>`;
  const url = (view, extra={}) => {const separate=view==='phase'||(view==='resources'&&!extra.new&&!extra.edit);const u=separate?new URL(view==='phase'?'phase.html':'resources.html',root):new URL(home);if(!separate)u.searchParams.set('page',view);for(const [k,v] of Object.entries(extra))u.searchParams.set(k,v);return u.href;};
  const questionURL = q => new URL(sheets.find(s=>s.id===q.chapterId).href+'?view=reading#'+q.id,root).href;
  const sheetURL = s => new URL(s.href+'?view=reading',root).href;
  const load = (key,fallback) => {try {const value=JSON.parse(localStorage.getItem(key));return value&&typeof value==='object'&&!Array.isArray(value)?value:fallback;} catch{return fallback;}};
  let reviewed=load('recall.reviewed.v1',{}), bookmarks=load('recall.bookmarks.v1',{}), projects=load('recall.projects.v1',{});
  const notebookKey='recall.notebooks.v1',draftKey='recall.notebook-drafts.v1';
  let notebookEntries=load(notebookKey,{}), notebookDrafts=load(draftKey,{});
  const notebookTypes={
    resources:{title:'Saved Resources',description:'Things you find on X, Instagram, or anywhere else. Keep them here for later.',hint:'Save an article, post, video, or a topic you want to explore. Add why it matters to you.',example:'e.g. Harness engineering — explore this later',types:['Article / post','Video','Topic to explore','Tool / course'],detail:'What I want to explore',statuses:['To explore','In progress','Done']},
    interviews:{title:'Interview Prep',description:'Real interview questions, shared experiences, and your own preparation notes.',hint:'Keep real questions, interview rounds, and experiences from people who have been there.',example:'e.g. AI engineer interview — RAG system design',types:['Interview question','Interview experience','Question set'],detail:'Question or interview experience',statuses:['To prepare','Practising','Ready']},
    miscellaneous:{title:'Miscellaneous',description:'A place for career tasks, LinkedIn improvements, ideas, and everything in between.',hint:'Remember the small things: update LinkedIn, improve your portfolio, or follow up on an idea.',example:'e.g. Improve my LinkedIn About section',types:['Task','Career / profile','Idea','General note'],detail:'Details / next steps',statuses:['To do','In progress','Done']}
  };
  // User-requested public resources. Import each once; keep subsequent edits and deletions.
  const shirinResourceTable=[
    {group:'RAG & Retrieval',info:'Diagnose a wrong RAG response when the relevant document is already indexed.',url:'https://lnkd.in/d-CxdyUR'},
    {group:'RAG & Retrieval',info:'Select document chunk lengths and overlap settings.',url:'https://lnkd.in/di2emDTW'},
    {group:'RAG & Retrieval',info:'Decide when to combine hybrid retrieval with a reranker.',url:'https://lnkd.in/d-Mrncn8'},
    {group:'Agents',info:'Choose between an autonomous agent and a fixed workflow.',url:'https://lnkd.in/d-CxdyUR'},
    {group:'Agents',info:'Plan a RAG-based insurance claims agent with a token budget.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'Agents',info:'Architect an AI agent for customer support.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'Evals',info:'Create evaluation cases and assess whether a release is ready.',url:'https://lnkd.in/d-CxdyUR'},
    {group:'Evals',info:'Assess an agent’s execution, beyond its final response.',url:'https://lnkd.in/d-CxdyUR'},
    {group:'LLM System Design',info:'Build a pipeline that batches requests to language models.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'LLM System Design',info:'Lower serving latency and inference spending at scale.',url:'https://lnkd.in/d__s7RAb'},
    {group:'LLM System Design',info:'Handle large multimodal uploads in an AI chat product.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'LLM System Design',info:'Architect a low-latency conversational voice application.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'Production & Debugging',info:'Expose model behavior through a dependable application interface.',url:'https://lnkd.in/d-CxdyUR'},
    {group:'Production & Debugging',info:'Investigate and stop an agent that repeatedly loops.',url:'https://lnkd.in/di2emDTW'},
    {group:'Production & Debugging',info:'Address confidently incorrect model responses in a sensitive workflow.',url:'https://lnkd.in/d9ukGNiJ'},
    {group:'Production & Debugging',info:'Discuss a deployed AI project, a failure, and evidence that the fix worked.',url:'https://lnkd.in/diqkiz9A'}
  ];
  const bundledResources=[
    {
      id:'linkedin-ai-interview-resources-7523388742007586817',category:'resources',
      title:'AI Engineer interview questions and resources — Shirin Khosravi Jam',
      source:'LinkedIn · Shirin Khosravi Jam',type:'Article / post',status:'To explore',
      url:'https://www.linkedin.com/posts/shirin-khosravi-jam_ai-engineer-interview-questions-and-resources-activity-7523388742007586817-Vt52',
      originalUrl:'https://lnkd.in/p/gPkEt-bj',
      resourceTable:shirinResourceTable,
      content:'A collection of 16 AI engineering interview practice prompts, grouped into five areas:\n\n• RAG & retrieval: diagnose incorrect answers, choose chunking settings, and combine retrieval methods.\n• Agents: choose between an agent and a fixed workflow; design claims-processing and customer-support systems.\n• Evaluations: build a test set, assess changes before release, and examine agent behavior.\n• LLM system design: batching, latency and cost, multimodal uploads, and voice applications.\n• Production & debugging: reliable application interfaces, looping agents, factual errors, and lessons from shipped systems.\n\nThe post includes links to supporting preparation resources. Open the source to explore those links.',
      notes:''
    },
    {
      id:'rag-interview-100-1nh2EyRFnIlD3S4s3mTeLWizVjFqzEun4aMDqJtI3l60',category:'interviews',
      title:'100 RAG Interview Questions — With Detailed Answers',
      source:'Google Docs · 2026 study guide',type:'Question set',status:'To prepare',
      url:'https://docs.google.com/document/d/1nh2EyRFnIlD3S4s3mTeLWizVjFqzEun4aMDqJtI3l60/mobilebasic',
      content:'A RAG interview study guide with 100 numbered questions and detailed answers, verified across five categories of 20 questions each:\n\n1. RAG Fundamentals — questions 1–20.\n2. Chunking & Embeddings — questions 21–40.\n3. Vector DBs & Retrieval — questions 41–60.\n4. Evaluation — questions 61–80.\n5. Production & Advanced RAG — questions 81–100.\n\nTopics include retrieval failures, embedding choices, vector indexes, hybrid retrieval, evaluation, citations, production architecture, and advanced retrieval patterns.\n\nThe guide suggests answering aloud before reading the explanation, identifying weak areas, and practising mock interviews. Use the source document for the complete questions and answers.',
      notes:''
    }
  ];
  const resourceIdentity=value=>{try{const u=new URL(value);const doc=u.pathname.match(/\/document\/d\/([^/]+)/);return doc?'google-doc:'+doc[1]:u.origin+u.pathname.replace(/\/$/,'');}catch{return value;}};
  const bundledImportKey='recall.bundled-resources.v1',importedResources=load(bundledImportKey,{});
  let importsChanged=false;
  for(const item of bundledResources){
    if(importedResources[item.id]===true)continue;
    const identities=[resourceIdentity(item.url),resourceIdentity(item.originalUrl)];
    const exists=Object.values(notebookEntries).some(saved=>saved&&(saved.id===item.id||(saved.url&&identities.includes(resourceIdentity(saved.url)))));
    if(!exists){const now=new Date().toISOString();notebookEntries[item.id]={...item,createdAt:now,updatedAt:now};}
    importedResources[item.id]=true;importsChanged=true;
  }
  // Enrich already-saved copies without replacing their personal fields or restoring deleted items.
  const shirinResource=bundledResources[0];
  for(const [id,item]of Object.entries(notebookEntries)){
    if(item&&(item.id===shirinResource.id||[shirinResource.url,shirinResource.originalUrl].map(resourceIdentity).includes(resourceIdentity(item.url)))&&!Array.isArray(item.resourceTable)){
      notebookEntries[id]={...item,resourceTable:shirinResourceTable};importsChanged=true;
    }
  }
  if(importsChanged)try{localStorage.setItem(notebookKey,JSON.stringify(notebookEntries));localStorage.setItem(bundledImportKey,JSON.stringify(importedResources));}catch{ /* Resources remain available for this visit when storage is unavailable. */ }
  const notebookItems=category=>Object.values(notebookEntries).filter(item=>item&&typeof item.id==='string'&&typeof item.title==='string'&&notebookTypes[item.category]&&(!category||item.category===category)).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
  const externalURL=value=>{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const announce=el('p','sr-only');announce.setAttribute('role','status');announce.setAttribute('aria-live','polite');
  const save = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));}catch{announce.textContent='Your change works for this visit. Browser storage is unavailable.';}};
  const countDone = list => list.filter(q=>reviewed[q.key]===true).length;
  const percent = list => list.length?Math.round(countDone(list)/list.length*100):0;
  const badge = count => `<span class="availability ${count?'available':'upcoming'}">${count?'Available':'Coming Soon'}</span>`;
  const phaseName = p => p.id==='capstone'?'Capstone':`Phase ${p.id}`;
  const allNodes = c => [...c.topics.flatMap(t=>[t,...t.points]),...(c.supplements||[])];
  const nodeQuestions = (c,t) => {const ids=new Set([t.id,...t.points.map(p=>p.id)]);return questions.filter(q=>q.chapterId===c.id&&ids.has(q.topicId));};
  document.body.classList.add('recall-app');
  if(!reading) document.body.classList.add('portal-page');
  document.querySelectorAll('.app-header,.app-sidebar,.mobile-navigation').forEach(n=>n.remove());
  const sidebar=el('aside','recall-sidebar');sidebar.id='recall-sidebar';
  const brand=el('a','recall-brand');brand.href=home.href;brand.innerHTML=`${icon('brain')}<span><strong>Recall</strong><small>AI Engineering Learning</small></span>`;
  const nav=el('nav','product-nav');nav.setAttribute('aria-label','Main navigation');
  const navItems=[['overview','Overview'],['roadmap','Roadmap'],['questions','Question Bank'],['revision','Revision'],['bookmarks','Bookmarks'],['projects','Projects'],...Object.entries(notebookTypes).map(([key,config])=>[key,config.title])];
  for(const [key,title]of navItems){if(key==='resources')nav.append(el('p','personal-nav-label','PERSONAL SPACE'));const a=el('a');a.href=url(key);a.dataset.page=key;a.innerHTML=icon(key==='questions'?'search':key)+`<span>${title}</span>`;nav.append(a);}
  const theme=el('div','theme-control');theme.innerHTML=icon('sun')+'<label class="sr-only" for="product-theme">Color theme</label><select id="product-theme"><option value="light">Light</option><option value="dark">Dark</option></select>';
  const themeSelect=theme.querySelector('select');themeSelect.value=window.RecallTheme?.current||'light';
  themeSelect.addEventListener('change',()=>window.RecallTheme?.set(themeSelect.value));
  window.addEventListener('recall:theme',()=>themeSelect.value=window.RecallTheme.current);
  sidebar.append(brand,nav,theme);
  const header=el('header','recall-topbar');
  const menu=el('button','drawer-toggle');menu.type='button';menu.innerHTML=icon('menu');menu.setAttribute('aria-label','Open navigation');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-controls',sidebar.id);
  const global=el('div','global-search');global.innerHTML=icon('search')+'<label class="sr-only" for="global-search">Search questions, topics, or chapters</label><input id="global-search" type="search" placeholder="Search questions, topics, or chapters..." autocomplete="off" aria-controls="search-results" aria-expanded="false"><kbd>Ctrl + K</kbd>';
  const searchInput=global.querySelector('input');
  const avatar=el('span','user-avatar','J');avatar.setAttribute('aria-label','Jatin');
  const themeShortcut=el('button','topbar-theme');themeShortcut.type='button';
  const syncThemeShortcut=()=>{const dark=window.RecallTheme?.current==='dark';const label=dark?'Switch to light theme':'Switch to dark theme';themeShortcut.innerHTML=icon(dark?'sun':'moon');themeShortcut.setAttribute('aria-label',label);themeShortcut.title=label;};
  themeShortcut.addEventListener('click',()=>window.RecallTheme?.set(window.RecallTheme.current==='dark'?'light':'dark'));
  window.addEventListener('recall:theme',syncThemeShortcut);syncThemeShortcut();
  header.append(menu,global,themeShortcut,avatar);
  const scrim=el('button','drawer-scrim');scrim.setAttribute('aria-label','Close navigation');
  const closeDrawer=()=>{document.body.classList.remove('drawer-open');menu.setAttribute('aria-expanded','false');sidebar.removeAttribute('role');sidebar.removeAttribute('aria-modal');};
  menu.onclick=()=>{const open=document.body.classList.toggle('drawer-open');menu.setAttribute('aria-expanded',String(open));if(open){sidebar.setAttribute('role','dialog');sidebar.setAttribute('aria-modal','true');sidebar.setAttribute('aria-label','Navigation');sidebar.querySelector('a').focus();}else closeDrawer();};scrim.onclick=closeDrawer;
  document.body.prepend(sidebar,header,scrim);document.body.append(announce);
  const results=el('section','search-results');results.id='search-results';results.hidden=true;results.setAttribute('aria-label','Search results');global.append(results);
  const searchIndex=[];
  for(const p of data.phases) {
    searchIndex.push({title:`${phaseName(p)} — ${p.title}`,context:'Roadmap',href:url('phase',{phase:p.id}),count:questions.filter(q=>q.phase===p.id).length});
    for(const c of p.chapters){searchIndex.push({title:c.title,context:`${phaseName(p)} · ${p.title}`,href:url('phase',{phase:p.id,chapter:c.id}),count:questions.filter(q=>q.chapterId===c.id).length});
      for(const t of allNodes(c))searchIndex.push({title:t.title,context:c.title,href:url('phase',{phase:p.id,chapter:c.id,topic:t.id}),count:nodeQuestions(c,t).length});
    }
    for(const project of p.projects)searchIndex.push({title:project.title,context:`${phaseName(p)} · ${project.difficulty} project`,href:url('projects',{project:project.id}),project:true});
  }
  for(const q of questions)searchIndex.push({title:q.text,context:`${q.chapterId} ${sheets.find(s=>s.id===q.chapterId).title} · ${q.sourceTopic}`,href:questionURL(q),count:1});
  let searchTimer;
  searchInput.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{
    results.replaceChildren();const terms=searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    results.hidden=!terms.length;searchInput.setAttribute('aria-expanded',String(Boolean(terms.length)));if(!terms.length)return;
    const personalResults=notebookItems().map(item=>({title:item.title,context:notebookTypes[item.category].title,searchText:[item.notes,item.content,item.source].join(' '),href:url(item.category,{item:item.id}),personal:true}));
    const matches=searchIndex.concat(personalResults).filter(r=>terms.every(t=>(r.title+' '+r.context+' '+(r.searchText||'')).toLowerCase().includes(t)));
    results.append(el('p','search-caption',`${matches.length} results${matches.length>40?' · showing first 40':''}`));
    if(!matches.length)results.append(el('p','empty-state','No results. Try another question, topic, or chapter.'));
    for(const r of matches.slice(0,40)){const a=el('a','search-result');a.href=r.href;a.innerHTML=`<span><strong>${esc(r.title)}</strong><small>${esc(r.context)}</small></span>${r.personal?'<span class="availability">Personal note</span>':r.project?'<span class="availability">Project</span>':badge(r.count)}`;results.append(a);}
  },100);});
  document.addEventListener('click',e=>{if(!global.contains(e.target)){results.hidden=true;searchInput.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();searchInput.focus();searchInput.select();}
    if(e.key==='Escape'){results.hidden=true;searchInput.setAttribute('aria-expanded','false');if(document.body.classList.contains('drawer-open')){closeDrawer();menu.focus();}}
    if(!results.hidden&&['ArrowDown','ArrowUp'].includes(e.key)){const links=[...results.querySelectorAll('a')];if(!links.length)return;e.preventDefault();const at=links.indexOf(document.activeElement);links[(at+(e.key==='ArrowDown'?1:-1)+links.length)%links.length].focus();}
    if(e.key==='Tab'&&document.body.classList.contains('drawer-open')){const controls=[...sidebar.querySelectorAll('a,select')];const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  let main;
  const updateNav=view=>nav.querySelectorAll('a').forEach(a=>{if(a.dataset.page===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(reading){
    updateNav('roadmap');
    document.querySelectorAll('#questions details').forEach(detail=>{
      const q=questions.find(q=>q.chapterId===current.id&&q.id===detail.id);if(!q)return;
      const btn=el('button','bookmark-button');btn.type='button';
      const sync=()=>{btn.textContent=bookmarks[q.key]?'Remove bookmark':'Bookmark';btn.setAttribute('aria-pressed',String(Boolean(bookmarks[q.key])));};
      btn.onclick=()=>{if(bookmarks[q.key])delete bookmarks[q.key];else bookmarks[q.key]=true;save('recall.bookmarks.v1',bookmarks);sync();announce.textContent=bookmarks[q.key]?'Question bookmarked.':'Bookmark removed.';};sync();
      const actions=detail.querySelector('.review-actions') || document.querySelector('#study-answer .review-actions');
      if(actions)actions.append(btn);
    });
    const chapterNav=el('nav','reader-chapters');chapterNav.setAttribute('aria-label','Chapter navigation');chapterNav.innerHTML=`<p class="reader-phase">Phase ${current.phase}</p><strong>${esc(data.phases.find(p=>p.id===current.phase).title)}</strong>`;
    for(const s of sheets.filter(s=>s.phase===current.phase)){const a=el('a','',`${s.id} ${s.title}`);a.href=sheetURL(s);if(s.id===current.id)a.setAttribute('aria-current','page');chapterNav.append(a);}
    sidebar.insertBefore(chapterNav,theme);
    const toc=el('aside','reader-toc');toc.setAttribute('aria-label','On this page');toc.append(el('strong','','On this page'));
    document.querySelectorAll('#questions .topic').forEach((section,i)=>{section.id='reader-topic-'+i;const a=el('a','',section.querySelector('h2').textContent);a.href='#'+section.id;toc.append(a);});
    const back=el('a','reader-back','← All chapters');back.href=url('phase',{phase:current.phase,chapter:current.id});toc.append(back);document.body.append(toc);
    return;
  }
  document.querySelectorAll('.hero,.page-tools').forEach(n=>n.remove());
  main=document.querySelector('main')||el('main');main.className='recall-main';main.id='study-content';main.tabIndex=-1;if(!main.parentNode)document.body.append(main);
  const pageHeading=(title,description)=>`<div class="page-heading"><h1>${esc(title)}</h1><p>${esc(description)}</p></div>`;
  const placeholder=()=>el('p','coming-placeholder','Learning material for this section is being prepared.');
  function notes(lines,hasPoints=false){
    const block=el('div','roadmap-notes');let code=null;
    for(const line of lines){
      if(/^```/.test(line)){if(code){block.append(code);code=null;}else code=el('pre');continue;}
      if(code){code.textContent+=line+'\n';continue;}
      if(!line.trim() || /^\|/.test(line) || (hasPoints&&/^\s*(?:-|\d+\.) /.test(line)))continue;
      const p=el('p');p.innerHTML=esc(line.replace(/^\s*- /,'')).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');block.append(p);
    }if(code)block.append(code);return block;
  }
  function roadmapRow(p){
    const qs=questions.filter(q=>q.phase===p.id),available=sheets.filter(s=>s.phase===p.id).length;
    const row=el('a','phase-row phase-page-link');row.id='phase-'+p.id;row.href=url('phase',{phase:p.id});
    const summary=el('div','phase-link-content');summary.innerHTML=`<span class="phase-number">${p.id==='capstone'?'C':p.id}</span><strong>${esc(phaseName(p))} — ${esc(p.title)}</strong><span class="phase-count">${available} chapters <span>·</span> ${qs.length} questions${qs.length&&countDone(qs)?` · ${percent(qs)}%`:''}</span>${badge(qs.length)}<span class="chevron">${icon('chevron')}</span>`;
    row.append(summary);return row;
  }
  function phaseChapters(p){
    const body=el('div','phase-chapter-list');
      for(const c of p.chapters){const cq=questions.filter(q=>q.chapterId===c.id);const chapterDetail=el('details','chapter-row-detail');chapterDetail.id='chapter-'+c.id;
        const s=el('summary');s.innerHTML=`<strong>${esc(c.title)}</strong><span class="chapter-count">${cq.length?`${cq.length} questions · ${percent(cq)}% reviewed`:''}</span>${badge(cq.length)}<span class="chevron">${icon('chevron')}</span>`;chapterDetail.append(s);
        const content=el('div','chapter-topics');
        if(cq.length){const a=el('a','primary-button',`Open learning sheet ${c.id} →`);a.href=sheetURL(sheets.find(s=>s.id===c.id));content.append(a);}else content.append(placeholder());
        if(c.lines.filter(l=>l.trim()).length)content.append(notes(c.lines,c.topics.length>0));
        for(const t of c.topics)content.append(topicRow(c,t));
        if(c.supplements?.length){content.append(el('p','mapping-note','Additional sheet material · topic mapping needs review'));for(const t of c.supplements)content.append(topicRow(c,t));}
        chapterDetail.append(content);body.append(chapterDetail);
      }return body;
  }
  function phasePage(params){
    const p=data.phases.find(p=>String(p.id)===params.get('phase'));
    if(!p){main.innerHTML=pageHeading('Phase not found','Choose a phase from the AI Engineering Roadmap.');const a=el('a','primary-button','Back to roadmap');a.href=url('roadmap');main.append(a);return;}
    document.title=`${phaseName(p)} — ${p.title} | Recall`;
    const qs=questions.filter(q=>q.phase===p.id),available=sheets.filter(s=>s.phase===p.id),done=countDone(qs);
    const trail=el('nav','phase-breadcrumb');trail.setAttribute('aria-label','Breadcrumb');trail.innerHTML=`<a href="${url('roadmap')}">← All phases</a><span>/</span><span aria-current="page">${esc(phaseName(p))}</span>`;
    main.append(trail);
    const hero=el('section','phase-page-hero');hero.innerHTML=`<div class="phase-page-eyebrow"><span>${esc(phaseName(p).toUpperCase())}</span>${badge(qs.length)}</div><h1>${esc(p.title)}</h1><p>${esc(p.goal||'Explore the topics and learning points in this part of your AI engineering journey.')}</p><div class="phase-page-metrics"><span><strong>${p.chapters.length}</strong> roadmap sections</span><span><strong>${available.length}</strong> available sheets</span><span><strong>${qs.length}</strong> questions</span></div>`;main.append(hero);
    const layout=el('div','phase-page-layout'),chaptersPanel=el('section','phase-chapters-panel');chaptersPanel.innerHTML=`<div class="phase-section-title"><h2>${p.id===0?'Orientation sections':'Chapters & topics'}</h2><span>${p.chapters.length} sections</span></div>`;
    if(!qs.length)chaptersPanel.append(placeholder());chaptersPanel.append(phaseChapters(p));
    const aside=el('aside','phase-learning-panel');aside.setAttribute('aria-label','Phase progress and navigation');
    const progress=el('section','phase-progress-panel');progress.innerHTML='<h2>Your progress</h2>';
    if(qs.length){progress.innerHTML+=`<strong class="phase-progress-value">${percent(qs)}%</strong><progress max="${qs.length}" value="${done}" aria-label="Phase questions reviewed"></progress><p>${done} of ${qs.length} questions reviewed</p>`;
      let saved=load('recall.position.v1',{});const resume=available.find(s=>s.id===saved.chapterId)||available[0],question=questions.find(q=>q.chapterId===resume.id&&q.id===saved.questionId);
      const start=el('a','primary-button',question?'Continue learning →':'Start learning →');start.href=question?questionURL(question):sheetURL(resume);progress.append(start);
    }else progress.append(el('p','','Learning material for this phase is being prepared. Explore the chapter outlines below.'));
    aside.append(progress);
    const order=el('section','phase-order-panel');order.innerHTML='<h2>In this phase</h2>';
    for(const c of p.chapters){const a=el('a','',c.title);a.href='#chapter-'+c.id;a.addEventListener('click',()=>{const target=document.getElementById('chapter-'+c.id);if(target)target.open=true;});order.append(a);}aside.append(order);
    const idx=data.phases.indexOf(p),next=data.phases[idx+1];if(next){const a=el('a','phase-next-link');a.href=url('phase',{phase:next.id});a.innerHTML=`<small>Up next · ${esc(phaseName(next))}</small><strong>${esc(next.title)} →</strong>`;aside.append(a);}
    layout.append(chaptersPanel,aside);main.append(layout);
    const chapter=params.get('chapter');if(chapter){const target=document.getElementById('chapter-'+chapter);if(target)target.open=true;}
    const topic=params.get('topic');if(topic){const target=document.getElementById('topic-'+topic);if(target){for(let node=target;node&&node!==main;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;target.scrollIntoView({block:'center'});}}
  }
  function topicRow(c,t){
    const tq=nodeQuestions(c,t);const detail=el('details','topic-row');detail.id='topic-'+t.id;
    const s=el('summary');s.innerHTML=`<span>${esc(t.title)}</span><small>${tq.length?`${tq.length} questions · ${percent(tq)}%`:''}</small>${badge(tq.length)}`;detail.append(s);
    const body=el('div','topic-body');
    if(t.lines.length)body.append(notes(t.lines,t.points.length>0));
    if(!tq.length)body.append(placeholder());
    for(const q of questions.filter(q=>q.topicId===t.id)){const a=el('a','topic-question',q.text);a.href=questionURL(q);body.append(a);}
    for(const point of t.points)body.append(topicRow(c,point));
    detail.append(body);return detail;
  }
  function overview(){
    const done=countDone(questions),pct=percent(questions);
    let position=load('recall.position.v1',{}),last;try{last=localStorage.getItem('recall.last-chapter');}catch{}
    const resume=sheets.find(s=>s.id===(position.chapterId||last))||sheets[0];
    const q=questions.find(q=>q.chapterId===resume.id&&q.id===position.questionId);const p=data.phases.find(p=>p.id===resume.phase);
    main.innerHTML=`<section class="dashboard-intro"><p class="greeting">Good to see you back, Jatin <span aria-hidden="true">👋</span></p><h1>Continue your AI Engineering journey.</h1><p>Learn, revise and build expertise across the complete AI engineering roadmap.</p></section>
      <section class="stats-row" aria-label="Learning statistics">${[['book',questions.length,'Questions'],['roadmap',sheets.length,'Chapters'],['check',done,'Reviewed'],['chart',pct+'%','Overall Progress']].map(([i,n,label])=>`<div class="stat">${icon(i)}<span><strong>${n}</strong><small>${label}</small></span></div>`).join('')}</section>
      <section class="dashboard-cards"><article class="progress-card"><h2>Your Progress</h2><div class="progress-line"><progress max="${questions.length}" value="${done}" aria-label="Overall progress"></progress><span>${pct}%</span></div><p>${done} of ${questions.length} questions reviewed</p></article><article class="continue-card"><div><p>Continue Learning</p><h2>${esc(resume.id+' '+resume.title)}</h2><p class="resume-phase">Phase ${p.id} · ${esc(p.title)}</p><a class="primary-button" href="${esc(q?questionURL(q):sheetURL(resume))}">Resume ${icon('arrow')}</a></div><svg class="contours" viewBox="0 0 260 150" fill="none" aria-hidden="true"><path d="M0 150c35-65 50 3 80-57s45 20 80-45 60-30 100-12M20 165c35-65 50 3 80-57s45 20 80-45 60-30 100-12M40 180c35-65 50 3 80-57s45 20 80-45 60-30 100-12" stroke="currentColor"/></svg></article></section>
      <section class="personal-dashboard-grid" aria-label="Your learning and personal collections"><article class="workspace-card roadmap-preview"><div class="workspace-card-heading"><span class="workspace-card-icon">${icon('roadmap')}</span><span class="workspace-eyebrow">YOUR LEARNING PATH</span></div><div class="section-heading"><div><h2>AI Engineering Roadmap</h2><p>From fundamentals to production-ready AI systems.</p></div></div><div id="roadmap-preview-list"></div><footer class="workspace-card-footer"><span>${data.phases.length-1} phases + Capstone</span><a href="${url('roadmap')}">View all ${icon('arrow')}</a></footer></article></section>`;
    for(const p of data.phases.slice(0,5)){
      const row=el('a','compact-phase');row.href=url('phase',{phase:p.id});
      const count=questions.filter(q=>q.phase===p.id).length;
      row.innerHTML=`<span class="phase-number">${p.id}</span><strong>${esc(phaseName(p)+' — '+p.title)}</strong><span class="phase-dot ${count?'has-content':''}" role="img" aria-label="${count?'Available':'Coming Soon'}"></span><span class="chevron">${icon('chevron')}</span>`;
      main.querySelector('#roadmap-preview-list').append(row);
    }
    for(const category of Object.keys(notebookTypes))main.querySelector('.personal-dashboard-grid').append(notebookCard(category));
  }
  function notebookCard(category){
    const config=notebookTypes[category],items=notebookItems(category),card=el('article','workspace-card');
    card.dataset.collection=category;
    card.innerHTML=`<div class="workspace-card-heading"><span class="workspace-card-icon">${icon(category)}</span><span class="workspace-eyebrow">${category==='resources'?'SAVE NOW, EXPLORE LATER':category==='interviews'?'PREPARE WITH REAL EXPERIENCES':'YOUR IDEAS & NEXT STEPS'}</span><a class="workspace-add" href="${url(category,{new:'1'})}" aria-label="Add to ${config.title}">+ Add</a></div><div class="section-heading"><div><h2>${config.title}</h2><p>${esc(config.description)}</p></div></div>`;
    const preview=el('div','notebook-preview');
    if(!items.length){const empty=el('div','notebook-card-empty');empty.innerHTML=`${icon(category)}<strong>${category==='resources'?'A good find deserves a place.':category==='interviews'?'Your next interview starts here.':'A little less to keep in your head.'}</strong><p>${esc(config.hint)}</p><a href="${url(category,{new:'1'})}">+ Add your first ${category==='resources'?'resource':category==='interviews'?'interview note':'note'}</a>`;preview.append(empty);}
    for(const item of items.slice(0,3)){
      const link=el('a','notebook-preview-item');link.href=url(category,{item:item.id});link.innerHTML=`<span><strong>${esc(item.title)}</strong><small>${esc(item.source||item.type||'Personal note')}${item.notes?' · Has notes':''}</small></span><span class="notebook-status">${esc(config.statuses.includes(item.status)?item.status:config.statuses[0])}</span>`;preview.append(link);
    }
    const footer=el('footer','workspace-card-footer');footer.innerHTML=`<span>${items.length} saved ${items.length===1?'item':'items'}</span><a href="${url(category)}">View all ${icon('arrow')}</a>`;
    card.append(preview,footer);
    if(category==='resources'){const heading=card.querySelector('.section-heading h2'),a=el('a','resource-card-title',config.title);a.href=url(category);heading.replaceChildren(a);}
    return card;
  }
  function notebookPage(category,params){
    const config=notebookTypes[category];
    main.innerHTML=pageHeading(config.title,config.description);
    const toolbar=el('div','notebook-toolbar');
    const search=el('input');search.type='search';search.placeholder='Search titles, details, or notes...';search.setAttribute('aria-label','Search saved items');
    const filter=el('select');filter.setAttribute('aria-label','Filter saved items by status');
    for(const text of ['All statuses',...config.statuses]){const option=el('option','',text);option.value=text==='All statuses'?'':text;filter.append(option);}
    const add=el('a','primary-button','+ Add item');add.href=url(category,{new:'1'});
    const exportButton=el('button','notebook-secondary','Export notes');exportButton.type='button';
    exportButton.onclick=()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),items:notebookItems()},null,2)],{type:'application/json'});const blobURL=URL.createObjectURL(blob);const link=el('a');link.href=blobURL;link.download='recall-personal-notes.json';link.click();setTimeout(()=>URL.revokeObjectURL(blobURL),1000);};
    toolbar.append(search,filter,exportButton,add);main.append(toolbar,el('p','notebook-storage-note','Saved in this browser. Export your notes to keep a backup.'));
    const layout=el('div','notebook-layout'),listPane=el('section','notebook-list-pane'),listTitle=el('h2','', 'Your saved items'),count=el('p','notebook-list-count'),list=el('div','notebook-list'),editor=el('section','notebook-editor');
    listPane.setAttribute('aria-label','Saved items');listPane.append(listTitle,count,list);layout.append(listPane,editor);main.append(layout);
    let activeId=null;
    function drawList(){
      const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean),items=notebookItems(category).filter(item=>(!filter.value||item.status===filter.value)&&terms.every(term=>[item.title,item.content,item.notes,item.source,item.type].join(' ').toLowerCase().includes(term)));
      count.textContent=`${items.length} ${items.length===1?'item':'items'}`;list.replaceChildren();
      if(!items.length)list.append(el('p','notebook-list-empty',notebookItems(category).length?'No items match your search.':'Nothing saved yet. Add a link, question, or idea and make it your own.'));
      for(const item of items){const a=el('a','notebook-list-item');a.href=url(category,{item:item.id,...(category==='resources'?{edit:'1'}:{})});if(item.id===activeId)a.setAttribute('aria-current','true');a.innerHTML=`<small>${esc(item.source||item.type||'Personal note')}</small><strong>${esc(item.title)}</strong><span>${esc(item.status||config.statuses[0])}${item.notes?' · Has notes':''}</span>`;list.append(a);}
    }
    function edit(item,isNew=false){
      activeId=isNew?null:item.id;drawList();editor.replaceChildren();
      const draftId=category+':'+(activeId||'new');
      const storedDraft=notebookDrafts[draftId]||notebookDrafts[category],draftMatches=storedDraft&&storedDraft.itemId===(activeId||'new');
      const value=draftMatches?{...item,...storedDraft.values}:item;
      const form=el('form','notebook-form');form.innerHTML=`<div class="notebook-editor-heading"><div><p class="workspace-eyebrow">${isNew?'CAPTURE SOMETHING NEW':'YOUR PERSONAL COLLECTION'}</p><h2>${isNew?'Add an item':'Edit item'}</h2></div><span class="draft-state" role="status">${draftMatches?'Draft restored':''}</span></div><div class="notebook-edit-columns"><div class="notebook-detail-fields"></div><div class="personal-note-panel"><h3>My notes</h3><p>Your takeaways, thoughts, or what you want to do next.</p></div></div>`;
      const fields=form.querySelector('.notebook-detail-fields'),notePanel=form.querySelector('.personal-note-panel'),controls={};
      function field(key,label,tag='input',options){
        const wrap=el('label','notebook-field',label),input=el(tag);input.name=key;input.id='notebook-'+key;input.setAttribute('aria-label',label);
        if(tag==='select')for(const text of options){const o=el('option','',text);o.value=text;input.append(o);}
        input.value=typeof value[key]==='string'?value[key]:(options?.[0]||'');controls[key]=input;wrap.append(input);(key==='notes'?notePanel:fields).append(wrap);return input;
      }
      const title=field('title','Title');title.required=true;title.maxLength=200;title.placeholder=config.example;
      const source=field('source','Source / company (optional)');source.placeholder=category==='interviews'?'Company, role, or person who shared it':'X, Instagram, LinkedIn, or a website';source.maxLength=200;
      const link=field('url','Source link (optional)');link.type='url';link.placeholder='https://...';link.addEventListener('input',()=>link.setCustomValidity(''));
      field('type','Type','select',config.types);field('status','Status','select',config.statuses);
      const content=field('content',config.detail,'textarea');content.rows=6;content.placeholder=category==='interviews'?'Paste the question, describe the interview rounds, or capture someone’s experience...':'Capture the idea, context, or what you want to do...';
      const personal=field('notes','Personal notes','textarea');personal.rows=15;personal.placeholder='Write your own notes here...';
      if(Array.isArray(item.resourceTable)&&item.resourceTable.length){
        form.classList.add('has-resource-table');
        const tableSection=el('section','shared-resource-section');tableSection.setAttribute('aria-label','Resources shared in the post');
        tableSection.innerHTML='<h3>Resources shared by Shirin</h3><div class="shared-resource-table-wrap"><table class="shared-resource-table"><caption>Interview practice topics and the resource links shared in the post</caption><thead><tr><th scope="col">Main info</th><th scope="col">Link</th></tr></thead><tbody></tbody></table></div>';
        for(const resource of item.resourceTable){if(!resource||typeof resource.info!=='string'||!externalURL(resource.url))continue;const row=el('tr'),info=el('td'),linkCell=el('td');info.append(el('small','',resource.group||''),el('span','',resource.info));const a=el('a','',new URL(resource.url).host+new URL(resource.url).pathname+' ↗');a.href=externalURL(resource.url);a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Open resource: '+resource.info);linkCell.append(a);row.append(info,linkCell);tableSection.querySelector('tbody').append(row);}
        const foldout=el('details','resource-item-details'),summary=el('summary','','Edit item details');foldout.append(summary);
        while(fields.firstChild)foldout.append(fields.firstChild);fields.append(tableSection,foldout);
      }
      const actions=el('div','notebook-form-actions'),submit=el('button','primary-button','Save item');submit.type='submit';
      const cancel=el('a','notebook-secondary','Back to overview');cancel.href=url('overview');actions.append(submit,cancel);
      if(!isNew){const remove=el('button','notebook-delete','Delete item');remove.type='button';remove.onclick=()=>{
        const removed=notebookEntries[item.id];notebookEntries={...load(notebookKey,notebookEntries)};delete notebookEntries[item.id];save(notebookKey,notebookEntries);notebookDrafts={...load(draftKey,notebookDrafts)};delete notebookDrafts[draftId];delete notebookDrafts[category];save(draftKey,notebookDrafts);
        editor.replaceChildren();activeId=null;drawList();const notice=el('div','notebook-deleted','Item deleted. '),undo=el('button','notebook-secondary','Undo');undo.type='button';undo.onclick=()=>{if(removed){notebookEntries={...load(notebookKey,notebookEntries),[removed.id]:removed};save(notebookKey,notebookEntries);edit(removed);}};notice.append(undo);editor.append(notice);announce.textContent='Item deleted. Undo is available.';
      };actions.append(remove);}
      form.append(actions);editor.append(form);
      const draftState=form.querySelector('.draft-state');
      form.addEventListener('input',()=>{const values=Object.fromEntries(Object.entries(controls).map(([key,input])=>[key,input.value]));notebookDrafts={...load(draftKey,notebookDrafts),[draftId]:{itemId:activeId||'new',values}};try{localStorage.setItem(draftKey,JSON.stringify(notebookDrafts));draftState.textContent='Draft saved';}catch{draftState.textContent='Draft kept for this visit';}});
      form.onsubmit=event=>{
        event.preventDefault();title.value=title.value.trim();if(!title.value){title.setCustomValidity('Give this item a title.');title.reportValidity();return;}title.setCustomValidity('');
        if(link.value&&!externalURL(link.value)){link.setCustomValidity('Use an http:// or https:// link.');link.reportValidity();return;}
        const now=new Date().toISOString(),id=item.id||((typeof crypto.randomUUID==='function')?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
        const entry={id,category,createdAt:item.createdAt||now,updatedAt:now,...Object.fromEntries(Object.entries(controls).map(([key,input])=>[key,input.value]))};
        if(Array.isArray(item.resourceTable))entry.resourceTable=item.resourceTable;
        if(entry.url)entry.url=externalURL(entry.url);
        notebookEntries={...load(notebookKey,notebookEntries),[id]:entry};let persisted=true;try{localStorage.setItem(notebookKey,JSON.stringify(notebookEntries));}catch{persisted=false;}
        notebookDrafts={...load(draftKey,notebookDrafts)};delete notebookDrafts[draftId];delete notebookDrafts[category];save(draftKey,notebookDrafts);history.replaceState({},'',url(category,{item:id,...(category==='resources'?{edit:'1'}:{})}));edit(entry);editor.querySelector('.draft-state').textContent=persisted?'Saved':'Saved for this visit · browser storage unavailable';announce.textContent=persisted?'Item and personal notes saved.':'Item saved for this visit. Browser storage is unavailable.';
      };
      title.addEventListener('input',()=>title.setCustomValidity(''));
      if(!isNew&&externalURL(value.url)){const open=el('a','notebook-source-link','Open source ↗');open.href=externalURL(value.url);open.target='_blank';open.rel='noopener noreferrer';form.querySelector('.notebook-editor-heading').append(open);}
    }
    const items=notebookItems(category),requested=items.find(item=>item.id===params.get('item'));
    if(params.has('new'))edit({},true);else if(requested)edit(requested);else if(notebookDrafts[category+':new']||notebookDrafts[category]?.itemId==='new')edit({},true);else if(items.length)edit(items[0]);else edit({},true);
    search.oninput=drawList;filter.onchange=drawList;
  }
  function resourcesPage(params){
    const items=notebookItems('resources'),selected=items.find(item=>item.id===params.get('item'))||(items.length===1?items[0]:null);
    main.classList.add('resources-table-page');
    const back=el('a','resources-back','← Back to overview');back.href=url('overview');main.append(back);
    const heading=el('div','resources-page-heading');heading.innerHTML=pageHeading(selected?selected.title:'Saved Resources','Explore your saved resources. Main information on the left, original links on the right.');
    const actions=el('div','resources-page-actions');const add=el('a','primary-button','+ Add resource');add.href=url('resources',{new:'1'});actions.append(add);
    if(selected){const edit=el('a','notebook-secondary','Edit item');edit.href=url('resources',{item:selected.id,edit:'1'});actions.append(edit);const notes=el('button','notebook-secondary','My notes');notes.type='button';notes.setAttribute('aria-expanded','false');notes.setAttribute('aria-controls','resource-personal-notes');notes.onclick=()=>{const panel=document.getElementById('resource-personal-notes');panel.hidden=!panel.hidden;notes.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)panel.querySelector('textarea').focus();};actions.append(notes);}
    if(!selected&&items.length){const manage=el('a','notebook-secondary','Manage items');manage.href=url('resources',{edit:'1'});actions.append(manage);}
    heading.append(actions);main.append(heading);
    const search=el('input','resources-table-search');search.type='search';search.placeholder='Search resources or topics...';search.setAttribute('aria-label','Search resource table');main.append(search);
    if(selected&&externalURL(selected.url)){const source=el('a','resources-original-source','Open original post / source ↗');source.href=externalURL(selected.url);source.target='_blank';source.rel='noopener noreferrer';main.append(source);}
    const wrap=el('div','resources-simple-table-wrap');wrap.innerHTML='<table class="resources-simple-table"><caption class="sr-only">Saved resources with main information and original links</caption><thead><tr><th scope="col">Main info</th><th scope="col">Link</th></tr></thead><tbody></tbody></table>';main.append(wrap);const count=el('p','resources-table-count');count.setAttribute('role','status');main.append(count);
    const entries=(selected?[selected]:items).flatMap(item=>Array.isArray(item.resourceTable)&&item.resourceTable.length?item.resourceTable.filter(row=>row&&typeof row.info==='string').map(row=>({...row,item})): [{group:item.source||item.type||'Saved resource',info:item.title,url:item.url,item}]);
    const draw=()=>{const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean),found=entries.filter(row=>terms.every(term=>[row.info,row.group,row.item.title,row.url].join(' ').toLowerCase().includes(term)));const body=wrap.querySelector('tbody');body.replaceChildren();
      for(const resource of found){const row=el('tr'),info=el('td'),linkCell=el('td');info.append(el('small','',resource.group||''),el('p','',resource.info));if(!Array.isArray(resource.item.resourceTable)){const view=el('a','resource-view-notes','View details & notes');view.href=url('resources',{item:resource.item.id});info.append(view);}if(externalURL(resource.url)){const a=el('a','resource-table-link',new URL(resource.url).host+new URL(resource.url).pathname+' ↗');a.href=externalURL(resource.url);a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Open resource: '+resource.info);linkCell.append(a);}else linkCell.append(el('span','resources-no-link','No source link added'));row.append(info,linkCell);body.append(row);}
      if(!found.length){const row=el('tr'),cell=el('td','resources-empty',items.length?'No resources match your search.':'No resources yet. Add your first resource to keep it here.');cell.colSpan=2;row.append(cell);body.append(row);}count.textContent=`${found.length} ${found.length===1?'resource':'resources'}`;
    };search.oninput=draw;draw();
    if(selected){const panel=el('form','resource-personal-notes');panel.id='resource-personal-notes';panel.hidden=true;const label=el('label','','My notes'),textarea=el('textarea');textarea.id='resource-notes-text';textarea.rows=6;textarea.value=selected.notes||'';label.htmlFor=textarea.id;const saveButton=el('button','primary-button','Save notes');saveButton.type='submit';const state=el('p','resources-note-state');state.setAttribute('role','status');panel.append(label,textarea,saveButton,state);panel.onsubmit=e=>{e.preventDefault();notebookEntries={...load(notebookKey,notebookEntries)};const existing=notebookEntries[selected.id];if(!existing){state.textContent='This resource was deleted. Return to Saved Resources to choose another.';return;}notebookEntries[selected.id]={...existing,notes:textarea.value,updatedAt:new Date().toISOString()};try{localStorage.setItem(notebookKey,JSON.stringify(notebookEntries));state.textContent='Notes saved.';}catch{state.textContent='Notes kept for this visit. Browser storage is unavailable.';}};main.append(panel);}
  }
  function roadmap(params){
    if(params.has('phase')){phasePage(params);return;}
    main.innerHTML=pageHeading('AI Engineering Roadmap','Your complete learning path, from first principles to production. Explore one phase at a time.')+`<p class="roadmap-meta">${data.phases.length-1} phases + Capstone <span>·</span> ${sheets.length} learning sheets <span>·</span> ${questions.length} questions</p>`;
    const list=el('div','full-roadmap');for(const p of data.phases)list.append(roadmapRow(p));main.append(list);
    const source=el('a','roadmap-source','Roadmap source · Ultimate AI Engineer Roadmap 2026 ↗');source.href=data.source;source.target='_blank';source.rel='noopener noreferrer';main.append(source);
  }
  function collection(view){
    const titles={questions:['Question Bank','Every question, in one place. Find a concept and keep learning.'],revision:['Revision','A little recall goes a long way. Revisit questions you haven’t reviewed.'],bookmarks:['Bookmarks','Your saved questions, ready whenever you need them.']};
    main.innerHTML=pageHeading(...titles[view]);
    const filters=el('form','collection-filters');filters.onsubmit=e=>e.preventDefault();
    const text=el('input');text.type='search';text.placeholder='Search these questions...';text.setAttribute('aria-label','Search these questions');
    const select=(label,options)=>{const wrap=el('label','filter-field',label),s=el('select');s.setAttribute('aria-label',label);for(const [value,title]of options){const o=el('option','',title);o.value=value;s.append(o);}wrap.append(s);filters.append(wrap);return s;};
    filters.append(text);
    const phase=select('Phase',[['','All phases'],...data.phases.filter(p=>questions.some(q=>q.phase===p.id)).map(p=>[p.id,phaseName(p)+' · '+p.title])]);
    const chapter=select('Chapter',[['','All chapters']]);const topic=select('Topic',[['','All topics']]);
    const review=select('Review state',[['','All questions'],['todo','Not reviewed'],['done','Reviewed']]);if(view==='revision')review.closest('label').hidden=true;
    const count=el('p','collection-count');count.setAttribute('role','status');const list=el('div','question-list');const more=el('button','load-more','Show more questions');more.type='button';let limit=60;
    const options=(select,values,label)=>{select.replaceChildren();for(const [v,title]of [['',label],...values]){const o=el('option','',title);o.value=v;select.append(o);}};
    function draw(){
      const terms=text.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const found=questions.filter(q=>(view!=='revision'||reviewed[q.key]!==true)&&(view!=='bookmarks'||bookmarks[q.key])&&(!phase.value||String(q.phase)===phase.value)&&(!chapter.value||q.chapterId===chapter.value)&&(!topic.value||q.topicId===topic.value)&&(!review.value||(review.value==='done')===(reviewed[q.key]===true))&&terms.every(t=>(q.text+' '+q.sourceTopic).toLowerCase().includes(t)));
      count.textContent=`${found.length} ${view==='revision'?'questions to review':'questions'}${found.length>limit?` · showing ${limit}`:''}`;list.replaceChildren();
      if(!found.length)list.append(el('p','empty-state',view==='bookmarks'?'No saved questions match. Bookmark a question while reading to keep it here.':view==='revision'&&!questions.some(q=>reviewed[q.key]!==true)?'You’re all caught up. Every question has been reviewed.':'No questions match your filters. Try a broader search.'));
      for(const q of found.slice(0,limit)){
        const card=el('article','question-result');const link=el('a');link.href=questionURL(q);link.innerHTML=`<small>Phase ${q.phase} <span>·</span> ${esc(q.chapterId+' '+sheets.find(s=>s.id===q.chapterId).title)} <span>·</span> ${esc(q.sourceTopic)}</small><h2>${esc(q.text)}</h2>`;
        const controls=el('div','question-result-actions');const r=el('button','',reviewed[q.key]?'Reviewed':'Mark as reviewed');r.type='button';r.setAttribute('aria-pressed',String(reviewed[q.key]===true));r.onclick=()=>{if(reviewed[q.key])delete reviewed[q.key];else reviewed[q.key]=true;save('recall.reviewed.v1',reviewed);draw();};
        const b=el('button','',bookmarks[q.key]?'Remove bookmark':'Bookmark');b.type='button';b.setAttribute('aria-pressed',String(Boolean(bookmarks[q.key])));b.onclick=()=>{if(bookmarks[q.key])delete bookmarks[q.key];else bookmarks[q.key]=true;save('recall.bookmarks.v1',bookmarks);draw();};controls.append(r,b);card.append(link,controls);list.append(card);
      }more.hidden=found.length<=limit;
    }
    phase.onchange=()=>{options(chapter,sheets.filter(s=>!phase.value||String(s.phase)===phase.value).map(s=>[s.id,s.id+' '+s.title]),'All chapters');options(topic,[],'All topics');limit=60;draw();};phase.onchange();
    chapter.onchange=()=>{const qs=questions.filter(q=>(!chapter.value||q.chapterId===chapter.value)&&(!phase.value||String(q.phase)===phase.value));const seen=new Map(qs.map(q=>[q.topicId,q.sourceTopic]));options(topic,[...seen],'All topics');limit=60;draw();};chapter.onchange();
    for(const control of [text,topic,review])control.addEventListener('input',()=>{limit=60;draw();});more.onclick=()=>{limit+=60;draw();};main.append(filters,count,list,more);draw();
  }
  function projectPage(params){
    main.innerHTML=pageHeading('Build what you learn.','Practical projects from the roadmap. Start small, then work toward your production AI system.');
    for(const p of data.phases){if(!p.projects.length&&p.id!=='capstone')continue;
      const section=el('section','project-phase');section.innerHTML=`<h2>${esc(phaseName(p)+' — '+p.title)}</h2>`;
      const grid=el('div','project-grid');
      const items=p.id==='capstone'?[{id:'capstone',difficulty:'Capstone',title:p.chapters[0].title,lines:p.chapters[0].lines.concat(p.chapters[0].topics.flatMap(t=>[t.title,...t.lines]))}]:p.projects;
      for(const project of items){const card=el('article','project-card');card.id='project-'+project.id;
        card.innerHTML=`<span class="difficulty ${project.difficulty.toLowerCase()}">${esc(project.difficulty)}</span><h3>${esc(project.title)}</h3>`;
        const description=el('div','project-description');for(const line of project.lines.filter(l=>l.trim()&&l!=='---'))description.append(el('p','',line.replace(/^- /,'').replace(/\*\*/g,'').replace(/`/g,'')));card.append(description);
        const label=el('label','project-status','Project status');const s=el('select');s.setAttribute('aria-label','Status for '+project.title);for(const [v,t]of [['todo','Not started'],['active','In progress'],['done','Completed']]){const o=el('option','',t);o.value=v;s.append(o);}s.value=projects[project.id]||'todo';s.onchange=()=>{projects[project.id]=s.value;save('recall.projects.v1',projects);announce.textContent=project.title+': '+s.selectedOptions[0].textContent;};label.append(s);card.append(label);grid.append(card);
      }section.append(grid);main.append(section);
    }if(params.get('project'))document.getElementById('project-'+params.get('project'))?.scrollIntoView({block:'center'});
  }
  function render(){const params=new URL(location.href).searchParams;let view=params.get('page');if(!view)view=document.body.dataset.page||(document.body.dataset.phase?'roadmap':'overview');if(view!=='phase'&&!navItems.some(([k])=>k===view))view='overview';updateNav(view==='phase'?'roadmap':view);main.replaceChildren();main.classList.remove('resources-table-page');document.title=(view==='phase'?'Phase':navItems.find(([k])=>k===view)[1])+' | Recall';
    if(view==='phase')phasePage(params);else if(view==='overview')overview();else if(view==='roadmap'){if(!params.has('phase')&&document.body.dataset.phase)params.set('phase',document.body.dataset.phase);roadmap(params);}else if(view==='projects')projectPage(params);else if(view==='resources'&&!params.has('new')&&!params.has('edit'))resourcesPage(params);else if(notebookTypes[view])notebookPage(view,params);else collection(view);
  }
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const dest=new URL(a.href);if(dest.origin===home.origin&&dest.pathname===home.pathname&&dest.searchParams.has('page')){e.preventDefault();history.pushState({},'',dest);closeDrawer();results.hidden=true;render();if(!dest.searchParams.has('topic')&&!dest.searchParams.has('project'))window.scrollTo(0,0);main.focus({preventScroll:true});}});
  window.addEventListener('popstate',render);
  window.addEventListener('storage',e=>{if(e.key===notebookKey){notebookEntries=load(notebookKey,{});if(!Object.keys(notebookTypes).includes(new URL(location.href).searchParams.get('page')))render();return;}if(e.key===null||['recall.reviewed.v1','recall.bookmarks.v1','recall.projects.v1'].includes(e.key)){reviewed=load('recall.reviewed.v1',{});bookmarks=load('recall.bookmarks.v1',{});projects=load('recall.projects.v1',{});if(e.key===null){notebookEntries=load(notebookKey,{});notebookDrafts=load(draftKey,{});}render();}});
  render();
})();
