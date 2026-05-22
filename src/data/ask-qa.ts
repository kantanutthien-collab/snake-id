export interface QAEntry {
  id: string;
  triggers: string[];
  answer: string;
}

export interface Suggestion {
  emoji: string;
  label: string;
}

export const askSuggestions: Suggestion[] = [
  { emoji: "🆘", label: "Friend got bitten" },
  { emoji: "🏠", label: "Snake in my house" },
  { emoji: "📞", label: "Emergency number" },
];

export const askWelcome = `Hi! 🌿 I'm your snake and forest safety helper.
You can ask me anything like:

• "What do I do if my friend got bitten?"
• "I found a snake in my house"
• "What number do I call?"`;

export const askDefault = `🤔 I'm not sure about that one. Try asking about:
• Snake bites and first aid
• Specific snakes (Cobra, Krait, Python)
• Safe berries and plants
• Emergency numbers
• Forest safety tips

Or call 1669 for immediate snake emergencies in Thailand.`;

export const askQa: QAEntry[] = [
  {
    id: "snakebite-first-aid",
    triggers: ["bitten", "bite", "attacked", "struck"],
    answer: `🚨 Call 1669 immediately — that is the snake rescue emergency number in Thailand.

✅ While waiting:
• Keep the person calm and completely still
• Lay them down and keep the bitten arm or leg below heart level
• Remove rings, watches, or tight clothing near the bite
• Do NOT let them walk or run

❌ Never cut the wound, suck the venom, or apply a tourniquet — these make things worse.`,
  },
  {
    id: "emergency-number",
    triggers: ["emergency", "number", "call", "phone", "1669"],
    answer: `📞 The emergency number in Thailand is 1669.

This is the Snake Rescue Thailand line — they handle snake bites, dangerous animals, and wildlife emergencies. Save it in your phone now!

For general emergencies you can also call 191 (police) or 1554 (ambulance).`,
  },
  {
    id: "snake-in-house",
    triggers: ["house", "home", "room", "bedroom", "inside"],
    answer: `🏠 Stay calm and do NOT approach it.

✅ What to do:
• Back away slowly to at least 2 metres distance
• Keep children and pets away from the area
• Do not try to catch, hit, or move the snake yourself
• Call 1669 for professional snake removal

❌ Never corner a snake — a cornered snake will strike.`,
  },
  {
    id: "do-not-touch",
    triggers: ["touch", "pick up", "grab", "catch", "handle"],
    answer: `⚠️ Never touch or pick up a snake — even a dead one can still bite as a reflex!

You cannot tell if a snake is dangerous just by looking at it. Even non-venomous snakes bite and can cause infection.

Always call 1669 and let a professional handle it.`,
  },
  {
    id: "king-cobra",
    triggers: ["king cobra", "งูจงอาง", "king"],
    answer: `👑 King Cobra (งูจงอาง):

The world's longest venomous snake — can grow up to 5 metres. Found in forests across Thailand.

⚠️ Venom type: Neurotoxic, very large volume
🚨 Danger level: CRITICAL — respiratory failure can occur within 30 minutes

First aid: Call 1669, lay victim completely flat, monitor breathing, begin CPR if breathing stops.`,
  },
  {
    id: "monocled-cobra",
    triggers: ["cobra", "monocled", "งูเห่า"],
    answer: `🐍 Monocled Cobra (งูเห่า):

One of the most common venomous snakes in Thailand — found everywhere including cities and homes.

⚠️ Venom type: Neurotoxic + Cytotoxic (attacks nerves AND tissue)
🚨 Danger level: CRITICAL

First aid: Call 1669, keep victim completely still, immobilize the limb at or below heart level. Get to hospital with antivenom immediately.`,
  },
  {
    id: "banded-krait",
    triggers: ["krait", "banded", "painless", "no pain"],
    answer: `⚠️ Banded Krait bites are VERY deceptive!

The bite is often completely painless — the person may feel totally fine. But the venom is extremely dangerous and symptoms can take 1–6 hours to appear.

🚨 Even if there is NO pain — go to hospital immediately. Do not wait for symptoms. Tell the doctors it may be a Krait as it requires specific antivenom.`,
  },
  {
    id: "python",
    triggers: ["python", "constrictor", "squeezing", "wrapping", "งูเหลือม"],
    answer: `🐍 Reticulated Python (งูเหลือม):

Non-venomous but kills by constriction — squeezing until the prey cannot breathe.

If it is wrapping around someone:
• Call 1669 — you need multiple people
• Pour cold water over the snake to encourage release
• Unwind from the TAIL end — never pull the head
• Do not try to do this alone with a large python

After release: clean all bite wounds (pythons carry bacteria).`,
  },
  {
    id: "dangerous-snakes",
    triggers: ["dangerous", "venomous", "deadly", "kill", "common snake"],
    answer: `🐍 Common venomous snakes in Thailand:

⚠️ Most dangerous:
• Monocled Cobra (งูเห่า) — found everywhere
• King Cobra (งูจงอาง) — forests nationwide
• Banded Krait (งูสามเหลี่ยม) — nocturnal, painless bite!
• Russell's Viper (งูแมวเซา) — northeast Thailand
• Green Pit Viper (งูเขียวหางไหม้) — hides in trees

If you see any snake you don't recognise, treat it as venomous and call 1669.`,
  },
  {
    id: "safe-snakes",
    triggers: ["safe snake", "harmless", "not dangerous", "non-venomous"],
    answer: `✅ Common non-venomous snakes in Thailand:

• Reticulated Python (งูเหลือม) — large but no venom; dangerous by squeezing
• Oriental Rat Snake (งูลาว) — very common, helpful rodent hunter
• Wolf Snake (งูพังพวย) — looks like Banded Krait, be careful!
• Rainbow Water Snake (งูน้ำ) — found near water

Even non-venomous snakes can bite and cause infection — always wash wounds with soap and see a doctor.`,
  },
  {
    id: "first-aid-steps",
    triggers: ["first aid", "what to do", "help", "treat"],
    answer: `🩹 Snake bite first aid:

1. Call 1669 immediately
2. Keep victim calm and completely still
3. Remove tight items near the bite (rings, watches)
4. Keep the bitten limb below heart level
5. Get to hospital as fast as possible

❌ NEVER:
• Cut or suck the wound
• Apply tourniquet or ice
• Give alcohol or painkillers
• Let the person walk or run`,
  },
  {
    id: "berry-safety",
    triggers: ["berry", "fruit", "eat", "safe to eat", "plant food"],
    answer: `🍓 Safe wild fruits common in Thailand:

✅ Wild Banana, Wild Mango, Wild Passion Fruit (wrinkled skin = ripe), Wild Rambutan (red spiky), Wild Jackfruit

⚠️ Cook first: Bamboo Shoots, Fern Fronds

❌ NEVER eat:
• Lantana berries (shiny dark clusters)
• Datura pods (spiky balls)
• Yellow Oleander fruits
• Any berry you are not 100% sure about

When in doubt — do not eat it. Check the Berry List tab for photos.`,
  },
  {
    id: "ate-poison",
    triggers: ["ate", "swallowed", "poisoned", "plant poison", "toxic plant"],
    answer: `🚨 If someone ate a poisonous plant or berry:

1. Call 1669 immediately — do not wait for symptoms
2. Try to remember or photograph what was eaten
3. Keep the person calm and still
4. Do NOT make them vomit unless told to by a doctor

Time is critical — many plant toxins act fast. Go to hospital right away even if they feel fine.`,
  },
  {
    id: "forest-safety",
    triggers: ["forest", "jungle", "hiking", "safe", "protect", "boots"],
    answer: `🌳 Staying safe in forests and long grass:

✅ Always wear:
• Knee-high boots or thick closed shoes
• Long pants — tucked into boots if possible

✅ Always carry:
• A flashlight at night — snakes are more active after dark
• A stick to probe ahead in long grass

⚠️ Watch out for:
• Piles of leaves and logs (common hiding spots)
• Tree branches at eye level (Green Pit Viper hides there)
• Water edges at night`,
  },
  {
    id: "rainy-season",
    triggers: ["rain", "rainy", "season", "flood", "monsoon"],
    answer: `🌧️ Snakes are most active during the rainy season (May–October) in Thailand.

Rain floods their burrows and pushes them into houses, roads, and farms. Banded Krait and other snakes are also more active at night.

Be extra careful:
• Walking outside at night during rainy season
• Reaching into dark spaces or bushes
• Near flooded fields or riverbanks`,
  },
];

export function matchAnswer(input: string): string {
  const text = input.toLowerCase().trim();
  if (!text) return askDefault;
  for (const qa of askQa) {
    if (qa.triggers.some((t) => text.includes(t.toLowerCase()))) {
      return qa.answer;
    }
  }
  return askDefault;
}
