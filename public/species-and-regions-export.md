# 🐍 Snake ID Stick — Species & Regions Tab Export
**For building a new website**
Source: `snake-identifier-v53.html`
Tabs exported: **Species (Page 2)** + **Regions (Page 3)**

---

# PART 1 — SPECIES TAB

## UI Card Structure (Per Species)
```
[ Photo Image ]         ← Wikipedia photo (300px)
[ Emoji + Name ]        ← e.g. 👑 King Cobra
[ Thai Name ]           ← e.g. งูจงอาง
[ Latin Name ]          ← italic, e.g. Ophiophagus hannah
[ Danger Badge ]        ← color-coded: red=deadly, orange=venomous, green=safe
[ Region in Thailand ]
[ Venomous Badge ]      ← 🔴 VENOMOUS or 🟢 Non-venomous
---BUTTONS---
[ 📷 View Photo ]       ← opens Wikipedia article
[ 🔬 First Aid Guide ]  ← opens first aid modal
```

---

## Complete Species Table (20 species)

| # | ID | Name | Thai | Latin | Venomous | Danger | Emoji | Region |
|---|-----|------|------|-------|----------|--------|-------|--------|
| 1 | `king-cobra` | King Cobra | งูจงอาง | *Ophiophagus hannah* | ✅ YES | ☠️ Deadly (5) | 👑 | Throughout Thailand — forested areas |
| 2 | `monocled-cobra` | Monocled Cobra | งูเห่าหม้อ | *Naja kaouthia* | ✅ YES | ☠️ Deadly (5) | 🐍 | Throughout Thailand including Bangkok |
| 3 | `malayan-krait` | Malayan Krait | งูสามเหลี่ยมหางแดง | *Bungarus candidus* | ✅ YES | ☠️ Deadly (5) | 🖤 | Throughout Thailand — central and northeast |
| 4 | `banded-krait` | Banded Krait | งูสามเหลี่ยม | *Bungarus fasciatus* | ✅ YES | ☠️ Deadly (5) | 🟡 | Throughout Thailand |
| 5 | `malayan-pit-viper` | Malayan Pit Viper | งูกะปะ | *Calloselasma rhodostoma* | ✅ YES | ☠️ Deadly (5) | 🔺 | Central, north and east Thailand — NOT deep south |
| 6 | `green-pit-viper` | White-lipped Pit Viper | งูเขียวหางไหม้ท้องเหลือง | *Trimeresurus albolabris* | ✅ YES | ⚠️ Venomous (4) | 🟢 | Throughout Thailand including Bangkok |
| 7 | `russells-viper` | Siamese Russell's Viper | งูแมวเซา | *Daboia siamensis* | ✅ YES | ☠️ Deadly (5) | 💀 | Central, north and east Thailand |
| 8 | `red-necked-keelback` | Red-necked Keelback | งูลายสาบคอแดง | *Rhabdophis subminiatus* | ✅ YES | ⚠️ Venomous (3) | 🔴 | Throughout Thailand |
| 9 | `mangrove-snake` | Mangrove Snake | งูปล้องทอง | *Boiga dendrophila* | ⚠️ MILD | 🟡 Mildly (2) | ⬛ | Southern Thailand |
| 10 | `golden-tree-snake` | Golden Tree Snake | งูเขียวพระอินทร์ | *Chrysopelea ornata* | ⚠️ MILD | 🟡 Mildly (2) | 🌟 | Throughout Thailand — common in cities |
| 11 | `reticulated-python` | Reticulated Python | งูเหลือม | *Malayopython reticulatus* | ❌ NO | ✅ Non-venomous (1) | 🐍 | Throughout Thailand including Bangkok sewers |
| 12 | `burmese-python` | Burmese Python | งูหลาม | *Python bivittatus* | ❌ NO | ✅ Non-venomous (1) | 🟤 | Northern and central Thailand |
| 13 | `rat-snake` | Oriental Rat Snake | งูสิงบ้าน | *Ptyas mucosa* | ❌ NO | ✅ Non-venomous (1) | 🫒 | Throughout Thailand — very common |
| 14 | `indochinese-rat-snake` | Indochinese Rat Snake | งูสิง | *Ptyas korros* | ❌ NO | ✅ Non-venomous (1) | ⚫ | Throughout Thailand |
| 15 | `copperhead-racer` | Copperhead Racer | งูทางมะพร้าวลายขีด | *Coelognathus radiatus* | ❌ NO | ✅ Non-venomous (1) | 🟠 | Throughout Thailand |
| 16 | `wolf-snake` | Common Wolf Snake | งูปล้องฉนวนบ้าน | *Lycodon capucinus* | ❌ NO | ✅ Non-venomous (1) | 🏠 | Throughout Thailand — very common in cities |
| 17 | `paradise-tree-snake` | Paradise Tree Snake | งูเขียวพระอินทร์ปีกฟ้า | *Chrysopelea paradisi* | ❌ NO | ✅ Non-venomous (1) | 🌺 | Southern Thailand |
| 18 | `red-tailed-racer` | Red-tailed Racer | งูเขียวหางแดง | *Gonyosoma oxycephalum* | ❌ NO | ✅ Non-venomous (1) | 🌿 | Southern and central Thailand |
| 19 | `brahminy-blind-snake` | Brahminy Blind Snake | งูดิน | *Indotyphlops braminus* | ❌ NO | ✅ Non-venomous (1) | 🪱 | Throughout Thailand — very common |
| 20 | `sunbeam-snake` | Sunbeam Snake | งูแสงอาทิตย์ | *Xenopeltis unicolor* | ❌ NO | ✅ Non-venomous (1) | 🌈 | Throughout Thailand |

