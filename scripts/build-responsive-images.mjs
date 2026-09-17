import fs from 'node:fs/promises';
import sharp from 'sharp';
const widths=[320,640,960,1280,1600];
await fs.mkdir('public/images/responsive',{recursive:true});
const files=(await fs.readdir('public/images')).filter(f=>f.endsWith('.avif'));
const manifest=[];
for(const file of files){
 const original=await sharp(`public/images/${file}`).metadata();
 const variants=[];
 for(const width of widths){const output=`public/images/responsive/${file.replace('.avif','')}-${width}.avif`;const info=await sharp(`public/images/${file}`).resize({width,withoutEnlargement:true}).avif({quality:50,effort:4}).toFile(output);variants.push({requestedWidth:width,file:output.replace('public',''),width:info.width,height:info.height,bytes:info.size});}
 manifest.push({source:`/images/${file}`,width:original.width,height:original.height,variants});
}
await fs.writeFile('public/images/responsive/manifest.json',JSON.stringify(manifest,null,2));console.log(`Generated ${files.length*widths.length} responsive AVIF files for ${files.length} photographs.`);
