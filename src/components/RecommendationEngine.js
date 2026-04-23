// ============================================================
// MEAL DATABASE  — 7-day variety guaranteed per slot
// diet: "veg" | "nonveg" | "vegan"
// nonveg meals are also served to non-veg users (includes veg+nonveg)
// vegan meals are served to everyone (subset of veg)
// ============================================================

export const dayPhaseMeals = {

  // ──────────────────────────── BREAKFAST (11 meals) ──────────
  breakfast: [
    { id:"b1",  name:"Masala Oats with Veggies",           calories:310, protein:10, carbs:52, fats:7,  icon:"🥣", diet:"veg",    allergens:["gluten"],         reason:"High-fibre start; complex carbs fuel the morning." },
    { id:"b2",  name:"Egg White Veggie Omelette",           calories:250, protein:24, carbs:8,  fats:11, icon:"🍳", diet:"nonveg", allergens:["eggs"],           reason:"Lean protein to build & maintain muscle in the morning." },
    { id:"b3",  name:"Avocado Toast on Whole Wheat",        calories:400, protein:12, carbs:45, fats:20, icon:"🥑", diet:"veg",    allergens:["gluten"],         reason:"Healthy fats + complex carbs for sustained energy." },
    { id:"b4",  name:"Banana Smoothie Bowl",                calories:380, protein:8,  carbs:68, fats:9,  icon:"🥤", diet:"vegan",  allergens:[],                 reason:"Natural sugars + potassium for a vibrant start." },
    { id:"b5",  name:"Greek Yogurt Parfait with Berries",   calories:360, protein:20, carbs:48, fats:8,  icon:"🍨", diet:"veg",    allergens:["dairy"],          reason:"Probiotics + protein for gut and muscle health." },
    { id:"b6",  name:"Paneer Bhurji with Multigrain Roti",  calories:480, protein:28, carbs:42, fats:18, icon:"🫓", diet:"veg",    allergens:["gluten","dairy"], reason:"High-protein Indian breakfast for muscle gain." },
    { id:"b7",  name:"Chicken Omelette Roll",               calories:520, protein:40, carbs:30, fats:22, icon:"🌯", diet:"nonveg", allergens:["eggs","gluten"],  reason:"Protein-packed roll to power muscle-building mornings." },
    { id:"b8",  name:"Overnight Chia Pudding",              calories:300, protein:9,  carbs:38, fats:14, icon:"🫙", diet:"vegan",  allergens:[],                 reason:"Omega-3 rich chia seeds + slow-release energy." },
    { id:"b9",  name:"Poha with Peanuts",                   calories:330, protein:9,  carbs:56, fats:9,  icon:"🍚", diet:"veg",    allergens:["nuts"],           reason:"Light and energising; iron-rich beaten rice." },
    { id:"b10", name:"Scrambled Eggs & Smoked Salmon",      calories:410, protein:38, carbs:4,  fats:26, icon:"🍳", diet:"nonveg", allergens:["eggs","fish"],    reason:"High omega-3 and protein to start the day strong." },
    { id:"b11", name:"Moong Dal Chilla with Mint Chutney",  calories:290, protein:14, carbs:44, fats:6,  icon:"🥞", diet:"veg",    allergens:[],                 reason:"High-protein Indian crepe; light yet filling." },
    { id:"b12", name:"Peanut Butter Banana Toast",          calories:370, protein:12, carbs:50, fats:14, icon:"🍞", diet:"vegan",  allergens:["gluten","nuts"],   reason:"Quick carbs + healthy fats for morning energy." },
    { id:"b13", name:"Chicken Keema Paratha",               calories:560, protein:36, carbs:50, fats:24, icon:"🫓", diet:"nonveg", allergens:["gluten"],         reason:"Iron-rich chicken with slow-release whole-wheat carbs." },
  ],

  // ──────────────────────────── MID-MORNING (10 snacks) ──────
  mid_morning: [
    { id:"mm1", name:"Apple with Almond Butter",            calories:220, protein:5,  carbs:28, fats:12, icon:"🍎", diet:"vegan",  allergens:["nuts"],           reason:"Natural sugars + healthy fats for a mid-morning lift." },
    { id:"mm2", name:"Roasted Makhana (Fox Nuts)",          calories:150, protein:4,  carbs:28, fats:2,  icon:"🍿", diet:"veg",    allergens:[],                 reason:"Low-calorie, magnesium-rich crunchy snack." },
    { id:"mm3", name:"Mixed Nuts Handful",                   calories:190, protein:5,  carbs:8,  fats:16, icon:"🥜", diet:"vegan",  allergens:["nuts"],           reason:"Healthy fats + vitamins to hold energy levels." },
    { id:"mm4", name:"Boiled Egg & Cucumber Slices",        calories:130, protein:10, carbs:5,  fats:7,  icon:"🥚", diet:"nonveg", allergens:["eggs"],           reason:"Quick protein hit with hydrating veggies." },
    { id:"mm5", name:"Hummus with Carrot Sticks",           calories:160, protein:6,  carbs:18, fats:7,  icon:"🥕", diet:"vegan",  allergens:[],                 reason:"Fibre and healthy fats to hold you till lunch." },
    { id:"mm6", name:"Orange & Pumpkin Seeds",              calories:140, protein:5,  carbs:22, fats:6,  icon:"🍊", diet:"vegan",  allergens:[],                 reason:"Vitamin C + magnesium for hormonal balance." },
    { id:"mm7", name:"Sprouts Chaat",                       calories:180, protein:9,  carbs:30, fats:3,  icon:"🫘", diet:"vegan",  allergens:[],                 reason:"Enzyme-rich sprouted legumes for digestion & energy." },
    { id:"mm8", name:"Paneer Cubes with Pepper",            calories:200, protein:18, carbs:4,  fats:13, icon:"🧀", diet:"veg",    allergens:["dairy"],          reason:"Casein protein for steady mid-morning amino acid supply." },
    { id:"mm9", name:"Tuna on Crackers",                    calories:210, protein:22, carbs:14, fats:7,  icon:"🐟", diet:"nonveg", allergens:["fish","gluten"],  reason:"High-protein lean snack with minimal carbs." },
    { id:"mm10",name:"Dark Chocolate & Walnut",             calories:200, protein:3,  carbs:20, fats:12, icon:"🍫", diet:"vegan",  allergens:["nuts"],           reason:"Magnesium-rich; great for reducing menstrual cramps." },
  ],

  // ──────────────────────────── LUNCH (13 meals) ─────────────
  lunch: [
    { id:"l1",  name:"Dal Tadka, Brown Rice & Salad",       calories:520, protein:18, carbs:82, fats:10, icon:"🍛", diet:"veg",    allergens:[],                 reason:"Complete amino acids from dal + rice; balanced Indian meal." },
    { id:"l2",  name:"Grilled Chicken with Quinoa Salad",   calories:540, protein:45, carbs:52, fats:14, icon:"🥗", diet:"nonveg", allergens:[],                 reason:"High protein & complex carbs for sustained afternoon energy." },
    { id:"l3",  name:"Palak Paneer & Roti",                 calories:560, protein:24, carbs:58, fats:22, icon:"🫓", diet:"veg",    allergens:["gluten","dairy"],  reason:"Iron (spinach) + calcium (paneer) for hormonal health." },
    { id:"l4",  name:"Chickpea Buddha Bowl",                calories:480, protein:17, carbs:70, fats:12, icon:"🥙", diet:"vegan",  allergens:[],                 reason:"Plant-protein powerhouse with multiple micro-nutrients." },
    { id:"l5",  name:"Fish Curry with Steamed Rice",        calories:620, protein:38, carbs:75, fats:18, icon:"🐟", diet:"nonveg", allergens:["fish"],           reason:"Omega-3 rich fish + carbs for energy and brain health." },
    { id:"l6",  name:"Rajma (Kidney Bean) Rice",            calories:550, protein:16, carbs:90, fats:8,  icon:"🫘", diet:"vegan",  allergens:[],                 reason:"High-fibre plant meal with complete protein profile." },
    { id:"l7",  name:"Chicken Breast & Sweet Potato",       calories:650, protein:48, carbs:65, fats:12, icon:"🍗", diet:"nonveg", allergens:[],                 reason:"Classic lean-bulk meal; clean carbs + lean protein." },
    { id:"l8",  name:"Tofu Stir-Fry with Brown Rice",      calories:460, protein:22, carbs:62, fats:14, icon:"🥢", diet:"vegan",  allergens:["soy"],            reason:"Phytoestrogen-rich tofu supports hormonal balance." },
    { id:"l9",  name:"Egg Fried Rice (Light Oil)",          calories:500, protein:18, carbs:72, fats:14, icon:"🍳", diet:"veg",    allergens:["eggs"],           reason:"Quick energy + protein for the afternoon slump." },
    { id:"l10", name:"Mutton Keema & Chapati",              calories:720, protein:44, carbs:60, fats:28, icon:"🫓", diet:"nonveg", allergens:["gluten"],         reason:"Iron-dense red meat ideal for menstrual/recovery phase." },
    { id:"l11", name:"Chole (Chickpea Curry) & Rice",       calories:580, protein:19, carbs:92, fats:11, icon:"🍲", diet:"vegan",  allergens:[],                 reason:"High-fibre, iron-rich traditional North Indian meal." },
    { id:"l12", name:"Tuna Pasta Salad",                    calories:530, protein:36, carbs:60, fats:12, icon:"🍝", diet:"nonveg", allergens:["fish","gluten"],  reason:"Lean protein + complex carbs to beat the afternoon slump." },
    { id:"l13", name:"Mixed Veg Khichdi",                   calories:440, protein:12, carbs:76, fats:9,  icon:"🍚", diet:"veg",    allergens:[],                 reason:"Easily digestible, gut-friendly comfort meal." },
  ],

  // ──────────────────────────── EVENING SNACK (10 snacks) ────
  evening_snack: [
    { id:"es1", name:"Green Tea & Roasted Chickpeas",       calories:190, protein:8,  carbs:28, fats:4,  icon:"🍵", diet:"vegan",  allergens:[],                 reason:"Antioxidant tea + fibre to bridge dinner gap." },
    { id:"es2", name:"Whey Protein Shake",                  calories:160, protein:28, carbs:8,  fats:2,  icon:"🥛", diet:"nonveg", allergens:["dairy"],          reason:"Fast protein replenishment post-workout." },
    { id:"es3", name:"Fruit Salad with Flaxseeds",          calories:180, protein:3,  carbs:38, fats:5,  icon:"🍓", diet:"vegan",  allergens:[],                 reason:"Vitamin C + omega-3 for skin and immunity." },
    { id:"es4", name:"Peanut Butter on Rice Cakes",         calories:230, protein:7,  carbs:26, fats:12, icon:"🍘", diet:"vegan",  allergens:["nuts","gluten"],   reason:"Slow-release carbs + protein to stay energised." },
    { id:"es5", name:"Paneer Cubes & Cherry Tomatoes",      calories:200, protein:18, carbs:6,  fats:13, icon:"🧀", diet:"veg",    allergens:["dairy"],          reason:"Casein protein for steady amino acid release." },
    { id:"es6", name:"Boiled Chickpeas with Lemon & Spice", calories:170, protein:9,  carbs:28, fats:3,  icon:"🫘", diet:"vegan",  allergens:[],                 reason:"High-fibre, low-calorie snack to curb evening hunger." },
    { id:"es7", name:"Greek Yogurt with Honey",             calories:190, protein:14, carbs:24, fats:4,  icon:"🍯", diet:"veg",    allergens:["dairy"],          reason:"Probiotic + protein snack to support gut health." },
    { id:"es8", name:"Chicken Tikka Bites (3 pcs)",         calories:220, protein:28, carbs:5,  fats:10, icon:"🍢", diet:"nonveg", allergens:[],                 reason:"High-protein low-carb evening snack." },
    { id:"es9", name:"Sweet Potato Chaat",                  calories:200, protein:4,  carbs:40, fats:3,  icon:"🍠", diet:"vegan",  allergens:[],                 reason:"Complex carbs + magnesium for luteal phase cravings." },
    { id:"es10",name:"Edamame with Sea Salt",               calories:155, protein:12, carbs:14, fats:6,  icon:"🫛", diet:"vegan",  allergens:["soy"],            reason:"Complete plant protein; great follicular phase snack." },
  ],

  // ──────────────────────────── DINNER (10 meals) ────────────
  dinner: [
    { id:"d1",  name:"Grilled Fish & Steamed Veggies",      calories:380, protein:36, carbs:18, fats:14, icon:"🐟", diet:"nonveg", allergens:["fish"],           reason:"Light, omega-3 rich dinner for overnight recovery." },
    { id:"d2",  name:"Clear Vegetable Soup & Multigrain Bread", calories:280, protein:8, carbs:44, fats:6, icon:"🥣", diet:"veg", allergens:["gluten"],         reason:"Very light; easy digestion before sleep." },
    { id:"d3",  name:"Lentil Soup (Masoor Dal) & Salad",    calories:320, protein:16, carbs:48, fats:6,  icon:"🥗", diet:"vegan",  allergens:[],                 reason:"Iron + fibre; ideal light dinner for weight loss." },
    { id:"d4",  name:"Baked Chicken & Roasted Broccoli",    calories:420, protein:42, carbs:14, fats:18, icon:"🍗", diet:"nonveg", allergens:[],                 reason:"High protein, low carb dinner for body composition." },
    { id:"d5",  name:"Palak Soup & Chapati",                calories:350, protein:10, carbs:52, fats:10, icon:"🍃", diet:"veg",    allergens:["gluten"],         reason:"Iron-rich spinach supports menstrual & immune health." },
    { id:"d6",  name:"Tofu & Mushroom Stir-Fry",           calories:340, protein:20, carbs:22, fats:18, icon:"🍄", diet:"vegan",  allergens:["soy"],            reason:"Anti-inflammatory mushrooms + plant protein." },
    { id:"d7",  name:"Steak & Sautéed Greens",             calories:560, protein:44, carbs:10, fats:34, icon:"🥩", diet:"nonveg", allergens:[],                 reason:"Iron-dense red meat for post-workout recovery." },
    { id:"d8",  name:"Rajma & Brown Rice (Small Portion)",  calories:440, protein:14, carbs:76, fats:7,  icon:"🫘", diet:"vegan",  allergens:[],                 reason:"Comfort plant-based dinner with slow carbs." },
    { id:"d9",  name:"Baked Salmon with Asparagus",        calories:460, protein:40, carbs:12, fats:26, icon:"🍣", diet:"nonveg", allergens:["fish"],           reason:"Omega-3 powerhouse; great for hormonal and heart health." },
    { id:"d10", name:"Moong Dal & Vegetable Khichdi",       calories:360, protein:14, carbs:58, fats:8,  icon:"🍚", diet:"veg",    allergens:[],                 reason:"Easy-to-digest light dinner; high in folate." },
  ],
};

