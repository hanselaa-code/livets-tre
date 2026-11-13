export type TraitIconName =
  | 'sparkles'
  | 'dna'
  | 'cpu'
  | 'leaf'
  | 'layers'
  | 'shield'
  | 'footprints'
  | 'wind'
  | 'flame'
  | 'heart'
  | 'hand'
  | 'eye'
  | 'brain'
  | 'users'
  | 'compass'
  | 'waves'
  | 'feather'
  | 'sprout'
  | 'shell';

export interface KeyTrait {
  title: string;
  description: string;
  icon: TraitIconName;
}

export interface TreeNodeData {
  id: string;
  /** 0..9 indicates which main presentation step unlocks this node */
  stepIndex: number;
  /** True for the 10 main steps along the path from LUCA to Homo sapiens */
  isMainPath: boolean;
  /** Parent node ID in the phylogenetic tree (null for LUCA) */
  parentId: string | null;
  /** Display number 1..10 for main path steps */
  stepNumber?: number;
  title: string;
  shortLabel: string;
  latinName: string;
  timeMa: string;
  eraLabel: string;
  /** SVG world coordinates (0..2650 x 0..1760) */
  x: number;
  y: number;
  /** Label placement relative to node circle on SVG canvas */
  labelAnchor: 'top' | 'bottom' | 'left' | 'right';
  /** Relative path or embedded data URI to Nano Banana natural illustration */
  image: string;
  imageCaption: string;
  summaryTitle: string;
  whatHappens: string;
  keyTraits: KeyTrait[];
  didYouKnow: string;
  examples: string[];
  accentCategory: 'origin' | 'microbe' | 'plant_fungi' | 'invertebrate' | 'vertebrate' | 'mammal' | 'human';
}

