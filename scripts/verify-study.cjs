// Browser regression checks for the shared index, reading, and focus views.
// Set RECALL_PLAYWRIGHT and optionally RECALL_CHROMIUM to installed local tools.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.RECALL_PLAYWRIGHT || 'playwright');
const root = path.resolve(__dirname, '..');
const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'study-data.js'), 'utf8'), sandbox);
const chapters = sandbox.window.STUDY_CHAPTERS;
assert.equal(chapters.length, 38);
assert.equal(chapters.reduce((sum, c) => sum + c.count, 0), 610);
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) {res.writeHead(403); res.end(); return;}
  fs.readFile(file, (error, data) => {
    if (error) {res.writeHead(404); res.end(); return;}
    res.setHeader('Content-Type', {'.html':'text/html', '.js':'text/javascript', '.css':'text/css'}[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
const snapshots = path.join(root, 'artifacts', 'ui-review');
const hash = text => {let h=2166136261; for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return(h>>>0).toString(36);};
const normalizedAnswer = node => {
  const copy = node.cloneNode(true);
  copy.querySelector('.review-actions').remove();
  for (const table of copy.querySelectorAll('.table-wrap')) for (const name of ['tabindex','role','aria-label']) table.removeAttribute(name);
  return copy.innerHTML;
};
async function verify() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({headless:true, ...(process.env.RECALL_CHROMIUM ? {executablePath:process.env.RECALL_CHROMIUM} : {})});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('https://**', route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    fs.mkdirSync(snapshots, {recursive:true});
    await page.goto(base+'index.html');
    assert.equal(await page.locator('.roadmap-phase').count(),6);
    assert.equal(await page.locator('.resume-card, .phase-card').count(),0);
    assert.equal(await page.locator('.app-sidebar').isVisible(),false);
    let total = 0;
    const phaseOption = process.argv.find(argument => /^--phase\d+$/.test(argument));
    const selectedChapters = phaseOption ? chapters.filter(chapter => chapter.phase === Number(phaseOption.slice(7))) : chapters;
    assert(selectedChapters.length > 0, 'Selected phase must contain chapters');
    for (const chapter of selectedChapters) {
      await page.goto(base+chapter.href);
      await page.waitForSelector('#chapter-reader');
      assert.equal(await page.locator('body').getAttribute('data-view'),'reading');
      assert.equal(await page.locator('#questions details').count(),chapter.count);
      assert.equal(await page.locator('#questions details[open]').count(),chapter.count);
      assert.equal(await page.locator('#questions .topic h2:visible').count(),chapter.topics);
      const originals = await page.locator('#questions .answer').evaluateAll(nodes => nodes.map(node => {
        const copy=node.cloneNode(true);copy.querySelector('.review-actions').remove();
        for(const table of copy.querySelectorAll('.table-wrap'))for(const name of ['tabindex','role','aria-label'])table.removeAttribute(name);
        return copy.innerHTML;
      }));
      const first = page.locator('#questions details').first();
      await first.locator('summary').click();
      assert.equal(await first.evaluate(node=>node.open),false);
      assert.equal(await page.locator('#questions details').nth(1).evaluate(node=>node.open),true);
      await page.locator('#toggle-all-sections').click();
      assert.equal(await page.locator('#questions details[open]').count(),chapter.count);
      await page.locator('#toggle-all-sections').click();
      assert.equal(await page.locator('#questions details[open]').count(),0);
      await page.locator('.view-switcher').getByRole('link',{name:'Content / Index',exact:true}).click();
      assert.equal(await page.locator('#chapter-index .answer, #chapter-index details').count(),0);
      assert.equal(await page.locator('.index-questions a').count(),chapter.count);
      assert.equal(await page.locator('.index-topic').count(),chapter.topics);
      await page.locator('#search').fill('zzzx-no-matching-question');
      assert(await page.locator('#empty').isVisible());
      assert.equal(await page.locator('.index-questions li:visible').count(),0);
      await page.locator('#search').fill('');
      if(chapter.topics>1){
        await page.locator('#topic-select').selectOption('1');
        assert.equal(await page.locator('.index-topic:visible').count(),1);
        await page.locator('#topic-select').selectOption('0');
      }
      await page.locator('.index-questions a').last().click();
      assert.equal(await page.locator('body').getAttribute('data-view'),'reading');
      const lastId=`question-${String(chapter.count).padStart(2,'0')}`;
      assert.equal(new URL(page.url()).hash,'#'+lastId);
      assert(await page.locator('#'+lastId).evaluate(node=>node.open));
      await page.goBack();
      assert.equal(await page.locator('body').getAttribute('data-view'),'index');
      await page.locator('.index-questions a').first().click();
      await page.locator('.view-switcher').getByRole('link',{name:'Focus Mode',exact:true}).click();
      const limit = process.argv.includes('--targeted') ? 1 : chapter.count;
      for(let i=0;i<limit;i++){
        assert.equal(await page.locator('#chapter-reader').isVisible(),false);
        assert(await page.locator('#study-answer').isVisible());
        assert.equal(await page.locator('#study-answer .answer').evaluate(normalizedAnswer),originals[i],`${chapter.id} answer ${i+1} changed`);
        if(i+1<limit)await page.getByRole('button',{name:'Next',exact:true}).click();
      }
      total+=limit;
      if(!process.argv.includes('--targeted'))assert(await page.getByRole('button',{name:'Next',exact:true}).isDisabled());
      await page.getByRole('link',{name:'Return to Reading Mode',exact:true}).click();
      assert.equal(await page.locator('#questions .answer').count(),chapter.count);
      await page.goto(base+chapter.href+'#'+lastId);
      assert.equal(await page.locator('body').getAttribute('data-view'),'reading');
      assert(await page.locator('#'+lastId).evaluate(node=>node.open));
      console.log(`${chapter.id}: index, reading, focus, history, deep links, ${limit} answers passed`);
    }
    if(!process.argv.includes('--targeted'))assert.equal(total,selectedChapters.reduce((sum,chapter)=>sum+chapter.count,0));
    const chapter=chapters.find(c=>c.id==='6.1');
    await page.goto(base+chapter.href+'#question-03');
    const question=await page.locator('#question-03 summary > span:nth-child(2)').textContent();
    const key=chapter.id+':'+hash(question);
    await page.evaluate(({key})=>localStorage.setItem('recall.reviewed.v1',JSON.stringify({[key]:true})),{key});
    await page.reload();
    assert.equal(await page.locator('#question-03 .review-actions button').getAttribute('aria-pressed'),'true');
    await page.locator('#question-03').getByRole('link',{name:'Focus on this question'}).click();
    assert.equal(await page.locator('#study-question-title').textContent(),question);
    assert.equal(await page.getByRole('button',{name:'Reviewed · Undo',exact:true}).getAttribute('aria-pressed'),'true');
    await page.getByRole('button',{name:'Reviewed · Undo',exact:true}).click();
    await page.getByRole('button',{name:'Mark as reviewed',exact:true}).click();
    await page.getByRole('button',{name:'Next',exact:true}).click();
    await page.getByRole('button',{name:'Previous',exact:true}).click();
    await page.reload();
    assert.equal(await page.locator('#study-question-title').textContent(),question);
    await page.getByRole('link',{name:'Library',exact:true}).click();
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('recall.position.v1')).questionId),'question-03');
    await page.goto(base+chapter.href+'?view=reading#question-03');
    await page.waitForSelector('#chapter-reader');
    assert.equal(await page.locator('body').getAttribute('data-view'),'reading');
    assert.equal(new URL(page.url()).hash,'#question-03');
    // Legacy view query strings remain usable.
    for(const [alias,view] of [['browse','reading'],['study','focus'],['overview','index']]){
      await page.goto(base+chapter.href+'?view='+alias+'&question=question-03');
      assert.equal(await page.locator('body').getAttribute('data-view'),view);
    }
    // Each view at desktop, tablet, and narrow phone widths.
    for(const width of [1440,768,390,320]){
      await page.setViewportSize({width,height:900});
      for(const view of ['index','reading','focus']){
        await page.goto(base+chapter.href+'?view='+view+(view==='index'?'':'#question-03'));
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${view} overflow at ${width}`);
        if(width===1440||width===390)await page.screenshot({path:path.join(snapshots,`reading-${view}-${width}.png`),fullPage:width===390&&view==='focus'});
      }
    }
    for(const [id,number] of [['3.1',37],['3.2',5],['6.4',18]]){
      const target=chapters.find(c=>c.id===id);
      for(const view of ['reading','focus']){
        await page.goto(base+target.href+`?view=${view}#question-${String(number).padStart(2,'0')}`);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} ${view} rich content overflow`);
        if(id==='3.2')assert(await page.locator('#math-status').isVisible());
      }
    }
    await page.goto(base+chapter.href);
    await page.getByRole('button',{name:'Open chapter navigation'}).click();
    assert(await page.locator('#mobile-navigation').isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobile-navigation').isVisible(),false);
    // Scrolling the reader saves the reached question without requiring a review.
    await page.locator('#question-09').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('recall.position.v1')).questionId==='question-09');
    const orchestration = chapters.find(chapter => chapter.id === '7.4');
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:900});
      for (const view of ['reading','index','focus']) {
        await page.goto(base+orchestration.href+`?view=${view}`+(view==='index'?'':'#question-05'));
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        await page.screenshot({path:path.join(snapshots,`phase7-study-${view}-${width}.png`),fullPage:false});
      }
    }
    const rag = chapters.find(chapter => chapter.id === '8.5');
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:900});
      for (const view of ['reading','index','focus']) {
        await page.goto(base+rag.href+`?view=${view}`+(view==='index'?'':'#question-01'));
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        if (width!==320) await page.screenshot({path:path.join(snapshots,`phase8-study-${view}-${width}.png`),fullPage:false});
      }
    }
    assert.deepEqual(errors,[]);
    console.log(`PASS: ${total} answer comparisons; ${selectedChapters.length} selected chapters (${chapters.length} registered), review persistence, resume, aliases, deep links, history, and responsive layouts.`);
  }finally{await browser.close();}
}
verify().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server.close());