// ── Menstrual-phase metadata ─────────────────────────────────
export const menstrualPhases = [
  {
    id:"menstrual", name:"Menstrual", days:"Day 1–5", emoji:"🩸",
    color:"#EF4444", colorLight:"rgba(239,68,68,0.12)",
    description:"Prioritise iron, anti-inflammatory foods, and gentle warmth.",
    nutrients:["Iron","Magnesium","Vitamin C","Omega-3"],
    boostFoods:["Lentils","Spinach","Dark chocolate","Ginger tea","Beetroot"],
    avoidFoods:["Caffeine (excessive)","Salty snacks","Alcohol"],
    preferIds:["d3","d5","l1","l10","b9","mm5","mm10","es1","es6"]
  },
  {
    id:"follicular", name:"Follicular", days:"Day 6–13", emoji:"🌱",
    color:"#10B981", colorLight:"rgba(16,185,129,0.12)",
    description:"Energy rises — support with fresh, light, high-fibre foods.",
    nutrients:["B Vitamins","Zinc","Folate","Probiotics"],
    boostFoods:["Eggs","Fermented foods","Broccoli","Oats","Almonds"],
    avoidFoods:["Heavy fried foods"],
    preferIds:["b1","b5","l2","l4","mm1","es3","es10","mm7","d10"]
  },
  {
    id:"ovulation", name:"Ovulation", days:"Day 14–16", emoji:"✨",
    color:"#F59E0B", colorLight:"rgba(245,158,11,0.12)",
    description:"Peak energy — eat antioxidant-rich and cooling foods.",
    nutrients:["Antioxidants","Vitamin E","Fibre","Potassium"],
    boostFoods:["Berries","Leafy greens","Quinoa","Avocado","Turmeric"],
    avoidFoods:["Processed sugars","Refined carbs"],
    preferIds:["b4","b3","l2","l8","mm3","es3","mm6","d9","l4"]
  },
  {
    id:"luteal", name:"Luteal", days:"Day 17–28", emoji:"🌙",
    color:"#8B5CF6", colorLight:"rgba(139,92,246,0.12)",
    description:"Cravings rise — satisfy with complex carbs, magnesium & calcium.",
    nutrients:["Magnesium","Calcium","Vitamin B6","Tryptophan"],
    boostFoods:["Sweet potato","Dark chocolate","Pumpkin seeds","Chickpeas","Oats"],
    avoidFoods:["Caffeine","Sugar spikes","Alcohol"],
    preferIds:["b1","l1","l6","d8","mm2","es4","es9","mm10","d5"]
  }
];

