const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),cp=require('node:child_process');
const {chromium}=require(process.env.RECALL_PLAYWRIGHT||'playwright');
const root=path.resolve(__dirname,'..'),state={window:{}};
for(const file of ['study-data.js','roadmap-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),state);
const sheets=state.window.STUDY_CHAPTERS,data=state.window.RECALL_ROADMAP;
const server=http.createServer((req,res)=>{const relative=decodeURIComponent(req.url.split('?')[0]);const file=path.resolve(root,'.'+relative);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css'})[path.extname(file)]||'text/plain');res.end(body);});});
async function run(){
  assert.equal(sheets.length,50);assert.equal(data.questions.length,713);assert.equal(data.phases.length,19);assert.equal(new Set(data.questions.map(q=>q.key)).size,713);
  for(const s of sheets){const file=decodeURIComponent(s.href).replace(/index\.html$/,'script.js');const original=cp.execFileSync('git',['show','HEAD:'+file],{cwd:root});assert.equal(crypto.createHash('sha256').update(original.toString().replace(/\r\n/g,'\n')).digest('hex'),crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n')).digest('hex'),s.id+' Q&A source changed');}
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch({headless:true,executablePath:process.env.RECALL_CHROMIUM});
  try{
    const context=await browser.newContext({viewport:{width:1536,height:1024}});await context.route('https://**',r=>r.abort());
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('BROWSER:',e.message);});page.setDefaultTimeout(10000);
    await page.goto(base+'index.html');await page.waitForSelector('.stats-row');
    assert.deepEqual(await page.locator('.stat strong').allTextContents(),['713','50','0','0%']);
    await page.screenshot({path:path.join(root,'artifacts/ui-review/recall-overview-desktop.png'),fullPage:true});
    await page.locator('.product-nav a[data-page=roadmap]').click();assert.equal(await page.locator('.phase-row').count(),19);
    await page.locator('#phase-0>summary').click();assert(await page.locator('#phase-0 .coming-placeholder').first().isVisible());
    await page.locator('#phase-3>summary').click();assert.equal(await page.locator('#phase-3 .chapter-row-detail').count(),6);
    await page.locator('#chapter-3\\.6>summary').click();assert(await page.locator('#chapter-3\\.6 .coming-placeholder').first().isVisible());
    await page.locator('#global-search').fill('cross-validation');await page.waitForSelector('.search-result');assert(await page.locator('.search-result').count()>0);
    await page.locator('#global-search').fill('zzzz-nonexistent');await page.waitForTimeout(200);assert((await page.locator('.search-results').innerText()).includes('No results'));
    await page.keyboard.press('Escape');await page.keyboard.press('Control+k');assert(await page.locator('#global-search').evaluate(n=>n===document.activeElement));
    await page.locator('#global-search').fill('');await page.keyboard.press('Escape');
    const q=data.questions.find(q=>q.chapterId==='6.1'&&q.id==='question-03');
    await page.evaluate(q=>{localStorage.setItem('recall.reviewed.v1',JSON.stringify({[q.key]:true}));localStorage.setItem('recall.position.v1',JSON.stringify({chapterId:q.chapterId,questionId:q.id}));localStorage.setItem('recall.last-chapter',q.chapterId);},q);
    await page.goto(base+'index.html');assert.equal(await page.locator('.stat strong').nth(2).textContent(),'1');assert((await page.locator('.continue-card a').getAttribute('href')).endsWith('#question-03'));
    await page.locator('.continue-card a').click();await page.waitForSelector('.recall-sidebar');assert.equal(new URL(page.url()).hash,'#question-03');
    assert.equal(await page.locator('#question-03 .review-actions button').first().getAttribute('aria-pressed'),'true');
    await page.locator('#question-03 .bookmark-button').click();assert.equal(await page.locator('#question-03 .bookmark-button').textContent(),'Remove bookmark');
    await page.goto(base+'index.html?page=bookmarks');assert.equal(await page.locator('.question-result').count(),1);
    await page.getByRole('button',{name:'Remove bookmark',exact:true}).click();assert.equal(await page.locator('.question-result').count(),0);
    await page.locator('.product-nav a[data-page=questions]').click();await page.locator('.filter-field select[aria-label=Chapter]').selectOption('6.1');assert.equal(await page.locator('.question-result').count(),sheets.find(s=>s.id==='6.1').count);
    await page.locator('select[aria-label="Review state"]').selectOption('done');assert.equal(await page.locator('.question-result').count(),1);
    await page.locator('.product-nav a[data-page=revision]').click();assert((await page.locator('.collection-count').textContent()).startsWith('712'));await page.locator('.question-result').first().getByRole('button',{name:'Mark as reviewed',exact:true}).click();assert((await page.locator('.collection-count').textContent()).startsWith('711'));
    await page.locator('.product-nav a[data-page=projects]').click();assert.equal(await page.locator('.project-card').count(),49);await page.locator('.project-status select').first().selectOption('active');await page.reload();assert.equal(await page.locator('.project-status select').first().inputValue(),'active');
    await page.locator('#product-theme').selectOption('dark');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    await page.goto(base+'index.html');await page.screenshot({path:path.join(root,'artifacts/ui-review/recall-overview-dark.png'),fullPage:true});await page.locator('#product-theme').selectOption('light');
    for(const width of [375,768,1024,1536]){await page.setViewportSize({width,height:900});await page.goto(base+'index.html');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overview overflow at ${width}`);if(width===375){await page.screenshot({path:path.join(root,'artifacts/ui-review/recall-overview-mobile.png'),fullPage:true});await page.locator('.drawer-toggle').click();assert(await page.locator('.product-nav').isVisible());await page.keyboard.press('Escape');}}
    for(const width of [320,375,768,1024,1536]){
      await page.setViewportSize({width,height:900});
      for(const view of ['roadmap','questions','revision','bookmarks','projects']){
        await page.goto(base+'index.html?page='+view+(view==='roadmap'?'&phase=3&chapter=3.1':''));await page.waitForSelector('.recall-main');
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${view} overflow at ${width}`);
        if(['roadmap','projects'].includes(view)&&[375,1536].includes(width))await page.screenshot({path:path.join(root,`artifacts/ui-review/recall-${view}-${width}.png`)});
      }
    }
    let count=0;
    if(!process.argv.includes('--layout-only'))for(const s of sheets){await page.goto(base+s.href);await page.waitForSelector('.recall-sidebar');assert.equal(await page.locator('#questions details').count(),s.count);count+=s.count;
      assert.equal(await page.locator('.bookmark-button').count(),s.count);
      await page.locator('.view-switcher').getByRole('link',{name:'Focus Mode',exact:true}).click();assert(await page.locator('#study-answer .answer').isVisible());await page.reload();await page.waitForSelector('.recall-sidebar');
      await page.locator('.focus-return').getByRole('link',{name:'Content / Index',exact:true}).click();assert.equal(await page.locator('.index-questions a').count(),s.count);
      console.log(s.id+': preserved questions, bookmarks, reading, focus reload, index');
    }
    if(!process.argv.includes('--layout-only'))assert.equal(count,713);
    await page.setViewportSize({width:375,height:812});await page.goto(base+sheets[0].href);await page.waitForSelector('.recall-sidebar');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Study overflow on mobile');
    await page.screenshot({path:path.join(root,'artifacts/ui-review/recall-reader-mobile.png'),fullPage:true});
    assert.deepEqual(errors,[]);console.log('PASS: 713 questions / 50 unchanged sources; 19 phases; dashboard, hierarchy, search, persistence, projects, themes, responsive layout, all study modes.');
  }finally{await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
