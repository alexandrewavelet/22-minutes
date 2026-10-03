/* Rendu commun des pages planètes. Chaque page définit <body data-page="ID" data-root="../"> */
(function () {
  const D = OW, U = OWUI, { esc, STATUS, pill, planetSVG, planet } = U;
  const id = document.body.dataset.page, P = planet(id), R = U.ROOT;
  const cards = D.cards.filter(c => c.planet === id);
  const idx = D.planets.indexOf(P), prev = D.planets[(idx - 1 + D.planets.length) % D.planets.length], next = D.planets[(idx + 1) % D.planets.length];

  /* ---------- Schémas spécifiques ---------- */
  const EXTRAS = {
    sablieres: () => `
      <h2>Schéma · le sablier</h2>
      <div class="panel reveal">
        <svg viewBox="0 0 900 260" style="width:100%;height:auto">
          <defs><linearGradient id="sf" x1="0" x2="1"><stop offset="0" stop-color="#7e6a5a"/><stop offset="1" stop-color="#e3a15e"/></linearGradient></defs>
          <g transform="translate(60,30)">${planetSVG("sabliere-noire", 170)}</g>
          <g transform="translate(670,30)">${planetSVG("sabliere-rouge", 170)}</g>
          <path d="M215 115 C 380 60, 520 170, 690 115" stroke="url(#sf)" stroke-width="16" fill="none" stroke-linecap="round" opacity=".85">
            <animate attributeName="stroke-dasharray" values="0 900;900 0" dur="6s" repeatCount="indefinite"/></path>
          <text x="450" y="70" fill="#ece8de" font-family="Josefin Sans" font-size="18" text-anchor="middle" letter-spacing="2">LE SABLE PASSE DE LA NOIRE À LA ROUGE</text>
          <text x="145" y="230" fill="#ffc857" font-family="Caveat" font-size="22" text-anchor="middle">Tours ensevelies au début → émergent peu à peu</text>
          <text x="755" y="230" fill="#ffc857" font-family="Caveat" font-size="22" text-anchor="middle">Grottes ouvertes au début → bouchées à la fin</text>
        </svg>
        <p class="muted" style="margin:6px 0 0">Sablière <b>rouge</b> : y aller <b>tôt</b>. Sablière <b>noire</b> : attendre que les tours sortent du sable (Projet : à partir de ~7 min 50).</p>
      </div>`,
    leviathe: () => `
      <h2>Schéma · entrer dans la grande tornade</h2>
      <div class="panel reveal">
        <svg viewBox="0 0 900 300" style="width:100%;height:auto">
          <rect x="0" y="0" width="900" height="300" fill="none"/>
          <path d="M0 110 H900" stroke="#7fd0ff" stroke-dasharray="6 6" opacity=".5"/>
          <text x="890" y="102" text-anchor="end" fill="#7fd0ff" font-size="14" font-family="IBM Plex Sans">limite de l’atmosphère</text>
          <path d="M0 270 Q 225 255 450 270 T 900 270 V300 H0Z" fill="#0d3c5e"/>
          <g fill="none" stroke="#dff4ff" stroke-width="3" opacity=".85">
            <path d="M380 130 Q450 120 520 130"/><path d="M395 160 Q450 150 505 160"/><path d="M410 190 Q450 182 490 190"/><path d="M422 220 Q450 214 478 220"/><path d="M432 248 Q450 244 468 248"/>
            <path d="M380 130 L432 268 M520 130 L468 268" opacity=".5"/>
          </g>
          <g transform="translate(450,40)"><path d="M-14 8 L0 -14 L14 8 Z" fill="#ff8a3d"/><circle r="4" fill="#fff"/></g>
          <path d="M450 62 V118" stroke="#ff8a3d" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#ar)"/>
          <defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#ff8a3d"/></marker></defs>
          <path d="M150 200 Q 300 200 372 190" stroke="#ff7a7a" stroke-width="2" fill="none" stroke-dasharray="4 5"/>
          <text x="150" y="190" fill="#ff7a7a" font-family="Caveat" font-size="24">par le côté : éjecté ✗</text>
          <text x="480" y="44" fill="#ffc857" font-family="Caveat" font-size="24">tornade pile dessous, vitesse latérale = 0, on se laisse tomber ✓</text>
        </svg>
      </div>`,
    sombronces: () => `
      <h2>Schéma · passer les coelacanthes</h2>
      <div class="panel reveal">
        <svg viewBox="0 0 900 240" style="width:100%;height:auto">
          <rect width="900" height="240" rx="12" fill="#e9e4d6" opacity=".08"/>
          <g transform="translate(70,120)"><path d="M-16 -10 L18 0 L-16 10 Z" fill="#ff8a3d"/></g>
          <path d="M100 120 H220" stroke="#ff8a3d" stroke-width="3"/>
          <text x="80" y="90" fill="#ffc857" font-family="Caveat" font-size="22">1. s’orienter</text>
          <text x="150" y="160" fill="#ffc857" font-family="Caveat" font-size="22">2. petite poussée</text>
          <path d="M230 120 H760" stroke="#ff8a3d" stroke-width="2" stroke-dasharray="3 8"/>
          <text x="440" y="160" fill="#ffc857" font-family="Caveat" font-size="22" text-anchor="middle">3. moteurs coupés : on dérive, on ne corrige plus</text>
          <g transform="translate(470,70)"><ellipse rx="50" ry="22" fill="#2b2f3a"/><circle cx="-36" cy="-30" r="5" fill="#ffe9a8"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle><path d="M-36 -26 Q-40 -10 -30 -6" stroke="#2b2f3a" stroke-width="3" fill="none"/><path d="M40 0 l22 -14 v28z" fill="#2b2f3a"/><path d="M-50 4 h22" stroke="#e9e4d6" stroke-width="2"/></g>
          <text x="560" y="64" fill="#cfd2db" font-family="IBM Plex Sans" font-size="14">aveugle : il réagit au bruit des propulseurs</text>
          <text x="790" y="126" fill="#6fd39b" font-family="Caveat" font-size="26">passé ✓</text>
        </svg>
      </div>`,
    "lune-quantique": () => `
      <h2>Le problème, en une image</h2>
      <div class="panel reveal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;text-align:center">
        <div>${planetSVG("lune-quantique", 110)}<div class="hand" style="font-size:24px;color:#6fd39b">Je la regarde → elle reste</div></div>
        <div style="opacity:.25">${planetSVG("lune-quantique", 110)}<div class="hand" style="font-size:24px;color:#ff7a7a;opacity:1">Je pilote / je détourne les yeux → elle part</div></div>
        <div>${planetSVG("lune-quantique", 110)}<div class="hand" style="font-size:24px;color:#b99cff">Une image compte comme une observation…</div></div>
      </div>`
  };

  /* ---------- Rendu ---------- */
  const page = document.querySelector(".page");
  const done = cards.filter(c => c.status === "done").length;
  const isHere = D.now.planet === id;
  const zones = [...new Set(cards.map(c => c.zone))];
  const ext = D.links.filter(l => {
    const a = D.cards.find(c => c.id === l.from), b = D.cards.find(c => c.id === l.to);
    return a && b && ((a.planet === id) !== (b.planet === id));
  });
  const steps = D.timeline.filter(t => t.planets.includes(id));

  page.innerHTML = `
  <section class="phero" style="margin-top:0">
    <div class="spin">${planetSVG(id, 300)}</div>
    <div>
      <div class="eyebrow">${esc(P.en)}</div>
      <h1>${esc(P.name)}${P.sub ? `<span class="sub"> ${esc(P.sub)}</span>` : ""}</h1>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${pill(P.status)}<span class="muted">${done} / ${cards.length} lieux explorés</span></div>
      <p class="lead">${esc(P.blurb)}</p>
      ${isHere ? `<div class="herebox"><b>📍 Tu es ici.</b> ${esc(D.now.text)}</div>` : ""}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <a class="btn" href="${R}tableau.html">📌 Voir sur le tableau</a>
      </div>
    </div>
  </section>

  ${zones.map(z => `<section><h2>${esc(z)}</h2><div class="grid grid-2">${cards.filter(c => c.zone === z).map(card).join("")}</div></section>`).join("")}

  ${EXTRAS[id] ? `<section>${EXTRAS[id]()}</section>` : ""}

  ${ext.length ? `<section><h2>Fils vers d’autres planètes</h2><div class="grid grid-2">${ext.map(l => {
    const a = D.cards.find(c => c.id === l.from), b = D.cards.find(c => c.id === l.to);
    const mine = a.planet === id ? a : b, other = mine === a ? b : a, op = planet(other.planet);
    const col = l.kind === "hypo" ? "#2b6fd6" : l.kind === "rule" ? "#b99cff" : "#e04848";
    return `<a class="panel thread reveal" href="${R}${op.page}#${other.id}" style="--yc:${col}">
      <span>${esc(mine.title)}</span><span class="yarn"><i></i><em class="hand">${esc(l.label)}</em></span><span style="display:flex;align-items:center;gap:8px;justify-content:flex-end">${planetSVG(U.artFor(other), 34)}${esc(other.title)}</span></a>`;
  }).join("")}</div></section>` : ""}

  ${steps.length ? `<section><h2>Dans la chronologie</h2><div class="grid grid-2">${steps.map(t => `<a class="panel reveal" href="${R}chronologie.html#${t.id}" style="color:var(--ink)"><div class="eyebrow">${esc(t.hours)}</div><h3>${esc(t.title)}</h3><p class="muted" style="margin:0">${esc(t.items[0])}…</p></a>`).join("")}</div></section>` : ""}

  <section class="pnav">
    <a class="panel" href="${R}${prev.page}">${planetSVG(prev.id, 46)}<span><small>← Précédente</small><br>${esc(prev.name)}</span></a>
    <a class="panel" href="${R}${next.page}" style="justify-content:flex-end;text-align:right"><span><small>Suivante →</small><br>${esc(next.name)}</span>${planetSVG(next.id, 46)}</a>
  </section>`;

  function card(c) {
    const st = STATUS[c.status];
    return `<article class="panel loc reveal" id="${c.id}" style="--c:${st.hex}">
      <header><div><div class="zone">${esc(c.zone)} · ${esc(c.hours || "")}</div><h3>${esc(c.title)}</h3></div>${pill(c.status)}</header>
      <p style="margin:0">${esc(c.summary)}</p>
      ${c.details.length ? `<ul>${c.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
      ${c.hints.length ? `<details class="hints"><summary>Indices déjà reçus (${c.hints.length}) — cliquer pour afficher</summary>${c.hints.map(h => `<div class="hint"><span class="lvl">niv. ${h.lvl}</span><span>${esc(h.text)}</span></div>`).join("")}</details>` : ""}
      ${U.logBlock(c)}
      <div style="margin-top:12px;font-size:13px"><a href="${R}tableau.html#${c.id}">📌 sur le tableau</a></div>
    </article>`;
  }

  document.title = `${P.name} — Carnet de bord Outer Wilds`;
  if (location.hash) setTimeout(() => { const t = document.querySelector(location.hash); if (t) { t.scrollIntoView({ block: "center" }); t.classList.add("flash"); } }, 200);
})();
