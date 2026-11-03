// Dark-theme regression checks. Uses the same installed browser-tool paths as
// verify-study.cjs; no application dependencies or provider credentials needed.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.RECALL_PLAYWRIGHT || 'playwright');
const root = path.resolve(__dirname, '..');
const state = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'study-data.js'), 'utf8'), state);
const chapters = state.window.STUDY_CHAPTERS;
const pages = ['index.html', ...new Set(chapters.map(c => c.href.split('/')[0] + '/index.html')), 'PHASE%2010%20-%20Fine-Tuning%20%26%20Model%20Customization/index.html', ...chapters.map(c => c.href)];
for (const page of pages) {
  const file = path.join(root, decodeURIComponent(page));
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/src="[^"]*theme\.js"/g) || []).length, 1, page);
  assert(html.indexOf('theme.js') < html.indexOf('study-ui.css'), 'Initialize before shared CSS: ' + page);
}
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) {res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,data) => {
    if (error) {res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type', {'.html':'text/html','.js':'text/javascript','.css':'text/css'}[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
const rgb = value => value.startsWith('#') ? (value.length===4?value.slice(1).split('').map(x=>x+x).join(''):value.slice(1)).match(/../g).map(x=>parseInt(x,16)) : value.match(/[\d.]+/g).slice(0,3).map(Number);
const luminance = color => rgb(color).map(v=>v/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const contrast = (a,b) => {const x=luminance(a), y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
async function verify() {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch({headless:true,...(process.env.RECALL_CHROMIUM?{executablePath:process.env.RECALL_CHROMIUM}:{})});
  try {
    const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
    await context.route('https://**',route=>route.abort());
    const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+'index.html');
    assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
    assert.equal(await page.evaluate(()=>document.compatMode),'CSS1Compat');
    const toggle=page.locator('#product-theme');
    await toggle.selectOption('dark');assert.equal(await toggle.inputValue(),'dark');
    await toggle.focus();await page.keyboard.press('ArrowUp');await page.keyboard.press('Enter');assert.equal(await toggle.inputValue(),'light');
    await toggle.selectOption('dark');
    await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    assert.equal(await page.evaluate(()=>localStorage.getItem('recall.theme.v1')),'dark');
    const snapshots=path.join(root,'artifacts','ui-review');fs.mkdirSync(snapshots,{recursive:true});
    await page.screenshot({path:path.join(snapshots,'theme-dark-roadmap-desktop.png')});
    const pairs=[['ink','surface'],['muted','surface'],['accent','surface'],['answer','surface'],['code-ink','code-bg'],['success','success-soft'],['primary-ink','primary-bg']];
    for (const theme of ['dark','light']) {
      await page.evaluate(theme=>window.RecallTheme.set(theme),theme);
      const values=await page.evaluate(()=>{const css=getComputedStyle(document.documentElement);return Object.fromEntries(['ink','muted','surface','accent','answer','code-ink','code-bg','success','success-soft','primary-ink','primary-bg'].map(name=>[name,css.getPropertyValue('--ui-'+name).trim()]));});
      for(const [fg,bg]of pairs)assert(contrast(values[fg],values[bg])>=4.5,`${theme} ${fg}/${bg}: ${contrast(values[fg],values[bg])}`);
    }
    await page.evaluate(()=>window.RecallTheme.set('dark'));
    for(const chapter of chapters) {
      await page.goto(base+chapter.href);
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark',chapter.id);
      assert.equal(await page.locator('#questions details').count(),chapter.count);
      const colors=await page.locator('#questions .answer').first().evaluate(el=>({ink:getComputedStyle(el).color,bg:getComputedStyle(el.closest('details')).backgroundColor}));
      assert(contrast(colors.ink,colors.bg)>=4.5,chapter.id+' answer contrast');
    }
    const current=chapters.find(c=>c.id==='11.3');
    for(const view of ['reading','index','focus']) {
      await page.goto(base+current.href+'?view='+view+(view==='index'?'':'#question-06'));
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
      await page.screenshot({path:path.join(snapshots,`theme-dark-${view}-desktop.png`)});
      await page.setViewportSize({width:320,height:844});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),view+' dark overflow');
      await page.getByRole('button',{name:'Open navigation',exact:true}).click();assert(await toggle.isVisible());await page.keyboard.press('Escape');
      await page.screenshot({path:path.join(snapshots,`theme-dark-${view}-mobile.png`)});
      await page.setViewportSize({width:1440,height:1000});
    }
    await page.goto(base+current.href+'?view=index');await page.locator('#search').fill('zzzx-no-matching-concept');assert(await page.locator('#empty').isVisible());
    await page.locator('#search').fill('');await page.locator('#topic-select').selectOption('1');assert.equal(await page.locator('.index-topic:visible').count(),1);
    await page.locator('.index-questions a').first().click();
    const review=page.locator('#question-01 .review-actions button').first();await review.click();assert.equal(await review.getAttribute('aria-pressed'),'true');
    await toggle.selectOption('light');assert.equal(await review.getAttribute('aria-pressed'),'true');await page.reload();assert.equal(await review.getAttribute('aria-pressed'),'true');
    await page.setViewportSize({width:375,height:812});await page.getByRole('button',{name:'Open navigation',exact:true}).click();assert(await page.locator('.product-nav').isVisible());
    await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:1000});
    // Theme selections synchronize across tabs and survive page navigation.
    const other=await context.newPage();await other.goto(base+'index.html');await other.locator('#product-theme').selectOption('dark');
    await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');await other.close();
    // Print remains light even when the selected screen theme is dark.
    await page.emulateMedia({media:'print'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--ui-surface').trim()),'#ffffff');await page.emulateMedia({media:'screen'});
    const system=await browser.newContext({colorScheme:'dark'});await system.route('https://**',r=>r.abort());const auto=await system.newPage();await auto.goto(base+'index.html');assert.equal(await auto.locator('html').getAttribute('data-theme'),'light');
    await auto.emulateMedia({colorScheme:'light'});await auto.waitForFunction(()=>document.documentElement.dataset.theme==='light');
    await auto.locator('#product-theme').selectOption('dark');await auto.emulateMedia({colorScheme:'dark'});await auto.emulateMedia({colorScheme:'light'});assert.equal(await auto.locator('html').getAttribute('data-theme'),'dark');await system.close();
    const denied=await browser.newContext({colorScheme:'dark'});await denied.route('https://**',r=>r.abort());await denied.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('Storage disabled');};Storage.prototype.setItem=()=>{throw new Error('Storage disabled');};});const privatePage=await denied.newPage();await privatePage.goto(base+'index.html');assert.equal(await privatePage.locator('html').getAttribute('data-theme'),'light');await privatePage.locator('#product-theme').selectOption('dark');assert.equal(await privatePage.locator('html').getAttribute('data-theme'),'dark');await denied.close();
    assert.deepEqual(errors,[]);
    console.log(`PASS: ${pages.length} initializers, ${chapters.length} dark chapters, contrast, keyboard toggle, saved preference, system preference, cross-tab sync, storage fallback, print, and responsive views.`);
  } finally {await browser.close();}
}
verify().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server.close());
