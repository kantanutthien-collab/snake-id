@AGENTS.md

# Snake·ID — Field assistant

Mobile-first AI scanning app for Thailand. User points the phone camera at any animal (or uploads a photo) and Claude vision identifies it:
- **If it's a snake** → full safety profile (Thai/English/scientific names, danger level 1–5, venom type, ID cues, habitat, how-to-handle, first aid)
- **If it's anything else** (human, dog, cat, bird, lizard…) → just the species name. No profile.

The Home screen is the only screen wired today. The Scan flow is **live** — taps go through `/api/identify` → Claude Opus 4.7 vision → match against the curated 6 + 124 iNat candidates → bottom-sheet result peek. Scan history is persisted client-side in localStorage.

## Tech Stack

- **Next.js 16.2.6** (App Router, Turbopack) — ⚠️ newer than training data; consult `node_modules/next/dist/docs/` before writing framework code
- **React 19.2.4**
- **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — used minimally; most styling is inline to match the design package pixel-by-pixel
- **Fonts (via `next/font/google`)**: Geist (UI) · **Newsreader** italic (display) · JetBrains Mono (mono)
- **`@anthropic-ai/sdk`** — server-side Claude vision via Route Handler
- **ESLint 9** with `eslint-config-next`
- `src/` directory layout, import alias `@/*`

## Environment

- `ANTHROPIC_API_KEY` in `.env.local` (gitignored). See `.env.example`. Restart `npm run dev` after editing.
- Without the key, `/api/identify` returns 503 with a friendly message; the UI surfaces it in an error banner.

## Core Screen — Home

