const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name.startsWith('.')||['artifacts','node_modules'].includes(e.name))continue;const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else if(e.name.endsWith('.html')){
  let html=fs.readFileSync(file,'utf8');const match=html.match(/<script src="([^"]*)study-ui\.js" defer><\/script>/);
  if(match&&!html.includes('recall-app.js')){const prefix=match[1];html=html.replace(match[0],`${match[0]}\n  <script src="${prefix}roadmap-data.js" defer></script>\n  <script src="${prefix}recall-app.js" defer></script>\n  <link rel="stylesheet" href="${prefix}recall-app.css">`);}
  const app=html.match(/<script src="([^"]*)recall-app\.js"/);if(!app)continue;
  if(!/rel=["']icon["']/.test(html))html=html.replace('</title>',`</title>\n  <link rel="icon" type="image/svg+xml" sizes="any" href="${app[1]}favicon.svg">`);
  fs.writeFileSync(file,html);
}}}walk(root);
