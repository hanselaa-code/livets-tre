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
  /** SVG world coordinates (0..2020 x 0..1300) */
  x: number;
  y: number;
  /** Label placement relative to node circle on SVG canvas */
  labelAnchor: 'top' | 'bottom' | 'left' | 'right';
  /** Relative path to Nano Banana natural illustration */
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
    x: 250,
    y: 1140,
    labelAnchor: 'bottom',
    image: evoImg('origin.png'),
    imageCaption: 'Hydrotermiske skorsteiner på havbunnen for 3,7 milliarder år siden – et sannsynlig vugge-miljø for det første livet.',
    summaryTitle: 'En felles stamfar for alt liv på jorda',
    whatHappens:
      'Dypt nede i urhavet, trolig rundt varme, mineralrike hydrotermiske kilder på havbunnen, oppstår de første levende cellene for rundt 3,7 milliarder år siden. LUCA (Last Universal Common Ancestor) er den encellede ur-organismen som absolutt alt nålevende liv på jorda – fra bakterier og sopp til blågran og mennesker – stammer fra. Fra dette urpunktet deler livets tre seg tidlig i tre hoveddomener: Eubakterier og Arker (som splitter av som prokaryote sidegrener) og linjen som senere gir opphav til Eukaryotene.',
    keyTraits: [
      {
        title: 'Universell genetisk kode (DNA/RNA)',
        description: 'Alle levende organismer bruker samme genetiske alfabet (A, T, C, G) og ribosomer til å bygge proteiner – et tydelig bevis på felles opphav.',
        icon: 'dna',
      },
      {
        title: 'Cellemembran',
        description: 'En beskyttende hinne av fettstoffer skiller cellens indre kjemiske miljø fra urhavet utenfor.',
        icon: 'shield',
      },
      {
        title: 'Energiomsetning ved kjemisk gradient',
        description: 'Utnyttet kjemisk energi fra mineraler og ioner ved varme undersjøiske kilder lenge før fotosyntesen fantes.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Du deler faktisk grunnleggende «husholdningsgener» med bakterier og arker som lever i kokende svovelkilder i dag – oppskriften på hvordan celler leser DNA har vært bevart i 3,7 milliarder år!',
    examples: ['LUCA (ur-cellen)', 'Anaerobe dyphavsmikrober', 'Opphav til Arker og Eubakterier'],
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
    y: 965,
    labelAnchor: 'top',
    image: evoImg('origin.png'),
    imageCaption: 'Arker trives ofte i ekstreme miljøer som kokende undersjøiske kilder, saltsjøer og oksygenfrie sedimenter.',
    summaryTitle: 'Mestere i ekstreme miljøer – og eukaryotenes nære slektning',
    whatHappens:
      'Arker er encellede prokaryote mikroorganismer uten cellekjerne. Lenge trodde forskere at de bare var vanlige bakterier, men DNA-analyser avslørte at Arker utgjør et helt eget domene i livets tre. Overraskende nok er arker nærmere beslektet med den linjen som ga opphav til oss eukaryoter enn med vanlige eubakterier.',
    keyTraits: [
      {
        title: 'Prokaryot celle uten kjerne',
        description: 'Arvestoffet flyter fritt i cytoplasmaet uten en avgrensende kjernemembran.',
        icon: 'dna',
      },
      {
        title: 'Unik, ekstremstabil cellemembran',
        description: 'Spesielle eterbindinger i membranen gjør at mange arker tåler over 100 °C, ekstrem saltholdighet eller sterk syre.',
        icon: 'flame',
      },
    ],
    didYouKnow:
      'I 2015 oppdaget forskere «Asgard-arker» (Lokiarchaeota) i dyphavet mellom Norge og Grønland – de regnes som våre aller nærmeste prokaryote slektninger!',
    examples: ['Asgard-arker (Lokiarchaeota)', 'Metanproduserende arker', 'Ekstremofile varme- og saltarker'],
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
    x: 430,
    y: 1185,
    labelAnchor: 'right',
    image: evoImg('origin.png'),
    imageCaption: 'Eubakterier koloniserte raskt hele kloden – senere fylte cyanobakterier atmosfæren med oksygen.',
    summaryTitle: 'Klodens kjemiske ingeniører og oksygenprodusenter',
    whatHappens:
      'Eubakterier utgjør den andre store ur-grenen fra LUCA. De er encellede prokaryoter med cellevegg av peptidoglykan. For drøyt 2,4 milliarder år siden utviklet cyanobakterier (blågrønnbakterier) evnen til fotosyntese som frigjør oksygen (O₂) – «Den store oksygenhendelsen» som gjorde kompleks celleånding og flercellet liv mulig.',
    keyTraits: [
      {
        title: 'Prokaryot oppbygning og rask deling',
        description: 'Ingen cellekjerne, ringformet DNA og evne til svært rask formering og horisontal genoverføring.',
        icon: 'dna',
      },
      {
        title: 'Fotosyntese og nitrogenfiksering',
        description: 'Cyanobakterier skapte jordas oksygenrike atmosfære og ble senere opphav til plantenes kloroplaster.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'I tarmen din lever det omtrent like mange bakterieceller som du har egne menneskeceller i hele kroppen – uten dem klarer vi ikke fordøye plantefiber normalt!',
    examples: ['Cyanobakterier (blågrønnbakterier)', 'Melkesyrebakterier', 'E. coli', 'Nitrogenfikserende jordbakterier'],
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
    x: 425,
    y: 980,
    labelAnchor: 'bottom',
    image: evoImg('eukaryotes.png'),
    imageCaption: 'Kompleks eukaryot celle med tydelig cellekjerne, mitokondrier og indre membransystemer.',
    summaryTitle: 'Cellerevolusjonen: Kjerne og egne kraftverk',
    whatHappens:
      'For rundt 2 milliarder år siden skjer et av de største kvantesprangene i livets historie: En arke-lignende vertscelle tar opp en oksygenbrukende bakterie uten å fordøye den. Gjennom endosymbiose blir bakterien til mitokondrier – cellens kraftverk! Med rikelig tilgang på energi (ATP) og DNA beskyttet i en egen cellekjerne kan cellene bli tusen ganger større i volum og utvikle avansert arbeidsdeling. Herfra forgrener både Planter, Sopp og senere Dyr seg ut.',
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
        title: 'Indre membransystem og cytoskjelett',
        description: 'Gir cellen dynamisk form, evne til å transportere stoffer internt og grunnlag for spesialisering.',
        icon: 'layers',
      },
    ],
    didYouKnow:
      'Mitokondriene i cellene dine har fortsatt sitt eget lille ringformede bakterie-DNA, og du arver dem utelukkende fra moren din via eggcellen!',
    examples: ['Encellede protister (amøber, tøffeldyr)', 'Planter', 'Sopp', 'Dyr'],
    accentCategory: 'origin',
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
    x: 245,
    y: 810,
    labelAnchor: 'top',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Sopp og tidlige landplanter samarbeidet tett da de første økosystemene på land ble etablert.',
    summaryTitle: 'Naturens resirkulerere – nærmere dyr enn planter',
    whatHappens:
      'Sopp danner et helt eget rike av eukaryote organismer. Selv om de vokser opp av bakken, driver sopp aldri fotosyntese: De er heterotrofe nedbrytere som skiller ut fordøyelsesenzymer til omgivelsene og suger opp næringen gjennom tynne sopptråder (hyfer). Evolusjonært sett er sopp faktisk nærmere i slekt med dyr enn med planter!',
    keyTraits: [
      {
        title: 'Cellevegg av kitin',
        description: 'Stiv cellevegg bygget av kitin – det samme slitesterke karbohydratet som finnes i insektenes skall!',
        icon: 'shield',
      },
      {
        title: 'Ytre fordøyelse med hyfer',
        description: 'Bryter ned dødt treverk og organisk materiale og danner livsviktig sopprot (mykorrhiza) med planterøtter.',
        icon: 'sprout',
      },
    ],
    didYouKnow:
      'Verdens største kjente enkeltorganisme er en honningsopp i Oregon (USA) hvis underjordiske nettverk av sopptråder dekker nesten 9 kvadratkilometer!',
    examples: ['Kantarell og steinsopp', 'Gjærsopp', 'Penselstrålesopp (Penicillium)', 'Lav (i symbiose med alger)'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'red_algae',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'eukaryotes',
    title: 'Planter: Rødalger og alger',
    shortLabel: 'Rødalger (800 ma)',
    latinName: 'Archaeplastida / Rhodophyta',
    timeMa: '800 ma',
    eraLabel: 'Planteriket i havet',
    x: 625,
    y: 1055,
    labelAnchor: 'bottom',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Fra fotosyntetiserende alger i havet gikk utviklingen videre mot de første grønne landplantene.',
    summaryTitle: 'Solenergi fanges i kloroplaster',
    whatHappens:
      'En gruppe eukaryote celler tok opp fotosyntetiserende cyanobakterier i en ny endosymbiose – slik oppsto kloroplastene og planteriket! I havet utviklet rødalger og grønnalger flercellede former for rundt 800 millioner år siden. Rødalger har spesialpigmenter (fykoerytrin) som fanger blågrønt lys dypt nede i kystvannet, mens grønnalgelinjen ga opphav til landplantene.',
    keyTraits: [
      {
        title: 'Kloroplaster og autotrofi',
        description: 'Omdanner sollys, vann og CO₂ til druesukker og oksygen gjennom fotosyntese.',
        icon: 'leaf',
      },
      {
        title: 'Cellevegg av cellulose',
        description: 'Gir mekanisk styrke og beskyttelse rundt hver enkelt plantecelle.',
        icon: 'layers',
      },
    ],
    didYouKnow:
      'Nori-tangen som brukes rundt sushi er en rødalge – en representant for en av de aller eldste flercellede greinene innen planteriket!',
    examples: ['Søl og nori (rødalger)', 'Korallalger', 'Grønnalger i ferskvann og hav'],
    accentCategory: 'plant_fungi',
  },
  {
    id: 'land_plants',
    stepIndex: 1,
    isMainPath: false,
    parentId: 'red_algae',
    title: 'Landplanter',
    shortLabel: 'Landplanter (450 ma)',
    latinName: 'Embryophyta',
    timeMa: '450 ma',
    eraLabel: 'Planter erobrer landjorda',
    x: 845,
    y: 1105,
    labelAnchor: 'bottom',
    image: evoImg('plants_fungi.png'),
    imageCaption: 'Moser, bregner og sopp forvandlet golde steinkontinenter til grønne, fuktige økosystemer.',
    summaryTitle: 'Kontinentene blir grønne – grunnlaget for dyreliv på land',
    whatHappens:
      'For rundt 450 millioner år siden flyttet etterkommere av ferskvanns-grønnalger opp på tørt land. Først kom lave moser uten ledningsvev, deretter karsporeplanter som kråkefot og bregner med stive stengler og røtter, og senere frøplanter (bartrær og blomsterplanter). Landplantene bygde jordsmonn og produserte mat og skjulesteder som gjorde det mulig for dyr å følge etter.',
    keyTraits: [
      {
        title: 'Voksaktig kutikula og spalteåpninger',
        description: 'Hindrer uttørking i lufta samtidig som planten kan ta opp CO₂ til fotosyntesen.',
        icon: 'leaf',
      },
      {
        title: 'Røtter og ledningsvev',
        description: 'Frakter vann og mineraler opp fra bakken og gjør det mulig å vokse til høye trær.',
        icon: 'sprout',
      },
    ],
    didYouKnow:
      'Uten samarbeidet med sopp (mykorrhiza) hadde de første landplantene knapt klart seg – soppen fungerte som deres aller første «røtter» mot bar stein!',
    examples: ['Torvmoser og bladmoser', 'Bregner og sneller', 'Bartrær (gran og furu)', 'Blomsterplanter'],
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
    x: 590,
    y: 830,
    labelAnchor: 'bottom',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Yrende kambrisk havbunn med tidlige blekkspruter, trilobitter, bløtdyr og svamper.',
    summaryTitle: 'Flercellede bevegelige jegere og filtrerere',
    whatHappens:
      'For rundt 660 millioner år siden slår eukaryote celler seg sammen til de første flercellede dyrene i havet. I motsetning til planter og sopp har dyreceller ingen stiv cellevegg – i stedet holdes cellene sammen av elastiske proteiner som kollagen. Dette ga dyrene en helt ny superkraft: aktiv bevegelse med muskelvev og lynraske signaler via nervevev! Tidlig deler dyreriket seg i blant annet protostomer (virvelløse rekker som bløtdyr og leddyr) og deuterostomer (linjen som fører videre mot virveldyrene).',
    keyTraits: [
      {
        title: 'Flercellede uten cellevegg',
        description: 'Fleksible celler bundet sammen av kollagen gjør rask formendring og bevegelse mulig.',
        icon: 'layers',
      },
      {
        title: 'Heterotrofe med indre fordøyelse',
        description: 'Må spise andre organismer for energi og bryter ned maten i et fordøyelsessystem.',
        icon: 'flame',
      },
      {
        title: 'Muskel- og nervevev',
        description: 'Spesialiserte celler for sansing, koordinasjon og aktiv forflytning i miljøet.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Under «den kambriske eksplosjonen» for ca. 540 millioner år siden oppsto nesten alle hovedgrupper av dyr – inkludert øyne, skall, klør og rovdyr-byttedyr-kappløp – på rekordtid!',
    examples: ['Svamper og nesledyr', 'Bløtdyr og leddyr (protostomer)', 'Pigghuder og ryggstrengdyr (deuterostomer)'],
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
    eraLabel: 'Stor sidegren i dyreriket',
    x: 415,
    y: 690,
    labelAnchor: 'right',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Protostomene omfatter det overveldende flertallet av alle nålevende dyrearter, inkludert bløtdyr og leddyr.',
    summaryTitle: 'Den største forgreningen blant tosidig symmetriske dyr',
    whatHappens:
      'Blant dyr med tosidig symmetri (foran/bak, høyre/venstre) skilte utviklingen lag for rundt 600 millioner år siden: Hos protostomene («førstemunner») utvikles den første fosteråpningen til munn, mens hos vår egen linje (deuterostomene, «annenhåndsmunner») utvikles den til endetarmsåpning og munnen dannes sekundært. Protostomene forgrenet seg til enormt suksessrike grupper som bløtdyr, leddormer og leddyr.',
    keyTraits: [
      {
        title: 'Tosidig symmetri (Bilateria)',
        description: 'Tydelig forende med sanseorganer (begynnende hode) og retningsbestemt bevegelse.',
        icon: 'compass',
      },
      {
        title: 'Bukmarg (nervestreng på undersiden)',
        description: 'Sentralnervesystemet løper langs buken, i motsetning til ryggstrengdyr som har nervestreng langs ryggen.',
        icon: 'cpu',
      },
    ],
    didYouKnow:
      'Mer enn 95 % av alle dyr på jorda er virvelløse dyr, og de aller fleste av dem tilhører protostomenes gigantiske slektstre!',
    examples: ['Bløtdyr (Mollusca)', 'Leddyr (Arthropoda)', 'Leddormer (meitemark)'],
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
    eraLabel: 'Protostomer – Sidegren',
    x: 185,
    y: 680,
    labelAnchor: 'bottom',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Tidlige skallkledde blekkspruter var blant topprovdyrene i urhavet, side om side med muslinger og snegler.',
    summaryTitle: 'Fra filtrerende muslinger til lynintelligente blekkspruter',
    whatHappens:
      'Bløtdyr har en myk, usegmentert kropp med en muskuløs fot og en «kappe» som hos mange arter skiller ut et beskyttende kalkskall. Gruppen spenner fra fastsittende blåskjell og krypende landsnegler til hurtigsvømmende blekkspruter med kameraøyne og avansert problemløsningsevne.',
    keyTraits: [
      {
        title: 'Kappe og kalkskall',
        description: 'Kappen beskytter indre organer og produserer skall hos snegler, muslinger og ur-blekkspruter (nautilus).',
        icon: 'shell',
      },
      {
        title: 'Muskuløs fot / fangarmer',
        description: 'Omdannet til krypesåle hos snegler, gravespade hos muslinger og sugekopp-armer hos blekkspruter.',
        icon: 'waves',
      },
    ],
    didYouKnow:
      'Åttearmede blekkspruter har tre hjerter, blått kobberbasert blod, og to tredjedeler av hjernecellene deres sitter ute i armene!',
    examples: ['Blekkspruter (akkar, octopus)', 'Muslinger (blåskjell, kamskjell)', 'Snegler (hagesnegl, nakensnegler)'],
    accentCategory: 'invertebrate',
  },
  {
    id: 'arthropods',
    stepIndex: 2,
    isMainPath: false,
    parentId: 'protostomes',
    title: 'Leddyr',
    shortLabel: 'Leddyr',
    latinName: 'Arthropoda',
    timeMa: '~540 ma',
    eraLabel: 'Protostomer – Sidegren',
    x: 285,
    y: 540,
    labelAnchor: 'top',
    image: evoImg('animals_invertebrates.png'),
    imageCaption: 'Trilobitter og tidlige krepsdyr banet vei for jordas mest artsrike dyregruppe: leddyrene.',
    summaryTitle: 'Ytre rustning og leddede bein – klodens største suksesshistorie',
    whatHappens:
      'Leddyrene utviklet et leddelt ytre skjelett (eksoskjelett) av kitin og leddede ekstremiteter som kan brukes til alt fra svømming og løping til graving, spising og flyging. De var også de aller første dyrene som koloniserte landjorda – millioner av år før virveldyrene våget seg opp av vannet!',
    keyTraits: [
      {
        title: 'Ytre skjelett (Eksoskjelett)',
        description: 'Pansret hud av kitin gir beskyttelse mot rovdyr og uttørking, og skiftes gjennom skallskifte når dyret vokser.',
        icon: 'shield',
      },
      {
        title: 'Segmentert kropp og leddbein',
        description: 'Moduler som spesialiseres til følehorn, kjevedeler, klør og bein.',
        icon: 'footprints',
      },
    ],
    didYouKnow:
      'Over 80 % av alle kjente dyrearter på jorda er leddyr – bare blant biller finnes det rundt 400 000 beskrevne arter!',
    examples: ['Krepsdyr (krabbe, reke, rur)', 'Edderkoppdyr (edderkopper, flått, skorpioner)', 'Insekter (humle, sommerfugl, maur)', 'Trilobitter (utdødd)'],
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
    x: 775,
    y: 705,
    labelAnchor: 'top',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Tidlige kjevefisker, bruskfisker (hai) og beinfisker (ørret) viser styrken ved indre skjelett og ryggrad.',
    summaryTitle: 'Ryggrad, kranium og indre skjelett gir fart og størrelse',
    whatHappens:
      'Langs deuterostom-grenen av dyreriket oppstår virveldyrene i havet for rundt 450 millioner år siden. I stedet for et tungt ytre skall utvikler de et levende indre skjelett som vokser i takt med kroppen! En leddet ryggrad beskytter nervebanen langs ryggen samtidig som kraftige muskler på hver side gir lynrask svømming, mens kraniet beskytter hjernen og avanserte sanseorganer. Utviklingen av kjever gjør virveldyrene til effektive jegere i havet.',
    keyTraits: [
      {
        title: 'Ryggrad (Virvelsøyle)',
        description: 'Erstatter fosterets ryggstreng, beskytter ryggmargen og gir fleksibelt feste for kroppsmuskulaturen.',
        icon: 'layers',
      },
      {
        title: 'Kranium (Hodeskalle)',
        description: 'Beskyttende kapsel av brusk eller bein rundt en stadig mer avansert tre-delt hjerne og parrede sanseorganer.',
        icon: 'shield',
      },
      {
        title: 'Indre skjelett som vokser med dyret',
        description: 'Ingen sårbare skallskifter trengs – muliggjør langt større kroppsstørrelse enn hos leddyr.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Kjevene våre oppsto evolusjonært ved at de fremste gjellebuene hos ur-fisker gradvis foldet seg fremover og fikk tenner!',
    examples: ['Kjeveløse fisker (niøye)', 'Bruskfisker (haier og rokker)', 'Beinfisker', 'Alle landlevende virveldyr'],
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
    x: 985,
    y: 825,
    labelAnchor: 'bottom',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Haier har patruljert verdenshavene med et lett og smidig bruskskjelett i over 400 millioner år.',
    summaryTitle: 'Havets strømlinjeformede jegere med bruskskjelett',
    whatHappens:
      'Bruskfiskene skilte lag tidlig blant kjevefiskene og beholdt et indre skjelett bygget helt av fleksibel, lett brusk fremfor tungt beinvev. Uten svømmeblære bruker haier en stor, oljerik lever og hydrodynamiske brystfinner for oppdrift, kombinert med ekstremt følsomme elektriske sanser i snuten.',
    keyTraits: [
      {
        title: 'Skjelett av ren brusk',
        description: 'Lett, støtdempende og svært bøyelig indre skjelett uten forbeining.',
        icon: 'waves',
      },
      {
        title: 'Hudtenner og tannrekker på rullebånd',
        description: 'Huden er kledd av mikroskopiske tannlignende skjell som reduserer vannmotstand og ga evolusjonært opphav til tenner.',
        icon: 'shield',
      },
    ],
    didYouKnow:
      'Haier fantes i verdenshavene mer enn 50 millioner år før det vokste trær på land – og over 150 millioner år før dinosaurene!',
    examples: ['Hvithai og pigghå', 'Håkjerring (kan bli over 400 år gammel)', 'Rokker og djevelrokker'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'bony_fish',
    stepIndex: 3,
    isMainPath: false,
    parentId: 'vertebrates',
    title: 'Beinfisker',
    shortLabel: 'Beinfisker',
    latinName: 'Osteichthyes (Actinopterygii)',
    timeMa: '~410 ma',
    eraLabel: 'Sidegren fra Virveldyr',
    x: 1055,
    y: 705,
    labelAnchor: 'right',
    image: evoImg('vertebrates.png'),
    imageCaption: 'Beinfisker som ørret og korallrevfisker dominerer både ferskvann og verdenshav med svømmeblære og beinskjelett.',
    summaryTitle: 'Forbeinet skjelett og gassfylt svømmeblære',
    whatHappens:
      'Beinfiskene forsterket skjelettet med kalsiumfosfat (ekte beinvev) og utviklet en gassfylt pose (som ble til svømmeblære hos strålefinnede fisker – og lunger hos linjen mot landdyr!). Strålefinnede beinfisker utgjør i dag halvparten av alle nålevende virveldyrarter, mens deres søstergruppe kvastfinnefisker og lungefisker ledet direkte mot tetrapodene.',
    keyTraits: [
      {
        title: 'Forbeinet indre skjelett og gjellelokk',
        description: 'Bevegelig gjellelokk lar fisken pumpe vann over gjellene selv når den står helt stille i vannet.',
        icon: 'waves',
      },
      {
        title: 'Svømmeblære for vektløs oppdrift',
        description: 'Finjusterer oppdriften i vannsøylen uten å bruke muskelenergi.',
        icon: 'wind',
      },
    ],
    didYouKnow:
      'Svømmeblæren hos en ørret og lungene i brystkassen din er homologe organer – begge stammer fra en luftlomme ut fra svelget hos tidlige beinfisker!',
    examples: ['Ørret og laks', 'Klovnefisk', 'Torsk og sild', 'Blåfisk (kvastfinnefisk – nær slektning av landdyr)'],
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
    x: 945,
    y: 570,
    labelAnchor: 'bottom',
    image: evoImg('tetrapods.png'),
    imageCaption: 'Overgangsformen Tiktaalik (375 ma) med kjøttfulle brystfinner, håndledd, bevegelig nakke og lunger på grunt vann.',
    summaryTitle: 'Finner blir til fire bein – virveldyrene erobrer landjorda',
    whatHappens:
      'I grunne, oksygenfattige elvedeltaer i devontiden hadde kvastfinnefisker med både gjeller og enkle lunger en stor fordel: De kunne løfte hodet over vannflaten for å puste luft og bruke muskuløse finner til å skubbe seg over grunner. Fossilet Tiktaalik (375 ma) viser overgangen i detalj: Inne i finnene fantes nøyaktig det samme knokkelmønsteret som i våre egne armer og bein (én overarmsknokkel, to underarmsknokler og håndrotsknokler)!',
    keyTraits: [
      {
        title: 'Fire bærende lemmer med tær',
        description: 'Finnestråler erstattes av leddede bein og fingre/tær festet til skulderbelte og bekken.',
        icon: 'footprints',
      },
      {
        title: 'Lunger og dobbelt blodomløp',
        description: 'Puster luft direkte og pumper oksygenrikt blod med høyere trykk ut til musklene mot tyngdekraften.',
        icon: 'wind',
      },
      {
        title: 'Fri nakke mellom hode og skuldre',
        description: 'Hos fisk sitter hodeskallen fast i skulderbeltet – tetrapodene fikk halsledd som lar hodet snus fra side til side.',
        icon: 'compass',
      },
    ],
    didYouKnow:
      'Selv slanger og hvaler er biologisk sett tetrapoder («firbeinte») – de stammer fra firbeinte forfedre på land, og pytonslanger og bardehvaler har fortsatt små bekkenrester inne i kroppen!',
    examples: ['Tiktaalik og Ichthyostega (overgangsformer)', 'Amfibier', 'Krypdyr og fugler', 'Pattedyr'],
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
    x: 720,
    y: 465,
    labelAnchor: 'bottom',
    image: evoImg('tetrapods.png'),
    imageCaption: 'Amfibiene lever et dobbeltliv mellom vann og land, med fuktig hud og geléegg i ferskvann.',
    summaryTitle: 'Det evolusjonære dobbeltlivet mellom vann og land',
    whatHappens:
      'Amfibier («dobbeltlivende») representerer den tidligste nålevende grenen av landlevende virveldyr. Voksne frosker og salamandere har fire bein og lunger (pluss hudpust gjennom tynn, fuktig hud), men de er fortsatt bundet til ferskvann ved formering: Eggene mangler vanntett skall, og larvene (rumpetroll) klekkes i vann med gjeller før de gjennomgår metamorfose.',
    keyTraits: [
      {
        title: 'Egg uten skall i vann og metamorfose',
        description: 'Fra vannlevende rumpetroll med gjeller og svømmehale til firbeint voksen med lunger på land.',
        icon: 'waves',
      },
      {
        title: 'Tynn, fuktig hud med hudpust',
        description: 'Tar opp en stor andel av oksygenet direkte gjennom huden, men tørker lett ut i tørre strøk.',
        icon: 'wind',
      },
    ],
    didYouKnow:
      'Vanlig norsk buttsnutefrosk kan overvintre på bunnen av islagte tjern hele vinteren ved å puste utelukkende gjennom huden i det kalde, oksygenrike vannet!',
    examples: ['Buttsnutefrosk og nordpadde', 'Småsalamander og storsalamander', 'Pilgiftfrosker', 'Ormepadder'],
    accentCategory: 'vertebrate',
  },
  {
    id: 'reptiles_birds',
    stepIndex: 4,
    isMainPath: false,
    parentId: 'tetrapods',
    title: 'Krypdyr og fugler',
    shortLabel: 'Krypdyr og fugler',
    latinName: 'Sauropsida (Reptilia & Aves)',
    timeMa: '~315 ma',
    eraLabel: 'Sidegren fra Tetrapoder (Amnioter)',
    x: 840,
    y: 360,
    labelAnchor: 'top',
    image: evoImg('reptiles_birds.png'),
    imageCaption: 'Skjellkledd reptil og fjærkledd rovdinosaur/urfugl (Archaeopteryx-type) i mesozoisk skog.',
    summaryTitle: 'Skallegget frigjør dyrene fra vannet – og dinosaurene tar til vingene',
    whatHappens:
      'En ny evolusjonær oppfinnelse – det amniote skallegget med fosterhinner og egen «dam» på innsiden – gjorde amniotene helt uavhengige av vann for å legge egg! Mens én amniot-linje førte mot pattedyrene, utviklet sauropsidene (krypdyr og fugler) vanntett skjellhud og erobret tørre innland. I mesozoikum dominerte dinosaurene, og én gren av tobente, fjærkledde rovdinosaurer utviklet vinger og overlevde masseutryddelsen for 66 ma som nåtidens fugler!',
    keyTraits: [
      {
        title: 'Skallegg med fosterhinner (Amniot egg)',
        description: 'Beskytter fosteret mot uttørking på tørt land samtidig som gassutveksling skjer gjennom skallet.',
        icon: 'shield',
      },
      {
        title: 'Skjellhud og fjærdrakt',
        description: 'Keratinskjell hindrer væsketap hos krypdyr; hos rovdinosaurer og fugler ble skjell omdannet til isolerende og bærende fjær.',
        icon: 'feather',
      },
    ],
    didYouKnow:
      'En kjøttmeis på fuglebrettet er bokstavelig talt en nålevende dinosaur – krokodiller er faktisk nærmere i slekt med fugler enn med øgler og slanger!',
    examples: ['Øgler og slanger (hoggorm, stålorm)', 'Skilpadder og krokodiller', 'Dinosaurer (Tyrannosaurus, Velociraptor)', 'Alle fugler (kongeørn, pingvin, kråke)'],
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
    x: 1125,
    y: 455,
    labelAnchor: 'bottom',
    image: evoImg('mammals.png'),
    imageCaption: 'Tidlig spissmus-lignende pattedyr i skogbunnen som varmer og ammer ungene sine i ly av natten.',
    summaryTitle: 'Varmblodighet, isolerende pels og livgivende morsmelk',
    whatHappens:
      'Mens gigantiske dinosaurer dominerte dagtiden i juratiden, utviklet vår egen amniot-linje (synapsidene) seg til små, kvikke og ofte nattaktive pattedyr for rundt 178 millioner år siden. For å holde seg aktive i kjølige netter utviklet de jevn høy kroppstemperatur (varmblodighet) og isolerende pels. Samtidig oppsto pattedyrenes signaturtrekk: melkekjertler som gir næringsrik melk og tett foreldreomsorg, skjerpet hørsel med tre ørebein og stor hjernebark.',
    keyTraits: [
      {
        title: 'Varmblodige (Endoterme)',
        description: 'Holder stabil indre kroppstemperatur uavhengig av omgivelsene – kan være aktive om natten og i kaldt klima.',
        icon: 'flame',
      },
      {
        title: 'Hår og pels',
        description: 'Isolerer kroppen mot varmetap og danner følsomme værhår (vibrissae) for orientering i mørket.',
        icon: 'layers',
      },
      {
        title: 'Melkekjertler og foreldreomsorg',
        description: 'Moren produserer skreddersydd, fett- og proteinrik melk til avkommet – gir trygg vekst og tid til læring.',
        icon: 'heart',
      },
    ],
    didYouKnow:
      'To knokler som utgjør kjeve-leddet hos krypdyr krympet og vandret inn i mellomøret hos pattedyrene – der ble de til ambolten og hammeren, som gir oss sylskarp hørsel!',
    examples: ['Kloakkdyr (nebbdyr og maurpiggsvin – legger fortsatt egg!)', 'Pungdyr', 'Morkakedyr'],
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
    x: 1335,
    y: 560,
    labelAnchor: 'bottom',
    image: evoImg('mammals.png'),
    imageCaption: 'Pungdyr føder ørsmå unger etter kort drektighet; resten av fosterutviklingen skjer trygt ved patten i pungen.',
    summaryTitle: 'Kort svangerskap og trygg oppvekst i mors pung',
    whatHappens:
      'Blant pattedyrene som sluttet å legge egg (i motsetning til kloakkdyr som nebbdyr), skilte pungdyrene lag med morkakedyrene i jura. Pungdyr har bare en enkel, kortvarig plommeplacentadannelse: Ungen fødes på et ekstremt tidlig, bønne-stort fosterstadium, kravler på egen hånd gjennom morens pels inn i pungen (marsupium) og suger seg fast til en melkevorte i flere måneder.',
    keyTraits: [
      {
        title: 'Tidlig fødsel og utvikling i pung',
        description: 'Lav fysisk risiko for mor under drektigheten; mesteparten av energien gis gjennom melken etter fødselen.',
        icon: 'heart',
      },
      {
        title: 'Sterke forlemmer ved fødsel',
        description: 'Nyfødte pungdyr har ferdigutviklede klør og luktesans for å klatre opp til pungen, mens bakbeina fortsatt er knopper.',
        icon: 'footprints',
      },
    ],
    didYouKnow:
      'En nyfødt rød kjempekenguru veier mindre enn 1 gram – omtrent som en vingummi – selv om moren kan bli nesten to meter høy!',
    examples: ['Kenguru og wallaby', 'Koala og vombat', 'Amerikansk pungrotte (opossum)', 'Tasmansk djevel'],
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
    eraLabel: 'Sen Jura / Kritt – Eksplosiv stråling etter 66 ma',
    x: 1300,
    y: 345,
    labelAnchor: 'bottom',
    image: evoImg('placentals.png'),
    imageCaption: 'Etter at dinosaurene døde ut fylte morkakedyrene alle nisjer: rovdyr, beitedyr på land og kjempehvaler i havet.',
    summaryTitle: 'Morkaken gir lang, beskyttet fosterutvikling i livmoren',
    whatHappens:
      'Morkakedyrene videreutviklet livmoren med et høyspesialisert organ – morkaken (placenta) – som kobler mor og foster sammen via navlestrengen uten at blodbanene blandes direkte. Dermed kan fosteret vokse trygt inne i morens kropp over lang tid, med jevn tilførsel av oksygen og næring. Da asteroidenedslaget utryddet de store dinosaurene for 66 millioner år siden, eksploderte morkakedyrene i mangfold på land, i lufta (flaggermus) og tilbake i verdenshavene (hvaler)!',
    keyTraits: [
      {
        title: 'Morkake (Placenta) og navlestreng',
        description: 'Effektiv utveksling av oksygen, næringsstoffer, hormoner og avfallsstoffer mellom mor og foster.',
        icon: 'heart',
      },
      {
        title: 'Mer ferdigutviklet avkom (K-strategi)',
        description: 'Et føll eller en hvalkalv kan gå eller svømme få minutter etter fødselen; primater kan investere i lang hjernemodning.',
        icon: 'shield',
      },
      {
        title: 'Enorm økologisk tilpasningsevne',
        description: 'Over 94 % av nåtidens pattedyrarter er morkakedyr – fra 2 grams spissmus til 150 tonns blåhval.',
        icon: 'sparkles',
      },
    ],
    didYouKnow:
      'Morkaken hindrer morens immunforsvar i å støte ut fosteret som et fremmedlegeme – delvis ved hjelp av eldgamle virusgener (syncytin) som ble bygget inn i pattedyrenes DNA for over 100 millioner år siden!',
    examples: ['Klovdyr og hvaler', 'Hovdyr', 'Rovdyr', 'Gnagere', 'Flaggermus', 'Primater'],
    accentCategory: 'mammal',
  },
  {
    id: 'rodents',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Gnagere',
    shortLabel: 'Gnagere',
    latinName: 'Rodentia',
    timeMa: '~65 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1070,
    y: 265,
    labelAnchor: 'bottom',
    image: evoImg('placentals.png'),
    imageCaption: 'Gnagerne er den mest artsrike ordenen blant pattedyrene og står evolusjonært relativt nær primat-linjen.',
    summaryTitle: 'Rotåpne meisel-tenner og imponerende tilpasningsevne',
    whatHappens:
      'Gnagerne kjennes igjen på ett par krumme, sylskarpe fortenner i over- og underkjeven som vokser gjennom hele livet og slipes sylskarpe når dyret gnager på frø, nøtter eller trebark. De utgjør over 40 % av alle nålevende pattedyrarter og er nøkkelarter i økosystemer verden over – både som frøspredere, landskapsbyggere (bever) og byttedyr.',
    keyTraits: [
      {
        title: 'Stadig voksende gnagertenner',
        description: 'Hard emalje på forsiden og mykere tannbein bak gjør at tennene sliper seg selv som et stemjern.',
        icon: 'sparkles',
      },
      {
        title: 'Høy reproduksjonstakt',
        description: 'Flere kull i året gjør gnagere raske til å utnytte gode frøår (som i norske lemenår!).',
        icon: 'layers',
      },
    ],
    didYouKnow:
      'DNA-slektskap viser at gnagere (som mus og ekorn) og haredyr faktisk er nærmere i slekt med oss primater enn hunder, katter og kyr er!',
    examples: ['Ekorn og bever', 'Lemen, markmus og brunrotte', 'Flodsvin (kapybara – verdens største gnager)'],
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
    x: 1170,
    y: 165,
    labelAnchor: 'top',
    image: evoImg('placentals.png'),
    imageCaption: 'Ulv og andre rovdyr i ordenen Carnivora regulerer økosystemene med skarpe sanser og rovtannsett.',
    summaryTitle: 'Skarpe rovtann-sakser, smidighet og jaktintelligens',
    whatHappens:
      'Ordenen Rovdyr (Carnivora) samler pattedyr som stammer fra en felles kjøttetende stamfar med spesialiserte rovtenner (jeksler som glir forbi hverandre som et sakseblad for å skjære kjøtt og sener). Gruppen deles i en hundelignende gren (ulv, rev, bjørn, mårdyr og seler!) og en kattelignende gren (gaupe, løve, tiger, hyene).',
    keyTraits: [
      {
        title: 'Rovtenner og kraftige hjørnetenner',
        description: 'Skreddersydd tannsett for å gripe byttedyr og klippe muskelvev effektivt.',
        icon: 'shield',
      },
      {
        title: 'Fremoverrettede øyne og topp luktesans',
        description: 'God avstandsbedømming under jakt og høyt utviklet sosial koordinasjon hos flokkjegere som ulv og løve.',
        icon: 'eye',
      },
    ],
    didYouKnow:
      'Både seler, hvalrosser og kjempepandaen (som nesten bare spiser bambus!) tilhører biologisk sett ordenen Rovdyr (Carnivora)!',
    examples: ['Ulv, rødrev og fjellrev', 'Brunbjørn og isbjørn', 'Gaupe og løve', 'Steinkobbe og hvalross'],
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
    x: 1535,
    y: 435,
    labelAnchor: 'bottom',
    image: evoImg('placentals.png'),
    imageCaption: 'Ville hester bærer kroppsvekten på den midterste tåen omsluttet av en slitesterk hov for hurtig flukt over slettene.',
    summaryTitle: 'Løpere på tåspissen med hov på midttåen',
    whatHappens:
      'Etter hvert som åpne gressletter bredte seg på kontinentene, utviklet hovdyrene lange, slanke bein for rask flukt fra rovdyr. Hos upartåede hovdyr bæres vekten på et ulikt antall tær – hos hestefamilien er side-tærne tilbakedannet slik at dyret løper på én eneste kraftig midttå kledd i en forhornet negl (hoven)!',
    keyTraits: [
      {
        title: 'Vekt på midterste tå (1 eller 3 tær)',
        description: 'Redusert vekt nederst i beinet gir svært energieffektivt trav og galopp over lange avstander.',
        icon: 'footprints',
      },
      {
        title: 'Slitesterke kinntenner og blindtarmsgjæring',
        description: 'Høye jeksler som tåler slipende gress og mikrober i baktarmen som bryter ned cellulose.',
        icon: 'leaf',
      },
    ],
    didYouKnow:
      'De aller eldste hesteforfedrene (Eohippus for over 50 millioner år siden) var på størrelse med en liten hund og løp rundt med fire tær i tette regnskoger!',
    examples: ['Hest, esel og sebra', 'Neshorn', 'Tapir'],
    accentCategory: 'mammal',
  },
  {
    id: 'even_toed_whales',
    stepIndex: 6,
    isMainPath: false,
    parentId: 'placentals',
    title: 'Klovdyr og hvaler',
    shortLabel: 'Klovdyr og hvaler',
    latinName: 'Cetartiodactyla',
    timeMa: '~55 ma',
    eraLabel: 'Sidegren fra Morkakedyr',
    x: 1585,
    y: 325,
    labelAnchor: 'right',
    image: evoImg('placentals.png'),
    imageCaption: 'Hjortedyr på kystengen og knølhvalen i havet deler en felles klovdyr-stamfar!',
    summaryTitle: 'Fra klovkledde drøvtyggere på land til gigantiske hvaler i havet',
    whatHappens:
      'Klovdyrene bærer kroppsvekten likt fordelt på to hovedtær (tå nr. 3 og 4 – «klover»), og mange har et avansert flermagesystem (drøvtyggere) for å utnytte gress og løv maksimalt. En av moderne evolusjonsbiologis mest oppsiktsvekkende oppdagelser er at hvalene utviklet seg direkte fra vade- og landlevende klovdyr (som Pakicetus) for rundt 50 millioner år siden!',
    keyTraits: [
      {
        title: 'Symmetrisk vektakse mellom to tær',
        description: 'Gir utmerket feste i ulendt terreng, myr og fjell hos elg, rein, hjort og geit.',
        icon: 'footprints',
      },
      {
        title: 'Sekundær tilbakevending til havet (Hvaler)',
        description: 'Forbein ble til luffer, bakbein forsvant, neseborene vandret til toppen av hodet – men hvaler puster med lunger og ammer med melk!',
        icon: 'waves',
      },
    ],
    didYouKnow:
      'Hvalenes aller nærmeste nålevende slektning på land er flodhesten! Derfor samles klovdyr og hvaler i dag i samme evolusjonære gruppe: Cetartiodactyla.',
    examples: ['Elg, hjort, villrein og rådyr', 'Storfe, sau, gris og flodhest', 'Blåhval, knølhval, spekkhogger og nise'],
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
    x: 1475,
    y: 235,
    labelAnchor: 'bottom',
    image: evoImg('primates.png'),
    imageCaption: 'Primater i tropisk regnskog med gripehender, negler og fremoverrettede øyne for presise hopp i trekronene.',
    summaryTitle: 'Skapt for et tredimensjonalt liv høyt i trærne',
    whatHappens:
      'I varme, frodige regnskoger for rundt 55 millioner år siden tilpasset en gren av morkakedyr seg et akrobatisk liv på tynne grener etter frukt og insekter. Et feiltrinn høyt i trekronene er livsfarlig – derfor selekterte evolusjonen frem gripehender med motstilt tommel, flate negler med følsomme fingertupper og fremoverrettede øyne som gir sylskarpt dybdesyn (stereosyn). Samtidig vokste hjernen for å tolke farger, sosialt samspill og rask koordinasjon.',
    keyTraits: [
      {
        title: 'Gripehender med motstilt tommel og negler',
        description: 'Flate negler erstatter klør og gir følsomme gripeputer som kan omslutte grener og håndtere små gjenstander.',
        icon: 'hand',
      },
      {
        title: 'Fremoverrettede øyne (Stereosyn)',
        description: 'Overlappende synsfelt fra begge øyne lar hjernen beregne nøyaktig avstand til neste gren.',
        icon: 'eye',
      },
      {
        title: 'Stor hjerne og få avkom med lang omsorg',
        description: 'Lang barndom i sosiale grupper der ungene lærer hva som kan spises og hvordan gruppen kommuniserer.',
        icon: 'brain',
      },
    ],
    didYouKnow:
      'Mange primater (inkludert oss!) gjenutviklet tresyn-fargesyn (rødt, grønt og blått) for lettere å oppdage moden rød og gul frukt mot grønt løvverk i regnskogen!',
    examples: ['Halvaper (ringhalelemur, spøkelsesaper)', 'Vestaper og østaper (kapusinerape, bavian, makak)', 'Menneskeaper og mennesket'],
    accentCategory: 'human',
  },
  {
    id: 'prosimians_monkeys',
    stepIndex: 7,
    isMainPath: false,
    parentId: 'primates',
    title: 'Halvaper og aper med hale',
    shortLabel: 'Halvaper og hale-aper',
    latinName: 'Strepsirrhini & Cercopithecoidea / Platyrrhini',
    timeMa: '~50–35 ma',
    eraLabel: 'Sidegrener innen Primater',
    x: 1355,
    y: 100,
    labelAnchor: 'top',
    image: evoImg('primates.png'),
    imageCaption: 'Lemurer på Madagaskar og kapusineraper i Sør-Amerika viser primatenes smidighet og sosiale kløkt.',
    summaryTitle: 'Akrobater med balansehale og sterkt sosialt samhold',
    whatHappens:
      'Mens én linje innen primatene utviklet seg mot haleløse menneskeaper, blomstret halvaper (som lemurer på Madagaskar) og ekte aper med hale i Sør-Amerika (vestaper, ofte med gripehale) og Afrika/Asia (østaper som makaker og bavianer). Halen fungerer som en livsviktig balanseror – eller som en «femte hånd» – når de kaster seg mellom trekronene.',
    keyTraits: [
      {
        title: 'Balanse- eller gripehale',
        description: 'Gir stabilitet i luftige svev i trekronene (i motsetning til menneskeaper som mistet halen).',
        icon: 'compass',
      },
      {
        title: 'Rikt sosialt språk og pelsstell',
        description: 'Ansiktsuttrykk, varsellyder og gjensidig pelsstell knytter tette allianser i flokken.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Kapusineraper i Brasil bruker tunge steiner som ambolt og klubbe for å knuse harde palmenøtter – en tradisjon ungene bruker flere år på å mestre ved å se på de voksne!',
    examples: ['Ringhalelemur og lori', 'Kapusinerape og brøleape', 'Rhesusmakak og bavian'],
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
    x: 1655,
    y: 155,
    labelAnchor: 'bottom',
    image: evoImg('hominids.png'),
    imageCaption: 'Store menneskeaper uten hale med 360-graders fleksible skulderledd, redskapsbruk og dyp sosial intelligens.',
    summaryTitle: 'Uten hale, frie skulderledd og avansert sosial intelligens',
    whatHappens:
      'For rundt 15–20 millioner år siden skilte menneskeapene lag fra apene med hale. Hominidene (de store menneskeapene: orangutang, gorilla, sjimpanse, bonobo og mennesket) mangler helt utvendig hale – kun halebeinet sitter igjen nederst i ryggraden! Brystkassen ble bredere og skulderbladene flyttet seg til ryggsiden, noe som ga helt frie, roterbare skulderledd for å henge og svinge seg under grener (og hos oss: kaste presist og arbeide med hendene).',
    keyTraits: [
      {
        title: 'Ingen hale (kun indre halebein)',
        description: 'En mutasjon i fosterutviklingen fjernet den ytre halen og endret tyngdepunkt og bekkenbunn.',
        icon: 'layers',
      },
      {
        title: 'Svært fleksible skulderledd',
        description: 'Armene kan strekkes rett opp over hodet og roteres fritt i alle retninger.',
        icon: 'hand',
      },
      {
        title: 'Sosial intelligens, empati og redskapsbruk',
        description: 'Selvgjenkjenning, problemløsning, bruk av pinner og steiner som verktøy og kulturell læring mellom generasjoner.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Mennesket stammer ikke fra nålevende sjimpanser – vi og sjimpansene er «evolusjonære søskenbarn» som delte en felles stamfar i Afrika for rundt 6–7 millioner år siden, og vi deler ca. 98,8 % av DNA-sekvensen vår!',
    examples: ['Orangutang (~14 ma)', 'Gorilla (~9 ma)', 'Sjimpanse og bonobo (~6–7 ma)', 'Tidlige homininer (Australopithecus – «Lucy»)', 'Homo sapiens'],
    accentCategory: 'human',
  },
  {
    id: 'great_apes',
    stepIndex: 8,
    isMainPath: false,
    parentId: 'hominids',
    title: 'Orangutang, gorilla og sjimpanse',
    shortLabel: 'Nålevende menneskeaper',
    latinName: 'Pongo, Gorilla & Pan',
    timeMa: '~14–6 ma',
    eraLabel: 'Våre nærmeste nålevende slektninger',
    x: 1845,
    y: 250,
    labelAnchor: 'bottom',
    image: evoImg('hominids.png'),
    imageCaption: 'Orangutanger i Sørøst-Asia og gorillaer, sjimpanser og bonoboer i Afrika er våre nærmeste slektninger på kloden.',
    summaryTitle: 'Våre nærmeste slektninger i regnskogen',
    whatHappens:
      'Innen familien Hominidae skilte orangutangens forfedre lag i Asia for ca. 14 millioner år siden, gorillaens linje i Afrika for ca. 9 millioner år siden, og sjimpansen/bonoboen skilte lag fra menneskelinjen for rundt 6–7 millioner år siden. De lever i skogområder, går ofte på knokene på bakken kombinert med klatring i trær, og viser rike følelsesliv, sorg, lek og lokale verktøytradisjoner.',
    keyTraits: [
      {
        title: 'Knokegange og kraftige klatrearmer',
        description: 'Lange armer og buede fingre tilpasset skogliv kombinert med gange på fire lemmer på skogbunnen.',
        icon: 'hand',
      },
      {
        title: 'Kulturelle tradisjoner i flokken',
        description: 'Ulike sjimpanseflokker har egne metoder for å fiske termitter med kvister og knekke nøtter med stein.',
        icon: 'brain',
      },
    ],
    didYouKnow:
      'Sjimpanser er nærmere i slekt med deg enn de er med en gorilla!',
    examples: ['Sjimpanse (Pan troglodytes)', 'Bonobo / dvergsjimpanse (Pan paniscus)', 'Vestlig og østlig gorilla', 'Borneo- og Sumatra-orangutang'],
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
    x: 1845,
    y: 85,
    labelAnchor: 'top',
    image: evoImg('homo_sapiens.png'),
    imageCaption: 'Tidlige anatomisk moderne mennesker (Homo sapiens) på den afrikanske savannen ved soloppgang.',
    summaryTitle: 'Oppreist gange, språk, vitenskap og bevissthet om livets tre',
    whatHappens:
      'Da klimaet i Øst-Afrika ble tørrere og tette skoger åpnet seg til gresskledd savanne, utviklet vår gren (homininene) oppreist, tobeint gange for flere millioner år siden. Med hendene fri fra lokomosjon kunne slekten Homo lage presise steinredskaper, beherske ilden og tilberede næringsrik mat som ga drivstoff til en tre ganger større hjerne. For rundt 300 000 år siden (0,3 ma) oppstår anatomisk moderne mennesker – Homo sapiens – i Afrika. Avansert språk og kumulativ kultur gjør at vi i dag kan bygge på tusenvis av generasjoners kunnskap – og kartlegge vår egen 3,7 milliarder år lange reise fra LUCA!',
    keyTraits: [
      {
        title: 'Oppreist tobeint gange (Bipedalisme)',
        description: 'S-formet ryggrad, skålformet bekken og fotbue gir energieffektiv vandring og frigjør hendene til finmotorikk og redskaper.',
        icon: 'footprints',
      },
      {
        title: 'Stor og sterkt foldet storhjerne',
        description: 'Hjernen vår bruker rundt 20 % av kroppens hvileenergi og muliggjør abstrakt planlegging, fantasi og vitenskap.',
        icon: 'brain',
      },
      {
        title: 'Komplekst språk og kumulativ kultur',
        description: 'Evnen til å dele presise ideer gjennom tale og skrift slik at ny kunnskap bygger videre fra generasjon til generasjon.',
        icon: 'users',
      },
    ],
    didYouKnow:
      'Hvis vi komprimerer hele livets historie på 3,7 milliarder år til ett eneste døgn på 24 timer (der LUCA oppstår kl. 00:00), dukker Homo sapiens først opp 7 sekunder før midnatt – kl. 23:59:53!',
    examples: ['Homo sapiens (det moderne mennesket)', 'Utdødde søsterarter som Homo neanderthalensis og Homo erectus'],
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
    contextHint: 'Sammenlign for eksempel virvelløse dyr / fisk / frosk med pattedyr, morkakedyr, hvaler og primater.',
    points: [
      {
        heading: 'r-strategi: Mange avkom, minimal foreldreomsorg',
        detail: 'Arten satser energien på høy vekstrate (r) ved å legge hundrevis eller tusenvis av egg (f.eks. insekter, krepsdyr, torsk, frosk). De fleste dør tidlig, men noen få overlever alltid.',
        badge: 'Kvantitet',
      },
      {
        heading: 'K-strategi: Få avkom, stor foreldreinvestering',
        detail: 'Arten investerer tungt i hvert enkelt individ gjennom morkake, melk, beskyttelse og lang opplæring (f.eks. hvaler, elefanter, primater, mennesker). Tilpasset stabile miljøer nær bæreevnen (K).',
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
        ['Eksempler i livets tre', 'Leddyr, muslinger, torsk, frosk', 'Morkakedyr: hval, ulv, sjimpanse, menneske'],
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
        detail: 'Er den største undergruppen av pattedyr (ved siden av eggleggende kloakkdyr og pungdyr). Fosteret utvikler seg lenge i morens livmor forsynt med næring og oksygen via en morkake (placenta), slik at ungene fødes langt mer ferdigutviklet.',
        badge: 'Livmor & morkake',
      },
    ],
    takeaway: 'Evolusjon bygger trinnvis videre på eldre trekk: Mennesket har fortsatt ryggraden fra virveldyrene (450 ma), melkekjertlene og pelsen fra pattedyrene (178 ma) og morkaken fra morkakedyrene (161 ma)!',
  },
];
