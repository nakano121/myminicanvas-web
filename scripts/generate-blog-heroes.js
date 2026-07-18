// Crayon-doodle hero generator for My Mini Canvas blog.
// Emits one HTML file per scene (1200x800 inline SVG) for headless-Chrome screenshotting.
const fs = require("fs");
const path = require("path");

const W = 1200, H = 800;
const OUT = path.join(__dirname, "html");
fs.mkdirSync(OUT, { recursive: true });

// ---------- seeded PRNG ----------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- palette ----------
const P = {
  red: "#E84855", orange: "#F77F00", yellow: "#FFC53D", gold: "#F9A620",
  green: "#57A773", leaf: "#8BC34A", blue: "#4A90D9", sky: "#69A8E0",
  navy: "#33658A", purple: "#9B5DE5", pink: "#FF70A6", brown: "#A0703C",
  ink: "#3A3335", cream: "#FFF9EC", white: "#FFFFFF", gray: "#B9B2A8",
};

// ---------- drawing kit ----------
function makeKit(seed) {
  const rnd = mulberry32(seed);
  let clipId = 0;
  const defsExtra = [];

  const jit = (m) => (rnd() * 2 - 1) * m;

  function subdivide(x1, y1, x2, y2, step = 26) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(len / step));
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push([x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n]);
    return pts;
  }

  function wobble(pts, mag = 3.5) {
    return pts.map(([x, y], i) =>
      i === 0 || i === pts.length - 1 ? [x + jit(mag * 0.5), y + jit(mag * 0.5)] : [x + jit(mag), y + jit(mag)]
    );
  }

  function smoothPath(pts, close = false) {
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      d += ` Q${x1.toFixed(1)},${y1.toFixed(1)} ${((x1 + x2) / 2).toFixed(1)},${((y1 + y2) / 2).toFixed(1)}`;
    }
    const [lx, ly] = pts[pts.length - 1];
    d += ` L${lx.toFixed(1)},${ly.toFixed(1)}`;
    if (close) d += " Z";
    return d;
  }

  function strokePath(d, c, w, o = 1) {
    // double pass = waxy crayon layering
    return (
      `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>` +
      `<path d="${d}" fill="none" stroke="${c}" stroke-width="${Math.max(1.5, w * 0.55)}" stroke-linecap="round" stroke-linejoin="round" opacity="${0.35 * o}" transform="translate(${jit(2.5)},${jit(2.5)})"/>`
    );
  }

  function line(x1, y1, x2, y2, c, w = 9, o = 1) {
    return strokePath(smoothPath(wobble(subdivide(x1, y1, x2, y2))), c, w, o);
  }

  function poly(pts, c, w = 9, close = true, o = 1) {
    let all = [];
    for (let i = 0; i < pts.length - (close ? 0 : 1); i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
      const seg = wobble(subdivide(x1, y1, x2, y2));
      all = all.concat(i === 0 ? seg : seg.slice(1));
    }
    return strokePath(smoothPath(all), c, w, o);
  }

  function circlePts(cx, cy, r, n = 22, mag = 0.07) {
    const start = rnd() * Math.PI * 2, pts = [];
    for (let i = 0; i <= n; i++) {
      const a = start + (i / n) * Math.PI * 2;
      const rr = r * (1 + jit(mag));
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return pts;
  }

  function circle(cx, cy, r, c, w = 9, o = 1) {
    return strokePath(smoothPath(circlePts(cx, cy, r)), c, w, o);
  }

  function arc(cx, cy, r, a0, a1, c, w = 9, o = 1) {
    const n = Math.max(4, Math.round((Math.abs(a1 - a0) * r) / 30));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([cx + Math.cos(a) * r + jit(2.5), cy + Math.sin(a) * r + jit(2.5)]);
    }
    return strokePath(smoothPath(pts), c, w, o);
  }

  // scribble fill clipped to a shape path
  function scribble(shapeD, bx, by, bw, bh, c, w = 8, angle = -18, gap = null, o = 0.85) {
    const id = `clip${++clipId}`;
    defsExtra.push(`<clipPath id="${id}"><path d="${shapeD}"/></clipPath>`);
    const g = gap || w * 1.55;
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const cx = bx + bw / 2, cy = by + bh / 2;
    const diag = Math.hypot(bw, bh) / 2 + g;
    let zig = [];
    let flip = false;
    for (let t = -diag; t <= diag; t += g) {
      const p1 = [-diag, t + jit(3)], p2 = [diag, t + jit(3)];
      const [a, b] = flip ? [p2, p1] : [p1, p2];
      zig.push(a, [(a[0] + b[0]) / 2 + jit(14), (a[1] + b[1]) / 2 + jit(4)], b);
      flip = !flip;
    }
    const world = zig.map(([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos]);
    return `<g clip-path="url(#${id})">${strokePath(smoothPath(world), c, w, o)}</g>`;
  }

  function blobD(cx, cy, r) { return smoothPath(circlePts(cx, cy, r, 18, 0.09), true); }

  function scribbleCircle(cx, cy, r, c, w = 8, angle = -18, o = 0.85) {
    return scribble(blobD(cx, cy, r * 0.96), cx - r, cy - r, r * 2, r * 2, c, w, angle, null, o);
  }

  function rectD(x, y, w2, h2) {
    return smoothPath(wobble([[x, y], [x + w2, y], [x + w2, y + h2], [x, y + h2], [x, y]].flatMap((p, i, a) =>
      i < a.length - 1 ? subdivide(...p, ...a[i + 1]).slice(i ? 1 : 0) : []
    )), true);
  }

  function scribbleRect(x, y, w2, h2, c, sw = 8, angle = -18, o = 0.85) {
    return scribble(rectD(x + w2 * 0.03, y + h2 * 0.03, w2 * 0.94, h2 * 0.94), x, y, w2, h2, c, sw, angle, null, o);
  }

  function polyD(pts) {
    let all = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
      const seg = wobble(subdivide(x1, y1, x2, y2), 2.5);
      all = all.concat(i === 0 ? seg : seg.slice(1));
    }
    return smoothPath(all, true);
  }

  function scribblePoly(pts, c, sw = 8, angle = -18, o = 0.85) {
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const bx = Math.min(...xs), by = Math.min(...ys);
    return scribble(polyD(pts), bx, by, Math.max(...xs) - bx, Math.max(...ys) - by, c, sw, angle, null, o);
  }

  // ---------- motifs ----------
  function sun(cx, cy, r, { face = true, ray = P.orange, body = P.yellow } = {}) {
    let s = scribbleCircle(cx, cy, r, body, 9) + circle(cx, cy, r, P.gold, 8);
    const n = 12 + Math.round(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + jit(0.1);
      s += line(cx + Math.cos(a) * (r + 12), cy + Math.sin(a) * (r + 12),
        cx + Math.cos(a) * (r + 34 + jit(14)), cy + Math.sin(a) * (r + 34 + jit(14)), ray, 8);
    }
    if (face) s += faceDot(cx - r * 0.32, cy - r * 0.15) + faceDot(cx + r * 0.32, cy - r * 0.15) +
      arc(cx, cy + r * 0.05, r * 0.42, 0.35, Math.PI - 0.35, P.ink, 7);
    return s;
  }

  function faceDot(x, y) { return circle(x, y, 4.5, P.ink, 7); }

  function heart(cx, cy, s, c, filled = true) {
    const pts = [];
    for (let i = 0; i <= 30; i++) {
      const t = (i / 30) * Math.PI * 2;
      pts.push([cx + s * 0.061 * 16 * Math.pow(Math.sin(t), 3) + jit(2.5),
      cy - s * 0.061 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + jit(2.5)]);
    }
    const d = smoothPath(pts, true);
    let out = "";
    if (filled) out += scribble(d, cx - s, cy - s, s * 2, s * 2, c, Math.max(6, s / 7), -25);
    out += strokePath(d, c, Math.max(6, s / 8));
    return out;
  }

  function star(cx, cy, s, c, filled = true) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? s : s * 0.45;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    let out = "";
    if (filled) out += scribblePoly(pts, c, Math.max(5, s / 6), -30);
    out += poly(pts, c, Math.max(5, s / 7));
    return out;
  }

  function cloud(cx, cy, s, c = P.sky) {
    return arc(cx - s, cy, s * 0.55, Math.PI * 0.5, Math.PI * 1.5, c, 8) +
      arc(cx - s * 0.35, cy - s * 0.42, s * 0.6, Math.PI * 0.85, Math.PI * 1.95, c, 8) +
      arc(cx + s * 0.45, cy - s * 0.3, s * 0.55, Math.PI * 1.1, Math.PI * 2.2, c, 8) +
      arc(cx + s, cy, s * 0.5, Math.PI * 1.5, Math.PI * 2.5, c, 8) +
      line(cx - s * 1.05, cy + s * 0.5, cx + s * 1.05, cy + s * 0.5, c, 8);
  }

  function house(cx, groundY, s, { wall = P.yellow, roof = P.red, door = P.blue, win = 2 } = {}) {
    const w2 = s, h2 = s * 0.8, x = cx - w2 / 2, y = groundY - h2;
    let out = scribbleRect(x, y, w2, h2, wall, 9) + poly([[x, y], [x + w2, y], [x + w2, y + h2], [x, y + h2]], P.ink, 9);
    const rp = [[x - s * 0.12, y], [cx, y - s * 0.5], [x + w2 + s * 0.12, y]];
    out += scribblePoly(rp, roof, 9, -30) + poly(rp, P.ink, 9, false);
    out += line(rp[0][0], rp[0][1], rp[2][0], rp[2][1], P.ink, 9);
    const dw = s * 0.24, dh = s * 0.4;
    out += scribbleRect(cx - dw / 2, groundY - dh, dw, dh, door, 7) +
      poly([[cx - dw / 2, groundY - dh], [cx + dw / 2, groundY - dh], [cx + dw / 2, groundY], [cx - dw / 2, groundY]], P.ink, 7, false);
    const wy = y + h2 * 0.25, ws = s * 0.17;
    const wxs = win === 2 ? [x + w2 * 0.22, x + w2 * 0.78] : [cx];
    for (const wx of wxs) {
      out += poly([[wx - ws / 2, wy - ws / 2], [wx + ws / 2, wy - ws / 2], [wx + ws / 2, wy + ws / 2], [wx - ws / 2, wy + ws / 2]], P.ink, 6) +
        line(wx, wy - ws / 2, wx, wy + ws / 2, P.ink, 5) + line(wx - ws / 2, wy, wx + ws / 2, wy, P.ink, 5);
    }
    return out;
  }

  function tree(cx, groundY, s) {
    return line(cx - s * 0.06, groundY, cx - s * 0.02, groundY - s * 0.55, P.brown, 14) +
      scribbleCircle(cx, groundY - s * 0.82, s * 0.34, P.leaf, 9, -20) +
      circle(cx, groundY - s * 0.82, s * 0.34, P.green, 8);
  }

  function flower(cx, groundY, s, c = P.pink) {
    let out = line(cx, groundY, cx, groundY - s * 0.6, P.green, 6);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      out += circle(cx + Math.cos(a) * s * 0.16, cy0(groundY, s) + Math.sin(a) * s * 0.16, s * 0.11, c, 6);
    }
    out += scribbleCircle(cx, cy0(groundY, s), s * 0.09, P.gold, 5);
    return out;
    function cy0(g, s2) { return g - s2 * 0.72; }
  }

  function grass(y, x0 = 40, x1 = W - 40) {
    let out = line(x0, y, x1, y, P.green, 9);
    for (let x = x0 + 30; x < x1; x += 55 + rnd() * 40) {
      out += line(x, y, x - 7 + jit(3), y - 16 - rnd() * 12, P.leaf, 6) +
        line(x + 8, y, x + 12 + jit(3), y - 14 - rnd() * 10, P.leaf, 6);
    }
    return out;
  }

  function skyScribbles(c = P.sky) {
    let out = "";
    for (const [cx, cy, w2] of [[180, 90, 150], [600, 70, 200], [1020, 95, 150]]) {
      const pts = [];
      for (let i = 0; i < 14; i++) pts.push([cx - w2 / 2 + (w2 * i) / 13 + jit(18), cy + jit(16)]);
      out += strokePath(smoothPath(pts), c, 7, 0.5);
    }
    return out;
  }

  function stickKid(cx, groundY, h2, { shirt = P.red, skin = "#F2B98E", hair = P.brown, dress = false, armsUp = false, flip = false } = {}) {
    const headR = h2 * 0.17, headY = groundY - h2 + headR;
    let out = "";
    // hair scribble
    out += arc(cx, headY - headR * 0.25, headR * 1.05, Math.PI * 1.05, Math.PI * 1.95, hair, 9);
    out += circle(cx, headY, headR, skin, Math.max(5, headR * 0.18));
    const eyeR = Math.max(2, headR * 0.09), eyeW = Math.max(3, headR * 0.12);
    out += circle(cx - headR * 0.4, headY - headR * 0.08, eyeR, P.ink, eyeW) +
      circle(cx + headR * 0.4, headY - headR * 0.08, eyeR, P.ink, eyeW) +
      arc(cx, headY + headR * 0.1, headR * 0.5, 0.4, Math.PI - 0.4, P.ink, Math.max(3.5, headR * 0.13));
    const nY = headY + headR, hipY = groundY - h2 * 0.32;
    if (dress) {
      const tp = [[cx - h2 * 0.05, nY], [cx + h2 * 0.05, nY], [cx + h2 * 0.22, hipY], [cx - h2 * 0.22, hipY]];
      out += scribblePoly(tp, shirt, 7, -22) + poly(tp, shirt, 7);
    } else {
      const tp = [[cx - h2 * 0.14, nY], [cx + h2 * 0.14, nY], [cx + h2 * 0.14, hipY], [cx - h2 * 0.14, hipY]];
      out += scribblePoly(tp, shirt, 7, -22) + poly(tp, shirt, 7);
    }
    const aY = nY + h2 * 0.1;
    const dir = flip ? -1 : 1;
    if (armsUp) {
      out += line(cx - h2 * 0.13, aY, cx - h2 * 0.34, aY - h2 * 0.22, skin, 7) +
        line(cx + h2 * 0.13, aY, cx + h2 * 0.34, aY - h2 * 0.22, skin, 7);
    } else {
      out += line(cx - h2 * 0.13, aY, cx - h2 * 0.3 * dir - (dir < 0 ? h2 * 0.0 : 0), aY + h2 * 0.16, skin, 7) +
        line(cx + h2 * 0.13, aY, cx + h2 * 0.3, aY + h2 * 0.16, skin, 7);
    }
    out += line(cx - h2 * 0.08, hipY, cx - h2 * 0.12, groundY, skin, 8) +
      line(cx + h2 * 0.08, hipY, cx + h2 * 0.12, groundY, skin, 8);
    return out;
  }

  function bubble(cx, cy, w2, h2, tail = [0, 1]) {
    const rx = w2 / 2, ry = h2 / 2;
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * rx * (1 + jit(0.05)), cy + Math.sin(a) * ry * (1 + jit(0.05))]);
    }
    const d = smoothPath(pts, true);
    let out = `<path d="${d}" fill="${P.white}" opacity="0.9"/>` + strokePath(d, P.ink, 7);
    const tx = cx + tail[0] * rx * 0.6, ty = cy + tail[1] * ry;
    out += line(tx, ty - 6, tx + tail[0] * 26 - 18, ty + 44, P.ink, 6) +
      line(tx + 34, ty - 8, tx + tail[0] * 26 + 6, ty + 40, P.ink, 6);
    return out;
  }

  function paper(x, y, w2, h2, rot, inner = "", tape = true) {
    const cx = x + w2 / 2, cy = y + h2 / 2;
    const d = rectD(x, y, w2, h2);
    let out = `<g transform="rotate(${rot} ${cx} ${cy})">`;
    out += `<path d="${d}" fill="${P.white}"/>`;
    out += `<path d="${d}" fill="none" stroke="#E4DCCC" stroke-width="5"/>`;
    out += strokePath(d, P.gray, 5, 0.65);
    out += inner;
    if (tape) {
      out += `<rect x="${x + w2 * 0.08}" y="${y - 10}" width="54" height="26" rx="4" fill="#F3E9B0" opacity="0.85" transform="rotate(-6 ${x + w2 * 0.08 + 27} ${y})"/>`;
      out += `<rect x="${x + w2 * 0.75}" y="${y - 8}" width="54" height="26" rx="4" fill="#F3E9B0" opacity="0.85" transform="rotate(5 ${x + w2 * 0.75 + 27} ${y})"/>`;
    }
    out += `</g>`;
    return out;
  }

  function crayonStick(x, y, len, angle, c) {
    const h2 = len * 0.22;
    let out = `<g transform="rotate(${angle} ${x} ${y})">`;
    const bx = x - len / 2, by = y - h2 / 2;
    out += scribbleRect(bx, by, len * 0.8, h2, c, 7, 0) +
      poly([[bx, by], [bx + len * 0.8, by], [bx + len * 0.8, by + h2], [bx, by + h2]], c, 7);
    out += scribblePoly([[bx + len * 0.8, by], [bx + len, y], [bx + len * 0.8, by + h2]], c, 6, 0) +
      poly([[bx + len * 0.8, by], [bx + len, y], [bx + len * 0.8, by + h2]], c, 6);
    out += line(bx + len * 0.18, by + 4, bx + len * 0.18, by + h2 - 4, P.ink, 5, 0.5) +
      line(bx + len * 0.62, by + 4, bx + len * 0.62, by + h2 - 4, P.ink, 5, 0.5);
    out += `</g>`;
    return out;
  }

  function sparkle(cx, cy, s, c = P.gold) {
    return line(cx - s, cy, cx + s, cy, c, 6) + line(cx, cy - s, cx, cy + s, c, 6) +
      line(cx - s * 0.55, cy - s * 0.55, cx + s * 0.55, cy + s * 0.55, c, 5, 0.7) +
      line(cx - s * 0.55, cy + s * 0.55, cx + s * 0.55, cy - s * 0.55, c, 5, 0.7);
  }

  function note(cx, cy, s, c = P.purple) {
    return scribbleCircle(cx, cy, s * 0.32, c, 5, -20) + circle(cx, cy, s * 0.32, c, 6) +
      line(cx + s * 0.3, cy, cx + s * 0.3, cy - s, c, 7) +
      line(cx + s * 0.3, cy - s, cx + s * 0.75, cy - s * 0.82, c, 7);
  }

  function rainbowArcs(cx, cy, r0, colors = [P.red, P.orange, P.yellow, P.green, P.blue, P.purple]) {
    let out = "";
    colors.forEach((c, i) => { out += arc(cx, cy, r0 - i * 24, Math.PI, Math.PI * 2, c, 14); });
    return out;
  }

  function frame(kit) { return ""; }

  return {
    rnd, jit, line, poly, circle, arc, scribble, scribbleCircle, scribbleRect, scribblePoly,
    blobD, rectD, polyD, smoothPath, strokePath, circlePts, wobble, subdivide,
    sun, heart, star, cloud, house, tree, flower, grass, skyScribbles, stickKid, bubble,
    paper, crayonStick, sparkle, note, rainbowArcs, faceDot,
    defs: () => defsExtra.join("\n"),
  };
}