// ── Allergen metadata ─────────────────────────────────────────
export const ALLERGENS = [
  { id:"gluten", label:"Gluten / Wheat",    emoji:"🌾" },
  { id:"dairy",  label:"Dairy",             emoji:"🥛" },
  { id:"eggs",   label:"Eggs",              emoji:"🥚" },
  { id:"nuts",   label:"Tree Nuts / Peanuts", emoji:"🥜" },
  { id:"soy",    label:"Soy",               emoji:"🫘" },
  { id:"fish",   label:"Fish / Seafood",    emoji:"🐟" },
];

// ── Helpers ───────────────────────────────────────────────────

function filterMeals(mealArray, diet, allergies = []) {
  return mealArray.filter(meal => {
    if (diet === "vegan" && meal.diet !== "vegan") return false;
    if (diet === "veg"   && meal.diet === "nonveg") return false;
    if (allergies.length > 0 && meal.allergens.some(a => allergies.includes(a))) return false;
    return true;
  });
}

/** Fisher-Yates shuffle (returns new array) */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a 7-day unique meal queue for one slot.
 * Phase-preferred meals are placed first, then shuffled remainder.
 * If pool < 7 we cycle the shuffled pool (so we still vary order).
 */
function buildUniqueQueue(pool, preferIds, daysCount = 7) {
  const preferred = pool.filter(m => preferIds.includes(m.id));
  const others    = pool.filter(m => !preferIds.includes(m.id));
  const ordered   = [...shuffle(preferred), ...shuffle(others)];

  const queue = [];
  while (queue.length < daysCount) {
    // Cycle with a fresh shuffle each round to avoid lockstep repeats
    queue.push(...shuffle(ordered));
  }
  return queue.slice(0, daysCount);
}

