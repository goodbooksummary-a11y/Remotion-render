# Stargirl — Jerry Spinelli  ·  _young adult_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/stargirl.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-stargirl.png`](../../out/thumbnail-stargirl.png) | YouTube kapak |
| 📝 YouTube pack | [`books/stargirl/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/stargirl.clean.vtt`](../../public/captions/stargirl.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/stargirl.vtt`](../../public/captions/stargirl.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/stargirl.m4a`](../../public/audio/stargirl.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/stargirl/`](../../public/scenes/stargirl) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/stargirl/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/stargirl/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/stargirl/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/stargirl/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-stargirl_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/stargirl.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-stargirl.png`
4. CC → `stargirl.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=stargirl --title="Stargirl" --author="Jerry Spinelli" --genre=young adult
```