---

## Photo & Wikipedia URLs

| ID | Photo URL | Wikipedia URL |
|----|-----------|---------------|
| `king-cobra` | https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ophiophagus_hannah_-_King_Cobra.jpg/300px-Ophiophagus_hannah_-_King_Cobra.jpg | https://en.wikipedia.org/wiki/King_cobra |
| `monocled-cobra` | https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Naja_kaouthia_2.jpg/300px-Naja_kaouthia_2.jpg | https://en.wikipedia.org/wiki/Monocled_cobra |
| `malayan-krait` | https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Banded_Krait_2.jpg/300px-Banded_Krait_2.jpg | https://en.wikipedia.org/wiki/Malayan_krait |
| `banded-krait` | https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bungarus_fasciatus_2.jpg/300px-Bungarus_fasciatus_2.jpg | https://en.wikipedia.org/wiki/Banded_krait |
| `malayan-pit-viper` | https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Calloselasma_rhodostoma.jpg/300px-Calloselasma_rhodostoma.jpg | https://en.wikipedia.org/wiki/Malayan_pit_viper |
| `green-pit-viper` | https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Trimeresurus_albolabris.jpg/300px-Trimeresurus_albolabris.jpg | https://en.wikipedia.org/wiki/Trimeresurus_albolabris |
| `russells-viper` | https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Daboia_russelii_russelii2.jpg/300px-Daboia_russelii_russelii2.jpg | https://en.wikipedia.org/wiki/Daboia_siamensis |
| `red-necked-keelback` | https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rhabdophis_subminiatus.jpg/300px-Rhabdophis_subminiatus.jpg | https://en.wikipedia.org/wiki/Rhabdophis_subminiatus |
| `mangrove-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Boiga_dendrophila.jpg/300px-Boiga_dendrophila.jpg | https://en.wikipedia.org/wiki/Boiga_dendrophila |
| `golden-tree-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chrysopelea_ornata_2.jpg/300px-Chrysopelea_ornata_2.jpg | https://en.wikipedia.org/wiki/Chrysopelea_ornata |
| `reticulated-python` | https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/PyRe01.jpg/300px-PyRe01.jpg | https://en.wikipedia.org/wiki/Reticulated_python |
| `burmese-python` | https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Burmese_python.jpg/300px-Burmese_python.jpg | https://en.wikipedia.org/wiki/Burmese_python |
| `rat-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ptyas_mucosa.jpg/300px-Ptyas_mucosa.jpg | https://en.wikipedia.org/wiki/Ptyas_mucosa |
| `indochinese-rat-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ptyas_korros_2.jpg/300px-Ptyas_korros_2.jpg | https://en.wikipedia.org/wiki/Indochinese_rat_snake |
| `copperhead-racer` | https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Coelognathus_radiatus.jpg/300px-Coelognathus_radiatus.jpg | https://en.wikipedia.org/wiki/Coelognathus_radiatus |
| `wolf-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Lycodon_capucinus.jpg/300px-Lycodon_capucinus.jpg | https://en.wikipedia.org/wiki/Lycodon_capucinus |
| `paradise-tree-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Chrysopelea_paradisi.jpg/300px-Chrysopelea_paradisi.jpg | https://en.wikipedia.org/wiki/Chrysopelea_paradisi |
| `red-tailed-racer` | https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gonyosoma_oxycephalum.jpg/300px-Gonyosoma_oxycephalum.jpg | https://en.wikipedia.org/wiki/Gonyosoma_oxycephalum |
| `brahminy-blind-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Indotyphlops_braminus.jpg/300px-Indotyphlops_braminus.jpg | https://en.wikipedia.org/wiki/Indotyphlops_braminus |
| `sunbeam-snake` | https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Xenopeltis_unicolor.jpg/300px-Xenopeltis_unicolor.jpg | https://en.wikipedia.org/wiki/Sunbeam_snake |

---

## First Aid Data (All 20 Species)

### 1. King Cobra 👑
**Severity:** DEADLY — Neurotoxic. World's longest venomous snake (300–550cm)
**Steps:**
1. Call 1669 immediately.
2. Keep victim completely still — movement spreads venom.
3. Remove rings, watches, tight clothing near bite.
4. Keep bitten limb still and BELOW heart level.
5. Get to hospital FAST — antivenom available at Thai hospitals.

**Do NOT:** Cut wound or suck venom | Apply tourniquet or ice | Give alcohol

---

### 2. Monocled Cobra 🐍
**Severity:** DEADLY — Neurotoxic + Cytotoxic. Found in rice paddies, farms, urban areas.
**Steps:**
1. Call 1669 immediately.
2. Apply pressure immobilization bandage if neurological symptoms.
3. Keep still. Remove jewelry.
4. Hospital FAST — antivenom available.

**Do NOT:** Cut or suck wound | Apply tourniquet

---

### 3. Malayan Krait 🖤
**Severity:** DEADLY EMERGENCY — Highly neurotoxic. **BITE IS OFTEN PAINLESS.** Victims bitten while sleeping.
**Steps:**
1. EMERGENCY — Call 1669 NOW.
2. Apply pressure immobilization bandage immediately.
3. Hospital FAST — paralysis develops hours later even without pain.
4. Inform hospital of black & white banded snake.

**Do NOT:** Assume no pain means safe | Wait for symptoms | Delay transport

---

### 4. Banded Krait 🟡
**Severity:** DEADLY EMERGENCY — Neurotoxic. Bright yellow & black equal-width bands.
**Steps:**
1. EMERGENCY — Call 1669 NOW.
2. Apply pressure immobilization bandage immediately.
3. Keep victim still. Remove jewelry.
4. Hospital FAST — antivenom available.

**Do NOT:** Cut or suck wound | Apply tourniquet | Delay — can be fatal within hours

---

### 5. Malayan Pit Viper 🔺
**Severity:** DEADLY — Hemotoxic. **MOST COMMON snakebite in Thailand.** Ambush predator.
**Steps:**
1. Call 1669 immediately.
2. Keep bitten limb still and BELOW heart level.
3. Remove rings and tight clothing near bite.
4. Hospital — severe bleeding may continue for days. Antivenom available.

**Do NOT:** Apply pressure bandage (hemotoxic — restricts blood) | Cut or suck wound | Tourniquet

---

### 6. White-lipped Pit Viper 🟢
**Severity:** VENOMOUS — Hemotoxic. Most common venomous bites in Bangkok.
**Steps:**
1. Call 1669.
2. Keep bitten limb still and BELOW heart level.
3. Remove rings and tight clothing.
4. Hospital for monitoring — antivenom available.

**Do NOT:** Apply tourniquet or ice | Cut or suck wound

---

### 7. Siamese Russell's Viper 💀
**Severity:** DEADLY EMERGENCY — Hemotoxic + kidney damage.
**Steps:**
1. EMERGENCY — Call 1669 NOW.
2. Apply pressure bandage.
3. Keep limb still and below heart.
4. Hospital FAST — severe bleeding AND kidney damage. Antivenom available.

**Do NOT:** Delay — kidney failure can occur | Cut or suck wound | Apply tourniquet

---

### 8. Red-necked Keelback 🔴
**Severity:** VENOMOUS — Hemotoxic (delayed). Often mistaken as harmless.
**Steps:**
1. Call 1669.
2. Hospital immediately — bleeding may be delayed hours or days.
3. Monitor for unusual bruising or bleeding.
4. No commercial antivenom — supportive care at hospital.

**Do NOT:** Assume harmless | Ignore bite — symptoms may be delayed

---

### 9. Mangrove Snake ⬛
**Severity:** MILDLY VENOMOUS — Not dangerous to humans. Black with THIN yellow rings.
**Steps:** Wash bite. Monitor for minor swelling. See doctor if worsens.
**Do NOT:** Confuse with Banded Krait (krait = EQUAL-WIDTH bands, mangrove = thin rings)

---

### 10. Golden Tree Snake 🌟
**Severity:** MILDLY VENOMOUS — Harmless to humans.
**Steps:** Wash bite. Apply antiseptic. Monitor for mild irritation.
**Do NOT:** Panic — not dangerous to humans

---

### 11. Reticulated Python 🐍
**Severity:** NON-VENOMOUS — World's longest snake (up to 650cm). Dangerous constrictor.
**Steps:** If constricting: pour cold water. Unwind from tail — need 2+ people. Wash bite. Stitches if deep. Tetanus check.
**Do NOT:** Handle alone if large | Harm the snake — call 1669

---

### 12. Burmese Python 🟤
**Severity:** NON-VENOMOUS — Large constrictor (250–500cm).
**Steps:** Same as Reticulated Python. Wash bite. Stitches if deep. Tetanus check.
**Do NOT:** Approach large pythons alone

---

### 13. Oriental Rat Snake 🫒
**Severity:** NON-VENOMOUS — Inflates throat when threatened, looks like cobra but harmless.
**Steps:** Wash bite. Apply antiseptic. Tetanus check.
**Do NOT:** Confuse with cobra — rat snake has no hood

---

### 14. Indochinese Rat Snake ⚫
**Severity:** NON-VENOMOUS — Slender, grey-brown, very shy.
**Steps:** Wash bite. Apply antiseptic. Tetanus check.
**Do NOT:** Panic — completely harmless

---

### 15. Copperhead Racer 🟠
**Severity:** NON-VENOMOUS — Copper/reddish-brown head, four black stripes.
**Steps:** Wash bite. Apply antiseptic. Tetanus check.
**Do NOT:** Panic — harmless

---

### 16. Common Wolf Snake 🏠
**Severity:** NON-VENOMOUS — **Often mistaken for Malayan Krait!** Thin irregular bands.
**Steps:** Wash bite. If unsure whether wolf snake or krait: TREAT AS KRAIT EMERGENCY. Call 1669.
**Do NOT:** Assume harmless if unsure | If bands are thick/equal-width → treat as Krait EMERGENCY

---

### 17. Paradise Tree Snake 🌺
**Severity:** HARMLESS — Black with green scale centers, red/yellow markings. Can glide.
**Steps:** Wash bite.
**Do NOT:** Panic — harmless

---

### 18. Red-tailed Racer 🌿
**Severity:** NON-VENOMOUS — Bright green body, reddish-brown tail.
**Steps:** Wash bite. Apply antiseptic. Tetanus check.
**Do NOT:** Confuse with green pit viper — red-tailed racer has round pupils and red-brown tail

---

### 19. Brahminy Blind Snake 🪱
**Severity:** COMPLETELY HARMLESS — Looks like earthworm (10–17cm). Cannot bite.
**Steps:** No treatment needed. All specimens are female.
**Do NOT:** Worry — completely harmless

---

### 20. Sunbeam Snake 🌈
**Severity:** HARMLESS — Dark brown with iridescent rainbow shimmer. Unique in Thailand.
**Steps:** Wash bite.
**Do NOT:** Panic — harmless

---

---

# PART 2 — REGIONS TAB

## UI Structure (Regions Tab)
```
Page title: "Know the risk levels in different areas of Thailand"
---
[ Region Card ]  ← color-coded by risk level
  - Region Name + City examples
  - Risk Badge (High Risk / Medium-High / Medium)
  - Common Species list
  - Peak Season