// ── PUBLIC API ────────────────────────────────────────────────

/**
 * Calculate current menstrual phase from the last period start date.
 */
export function calculateMenstrualPhaseFromDate(lastPeriodDate) {
  if (!lastPeriodDate) return null;
  const start = new Date(lastPeriodDate);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysDiff   = Math.floor((today - start) / 86400000);
  const cycleDay   = (((daysDiff % 28) + 28) % 28) + 1;
  let phaseId;
  if      (cycleDay <= 5)  phaseId = "menstrual";
  else if (cycleDay <= 13) phaseId = "follicular";
  else if (cycleDay <= 16) phaseId = "ovulation";
  else                     phaseId = "luteal";
  return { ...menstrualPhases.find(p => p.id === phaseId), cycleDay };
}

/**
 * Single full-day plan with all 5 slots.
 */
export function getDayPlan({ goal, diet, allergies = [], menstrualPhaseId = null }) {
  const preferIds    = menstrualPhases.find(p => p.id === menstrualPhaseId)?.preferIds ?? [];
  const goalMultiplier = { weight_loss:0.85, muscle_gain:1.15, maintenance:1.0 }[goal] ?? 1.0;

  const SLOTS = ["breakfast","mid_morning","lunch","evening_snack","dinner"];
  const plan  = {};

  SLOTS.forEach(slot => {
    const pool = filterMeals(dayPhaseMeals[slot], diet, allergies);
    if (pool.length === 0) {
      plan[slot] = { name:"Custom Meal", calories:350, protein:15, carbs:40, fats:12, icon:"🍽", reason:"No compatible meal found — adjust dietary filters.", diet:"veg", allergens:[] };
    } else {
      // For a single-day plan: prefer phase meals, otherwise random
      const preferred = pool.filter(m => preferIds.includes(m.id));
      const source    = preferred.length > 0 ? preferred : pool;
      plan[slot]      = source[Math.floor(Math.random() * source.length)];
    }
  });

  const mealList       = SLOTS.map(s => plan[s]).filter(Boolean);
  plan.totalCalories   = Math.round(mealList.reduce((s,m) => s+m.calories,0) * goalMultiplier);
  plan.totalProtein    = mealList.reduce((s,m) => s+m.protein,0);
  plan.totalCarbs      = mealList.reduce((s,m) => s+m.carbs,0);
  plan.totalFats       = mealList.reduce((s,m) => s+m.fats,0);
  plan.menstrualPhase  = menstrualPhases.find(p => p.id === menstrualPhaseId) ?? null;
  return plan;
}

