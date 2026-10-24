import "./estilos.css";
import C from "./contenido.js";

/* =========================================================
   UN MES CON EFFIE · interacciones
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const hasIO = "IntersectionObserver" in window;
const inicio = new Date(C.inicio);
const seed = n => { let v = n % 2147483647 || 1; return () => (v = v * 16807 % 2147483647) / 2147483647; };
const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};
const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

/* ---------- carga ---------- */
let loadedOnce = false;
const markLoaded = () => { if (loadedOnce) return; loadedOnce = true; requestAnimationFrame(() => document.body.classList.add("loaded")); };
fontsReady.then(markLoaded);
setTimeout(markLoaded, 1200);

$("#diaN").textContent = String(Math.max(0, Math.floor((Date.now() - inicio) / 864e5))).padStart(2, "0");
$("#firma").textContent = C.firma;

/* ---------- aparición al hacer scroll (un solo observador) ---------- */
const onEnter = new Map();
const io = hasIO ? new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    const cb = onEnter.get(e.target); if (cb) cb();
    io.unobserve(e.target);
  }
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }) : null;
function watch(el, cb) {
  if (cb) onEnter.set(el, cb);
  if (!io || reduce) { el.classList.add("in"); if (cb) cb(); return; }
  io.observe(el);
}
function staggerGroup(sel, step = 80) {
  $$(sel).forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.matches(sel));
    el.style.transitionDelay = (sibs.indexOf(el) % 6) * step + "ms";
  });
}
staggerGroup(".index li"); staggerGroup(".gl-row"); staggerGroup(".chrono li");
$$(".rv, .reveal-img").forEach(el => watch(el));

/* ---------- cursor (solo se mueve cuando hace falta) ---------- */
if (fine && !reduce) {
  const cur = $(".cursor"), dot = cur.firstElementChild;
  let x = 0, y = 0, tx = 0, ty = 0, running = false;
  const step = () => {
    x += (tx - x) * 0.2; y += (ty - y) * 0.2;
    cur.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) requestAnimationFrame(step); else running = false;
  };
  addEventListener("mousemove", e => {
    tx = e.clientX; ty = e.clientY;
    if (!cur.classList.contains("on")) { x = tx; y = ty; cur.classList.add("on"); }
    if (!running) { running = true; requestAnimationFrame(step); }
  }, { passive: true });
  document.addEventListener("mouseleave", () => cur.classList.remove("on"));
  document.addEventListener("mouseover", e => {
    const big = e.target.closest("[data-cursor]");
    const link = e.target.closest("a,button,input,.st,label,.track,.sheet");
    cur.classList.toggle("big", !!big && !link);
    cur.classList.toggle("link", !!link && !big);
    dot.textContent = big ? big.dataset.cursor : "";
    if (big && link) cur.classList.add("big");
  });
}

/* ---------- menú ---------- */
const burger = $(".burger"), menu = $("#menu");
function setMenu(open) {
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("menu-open", open);
  if (open) { menu.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("open"))); }
  else { menu.classList.remove("open"); setTimeout(() => { if (!menu.classList.contains("open")) menu.hidden = true; }, 900); }
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------- índice con imagen flotante ---------- */
if (fine) {
  const fl = $(".float-img"), flImg = fl.firstElementChild;
  let fx = 0, fy = 0, raf = 0;
  $$(".index a").forEach(a => {
    a.addEventListener("mouseenter", () => { flImg.src = a.dataset.img; fl.classList.add("on"); });
    a.addEventListener("mouseleave", () => fl.classList.remove("on"));
    a.addEventListener("mousemove", e => {
      fx = e.clientX; fy = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { fl.style.left = fx + "px"; fl.style.top = fy + "px"; raf = 0; });
    });
  });
}

/* =========================================================
   SALA I · constelación
   ========================================================= */
