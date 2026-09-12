# RELEVANCE BASELINE — 2026-09-12

The "before" photograph. Every number here is produced by
[`scripts/audit-relevance.js`](scripts/audit-relevance.js) reading the shipped
`books/<slug>/config.*.json` — no render, no audio, no API. Regenerate with:

```bash
node scripts/audit-relevance.js --all --soft
```

**Read this before claiming any visual improvement.** The plan it belongs to is
[`VISUAL_RELEVANCE_PLAN.md`](VISUAL_RELEVANCE_PLAN.md); the numbers below are what
Phases 2–5 have to move.

## What the columns mean

Each scene is scored against the words **actually spoken during its own frame
window** — not against the text the planner looked at, because both planners pick
a visual from one chunk and then place the scene somewhere else on the timeline.

| verdict | meaning |
|---|---|
| **subject** | the picture is tied to what is being said (the only good outcome) |
| **wrong** | `contradicts` + `unrelated` — asserts something the narration does not, or names a subject nobody is talking about |
| **filler** | a picture that cannot be about anything: a contentless motif, or a Flux image whose whole prompt is three scraped keywords |
| **thin** | nothing on screen but type on paper |
| **airtime** | share of the scene's frames that sit over its own narration |

## The table

```
  book                                  eng    scn  subject   wrong  filler    thin  airtime
  all-the-bright-places                 anti   115     0.0%    7.0%   33.0%   60.0%    58.3%
  just-mercy                            vox    206     0.0%    6.8%   42.2%   51.0%    56.5%
  project-hail-mary                     vox    187     0.0%    6.4%   48.7%   44.9%    79.6%
  clear-thinking                        anti   181     0.0%    6.1%   34.8%   59.1%    59.1%
  the-frozen-river                      vox    269     0.0%    5.2%   45.0%   49.8%    72.9%
  fruit-fly                             anti   142     0.0%    4.9%   36.6%   58.5%    53.2%
  the-stranger                          vox    210     0.0%    4.8%   48.6%   46.7%    57.1%
  enders-game                           vox    266     0.0%    3.4%   45.5%   51.1%    73.5%
  the-color-purple                      vox    337     0.0%    3.3%   44.5%   52.2%    72.1%
  i-m-thinking-of-ending-things         vox    235     0.0%    3.0%   38.7%   58.3%    55.0%
  little-fires-everywhere               vox    209     0.0%    2.4%   44.0%   53.6%    72.5%
  little-women                          vox    172     0.0%    1.2%   45.3%   53.5%    76.1%
  diary-of-a-ceo                        vox    284     0.0%    0.0%   45.1%   54.9%    76.7%
  discipline-is-destiny                 vox    351     0.0%    0.0%   44.2%   55.8%    74.3%
  glass-castle                          vox    282     0.0%    0.0%   43.6%   56.4%    74.2%
  happiness-trap                        vox    227     0.0%    0.0%   44.9%   55.1%    71.7%
  hidden-potential                      anti   158     0.0%    0.0%    1.3%   98.7%    47.8%
  how-to-read-a-person-like-a-book      vox    309     0.0%    0.0%   46.6%   53.4%    71.8%
  laws-of-human-nature                  vox    312     0.0%    0.0%   44.6%   55.4%    73.1%
  let-them-theory                       vox    142     0.0%    0.0%   43.7%   56.3%    79.0%
  outlive                               vox    399     0.0%    0.0%   43.6%   56.4%    74.2%
  psychology-of-money                   vox    314     0.0%    0.0%   43.9%   56.1%    75.7%
  sway                                  vox    277     0.0%    0.0%   44.0%   56.0%    72.4%
  the-iliad                             vox    277     0.0%    0.0%   42.2%   57.8%    56.2%
  the-odyssey                           vox    283     0.0%    0.0%   40.3%   59.7%    59.3%
  the-righteous-mind                    vox    264     0.0%    0.0%   42.4%   57.6%    73.9%
  the-unknown                           vox    290     0.0%    0.0%   43.1%   56.9%    74.2%
  unreasonable-hospitality              vox    384     0.0%    0.0%   42.7%   57.3%    73.0%
  war-of-the-worlds                     vox    333     0.0%    0.0%   45.3%   54.7%    73.0%
  the-girl-with-the-dragon-tattoo       vox    256     0.8%    5.5%   44.1%   49.6%    60.2%
  the-handmaids-tale                    vox    245     0.8%    3.3%   39.6%   56.3%    61.9%
  the-wedding-people                    anti   116     0.9%    6.9%   33.6%   58.6%    55.4%
  the-chosen                            vox    302     1.3%    3.6%   37.7%   57.3%    61.0%
  atonement                             vox    310     3.2%    4.5%   36.8%   55.5%    57.4%
  fences                                vox    239     3.8%    3.3%   36.4%   56.5%    57.5%
  the-mountain-is-you                   vox    338    11.8%   28.7%   13.9%   45.6%    58.0%
  single-dad-dilemma                    vox    302    14.6%   37.1%    8.6%   39.7%    51.7%
  a-gentleman-in-moscow                 anti   216    15.3%    5.1%   28.7%   50.9%    84.3%
  this-is-me                            vox    318    15.7%   21.7%    0.0%   62.6%    52.6%
  supercommunicators                    anti   281    16.4%   10.3%   58.7%   14.6%    83.6%
  all-the-colors-of-the-dark            anti   247    18.6%    6.9%   27.5%   47.0%    79.9%
  good-energy                           anti   312    19.2%   13.8%   58.3%    8.7%    82.8%
  feel-good-productivity                anti   333    19.8%    9.9%   60.1%   10.2%    81.3%
  the-power-of-your-subconscious-mind   anti   327    20.8%    8.9%   59.0%   11.3%    80.8%
  a-good-man-is-hard-to-find            anti   274    21.5%    7.7%   49.6%   21.2%    85.2%
  siddhartha                            anti   311    24.1%    8.7%   56.9%   10.3%    84.6%
  million-dollar-weekend                anti   279    25.8%   11.5%   53.4%    9.3%    84.5%
  east-of-eden                          vox    220    29.5%   21.8%    0.0%   48.6%    58.7%
  slow-productivity                     vox    294    36.4%   11.2%    0.0%   52.4%    64.2%

  CATALOGUE (scene-weighted)                 12935     6.6%    6.0%   39.6%   47.7%    68.8%
```

