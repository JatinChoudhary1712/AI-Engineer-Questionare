const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.RECALL_PLAYWRIGHT||'playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css'})[path.extname(file)]||'text/plain');res.end(body);});});
async function run(){
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/index.html`;
  const browser=await chromium.launch({headless:true,...(process.env.RECALL_CHROMIUM?{executablePath:process.env.RECALL_CHROMIUM}:{})});
  try {
    const context=await browser.newContext({viewport:{width:1536,height:1100}});await context.route('https://**',r=>r.abort());
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);
    await page.goto(base);
    assert.equal(await page.locator('.workspace-card').count(),4);assert.equal(await page.locator('.compact-phase').count(),5);
    assert.equal(await page.locator('.workspace-card').first().getByRole('link',{name:'View all',exact:true}).getAttribute('href'),base+'?page=roadmap');
    await page.screenshot({path:path.join(root,'artifacts/ui-review/personal-cards-desktop.png'),fullPage:true});
    for(const [category,title]of [['resources','Harness engineering'],['interviews','Real AI engineer interview experience'],['miscellaneous','Improve LinkedIn profile']]){
      await page.locator(`.workspace-card[data-collection=${category}] .workspace-add`).click();
      await page.getByLabel('Title',{exact:true}).fill(title);await page.getByLabel('Source / company (optional)').fill(category==='interviews'?'Shared by a candidate':'X');
      await page.getByLabel('Source link (optional)').fill('https://example.com/'+category);
      await page.locator('#notebook-content').fill('Details to revisit later.');
      await page.getByLabel('Personal notes',{exact:true}).fill('My own takeaways and next steps.');
      await page.reload();assert.equal(await page.getByLabel('Title',{exact:true}).inputValue(),title);assert.equal(await page.getByLabel('Personal notes',{exact:true}).inputValue(),'My own takeaways and next steps.');
      await page.getByRole('button',{name:'Save item',exact:true}).click();assert.equal(await page.locator('.draft-state').textContent(),'Saved');
      assert.equal(await page.locator('.notebook-list-item').count(),1);
      assert.equal(await page.locator('.notebook-source-link').getAttribute('href'),'https://example.com/'+category);
      await page.getByLabel('Status',{exact:true}).selectOption({index:1});await page.getByRole('button',{name:'Save item',exact:true}).click();await page.reload();assert.equal(await page.getByLabel('Status',{exact:true}).evaluate(n=>n.selectedIndex),1);
      await page.getByLabel('Personal notes',{exact:true}).fill('Edited notes with a unique phrase: notebook-check');await page.getByRole('button',{name:'Save item',exact:true}).click();
      await page.locator('.recall-brand').click();assert((await page.locator(`.workspace-card[data-collection=${category}]`).innerText()).includes(title));
    }
    await page.locator('#global-search').fill('notebook-check');await page.waitForSelector('.search-result');assert.equal(await page.locator('.search-result').count(),3);await page.keyboard.press('Escape');
    await page.locator('.product-nav a[data-page=resources]').click();
    await page.getByLabel('Search saved items',{exact:true}).fill('no match here');assert.equal(await page.locator('.notebook-list-item').count(),0);await page.getByLabel('Search saved items',{exact:true}).fill('Harness');assert.equal(await page.locator('.notebook-list-item').count(),1);
    await page.getByLabel('Filter saved items by status',{exact:true}).selectOption('Done');assert.equal(await page.locator('.notebook-list-item').count(),0);await page.getByLabel('Filter saved items by status',{exact:true}).selectOption('');
    const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export notes',exact:true}).click();const download=await downloadPromise;const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(backup.items.length,3);assert(backup.items.every(item=>item.notes.includes('notebook-check')));
    await page.getByRole('button',{name:'Delete item',exact:true}).click();assert.equal(await page.locator('.notebook-list-item').count(),0);await page.getByRole('button',{name:'Undo',exact:true}).click();assert.equal(await page.locator('.notebook-list-item').count(),1);
    await page.getByLabel('Title',{exact:true}).fill('<img src=x onerror=alert(1)>');await page.getByRole('button',{name:'Save item',exact:true}).click();assert.equal(await page.locator('.notebook-list img').count(),0);
    await page.getByLabel('Source link (optional)').fill('javascript:alert(1)');await page.getByRole('button',{name:'Save item',exact:true}).click();assert(await page.getByLabel('Source link (optional)').evaluate(n=>!n.checkValidity()));
    await page.getByLabel('Title',{exact:true}).fill('Harness engineering');await page.getByLabel('Source link (optional)').fill('https://example.com/resources');await page.getByRole('button',{name:'Save item',exact:true}).click();
    const firstItemURL=page.url();
    await page.getByLabel('Personal notes',{exact:true}).fill('Draft for the first saved resource');
    await page.getByRole('link',{name:'+ Add item',exact:true}).click();await page.getByLabel('Title',{exact:true}).fill('Second resource draft');await page.getByLabel('Personal notes',{exact:true}).fill('Independent second draft');
    await page.goto(firstItemURL);assert.equal(await page.getByLabel('Personal notes',{exact:true}).inputValue(),'Draft for the first saved resource');await page.getByRole('button',{name:'Save item',exact:true}).click();
    await page.goto(base+'?page=resources&new=1');assert.equal(await page.getByLabel('Personal notes',{exact:true}).inputValue(),'Independent second draft');await page.getByRole('button',{name:'Save item',exact:true}).click();await page.getByRole('button',{name:'Delete item',exact:true}).click();
    for(const width of [320,375,768,1024,1536]){
      await page.setViewportSize({width,height:1000});
      for(const category of ['overview','resources','interviews','miscellaneous']){
        await page.goto(base+'?page='+category);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${category} overflow at ${width}`);
        if(width===375&&category==='overview')await page.screenshot({path:path.join(root,'artifacts/ui-review/personal-cards-mobile.png'),fullPage:true});
        if(width===1536&&category==='resources')await page.screenshot({path:path.join(root,'artifacts/ui-review/personal-notes-desktop.png'),fullPage:true});
      }
    }
    await page.getByRole('button',{name:'Switch to dark theme',exact:true}).click();await page.screenshot({path:path.join(root,'artifacts/ui-review/personal-notes-dark.png'),fullPage:true});
    await page.locator('.recall-brand').click();await page.waitForSelector('.stats-row');assert.deepEqual(await page.locator('.stat strong').allTextContents(),['713','50','0','0%']);
    assert.deepEqual(errors,[]);console.log('PASS: four dashboard cards; all three collections; create/edit/delete/undo; independent drafts and reload persistence; personal notes; search/filter; backup export; escaped text and safe links; light/dark; 320–1536px layouts; learning totals unchanged.');
  }finally{await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