const NS = "http://www.w3.org/2000/svg";
const mk = (tag, attrs, parent) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); if (parent) parent.appendChild(el); return el; };
const stars = C.estrellas, byId = Object.fromEntries(stars.map(s => [s.id, s]));
const links = [["x","o"],["o","l"],["x","l"],["l","g"],["g","d"],["d","e"],["e","b"],["g","h"],["h","a"],["a","z"]];
{
  const chart = $("#chart");
  const frag = document.createDocumentFragment();
  const grid = mk("g", { class: "grid" }, frag);
  for (let i = 0; i <= 10; i++) { const p = 5 + i * 9; mk("line", { x1: p, y1: 3, x2: p, y2: 97 }, grid); mk("line", { x1: 3, y1: p, x2: 97, y2: p }, grid); }
  ["6h","5h30","5h","4h30","4h","3h30"].forEach((t, i) => { mk("text", { x: 6 + i * 18, y: 99 }, grid).textContent = t; });
  ["+30°","+25°","+20°","+15°","+10°"].forEach((t, i) => { mk("text", { x: 1, y: 7 + i * 20 }, grid).textContent = t; });
  const r1 = seed(1997), bg = mk("g", {}, frag);
  for (let i = 0; i < 140; i++) mk("circle", { cx: (r1() * 96 + 2).toFixed(2), cy: (r1() * 96 + 2).toFixed(2), r: (r1() * .32 + .08).toFixed(2), class: "bg-star" }, bg);
  const lineEls = links.map(([p, q]) => {
    const a = byId[p], b = byId[q], len = Math.hypot(a.x - b.x, a.y - b.y);
    const l = mk("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "link" }, frag);
    l.style.setProperty("--len", len.toFixed(2));
    return { l, p, q };
  });
  const found = new Set((store.get("effie-estrellas") || "").split(",").filter(id => byId[id]));
  const stEls = {};
  stars.forEach(s => {
    const g = mk("g", { class: "st" + (s.grande ? " big" : ""), tabindex: 0, role: "button", "aria-label": s.nombre + ", " + s.apodo }, frag);
    mk("circle", { cx: s.x, cy: s.y, r: 4.2, class: "hit" }, g);
    mk("circle", { cx: s.x, cy: s.y, r: s.grande ? 2.6 : 1.8, class: "halo" }, g);
    if (s.cumulo) [[-1.6,-.8],[.4,-1.6],[1.6,0],[-.4,.8],[1.2,1.6],[-1.8,1.2]].forEach(([dx, dy]) => mk("circle", { cx: s.x + dx, cy: s.y + dy, r: .55, class: "core" }, g));
    else mk("circle", { cx: s.x, cy: s.y, r: s.grande ? 1.7 : 1.1, class: "core" }, g);
    const left = s.x > 70;
    mk("text", { x: s.x + (left ? -3 : 3), y: s.y + .8, class: "lbl", "text-anchor": left ? "end" : "start" }, g).textContent = s.nombre;
    const act = () => pick(s.id);
    g.addEventListener("click", act);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    stEls[s.id] = g;
  });
  chart.appendChild(frag);
  const rName = $("#rName"), rText = $("#rText"), foundN = $("#foundN"), foundBar = $("#foundBar"), skyDone = $("#skyDone");
  function refresh() {
    stars.forEach(s => stEls[s.id].classList.toggle("on", found.has(s.id)));
    lineEls.forEach(o => o.l.classList.toggle("on", found.has(o.p) && found.has(o.q)));
    foundN.textContent = String(found.size).padStart(2, "0");
    foundBar.style.width = (found.size / stars.length * 100) + "%";
    skyDone.hidden = found.size < stars.length;
  }
  function pick(id) {
    const s = byId[id];
    found.add(id); store.set("effie-estrellas", [...found].join(","));
    Object.values(stEls).forEach(g => g.classList.remove("cur"));
    stEls[id].classList.add("cur");
    rName.innerHTML = ""; rName.append(s.nombre); const sm = document.createElement("small"); sm.textContent = s.apodo; rName.append(sm);
    rText.textContent = s.razon; restart(rText, "swap");
    refresh();
  }
  stEls.a.classList.add("cur");
  refresh();
}

/* =========================================================
   SALA II · diálogo de canciones (Spotify)
   ========================================================= */
{
  const songs = C.canciones;
  $$(".track").forEach(t => {
    const s = songs[t.dataset.song];
    $$("[data-k]", t).forEach(el => { el.textContent = s[el.dataset.k]; });
  });
  let current = "mia", ctrl = null, apiLoading = false, wantPlay = false;
  let state = { pos: 0, dur: 0, paused: true }, lastTick = 0;
  const slot = $(".spotify-slot"), deckIcon = $("#deckIcon"), deckPlay = $("#deckPlay");
  const wave = $("#wave"), wx = wave.getContext("2d");
  const r2 = seed(24);
  const bars = Array.from({ length: 90 }, (_, i) => Math.min(1, .18 + .72 * Math.abs(Math.sin(i * .29 + 1)) * (.45 + .55 * r2())));
  let waveRaf = 0;

  function drawWave(t = 0) {
    const r = wave.getBoundingClientRect(), d = dpr();
    if (!r.width) return;
    if (wave.width !== Math.round(r.width * d)) { wave.width = Math.round(r.width * d); wave.height = Math.round(r.height * d); }
    wx.setTransform(d, 0, 0, d, 0, 0); wx.clearRect(0, 0, r.width, r.height);
    const n = bars.length, w = r.width / n, prog = state.dur ? state.pos / state.dur : 0;
    for (let i = 0; i < n; i++) {
      const wob = !state.paused && !reduce ? .72 + .28 * Math.sin(t / 170 + i * 1.3) : 1;
      const bh = Math.max(2, bars[i] * wob * r.height);
      wx.fillStyle = i / n < prog ? "#13306f" : "rgba(19,48,111,.18)";
      wx.fillRect(i * w + w * .25, (r.height - bh) / 2, Math.max(1.5, w * .45), bh);
    }
  }
  function loopWave(t) {
    if (!state.paused && state.dur) { const now = performance.now(); state.pos = Math.min(state.dur, state.pos + (now - lastTick)); lastTick = now; ui(); }
    drawWave(t);
    waveRaf = !state.paused ? requestAnimationFrame(loopWave) : 0;
  }
  function ui() {
    $("#pNow").textContent = fmt(state.pos / 1000);
    if (state.dur) $("#pAll").textContent = fmt(state.dur / 1000);
    $("#pBar").style.width = (state.dur ? state.pos / state.dur * 100 : 0) + "%";
  }
  function setPlayingUI() {
    deckIcon.innerHTML = state.paused ? '<path d="M7 4v16l13-8z"/>' : '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';
    deckPlay.setAttribute("aria-label", state.paused ? "Reproducir" : "Pausar");
    $$(".track").forEach(t => t.classList.toggle("playing", !state.paused && t.dataset.song === current));
    if (!state.paused && !waveRaf) { lastTick = performance.now(); waveRaf = requestAnimationFrame(loopWave); }
    if (state.paused) drawWave();
  }
  function select(key) {
    current = key;
    const s = songs[key];
    $$(".track").forEach(t => t.classList.toggle("on", t.dataset.song === key));
    $$(".deck-switch button").forEach(b => b.classList.toggle("on", b.dataset.play === key));
    $("#deckTitle").textContent = s.titulo; $("#deckArtist").textContent = s.artista;
    $("#lyricsLink").href = "https://open.spotify.com/track/" + s.id;
    state = { pos: 0, dur: 0, paused: true }; ui(); $("#pAll").textContent = "—:——"; setPlayingUI();
  }
  function loadApi() {
    if (apiLoading) return; apiLoading = true;
    window.onSpotifyIframeApiReady = API => {
      API.createController($("#spotifyEmbed"), { uri: "spotify:track:" + songs[current].id, width: "100%", height: 80 }, c => {
        ctrl = c;
        slot.classList.add("ready");
        c.addListener("ready", () => { if (wantPlay) { c.play(); wantPlay = false; } });
        c.addListener("playback_update", e => {
          const d = e.data || {};
          state = { pos: d.position || 0, dur: d.duration || state.dur, paused: !!d.isPaused };
          lastTick = performance.now(); ui(); setPlayingUI();
        });
      });
    };
    const sc = document.createElement("script");
    sc.src = "https://open.spotify.com/embed/iframe-api/v1"; sc.async = true;
    sc.onerror = fallback;
    document.head.appendChild(sc);
    setTimeout(() => { if (!ctrl) fallback(); }, 9000);
  }
  function fallback() {
    if (ctrl || slot.querySelector("iframe")) return;
    slot.classList.add("ready");
    slot.insertAdjacentHTML("afterbegin", `<iframe src="https://open.spotify.com/embed/track/${songs[current].id}" height="80" allow="autoplay; clipboard-write; encrypted-media" loading="lazy" title="${songs[current].titulo} en Spotify"></iframe>`);
  }
  function playSong(key) {
    const changed = key !== current;
    if (changed) select(key);
    if (!ctrl) { wantPlay = true; loadApi(); return; }
    if (changed) { ctrl.loadUri("spotify:track:" + songs[key].id); setTimeout(() => ctrl.play(), 350); }
    else ctrl.togglePlay();
  }
  deckPlay.addEventListener("click", () => playSong(current));
  $$(".deck-switch button").forEach(b => b.addEventListener("click", () => playSong(b.dataset.play)));
  $$(".track").forEach(t => t.addEventListener("click", () => playSong(t.dataset.song)));
  $("#deckBar").addEventListener("click", e => {
    if (!ctrl || !state.dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    ctrl.seek(Math.floor((e.clientX - r.left) / r.width * state.dur / 1000));
  });
  // el reproductor se carga solo cuando te acercas a la sala
  if (hasIO) {
    const pre = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { pre.disconnect(); loadApi(); } }, { rootMargin: "600px 0px" });
    pre.observe($("#duet"));
  } else loadApi();
  fontsReady.then(() => drawWave());
  let rw; addEventListener("resize", () => { clearTimeout(rw); rw = setTimeout(() => { wave.width = 0; drawWave(); }, 150); });
  select("mia");
}