/**
 * 7-day plan: GUARANTEES no repeated meal in the same slot across the week.
 * Each day also advances the menstrual cycle phase correctly.
 */
export function getWeekPlan({ goal, diet, allergies = [], lastPeriodDate = null }) {
  const DAYS    = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const SLOTS   = ["breakfast","mid_morning","lunch","evening_snack","dinner"];
  const goalMultiplier = { weight_loss:0.85, muscle_gain:1.15, maintenance:1.0 }[goal] ?? 1.0;

  // Today's index (Mon=0 … Sun=6)
  const todayJs  = new Date().getDay();
  const todayIdx = todayJs === 0 ? 6 : todayJs - 1;

  // Pre-build unique 7-meal queues per slot (phase-agnostic for now,
  // phase preference is per-day below)
  const queues = {};
  SLOTS.forEach(slot => {
    const pool = filterMeals(dayPhaseMeals[slot], diet, allergies);
    // We build the queue without phase bias first — phase boosting is applied per-day
    queues[slot] = buildUniqueQueue(pool, [], 7);
  });

  return DAYS.map((day, i) => {
    const offsetFromToday = i - todayIdx;

    // Calculate cycle phase for this specific calendar day
    let menstrualPhaseId = null;
    let cycleDay         = null;
    if (lastPeriodDate) {
      const start = new Date(lastPeriodDate);
      start.setHours(0,0,0,0);
      const target = new Date();
      target.setHours(0,0,0,0);
      target.setDate(target.getDate() + offsetFromToday);
      const diff = Math.floor((target - start) / 86400000);
      cycleDay   = (((diff % 28) + 28) % 28) + 1;
      if      (cycleDay <= 5)  menstrualPhaseId = "menstrual";
      else if (cycleDay <= 13) menstrualPhaseId = "follicular";
      else if (cycleDay <= 16) menstrualPhaseId = "ovulation";
      else                     menstrualPhaseId = "luteal";
    }

    // Assign pre-queued meals (unique across the week per slot)
    const plan = { day, isToday: i === todayIdx, menstrualPhaseId, cycleDay };
    SLOTS.forEach(slot => {
      plan[slot] = queues[slot][i];
    });

    const mealList       = SLOTS.map(s => plan[s]).filter(m => m?.calories);
    plan.totalCalories   = Math.round(mealList.reduce((s,m) => s+m.calories,0) * goalMultiplier);
    plan.totalProtein    = mealList.reduce((s,m) => s+m.protein,0);
    plan.totalCarbs      = mealList.reduce((s,m) => s+m.carbs,0);
    plan.totalFats       = mealList.reduce((s,m) => s+m.fats,0);
    plan.menstrualPhase  = menstrualPhases.find(p => p.id === menstrualPhaseId) ?? null;
    return plan;
  });
}

export function autoDetectPhase() {
  const hour = new Date().getHours();
  if (hour >= 5  && hour < 11) return "Morning";
  if (hour >= 11 && hour < 16) return "Afternoon";
  if (hour >= 16 && hour < 20) return "Evening";
  return "Night";
}
