import {
  evoImg,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type DnaStageCategory =
  | 'packaging'
  | 'structure'
  | 'fork_enzymes'
  | 'mutation_evolution';

export interface DnaStepNodeData extends TreeNodeData {
  anchorX: number;
  anchorY: number;
  cardSide: 'above' | 'below';
  stageCategory: DnaStageCategory;
  formulaTag: string;
}

export const DNA_MAIN_STEP_IDS: string[] = [
  'dna_chromosomes',
  'dna_histones',
  'dna_nucleotide',
  'dna_basepairing',
  'dna_double_helix',
  'dna_semiconservative',
  'dna_helicase_fork',
  'dna_polymerase_strands',
  'dna_proofreading_mutation',
  'dna_division_evolution',
];

export const DNA_NODES: DnaStepNodeData[] = [
  // ==========================================
  // STEG 1: CELLEKJERNEN OG KROMOSOMENE
  // ==========================================
  {
    id: 'dna_chromosomes',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Cellekjernen og kromosomene – Slik er arvestoffet organisert',
    shortLabel: 'Kjerne & kromosomer',
    latinName: 'Nucleus & Chromosoma • 46 kromosomer fordelt på 23 homologe par',
    timeMa: 'Nivå 1 • Pakking i kjernen',
    eraLabel: 'Makronivå i cellekjernen',
    x: 220,
    y: 210,
    anchorX: 250,
    anchorY: 485,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    stageCategory: 'packaging',
    formulaTag: '46 kromosomer (23 par) i kjernen',
    traceBadge: 'Cellekjernen • 23 par',
    image: evoImg('dna_step1_chromosomes.png'),
    imageCaption:
      'Inne i cellekjernen er menneskets arvestoff fordelt på 46 kromosomer (23 homologe par) – og langs hvert kromosom ligger hundrevis av gener som perler på en lang DNA-tråd.',
    summaryTitle: 'Hele oppskriftsverket ditt er delt inn i 46 «bind» inne i cellekjernen',
    whatHappens:
      'Nesten hver eneste kroppscelle i menneskekroppen har en cellekjerne med 46 kromosomer – ordnet i 23 homologe kromosompar, der du har arvet ett sett (23 kromosomer) fra mor gjennom eggcellen og ett tilsvarende sett (23 kromosomer) fra far gjennom sædcellen. Hvert kromosom består av én sammenhengende, kjempelang DNA-tråd pakket rundt proteiner. Et avgrenset avsnitt langs denne DNA-tråden som koder for ett bestemt protein (eller et funksjonelt RNA-molekyl), kaller vi et gen. Til vanlig i cellens hverdag (interfasen) ligger kromosomene utrullet som et løst flokenett kalt kromatin slik at enzymer kan lese genene – mens de tette, klassiske X-formede kromosomene kun vises i mikroskopet rett før cellen skal dele seg!',
    keyTraits: [
      {
        title: 'Homologe kromosompar (2n = 46 hos mennesket)',
        description:
          'To homologe kromosomer har samme lengde og inneholder gener for nøyaktig de samme egenskapene på samme plass, men kan ha litt ulike genvarianter (alleler) fra mor og far – pluss kjønnskromosomene XX eller XY.',
        icon: 'users',
      },
      {
        title: 'Hva er egentlig et gen langs DNA-tråden?',
        description:
          'Menneskets DNA rommer rundt 20 000 proteinkodende gener, men disse utgjør bare ca. 1,5 % av hele DNA-et – resten er blant annet brytere og reguleringsområder som styrer når genene skal skrus av og på.',
        icon: 'dna',
      },
      {
        title: 'Løst kromatin i hverdagen vs. tette kromosomer ved deling',
        description:
          'Tenk på flytting: Når du bor i leiligheten (interfasen), står bøkene åpne i hylla (kromatin) så du kan lese dem; når du skal flytte (celledeling), pakkes alt i tette flytteesker (kondenserte kromosomer) så ingenting rives i stykker!',
        icon: 'layers',
      },
    ],
    classroomTest:
      'Klassen sjekker en vanlig misforståelse: Har en muskelcelle i låret, en hudcelle på nesen og en hjernecelle de samme 46 kromosomene og genene? Ja, 100 % samme «oppskriftsbibliotek» – forskjellen er bare hvilke gener som er åpne og aktive!',
    didYouKnow:
      'Antall kromosomer sier ingenting om hvor avansert en art er: Mennesket har 46 kromosomer, sjimpansen og potetplanten har 48, hunden har 78, mens bananflua nøyer seg med bare 8!',
    examples: [
      '46 kromosomer (23 par)',
      'Homologe kromosomer',
      'Gen (avgrenset DNA-avsnitt)',
      'Kromatin vs. kondenserte kromosomer',
      'Kjønnskromosomer (XX / XY)',
    ],
  },

  // ==========================================
  // STEG 2: PAKKING RUNDT HISTONER & EPIGENETIKK
  // ==========================================
  {
    id: 'dna_histones',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'dna_chromosomes',
    stepNumber: 2,
    title: 'Pakking rundt histoner – 2 meter DNA i en mikroskopisk kjerne',
    shortLabel: 'Histoner & kromatin',
    latinName: 'Nucleosoma & Epigenetikk • Positivt ladde histon-spoler temmer DNA-tråden',
    timeMa: 'Nivå 1 • Pakking i kjernen',
    eraLabel: 'Fra kromosom ned til kromatinfiber',
    x: 470,
    y: 830,
    anchorX: 455,
    anchorY: 545,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    stageCategory: 'packaging',
    formulaTag: 'DNA + Histoner = Nukleosomer & Kromatin',
    traceBadge: 'Histoner • Epigenetikk',
    image: evoImg('dna_step2_histones.png'),
    imageCaption:
      'Den negativt ladde DNA-tråden snurres nesten to runder rundt kuler av positivt ladde histon-proteiner og danner nukleosomer – som perler på en snor.',
    summaryTitle: 'Genial spolepakking hindrer floker – og fungerer som av/på-bryter for genene',
    whatHappens:
      'Hvordan får rundt 2 meter supertynn DNA-tråd plass inne i en cellekjerne som bare er 0,006 millimeter i diameter uten å slå seg i en eneste uløselig floke? Løsningen er kjemisk tiltrekning! Fordi fosfatgruppene i DNA-tråden er negativt ladd, tiltrekkes tråden som en magnet mot små, positivt ladde spoleproteiner kalt histoner. DNA-tråden kveiles nesten to ganger rundt grupper på åtte histoner og danner perlelignende enheter kalt nukleosomer. Nukleosomene tvinnes videre til tette kromatinfibre. Enda mer fascinerende: Cellen bruker denne pakkingen aktivt til å styre hvilke gener som kan leses – det som kalles epigenetikk!',
    keyTraits: [
      {
        title: 'Nukleosomer – «perler på en snor» med motsatt ladning',
        description:
          'Negativt ladd DNA binder seg tett rundt positivt ladde histoner og komprimerer trådens lengde titusenvis av ganger når cellen gjør seg klar til deling.',
        icon: 'layers',
      },
      {
        title: 'Åpen vs. stram pakking styrer genaktivitet',
        description:
          'Ligger histonene løst fra hverandre (åpent eukromatin), kommer RNA-polymerase til og kan lese genet. Pakkes histonene knallhardt sammen (tett heterokromatin), er genet fysisk låst og avslått!',
        icon: 'cpu',
      },
      {
        title: 'Epigenetikk: Miljømerkelapper uten å endre DNA-koden',
        description:
          'Små kjemiske merkelapper (som acetyl- eller metylgrupper) på histonene og DNA-et fungerer som «dimmebrytere» påvirket av celletype, alder og miljø – helt uten at selve bokstavrekkefølgen A, T, C, G endres!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Høretelefon-testen i klasserommet: Legg to meter tynn ledning løst i lomma og rist – det blir øyeblikkelig knute! Snurr den i stedet pent rundt små trådsneller (histoner), og du kan spole ut akkurat den lille biten du trenger.',
    didYouKnow:
      'Hvis du skjøtet sammen alt DNA-et fra alle de rundt 30 billioner cellene i kroppen din til én lang tråd, ville den rukket fra jorda til sola og tilbake over 200 ganger!',
    examples: [
      'Histoner (spoleproteiner)',
      'Nukleosom («perler på en snor»)',
      'Kromatinfiber',
      'Åpen vs. stram pakking',
      'Epigenetikk (av/på-merkelapper)',
    ],
  },

  // ==========================================
  // STEG 3: NUKLEOTIDET – DE TRE BYGGESTEINENE
  // ==========================================
  {
    id: 'dna_nucleotide',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'dna_histones',
    stepNumber: 3,
    title: 'Nukleotidet – DNA-molekylets tre byggesteiner',
    shortLabel: 'Nukleotidet',
    latinName: 'Fosfatgruppe + Deoksyribose + Nitrogenbase (A, T, C, G)',
    timeMa: 'Nivå 2 • Kjemisk struktur',
    eraLabel: 'Monomeren som bygger DNA',
    x: 730,
    y: 210,
    anchorX: 730,
    anchorY: 465,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    stageCategory: 'structure',
    formulaTag: 'Nukleotid = Fosfat + Deoksyribose + Base',
    traceBadge: 'Monomer • Deoksyribose',
    image: evoImg('dna_step3_nucleotide.png'),
    imageCaption:
      'Hvert enkelt DNA-nukleotid er satt sammen av tre deler: en rund fosfatgruppe, femkarbonsukkeret deoksyribose i midten og én av de fire nitrogenbasene A, T, C eller G.',
    summaryTitle: 'Hele livets kode er bygd opp av én type kloss i bare fire varianter',
    whatHappens:
      'Zoomer vi helt ned på kjemisk nivå, er DNA en lang polymer (kjede) satt sammen av millioner av enkeltklosser kalt nukleotider. Hvert eneste nukleotid i DNA består av nøyaktig tre faste deler: (1) en negativt ladd fosfatgruppe, (2) et ringformet femkarbonsukker kalt deoksyribose, og (3) én av fire mulige nitrogenbaser – adenin (A), tymin (T), cytosin (C) eller guanin (G). Navnet DEOKSY-ribose («fratatt oksygen») kommer av at sukkeret i DNA mangler ett oksygenatom på karbon nr. 2 sammenlignet med sukkeret ribose i RNA – en liten kjemisk detalj som gjør DNA-molekylet ekstremt mye mer stabilt og motstandsdyktig mot nedbrytning gjennom et helt liv!',
    keyTraits: [
      {
        title: 'Hvorfor heter det DEOKSY-ribose (DNA vs. RNA)?',
        description:
          'På karbonatom nr. 2\' i sukkerringen har RNA en reaktiv -OH-gruppe (ribose), mens DNA bare har et enkelt -H-atom (deoksyribose = ett oksygen mindre). Det gjør DNA til et slitesterkt evighetsarkiv!',
        icon: 'shield',
      },
      {
        title: 'Puriner (dobbelring) vs. pyrimidiner (enkelring)',
        description:
          'Adenin (A) og guanin (G) er store puriner med to sammensmeltede ringer, mens cytosin (C) og tymin (T) er smalere pyrimidiner med én enkel ring.',
        icon: 'dna',
      },
      {
        title: 'Fosfat og sukker er helt like – basen bærer bokstaven!',
        description:
          'Fosfatgruppen og deoksyribosen er 100 % identiske i alle DNA-nukleotider; det er kun rekkefølgen av de fire nitrogenbasene A, T, C og G som utgjør selve den genetiske koden.',
        icon: 'compass',
      },
    ],
    classroomTest:
      'Husketriks på tavla for puriner og pyrimidiner: «PURe As Gold» = Purinene er Adenin og Guanin (store molekyler med 2 ringer), mens Cytosin og Tymin (med Y i både pYrimidin, cYtosin og tYmin!) har 1 ring!',
    didYouKnow:
      'Nukleotider brukes ikke bare i DNA og RNA: Legger du på to ekstra fosfatgrupper på et adenin-nukleotid med ribose, får du ATP – selve det universelle energibatteriet i alle levende celler!',
    examples: [
      'Nukleotid (byggestein)',
      'Deoksyribose (mangler ett O-atom)',
      'Fosfatgruppe',
      'Puriner: Adenin (A) & Guanin (G)',
      'Pyrimidiner: Tymin (T) & Cytosin (C)',
    ],
  },

  // ==========================================
  // STEG 4: BASEPARINGSREGELEN & HYDROGENBINDINGER
  // ==========================================
  {
    id: 'dna_basepairing',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'dna_nucleotide',
    stepNumber: 4,
    title: 'Baseparingsregelen & hydrogenbindinger – Kjemisk presisjon',
    shortLabel: 'Baseparing (A–T, C–G)',
    latinName: 'Chargaffs regel • Komplementære basepar som en biologisk glidelås',
    timeMa: 'Nivå 2 • Kjemisk struktur',
    eraLabel: 'Trinnene midt i DNA-stigen',
    x: 990,
    y: 830,
    anchorX: 990,
    anchorY: 520,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    stageCategory: 'structure',
    formulaTag: 'A = T (2 H-bindinger) • C ≡ G (3 H-bindinger)',
    traceBadge: 'Glidelåsprinsippet • H-bindinger',
    image: evoImg('dna_step4_basepairing.png'),
    imageCaption:
      'Adenin (A) parer alltid med tymin (T) via 2 hydrogenbindinger, mens cytosin (C) alltid parer med guanin (G) via 3 hydrogenbindinger – én dobbelring møter alltid én enkelring!',
    summaryTitle: 'Svake hydrogenbindinger i tusentall gjør DNA både bunnsolid og lett å åpne',
    whatHappens:
      'Rundt 1950 oppdaget biokjemikeren Erwin Chargaff et forbløffende mønster i alle arter han undersøkte: Mengden adenin (A) i DNA var alltid nøyaktig lik mengden tymin (T), og mengden cytosin (C) var alltid lik mengden guanin (G)! Årsaken er den strenge komplementære baseparingsregelen mellom de to trådene: En stor purin (2 ringer) må alltid pare med en liten pyrimidin (1 ring) for at DNA-stigen skal få jevn bredde hele veien. Dessuten passer de delvise ladningene som nøkkel i lås: A og T danner 2 hydrogenbindinger, mens C og G danner 3 litt sterkere hydrogenbindinger. Dette kjemiske valget av svake hydrogenbindinger i midten er genialt!',
    keyTraits: [
      {
        title: 'Chargaffs regnestykke (A = T og C = G)',
        description:
          'Vet du at et dobbelttrådet DNA-molekyl inneholder 20 % adenin (A), må det også ha 20 % tymin (T). De resterende 60 % fordeles likt mellom C (30 %) og G (30 %)!',
        icon: 'cpu',
      },
      {
        title: '2 hydrogenbindinger (A = T) vs. 3 hydrogenbindinger (C ≡ G)',
        description:
          'Fordi C–G-par holdes sammen av tre hydrogenbindinger mot bare to mellom A–T, er DNA-områder med mange A–T-par lettere å åpne – derfor starter replikasjon og gener ofte i A–T-rike felter!',
        icon: 'zap',
      },
      {
        title: 'Borrelås- og glidelåseffekten i midten av DNA',
        description:
          'Hver enkelt hydrogenbinding er svak, men millioner av dem sammen gjør dobbelheliksen svært stabil – samtidig som helikase kan åpne én og én binding som en glidelås uten å ødelegge koden!',
        icon: 'layers',
      },
    ],
    classroomTest:
      'Kjapp hoderegning til prøven: Et virus eller en bakterie med dobbelttrådet DNA har 14 % cytosin (C). Hvor mange prosent adenin (A) har det? Svar: C = 14 % gir G = 14 % (til sammen 28 %). Resten er 72 % fordelt likt på A og T → 36 % adenin!',
    didYouKnow:
      'Bakterier og arker som lever i kokende varme kilder på 90–100 °C har ekstra høy andel C–G-basepar i sitt DNA, nettopp fordi de tre hydrogenbindingene tåler mer varme før trådene smelter fra hverandre!',
    examples: [
      'Komplementær baseparing',
      'Chargaffs regel (A = T, C = G)',
      'A = T (2 hydrogenbindinger)',
      'C ≡ G (3 hydrogenbindinger)',
      'Purin + pyrimidin gir fast bredde',
    ],
  },

  // ==========================================
  // STEG 5: DOBBELHELIKSEN OG ANTIPARALLELLE TRÅDER
  // ==========================================
  {
    id: 'dna_double_helix',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'dna_basepairing',
    stepNumber: 5,
    title: 'Dobbelheliksen og antiparallelle tråder (5\' → 3\' og 3\' → 5\')',
    shortLabel: 'Dobbelheliksen',
    latinName: 'Antiparallell vindeltrapp • Kovalent sukker-fosfat-ryggrad & Foto 51',
    timeMa: 'Nivå 2 • Kjemisk struktur',
    eraLabel: 'Full 3D-arkitektur fra 1953',
    x: 1240,
    y: 210,
    anchorX: 1210,
    anchorY: 475,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    stageCategory: 'structure',
    formulaTag: "Antiparallell: 5' → 3' mot 3' → 5'",
    traceBadge: 'Foto 51 • Antiparallell',
    image: evoImg('dna_step5_double_helix.png'),
    imageCaption:
      'To sukker-fosfat-ryggrader snor seg rundt hverandre i en høyredreid dobbelheliks der den ene tråden peker 5\' → 3\' og den andre løper motsatt vei (3\' → 5\').',
    summaryTitle: 'Sterke kovalente vanger ytterst, svake trinn innerst – og to enveiskjørte filer!',
    whatHappens:
      'I 1953 satte James Watson og Francis Crick sammen den berømte rommodellen av DNA som en høyredreid vindeltrapp – dobbelheliksen – basert på Chargaffs baseparingsregler og det sylskarpe røntgenbildet «Foto 51» tatt av Rosalind Franklin og Raymond Gosling. Langs hver enkelt tråd er sukker og fosfat bundet sammen med ursterke kovalente bindinger (fosfodiesterbindinger) til et ytre reisverk som aldri må ryke, mens nitrogenbasene peker innover som trappetrinn. For at basene skal møtes riktig i midten, må de to trådene ligge opp-ned i forhold til hverandre – de er antiparallelle: den ene går i retning 5\' → 3\', og den andre går 3\' → 5\'!',
    keyTraits: [
      {
        title: 'Hva betyr 5\'-ende og 3\'-ende i praksis?',
        description:
          'Karbonatomene i deoksyribose nummereres fra 1\' til 5\': I 5\'-enden av tråden stikker det ut en fri fosfatgruppe på karbon nr. 5\', mens det i 3\'-enden stikker ut en fri -OH-gruppe på karbon nr. 3\' der nye nukleotider kan hektes på!',
        icon: 'compass',
      },
      {
        title: 'Kovalente bindinger ytterst vs. hydrogenbindinger innerst',
        description:
          'Sukker-fosfat-vangene holdes sammen av sterke kovalente bindinger som bevarer bokstavrekkefølgen, mens baseparene i midten har svake hydrogenbindinger som kan åpnes ved kopiering.',
        icon: 'shield',
      },
      {
        title: 'Rosalind Franklin og røntgenkrystallografi (Foto 51)',
        description:
          'Franklins berømte kryssmønster i Foto 51 avslørte at DNA måtte være en jevn spiral med fosfatgruppene vendt utover mot vannet og ti basepar per omdreining!',
        icon: 'eye',
      },
    ],
    classroomTest:
      'Motorvei-bildet i klasserommet: Strekk fram begge armene ved siden av hverandre, men la høyre hånd peke framover (5\' → 3\') og venstre albue peke framover så fingrene peker bakover (3\' → 5\'). Slik ligger de to antiparallelle DNA-trådene!',
    didYouKnow:
      'Så snart Watson og Crick så at de to trådene var komplementære i 1953, skrev de en av vitenskapshistoriens mest berømte setninger nederst i artikkelen sin: «Det har ikke unngått vår oppmerksomhet at den spesifikke paringen straks antyder en mulig kopieringsmekanisme for arvestoffet.»',
    examples: [
      'Dobbelheliks (vindeltrapp)',
      'Sukker-fosfat-reisverk (kovalent)',
      'Antiparallelle tråder (5\' → 3\' / 3\' → 5\')',
      '5\'-fosfatende og 3\'-OH-ende',
      'Rosalind Franklin (Foto 51), Watson & Crick',
    ],
  },

  // ==========================================
  // STEG 6: DET SEMIKONSERVATIVE PRINSIPPET
  // ==========================================
  {
    id: 'dna_semiconservative',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'dna_double_helix',
    stepNumber: 6,
    title: 'Hvorfor DNA må kopieres – Det semikonservative prinsippet',
    shortLabel: 'Semikonservativ kopi',
    latinName: 'S-fasen i cellesyklus • Én gammel maltråd + én nylaget tråd i hver kopi',
    timeMa: 'Nivå 3 • Replikasjonskløften',
    eraLabel: 'Før mitose og meiose starter',
    x: 1510,
    y: 830,
    anchorX: 1435,
    anchorY: 545,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    stageCategory: 'fork_enzymes',
    formulaTag: 'Semikonservativ = 1 gammel + 1 ny tråd',
    traceBadge: 'S-fasen • Halvt bevart',
    image: evoImg('dna_step6_semiconservative.png'),
    imageCaption:
      'Det opprinnelige DNA-molekylet deler seg på langs, og hver av de to gamle trådene fungerer som mal for en ny komplementær tråd – slik at begge dattermolekylene består av halvparten gammelt og halvparten nytt DNA.',
    summaryTitle: 'Hver gammel enkelttråd rommer hele fasiten til å gjenoppbygge sin tapte partner',
    whatHappens:
      'Hver gang en befruktet eggcelle vokser til et menneske, eller kroppen fornyer millioner av hud- og tarmceller i sekundet, må cellene dele seg. Før en celle kan gå inn i vanlig celledeling (mitose) eller reduksjonsdeling (meiose), må hele arvestoffet kopieres nøyaktig i syntesefasen (S-fasen) – denne prosessen heter DNA-replikasjon. Fordi A alltid hører sammen med T og C alltid med G, kan de to trådene skilles ad og begge fungere som mal (støpeform) samtidig! Resultatet er to identiske dobbelhelikser der hver består av én opprinnelig «foreldretråd» og én nylaget tråd. Derfor kalles DNA-kopieringen semikonservativ («halvt bevarende»).',
    keyTraits: [
      {
        title: 'Skjer i S-fasen (syntesefasen) før selve celledelingen',
        description:
          'Uten fullstendig DNA-replikasjon i interfasens S-fase ville dattercellene bare fått halvparten av genene ved celledeling og raskt gått til grunne.',
        icon: 'activity',
      },
      {
        title: 'Begge trådene er mal (i motsetning til transkripsjon!)',
        description:
          'Under transkripsjon leses bare én tråd langs ett enkelt gen for å lage mRNA – under DNA-replikasjon brukes BEGGE trådene langs HELE kromosomet som mal til nytt DNA!',
        icon: 'dna',
      },
      {
        title: 'Meselson og Stahls elegante eksperiment (1958)',
        description:
          'Ved å dyrke bakterier først med tungt nitrogen (¹⁵N) og deretter lett nitrogen (¹⁴N), viste Matthew Meselson og Franklin Stahl at første generasjon nye DNA-molekyler ble nøyaktig halv-tunge – det endelige beviset på semikonservativ replikasjon!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Fargeblyant-testen: Tegn et opprinnelig DNA-molekyl med to BLÅ tråder. Skiller vi trådene og bygger nye tråder med RØD blyant, hvilke farger får de to nye DNA-molekylene? Begge blir én blå + én rød tråd (aldri ett helblått og ett helrødt)!',
    didYouKnow:
      'Meselson og Stahls forsøk fra 1958 kalles ofte «biologiens vakreste eksperiment», fordi én enkelt runde i en ultrasentrifuge strøk vekk de konkurrerende teoriene på et øyeblikk!',
    examples: [
      'DNA-replikasjon',
      'S-fasen i cellesyklus',
      'Semikonservativ («halvt bevart»)',
      'Foreldretråd (mal) + dattertråd',
      'Meselson og Stahls eksperiment',
    ],
  },

  // ==========================================
  // STEG 7: REPLIKASJONSGAFFELEN – HELIKASE, TOPOISOMERASE & PRIMASE
  // ==========================================
  {
    id: 'dna_helicase_fork',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'dna_semiconservative',
    stepNumber: 7,
    title: 'Replikasjonsgaffelen – Helikase åpner DNA-glidelåsen',
    shortLabel: 'Helikase & replikasjonsgaffel',
    latinName: 'Replikasjonsbobler • Helikase, topoisomerase & RNA-primase gjør klart',
    timeMa: 'Nivå 3 • Replikasjonskløften',
    eraLabel: 'Y-krysset der trådene skilles',
    x: 1760,
    y: 210,
    anchorX: 1545,
    anchorY: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    stageCategory: 'fork_enzymes',
    formulaTag: 'Helikase åpner • Replikasjonsbobler & -gaffel',
    traceBadge: 'Helikase • Y-gaffelen',
    image: evoImg('dna_step7_helicase_fork.png'),
    imageCaption:
      'Enzymet helikase pløyer seg fram i det Y-formede krysset (replikasjonsgaffelen) og bryter hydrogenbindingene, mens topoisomerase fjerner overspenning og primase legger en kort RNA-primer.',
    summaryTitle: 'Tusenvis av startpunkter og et samspilt enzym-lag klargjør DNA-trådene på rekordtid',
    whatHappens:
      'Skulle én eneste enzymmaskin kopiert alle våre 6 milliarder basepar fra den ene enden til den andre, ville én celledeling tatt flere måneder! Derfor starter eukaryote celler replikasjonen ved titusenvis av startpunkter samtidig langs kromosomene. Hvert startpunkt åpner seg som en replikasjonsboble med et Y-formet kryss i hver ende kalt en replikasjonsgaffel. Midt i krysset jobber det ringformede enzymet helikase som en lynrask glidelåsåpner og kløyver hydrogenbindingene mellom baseparene. Foran gaffelen klipper og avlaster enzymet topoisomerase snurrespenningen i spiralen, enkelttrådbindende proteiner holder trådene adskilt, og enzymet primase legger ut en liten startblokk kalt RNA-primer!',
    keyTraits: [
      {
        title: 'Helikase = glidelåsåpneren i replikasjonsgaffelen',
        description:
          'Ved hjelp av energi fra ATP spinner helikase framover og skiller de to DNA-trådene ved å bryte de svake hydrogenbindingene uten å skade sukker-fosfat-ryggraden.',
        icon: 'zap',
      },
      {
        title: 'Topoisomerase hindrer at spiralen slår krøll foran gaffelen',
        description:
          'Når du drar to sammentvunnede tau fra hverandre, strammes vridningen voldsomt foran deg – topoisomerase fungerer som en svivel som slipper ut spenningen!',
        icon: 'wind',
      },
      {
        title: 'Primase legger «startklossen» (RNA-primer)',
        description:
          'Siden hovedenzymet DNA-polymerase ikke klarer å starte på bar bakke, må enzymet primase først bygge en kort bit på 5–10 RNA-nukleotider med en klar 3\'-OH-ende å bygge videre på.',
        icon: 'footprints',
      },
    ],
    classroomTest:
      'Motorvei-spørsmålet: Hvorfor har menneskekromosomer tusenvis av replikasjonsbobler som vokser mot hverandre og smelter sammen, mens en liten bakterie klarer seg med bare ett startpunkt? Fordi vi har over tusen ganger mer DNA og litt lavere byggehastighet – med tusenvis av bobler er hele kopieringen unnagjort på få timer!',
    didYouKnow:
      'Flere viktige cellegifter mot kreft er designet nettopp for å blokkere enzymet topoisomerase – da låser DNA-spiralen seg i raskt delende kreftceller slik at svulstcellene stanser opp!',
    examples: [
      'Replikasjonsboble (tusenvis av startpunkter)',
      'Replikasjonsgaffel (Y-krysset)',
      'Helikase (bryter H-bindinger)',
      'Topoisomerase (fjerner tvinnespenning)',
      'Primase & RNA-primer (startblokk)',
    ],
  },

  // ==========================================
  // STEG 8: DNA-POLYMERASE – LEDENDE TRÅD VS. OKAZAKI-FRAGMENTER
  // ==========================================
  {
    id: 'dna_polymerase_strands',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'dna_helicase_fork',
    stepNumber: 8,
    title: 'DNA-polymerase i arbeid – Ledende tråd vs. Okazaki-fragmenter',
    shortLabel: 'DNA-polymerase & ligase',
    latinName: '5\' → 3\'-regelen • Kontinuerlig ledende tråd mot stykkevis forsinket tråd',
    timeMa: 'Nivå 3 • Replikasjonskløften',
    eraLabel: 'Bygging av de nye DNA-trådene',
    x: 2020,
    y: 830,
    anchorX: 1860,
    anchorY: 625,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    stageCategory: 'fork_enzymes',
    formulaTag: "DNA-polymerase (kun 5' → 3') + Ligase",
    traceBadge: 'Kun 5\' → 3\' • Okazaki',
    image: evoImg('dna_step8_polymerase_strands.png'),
    imageCaption:
      'DNA-polymerase bygger den ledende tråden i ett sammenhengende strekk inn mot replikasjonsgaffelen, mens den forsinkede tråden må sys bakover i korte Okazaki-fragmenter som sveises sammen av DNA-ligase.',
    summaryTitle: 'Én streng kjemisk enveiskjøringsregel tvinger cellen til å sy den ene tråden i småbiter!',
    whatHappens:
      'Nå tar hovedbyggmesteren over: enzymet DNA-polymerase henter frie DNA-nukleotider og kobler A mot T og C mot G i rasende fart! Men DNA-polymerase har en ufravikelig kjemisk begrensning: den kan KUN hekte nye nukleotider på den frie 3\'-enden av den voksende tråden – altså bygger den ALLTID ny tråd i retningen 5\' → 3\' (mens den leser maltråden i retning 3\' → 5\'). Fordi de to maltrådene i gaffelen er antiparallelle, oppstår et fascinerende puslespill: På den ene maltråden («ledende tråd») kan DNA-polymerase kjøre sammenhengende rett inn i gaffelen etter helikase. På den motsatte maltråden («forsinket tråd») må enzymet derimot jobbe i motsatt retning ut fra gaffelen og sy tråden stykkevis i korte biter kalt Okazaki-fragmenter!',
    keyTraits: [
      {
        title: 'Ledende tråd (leading strand) – sammenhengende ekspressfart',
        description:
          'Langs maltråden som peker 3\' → 5\' inn mot gaffelen trengs bare én enkelt RNA-primer ved start, så bygger DNA-polymerase ny 5\' → 3\'-tråd uavbrutt i samme retning som gaffelen åpner seg.',
        icon: 'footprints',
      },
      {
        title: 'Forsinket tråd (lagging strand) – sys i Okazaki-fragmenter',
        description:
          'Langs den andre maltråden må primase stadig sette nye RNA-primere etter hvert som gaffelen åpner seg, og DNA-polymerase bygger korte DNA-stykker på 100–200 baser (Okazaki-fragmenter) bakover fra gaffelen.',
        icon: 'layers',
      },
      {
        title: 'DNA-ligase = det molekylære «limet» som sveiser skjøtene',
        description:
          'Til slutt fjernes alle de midlertidige RNA-primerne og erstattes med ekte DNA-nukleotider, før enzymet DNA-ligase limer sammen hakkene i sukker-fosfat-ryggraden til én hel, uavbrutt tråd!',
        icon: 'cpu',
      },
    ],
    classroomTest:
      'Symaskin-analogien som gjør eksamenssensoren imponert: Ledende tråd er som å sy én rett søm framover mens glidelåsen åpner seg. Forsinket tråd er som å måtte sy bakoversting for bakoversting (Okazaki-fragmenter) og til slutt knyte trådene sammen med DNA-ligase!',
    didYouKnow:
      'Okazaki-fragmentene er oppkalt etter det japanske forskerekteparet Reiji og Tsuneko Okazaki, som i 1968 løste gåten om hvordan to motsatt rettede tråder kan kopieres samtidig ved replikasjonsgaffelen!',
    examples: [
      'DNA-polymerase (bygger kun 5\' → 3\')',
      'Ledende tråd (kontinuerlig)',
      'Forsinket tråd (stykkevis)',
      'Okazaki-fragmenter',
      'DNA-ligase («limer» ryggraden)',
    ],
  },

  // ==========================================
  // STEG 9: KORREKTURLESING OG MUTASJONER
  // ==========================================
  {
    id: 'dna_proofreading_mutation',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'dna_polymerase_strands',
    stepNumber: 9,
    title: 'Korrekturlesing og kopieringsfeil – Slik oppstår mutasjoner!',
    shortLabel: 'Korrektur & mutasjoner',
    latinName: 'Proofreading & Reparasjonsenzymer • Spontane feil vs. mutagener',
    timeMa: 'Nivå 4 • Kvalitetskontroll & arv',
    eraLabel: '99,9 % av feilene rettes umiddelbart',
    x: 2290,
    y: 210,
    anchorX: 2220,
    anchorY: 410,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    stageCategory: 'mutation_evolution',
    formulaTag: 'Korrekturlesing → ~1 feil per milliard baser',
    traceBadge: 'Slettetast • Mutasjoner',
    image: evoImg('dna_step9_proofreading_mutation.png'),
    imageCaption:
      'DNA-polymerase oppdager en feilkoblet base som gir en liten bulk i spiralen, rygger ett hakk tilbake med sin innebygde «slettetast», klipper bort feilen og setter inn riktig nukleotid.',
    summaryTitle: 'Verdens mest presise korrekturleser – men de ørsmå feilene som slipper gjennom endrer historien!',
    whatHappens:
      'Under kopieringen setter DNA-polymerase i utgangspunktet inn feil base omtrent én gang per 100 000 nukleotider. Heldigvis har DNA-polymerase en innebygd «slettetast» (korrekturlesing / proofreading): Merker enzymet at et nylig innsatt basepar buler litt skjevt ut fordi basene ikke passer sammen, rygger det umiddelbart bakover, klipper bort feilen og setter inn riktig base! Etterpå patruljerer egne reparasjonsenzymer tråden og fikser 99,9 % av de få feilene som likevel slapp forbi – slik at sluttsummen blir utrolige ~1 varig feil per milliard kopierte basepar! En slik varig endring i DNA-sekvensen kalles en mutasjon.',
    keyTraits: [
      {
        title: 'Spontane kopieringsfeil vs. ytre mutagener',
        description:
          'Mutasjoner kan oppstå helt tilfeldig som sjeldne kopieringsglipper under DNA-replikasjonen, eller utløses av ytre mutagener som UV-stråling fra sola, ioniserende røntgen-/radioaktiv stråling og mutagene kjemikalier (f.eks. i tobakksrøyk).',
        icon: 'flame',
      },
      {
        title: 'Kroppsceller (somatiske) vs. kjønnsceller (arvelige!)',
        description:
          'Dette skillet må sitte: En mutasjon i en hudcelle eller lungecelle rammer KUN individet selv (kan i verste fall føre til kreft), men går ALDRI i arv. Kun mutasjoner i kjønnsceller (egg- og sædceller) føres videre til neste generasjon!',
        icon: 'shield',
      },
      {
        title: 'Fra én baseendring til endret protein – eller ingen endring',
        description:
          'Skjer mutasjonen i et ikke-kodende område eller gir samme aminosyre (stille mutasjon), merkes ingenting – men rammer den et gen eller en reguleringsbryter, kan proteinet endre form og funksjon.',
        icon: 'dna',
      },
    ],
    classroomTest:
      'Skrivehastighets-regnestykket: Tenk deg at du må skrive av tusen tykke romaner i full fart på tastaturet og bare har lov til å gjøre tre skrivefeil totalt i hele bokhaugen – så nøyaktig jobber DNA-polymerase og reparasjonsenzymene i hver eneste celledeling!',
    didYouKnow:
      'Sterkt UV-lys fra sola får ofte to nabotyminer (T–T) på samme DNA-tråd til å smelte sammen til en klump («tymin-dimer») i hudcellene dine – reparasjonsenzymene dine klipper faktisk bort tusenvis av slike solskader hver eneste sommerdag!',
    examples: [
      'Korrekturlesing (proofreading)',
      'DNA-reparasjonsenzymer',
      'Mutasjon (~1 per milliard baser)',
      'Mutagener (UV, stråling, kjemikalier)',
      'Kroppscellemutasjon vs. kjønnscellemutasjon',
    ],
  },

  // ==========================================
  // STEG 10: SØSTERKROMATIDER – BROEN TIL CELLEDELING, PROTEINSYNTESE & EVOLUSJON
  // ==========================================
  {
    id: 'dna_division_evolution',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'dna_proofreading_mutation',
    stepNumber: 10,
    title: 'To identiske søsterkromatider – Broen til liv, arv og evolusjon',
    shortLabel: 'Søsterkromatider & evolusjon',
    latinName: 'Centromer & Søsterkromatider • Fra celledeling til Proteinsyntesen og Livets Tre',
    timeMa: 'Nivå 4 • Kvalitetskontroll & arv',
    eraLabel: 'Klar til celledeling og neste generasjon',
    x: 2560,
    y: 830,
    anchorX: 2500,
    anchorY: 520,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    stageCategory: 'mutation_evolution',
    formulaTag: 'Søsterkromatider → Arv, variasjon & evolusjon',
    traceBadge: 'Søsterkromatider • Evolusjon',
    image: evoImg('dna_step10_division_evolution.png'),
    imageCaption:
      'Etter replikasjonen henger de to identiske DNA-dobbelheliksene sammen i midtpunktet (sentromeren) som to søsterkromatider – klare til å fordeles til nye celler, uttrykkes i proteinsyntesen og drive evolusjonen videre.',
    summaryTitle: 'Her møtes hele biologifaget: Celledeling, proteinsyntese og milliarder av år med evolusjon!',
    whatHappens:
      'Når siste Okazaki-fragment er limt sammen og korrekturlest, sitter cellen med to identiske kopier av hvert eneste kromosom! De to tvillingtrådene pakkes tett rundt histoner og holdes foreløpig sammen i et innsnevret midtpunkt kalt sentromeren som to søsterkromatider – det er nettopp derfor et kopiert delingskromosom ser ut som en X! Under celledelingen (mitose) trekkes søsterkromatidene til hver sin dattercelle slik at begge får komplett DNA. Når de nye cellene starter arbeidsdagen, åpnes enkeltgener og skrives om til mRNA i «Proteinsyntesen». Og de sjeldne mutasjonene som skjer i kjønnsceller, skaper helt nye genvarianter (alleler) – selve drivstoffet som naturlig utvalg har formet hele «Livets Tre» av i 3,7 milliarder år!',
    keyTraits: [
      {
        title: 'Søsterkromatider holdt sammen i sentromeren',
        description:
          'Før S-fasen består ett kromosom av én DNA-dobbelheliks; etter replikasjonen består det av to identiske søsterkromatider (to dobbelhelikser) festet sammen i sentromeren helt til celledelingen skiller dem.',
        icon: 'layers',
      },
      {
        title: 'Direkte kobling til temaet «Proteinsyntesen»',
        description:
          'DNA-replikasjon kopierer HELE arkivet én gang før celledeling, slik at hver ny celle har originalboka intakt – deretter bruker cellen transkripsjon og translasjon til å lage proteiner fra enkeltgener hver dag!',
        icon: 'cpu',
      },
      {
        title: 'Direkte kobling til temaet «Livets Tre» og evolusjon',
        description:
          'Hadde DNA-replikasjonen vært 100,000 % feilfri uten én eneste mutasjon, ville det aldri oppstått nye alleler – da hadde livet stått fast på ur-cellen LUCA uten mangfold eller tilpasning!',
        icon: 'sprout',
      },
    ],
    classroomTest:
      'Helhetsblikket som binder alle tre temaene i appen sammen: (1) DNA-replikasjon bevarer og kopierer koden til nye celler, (2) Proteinsyntesen oversetter koden til levende egenskaper, og (3) Sjeldne mutasjoner + naturlig utvalg bygger nye grener på Livets Tre!',
    didYouKnow:
      'Helt ytterst på kromosomenes ender sitter beskyttelseshetter av repeterte baser kalt telomerer (som plasttuppene på skolisser), slik at viktige gener ikke slites bort når forsinket tråd kopieres runde etter runde!',
    examples: [
      'Søsterkromatider (identiske kopier)',
      'Sentromer (festepunkt i X-formen)',
      'Mitose (vekst) & meiose (kjønnsceller)',
      'Nye alleler (genvarianter)',
      'Råmaterialet for evolusjon på Livets Tre',
    ],
  },
];

export const DNA_NODE_MAP: Record<string, DnaStepNodeData> = Object.fromEntries(
  DNA_NODES.map((node) => [node.id, node]),
);

export const DNA_CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'dnaq1',
    number: 1,
    question:
      'Forklar hvordan et DNA-molekyl er bygd opp kjemisk, og begrunn hvorfor kombinasjonen av kovalente bindinger i reisverket og svake hydrogenbindinger i midten er så viktig for cellen.',
    contextHint:
      'Få med de tre delene i et nukleotid, forskjellen på deoksyribose og ribose, baseparingsregelen (A–T og C–G), antiparallelle retninger (5\' → 3\' og 3\' → 5\') og hvordan trådene åpnes!',
    points: [
      {
        heading: 'Nukleotidet og det sterke sukker-fosfat-reisverket ytterst',
        detail:
          'DNA er en dobbelttrådet polymer av nukleotider, der hvert nukleotid består av en fosfatgruppe, sukkeret deoksyribose (ett oksygenatom mindre enn ribose, noe som gjør DNA ekstra stabilt) og én av basene A, T, C eller G. Langs hver enkelt tråd holdes sukker og fosfat sammen av sterke kovalente bindinger slik at rekkefølgen av baser aldri går i oppløsning.',
        badge: 'Sterk ryggrad',
      },
      {
        heading: 'Komplementær baseparing med svake hydrogenbindinger innerst',
        detail:
          'Mellom de to trådene peker nitrogenbasene innover og parer alltid purin mot pyrimidin: Adenin (A) med tymin (T) via 2 hydrogenbindinger, og cytosin (C) med guanin (G) via 3 hydrogenbindinger (Chargaffs regel). Tusenvis av hydrogenbindinger gjør dobbelheliksen svært stabil i hverdagen, men likevel enkel for helikase å åpne som en glidelås uten å ødelegge koden!',
        badge: 'A = T • C ≡ G',
      },
      {
        heading: 'Antiparallell dobbelheliks (5\' → 3\' mot 3\' → 5\')',
        detail:
          'De to trådene snor seg om hverandre i motsatt kjemisk retning ut fra karbonnummereringen i deoksyribose – den ene går 5\' → 3\' og den andre 3\' → 5\' – noe som styrer hvordan enzymer som DNA-polymerase leser og bygger tråden.',
        badge: 'Antiparallell',
      },
    ],
    takeaway:
      'Husk bildet av vindeltrappen: De kovalente vangene ytterst sørger for at bokstavrekkefølgen i genene aldri ryker, mens hydrogenbindingene i trinnene fungerer som en gjenbrukbar glidelås som både kan lukkes trygt og åpnes ved kopiering!',
  },
  {
    id: 'dnaq2',
    number: 2,
    question:
      'Beskriv trinn for trinn hva som skjer i replikasjonsgaffelen, og sammenlign DNA-replikasjon med transkripsjon i proteinsyntesen!',
    contextHint:
      'Nevn rollene til helikase, primase, DNA-polymerase og DNA-ligase, forklar hvorfor den ene tråden bygges i Okazaki-fragmenter, og sammenlign prosessen med mRNA-produksjon!',
    points: [
      {
        heading: 'Semikonservativ åpning ved replikasjonsgaffelen',
        detail:
          'I S-fasen før celledeling åpnes DNA ved tusenvis av replikasjonsbobler samtidig. Enzymet helikase bryter hydrogenbindingene i Y-krysset (replikasjonsgaffelen), topoisomerase fjerner snurrespenning, og primase legger korte RNA-primere som startblokker.',
        badge: 'Helikase & primase',
      },
      {
        heading: 'Ledende tråd vs. forsinket tråd (Okazaki-fragmenter)',
        detail:
          'Fordi DNA-polymerase kun kan bygge ny tråd i retning 5\' → 3\', bygges den ledende tråden sammenhengende inn mot gaffelen, mens den motsatte forsinkede tråden må sys bakover i korte biter (Okazaki-fragmenter). Til slutt byttes RNA-primerne ut med DNA og skjøtene sveises sammen av enzymet DNA-ligase.',
        badge: 'Kun 5\' → 3\'',
      },
      {
        heading: 'Ikke bland sammen DNA-replikasjon og transkripsjon!',
        detail:
          'DNA-replikasjon kopierer begge trådene av hele arvestoffet til nytt DNA før celledeling, mens transkripsjon bare kopierer én maltråd langs ett enkelt gen til enkelttrådet mRNA når cellen trenger et protein.',
        badge: 'Kopi vs. avskrift',
      },
    ],
    comparisonTable: {
      headers: [
        'Egenskap',
        'DNA-replikasjon (før celledeling)',
        'Transkripsjon (i proteinsyntesen)',
      ],
      rows: [
        [
          'Formål og tidspunkt',
          'Doble hele arvestoffet i S-fasen slik at to datterceller får komplett DNA',
          'Lage en arbeidskopi (mRNA) av ett gen når cellen skal produsere et protein',
        ],
        [
          'Hvor mye av DNA kopieres?',
          'Begge trådene langs alle de 46 kromosomene (hele genomet)',
          'Kun den ene maltråden langs ett avgrenset gen (fra promotor til stoppsignal)',
        ],
        [
          'Viktigste enzymer',
          'Helikase, primase, DNA-polymerase og DNA-ligase',
          'RNA-polymerase (åpner selv DNA lokalt og trenger ingen primer)',
        ],
        [
          'Byggesteiner (sukker & baser)',
          'DNA-nukleotider med deoksyribose og basene A, T, C, G (A parer med T)',
          'RNA-nukleotider med ribose og basene A, U, C, G (A i DNA gir urasil U!)',
        ],
        [
          'Sluttprodukt',
          'To identiske dobbelttrådede DNA-molekyler (semikonservativt: 1 gammel + 1 ny tråd)',
          'Ett enkelttrådet RNA-molekyl (pre-mRNA → modent mRNA som sendes ut i cytoplasma)',
        ],
      ],
    },
    takeaway:
      'Eksamenstrikset: Spør oppgaven om kopiering før celledeling, er svaret DNA-replikasjon med DNA-polymerase og tymin (T). Spør oppgaven om å lese av et gen for å lage protein, er svaret transkripsjon med RNA-polymerase og urasil (U)!',
  },
  {
    id: 'dnaq3',
    number: 3,
    question:
      'Hvorfor oppstår det så ekstremt få feil under DNA-replikasjonen, hva skiller mutasjoner i kroppsceller fra mutasjoner i kjønnsceller, og hvorfor er mutasjoner likevel helt nødvendige for evolusjonen?',
    contextHint:
      'Trekk linjene fra DNA-polymerasens korrekturlesing til mutagener, arvelighet ved kjønnet formering og naturlig utvalg på Livets Tre!',
    points: [
      {
        heading: 'Korrekturlesing og reparasjonsenzymer gir ~1 feil per milliard baser',
        detail:
          'DNA-polymerase sjekker hvert nylig innsatte basepar fortløpende (proofreading), rygger tilbake og klipper ut feilkoblede baser. Sammen med egne DNA-reparasjonsenzymer rettes rundt 99,9 % av alle kopieringsglipper og mange skader fra ytre mutagener (som UV-stråling og kjemikalier).',
        badge: 'Kvalitetskontroll',
      },
      {
        heading: 'Kroppsceller (ikke arvelig) vs. kjønnsceller (går i arv)',
        detail:
          'En mutasjon i en vanlig kroppscelle (f.eks. en solskadet hudcelle) følger bare med dattercellene i det vevet og dør med individet. Kun mutasjoner som skjer i kjønnsceller (egg- eller sædceller, eller forstadiene deres) blir med over i det befruktede egget og arves av barnet!',
        badge: 'Arvelighet',
      },
      {
        heading: 'Uten sjeldne mutasjoner – ingen genetisk variasjon eller evolusjon!',
        detail:
          'Selv om mange mutasjoner i gener er nøytrale eller skadelige for enkeltindividet, skaper arvelige mutasjoner også helt nye genvarianter (alleler). Det er denne genetiske variasjonen naturlig utvalg virker på når arter tilpasser seg endrede miljøer over millioner av år!',
        badge: 'Drivstoff for evolusjon',
      },
    ],
    takeaway:
      'Balansen som gjør liv mulig: DNA-replikasjonen er presis nok til at arter bevarer oppskriftene sine fra generasjon til generasjon, men har akkurat nok sjeldne mutasjoner i kjønnscellene til at livet kan utvikle seg videre!',
  },
];
