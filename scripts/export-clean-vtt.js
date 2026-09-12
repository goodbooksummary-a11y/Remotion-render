#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const slug = process.argv[2] || "fluke";
const ROOT = path.resolve(__dirname, "..");
const bookConfigPath = path.join(ROOT, "books", slug, "config.antidote.json");
const voxConfigPath = path.join(ROOT, "books", slug, "config.vox.json");

const cfgPath = fs.existsSync(bookConfigPath) ? bookConfigPath : voxConfigPath;
if (!fs.existsSync(cfgPath)) {
  console.error(`❌ Config bulunamadı: ${cfgPath}`);
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const fps = cfg.meta?.fps || 30;

function fmt(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = (sec % 60).toFixed(3).padStart(6, "0");
  return `${h}:${m}:${s}`;
}

const captions = cfg.captions || [];
if (!captions.length) {
  console.error("❌ Config içinde captions dizisi boş veya yok.");
  process.exit(1);
}

let out = "WEBVTT\n\n";
let prevEnd = 0;

captions.forEach((c, i) => {
  let start = c.startFrame / fps;
  let end = c.endFrame / fps;
  if (start < prevEnd) start = prevEnd + 0.01;
  if (end <= start) end = start + 0.5;
  prevEnd = end;
  const text = (c.text || "").trim().replace(/\s+/g, " ");
  out += `${i + 1}\n${fmt(start)} --> ${fmt(end)}\n${text}\n\n`;
});

const publicCaptionsDir = path.join(ROOT, "public", "captions");
if (!fs.existsSync(publicCaptionsDir)) {
  fs.mkdirSync(publicCaptionsDir, { recursive: true });
}

const targetPublic = path.join(publicCaptionsDir, `${slug}.clean.vtt`);
const targetBook = path.join(ROOT, "books", slug, `${slug}.clean.vtt`);

fs.writeFileSync(targetPublic, out, "utf8");
fs.writeFileSync(targetBook, out, "utf8");

console.log(`✓ Başarıyla üretildi:`);
console.log(`   1. ${targetPublic} (${(fs.statSync(targetPublic).size / 1024).toFixed(1)} KB)`);
console.log(`   2. ${targetBook} (${(fs.statSync(targetBook).size / 1024).toFixed(1)} KB)`);
console.log(`   Toplam cue sayısı: ${captions.length}`);
