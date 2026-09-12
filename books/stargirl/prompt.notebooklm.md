# NotebookLM prompt — Stargirl (Jerry Spinelli)

**Slug:** `stargirl` · **Genre:** young adult · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Stargirl" by Jerry Spinelli.

THE ANGLE (this is what makes this episode unique):
- Lens: The Panopticon of the High School Herd & The High Cost of Tolerated Grace.
- Thesis to prove: "Stargirl" is not an innocent fable about nonconformity—it is a chilling psychological autopsy of peer surveillance and social cowardice. Spinelli demonstrates that communities do not actually tolerate authenticity: they briefly commodify eccentric joy when it brings collective victories, but the moment grace crosses tribal boundaries to comfort an enemy, the herd demands total erasure.
- Open on this idea: "We remember Stargirl as a cute story about high school nonconformity—but it’s actually an autopsy of peer surveillance. The moment Stargirl consoles an injured kid from the opposing team, an entire high school decides she deserves to be socially erased."

BEATS TO ARGUE (one specific claim each, in order):
1. THE ANCHOR OF APATHY: Wayne Parr and Mica Area High represent the ultimate adolescent survival strategy: emotional dormancy, where caring about nothing is crowned as social royalty.
2. THE TERROR OF RADICAL FREEDOM: Stargirl’s ukulele, pet rat Cinnamon, and spontaneous birthday songs aren't teenage rebellion; they represent the complete absence of defensive posture, which deeply unnerves a herd trained in perpetual self-defense.
3. COMMODIFYING THE ECCENTRIC: When Mica High's basketball team goes on an unprecedented winning streak, the school co-opts Stargirl as their mascot—proving tribes celebrate uniqueness only while it serves collective vanity.
4. THE TREASON OF UNIVERSAL COMPASSION: Cradling the injured Sun Valley star Ron Kovac on the gymnasium floor is Stargirl’s fatal crime—the herd can forgive weirdness, but it never forgives empathy for an enemy.
5. THE VIOLENCE OF THE COLD SHOULDER: "The Hot Seat" interrogation and the subsequent "Shunning" prove that collective silence and complete social erasure are far more psychologically lethal weapons than open physical bullying.
6. THE LOVER'S COWARDICE: Leo Borlock’s desperate plea for Stargirl to become "Susan" exposes the darkest truth of peer pressure: the deepest wound isn't inflicted by open enemies like Hillari Kimble, but by the person who loves you begging you to be small.
7. THE DESERTED PARKING LOT: The agonizing failure of the "Susan" experiment—winning the State Oratorical Contest only to arrive at an empty high school parking lot—reveals that conformity buys zero acceptance from a mob; it only proves you can be broken.
8. ARCHIE'S BONES AND THE LONG REGRET: Leading the Bunny Hop at the Ocotillo Ball and vanishing into the desert leaves Mica haunted forever; as Archie Brubaker observes, Stargirl was human before fear touched us, and Leo spends decades mourning the cowardice that traded a miracle for safety.

RAISE THIS COUNTERPOINT: Does Spinelli romanticize Stargirl as an ungrounded, saintly archetype—an early proto-"Manic Pixie Dream Girl"—who exists merely to teach a suburban boy a moral lesson about courage rather than behaving like a real teenager with anger, ego, and internal fractures?

END BY REFRAMING: You don't lose yourself in high school because the bullies break you; you lose yourself because you sacrifice your own magic to protect someone else's comfort in the hallway.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the single most provocative idea. No greetings, no "welcome back", no "today we're looking at".
2. THESIS: state the one argument this whole discussion will prove.
3. SETUP: who/what the book puts in play (concrete names, stakes).
4. BEATS: 8 beats, each ONE specific claim from the book. DEVELOP each beat fully before moving on — do NOT list them quickly.
5. COUNTERPOINT: one honest criticism — where the book strains or a reader pushes back.
6. PAYOFF: land the thesis on a line that reframes everything said before.

DEPTH ENGINE (run this on EVERY beat — this is how the episode earns its length):
a) drop us into a scene in present tense with one vivid sensory detail; voice the people;
b) land the point ("here's what that means for you");
c) add a SECOND concrete example, number, or angle from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree;
e) tie it back to the recurring phrase-that-pays before moving to the next beat.

LENGTH (target 45-60 minutes, minimum 45 — never shorter): give each beat 4-6 real minutes. BUT never pad to hit the number. Do NOT repeat a point you already made, do NOT restate the thesis over and over, do NOT stall with filler, throat-clearing, or "as we said earlier". Earn the length by going DEEPER, not longer on the same ground: a fresh example, a sharper objection, a genuine disagreement between the two hosts, a real "wait — but then..." turn. If you truly run out of things to say about a beat, MOVE ON rather than recycle it. Sound like two sharp people who honestly can't stop talking about this book — not a summary stretched to fill time. Do NOT signal an ending ("to wrap up", "in short", "so to sum up") before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Use ONLY facts from the book and its real, well-documented cases. NEVER invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character — you are two people who could not stop thinking about this book.
- No generic praise, no plot-recap for its own sake. Prefer specific over abstract: names, concrete scenes, numbers.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/stargirl.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/stargirl.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=stargirl --title="Stargirl" --author="Jerry Spinelli" --genre=young adult
```
