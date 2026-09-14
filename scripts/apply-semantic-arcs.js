#!/usr/bin/env node
/**
 * apply-semantic-arcs.js — Apply Semantic Alignment & Three-Layer Rules to Antidote Config
 *
 * Enriches config.antidote.json with:
 *   - visualJob (narrative purpose from macro sequence arc)
 *   - visualArc (intra-scene state progression)
 *   - attention (high-level choreography milestones)
 *   - complementary text punches (eliminating parrot echo)
 *
 * Usage:
 *   node scripts/apply-semantic-arcs.js --slug=<slug> [--dry]
 */

const fs = require("fs");
const path = require("path");
const { abs } = require("./lib/paths");
const { directSemanticBeat } = require("./lib/antidote-semantic-director");
const { directNarrativeFlow } = require("./lib/antidote-narrative-rules");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  })
);

const SLUG = args.slug;
if (!SLUG) {
  console.error("Usage: node scripts/apply-semantic-arcs.js --slug=<slug> [--dry]");
  process.exit(1);
}

const DRY = !!args.dry;
const configPath = abs.antidoteConfig(SLUG);
if (!fs.existsSync(configPath)) {
  console.error(`Error: Config not found at ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const scenes = config.scenes || [];

// Load or derive sequence arcs
const seqPath = path.join(path.dirname(configPath), "sequence-arcs.json");
let seqData = { sequences: [] };
let roleMap = new Map();
if (fs.existsSync(seqPath)) {
  seqData = JSON.parse(fs.readFileSync(seqPath, "utf8"));
  for (const seq of seqData.sequences || []) {
    for (const b of seq.beats || []) {
      roleMap.set(b.index, b.role);
    }
  }
}

// 1. Story Director Layer: Assign narrative functions and promise/payoff pairings
const narrativeFlow = directNarrativeFlow(scenes, seqData);

let rewrittenTexts = 0;
let dynamicArcs = 0;

for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i];
  const role = roleMap.get(i) || (i % 4 === 0 ? "setup" : i % 4 === 1 ? "question" : i % 4 === 2 ? "complication" : "reveal");
  const n = narrativeFlow[i] || { function: "EXPLANATION", escalates: false };

  s.narrative = {
    function: n.function,
    ...(n.payoffPromise ? { payoffPromise: n.payoffPromise } : {}),
    ...(n.payoff ? { payoff: n.payoff } : {}),
    escalates: n.escalates,
    conceptual: n.conceptual,
    emotional: n.emotional,
  };

  // 2. Visual Director Layer: Driven directly by the Story Director's function
  const semantic = directSemanticBeat({
    scene: s,
    sequenceRole: role,
    narrativeFunction: n.function,
    index: i,
    totalScenes: scenes.length,
  });

  s.visualJob = semantic.visualJob;
  s.visualArc = semantic.visualArc;
  s.attention = semantic.attention;

  if (s.visualArc && s.visualArc.transformation !== "none") {
    dynamicArcs++;
  }

  // Check if texts were updated
  const oldTextStr = (s.texts || []).map((t) => t.text).join("|");
  const newTextStr = semantic.texts.map((t) => t.text).join("|");
  if (oldTextStr !== newTextStr) {
    rewrittenTexts++;
  }
  s.texts = semantic.texts;
}

console.log(`\n══════════════════════════════════════════════════════════════`);
console.log(`  APPLY SEMANTIC ARCS: ${SLUG}`);
console.log(`══════════════════════════════════════════════════════════════`);
console.log(`  Total Scenes Processed:       ${scenes.length}`);
console.log(`  Semantic Specs Added:         ${scenes.length} (100%)`);
console.log(`  Dynamic Visual Arcs Created:  ${dynamicArcs} (${Math.round(dynamicArcs / scenes.length * 100)}%)`);
console.log(`  Parrot Callouts Rewritten:    ${rewrittenTexts}`);

if (DRY) {
  console.log(`\n  [DRY RUN] No changes written to disk.`);
} else {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  console.log(`\n  ✓ Successfully updated: ${configPath}`);
}
console.log(`══════════════════════════════════════════════════════════════\n`);
