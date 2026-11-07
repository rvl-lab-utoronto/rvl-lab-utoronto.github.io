// Shrinks oversized publication thumbnails and points publications.js at the results.
//
// Usage:
//   node scripts/optimize-thumbnails.mjs                 # all referenced thumbnails over 500 KB
//   node scripts/optimize-thumbnails.mjs --dry-run       # report only
//   node scripts/optimize-thumbnails.mjs --quality 55 roboculture.webp   # redo specific files
//   node scripts/optimize-thumbnails.mjs --frame-step 2 roboculture.webp # also keep every 2nd frame
//
// Thumbnails are shown in a 170x150 box (object-fit: cover), so they are resized to
// 2x that (340x300) and re-encoded as WebP. Animated GIF/WebP files stay animated.

import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PUBLICATIONS_JS = path.join(ROOT, "src/data/publications.js");
const THUMBNAIL_DIR = path.join(ROOT, "public/assets/publication-thumbnails");
const SEARCH_DIRS = ["src", "public/assets/blog-pages", "public/assets/project-assets/pages", "README.md"];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const quality = Number(valueOf("--quality") ?? 75);
const thresholdKB = Number(valueOf("--threshold-kb") ?? 500);
const frameStep = Number(valueOf("--frame-step") ?? 1);
const onlyFiles = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.match(/^--(quality|threshold-kb|frame-step)$/));

const RESIZE = { width: 340, height: 300, fit: "cover" };

async function encode(source, target) {
  const meta = await sharp(source, { animated: true }).metadata();
  const pages = meta.pages ?? 1;
  if (frameStep <= 1 || pages <= 1) {
    await sharp(source, { animated: true }).resize(RESIZE).webp({ quality, effort: 6 }).toFile(target);
    return;
  }
  const frames = [];
  const delay = [];
  for (let i = 0; i < pages; i += frameStep) {
    frames.push(await sharp(source, { page: i }).resize(RESIZE).png().toBuffer());
    let frameDelay = 0;
    for (let j = i; j < Math.min(i + frameStep, pages); j++) frameDelay += meta.delay?.[j] ?? 100;
    delay.push(frameDelay);
  }
  await sharp(frames, { join: { animated: true } })
    .webp({ quality, effort: 6, delay, loop: meta.loop ?? 0 })
    .toFile(target);
}

function valueOf(flag) {
  const i = args.indexOf(flag);
  return i === -1 ? undefined : args[i + 1];
}

function listFiles(target) {
  const full = path.join(ROOT, target);
  if (!fs.existsSync(full)) return [];
  if (fs.statSync(full).isFile()) return [full];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(target, entry.name);
    if (entry.isDirectory()) return listFiles(rel);
    return /\.(js|jsx|md|qmd|html|css|json)$/.test(entry.name) ? [path.join(ROOT, rel)] : [];
  });
}

const searchableFiles = SEARCH_DIRS.flatMap(listFiles).filter((f) => f !== PUBLICATIONS_JS);
const searchableText = new Map(searchableFiles.map((f) => [f, fs.readFileSync(f, "utf8")]));

function referencedOutsidePublications(fileName) {
  const needle = `publication-thumbnails/${fileName}`;
  return [...searchableText].filter(([, text]) => text.includes(needle)).map(([f]) => path.relative(ROOT, f));
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

let publicationsSource = fs.readFileSync(PUBLICATIONS_JS, "utf8");
const referenced = new Map();
for (const match of publicationsSource.matchAll(/"thumbnail"\s*:\s*"([^"]+)"/g)) {
  const fileName = path.basename(match[1]);
  referenced.set(fileName, match[1]);
}

const candidates = [...referenced.keys()].filter((fileName) => {
  const file = path.join(THUMBNAIL_DIR, fileName);
  if (!fs.existsSync(file)) return false;
  if (onlyFiles.length) return onlyFiles.includes(fileName);
  return fs.statSync(file).size > thresholdKB * 1024 && /\.(gif|png|jpe?g|webp)$/i.test(fileName);
});

let totalBefore = 0;
let totalAfter = 0;

for (const fileName of candidates) {
  const source = path.join(THUMBNAIL_DIR, fileName);
  const targetName = fileName.replace(/\.(gif|png|jpe?g|webp)$/i, ".webp");
  const target = path.join(THUMBNAIL_DIR, targetName);
  const before = fs.statSync(source).size;

  const otherRefs = [fileName, targetName].flatMap(referencedOutsidePublications);
  if (otherRefs.length) {
    console.log(`SKIP ${fileName}: also referenced from ${[...new Set(otherRefs)].join(", ")}`);
    continue;
  }
  if (targetName !== fileName && fs.existsSync(target)) {
    console.log(`NOTE ${targetName} already exists but is unreferenced; it will be replaced`);
  }

  if (dryRun) {
    console.log(`WOULD ${fileName} (${kb(before)}) -> ${targetName}`);
    continue;
  }

  const tmp = `${target}.tmp.webp`;
  await encode(source, tmp);
  fs.renameSync(tmp, target);
  if (targetName !== fileName) {
    fs.unlinkSync(source);
    const oldPath = referenced.get(fileName);
    const newPath = oldPath.replace(fileName, targetName);
    publicationsSource = publicationsSource.replaceAll(`"${oldPath}"`, `"${newPath}"`);
    referenced.delete(fileName);
    referenced.set(targetName, newPath);
  }

  const after = fs.statSync(target).size;
  totalBefore += before;
  totalAfter += after;
  console.log(`${fileName} ${kb(before)} -> ${targetName} ${kb(after)}${after > 1024 * 1024 ? "  (still over 1 MB, retry with a lower --quality)" : ""}`);
}

if (!dryRun) fs.writeFileSync(PUBLICATIONS_JS, publicationsSource);
if (totalBefore) console.log(`\nTotal: ${kb(totalBefore)} -> ${kb(totalAfter)}`);

const unreferencedLarge = fs
  .readdirSync(THUMBNAIL_DIR)
  .filter((f) => !referenced.has(f) && fs.statSync(path.join(THUMBNAIL_DIR, f)).size > thresholdKB * 1024)
  .filter((f) => referencedOutsidePublications(f).length === 0);
if (unreferencedLarge.length) {
  console.log("\nLarge files not referenced anywhere (safe to delete):");
  for (const f of unreferencedLarge) console.log(`  ${f} (${kb(fs.statSync(path.join(THUMBNAIL_DIR, f)).size)})`);
}