/* =========================================================
   SALA III · biblioteca y bitácora
   ========================================================= */
{
  const coverHTML = b => `<div class="cover" style="background:${b.colores[0]};color:${b.colores[1]};--c3:${b.colores[2]}"><span class="ct"></span><span class="ca"></span></div>`;
  const fillCover = (el, b) => { $(".ct", el).textContent = b.titulo; $(".ca", el).textContent = b.autor; };
  const feat = $("#bookFeature"), list = $("#bookList"), note = $("#bookNote"), reader = $("#readerPhone");
  function showBook(i, user) {
    const b = C.libros[i];
    feat.innerHTML = `${coverHTML(b)}<div><h5></h5><p class="au"></p><div class="stars">${"★".repeat(b.estrellas)}${"☆".repeat(5 - b.estrellas)}</div><div class="chips">${b.etiquetas.map(() => "<span></span>").join("")}</div></div>`;
    fillCover(feat, b);
    $("h5", feat).textContent = b.titulo; $(".au", feat).textContent = b.autor;
    $$(".chips span", feat).forEach((s, j) => s.textContent = b.etiquetas[j]);
    restart(feat, "swap");
    note.textContent = b.nota; restart(note, "swap");
    $("#bookNoteTag").textContent = "Mi reseña · " + b.titulo;
    $$(".ph-item", list).forEach((el, j) => el.classList.toggle("on", j === i));
    if (user && b.bitacora) restart(reader, "pulse");
  }
  C.libros.forEach((b, i) => {
    const btn = document.createElement("button");
    btn.className = "ph-item";
    btn.innerHTML = `${coverHTML(b)}<span><b></b><small></small></span><i>↗</i>`;
    fillCover(btn, b);
    $("b", btn).textContent = b.titulo; $("small", btn).textContent = b.autor;
    btn.addEventListener("click", () => showBook(i, true));
    list.appendChild(btn);
  });
  showBook(0);

  // lector de la bitácora
  const tabs = $("#rdTabs"), body = $("#rdBody"), bar = $("#rdBar"), count = $("#rdCount");
  let ch = 0;
  C.bitacora.forEach((c, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1; b.setAttribute("role", "tab"); b.setAttribute("aria-label", "Capítulo " + (i + 1) + ": " + c.titulo);
    b.addEventListener("click", () => openCh(i));
    tabs.appendChild(b);
  });
  function openCh(i) {
    ch = (i + C.bitacora.length) % C.bitacora.length;
    const c = C.bitacora[ch];
    body.innerHTML = "";
    const h = document.createElement("h5"); const sm = document.createElement("small");
    sm.textContent = "Capítulo " + (ch + 1); h.append(sm, c.titulo); body.appendChild(h);
    c.texto.forEach(t => { const p = document.createElement("p"); p.textContent = t; body.appendChild(p); });
    body.scrollTop = 0; restart(body, "swap");
    $$("button", tabs).forEach((b, j) => { b.classList.toggle("on", j === ch); b.setAttribute("aria-selected", j === ch); });
    count.textContent = (ch + 1) + " / " + C.bitacora.length;
    prog();
  }
  function prog() {
    const max = body.scrollHeight - body.clientHeight;
    const within = max > 0 ? body.scrollTop / max : 1;
    bar.style.width = ((ch + within) / C.bitacora.length * 100) + "%";
  }
  body.addEventListener("scroll", prog, { passive: true });
  $("#rdPrev").addEventListener("click", () => openCh(ch - 1));
  $("#rdNext").addEventListener("click", () => openCh(ch + 1));
  openCh(0);
}

