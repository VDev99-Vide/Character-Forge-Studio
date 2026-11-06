#!/usr/bin/env node
// Find effects: node tools/list.mjs [words...]
// Matches ids, names, tags and descriptions; no words lists everything.

import { allIds, loadEffect } from "./lib/fxlib.mjs";
import { assetEffects } from "../assets/vfx/index.js";

const words = process.argv.slice(2).map((w) => w.toLowerCase());
const ids = allIds();
let n = 0;
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const code = `FX-${String(i + 1).padStart(3, "0")}`;
  let m;
  try {
    m = (await loadEffect(id)).meta;
  } catch {
    continue;
  }
  const hay = [code, "code", id, m.name, m.desc, ...m.tags].join(" ").toLowerCase();
  if (!words.every((w) => hay.includes(w))) continue;
  n++;
  const kind = m.loop ? `loop ${m.duration}s` : `once ${m.duration}s`;
  console.log(`${code.padEnd(8)} [CODE]  ${id.padEnd(28)} ${kind.padEnd(11)} ${(m.size[0] + "x" + m.size[1]).padEnd(9)} ${m.actor ? "actor  " : "       "}${m.desc}`);
}
for (const a of assetEffects) {
  const hay = [a.code, "asset", a.id, a.name, a.desc, ...(a.tags || [])].join(" ").toLowerCase();
  if (!words.every((w) => hay.includes(w))) continue;
  n++;
  const kind = `${a.frames}f ${a.duration}s`;
  console.log(`${a.code.padEnd(8)} [ASSET] ${a.id.padEnd(28)} ${kind.padEnd(11)} ${(a.size[0] + "x" + a.size[1]).padEnd(9)} ${a.dir}`);
}
console.log(`\n${n} effect${n === 1 ? "" : "s"}`);
