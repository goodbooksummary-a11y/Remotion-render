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

const PHILOSOPHY_CONCEPTS = [
  {
    id: "thirtyTyrants",
    re: /\b(thirty tyrants|tyrants|coup|404\s*bc|oligarch(s|y)?|sparta(n)?|critias|terror regime|bloody purge|overthrow of democracy|30-?man\s*jun[ta]+|junta)\b/i,
    prop: "thirtyTyrants",
    set: "agora",
    shot: "insert",
    claim: "The Spartan-backed Thirty Tyrants terror regime in 404 BC Athens",
  },
  {
    id: "ringOfGyges",
    re: /\b(ring of gyges|gyges|invisible|invisibility|unseen|glaucon'?s challenge|impunity|shepherd'?s ring|ring of)\b/i,
    prop: "ringOfGyges",
    set: "colonnade",
    shot: "illustration",
    claim: "Glaucon's challenge: The Ring of Gyges granting invisible impunity",
  },
  {
    id: "caveAllegory",
    re: /\b(allegory of the cave|the cave|shadows? on the wall|cave wall|shackled|prisoners in the cave|firelight|sunlight|ascent from the cave|platonic cave)\b/i,
    prop: "caveAllegory",
    set: "cave",
    shot: "insert",
    claim: "The Allegory of the Cave: Bound prisoners mistaking shadows for reality",
  },
  {
    id: "shipOfState",
    re: /\b(ship of state|the ship|the pilot|steersman|captain|mutinous crew|mutiny|true navigator|stargazer|star-gazer)\b/i,
    prop: "shipOfState",
    set: "shipDeck",
    shot: "insert",
    claim: "The Ship of State: The true pilot vs mutinous quarreling sailors",
  },
  {
    id: "tripartiteSoul",
    re: /\b(tripartite soul|three parts of the soul|appetite|spirited part|charioteer|two horses|logistikon|thumos|epithumia|inner harmony|balance the soul)\b/i,
    prop: "tripartiteSoul",
    set: "colonnade",
    shot: "illustration",
    claim: "The Tripartite Soul: Reason governing Spirit and Appetite",
  },
  {
    id: "kallipolis",
    re: /\b(kallipolis|ideal city|just city|philosopher king(s)?|philosopher ruler(s)?|guardian class|city in speech|city in the heavens|noble lie|three classes of the state|utopian city)\b/i,
    prop: "kallipolis",
    set: "agora",
    shot: "illustration",
    claim: "Kallipolis: The ideal just city ruled by philosopher-kings",
  },
  {
    id: "fiveRegimes",
    re: /\b(five regimes|decline of the city|timocracy|oligarchy|democracy|tyranny|aristocracy|degeneration|decay of the state)\b/i,
    prop: "fiveRegimes",
    set: "colonnade",
    shot: "insert",
    claim: "The Five Regimes: The inevitable descent from Aristocracy to Tyranny",
  },
  {
    id: "mythOfEr",
    re: /\b(myth of er|spindle of necessity|ananke|reincarnation|afterlife|transmigration|lots of souls|fates|clotho|lachesis|atropos)\b/i,
    prop: "mythOfEr",
    set: "manuscript",
    shot: "insert",
    claim: "The Myth of Er: The Spindle of Necessity and choice of future lives",
  },
];

const MODERN_FORBIDDEN_SETS = new Set([
  "classroom", "office", "workstation", "startupGarage", "serverRoom",
  "pitchStage", "kitchen", "bedroom", "hospital",
]);

const MODERN_FORBIDDEN_PROPS = new Set([
  "phone", "codeWindow", "laptopMockup", "rocketLaunch", "funnelMetrics",
  "dollarExchange", "subway", "car", "alarmClock", "medical", "coffee",
]);

/**
 * Extract visual claims from a sentence of narration.
 */
function extractVisualClaim(text) {
  const t = String(text || "");
  for (const item of PHILOSOPHY_CONCEPTS) {
    if (item.re.test(t)) {
      return {
        conceptId: item.id,
        prop: item.prop,
        set: item.set,
        shot: item.shot,
        claim: item.claim,
      };
    }
  }
  return null;
}

/**
 * Scores the semantic relevance of a scene to its narration chunk.
 * Returns score (0–10) and violation reasons.
 */
