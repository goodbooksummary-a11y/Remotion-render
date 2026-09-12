# A Gentleman in Moscow — Amor Towles  ·  _historical fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/a-gentleman-in-moscow.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-a-gentleman-in-moscow.png`](../../out/thumbnail-a-gentleman-in-moscow.png) | YouTube kapak |
| 📝 YouTube pack | [`books/a-gentleman-in-moscow/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/a-gentleman-in-moscow.clean.vtt`](../../public/captions/a-gentleman-in-moscow.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/a-gentleman-in-moscow.vtt`](../../public/captions/a-gentleman-in-moscow.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/a-gentleman-in-moscow.m4a`](../../public/audio/a-gentleman-in-moscow.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/a-gentleman-in-moscow/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/a-gentleman-in-moscow/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/a-gentleman-in-moscow/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/a-gentleman-in-moscow/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/a-gentleman-in-moscow/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-a-gentleman-in-moscow_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/a-gentleman-in-moscow.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-a-gentleman-in-moscow.png`
4. CC → `a-gentleman-in-moscow.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=a-gentleman-in-moscow --title="A Gentleman in Moscow" --author="Amor Towles" --genre=historical fiction
```
