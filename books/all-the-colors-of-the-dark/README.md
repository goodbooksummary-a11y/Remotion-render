# All the Colors of the Dark — Chris Whitaker  ·  _fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/all-the-colors-of-the-dark.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-all-the-colors-of-the-dark.png`](../../out/thumbnail-all-the-colors-of-the-dark.png) | YouTube kapak |
| 📝 YouTube pack | [`books/all-the-colors-of-the-dark/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/all-the-colors-of-the-dark.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | `public/captions/all-the-colors-of-the-dark.vtt` _(yok)_ | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/all-the-colors-of-the-dark.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/all-the-colors-of-the-dark/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/all-the-colors-of-the-dark/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/all-the-colors-of-the-dark/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/all-the-colors-of-the-dark/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/all-the-colors-of-the-dark/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-all-the-colors-of-the-dark_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/all-the-colors-of-the-dark.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-all-the-colors-of-the-dark.png`
4. CC → `all-the-colors-of-the-dark.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=all-the-colors-of-the-dark --title="All the Colors of the Dark" --author="Chris Whitaker" --genre=fiction
```
