// Rend scripts/film/film.html en vidéo : public/video/wayzure-film.mp4 (H.264), .webm (VP9) et l'affiche .webp.
// Prérequis : Playwright (Chromium) et ffmpeg. Usage : NODE_PATH=<node_modules de Playwright> node scripts/film/render.mjs [--preview]
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdirSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Playwright est résolu via NODE_PATH s'il est installé globalement.
const { chromium } = createRequire(import.meta.url)("playwright");
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(dir, "../../public/video");
const FPS = 30, DURATION = 30;
const preview = process.argv.includes("--preview");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("file://" + path.join(dir, "film.html"));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

if (preview) {
  for (const t of [2.5, 6.5, 12.5, 17.5, 19.8, 22, 24, 26.5, 29]) {
    await page.evaluate(x => window.render(x), t);
    await page.screenshot({ path: path.join(dir, `preview-${t}.jpg`), type: "jpeg", quality: 70 });
  }
  await browser.close();
  process.exit(0);
}

const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow", "-movflags", "+faststart", "-an",
  path.join(out, "wayzure-film.mp4")], { stdio: ["pipe", "inherit", "inherit"] });

for (let f = 0; f < FPS * DURATION; f++) {
  await page.evaluate(x => window.render(x), f / FPS);
  const buf = await page.screenshot({ type: "jpeg", quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));

// Affiche : la signature, pleinement visible (convertie en WebP par ffmpeg).
await page.evaluate(x => window.render(x), 7);
const poster = path.join(out, "poster.png");
await page.screenshot({ path: poster });
await browser.close();
await new Promise(r => spawn("ffmpeg", ["-y", "-i", poster, "-quality", "80", path.join(out, "wayzure-film.webp")], { stdio: "inherit" }).on("close", r));
unlinkSync(poster);

await new Promise(r => spawn("ffmpeg", ["-y", "-i", path.join(out, "wayzure-film.mp4"), "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "38",
  "-row-mt", "1", "-an", path.join(out, "wayzure-film.webm")], { stdio: "inherit" }).on("close", r));
