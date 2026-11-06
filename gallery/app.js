// The gallery: every effect playing live from its own code. Tiles start when they scroll into view; a click
// opens one effect with its options, a sprite sheet and the code to use it.

import { effects, categories, effectCodes } from "../src/fx/index.js";
import { assetEffects, assetCategories } from "../assets/vfx/index.js";
import { createFrame, clearFrame, createFx, createAct, actBounds, composite, backdrop, drawActor, painterFor, stockActor, actorAlphaOf, PAL, BACKDROPS } from "../src/core/index.js";

const REPO = "https://github.com/VDev99-Vide/pixelfx";
const CODE_FX = Object.entries(effects).map(([id, mod], idx) => {
  const meta = { fps: 30, bg: "dark", loop: false, duration: 1, tags: [], options: {}, ...mod.meta };
  const code = effectCodes?.[id] ?? `FX-${String(idx + 1).padStart(3, "0")}`;
  return { kind: "code", id, code, cat: id.split("/")[0], name: meta.name, mod: { ...mod, meta }, meta };
});
const ASSET_FX = assetEffects.map((a) => ({
  kind: "asset",
  id: a.id,
  code: a.code,
  cat: a.cat,
  name: a.name,
  asset: a,
  meta: {
    name: a.name,
    desc: a.desc,
    size: a.size,
    origin: [Math.round(a.size[0] / 2), Math.round(a.size[1] / 2)],
    fps: a.fps,
    duration: a.duration,
    loop: true,
    bg: "dark",
    tags: a.tags || [],
  },
}));
const FX = [...CODE_FX, ...ASSET_FX];
const ALL_CATEGORIES = [
  ...categories.map((c) => ({ ...c, kind: "code" })),
  ...assetCategories.map((c) => ({ ...c, kind: "asset" })),
];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
// full-screen effects (transitions, weather, impact frames) fill a 16:9 stage edge to edge instead of floating in it
const isScreen = (fx) => fx.kind === "code" && fx.meta.size[0] >= 320 && Math.abs(fx.meta.size[0] / fx.meta.size[1] - 16 / 9) < 0.05;
const $ = (s) => document.querySelector(s);
function el(tag, props = {}, kids = []) {
  const e = Object.assign(document.createElement(tag), props);
  for (const k of [].concat(kids)) e.append(k);
  return e;
}

