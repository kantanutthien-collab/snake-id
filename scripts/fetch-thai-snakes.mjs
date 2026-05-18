#!/usr/bin/env node
// Fetch all Thai snake species from iNaturalist.
// Usage: node scripts/fetch-thai-snakes.mjs
// Output: src/data/thai-snakes-raw.json

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/thai-snakes-raw.json");

const PLACE_ID_THAILAND = 6967;
const TAXON_ID_SERPENTES = 85553;
const UA = "snake-id-stick/0.1 (https://github.com/; field guide for Thailand)";

const CC_LICENSES = new Set(["cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nc-sa", "cc-by-nd", "cc-by-nc-nd"]);

async function getJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function fetchAllSpeciesCounts() {
  const out = [];
  let page = 1;
  const perPage = 100;
  while (true) {
    const url = `https://api.inaturalist.org/v1/observations/species_counts?taxon_id=${TAXON_ID_SERPENTES}&place_id=${PLACE_ID_THAILAND}&per_page=${perPage}&page=${page}&order=desc&order_by=count`;
    const data = await getJson(url);
    out.push(...data.results);
    process.stderr.write(`  page ${page}: +${data.results.length} (total ${out.length}/${data.total_results})\n`);
    if (out.length >= data.total_results || data.results.length === 0) break;
    page += 1;
  }
  return out;
}

// Fetch full taxon details in batches of 30 — gives us taxon_photos with licenses.
async function fetchTaxonDetails(ids) {
  const out = new Map();
  const batchSize = 30;
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const url = `https://api.inaturalist.org/v1/taxa/${batch.join(",")}`;
    const data = await getJson(url);
    for (const t of data.results) out.set(t.id, t);
    process.stderr.write(`  taxa ${i + batch.length}/${ids.length}\n`);
    await new Promise((r) => setTimeout(r, 600)); // respect ~1 req/sec
  }
  return out;
}

function pickBestPhoto(taxon) {
  const photos = taxon.taxon_photos || [];
  // Prefer CC-licensed photos; fall back to default if license unknown.
  for (const tp of photos) {
    const p = tp.photo;
    if (p && CC_LICENSES.has(p.license_code)) {
      return {
        url: p.medium_url || p.url,
        license: p.license_code,
        attribution: p.attribution,
        source: "https://www.inaturalist.org/photos/" + p.id,
      };
    }
  }
  // No CC photo found — skip rather than ship something we can't legally use.
  return null;
}

function summarize(html) {
  if (!html) return null;
  // Strip HTML tags, collapse whitespace.
  const text = String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.slice(0, 400);
}

async function main() {
  process.stderr.write("Fetching species counts for Thailand snakes...\n");
  const counts = await fetchAllSpeciesCounts();

  process.stderr.write(`\nFetching full taxon details for ${counts.length} species...\n`);
  const ids = counts.map((c) => c.taxon.id);
  const details = await fetchTaxonDetails(ids);

  const rows = counts.map(({ count, taxon }) => {
    const full = details.get(taxon.id) || taxon;
    const photo = pickBestPhoto(full);
    return {
      inat_id: taxon.id,
      sci: full.name,
      en: full.preferred_common_name || null,
      th: null, // curate manually
      family: (full.ancestors || []).find((a) => a.rank === "family")?.name || null,
      genus: (full.ancestors || []).find((a) => a.rank === "genus")?.name || null,
      observations_thailand: count,
      conservation_status: full.conservation_status?.status || null,
      wikipedia_url: full.wikipedia_url || null,
      wikipedia_summary: summarize(full.wikipedia_summary),
      photo,
      // Curation placeholders — fill in later:
      danger: null,
      venom: null,
      size: null,
      idCues: [],
      habitat: null,
      handle: null,
      firstAid: null,
      swatch: null,
    };
  });

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(rows, null, 2) + "\n");

  const withPhoto = rows.filter((r) => r.photo).length;
  const withEn = rows.filter((r) => r.en).length;
  process.stderr.write(`\nWrote ${rows.length} species to ${OUT}\n`);
  process.stderr.write(`  with CC photo:    ${withPhoto}\n`);
  process.stderr.write(`  with common name: ${withEn}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
