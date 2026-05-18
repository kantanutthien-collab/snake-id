@AGENTS.md

# Snake·ID — Field assistant

Mobile-first AI scanning app for Thailand. User points the phone camera at any animal:
- **If it's a snake** → full safety profile (Thai/English/scientific names, danger level 1–5, venom type, ID cues, habitat, how to handle, first aid)
- **If it's anything else** (human, dog, cat, bird, lizard…) → just the species name. No profile.

The current UI is built from the design handoff in `public/snake-id-project/` (Claude Design export, "Snake-ID Home.html"). The Scan flow is currently mocked — tapping the CTA runs a 1.5s animation and surfaces a preset result; real camera + ML integration is future work.

## Tech Stack

- **Next.js 16.2.6** (App Router, Turbopack) — ⚠️ newer than training data; consult `node_modules/next/dist/docs/` before writing framework code
- **React 19.2.4**
- **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — used minimally; most styling is inline to match the design package pixel-by-pixel
- **Fonts (via `next/font/google`)**: Geist (UI) · Instrument Serif (display, italic) · JetBrains Mono (mono)
- **ESLint 9** with `eslint-config-next`
- `src/` directory layout, import alias `@/*`

## Core Screen — Home

| Section | Notes |
|---|---|
| **Top bar** | "S" logo + Snake·ID title + city pill ("Bangkok") + settings gear |
| **Viewfinder** | Purple gradient frame with corner brackets, scan-line animation, dashed reticle with angry-cobra SVG icon, "Live · Auto-focus" mode chip, "3 m · 1/250s" hint |
| **Primary CTA** | Big gradient button "Scan now" + "Tap to scan animal" subtitle. Tap → 1.5s scan animation → result peek |
| **Stat row** | 324 Scans · 12 Snakes · 5/5 Deadly seen (mock metrics) |
| **Recent finds** | 3 most recent scans. Snake rows show swatch + danger pill + Thai name + location. Non-snake rows show emoji + label + "Not a snake · No profile" |
| **Emergency strip** | Red gradient banner. `tel:1669` link — Thai ambulance |
| **Bottom nav** | Home / Library / Map / Profile (Home active; other tabs not yet wired) |
| **Result peek** | Bottom-sheet modal that slides up after a scan. Snake → full profile (danger pill, family/venom/size chips, ID cues, habitat, handling, first aid — emphasised red for danger ≥ 4). Non-snake → big emoji + label + reminder that only snakes get profiles |

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

Each snake has: `en`, `th`, `sci`, `family`, `danger` (1–5), `venom`, `size`, `swatch` (3-color tuple for the thumbnail), `idCues` (string[]), `habitat`, `handle`, `firstAid`.

### Other creatures — name only

`human`, `dog`, `cat`, `bird`, `lizard` — each just `{ id, label, emoji }`. The result peek shows the label and explicitly says "Snake-ID only stores full profiles for snakes."

### Danger scale (1–5)

| Lvl | Label | Short | Tone |
|---|---|---|---|
| 1 | Non-venomous | Safe | green |
| 2 | Mildly venomous | Mild | yellow |
| 3 | Venomous | Venomous | orange |
| 4 | Dangerous | Dangerous | coral |
| 5 | Deadly | DEADLY | red |

## Data Pipeline (Thai snake corpus)

We pulled the full Thai-snake list from the iNaturalist API and merged it with the 6 hand-curated species. The original 6 in `snakes.ts` are unchanged and remain what the UI renders — the new candidates file is **not yet wired in**.

| File | Contents |
|---|---|
| `src/data/thai-snakes-raw.json` | 273 raw species from iNat (Thailand `place_id=6967`, taxon `Serpentes`) |
| `src/data/snake-candidates.ts` | 124 filtered candidates as `SnakeCandidate[]` — 6 curated + 118 draft |
| `public/snakes/{inatId}.{jpg\|jpeg\|png}` | 116 CC-licensed photos (~13 MB total) |
| `scripts/fetch-thai-snakes.mjs` | Re-pulls raw iNat data → `thai-snakes-raw.json` |
| `scripts/build-snake-data.mjs` | Filters (obs ≥ 20, drops marine genera) + merges curation from `snakes.ts` |
| `scripts/download-snake-photos.mjs` | Downloads photos, rewrites `photo.url` to local `/snakes/…` |

All three scripts are idempotent. Re-run order: `fetch` → `build` → `download`.

### `SnakeCandidate` type

Defined in `src/lib/types.ts`. Superset of `Snake` with **all curation fields optional** plus `inatId`, `observationsThailand`, `wikipediaUrl`, `wikipediaSummary`, `photo` (`{ url, license, attribution, source }`), and a required `draft: boolean` flag.

- `draft: false` → fully curated, safe to render with the same components as `Snake`
- `draft: true` → only `sci`, `en`, `family`, `photo`, `wikipediaUrl` are populated; curation fields missing