/* =========================================================
   SALA IV · obras de los momentos
   ========================================================= */
const INK = "#13306f", RED = "#c8372d", BLACK = "#14161c", PAPER = "#fbfaf8";
let noise = null;
function paper(ctx, w, h) {
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, w, h);
  if (!noise) {
    noise = document.createElement("canvas"); noise.width = noise.height = 128;
    const nx = noise.getContext("2d"), r = seed(7);
    for (let i = 0; i < 900; i++) { nx.fillStyle = `rgba(19,48,111,${r() * .06})`; nx.fillRect(r() * 128, r() * 128, 1, 1); }
  }
  ctx.fillStyle = ctx.createPattern(noise, "repeat"); ctx.fillRect(0, 0, w, h);
}
function splat(ctx, x, y, r, col, rnd) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  for (let i = 0; i < 9; i++) { const a = rnd() * 6.28, d = r * (1.2 + rnd() * 2.2); ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (.08 + rnd() * .25), 0, 7); ctx.fill(); }
}
const motifs = {
  terror(ctx, w, h, r) {
    ctx.fillStyle = BLACK; ctx.fillRect(w * .12, h * .18, w * .76, h * .5);
    ctx.fillStyle = INK; ctx.fillRect(w * .12, h * .18, w * .76, h * .06);
    [[.38, .43], [.62, .43]].forEach(([cx, cy]) => { ctx.fillStyle = PAPER; ctx.beginPath(); ctx.ellipse(w * cx - 10, h * cy, 7, 10, 0, 0, 7); ctx.ellipse(w * cx + 10, h * cy, 7, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = BLACK; ctx.beginPath(); ctx.arc(w * cx - 9, h * cy + 2, 3, 0, 7); ctx.arc(w * cx + 11, h * cy + 2, 3, 0, 7); ctx.fill(); });
    ctx.fillStyle = INK;
    for (let k = 0; k < 2; k++) { const bx = w * (.18 + k * .46); for (let f = 0; f < 4; f++) { ctx.beginPath(); (ctx.roundRect ? ctx.roundRect(bx + f * w * .055, h * .52 - f % 2 * 8, w * .045, h * .24, 10) : ctx.rect(bx + f * w * .055, h * .52 - f % 2 * 8, w * .045, h * .24)); ctx.fill(); } }
    splat(ctx, w * .8, h * .78, w * .04, RED, r);
    ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(w * .8, h * .78); ctx.lineTo(w * .8 + 2, h * .92); ctx.stroke();
    ctx.strokeStyle = PAPER; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(w * .5 + (r() - .5) * w * .6, h * .22); ctx.lineTo(w * .5 + (r() - .5) * w * .6, h * .3); ctx.stroke(); }
  },
  cocina(ctx, w, h, r) {
    ctx.strokeStyle = "rgba(19,48,111,.22)"; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += w / 8) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += w / 8) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    for (let i = 0; i < 7; i++) { const x = w * (.15 + r() * .7), y = h * (.15 + r() * .65), rr = w * (.06 + r() * .06); ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, rr * .6, 0, 7); ctx.stroke(); }
    for (let i = 0; i < 5; i++) { const x = w * (.2 + r() * .6), y = h * (.3 + r() * .55), s = w * (.05 + r() * .05); ctx.fillStyle = i % 2 ? RED : "#e9893a"; ctx.beginPath(); ctx.moveTo(x, y - s * 2); ctx.quadraticCurveTo(x + s, y - s * .4, x + s * .6, y); ctx.lineTo(x - s * .6, y); ctx.quadraticCurveTo(x - s, y - s * .4, x, y - s * 2); ctx.fill(); }
    ctx.fillStyle = BLACK; ctx.font = `700 ${w * .07}px Archivo, sans-serif`; ctx.fillText("ORDEN #1 ¡YA!", w * .08, h * .93);
  },
  llamadas(ctx, w, h) {
    const A = [w * .3, h * .5], B = [w * .7, h * .5];
    [A, B].forEach((p, k) => { for (let i = 1; i < 16; i++) { ctx.strokeStyle = k ? `rgba(200,55,45,${.7 - i * .04})` : `rgba(19,48,111,${.8 - i * .045})`; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(p[0], p[1], i * w * .03, 0, 7); ctx.stroke(); } });
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(A[0], A[1], w * .03, 0, 7); ctx.fill();
    ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(B[0], B[1], w * .03, 0, 7); ctx.fill();
    ctx.strokeStyle = BLACK; ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = INK; ctx.font = `600 ${w * .045}px Archivo, sans-serif`; ctx.fillText("02:47:13", w * .08, h * .92);
  },
  risas(ctx, w, h, r) {
    for (let k = 0; k < 9; k++) {
      const x = w * (.15 + r() * .7), y = h * (.15 + r() * .7), n = 10 + (r() * 8 | 0), R = w * (.04 + r() * .06), col = k % 3 === 0 ? RED : k % 3 === 1 ? INK : BLACK;
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineCap = "round";
      for (let i = 0; i < n; i++) { const a = i / n * 6.28 + r() * .2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * R * .5, y + Math.sin(a) * R * .5); ctx.lineTo(x + Math.cos(a) * R * (1 + r() * .7), y + Math.sin(a) * R * (1 + r() * .7)); ctx.stroke(); }
    }
    ctx.fillStyle = INK; ctx.font = `italic 400 ${w * .2}px Newsreader, serif`; ctx.fillText("ja", w * .1, h * .85);
    ctx.fillStyle = RED; ctx.fillText("ja", w * .45, h * .6);
  },
  miedos(ctx, w, h, r) {
    const R0 = Math.min(w, h) * .34;
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(w * .5, h * .44, R0, 0, 7); ctx.fill();
    let x = w * .5 - R0 * .4, y = h * .44 - R0 * .8; const pts = [[x, y]];
    while (y < h * .44 + R0 * .75) { x += (r() - .45) * w * .08; y += h * (.04 + r() * .05); pts.push([x, y]); }
    ctx.strokeStyle = PAPER; ctx.lineWidth = 5; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = RED; ctx.lineWidth = 2;
    pts.forEach((p, i) => { if (i) { ctx.beginPath(); ctx.moveTo(p[0] - 9, p[1] - 4); ctx.lineTo(p[0] + 9, p[1] + 4); ctx.stroke(); } });
    ctx.fillStyle = BLACK; ctx.font = `600 ${Math.min(w, h * 1.3) * .04}px Archivo, sans-serif`; ctx.fillText("FRÁGIL · MANIPULAR CON CUIDADO", w * .06, h * .95);
  },
  pregunta(ctx, w, h, r) {
    ctx.fillStyle = BLACK; ctx.font = `700 ${w * .3}px Archivo, sans-serif`; ctx.fillText("NO", w * .1, h * .45);
    ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(w * .06, h * .36); ctx.lineTo(w * .62, h * .3); ctx.stroke();
    ctx.fillStyle = INK; ctx.font = `400 ${w * .55}px "Mrs Saint Delafield", cursive`; ctx.fillText("sí", w * .32, h * .86);
    splat(ctx, w * .82, h * .22, w * .03, INK, r);
  }
};
function drawArt(canvas, m) {
  const rect = canvas.getBoundingClientRect(), d = dpr();
  const w = rect.width || 400, h = rect.height || 500;
  canvas.width = Math.round(w * d); canvas.height = Math.round(h * d);
  const ctx = canvas.getContext("2d"); ctx.setTransform(d, 0, 0, d, 0, 0);
  const rnd = seed(m.titulo.length * 131 + 7);
  paper(ctx, w, h);
  (motifs[m.motivo] || motifs.risas)(ctx, w, h, rnd);
  ctx.strokeStyle = INK; ctx.lineWidth = 1.2;
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(rnd() * w, rnd() * h); ctx.bezierCurveTo(rnd() * w, rnd() * h, rnd() * w, rnd() * h, rnd() * w, rnd() * h); ctx.stroke(); }
}
const workEls = [];
{
  const works = $("#works");
  C.momentos.forEach((m, i) => {
    const b = document.createElement("button");
    b.className = "work"; b.setAttribute("data-cursor", "Ficha");
    b.innerHTML = `<h4></h4><div class="art">${m.foto ? `<img loading="lazy" decoding="async" alt="">` : "<canvas></canvas>"}</div><div class="meta"><span></span><span>N.º ${String(i + 1).padStart(2, "0")}</span></div>`;
    $("h4", b).textContent = m.titulo; $(".meta span", b).textContent = m.anio;
    if (m.foto) { $("img", b).src = m.foto; $("img", b).alt = m.titulo; }
    b.style.transitionDelay = (i % 3) * 110 + "ms";
    b.addEventListener("click", () => openLB({ kind: "moment", i }));
    works.appendChild(b); workEls.push(b);
    watch(b, () => fontsReady.then(() => { const cv = $("canvas", b); if (cv) drawArt(cv, m); }));
  });
}

