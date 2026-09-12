# Good Energy: The Surprising Connection Between Metabolism and Limitless Health — Casey Means, Calley Means  ·  _health_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | [`out/good-energy.mp4`](../../out/good-energy.mp4) | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-good-energy.png`](../../out/thumbnail-good-energy.png) | YouTube kapak |
| 📝 YouTube pack | [`books/good-energy/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/good-energy.clean.vtt`](../../public/captions/good-energy.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | `public/captions/good-energy.vtt` _(yok)_ | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/good-energy.m4a`](../../public/audio/good-energy.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/good-energy/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/good-energy/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/good-energy/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/good-energy/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/good-energy/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-good-energy_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/good-energy.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-good-energy.png`
4. CC → `good-energy.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=good-energy --title="Good Energy: The Surprising Connection Between Metabolism and Limitless Health" --author="Casey Means, Calley Means" --genre=health
```
