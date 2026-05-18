#!/usr/bin/env node
// Download CC-licensed photos for each candidate to public/snakes/.
// Rewrites snake-candidates.ts so photo.url points at the local path.
// Idempotent: skips files that already exist.
//
// Usage: node scripts/download-snake-photos.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CANDIDATES_TS = resolve(ROOT, "src/data/snake-candidates.ts");
const PHOTOS_DIR = resolve(ROOT, "public/snakes");
const UA = "snake-id-stick/0.1 (https://github.com/; field guide for Thailand)";

const CONCURRENCY = 4;

function parseCandidates(src) {
  const m = src.match(/=\s*(\[[\s\S]*\])\s*;\s*$/);
  if (!m) throw new Error("Could not locate candidates array in snake-candidates.ts");
  return { prefix: src.slice(0, m.index + 2), candidates: JSON.parse(m[1]) };
}

function serialize(prefix, candidates) {
  return `${prefix}${JSON.stringify(candidates, null, 2)};\n`;
}

function extFromUrl(url) {
  const e = extname(new URL(url).pathname).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp"].includes(e) ? e : ".jpg";
}

async function downloadOne(c) {
  if (!c.photo || c.photo.url.startsWith("/snakes/")) {
    return { skipped: "already-local-or-no-photo" };
  }
  const ext = extFromUrl(c.photo.url);
  const filename = `${c.inatId}${ext}`;
  const localPath = `/snakes/${filename}`;
  const diskPath = resolve(PHOTOS_DIR, filename);

  if (existsSync(diskPath)) {
    c.photo = { ...c.photo, url: localPath };
    return { skipped: "file-exists" };
  }

  const res = await fetch(c.photo.url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} for ${c.photo.url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(diskPath, buf);
  c.photo = { ...c.photo, url: localPath };
  return { downloaded: buf.length };
}

async function runWithConcurrency(items, worker) {
  const queue = items.slice();
  let active = 0;
  let done = 0;
  return new Promise((resolveAll, rejectAll) => {
    const startNext = () => {
      if (queue.length === 0 && active === 0) return resolveAll();
      while (active < CONCURRENCY && queue.length > 0) {
        const item = queue.shift();
        active += 1;
        worker(item)
          .then(() => {
            done += 1;
            if (done % 10 === 0) process.stderr.write(`  ${done}/${items.length}\n`);
          })
          .catch(rejectAll)
          .finally(() => {
            active -= 1;
            startNext();
          });
      }
    };
    startNext();
  });
}

async function main() {
  mkdirSync(PHOTOS_DIR, { recursive: true });
  const src = readFileSync(CANDIDATES_TS, "utf8");
  const { prefix, candidates } = parseCandidates(src);

  const withPhoto = candidates.filter((c) => c.photo);
  process.stderr.write(`Downloading ${withPhoto.length} photos (concurrency ${CONCURRENCY})...\n`);

  let downloaded = 0;
  let skipped = 0;
  let totalBytes = 0;
  await runWithConcurrency(withPhoto, async (c) => {
    const r = await downloadOne(c);
    if (r.downloaded) {
      downloaded += 1;
      totalBytes += r.downloaded;
    } else {
      skipped += 1;
    }
  });

  writeFileSync(CANDIDATES_TS, serialize(prefix, candidates));
  process.stderr.write(
    `\nDone. downloaded=${downloaded} skipped=${skipped} bytes=${(totalBytes / 1024 / 1024).toFixed(1)}MB\n`
  );
  process.stderr.write(`Updated ${CANDIDATES_TS} with local /snakes/ paths.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