/* ---------- ficha (lightbox) ---------- */
const lb = $("#lightbox"), pieces = $$(".piece");
let lbState = null, lastFocus = null;
function openLB(st) {
  lbState = st; if (lb.hidden) lastFocus = document.activeElement;
  const art = $("#lbArt"); art.innerHTML = "";
  if (st.kind === "moment") {
    const m = C.momentos[st.i];
    $("#lbNum").textContent = "Sala IV · N.º " + String(st.i + 1).padStart(2, "0");
    $("#lbTitle").textContent = m.titulo; $("#lbYear").textContent = m.anio; $("#lbTech").textContent = m.tecnica; $("#lbSize").textContent = m.medidas; $("#lbNote").textContent = m.nota;
    lb.hidden = false;
    if (m.foto) { const im = new Image(); im.src = m.foto; im.alt = m.titulo; art.appendChild(im); }
    else { const cv = document.createElement("canvas"); art.appendChild(cv); requestAnimationFrame(() => drawArt(cv, m)); }
  } else {
    const p = pieces[st.i], meta = $$(".piece-meta span", p);
    $("#lbNum").textContent = "Sala V · Colección permanente";
    $("#lbTitle").textContent = $("h3", p).textContent; $("#lbYear").textContent = meta[0].textContent; $("#lbTech").textContent = "Colección permanente"; $("#lbSize").textContent = meta[1].textContent; $("#lbNote").textContent = $(".piece-note", p).textContent;
    const img = $("img", p);
    if (img) { const im = img.cloneNode(); im.removeAttribute("loading"); im.removeAttribute("srcset"); im.src = img.currentSrc || img.src; art.appendChild(im); }
    else art.insertAdjacentHTML("beforeend", '<div class="hp"><span class="script">Siempre</span></div>');
    lb.hidden = false;
  }
  document.body.style.overflow = "hidden";
  $("#lbClose").focus({ preventScroll: true });
}
function closeLB() { if (lb.hidden) return; lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus({ preventScroll: true }); }
function stepLB(d) {
  if (!lbState) return;
  if (lbState.kind === "moment") openLB({ kind: "moment", i: (lbState.i + d + C.momentos.length) % C.momentos.length });
  else { const vis = pieces.map((_, i) => i).filter(i => !pieces[i].classList.contains("dim")); const k = vis.indexOf(lbState.i); openLB({ kind: "piece", i: vis[(k + d + vis.length) % vis.length] }); }
}
$("#lbClose").addEventListener("click", closeLB);
$("#lbPrev").addEventListener("click", () => stepLB(-1));
$("#lbNext").addEventListener("click", () => stepLB(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
addEventListener("keydown", e => {
  if (e.key === "Escape") { setMenu(false); closeLB(); }
  if (lb.hidden) return;
  if (e.key === "ArrowRight") stepLB(1);
  if (e.key === "ArrowLeft") stepLB(-1);
});

/* =========================================================
   SALA V · colección y herbario
   ========================================================= */
pieces.forEach((p, i) => {
  p.tabIndex = 0;
  p.addEventListener("click", () => openLB({ kind: "piece", i }));
  p.addEventListener("keydown", e => { if (e.key === "Enter") openLB({ kind: "piece", i }); });
});
$$(".filter-opts button").forEach(b => b.addEventListener("click", () => {
  $$(".filter-opts button").forEach(x => x.classList.toggle("on", x === b));
  const f = b.dataset.f;
  pieces.forEach(p => p.classList.toggle("dim", f !== "all" && p.dataset.cat !== "all" && p.dataset.cat !== f));
}));

{
  // dibujos botánicos generados
  const P = (d, cls = "ink") => `<path class="${cls}" pathLength="1" d="${d}"/>`;
  const oval = (cx, cy, rx, ry, a, cls) => {
    const c = Math.cos(a), s = Math.sin(a);
    const x1 = cx + rx * c, y1 = cy + rx * s, x2 = cx - rx * c, y2 = cy - rx * s, deg = a * 180 / Math.PI;
    return P(`M${x1.toFixed(1)} ${y1.toFixed(1)}A${rx} ${ry} ${deg.toFixed(0)} 1 1 ${x2.toFixed(1)} ${y2.toFixed(1)}A${rx} ${ry} ${deg.toFixed(0)} 1 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`, cls);
  };
  const leaf = (x, y, len, ang, wid = .28) => {
    const c = Math.cos(ang), s = Math.sin(ang), ex = x + c * len, ey = y + s * len;
    const nx = -s * len * wid, ny = c * len * wid, mx = x + c * len * .5, my = y + s * len * .5;
    return P(`M${x.toFixed(1)} ${y.toFixed(1)}Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${(mx - nx).toFixed(1)} ${(my - ny).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`);
  };
  const tape = (x, y, a) => `<rect class="tape" x="${x}" y="${y}" width="18" height="6" transform="rotate(${a} ${x + 9} ${y + 3})"/>`;
  const draw = {
    cedro() {
      let o = P("M50 112L50 18");
      for (let i = 0; i < 6; i++) {
        const y = 28 + i * 14, w = 10 + i * 6.5;
        o += P(`M50 ${y}Q${50 - w * .5} ${y - 5} ${50 - w} ${y + 3}`) + P(`M50 ${y}Q${50 + w * .5} ${y - 5} ${50 + w} ${y + 3}`);
        for (let k = 1; k < 5; k++) { const t = k / 5, xl = 50 - w * t, xr = 50 + w * t, yy = y - 3 * Math.sin(t * 3) + 3 * t; o += P(`M${xl.toFixed(1)} ${yy.toFixed(1)}l-1.5 4`) + P(`M${xr.toFixed(1)} ${yy.toFixed(1)}l1.5 4`); }
      }
      return o + tape(41, 96, -8);
    },
    olivo() {
      let o = P("M52 112C46 84 60 54 48 14");
      const pts = [[51,98],[52,86],[54,74],[55,62],[53,50],[51,38],[49,26]];
      pts.forEach(([x, y], i) => { o += leaf(x, y, 16 - i * .8, i % 2 ? -2.6 : -.5, .22); o += leaf(x, y + 5, 14 - i * .8, i % 2 ? .4 : 3.0, .22); });
      [[62,70],[40,58],[60,44]].forEach(([x, y]) => { o += `<circle class="fillr" cx="${x}" cy="${y}" r="2.6" style="fill:#3b3f2e"/>`; });
      return o + tape(43, 100, 6);
    },
    anemona() {
      let o = P("M50 112C53 92 46 72 50 50");
      o += P("M50 84C40 80 34 84 28 78M40 81l-4-6M34 81l-6-1") + P("M50 92C60 88 66 92 72 86M60 89l4-6M66 89l6-1");
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 - Math.PI / 2; o += oval(50 + Math.cos(a) * 9, 38 + Math.sin(a) * 9, 9, 6, a, "bloom"); }
      o += `<circle class="fillr" cx="50" cy="38" r="5" style="fill:#14161c"/>`;
      return o + tape(42, 98, -4);
    },
    jazmin() {
      let o = P("M30 112C40 90 62 82 56 60S40 34 60 16");
      o += leaf(44, 92, 12, -2.4) + leaf(56, 74, 11, -.3) + leaf(48, 44, 11, -2.8) + leaf(56, 30, 10, -.4);
      [[60,16],[38,52],[64,52],[44,26]].forEach(([cx, cy]) => {
        for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; o += oval(cx + Math.cos(a) * 4, cy + Math.sin(a) * 4, 4, 2.2, a, "bloom"); }
      });
      return o + tape(28, 100, 10);
    },
    lavanda() {
      let o = "";
      [[42, -6], [50, 0], [58, 6]].forEach(([x, k]) => {
        o += P(`M50 112Q${50 + k * .4} 70 ${x} 34`);
        for (let j = 0; j < 7; j++) { const y = 32 - j * 3.2, xx = x + k * .02 * j; o += oval(xx - 2, y, 2, 1.3, -.6, "bloom") + oval(xx + 2, y - 1.2, 2, 1.3, .6, "bloom"); }
        o += leaf(50 + k * .3, 92, 12, k < 0 ? -2.5 : k > 0 ? -.6 : -1.9, .18);
      });
      return o + tape(41, 100, -6);
    }
  };
  const grid = $("#herbGrid");
  const noteEl = document.createElement("p"); noteEl.className = "herb-note"; noteEl.setAttribute("aria-live", "polite");
  noteEl.textContent = "Toca una lámina para leer por qué la prensé para ti.";
  C.herbario.forEach((h, i) => {
    const b = document.createElement("button");
    b.className = "sheet"; b.setAttribute("aria-label", h.nombre + ", " + h.latin);
    b.innerHTML = `<svg viewBox="0 0 100 120" aria-hidden="true">${draw[h.forma]()}</svg><span class="lab"><small>N.º ${String(i + 1).padStart(2, "0")} · Líbano</small><i></i><b></b></span>`;
    $("i", b).textContent = h.latin; $("b", b).textContent = h.nombre;
    b.style.setProperty("--d", i * 150 + "ms");
    $$(".ink,.bloom", b).forEach(p => { p.style.transitionDelay = `calc(${i * 180}ms + ${p.classList.contains("bloom") ? ".8s" : "0s"})`; });
    b.addEventListener("click", () => {
      noteEl.textContent = h.nombre + ". " + h.nota; restart(noteEl, "swap");
      $$(".ink,.bloom", b).forEach(p => p.style.transitionDelay = "0s");
      b.classList.remove("in"); void b.offsetWidth; requestAnimationFrame(() => b.classList.add("in"));
    });
    grid.appendChild(b);
    watch(b);
  });
  grid.after(noteEl);
}

