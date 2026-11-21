// Génère public/documents/wayzure-presentation-institutionnelle.pdf à partir de presentation.html.
// Usage : NODE_PATH=/opt/node-tools/node_modules node scripts/dossier/render.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "../../public/documents/wayzure-presentation-institutionnelle.pdf");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + path.join(dir, "presentation.html"), { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(out);
