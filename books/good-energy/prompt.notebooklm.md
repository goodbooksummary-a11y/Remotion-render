# NotebookLM prompt — Good Energy: The Surprising Connection Between Metabolism and Limitless Health (Casey Means, Calley Means)

**Slug:** `good-energy` · **Genre:** health · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Good Energy: The Surprising Connection Between Metabolism and Limitless Health" by Casey Means and Calley Means.

THE ANGLE (what makes this episode unique):
- Lens: cellular bioenergetics & institutional capture — dismantling the myth of isolated chronic diseases to expose modern illness as a single, unified cellular energy crisis weaponized by food and pharmaceutical incentives.
- Thesis: Chronic disease is not genetic bad luck, but a state of mitochondrial starvation amidst caloric overload; America’s $4.5 trillion healthcare machine profits by medicating downstream symptoms while systematically ignoring the broken cellular engine.
- Open on this: "Over ninety-three percent of American adults are metabolically dysfunctional right now, and almost every single one of them walked out of their last doctor visit being told their labs were totally normal."
- Phrase-that-pays: "powering the cell, not medicating the symptom." SETUP: no abstract medical lectures — this is an everyday person dragging through an afternoon brain fog crash, wondering why doing everything 'right' still leaves them exhausted.

BEATS (one specific claim each; ground EVERY beat in an everyday scene, never abstract fluff):
1. The Surgeon's Reckoning & The Unified Theory: cutting into inflamed sinus cavities for years before realizing localized surgery was just mopping water while the sink overflowed; why 9 of the top 10 killers share identical mitochondrial dysfunction.
2. The Fasting Insulin Blindspot: an ordinary patient walking out of an annual checkup with a 'clean' 95 mg/dL fasting glucose, completely unaware their pancreas is pumping quadruple the insulin just to hold the dam.
3. The 2:30 PM Brain Fog Crash: tracing the afternoon slump from an innocent office lunch of refined carbs to an acute reactive glucose spike, an insulin surge, and a neuro-energetic brownout mistaken for laziness or stress.
4. Food as Biological Code: replacing calorie restriction with cellular signaling; how ultra-processed foods and industrial seed oils flood the body with naked calories while starving the mitochondrial electron transport chain of essential micronutrients.
5. The Sitting Trap & Contraction-Mediated Glucose Disposal: sweating for 45 minutes at dawn cannot rescue 9 hours of unbroken desk sitting; how simple 10-minute post-meal walks activate GLUT4 receptors without demanding a drop of insulin.
6. The Invisible Environmental Load (Light, Sleep & Toxins): staring at blue screens at midnight and absorbing endocrine disruptors that shatter circadian rhythms, suppress melatonin, and poison cellular energy factories.
7. The Systemic Trap (The Food Lobby & Sick-Care Economy): a former food lobbyist pulls back the curtain on how pharmaceutical funding, ultra-processed food subsidies, and medical school curricula incentivize perpetual illness over root-cause cure.
8. The Six Critical Biomarkers You Must Demand: moving beyond standard reference ranges to demand optimal targets for fasting insulin, triglycerides-to-HDL ratio, HbA1c, hs-CRP, uric acid, and ALT.

COUNTERPOINT: Continuous glucose monitors, micro-managing biomarkers, and constant biohacking can easily tip people into obsessive orthorexia and health anxiety. Furthermore, telling working-class families living in food deserts to 'eat organic and wear a CGM' risks sounding like detached, tech-elite luxury without massive structural food policy change.

REFRAME AT THE END: Chronic fatigue, brain fog, and weight gain are not personal moral failures; they are the rational scream of human biology suffocating in a mismatched modern habitat. Stop fighting the symptoms on the surface and start powering the cell.

DEPTH ENGINE (run on EVERY beat): drop into a scene in present tense with one vivid sensory detail and voice the people; land the point ("here's what that means for you"); add a SECOND example or angle from the book; take one honest "wait — but then..." turn where the hosts genuinely disagree; tie back to the phrase-that-pays before moving on.

LENGTH (target 45-60 min, minimum 45): give each beat 4-6 real minutes, but NEVER pad. Don't repeat points or stall with filler — earn length by going DEEPER (fresh example, sharper objection, real disagreement), not longer on the same ground; if you run dry on a beat, MOVE ON. Two sharp people who can't stop talking about this book. Don't signal an ending before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Use ONLY facts from the book and real, well-documented cases. NEVER invent quotes, numbers, studies, or events; if unsure, stay general.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character — two people who couldn't stop thinking about this book.
- No generic praise, no recap for its own sake. Specific over abstract: concrete scenes, numbers.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/good-energy.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/good-energy.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=good-energy --title="Good Energy: The Surprising Connection Between Metabolism and Limitless Health" --author="Casey Means, Calley Means" --genre=health
```