/* =========================================================
   SALA VI · restauración y diccionario
   ========================================================= */
{
  const rc = $("#restoreCanvas"), rRange = $("#restoreRange"), rHandle = $("#restoreHandle");
  let whole = null, broken = null;
  function build() {
    const rect = rc.getBoundingClientRect(), d = dpr(), W = rect.width, H = rect.height;
    if (!W) return;
    const mkC = () => { const c = document.createElement("canvas"); c.width = W * d; c.height = H * d; const x = c.getContext("2d"); x.setTransform(d, 0, 0, d, 0, 0); return [c, x]; };
    const rnd = seed(2026);
    const [cw, a] = mkC();
    paper(a, W, H);
    a.fillStyle = INK; a.beginPath(); a.arc(W * .4, H * .55, W * .26, 0, 7); a.fill();
    a.globalCompositeOperation = "multiply"; a.fillStyle = RED; a.beginPath(); a.arc(W * .62, H * .47, W * .22, 0, 7); a.fill(); a.globalCompositeOperation = "source-over";
    a.strokeStyle = BLACK; a.lineWidth = 1.4;
    const pts = [[.12,.12],[.24,.26],[.4,.22],[.52,.3],[.66,.2],[.86,.1]];
    a.beginPath(); pts.forEach((p, i) => i ? a.lineTo(p[0] * W, p[1] * H) : a.moveTo(p[0] * W, p[1] * H)); a.stroke();
    pts.forEach((p, i) => { a.fillStyle = i === 3 ? RED : BLACK; a.beginPath(); a.arc(p[0] * W, p[1] * H, i === 3 ? 6 : 3.5, 0, 7); a.fill(); });
    a.fillStyle = PAPER; let fs = W * .2; a.font = `400 ${fs}px "Mrs Saint Delafield", cursive`;
    const tw = a.measureText("nosotros").width; if (tw > W * .62) { fs *= W * .62 / tw; a.font = `400 ${fs}px "Mrs Saint Delafield", cursive`; }
    a.fillText("nosotros", W * .18, H * .66);
    a.fillStyle = BLACK; a.font = `600 ${W * .028}px Archivo, sans-serif`; a.fillText("NOSOTROS, 2026 · ÓLEO SOBRE UN MES", W * .06, H * .95);
    const cracks = [];
    for (let k = 0; k < 4; k++) { let x = W * (.15 + rnd() * .7), y = 0; const c = [[x, y]]; while (y < H) { x += (rnd() - .5) * W * .12; y += H * (.05 + rnd() * .06); c.push([x, y]); } cracks.push(c); }
    const trace = (ctx, c) => { ctx.beginPath(); c.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
    const [cb, b] = mkC();
    b.fillStyle = PAPER; b.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) { const y0 = H / 9 * i, off = (rnd() - .5) * W * .06, rot = (rnd() - .5) * .03; b.save(); b.beginPath(); b.rect(0, y0 + 2, W, H / 9 - 4); b.clip(); b.translate(off, 0); b.rotate(rot); b.drawImage(cw, 0, 0, W, H); b.restore(); }
    b.strokeStyle = "rgba(20,22,28,.85)"; b.lineWidth = 2.2; cracks.forEach(c => trace(b, c));
    const [cr, rr] = mkC();
    rr.drawImage(cw, 0, 0, W, H);
    rr.strokeStyle = "rgba(200,55,45,.25)"; rr.lineWidth = 6; cracks.forEach(c => trace(rr, c));
    rr.strokeStyle = RED; rr.lineWidth = 2.2; cracks.forEach(c => trace(rr, c));
    whole = cr; broken = cb; rc.width = W * d; rc.height = H * d;
    paint();
  }
  function paint() {
    if (!whole) return;
    const ctx = rc.getContext("2d"), v = rRange.value / 100, W = rc.width, H = rc.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(whole, 0, 0);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W * v, H); ctx.clip(); ctx.drawImage(broken, 0, 0); ctx.restore();
    rHandle.style.transform = `translateX(${(v - .5) * rc.clientWidth}px)`;
  }
  rRange.addEventListener("input", paint);
  const easeInOut = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  watch($("#restore"), () => fontsReady.then(() => {
    build();
    if (reduce) return;
    let t0 = 0; const from = 88, to = 34;
    const an = t => { t0 = t0 || t; const k = Math.min(1, (t - t0) / 2200); rRange.value = from + (to - from) * easeInOut(k); paint(); if (k < 1) requestAnimationFrame(an); };
    setTimeout(() => requestAnimationFrame(an), 700);
  }));
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (whole) build(); workEls.forEach((el, i) => { const cv = $("canvas", el); if (cv && el.classList.contains("in")) drawArt(cv, C.momentos[i]); }); }, 220); });

  const dl = $("#dictList");
  C.amor.forEach(t => { const li = document.createElement("li"); li.textContent = t; dl.appendChild(li); });
  watch($(".dict"), () => $$("li", dl).forEach((li, i) => setTimeout(() => li.classList.add("on"), reduce ? 0 : 600 + i * 900)));
}