// ---- a live effect on a canvas, at an integer scale that fits the stage
class Player {
  constructor(canvas, fx, aspect, pad) {
    Object.assign(this, { canvas, fx, ctx: canvas.getContext("2d"), opts: {}, flip: false, actor: true, speed: 1, playing: true });
    this.bg = fx.meta.bg;
    this.layout(aspect, pad);
  }
  // the art-pixel stage: the effect's canvas plus some room, stretched to the tile's aspect; CSS scales it up
  layout(aspect, pad) {
    Object.assign(this, { aspect, pad });
    // an act needs room for the whole performance, not just the effect's canvas
    const acted = this.acted, b = acted ? { ...actBounds(this.fx.mod) } : null;
    // an act happens above the floor: don't spend the tile on bricks
    if (b) b.y1 = Math.min(b.y1, 22);
    const [w, h] = acted ? [b.x1 - b.x0, b.y1 - b.y0] : this.fx.meta.size, [ox, oy] = acted ? [-b.x0, -b.y0] : this.fx.meta.origin;
    this.W = Math.ceil(Math.max(w * (acted ? Math.min(pad, 1.1) : pad), h * (acted ? Math.min(pad, 1.1) : pad) * aspect));
    this.H = Math.ceil(this.W / aspect);
    this.x = Math.floor((this.W - w) / 2) + ox;
    // an act stands near the bottom of its tile, with the room above it
    this.y = acted ? Math.max(oy + 2, this.H - b.y1 - 2) : Math.floor((this.H - h) / 2) + oy;
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    // shrinking pixel art nearest-neighbour drops whole 1 px lines; smooth it only when it has to shrink
    const shown = this.canvas.getBoundingClientRect().width * devicePixelRatio;
    this.canvas.style.imageRendering = shown && shown < this.W ? "auto" : "";
    this.frame = createFrame(this.W, this.H);
    this.img = this.ctx.createImageData(this.W, this.H);
    this.setBg(this.bg);
    this.restart();
  }
  setBg(kind) {
    this.bg = kind;
    this.bgBuf = kind === "none" ? null : backdrop(kind, this.W, this.H, this.y);
    this.dirty = true;
  }
  // an effect with an act plays it, unless the character is switched off
  get acted() {
    return !!this.fx.mod.act && this.actor;
  }
  restart() {
    this.inst = (this.acted ? createAct : createFx)(this.fx.mod, { x: this.x, y: this.y, flip: this.flip, ...this.opts });
    this.acc = 0;
    this.wait = 0;
    this.dirty = true;
  }
  tick(dt) {
    const m = this.fx.meta, step = 1 / m.fps;
    if (this.playing) this.acc = Math.min(this.acc + dt * this.speed, 0.25);
    let moved = false;
    while (this.acc >= step) {
      this.acc -= step;
      if (!m.loop && (this.acted ? this.inst.done() : this.inst.t >= m.duration)) {
        this.wait += step;
        if (this.wait > 0.45) this.restart();
      } else this.inst.update(step);
      moved = true;
    }
    if (moved || this.dirty) this.render();
  }
  seek(t) {
    this.restart();
    this.inst.update(t);
    this.render();
  }
  render() {
    const f = clearFrame(this.frame);
    if (this.acted) {
      this.inst.draw(f);
      composite(f, this.img.data, this.bgBuf);
      const [sx, sy] = this.inst.shake;
      if (sx || sy) this.ctx.clearRect(0, 0, this.W, this.H);
      this.ctx.putImageData(this.img, sx, sy);
      this.dirty = false;
      return;
    }
    this.inst.draw(f, "back");
    const m = this.fx.meta, tt = m.loop ? this.inst.t % m.duration : Math.min(this.inst.t, m.duration);
    if (m.actor && this.actor) drawActor(painterFor(f).place(this.x, this.y, this.flip), this.inst.options.actor ?? stockActor(), actorAlphaOf(this.fx.mod, tt, this.inst.options));
    this.inst.draw(f, "front");
    composite(f, this.img.data, this.bgBuf);
    this.ctx.putImageData(this.img, 0, 0);
    this.dirty = false;
  }
}

