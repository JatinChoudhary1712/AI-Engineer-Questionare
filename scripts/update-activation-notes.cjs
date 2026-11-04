// Apply the supplied revision notes to the existing chapter, preserving unrelated content.
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const file='PHASE 4 - Deep Learning/4.1 Neural Network Fundamentals/script.js';
const source=fs.readFileSync(file,'utf8'),boundary=source.indexOf('function escapeText');
if(boundary<0)throw Error('Renderer boundary missing');
const topics=vm.runInNewContext(source.slice(0,boundary)+';topics');
const title='Activation functions: Sigmoid, Tanh, ReLU, GELU, SwiGLU';
const topic=topics.find(t=>t.title===title),old=topic.questions;
const raw=fs.readFileSync('artifacts/activation-functions-notes.md','utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const inline=s=>esc(s.replace(/\\+\(/g,'').replace(/\\+\)/g,'')).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>').replace(/^((?:Definition|Interview takeaway|Example):)/,'<strong>$1</strong>');
const mi=x=>`<mi>${x}</mi>`,mo=x=>`<mo>${x}</mo>`,num=x=>`<mn>${x}</mn>`,row=x=>`<mrow>${x}</mrow>`,sub=(x,i)=>`<msub>${mi(x)}${typeof i==='number'?num(i):mi(i)}</msub>`,pow=(x,y)=>`<msup>${x}${row(y)}</msup>`,fraction=(a,b)=>`<mfrac>${row(a)}${row(b)}</mfrac>`;
function equation(text){
  let body;
  if(text.includes('w_1'))body=mi('z')+mo('=')+sub('w',1)+sub('x',1)+mo('+')+sub('w',2)+sub('x',2)+mo('+')+mi('b');
  else if(text.includes('a ='))body=mi('a')+mo('=')+mi('f')+mo('(')+mi('z')+mo(')');
  else if(text.includes('sigma'))body=mi('σ')+mo('(')+mi('x')+mo(')')+mo('=')+fraction(num(1),num(1)+mo('+')+pow(mi('e'),mo('−')+mi('x')));
  else if(text.includes('tanh')){const pos=pow(mi('e'),mi('x')),neg=pow(mi('e'),mo('−')+mi('x'));body=mi('tanh')+mo('(')+mi('x')+mo(')')+mo('=')+fraction(pos+mo('−')+neg,pos+mo('+')+neg);}
  else if(text.includes('max'))body=mi('f')+mo('(')+mi('x')+mo(')')+mo('=')+mi('max')+mo('(')+num(0)+mo(',')+mi('x')+mo(')');
  else if(text.includes('SwiGLU'))body=mi('SwiGLU')+mo('(')+mi('x')+mo(')')+mo('=')+mo('(')+mi('x')+sub('W',1)+mo(')')+mo('⊙')+mi('Swish')+mo('(')+mi('x')+sub('W',2)+mo(')');
  else if(text.includes('GELU'))body=mi('GELU')+mo('(')+mi('x')+mo(')')+mo('=')+mi('x')+mi('Φ')+mo('(')+mi('x')+mo(')');
  else if(text.includes('0.1'))body=num('0.1')+mo('×')+num('0.1')+mo('×')+num('0.1')+mo('=')+num('0.001');
  else throw Error('Unsupported equation: '+text);
  return `<math class="activation-equation" xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="${esc(text.replace(/\\/g,''))}">${row(body)}</math>`;
}
function html(markdown){
  const lines=markdown.trim().split(/\r?\n/);let result='',list='';
  const endList=()=>{if(list){result+=`</${list}>`;list='';}};
  for(let i=0;i<lines.length;i++){
    const line=lines[i].trim();if(!line){endList();continue;}
    if(line.startsWith('|')){endList();const rows=[];while(i<lines.length&&lines[i].trim().startsWith('|')){const l=lines[i].trim();if(!/^\|[\s|:-]+\|$/.test(l))rows.push(l.split('|').slice(1,-1).map(x=>x.trim()));i++;}i--;result+='<div class="table-wrap"><table><thead><tr>'+rows.shift().map(c=>`<th scope="col">${inline(c)}</th>`).join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map((c,k)=>k?`<td>${inline(c)}</td>`:`<th scope="row">${inline(c)}</th>`).join('')+'</tr>').join('')+'</tbody></table></div>';continue;}
    const formula=line.match(/^\\+\[\s*(.*?)\s*\\+\]$/);if(formula){endList();result+=equation(formula[1]);continue;}
    const bullet=line.match(/^(-|\d+\.)\s+(.+)/);if(bullet){const tag=bullet[1]==='-'?'ul':'ol';if(list!==tag){endList();result+=`<${tag}>`;list=tag;}result+=`<li>${inline(bullet[2])}</li>`;continue;}
    endList();result+=line.endsWith(':')?`<p><strong>${inline(line)}</strong></p>`:`<p>${inline(line)}</p>`;
  }endList();return result;
}
const blocks=[...raw.matchAll(/^## (\d+)\. (.+)\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
if(blocks.length!==10)throw Error('Expected 10 supplied questions, got '+blocks.length);
const revised=blocks.map(m=>[m[2].trim(),html(m[3])]);
if(old.length===10&&old.every((q,i)=>q[0]===revised[i][0])&&topic.extraHTML){console.log('Activation revision notes are already applied.');process.exit(0);}
if(old.length!==6)throw Error('Expected the six original activation questions before replacement.');
const revision=raw.match(/^## Final Quick Revision[^\n]*\r?\n([\s\S]*?)(?=^## Interview Self-Test)/m)[1];
const mcqs=[
  {q:'Which activation function is zero-centered?',options:['Sigmoid','Tanh','ReLU','GELU'],answer:1,why:'Tanh is zero-centered, with outputs from −1 to +1.'},
  {q:'Which activation function suffers from the Dying ReLU problem?',options:['Sigmoid','Tanh','ReLU','SwiGLU'],answer:2,why:'ReLU can remain inactive when pre-activations stay negative.'},
  {q:'Which activation function is commonly associated with BERT?',options:['GELU','Sigmoid','Tanh','ReLU'],answer:0,why:'BERT uses GELU in its feed-forward network.'},
  {q:'What makes SwiGLU different?',options:['Probability output','Gating mechanism','Only positive outputs','Hard zero threshold'],answer:1,why:'SwiGLU uses element-wise multiplication to gate learned features.'},
  {q:'Which activation is most likely to suffer from saturation-based vanishing gradients?',options:['ReLU','Sigmoid','SwiGLU','GELU'],answer:1,why:'Sigmoid has very small derivatives in its saturation regions.'}
];
topic.questions=revised;
topic.extraHTML='<section class="activation-revision"><button type="button" class="activation-revision-toggle" aria-expanded="false" aria-controls="activation-revision-content">Quick revision & interview self-test <span aria-hidden="true">+</span></button><div id="activation-revision-content" hidden><h3>Final Quick Revision – Remember These 5 Things</h3>'+html(revision)+'<form class="activation-quiz"><h3>Interview Self-Test</h3><p>5 MCQs – Test your understanding</p><p class="quiz-status" role="status" aria-live="polite">0/5 answered</p>'+mcqs.map((item,i)=>`<fieldset data-correct="${item.answer}"><legend>${i+1}. ${esc(item.q)}</legend>${item.options.map((option,j)=>`<label><input type="radio" name="activation-quiz-${i}" value="${j}"> ${esc(option)}</label>`).join('')}<p class="quiz-feedback" hidden>${esc(item.why)}</p></fieldset>`).join('')+'<button type="submit" class="primary-button">Check answers</button><button type="reset" class="notebook-secondary">Reset quiz</button></form></div></section>';
const map=[0,2,3,4,5,6];
fs.writeFileSync('artifacts/activation-question-migration.json',JSON.stringify(old.map((q,i)=>({oldQuestion:q[0],newQuestion:revised[map[i]][0],oldId:'question-'+String(i+5).padStart(2,'0'),newId:'question-'+String(map[i]+5).padStart(2,'0')})),null,2));
let renderer=source.slice(boundary);
if(!renderer.includes('topic.extraHTML'))renderer=renderer.replace('  questions.append(section);',"  if (topic.extraHTML) section.insertAdjacentHTML('beforeend', topic.extraHTML);\n  questions.append(section);");
// The footer stays with the original answer nodes in reading mode, without adding reviewable questions.
renderer=renderer.replace(/\n\/\/ Activation revision interactions[\s\S]*$/,'');
renderer+=`\n// Activation revision interactions\nconst revisionToggle=document.querySelector('.activation-revision-toggle');\nif(revisionToggle)revisionToggle.addEventListener('click',()=>{const content=document.getElementById('activation-revision-content');content.hidden=!content.hidden;revisionToggle.setAttribute('aria-expanded',String(!content.hidden));revisionToggle.querySelector('span').textContent=content.hidden?'+':'−';});\nconst activationQuiz=document.querySelector('.activation-quiz');\nif(activationQuiz){\n  const items=[...activationQuiz.querySelectorAll('fieldset')],status=activationQuiz.querySelector('.quiz-status');\n  const clear=()=>items.forEach(item=>{item.querySelector('.quiz-feedback').hidden=true;item.removeAttribute('data-result');});\n  activationQuiz.addEventListener('change',()=>{clear();status.textContent=items.filter(item=>item.querySelector('input:checked')).length+'/5 answered';});\n  activationQuiz.addEventListener('submit',event=>{event.preventDefault();const answered=items.filter(item=>item.querySelector('input:checked')).length;if(answered<5){status.textContent=answered+'/5 answered. Answer all five questions before checking.';const missing=items.find(item=>!item.querySelector('input:checked'));missing.querySelector('input').focus();return;}let score=0;for(const item of items){const correct=item.querySelector('input:checked').value===item.dataset.correct;if(correct)score++;item.dataset.result=correct?'correct':'incorrect';const feedback=item.querySelector('.quiz-feedback');feedback.hidden=false;feedback.textContent=(correct?'Correct. ':'Incorrect. ')+feedback.textContent.replace(/^(Correct|Incorrect)\\. /,'');}status.textContent=score+'/5 correct';});\n  activationQuiz.addEventListener('reset',()=>{clear();status.textContent='0/5 answered';});\n}\n`;
fs.writeFileSync(file,'const topics = '+JSON.stringify(topics,null,2)+';\n\n'+renderer);
const jsonFile='PHASE 4 - Deep Learning/questions.json',data=JSON.parse(fs.readFileSync(jsonFile,'utf8'));
const oldRecords=data.questions.filter(q=>q.section==='4.1 Neural Network Fundamentals'&&q.bullet===title);let nextId=Math.max(...data.questions.map(q=>q.id));
const records=revised.map((q,i)=>{const oldIndex=map.indexOf(i);return {...(oldRecords[oldIndex]||oldRecords[0]),id:oldIndex>=0?oldRecords[oldIndex].id:++nextId,number:i+5,question:q[0],answer:q[1]};});
const start=data.questions.findIndex(q=>q.section==='4.1 Neural Network Fundamentals'&&q.bullet===title);data.questions.splice(start,oldRecords.length,...records);
data.questions.filter(q=>q.section==='4.1 Neural Network Fundamentals').forEach((q,i)=>q.number=i+1);data.total_questions=data.questions.length;
fs.writeFileSync(jsonFile,JSON.stringify(data,null,2)+'\n');
const metadata=fs.readFileSync('study-data.js','utf8'),state={window:{}};vm.runInNewContext(metadata,state);state.window.STUDY_CHAPTERS.find(c=>c.id==='4.1').count=topics.reduce((n,t)=>n+t.questions.length,0);fs.writeFileSync('study-data.js','// Chapter metadata for the static study interface.\nwindow.STUDY_CHAPTERS = '+JSON.stringify(state.window.STUDY_CHAPTERS,null,2)+';\n');
const digest=crypto.createHash('sha256').update(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')).digest('hex');const test='scripts/verify-redesign.cjs';fs.writeFileSync(test,fs.readFileSync(test,'utf8').replace(/s.id==='4\.1'\?'[a-f0-9]{64}'/,"s.id==='4.1'?'"+digest+"'"));
console.log('Updated 10 activation questions, revision summary, and interactive five-question quiz.');
