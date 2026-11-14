import {
  evoImg,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type CellRoleCategory =
  | 'boundary'
  | 'protein_factory'
  | 'energy_recycle'
  | 'structure';

export interface AnimalCellNodeData extends TreeNodeData {
  /** Exact SVG world coordinate on the central 3D animal cell cutaway */
  anchorX: number;
  anchorY: number;
  /** Left or right mind-map column around the central cell */
  side: 'left' | 'right';
  /** Functional role category for visual color-coding */
  roleCategory: CellRoleCategory;
}

export const CENTRAL_CELL_IMAGE = evoImg('cell_central_clean.png');

export const CELL_MAIN_STEP_IDS: string[] = [
  'cell_membrane',
  'cell_cytoplasm',
  'cell_nucleus',
  'cell_ribosomes',
  'cell_er',
  'cell_golgi',
  'cell_vesicles',
  'cell_mitochondria',
  'cell_lysosomes',
  'cell_cytoskeleton',
];

export const CELL_NODES: AnimalCellNodeData[] = [
  // ==========================================
  // DEL 1: CELLEMEMBRANEN
  // ==========================================
  {
    id: 'cell_membrane',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Cellemembranen – Cellens intelligente dørvakt',
    shortLabel: 'Cellemembranen',
    latinName: 'Membrana plasmatica • Halvgjennomtrengelig dobbeltlag',
    timeMa: '~7–8 nm tykk',
    eraLabel: 'Avgrensning, transport og kommunikasjon',
    x: 235,
    y: 160,
    anchorX: 628,
    anchorY: 326,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'boundary',
    traceBadge: 'Avgrensning & dørvakt',
    image: evoImg('cell_membrane.png'),
    imageCaption:
      'Cellemembranen består av et flytende dobbeltlag av fosfolipider med spesialiserte transportproteiner, ionekanaler og reseptorer.',
    summaryTitle: 'Skiller innsiden fra utsiden og bestemmer nøyaktig hva som slipper inn og ut',
    whatHappens:
      'Alle levende celler er omgitt av en fleksibel, halvgjennomtrengelig (semipermeabel) cellemembran. I motsetning til planteceller, soppceller og bakterier har dyrecellen ingen stiv cellevegg utenpå membranen. Grunnstrukturen er et dobbeltlag av fosfolipider der de vannelskende (hydrofile) hodene peker ut mot vann på begge sider, mens de vannavstøtende (hydrofobe) fettsyrehalene peker inn mot midten. Innfelt i dette laget sitter proteiner som fungerer som porter, pumper og antenner.',
    keyTraits: [
      {
        title: 'Selektiv transport (passiv og aktiv)',
        description:
          'Små upolare molekyler som O₂ og CO₂ glir fritt gjennom membranen (diffusjon), vann passerer gjennom egne vannkanaler (osmose via akvaporiner), mens ioner og glukose fraktes gjennom transportproteiner og energikrevende pumper.',
        icon: 'shield',
      },
      {
        title: 'Flytende mosaikk med kolesterol',
        description:
          'Fosfolipidene står ikke stille, men glir rundt som i en såpeboble. Kolesterolmolekyler mellom fettsyrehalene holder membranen stabil og passe myk ved ulike temperaturer.',
        icon: 'layers',
      },
      {
        title: 'Reseptorer og ID-brikker på overflaten',
        description:
          'Sukkerkjeder og reseptorproteiner på utsiden fanger opp hormoner (som insulin og adrenalin) og viser immunforsvaret at cellen tilhører din egen kropp.',
        icon: 'zap',
      },
    ],
    classroomTest:
      'Huskeregel for klassen: Tenk på cellemembranen som både veggen og sikkerhetskontrollen på en flyplass – O₂ og CO₂ har «diplomatpass» og går rett gjennom, mens store molekyler og ladde ioner må gjennom bemannede sluser (transportproteiner)!',
    didYouKnow:
      'Rundt en tredjedel av all energien du bruker når du hviler går faktisk med til én eneste type pumpe i cellemembranene dine – natrium-kalium-pumpa – som holder nerve- og muskelcellene dine elektrisk ladet og klare til aksjon!',
    examples: [
      'Fosfolipid-dobbeltlag',
      'Osmose og diffusjon',
      'Natrium-kalium-pumpa (ATP)',
      'Hormonreseptorer',
    ],
    accentCategory: 'origin',
  },

  // ==========================================
  // DEL 2: CYTOPLASMA (CYTOSOL)
  // ==========================================
  {
    id: 'cell_cytoplasm',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'cell_membrane',
    stepNumber: 2,
    title: 'Cytoplasma – Cellens levende indre miljø',
    shortLabel: 'Cytoplasma',
    latinName: 'Cytoplasma & Cytosol • Kjemisk verksted',
    timeMa: '70–80 % vann',
    eraLabel: 'Grunnsubstans og stoffskifte',
    x: 1415,
    y: 160,
    anchorX: 884,
    anchorY: 352,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'boundary',
    traceBadge: 'Indre miljø & reaksjoner',
    image: evoImg('cell_cytoplasm.png'),
    imageCaption:
      'Cytoplasmaet er ikke bare «tomt vann», men en tettpakket, geléaktig løsning av proteiner, salter, næringsstoffer og organeller.',
    summaryTitle: 'Et travelt biokjemisk hav mellom cellemembranen og cellekjernen',
    whatHappens:
      'Innenfor cellemembranen fylles cellen av cytoplasma – som omfatter både den geléaktige cellevæsken (cytosol) og alle organellene som flyter i den (unntatt selve cellekjernen). Cytosol består av 70–80 % vann, men er så tettpakket med oppløste ioner, aminosyrer, sukker, ATP og tusenvis av enzymer at konsistensen minner om klar gelé. Her foregår mange av cellens raskeste kjemiske reaksjoner.',
    keyTraits: [
      {
        title: 'Glykolysen – første trinn i energiproduksjonen',
        description:
          'Før mitokondriene overtar, spaltes glukose (druesukker) i ti enzymtrinn rett ute i cytosol. Dette gir rask energi også når musklene jobber hardt med lite oksygen!',
        icon: 'flame',
      },
      {
        title: 'Lager for byggesteiner og ioner',
        description:
          'Her ligger frie aminosyrer, fettsyrer, nukleotider og mineraler klare slik at ribosomer og andre organeller alltid har råvarer tilgjengelig.',
        icon: 'waves',
      },
      {
        title: 'Finjustert pH og saltbalanse',
        description:
          'Cytosol holder en nøye regulert pH på rundt 7,2 slik at cellens enzymer har perfekt arbeidsmiljø.',
        icon: 'activity',
      },
    ],
    classroomTest:
      'Begrepsfelle på prøver: Husk forskjellen på «cytosol» (kun selve cellevæsken) og «cytoplasma» (cellevæsken + alle organellene utenfor cellekjernen)!',
    didYouKnow:
      'Hvis du forstørret en dyrecelle opp til størrelsen på et klasserom, ville ikke cytosol sett ut som et tomt svømmebasseng – det ville sett ut som et tettpakket kjøpesenter i rushtiden der molekyler kolliderer millioner av ganger i sekundet!',
    examples: [
      'Cytosol (cellevæske)',
      'Glykolyse (nedbrytning av glukose)',
      'Oppløste enzymer og ioner',
      'Aminosyre- og ATP-lager',
    ],
    accentCategory: 'microbe',
  },

  // ==========================================
  // DEL 3: CELLEKJERNEN & DNA
  // ==========================================
  {
    id: 'cell_nucleus',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'cell_cytoplasm',
    stepNumber: 3,
    title: 'Cellekjernen – Kommandosentralen og DNA',
    shortLabel: 'Cellekjernen (DNA)',
    latinName: 'Nucleus • Arvestoff og genregulering',
    timeMa: '~5–10 µm diameter',
    eraLabel: 'Det som gjør cellen «eukaryot» (ekte kjerne)',
    x: 235,
    y: 355,
    anchorX: 813,
    anchorY: 508,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'protein_factory',
    traceBadge: 'Arvestoff & styring',
    image: evoImg('cell_nucleus.png'),
    imageCaption:
      'Cellekjernen beskytter DNA-et bak en dobbel kjernemembran med tusenvis av kjerneporer som slipper ut arbeidskopier av mRNA.',
    summaryTitle: 'Hovedbiblioteket der alle oppskriftene på kroppens proteiner voktes',
    whatHappens:
      'Selve ordet «eukaryot» betyr «ekte kjerne»! Cellekjernen er vanligvis cellens største og tydeligste organell i mikroskopet. Den er omgitt av en dobbel kjernemembran med regulerte porter kalt kjerneporer. Inne i kjernen ligger nesten hele cellens DNA (hos mennesket fordelt på 46 kromosomer / 23 par). Når cellen trenger et bestemt protein, åpnes riktig gen på DNA-tråden, og det lages en arbeidskopi i form av mRNA (transkripsjon) som sendes ut gjennom en kjernepore.',
    keyTraits: [
      {
        title: 'DNA og kromatin (2 meter DNA i én kjerne!)',
        description:
          'Til vanlig ligger DNA-trådene viklet rundt spoleproteiner (histoner) som kromatin. Først når cellen skal dele seg, pakkes de tett sammen til synlige X-formede kromosomer.',
        icon: 'dna',
      },
      {
        title: 'Transkripsjon (DNA → mRNA)',
        description:
          'Originaloppskriftene (DNA) forlater aldri cellekjernen! I stedet sendes budbringer-RNA (mRNA) ut til ribosomene i cytoplasma som en arbeidskopi.',
        icon: 'brain',
      },
      {
        title: 'Kjernelegemet (Nukleolus) i midten',
        description:
          'Det ekstra tette, lysende området midt inne i cellekjernen er nukleolus – verkstedet som produserer delene til cellens ribosomer!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Tankeeksperiment: En hudcelle, en muskelcelle og en hjernecelle i kroppen din inneholder nøyaktig de samme 46 DNA-kromosomene. Hvorfor er de da så ulike? Fordi cellekjernen kun «skrur på» de genene akkurat den celletypen trenger!',
    didYouKnow:
      'Hvis du rullet ut DNA-et fra bare én eneste av dine egne cellekjerner, ville den tynne tråden blitt rundt 2 meter lang! Likevel får den plass inne i en kjerne som er ti ganger tynnere enn et hårstrå. (Unntak: Modne røde blodceller kvitter seg faktisk med cellekjernen for å få plass til mest mulig hemoglobin!)',
    examples: [
      '46 kromosomer (DNA)',
      'Dobbel kjernemembran & kjerneporer',
      'Nukleolus (kjernelegeme)',
      'mRNA (arbeidskopi av gen)',
    ],
    accentCategory: 'invertebrate',
  },

  // ==========================================
  // DEL 4: RIBOSOMER
  // ==========================================
  {
    id: 'cell_ribosomes',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'cell_nucleus',
    stepNumber: 4,
    title: 'Ribosomer – Cellens proteinfabrikker',
    shortLabel: 'Ribosomer',
    latinName: 'Ribosoma • Translasjon (mRNA → protein)',
    timeMa: '~25–30 nm store',
    eraLabel: 'Proteinsyntese i alle levende celler',
    x: 235,
    y: 550,
    anchorX: 704,
    anchorY: 539,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'protein_factory',
    traceBadge: 'Proteinfabrikk',
    image: evoImg('cell_ribosomes.png'),
    imageCaption:
      'Ribosomet leser den genetiske koden på mRNA tre og tre bokstaver av gangen og kobler sammen en kjede av aminosyrer.',
    summaryTitle: 'Her oversettes gen-oppskriften fra mRNA til ferdige proteiner',
    whatHappens:
      'Ribosomer er ørsmå molekylære maskiner bygget av ribosomalt RNA (rRNA) og proteiner – og i motsetning til de fleste andre organeller har de ingen membran rundt seg! En enkelt dyrecelle kan ha opptil 10 millioner ribosomer. De tar imot mRNA-kopien som kommer ut fra cellekjernen, leser koden tre baser av gangen (ett kodon), og bruker transport-RNA (tRNA) til å hente og skjøte sammen de 20 ulike aminosyrene i riktig rekkefølge til et protein.',
    keyTraits: [
      {
        title: 'Translasjon: Fra kode til byggverk',
        description:
          'Proteiner utfører nesten alt arbeid i kroppen: de er enzymer, muskeltråder, antistoffer, transportkanaler, hår/negler (keratin) og hormoner som insulin.',
        icon: 'cpu',
      },
      {
        title: 'Frie ribosomer vs. bundne ribosomer',
        description:
          'Ribosomer som flyter fritt i cytosol lager proteiner cellen skal bruke selv på innsiden, mens ribosomer festet på ru ER lager proteiner som skal sendes ut av cellen eller inn i membraner.',
        icon: 'layers',
      },
      {
        title: 'Felles for absolutt alt liv på jorda',
        description:
          'Både bakterier, planter, sopp og dyr har ribosomer – et sterkt bevis på at alt liv stammer fra LUCA!',
        icon: 'dna',
      },
    ],
    classroomTest:
      'Huskeregel mellom de to T-ordene i proteinsyntesen: Transkripsjon («avskrift» fra DNA til mRNA inne i kjernen) kommer før Translasjon («oversettelse» fra mRNA-språk til aminosyre-språk på ribosomet)!',
    didYouKnow:
      'Mange antibiotika (som erytromycin og tetracyklin) virker nettopp ved å blokkere bakterienes litt mindre ribosomer (70S), mens dine egne eukaryote ribosomer (80S) får jobbe videre i fred!',
    examples: [
      'Translasjon (mRNA → aminosyrer)',
      'tRNA og kodon-avlesning',
      'Enzymer, antistoffer og insulin',
      'Ingen omsluttende membran',
    ],
    accentCategory: 'invertebrate',
  },

  // ==========================================
  // DEL 5: ENDOPLASMATISK RETIKULUM (RU & GLATT ER)
  // ==========================================
  {
    id: 'cell_er',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'cell_ribosomes',
    stepNumber: 5,
    title: 'Endoplasmatisk retikulum – Ru og glatt ER',
    shortLabel: 'Ru & glatt ER',
    latinName: 'Reticulum endoplasmaticum • Nettverk av membrankanaler',
    timeMa: 'Opptil 50 % av cellens membraner',
    eraLabel: 'Proteinfolding, fettsyrer og avgiftning',
    x: 235,
    y: 745,
    anchorX: 767,
    anchorY: 609,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'protein_factory',
    traceBadge: 'Fabrikknettverk & avgiftning',
    image: evoImg('cell_er.png'),
    imageCaption:
      'Til venstre ses flate sekker av ru ER besatt med lysende ribosomer; til høyre rørformet glatt ER uten ribosomer.',
    summaryTitle: 'To sammenhengende fabrikker: én for proteiner og én for fett og avgiftning',
    whatHappens:
      'Rett utenfor og i direkte sammenheng med kjernemembranen brer endoplasmatisk retikulum (ER) seg ut som en enorm labyrint av sammenhengende membransekker og rør. Nettverket deles i to områder med ulikt utseende og ulike oppgaver: Ru ER er tett besatt med ribosomer på utsiden og ferdigstiller proteiner, mens glatt ER mangler ribosomer og spesialiserer seg på fettstoffer, hormoner, kalsiumlagring og avgiftning.',
    keyTraits: [
      {
        title: 'Ru ER: Kvalitetskontroll og 3D-folding av proteiner',
        description:
          'Nylagde proteinkjeder mates rett fra ribosomene og inn i hulrommet i ru ER, der de foldes i riktig 3D-form før de sendes videre i små blærer.',
        icon: 'layers',
      },
      {
        title: 'Glatt ER: Fettfabrikk og steroidhormoner',
        description:
          'Bygger nye fosfolipider til cellens membraner og produserer fettløselige hormoner som kjønnshormonene østrogen og testosteron.',
        icon: 'sparkles',
      },
      {
        title: 'Avgiftning i leveren og kalsium i muskler',
        description:
          'Leverceller har ekstra mye glatt ER som gjør alkohol, medisiner og miljøgifter vannløselige slik at kroppen kan skille dem ut. I muskelceller lagrer glatt ER kalsiumioner (Ca²⁺) som utløser muskelsammentrekning!',
        icon: 'shield',
      },
    ],
    classroomTest:
      'Koble struktur og funksjon: Hvilken celletype i kroppen tror dere har aller mest RU ER (bukspyttkjertelceller som pumper ut fordøyelsesenzymer og insulin!), og hvilken har mest GLATT ER (leverceller som renser blodet!)?',
    didYouKnow:
      'Hvis kroppen utsettes for mye av et legemiddel eller alkohol over tid, bygger levercellene faktisk enda mer glatt ER på bare noen dager! Det er en av hovedårsakene til at toleransen øker – og at enkelte medisiner kan brytes ned raskere samtidig.',
    examples: [
      'Ru ER (med ribosomer – proteiner)',
      'Glatt ER (lipider & avgiftning)',
      'Kalsiumlager i muskelceller',
      'Lever- og kjertelceller',
    ],
    accentCategory: 'invertebrate',
  },

  // ==========================================
  // DEL 6: GOLGIAPPARATET
  // ==========================================
  {
    id: 'cell_golgi',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'cell_er',
    stepNumber: 6,
    title: 'Golgiapparatet – Cellens postkontor',
    shortLabel: 'Golgiapparatet',
    latinName: 'Apparatus golgiensis • Modifisering, merking og sortering',
    timeMa: '4–8 flate membransekker',
    eraLabel: 'Sorterings- og pakkesentral',
    x: 1415,
    y: 355,
    anchorX: 962,
    anchorY: 422,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'protein_factory',
    traceBadge: 'Postkontor & sortering',
    image: evoImg('cell_golgi.png'),
    imageCaption:
      'Golgiapparatet mottar blærer fra ER på mottakersiden, setter på kjemiske «adresselapper» og sender ferdige pakker ut fra avsendersiden.',
    summaryTitle: 'Setter adresselapp på proteinene så de havner på nøyaktig riktig sted',
    whatHappens:
      'Når et protein eller fettmolekyl er ferdig laget i ER, pakkes det inn i en liten transportblære som flyter bort til Golgiapparatet – en stabel med buede, flate membransekker som ligner en stabel pannekaker. Her inne finpusses molekylene: Golgiapparatet klipper, kobler på karbohydrat- eller fosfatgrupper som fungerer som kjemiske «postnumre», sorterer lasten og pakker den i nye blærer med ulik destinasjon.',
    keyTraits: [
      {
        title: 'Mottakerside (cis) og avsenderside (trans)',
        description:
          'Råvareblærer fra ER smelter inn på siden som vender mot cellekjernen, modnes fra sekk til sekk gjennom stabelen, og snøres av som ferdige leveranser på yttersiden.',
        icon: 'compass',
      },
      {
        title: 'Kjemiske adresselapper (glykosylering)',
        description:
          'Uten riktig sukker- eller fosfatmerking fra Golgiapparatet ville fordøyelsesenzymer til lysosomene eller hormoner som skal ut i blodet gått seg vill i cellen!',
        icon: 'cpu',
      },
      {
        title: 'Bygger også cellens egne lysosomer',
        description:
          'Golgiapparatet pakker kraftige nedbrytningsenzymer trygt inn i egne blærer som blir til nye lysosomer.',
        icon: 'layers',
      },
    ],
    classroomTest:
      'Se på hele samlebåndet i sammenheng på figuren i midten: Cellekjerne (tegning) → Ribosom & Ru ER (produksjon) → Golgiapparatet (pakking og adresse) → Transportvesikkel (varebil ut til cellemembranen)!',
    didYouKnow:
      'Da den italienske legen Camillo Golgi oppdaget dette apparatet i nerveceller i 1898 ved hjelp av sølvfarging, trodde mange forskere i over 50 år at det bare var en fargeflekk eller feil i mikroskopet – helt til elektronmikroskopet på 1950-tallet beviste at han hadde rett!',
    examples: [
      'Glykoproteiner («adresselapp»)',
      'Sortering av hormoner og slim',
      'Dannelse av lysosomer',
      'Oppkalt etter Camillo Golgi (Nobelpris 1906)',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // DEL 7: TRANSPORTVESIKLER (ENDO- & EKSOCYTOSE)
  // ==========================================
  {
    id: 'cell_vesicles',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'cell_golgi',
    stepNumber: 7,
    title: 'Transportvesikler – Eksocytose og endocytose',
    shortLabel: 'Transportvesikler',
    latinName: 'Vesiculae • Blæretransport inn og ut av cellen',
    timeMa: '~50–200 nm blærer',
    eraLabel: 'Varelevering og signaloverføring',
    x: 1415,
    y: 550,
    anchorX: 1059,
    anchorY: 510,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'boundary',
    traceBadge: 'Varebiler inn & ut',
    image: evoImg('cell_vesicles.png'),
    imageCaption:
      'Under eksocytose smelter en transportvesikkel sømløst sammen med cellemembranen og tømmer innholdet (som hormoner eller nevrotransmittere) ut av cellen.',
    summaryTitle: 'Små membranbobler som frakter store laster uten å lage hull i cellen',
    whatHappens:
      'Store molekyler som proteiner, hormoner eller hele bakterier er altfor store til å smette gjennom vanlige transportkanaler i cellemembranen. Løsningen til eukaryote celler er vesikler – små bobler laget av nøyaktig samme fosfolipid-membran som selve cellemembranen og Golgiapparatet! Fordi membranene er bygd av samme materiale, kan de snøres av og smelte sammen som såpebobler uten at cellen lekker.',
    keyTraits: [
      {
        title: 'Eksocytose («ut av cellen»)',
        description:
          'Vesikler fra Golgiapparatet fraktes til cellemembranen, smelter sammen med den og tømmer ut bl.a. insulin i blodet, fordøyelsesenzymer i tarmen eller signalstoffer mellom nerveceller!',
        icon: 'zap',
      },
      {
        title: 'Endocytose («inn i cellen»)',
        description:
          'Cellemembranen bukter seg innover og snører av en blære rundt partikler eller væske på utsiden for å ta dem inn i cellen.',
        icon: 'waves',
      },
      {
        title: 'Fagocytose («cellespising» i immunforsvaret)',
        description:
          'Hvite blodceller (makrofager) strekker cellemembranen rundt hele bakterier og virus, sluker dem i en stor blære og kobler på lysosomer for å tilintetgjøre inntrengeren!',
        icon: 'shield',
      },
    ],
    classroomTest:
      'Huskeregel for forstavelsene: EKSO-cytose = EKSPORT ut av cellen (tenk «Exit»). ENDO-cytose = ENTER inn i cellen!',
    didYouKnow:
      'Hver eneste tanke du tenker akkurat nå er avhengig av lynrask eksocytose! I kontaktpunktene (synapsene) mellom hjernecellene dine tømmes synaptiske vesikler med signalstoffer på under ett tusendels sekund etter at et nervesignal ankommer!',
    examples: [
      'Eksocytose av hormoner og nevrotransmittere',
      'Endocytose av næringsstoffer',
      'Fagocytose hos hvite blodceller',
      'Membransammensmelting',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // DEL 8: MITOKONDRIER
  // ==========================================
  {
    id: 'cell_mitochondria',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'cell_vesicles',
    stepNumber: 8,
    title: 'Mitokondrier – Cellens kraftverk og ur-bakterie',
    shortLabel: 'Mitokondrier (ATP)',
    latinName: 'Mitochondrion • Aerob celleånding og endosymbiose',
    timeMa: '~1000–2500 per muskelcelle',
    eraLabel: 'Energiproduksjon (ATP) og egen DNA-arv',
    x: 1415,
    y: 745,
    anchorX: 1018,
    anchorY: 594,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'energy_recycle',
    traceBadge: 'Cellens kraftverk (ATP)',
    image: evoImg('cell_mitochondria.png'),
    imageCaption:
      'Mitokondriet har dobbel membran med dype indre folder (cristae) for ATP-produksjon – samt sin egen lille ring av bakterie-lignende DNA!',
    summaryTitle: 'Forbrenner næring med oksygen og lader opp kroppens energibatterier (ATP)',
    whatHappens:
      'Mitokondriene er cellens kraftverk! Her foregår hoveddelen av den aerobe celleåndingen (sitronsyresyklusen og elektrontransportkjeden), der nedbrytningsprodukter fra sukker (glukose) og fett reagerer med oksygen (O₂). Energien som frigjøres lagres ikke bare som varme, men brukes til å lade opp millioner av små energimolekyler kalt ATP (adenosintrifosfat) – «kontantvalutaen» som driver muskelarbeid, nerveimpulser og proteinsyntese i hele cellen!',
    keyTraits: [
      {
        title: 'Celleåndingens likning: Glukose + O₂ → CO₂ + H₂O + ATP',
        description:
          'Den sterkt foldede indre membranen (cristae) gir en enorm overflate der elektrontransportkjeden og rotor-enzymet ATP-syntase produserer opptil ~30–32 ATP per glukosemolekyl!',
        icon: 'flame',
      },
      {
        title: 'Endosymbioseteorien – en 2 milliarder år gammel avtale!',
        description:
          'Mitokondrier har dobbel membran, eget ringformet DNA, egne små ribosomer og deler seg selvstendig – fordi de opprinnelig var frittlevende bakterier som ble tatt opp av ur-eukaryoten!',
        icon: 'dna',
      },
      {
        title: 'Flest der energibehovet er størst',
        description:
          'Hjertemuskelceller, skjelettmuskelceller og hjerneceller er stappfulle av tusenvis av mitokondrier og merker oksygenmangel aller først.',
        icon: 'heart',
      },
    ],
    classroomTest:
      'Koble dette temaet tilbake til Steg 2 i «Livets Tre»: Husker dere at ALLE eukaryote celler – altså både dyr, planter og sopp – har mitokondrier? (Ja, planteceller har BÅDE kloroplaster til fotosyntese OG mitokondrier til celleånding!)',
    didYouKnow:
      'Nesten 100 % av mitokondrie-DNA-et ditt kommer utelukkende fra moren din! Sædcellens mitokondrier sitter i halestykket for å drive svømmingen frem til egget, og brytes ned etter befruktningen. Videre produserer et voksent menneske faktisk sin egen kroppsvekt i ATP hver eneste dag (ved å lade opp og bruke de samme ATP-molekylene tusenvis av ganger)!',
    examples: [
      'Aerob celleånding (ATP)',
      'Indre membranfolder (cristae)',
      'Eget ringformet mtDNA (morsarv)',
      'Endosymbioseteorien',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // DEL 9: LYSOSOMER & PEROKSISOMER
  // ==========================================
  {
    id: 'cell_lysosomes',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'cell_mitochondria',
    stepNumber: 9,
    title: 'Lysosomer og peroksisomer – Gjenvinning og rensing',
    shortLabel: 'Lysosomer & gjenvinning',
    latinName: 'Lysosoma & Peroxisoma • Autofagi og avgiftning',
    timeMa: 'Surt indre (pH ~4,8)',
    eraLabel: 'Cellens mage, gjenvinningsstasjon og brannvern',
    x: 1415,
    y: 940,
    anchorX: 915,
    anchorY: 638,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'energy_recycle',
    traceBadge: 'Gjenvinning & rensing',
    image: evoImg('cell_lysosomes.png'),
    imageCaption:
      'Et lysosom smelter sammen med en utslitt organell (autofagi) og klipper den opp til nye, gjenbrukbare aminosyrer og fettsyrer.',
    summaryTitle: 'Bryter ned avfall, bakterier og ødelagte deler til splitter nye råvarer',
    whatHappens:
      'En levende celle produserer kontinuerlig slitasje og avfall som ville forgiftet cellen uten effektiv renovasjon. Lysosomer er kuleformede blærer fylt med rundt 40 kraftige nedbrytningsenzymer som klipper opp gamle proteiner, karbohydrater, fett, utslitte mitokondrier og inntrengende bakterier. Ved siden av dem jobber peroksisomene med å bryte ned lange fettsyrer og uskadeliggjøre reaktive oksygenforbindelser som hydrogenperoksid (H₂O₂).',
    keyTraits: [
      {
        title: 'Innebygd sikkerhetslås med lav pH',
        description:
          'Inne i lysosomet pumpes det inn H⁺-ioner slik at pH-en er sur (~4,8). Hvis et enkelt lysosom sprekker ved et uhell, virker enzymene dårlig i den nøytrale cellevæsken (pH 7,2) – slik unngår cellen å fordøye seg selv!',
        icon: 'shield',
      },
      {
        title: 'Autofagi («selvspising» og fornyelse)',
        description:
          'Når et mitokondrium blir gammelt og lekker frie radikaler, pakkes det inn og leveres til et lysosom slik at alle byggesteinene resirkuleres (oppdagelsen ga Nobelprisen i medisin i 2016!).',
        icon: 'sparkles',
      },
      {
        title: 'Peroksisomer og enzymet katalase',
        description:
          'Peroksisomer omdanner skadelig hydrogenperoksid (H₂O₂) lynraskt til helt ufarlig vann (H₂O) og oksygengass (O₂).',
        icon: 'flame',
      },
    ],
    classroomTest:
      'Kobling til «Menneskekroppens evolusjonære spor»: Husker dere fosterhalen i uke 6 og svømmehuden mellom fingrene våre i fosterlivet? Det er nettopp kontrollert celledød og lysosomer som rydder bort de cellene før vi blir født!',
    didYouKnow:
      'Har du dryppet rensevæske med hydrogenperoksid på et skrubbsår eller på en rå potet-/leverbit på naturfaglaben og sett det skumme kraftig hvitt? Boblene er ren oksygengass (O₂) produsert av enzymet katalase fra peroksisomene – ett eneste katalase-molekyl kan spalte opptil 40 millioner H₂O₂-molekyler i sekundet!',
    examples: [
      'Autofagi (resirkulering av organeller)',
      'Surt miljø (pH ~4,8)',
      'Forsvar mot bakterier',
      'Peroksisomer og katalase (H₂O₂ → H₂O + O₂)',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // DEL 10: CYTOSKJELETTET & CENTROSOMET
  // ==========================================
  {
    id: 'cell_cytoskeleton',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'cell_lysosomes',
    stepNumber: 10,
    title: 'Cytoskjelettet og centrosomet – Reisverk, motorveier og celledeling',
    shortLabel: 'Cytoskjelett & centrioler',
    latinName: 'Cytosceletus & Centrosoma • Form, bevegelse og mitose',
    timeMa: 'Uten stiv cellevegg!',
    eraLabel: 'Indre skjelett, vandrende motorproteiner og kromosomdeling',
    x: 235,
    y: 940,
    anchorX: 712,
    anchorY: 713,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'structure',
    traceBadge: 'Reisverk & celledeling',
    image: evoImg('cell_cytoskeleton.png'),
    imageCaption:
      'Et tobeint motorprotein (kinesin) «går» bortover et mikrotubulus-rør i cytoskjelettet mens det bærer en stor transportvesikkel over hodet – med centriolene i bakgrunnen.',
    summaryTitle: 'Gir dyrecellen form uten cellevegg, frakter vesikler på skinner og styrer celledelingen!',
    whatHappens:
      'Fordi dyreceller mangler plantecellenes stive cellevegg, holdes cellens form oppe innenfra av cytoskjelettet – et dynamisk stillas av tre typer proteintråder som kan bygges opp og rives ned på sekunder. Dette gjør at hvite blodceller kan krype etter bakterier og muskelceller kan trekke seg sammen! Samtidig fungerer rørene (mikrotubuli) som jernbaneskinner for vandrende motorproteiner. Like ved kjernen ligger centrosomet med to sylinderformede centrioler som organiserer spindeltrådene under celledeling.',
    keyTraits: [
      {
        title: 'Motorproteiner (kinesin) som bokstavelig talt går på to bein!',
        description:
          'Vesikler flyter ikke tilfeldig rundt: Motorproteiner som kinesin og dynein bruker ATP til å «spasere» steg for steg langs mikrotubuli med store vareblærer på ryggen!',
        icon: 'footprints',
      },
      {
        title: 'Fleksibel form og muskelbevegelse (aktin og myosin)',
        description:
          'Tynne aktinfilamenter rett under cellemembranen lar dyreceller endre form, dele seg i to og danner selve sammentrekningsmaskineriet i alle musklene dine.',
        icon: 'activity',
      },
      {
        title: 'Centrosomet og centriolene ved celledeling (mitose & meiose)',
        description:
          'Før cellen deler seg, kopieres centrosomet og drar til hver sin pol i cellen. Derfra skytes spindeltråder ut som fester seg til kromosomene og trekker ett sett DNA til hver dattercelle!',
        icon: 'dna',
      },
    ],
    classroomTest:
      'Se nøye på hovedillustrasjonen over: Den lille «figuren» med to føtter på det grønne røret er ikke science fiction – det er den faktiske molekylære formen til motorproteinet kinesin, som tar over 100 skritt i sekundet inne i cellene dine!',
    didYouKnow:
      'I en lang nervecelle som går fra korsryggen din og helt ned til stortåen (opptil 1 meter lang!), må vesikler med proteiner fraktes fra cellekjernen i ryggen og helt ned til foten langs mikrotubuli-motorveiene. For ett enkelt kinesin-protein tar den «fotturen» omtrent en hel uke!',
    examples: [
      'Mikrotubuli og aktinfilamenter',
      'Motorproteinet kinesin',
      'Centrosom med to centrioler',
      'Spindeltråder under mitose/meiose',
    ],
    accentCategory: 'human',
  },
];

export const CELL_NODE_MAP: Record<string, AnimalCellNodeData> = Object.fromEntries(
  CELL_NODES.map((n) => [n.id, n]),
);

export const CELL_CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'cq1',
    number: 1,
    question:
      'Forklar reisen fra et gen inne i cellekjernen og helt til et ferdig protein (f.eks. hormonet insulin) skilles ut av dyrecellen!',
    contextHint:
      'Følg rekkefølgen mellom organellene vi nettopp så på: Kjerne → Ribosom/ER → Golgi → Vesikkel → Cellemembran.',
    points: [
      {
        heading: '1. Cellekjernen: Transkripsjon (DNA → mRNA)',
        detail:
          'Genet for proteinet åpnes på DNA-tråden inne i cellekjernen, og det lages en arbeidskopi (mRNA) som fraktes ut gjennom en kjernepore til cytoplasma.',
        badge: 'Steg 1',
      },
      {
        heading: '2. Ribosom og Ru ER: Translasjon og 3D-folding',
        detail:
          'Et ribosom på utsiden av ru ER leser av mRNA-oppskriften og kobler sammen aminosyrer til en proteinkjede, som foldes i riktig tredimensjonal form inne i kanalsystemet i ru ER.',
        badge: 'Steg 2',
      },
      {
        heading: '3. Golgiapparatet og eksocytose via cellemembranen',
        detail:
          'En transportblære frakter proteinet til Golgiapparatet, som setter på riktig kjemisk «adresselapp» og pakker det i en sekretorisk vesikkel. Vesikkelen fraktes langs cytoskjelettet, smelter sammen med cellemembranen og tømmer proteinet ut av cellen (eksocytose)!',
        badge: 'Steg 3',
      },
    ],
    takeaway:
      'Cellens organeller jobber ikke hver for seg, men som et sømløst samlebånd der informasjon (DNA/mRNA), produksjon (ribosomer/ER), logistikk (Golgi/vesikler) og energi (mitokondrier) er avhengige av hverandre.',
  },
  {
    id: 'cq2',
    number: 2,
    question:
      'Hva er de viktigste forskjellene og likhetene mellom en eukaryot dyrecelle, en eukaryot plantecelle og en prokaryot bakteriecelle?',
    contextHint:
      'Tenk på cellekjerne, cellevegg, energiorganeller (mitokondrier vs. kloroplaster) og størrelse.',
    points: [
      {
        heading: 'Prokaryot (bakterier/arker) vs. Eukaryot (dyr, planter, sopp)',
        detail:
          'Prokaryote celler er små (~1–5 µm), mangler cellekjerne (DNA ligger fritt som en ring i cytoplasma) og mangler membranomsluttede organeller som mitokondrier og ER. Eukaryote celler er ~10 ganger større i diameter og har ekte cellekjerne og indre organeller.',
        badge: 'Hovedskille',
      },
      {
        heading: 'Dyrecelle vs. Plantecelle (begge er eukaryote!)',
        detail:
          'Begge har cellemembran, cellekjerne, ribosomer, ER, Golgiapparat og mitokondrier! Men plantecellen har i tillegg stiv cellevegg av cellulose, kloroplaster for fotosyntese og en stor væskefylt vakuole som gir saftspenning.',
        badge: 'Dyr vs. plante',
      },
      {
        heading: 'Hva har dyrecellen som planteceller vanligvis mangler?',
        detail:
          'Dyrecellen har fleksibel form uten cellevegg (kan krype og danne muskel-/nervevev), tydelige lysosomer og centrosom med centrioler.',
        badge: 'Dyrecellens særpreg',
      },
    ],
    comparisonTable: {
      headers: ['Egenskap / Organell', 'Eukaryot dyrecelle', 'Plantecelle / Bakteriecelle'],
      rows: [
        [
          'Cellekjerne med membran',
          'Ja (lineære kromosomer)',
          'Plantecelle: Ja • Bakterie: Nei (fritt ring-DNA)',
        ],
        [
          'Cellemembran & ribosomer',
          'Ja',
          'Ja – finnes hos absolutt alle levende celler!',
        ],
        [
          'Stiv cellevegg utenpå',
          'Nei – kun fleksibel cellemembran og indre cytoskjelett',
          'Plantecelle: Ja (cellulose) • Bakterie: Ja (peptidoglykan)',
        ],
        [
          'Mitokondrier (celleånding)',
          'Ja – cellens ATP-kraftverk',
          'Plantecelle: Ja! • Bakterie: Nei (bruker egen cellemembran)',
        ],
        [
          'Kloroplaster & stor vakuole',
          'Nei (heterotrof – må spise organisk næring)',
          'Plantecelle: Ja (fotosyntese og saftspenning)',
        ],
      ],
    },
    takeaway:
      'En klassisk felle er å tro at planteceller har kloroplaster «i stedet for» mitokondrier – husk at planteceller har BEGGE deler, mens dyreceller kun har mitokondrier og mangler cellevegg!',
  },
  {
    id: 'cq3',
    number: 3,
    question:
      'Hva foregår i mitokondriene, og hvilke bevis i cellen støtter endosymbioseteorien?',
    contextHint:
      'Se på mitokondriets membraner, eget arvestoff og hvordan det formerer seg.',
    points: [
      {
        heading: 'Aerob celleånding: Glukose + 6 O₂ → 6 CO₂ + 6 H₂O + ATP',
        detail:
          'I mitokondriets indre rom og sterkt foldede indre membran (cristae) brytes næringsstoffer helt ned ved hjelp av oksygen for å lade opp store mengder ATP.',
        badge: 'Funksjon',
      },
      {
        heading: 'Dobbel membran fra innslukingen for ~2 milliarder år siden',
        detail:
          'Den indre membranen ligner membranen til frittlevende bakterier, mens den ytre membranen stammer fra ur-eukaryotens egen cellemembran da bakterien ble omsluttet uten å bli fordøyd.',
        badge: 'Bevis 1',
      },
      {
        heading: 'Eget ringformet DNA, bakterie-ribosomer og egen deling',
        detail:
          'Mitokondriene har sin egen lille sirkulære DNA-tråd (mtDNA), egne små ribosomer av bakterietype (70S), og cellen kan ikke bygge nye mitokondrier fra bunnen av – de må dele seg i to akkurat som bakterier!',
        badge: 'Bevis 2',
      },
    ],
    takeaway:
      'Endosymbiosen mellom en arke-lignende vertscelle og en oksygenbrukende bakterie ga et gigantisk energiløft som gjorde komplekse, flercellede dyr mulige!',
  },
];