// ---- one-click agent prompt & multi-select
const selected = new Set();
let toastTimer = null;
function showToast(msg) {
  const box = $("#toast");
  box.textContent = msg;
  box.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (box.hidden = true), 2600);
}
async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = el("textarea", { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  showToast(label);
}
function formatFxSpec(fx, extra = {}) {
  const m = fx.meta;
  if (fx.kind === "asset") {
    const a = fx.asset;
    const lines = [
      `- Định danh (Asset Code): [${fx.code}] ${fx.id} — "${m.name}"`,
      `- Phân loại: Asset VFX (Sprite Sheet / Frame Sequence có sẵn)`,
      `- Thư mục Asset: ${a.dir}/`,
      `- Sprite Sheet / Atlas: ${a.sheet}`,
      ...(a.framesDir ? [`- Thư mục Frames rời: ${a.framesDir}/ (${a.frames} frames PNG)`] : []),
      `- Preview GIF: ${a.gif}`,
      `- Metadata JSON: ${a.json}`,
      ...(a.readme ? [`- Tài liệu hướng dẫn: ${a.readme}`] : []),
      `- Thông số: Kích thước ${m.size[0]}×${m.size[1]}px, ${a.frames} frames @ ${m.fps} FPS (${m.duration}s)`,
      `- Mô tả: ${m.desc}`,
    ];
    if (extra.flip) lines.push(`- Hướng: Lật ngang (flip: true)`);
    return lines.join("\n");
  }
  const acted = !!fx.mod.act;
  const lines = [
    `- Định danh (Code FX): [${fx.code}] ${fx.id} — "${m.name}"`,
    `- Phân loại: Code FX (Render trực tiếp từ code)`,
    `- File source: src/fx/${fx.id}.js`,
    `- Mô tả: ${m.desc}`,
    `- Thông số: Canvas ${m.size[0]}×${m.size[1]}px, Origin/Pivot (${m.origin[0]}, ${m.origin[1]}), ${m.fps} FPS, ${m.loop ? `loop (${+m.duration.toFixed(2)}s)` : `one-shot (${+m.duration.toFixed(2)}s)`}`,
  ];
  if (acted) lines.push(`- Chuyển động Character (Act): ${actFacts(fx.mod)} (dùng createAct hoặc đọc ${fx.id.split("/")[1].replace(/-(\w)/g, (_, c) => c.toUpperCase())}.act)`);
  if (extra.pal) lines.push(`- Bảng màu (Palette): PAL.${extra.pal}`);
  if (extra.flip) lines.push(`- Hướng: Lật ngang (flip: true)`);
  return lines.join("\n");
}
function buildAgentPrompt(fxList, extra = {}) {
  if (fxList.length === 1) {
    const fx = fxList[0];
    if (fx.kind === "asset") {
      const a = fx.asset;
      return [
        `Hãy thiết kế và gắn hiệu ứng Asset [${fx.code}] (${fx.id}) vào cho character của tôi:`,
        formatFxSpec(fx, extra),
        `- Tích hợp: Đọc thông số frame/fps trong "${a.json}" và sử dụng Sprite Sheet "${a.sheet}" (hoặc chuỗi frame PNG trong "${a.framesDir || a.dir}") để gắn vào animation/skill của character.`,
      ].join("\n");
    }
    return [
      `Hãy thiết kế và gắn hiệu ứng [${fx.code}] (${fx.id}) vào cho character của tôi:`,
      formatFxSpec(fx, extra),
      `- Tích hợp: Import từ "src/fx/${fx.id}.js" (hoặc xuất sprite sheet bằng \`node tools/render.mjs ${fx.id} --sheet\`), căn chỉnh theo điểm gốc origin (${fx.meta.origin[0]}, ${fx.meta.origin[1]}) và đồng bộ pose/timing của character với hiệu ứng này.`,
    ].join("\n");
  }
  return [
    `Hãy thiết kế và gắn bộ ${fxList.length} hiệu ứng sau vào cho character của tôi:`,
    ...fxList.map((fx, i) => `\n${i + 1}.\n${formatFxSpec(fx)}`),
    `\nHãy tích hợp các hiệu ứng trên (Code FX từ src/fx/ và Asset FX từ assets/vfx/), đồng bộ điểm gốc (origin/pivot) và chuyển động pose/timing cho character.`,
  ].join("\n");
}
function updateTray() {
  const tray = $("#tray");
  tray.hidden = selected.size === 0;
  $("#tray-info").textContent = `Đã chọn ${selected.size} hiệu ứng (${[...selected].map((f) => f.code).join(", ")})`;
  for (const t of tiles) {
    const on = selected.has(t.fx);
    t.fig.classList.toggle("selected", on);
    if (t.pickBtn) {
      t.pickBtn.setAttribute("aria-pressed", String(on));
      t.pickBtn.textContent = on ? "✓ Đã chọn" : "+ Chọn";
    }
  }
}

// ---- tiles
const tiles = [];
const sections = [];
function build() {
  $("#count").textContent = FX.length;
  $("#count-all").textContent = FX.length;
  $("#count-code").textContent = CODE_FX.length;
  $("#count-asset").textContent = ASSET_FX.length;
  const main = $("#grid");
  for (const c of ALL_CATEGORIES) {
    const list = FX.filter((f) => f.cat === c.id);
    if (!list.length) continue;
    const grid = el("div", { className: "grid" });
    const sec = el("section", { id: c.id }, [el("div", { className: "section-head" }, [el("h2", { textContent: c.name + "." }), el("p", { textContent: c.blurb })]), grid]);
    sections.push({ c, sec, list });
    for (const fx of list) {
      const isAsset = fx.kind === "asset";
      const mediaEl = isAsset
        ? el("img", { className: "asset-preview", alt: fx.name, loading: "lazy" })
        : el("canvas", { ariaLabel: fx.name });
      const b = !isAsset && fx.mod.act ? actBounds(fx.mod) : null;
      const [fw, fh] = b ? [b.x1 - b.x0, b.y1 - b.y0] : fx.meta.size;
      const pathHint = isAsset ? fx.asset.dir : `src/fx/${fx.id}.js`;
      const idBtn = el("button", { className: "badge-id", type: "button", title: "Click để copy mã định danh ID" }, [
        el("b", { textContent: fx.code }),
        fx.id,
      ]);
      idBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        copyText(`[${fx.code}] ${fx.id} (${pathHint})`, `Đã copy định danh: [${fx.code}] ${fx.id}`);
      });
      const pickBtn = el("button", { className: "badge-pick", type: "button", textContent: "+ Chọn", title: "Chọn nhiều hiệu ứng để gộp prompt cho Agent" });
      pickBtn.setAttribute("aria-pressed", "false");
      pickBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (selected.has(fx)) selected.delete(fx);
        else selected.add(fx);
        updateTray();
      });
      const agentBtn = el("button", {
        className: "btn-agent",
        type: "button",
        textContent: `⚡ Copy cho Agent (${fx.code})`,
        title: "One-click copy lệnh yêu cầu Agent gắn hiệu ứng này vào Character",
      });
      agentBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        copyText(buildAgentPrompt([fx]), `Đã copy lệnh Agent cho [${fx.code}] ${fx.id}!`);
        agentBtn.classList.add("copied");
        agentBtn.textContent = `✓ Đã copy ${fx.code}`;
        setTimeout(() => {
          agentBtn.classList.remove("copied");
          agentBtn.textContent = `⚡ Copy cho Agent (${fx.code})`;
        }, 1400);
      });
      const tileCls = isAsset
        ? "tile asset"
        : isScreen(fx)
          ? "tile big screen"
          : fw > 200 || fh > 170 || (b && (fw > 130 || fx.mod.act.target || fx.mod.act.targets))
            ? "tile big"
            : "tile";
      const subLabel = isAsset ? `${fx.asset.frames}f · ${+fx.meta.duration.toFixed(2)}s` : fx.meta.loop ? "loop" : `${+fx.meta.duration.toFixed(2)}s`;
      const fig = el("figure", { className: tileCls, tabIndex: 0 }, [
        el("div", { className: "stage" }, [
          el("div", { className: "tile-badges" }, [idBtn, pickBtn]),
          mediaEl,
        ]),
        el("figcaption", {}, [el("b", { textContent: fx.name }), el("small", { textContent: subLabel })]),
        el("div", { className: "tile-actions" }, [agentBtn]),
      ]);
      const t = { fx, fig, cv: isAsset ? null : mediaEl, img: isAsset ? mediaEl : null, pickBtn, player: null, visible: false, hover: false, loaded: false };
      fig.addEventListener("click", () => openDetail(fx));
      fig.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openDetail(fx)));
      fig.addEventListener("pointerenter", () => (t.hover = true));
      fig.addEventListener("pointerleave", () => (t.hover = false));
      grid.append(fig);
      tiles.push(t);
    }
    main.append(sec);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const t = tiles.find((x) => x.fig === e.target);
      t.visible = e.isIntersecting;
      if (t.visible) {
        if (t.fx.kind === "asset") {
          if (!t.loaded && t.img) {
            t.img.src = "../" + t.fx.asset.gif;
            t.loaded = true;
          }
        } else if (!t.player) {
          t.player = isScreen(t.fx) ? new Player(t.cv, t.fx, 16 / 9, 1) : new Player(t.cv, t.fx, 6 / 5, 1.25);
          if (reduced) t.player.seek(t.fx.meta.duration * 0.4);
        }
      }
    }
  }, { rootMargin: "250px" });
  tiles.forEach((t) => io.observe(t.fig));
}

