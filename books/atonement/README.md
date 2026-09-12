# Atonement — Ian McEwan  ·  _fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/atonement.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-atonement.png`](../../out/thumbnail-atonement.png) | YouTube kapak |
| 📝 YouTube pack | [`books/atonement/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/atonement.clean.vtt`](../../public/captions/atonement.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/atonement.vtt`](../../public/captions/atonement.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/atonement.m4a`](../../public/audio/atonement.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/atonement/`](../../public/scenes/atonement) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/atonement/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/atonement/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/atonement/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/atonement/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-atonement_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/atonement.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-atonement.png`
4. CC → `atonement.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=atonement --title="Atonement" --author="Ian McEwan" --genre=fiction
```
