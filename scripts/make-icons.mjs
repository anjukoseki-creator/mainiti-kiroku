// public/icon.svg から PWA 用の PNG アイコンを生成する
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const svg = await readFile(new URL("../public/icon.svg", import.meta.url));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

for (const [px, name] of [
  [512, "icon-512.png"],
  [192, "icon-192.png"],
  [180, "apple-touch-icon.png"],
]) {
  await sharp(svg, { density: 300 }).resize(px, px).png().toFile(out(name));
  console.log("wrote", name);
}
