# I'm Thinking of Ending Things — Iain Reid  ·  _horror_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/i-m-thinking-of-ending-things.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-i-m-thinking-of-ending-things.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | [`books/i-m-thinking-of-ending-things/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/i-m-thinking-of-ending-things.clean.vtt`](../../public/captions/i-m-thinking-of-ending-things.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/i-m-thinking-of-ending-things.vtt`](../../public/captions/i-m-thinking-of-ending-things.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/i-m-thinking-of-ending-things.m4a`](../../public/audio/i-m-thinking-of-ending-things.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/i-m-thinking-of-ending-things/`](../../public/scenes/i-m-thinking-of-ending-things) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/i-m-thinking-of-ending-things/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/i-m-thinking-of-ending-things/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/i-m-thinking-of-ending-things/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/i-m-thinking-of-ending-things/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-i-m-thinking-of-ending-things_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/i-m-thinking-of-ending-things.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-i-m-thinking-of-ending-things.png`
4. CC → `i-m-thinking-of-ending-things.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=i-m-thinking-of-ending-things --title="I'm Thinking of Ending Things" --author="Iain Reid" --genre=horror
```
