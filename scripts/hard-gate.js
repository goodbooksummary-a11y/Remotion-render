#!/usr/bin/env node
/**
 * hard-gate.js — Antidote God Mode: Pre-Render Hard Gates (Phase 10)
 *
 * Enforces the 8 Non-Negotiable Golden Rules before any render or worker dispatch.
 * Blocks video export if any retention violation exists.
 *
 * The 8 Golden Gates:
 *   [GATE 1] Narrative Health: 0 explanation streaks (>2) & 0 escalation droughts (>28s).
 *   [GATE 2] Promise Integrity: 0 unresolved promises & 0 orphan payoffs.
 *   [GATE 3] Visual Freshness: 0 stagnation streaks (3 consecutive identical visual states).
 *   [GATE 4] Novelty Budget: 0 visual novelty droughts (>60s).
 *   [GATE 5] Chapter Structure: Every chapter must have Macro Question → Turn → Climax Payoff.
 *   [GATE 6] Cognitive Compression: Character clears stage for diagram hero.
 *   [GATE 7] Audio Punctuation: 100% payoffs have DING chime & 100% chapters have THUD hit.
 *   [GATE 8] Master Retention: Composite Holistic Retention Score >= 85.
 *
 * Usage:
 *   node scripts/hard-gate.js --slug=<slug> [--auto-fix]
 *   node scripts/hard-gate.js --all [--auto-fix]
 */

const fs = require("fs");
const path = require("path");
const { abs } = require("./lib/paths");
const { auditHolisticRetention } = require("./lib/antidote-retention-auditor");
const { autoRepairAntidote } = require("./lib/antidote-auto-repair");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  })
);

const AUTO_FIX = !!args["auto-fix"] || !!args.fix;

function evaluateGates(slug, autoFix = false) {
  const p = abs.antidoteConfig(slug);
  if (!fs.existsSync(p)) {
    console.error(`Error: Config not found at ${p}`);
    process.exit(1);
  }

  let config = JSON.parse(fs.readFileSync(p, "utf8"));
  let chapters = [];
  const metaPath = abs.youtubeMeta(slug);
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      chapters = meta.chapters || [];
    } catch (_) {}
  }

  let audit = auditHolisticRetention(config, chapters);
  const compressionPassed = (config.scenes || []).every((s) => !s.diagram || s.characters?.length === 0 || s.characters?.[0]?.scale <= 0.65);

  // Self-heal if autoFix requested and not yet perfect or any gate fails
  if ((!audit.passed || audit.score < 95 || !compressionPassed) && autoFix) {
    console.log(`  [AUTO-FIX] Initiating Autonomous Auto-Repair Loop for ${slug}...`);
    const repairResult = autoRepairAntidote(config, chapters, { maxPasses: 4 });
    config = repairResult.config;
    fs.writeFileSync(p, JSON.stringify(config, null, 2), "utf8");
    audit = auditHolisticRetention(config, chapters);
    console.log(`  [AUTO-FIX] Repaired to Score: ${audit.score}/100 (${repairResult.repairs.length} repairs applied).`);
  }

  // Evaluate the 8 Hard Gates
  const gateChecks = [
    {
      gate: 1,
      name: "Narrative Health (Golden Rules)",
      passed: audit.diagnostics.narrativePassed,
      detail: audit.diagnostics.narrativePassed ? "Zero explanation streaks / droughts" : "Narrative fatigue detected",
    },
    {
      gate: 2,
      name: "Promise & Curiosity Integrity",
      passed: audit.diagnostics.promisesPassed,
      detail: audit.diagnostics.promisesPassed ? "100% promises resolved with earned payoffs" : "Dangling promises / orphan payoffs",
    },
    {
      gate: 3,
      name: "Visual Freshness (Zero Stagnation)",
      passed: audit.diagnostics.stagnationPassed,
      detail: audit.diagnostics.stagnationPassed ? "Zero visual state repetition streaks" : "Visual stagnation alert",
    },
    {
      gate: 4,
      name: "Visual Novelty Budget",
      passed: audit.diagnostics.noveltyPassed,
      detail: audit.diagnostics.noveltyPassed ? "Optimal novelty distribution (metaphors, splits, diagrams)" : "Novelty drought (>60s)",
    },
    {
      gate: 5,
      name: "Chapter Curiosity Cycles",
      passed: audit.diagnostics.chaptersPassed,
      detail: audit.diagnostics.chaptersPassed ? "All chapters follow Question → Turn → Payoff" : "Chapter arc deficits",
    },
    {
      gate: 6,
      name: "Cognitive Compression Architecture",
      passed: (config.scenes || []).every((s) => !s.diagram || s.characters?.length === 0 || s.characters?.[0]?.scale <= 0.65),
      detail: "Characters yield stage focal point to hero diagrams",
    },
    {
      gate: 7,
      name: "Audio Director Punctuation",
      passed: audit.diagnostics.audioPassed,
      detail: audit.diagnostics.audioPassed ? "100% payoffs & chapter cards punctured with tactile SFX" : "Missing audio punch",
    },
    {
      gate: 8,
      name: "Holistic Retention Score (>= 85)",
      passed: audit.score >= 85,
      detail: `Retention score ${audit.score}/100 [${audit.grade}]`,
    },
  ];

  const allPassed = gateChecks.every((g) => g.passed);

  return {
    slug,
    allPassed,
    score: audit.score,
    grade: audit.grade,
    gateChecks,
    violations: audit.allViolations,
  };
}

