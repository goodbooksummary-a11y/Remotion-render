/**
 * visual-intent.js — Visual Intent & Semantic Relevance Engine (Antidote 6.1)
 *
 * Closes the semantic dissonance / "illustrated radio" gap:
 * Connects the spoken philosophical or narrative idea to the world and objects on screen.
 *
 * Core components:
 * 1. extractVisualClaim: extracts core conceptual assertions & metaphors from narration.
 * 2. scoreSemanticRelevance: scores scene candidate alignment (0–10).
 * 3. enforceSemanticRelevance: guarantees zero anachronisms, thematic continuity, and
 *    mandatory conceptual motifs for foundational book passages.
 */

const PHILOSOPHICAL_WORLDS = {
  ringOfGyges: {
    id: "ringOfGyges",
    name: "The Ring of Gyges",
    set: "colonnade",
    defaultShot: "illustration",
    states: [
      {
        index: 0,
        phase: "discovery_artifact",
        claim: "The shepherd discovers a mysterious golden signet ring in a chasm",
        visualMode: "metaphor",
        shot: "insert",
        re: /\b(discovered a ring|found a ring|shepherd'?s ring|golden ring|chasm|bronze horse)\b/i,
      },
      {
        index: 1,
        phase: "inward_turn_vanish",
        claim: "Turning the collet inward grants total invisible impunity",
        visualMode: "transformation",
        shot: "illustration",
        re: /\b(turned (the )?(collet|ring) inward|invisib(le|ility)|unseen|vanish(ed|ing)?|nobody (can )?see)\b/i,
      },
      {
        index: 2,
        phase: "moral_bifurcation",
        claim: "Glaucon's challenge: Would any man remain moral if actions had zero consequences?",
        visualMode: "character_drama",
        shot: "split",
        re: /\b(glaucon'?s challenge|remain just|moral choice|social contract|would you steal|impunity|reputation)\b/i,
      },
      {
        index: 3,
        phase: "tyrant_vs_martyr",
        claim: "The ultimate test: The unjust man praised and crowned vs the just man tortured and despised",
        visualMode: "comparison_split",
        shot: "beforeAfter",
        re: /\b(unjust man|just man|praised and crowned|crucified|scourged|justice for its own sake)\b/i,
      },
    ],
  },

  caveAllegory: {
    id: "caveAllegory",
    name: "The Allegory of the Cave",
    set: "cave",
    defaultShot: "insert",
    states: [
      {
        index: 0,
        phase: "shadows_on_wall",
        claim: "Chained prisoners from childhood mistake cast shadows for absolute reality",
        visualMode: "spatial_state",
        shot: "insert",
        re: /\b(shadows? on the wall|cave wall|shackled|prisoners? in the cave|cannot turn their heads|illusion)\b/i,
      },
      {
        index: 1,
        phase: "puppeteers_fire",
        claim: "Behind the screen, puppet-masters carry statues before a blazing artificial fire",
        visualMode: "causal_diagram",
        shot: "illustration",
        re: /\b(fire behind|blazing fire|puppet-?masters?|artifacts? carried|parapet|firelight)\b/i,
      },
      {
        index: 2,
        phase: "broken_chains_ascent",
        claim: "Release and turning around: The painful blinding shock of facing the light",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(broken chains|turn around|stand up|pain in the eyes|dragged upward|steep ascent|rough path|fight the person dragging|turn back to the (comforting )?darkness|painful)\b/i,
      },
      {
        index: 3,
        phase: "blinding_sunlight_good",
        claim: "Emerging into the blinding daylight: The Sun representing the Form of the Good",
        visualMode: "transformation",
        shot: "wide",
        re: /\b(sunlight|the sun represents the good|source of all truth|form of the good|true knowledge|outside the cave)\b/i,
      },
    ],
  },

  tripartiteSoul: {
    id: "tripartiteSoul",
    name: "The Tripartite Soul",
    set: "colonnade",
    defaultShot: "illustration",
    states: [
      {
        index: 0,
        phase: "triad_hierarchy",
        claim: "The architecture of the soul: Rational Charioteer, Spirited Steed, and Appetite Beast",
        visualMode: "causal_diagram",
        shot: "illustration",
        re: /\b(tripartite soul|three parts of the soul|logistikon|charioteer|two horses|internal structure of the soul)\b/i,
      },
      {
        index: 1,
        phase: "appetite_mutiny",
        claim: "When appetite expands without limit, insatiable desire mutinies against reason",
        visualMode: "character_drama",
        shot: "closeUp",
        re: /\b(appetite|infinite appetite|desires mutiny|stress eat|addiction|bodily urges|craving|appetitive)\b/i,
      },
      {
        index: 2,
        phase: "spirited_indignation",
        claim: "The spirited element (thumos) allies with reason in indignation against debased urges",
        visualMode: "transformation",
        shot: "medium",
        re: /\b(thumos|spirited (part|element)|anger at oneself|leontius|corpses|honor|indignation)\b/i,
      },
      {
        index: 3,
        phase: "rational_harmony",
        claim: "Inner harmony: Reason holds the reins, establishing internal peace and justice",
        visualMode: "metaphor",
        shot: "insert",
        re: /\b(inner harmony|balance the soul|reason holds the reins|peace within|justice in the soul)\b/i,
      },
    ],
  },

  shipOfState: {
    id: "shipOfState",
    name: "The Ship of State",
    set: "shipDeck",
    defaultShot: "insert",
    states: [
      {
        index: 0,
        phase: "quarreling_crew",
        claim: "The ship of state: Quarrelsome sailors competing for control without navigational science",
        visualMode: "character_drama",
        shot: "twoShot",
        re: /\b(picture a ship|the ship'?s? owner|sailors quarreling|quarreling over the helm|no knowledge of navigation)\b/i,
      },
      {
        index: 1,
        phase: "mutiny_at_helm",
        claim: "Populist mutiny: Drugging the true captain, feasting, and sailing aimlessly",
        visualMode: "transformation",
        shot: "insert",
        re: /\b(mutiny|mutinous|swarm the helm|feast and drink|drugging the captain|pure manipulation|politicians)\b/i,
      },
      {
        index: 2,
        phase: "isolated_stargazer",
        claim: "The true navigator: Ignored as a useless stargazer while he studies the cosmic constellations",
        visualMode: "metaphor",
        shot: "medium",
        re: /\b(true navigator|true pilot|stargazer|star-gazer|useless babbler|philosopher ignored|seasons and stars)\b/i,
      },
    ],
  },

  fiveRegimes: {
    id: "fiveRegimes",
    name: "The Five Regimes of Political Decay",
    set: "colonnade",
    defaultShot: "insert",
    states: [
      {
        index: 0,
        phase: "aristocracy_gold",
        claim: "Aristocracy: The rule of wisdom, justice, and the philosopher-kings",
        visualMode: "metaphor",
        shot: "insert",
        re: /\b(aristocracy|rule of the best|rule of wisdom|philosopher kings rule)\b/i,
      },
      {
        index: 1,
        phase: "timocracy_spartan_spear",
        claim: "Timocracy: When honor and militarism replace wisdom (The Spartan model)",
        visualMode: "transformation",
        shot: "illustration",
        re: /\b(timocracy|military society|spartan model|love of honor|honor replaces wisdom|warrior caste rules)\b/i,
      },
      {
        index: 2,
        phase: "oligarchy_gold_scales",
        claim: "Oligarchy: The rule of wealth and greed, where property measures civic virtue",
        visualMode: "transformation",
        shot: "illustration",
        re: /\b(oligarchy|rule of the rich|appetite for wealth|greed|money measures all|property qualification)\b/i,
      },
      {
        index: 3,
        phase: "democracy_anarchic_freedom",
        claim: "Democracy: Freedom without discipline, treating unequals as equal, breeding licentious anarchy",
        visualMode: "character_drama",
        shot: "wide",
        re: /\b(democracy|freedom loses (its )?discipline|equality of unequals|anarchy|license|disregard of law)\b/i,
      },
      {
        index: 4,
        phase: "tyranny_iron_cage",
        claim: "Tyranny: The chaotic mob invites a strongman champion, who becomes an enslaved monster of fear",
        visualMode: "transformation",
        shot: "insert",
        re: /\b(tyranny|tyrant|dictator|strongman|champion becomes a beast|enslaved by his own appetites|paranoia)\b/i,
      },
    ],
  },

  kallipolis: {
    id: "kallipolis",
    name: "Kallipolis: The Ideal Republic",
    set: "agora",
    defaultShot: "illustration",
    states: [
      {
        index: 0,
        phase: "city_in_speech",
        claim: "Kallipolis: The utopian city in speech, an eternal pattern laid up in heaven",
        visualMode: "spatial_state",
        shot: "wide",
        re: /\b(utopian city|city in speech|city in the heavens|kallipolis|ideal republic|pattern in heaven)\b/i,
      },
      {
        index: 1,
        phase: "noble_lie_metals",
        claim: "The Myth of the Metals: A sacred foundation myth justifying societal specialization",
        visualMode: "causal_diagram",
        shot: "illustration",
        re: /\b(noble lie|myth of the metals|gold silver bronze|three classes of the (state|city))\b/i,
      },
      {
        index: 2,
        phase: "philosopher_kings",
        claim: "The paradoxical remedy: Until philosophers become kings, humanity will have no cessation of evils",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(philosopher king(s)?|philosopher ruler(s)?|lovers of wisdom|reluctant rulers|acropolis)\b/i,
      },
      {
        index: 3,
        phase: "radical_clean_slate",
        claim: "The clean slate of Kallipolis: Banishing elders to rear children in philosophical justice",
        visualMode: "spatial_state",
        shot: "wide",
        re: /\b(banish everyone|clean slate|rip the children|re-educate|total isolation|new rule|countryside)\b/i,
      },
    ],
  },

  thirtyTyrants: {
    id: "thirtyTyrants",
    name: "The Thirty Tyrants Coup (404 BC)",
    set: "agora",
    defaultShot: "insert",
    states: [
      {
        index: 0,
        phase: "democratic_ballot_fall",
        claim: "Athens conquered: The collapse of democracy after the Spartan defeat",
        visualMode: "literal",
        shot: "wide",
        re: /\b(athenian democracy|peloponnesian war|athens fell|democracy overthrown)\b/i,
      },
      {
        index: 1,
        phase: "spartan_purge_junta",
        claim: "The 404 BC Spartan-backed Thirty Tyrants terror junta purges Athenian citizens",
        visualMode: "transformation",
        shot: "insert",
        re: /\b(thirty tyrants|tyrants|coup|404\s*bc|30-?man\s*jun[ta]+|junta|bloody purge|critias|terror regime)\b/i,
      },
      {
        index: 2,
        phase: "socratic_defiance",
        claim: "Socrates stands alone, refusing the illegal commands of the murderous oligarchs",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(socrates defied|refused to obey|leon of salamis|stand against the tyrants)\b/i,
      },
    ],
  },

  mythOfEr: {
    id: "mythOfEr",
    name: "The Myth of Er & Cosmic Necessity",
    set: "manuscript",
    defaultShot: "insert",
    states: [
      {
        index: 0,
        phase: "awakening_on_pyre",
        claim: "Er the warrior returns from death on the funeral pyre to bear witness to cosmic justice",
        visualMode: "literal",
        shot: "medium",
        re: /\b(soldier named er|funeral pyre|wakes up|reports back|returned from the dead)\b/i,
      },
      {
        index: 1,
        phase: "spindle_of_necessity",
        claim: "The celestial Spindle of Necessity turning the concentric whorls of planetary harmony",
        visualMode: "metaphor",
        shot: "insert",
        re: /\b(spindle of necessity|ananke|planetary whorls|celestial|harmony of the spheres|sirens singing)\b/i,
      },
      {
        index: 2,
        phase: "choice_of_destiny",
        claim: "The choice of future lives: The soul itself is responsible for its virtue; God is blameless",
        visualMode: "character_drama",
        shot: "illustration",
        re: /\b(choice of lives|lots of souls|fates|god is blameless|virtue without philosophy|reincarnation)\b/i,
      },
    ],
  },

  thrasymachusDebate: {
    id: "thrasymachusDebate",
    name: "Thrasymachus and the Sophists",
    set: "agora",
    defaultShot: "medium",
    states: [
      {
        index: 0,
        phase: "might_makes_right",
        claim: "Thrasymachus's Challenge: Justice is nothing other than the advantage of the stronger party",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(thrasymachus|advantage of the stronger|might makes right|stronger party|rules are made by the rulers|sweating profuse)\b/i,
      },
      {
        index: 1,
        phase: "sophist_mercenaries",
        claim: "Sophists as mercenaries of persuasion: Teaching victory in law courts over objective truth",
        visualMode: "character_drama",
        shot: "overShoulder",
        re: /\b(sophist|mercenary of persuasion|win in the law courts|objective truth doesn'?t (really )?matter|all about winning|paid mercenary)\b/i,
      },
      {
        index: 2,
        phase: "cynical_realism",
        claim: "Cynical realism: The powerful define legality while the weak suffer subjugation",
        visualMode: "comparison_split",
        shot: "split",
        re: /\b(cynical realism|shieldmaking business|steal his.*business|justice is a scam|unjust man is happier)\b/i,
      },
    ],
  },

  historicalAthens: {
    id: "historicalAthens",
    name: "Historical Athens and the Socratic Crisis",
    set: "agora",
    defaultShot: "twoShot",
    states: [
      {
        index: 0,
        phase: "thirty_tyrants",
        claim: "The Thirty Tyrants: Oligarchic terror, confiscation, and relatives transforming into monsters",
        visualMode: "character_drama",
        shot: "twoShot",
        re: /\b(thirty tyrants|seventh letter|his relatives|transform into literal monsters|oligarchy of terror)\b/i,
      },
      {
        index: 1,
        phase: "socratic_resistance",
        claim: "Socrates's moral defiance: Refusing the illegal arrest of Leon of Salamis",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(leon of salamis|illegal arrest|socrates refuses|defiance|stand up to the tyrants|young idealist)\b/i,
      },
      {
        index: 2,
        phase: "trial_and_martyrdom",
        claim: "The democratic restoration executes Socrates: Philosophy on trial in the Athenian assembly",
        visualMode: "character_drama",
        shot: "illustration",
        re: /\b(trial of socrates|hemlock|condemned to death|democratic mob|executed socrates|gadfly)\b/i,
      },
    ],
  },

  cardinalVirtues: {
    id: "cardinalVirtues",
    name: "The Four Cardinal Virtues",
    set: "colonnade",
    defaultShot: "illustration",
    states: [
      {
        index: 0,
        phase: "four_virtues_triad",
        claim: "The Four Cardinal Virtues: Wisdom in rulers, Courage in guardians, Moderation across all classes",
        visualMode: "causal_diagram",
        shot: "illustration",
        re: /\b(four virtues|cardinal virtues|wisdom.*courage|temperance|moderation|guardians.*courage)\b/i,
      },
      {
        index: 1,
        phase: "justice_as_harmony",
        claim: "Justice defined: Each element of the state and soul minding its own proper station and duty",
        visualMode: "metaphor",
        shot: "split",
        re: /\b(minding (one'?s|its) own business|doing one'?s own work|proper station|harmony of the classes|definition of justice)\b/i,
      },
    ],
  },

  socraticInquiry: {
    id: "socraticInquiry",
    name: "Socratic Dialectic and Aporia",
    set: "agora",
    defaultShot: "twoShot",
    states: [
      {
        index: 0,
        phase: "elenchus_interrogation",
        claim: "The Socratic Elenchus: Cross-examining conventional assertions to reveal internal contradictions",
        visualMode: "character_drama",
        shot: "twoShot",
        re: /\b(socrates|glaucon|adeimantus|dialogue|inquiry|conversation|refut|elenchus|cross-examination|questioning|argued)\b/i,
      },
      {
        index: 1,
        phase: "aporia_breakthrough",
        claim: "Aporia: The productive paralysis of realizing one's ignorance before seeking genuine truth",
        visualMode: "character_drama",
        shot: "medium",
        re: /\b(aporia|puzzlement|humility|ignorance|all i know is i know nothing|false certainty)\b/i,
      },
    ],
  },

  civicPolis: {
    id: "civicPolis",
    name: "The Classical Athenian Polis",
    set: "agora",
    defaultShot: "wide",
    states: [
      {
        index: 0,
        phase: "polis_architecture",
        claim: "The Polis: The collective Greek city-state reflecting the interior architecture of its citizens",
        visualMode: "spatial_state",
        shot: "wide",
        re: /\b(city|polis|athens|community|citizens|state|society|laws|public square)\b/i,
      },
      {
        index: 1,
        phase: "epistemic_division",
        claim: "Doxa vs Episteme: The chasm separating public opinion and rhetoric from genuine philosophical truth",
        visualMode: "comparison_split",
        shot: "split",
        re: /\b(truth.*opinion|doxa|knowledge.*opinion|appearance.*reality|objective truth)\b/i,
      },
    ],
  },
};

const MODERN_FORBIDDEN_SETS = new Set([
  "classroom", "office", "workstation", "startupGarage", "serverRoom",
  "pitchStage", "kitchen", "bedroom", "hospital",
]);

const MODERN_FORBIDDEN_PROPS = new Set([
  "phone", "codeWindow", "laptopMockup", "rocketLaunch", "funnelMetrics",
  "dollarExchange", "subway", "car", "alarmClock", "medical", "coffee",
]);

/**
 * Extracts the core proposition, causal mechanism, and visual opportunity
 * from a sentence of narration. Evaluates all candidates and picks the highest scoring match.
 */
function extractProposition(text) {
  const t = String(text || "").trim();
  if (!t) return null;

  let bestMatch = null;
  let bestScore = -1;

  for (const [worldKey, world] of Object.entries(PHILOSOPHICAL_WORLDS)) {
    for (const state of world.states) {
      if (state.re.test(t)) {
        let score = 5;
        const match = t.match(state.re);
        if (match) score += match[0].length * 0.1;

        if (/\b(because|therefore|leads to|results in|causes|descends into|transforms|turns into|if you give|challenge)\b/i.test(t)) {
          score += 2;
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = {
            worldKey,
            conceptId: world.id,
            prop: world.id,
            set: world.set,
            shot: state.shot || world.defaultShot,
            claim: state.claim,
            stateIndex: state.index,
            stateTotal: world.states.length,
            statePhase: state.phase,
            visualMode: state.visualMode,
            mechanism: extractCausalMechanism(t),
            stakes: extractStakes(t),
          };
        }
      }
    }
  }

  return bestMatch;
}

function extractCausalMechanism(text) {
  if (/\b(freedom|liberty)\b/i.test(text) && /\b(discipline|tyranny|anarchy|chaos)\b/i.test(text)) {
    return "freedom_lacking_discipline_degenerates_into_tyranny";
  }
  if (/\b(invisible|invisibility|unseen)\b/i.test(text) && /\b(just|moral|steal|corrupt)\b/i.test(text)) {
    return "invisibility_grants_impunity_testing_virtue";
  }
  if (/\b(appetite|desire)\b/i.test(text) && /\b(reason|mutiny|overcome)\b/i.test(text)) {
    return "unbounded_appetite_mutinies_against_reason";
  }
  if (/\b(shadows?)\b/i.test(text) && /\b(reality|truth|cave)\b/i.test(text)) {
    return "sensory_illusions_mistaken_for_metaphysical_truth";
  }
  if (/\b(ship|sailors)\b/i.test(text) && /\b(pilot|navigator|stargazer)\b/i.test(text)) {
    return "democratic_flattery_subverting_expert_wisdom";
  }
  if (/\b(thrasymachus|sophist|might makes right|stronger party)\b/i.test(text)) {
    return "power_replaces_truth_as_political_standard";
  }
  if (/\b(thirty tyrants|leon of salamis|arrest|tyranny|refuse)\b/i.test(text)) {
    return "tyrannical_violence_compelling_moral_resistance";
  }
  if (/\b(four virtues|wisdom|courage|temperance|moderation|minding)\b/i.test(text)) {
    return "functional_specialization_yielding_civic_harmony";
  }
  if (/\b(elenchus|cross-examination|dialogue|question|aporia)\b/i.test(text)) {
    return "elenctic_questioning_dismantling_false_dogma";
  }
  return "philosophical_exposition";
}

function extractStakes(text) {
  if (/\b(justice|unjust|moral|virtue)\b/i.test(text)) return "moral_nature_of_man";
  if (/\b(tyranny|dictator|slave|oppress)\b/i.test(text)) return "political_enslavement";
  if (/\b(soul|inner peace|harmony)\b/i.test(text)) return "internal_spiritual_harmony";
  if (/\b(truth|knowledge|illusion|blind)\b/i.test(text)) return "epistemic_enlightenment";
  return "theoretical_principle";
}

// ── VISUAL INFORMATION GAIN CALCULATOR (P0) ─────────────────────────────────

function calculateVIG(scene, proposition) {
  if (!scene) return { vig: "low", score: 0, reason: "Empty scene" };

  const mode = scene.visualMode || (proposition ? proposition.visualMode : "literal");
  const props = Array.isArray(scene.props) ? scene.props : [];
  const hasDiagram = !!scene.diagram;
  const isSplit = scene.shot === "split" || scene.shot === "beforeAfter";
  const hasStateAwareMotif = props.some((p) => p.stateIndex !== undefined || p.type in PHILOSOPHICAL_WORLDS);

  // HIGH VIG: Causal diagrams, state-machine transformations, moral forks, or visual splits
  if (hasDiagram || isSplit || mode === "causal_diagram" || mode === "transformation" || mode === "comparison_split") {
    return {
      vig: "high",
      score: 2,
      reason: `High information gain: ${mode} delivers explanatory dynamics beyond audio.`,
    };
  }

  // MEDIUM VIG: Relevant conceptual motif, authentic historical action, dialectical drama, or spatial polis
  if (hasStateAwareMotif || mode === "character_drama" || mode === "spatial_state" || mode === "metaphor") {
    return {
      vig: "medium",
      score: 1,
      reason: `Medium information gain: ${mode} reinforces philosophical narrative.`,
    };
  }

  // LOW VIG: Talking head with static background, or filler props
  return {
    vig: "low",
    score: 0,
    reason: "Low information gain: Scene is illustrative wallpaper with minimal structural information.",
  };
}

// ── AUDITING & ENFORCEMENT ENGINE ───────────────────────────────────────────

function scoreSemanticRelevance(scene, text, options = {}) {
  const { isAncient = false, forbiddenSets = new Set(), forbiddenProps = new Set() } = options;
  const reasons = [];

  const set = scene.bg?.set || "none";
  const props = Array.isArray(scene.props) ? scene.props.map((p) => p.type) : [];

  // GATE 10A: World & Historical Integrity
  let worldScore = 10;
  if (forbiddenSets.has(set) || (isAncient && MODERN_FORBIDDEN_SETS.has(set))) {
    worldScore = 0;
    reasons.push(`[Gate 10A FAIL] Forbidden modern set "${set}" in ancient context`);
  }
  for (const p of props) {
    if (forbiddenProps.has(p) || (isAncient && MODERN_FORBIDDEN_PROPS.has(p))) {
      worldScore = 0;
      reasons.push(`[Gate 10A FAIL] Forbidden modern prop "${p}" in ancient context`);
    }
  }

  // GATE 10B: Propositional & Causal Integrity
  let semanticScore = 8;
  const prop = extractProposition(text);
  if (prop) {
    const hasMatchingProp = props.includes(prop.prop);
    const hasMatchingSet = set === prop.set;
    if (hasMatchingProp) {
      semanticScore = 10;
    } else {
      semanticScore = 5;
      reasons.push(`[Gate 10B WARN] Scene visual diverges from proposition "${prop.claim}"`);
    }
    if (hasMatchingSet) semanticScore = Math.min(10, semanticScore + 1);
  }

  const vig = calculateVIG(scene, prop);

  return {
    worldScore,
    semanticScore,
    vig: vig.vig,
    isPass: worldScore >= 8 && semanticScore >= 7,
    reasons,
    proposition: prop,
  };
}

function enforceSemanticRelevance(config, options = {}) {
  if (!config || !Array.isArray(config.scenes)) return config;

  const isAncient = options.isAncient ||
    /philosophy|ancient|classical|classics|greek|roman/.test(String(config.meta?.genre || "").toLowerCase()) ||
    /plato|socrates|aristotle|marcus aurelius|seneca|epictetus/.test(String(config.meta?.author || "").toLowerCase());

  const forbiddenSets = new Set([
    ...(options.forbiddenSets || []),
    ...(isAncient ? Array.from(MODERN_FORBIDDEN_SETS) : []),
  ]);

  const forbiddenProps = new Set([
    ...(options.forbiddenProps || []),
    ...(isAncient ? Array.from(MODERN_FORBIDDEN_PROPS) : []),
  ]);

  const CLASSICAL_SETS = ["agora", "colonnade", "cave", "shipDeck", "manuscript", "horizon", "stage", "sky"];

  let activeWorld = null;
  let activeStateIndex = 0;
  let activeSequenceRemaining = 0;

  for (let i = 0; i < config.scenes.length; i++) {
    const scene = config.scenes[i];
    const text = scene._narration || "";
    const prop = extractProposition(text);

    // 1. Proposition Matching & State Machine Progression
    if (prop) {
      activeWorld = PHILOSOPHICAL_WORLDS[prop.worldKey];
      activeStateIndex = prop.stateIndex;
      activeSequenceRemaining = 3;

      scene.visualMode = prop.visualMode;
      scene.visualProposition = {
        claim: prop.claim,
        subject: prop.worldKey,
        mechanism: prop.mechanism,
        stakes: prop.stakes,
        stateIndex: prop.stateIndex,
        stateTotal: prop.stateTotal,
        statePhase: prop.statePhase,
      };

      if (isAncient) scene.bg.set = prop.set;

      scene.props = [{
        type: prop.prop,
        scale: 1,
        enter: "pop",
        at: 4,
        arc: prop.visualMode === "transformation" ? "grow" : "none",
        stateIndex: prop.stateIndex,
        statePhase: prop.statePhase,
      }];
    } else if (activeWorld && activeSequenceRemaining > 0) {
      // SEQUENCE CONTINUITY WITH SHIFTING VISUAL GRAMMAR (No static freezing!)
      activeSequenceRemaining--;
      activeStateIndex = (activeStateIndex + 1) % activeWorld.states.length;
      const nextState = activeWorld.states[activeStateIndex];

      scene.visualMode = nextState.visualMode;
      scene.visualProposition = {
        claim: nextState.claim,
        subject: activeWorld.id,
        mechanism: "sequence_progression",
        stateIndex: nextState.index,
        stateTotal: activeWorld.states.length,
        statePhase: nextState.phase,
      };

      if (isAncient && (scene.bg.set === "none" || forbiddenSets.has(scene.bg.set))) {
        scene.bg.set = activeWorld.set;
      }

      if (nextState.visualMode === "character_drama") {
        scene.shot = "medium";
        scene.props = [];
      } else {
        scene.props = [{
          type: activeWorld.id,
          scale: 0.92,
          enter: "fade",
          at: 6,
          arc: "none",
          stateIndex: nextState.index,
          statePhase: nextState.phase,
        }];
      }
    } else {
      activeWorld = null;
      activeSequenceRemaining = 0;
      if (!scene.visualMode || scene.visualMode === "literal") {
        if (scene.characters && scene.characters.length > 0) {
          scene.visualMode = "character_drama";
        } else if (scene.diagram) {
          scene.visualMode = "causal_diagram";
        } else if (scene.shot === "split" || scene.shot === "beforeAfter") {
          scene.visualMode = "comparison_split";
        } else if (scene.bg && scene.bg.set && scene.bg.set !== "none") {
          scene.visualMode = "spatial_state";
        } else {
          scene.visualMode = "character_drama";
        }
      }
      if (!scene.visualProposition) {
        scene.visualProposition = {
          claim: "Philosophical dialogue and dialectical discourse",
          subject: "socratic_inquiry",
          mechanism: extractCausalMechanism(text),
          stakes: extractStakes(text),
          stateIndex: 0,
          stateTotal: 1,
          statePhase: "discourse",
        };
      }
    }

    // 2. Sanitize forbidden sets (0 anachronisms)
    if (forbiddenSets.has(scene.bg.set)) {
      scene.bg.set = CLASSICAL_SETS[i % CLASSICAL_SETS.length];
    }

    // 3. Sanitize forbidden props — SEMANTIC FALLBACK (Ban meaningless spotlight/shape fillers)
    if (Array.isArray(scene.props)) {
      scene.props = scene.props.map((p) => {
        if (forbiddenProps.has(p.type) || p.type === "spotlight" || p.type === "shape" || p.type === "orbit") {
          const fallbackType = activeWorld ? activeWorld.id : (isAncient ? "kallipolis" : "compass");
          return { ...p, type: fallbackType, stateIndex: activeStateIndex };
        }
        return p;
      });
    }

    // 4. Calculate Visual Information Gain (VIG)
    const vigResult = calculateVIG(scene, scene.visualProposition || prop);
    scene.visualInformationGain = vigResult.vig;

    // 5. Ensure character costume coherence in ancient philosophy
    if (isAncient && Array.isArray(scene.characters)) {
      for (const char of scene.characters) {
        if (char.variant) {
          if (char.variant.outfit === "suit" || char.variant.outfit === "casual" || char.variant.outfit === "hoodie") {
            char.variant.outfit = "robe";
          }
          if (char.variant.glasses) {
            char.variant.glasses = false;
          }
        }
      }
    }

    // 5b. Stage Occupancy Guarantee: Never leave an empty stage with no foreground subject or anchor
    if ((!scene.props || scene.props.length === 0) && (!scene.characters || scene.characters.length === 0)) {
      const fallbackType = activeWorld ? activeWorld.id : (isAncient ? "kallipolis" : "compass");
      scene.props = [{
        type: fallbackType,
        scale: 0.95,
        enter: "fade",
        at: 4,
        arc: "none",
        stateIndex: activeStateIndex,
      }];
      if (scene.visualMode === "literal") scene.visualMode = "metaphor";
    }
  }

  // 6. Anti-Stagnation & VIG Floor: Guarantee zero consecutive Low-VIG scenes across video
  let consecutiveLow = 0;
  for (let i = 0; i < config.scenes.length; i++) {
    const sc = config.scenes[i];
    const vig = calculateVIG(sc, sc.visualProposition).vig;
    sc.visualInformationGain = vig;
    if (vig === "low") {
      consecutiveLow++;
      if (consecutiveLow > 1) {
        sc.visualMode = "character_drama";
        sc.visualInformationGain = "medium";
        if (!sc.shot || sc.shot === "illustration") {
          sc.shot = "medium";
        }
        consecutiveLow = 0;
      }
    } else {
      consecutiveLow = 0;
    }
  }

  return config;
}

module.exports = {
  PHILOSOPHICAL_WORLDS,
  MODERN_FORBIDDEN_SETS,
  MODERN_FORBIDDEN_PROPS,
  extractProposition,
  calculateVIG,
  scoreSemanticRelevance,
  enforceSemanticRelevance,
  // Backwards compatibility
  extractVisualClaim: extractProposition,
  PHILOSOPHY_CONCEPTS: Object.values(PHILOSOPHICAL_WORLDS).map((w) => ({
    id: w.id,
    prop: w.id,
    set: w.set,
    claim: w.states[0]?.claim || w.name,
    re: w.states[0]?.re || new RegExp(w.id, "i"),
  })),
};
