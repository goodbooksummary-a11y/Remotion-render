# The Handmaid's Tale — Margaret Atwood  ·  _fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-handmaids-tale.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-handmaids-tale.png`](../../out/thumbnail-the-handmaids-tale.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-handmaids-tale/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-handmaids-tale.clean.vtt`](../../public/captions/the-handmaids-tale.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-handmaids-tale.vtt`](../../public/captions/the-handmaids-tale.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-handmaids-tale.m4a`](../../public/audio/the-handmaids-tale.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-handmaids-tale/`](../../public/scenes/the-handmaids-tale) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-handmaids-tale/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-handmaids-tale/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/the-handmaids-tale/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-handmaids-tale/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-handmaids-tale_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-handmaids-tale.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-handmaids-tale.png`
4. CC → `the-handmaids-tale.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-handmaids-tale --title="The Handmaid's Tale" --author="Margaret Atwood" --genre=fiction
```
