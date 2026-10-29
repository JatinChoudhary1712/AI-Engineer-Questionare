const fs = require('fs');
const assert = require('assert');
const crypto = require('crypto');
const root = 'PHASE 5 - Natural Language Processing & Transformers';
const folders = fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()&&/^5\.[1-9] /.test(d.name)).map(d=>d.name).sort();
assert.equal(folders.length,9);
const preserve = {};
for (const phase of ['PHASE 3 - Machine Learning Fundamentals','PHASE 4 - Deep Learning',root]) {
  const walk = dir => { for (const item of fs.readdirSync(dir,{withFileTypes:true})) { const file=dir+'/'+item.name; if(item.isDirectory())walk(file);else if(item.name==='Notes.md'||(phase!==root&&item.name==='script.js'))preserve[file]=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); } };
  walk(phase);
}
fs.writeFileSync('.phase5-preserved.json',JSON.stringify(preserve));
const chapters = folders.map(folder=>({folder,topics:[]}));
const escape = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const point = text => { const i=text.indexOf(':');assert(i>0,text);return `<strong>${escape(text.slice(0,i))}:</strong> ${escape(text.slice(i+1).trim())}`; };
exports.add = (chapter, title, rows) => {
  const questions=rows.trim().split('\n').map(line=>{
    const fields=line.trim().split('|').map(x=>x.trim());
    assert(fields.length===6||fields.length===7,line);
    const [question,intro,a,b,c,remember,formula]=fields;
    return {question,intro,points:[a,b,c],remember,formula};
  });
  chapters[chapter-1].topics.push({title,questions});
};
exports.finish = (extras={}, descriptions={}) => {
  const templatePath='PHASE 4 - Deep Learning/4.1 Neural Network Fundamentals';
  const template=fs.readFileSync(templatePath+'/index.html','utf8');
  const scriptTemplate=fs.readFileSync(templatePath+'/script.js','utf8');
  const renderer=scriptTemplate.slice(scriptTemplate.indexOf('\n];')+3);
  const data={phase:'Phase 5 - Natural Language Processing & Transformers',total_questions:0,questions:[]};
  const newMeta=[];
  for(const [index,chapter] of chapters.entries()) {
    const id=chapter.folder.slice(0,3),title=chapter.folder.slice(4);let number=0;
    const topics=chapter.topics.map((topic,topicIndex)=>({title:topic.title,questions:topic.questions.map((q,questionIndex)=>{
      const x=extras[`${index+1}:${topicIndex+1}:${questionIndex+1}`]||{};
      const tag=x.ordered?'ol':'ul';
      let answer=`<p>${escape(q.intro)}</p><${tag}>${q.points.map(p=>`<li>${point(p)}</li>`).join('')}</${tag}>`;
      if(x.table){const [headers,...rows]=x.table;answer+='<div class="table-wrap"><table><thead><tr>'+headers.map(h=>`<th scope="col">${escape(h)}</th>`).join('')+'</tr></thead><tbody>'+rows.map(r=>`<tr><th scope="row">${escape(r[0])}</th>${r.slice(1).map(c=>`<td>${escape(c)}</td>`).join('')}</tr>`).join('')+'</tbody></table></div>';}
      if(q.formula||x.formula)answer+=`<p class="formula"><strong>Formula:</strong> <code>${escape(x.formula||q.formula)}</code></p>`;
      if(x.example)answer+=`<p class="example"><strong>Example:</strong> ${escape(x.example)}</p>`;
      if(x.code)answer+=`<pre><code class="language-python">${escape(x.code.trim())}</code></pre>`;
      answer+=`<p><strong>Remember:</strong> ${escape(q.remember)}</p>`;
      if(x.refs)answer+='<p>'+x.refs.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`).join(' / ')+'</p>';
      data.questions.push({id:++data.total_questions,number:++number,section:chapter.folder,bullet:topic.title,type:'conceptual',question:q.question,answer});
      return [q.question,answer];
    })}));
    const directory=root+'/'+chapter.folder;
    assert(!fs.existsSync(directory+'/script.js'),'Inspect existing content before replacing it.');
    fs.writeFileSync(directory+'/script.js','const topics = '+JSON.stringify(topics,null,2)+';'+renderer);
    const page=template.replace('Core ML Concepts | Study Questions',`${escape(title)} | Study Questions`)
      .replace(/<title>[^<]+<\/title>/,`<title>${escape(title)} | Study Questions</title>`)
      .replace(/<h1>[\s\S]*?<\/h1>/,`<h1>${escape(title)}<span>.</span></h1>`)
      .replace(/name="description" content="[^"]*"/,`name="description" content="Study ${escape(title)} through beginner-friendly questions, examples, and explanations."`);
    fs.writeFileSync(directory+'/index.html',page);
    newMeta.push({id,phase:5,title,href:(root+'/'+chapter.folder).split('/').map(encodeURIComponent).join('/')+'/index.html',count:number,topics:topics.length,description:descriptions[index+1]||'Build a clear understanding of this NLP topic, one question at a time.'});
    console.log(`${id}: ${topics.length} headings, ${number} answered questions.`);
  }
  assert.equal(new Set(data.questions.map(q=>q.question)).size,data.questions.length,'Duplicate questions');
  fs.writeFileSync(root+'/questions.json',JSON.stringify(data,null,2)+'\n');
  const manifestSource=fs.readFileSync('study-data.js','utf8');
  const manifest=JSON.parse(manifestSource.slice(manifestSource.indexOf('=')+1,manifestSource.lastIndexOf(';')));
  assert(!manifest.some(c=>c.phase===5));manifest.push(...newMeta);
  fs.writeFileSync('study-data.js','// Chapter metadata for the static study interface.\nwindow.STUDY_CHAPTERS = '+JSON.stringify(manifest,null,2)+';\n');
  fs.writeFileSync(root+'/question-styles.css','@import url("../PHASE%203%20-%20Machine%20Learning%20Fundamentals/3.1%20Core%20ML%20Concepts/styles.css");\n');
  fs.writeFileSync(root+'/study-interface.css','@import url("../PHASE%203%20-%20Machine%20Learning%20Fundamentals/study-interface.css");\n');
  let shared=fs.readFileSync('PHASE 4 - Deep Learning/study-interface.js','utf8');
  shared=shared.replace(/const chapters = \[[\s\S]*?\n\];/,'const chapters = '+JSON.stringify(folders.map(f=>[f,f]),null,2)+';')
    .replace('Deep learning chapters','NLP and transformer chapters').replace("overview.textContent = 'Phase 4'","overview.textContent = 'Phase 5'");
  fs.writeFileSync(root+'/study-interface.js',shared);
  const phase4=fs.readFileSync('PHASE 4 - Deep Learning/index.html','utf8');
  const start=phase4.slice(0,phase4.indexOf('<body')).replace('<title>Deep Learning | Recall</title>','<title>NLP &amp; Transformers | Recall</title>');
  const arrow='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
  const rows=newMeta.map(c=>`      <a class="chapter-row" href="${c.href.split('/')[1]}/index.html"><span class="card-number">${c.id}</span><div class="row-title"><h2>${escape(c.title)}</h2><p>${c.count} questions &middot; ${c.topics} topics</p></div><span class="card-open">Open chapter ${arrow}</span></a>`).join('\n');
  fs.writeFileSync(root+'/index.html',start+`<body class="library-page" data-phase="5">\n  <main id="study-content" class="library-main">\n    <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="../index.html">Library</a></li><li><span aria-current="page">Phase 5</span></li></ol></nav>\n    <header class="library-heading"><p class="study-eyebrow">PHASE 5</p><h1>Natural Language Processing &amp; Transformers</h1><p>Deep NLP expertise for LLM-powered products. Choose one of nine chapters to start revising.</p></header>\n    <section class="phase-chapters" aria-label="NLP and transformer chapters">\n${rows}\n    </section>\n    <a class="phase-parent-link" href="../index.html">Back to your library</a>\n  </main>\n</body>\n</html>\n`);
  let home=fs.readFileSync('index.html','utf8');
  assert(!home.includes('PHASE%205%20-'));
  home=home.replace('    </section>',`      <a class="phase-card" href="${encodeURIComponent(root)}/index.html"><p class="study-eyebrow">PHASE 5</p><h2>Natural Language Processing &amp; Transformers</h2><p>Explore text representations, tokenization, transformer architecture, and how to evaluate language models.</p><div class="card-bottom"><span>9 chapters</span><span class="card-open">Explore phase ${arrow}</span></div></a>\n    </section>`);
  fs.writeFileSync('index.html',home);
  const readme=root+'/README.md';fs.writeFileSync(readme,fs.readFileSync(readme,'utf8').replace('## Topics',`## Study questions\n\n[Open the Phase 5 question bank](index.html) - ${data.total_questions} beginner-friendly questions and answers across ${newMeta.length} chapters. Topic headings follow the roadmap; question numbering restarts in each chapter. Model references describe the named versions rather than a current ranking.\n\n## Topics`));
  console.log(`Phase 5 complete: ${data.total_questions} questions and ${newMeta.reduce((sum,c)=>sum+c.topics,0)} topic headings.`);
};
