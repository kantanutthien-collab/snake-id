import type { DangerLevel } from "@/lib/types";

export type VenomousLabel = "VENOMOUS" | "MILDLY VENOMOUS" | "NON-VENOMOUS";

export interface Species {
  id: string;
  en: string;
  th: string;
  sci: string;
  danger: DangerLevel;
  venomous: VenomousLabel;
  emoji: string;
  region: string;
  photoUrl: string;
  wikiUrl: string;
  /** Local override when iNat candidate has no Thailand observations / was filtered out */
  localPhoto?: string;
}

export const species: Species[] = [
  {
    id: "king-cobra",
    en: "King Cobra",
    th: "งูจงอาง",
    sci: "Ophiophagus hannah",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "👑",
    region: "Throughout Thailand — forested areas",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ophiophagus_hannah_-_King_Cobra.jpg/300px-Ophiophagus_hannah_-_King_Cobra.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/King_cobra",
  },
  {
    id: "monocled-cobra",
    en: "Monocled Cobra",
    th: "งูเห่าหม้อ",
    sci: "Naja kaouthia",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "🐍",
    region: "Throughout Thailand including Bangkok",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Naja_kaouthia_2.jpg/300px-Naja_kaouthia_2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Monocled_cobra",
  },
  {
    id: "malayan-krait",
    en: "Malayan Krait",
    th: "งูสามเหลี่ยมหางแดง",
    sci: "Bungarus candidus",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "🖤",
    region: "Throughout Thailand — central and northeast",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Banded_Krait_2.jpg/300px-Banded_Krait_2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Malayan_krait",
  },
  {
    id: "banded-krait",
    en: "Banded Krait",
    th: "งูสามเหลี่ยม",
    sci: "Bungarus fasciatus",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "🟡",
    region: "Throughout Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bungarus_fasciatus_2.jpg/300px-Bungarus_fasciatus_2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Banded_krait",
  },
  {
    id: "malayan-pit-viper",
    en: "Malayan Pit Viper",
    th: "งูกะปะ",
    sci: "Calloselasma rhodostoma",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "🔺",
    region: "Central, north and east Thailand — NOT deep south",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Calloselasma_rhodostoma.jpg/300px-Calloselasma_rhodostoma.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Malayan_pit_viper",
  },
  {
    id: "white-lipped-pit-viper",
    en: "White-lipped Pit Viper",
    th: "งูเขียวหางไหม้ท้องเหลือง",
    sci: "Trimeresurus albolabris",
    danger: 4,
    venomous: "VENOMOUS",
    emoji: "🟢",
    region: "Throughout Thailand including Bangkok",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Trimeresurus_albolabris.jpg/300px-Trimeresurus_albolabris.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Trimeresurus_albolabris",
  },
  {
    id: "russells-viper",
    en: "Siamese Russell's Viper",
    th: "งูแมวเซา",
    sci: "Daboia siamensis",
    danger: 5,
    venomous: "VENOMOUS",
    emoji: "💀",
    region: "Central, north and east Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Daboia_russelii_russelii2.jpg/300px-Daboia_russelii_russelii2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Daboia_siamensis",
  },
  {
    id: "red-necked-keelback",
    en: "Red-necked Keelback",
    th: "งูลายสาบคอแดง",
    sci: "Rhabdophis subminiatus",
    danger: 3,
    venomous: "VENOMOUS",
    emoji: "🔴",
    region: "Throughout Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rhabdophis_subminiatus.jpg/300px-Rhabdophis_subminiatus.jpg",
    localPhoto: "/snakes/rhabdophis-subminiatus.jpeg",
    wikiUrl: "https://en.wikipedia.org/wiki/Rhabdophis_subminiatus",
  },
  {
    id: "mangrove-snake",
    en: "Mangrove Snake",
    th: "งูปล้องทอง",
    sci: "Boiga dendrophila",
    danger: 2,
    venomous: "MILDLY VENOMOUS",
    emoji: "⬛",
    region: "Southern Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Boiga_dendrophila.jpg/300px-Boiga_dendrophila.jpg",
    localPhoto: "/snakes/boiga-dendrophila.jpeg",
    wikiUrl: "https://en.wikipedia.org/wiki/Boiga_dendrophila",
  },
  {
    id: "golden-tree-snake",
    en: "Golden Tree Snake",
    th: "งูเขียวพระอินทร์",
    sci: "Chrysopelea ornata",
    danger: 2,
    venomous: "MILDLY VENOMOUS",
    emoji: "🌟",
    region: "Throughout Thailand — common in cities",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chrysopelea_ornata_2.jpg/300px-Chrysopelea_ornata_2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Chrysopelea_ornata",
  },
  {
    id: "reticulated-python",
    en: "Reticulated Python",
    th: "งูเหลือม",
    sci: "Malayopython reticulatus",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🐍",
    region: "Throughout Thailand including Bangkok sewers",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/PyRe01.jpg/300px-PyRe01.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Reticulated_python",
  },
  {
    id: "burmese-python",
    en: "Burmese Python",
    th: "งูหลาม",
    sci: "Python bivittatus",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🟤",
    region: "Northern and central Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Burmese_python.jpg/300px-Burmese_python.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Burmese_python",
  },
  {
    id: "rat-snake",
    en: "Oriental Rat Snake",
    th: "งูสิงบ้าน",
    sci: "Ptyas mucosa",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🫒",
    region: "Throughout Thailand — very common",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ptyas_mucosa.jpg/300px-Ptyas_mucosa.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Ptyas_mucosa",
  },
  {
    id: "indochinese-rat-snake",
    en: "Indochinese Rat Snake",
    th: "งูสิง",
    sci: "Ptyas korros",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "⚫",
    region: "Throughout Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ptyas_korros_2.jpg/300px-Ptyas_korros_2.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Indochinese_rat_snake",
  },
  {
    id: "copperhead-racer",
    en: "Copperhead Racer",
    th: "งูทางมะพร้าวลายขีด",
    sci: "Coelognathus radiatus",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🟠",
    region: "Throughout Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Coelognathus_radiatus.jpg/300px-Coelognathus_radiatus.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Coelognathus_radiatus",
  },
  {
    id: "wolf-snake",
    en: "Common Wolf Snake",
    th: "งูปล้องฉนวนบ้าน",
    sci: "Lycodon capucinus",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🏠",
    region: "Throughout Thailand — very common in cities",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Lycodon_capucinus.jpg/300px-Lycodon_capucinus.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Lycodon_capucinus",
  },
  {
    id: "paradise-tree-snake",
    en: "Paradise Tree Snake",
    th: "งูเขียวพระอินทร์ปีกฟ้า",
    sci: "Chrysopelea paradisi",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🌺",
    region: "Southern Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Chrysopelea_paradisi.jpg/300px-Chrysopelea_paradisi.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Chrysopelea_paradisi",
  },
  {
    id: "red-tailed-racer",
    en: "Red-tailed Racer",
    th: "งูเขียวหางแดง",
    sci: "Gonyosoma oxycephalum",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🌿",
    region: "Southern and central Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gonyosoma_oxycephalum.jpg/300px-Gonyosoma_oxycephalum.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Gonyosoma_oxycephalum",
  },
  {
    id: "brahminy-blind-snake",
    en: "Brahminy Blind Snake",
    th: "งูดิน",
    sci: "Indotyphlops braminus",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🪱",
    region: "Throughout Thailand — very common",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Indotyphlops_braminus.jpg/300px-Indotyphlops_braminus.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Indotyphlops_braminus",
  },
  {
    id: "sunbeam-snake",
    en: "Sunbeam Snake",
    th: "งูแสงอาทิตย์",
    sci: "Xenopeltis unicolor",
    danger: 1,
    venomous: "NON-VENOMOUS",
    emoji: "🌈",
    region: "Throughout Thailand",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Xenopeltis_unicolor.jpg/300px-Xenopeltis_unicolor.jpg",
    wikiUrl: "https://en.wikipedia.org/wiki/Sunbeam_snake",
  },
];
