# The Republic — Plato  ·  _philosophy_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-republic.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-the-republic.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/the-republic/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/the-republic.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | `public/captions/the-republic.vtt` _(yok)_ | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/the-republic.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/the-republic/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-republic/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-republic/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/the-republic/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/the-republic/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-republic_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-republic.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-republic.png`
4. CC → `the-republic.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-republic --title="The Republic" --author="Plato" --genre=philosophy
```
