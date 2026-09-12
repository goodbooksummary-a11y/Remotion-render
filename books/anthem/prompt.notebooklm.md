# NotebookLM prompt — Anthem (Ayn Rand)

**Slug:** `anthem` · **Genre:** fiction · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original, 45-60 minute analysis of "Anthem" by Ayn Rand. English only, natural US conversation — disagree, interrupt, build on each other, think out loud.

THE ANGLE:
- Lens: The Tyranny of the Plural — how totalitarianism achieves absolute control not by policing actions, but by outlawing the grammar of individual consciousness.
- Thesis to prove: Totalitarianism's deadliest weapon is the erasure of the singular first person; when "we" replaces "I", mediocrity becomes a moral duty, discovery becomes a crime, and progress must be extinguished because one solitary mind created it.
- Cold open (0:00-0:25, mid-thought, no greeting): "The council didn't smash the lightbulb because it didn't work—they smashed it because ONE man made it alone, and in a world where you can only say 'we', an individual spark is more terrifying than five hundred years of darkness."

BEATS TO ARGUE (develop each beat fully with concrete cases from the book):
1. The Eradication of "I": Language as mental prison. The death penalty for the Unspeakable Word. When grammar enforces collectivism, the brain cannot conceptualize private grief, joy, or thought.
2. The Street Sweeper Sentence: Equality 7-2521 is assigned to sweep streets despite his brilliant scientific mind. The Council of Vocations punishes talent because individual superiority shatters collective equality.
3. The Underground Subway Tunnel: Sneaking away into the iron-and-concrete ruins of the Unmentionable Times. True innovation is born in secrecy and solitude; committees cannot discover, only conform.
4. The Invention of the Electric Wire: Equality rediscovers electricity and creates an incandescent light in a glass box. The sensory shock of holding lightning in your hands while the city lives by candlelight.
5. "What Is Not Done Together Is Evil": Equality presents his light to the World Council of Scholars. Their visceral terror: a tool that eases labor threatens collective toil. If all men didn't invent it, it must be destroyed.
6. The Golden One & Forbidden Desire: Liberty 5-3000 in the peasant fields and the City Palace of Mating. Why total states must crush romantic love: personal attraction is the first declaration of private property.
7. The Uncharted Forest and the Mirror: Fleeing execution into the forbidden wild. Equality looks into a mountain stream and sees his own face for the first time—solitude is not doom, but sovereignty.
8. The Sacred Word "EGO" and Prometheus: Finding the glass house of books from the lost age. Reclaiming "I", choosing the name Prometheus, and establishing that civilization begins and ends with the sovereign individual mind.

COUNTERPOINT: Rand's cartoonish simplicity. The scholars are so comically regressive and Equality so flawlessly heroic that Anthem functions as an allegorical parable rather than nuanced human psychology. Grapple with whether real collective coercion is much more seductive than Rand portrays.

PAYOFF / CLOSER: Individualism is not the selfish refusal to help others; it is the realization that you cannot give what you do not own. The word "I" is the only foundation upon which genuine empathy, creation, and civilization can stand.

DEPTH ENGINE (run on EVERY beat):
a) Drop us into a scene in present tense with sensory detail (the damp subway tunnel, the buzzing spark, the chalk dust, the forest stream); voice the characters.
b) Land the point ("here is what that means for human nature").
c) Add a SECOND concrete case or nuance from the text.
d) Take an honest "wait—but then..." turn where you two genuinely push back and debate.
e) Tie back to the recurring phrase: "The tyranny of the plural."

LENGTH (target 45-60 min, minimum 45 min): Give each beat 4-6 real minutes. Do not pad, stall, or repeat. Earn length through deeper friction, sharper philosophical objections, and vivid textual details. Never signal an ending before the final PAYOFF.

HARD RULES: English only (US audience). Two hosts in passionate conversation. Use ONLY genuine facts from Anthem; never invent events. Never mention AI, notebooks, or documents. No greetings, no generic plot recap.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/anthem.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/anthem.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=anthem --title="Anthem" --author="Ayn Rand" --genre=fiction
```