/* =========================================================
   SALA VII · siempre
   ========================================================= */
{
  const cD = $("#cD"), cH = $("#cH"), cM = $("#cM"), cS = $("#cS");
  const tick = () => {
    let s = Math.max(0, Math.floor((Date.now() - inicio) / 1000));
    cD.textContent = Math.floor(s / 86400); s %= 86400;
    cH.textContent = String(Math.floor(s / 3600)).padStart(2, "0"); s %= 3600;
    cM.textContent = String(Math.floor(s / 60)).padStart(2, "0");
    cS.textContent = String(s % 60).padStart(2, "0");
  };
  tick(); setInterval(tick, 1000);

  const fc = $("#finale"), fx = fc.getContext("2d"), sec = $("#siempre");
  const rf = seed(97);
  const sky = Array.from({ length: 200 }, () => ({ x: rf(), y: rf(), r: rf() * 1.3 + .3, p: rf() * 6.28, s: .5 + rf() }));
  let lit = 0, litTarget = 0, running = false, visible = false;
  const T = stars.map(s => ({ id: s.id, x: .12 + s.x / 100 * .76, y: .1 + s.y / 100 * .8, big: s.grande }));
  const Tb = Object.fromEntries(T.map(s => [s.id, s]));
  function frame(t) {
    const r = sec.getBoundingClientRect(), d = dpr(), W = r.width, H = r.height;
    if (fc.width !== Math.round(W * d) || fc.height !== Math.round(H * d)) { fc.width = Math.round(W * d); fc.height = Math.round(H * d); }
    fx.setTransform(d, 0, 0, d, 0, 0); fx.clearRect(0, 0, W, H);
    lit += (litTarget - lit) * .025;
    for (let i = 0; i < sky.length; i++) {
      const s = sky[i], tw = .35 + .65 * (.5 + .5 * Math.sin(t / 900 * s.s + s.p)), vis = i < 60 ? .55 : lit;
      if (vis < .02) continue;
      fx.fillStyle = `rgba(244,242,238,${(reduce ? .6 : tw) * vis})`;
      fx.beginPath(); fx.arc(s.x * W, s.y * H, s.r, 0, 7); fx.fill();
    }
    if (lit > .02) {
      fx.strokeStyle = `rgba(244,242,238,${.5 * lit})`; fx.lineWidth = 1;
      links.forEach(([p, q], i) => {
        const k = Math.max(0, Math.min(1, lit * links.length * 1.1 - i)); if (!k) return;
        const a = Tb[p], b = Tb[q];
        fx.beginPath(); fx.moveTo(a.x * W, a.y * H); fx.lineTo((a.x + (b.x - a.x) * k) * W, (a.y + (b.y - a.y) * k) * H); fx.stroke();
      });
      T.forEach(s => { fx.fillStyle = s.big ? `rgba(242,140,110,${lit})` : `rgba(255,255,255,${lit})`; fx.beginPath(); fx.arc(s.x * W, s.y * H, s.big ? 5 : 3, 0, 7); fx.fill(); });
    }
    if (visible && !reduce) requestAnimationFrame(frame); else running = false;
  }
  const start = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
  if (hasIO) new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible) start(); })).observe(sec);
  else { visible = true; start(); }
  $("#lightSky").addEventListener("click", () => {
    litTarget = litTarget ? 0 : 1;
    $("#lightSky").textContent = litTarget ? "Apagar el cielo" : "Encender tu cielo";
    if (reduce) { lit = litTarget; requestAnimationFrame(frame); } else start();
  });
}
