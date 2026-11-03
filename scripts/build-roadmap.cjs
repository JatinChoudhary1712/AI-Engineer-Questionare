// Rebuild the local canonical hierarchy and question index without changing source Q&A.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const state = {window:{}};
vm.runInNewContext(read('study-data.js'), state);
const sheets = state.window.STUDY_CHAPTERS;
const clean = s => s.replace(/\*\*/g, '').replace(/`/g, '').trim();
const phases = [];
let phase, chapter, topic, project, fenced = false;
for (const line of read('artifacts/canonical-roadmap.md').split(/\r?\n/)) {
  const heading = line.match(/^## .*?(PHASE (\d+)|CAPSTONE) - (.+)$/);
  if (heading) {
    phase = {id:heading[2] === undefined ? 'capstone' : Number(heading[2]), title:heading[3], chapters:[], projects:[], goal:''};
    phases.push(phase); chapter = topic = project = null; continue;
  }
  if (/^## /.test(line)) {phase = null; continue;}
  if (!phase) continue;
  if (/^```/.test(line)) {fenced = !fenced; if(topic)topic.lines.push(line); else if(chapter)chapter.lines.push(line); continue;}
  if (fenced) {if(topic)topic.lines.push(line);else if(chapter)chapter.lines.push(line);continue;}
  if (/^>/.test(line)) {phase.goal = clean(line.replace(/^>\s*/,''));continue;}
  if (/^### .*Projects/.test(line)) {chapter = topic = null; continue;}
  const proj = line.match(/^\*\*[^A-Za-z]*(Easy|Medium|Hard): (.+)\*\*$/);
  if (proj) {project={id:`${phase.id}-${proj[1].toLowerCase()}`,difficulty:proj[1],title:proj[2],lines:[]};phase.projects.push(project);continue;}
  if (/^### /.test(line)) {
    const title = line.slice(4).trim();
    chapter={id:(title.match(/^\d+\.\d+/)||[])[0] || `${phase.id}-${phase.chapters.length}`,title,topics:[],lines:[],pointSerial:0};
    phase.chapters.push(chapter);topic=project=null;continue;
  }
  if (project) {project.lines.push(line);continue;}
  if (!chapter || line === '---') continue;
  if (/^\*\*[^*]+\*\*:?$/.test(line)) {
    topic={id:`${chapter.id}-topic-${chapter.topics.length}`,title:clean(line),lines:[],points:[]};chapter.topics.push(topic);continue;
  }
  const point = line.match(/^(\s*)(?:-|\d+\.) (.+)$/);
  if(point) {
    const item={id:`${chapter.id}-point-${chapter.pointSerial++}`,title:clean(point[2]),lines:[],points:[],indent:point[1].length};
    if(topic)topic.points.push(item);else chapter.topics.push(item);
  }
  if(/^\|/.test(line) && !/^\|[\s|-]+\|$/.test(line)) {
    const cells=line.split('|').slice(1,-1).map(clean);
    if(!['Model','DB','Database','AI Engineer'].includes(cells[0]))chapter.topics.push({id:`${chapter.id}-point-${chapter.pointSerial++}`,title:cells[0],lines:[cells.slice(1).join(' · ')],points:[]});
  }
  if(topic)topic.lines.push(line);else chapter.lines.push(line);
}
const hash = text => {let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return(h>>>0).toString(36);};
const questions=[];const mappings=[];
for(const sheet of sheets) {
  const source=read(decodeURIComponent(sheet.href).replace(/index\.html$/, 'script.js'));
  const start=source.indexOf('const topics =');
  const end=source.indexOf('const questions =');
  if(start<0||end<0)throw Error('Unknown source format: '+sheet.id);
  const topics=vm.runInNewContext(source.slice(start,end)+';topics');
  const official=phases.find(p=>p.id===sheet.phase)?.chapters.find(c=>c.id===sheet.id);
  if(!official)throw Error('Unmapped sheet '+sheet.id);
  official.sheetId=sheet.id;
  let n=0;
  for(const [i,group] of topics.entries()) {
    const nodes=official.topics.flatMap(t=>t.points.length?[t,...t.points]:[t]);
    // Existing index anchors record deliberate mappings from canonical learning points to question ranges.
    const old=read('artifacts/legacy-roadmap.html');
    const links=[...old.matchAll(/<a href="([^"]+?question-(\d+))">([^<]+)<\/a>/g)].filter(m=>decodeURIComponent(m[1]).startsWith(decodeURIComponent(sheet.href)));
    const norm=s=>clean(s).replace(/&amp;/g,'&').replace(/&quot;/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const anchors=links.map(m=>({at:Number(m[2]),node:nodes.find(t=>norm(t.title)===norm(m[3].replace(/&amp;/g,'&')))})).filter(a=>a.node);
    let target=anchors.find(a=>a.at===n+1)?.node;
    if(!target) {
      target=official.topics.find(t=>norm(t.title)===norm(group.title));
      if(!target)target=nodes.find(t=>norm(t.title)===norm(group.title));
      if(!target)target=nodes.find(t=>norm(t.title).startsWith(norm(group.title)+' ') || norm(group.title).startsWith(norm(t.title)+' '));
      if(!target&&sheet.id==='6.3') {
        const provider=group.title.split(':')[0];
        const providerTopic=official.topics.find(t=>norm(t.title).includes(norm(provider==='Gemini'?'Google AI':provider)));
        if(providerTopic)target=providerTopic.points.find(t=>norm(t.title).includes(norm(group.title.split(':').slice(1).join(':'))))||providerTopic;
      }
      if(sheet.id==='6.3'&&i===0)target=official.topics.find(t=>t.title==='OpenAI API').points[0];
      if(!target&&sheet.id==='6.2')target=nodes.find(t=>norm(t.title).startsWith(norm(group.title.split(' - ')[0])+' '));
      if(!target&&sheet.id==='8.5'&&i>0&&i<9)target=official.topics.find(t=>t.title==='Advanced RAG Techniques')?.points[i-1];
      if(!target&&sheet.id==='6.4'&&group.title==='Fallback safety and compatibility')target=official.topics.find(t=>t.title==='Error Handling & Fallback');
      if(!target&&topics.length===official.topics.length&&sheet.id!=='8.4')target=official.topics[i];
    }
    const mapped=Boolean(target);
    const topicId=target?.id || `${sheet.id}-supplement-${i}`;
    if(!mapped) {
      official.supplements ||= [];
      official.supplements.push({id:topicId,title:group.title,lines:[],points:[]});
    }
    mappings.push({sheet:sheet.id,sourceTopic:group.title,canonicalTopic:target?.title||null,topicId,questions:group.questions.length,review:!mapped});
    for(const [text,answer] of group.questions) {
      n++;
      questions.push({chapterId:sheet.id,phase:sheet.phase,id:`question-${String(n).padStart(2,'0')}`,key:`${sheet.id}:${hash(text)}`,text,sourceTopic:group.title,topicId});
    }
  }
  if(n!==sheet.count)throw Error(`${sheet.id}: ${n} != ${sheet.count}`);
}
if(questions.length!==713||sheets.length!==50)throw Error('Baseline changed');
if(new Set(questions.map(q=>q.key)).size!==713)throw Error('Duplicate stable keys');
const output={source:'https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026',retrieved:'2026-11-04',phases,questions};
fs.writeFileSync(path.join(root,'roadmap-data.js'),'// Generated by scripts/build-roadmap.cjs. Source Q&A remains in the original sheets.\nwindow.RECALL_ROADMAP = '+JSON.stringify(output,null,2)+';\n');
const fingerprints=sheets.map(s=>({id:s.id,sha256:crypto.createHash('sha256').update(read(decodeURIComponent(s.href).replace(/index\.html$/,'script.js'))).digest('hex')}));
fs.writeFileSync(path.join(root,'artifacts/content-audit.json'),JSON.stringify({sheets:sheets.length,questions:questions.length,phaseCounts:phases.map(p=>({phase:p.id,sheets:sheets.filter(s=>s.phase===p.id).length,questions:questions.filter(q=>q.phase===p.id).length,officialChapters:p.chapters.length})),mappings,fingerprints},null,2));
console.log(JSON.stringify({phases:phases.length,sheets:sheets.length,questions:questions.length,projects:phases.reduce((n,p)=>n+p.projects.length,0),mappingReview:mappings.filter(m=>m.review)},null,2));