function printGateReport(r) {
  const symbol = r.allPassed ? "✓" : "✗";
  const status = r.allPassed ? "PASSED — GREEN LIGHT TO RENDER" : "BLOCKED — HARD GATE VIOLATION";

  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║  ANTIDOTE GOD MODE: PRE-RENDER HARD GATES                     ║`);
  console.log(`║  ${r.slug.padEnd(60)}  ║`);
  console.log(`╠════════════════════════════════════════════════════════════════╣`);
  console.log(`  Decision:                  [${symbol}] ${status}`);
  console.log(`  Composite Retention Score: ${String(r.score).padStart(3)} / 100  [${r.grade}]`);

  console.log(`\n── Gate Verification Checklist ──────────────────────────────────`);
  for (const g of r.gateChecks) {
    const icon = g.passed ? "✓ PASS" : "✗ FAIL";
    console.log(`  [GATE ${g.gate}] ${g.name.padEnd(36)} [${icon}]  ${g.detail}`);
  }

  if (!r.allPassed) {
    console.log(`\n── Critical Blocking Violations (${r.violations.length}) ──────────────────────`);
    for (const v of r.violations.slice(0, 8)) {
      console.log(`  ⚠ [${v.system || "Gate"}] ${v.rule || v.message}`);
    }
    console.log(`\n  Run with '--auto-fix' to let Antidote autonomously repair all deficits.`);
  }

  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);
}

function main() {
  if (args.slug) {
    const res = evaluateGates(args.slug, AUTO_FIX);
    printGateReport(res);
    if (!res.allPassed) process.exit(1);
    process.exit(0);
  }

  if (args.all) {
    const booksDir = path.resolve(__dirname, "../books");
    const slugs = fs.readdirSync(booksDir).filter((d) => {
      const cp = path.join(booksDir, d, "config.antidote.json");
      return fs.existsSync(cp);
    });

    console.log(`\n══ VERIFYING PRE-RENDER HARD GATES ACROSS CATALOGUE (${slugs.length} BOOKS) ══`);
    const results = [];

    for (const slug of slugs) {
      const res = evaluateGates(slug, AUTO_FIX);
      results.push(res);
    }

    console.log(`\n══ CATALOGUE PRE-RENDER HARD GATES SUMMARY ══`);
    console.log("Slug".padEnd(34) + "Score".padStart(7) + "Failed Gates".padStart(15) + "Decision".padStart(14));
    console.log("─".repeat(70));

    let failedCount = 0;
    for (const r of results) {
      if (!r.allPassed) failedCount++;
      const failedGates = r.gateChecks.filter((g) => !g.passed).map((g) => g.gate).join(",") || "None (0)";
      const decision = r.allPassed ? "GREEN LIGHT" : "BLOCKED";
      console.log(
        r.slug.padEnd(34) +
        String(r.score).padStart(7) +
        failedGates.padStart(15) +
        decision.padStart(14)
      );
    }
    console.log("─".repeat(70));
    console.log(`Result: ${results.length - failedCount}/${results.length} books cleared for production render.\n`);

    if (failedCount > 0) process.exit(1);
    process.exit(0);
  }

  console.log("Usage: node scripts/hard-gate.js --slug=<slug> [--auto-fix] | --all [--auto-fix]");
  process.exit(1);
}

main();