function scoreSemanticRelevance(scene, text, options = {}) {
  const { isAncient = false, forbiddenSets = new Set(), forbiddenProps = new Set() } = options;
  let score = 8;
  const reasons = [];

  const set = scene.bg?.set || "none";
  const props = Array.isArray(scene.props) ? scene.props.map((p) => p.type) : [];

  // 1. Negative constraint violations
  if (forbiddenSets.has(set) || (isAncient && MODERN_FORBIDDEN_SETS.has(set))) {
    score -= 7;
    reasons.push(`Forbidden modern set "${set}" in ancient/classical book`);
  }

  for (const p of props) {
    if (forbiddenProps.has(p) || (isAncient && MODERN_FORBIDDEN_PROPS.has(p))) {
      score -= 6;
      reasons.push(`Forbidden modern prop "${p}" in ancient/classical book`);
    }
  }

  // 2. Positive conceptual matching
  const claim = extractVisualClaim(text);
  if (claim) {
    const hasMatchingProp = props.includes(claim.prop);
    const hasMatchingSet = set === claim.set;

    if (hasMatchingProp) {
      score = 10;
      reasons.push(`Perfect conceptual motif match: "${claim.prop}" illustrates "${claim.claim}"`);
    } else {
      score -= 3;
      reasons.push(`Missing designated conceptual motif "${claim.prop}" for "${claim.claim}"`);
    }

    if (hasMatchingSet) {
      score = Math.min(10, score + 1);
    }
  }

  return {
    score: Math.max(0, Math.min(10, score)),
    isPass: score >= 7,
    reasons,
    claim,
  };
}

/**
 * Enforces semantic relevance across all scenes in an Antidote book config.
 */
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
  let activeSequence = null; // for sequence continuity
  let activeSequenceRemaining = 0;

  for (let i = 0; i < config.scenes.length; i++) {
    const scene = config.scenes[i];
    const text = scene._narration || "";
    const claim = extractVisualClaim(text);

    // 1. If this scene triggers a foundational concept, initiate or extend the sequence
    if (claim) {
      activeSequence = claim;
      activeSequenceRemaining = 3; // hold conceptual continuity for up to 3 beats unless changed
    }

    if (activeSequence && activeSequenceRemaining > 0) {
      // Apply sequence continuity
      if (isAncient && (scene.bg.set === "none" || forbiddenSets.has(scene.bg.set))) {
        scene.bg.set = activeSequence.set;
      }
      // If the scene has a direct claim or sequence continuity, upgrade to the conceptual motif
      if (claim) {
        const existingColor = scene.props?.[0]?.color;
        const existingColor2 = scene.props?.[0]?.color2;
        scene.props = [{
          type: claim.prop,
          scale: 1,
          enter: "pop",
          at: 4,
          arc: "grow",
          ...(existingColor ? { color: existingColor } : {}),
          ...(existingColor2 ? { color2: existingColor2 } : {}),
        }];
        if (claim.set && isAncient) {
          scene.bg.set = claim.set;
        }
      } else if (activeSequenceRemaining >= 1) {
        if (!scene.props || scene.props.length === 0) {
          scene.props = [{
            type: activeSequence.prop,
            scale: 0.9,
            enter: "fade",
            arc: "none",
            at: 6,
          }];
        } else {
          const GENERIC_PROPS = new Set(["spotlight", "shape", "orbit", "lineGrowth", "pulseRings", "arrow", "target"]);
          scene.props = scene.props.map((p) => {
            if (forbiddenProps.has(p.type) || GENERIC_PROPS.has(p.type)) {
              return { ...p, type: activeSequence.prop };
            }
            return p;
          });
        }
      }
      activeSequenceRemaining--;
    } else {
      activeSequence = null;
    }

    // 2. Sanitize forbidden sets
    if (forbiddenSets.has(scene.bg.set)) {
      scene.bg.set = CLASSICAL_SETS[i % CLASSICAL_SETS.length];
    }

    // 3. Sanitize forbidden props
    if (Array.isArray(scene.props)) {
      scene.props = scene.props.map((p) => {
        if (forbiddenProps.has(p.type)) {
          // Replace with classical or abstract fallback
          const fallback = isAncient ? "kallipolis" : "shape";
          return { ...p, type: fallback };
        }
        return p;
      });
    }

    // 4. Ensure character clothing & setting coherence in ancient philosophy
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
  }

  return config;
}

module.exports = {
  PHILOSOPHY_CONCEPTS,
  MODERN_FORBIDDEN_SETS,
  MODERN_FORBIDDEN_PROPS,
  extractVisualClaim,
  scoreSemanticRelevance,
  enforceSemanticRelevance,
};
