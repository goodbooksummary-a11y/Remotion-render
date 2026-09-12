# stargirl

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/stargirl.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-stargirl.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/stargirl/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/stargirl.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | `public/captions/stargirl.vtt` _(yok)_ | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/stargirl.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/stargirl/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/stargirl/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/stargirl/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/stargirl/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/stargirl/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-stargirl_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/stargirl.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-stargirl.png`
4. CC → `stargirl.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=stargirl --title="stargirl"
```
