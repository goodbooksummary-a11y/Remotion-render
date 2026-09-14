/**
 * visual-critic.js — Blind Visual Critic (Antidote 6.1)
 *
 * Implements P3: Evaluates the visual representation vs narration
 * against the 5 Blind Questions without seeing internal pipeline code or planner logic.
 *
 * The 5 Blind Questions:
 *   1. Viewer Understanding: What does the viewer understand from this frame alone?
 *   2. Causal Visibility: Is the core causal claim visible, or just a decorative backdrop?
 *   3. Visual Noise: What is visual noise / decorative filler that distracts from the core claim?
 *   4. Visual Information Gain (VIG): Score (high, medium, low) and rationale.
 *   5. Information Beyond Audio: Does the shot communicate relationships the ear cannot grasp from audio alone?
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { ENDPOINT, stripThink } = require("./llm");
const { calculateVIG, extractProposition, extractClaimType, extractEpistemicStance } = require("./visual-intent");

const VISION_MODEL = process.env.NVIDIA_VISION_MODEL || "meta/llama-3.2-11b-vision-instruct";

/**
 * Deterministic blind evaluation heuristic.
 * Emulates what an external critic perceives when inspecting:
 * - What is seen: background set, active props, character poses/blocking, shot type, diagrams, splits, secondary anchors.
 * - What is heard: spoken narration sentence, claim type, epistemic stance.
 */
function evaluateBlindHeuristic(scene, narration) {
  const text = String(narration || scene._narration || "").trim();
  const shot = scene.shot || "medium";
  const set = scene.bg?.set || "none";
  const props = Array.isArray(scene.props) ? scene.props : [];
  const chars = Array.isArray(scene.characters) ? scene.characters : [];
  const hasDiagram = !!scene.diagram;
  const isSplit = shot === "split" || shot === "beforeAfter" || scene.visualMode === "comparison_split";
  const primaryProp = props.find((p) => !p.isSecondaryAnchor) || props[0];
  const secondaryAnchor = props.find((p) => p.isSecondaryAnchor);

  const claimType = extractClaimType(text);
  const epistemicStance = extractEpistemicStance(claimType, text);
  const propRes = extractProposition(text);

  // 1. What does the viewer understand from this frame alone?
  let viewerUnderstanding = "";
  if (hasDiagram) {
    viewerUnderstanding = `A structured conceptual diagram explaining systemic or categorical relationships.`;
  } else if (isSplit) {
    viewerUnderstanding = `A direct side-by-side comparison contrasting two opposing principles, moral states, or choices.`;
  } else if (primaryProp && !primaryProp.isSecondaryAnchor) {
    const phaseDesc = primaryProp.statePhase ? ` in phase '${primaryProp.statePhase}' (state ${primaryProp.stateIndex ?? 0})` : "";
    viewerUnderstanding = `Visual motif of '${primaryProp.type}'${phaseDesc} staged in a '${set}' environment.`;
  } else if (chars.length > 0) {
    viewerUnderstanding = `A character-driven scene depicting interpersonal dialogue or dialectical exchange in a '${set}' setting.`;
    if (secondaryAnchor) {
      viewerUnderstanding += ` Conceptual anchor '${secondaryAnchor.type}' is preserved as a muted secondary background element.`;
    }
  } else {
    viewerUnderstanding = `An atmospheric architectural backdrop of '${set}' without a foreground focal subject.`;
  }

  // 2. Is the core causal claim visible, or just decorative backdrop?
  const hasCausalMarkers = /\b(because|leads to|causes|transforms|degenerates|turns into|if|results|therefore|impunity|critique|rejects)\b/i.test(text);
  let causalClaimVisible = false;
  let causalVisibilityExplanation = "";

  if (hasDiagram || isSplit || (primaryProp && primaryProp.stateIndex !== undefined && !primaryProp.isSecondaryAnchor)) {
    causalClaimVisible = true;
    causalVisibilityExplanation = `The visual explicitly structures the causal relationship (${isSplit ? "contrast/split refutation" : hasDiagram ? "mechanistic causal diagram" : "active state-machine progression"}).`;
  } else if (primaryProp && !primaryProp.isSecondaryAnchor) {
    causalClaimVisible = true;
    causalVisibilityExplanation = `The central motif '${primaryProp.type}' directly anchors the spoken subject.`;
  } else if (chars.length > 0) {
    if (claimType === "negation" || claimType === "contrast") {
      causalClaimVisible = true;
      causalVisibilityExplanation = `Character dramatic tension embodies the dialectical critique / refutation spoken in the narration.`;
    } else {
      causalClaimVisible = !hasCausalMarkers;
      causalVisibilityExplanation = causalClaimVisible
        ? `The characters reflect the spoken interpersonal exchange.`
        : `Narration asserts an abstract causal claim, but the frame shows characters without a mechanistic diagram or state transformation.`;
    }
  } else {
    causalClaimVisible = false;
    causalVisibilityExplanation = `Frame contains only background setting without a clear causal object.`;
  }

  // Epistemic check: Negation presented as literal affirmation
  if (claimType === "negation" && scene.visualMode === "literal") {
    causalClaimVisible = false;
    causalVisibilityExplanation = `Narration refutes the concept, but the frame depicts a literal positive affirmation without contrast or refutation.`;
  }

  // 3. What is visual noise / decorative filler?
  let visualNoise = "none";
  const fillers = props.filter((p) => p.type === "spotlight" || p.type === "shape" || p.type === "orbit" || p.type === "pulseRings");
  if (fillers.length > 0) {
    visualNoise = `Generic filler shapes [${fillers.map((p) => p.type).join(", ")}] provide decoration rather than semantic information.`;
  } else if (!primaryProp && !hasDiagram && !isSplit && chars.length === 0) {
    visualNoise = `Empty stage with no foreground subject or cognitive anchor.`;
  }

  // 4. Visual Information Gain (VIG) — 0–5 Cognitive Scale
  const vigData = calculateVIG(scene, propRes);
  const vig = vigData.vig; // 'high' | 'medium' | 'low'
  const vigScore = vigData.vigScore; // 0..5
  const vigLevel = vigData.level; // 'decorative' | 'reinforcing' | 'illustrative' | 'explanatory' | 'causal' | 'transformative'
  const vigReason = vigData.reason;

  // 5. Does the shot add new conceptual information beyond the spoken audio?
  const addsInformationBeyondAudio = vigScore >= 3 || (vigScore >= 2 && primaryProp && primaryProp.stateIndex !== undefined);

  // Verdict & Recommendation
  let verdict = "pass";
  let recommendation = "Maintain current visual direction.";
  if (vigScore === 0) {
    verdict = "fail";
    recommendation = "Elevate to character drama or introduce a state-aware motif to eliminate decorative wallpaper.";
  } else if (!causalClaimVisible && hasCausalMarkers) {
    verdict = "warn";
    recommendation = "Consider a split comparison or state-progression prop to visually embody the causal transformation.";
  } else if (claimType === "negation" && scene.visualMode === "literal") {
    verdict = "warn";
    recommendation = "Shift to contrast split or character critique to reflect refutational epistemic stance.";
  }

  return {
    viewerUnderstanding,
    causalClaimVisible,
    causalVisibilityExplanation,
    visualNoise,
    vig,
    vigScore,
    vigLevel,
    vigReason,
    addsInformationBeyondAudio,
    claimType,
    epistemicStance,
    verdict,
    recommendation,
  };
}

