import sharp from "sharp";
import fs from "node:fs/promises";

const PAPER = "#faf8f4";
const NAVY = "#1c3b7e";
const GOLD = "#c8a15a";
const SIZE = 1600;

// Shared frame: paper ground + faint concentric arcs (echoes the crest laurel) + thin gold inset border.
function wrap(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${PAPER}"/>
  <g opacity="0.05" stroke="${NAVY}" fill="none" stroke-width="2">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="720"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="620"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="520"/>
  </g>
  <rect x="64" y="64" width="${SIZE - 128}" height="${SIZE - 128}" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.55"/>
  <g fill="none" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    ${inner}
  </g>
</svg>`;
}

// Centered content motifs, drawn inside a local 0-400 box, then translated to canvas centre.
const scenes = {
  campus: `
    <g transform="translate(440,430) scale(3.1)">
      <path d="M20 200V90c0-30 30-30 30-56 0-14 10-24 20-24s20 10 20 24c0 26 30 26 30 56v110"/>
      <path d="M20 200h100M60 200v-46h20v46M50 122h40M50 100h40"/>
      <path d="M-40 200V150c14-6 26-6 40 0v50M140 200V150c14-6 26-6 40 0v50"/>
      <path d="M-60 200h220"/>
      <path d="M70 6l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2Z"/>
    </g>`,
  library: `
    <g transform="translate(430,470) scale(3.1)">
      <path d="M0 160V20c30-14 60-14 90 0v140c-30-14-60-14-90 0Z"/>
      <path d="M90 160V20c30-14 60-14 90 0v140c-30-14-60-14-90 0Z"/>
      <path d="M18 40h54M18 60h54M18 80h54M108 40h54M108 60h54M108 80h54"/>
      <path d="M-30 176h240"/>
      <path d="M55 -6c10 8 10 20 0 30M125 -6c-10 8-10 20 0 30"/>
    </g>`,
  academics: `
    <g transform="translate(440,470) scale(3.05)">
      <path d="M0 30 90 -10l90 40-90 40Z"/>
      <path d="M20 45v55c14 18 130 18 140 0V45"/>
      <path d="M170 32v55"/>
      <circle cx="170" cy="96" r="6"/>
      <path d="M-30 190h240"/>
      <path d="M60 130v40M120 130v40"/>
    </g>`,
  sports: `
    <g transform="translate(440,460) scale(3.05)">
      <ellipse cx="90" cy="120" rx="150" ry="70"/>
      <ellipse cx="90" cy="120" rx="100" ry="42"/>
      <g transform="translate(60,-10)">
        <circle cx="30" cy="14" r="13"/>
        <path d="M30 27v46M30 46l-26 20M30 46l30 14M30 73l-16 34M30 73l20 34"/>
      </g>
    </g>`,
  arts: `
    <g transform="translate(430,480) scale(3.05)">
      <path d="M100 0C40 0 0 40 0 90c0 34 22 40 40 40 10 0 10-14 22-14 14 0 14 20 34 20 46 0 74-40 74-86C170 30 140 0 100 0Z"/>
      <circle cx="40" cy="46" r="7"/>
      <circle cx="80" cy="26" r="7"/>
      <circle cx="122" cy="40" r="7"/>
      <circle cx="70" cy="80" r="7"/>
      <path d="M150 96 200 150" stroke-width="10"/>
    </g>`,
  character: `
    <g transform="translate(440,480) scale(3.05)">
      <path d="M60 200V120"/>
      <path d="M60 120c-40-6-56-40-50-72 30 4 50 24 50 56"/>
      <path d="M60 96c8-30 34-46 62-44-2 34-26 54-62 50"/>
      <path d="M20 200h80"/>
      <path d="M60 20v0"/>
      <circle cx="60" cy="14" r="10"/>
    </g>`,
  science: `
    <g transform="translate(440,470) scale(3.05)">
      <path d="M70 10h40M80 10v50l46 90c6 14-4 30-20 30H64c-16 0-26-16-20-30l46-90V10"/>
      <path d="M62 116h56"/>
      <circle cx="78" cy="150" r="6"/>
      <circle cx="102" cy="164" r="4"/>
      <circle cx="90" cy="178" r="5"/>
      <path d="M-30 200h240"/>
    </g>`,
};

const facultyBadges = {
  physics: `<circle cx="0" cy="0" r="10"/><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="0" cy="0" rx="34" ry="14" transform="rotate(60)"/><ellipse cx="0" cy="0" rx="34" ry="14" transform="rotate(120)"/>`,
  english: `<path d="M-30 -18c14-6 28-6 30 0 2-6 16-6 30 0v36c-14-6-28-6-30 0-2-6-16-6-30 0Z"/>`,
  mathematics: `<path d="M-28 20 0 -22l28 42Z"/><circle cx="0" cy="0" r="30"/>`,
  biology: `<path d="M0 24C-24 24-32 0-32-16 -8-16 0 0 0 24Z"/><path d="M0 24C24 24 32 0 32-16 8-16 0 0 0 24Z"/>`,
  primary: `<rect x="-30" y="-6" width="24" height="24"/><rect x="6" y="-6" width="24" height="24"/><rect x="-12" y="-30" width="24" height="24"/>`,
  arts: `<path d="M0 -26C-30-26-46 0-46 18c0 14 10 18 18 18 6 0 6-8 12-8 8 0 8 10 18 10 22 0 34-20 34-42C36-14 20-26 0-26Z" transform="scale(0.7)"/>`,
  sport: `<circle cx="0" cy="0" r="22"/><path d="M-22 0h44M0-22v44M-15-15l30 30M15-15l-30 30"/>`,
  humanities: `<circle cx="0" cy="0" r="30"/><path d="M-30 0h60M0-30v60M-22-18c14 10 30 10 44 0M-22 18c14-10 30-10 44 0"/>`,
};

function bust(badgePath) {
  return `
    <g transform="translate(800,720) scale(1.7)">
      <circle cx="0" cy="-70" r="60"/>
      <path d="M-120 130c0-70 54-120 120-120s120 50 120 120"/>
    </g>
    <g transform="translate(1040,1040) scale(1.15)" stroke-width="6">
      <circle cx="0" cy="0" r="54" fill="${PAPER}" stroke="${GOLD}" stroke-width="5"/>
      ${badgePath}
    </g>`;
}

async function run() {
  const outDir = "public/images";
  await fs.mkdir(outDir, { recursive: true });

  for (const [name, path] of Object.entries(scenes)) {
    const svg = wrap(path);
    await sharp(Buffer.from(svg))
      .avif({ quality: 55, effort: 4 })
      .toFile(`${outDir}/${name}.avif`);
    console.log(`wrote ${name}.avif`);
  }

  for (const [name, badge] of Object.entries(facultyBadges)) {
    const svg = wrap(bust(badge));
    await sharp(Buffer.from(svg))
      .avif({ quality: 55, effort: 4 })
      .toFile(`${outDir}/faculty-${name}.avif`);
    console.log(`wrote faculty-${name}.avif`);
  }
}

run();