### Photo licensing

- 213 / 251 photos are `cc-by-nc` (non-commercial reuse with credit)
- Every candidate carries `photo.attribution` — **must be displayed in the UI** to comply with CC
- If the app is ever monetized, filter to `cc0` / `cc-by` / `cc-by-sa` only (~24 photos survive)

### Curation rules

- **Do not invent first-aid content.** Copy only from authoritative sources (Thai Red Cross, QSMI antivenom protocols, Ministry of Public Health).
- Thai names: prefer `th.wikipedia.org`, then `siamensis.org`
- Wikipedia URLs from iNat sometimes contain spaces — the build script canonicalises to underscores
- Before wiring `snake-candidates.ts` into the UI, confirm the approach with the user (gate by `draft: false`? separate `/curate` route? bulk-import into `snakes.ts`?)

## Design System

- **Theme:** Dark night-purple. Body bg is a radial gradient (`#2B1456 → #150829 → #060211`). App surface is `#140A24`.
- **Color tokens** (in `globals.css` + `src/components/home/theme.ts`):
  - `cream` `#140A24` (page bg)
  - `surface` `#241636`, `paper` `#2A1A40`
  - `ink` `#F1EBFF`, `ink2` `#B8AAD8`, `ink3` `#7E7298` (lavender-white scale)
  - `moss` `#7E5BC4` (primary purple), `moss2` `#A38BD8` (lavender accent)
  - `rust` `#F25D5D`, `gold` `#E5C46A`, `hair` `rgba(240,234,255,0.10)`
- **Animations** (in `globals.css`): `sid-scan-slow`, `sid-scan-fast`, `sid-rise`, `sid-fade-in`
- **Layout:** Mobile-first, max-width 480px centered. Safe-area padding for iOS notch + home indicator.
- **Accessibility:** Large tap targets, dialog has Escape-to-close, focus-visible outlines, descriptive `aria-label`s.

## Repository Layout

```
src/
  app/
    layout.tsx         # Fonts + metadata + theme color
    page.tsx           # HomeScreen — orchestrates scan state + result
    globals.css        # Theme tokens, body bg gradient, scan animations
  components/
    home/
      theme.ts         # C (colors) + F (font families) constants
      icons.tsx        # SVG icons (snake, pin, gear, camera, phone, home, book, map, user)
      TopBar.tsx
      Viewfinder.tsx   # Camera frame + scan line + corner brackets + reticle
      PrimaryCTA.tsx   # "Scan now" button (Client Component — has onClick)
      StatRow.tsx
      RecentList.tsx   # Renders snake-rows or other-rows from recent.ts
      EmergencyStrip.tsx
      BottomNav.tsx
      DangerPill.tsx
      SwatchDot.tsx
      ResultPeek.tsx   # Bottom-sheet modal (Client Component)
  data/
    snakes.ts            # 6 curated snake records + findSnake() — what the UI renders today
    snake-candidates.ts  # 124 candidates (6 curated + 118 draft) — NOT wired into UI yet
    thai-snakes-raw.json # 273-species raw iNat dump (source for build script)
    others.ts            # 5 other creatures + findOther()
    recent.ts            # 3 mock recent scans
    danger.ts            # DANGER[level] → { label, short, tone, bg }
  lib/
    types.ts             # Snake, SnakeCandidate, OtherCreature, Recent, ScanResult, DangerLevel, PreviewKey
scripts/
  fetch-thai-snakes.mjs       # Pulls iNat data for Thailand snakes
  build-snake-data.mjs        # Filters + merges curation → snake-candidates.ts
  download-snake-photos.mjs   # Downloads CC photos to public/snakes/
public/
  snakes/                     # 116 downloaded CC photos, named {inatId}.{jpg|jpeg|png}
```

Design reference (kept for traceability, not application code):
- `public/snake-id-project/` — original Claude Design handoff bundle (`Snake-ID Home.html`, `*.jsx`, `README.md`, chat transcript). Ignored by ESLint via `eslint.config.mjs`.

## Project Goals

1. Match the design package pixel-by-pixel on mobile (the iOS frame from the design is intentionally dropped — the app renders edge-to-edge on the real device)
2. Keep the Home screen as the only entry point until real camera/ML lands
3. Make snake/other data easy to extend (add a row in `snakes.ts` or `others.ts`, no UI changes needed)
4. Keep the bundle small — this is a field tool
5. Stay installable as a PWA later (offline-friendly)

## Out of Scope (for now)

- Real camera capture and on-device ML — Scan is mocked with a randomly-chosen preset
- Library / Map / Profile screens — bottom-nav buttons render but don't navigate
- "Full profile →" deep-link from result peek
- User accounts, backend, image hosting (we don't store photos at all)
- Multi-language beyond Thai + English
- Push notifications, analytics
