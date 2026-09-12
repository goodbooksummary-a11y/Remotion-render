# NotebookLM prompt — The Power of Your Subconscious Mind (Joseph Murphy)

**Slug:** `the-power-of-your-subconscious-mind` · **Genre:** self-help · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "The Power of Your Subconscious Mind" by Joseph Murphy.

THE ANGLE (what makes this episode unique):
- Lens: cognitive cybernetics & mental operating systems — stripping away mid-century mysticism to reveal the subconscious as an uncritical biological execution engine.
- Thesis: The subconscious mind never sleeps, never argues, and has no moral compass; it is a neutral feedback engine that executes whatever premise you emotionally accept as true — meaning your self-sabotage and your greatest breakthroughs run on the exact same mechanical circuit.
- Open on this: "Your subconscious mind cannot take a joke, it cannot process sarcasm, and whatever you repeat with emotional conviction, it treats as an absolute military command."
- Phrase-that-pays: "the premise you accept." SETUP: no celebrities — this is an ordinary person lying awake at 2 AM wrestling with their own inner voice.

BEATS (one specific claim each; ground EVERY beat in an ordinary everyday scene, never abstract fluff):
1. The Captain and the Engine Room: your conscious mind is the captain on the bridge choosing coordinates; the subconscious is the engine room below deck that obeys every bell without checking if you're steering into rocks.
2. The Law of Reversed Effort (Baudouin's Rule): trying to force an outcome with conscious willpower backfires; the more frantically you force sleep or demand confidence, the more panic the subconscious registers and amplifies.
3. The Hypnagogic Window (Pre-Sleep Imprinting): the drowsy threshold right before sleep where the critical conscious censor drops its guard; looping a single, tranquil 3-word phrase into the silence re-anchors the night's processing.
4. The Mental Movie Method: why vague verbal affirmations stall; the subconscious responds to sensory texture and physical finality (the felt grip of a handshake, the sound of a key in the door) rather than polite wishes.
5. The Placebo Machinery & Healers: from Lourdes relics to modern sham surgeries, the relic has zero power; the subjective mind does 100% of the biological repair the moment belief turns off the body's panic inhibitors.
6. The Poison of Resentment (Mental Surgery): secretly resenting another person's promotion or wealth broadcasts a lethal command to your own engine: "wealth and success are hateful;" forgiveness is not moral charity, but self-interested surgery to unclog your own pipeline.
7. The Conflict of Affirmations & The Believability Rule: shouting "I am a millionaire" when broke triggers a violent conscious revolt ("You're lying!"); the subconscious only accepts gradual, incontrovertible progression ("Day and night, in all my interests, I am advancing").
8. Sleep as the Subconscious Workshop: sleep is not an off switch, but peak production time; handing an unresolved dilemma to the subconscious at bedtime with a calm demand lets the pattern-matching network untangle it by morning.

COUNTERPOINT: Murphy's mid-century New Thought optimism can slide dangerously close to magical thinking and toxic blame — telling someone in poverty or illness that their "wrong thoughts" caused external crisis. Where is the line between taking radical ownership of your inner mental blueprint and respecting stubborn physical and structural reality?

REFRAME AT THE END: The subconscious isn't a magical genie waiting for wishes; it is your nervous system's auto-fill engine running 24/7. Stop fighting the output on the screen and rewrite the default prompt you feed it.

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
1. Sesi indir → `public/audio/the-power-of-your-subconscious-mind.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/the-power-of-your-subconscious-mind.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=the-power-of-your-subconscious-mind --title="The Power of Your Subconscious Mind" --author="Joseph Murphy" --genre=self-help
```