// ---------- page wrapper ----------
function page(body, defsExtra) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.55 0 0 0 0 0.5 0 0 0 0 0.42 0 0 0 0.05 0"/></filter>
${defsExtra}
</defs>
<rect width="${W}" height="${H}" fill="${P.cream}"/>
<rect width="${W}" height="${H}" filter="url(#grain)"/>
${body}
</svg></body></html>`;
}

// ---------- scenes ----------
const scenes = {};

scenes["joy-of-imperfect-childrens-art"] = (k) =>
  k.skyScribbles() +
  k.sun(880, 240, 130) +
  k.grass(700) +
  k.house(380, 700, 300, { wall: P.orange, roof: P.purple, door: P.green }) +
  k.tree(680, 700, 260) +
  k.sparkle(180, 260, 26) + k.sparkle(1080, 480, 22, P.pink) +
  k.flower(820, 700, 120, P.pink) + k.flower(1000, 700, 110, P.purple);

scenes["children-as-artists-ages-2-to-10"] = (k) =>
  k.paper(70, 220, 300, 380, -5,
    (() => { let s = ""; for (let i = 0; i < 5; i++) s += k.circle(220 + k.jit(40), 400 + k.jit(60), 60 + k.rnd() * 40, [P.red, P.blue, P.green, P.purple, P.orange][i], 9, 0.8); return s; })()) +
  k.paper(450, 200, 300, 380, 2,
    k.circle(600, 330, 55, P.ink, 8) + k.faceDot(580, 320) + k.faceDot(620, 320) +
    k.arc(600, 340, 26, 0.4, Math.PI - 0.4, P.ink, 6) +
    k.line(560, 370, 520, 450, P.ink, 8) + k.line(640, 370, 680, 450, P.ink, 8) +
    k.line(575, 385, 555, 520, P.ink, 8) + k.line(625, 385, 645, 520, P.ink, 8)) +
  k.paper(830, 180, 300, 380, 6,
    k.sun(910, 270, 36, { face: false }) +
    k.stickKid(980, 500, 200, { shirt: P.blue }) +
    k.grass(505, 860, 1100) ) +
  k.star(150, 120, 34, P.gold) + k.star(1060, 660, 30, P.pink) + k.sparkle(620, 680, 24);

scenes["why-child-drawing-descriptions-matter"] = (k) =>
  k.paper(180, 220, 420, 440, -3,
    k.house(390, 580, 220, { wall: P.red, roof: P.navy, door: P.gold }) +
    k.sun(300, 320, 45, { face: false }) + k.grass(585, 220, 560)) +
  k.bubble(830, 280, 380, 240, [-0.3, 1]) +
  k.heart(770, 265, 55, P.red) +
  k.star(900, 270, 40, P.gold) +
  k.sparkle(840, 350, 20, P.purple) +
  k.stickKid(880, 740, 220, { shirt: P.green, armsUp: true });

scenes["benefits-kids-explaining-their-art"] = (k) =>
  k.stickKid(320, 700, 380, { shirt: P.purple, dress: true, hair: P.ink, armsUp: true }) +
  k.bubble(760, 300, 480, 300, [-0.5, 1]) +
  k.sun(650, 280, 55, { face: false }) +
  k.house(830, 390, 140, { wall: P.green, roof: P.red, door: P.gold, win: 1 }) +
  k.heart(950, 270, 40, P.pink) +
  k.grass(700) + k.flower(560, 700, 110, P.gold) + k.flower(1050, 700, 120, P.pink);

scenes["talking-to-child-about-art"] = (k) =>
  k.stickKid(220, 720, 430, { shirt: P.blue }) +
  k.stickKid(1000, 720, 300, { shirt: P.pink, dress: true, hair: P.gold }) +
  k.paper(470, 420, 280, 300, -2,
    k.sun(560, 500, 30, { face: false }) + k.stickKid(660, 660, 130, { shirt: P.red }) + k.grass(668, 490, 730)) +
  k.bubble(330, 200, 260, 160, [0.3, 1]) + k.heart(330, 195, 42, P.red) +
  k.bubble(920, 190, 260, 160, [-0.3, 1]) + k.star(920, 185, 38, P.gold) +
  k.grass(730);

scenes["wrong-thing-to-say-about-drawings"] = (k) =>
  k.stickKid(600, 730, 400, { shirt: P.orange, armsUp: true }) +
  k.paper(430, 210, 340, 260, -2,
    k.circle(530, 320, 45, P.purple, 9) + k.faceDot(515, 310) + k.faceDot(545, 310) +
    k.arc(530, 325, 20, 0.4, Math.PI - 0.4, P.ink, 5) +
    k.line(575, 330, 640, 300, P.purple, 8) + k.line(575, 340, 645, 360, P.purple, 8) +
    k.star(680, 260, 26, P.gold)) +
  k.heart(220, 260, 80, P.red) + k.heart(990, 300, 65, P.pink) +
  k.sparkle(160, 480, 24) + k.sparkle(1050, 540, 24, P.purple) +
  k.grass(730);

scenes["hidden-stories-in-color-choices"] = (k) => {
  let s = k.rainbowArcs(600, 560, 300);
  const cs = [P.red, P.orange, P.gold, P.green, P.blue, P.purple];
  cs.forEach((c, i) => { s += k.crayonStick(160 + i * 176, 690, 150, -12 + i * 5, c); });
  s += k.cloud(210, 480, 60, P.gray) + k.cloud(990, 480, 60, P.gray) +
    k.sparkle(600, 180, 28, P.gold) + k.heart(600, 260, 46, P.pink);
  return s;
};

scenes["best-drawing-tools-for-kids"] = (k) => {
  let s = "";
  const items = [[P.red, -8], [P.blue, 4], [P.green, -3], [P.purple, 7], [P.orange, -5]];
  items.forEach(([c, a], i) => { s += k.crayonStick(210 + i * 195, 420 + (i % 2) * 60, 230, a + 78, c); });
  s += k.paper(420, 560, 360, 200, -2,
    k.line(470, 660, 560, 620, P.red, 9) + k.line(560, 620, 640, 680, P.blue, 9) + k.line(640, 680, 730, 615, P.green, 9)) +
  k.star(150, 160, 40, P.gold) + k.star(1050, 180, 34, P.pink) + k.sparkle(600, 140, 26);
  return s;
};

scenes["five-minute-drawing-routine"] = (k) => {
  let s = k.circle(320, 340, 170, P.navy, 11) + k.scribbleCircle(320, 340, 160, P.sky, 9, -20, 0.25);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    s += k.line(320 + Math.cos(a) * 140, 340 + Math.sin(a) * 140, 320 + Math.cos(a) * 155, 340 + Math.sin(a) * 155, P.navy, 7);
  }
  s += k.line(320, 340, 320, 230, P.red, 10) + k.line(320, 340, 400, 380, P.ink, 9) +
    k.circle(320, 340, 10, P.ink, 8) +
    k.paper(640, 260, 380, 340, 3,
      k.sun(760, 360, 42, { face: false }) + k.flower(900, 540, 130, P.pink) + k.grass(545, 680, 990)) +
    k.crayonStick(700, 700, 190, -10, P.green) +
    k.sparkle(170, 640, 26, P.gold) + k.star(1080, 160, 36, P.gold);
  return s;
};

scenes["what-to-do-with-kids-drawings"] = (k) => {
  const fx = 330, fy = 120, fw = 540, fh = 600;
  let s = `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="26" fill="#EDF4F7"/>` +
    k.poly([[fx, fy + 20], [fx + fw, fy + 20]].concat([]), P.gray, 0, false);
  s += k.strokePath(k.rectD(fx, fy, fw, fh), P.navy, 10);
  s += k.line(fx + fw - 40, fy + 150, fx + fw - 40, fy + 320, P.navy, 12);
  s += k.line(fx + 30, fy + 240, fx + fw - 30, fy + 240, P.navy, 7, 0.5);
  s += k.paper(fx + 60, fy + 40, 180, 150, -4, k.sun(fx + 150, fy + 115, 30, { face: false }), false) +
    `${k.circle(fx + 150, fy + 48, 12, P.red, 7)}` +
    k.paper(fx + 280, fy + 60, 160, 130, 5, k.heart(fx + 360, fy + 125, 40, P.pink), false) +
    `${k.circle(fx + 360, fy + 66, 12, P.green, 7)}` +
    k.paper(fx + 100, fy + 300, 200, 170, 3,
      k.house(fx + 200, fy + 440, 110, { wall: P.gold, roof: P.red, door: P.blue, win: 1 }), false) +
    `${k.circle(fx + 200, fy + 308, 12, P.purple, 7)}` +
    k.paper(fx + 330, fy + 320, 150, 140, -5, k.star(fx + 405, fy + 390, 42, P.gold), false) +
    `${k.circle(fx + 405, fy + 328, 12, P.blue, 7)}`;
  s += k.sparkle(180, 250, 26) + k.star(1050, 250, 36, P.gold) + k.heart(1060, 560, 50, P.red) + k.sparkle(160, 580, 22, P.purple);
  return s;
};

scenes["create-childrens-art-book-at-home"] = (k) => {
  const cx = 600, top = 250, bot = 620;
  let s = "";
  // open book
  const leftPage = [[cx - 380, top + 40], [cx - 20, top], [cx - 20, bot], [cx - 380, bot + 40]];
  const rightPage = [[cx + 20, top], [cx + 380, top + 40], [cx + 380, bot + 40], [cx + 20, bot]];
  s += `<path d="${k.polyD(leftPage)}" fill="${P.white}"/><path d="${k.polyD(rightPage)}" fill="${P.white}"/>`;
  s += k.poly(leftPage, P.navy, 9) + k.poly(rightPage, P.navy, 9);
  s += k.line(cx, top, cx, bot, P.navy, 8);
  s += k.sun(cx - 260, top + 150, 42, { face: false }) +
    k.house(cx - 170, bot - 60, 130, { wall: P.red, roof: P.navy, door: P.gold, win: 1 }) +
    k.grass(bot - 55, cx - 350, cx - 60);
  s += k.stickKid(cx + 150, bot - 50, 180, { shirt: P.purple, dress: true, hair: P.gold }) +
    k.heart(cx + 280, top + 130, 45, P.red) + k.grass(bot - 45, cx + 60, cx + 350);
  s += k.crayonStick(220, 700, 180, 8, P.blue) + k.crayonStick(980, 690, 180, -6, P.pink);
  s += k.star(150, 170, 36, P.gold) + k.sparkle(1060, 180, 26, P.purple);
  return s;
};

scenes["drawing-archive-children-treasure"] = (k) => {
  const cx = 600, cy = 560;
  let s = "";
  // chest
  const box = [[cx - 260, cy - 120], [cx + 260, cy - 120], [cx + 240, cy + 160], [cx - 240, cy + 160]];
  s += k.scribblePoly(box, P.brown, 10, -15) + k.poly(box, "#7A5230", 10);
  const lid = [[cx - 280, cy - 130], [cx + 280, cy - 130], [cx + 250, cy - 260], [cx - 250, cy - 260]];
  s += k.scribblePoly(lid, "#8B6236", 10, -15) + k.poly(lid, "#6B4423", 10);
  s += k.circle(cx, cy + 10, 26, P.gold, 9) + k.scribbleCircle(cx, cy + 10, 20, P.gold, 6);
  // drawings + stars spilling
  s += k.paper(cx - 190, cy - 340, 150, 120, -14, k.sun(cx - 115, cy - 280, 26, { face: false }), false);
  s += k.paper(cx + 40, cy - 350, 150, 120, 10, k.heart(cx + 115, cy - 290, 34, P.red), false);
  s += k.star(cx - 300, cy - 380, 34, P.gold) + k.star(cx + 320, cy - 400, 40, P.gold) + k.star(cx, cy - 420, 28, P.pink);
  s += k.sparkle(cx - 380, cy - 180, 26) + k.sparkle(cx + 390, cy - 150, 26) + k.sparkle(cx, cy - 500, 22, P.purple);
  s += k.grass(730);
  return s;
};

scenes["building-family-memory-archive"] = (k) => {
  const bx = 380, by = 420, bw = 440, bh = 260;
  let s = "";
  s += `<path d="${k.rectD(bx, by, bw, bh)}" fill="#F5E5C8"/>` + k.strokePath(k.rectD(bx, by, bw, bh), P.brown, 10);
  s += k.heart(bx + bw / 2, by + bh / 2 + 20, 60, P.red);
  // papers poking out
  s += k.paper(bx + 30, by - 130, 150, 150, -8, k.sun(bx + 105, by - 55, 28, { face: false }), false);
  s += k.paper(bx + 170, by - 150, 150, 160, 3, k.stickKid(bx + 245, by - 20, 110, { shirt: P.green }), false);
  s += k.paper(bx + 300, by - 120, 140, 140, 9, k.star(bx + 370, by - 50, 36, P.gold), false);
  s += k.sparkle(240, 260, 26) + k.sparkle(980, 240, 26, P.purple) +
    k.heart(200, 560, 55, P.pink) + k.star(1010, 560, 40, P.gold);
  s += k.grass(730);
  return s;
};

scenes["preserve-kids-artwork-without-clutter"] = (k) => {
  let s = "";
  // neat stack of folders
  const colors = [P.blue, P.green, P.gold];
  colors.forEach((c, i) => {
    const y = 560 - i * 70;
    const d = k.rectD(240, y, 360, 60);
    s += `<path d="${d}" fill="${P.white}"/>` + k.scribbleRect(240, y, 360, 60, c, 7, 0, 0.5) + k.strokePath(d, c, 8);
  });
  s += k.heart(420, 380, 40, P.red);
  // framed drawing on "wall"
  const fd = k.rectD(700, 220, 320, 260);
  s += `<path d="${fd}" fill="${P.white}"/>` + k.strokePath(k.rectD(680, 200, 360, 300), P.gold, 12) + k.strokePath(fd, P.brown, 7, 0.6);
  s += k.sun(790, 300, 34, { face: false }) + k.house(900, 450, 110, { wall: P.red, roof: P.navy, door: P.gold, win: 1 }) + k.grass(455, 720, 990);
  s += k.sparkle(150, 220, 26) + k.star(1090, 600, 36, P.gold) + k.grass(730);
  return s;
};

scenes["one-parents-journey-mini-canvas"] = (k) =>
  k.stickKid(500, 720, 430, { shirt: P.navy }) +
  k.stickKid(680, 720, 290, { shirt: P.pink, dress: true, hair: P.gold }) +
  k.line(575, 560, 625, 590, "#F2B98E", 8) +
  k.heart(600, 220, 85, P.red) +
  k.sun(160, 170, 90, { face: false }) +
  k.cloud(1020, 200, 70) +
  k.grass(720) + k.flower(220, 720, 120, P.purple) + k.flower(1000, 720, 130, P.pink) +
  k.sparkle(880, 400, 24, P.gold);

scenes["gifts-for-parents-who-love-memories"] = (k) => {
  const cx = 560, gy = 660, gw = 360, gh = 240;
  let s = "";
  const bd = k.rectD(cx - gw / 2, gy - gh, gw, gh);
  s += `<path d="${bd}" fill="#FCE8EE"/>` + k.scribbleRect(cx - gw / 2, gy - gh, gw, gh, P.pink, 9, -20, 0.4) + k.strokePath(bd, P.red, 10);
  s += k.line(cx, gy - gh, cx, gy, P.gold, 14) + k.line(cx - gw / 2, gy - gh / 2, cx + gw / 2, gy - gh / 2, P.gold, 14);
  // bow
  s += k.circle(cx - 40, gy - gh - 30, 32, P.gold, 9) + k.circle(cx + 40, gy - gh - 30, 32, P.gold, 9) +
    k.scribbleCircle(cx, gy - gh - 25, 14, P.gold, 6);
  // tag with tiny drawing
  s += k.paper(cx + 190, gy - gh - 60, 170, 140, 12, k.sun(cx + 275, gy - gh + 10, 30, { face: false }), false) +
    k.line(cx + 190, gy - gh - 40, cx + 90, gy - gh - 20, P.brown, 6);
  s += k.heart(240, 260, 70, P.red) + k.heart(960, 300, 55, P.pink) + k.sparkle(1050, 160, 26) +
    k.star(170, 540, 38, P.gold) + k.grass(720);
  return s;
};

scenes["make-screen-time-creative"] = (k) => {
  const cx = 600, cy = 430, tw = 560, th = 400;
  let s = "";
  const td = k.rectD(cx - tw / 2, cy - th / 2, tw, th);
  s += `<path d="${td}" fill="${P.white}"/>` + k.strokePath(k.rectD(cx - tw / 2 - 22, cy - th / 2 - 22, tw + 44, th + 44), P.navy, 12) + k.strokePath(td, P.gray, 6, 0.5);
  s += k.sun(cx - 160, cy - 90, 40, { face: false }) +
    k.house(cx + 60, cy + 130, 150, { wall: P.gold, roof: P.red, door: P.blue, win: 1 }) +
    k.grass(cy + 135, cx - 230, cx + 230) +
    k.cloud(cx + 160, cy - 110, 42);
  s += k.circle(cx, cy + th / 2 + 46, 12, P.navy, 8);
  s += k.crayonStick(220, 690, 190, -12, P.red) + k.crayonStick(1000, 680, 190, 8, P.green);
  s += k.star(160, 200, 38, P.gold) + k.sparkle(1060, 240, 28, P.purple) + k.heart(1040, 500, 45, P.pink);
  return s;
};

scenes["digital-vs-physical-keepsakes"] = (k) => {
  let s = "";
  s += k.paper(150, 220, 380, 420, -4,
    k.sun(260, 330, 40, { face: false }) +
    k.house(370, 560, 170, { wall: P.red, roof: P.navy, door: P.gold, win: 1 }) +
    k.grass(565, 180, 500));
  // phone showing same drawing
  const px = 720, py = 180, pw = 300, ph = 480;
  const pd = k.rectD(px, py, pw, ph);
  s += `<path d="${pd}" fill="${P.white}"/>` + k.strokePath(k.rectD(px - 14, py - 14, pw + 28, ph + 28), P.ink, 11) + k.strokePath(pd, P.gray, 5, 0.5);
  s += k.sun(px + 90, py + 100, 30, { face: false }) +
    k.house(px + 170, py + 330, 120, { wall: P.red, roof: P.navy, door: P.gold, win: 1 }) +
    k.grass(py + 335, px + 30, px + 270);
  s += k.circle(px + pw / 2, py + ph + 40, 11, P.ink, 7);
  s += k.heart(618, 400, 50, P.red) + k.sparkle(600, 180, 26) + k.star(600, 620, 34, P.gold);
  return s;
};

scenes["privacy-first-parenting-sharing-art"] = (k) => {
  let s = k.house(480, 640, 340, { wall: P.gold, roof: P.red, door: P.navy }) + k.grass(645);
  // big friendly padlock
  const lx = 890, ly = 520;
  s += k.arc(lx, ly - 110, 75, Math.PI, Math.PI * 2, P.navy, 14);
  const ld = k.rectD(lx - 105, ly - 115, 210, 190);
  s += `<path d="${ld}" fill="#DCE9F5"/>` + k.scribbleRect(lx - 105, ly - 115, 210, 190, P.blue, 9, -20, 0.45) + k.strokePath(ld, P.navy, 11);
  s += k.circle(lx, ly - 40, 22, P.navy, 9) + k.line(lx, ly - 25, lx, ly + 15, P.navy, 9);
  s += k.heart(lx, ly - 190, 40, P.red);
  s += k.sun(170, 180, 80, { face: false }) + k.cloud(1040, 170, 60) +
    k.flower(230, 645, 120, P.pink) + k.sparkle(700, 200, 26, P.gold);
  return s;
};

scenes["how-voice-recording-changes-memories"] = (k) => {
  const cx = 480, cy = 420;
  let s = "";
  // microphone
  const md = k.blobD(cx, cy - 120, 95);
  s += `<path d="${md}" fill="#E8E0F5"/>` + k.scribbleCircle(cx, cy - 120, 88, P.purple, 8, -25, 0.5) + k.strokePath(md, P.purple, 10);
  for (let i = -2; i <= 2; i++) s += k.line(cx - 70, cy - 150 + i * 26, cx + 70, cy - 150 + i * 26, P.navy, 6, 0.6);
  s += k.arc(cx, cy - 90, 130, 0.15, Math.PI - 0.15, P.navy, 11);
  s += k.line(cx, cy + 40, cx, cy + 160, P.navy, 11) + k.line(cx - 80, cy + 165, cx + 80, cy + 165, P.navy, 11);
  // notes + bubble
  s += k.note(760, 260, 60, P.pink) + k.note(880, 360, 50, P.gold) + k.note(820, 170, 44, P.blue);
  s += k.bubble(950, 540, 300, 190, [-0.4, -1]) + k.heart(950, 545, 48, P.red);
  s += k.sparkle(180, 240, 26) + k.star(200, 600, 36, P.gold) + k.grass(730);
  return s;
};

scenes["record-your-childs-voice"] = (k) =>
  scenes["how-voice-recording-changes-memories"](k) +
  k.sun(1060, 170, 75, { face: false }) +
  k.stickKid(190, 730, 260, { shirt: P.gold, dress: true, hair: P.ink });

scenes["what-childrens-art-communicates"] = (k) => {
  let s = k.paper(420, 260, 360, 320, -2,
    k.stickKid(560, 540, 190, { shirt: P.red, armsUp: true }) +
    k.sun(700, 340, 32, { face: false }) + k.grass(545, 450, 750));
  // radiating symbols
  s += k.heart(250, 240, 55, P.red) + k.star(950, 230, 44, P.gold) +
    k.heart(970, 560, 45, P.pink) + k.star(230, 560, 40, P.purple) +
    k.sun(600, 130, 48, { face: false }) +
    k.cloud(180, 420, 50) + k.cloud(1030, 400, 50);
  // little rays from paper
  [[380, 300, 320, 260], [820, 300, 880, 260], [380, 520, 320, 560], [820, 520, 880, 560]]
    .forEach(([x1, y1, x2, y2]) => { s += k.line(x1, y1, x2, y2, P.gold, 7); });
  s += k.grass(730);
  return s;
};

scenes["ai-helps-parents-tell-stories"] = (k) => {
  let s = k.paper(140, 260, 330, 330, -4,
    k.circle(280, 380, 50, P.purple, 9) + k.faceDot(262, 370) + k.faceDot(298, 370) +
    k.arc(280, 390, 24, 0.4, Math.PI - 0.4, P.ink, 5) +
    k.line(240, 425, 200, 500, P.purple, 8) + k.line(320, 425, 360, 500, P.purple, 8) +
    k.star(380, 320, 24, P.gold));
  // arrow of sparkles
  s += k.sparkle(540, 380, 26, P.gold) + k.sparkle(600, 350, 20, P.purple) + k.sparkle(660, 390, 24, P.pink);
  // open storybook
  const cx = 900, top = 300, bot = 560;
  const lp = [[cx - 180, top + 24], [cx - 8, top], [cx - 8, bot], [cx - 180, bot + 24]];
  const rp = [[cx + 8, top], [cx + 180, top + 24], [cx + 180, bot + 24], [cx + 8, bot]];
  s += `<path d="${k.polyD(lp)}" fill="${P.white}"/><path d="${k.polyD(rp)}" fill="${P.white}"/>` +
    k.poly(lp, P.navy, 8) + k.poly(rp, P.navy, 8) + k.line(cx, top, cx, bot, P.navy, 7);
  s += k.circle(cx - 95, top + 100, 30, P.purple, 7) + k.star(cx + 95, top + 100, 26, P.gold);
  for (let i = 0; i < 3; i++) s += k.line(cx + 40, top + 160 + i * 30, cx + 150, top + 160 + i * 30, P.gray, 6, 0.8);
  for (let i = 0; i < 3; i++) s += k.line(cx - 150, top + 160 + i * 30, cx - 40, top + 160 + i * 30, P.gray, 6, 0.8);
  s += k.moon ? "" : "";
  s += k.heart(600, 200, 50, P.red) + k.star(180, 150, 36, P.gold) + k.sparkle(1060, 180, 26) + k.grass(730);
  return s;
};

function arrow(k, x1, y1, x2, y2, c = P.gold, w = 8) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return k.line(x1, y1, x2, y2, c, w) +
    k.line(x2, y2, x2 - 26 * Math.cos(a - 0.5), y2 - 26 * Math.sin(a - 0.5), c, w) +
    k.line(x2, y2, x2 - 26 * Math.cos(a + 0.5), y2 - 26 * Math.sin(a + 0.5), c, w);
}

scenes["what-should-my-child-draw-by-age"] = (k) =>
  k.paper(100, 420, 270, 280, -5,
    (() => { let s = ""; for (let i = 0; i < 4; i++) s += k.circle(235 + k.jit(30), 555 + k.jit(40), 50 + k.rnd() * 30, [P.red, P.blue, P.green, P.purple][i], 8, 0.8); return s; })()) +
  k.paper(460, 300, 280, 300, 2,
    k.circle(600, 400, 48, P.ink, 8) +
    k.circle(582, 392, 5, P.ink, 6) + k.circle(618, 392, 5, P.ink, 6) +
    k.arc(600, 410, 22, 0.4, Math.PI - 0.4, P.ink, 5) +
    k.line(565, 435, 530, 540, P.ink, 8) + k.line(635, 435, 670, 540, P.ink, 8)) +
  k.paper(830, 170, 290, 320, 6,
    k.sun(910, 260, 32, { face: false }) +
    k.stickKid(985, 450, 170, { shirt: P.green }) +
    k.grass(455, 855, 1090)) +
  arrow(k, 390, 500, 445, 460) + arrow(k, 755, 380, 810, 340) +
  k.star(160, 200, 38, P.gold) + k.heart(1080, 620, 50, P.pink) + k.sparkle(620, 700, 24);

scenes["why-does-my-child-only-draw-in-black"] = (k) =>
  k.paper(330, 180, 430, 420, -2,
    k.sun(460, 300, 42, { face: false, ray: P.ink, body: "#555" }) +
    k.house(620, 520, 180, { wall: "#555", roof: P.ink, door: "#333", win: 1 }) +
    k.line(370, 545, 720, 545, P.ink, 8)) +
  k.crayonStick(545, 680, 260, -8, P.ink) +
  k.crayonStick(120, 350, 150, 82, P.red) +
  k.crayonStick(150, 500, 150, 95, P.blue) +
  k.crayonStick(115, 650, 150, 78, P.green) +
  k.circle(950, 280, 60, P.purple, 9) + k.arc(950, 250, 28, Math.PI * 1.15, Math.PI * 1.95, P.purple, 9) +
  k.line(950, 350, 950, 390, P.purple, 9) + k.circle(950, 430, 7, P.purple, 8) +
  k.heart(1000, 580, 55, P.pink) + k.sparkle(880, 160, 26, P.gold) + k.grass(740);

scenes["turn-kids-drawing-into-keepsakes"] = (k) => {
  let s = k.paper(430, 280, 340, 280, -2,
    k.circle(560, 380, 42, P.green, 8) +
    k.circle(545, 370, 4, P.ink, 6) + k.circle(575, 370, 4, P.ink, 6) +
    k.arc(560, 388, 18, 0.4, Math.PI - 0.4, P.ink, 5) +
    k.line(600, 385, 660, 355, P.green, 8) + k.line(600, 395, 665, 420, P.green, 8) +
    k.line(530, 420, 515, 500, P.green, 8) + k.line(585, 420, 600, 500, P.green, 8) +
    k.star(680, 320, 22, P.gold));
  // teddy (top-right)
  const tx = 1000, ty = 250;
  s += k.scribbleCircle(tx, ty - 60, 42, P.brown, 7) + k.circle(tx, ty - 60, 42, "#7A5230", 7) +
    k.circle(tx - 34, ty - 96, 15, "#7A5230", 6) + k.circle(tx + 34, ty - 96, 15, "#7A5230", 6) +
    k.circle(tx - 14, ty - 68, 4, P.ink, 5) + k.circle(tx + 14, ty - 68, 4, P.ink, 5) +
    k.arc(tx, ty - 52, 14, 0.4, Math.PI - 0.4, P.ink, 4) +
    k.scribbleCircle(tx, ty + 30, 55, P.brown, 8) + k.circle(tx, ty + 30, 55, "#7A5230", 7) +
    k.line(tx - 50, ty + 5, tx - 85, ty + 40, "#7A5230", 9) + k.line(tx + 50, ty + 5, tx + 85, ty + 40, "#7A5230", 9);
  // mug (bottom-right)
  const mx = 990, my = 600;
  s += `<path d="${k.rectD(mx - 70, my - 80, 140, 110)}" fill="${P.white}"/>` +
    k.strokePath(k.rectD(mx - 70, my - 80, 140, 110), P.blue, 9) +
    k.arc(mx + 92, my - 25, 34, -Math.PI / 2, Math.PI / 2, P.blue, 9) +
    k.heart(mx, my - 25, 30, P.red);
  // book (top-left)
  const bx = 180, by = 230;
  s += `<path d="${k.polyD([[bx - 90, by - 60], [bx - 5, by - 72], [bx - 5, by + 60], [bx - 90, by + 72]])}" fill="${P.white}"/>` +
    `<path d="${k.polyD([[bx + 5, by - 72], [bx + 90, by - 60], [bx + 90, by + 72], [bx + 5, by + 60]])}" fill="${P.white}"/>` +
    k.poly([[bx - 90, by - 60], [bx - 5, by - 72], [bx - 5, by + 60], [bx - 90, by + 72]], P.navy, 7) +
    k.poly([[bx + 5, by - 72], [bx + 90, by - 60], [bx + 90, by + 72], [bx + 5, by + 60]], P.navy, 7) +
    k.star(bx + 45, by - 5, 22, P.gold) + k.circle(bx - 48, by - 5, 20, P.purple, 6);
  // heart (bottom-left)
  s += k.heart(190, 600, 65, P.red);
  // arrows out
  s += arrow(k, 780, 330, 890, 280) + arrow(k, 780, 480, 890, 550) +
    arrow(k, 420, 330, 300, 270) + arrow(k, 420, 480, 300, 550);
  s += k.sparkle(600, 160, 26, P.purple) + k.sparkle(600, 680, 22, P.gold);
  return s;
};

scenes["is-ai-safe-for-kids-drawings"] = (k) => {
  let s = k.paper(160, 240, 340, 340, -4,
    k.sun(260, 350, 38, { face: false }) +
    k.stickKid(390, 540, 160, { shirt: P.purple, dress: true, hair: P.ink }) +
    k.grass(545, 190, 470));
  // big shield
  const cx = 850, cy = 420, w2 = 300, h2 = 360;
  const shieldPts = [
    [cx - w2 / 2, cy - h2 / 2], [cx + w2 / 2, cy - h2 / 2],
    [cx + w2 / 2, cy + h2 * 0.1], [cx, cy + h2 / 2], [cx - w2 / 2, cy + h2 * 0.1],
  ];
  s += `<path d="${k.polyD(shieldPts)}" fill="#E3F0E8"/>` +
    k.scribblePoly(shieldPts, P.green, 9, -25, 0.35) +
    k.poly(shieldPts, P.navy, 11);
  s += k.heart(cx, cy - 40, 62, P.red);
  // big check
  s += k.line(cx - 60, cy + 80, cx - 15, cy + 125, P.green, 14) + k.line(cx - 15, cy + 125, cx + 75, cy + 30, P.green, 14);
  s += k.sparkle(580, 200, 26, P.gold) + k.star(600, 620, 34, P.gold) +
    k.cloud(1100, 150, 50) + k.grass(740);
  return s;
};

scenes["back-to-school-drawing-prompts"] = (k) => {
  let s = "";
  // backpack
  const bx = 380, by = 480;
  const body = k.rectD(bx - 130, by - 160, 260, 300);
  s += `<path d="${body}" fill="#FDE3E9"/>` + k.scribbleRect(bx - 130, by - 160, 260, 300, P.pink, 9, -20, 0.5) + k.strokePath(body, P.red, 10);
  const pocket = k.rectD(bx - 80, by - 20, 160, 130);
  s += `<path d="${pocket}" fill="${P.white}"/>` + k.strokePath(pocket, P.red, 8) +
    k.circle(bx, by + 45, 16, P.gold, 7);
  s += k.arc(bx, by - 160, 80, Math.PI * 1.1, Math.PI * 1.9, P.red, 12);
  // apple
  s += k.scribbleCircle(700, 640, 55, P.red, 8) + k.circle(700, 640, 55, "#C1272D", 8) +
    k.line(700, 585, 705, 550, P.brown, 8) +
    k.scribbleCircle(735, 555, 20, P.leaf, 5) + k.circle(735, 555, 20, P.green, 6);
  // prompt sheet
  s += k.paper(760, 180, 330, 330, 5,
    k.sun(860, 280, 36, { face: false }) +
    k.house(990, 430, 130, { wall: P.gold, roof: P.blue, door: P.red, win: 1 }) +
    k.grass(438, 800, 1060));
  // pencil
  s += k.crayonStick(600, 720, 240, -6, P.gold);
  s += k.star(170, 180, 40, P.gold) + k.sparkle(620, 140, 26, P.purple) + k.heart(150, 680, 50, P.red) +
    k.grass(760);
  return s;
};

// ---------- render ----------
const only = process.argv[2] ? process.argv[2].split(",") : null;
let seed = 11;
for (const [slug, fn] of Object.entries(scenes)) {
  seed += 37;
  if (only && !only.includes(slug)) continue;
  const kit = makeKit(seed);
  const body = fn(kit);
  fs.writeFileSync(path.join(OUT, `${slug}.html`), page(body, kit.defs()));
  console.log("wrote", slug);
}
