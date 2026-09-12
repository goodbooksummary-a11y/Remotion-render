# Siddhartha — Hermann Hesse  ·  _classics_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/siddhartha.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-siddhartha.png`](../../out/thumbnail-siddhartha.png) | YouTube kapak |
| 📝 YouTube pack | [`books/siddhartha/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/siddhartha.clean.vtt`](../../public/captions/siddhartha.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/siddhartha.vtt`](../../public/captions/siddhartha.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/siddhartha.m4a`](../../public/audio/siddhartha.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/siddhartha/`](../../public/scenes/siddhartha) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/siddhartha/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/siddhartha/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/siddhartha/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/siddhartha/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-siddhartha_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/siddhartha.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-siddhartha.png`
4. CC → `siddhartha.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=siddhartha --title="Siddhartha" --author="Hermann Hesse" --genre=classics
```