/**
 * Evaluates a frame image using an LLM Vision API if configured and available.
 */
async function evaluateBlindVisionAPI(imagePath, narration) {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey || !fs.existsSync(imagePath)) {
    return null;
  }

  const base64Image = fs.readFileSync(imagePath).toString("base64");
  const dataUri = `data:image/png;base64,${base64Image}`;

  const prompt = `You are a Blind Visual Critic evaluating a video frame paired with its voiceover narration.
You have NOT seen any source code, schema, or technical implementation.

Voiceover Narration spoken during this exact frame:
"${narration}"

Answer these critical questions strictly in JSON format:
{
  "viewerUnderstanding": "What does a first-time viewer understand from looking at this frame alone?",
  "causalClaimVisible": true or false,
  "causalVisibilityExplanation": "Brief explanation of whether the causal assertion is visually depicted or just wallpaper",
  "visualNoise": "Any decorative clutter or meaningless shapes distracting from the core claim (or 'none')",
  "vig": "high" | "medium" | "low",
  "vigScore": 0 to 5,
  "vigLevel": "decorative" | "reinforcing" | "illustrative" | "explanatory" | "causal" | "transformative",
  "vigReason": "Why is the Visual Information Gain at this level on the 0-5 cognitive scale?",
  "claimType": "assertion" | "negation" | "contrast" | "causal" | "question" | "counterexample" | "definition" | "analogy" | "consequence",
  "addsInformationBeyondAudio": true or false,
  "verdict": "pass" | "warn" | "fail",
  "recommendation": "One actionable recommendation to improve visual-semantic alignment"
}`;

  const payload = JSON.stringify({
    model: VISION_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: dataUri } },
        ],
      },
    ],
    temperature: 0.1,
    max_tokens: 500,
  });

  return new Promise((resolve) => {
    const url = new URL(ENDPOINT);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: 25000,
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            const content = data.choices?.[0]?.message?.content || "";
            const clean = stripThink(content);
            const parsed = JSON.parse(clean);
            resolve(parsed);
          } catch (_) {
            resolve(null);
          }
        });
      }
    );

    req.on("error", () => resolve(null));
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
    req.write(payload);
    req.end();
  });
}

/**
 * Top-level scene critic: tries Vision LLM first if available, falls back to heuristic.
 */
async function evaluateScene(scene, narration, options = {}) {
  const { imagePath, useLLM = false } = options;

  if (useLLM && imagePath && fs.existsSync(imagePath)) {
    const llmResult = await evaluateBlindVisionAPI(imagePath, narration);
    if (llmResult) {
      return { ...llmResult, evaluator: "vision_llm" };
    }
  }

  const heuristic = evaluateBlindHeuristic(scene, narration);
  return { ...heuristic, evaluator: "blind_heuristic" };
}

module.exports = {
  evaluateBlindHeuristic,
  evaluateBlindVisionAPI,
  evaluateScene,
};
