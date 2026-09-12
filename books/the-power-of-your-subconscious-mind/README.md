# The Power of Your Subconscious Mind — Joseph Murphy  ·  _self-help_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-power-of-your-subconscious-mind.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-the-power-of-your-subconscious-mind.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | [`books/the-power-of-your-subconscious-mind/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-power-of-your-subconscious-mind.clean.vtt`](../../public/captions/the-power-of-your-subconscious-mind.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-power-of-your-subconscious-mind.vtt`](../../public/captions/the-power-of-your-subconscious-mind.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-power-of-your-subconscious-mind.m4a`](../../public/audio/the-power-of-your-subconscious-mind.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/the-power-of-your-subconscious-mind/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-power-of-your-subconscious-mind/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-power-of-your-subconscious-mind/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/the-power-of-your-subconscious-mind/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-power-of-your-subconscious-mind/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-power-of-your-subconscious-mind_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-power-of-your-subconscious-mind.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-power-of-your-subconscious-mind.png`
4. CC → `the-power-of-your-subconscious-mind.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-power-of-your-subconscious-mind --title="The Power of Your Subconscious Mind" --author="Joseph Murphy" --genre=self-help
```
