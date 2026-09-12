# Fluke: Chance, Chaos, and Why Everything We Do Matters — Brian Klaas  ·  _science_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/fluke.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-fluke.png`](../../out/thumbnail-fluke.png) | YouTube kapak |
| 📝 YouTube pack | [`books/fluke/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/fluke.clean.vtt`](../../public/captions/fluke.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/fluke.vtt`](../../public/captions/fluke.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/fluke.m4a`](../../public/audio/fluke.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/fluke/`](../../public/scenes/fluke) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/fluke/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/fluke/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/fluke/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/fluke/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-fluke_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/fluke.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-fluke.png`
4. CC → `fluke.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=fluke --title="Fluke: Chance, Chaos, and Why Everything We Do Matters" --author="Brian Klaas" --genre=science
```
