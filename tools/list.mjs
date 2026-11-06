#!/usr/bin/env node
// Find effects: node tools/list.mjs [words...]
// Matches ids, names, tags and descriptions; no words lists everything.

import { allIds, loadEffect } from "./lib/fxlib.mjs";

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
  const hay = [code, id, m.name, m.desc, ...m.tags].join(" ").toLowerCase();
  if (!words.every((w) => hay.includes(w))) continue;
  n++;
  const kind = m.loop ? `loop ${m.duration}s` : `once ${m.duration}s`;
  console.log(`${code}  ${id.padEnd(28)} ${kind.padEnd(11)} ${(m.size[0] + "x" + m.size[1]).padEnd(8)} ${m.actor ? "actor  " : "       "}${m.desc}`);
}
console.log(`\n${n} effect${n === 1 ? "" : "s"}`);
