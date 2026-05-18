// Compact data set for the 20 Thailand snakes + non-snake species placeholders.
// Kept tight: only fields the home screen + result card actually use.

const DANGER = {
  1: { label: 'Non-venomous',    short: 'Safe',     tone: '#A8DCB0', bg: 'rgba(168,220,176,0.14)' },
  2: { label: 'Mildly venomous', short: 'Mild',     tone: '#E5D58F', bg: 'rgba(229,213,143,0.14)' },
  3: { label: 'Venomous',        short: 'Venomous', tone: '#F0B377', bg: 'rgba(240,179,119,0.16)' },
  4: { label: 'Dangerous',       short: 'Dangerous',tone: '#F0846B', bg: 'rgba(240,132,107,0.18)' },
  5: { label: 'Deadly',          short: 'DEADLY',   tone: '#F25D5D', bg: 'rgba(242,93,93,0.20)' },
};

const SNAKES = [
  { id: 'king-cobra', en: 'King Cobra', th: 'งูจงอาง', sci: 'Ophiophagus hannah', family: 'Elapidae',
    danger: 5, venom: 'Neurotoxic', size: '300–550 cm',
    swatch: ['#3F4A2E', '#1F2517', '#C9B27A'],
    id_cues: ['Narrow hood (not wide)', 'Pale chevron bands on dark olive body', 'Growl-like hiss'],
    habitat: 'Forests, mangroves, bamboo near streams',
    handle: 'Do not approach. Back away slowly. Call snake catcher.',
    firstaid: 'Call 1669. Stay still. No tourniquet. Hospital fast — antivenom available.' },
  { id: 'monocled-cobra', en: 'Monocled Cobra', th: 'งูเห่าหม้อ', sci: 'Naja kaouthia', family: 'Elapidae',
    danger: 5, venom: 'Neurotoxic + cytotoxic', size: '130–210 cm',
    swatch: ['#5C4A2A', '#2E2517', '#D7C28A'],
    id_cues: ['Wide oval hood', 'Single O-shaped “monocle” on hood', 'Dark stripe under eye'],
    habitat: 'Rice paddies, farms, urban edges',
    handle: 'Keep 3+ meters away. Do not corner. Call rescue.',
    firstaid: 'Call 1669. Pressure bandage. Hospital fast.' },
  { id: 'malayan-krait', en: 'Malayan Krait', th: 'งูสามเหลี่ยมหางแดง', sci: 'Bungarus candidus', family: 'Elapidae',
    danger: 5, venom: 'Highly neurotoxic', size: '90–160 cm',
    swatch: ['#0E0E0E', '#F4F1EA', '#0E0E0E'],
    id_cues: ['Bold black & white bands, equal width', 'Triangular cross-section, ridged spine', 'Glossy scales'],
    habitat: 'Lowland forests, rice fields, often enters homes at night',
    handle: 'Often bites sleepers. Sweep beds. Do not touch.',
    firstaid: 'EMERGENCY. Pressure immobilization. Hospital fast — paralysis develops hours later.' },
  { id: 'malayan-pit-viper', en: 'Malayan Pit Viper', th: 'งูกะปะ', sci: 'Calloselasma rhodostoma', family: 'Viperidae',
    danger: 5, venom: 'Hemotoxic', size: '60–100 cm',
    swatch: ['#B9907A', '#6E3A28', '#3A1C12'],
    id_cues: ['Distinctly triangular head, much wider than neck', 'Pinkish-brown with dark zigzag triangles', 'Heat pit between eye and nostril'],
    habitat: 'Rubber plantations, leaf litter, gardens',
    handle: 'Does not flee — sits motionless. Step around carefully.',
    firstaid: 'Call 1669. Keep limb still below heart. Bleeding for days — hospital now.' },
  { id: 'white-lipped-pit-viper', en: 'White-lipped Pit Viper', th: 'งูเขียวหางไหม้', sci: 'Trimeresurus albolabris', family: 'Viperidae',
    danger: 4, venom: 'Hemotoxic', size: '60–100 cm',
    swatch: ['#4F9F4A', '#F1E9A6', '#9C3A1C'],
    id_cues: ['Bright leaf-green body', 'White/yellow lower lip', 'Rust-coloured tail tip'],
    habitat: 'Trees, gardens, wood piles — common in Bangkok',
    handle: 'Most common venomous bite in BKK. Use a long stick. Call rescue.',
    firstaid: 'Call 1669. Keep still. Hospital monitoring. Antivenom available.' },
  { id: 'red-tailed-racer', en: 'Red-tailed Racer', th: 'งูเขียวหางแดง', sci: 'Gonyosoma oxycephalum', family: 'Colubridae',
    danger: 1, venom: 'None', size: '180–240 cm',
    swatch: ['#4DAE54', '#234A2A', '#8B3A24'],
    id_cues: ['Vivid bright leaf-green', 'Reddish-brown tail', 'Blue-black tongue, black line through eye'],
    habitat: 'Forests, mangroves, high trees',
    handle: 'Non-venomous but bites if cornered. Gently lift with hook.',
    firstaid: 'Wash bite with soap. Tetanus check.' },
];

// Non-snake recognitions — we just name the creature, no detail.
const OTHERS = [
  { id: 'human', label: 'Human', emoji: '人' },
  { id: 'dog',   label: 'Dog',   emoji: '犬' },
  { id: 'cat',   label: 'Cat',   emoji: '猫' },
  { id: 'bird',  label: 'Bird',  emoji: '鳥' },
  { id: 'lizard',label: 'Lizard',emoji: '蜥' },
];

// Recent-scan history shown on home.
const RECENT = [
  { kind: 'snake', ref: 'white-lipped-pit-viper', when: '2 min ago', where: 'Lumpini Park' },
  { kind: 'other', ref: 'dog',                    when: '1 hr ago',  where: 'Soi 11' },
  { kind: 'snake', ref: 'red-tailed-racer',       when: 'Yesterday', where: 'Khao Yai' },
];

Object.assign(window, { DANGER, SNAKES, OTHERS, RECENT });