| Section | Notes |
|---|---|
| **Top bar** | "S" logo + Snake·ID title + city pill ("Bangkok") + settings gear |
| **Viewfinder** | Purple gradient frame with corner brackets, scan-line animation, dashed reticle with cobra SVG. **Tap to open live camera** (`getUserMedia({ facingMode: "environment" })`) — switches to live `<video>` preview. Close ✕ button at top-right while live. |
| **Primary CTA** | 3 modes: `idle` "Scan now / Tap to upload a photo" (opens file picker) · `camera` "Take picture" (captures current frame) · `analyzing` "Identifying… / Asking Claude vision" (spinner, disabled) |
| **Stat row** | **Live** — counts from localStorage: total scans · unique snake species · unique deadly (danger 5) species |
| **Recent finds** | **Live** — top 3 entries from localStorage (max 50 retained). Empty state on first run. Snake rows show iNat photo if matched, otherwise three-stripe swatch. |
| **Emergency strip** | Red gradient banner. `tel:1669` link — Thai ambulance |
| **Bottom nav** | Home / Library / Map / Profile (Home active; other tabs render but don't navigate) |
| **Result peek** | Bottom-sheet modal that slides up after a scan. See "Result peek layout" below. |

### Scan flow

1. **Trigger** — tap viewfinder (open camera) OR tap Scan now (file picker)
2. **Capture** — in camera mode the next CTA tap draws the current video frame to canvas; in file mode the selected `File` is decoded to a canvas. Both are downscaled to **max 1024px on the long edge**, encoded JPEG 0.85.
3. **POST** to `/api/identify` with `{ imageBase64, mediaType: "image/jpeg" }`
4. **Server** — `client.messages.create({ model: "claude-opus-4-7", output_config: { format: { type: "json_schema", schema: {...} } } })` with the image block and a strict identification prompt
5. **Parse** — `{ kind: "snake"|"other", scientific, common, thai, confidence }`
6. **Match layer** (`src/lib/match.ts`):
   - Snake + scientific matches curated `snakes.ts` → full profile
   - Snake + scientific matches an iNat candidate → curated fields where present, defaults where missing, `draft: true` if not yet curated
   - Snake but no match → synthesize a placeholder Snake with cautious defaults ("treat as venomous")
   - Other + common matches `others.ts` → use it; otherwise synthesize `{ id: "ai:<slug>", label, emoji: "?" }`
7. **Render** — Result peek opens with the user's photo + matched profile; entry is also written to localStorage history.

### Result peek layout

Top → bottom:
- **Hero photo** — the user's captured/uploaded image, full-width 4:3, chip "Your photo"
- **Title block** — `IDENTIFIED · X% CONFIDENCE` label, large italic English name, Thai · *Latin*
- **Status badge** — `<glow-dot> Non-venomous (1/5)` style pill using the danger scale tone
- **Confidence badge** — `<pct>% confidence`, tone shifts green/yellow/orange by threshold
- **Headline callout** — promotes the snake's `handle` field as a prominent box. Red border if `danger ≥ 4`, purple-tinted otherwise.
- **Quick fact chips** — family, venom, size
- **Draft warning** — yellow banner if the candidate is from iNat without curated fields
- **Details** — ID cues bullets, Habitat, First aid (red emphasis box if `danger ≥ 4`)
- **Call 1669** — auto-rendered emergency call button if `danger ≥ 4`
- **Reference photo attribution** — CC-BY-NC credit line if an iNat photo backed the match
- **Actions** — Dismiss · Share via LINE (deep-link to `line.me/R/msg/text/`) · Wikipedia → (if iNat candidate has it)

For non-snake results: hero photo + big italic label only, with explicit "Snake-ID only stores full profiles for snakes." copy. No first aid, no profile.

## Data Model

### Snakes — 6 species (from design package)

| ID | English | Thai | Danger |
|---|---|---|---|
| `king-cobra` | King Cobra | งูจงอาง | 5 |
| `monocled-cobra` | Monocled Cobra | งูเห่าหม้อ | 5 |
| `malayan-krait` | Malayan Krait | งูสามเหลี่ยมหางแดง | 5 |
| `malayan-pit-viper` | Malayan Pit Viper | งูกะปะ | 5 |
| `white-lipped-pit-viper` | White-lipped Pit Viper | งูเขียวหางไหม้ | 4 |
| `red-tailed-racer` | Red-tailed Racer | งูเขียวหางแดง | 1 |

Each snake has: `en`, `th`, `sci`, `family`, `danger` (1–5), `venom`, `size`, `swatch` (3-color tuple), `idCues` (string[]), `habitat`, `handle`, `firstAid`.

### Other creatures — name only

`human`, `dog`, `cat`, `bird`, `lizard` — each `{ id, label, emoji }` (CJK glyphs 人 / 犬 / 猫 / 鳥 / 蜥 per the design system — no emoji).

### Danger scale (1–5)

| Lvl | Label | Short | Tone |
|---|---|---|---|
| 1 | Non-venomous | Safe | `#A8DCB0` green |
| 2 | Mildly venomous | Mild | `#E5D58F` yellow |
| 3 | Venomous | Venomous | `#F0B377` orange |
| 4 | Dangerous | Dangerous | `#F0846B` coral |
| 5 | Deadly | DEADLY | `#F25D5D` red |

### `ScanResult` (returned by `/api/identify`)

```ts
type ScanResult =
  | {
      kind: "snake";
      snake: Snake;            // full embedded record (curated or synthesized)
      photo?: CCPhoto;         // iNat reference photo if candidate matched
      wikipediaUrl?: string;   // if candidate matched
      confidence?: number;     // 0–1 from Claude
      draft?: boolean;         // true if data is incomplete / synthesized
    }
  | { kind: "other"; other: OtherCreature; confidence?: number };
```

### Local history (localStorage)

- Key: `snake-id:history:v1`, capped at 50 entries
- Schema: `{ version: 1, entries: HistoryEntry[] }` where `HistoryEntry = { id, when, result }`
- Read/write via `src/lib/history.ts`; React access via `useHistory()` hook in `src/lib/use-history.ts`
- Stats derived on read: `scans` (total), `snakes` (unique snake IDs), `deadly` (unique snake IDs with `danger === 5`)
- Per-device only — no cross-device sync. For multi-device sync later, add Vercel KV / Postgres + auth.

## Data Pipeline (Thai snake corpus)

The Thai-snake list is pulled from the iNaturalist API and merged with the 6 hand-curated species. The original 6 in `snakes.ts` are the primary lookup; the candidates file fills in the long tail.

| File | Contents |
|---|---|
| `src/data/thai-snakes-raw.json` | 273 raw species from iNat (Thailand `place_id=6967`, taxon `Serpentes`) |
| `src/data/snake-candidates.ts` | 124 filtered candidates as `SnakeCandidate[]` — 6 curated + 118 draft |
| `src/data/inaturalist.ts` | Re-exports `snakeCandidates` + `findCandidate(sci)` used by `src/lib/match.ts` |
| `public/snakes/{inatId}.{jpg\|jpeg\|png}` | 116 CC-licensed photos (~13 MB total) |
| `scripts/fetch-thai-snakes.mjs` | Re-pulls raw iNat data → `thai-snakes-raw.json` |
| `scripts/build-snake-data.mjs` | Filters (obs ≥ 20, drops marine genera) + merges curation from `snakes.ts` |
| `scripts/download-snake-photos.mjs` | Downloads photos, rewrites `photo.url` to local `/snakes/…` |

All three scripts are idempotent. Re-run order: `fetch` → `build` → `download`.

### `SnakeCandidate` type

Defined in `src/lib/types.ts`. Superset of `Snake` with **all curation fields optional** plus `inatId`, `observationsThailand`, `wikipediaUrl`, `wikipediaSummary`, `photo` (`{ url, license, attribution, source }`), and a required `draft: boolean` flag.

- `draft: false` → fully curated, safe to render with the same components as `Snake`
- `draft: true` → only `sci`, `en`, `family`, `photo`, `wikipediaUrl` are populated; `matchScan()` fills curation gaps with cautious defaults

### Photo licensing

- 213 / 251 photos are `cc-by-nc` (non-commercial reuse with credit)
- Every candidate carries `photo.attribution` — surfaced in the result peek as "Reference photo: …" line + a `source` link
- If the app is ever monetized, filter to `cc0` / `cc-by` / `cc-by-sa` only (~24 photos survive)

### Curation rules

- **Do not invent first-aid content.** Copy only from authoritative sources (Thai Red Cross, QSMI antivenom protocols, Ministry of Public Health).
- Thai names: prefer `th.wikipedia.org`, then `siamensis.org`
- Wikipedia URLs from iNat sometimes contain spaces — the build script canonicalises to underscores

## Design System

Tokens live in `src/app/globals.css` as CSS custom properties (the full `--sid-*` set from the design package's `colors_and_type.css`) plus a legacy alias layer used by `src/components/home/theme.ts`.

- **Theme:** Dark night-purple. Body bg is a radial gradient (`#2B1456 → #150829 → #060211`). App surface is `#140A24`.
- **Night ramp:** `--sid-night-0` (#060211) → `--sid-night-4` (#2B1456). **Surfaces:** `--sid-surface` `#241636`, `--sid-paper` `#2A1A40`, `--sid-deeper` `#170828`.
- **Moss purple scale:** `--sid-moss` `#7E5BC4` (primary) · `--sid-moss-2` `#A38BD8` (links/soft) · `--sid-moss-3` `#C9A7F5` (glow) · `--sid-moss-4` `#3A1F62` (deep CTA) · `--sid-moss-5` `#4A2B7A` (focus ring).
- **Ink scale:** `--sid-ink` `#F1EBFF` → `--sid-ink-4` `#4F4666` (disabled). `--sid-pure-white` is reserved for button labels only.
- **Hairlines:** `--sid-hair` 0.10 · `--sid-hair-soft` 0.05 · `--sid-hair-strong` 0.22 (viewfinder inset).
- **Emergency red** (`tel:1669` strip): `--sid-bg-emergency` gradient on `--sid-emerg-ink` `#F6E8D6`. Never reused.
- **Composed gradients:** `--sid-bg-page`, `--sid-bg-viewfinder`, `--sid-bg-cta`, `--sid-bg-cta-loading`, `--sid-bg-emergency`.
- **Shadows in token:** `--sid-shadow-cta`, `-viewfinder`, `-sheet`, `-scanline`, `-emergency`, `-card`.
- **Animations** (`globals.css`): `sid-scan-slow`, `sid-scan-fast`, `sid-rise`, `sid-fade-in`, `sid-spin`.
- **Layout:** Mobile-first, max-width 480px centered. Safe-area padding for iOS notch + home indicator.
- **Accessibility:** Large tap targets, dialog has Escape-to-close, focus-visible outlines, descriptive `aria-label`s.

## Repository Layout

```
src/
  app/
    layout.tsx           # Fonts + metadata + theme color
    page.tsx             # HomeScreen — orchestrates phase, scan flow, history, result
    globals.css          # Full --sid-* token set, gradients, scan + spin animations
    api/
      identify/
        route.ts         # POST handler: Claude Opus 4.7 vision + match layer
  components/
    home/
      theme.ts           # C (colors) + F (font families) constants
      icons.tsx          # SVG icons (snake, pin, gear, camera, phone, snap, upload, close, spinner, home, book, map, user)
      TopBar.tsx
      Viewfinder.tsx     # idle / live (camera) / analyzing modes; mounts <video>
      PrimaryCTA.tsx     # idle (upload) / camera (snap) / analyzing (spinner)
      StatRow.tsx        # accepts live stats prop
      RecentList.tsx     # accepts live entries + hydrated flag, empty state
      EmergencyStrip.tsx
      BottomNav.tsx
      DangerPill.tsx
      SwatchDot.tsx
      ResultPeek.tsx     # Hero photo + status + confidence + handle + details + LINE share
  data/
    snakes.ts            # 6 curated snake records + findSnake()
    snake-candidates.ts  # 124 candidates (6 curated + 118 draft) — generated by build script
    inaturalist.ts       # Re-exports snakeCandidates + findCandidate()
    thai-snakes-raw.json # 273-species raw iNat dump (source for build script)
    others.ts            # 5 other creatures + findOther()
    recent.ts            # Unused mock data (kept for reference)
    danger.ts            # DANGER[level] → { label, short, tone, bg }
  lib/
    types.ts             # Snake, SnakeCandidate, OtherCreature, CCPhoto, ScanResult, IdentifyApiResponse, DangerLevel
    match.ts             # matchScan(): AI result → ScanResult (curated → candidate → synthesized)
    image.ts             # processBlob / processVideoFrame — canvas resize → JPEG 0.85 base64 + dataUrl
    history.ts           # localStorage I/O, computeStats, formatRelative
    use-history.ts       # React hook wrapping history.ts
scripts/
  fetch-thai-snakes.mjs       # Pulls iNat data for Thailand snakes
  build-snake-data.mjs        # Filters + merges curation → snake-candidates.ts
  download-snake-photos.mjs   # Downloads CC photos to public/snakes/
public/
  snakes/                     # 116 downloaded CC photos, named {inatId}.{jpg|jpeg|png}
```

Design reference (kept for traceability, not application code):
- `public/snake-id-project/` — original Claude Design handoff bundles (Home + Design System Overview). Ignored by ESLint via `eslint.config.mjs`.

## Project Goals

1. Match the design package pixel-by-pixel on mobile (iOS frame from the design is intentionally dropped — the app renders edge-to-edge on the real device)
2. Identify snakes with Claude vision and fall back gracefully when an unknown species comes through (synthesized placeholder + warning, never crash)
3. Make snake/other data easy to extend (add a row in `snakes.ts` or curate a draft in `snake-candidates.ts`, no UI changes needed)
4. Keep the bundle small — this is a field tool
5. Stay installable as a PWA later (offline-friendly — local DB already works offline; vision requires network)

## Camera + HTTPS

`getUserMedia()` requires `localhost` or HTTPS. Implications:
- ✅ `localhost:3000` from the dev laptop — camera works
- ❌ LAN IP (e.g. `http://192.168.x.x:3000`) on a phone — camera blocked, **file upload still works**
- ✅ Vercel deployment — HTTPS auto, camera works on any device
- 🛠 For local mobile testing: `ngrok http 3000` or Tailscale Funnel to get a temporary HTTPS tunnel

## Out of Scope (for now)

- **Library / Map / Profile screens** — bottom-nav buttons render but don't navigate
- **"See all →"** deep-link from Recent finds (only renders when history > 3)
- **Cross-device history sync** — localStorage is per-device. Would need Vercel KV / Postgres + auth.
- **Curation of the 118 draft candidates** — needs Thai names, danger ratings, ID cues, first-aid copy from authoritative sources (Thai Red Cross / QSMI / MoPH). Not started.
- **Offline AI fallback** — when offline, the local DB still works for matching, but the AI vision step (`/api/identify`) fails. No on-device ML yet.
- **PWA / service worker / manifest** — not configured.
- **User accounts, backend, image hosting** — we don't store user photos beyond the active session
- **Multi-language** beyond Thai + English
- **Push notifications, analytics**