// ---- filters & modes
const state = { mode: "all", cat: "all", q: "" };
function chips() {
  const box = $("#chips");
  box.replaceChildren();
  const visibleSections = sections.filter((s) => state.mode === "all" || s.c.kind === state.mode);
  const totalInMode = visibleSections.reduce((sum, s) => sum + s.list.length, 0);
  const mk = (id, label, n) => {
    const b = el("button", { className: "chip", type: "button" }, [label, el("span", { textContent: n })]);
    b.dataset.cat = id;
    b.setAttribute("aria-pressed", String(id === state.cat));
    b.addEventListener("click", () => setCat(id));
    box.append(b);
  };
  mk("all", "all", totalInMode);
  for (const s of visibleSections) mk(s.c.id, s.c.name, s.list.length);
}
function setMode(mode) {
  state.mode = ["all", "code", "asset"].includes(mode) ? mode : "all";
  document.querySelectorAll(".mode-tab").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === state.mode)));
  if (state.cat !== "all") {
    const sec = sections.find((s) => s.c.id === state.cat);
    if (!sec || (state.mode !== "all" && sec.c.kind !== state.mode)) state.cat = "all";
  }
  chips();
  filter();
}
function setCat(id, fromHash = false) {
  const sec = sections.find((s) => s.c.id === id);
  if (sec && state.mode !== "all" && sec.c.kind !== state.mode) {
    state.mode = sec.c.kind;
    document.querySelectorAll(".mode-tab").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === state.mode)));
    chips();
  }
  state.cat = sec ? id : "all";
  document.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
  if (!fromHash) history.replaceState(null, "", state.cat === "all" ? location.pathname : "#" + state.cat);
  filter();
  if (!fromHash) window.scrollTo({ top: 0 });
}
function filter() {
  const q = state.q.trim().toLowerCase();
  let shown = 0;
  for (const s of sections) {
    const modeMatch = state.mode === "all" || s.c.kind === state.mode;
    let any = false;
    for (const fx of s.list) {
      const t = tiles.find((x) => x.fx === fx);
      const hit = modeMatch && (state.cat === "all" || state.cat === s.c.id) && (!q || [fx.code, fx.id, fx.name, fx.meta.desc, ...fx.meta.tags].join(" ").toLowerCase().includes(q));
      t.fig.hidden = !hit;
      any ||= hit;
      shown += hit;
    }
    s.sec.hidden = !any;
  }
  $("#none").hidden = shown > 0;
}

