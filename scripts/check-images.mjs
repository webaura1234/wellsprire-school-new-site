import fs from 'node:fs/promises';
import sharp from 'sharp';
const base=process.env.SITE_URL||'http://localhost:3000';
const manifest=JSON.parse(await fs.readFile('public/images/responsive/manifest.json','utf8'));
const results=[];
for(const source of manifest){
 const checked=[];
 for(const variant of source.variants){const response=await fetch(`${base}${variant.file}`,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error(`${variant.file}: HTTP ${response.status}`);const bytes=Buffer.from(await response.arrayBuffer());const metadata=await sharp(bytes).metadata();await sharp(bytes).raw().toBuffer();if(metadata.width!==variant.width||metadata.height!==variant.height)throw new Error(`${variant.file}: dimensions differ`);checked.push({file:variant.file,status:response.status,bytes:bytes.length,width:metadata.width,height:metadata.height});}
 results.push({source:source.source,variants:checked});console.log(`PASS ${source.source}`);
}
await fs.mkdir('reports',{recursive:true});await fs.writeFile('reports/image-audit.json',JSON.stringify({checkedAt:new Date().toISOString(),base,photographs:results.length,variants:results.length*5,results},null,2));console.log(`PASS: all ${results.length} photographs and ${results.length*5} responsive files serve HTTP 200 and fully decode.`);
