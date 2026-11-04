// Runs in the document head so a saved theme is applied before content paints.
(() => {
  'use strict';
  // Preserve saved progress when the first four neural-network questions are reorganized.
  try {
    const migrationKey='recall.neuron-questions.v1';
    if(!localStorage.getItem(migrationKey)) {
      const oldTitles=['What are a neuron, a perceptron, and a multilayer perceptron (MLP)?','What is an artificial neuron?','What is a perceptron?','What is an MLP, and what do hidden layers do?'];
      const newTitles=['What is the difference between an artificial neuron, a perceptron, and an MLP?',oldTitles[1],oldTitles[2],'What is a multilayer perceptron (MLP)?'];
      const hash=text=>{let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return(h>>>0).toString(36);};
      for(const storageKey of ['recall.reviewed.v1','recall.bookmarks.v1']) {
        const raw=localStorage.getItem(storageKey);if(!raw)continue;const values=JSON.parse(raw);
        if(!values||typeof values!=='object'||Array.isArray(values))continue;
        oldTitles.forEach((title,i)=>{const oldKey='4.1:'+hash(title),newKey='4.1:'+hash(newTitles[i]);if(values[oldKey]===true){values[newKey]=true;if(oldKey!==newKey)delete values[oldKey];}});
        localStorage.setItem(storageKey,JSON.stringify(values));
      }
      const position=JSON.parse(localStorage.getItem('recall.position.v1')||'null');
      if(position?.chapterId==='4.1') {
        const index=position.question?oldTitles.indexOf(position.question):['question-01','question-02','question-03','question-04'].indexOf(position.questionId);
        if(index>=0){position.questionId=['question-04','question-01','question-02','question-03'][index];position.question=newTitles[index];localStorage.setItem('recall.position.v1',JSON.stringify(position));}
      }
      localStorage.setItem(migrationKey,'done');
    }
  } catch { /* Reading remains available if storage is disabled or malformed. */ }
  // Keep reviews, bookmarks, and resume aligned with the expanded activation notes.
  try {
    if(!localStorage.getItem('recall.activation-questions.v1')) {
      const mapping=[{"oldQuestion":"What are activation functions, and what are the basic differences between Sigmoid, Tanh, ReLU, GELU, and SwiGLU?","newQuestion":"What are activation functions, and why are they needed in neural networks?","oldId":"question-05","newId":"question-05"},{"oldQuestion":"What is the sigmoid activation function?","newQuestion":"What is the Sigmoid activation function, and what are its mathematical properties and limitations?","oldId":"question-06","newId":"question-07"},{"oldQuestion":"What is the tanh activation function?","newQuestion":"What is the Tanh activation function, and how does it differ from Sigmoid?","oldId":"question-07","newId":"question-08"},{"oldQuestion":"What is ReLU?","newQuestion":"What is the ReLU activation function, how does it work, and what is the Dying ReLU problem?","oldId":"question-08","newId":"question-09"},{"oldQuestion":"What is GELU?","newQuestion":"What is GELU, and how does its behaviour differ from ReLU?","oldId":"question-09","newId":"question-10"},{"oldQuestion":"What is SwiGLU?","newQuestion":"What is SwiGLU, and how does its gated mechanism work?","oldId":"question-10","newId":"question-11"}];
      const hash=text=>{let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return(h>>>0).toString(36);};
      for(const storageKey of ['recall.reviewed.v1','recall.bookmarks.v1']) {
        const raw=localStorage.getItem(storageKey);if(!raw)continue;const values=JSON.parse(raw);if(!values||typeof values!=='object'||Array.isArray(values))continue;
        for(const item of mapping){const oldKey='4.1:'+hash(item.oldQuestion),newKey='4.1:'+hash(item.newQuestion);if(values[oldKey]===true){values[newKey]=true;if(oldKey!==newKey)delete values[oldKey];}}
        localStorage.setItem(storageKey,JSON.stringify(values));
      }
      const position=JSON.parse(localStorage.getItem('recall.position.v1')||'null');
      if(position?.chapterId==='4.1') {
        const match=mapping.find(item=>position.question?item.oldQuestion===position.question:item.oldId===position.questionId);
        if(match){position.questionId=match.newId;position.question=match.newQuestion;}
        else {const number=Number(position.questionId?.replace('question-',''));if(number>=11&&number<=20)position.questionId='question-'+String(number+4).padStart(2,'0');}
        localStorage.setItem('recall.position.v1',JSON.stringify(position));
      }
      localStorage.setItem('recall.activation-questions.v1','done');
    }
  } catch { /* Keep learning available when storage is unavailable. */ }
  const key = 'recall.theme.v1';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => value === 'dark' || value === 'light';
  let selected = null;
  try { const stored = localStorage.getItem(key); if (valid(stored)) selected = stored; } catch { /* Use device preference when storage is unavailable. */ }
  const apply = () => {
    document.documentElement.dataset.theme = selected || 'light';
    window.dispatchEvent(new Event('recall:theme'));
  };
  window.RecallTheme = {
    get current() { return document.documentElement.dataset.theme; },
    set(value) {
      if (!valid(value)) return;
      selected = value;
      try { localStorage.setItem(key, value); } catch { /* The selection still works for this visit. */ }
      apply();
    }
  };
  preference.addEventListener('change', () => { if (!selected) apply(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    selected = valid(event.newValue) ? event.newValue : null;
    apply();
  });
  apply();
})();