// ---- detail
let detail = null;
function openDetail(fx) {
  const d = $("#detail");
  const big = $("#big"), stageBox = big.parentElement, screen = isScreen(fx);
  stageBox.classList.toggle("screen", screen);
  const oldImg = stageBox.querySelector("img.asset-preview");
  if (oldImg) oldImg.remove();
  const m = fx.meta;
  $("#d-name").textContent = m.name;
  $("#d-id").textContent = `[${fx.code}] ${fx.id} (${fx.kind === "asset" ? "Asset VFX" : "Code FX"})`;
  $("#d-desc").textContent = m.desc;

  if (fx.kind === "asset") {
    big.hidden = true;
    const a = fx.asset;
    const previewImg = el("img", { className: "asset-preview", src: "../" + a.gif, alt: m.name });
    stageBox.insertBefore(previewImg, $("#d-close"));
    stageBox.style.background = "";
    detail = {
      isAsset: true,
      fx,
      flip: false,
      playing: true,
      previewImg,
      stageBox,
      opts: {},
      setBg(kind) {
        const bgColors = { dark: "#15131d", dungeon: "#1c1614", night: "#0d1220", grass: "#142216", day: "#446688", light: "#cccccc", none: "repeating-conic-gradient(#1a1a1a 0% 25%, #111 0% 50%) 0 0 / 16px 16px" };
        stageBox.style.background = bgColors[kind] || "#15131d";
      },
      restart() {
        previewImg.src = "../" + a.gif + "?t=" + Date.now();
        previewImg.style.transform = this.flip ? "scaleX(-1)" : "";
      },
      tick() {},
    };
    $("#d-facts").replaceChildren(
      ...[
        ["loại", "Asset VFX (Sprite Sheet + GIF + Frames PNG)"],
        ["thời lượng", `${m.duration} s, ${a.frames} frames @ ${m.fps} fps`],
        ["kích thước", `${m.size[0]} × ${m.size[1]} px`],
        ["thư mục", a.dir],
        ["sprite sheet", a.sheet],
        ...(a.framesDir ? [["frames rời", `${a.framesDir}/ (${a.frames} files)`]] : []),
        ["metadata", a.json],
      ].flatMap(([k, v]) => [el("dt", { textContent: k }), el("dd", { textContent: v })]),
    );
    $("#d-bg").replaceChildren(...BACKDROPS.concat("none").map((b) => btn(b, () => detail.setBg(b), b === "dark", "bg")));
    $("#d-speed").replaceChildren();
    $("#d-pal").parentElement.hidden = true;
    $("#d-play").hidden = true;
    $("#d-actor").hidden = true;
    $("#d-flip").setAttribute("aria-pressed", "false");
    $("#d-sheet").replaceChildren();
    code(fx);
    d.showModal();
    d.scrollTop = 0;
    return;
  }

  big.hidden = false;
  stageBox.style.background = "";
  $("#d-pal").parentElement.hidden = false;
  $("#d-play").hidden = false;
  detail = screen ? new Player(big, fx, 16 / 9, 1) : new Player(big, fx, 16 / 10, 1.6);
  const frames = Math.round(m.duration * m.fps) + (m.loop ? 0 : 1);
  $("#d-facts").replaceChildren(
    ...[["loại", m.loop ? "Code FX · loop" : "Code FX · one-shot"], ["length", `${+m.duration.toFixed(2)} s, ${frames} frames at ${m.fps} fps`], ...(fx.mod.act ? [["acted", actFacts(fx.mod)]] : []), ["canvas", `${m.size[0]} × ${m.size[1]} px`], ["tags", m.tags.join(", ")]].flatMap(([k, v]) => [el("dt", { textContent: k }), el("dd", { textContent: v })]),
  );
  // controls
  $("#d-bg").replaceChildren(...BACKDROPS.concat("none").map((b) => btn(b, () => detail.setBg(b), b === m.bg, "bg")));
  $("#d-speed").replaceChildren(...[0.25, 0.5, 1].map((s) => btn(`${s}×`, () => (detail.speed = s), s === 1, "speed")));
  const pal = $("#d-pal");
  pal.replaceChildren(el("option", { value: "", textContent: "its own" }), ...Object.keys(PAL).map((k) => el("option", { value: k, textContent: k })));
  pal.value = "";
  $("#d-actor").hidden = !m.actor;
  $("#d-actor").setAttribute("aria-pressed", "true");
  $("#d-flip").setAttribute("aria-pressed", "false");
  $("#d-play").setAttribute("aria-pressed", "true");
  $("#d-play").textContent = "pause";
  $("#d-sheet").replaceChildren();
  code(fx);
  d.showModal();
  d.scrollTop = 0;
}
// what the body does around the effect, in a line: the wind-up, the freeze, the recovery
function actFacts(mod) {
  const k = mod.act.poses, lead = Math.max(0, -k[0][0]), end = k[k.length - 1][0] - mod.meta.duration, hits = (mod.act.hits ?? []).filter((h) => h.stop);
  const parts = [];
  if (lead > 0) parts.push(`${lead.toFixed(2)} s wind-up`);
  if (hits.length) parts.push(`${hits.length === 1 ? `${Math.round(hits[0].stop * 1000)} ms freeze` : `${hits.length} freezes`} at ${hits[0].t.toFixed(2)} s`);
  if (!mod.meta.loop && end > 0.02) parts.push(`${end.toFixed(2)} s recovery`);
  return parts.join(", ") || "the body moves with it";
}
function btn(label, fn, on, group) {
  const b = el("button", { className: "btn", type: "button", textContent: label });
  b.setAttribute("aria-pressed", String(!!on));
  b.addEventListener("click", () => {
    if (group) b.parentElement.querySelectorAll(".btn").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    fn();
  });
  return b;
}
function code(fx) {
  if (fx.kind === "asset") {
    const a = fx.asset;
    $("#d-code").textContent = [
      `// [${fx.code}] ${fx.name} (${fx.id})`,
      `// Sprite Sheet: ${a.sheet}`,
      `// Preview GIF:  ${a.gif}`,
      `// Metadata:     ${a.json}`,
      ...(a.framesDir ? [`// Frames PNG:   ${a.framesDir}/ (${a.frames} frames)`] : []),
      ``,
      `const meta = await fetch("/${a.json}").then((r) => r.json());`,
      `const sheet = new Image();`,
      `sheet.src = "/${a.sheet}";`,
      `// Size: ${fx.meta.size[0]}x${fx.meta.size[1]}px, ${a.frames} frames @ ${fx.meta.fps} FPS (${fx.meta.duration}s)`,
    ].join("\n");
    $("#d-src").href = `../${a.json}`;
    return;
  }
  const v = fx.id.split("/")[1].replace(/-(\w)/g, (_, c) => c.toUpperCase());
  const opts = { x: 160, y: 120, ...(detail.opts.palette ? { palette: "[…]" } : {}), ...(detail.flip ? { flip: true } : {}) };
  const acted = !!fx.mod.act, make = acted ? "createAct" : "createFx";
  $("#d-code").textContent = [
    `import { createFrame, ${make}, composite } from "pixelfx";`,
    `import * as ${v} from "pixelfx/fx/${fx.id}";`,
    ``,
    `const frame = createFrame(320, 180);`,
    `const fx = ${make}(${v}, ${JSON.stringify(opts).replace(/"\[…\]"/, "[…]").replace(/"(\w+)":/g, "$1: ").replace(/,/g, ", ")});`,
    ``,
    `// every tick`,
    `fx.update(dt);`,
    `fx.draw(frame);          // color + light buffers`,
    `composite(frame, imageData.data, null);`,
    ...(acted ? [``, `// your own character? read the timing: ${v}.act (poses, hits, freezes)`] : []),
  ].join("\n");
  $("#d-src").href = `${REPO}/blob/main/src/fx/${fx.id}.js`;
}
function sheet() {
  const fx = detail.fx, m = fx.meta;
  if (fx.kind === "asset") {
    const a = fx.asset;
    const pic = el("img", { src: "../" + a.sheet, alt: `${m.name} sprite sheet` });
    $("#d-sheet").replaceChildren(
      pic,
      el("p", { textContent: `Sprite Sheet / Atlas có sẵn: ${a.sheet} (${a.frames} frames of ${m.size[0]} × ${m.size[1]} px, ${m.fps} fps).` }),
    );
    return;
  }
  const [w, h] = m.size, n = Math.max(1, Math.round(m.duration * m.fps) + (m.loop ? 0 : 1));
  const cols = Math.min(n, Math.max(1, Math.ceil(Math.sqrt((n * h) / w)))), rows = Math.ceil(n / cols);
  const cv = el("canvas", { width: cols * w, height: rows * h }), ctx = cv.getContext("2d");
  const frame = createFrame(w, h), img = ctx.createImageData(w, h);
  const inst = createFx(fx.mod, { x: m.origin[0], y: m.origin[1], ...detail.opts, flip: detail.flip });
  for (let i = 0; i < n; i++) {
    if (i) inst.update(1 / m.fps);
    inst.draw(clearFrame(frame));
    composite(frame, img.data, null);
    ctx.putImageData(img, (i % cols) * w, Math.floor(i / cols) * h);
  }
  const k = Math.max(1, Math.min(4, Math.floor(1100 / (cols * w))));
  const pic = el("img", { src: cv.toDataURL("image/png"), alt: `${m.name} sprite sheet`, width: cols * w * k, height: rows * h * k });
  $("#d-sheet").replaceChildren(pic, el("p", { textContent: `${n} frames of ${w} × ${h} px, ${cols} across, ${m.fps} fps, ${m.loop ? "loops" : "plays once"}. Save the image, or run: node tools/render.mjs ${fx.id} --sheet` }));
}
function wireDetail() {
  const d = $("#detail");
  $("#d-close").addEventListener("click", () => d.close());
  d.addEventListener("close", () => (detail = null));
  d.addEventListener("click", (e) => e.target === d && d.close());
  $("#d-play").addEventListener("click", (e) => {
    if (!detail || detail.isAsset) return;
    detail.playing = !detail.playing;
    e.target.setAttribute("aria-pressed", String(detail.playing));
    e.target.textContent = detail.playing ? "pause" : "play";
  });
  $("#d-again").addEventListener("click", () => detail && detail.restart());
  $("#d-flip").addEventListener("click", (e) => {
    if (!detail) return;
    detail.flip = !detail.flip;
    e.target.setAttribute("aria-pressed", String(detail.flip));
    detail.restart();
    code(detail.fx);
  });
  $("#d-actor").addEventListener("click", (e) => {
    if (!detail || detail.isAsset) return;
    detail.actor = !detail.actor;
    e.target.setAttribute("aria-pressed", String(detail.actor));
    // with an act, the character is the performance: off shows the effect alone, as a sprite sheet has it
    if (detail.fx.mod.act) detail.layout(detail.aspect, detail.pad);
    detail.dirty = true;
  });
  $("#d-seed").addEventListener("click", () => {
    if (!detail || detail.isAsset) return;
    detail.opts.seed = 1 + Math.floor(Math.random() * 9999);
    detail.restart();
  });
  $("#d-pal").addEventListener("change", (e) => {
    if (!detail || detail.isAsset) return;
    if (e.target.value) detail.opts.palette = PAL[e.target.value];
    else delete detail.opts.palette;
    detail.restart();
    code(detail.fx);
  });
  $("#d-make").addEventListener("click", sheet);
  $("#d-copy").addEventListener("click", async (e) => {
    const text = $("#d-code").textContent;
    try {
      await navigator.clipboard.writeText(text);
      e.target.textContent = "copied";
    } catch {
      getSelection().selectAllChildren($("#d-code"));
      e.target.textContent = "selected";
    }
    setTimeout(() => (e.target.textContent = "copy"), 1400);
  });
  $("#d-copy-id").addEventListener("click", () => {
    if (!detail) return;
    const fx = detail.fx;
    const pathHint = fx.kind === "asset" ? fx.asset.dir : `src/fx/${fx.id}.js`;
    copyText(`[${fx.code}] ${fx.id} (${pathHint})`, `Đã copy định danh: [${fx.code}] ${fx.id}`);
  });
  $("#d-copy-agent").addEventListener("click", () => {
    if (!detail) return;
    const fx = detail.fx;
    const pal = fx.kind === "code" ? $("#d-pal").value || undefined : undefined;
    copyText(buildAgentPrompt([fx], { pal, flip: detail.flip }), `Đã copy lệnh Agent cho [${fx.code}] ${fx.id}!`);
  });
  $("#tray-copy").addEventListener("click", () => {
    if (!selected.size) return;
    const list = [...selected];
    copyText(buildAgentPrompt(list), `Đã copy lệnh Agent cho ${list.length} hiệu ứng!`);
  });
  $("#tray-clear").addEventListener("click", () => {
    selected.clear();
    updateTray();
  });
  document.querySelectorAll(".mode-tab").forEach((b) => {
    b.addEventListener("click", () => setMode(b.dataset.mode));
  });
}

// ---- the clock
let last = performance.now();
function frameLoop(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (detail) detail.tick(dt);
  else for (const t of tiles) if (t.visible && t.player && !t.fig.hidden && (!reduced || t.hover)) t.player.tick(dt);
  requestAnimationFrame(frameLoop);
}

build();
chips();
wireDetail();
$("#q").addEventListener("input", (e) => {
  state.q = e.target.value;
  filter();
});
setCat(location.hash.slice(1) || "all", true);
addEventListener("hashchange", () => setCat(location.hash.slice(1) || "all", true));
requestAnimationFrame(frameLoop);