export interface ControlQuestionItem {
  id: string;
  number: number;
  question: string;
  contextHint: string;
  points: {
    heading: string;
    detail: string;
    badge?: string;
  }[];
  comparisonTable?: {
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  takeaway: string;
}

const evoImg = (file: string): string =>
  (globalThis as unknown as { __EVO_IMGS__?: Record<string, string> }).__EVO_IMGS__?.[file] ??
  `./images/evolution/${file}`;

export const MAIN_STEP_IDS: string[] = [
  'luca',
  'eukaryotes',
  'animals',
  'vertebrates',
  'tetrapods',
  'mammals',
  'placentals',
  'primates',
  'hominids',
  'homo_sapiens',
];

export const TREE_NODES: TreeNodeData[] = [
  // ==========================================
  // STEG 1: LIVETS OPPRINNELSE – LUCA (3700 ma)
  // ==========================================
  {
    id: 'luca',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Livets opprinnelse (LUCA)',
    shortLabel: 'LUCA – Opprinnelse',
    latinName: 'Last Universal Common Ancestor',
    timeMa: '3700 ma',
    eraLabel: 'Arkeikum – Urhavet',
    x: 280,
    y: 1560,
    labelAnchor: 'bottom',
    image: evoImg('origin.png'),
    imageCaption: 'Hydrotermiske skorsteiner på havbunnen for 3,7 milliarder år siden – et sannsynlig vugge-miljø for det første livet.',
    summaryTitle: 'En felles stamfar for alt liv på jorda',
    whatHappens:
      'Dypt nede i urhavet, trolig rundt varme, mineralrike hydrotermiske kilder på havbunnen, oppstår de første levende cellene for rundt 3,7 milliarder år siden. LUCA (Last Universal Common Ancestor) er den encellede ur-organismen som absolutt alt nålevende liv på jorda – fra bakterier og sopp til blågran og mennesker – stammer fra. Herfra deler livets tre seg tidlig i Eubakterier, Arker og linjen som senere gir opphav til Eukaryotene.',
    keyTraits: [
      {
        title: 'Universell genetisk kode (DNA/RNA)',
        description: 'Alle levende organismer bruker samme genetiske alfabet (A, T, C, G) og ribosomer til å bygge proteiner.',
        icon: 'dna',
      },
      {
        title: 'Cellemembran',
        description: 'En beskyttende hinne av fettstoffer skiller cellens indre kjemiske miljø fra urhavet utenfor.',
        icon: 'shield',
      },
      {
        title: 'Kjemisk energiomsetning (ATP)',
        description: 'Utnyttet kjemiske gradienter ved varme undersjøiske kilder lenge før fotosyntesen oppsto.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Du deler grunnleggende «husholdningsgener» med bakterier og arker som lever i kokende svovelkilder i dag – oppskriften på hvordan celler leser DNA har vært bevart i 3,7 milliarder år!',
    examples: ['LUCA (ur-cellen)', 'Anaerobe dyphavsmikrober', 'Stamfar til Arker, Bakterier og Eukaryoter'],
    accentCategory: 'origin',
  },
  {
    id: 'archaea',
    stepIndex: 0,
    isMainPath: false,
    parentId: 'luca',
    title: 'Arker (Urbakterier)',
    shortLabel: 'Arker',
    latinName: 'Archaea',
    timeMa: '3700 ma',
    eraLabel: 'Arkeikum – Sidegren',
    x: 120,
    y: 1380,
    labelAnchor: 'top',
    image: evoImg('origin.png'),
    imageCaption: 'Arker trives ofte i ekstreme miljøer som kokende undersjøiske kilder, saltsjøer og oksygenfrie sedimenter.',
    summaryTitle: 'Mestere i ekstreme miljøer – og eukaryotenes nære slektning',
    whatHappens:
      'Arker er encellede prokaryote mikroorganismer uten cellekjerne. DNA-analyser har avslørt at Arker utgjør et helt eget domene i livets tre, og at en gruppe arker («Asgard-arker») faktisk var vertscellen som ga opphav til alle eukaryote celler!',
    keyTraits: [
      {
        title: 'Prokaryot celle uten kjerne',
        description: 'Arvestoffet flyter fritt i cytoplasmaet uten kjernemembran.',
        icon: 'dna',
      },
      {
        title: 'Ekstremstabil eter-cellemembran',
        description: 'Tåler over 100 °C, mettet saltvann (Dødehavet) eller sterk syre uten at membranen går i oppløsning.',
        icon: 'flame',
      },
    ],
    didYouKnow:
      '«Loki-arkene» (Lokiarchaeota), som ga nøkkelen til vårt eget opphav, ble oppdaget i dyphavsslam ved Lokes slott mellom Norge og Grønland!',
    examples: ['Lokiarchaeota (Asgard-arker)', 'Sulfolobus (lever i kokende svovelkilder)', 'Halobacterium (ekstremt saltelskende)', 'Metanproduserende vom-arker hos drøvtyggere'],
    accentCategory: 'microbe',
  },
  {
    id: 'eubacteria',
    stepIndex: 0,
    isMainPath: false,
    parentId: 'luca',
    title: 'Eubakterier (Ekte bakterier)',
    shortLabel: 'Eubakterier',
    latinName: 'Bacteria',
    timeMa: '3700 ma',
    eraLabel: 'Arkeikum – Sidegren',
    x: 500,
    y: 1615,
    labelAnchor: 'bottom',
    image: evoImg('origin.png'),
    imageCaption: 'Eubakterier driver klodens kretsløp av karbon, nitrogen og svovel i jord, hav og tarm.',
    summaryTitle: 'Klodens uunnværlige mikroskopiske kjemikere',
    whatHappens:
      'Eubakterier er encellede prokaryoter med cellevegg av peptidoglykan. De finnes overalt – fra flere kilometer ned i jordskorpa til huden og tarmen vår. De bryter ned dødt materiale, binder luftas nitrogen til plantenæring og produserer vitaminer.',
    keyTraits: [
      {
        title: 'Cellevegg av peptidoglykan og rask todeling',
        description: 'En bakterie kan dele seg hvert 20. minutt under gunstige forhold og utveksle gener via plasmider.',
        icon: 'dna',
      },
      {
        title: 'Nøkkelrolle i nitrogen- og karbonkretsløpet',
        description: 'Rhizobium-bakterier i erteplanter gjør nitrogen fra lufta tilgjengelig for alt liv på land.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Ett eneste gram frisk matjord i en norsk skog kan inneholde over én milliard bakterier fordelt på tusenvis av arter!',
    examples: ['Melkesyrebakterier (Lactobacillus)', 'Tarmbakterien Escherichia coli', 'Nitrogenfikserende Rhizobium', 'Streptomyces (kilde til antibiotika)'],
    accentCategory: 'microbe',
  },
  {
    id: 'cyanobacteria',
    stepIndex: 0,
    isMainPath: false,
    parentId: 'eubacteria',
    title: 'Cyanobakterier (Blågrønnbakterier)',
    shortLabel: 'Cyanobakterier (~2400 ma)',
    latinName: 'Cyanobacteria',
    timeMa: '~2400 ma',
    eraLabel: 'Undergren av Eubakterier',
    x: 750,
    y: 1655,
    labelAnchor: 'right',
    image: evoImg('origin.png'),
    imageCaption: 'Cyanobakterier oppfant oksygenproduserende fotosyntese og forvandlet atmosfæren på jorda for alltid.',
    summaryTitle: 'Bakteriene som ga jorda oksygen og ozonlag',
    whatHappens:
      'Cyanobakteriene utviklet evnen til å bruke sollys til å spalte vann og frigjøre oksygengass (O₂). Dette utløste «Den store oksygenhendelsen» for rundt 2,4 milliarder år siden, skapte det beskyttende ozonlaget mot UV-stråling – og ble senere tatt opp i eukaryote celler som plantenes kloroplaster!',
    keyTraits: [
      {
        title: 'Oksygenproduserende fotosyntese',
        description: 'Bruker klorofyll a til å lage sukker av sollys, vann og CO₂ med oksygen som biprodukt.',
        icon: 'leaf',
      },
      {
        title: 'Stromatolitter – jordas eldste synlige fossiler',
        description: 'Bygde lagdelte kalksteinsmatter på grunt vann som fortsatt finnes i Australia i dag.',
        icon: 'layers',
      },
    ],
    didYouKnow:
      'Hver eneste kloroplast inne i et bjørkeblad eller gresstrå er egentlig en temmet cyanobakterie som har levd inne i plantecellene i nesten en milliard år!',
    examples: ['Prochlorococcus (produserer opptil 20 % av oksygenet i biosfæren)', 'Spirulina (Arthrospira)', 'Nostoc (skyfallsalge)', 'Anabaena'],
    accentCategory: 'microbe',
  },

  // ==========================================
  // STEG 2: EUKARYOTER (2000 ma)
  // ==========================================
  {
    id: 'eukaryotes',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'luca',
    stepNumber: 2,
    title: 'Eukaryoter',
    shortLabel: 'Eukaryoter',
    latinName: 'Eukaryota',
    timeMa: '2000 ma',
    eraLabel: 'Proterozoikum',
    x: 500,
    y: 1380,
    labelAnchor: 'bottom',
    image: evoImg('eukaryotes.png'),
    imageCaption: 'Kompleks eukaryot celle med tydelig cellekjerne, mitokondrier og indre membransystemer.',
    summaryTitle: 'Cellerevolusjonen: Kjerne og egne kraftverk',
    whatHappens:
      'For rundt 2 milliarder år siden tar en arke-lignende vertscelle opp en oksygenbrukende bakterie uten å fordøye den. Gjennom endosymbiose blir bakterien til mitokondrier – cellens kraftverk! Med rikelig energi (ATP) og DNA beskyttet i en egen cellekjerne kan cellene bli tusen ganger større i volum og utvikle avansert arbeidsdeling. Herfra forgrener Protister, Planter, Sopp og Dyr seg ut.',
    keyTraits: [
      {
        title: 'Ekte cellekjerne',
        description: 'Arvestoffet (DNA) pakkes i lineære kromosomer inne i en beskyttende kjernemembran.',
        icon: 'cpu',
      },
      {
        title: 'Mitokondrier (Endosymbiose)',
        description: 'Tidligere frittlevende bakterier ble permanente organeller som driver effektiv aerob celleånding.',
        icon: 'flame',
      },
      {
        title: 'Indre membransystem og kjønnet formering',
        description: 'Meiose og befruktning blander gener på nye måter og setter fart på evolusjonen.',
        icon: 'layers',
      },
    ],
    didYouKnow:
      'Mitokondriene i cellene dine har fortsatt sitt eget lille ringformede bakterie-DNA, og du arver dem utelukkende fra moren din via eggcellen!',
    examples: ['Protister og brunalger', 'Planteriket', 'Soppriket', 'Dyreriket'],
    accentCategory: 'origin',
  },
  {
    id: 'protists_kelp',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'eukaryotes',
    title: 'Protister og brunalger (Tareskog)',
    shortLabel: 'Protister & tareskog',
    latinName: 'Protista & Ochrophyta',
    timeMa: '~1200 ma',
    eraLabel: 'Sidegren fra Eukaryoter',
    x: 265,
    y: 1255,
    labelAnchor: 'left',
    image: evoImg('eukaryotes.png'),
    imageCaption: 'Fra mikroskopiske tøffeldyr og kiselalger til mektige norske tareskoger under havoverflaten.',
    summaryTitle: 'Mangfoldige encellede eukaryoter og kystens undersjøiske skoger',
    whatHappens:
      'Protister omfatter eukaryoter som verken er dyr, ekte planter eller sopp. Mange er encellede jegere eller alger (som tøffeldyr, amøber og glitrende kiselalger med glass-skall), men her finner vi også brunalgene – som danner opptil 30 meter høye tareskoger langs norskekysten!',
    keyTraits: [
      {
        title: 'Enorm variasjon i levevis',
        description: 'Noen svømmer med flimmerhår og spiser bakterier, mens kiselalger og brunalger driver fotosyntese.',
        icon: 'waves',
      },
      {
        title: 'Tareskogen – havets regnskog langs norskekysten',
        description: 'Stortare er ingen plante, men en flercellet brunalge som gir oppvekstområde for millioner av fisk og smådyr.',
        icon: 'leaf',
      },
    ],
    didYouKnow:
      'Stortare og blæretang i fjæra er nærmere i slekt med malariaparasitten og kiselalger enn med et bjørketre på land!',
    examples: ['Stortare og blæretang (brunalger)', 'Kiselalger og fureflagellater (planteplankton)', 'Tøffeldyr og amøbe', ' slimdyr'],
    accentCategory: 'microbe',
  },
  {
    id: 'fungi',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'eukaryotes',
    title: 'Sopp',
    shortLabel: 'Sopp',
    latinName: 'Fungi',
    timeMa: '~1000 ma',
    eraLabel: 'Sidegren fra Eukaryoter',
    x: 335,
    y: 1135,
    labelAnchor: 'top',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Sopp og tidlige landplanter samarbeidet tett da de første økosystemene på land ble etablert.',
    summaryTitle: 'Naturens resirkulerere – nærmere i slekt med dyr enn med planter',
    whatHappens:
      'Sopp danner et eget rike av heterotrofe nedbrytere som skiller ut enzymer til omgivelsene og suger opp næringen gjennom tynne sopptråder (hyfer). De danner sopprot (mykorrhiza) med nesten alle skogstrær og inngår symbiose med alger i form av lav på snaufjellet.',
    keyTraits: [
      {
        title: 'Cellevegg av kitin',
        description: 'Bygget av det samme slitesterke karbohydratet som finnes i skallet hos insekter og krepsdyr.',
        icon: 'shield',
      },
      {
        title: 'Underjordisk mycel og sopprot',
        description: 'Bytter vann og mineraler mot sukker fra trærnes røtter i et gigantisk «Wood Wide Web».',
        icon: 'sprout',
      },
    ],
    didYouKnow:
      'Selve sopphatten du plukker i kurven om høsten er bare «frukten» – over 95 % av soppen lever skjult som et enormt trådnettverk nede i skogbunnen!',
    examples: ['Kantarell, steinsopp og rød fluesopp', 'Bakegjær (Saccharomyces cerevisiae)', 'Penselmugg (Penicillium)', 'Reinlav og messinglav (sopp + alge)'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'red_algae',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'eukaryotes',
    title: 'Planteriket: Rødalger og grønnalger',
    shortLabel: 'Rødalger & alger (800 ma)',
    latinName: 'Archaeplastida (Rhodophyta & Chlorophyta)',
    timeMa: '800 ma',
    eraLabel: 'Planterikets opphav i havet',
    x: 745,
    y: 1455,
    labelAnchor: 'bottom',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Rødalger og grønnalger i havet la grunnlaget for hele planteriket da kloroplasten oppsto.',
    summaryTitle: 'Solenergi fanges i kloroplaster under vann',
    whatHappens:
      'Da en eukaryot celle tok opp en cyanobakterie som ble til kloroplast, oppsto planterikets stammor i havet. Rødalger utviklet røde tilleggspigmenter som fanger det svake blågrønne lyset dypt nede i kystvannet, mens grønnalgene på grunt vann ble forfedrene til alle landplanter.',
    keyTraits: [
      {
        title: 'Kloroplaster og cellevegg av cellulose',
        description: 'Omdanner sollys, vann og CO₂ til druesukker og oksygen.',
        icon: 'leaf',
      },
      {
        title: 'Tilpasset lys i ulike havdyp',
        description: 'Rødalger kan vokse dypere enn noen andre flercellede alger.',
        icon: 'waves',
      },
    ],
    didYouKnow:
      'Søl (en næringsrik rødalge langs norskekysten) ble spist av vikingene som kilde til C-vitamin på lange sjøreiser, og nori rundt sushi er også en rødalge!',
    examples: ['Søl og nori (rødalger)', 'Ruglekalk / korallalger', 'Havsalat og tarmgrønske (grønnalger)', 'Kransalger (nærmest landplantene)'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'land_plants',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'red_algae',
    title: 'Landplanter: Moser og bregner',
    shortLabel: 'Landplanter: Moser & bregner',
    latinName: 'Embryophyta (Bryophyta & Polypodiopsida)',
    timeMa: '450 ma',
    eraLabel: 'Sporeplanter erobrer landjorda',
    x: 995,
    y: 1495,
    labelAnchor: 'bottom',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Moser og bregner gjorde golde steinkontinenter grønne og skapte jordsmonn for alt senere landliv.',
    summaryTitle: 'Sporeplantene gjør kontinentene grønne',
    whatHappens:
      'For 450 millioner år siden klatret etterkommere av ferskvanns-grønnalger opp på fuktig landjord. Først kom lave moser uten røtter og ledningsvev, og deretter karsporeplanter (kråkefot, sneller og bregner) med ekte røtter og styrkevev som dannet jordas aller første urskoger i karbontiden!',
    keyTraits: [
      {
        title: 'Kutikula og spalteåpninger',
        description: 'Voksaktig hinne hindrer uttørking i luft, mens regulerbare porer slipper inn CO₂.',
        icon: 'leaf',
      },
      {
        title: 'Formering med sporer i fuktig miljø',
        description: 'Sprer seg med mikroskopiske sporer i vinden i stedet for frø.',
        icon: 'sprout',
      },
    ],
    didYouKnow:
      'Mesteparten av steinkullet i verden stammer fra gigantiske, 30 meter høye kråkefot- og snelletrær som vokste i sumpskogene for over 300 millioner år siden!',
    examples: ['Torvmose, etasjemose og bjørnemose', 'Skogburkne, sisselrot og einstape (bregner)', 'Åkersnelle og skogsnelle', 'Myrkråkefot'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'conifers',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'land_plants',
    title: 'Bartrær (Nakenfrøede planter)',
    shortLabel: 'Bartrær (~310 ma)',
    latinName: 'Gymnospermae (Pinophyta)',
    timeMa: '~310 ma',
    eraLabel: 'Undergren av Landplanter',
    x: 1245,
    y: 1455,
    labelAnchor: 'right',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Frøet og pollenkornet frigjorde bartrærne fra vann ved befruktning og lot dem danne enorme barskoger.',
    summaryTitle: 'Frø med matpakke og vintergrønne barnåler',
    whatHappens:
      'Frøplantene oppfant pollen (som fraktes med vinden uten behov for fritt vann!) og frøet – en hardfør «overlevelseskapsel» der plantefosteret har med seg egen nistepakke. Hos nakenfrøede planter sitter frøene ubeskyttet mellom skjellene i en kongle.',
    keyTraits: [
      {
        title: 'Vindpollinering og frø i kongler',
        description: 'Tåler tørre innland og kalde vintre der sporeplanter sliter.',
        icon: 'wind',
      },
      {
        title: 'Voksdekkede nåler med frostvæske',
        description: 'Barnålene sparer vann når bakken er frossen og kan starte fotosyntesen straks vårsola titter frem.',
        icon: 'leaf',
      },
    ],
    didYouKnow:
      'Verdens største tre i volum ( mammuttreet «General Sherman») og verdens eldste tre (en over 4800 år gammel børstefuru) er begge bartrær!',
    examples: ['Vanlig gran (Picea abies)', 'Furu (Pinus sylvestris)', 'Einer og barlind', 'Lerk, edelgran og tempeltre (Ginkgo)'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'flowering_plants',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'land_plants',
    title: 'Blomsterplanter (Dekkfrøede)',
    shortLabel: 'Blomsterplanter (~140 ma)',
    latinName: 'Angiospermae (Magnoliophyta)',
    timeMa: '~140 ma',
    eraLabel: 'Undergren av Landplanter',
    x: 1255,
    y: 1580,
    labelAnchor: 'right',
    image: evoImg('insects.png'),
    imageCaption: 'Samlivet mellom fargerike blomster og pollinerende insekter skapte en eksplosjon av artsmangfold på land.',
    summaryTitle: 'Blomster, nektar og frukt – 90 % av alle nålevende landplanter',
    whatHappens:
      'I krittiden utviklet dekkfrøede planter blomster som lokker til seg insekter og fugler med farger, duft og nektar for målrettet pollinering. Etter befruktning svulmer fruktknuten opp til en frukt eller et bær som beskytter frøene og lokker dyr til å spre dem videre!',
    keyTraits: [
      {
        title: 'Koevolusjon med pollinerende dyr',
        description: 'Presis transport av pollen fra blomst til blomst gir enorm artsrikdom.',
        icon: 'sparkles',
      },
      {
        title: 'Frø innkapslet i frukt',
        description: 'Blåbær, epler, nøtter og løvetannens fallskjermer sørger for effektiv frøspredning.',
        icon: 'sprout',
      },
    ],
    didYouKnow:
      'Nesten all plantekost vi mennesker spiser – fra hvete, ris og potet til epler, kaffe, kakao, blåbær og gress for beitedyr – kommer fra blomsterplanter!',
    examples: ['Bjørk, eik, bøk og selje', 'Hvitveis, rødkløver, røsslyng og løvetann', 'Blåbær, multe og markjordbær', 'Hvete, bygg, mais og gressarter'],
    accentCategory: 'plant_fungi',
  },

  // ==========================================
  // STEG 3: DYR (660 ma)
  // ==========================================
  {
    id: 'animals',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'eukaryotes',
    stepNumber: 3,
    title: 'Dyr',
    shortLabel: 'Dyr',
    latinName: 'Animalia (Metazoa)',
    timeMa: '660 ma',
    eraLabel: 'Sen Proterozoikum / Kambrium',
    x: 730,
    y: 1190,
    labelAnchor: 'bottom',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Yrende kambrisk havbunn med tidlige blekkspruter, trilobitter, bløtdyr og svamper.',
    summaryTitle: 'Flercellede bevegelige jegere og filtrerere',
    whatHappens:
      'For rundt 660 millioner år siden slår eukaryote celler seg sammen til de første flercellede dyrene i havet. Uten stiv cellevegg holdes dyrecellene sammen av det elastiske proteinet kollagen – og utviklingen av muskel- og nervevev gir aktiv jakt, sansing og rask bevegelse! Fra dyrerikets rot splitter først svamper og nesledyr av, før tosidig symmetriske dyr deler seg i protostomer og vår egen deuterostom-linje.',
    keyTraits: [
      {
        title: 'Flercellede uten cellevegg',
        description: 'Fleksible celler bundet sammen av kollagen muliggjør rask formendring og bevegelse.',
        icon: 'layers',
      },
      {
        title: 'Heterotrofe med indre fordøyelse',
        description: 'Spiser andre organismer for energi og bryter ned maten i et indre fordøyelsessystem.',
        icon: 'flame',
      },
      {
        title: 'Muskel- og nervevev',
        description: 'Spesialiserte celler for sansing, koordinasjon og aktiv forflytning.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Under «den kambriske eksplosjonen» for ca. 540 millioner år siden oppsto nesten alle hovedrekker av dyr – med øyne, skall og rovdyr-byttedyr-kappløp – på geologisk rekordtid!',
    examples: ['Svamper og nesledyr', 'Bløtdyr, leddormer og leddyr', 'Pigghuder og virveldyr'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'sponges_cnidarians',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'animals',
    title: 'Svamper og nesledyr (Maneter & koraller)',
    shortLabel: 'Svamper & nesledyr',
    latinName: 'Porifera & Cnidaria',
    timeMa: '~640–580 ma',
    eraLabel: 'Tidlige sidegrener fra Dyr',
    x: 985,
    y: 1285,
    labelAnchor: 'right',
    image: evoImg('cnidarians_echinoderms.png'),
    imageCaption: 'Glassmaneter, fargerike sjøanemoner, svamper og koraller tilhører de eldste greinene på dyrenes stamtre.',
    summaryTitle: 'Filtrerende svamper og radiærsymmetriske jegere med nesleceller',
    whatHappens:
      'Svampene er de mest opprinnelige dyrene: De mangler både nerver, muskler og organer, og pumper vann gjennom tusenvis av porer for å filtrere ut bakterier. Nesledyrene (maneter, sjøanemoner og koraller) tok neste steg med ekte nerve-nett, radiærsymmetri og lynraske giftige harpun-celler (nesleceller) på fangarmene!',
    keyTraits: [
      {
        title: 'Radiærsymmetri og enkelt nervenett',
        description: 'Maneter og korallpolypper møter omgivelsene likt fra alle kanter rundt munnen.',
        icon: 'waves',
      },
      {
        title: 'Eksplosive nesleceller (Cnidocytter)',
        description: 'Skyter ut en mikroskopisk giftharpun med en akselerasjon på over 5 millioner G – en av naturens raskeste bevegelser!',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Langs norskekysten finnes verdens største dypvannskorallrev (Røstrevet utenfor Lofoten), bygget av øyekorallen Lophelia pertusa på flere hundre meters dyp!',
    examples: ['Brennmanet og glassmanet', 'Øyekorall og tropiske steinkoraller', 'Sjøanemoner (aktinier)', 'Vaskesvamp og brødsvamp'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'protostomes',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'animals',
    title: 'Protostomer («Førstemunner»)',
    shortLabel: 'Protostomer (~600 ma)',
    latinName: 'Protostomia',
    timeMa: '~600 ma',
    eraLabel: 'Stor hovedgren i dyreriket',
    x: 535,
    y: 1020,
    labelAnchor: 'bottom',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Protostomene samler det overveldende flertallet av alle virvelløse dyrearter på jorda.',
    summaryTitle: 'Tosidig symmetri og bukmarg – opphavet til bløtdyr, mark og leddyr',
    whatHappens:
      'Blant dyr med tosidig symmetri (foran/bak, høyre/venstre) skilte protostomene lag med vår egen deuterostom-linje for ca. 600 millioner år siden. Hos protostomer dannes munnen fra den aller første fosteråpningen, og hovednervestrengen ligger langs buken.',
    keyTraits: [
      {
        title: 'Tosidig symmetri og tydelig hodeende',
        description: 'Sanseorganer og hjerneknuter samles foran i fartsretningen (cefalisering).',
        icon: 'compass',
      },
      {
        title: 'Bukmarg',
        description: 'Sentralnervesystemet løper langs undersiden av kroppen.',
        icon: 'cpu',
      },
    ],
    didYouKnow:
      'Over 90 % av alle nålevende dyrearter på kloden tilhører denne grenen av stamtreet!',
    examples: ['Bløtdyr', 'Leddormer', 'Leddyr (krepsdyr, edderkoppdyr, insekter)', 'Rundormer og bjørnedyr (tardigrader)'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'mollusks',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'protostomes',
    title: 'Bløtdyr',
    shortLabel: 'Bløtdyr',
    latinName: 'Mollusca',
    timeMa: '~550 ma',
    eraLabel: 'Undergren av Protostomer',
    x: 255,
    y: 1015,
    labelAnchor: 'left',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Fra fastsittende blåskjell til kjempeblekkspruter og intelligente åttearmede blekkspruter.',
    summaryTitle: 'Muskuløs fot, kappe og kalkskall',
    whatHappens:
      'Bløtdyr har en myk kropp med en muskuløs fot, raspetunge (radula) og en kappe som ofte skiller ut et vakkert kalkskall. Hos blekksprutene ble foten omdannet til sugekopp-armer og en vannjet-trakt, og de utviklet den mest avanserte hjernen av alle virvelløse dyr!',
    keyTraits: [
      {
        title: 'Kappe og beskyttende kalkskall',
        description: 'To skallhalvdeler hos muslinger, spiralskall hos snegler og tilbakedannet indre skall hos de fleste nålevende blekkspruter.',
        icon: 'shell',
      },
      {
        title: 'Kameraøyne og fargeskifte hos blekksprut',
        description: 'Kan skifte hudfarge og tekstur på brøkdelen av et sekund for kamuflasje og kommunikasjon.',
        icon: 'eye',
      },
    ],
    didYouKnow:
      'Ett enkelt voksent blåskjell i en norsk fjord filtrerer og renser opptil 50–70 liter sjøvann i døgnet!',
    examples: ['Åttearmet blekksprut, akkar og kjempeblekksprut', 'Blåskjell, kamskjell og østers', ' Hagesnegl, vinbergsnegl, brunskogsnegl og nakensnegler'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'annelids',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'protostomes',
    title: 'Leddormer',
    shortLabel: 'Leddormer',
    latinName: 'Annelida',
    timeMa: '~530 ma',
    eraLabel: 'Undergren av Protostomer',
    x: 285,
    y: 895,
    labelAnchor: 'left',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Leddormer har kroppen delt opp i væskefylte ringer som fungerer som et hydraulisk skjelett.',
    summaryTitle: 'Segmenterte jordarbeidere i matjord og havbunn',
    whatHappens:
      'Leddormene bygde kroppen av en lang rekke like ledd (segmenter) fylt med væske under trykk (hydrostatisk skjelett). Med ringmuskler og lengdemuskler i hvert segment graver meitemarken kanaler som lufter og gjødsler matjorda, mens fjæremark og børstemark myldrer i havbunnen.',
    keyTraits: [
      {
        title: 'Leddelt kropp med væskeskjelett',
        description: 'Hvert segment kan trekke seg sammen uavhengig for effektiv graving gjennom jord og sand.',
        icon: 'layers',
      },
      {
        title: 'Lukket blodomløp og hudpust',
        description: 'Frakter oksygen i lukkede blodårer langs hele den langstrakte kroppen.',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'Charles Darwin skrev sin aller siste bok utelukkende om meitemark – han påpekte at uten meitemarkens pløying ville det knapt fantes fruktbar matjord på land!',
    examples: ['Stor meitemark (Lumbricus terrestris)', 'Fjæremark (sandorm)', 'Legeigle / blodigle', 'Rørbyggende børstemark ved dyphavskilder'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'arthropods',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'protostomes',
    title: 'Leddyr: Krepsdyr og edderkoppdyr',
    shortLabel: 'Krepsdyr & edderkopper',
    latinName: 'Arthropoda (Crustacea & Chelicerata)',
    timeMa: '~540 ma',
    eraLabel: 'Undergren av Protostomer',
    x: 455,
    y: 835,
    labelAnchor: 'top',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Ytre rustning av kitin og leddede ekstremiteter gjorde leddyrene til herskere i både hav og på land.',
    summaryTitle: 'Pansrede krepsdyr i havet og åttebeinte jegere på land',
    whatHappens:
      'Leddyrene kombinerer segmentert kropp med et hardt ytre skjelett (eksoskjelett) av kitin og leddede bein. I havet utgjør krepsdyr (som hoppekrepsen raudåte og krill) selve grunnmuren i næringskjeden for fisk og hval, mens edderkoppdyr med åtte bein og klosakser var blant de aller første rovdyrene på land!',
    keyTraits: [
      {
        title: 'Ytre kitinskall og skallskifte',
        description: 'Gir solid pansring og hindrer uttørking på land; byttes ut når dyret vokser.',
        icon: 'shield',
      },
      {
        title: 'Spesialiserte leddbein og fasett-/punktøyne',
        description: 'Omdannet til svømmebein, klør hos hummer og giftklør/spinnvorter hos edderkopper.',
        icon: 'footprints',
      },
    ],
    didYouKnow:
      'Det lille krepsdyret raudåte (Calanus finmarchicus) i Norskehavet utgjør i biomasse mer vekt enn hele Norges befolkning til sammen hundre ganger – og er hovedmaten til sild, makrell og torskeyngel!',
    examples: ['Hummer, taskekrabbe, kongekrabbe og reke', 'Raudåte, krill, rur og skrukketroll', 'Korsedderkopp og ulveedderkopp', 'Skogflått og skorpioner'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'insects',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'arthropods',
    title: 'Insekter',
    shortLabel: 'Insekter (~400 ma)',
    latinName: 'Insecta (Hexapoda)',
    timeMa: '~400 ma',
    eraLabel: 'Undergren av Leddyr',
    x: 245,
    y: 745,
    labelAnchor: 'left',
    image: evoImg('insects.png'),
    imageCaption: 'Humle, dagpåfugløye og skogsmaur – insektene er de første dyrene som utviklet vinger og er klodens mest artsrike gruppe.',
    summaryTitle: 'Seks bein og vinger – over én million kjente arter!',
    whatHappens:
      'Fra krepsdyr-lignende forfedre utviklet insektene tre kroppsavsnitt (hode, bryst, bakkropp), seks bein, luftekanaler (trakeer) og – som de aller første dyrene på jorda – vinger! Fullstendig forvandling (fra larve til puppe til voksen sommerfugl eller humle) lar unger og voksne leve uten å konkurrere om samme mat.',
    keyTraits: [
      {
        title: 'Seks bein og opptil to par vinger',
        description: 'Flygeevnen lot insektene spre seg til alle landøkosystemer over 150 millioner år før fuglene.',
        icon: 'feather',
      },
      {
        title: 'Metamorfose og uerstattelig pollinering',
        description: 'Samlivet med blomsterplantene bærer matproduksjonen og artsmangfoldet på landjorda.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Mer enn halvparten av alle kjente nålevende arter av planter, sopp og dyr til sammen er insekter – og bare i én stor norsk maurtue kan det bo opptil 300 000 røde skogsmaur!',
    examples: ['Mørk jordhumle og honningbie', 'Dagpåfugløye, sitronsommerfugl og blåvinge', 'Rød skogsmaur og stikkveps', 'Syvprikket marihøne, tordivel, øyenstikker og døgnflue'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'echinoderms',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'animals',
    title: 'Pigghuder',
    shortLabel: 'Pigghuder (~520 ma)',
    latinName: 'Echinodermata',
    timeMa: '~520 ma',
    eraLabel: 'Deuterostom søstergren til Virveldyr',
    x: 695,
    y: 955,
    labelAnchor: 'top',
    image: evoImg('cnidarians_echinoderms.png'),
    imageCaption: 'Sjøstjerner (korstroll) og kråkeboller ser fremmedartede ut, men er våre nærmeste virvelløse slektninger blant hovedrekkene!',
    summaryTitle: 'Sjøstjerner og kråkeboller – virveldyrenes overraskende slektning',
    whatHappens:
      'Selv om en voksen sjøstjerne er femtallig symmetrisk og mangler hode, avslører fosterutviklingen og DNA noe oppsiktsvekkende: Pigghudene er deuterostomer («annenhåndsmunner»), akkurat som virveldyrene! Larvene deres er tosidig symmetriske, og de beveger seg ved hjelp av hundrevis av små hydrauliske sugeføtter.',
    keyTraits: [
      {
        title: 'Indre kalkskjelett under huden og pigger',
        description: 'I likhet med virveldyr ligger skjelettplatene inne i vevet, dekket av levende hud.',
        icon: 'shield',
      },
      {
        title: 'Vannkanalsystem med sugeføtter',
        description: 'Pumper sjøvann ut i små rør-føtter som kan åpne et blåskjell med tålmodig, jevn kraft.',
        icon: 'waves',
      },
    ],
    didYouKnow:
      'En sjøstjerne (korstroll) i fjæra er faktisk nærmere i slekt med deg enn en hummer, en bie eller en blekksprut er!',
    examples: ['Vanlig korstroll (sjøstjerne)', 'Rød kråkebolle og grønn kråkebolle', 'Slangestjerner', 'Rødpølse (sjøpølse) og sjøliljer'],
    accentCategory: 'invertebrate',
  },

  // ==========================================
  // STEG 4: VIRVELDYR (450 ma)
  // ==========================================
  {
    id: 'vertebrates',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'animals',
    stepNumber: 4,
    title: 'Virveldyr',
    shortLabel: 'Virveldyr',
    latinName: 'Vertebrata',
    timeMa: '450 ma',
    eraLabel: 'Ordovicium / Silur',
    x: 965,
    y: 1005,
    labelAnchor: 'bottom',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Tidlige kjevefisker, bruskfisker (hai) og beinfisker (ørret) viser styrken ved indre skjelett og ryggrad.',
    summaryTitle: 'Ryggrad, kranium og indre skjelett gir fart og størrelse',
    whatHappens:
      'Langs deuterostom-grenen oppstår virveldyrene i havet for rundt 450 millioner år siden. Et levende indre skjelett som vokser med kroppen erstatter ytre skall! En leddet ryggrad beskytter ryggmargen og gir feste for kraftige svømmemuskler, mens kraniet beskytter hjernen og parrede øyne, nesebor og indre ører.',
    keyTraits: [
      {
        title: 'Ryggrad (Virvelsøyle)',
        description: 'Beskytter ryggmargen på ryggsiden og gir spenst og kraftoverføring til muskulaturen.',
        icon: 'layers',
      },
      {
        title: 'Kranium (Hodeskalle) og kjever',
        description: 'Beskytter en tredelt hjerne, mens kjever utviklet fra fremre gjellebuer åpner for aktivt rovliv.',
        icon: 'shield',
      },
      {
        title: 'Lukket blodomløp med flerkamret hjerte',
        description: 'Effektiv transport av oksygen med røde blodceller fylt med hemoglobin.',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'De aller eldste nålevende virveldyrene – slimål og niøye – mangler fortsatt kjever og har beholdt en kjeveløs sugemunn slik ur-fiskene hadde for 450 millioner år siden!',
    examples: ['Niøye og slimål (kjeveløse fisker)', 'Bruskfisker', 'Beinfisker', 'Alle tetrapoder (amfibier, krypdyr, fugler, pattedyr)'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'cartilaginous_fish',
    stepIndex: 3,
    isMainPath: false,
    parentId: 'vertebrates',
    title: 'Bruskfisker',
    shortLabel: 'Bruskfisker',
    latinName: 'Chondrichthyes',
    timeMa: '~420 ma',
    eraLabel: 'Sidegren fra Virveldyr',
    x: 1240,
    y: 1135,
    labelAnchor: 'right',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Haier og rokker har patruljert verdenshavene med lett bruskskjelett og sylskarpe sanser i over 400 millioner år.',
    summaryTitle: 'Havets strømlinjeformede jegere med bruskskjelett',
    whatHappens:
      'Bruskfiskene har et indre skjelett bygget helt av smidig, lett brusk fremfor tungt beinvev. Uten svømmeblære skaffer haier oppdrift via en stor oljerik lever og brystfinner formet som flyvinger, kombinert med elektroreseptorer i snuten som fanger opp hjerteslagene til skjulte byttedyr.',
    keyTraits: [
      {
        title: 'Lett skjelett av ren brusk',
        description: 'Fleksibelt og støtdempende skjelett uten forbeining.',
        icon: 'waves',
      },
      {
        title: 'Hudtenner og utskiftbare tannrekker',
        description: 'Nye tenner vokser frem som på et rullebånd gjennom hele livet – en hai kan felle 30 000 tenner i løpet av livet!',
        icon: 'shield',
      },
    ],
    didYouKnow:
      'Håkjerringa som lever i dype norske fjorder og Nord-Atlanteren er verdens lengstlevende virveldyr – radiokarbonmålinger viser at enkelte individer er rundt 400 år gamle!',
    examples: ['Pigghå, håbrann og brugde (i norske farvann)', 'Håkjerring', 'Hvithai og hammerhai', 'Piggrokke, kloskate og djevelrokke'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'bony_fish',
    stepIndex: 3,
    isMainPath: false,
    parentId: 'vertebrates',
    title: 'Beinfisker',
    shortLabel: 'Beinfisker',
    latinName: 'Osteichthyes',
    timeMa: '~410 ma',
    eraLabel: 'Sidegren fra Virveldyr',
    x: 1295,
    y: 1005,
    labelAnchor: 'right',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Beinfisker dominerer elver, innsjøer og verdenshav med ekte beinskjelett, gjellelokk og svømmeblære.',
    summaryTitle: 'Forbeinet skjelett og svømmeblære – over 30 000 nålevende arter',
    whatHappens:
      'Beinfiskene forsterket skjelettet med kalsiumfosfat (beinvev), fikk bevegelig gjellelokk og utviklet en gassfylt luftlomme fra svelget: Hos strålefinnede fisker ble denne til svømmeblæren for vektløs oppdrift, mens hos kvastfinnefisker og lungefisker fungerte den som lunge og pekte frem mot landdyrene!',
    keyTraits: [
      {
        title: 'Svømmeblære og manøvrerbare finnestråler',
        description: 'Lar fisken stå helt vektløs i vannet og finmanøvrere mellom tareskog og koraller.',
        icon: 'waves',
      },
      {
        title: 'Gjellelokk og sidelinjeorgan',
        description: 'Sidelinjen registrerer selv ørsmå trykkbølger og bevegelser fra stimen omkring.',
        icon: 'wind',
      },
    ],
    didYouKnow:
      'En stor skrei (norsk-arktisk torsk) gyter opptil 4–5 millioner egg i Lofoten på én sesong – et klassisk eksempel på r-strategi i havet!',
    examples: ['Atlanterhavslaks, sjøørret og røye', 'Torsk (skrei), hyse, sei, sild og makrell', 'Gjedde og abbor', 'Klovnefisk, havhest, ål og blåfisk (kvastfinnefisk)'],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // STEG 5: TETRAPODER (375 ma)
  // ==========================================
  {
    id: 'tetrapods',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'vertebrates',
    stepNumber: 5,
    title: 'Tetrapoder',
    shortLabel: 'Tetrapoder',
    latinName: 'Tetrapoda',
    timeMa: '375 ma',
    eraLabel: 'Devon – Livet går på land',
    x: 1195,
    y: 825,
    labelAnchor: 'bottom',
    image: evoImg('tetrapods.png'),
    imageCaption: 'Overgangsformen Tiktaalik (375 ma) med muskuløse brystfinner, håndledd, fri nakke og lunger på grunt vann.',
    summaryTitle: 'Finner blir til fire bein – virveldyrene erobrer landjorda',
    whatHappens:
      'I grunne, planterike elvedeltaer i devontiden brukte kvastfinnefisker med lunger de muskuløse finnene sine til å ta spenntak mot bunnen og løfte hodet opp i lufta. Fossilet Tiktaalik (375 ma) viser overgangen i minste detalj: Inne i finnen lå én overarmsknokkel, to underarmsknokler og håndledd – grunnmønsteret for lemmene til alle amfibier, krypdyr, fugler og pattedyr!',
    keyTraits: [
      {
        title: 'Fire bærende lemmer med fingre/tær',
        description: 'Bekken og skulderbelte forankres til ryggraden for å bære kroppsvekten uten vannets oppdrift.',
        icon: 'footprints',
      },
      {
        title: 'Lunger og dobbelt blodomløp',
        description: 'Eget lungekretsløp og kroppskretsløp gir rask oksygentilførsel til musklene på land.',
        icon: 'wind',
      },
      {
        title: 'Bevegelig nakke og mellomøre',
        description: 'Fiskens gjellebueknokkel (hyomandibula) bygges om til stigbøylen i øret for å høre lydbølger i luft!',
        icon: 'compass',
      },
    ],
    didYouKnow:
      'Når du bøyer albuen og håndleddet ditt i dag, bruker du nøyaktig det samme knokkeloppsettet som Tiktaalik støttet seg på i devontidens gjørme for 375 millioner år siden!',
    examples: ['Tiktaalik og Ichthyostega (fossile overgangsformer)', 'Amfibier', 'Krypdyr og fugler', 'Pattedyr'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'amphibians',
    stepIndex: 4,
    isMainPath: false,
    parentId: 'tetrapods',
    title: 'Amfibier',
    shortLabel: 'Amfibier',
    latinName: 'Amphibia',
    timeMa: '~360 ma',
    eraLabel: 'Sidegren fra Tetrapoder',
    x: 915,
    y: 725,
    labelAnchor: 'bottom',
    image: evoImg('tetrapods.png'),
    imageCaption: 'Amfibiene lever et dobbeltliv mellom ferskvann og land, med hudpust og metamorfose fra rumpetroll.',
    summaryTitle: 'Det evolusjonære dobbeltlivet mellom vann og land',
    whatHappens:
      'Amfibiene var de første virveldyrene på land, men beholdt båndet til ferskvann ved formering: De skalløse geléeggene legges i dammer og klekkes til rumpetroll med gjeller og svømmehale før de utvikler bein og lunger under metamorfosen.',
    keyTraits: [
      {
        title: 'Egg uten skall i vann og metamorfose',
        description: 'Tydelig livssyklus fra vannlevende larve til landlevende voksen.',
        icon: 'waves',
      },
      {
        title: 'Fuktig, kjertelrik hud med hudpust',
        description: 'Gassutveksling skjer både gjennom lungene og direkte gjennom den tynne huden.',
        icon: 'wind',
      },
    ],
    didYouKnow:
      'Den meksikanske salamanderen axolotl beholder barndommens utvendige fjærgjeller hele livet og kan til og med gro ut nye bein, kjevebiter og deler av hjertet hvis den skades!',
    examples: ['Buttsnutefrosk, spissnutefrosk og damfrosk', 'Nordpadde (vanlig padde)', 'Storsalamander og småsalamander', ' Tropiske pilgiftfrosker og axolotl'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'reptiles_birds',
    stepIndex: 4,
    isMainPath: false,
    parentId: 'tetrapods',
    title: 'Sauropsider: Krypdyr og fugler',
    shortLabel: 'Krypdyr & fugler (~315 ma)',
    latinName: 'Sauropsida',
    timeMa: '~315 ma',
    eraLabel: 'Amniot sidegren fra Tetrapoder',
    x: 1045,
    y: 610,
    labelAnchor: 'top',
    image: evoImg('reptiles_birds.png'),
    imageCaption: 'Skallegget og vanntett hud lot sauropsidene innta tørre innland og utvikle både krypdyr, dinosaurer og fugler.',
    summaryTitle: 'Skallegget bryter avhengigheten av vann',
    whatHappens:
      'Utviklingen av det amniote skallegget – med fosterhinnen amnion som omslutter fosteret i sin egen vesle «dam» inne i egget – gjorde landvirveldyrene helt uavhengige av ferskvann for å formere seg! Fra denne grenen vokste både skjellkledde krypdyr, havøgler, flygeøgler, dinosaurer og fugler frem.',
    keyTraits: [
      {
        title: 'Amniot skallegg med fosterhinner og plommesekk',
        description: 'Slipper oksygen inn og CO₂ ut gjennom skallet, samtidig som vannet holdes på innsiden.',
        icon: 'shield',
      },
      {
        title: 'Vanntett hud med keratin',
        description: 'Skjell (og senere fjær) hindrer uttørking i solfylte og tørre habitater.',
        icon: 'layers',
      },
    ],
    didYouKnow:
      ' Både pattedyr, krypdyr og fugler tilhører gruppen «amnioter» – hos morkakedyr finnes fortsatt de nøyaktig samme fosterhinnene (som fostervannsekken!) inne i livmoren!',
    examples: ['Skilpadder', 'Øgler og slanger', 'Krokodiller', 'Dinosaurer og alle fugler'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'lizards_turtles',
    stepIndex: 4,
    isMainPath: false,
    parentId: 'reptiles_birds',
    title: 'Øgler, slanger og skilpadder',
    shortLabel: 'Øgler, slanger & skilpadder',
    latinName: 'Lepidosauria & Testudines',
    timeMa: '~280 ma',
    eraLabel: 'Undergren av Krypdyr',
    x: 765,
    y: 575,
    labelAnchor: 'left',
    image: evoImg('reptiles_birds.png'),
    imageCaption: 'Vekselvarme krypdyr bruker solenergi direkte til å varme kroppen og klarer seg med svært lite mat.',
    summaryTitle: 'Skjellkledde soltilbedere og smidige jegere',
    whatHappens:
      'Øgler, slanger og skilpadder er vekselvarme (ektoterme): De varmer seg i sola i stedet for å forbrenne mat for å holde kroppstemperaturen oppe, og kan derfor klare seg ukevis uten føde! Norske arter som nordfirfisle og hoggorm løser det kalde klimaet ved å føde levende unger (eggene klekkes inne i morens kropp).',
    keyTraits: [
      {
        title: 'Vekselvarme med lavt energibehov',
        description: 'Trenger bare omtrent tiendedelen så mye mat som et jevnvarmt pattedyr med samme vekt.',
        icon: 'flame',
      },
      {
        title: 'Beinpanser hos skilpadder og luktesans på tunga hos slanger',
        description: 'Skilpaddens ribbein er vokst sammen til et skall, mens slanger «smaker» luftmolekyler med kløftet tunge.',
        icon: 'shield',
      },
    ],
    didYouKnow:
      'Stålormen som finnes i Sør-Norge er slett ingen slange, men en beinløs øgle – den har både øyelokk som kan blunke og evnen til å slippe halen hvis en rev griper tak i den!',
    examples: ['Hoggorm, buorm og slettsnok', 'Nordfirfisle og stålorm', 'Komodovaran, gekko og kameleon', 'Suppeskilpadde, havlærskilpadde og gresk landskilpadde'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'dinosaurs_birds',
    stepIndex: 4,
    isMainPath: false,
    parentId: 'reptiles_birds',
    title: 'Krokodiller, dinosaurer og fugler',
    shortLabel: 'Dinosaurer & fugler (~150 ma)',
    latinName: 'Archosauria (Crocodylia, Dinosauria & Aves)',
    timeMa: '~240–150 ma',
    eraLabel: 'Undergren av Krypdyr og fugler',
    x: 885,
    y: 455,
    labelAnchor: 'top',
    image: evoImg('reptiles_birds.png'),
    imageCaption: 'Fra fjærkledde rovdinosaurer som Archaeopteryx utviklet fuglene seg til over 11 000 nålevende arter!',
    summaryTitle: 'Dinosaurene døde ikke helt ut – de synger utenfor vinduet ditt!',
    whatHappens:
      'Arkosaur-grenen omfatter krokodiller, flygeøgler og dinosaurer. Mange tobente rovdinosaurer (theropoder) var varmblodige og kledd i fjær til isolasjon og oppvisning. For ca. 150 millioner år siden (Archaeopteryx) ga disse fjærene og hule knoklene opphav til fuglene – den eneste dinosaur-gruppen som overlevde asteroidenedslaget for 66 ma!',
    keyTraits: [
      {
        title: 'Fjærdrakt, hule knokler og varmblodighet',
        description: 'Ekstremt lett skjelett kombinert med luftsekker ved lungene som gir oksygen både på innpust og utpust!',
        icon: 'feather',
      },
      {
        title: 'Nebb uten tenner og sterk foreldreomsorg',
        description: 'Både krokodiller og fugler vokter reir og passer på ungene etter klekking.',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'Krokodiller har firekamret hjerte akkurat som fugler og pattedyr – og er genetisk nærmere i slekt med en blåmeis enn med en firfisle!',
    examples: ['Kongeørn, havørn og vandrefalk', 'Kjøttmeis, rødstrupe, ravn og skjære', 'Lunde (sjøpapegøye), ærfugl og keiserpingvin', 'Nilkrokodille, alligator og fossile dinosaurer (T. rex)'],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // STEG 6: PATTEDYR (178 ma)
  // ==========================================
  {
    id: 'mammals',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'tetrapods',
    stepNumber: 6,
    title: 'Pattedyr',
    shortLabel: 'Pattedyr',
    latinName: 'Mammalia',
    timeMa: '178 ma',
    eraLabel: 'Jura – Nattaktive pionerer',
    x: 1430,
    y: 665,
    labelAnchor: 'bottom',
    image: evoImg('mammals.png'),
    imageCaption: 'Tidlig spissmus-lignende pattedyr i skogbunnen som varmer og ammer ungene sine i ly av natten.',
    summaryTitle: 'Varmblodighet, isolerende pels og livgivende morsmelk',
    whatHappens:
      'Mens store dinosaurer dominerte dagtiden i jura, utviklet vår amniot-linje (synapsidene) seg til små, raske og nattaktive pattedyr for rundt 178 millioner år siden. For å holde seg aktive i kjølige netter utviklet de varmblodighet og pels, sylskarp hørsel med tre ørebein, differensierte tenner og melkekjertler med tett omsorg for ungene.',
    keyTraits: [
      {
        title: 'Varmblodige (Endoterme / jevnvarme)',
        description: 'Holder stabil indre kroppstemperatur (~37 °C) i både nattemørke og polarvinter.',
        icon: 'flame',
      },
      {
        title: 'Hår / pels og tre mellomørebein',
        description: 'Pelsen isolerer mot varmetap, mens hammeren, ambolten og stigbøylen forsterker svake lyder.',
        icon: 'layers',
      },
      {
        title: 'Melkekjertler og amming',
        description: 'Alle pattedyr gir ungene næringsrik melk – grunnlaget for trygg vekst og sosial læring.',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'Pattedyrene utviklet et sett med spesialiserte tenner (fortenner, hjørnetenner og jeksler) som bare skiftes én gang (melketenner -> voksentenner), slik at over- og underkjeven passer presist sammen når maten tygges!',
    examples: ['Kloakkdyr (nebbdyr og maurpiggsvin)', 'Pungdyr', 'Morkakedyr'],
    accentCategory: 'mammal',
  },
  {
    id: 'monotremes',
    stepIndex: 5,
    isMainPath: false,
    parentId: 'mammals',
    title: 'Kloakkdyr (Eggleggende pattedyr)',
    shortLabel: 'Kloakkdyr (Nebbdyr)',
    latinName: 'Monotremata',
    timeMa: '~166 ma',
    eraLabel: 'Eldste sidegren blant nålevende pattedyr',
    x: 1695,
    y: 805,
    labelAnchor: 'right',
    image: evoImg('monotremes_marsupials.png'),
    imageCaption: 'Nebbdyret i Australia har beholdt eggleggingen fra ur-pattedyrene, men har pels og gir melk til ungene!',
    summaryTitle: 'Pattedyr som legger egg og svetter ut melk',
    whatHappens:
      'Kloakkdyrene er den aller eldste nålevende grenen av pattedyr og lever kun i Australia og på Ny-Guinea. De har pels, er varmblodige og mater ungene med melk – men i stedet for å føde levende unger legger de læraktige egg som klekkes etter ca. ti dager! Melken har ingen brystvorter, men siles ut på bukskinnet så ungene slikker den i seg.',
    keyTraits: [
      {
        title: 'Kombinerer krypdyr-egg med ekte pattedyr-melk',
        description: 'Et levende bevis på den trinnvise evolusjonære overgangen fra eggleggende amnioter til pattedyr!',
        icon: 'heart',
      },
      {
        title: 'Elektrosans i nebbet hos nebbdyr',
        description: 'Nebbdyret lukker øyne og ører under vann og finner krepsdyr på elvebunnen ved å sanse muskel-elektrisitet.',
        icon: 'waves',
      },
    ],
    didYouKnow:
      'Da britiske naturforskere fikk tilsendt det første utstoppede nebbdyret fra Australia i 1799, trodde de det var en spøk der noen hadde sydd et andenebb fast på en bever – og nebbdyr-hannen har til og med en giftig spore på bakbeinet!',
    examples: ['Nebbdyr (Ornithorhynchus anatinus)', 'Kortnebbet maurpiggsvin', 'Langnebbet maurpiggsvin'],
    accentCategory: 'mammal',
  },
  {
    id: 'marsupials',
    stepIndex: 5,
    isMainPath: false,
    parentId: 'mammals',
    title: 'Pungdyr',
    shortLabel: 'Pungdyr',
    latinName: 'Marsupialia',
    timeMa: '~160 ma',
    eraLabel: 'Sidegren fra Pattedyr',
    x: 1735,
    y: 680,
    labelAnchor: 'right',
    image: evoImg('monotremes_marsupials.png'),
    imageCaption: 'Kenguru med unge (joey) i pungen – pungdyrene fylte nesten alle økologiske nisjer på det isolerte australske kontinentet.',
    summaryTitle: 'Kort drektighet og lang oppvekst i mors pung',
    whatHappens:
      'Pungdyrene føder levende unger, men uten en fullverdig morkake blir svangerskapet svært kort (ofte bare 2–5 uker). Den bønne-store, blinde ungen kravler selv opp i morens pung (marsupium), suger seg fast til en melkevorte og fullfører fosterutviklingen trygt der inne.',
    keyTraits: [
      {
        title: 'Utvikling i pung fremfor lang tid i livmor',
        description: 'Lar kengurumoren bli drektig på nytt mens forrige unge ennå bor i pungen og kan produsere to ulike typer melk samtidig!',
        icon: 'heart',
      },
      {
        title: 'Konvergent evolusjon i Australia og Sør-Amerika',
        description: 'Utviklet egne pung-ulver, pung-muldvarper og flygepungekorn som ligner morkakedyr.',
        icon: 'footprints',
      },
    ],
    didYouKnow:
      'Vombaten i Australia har en bakovervendt pung (så det ikke kommer jord inn når den graver) – og den er det eneste kjente dyret i verden som bæsjer firkantede terninger!',
    examples: ['Rød kjempekenguru og wallaby', 'Koala og vombat', 'Tasmansk djevel', 'Nordamerikansk pungrotte (opossum) og korthalet dvergpungrotte'],
    accentCategory: 'mammal',
  },

  // ==========================================
  // STEG 7: MORKAKEDYR (161 ma)
  // ==========================================
  {
    id: 'placentals',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'mammals',
    stepNumber: 7,
    title: 'Morkakedyr',
    shortLabel: 'Morkakedyr',
    latinName: 'Placentalia (Eutheria)',
    timeMa: '161 ma',
    eraLabel: 'Sen Jura / Eksplosiv stråling etter 66 ma',
    x: 1665,
    y: 500,
    labelAnchor: 'bottom',
    image: evoImg('placentals.png'),
    imageCaption: 'Etter at dinosaurene døde ut fylte morkakedyrene alle nisjer: rovdyr, beitedyr på land, flaggermus i lufta og hvaler i havet.',
    summaryTitle: 'Morkaken gir lang, beskyttet fosterutvikling i livmoren',
    whatHappens:
      'Morkakedyrene utviklet morkaken (placenta) som kobler mor og foster via navlestrengen slik at fosteret kan vokse lenge og trygt inne i livmoren. Da asteroidenedslaget for 66 millioner år siden utryddet de store dinosaurene, opplevde morkakedyrene en enorm adaptiv stråling og inntok skoger, sletter, luftrommet og verdenshavene!',
    keyTraits: [
      {
        title: 'Morkake (Placenta) og navlestreng',
        description: 'Overfører oksygen, næring og antistoffer fra mor til foster uten at blodbanene blandes.',
        icon: 'heart',
      },
      {
        title: 'Høyt utviklet avkom ved fødsel (K-strategi)',
        description: 'Gir avkommet et enormt forsprang i overlevelse og mulighet for stor hjernevekst.',
        icon: 'shield',
      },
      {
        title: '94 % av alle nålevende pattedyrarter',
        description: 'Fra knøttsmå dvergspissmus og flaggermus til elg, ulv, elefant, blåhval og menneske.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'En nyfødt elgkalv eller reinsdyrkalv kan reise seg på beina få minutter etter fødselen og løpe fra rovdyr allerede neste dag – takket være lang modning med morkake i livmoren!',
    examples: ['Elefanter og sjøkuer', 'Gnagere og haredyr', 'Flaggermus', 'Rovdyr', 'Hovdyr', 'Klovdyr og hvaler', 'Primater'],
    accentCategory: 'mammal',
  },
  {
    id: 'elephants_sirenians',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Elefanter og sjøkuer (Afrotheria)',
    shortLabel: 'Elefanter & sjøkuer',
    latinName: 'Afrotheria (Proboscidea & Sirenia)',
    timeMa: '~60 ma',
    eraLabel: 'Afrikansk sidegren fra Morkakedyr',
    x: 1315,
    y: 470,
    labelAnchor: 'left',
    image: evoImg('placentals.png'),
    imageCaption: 'På det afrikanske kontinentet utviklet en egen gren av morkakedyr både jordas største landdyr og fredelige sjøkuer.',
    summaryTitle: 'Kjemper med lang drektighet, sterkt minne og familiesamhold',
    whatHappens:
      'Afrotheria er en eldgammel gruppe morkakedyr som utviklet seg i Afrika da kontinentet var omgitt av hav. Her finner vi elefantene – de største nålevende landdyrene med gripe-snabel, støttenner og matriarkalske familiegrupper – samt deres overraskende nære slektninger: planteetende sjøkuer (manater og dugonger) og fjellgrevlinger!',
    keyTraits: [
      {
        title: '22 måneders drektighet – lengst av alle pattedyr',
        description: 'Ekstrem K-strategi der hele flokken av hunner beskytter og lærer opp kalven i årevis.',
        icon: 'heart',
      },
      {
        title: 'Muskuløs snabel med over 40 000 muskelfibre',
        description: 'Fungerer både som følsom hånd, snorkel, lukteorgan og sosialt kommunikasjonsredskap.',
        icon: 'brain',
      },
    ],
    didYouKnow:
      'Nærmeste nålevende slektning til den 6 tonn tunge elefanten er den lille, kaninstore klippegrevlingen (damanen) og den vannlevende sjøkua!',
    examples: ['Afrikansk savanneelefant og skogselefant', 'Asiatisk elefant', 'Ullhåret mammut (utdødd)', 'Manat og dugong (sjøkuer)', 'Klippegrevling og jordsvin'],
    accentCategory: 'mammal',
  },
  {
    id: 'rodents',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Gnagere og haredyr',
    shortLabel: 'Gnagere & haredyr',
    latinName: 'Glires (Rodentia & Lagomorpha)',
    timeMa: '~62 ma',
    eraLabel: 'Sidegren fra Morkakedyr (nær primatene)',
    x: 1365,
    y: 350,
    labelAnchor: 'left',
    image: evoImg('mammals.png'),
    imageCaption: 'Gnagere og haredyr utgjør nesten halvparten av alle pattedyrarter og er nøkkelarter i norsk skog og høyfjell.',
    summaryTitle: 'Selvslipende gnagertenner og drivkraften i norske smågnagerår',
    whatHappens:
      'Gnagere og haredyr (Glires) har rotåpne fortenner med hard emalje på forsiden som vokser hele livet og holder seg sylskarpe når de gnager bark, frø og gress. I norsk natur styrer svingningene i lemen- og musebestandene hekke- og ynglesuksessen til fjellrev, snøugle og rovfugler!',
    keyTraits: [
      {
        title: 'Evigvoksende meisel-fortenner',
        description: 'Lar beveren felle store ospetrær og ekornet åpne harde grankongler.',
        icon: 'sparkles',
      },
      {
        title: 'Nært slektskap med primat-linjen (Euarchontoglires)',
        description: 'Genomstudier viser at gnagere og harer er vår nærmeste store nabogren blant morkakedyrene!',
        icon: 'dna',
      },
    ],
    didYouKnow:
      'Beverens fortenner er oransje fordi tannemaljen er forsterket med jern – det gjør tennene ekstra motstandsdyktige når den gnager tømmer til demningene sine!',
    examples: ['Ekorn, bever og hasselmus', 'Fjellemen, klatremus, markmus og brunrotte', 'Hare (fjellhare) og sørhare', 'Kapybara (flodsvin), marsvin og murmeldyr'],
    accentCategory: 'mammal',
  },
  {
    id: 'bats',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Flaggermus',
    shortLabel: 'Flaggermus (~52 ma)',
    latinName: 'Chiroptera',
    timeMa: '~52 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1485,
    y: 240,
    labelAnchor: 'left',
    image: evoImg('mammals.png'),
    imageCaption: 'Flaggermusene forlenget fingrene med elastisk flygehud og er de eneste pattedyrene med ekte aktiv flygeevne.',
    summaryTitle: 'Nattens flygende pattedyr med biologisk sonar',
    whatHappens:
      'Flaggermusene omdannet forlemmene til vinger ved at de fire fingrene (unntatt tommelen!) ble sterkt forlenget og spent opp med tynn, elastisk flygehud. Ved hjelp av høyfrekvente ultralyd-rop og ekko (ekkolokalisering) kan en norsk nordflaggermus fange en mygg i stupmørke!',
    keyTraits: [
      {
        title: 'Ekte vinger spent ut mellom fingrene',
        description: 'Chiroptera betyr bokstavelig talt «hånd-vinger» – gir ekstrem manøvreringsevne i lufta.',
        icon: 'feather',
      },
      {
        title: 'Ekkolokalisering med ultralyd',
        description: 'Tegner et lydbilde av omgivelsene og insekter i flukt med millimeterpresisjon.',
        icon: 'wind',
      },
    ],
    didYouKnow:
      'Hver femte pattedyrart på jorda er en flaggermus (over 1400 arter!), og en enkelt dvergflaggermus kan spise opptil 3000 mygg og knott på én sommer-natt!',
    examples: ['Nordflaggermus (vanligst i Norge)', 'Vannflaggermus, dvergflaggermus og brunlangøre', 'Tropiske flygehunder (fruktflaggermus)'],
    accentCategory: 'mammal',
  },
  {
    id: 'carnivores',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Rovdyr',
    shortLabel: 'Rovdyr',
    latinName: 'Carnivora',
    timeMa: '~60 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1635,
    y: 155,
    labelAnchor: 'top',
    image: evoImg('placentals.png'),
    imageCaption: 'Ulv, fjellrev, bjørn, gaupe og seler tilhører alle ordenen Rovdyr (Carnivora).',
    summaryTitle: 'Skarpe rovtann-sakser på land og svømmeføtter på isflak',
    whatHappens:
      'Ordenen Rovdyr kjennetegnes av rovtenner som klipper kjøtt og sener som en saks, skarpe sanser og høy intelligens. Gruppen er delt i en kattelignende gren (gaupe, løve, tiger) og en hundelignende gren (ulv, rev, bjørn, mårdyr – samt selene, som tilpasset seg havet med luffer og spekklag!).',
    keyTraits: [
      {
        title: 'Rovtenner og kraftige hjørnetenner',
        description: 'Skreddersydd tannsett for effektiv jakt og partering av byttedyr.',
        icon: 'shield',
      },
      {
        title: 'Topprovdyr som holder økosystemene i balanse',
        description: 'Regulerer beitedyrbestander og hindrer overbeiting.',
        icon: 'eye',
      },
    ],
    didYouKnow:
      'Norske seler som steinkobbe, havert og hvalross har bjørne- og mår-lignende landrovdyr som sine nærmeste slektninger!',
    examples: ['Ulv, fjellrev og rødrev', 'Brunbjørn og isbjørn', 'Gaupe, løve, tiger og gepard', 'Jerv, grevling, oter og røyskatt', 'Steinkobbe, havert (gråsel) og hvalross'],
    accentCategory: 'mammal',
  },
  {
    id: 'odd_toed_ungulates',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Hovdyr (Upartåede)',
    shortLabel: 'Hovdyr',
    latinName: 'Perissodactyla',
    timeMa: '~56 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1955,
    y: 575,
    labelAnchor: 'bottom',
    image: evoImg('placentals.png'),
    imageCaption: 'Hester og sebraer bærer kroppsvekten på den midterste tåen omsluttet av en slitesterk hov.',
    summaryTitle: 'Utholdende steppeløpere på midttåen',
    whatHappens:
      'Upartåede hovdyr bærer vekten på én kraftig midttå (hestefamilien) eller tre tær (neshorn og tapirer). Lange mellomfotsknokler og elastiske sener fungerer som stålfjærer som sparer enormt med energi under galopp over åpne gressletter.',
    keyTraits: [
      {
        title: 'Vektakse gjennom midterste tå (tå nr. 3)',
        description: 'Hoven er en kraftig forhornet negl som tåler stor fart på hardt underlag.',
        icon: 'footprints',
      },
      {
        title: 'Høye gressjeksler og blindtarmsgjæring',
        description: 'Mikrober i blindtarmen og tykktarmen bryter ned tungt fordøyelig cellulose i gress.',
        icon: 'leaf',
      },
    ],
    didYouKnow:
      'Fjordhesten stammer fra ville hester som ble temmet på de eurasiske steppene for over 4000 år siden – og på innsiden av beinet har hesten fortsatt tynne «griffelbein» som minner om de tapte sidetærne!',
    examples: ['Fjordhest, dølahest og przewalskihest (villhest)', 'Steppesebra', 'Hvitt og svart neshorn', 'Sør-amerikansk tapir'],
    accentCategory: 'mammal',
  },
  {
    id: 'even_toed_whales',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Klovdyr (Partåede)',
    shortLabel: 'Klovdyr (~55 ma)',
    latinName: 'Artiodactyla (Cetartiodactyla)',
    timeMa: '~55 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1985,
    y: 455,
    labelAnchor: 'top',
    image: evoImg('placentals.png'),
    imageCaption: 'Hjortedyr, storfe, villrein og flodhest tilhører klovdyrene – gruppen som også ga opphav til hvalene!',
    summaryTitle: 'Drøvtyggere på to klover – skogens og vidddas store planteetere',
    whatHappens:
      'Klovdyrene fordeler vekten symmetrisk mellom to hovedtær (tå nr. 3 og 4), noe som gir suverent fotfeste i ulendt skog, snø, myr og bratt fjell. Utviklingen av firedelt drøvtyggermage (med vom fylt av cellulose-spaltende mikrober) gjorde dem til de mest suksessrike store planteeterne på jorda!',
    keyTraits: [
      {
        title: 'To bærende klover gir stødig grep',
        description: 'Hos villrein spriker klovene bredt ut som truger på snø og bløtmyr.',
        icon: 'footprints',
      },
      {
        title: 'Drøvtygging med fire mager',
        description: 'Lar hjort og elg raskt beite i seg store mengder løv og gress, og tygge maten ferdig i skjul for rovdyr.',
        icon: 'leaf',
      },
    ],
    didYouKnow:
      'Norge har et internasjonalt spesialansvar for den europeiske villreinen på Hardangervidda og i Rondane – dens klover skifter til og med form fra myke puter om sommeren til skarpe iskanter om vinteren!',
    examples: ['Elg, hjort, rådyr og villrein', 'Moskusfe, storfe, sau og geit', 'Villsvin og gris', 'Sjiraff, kamel, lama og flodhest'],
    accentCategory: 'mammal',
  },
  {
    id: 'whales_dolphins',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'even_toed_whales',
    title: 'Hvaler og delfiner',
    shortLabel: 'Hvaler & delfiner (~50 ma)',
    latinName: 'Cetacea',
    timeMa: '~50 ma',
    eraLabel: 'Vannlevende undergren av Klovdyr!',
    x: 2265,
    y: 470,
    labelAnchor: 'right',
    image: evoImg('whales.png'),
    imageCaption: 'Knølhval med kalv og spekkhoggere – etterkommere av firbeinte klovdyr som vendte tilbake til verdenshavene!',
    summaryTitle: 'Da klovdyrene gikk tilbake i havet og ble jordas største dyr',
    whatHappens:
      'For rundt 50 millioner år siden begynte et ulvestort, vadende klovdyr (Pakicetus – nær slektning av flodhesten!) å jakte fisk i grunne elvemunninger. Over millioner av år ble forbeina til styreluffer, bakbeina forsvant, halen fikk vannrett halefinne og neseborene vandret opp på toppen av hodet som blåsehull. Likevel er hvalene ekte morkakedyr som puster luft med lunger og ammer kalven med fet melk under vann!',
    keyTraits: [
      {
        title: 'Lunger, varmblodighet, spekklag og melk i havet',
        description: 'Beveger ryggraden opp-og-ned når de svømmer (et tydelig pattedyr-trekk!), i motsetning til fisk som vrikker fra side til side.',
        icon: 'waves',
      },
      {
        title: 'Barder hos storhval og ekkolokalisering hos tannhval',
        description: 'Blåhvalen siler tonn på tonn med krill gjennom barder, mens spekkhogger og nise jakter med sonar og flokksamarbeid.',
        icon: 'brain',
      },
    ],
    didYouKnow:
      'Blåhvalen (opptil 30 meter lang og 150+ tonn) er det største dyret som NOENSINNE har levd på jorda – større enn selv de største sauropod-dinosaurene – og hjertet dens er på størrelse med en liten bil!',
    examples: ['Blåhval, knølhval, finnhval og vågehval (bardehvaler)', 'Spekkhogger, tumler, kvitskjeving og nise (delfiner/niser)', 'Spermhval, grindhval, hvithval og narhval'],
    accentCategory: 'mammal',
  },

  // ==========================================
  // STEG 8: PRIMATER (55 ma)
  // ==========================================
  {
    id: 'primates',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'placentals',
    stepNumber: 8,
    title: 'Primater',
    shortLabel: 'Primater',
    latinName: 'Primates',
    timeMa: '55 ma',
    eraLabel: 'Eocen – Livet i trekronene',
    x: 1900,
    y: 335,
    labelAnchor: 'bottom',
    image: evoImg('primates.png'),
    imageCaption: 'Primater i tropisk regnskog med gripehender, negler og fremoverrettede øyne for presise hopp i trekronene.',
    summaryTitle: 'Skapt for et tredimensjonalt liv høyt i trærne',
    whatHappens:
      'I varme regnskoger for rundt 55 millioner år siden tilpasset en gren av morkakedyr seg et klatrende liv på tynne grener etter frukt, blader og insekter. Dette krevde presist grep og avstandsbedømming – og ga oss gripehender med motstilt tommel, flate negler, stereosyn (dybdesyn) og en stor, sosial hjerne.',
    keyTraits: [
      {
        title: 'Gripehender med motstilt tommel og flate negler',
        description: 'Negler støtter følsomme fingerputer for sikkert grep om grener og finmotorisk håndtering av mat.',
        icon: 'hand',
      },
      {
        title: 'Fremoverrettede øyne (Stereosyn) og fargesyn',
        description: 'Overlappende synsfelt gir nøyaktig 3D-dybdesyn når man hopper fra gren til gren.',
        icon: 'eye',
      },
      {
        title: 'Stor hjerne og lang sosial barndom',
        description: 'Få unger som bæres av mor og lærer flokkens sosiale koder og mattradisjoner.',
        icon: 'brain',
      },
    ],
    didYouKnow:
      'Fingeravtrykkene (hudlistene) på fingertuppene dine er et eldgammelt primat-trekk som øker friksjonen når man griper glatte, regnvåte grener i regnskogen!',
    examples: ['Halvaper (lemurer og lorier)', 'Vestaper og østaper (aper med hale)', 'Menneskeaper og mennesket'],
    accentCategory: 'human',
  },
  {
    id: 'prosimians',
    stepIndex: 7,
    isMainPath: false,
    parentId: 'primates',
    title: 'Halvaper (Lemurer og lorier)',
    shortLabel: 'Halvaper (Lemurer)',
    latinName: 'Strepsirrhini & Tarsiiformes',
    timeMa: '~50 ma',
    eraLabel: 'Tidlig sidegren innen Primater',
    x: 1805,
    y: 175,
    labelAnchor: 'left',
    image: evoImg('primates.png'),
    imageCaption: 'Ringhalelemurer på Madagaskar har beholdt flere trekk fra de tidligste primatene, inkludert god luktesans og lang balansehale.',
    summaryTitle: 'Madagaskars spretne soltilbedere og nattjegere med kjempeøyne',
    whatHappens:
      'Halvapene skilte lag tidlig i primatenes historie. Da øya Madagaskar lå isolert fra resten av Afrika, utviklet lemurene seg der til over 100 unike arter – fra musestille nattaktive dverglemurer til syngende indrier og flokklevende ringhalelemurer ledet av hunner!',
    keyTraits: [
      {
        title: 'Fuktig snute og skarpere luktesans enn andre primater',
        description: 'Kommuniserer aktivt med duftmarkeringer i tillegg til lyder og kroppsspråk.',
        icon: 'eye',
      },
      {
        title: 'Gripehender og kraftige springbein',
        description: 'Kan gjøre meterlange spensthopp fra trestamme til trestamme.',
        icon: 'hand',
      },
    ],
    didYouKnow:
      'Spøkelsesapen (tarsieren) i Sørøst-Asia har så enorme nattøyne at hvert enkelt øye er større og tyngre enn hele hjernen dens!',
    examples: ['Ringhalelemur, indri og sifaka', 'Fingerdyr (aye-aye) og dverglemur', 'Dovenlori og galago (bushbaby)', 'Spøkelsesaper'],
    accentCategory: 'human',
  },
  {
    id: 'monkeys',
    stepIndex: 7,
    isMainPath: false,
    parentId: 'primates',
    title: 'Vestaper og østaper (Aper med hale)',
    shortLabel: 'Vest- & østaper (~35 ma)',
    latinName: 'Platyrrhini & Cercopithecoidea',
    timeMa: '~35 ma',
    eraLabel: 'Sidegrener innen Primater',
    x: 1980,
    y: 110,
    labelAnchor: 'top',
    image: evoImg('primates.png'),
    imageCaption: 'Kapusineraper i Sør-Amerika (vestaper) og makaker og bavianer i Afrika/Asia (østaper).',
    summaryTitle: 'Intelligente flokkdyr med balanse- og gripehale',
    whatHappens:
      'De ekte apene med hale deles i vestaper i Sør- og Mellom-Amerika (som ofte har en ekte gripehale som kan bære hele kroppsvekten!) og østaper i Afrika og Asia (som bavianer, marekatter og makaker, som har tresyn-fargesyn akkurat som oss).',
    keyTraits: [
      {
        title: 'Gripehale hos vestaper / balansehale hos østaper',
        description: 'Tydelig skille fra menneskeapene, som mistet halen helt.',
        icon: 'compass',
      },
      {
        title: 'Komplekse sosiale hierarkier og verktøybruk',
        description: 'Kapusineraper knekker nøtter med stein, og japanske snøaper bader i varme kilder om vinteren.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Brøleapene i regnskogen i Sør-Amerika har et forstørret tungebein som fungerer som resonanskasse – ropene deres kan høres gjennom tett jungel på 5 kilometers avstand!',
    examples: ['Kapusinerape, edderkoppape, brøleape og silkeape (vestaper)', 'Rhesusmakak, snøape, bavian, mandrill, grønn marekatt og neseape (østaper)'],
    accentCategory: 'human',
  },

  // ==========================================
  // STEG 9: MENNESKEAPER / HOMINIDER (~15 ma)
  // ==========================================
  {
    id: 'hominids',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'primates',
    stepNumber: 9,
    title: 'Menneskeaper / Hominider',
    shortLabel: 'Menneskeaper (~15 ma)',
    latinName: 'Hominidae',
    timeMa: '~15 ma',
    eraLabel: 'Miocen – Store haleløse aper',
    x: 2135,
    y: 220,
    labelAnchor: 'bottom',
    image: evoImg('hominids.png'),
    imageCaption: 'Store menneskeaper uten hale med 360-graders fleksible skulderledd, redskapsbruk og dyp sosial intelligens.',
    summaryTitle: 'Uten hale, frie skulderledd og avansert sosial intelligens',
    whatHappens:
      'For 15–20 millioner år siden mistet menneskeapenes stamfar halen helt (kun halebeinet gjenstår!), fikk bredere brystkasse og skulderblader på ryggsiden slik at armene kan roteres fritt i alle retninger. De store menneskeapene (orangutang, gorilla, sjimpanse, bonobo og mennesket) kjennetegnes av selvbevissthet, empati, redskapsbruk og kulturell overføring av kunnskap fra mor til barn.',
    keyTraits: [
      {
        title: 'Ingen utvendig hale',
        description: 'Kun et indre halebein nederst på ryggraden gir feste for bekkenbunnsmuskulaturen.',
        icon: 'layers',
      },
      {
        title: '360-graders fleksible skulderledd',
        description: 'Opprinnelig tilpasset å henge og svinge seg i grener – ga mennesket evnen til presise kast og håndverk.',
        icon: 'hand',
      },
      {
        title: 'Høy sosial intelligens og kultur',
        description: 'Kjenner seg selv igjen i speil, trøster flokkmedlemmer og lærer bort verktøybruk over mange års barndom.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Gibbonene («små menneskeaper» i Sørøst-Asia) skilte lag litt før de store menneskeapene og kan svinge seg gjennom trekronene i opptil 55 km/t – som flygende trapeskunstnere!',
    examples: ['Orangutang', 'Gorilla', 'Sjimpanse og bonobo', 'Homo sapiens (og gibboner i søsterfamilien Hylobatidae)'],
    accentCategory: 'human',
  },
  {
    id: 'orangutan_gorilla',
    stepIndex: 8,
    isMainPath: false,
    parentId: 'hominids',
    title: 'Orangutang og gorilla',
    shortLabel: 'Orangutang & gorilla',
    latinName: 'Pongo & Gorilla',
    timeMa: '~14–9 ma',
    eraLabel: 'Sidegrener innen Store menneskeaper',
    x: 2365,
    y: 345,
    labelAnchor: 'right',
    image: evoImg('hominids.png'),
    imageCaption: 'Orangutangen i Sørøst-Asias regnskoger og den fredelige kjempen gorillaen i Sentral-Afrika.',
    summaryTitle: 'Regnskogens rødbrune tre-arkitekt og Afrikas fredelige kjempe',
    whatHappens:
      'Orangutang-linjen («skogmennesket» på malayisk) skilte lag for ca. 14 ma i Asia og tilbringer nesten hele livet oppe i trekronene, der den bygger ny sove-seng av grener hver kveld og bruker store blader som paraply! Gorilla-linjen skilte lag i Afrika for ca. 9 ma og ble verdens største nålevende primat (opptil 200 kg) – en fredelig planteeter som lever i tette familiegrupper ledet av en «sølvrygg».',
    keyTraits: [
      {
        title: 'Ekstrem armstyrke og knokegange hos gorilla',
        description: 'Gorillaen går på fotsålene bak og knokene på hendene foran når den beveger seg på skogbunnen.',
        icon: 'hand',
      },
      {
        title: 'Opptil 7–8 år mellom hver fødsel hos orangutang',
        description: 'Orangutang-ungen bor hos og lærer skogens hundrevis av frukttrær av moren i hele 7–8 år – lengst av alle dyr unntatt mennesket!',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'Vi mennesker deler rundt 98,3 % av DNA-et vårt med gorillaen og ca. 97 % med orangutangen!',
    examples: ['Borneo-orangutang, Sumatra-orangutang og Tapanuli-orangutang', 'Fjellgorilla og vestlig lavlandsgorilla'],
    accentCategory: 'human',
  },
  {
    id: 'chimpanzee_bonobo',
    stepIndex: 8,
    isMainPath: false,
    parentId: 'hominids',
    title: 'Sjimpanse og bonobo',
    shortLabel: 'Sjimpanse & bonobo (~6 ma)',
    latinName: 'Pan troglodytes & Pan paniscus',
    timeMa: '~6–7 ma',
    eraLabel: 'Vår aller nærmeste nålevende søstergren',
    x: 2445,
    y: 225,
    labelAnchor: 'right',
    image: evoImg('hominids.png'),
    imageCaption: 'Sjimpanser bruker både tilpassede kvister til termittfiske og steiner som hammer og ambolt for å knekke nøtter.',
    summaryTitle: '98,8 % felles DNA – våre evolusjonære søskenbarn',
    whatHappens:
      'Sjimpansen og bonoboen (dvergsjimpansen) utgjør slekten Pan, som delte en felles stamfar med menneskelinjen i Afrika for 6–7 millioner år siden. Mens sjimpansesamfunn ofte ledes av allianser mellom hanner og forsvarer territorier, ledes bonobo-flokker sør for Kongoelven av hunner som løser konflikter gjennom fredelig sosial kontakt og deling av mat!',
    keyTraits: [
      {
        title: 'Verktøysett og lokale kulturer',
        description: 'Lager spydlignende pinner, blad-svamper for drikkevann og steinredskaper som går i arv som lokal tradisjon.',
        icon: 'brain',
      },
      {
        title: 'Rikt følelsesliv, humor, sorg og samarbeid',
        description: 'Kan lære hundrevis av tegnsymboler og samarbeide strategisk under jakt.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'En sjimpanse og et menneske er genetisk nærmere beslektet (98,8 % likt DNA) enn en hest og et esel er!',
    examples: ['Vanlig sjimpanse (Pan troglodytes)', 'Bonobo / dvergsjimpanse (Pan paniscus)'],
    accentCategory: 'human',
  },

  // ==========================================
  // STEG 10: MENNESKET – HOMO SAPIENS (0,3 ma)
  // ==========================================
  {
    id: 'homo_sapiens',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'hominids',
    stepNumber: 10,
    title: 'Mennesket – Homo sapiens',
    shortLabel: 'Homo sapiens (0,3 ma)',
    latinName: 'Homo sapiens',
    timeMa: '0,3 ma',
    eraLabel: '300 000 år siden – Nåtid',
    x: 2385,
    y: 95,
    labelAnchor: 'top',
    image: evoImg('homo_sapiens.png'),
    imageCaption: 'Tidlige anatomisk moderne mennesker (Homo sapiens) på den afrikanske savannen ved soloppgang.',
    summaryTitle: 'Oppreist gange, språk, vitenskap og bevissthet om livets tre',
    whatHappens:
      'Etter at vår linje skilte lag med sjimpansens forfedre i Afrika, ble oppreist tobeint gange det første store særtrekket. Med frie hender kunne slekten Homo lage redskaper, temme ilden og steke/koke mat – noe som frigjorde enorm energi til en tre ganger større hjerne! For ca. 300 000 år siden (0,3 ma) oppsto vår egen art, Homo sapiens, i Afrika og spredte seg senere til alle kontinenter. Gjennom språk, skrift og vitenskap kan vi i dag spole 3,7 milliarder år tilbake og se vårt slektskap med alt som lever!',
    keyTraits: [
      {
        title: 'Oppreist tobeint gange (Bipedalisme)',
        description: 'S-formet ryggrad, bredt skålformet bekken og fjærende fotbue gir utholdende gange og frigjør hendene.',
        icon: 'footprints',
      },
      {
        title: 'Stor og sterkt foldet storhjerne (~1350 cm³)',
        description: 'Gir evne til abstrakt tenkning, matematikk, empati, kunst og langsiktig planlegging.',
        icon: 'brain',
      },
      {
        title: 'Avansert talespråk og kumulativ kultur',
        description: 'Strupehodet, tungekontroll og språkgenet FOXP2 lar hver generasjon bygge videre på alt tidligere mennesker har oppdaget.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Alle nålevende 8 milliarder mennesker på jorda har over 99,9 % identisk DNA – vi er en svært ung og nært beslektet art på en 3,7 milliarder år gammel grein!',
    examples: ['Det moderne mennesket (Homo sapiens) – eneste gjenlevende art i slekten Homo i dag'],
    accentCategory: 'human',
  },
  {
    id: 'early_humans_neanderthals',
    stepIndex: 9,
    isMainPath: false,
    parentId: 'hominids',
    title: 'Fossile formennesker og neandertalere',
    shortLabel: 'Formennesker & neandertaler',
    latinName: 'Australopithecus & Homo neanderthalensis',
    timeMa: '~4–0,04 ma',
    eraLabel: 'Utdødde søstergrener på menneskelinjen',
    x: 2185,
    y: 65,
    labelAnchor: 'left',
    image: evoImg('homo_sapiens.png'),
    imageCaption: 'Lenge var Homo sapiens slett ikke alene – vi delte kloden med nære menneskeslektninger som neandertalere og denisovanere.',
    summaryTitle: 'Fra tobeinte «Lucy» til istidens neandertalere i Europa',
    whatHappens:
      'Menneskets utvikling var ingen rett stige, men et buskete lite tre! Australopithecus («Lucy», 3,2 ma) gikk allerede oppreist på to bein med relativt liten hjerne. Senere mestret Homo erectus (~1,9 ma) ilden og vandret ut av Afrika. I Europa og Vest-Asia levde neandertalerne (Homo neanderthalensis) frem til for bare 40 000 år siden – de lagde klær, spyd, smykker, tok vare på skadede flokkmedlemmer og begravde sine døde!',
    keyTraits: [
      {
        title: 'Tobeint gange kom millioner av år FØR stor hjerne',
        description: 'Fossilfotspor i Laetoli (3,6 ma) beviser oppreist gange lenge før slekten Homo oppsto.',
        icon: 'footprints',
      },
      {
        title: 'Genblanding med Homo sapiens',
        description: 'Da moderne mennesker møtte neandertalere og denisovanere utenfor Afrika, fikk de felles barn.',
        icon: 'dna',
      },
    ],
    didYouKnow:
      'Hvis du har røtter utenfor Afrika sør for Sahara, stammer omtrent 1,5–2 % av ditt eget DNA direkte fra neandertalere!',
    examples: ['Australopithecus afarensis («Lucy»)', 'Homo habilis («det hendige mennesket»)', 'Homo erectus («det oppreiste mennesket»)', 'Neandertaler (Homo neanderthalensis) og Denisova-mennesket'],
    accentCategory: 'human',
  },
];

export const NODE_MAP: Record<string, TreeNodeData> = Object.fromEntries(
  TREE_NODES.map((node) => [node.id, node]),
);

export const CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'q1-animals',
    number: 1,
    question: 'Hva er noen fellestrekk alle dyr har?',
    contextHint: 'Tenk tilbake til Steg 2 (Eukaryoter) og Steg 3 (Dyr – 660 ma), og hva som skiller dyr fra planter, sopp og bakterier.',
    points: [
      {
        heading: 'Eukaryote celler',
        detail: 'Alle dyr er bygget opp av eukaryote celler med ekte cellekjerne (DNA i kjernemembran) og mitokondrier som driver celleånding.',
        badge: 'Cellenivå',
      },
      {
        heading: 'Flercellede organismer med arbeidsdeling',
        detail: 'Ingen nålevende dyr er encellede – alle består av mange samarbeidende, spesialiserte celler organisert i vev og organer.',
        badge: 'Oppbygning',
      },
      {
        heading: 'Mangler cellevegg (støttes av kollagen)',
        detail: 'I motsetning til planter (cellulose) og sopp (kitin) mangler dyreceller stiv cellevegg. Dermed er kroppen fleksibel, bundet sammen av proteinet kollagen.',
        badge: 'Unikt trekk',
      },
      {
        heading: 'Heterotrofe med indre fordøyelse',
        detail: 'Dyr kan ikke drive fotosyntese; de må spise andre organismer for energi og byggesteiner og fordøyer maten inne i kroppen.',
        badge: 'Ernæring',
      },
      {
        heading: 'Muskel- og nervevev (hos nesten alle dyr)',
        detail: 'Spesialiserte muskelceller og nerveceller gir dyr evnen til å sanse omgivelsene og bevege seg raskt og målrettet (unntaket er svamper).',
        badge: 'Bevegelse',
      },
    ],
    takeaway: 'Kort oppsummert: Alle dyr er flercellede, heterotrofe eukaryoter uten cellevegg, tilpasset aktiv bevegelse og sansing.',
  },
  {
    id: 'q2-rk-strategy',
    number: 2,
    question: 'Noen dyr får mange avkom, mens andre får få. Forklar de ulike strategiene (r- og K-strategi) og fordeler/ulemper.',
    contextHint: 'Sammenlign for eksempel virvelløse dyr / skrei / frosk med pattedyr, morkakedyr, elefanter, hvaler og primater.',
    points: [
      {
        heading: 'r-strategi: Mange avkom, minimal foreldreomsorg',
        detail: 'Arten satser energien på høy vekstrate (r) ved å legge hundrevis eller millioner av egg (f.eks. insekter, blåskjell, skrei/torsk, frosk). De fleste dør tidlig, men noen få overlever alltid.',
        badge: 'Kvantitet',
      },
      {
        heading: 'K-strategi: Få avkom, stor foreldreinvestering',
        detail: 'Arten investerer tungt i hvert enkelt individ gjennom morkake, melk, beskyttelse og lang opplæring (f.eks. knølhval, elefant, orangutang, mennesker). Tilpasset stabile miljøer nær bæreevnen (K).',
        badge: 'Kvalitet',
      },
      {
        heading: 'Fordeler og ulemper i skiftende miljøer',
        detail: 'r-strateger koloniserer raskt nye eller ustabile miljøer, men hvert avkom er svært sårbart. K-strateger gir avkommet høy sjanse til å nå voksen alder, men populasjonen kommer seg svært sakte etter jakt eller naturkatastrofer.',
        badge: 'Økologisk avveining',
      },
    ],
    comparisonTable: {
      headers: ['Kjennetegn', 'r-strategi (Mange avkom)', 'K-strategi (Få avkom)'],
      rows: [
        ['Antall avkom', 'Svært mange egg/unger per kull', 'Ett eller få avkom om gangen'],
        ['Foreldreomsorg', 'Liten eller ingen etter egglegging', 'Lang drektighet, amming og opplæring'],
        ['Overlevelse per unge', 'Lav i tidlige livsstadier', 'Høy helt frem til voksen alder'],
        ['Fordel', 'Rask vekst i uforutsigbare miljøer', 'Sterke konkurrenter i stabile økosystemer'],
        ['Ulempe', 'Enormt energitap gjennom ungedødelighet', 'Sårbare for utryddelse ved brå endringer'],
        ['Eksempler i livets tre', 'Insekter, blåskjell, skrei, frosk', 'Morkakedyr: hval, elefant, sjimpanse, menneske'],
      ],
    },
    takeaway: 'Ingen strategi er «best» alene – i livets tre er det en gradvis skala mellom r- og K-strategi tilpasset artens livsmiljø!',
  },
  {
    id: 'q3-groups',
    number: 3,
    question: 'Hva kjennetegner: Virveldyr, Pattedyr og Morkakedyr?',
    contextHint: 'Legg merke til hvordan gruppene ligger som «kinesiske esker» inni hverandre: Alle morkakedyr er pattedyr, og alle pattedyr er virveldyr!',
    points: [
      {
        heading: '1. Virveldyr (Vertebrata – 450 ma)',
        detail: 'Har indre skjelett av brusk eller bein, leddet ryggrad (virvelsøyle) som beskytter ryggmargen, og kranium (hodeskalle) som beskytter hjernen. Omfatter fisker, amfibier, krypdyr, fugler og pattedyr.',
        badge: 'Ryggrad & kranium',
      },
      {
        heading: '2. Pattedyr (Mammalia – 178 ma)',
        detail: 'Er en undergruppe av virveldyr som i tillegg er varmblodige (jevn kroppstemperatur), har kropp kledd med hår/pels, produserer melk fra melkekjertler til ungene, og har tre ørebein samt spesialiserte tenner.',
        badge: 'Varmblodig, pels & melk',
      },
      {
        heading: '3. Morkakedyr (Placentalia – 161 ma)',
        detail: 'Er den største undergruppen av pattedyr (ved siden av eggleggende kloakkdyr som nebbdyr og pungdyr som kenguru). Fosteret utvikler seg lenge i morens livmor forsynt med næring og oksygen via en morkake (placenta), slik at ungene fødes langt mer ferdigutviklet.',
        badge: 'Livmor & morkake',
      },
    ],
    takeaway: 'Evolusjon bygger trinnvis videre på eldre trekk: Mennesket har fortsatt ryggraden fra virveldyrene (450 ma), melkekjertlene og pelsen fra pattedyrene (178 ma) og morkaken fra morkakedyrene (161 ma)!',
  },
];
