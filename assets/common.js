/* Code partagé : fond étoilé, navigation, minuteur de boucle, illustrations des planètes */
(function () {
  const ROOT = document.body.dataset.root || "";
  const D = window.OW;

  /* ---------- Helpers ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const STATUS = {
    done:    { label: "Exploré",              color: "var(--st-done)",    hex: "#6fd39b" },
    partial: { label: "Reste à découvrir",    color: "var(--st-partial)", hex: "#ffc857" },
    blocked: { label: "Bloqué / mis de côté", color: "var(--st-blocked)", hex: "#ff7a7a" },
    current: { label: "En cours",             color: "var(--st-current)", hex: "#ff8a3d" },
    todo:    { label: "À explorer",           color: "var(--st-todo)",    hex: "#8fb3ff" }
  };
  const pill = st => `<span class="pill st-${st}">${STATUS[st].label}</span>`;
  const planet = id => D.planets.find(p => p.id === id);
  const lsGet = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  /* ---------- Illustrations SVG des planètes ---------- */
  let uid = 0;
  function planetSVG(id, size = 100) {
    const u = "p" + (++uid);
    const wrap = (inner, extra = "") => `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" ${extra} aria-hidden="true">${inner}</svg>`;
    const shade = `<radialGradient id="${u}sh" cx="35%" cy="30%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>`;
    const atmo = (c) => `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-opacity=".35" stroke-width="3"/>`;
    switch (id) {
      case "soleil":
        return wrap(`<defs><radialGradient id="${u}g"><stop offset="0" stop-color="#fffbe6"/><stop offset=".35" stop-color="#ffd36b"/><stop offset=".7" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient></defs>
          <circle cx="50" cy="50" r="50" fill="url(#${u}g)"/>`);
      case "atrebois":
        return wrap(`<defs>${shade}<radialGradient id="${u}g" cx="40%" cy="35%"><stop offset="0" stop-color="#8fb86a"/><stop offset="1" stop-color="#3f6230"/></radialGradient><clipPath id="${u}c"><circle cx="50" cy="50" r="38"/></clipPath></defs>
          <circle cx="50" cy="50" r="38" fill="url(#${u}g)"/>
          <g clip-path="url(#${u}c)" opacity=".9">
            <path d="M5 60 Q25 50 40 62 T80 58 T100 64 V100 H0Z" fill="#7a5a3a"/>
            <ellipse cx="34" cy="34" rx="9" ry="5" fill="#5d8a4a"/><ellipse cx="66" cy="30" rx="6" ry="4" fill="#4f7a3e"/>
            <circle cx="58" cy="72" r="5" fill="#5a4330"/>
          </g>
          <path d="M44 14 q-2 -6 1 -11 M48 13 q2 -7 -1 -12" stroke="#e8f4ff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/>
          <circle cx="47" cy="15" r="1.6" fill="#ff8a3d"/>
          <circle cx="50" cy="50" r="38" fill="url(#${u}sh)"/>${atmo("#bfe3a0")}`);
      case "station-solaire":
        return wrap(`<defs><radialGradient id="${u}g"><stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#ffb35a"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient></defs>
          <circle cx="50" cy="50" r="46" fill="url(#${u}g)" opacity=".55"/>
          <rect x="20" y="46" width="60" height="8" rx="2" fill="#6a5a4e"/>
          <rect x="44" y="22" width="12" height="56" rx="3" fill="#8a7663"/>
          <circle cx="50" cy="50" r="9" fill="#b9a48a" stroke="#4d4036" stroke-width="2"/>
          <path d="M14 42 h10 v16 h-10z M76 42 h10 v16 h-10z" fill="#3e5c8a" stroke="#9db8ff" stroke-width="1"/>`);
      case "trou-blanc":
        return wrap(`<defs><radialGradient id="${u}g"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#f0f4ff"/><stop offset=".6" stop-color="#9db8ff" stop-opacity=".5"/><stop offset="1" stop-color="#9db8ff" stop-opacity="0"/></radialGradient></defs>
          <circle cx="50" cy="50" r="46" fill="url(#${u}g)"/>
          <g fill="none" stroke="#ffffff" stroke-width="1.4" opacity=".6"><path d="M50 50 m-30 0 a30 12 0 1 0 60 0 a30 12 0 1 0 -60 0"/></g>
          <rect x="62" y="64" width="22" height="8" rx="2" fill="#6b6780"/><circle cx="73" cy="62" r="4" fill="#8a86a0"/>`);
      case "lune":
        return wrap(`<defs>${shade}</defs><circle cx="50" cy="50" r="38" fill="#a7a39a"/>
          <circle cx="36" cy="38" r="7" fill="#8d897f"/><circle cx="62" cy="58" r="10" fill="#8d897f"/><circle cx="44" cy="68" r="4" fill="#8d897f"/><circle cx="66" cy="32" r="3" fill="#8d897f"/>
          <circle cx="50" cy="50" r="38" fill="url(#${u}sh)"/>`);
      case "cravite":
        return wrap(`<defs>${shade}<radialGradient id="${u}bh"><stop offset="0" stop-color="#000"/><stop offset=".6" stop-color="#000"/><stop offset=".8" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient></defs>
          <circle cx="50" cy="50" r="38" fill="#4b3d5c"/>
          <path d="M20 40 L38 46 L30 62 M62 22 L58 42 L76 50 M44 78 L52 60 L70 72" stroke="#1a1424" stroke-width="2.5" fill="none"/>
          <circle cx="50" cy="50" r="38" fill="url(#${u}sh)"/>
          <circle cx="50" cy="50" r="12" fill="url(#${u}bh)"/>
          <path d="M80 26 l6 -3 l-1 6z M14 74 l-5 2 l3 -6z" fill="#5c4c6e"/>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#7a6a9a" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="6 4"/>`);
      case "leviathe":
        return wrap(`<defs>${shade}<radialGradient id="${u}g" cx="40%" cy="35%"><stop offset="0" stop-color="#3fa7c9"/><stop offset="1" stop-color="#0d3c5e"/></radialGradient><clipPath id="${u}c"><circle cx="50" cy="50" r="40"/></clipPath></defs>
          <circle cx="50" cy="50" r="40" fill="url(#${u}g)"/>
          <g clip-path="url(#${u}c)" fill="none" stroke="#dff4ff" stroke-linecap="round" opacity=".75">
            <path d="M30 30 q8 -6 14 0 q-6 6 -12 2 q4 -3 7 -1" stroke-width="2"/>
            <path d="M58 58 q10 -8 18 0 q-8 8 -15 3 q5 -4 9 -2" stroke-width="2.4"/>
            <path d="M24 66 q6 -4 10 0 q-4 4 -8 1" stroke-width="1.6"/>
          </g>
          <g clip-path="url(#${u}c)" fill="#5e9a5a"><ellipse cx="68" cy="30" rx="4" ry="2.5"/><ellipse cx="40" cy="74" rx="5" ry="2.5"/><ellipse cx="22" cy="46" rx="3" ry="2"/></g>
          <circle cx="50" cy="50" r="40" fill="url(#${u}sh)"/>${atmo("#7fd0ff")}`);
      case "sabliere-rouge":
        return wrap(`<defs>${shade}</defs><circle cx="50" cy="50" r="38" fill="#d9894a"/>
          <path d="M14 46 q20 -8 36 0 t36 -2" stroke="#b9663a" stroke-width="5" fill="none" opacity=".7"/>
          <path d="M18 64 q22 6 40 -2 t26 2" stroke="#e8a66a" stroke-width="4" fill="none" opacity=".7"/>
          <circle cx="50" cy="50" r="38" fill="url(#${u}sh)"/>`);
      case "sabliere-noire":
        return wrap(`<defs>${shade}</defs><circle cx="50" cy="50" r="38" fill="#3b3746"/>
          <path d="M30 40 v-10 M42 34 v-12 M60 36 v-10 M70 46 v-8" stroke="#8c8698" stroke-width="3" stroke-linecap="round"/>
          <path d="M16 60 q34 -16 68 0" stroke="#7e6a5a" stroke-width="5" fill="none" opacity=".6"/>
          <circle cx="50" cy="50" r="38" fill="url(#${u}sh)"/>`);
      case "sablieres":
        return wrap(`<defs>${shade}<linearGradient id="${u}s" x1="0" x2="1"><stop offset="0" stop-color="#7e6a5a"/><stop offset="1" stop-color="#e3a15e"/></linearGradient></defs>
          <path d="M38 44 C 48 36, 56 60, 66 52" stroke="url(#${u}s)" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
          <circle cx="28" cy="40" r="22" fill="#3b3746"/><circle cx="28" cy="40" r="22" fill="url(#${u}sh)"/>
          <path d="M18 34 v-6 M26 30 v-8 M36 32 v-6" stroke="#8c8698" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="72" cy="60" r="24" fill="#d9894a"/>
          <path d="M52 58 q14 -6 26 0 t18 -2" stroke="#b9663a" stroke-width="4" fill="none" opacity=".7"/>
          <circle cx="72" cy="60" r="24" fill="url(#${u}sh)"/>`);
      case "sombronces":
        return wrap(`<defs><radialGradient id="${u}g" cx="45%" cy="40%"><stop offset="0" stop-color="#f4f1e6"/><stop offset=".7" stop-color="#cfc8b4"/><stop offset="1" stop-color="#8f8670"/></radialGradient></defs>
          <circle cx="50" cy="50" r="34" fill="url(#${u}g)" opacity=".92"/>
          <g fill="none" stroke="#3a2d22" stroke-linecap="round">
            <path d="M50 50 C 30 30, 10 40, 4 22" stroke-width="4"/><path d="M50 50 C 72 34, 86 44, 96 28" stroke-width="3.5"/>
            <path d="M50 50 C 40 72, 24 80, 14 94" stroke-width="3.5"/><path d="M50 50 C 66 70, 80 72, 92 86" stroke-width="3"/>
            <path d="M50 50 C 54 30, 46 16, 52 2" stroke-width="3"/>
            <path d="M20 30 l-6 -2 M80 40 l5 -5 M24 82 l-6 1 M84 78 l4 4" stroke-width="2"/>
          </g>
          <circle cx="30" cy="62" r="1.8" fill="#ffe9a8"/><circle cx="70" cy="36" r="1.5" fill="#ffe9a8"/><circle cx="62" cy="68" r="1.2" fill="#ffe9a8"/>`);
      case "intrus":
        return wrap(`<defs><linearGradient id="${u}t" x1="1" x2="0"><stop offset="0" stop-color="#bfe6ff" stop-opacity=".9"/><stop offset="1" stop-color="#bfe6ff" stop-opacity="0"/></linearGradient><radialGradient id="${u}g" cx="40%" cy="35%"><stop offset="0" stop-color="#f2fbff"/><stop offset="1" stop-color="#7fb2d1"/></radialGradient></defs>
          <path d="M66 40 L4 18 L6 30 L64 54 Z" fill="url(#${u}t)"/>
          <path d="M66 46 L10 44 L12 50 L64 56 Z" fill="url(#${u}t)" opacity=".6"/>
          <path d="M60 34 l14 -6 l14 10 l2 16 l-12 12 l-16 -2 l-8 -14z" fill="url(#${u}g)" stroke="#e8f6ff" stroke-width="1"/>
          <path d="M70 40 l6 8 l-4 8" stroke="#4d86a8" stroke-width="1.4" fill="none"/>`);
      case "lune-quantique":
        return wrap(`<defs>${shade}<radialGradient id="${u}f"><stop offset=".55" stop-color="#d9d4ff" stop-opacity="0"/><stop offset=".85" stop-color="#d9d4ff" stop-opacity=".35"/><stop offset="1" stop-color="#d9d4ff" stop-opacity="0"/></radialGradient></defs>
          <circle cx="50" cy="50" r="46" fill="url(#${u}f)"/>
          <circle cx="50" cy="50" r="30" fill="#8a86a0"/><circle cx="42" cy="44" r="5" fill="#77738c"/><circle cx="58" cy="60" r="7" fill="#77738c"/>
          <circle cx="50" cy="50" r="30" fill="url(#${u}sh)"/>
          <circle cx="50" cy="50" r="36" fill="none" stroke="#cfc8ff" stroke-width="1" stroke-dasharray="2 5" opacity=".8"/>`);
      default:
        return wrap(`<circle cx="50" cy="50" r="38" fill="#556"/>`);
    }
  }

  /* Spirale nomaï (décor) */
  function nomaiSpiral(size = 200, color = "#9db8ff") {
    let d = "M100 100", a = 0, r = 2;
    for (let i = 0; i < 220; i++) { a += 0.12; r += 0.38; d += ` L${(100 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`; }
    const branches = [40, 90, 140, 180].map(i => {
      const aa = i * 0.12, rr = 2 + i * 0.38, x = 100 + Math.cos(aa) * rr, y = 100 + Math.sin(aa) * rr;
      return `<path d="M${x} ${y} q ${Math.cos(aa + 1) * 20} ${Math.sin(aa + 1) * 20} ${Math.cos(aa + 1.6) * 34} ${Math.sin(aa + 1.6) * 34}" />`;
    }).join("");
    return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="${d}"/>${branches}</svg>`;
  }

  /* ---------- Fond étoilé ---------- */
  function starfield() {
    const c = document.createElement("canvas"); c.id = "starfield"; document.body.prepend(c);
    const ctx = c.getContext("2d");
    let W, H, stars = [], shoot = null;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function resize() {
      W = c.width = innerWidth * devicePixelRatio; H = c.height = innerHeight * devicePixelRatio;
      c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
      const n = Math.min(420, Math.floor(innerWidth * innerHeight / 3500));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.2, t: Math.random() * 6.28, s: Math.random() * 0.02 + 0.004, hue: Math.random() < 0.15 ? "255,200,150" : (Math.random() < 0.2 ? "180,200,255" : "255,255,255") }));
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(W * 0.8, H * 0.1, 0, W * 0.8, H * 0.1, W * 0.7);
      g.addColorStop(0, "rgba(90,60,140,0.16)"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const g2 = ctx.createRadialGradient(W * 0.1, H * 0.9, 0, W * 0.1, H * 0.9, W * 0.6);
      g2.addColorStop(0, "rgba(255,120,50,0.07)"); g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      for (const s of stars) {
        s.t += s.s; const a = 0.45 + Math.sin(s.t) * 0.4;
        ctx.fillStyle = `rgba(${s.hue},${a})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * devicePixelRatio, 0, 6.28); ctx.fill();
      }
      if (!shoot && Math.random() < 0.003) shoot = { x: Math.random() * W, y: Math.random() * H * 0.5, vx: 9 + Math.random() * 6, vy: 3 + Math.random() * 3, life: 1 };
      if (shoot) {
        ctx.strokeStyle = `rgba(255,240,220,${shoot.life})`; ctx.lineWidth = 1.5 * devicePixelRatio;
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * 8, shoot.y - shoot.vy * 8); ctx.stroke();
        shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= 0.02; if (shoot.life <= 0) shoot = null;
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    resize(); addEventListener("resize", resize); frame();
  }

  /* ---------- Barre de navigation ---------- */
  function nav() {
    const here = document.body.dataset.page;
    const plMenu = D.planets.map(p => `<a href="${ROOT}${p.page}" class="${here === p.id ? "active" : ""}"><span class="dot" style="background:${STATUS[p.status].hex}"></span>${esc(p.name)}</a>`).join("");
    const el = document.createElement("header");
    el.className = "topbar";
    el.innerHTML = `<div class="topbar-inner">
      <a class="brand" href="${ROOT}index.html">${planetSVG("atrebois", 28)}<span>Carnet de bord</span></a>
      <nav class="nav">
        <a href="${ROOT}index.html" class="${here === "index" ? "active" : ""}">Accueil</a>
        <a href="${ROOT}tableau.html" class="${here === "tableau" ? "active" : ""}">Tableau d’enquête</a>
        <a href="${ROOT}chronologie.html" class="${here === "chronologie" ? "active" : ""}">Chronologie</a>
        <a href="${ROOT}journal.html" class="${here === "journal" ? "active" : ""}">Journal</a>
        <div class="dd"><a href="${ROOT}index.html#systeme" class="${planet(here) ? "active" : ""}">Planètes ▾</a><div class="dd-menu">${plMenu}</div></div>
        <a href="${ROOT}savoir.html" class="${here === "savoir" ? "active" : ""}">Savoir</a>
      </nav>
      <div class="loop" title="Une boucle dure 22 minutes… celle-ci a commencé à l’ouverture de la page.">
        <span class="sunico"></span><span class="loop-time">00:00</span><span class="loop-bar"><i></i></span>
      </div></div>`;
    document.body.prepend(el);
    // Minuteur de boucle (22 min)
    // L'heure de début est partagée entre les pages (sinon le minuteur repart à 0 à chaque changement de page)
    const LOOP = 22 * 60;
    let start = lsGet("ow-loop-start");
    if (typeof start !== "number" || start > Date.now()) { start = Date.now(); lsSet("ow-loop-start", start); }
    const t = el.querySelector(".loop-time"), bar = el.querySelector(".loop-bar i"), sun = el.querySelector(".sunico");
    setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000) % LOOP;
      t.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      bar.style.width = (s / LOOP * 100) + "%";
      sun.style.transform = `scale(${1 + Math.pow(s / LOOP, 3) * 1.4})`;
    }, 1000);
  }

  function footer() {
    const f = document.createElement("footer");
    f.className = "foot";
    f.innerHTML = `<span>Mis à jour le ${esc(D.meta.lastUpdate)} · temps de jeu ${esc(D.meta.playtime)}</span><span class="hand" style="font-size:18px;color:var(--ember)">Bon voyage, Âtrien. 🔥</span>`;
    (document.querySelector(".page") || document.body).appendChild(f);
  }

  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(n => io.observe(n));
  }

  /* ---------- Journal du vaisseau (assets/journal.js, généré depuis la sauvegarde) ---------- */
  const ZONE_ART = { "Rocaille": "lune", "Sablière rouge": "sabliere-rouge", "Sablière noire": "sabliere-noire", "Station du trou blanc": "trou-blanc" };
  const artFor = c => ZONE_ART[c.zone] || c.planet;
  const LOG_STATE = { done: "Exploré", more: "Il reste des choses à découvrir", rumor: "?  Rumeur" };
  const J = () => window.OW_JOURNAL;
  const logEntry = id => J() && J().entries.find(e => e.id === id);
  function factsHTML(e) {
    return `<ul class="logfacts">${e.facts.map(f => `<li class="${f.rumor ? "rumor" : "explore"}"><span class="n">#${f.order}</span>${f.unread ? `<span class="new">nouveau</span>` : ""}${esc(f.text)}</li>`).join("")}</ul>`;
  }
  function logBlock(card, open) {
    const es = (card.log || []).map(logEntry).filter(Boolean);
    if (!es.length) return "";
    const n = es.reduce((a, e) => a + e.facts.length, 0);
    return `<details class="logx"${open ? " open" : ""}><summary>📓 Journal du vaisseau · ${n} note${n > 1 ? "s" : ""}</summary>
      ${es.map(e => `<div class="logentry"><div class="lh"><b>${esc(e.name)}</b><span class="ls ls-${e.state}">${LOG_STATE[e.state]}</span></div>${factsHTML(e)}</div>`).join("")}</details>`;
  }

  /* Astres du journal → [page planète, nom affiché, illustration] */
  const ASTRO = {
    TIMBER_HEARTH: ["atrebois", "Âtrebois", "atrebois"], TIMBER_MOON: ["atrebois", "Rocaille", "lune"],
    BRITTLE_HOLLOW: ["cravite", "Cravité", "cravite"], WHITE_HOLE: ["cravite", "Station du trou blanc", "trou-blanc"],
    GIANTS_DEEP: ["leviathe", "Léviathe", "leviathe"], ORBITAL_PROBE_CANNON: ["leviathe", "Lance-sondes orbital", "leviathe"],
    CAVE_TWIN: ["sablieres", "Sablière rouge", "sabliere-rouge"], TOWER_TWIN: ["sablieres", "Sablière noire", "sabliere-noire"],
    DARK_BRAMBLE: ["sombronces", "Sombronces", "sombronces"], COMET: ["intrus", "L’Intrus", "intrus"],
    QUANTUM_MOON: ["lune-quantique", "Lune quantique", "lune-quantique"], SUN_STATION: ["station-solaire", "Station solaire", "station-solaire"]
  };
  /* Tous les faits débloqués, à plat, triés par ordre de découverte */
  const allFacts = () => !J() ? [] : J().entries.flatMap(e => e.facts.map(f => ({ ...f, entry: e }))).sort((a, b) => a.order - b.order);

  window.OWUI = { esc, STATUS, pill, planet, planetSVG, nomaiSpiral, lsGet, lsSet, ROOT, reveal, artFor, logBlock, factsHTML, LOG_STATE, ASTRO, allFacts };

  starfield(); nav();
  if (!document.body.dataset.nofooter) document.addEventListener("DOMContentLoaded", () => { footer(); reveal(); });
  if (document.readyState !== "loading") { if (!document.body.dataset.nofooter) footer(); reveal(); }
})();
