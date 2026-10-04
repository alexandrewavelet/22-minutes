/* =====================================================================
   CARNET DE BORD — OUTER WILDS
   Source unique de vérité pour le carnet (le journal du vaisseau brut est
   dans assets/journal.js, généré depuis la sauvegarde).
   Statuts : done | partial | blocked | current | todo
   Règle d'or : n'écrire ici QUE ce que le joueur a découvert lui-même
   (sauvegarde + ses récits) ou les indices déjà reçus. Aucun spoiler.
   `log` = IDs d'entrées du journal du vaisseau liées à la carte.
   ===================================================================== */
window.OW = {

  meta: {
    lastUpdate: "4 octobre 2026",
    lastSession: "4 octobre 2026 (sauvegarde de 11 h 55)",
    playtime: "≈ 15 h",
    steam: "18 h",
    playtimeNote: "Steam affiche 18 h, pauses et menus compris. La sauvegarde compte 52 boucles, dont 12 menées jusqu’à la supernova.",
    estimateTotal: "18 – 20 h",
    finished: true,
    estimateNote: "Jeu terminé le 4 oct. 2026 ! 245 notes sur 281 dans le journal du jeu de base (87 %) : quelques recoins restent inexplorés.",
    progress: 87,
    platform: "PC (manette conseillée)"
  },

  /* Où en est le voyageur MAINTENANT */
  now: {
    planet: "sombronces",
    card: "sb-vaisseau",
    title: "Voyage terminé : l’Œil de l’univers",
    text: "Le générateur de distorsion du Projet Sablière noire installé dans le Vaisseau, cap sur les coordonnées de l’Œil. Arrivée sur l’Œil, saut dans le cratère… Jeu terminé !",
    nextSteps: [
      { planet: "station-solaire", text: "Pour le plaisir : la Station solaire n’a jamais été visitée." },
      { planet: "sablieres",       text: "Pour le plaisir : la grotte asséchée de Coleus et les grottes quantiques gardent encore des secrets." }
    ]
  },

  /* Statistiques tirées de la sauvegarde */
  save: {
    loops: 52, fullLoops: 12, facts: 245, entries: 59,
    burnedMarshmallows: 11, perfectMarshmallows: 0,
    travelers: ["Esker", "Chail", "Riébeck", "Gabbro", "Feldspath", "Solanum"],
    abilities: ["Méditer jusqu’à la boucle suivante (appris auprès de Gabbro)"],
    fun: ["A déjà vu le soleil exploser… et le sait.", "A déjà foncé dans le soleil en pilote automatique. 🔥", "A retrouvé le vaisseau de Gabbro pour lui.", "A exploré le nid des cœlacanthes (et en est ressorti).", "A déjà goûté à la matière fantôme. Une seule fois, normalement.", "A trouvé le satellite d’espace lointain.", "A rencontré Solanum.", "A atteint l’Œil de l’univers. 👁️"]
  },

  player: {
    likes: ["Chants of Sennaar", "jeux d’enquête et de déduction", "comprendre par soi-même"],
    dislikes: ["les spoilers (même captures / Reddit)", "les ennemis", "les phases d’infiltration"],
    hintStyle: "Indices progressifs, du plus subtil au plus explicite. Solution concrète seulement sur demande explicite.",
    target: "Jeu de 15 – 20 h visé au départ"
  },

  planets: [
    { id: "atrebois",        name: "Âtrebois",        sub: "& Rocaille",    en: "Timber Hearth (+ Attlerock)", page: "planetes/atrebois.html",        status: "partial",
      blurb: "Planète natale du voyageur : village, observatoire, grotte antigrav, une graine de Sombronces écrasée… et Rocaille, la lune où vit Esker." },
    { id: "cravite",         name: "Cravité",         sub: "& station du trou blanc", en: "Brittle Hollow (+ White Hole Station)", page: "planetes/cravite.html", status: "partial",
      blurb: "Planète creuse qui s’effondre dans son trou noir. Cité suspendue, Riébeck, observatoire sud… et de l’autre côté du trou noir, la station du trou blanc." },
    { id: "leviathe",        name: "Léviathe",        sub: "",              en: "Giant’s Deep",                page: "planetes/leviathe.html",        status: "done",
      blurb: "Géante océanique balayée par des tornades. Îles, statues, Gabbro dans son hamac, un courant qui bloque les abysses… et un lance-sondes en orbite." },
    { id: "sablieres",       name: "Les Sablières",   sub: "rouge & noire", en: "Hourglass Twins",             page: "planetes/sablieres.html",       status: "partial",
      blurb: "Deux planètes jumelles : le sable passe de la noire à la rouge pendant la boucle. Cité obscure, laboratoire, fossile… et le Projet Sablière noire." },
    { id: "sombronces",      name: "Sombronces",      sub: "",              en: "Dark Bramble",                page: "planetes/sombronces.html",      status: "partial",
      blurb: "Une boule de ronces et de brume, plus grande à l’intérieur qu’à l’extérieur. Des lumières, des cœlacanthes, et l’épave du Vaisseau des Nomaï, qui a fini par repartir vers l’Œil." },
    { id: "intrus",          name: "L’Intrus",        sub: "",              en: "The Interloper",              page: "planetes/intrus.html",          status: "partial",
      blurb: "Une comète glacée sur une orbite très allongée. Des Nomaï y ont atterri et sont descendus par une fissure dans la glace." },
    { id: "lune-quantique",  name: "Lune quantique",  sub: "",              en: "Quantum Moon",                page: "planetes/lune-quantique.html",  status: "done",
      blurb: "Une lune qui ne reste jamais au même endroit quand on ne la regarde pas. Son sixième emplacement : en orbite autour de l’Œil, où Solanum attendait encore." },
    { id: "station-solaire", name: "Station solaire", sub: "",              en: "Sun Station",                 page: "planetes/station-solaire.html", status: "todo",
      blurb: "Une structure nomaï construite près du soleil, qui a beaucoup divisé les Nomaï. Seulement entendue, jamais visitée." }
  ],

  /* ---------------------------------------------------------------
     CARTES — pos = position sur le tableau (2700 × 2050)
     --------------------------------------------------------------- */
  cards: [
    /* ---------- ÂTREBOIS ---------- */
    { id: "atb-depart", planet: "atrebois", zone: "Âtrebois", title: "Village & observatoire", status: "done", hours: "0 h",
      summary: "Départ de l’aventure. La statue nomaï de l’observatoire a ouvert les yeux et regardé le voyageur : ses souvenirs ont défilé.",
      details: [
        "Hal : la statue n’avait jamais ouvert les yeux (malgré les efforts de Cornée).",
        "Grotte antigrav : entraînement, « satellite » réparé pour Gossan.",
        "Pilotage : verrouiller la cible + « Égaliser la vitesse »."
      ],
      log: ["TH_VILLAGE", "TH_ZERO_G_CAVE"], hints: [], pos: { x: 60, y: 110 } },

    { id: "atb-graine", planet: "atrebois", zone: "Âtrebois", title: "Graine de Sombronces", status: "done", hours: "≈ 10 h",
      summary: "Une graine de Sombronces s’est écrasée sur Âtrebois. Le guetteur lancé dedans : elle est bien plus grande à l’intérieur.",
      details: ["L’onduloscope y capte un air d’harmonica : celui de Feldspath, disparu depuis longtemps ?"],
      log: ["TH_IMPACT_CRATER"], hints: [], pos: { x: 310, y: 100 } },

    { id: "atb-mine", planet: "atrebois", zone: "Âtrebois", title: "Mines nomaï", status: "partial", hours: "≈ 10 h",
      summary: "Les Nomaï y extrayaient le minerai de l’enveloppe qui scelle la salle centrale de la Sablière noire.",
      details: ["Journal : il reste encore des choses à découvrir ici."],
      log: ["TH_NOMAI_MINE"], hints: [], pos: { x: 70, y: 390 } },

    { id: "atb-cratere", planet: "atrebois", zone: "Âtrebois", title: "Bois quantique", status: "partial", hours: "≈ 10 h",
      summary: "Dans le cratère du pôle Sud : un fragment quantique, des arbres, un poème écrit sur un arbre. Pas d’énigme : c’est une introduction aux objets quantiques.",
      details: [
        "Chail y a détecté un signal très similaire à celui de la Lune quantique.",
        "Le fragment se déplace quand on ne le regarde pas : détourner le regard puis le chercher suffit à compléter la note manquante du journal.",
        "Le poème (« Ah oui, celui dans les bois ») est de Gabbro : un poème quantique qui en vaut 24.",
        "Ne débloque rien d’autre. La piste « obscurité + immobile » sur le rocher était une fausse piste."
      ],
      log: ["TH_QUANTUM_SHARD"],
      hints: [
        { lvl: 1, text: "Tu n’as pas besoin de déplacer la roche. Pense à la règle « être en contact avec un objet quantique quand il se déplace »." },
        { lvl: 2, text: "Selon ChatGPT : ce lieu ne serait pas encore résoluble, il manquerait une connaissance. (Faux : il n’y a rien à résoudre.)" },
        { lvl: 3, text: "Solution donnée après la fin du jeu : aucune énigme, juste observer le fragment se déplacer quand on ne le regarde pas." }
      ], pos: { x: 320, y: 380 } },

    /* ---------- ROCAILLE ---------- */
    { id: "lune-esker", planet: "atrebois", zone: "Rocaille", title: "Esker & le poste d’observation", status: "done", hours: "≈ 1 h",
      summary: "Premier atterrissage sur Rocaille, la lune d’Âtrebois. Esker y fait pousser des arbres et surveille les voyageurs à l’onduloscope depuis le pôle Nord.",
      details: ["Esker a relevé l’harmonica de Feldspath en provenance d’Âtrebois."],
      log: ["TM_ESKER", "TM_NORTH_POLE"], hints: [], pos: { x: 70, y: 720 } },

    { id: "lune-ruine", planet: "atrebois", zone: "Rocaille", title: "Traceur oculaire", status: "done", hours: "≈ 1 h",
      summary: "Une ruine nomaï conçue pour localiser des signaux lointains. Les Nomaï n’ont pas réussi à y détecter le signal de « l’Œil de l’univers ».",
      details: ["C’est elle qui a lancé la piste de l’observatoire sud de Cravité."],
      log: ["TM_EYE_LOCATOR"], hints: [], pos: { x: 320, y: 730 } },

    /* ---------- CRAVITÉ ---------- */
    { id: "cra-riebeck", planet: "cravite", zone: "Cravité", title: "Riébeck & l’ancienne colonie", status: "done", hours: "≈ 2 h / 15 h",
      summary: "Riébeck campe au fond de la croisée des chemins. Plus tard : l’ancienne colonie des survivants de la capsule de sauvetage 1, avec trois fresques qui racontent l’histoire du Vaisseau.",
      details: [
        "Riébeck a trouvé un chemin nomaï partant du bâtiment en ruine envahi d’arbres, sur l’équateur.",
        "Les survivants de la capsule 1 ont descendu le gouffre et bâti une colonie provisoire sous la capsule.",
        "Jugeant la colonie instable, ils ont rejoint le glacier nord par un chemin de cristaux gravitationnels : la Cité suspendue.",
        "C’est là qu’ils ont uni leurs efforts pour retrouver le signal de l’Œil de l’univers, capté à bord du Vaisseau.",
        "Fresques : le Vaisseau capte un signal, se retrouve piégé dans Sombronces, et lâche trois capsules de sauvetage."
      ],
      log: ["BH_RIEBECK", "BH_OLD_SETTLEMENT", "BH_ESCAPE_POD", "BH_MURAL_1", "BH_MURAL_2", "BH_MURAL_3"], hints: [], pos: { x: 640, y: 110 } },

    { id: "cra-ville", planet: "cravite", zone: "Cravité", title: "Cité suspendue", status: "done", hours: "≈ 3 h",
      summary: "Une cité nomaï en quatre secteurs, suspendue sous le glacier nord. Les Nomaï sont venus chercher un signal plus vieux que l’univers : « l’Œil de l’univers ».",
      details: [
        "Débat sur la conception d’un générateur de distorsion avancé pour le Projet Sablière noire.",
        "Un interrupteur dans le secteur de l’eau de fonte commande l’accès à la forge du trou noir."
      ],
      log: ["BH_HANGING_CITY"], hints: [], pos: { x: 890, y: 100 } },

    { id: "cra-forge", planet: "cravite", zone: "Cravité", title: "Forge du trou noir", status: "todo", hours: "≈ 3 h",
      summary: "Le secteur qui domine la Cité suspendue, où l’on façonnait les générateurs de distorsion envoyés sur la Sablière noire.",
      details: ["Pas encore visitée (« ? » dans le journal). L’interrupteur d’accès est connu."],
      log: ["BH_BLACK_HOLE_FORGE"], hints: [], pos: { x: 1140, y: 120 } },

    { id: "cra-canon", planet: "cravite", zone: "Cravité", title: "Canon gravitationnel", status: "done", hours: "≈ 3 h",
      summary: "Une immense structure à champ gravitationnel vertical. Le voyageur a rappelé une navette nomaï… depuis la Lune quantique !",
      details: ["La navette rappelée est celle de Solanum (voir Lune quantique)."],
      log: ["BH_GRAVITY_CANNON"], hints: [{ lvl: 2, text: "Le canon est un bon point de départ : regarde les chemins de cristaux qui en partent." }],
      pos: { x: 650, y: 390 } },

    { id: "cra-observatoire", planet: "cravite", zone: "Cravité", title: "Observatoire sud", status: "done", hours: "4 – 5 h",
      summary: "Le traceur géant n’a rien détecté du signal de l’Œil. Les Nomaï ont alors décidé de le chercher visuellement en lançant une sonde.",
      details: [
        "Accès par l’intérieur (porte de surface cassée) : depuis le canon gravitationnel ou la Tour du savoir quantique.",
        "Simulation de tornade : les rares cyclones à rotation inversée emportent les objets sous le courant de Léviathe."
      ],
      log: ["BH_OBSERVATORY", "BH_TORNADO_SIMULATION"], hints: [{ lvl: 1, text: "Pas d’accès par l’extérieur : chercher un chemin à l’intérieur." }],
      pos: { x: 900, y: 380 } },

    { id: "cra-roc", planet: "cravite", zone: "Cravité", title: "Roc quantique de Cravité", status: "done", hours: "≈ 3 h",
      summary: "Un fragment qui bouge quand personne ne le regarde, et qui rend quantique tout le bois qui l’entoure.",
      details: ["Il émet le même signal que la Lune quantique : les Nomaï pensaient que c’en était un morceau."],
      log: ["BH_QUANTUM_SHARD"], hints: [], pos: { x: 1150, y: 400 } },

    { id: "cra-tour", planet: "cravite", zone: "Cravité", title: "Tour du savoir quantique", status: "done", hours: "≈ 2 h",
      summary: "Sur l’équateur de Cravité : un savoir précieux pour les Nomaï qui partaient en pèlerinage vers la Lune quantique.",
      details: ["Sommet atteint, deux textes lus : l’autel doit se trouver au pôle Nord de la Lune quantique pour accéder au sixième emplacement.", "Rien d’autre à faire au sommet. À ne pas confondre avec la Tour des épreuves quantiques de Léviathe."],
      log: ["BH_QUANTUM_RESEARCH_TOWER"], hints: [
        { lvl: 1, text: "On ne peut pas monter normalement (escalier détruit). Cravité s’effondre dans son trou noir… et ce qui y tombe ressort au trou blanc." },
        { lvl: 2, text: "Rester sur la tour et attendre : la croûte qui la porte se détache, la tour passe par le trou noir et ressort au trou blanc, en apesanteur. Monter alors au jetpack. Arriver tôt dans la boucle." }
      ], pos: { x: 660, y: 680 } },

    { id: "cra-glacier", planet: "cravite", zone: "Cravité", title: "Glacier nord", status: "done", hours: "≈ 3 h",
      summary: "Une ruine de forme particulière au pôle Nord : le récepteur où arrivaient les Nomaï envoyés par distorsion depuis la station du trou blanc.",
      details: [], log: ["BH_WARP_RECEIVER"], hints: [], pos: { x: 910, y: 690 } },

    { id: "wh-station", planet: "cravite", zone: "Station du trou blanc", title: "Station du trou blanc", status: "done", hours: "≈ 3 h",
      summary: "De l’autre côté du trou noir. Chaque tour de distorsion est liée à un astre : il faut être au centre de la plateforme quand l’astre est juste au-dessus.",
      details: [
        "Phénomène étrange : les objets envoyés arrivaient au récepteur de Cravité un cent millième de seconde AVANT leur départ.",
        "A servi de modèle aux tours de la Sablière noire."
      ],
      log: ["WHITE_HOLE_STATION"], hints: [], pos: { x: 1180, y: 700 } },

    /* ---------- LÉVIATHE ---------- */
    { id: "lev-allie", planet: "leviathe", zone: "Léviathe", title: "Île de Gabbro", status: "done", hours: "≈ 5 h",
      summary: "Gabbro, dans son hamac, est lui aussi conscient de la boucle temporelle. Il a vu ses souvenirs défiler devant une statue nomaï.",
      details: ["Il a appris au voyageur à méditer jusqu’à la boucle suivante.", "Vaisseau de Gabbro retrouvé et signalé."],
      log: ["GD_GABBRO_ISLAND"], hints: [], pos: { x: 1480, y: 110 } },

    { id: "lev-noyau", planet: "leviathe", zone: "Léviathe", title: "Abysses & cœur", status: "done", hours: "≈ 6 h",
      summary: "Un courant très fort empêche de descendre… mais le voyageur est passé dessous : l’océan y est calme, un champ électrique entoure le cœur.",
      details: [
        "Près du cœur, l’électricité du vaisseau saute.",
        "Feldspath avait trouvé un moyen d’atteindre le cœur.",
        "Journal : il reste encore des choses à découvrir ici."
      ],
      log: ["GD_OCEAN"], hints: [
        { lvl: 1, text: "Si tu ne vois aucun moyen de progresser, n’insiste pas pour le moment." },
        { lvl: 3, text: "Solution donnée : tornade à rotation inversée (antihoraire vue d’en haut) pour passer sous le courant ; puis en combinaison, entrer dans une méduse géante PAR DESSOUS et se laisser porter à travers le champ électrique jusqu’au cœur." }
      ],
      pos: { x: 1730, y: 100 } },

    { id: "lev-canon", planet: "leviathe", zone: "Léviathe", title: "Site de construction", status: "done", hours: "≈ 5 h",
      summary: "L’île où les Nomaï ont construit le lance-sondes orbital. Un ordinateur indique qu’une sonde a récemment été tirée.",
      details: [
        "Pourtant, l’utilisation du lance-sondes avait été suspendue : il ne devait pas faire feu.",
        "Pierre de projection : intérieur du satellite en orbite, avec un transporteur bleu inactif."
      ],
      log: ["GD_CONSTRUCTION_YARD"], hints: [], pos: { x: 1980, y: 120 } },

    { id: "lev-sonde", planet: "leviathe", zone: "Léviathe", title: "Lance-sondes orbital", status: "done", hours: "≈ 13 h",
      summary: "Visité ! Créé pour trouver l’emplacement exact de l’Œil. Poussé au-delà de sa puissance maximale, il a été endommagé au tir. Le module de pistage, qui reçoit les données de la sonde, a « disparu ».",
      details: ["Module de lancement : hublot fracturé, bassin de projection intact.", "Module de contrôle : le Projet Sablière noire a (récemment) demandé un tir, sur une trajectoire choisie au hasard.", "Le premier Nomaï à bord du module de pistage aurait connu les coordonnées de l’Œil de l’univers.", "Vu au bassin de projection : le module de pistage est sous l’eau, avec de l’électricité violette derrière le hublot."],
      img: { src: "assets/img/coordonnees-oeil.webp", caption: "Les coordonnées de l’Œil de l’univers (module de pistage)" },
      log: ["ORBITAL_PROBE_CANNON", "OPC_INTACT_MODULE", "OPC_BROKEN_MODULE", "OPC_SUNKEN_MODULE"], hints: [{ lvl: 1, text: "Si tu ne vois pas comment y accéder, il te manque sans doute des pièces du puzzle." }],
      pos: { x: 2230, y: 110 } },

    { id: "lev-feldspath", planet: "leviathe", zone: "Léviathe", title: "Île des ronces", status: "done", hours: "≈ 5 h",
      summary: "Une île sillonnée de plantes épineuses, avec une méduse congelée. Feldspath y a bivouaqué avant de partir pour Sombronces.",
      details: ["Une partie de l’île reste bloquée par la matière fantôme."],
      log: ["GD_BRAMBLE_ISLAND"], hints: [{ lvl: 1, text: "Si la matière fantôme bloque, ce n’est probablement pas qu’il faut « forcer »." }],
      pos: { x: 1490, y: 390 } },

    { id: "lev-statues", planet: "leviathe", zone: "Léviathe", title: "Île de la statue & atelier", status: "done", hours: "≈ 6 h",
      summary: "Les statues se lient à une personne, enregistrent ses souvenirs et les envoient au Projet Sablière noire. Atelier atteint par l’entrée sous-marine.",
      details: [
        "Les statues devaient s’activer seulement à la réussite du projet… ou s’il échouait.",
        "Chaque unité de stockage du projet a un masque qui renvoie les souvenirs à leur propriétaire."
      ],
      log: ["GD_STATUE_ISLAND", "GD_STATUE_WORKSHOP"],
      hints: [
        { lvl: 1, text: "Fais le tour complet de l’île, observe le niveau de l’eau et les parois rocheuses." },
        { lvl: 2, text: "Cherche à la base de l’île, là où la roche rencontre l’eau." }
      ], pos: { x: 1740, y: 380 } },

    { id: "lev-tour", planet: "leviathe", zone: "Léviathe", title: "Tour des épreuves quantiques", status: "done", hours: "≈ 7 h",
      summary: "Dans la tornade géante, entrée par le haut. « Observer l’image d’un objet quantique, c’est l’observer » : la règle de l’imagerie quantique.",
      details: [
        "Dernière inscription : « Souvenez-vous, les autres rocs quantiques renferment d’autres savoirs. »",
        "Entrée : monter hors de l’atmosphère, tornade sous le vaisseau, vitesse latérale nulle, se laisser tomber."
      ],
      log: ["GD_QUANTUM_TOWER"],
      hints: [
        { lvl: 2, text: "Tu n’es pas obligé de traverser la tornade en restant dans l’atmosphère." },
        { lvl: 3, text: "Monte très haut, tornade exactement sous toi, coupe la vitesse horizontale, laisse-toi tomber." }
      ], pos: { x: 1990, y: 400 } },

    /* ---------- SABLIÈRE ROUGE ---------- */
    { id: "sr-chail", planet: "sablieres", zone: "Sablière rouge", title: "Campement de Chail", status: "partial", hours: "≈ 7 h",
      summary: "Chail observe le ciel depuis le pôle Nord. Il a repéré un nombre anormalement élevé de supernovæ ces derniers temps.",
      details: ["Journal : il reste encore des choses à découvrir ici."],
      log: ["CT_CHERT"], hints: [], pos: { x: 60, y: 1050 } },

    { id: "sr-cite", planet: "sablieres", zone: "Sablière rouge", title: "Cité obscure & capsule 2", status: "partial", hours: "8 – 10 h",
      summary: "Les survivants de la capsule de sauvetage 2 ont trouvé refuge dans les grottes, où ils ont bâti une cité en quatre secteurs.",
      details: [
        "Le « refuge » et sa salle tout en bas ont été visités.",
        "Les Nomaï y ont débattu de la station solaire : beaucoup craignaient qu’un échec détruise le système solaire.",
        "Un chemin part d’ici vers le laboratoire des hautes énergies.",
        "Journal : il reste encore des choses à découvrir ici."
      ],
      log: ["CT_SUNLESS_CITY", "CT_ESCAPE_POD"], hints: [], pos: { x: 310, y: 1040 } },

    { id: "sr-coelacanthe", planet: "sablieres", zone: "Sablière rouge", title: "Fossile de cœlacanthe", status: "done", hours: "≈ 8 h",
      summary: "Les enfants nomaï jouaient au cœlacanthe, les yeux bandés, parce que les vrais cœlacanthes sont aveugles.",
      details: ["Les Nomaï ont appris comment échapper au cœlacanthe (du moins en théorie) grâce à ce fossile."],
      log: ["CT_ANGLERFISH_FOSSIL"], hints: [], pos: { x: 560, y: 1060 } },

    { id: "sr-grotte-q", planet: "sablieres", zone: "Sablière rouge", title: "Grottes quantiques", status: "partial", hours: "≈ 9 h",
      summary: "Un roc errant visible dans plusieurs grottes du pôle Nord. En contact avec lui, lampe éteinte : téléportation vers la salle aux cactus.",
      details: ["Journal : il reste encore des choses à découvrir ici. Explorer toutes les ramifications."],
      log: ["CT_QUANTUM_CAVES"],
      hints: [
        { lvl: 2, text: "La téléportation n’est pas l’objectif, c’est un moyen d’accéder à quelque chose." },
        { lvl: 3, text: "Le roc apparaît dans PLUSIEURS grottes du pôle Nord : il te manque une ou plusieurs salles." }
      ], pos: { x: 70, y: 1320 } },

    { id: "sr-lac", planet: "sablieres", zone: "Sablière rouge", title: "Grotte asséchée", status: "todo", hours: "≈ 9 h",
      summary: "Au fond du lit du lac asséché (pôle Nord). Coleus y a disparu mystérieusement, et le roc errant y a été aperçu pour la première fois.",
      details: ["Le journal la marque toujours « ? » : pas encore réellement explorée.", "C’est un labyrinthe : chercher un autre passage."],
      log: ["CT_LAKEBED_CAVERN"], hints: [{ lvl: 2, text: "C’est un labyrinthe : il existe un autre passage. Pas besoin de nouvelle capacité." }],
      pos: { x: 320, y: 1310 } },

    { id: "sr-hel", planet: "sablieres", zone: "Sablière rouge", title: "Laboratoire des hautes énergies", status: "partial", hours: "≈ 9 h",
      summary: "En ajoutant de l’énergie, les Nomaï allongeaient l’intervalle de temps négatif. Objectif : 22 minutes. Le Projet Sablière noire est né ici.",
      details: ["Plans des tours de la Sablière noire : chaque tour mène à un astre et son apparence évoque sa destination.", "Journal : il reste encore des choses à découvrir ici."],
      log: ["CT_HIGH_ENERGY_LAB", "CT_WARP_TOWER_MAP"], hints: [], pos: { x: 570, y: 1330 } },

    { id: "sr-localisateur", planet: "sablieres", zone: "Sablière rouge", title: "Traceur lunaire", status: "done", hours: "≈ 9 h",
      summary: "Un appareil nomaï qui localise la Lune quantique. Elle visite cinq lieux au total.",
      details: ["Hypothèse nomaï : la Lune quantique serait une forme de mécanique quantique macroscopique."],
      log: ["CT_QUANTUM_MOON_LOCATOR"], hints: [], pos: { x: 70, y: 1590 } },

    { id: "sr-canon", planet: "sablieres", zone: "Sablière rouge", title: "Canon gravitationnel (rouge)", status: "done", hours: "≈ 7 h",
      summary: "Le voyageur y a rappelé une navette nomaï… depuis l’Intrus.",
      details: ["La navette gelée a été lue (voir l’Intrus)."],
      log: ["CT_GRAVITY_CANNON"], hints: [], pos: { x: 320, y: 1590 } },

    /* ---------- SABLIÈRE NOIRE ---------- */
    { id: "sn-tours", planet: "sablieres", zone: "Sablière noire", title: "Tours de téléportation", status: "done", hours: "≈ 10 h",
      summary: "Un anneau de tours sur l’équateur, sur le modèle de la station du trou blanc. Chaque tour mène à un astre quand il est aligné.",
      details: ["Tour « deux Sablières » : une plateforme → laboratoire des hautes énergies, l’autre (tour au plafond cassé) → Projet Sablière noire."],
      log: ["TT_WARP_TOWERS"], hints: [{ lvl: 3, text: "Correspondance forme → destination donnée explicitement (page Savoir)." }],
      pos: { x: 600, y: 1640 } },

    { id: "sn-projet", planet: "sablieres", zone: "Sablière noire", title: "Projet Sablière noire", status: "done", hours: "≈ 11 h",
      summary: "Le projet devait utiliser l’énergie d’une supernova pour renvoyer les données de la sonde 22 minutes dans le passé. La station solaire n’a pas fonctionné.",
      details: [
        "Huit monolithes à masques ; trois reçoivent des données : module de pistage, Léviathe, Âtrebois.",
        "Le générateur de distorsion avancé au centre a été retiré… le projet s’est désactivé et le voyageur est mort.",
        "Accès : après ~7 min 50, sous le pont, attendre que la colonne de sable passe au-dessus de la tour cassée."
      ],
      log: ["TT_TIME_LOOP_DEVICE"],
      hints: [
        { lvl: 2, text: "Abrite-toi sous la structure qui relie les deux tours." },
        { lvl: 3, text: "Timing exact donné (voir détails)." }
      ], pos: { x: 860, y: 1630 } },

    /* ---------- SOMBRONCES ---------- */
    { id: "sb-capsule3", planet: "sombronces", zone: "Sombronces", title: "Capsule de sauvetage 3", status: "done", hours: "≈ 11 h",
      summary: "Ses survivants ont capté deux balises du Vaisseau, comme s’il était à deux endroits à la fois. Ils ont suivi la plus proche en laissant des lumières.",
      details: [
        "Le voyageur a suivi les lumières… et s’est fait dévorer par des cœlacanthes.",
        "Les notes de la capsule et de la tombe nomaï ne sont pas encore lues dans le journal du vaisseau."
      ],
      log: ["DB_ESCAPE_POD", "DB_NOMAI_GRAVE"],
      hints: [
        { lvl: 1, text: "Les lumières sont importantes. L’éclaireur va être très utile." },
        { lvl: 2, text: "Il y a une manière beaucoup plus sûre de traverser certaines zones." }
      ], pos: { x: 1080, y: 1060 } },

    { id: "sb-coelacanthes", planet: "sombronces", zone: "Sombronces", title: "Les cœlacanthes", status: "done", hours: "≈ 11 h",
      summary: "Ils sont aveugles (fossile de la Sablière rouge) et réagissent au bruit des propulseurs.",
      details: [
        "S’orienter AVANT d’entrer dans leur zone, petite poussée, puis moteurs coupés.",
        "Ne plus corriger la trajectoire près d’eux : laisser dériver.",
        "Un cœlacanthe pile devant : pas de grand virage, couper et laisser passer."
      ],
      log: [], hints: [{ lvl: 3, text: "Astuce concrète donnée (voir détails)." }], pos: { x: 1340, y: 1070 } },

    { id: "sb-vaisseau", planet: "sombronces", zone: "Sombronces", title: "Le Vaisseau", status: "done", hours: "≈ 12 h",
      summary: "Atteint ! L’épave du Vaisseau nomaï, au fond de Sombronces. Sur le pont : un pilier trilatéral (hexagones) qui sert de dispositif de saisie. Il a reçu le tout premier signal de l’Œil de l’univers.",
      img: { src: "assets/img/coordonnees-oeil.webp", caption: "Les coordonnées de l’Œil, saisies sur le pilier trilatéral" },
      details: ["Trouvé grâce au repère du guetteur envoyé dans la petite graine de la tombe nomaï.", "Le système de communication n’a pas résisté au crash, mais le Vaisseau reçoit encore les messages des autres clans, qui se rassemblent face à la mort imminente de l’univers.", "Les Nomaï sont passés en distorsion vers l’Œil sans prévenir les autres clans.", "Pilier trilatéral : coordonnées de l’Œil saisies, mais rien ne se passe sans générateur de distorsion.", "Générateur de distorsion avancé du Projet Sablière noire installé : le Vaisseau passe en distorsion vers l’Œil de l’univers."], log: ["DB_VESSEL"],
      hints: [
        { lvl: 1, text: "Les survivants ont suivi la plus proche des DEUX balises, faute d’oxygène. L’autre balise existe toujours." },
        { lvl: 2, text: "Le guetteur est déjà allé là où tu veux aller : lance-le dans la petite graine, puis regarde où apparaît son repère (et combien il y en a)." },
        { lvl: 2, text: "Correction : « évite la lumière rouge » était un conseil de prudence, pas une règle absolue. Ne l’exclus pas d’office." },
        { lvl: 1, text: "Pilier trilatéral : inutile de tester au hasard, c’est un dispositif de saisie qui attend une information précise que tu n’as pas encore. Le jour où tu l’auras, tu le reconnaîtras." }
      ], pos: { x: 1090, y: 1330 } },

    { id: "sb-feldspath", planet: "sombronces", zone: "Sombronces", title: "Feldspath & la méduse gelée", status: "done", hours: "≈ 12 h",
      summary: "Feldspath trouvé, avec son vaisseau écrasé dans une liane creuse ! Au bout, une méduse géante congelée : leur épiderme protège des décharges électriques.",
      details: ["Pour Feldspath, l’espace fonctionne différemment dans Sombronces (le guetteur peut être à deux endroits à la fois).", "Il apprécie le calme : pas pressé de rentrer.", "Selon lui, le bout de la liane renferme un secret pour atteindre le cœur de Léviathe.", "Zone de glace entièrement explorée d’après le journal."], log: ["DB_FELDSPAR", "DB_FROZEN_JELLYFISH"],
      hints: [
        { lvl: 1, text: "La graine d’Âtrebois est une poche à part : y envoyer le guetteur ne guidera pas dans Sombronces." },
        { lvl: 2, text: "Onduloscope sur la fréquence des voyageurs, dans Sombronces : un signal semble sortir de la graine qui mène vers lui. Suivre l’harmonica de graine en graine." }
      ], pos: { x: 1340, y: 1340 } },

    /* ---------- INTRUS ---------- */
    { id: "int-navette", planet: "intrus", zone: "L’Intrus", title: "Navette nomaï gelée", status: "partial", hours: "≈ 7 h",
      summary: "Rappelée jusqu’au canon de la Sablière rouge. Clary, restée en arrière, a perdu le contact avec ses compagnons descendus sous la surface.",
      details: ["Des relevés d’énergie étranges venaient de sous la surface.", "Journal : il reste encore des choses à découvrir ici."],
      log: ["COMET_SHUTTLE"], hints: [{ lvl: 1, text: "Il reste un peu à lire sur la navette gelée elle-même, à son emplacement d’origine sur l’Intrus (lors d’une boucle où tu ne la rappelles pas). Lore secondaire." }], pos: { x: 1640, y: 1060 } },

    { id: "int-comete", planet: "intrus", zone: "L’Intrus", title: "Noyau rompu", status: "done", hours: "≈ 10 h",
      summary: "Atteint ! Au cœur de la comète, les deux Nomaï disparus gisent près d’un rocher sphérique brisé. Il contenait une matière étrange, mortelle et sous très forte pression, capable d’engloutir tout le système solaire en un instant si la pierre cédait.",
      details: ["Accès : se poster dans la fissure côté soleil et attendre que la glace bleue fonde à l’approche du soleil.", "À l’intérieur : matière fantôme partout, repérée grâce à la caméra du guetteur ; une salle à quatre tunnels, puis une cavité avec un grand trou.", "L’un des Nomaï est resté étudier la xénomatière, l’autre est remonté avertir les autres."],
      log: ["COMET_INTERIOR"], hints: [
        { lvl: 1, text: "Cherche une fissure / ouverture dans la glace. L’éclaireur peut être particulièrement utile." },
        { lvl: 1, text: "Ce n’est pas une question d’endroit mais de moment : l’Intrus change en passant près du soleil." },
        { lvl: 2, text: "Se poster dans la grande fissure côté soleil, avant le passage au plus près du soleil, et attendre : la glace bleue fond." }
      ],
      pos: { x: 1650, y: 1340 } },

    /* ---------- LUNE QUANTIQUE ---------- */
    { id: "lq-approche", planet: "lune-quantique", zone: "Lune quantique", title: "Posé sur la Lune quantique !", status: "done", hours: "≈ 11 h",
      summary: "Premier Âtrien à s’y poser, grâce à la photo du guetteur affichée dans le cockpit. Un autel nomaï errant y rappelle trois règles : imagerie quantique, intrication quantique… et sixième emplacement.",
      details: ["Les visiteurs arrivent toujours au pôle Sud (raison inconnue des Nomaï).", "Sixième emplacement atteint (autel au pôle Nord) : la Lune orbite autour de l’Œil de l’univers, dont elle est la lune.", "Solanum, encore en vie, au pôle Sud : elle se demande ce qu’il adviendrait si un observateur conscient entrait dans l’Œil.", "Journal : entièrement exploré."],
      log: ["QUANTUM_MOON", "QM_SHRINE", "QM_SIXTH_LOCATION"],
      hints: [
        { lvl: 1, text: "Comment pourrais-tu continuer à observer la Lune pendant que tu t’en rapproches ?" },
        { lvl: 2, text: "Tu n’as pas besoin de l’observer directement : une image compte comme une observation." },
        { lvl: 2, text: "Qu’est-ce qui, dans ton vaisseau, pourrait continuer à « regarder » la Lune pendant que tu pilotes ?" },
        { lvl: 3, text: "Solution donnée : depuis le vaisseau, lancer le guetteur vers la Lune et la photographier en entier. La photo reste affichée sur l’écran du cockpit et compte comme une observation. La garder affichée pendant l’approche et l’atterrissage. La caméra d’atterrissage seule = détourner le regard, la Lune disparaît." },
        { lvl: 1, text: "Sixième emplacement : c’est l’autel qui doit se trouver au pôle Nord. Tu as déjà réussi à le faire bouger une fois." },
        { lvl: 2, text: "On ne peut pas forcer l’autel à apparaître au pôle Nord en l’y attendant. Voyager avec lui (comme en sortant de l’autel lampe éteinte) et regarder où on arrive (pôle Nord = rouge sur la mini-carte)." }
      ], pos: { x: 1960, y: 1060 } },

    { id: "lq-navette", planet: "lune-quantique", zone: "Lune quantique", title: "Navette de Solanum", status: "done", hours: "≈ 3 h",
      summary: "Rappelée au canon de Cravité. Solanum a atterri au pôle Sud de la Lune quantique et comptait finir son voyage à pied.",
      details: [], log: ["QM_SHUTTLE"], hints: [], pos: { x: 2220, y: 1070 } },

    /* ---------- STATION SOLAIRE ---------- */
    { id: "st-station", planet: "station-solaire", zone: "Station solaire", title: "Station solaire", status: "todo", hours: "≈ 9 h",
      summary: "Construite pour alimenter le Projet Sablière noire, elle divisait les Nomaï. D’après le projet : elle n’a pas fonctionné.",
      details: ["Pas encore visitée (« ? »). Une tour de la Sablière noire y mène."], log: ["S_SUNSTATION"], hints: [],
      pos: { x: 1130, y: 1640 } }
  ],

  notes: [
    { id: "n-q1", text: "Comment atteindre le lance-sondes en orbite ? (un flash au début de chaque boucle…)", pos: { x: 2470, y: 330 }, color: "yellow" },
    { id: "n-q2", text: "Le générateur de distorsion… à quoi sert-il vraiment ? → Il fait voyager le Vaisseau jusqu’à l’Œil.", pos: { x: 870, y: 1890 }, color: "pink" },
    { id: "n-q3", text: "Grotte asséchée : où est passé Coleus ?", pos: { x: 330, y: 1860 }, color: "yellow" },
    { id: "n-q4", text: "Deux balises : le Vaisseau à deux endroits à la fois ??", pos: { x: 1420, y: 1620 }, color: "blue" },
    { id: "n-q5", text: "Un sixième emplacement pour la Lune quantique ? → Oui : en orbite autour de l’Œil.", pos: { x: 2240, y: 1370 }, color: "blue" },
    { id: "n-q6", text: "« L’Œil de l’univers » : plus vieux que l’univers ?!", pos: { x: 1420, y: 700 }, color: "pink" },
    { id: "n-q7", text: "Le pilier trilatéral du Vaisseau attend une saisie… laquelle ? → Les coordonnées de l’Œil.", pos: { x: 1620, y: 1620 }, color: "yellow" },
    { id: "n-rule", text: "« Quand une piste demande une idée que tu n’as pas encore → va en explorer une autre. »", pos: { x: 2380, y: 700 }, color: "green" }
  ],

  links: [
    { from: "lune-esker",       to: "atb-graine",       label: "harmonica",                   kind: "clue" },
    { from: "atb-graine",       to: "sb-feldspath",     label: "harmonica de Feldspath",      kind: "clue" },
    { from: "lev-feldspath",    to: "sb-feldspath",     label: "parti pour Sombronces",       kind: "clue" },
    { from: "lune-ruine",       to: "cra-observatoire", label: "traceur plus grand",          kind: "clue" },
    { from: "lune-ruine",       to: "n-q6",             label: "",                            kind: "clue" },
    { from: "cra-ville",        to: "n-q6",             label: "",                            kind: "clue" },
    { from: "cra-ville",        to: "cra-forge",        label: "interrupteur",                kind: "clue" },
    { from: "cra-forge",        to: "sn-projet",        label: "générateurs de distorsion",   kind: "clue" },
    { from: "cra-canon",        to: "lq-navette",       label: "navette rappelée",            kind: "clue" },
    { from: "cra-observatoire", to: "lev-noyau",        label: "cyclones inversés",           kind: "rule" },
    { from: "cra-observatoire", to: "lev-sonde",        label: "chercher l’Œil avec une sonde", kind: "clue" },
    { from: "cra-roc",          to: "lq-approche",      label: "un morceau de la Lune ?",     kind: "hypo" },
    { from: "cra-tour",         to: "lq-approche",      label: "fresque : tour au-dessus d’un trou noir", kind: "rule" },
    { from: "wh-station",       to: "cra-glacier",      label: "distorsion → récepteur",      kind: "clue" },
    { from: "wh-station",       to: "sn-tours",         label: "modèle des tours",            kind: "clue" },
    { from: "wh-station",       to: "sr-hel",           label: "temps négatif",               kind: "clue" },
    { from: "sr-hel",           to: "sn-projet",        label: "objectif : 22 min",           kind: "clue" },
    { from: "atb-mine",         to: "sn-projet",        label: "enveloppe scellée",           kind: "clue" },
    { from: "lev-statues",      to: "sn-projet",        label: "souvenirs envoyés",           kind: "clue" },
    { from: "lev-canon",        to: "lev-sonde",        label: "construit ici",               kind: "clue" },
    { from: "lev-sonde",        to: "sn-projet",        label: "données de la sonde",         kind: "clue" },
    { from: "lev-sonde",        to: "n-q1",             label: "",                            kind: "clue" },
    { from: "st-station",       to: "sn-projet",        label: "énergie d’une supernova",     kind: "clue" },
    { from: "sr-cite",          to: "st-station",       label: "débat",                       kind: "clue" },
    { from: "sr-cite",          to: "sr-coelacanthe",   label: "accès",                       kind: "clue" },
    { from: "sr-cite",          to: "sr-hel",           label: "chemin",                      kind: "clue" },
    { from: "sr-chail",         to: "atb-cratere",      label: "signal quantique",            kind: "clue" },
    { from: "lev-tour",         to: "lq-approche",      label: "l’image = observer",          kind: "rule" },
    { from: "lev-tour",         to: "sr-grotte-q",      label: "autres rocs, autres savoirs", kind: "rule" },
    { from: "sr-grotte-q",      to: "atb-cratere",      label: "voyager avec l’objet",        kind: "rule" },
    { from: "sr-grotte-q",      to: "sr-lac",           label: "même roc errant",             kind: "clue" },
    { from: "sr-lac",           to: "n-q3",             label: "",                            kind: "clue" },
    { from: "sr-localisateur",  to: "lq-approche",      label: "5 lieux",                     kind: "clue" },
    { from: "lq-approche",      to: "n-q5",             label: "",                            kind: "clue" },
    { from: "sr-canon",         to: "int-navette",      label: "navette rappelée",            kind: "clue" },
    { from: "int-navette",      to: "int-comete",       label: "fissure côté soleil",         kind: "clue" },
    { from: "sn-tours",         to: "sn-projet",        label: "tour au plafond cassé",       kind: "clue" },
    { from: "sn-projet",        to: "n-q2",             label: "",                            kind: "clue" },
    { from: "sr-coelacanthe",   to: "sb-coelacanthes",  label: "ils sont aveugles !",         kind: "rule" },
    { from: "sb-capsule3",      to: "sb-coelacanthes",  label: "danger en route",             kind: "clue" },
    { from: "sb-capsule3",      to: "sb-vaisseau",      label: "suivre les lumières",         kind: "clue" },
    { from: "sb-capsule3",      to: "n-q4",             label: "",                            kind: "clue" },
    { from: "sb-feldspath",     to: "lev-noyau",        label: "les méduses isolent ?",       kind: "hypo" },
    { from: "sb-vaisseau",      to: "n-q7",             label: "",                            kind: "clue" },
    { from: "lev-sonde",        to: "sb-vaisseau",      label: "coordonnées de l’Œil → pilier ?", kind: "hypo" },
    { from: "sb-vaisseau",      to: "n-q6",             label: "premier signal de l’Œil",     kind: "clue" }
  ],

  /* Chronologie reconstruite avec l'ordre de découverte de la sauvegarde (#) + les heures citées par le joueur */
  timeline: [
    { id: "t1", hours: "0 – 1 h", order: "#0 – #15", range: [0, 15], title: "Premier décollage", planets: ["atrebois"],
      items: [
        "Réveil au village. La statue nomaï de l’observatoire ouvre les yeux : les souvenirs défilent.",
        "Grotte antigrav, « satellite » réparé pour Gossan, codes de lancement récupérés.",
        "Le pilotage paraît impossible : découverte du verrouillage de cible et de « Égaliser la vitesse ».",
        "Rocaille : Esker et son poste d’observation, rumeur de l’harmonica de Feldspath.",
        "Traceur oculaire : les Nomaï cherchaient « l’Œil de l’univers » → piste du pôle Sud de Cravité."
      ] },
    { id: "t2", hours: "1 – 5 h", order: "#16 – #53", range: [16, 53], title: "Au fond de Cravité", planets: ["cravite", "lune-quantique"],
      items: [
        "Rencontre avec Riébeck à la croisée des chemins.",
        "Cité suspendue : les Nomaï sont venus pour l’Œil de l’univers ; interrupteur de la forge trouvé.",
        "Roc quantique de Cravité : un morceau de la Lune quantique ?",
        "Passage par le trou noir → station du trou blanc : les tours de distorsion et l’étrange « temps négatif ».",
        "Glacier nord : le récepteur de distorsion.",
        "Canon gravitationnel : la navette de Solanum rappelée depuis la Lune quantique.",
        "Observatoire sud par l’intérieur ; simulation des tornades inversées.",
        "Hésitation : Lune quantique ou Léviathe ? → choix de Léviathe."
      ] },
    { id: "t3", hours: "5 – 7 h", order: "#54 – #83", range: [54, 83], title: "Tempêtes sur Léviathe", planets: ["leviathe"],
      items: [
        "Gabbro, dans son hamac, est lui aussi conscient de la boucle. Il apprend au voyageur à méditer.",
        "Site de construction du lance-sondes orbital ; pierre de projection : l’intérieur du satellite.",
        "Île des ronces : bivouac de Feldspath, méduse congelée, matière fantôme.",
        "Passage sous le courant : océan calme, champ électrique autour du cœur.",
        "Île de la statue → atelier des statues par l’entrée sous-marine.",
        "Tornade géante, entrée par le haut → Tour des épreuves quantiques résolue."
      ] },
    { id: "t4", hours: "7 – 10 h", order: "#83 – #126", range: [83, 126], title: "Sous le sable rouge", planets: ["sablieres", "intrus"],
      items: [
        "Canon gravitationnel de la Sablière rouge : la navette gelée rappelée depuis l’Intrus, l’histoire de Clary.",
        "Grottes quantiques : téléportation avec le roc errant (salle aux cactus).",
        "Campement de Chail : beaucoup trop de supernovæ…",
        "Capsule de sauvetage 2 → Cité obscure et son refuge.",
        "Fossile de cœlacanthe : le jeu des enfants nomaï, les cœlacanthes sont aveugles.",
        "Traceur lunaire : la Lune quantique visite cinq lieux… et peut-être un sixième.",
        "Laboratoire des hautes énergies : le temps négatif, objectif 22 minutes, plans des tours."
      ] },
    { id: "t5", hours: "≈ 10 h", order: "#127 – #134", range: [127, 134], title: "Retour au pays", planets: ["atrebois"],
      items: [
        "Mines nomaï : le minerai de l’enveloppe de la Sablière noire.",
        "Bois quantique au pôle Sud : poème sur un arbre, impossible de faire le noir complet.",
        "Graine de Sombronces : le guetteur découvre qu’elle est plus grande à l’intérieur, et on y entend un harmonica."
      ] },
    { id: "t6", hours: "10 – 11 h", order: "#134 – #137", range: [134, 137], title: "Le Projet Sablière noire", planets: ["sablieres"],
      items: [
        "Correspondance formes de tours → destinations.",
        "Sous le pont, la colonne de sable passe, téléportation → Projet Sablière noire !",
        "Le projet : renvoyer les données de la sonde 22 minutes dans le passé grâce à une supernova.",
        "Générateur de distorsion retiré → mort. Le lore reste dans le journal."
      ] },
    { id: "t7", hours: "11 – 12 h", order: "#138 – #157", range: [138, 157], title: "Dans les ronces", planets: ["sombronces", "lune-quantique"],
      items: [
        "Lune quantique : impossible de piloter tout en l’observant, indice en cours.",
        "Première vraie exploration de Sombronces.",
        "Capsule de sauvetage 3 : deux balises du Vaisseau, des lumières laissées par les survivants.",
        "Dévoré par des cœlacanthes. Astuce reçue : moteurs coupés, dériver.",
        "Lumière rouge évitée, lumières blanches suivies jusqu’à la tombe nomaï.",
        "Petite graine trop étroite : le guetteur y photographie le Vaisseau.",
        "En suivant le repère du guetteur : le Vaisseau atteint ! Lecture du pont et du premier signal de l’Œil.",
        "Pilier trilatéral activé : un dispositif de saisie… à quoi ?",
        "À l’onduloscope, l’harmonica mène à Feldspath et à son vaisseau, dans une liane creuse.",
        "Au bout de la liane : une méduse géante gelée. Leur peau protège des décharges électriques…"
      ] }
    ,{ id: "t8", hours: "12 – 13 h", order: "#158 – #177", range: [158, 177], title: "Le lance-sondes orbital", planets: ["leviathe"],
      items: [
        "Ascension jusqu’au lance-sondes orbital, en orbite autour de Léviathe.",
        "Module de lancement fracturé, module de contrôle intact : il a été créé pour trouver l’Œil de l’univers.",
        "Le Projet Sablière noire a demandé un tir sur une trajectoire aléatoire.",
        "Le module de pistage a disparu : le bassin de projection le montre sous l’eau, avec de l’électricité violette.",
        "Tornade inversée, méduse, champ électrique traversé : le module de pistage retrouvé au cœur de Léviathe.",
        "La sonde 9 318 054 a détecté l’Œil de l’univers : coordonnées nomaï de l’Œil trouvées ! Léviathe est entièrement explorée."
      ] }
    ,{ id: "t9", hours: "≈ 14 h", order: "#177 – #179", range: [177, 179], title: "Au cœur de l’Intrus", planets: ["intrus"],
      items: [
        "Coordonnées de l’Œil capturées en photo.",
        "Posté dans la fissure côté soleil : la glace bleue fond, chute à l’intérieur de la comète.",
        "Matière fantôme partout : la caméra du guetteur montre les passages libres.",
        "Salle aux quatre tunnels, cavité au grand trou, puis le cœur : les deux Nomaï disparus près d’un rocher sphérique brisé.",
        "La matière qu’il renfermait était mortelle et sous pression, capable d’engloutir le système solaire en un instant."
      ] }
    ,{ id: "t10", hours: "≈ 14 – 15 h", order: "#180 – #183", range: [180, 183], title: "Premier pas sur la Lune quantique", planets: ["lune-quantique"],
      items: [
        "Guetteur lancé depuis le vaisseau, photo de la Lune affichée dans le cockpit : elle ne bouge plus.",
        "Atterrissage réussi : premier Âtrien sur la Lune quantique !",
        "Autel nomaï errant : fresques des règles de l’imagerie, de l’intrication et du sixième emplacement.",
        "Coincé dans l’autel par un gros rocher."
      ] }
    ,{ id: "t11", hours: "15 – 18 h (Steam)", order: "#184 – #198", range: [184, 198], title: "Retour dans les profondeurs de Cravité", planets: ["cravite", "sombronces"],
      items: [
        "Sorti de l’autel quantique en éteignant la lampe.",
        "Tour du savoir quantique : l’escalier est cassé, le sommet reste hors d’atteinte… pour l’instant.",
        "Capsule de sauvetage 1 et ancienne colonie : les survivants ont fui vers le glacier nord par les cristaux gravitationnels.",
        "Trois fresques : le Vaisseau capte le signal de l’Œil, se retrouve piégé dans Sombronces, lâche trois capsules.",
        "Le récit des trois capsules est complet : Cravité, Sablières, Sombronces."
      ] }
    ,{ id: "t12", hours: "≈ 18 h (Steam)", order: "#199 – #209", range: [199, 209], title: "Le sixième emplacement", planets: ["cravite", "lune-quantique"],
      items: [
        "Sommet de la Tour du savoir quantique atteint : l’autel doit se trouver au pôle Nord de la Lune.",
        "Voyage avec l’autel jusqu’au pôle Nord : la Lune quantique rejoint son sixième emplacement, en orbite autour de l’Œil.",
        "Rencontre avec Solanum, une Nomaï encore en vie ! Conversation complète grâce aux pierres.",
        "La Lune quantique est la lune de l’Œil, et l’Œil serait la source de tous les phénomènes quantiques du système.",
        "Coordonnées de l’Œil saisies sur le pilier du Vaisseau : rien ne se passe. Déduction : il manque un générateur de distorsion (celui du Projet Sablière noire)."
      ] }
    ,{ id: "t13", hours: "≈ 19 h (Steam)", order: "Fin", range: [210, 260], title: "L’Œil de l’univers", planets: ["sablieres", "sombronces"], current: true,
      items: [
        "Générateur de distorsion avancé récupéré au cœur du Projet Sablière noire.",
        "Retour au Vaisseau, au fond de Sombronces : générateur installé, coordonnées saisies… distorsion !",
        "Arrivée sur l’Œil de l’univers. L’onduloscope pointe vers le ciel, au-dessus d’un grand cratère.",
        "Saut dans le cratère… et jusqu’au bout du voyage.",
        "Jeu terminé ! 🎉"
      ] }
  ]
};