---
[ Safety Tips Box ] ← yellow background
[ Emergency Box ]   ← red background with 📞 Call 1669 button
```

## Risk Level Color Coding
| Badge | Color | Meaning |
|-------|-------|---------|
| 🔴 High Risk | Red border/background | Most dangerous, multiple deadly species |
| 🟠 Medium-High | Orange border/background | Common venomous species present |
| 🟡 Medium Risk | Orange border/background | Some venomous species |

---

## Region Cards (5 Regions)

### 1. Northern Thailand
| Field | Value |
|-------|-------|
| **Cities** | Chiang Mai, Chiang Rai |
| **Risk Level** | 🔴 High Risk |
| **Common Species** | King Cobra, Green Pit Viper, Banded Krait |
| **Peak Season** | Rainy season (May–Oct) |

---

### 2. Central Thailand
| Field | Value |
|-------|-------|
| **Cities** | Bangkok, Ayutthaya |
| **Risk Level** | 🟠 Medium-High |
| **Common Species** | Monocled Cobra, Russell's Viper, Rat Snakes |
| **Peak Season** | Year-round, peak in wet season |

---

### 3. Northeast Thailand (Isaan)
| Field | Value |
|-------|-------|
| **Cities** | Khon Kaen, Udon Thani, Nakhon Ratchasima |
| **Risk Level** | 🔴 High Risk |
| **Common Species** | Russell's Viper, Banded Krait, Cobras |
| **Peak Season** | Rainy season (May–Oct) |

---

### 4. Southern Thailand
| Field | Value |
|-------|-------|
| **Cities** | Phuket, Krabi |
| **Risk Level** | 🟠 Medium-High |
| **Common Species** | Malayan Pit Viper, King Cobra, Pythons |
| **Peak Season** | Year-round |

---

### 5. Eastern Thailand
| Field | Value |
|-------|-------|
| **Cities** | Pattaya, Rayong |
| **Risk Level** | 🟠 Medium Risk |
| **Common Species** | Cobras, Kraits, Water Snakes |
| **Peak Season** | Rainy season (May–Oct) |

---

## Safety Tips (Built-in to Regions Page)
- Wear boots and long pants when hiking
- Use a flashlight at night
- Watch where you step and reach
- Keep grass and vegetation trimmed around homes
- Contact local snake rescue services if you encounter a snake

---

## Emergency Section (Bottom of Regions Page)
```
🚨 Emergency
    1669
Snake Rescue Thailand · Animal Emergency
[ 📞 Call 1669 Now ]  ← tel:1669 link
```

---

# APPENDIX — Cross-Reference: Species by Region

| Region | Venomous Species Present |
|--------|--------------------------|
| **Northern** | King Cobra, Green Pit Viper, Banded Krait, Malayan Krait |
| **Central** | Monocled Cobra, Russell's Viper, White-lipped Pit Viper, Red-necked Keelback |
| **Northeast** | Russell's Viper, Banded Krait, Malayan Krait, Monocled Cobra |
| **Southern** | Malayan Pit Viper, King Cobra, Mangrove Snake, Golden Tree Snake |
| **Eastern** | Monocled Cobra, Banded Krait, Red-necked Keelback |
| **Nationwide** | Monocled Cobra, Banded Krait, White-lipped Pit Viper, Red-necked Keelback, Wolf Snake |

---

## Emergency Numbers
- **Thai EMS / Snake Rescue:** 1669
- **Queen Saovabha Snake Farm (Antivenom):** 02-252-0161