## What it says

1. **6.6 % of the catalogue shows anything tied to its own narration.** Not a
   sampling estimate — 12 935 scenes, every one scored.
2. **29 of 49 books score exactly 0 %.** Nothing in them is on screen because of
   what is being said.
3. **The metric validated itself.** The three best Vox books —
   `slow-productivity` 36.4 %, `east-of-eden` 29.5 %, `this-is-me` 15.7 % — are
   exactly the three books whose art direction was hand-authored through
   `--designs`. The audit did not know that; it found them.
4. **The two engines fail differently.** Vox fails by *filler*: ~44 % of its
   scenes carry a keyword-bag image, and the rest are text. Antidote fails by
   *vocabulary*: it reaches 15–26 %, but 50–60 % of its props are contentless
   motifs. `all-the-bright-places` uses 14 motif types and only **2** of them
   can be grounded in narration at all — the most-used one, `book` (10 scenes),
   has no concept regex, so it can only ever have come from a seeded rotation.
5. **Airtime splits by engine and by age.** Recent Antidote books sit at 80–85 %;
   Vox sits at 51–79 % because of the anchor-window bug fixed in `cfa52b8`.
   Every Vox book re-planned after that commit should land ≥ 90 %.
6. **`wrong` is low almost everywhere (6.0 % catalogue-wide) and that is not
   comfort** — it is low because so little is *claimed*. A scene showing a
   ripple cannot contradict anything. The two legacy outliers,
   `single-dad-dilemma` (37.1 %) and `the-mountain-is-you` (28.7 %), are the
   books that claim the most.

## Gate

`audit-relevance.js` exits 1 when a book misses the budget
(`--min-subject=70 --max-wrong=5 --min-airtime=90`). Today **49/49 books fail**,
so it runs `--soft` and advisory at step 1.6 of `make-book.js` for both engines.
Phase 5 turns it into a real gate, once Phases 2–4 have made passing possible.
