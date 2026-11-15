import {
  evoImg,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type ProteinPhaseCategory =
  | 'nucleus'
  | 'nuclear_pore'
  | 'translation'
  | 'folding';

export interface ProteinTimelineNodeData extends TreeNodeData {
  /** Whether the milestone card sits above or below the central timeline track */
  cardSide: 'above' | 'below';
  /** Molecular phase along the timeline for color-coding and zone headers */
  phaseCategory: ProteinPhaseCategory;
  /** Short molecular formula / codon tag displayed on the timeline card */
  molecularTag: string;
}

export const PROTEIN_MAIN_STEP_IDS: string[] = [
  'prot_dna_gene',
  'prot_transcription',
  'prot_splicing',
  'prot_nuclear_export',
  'prot_genetic_code',
  'prot_initiation',
  'prot_elongation',
  'prot_termination',
  'prot_folding',
  'prot_function',
];

export const PROTEIN_NODES: ProteinTimelineNodeData[] = [
  // ==========================================
  // STEG 1: GENET I DNA ÅPNES (CELLEKJERNEN)
  // ==========================================
  {
    id: 'prot_dna_gene',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Genet i DNA åpnes – Oppskriften finnes fram',
    shortLabel: 'DNA-genet åpnes',
    latinName: 'Deoksyribonukleinsyre • Promotor, maltråd & baseparing',
    timeMa: 'Fase 1 • Cellekjernen',
    eraLabel: 'Startsignal på DNA-tråden',
    x: 240,
    y: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    phaseCategory: 'nucleus',
    molecularTag: 'DNA: A–T og C–G',
    traceBadge: 'Cellekjernen • Oppskrift',
    image: evoImg('prot_step1_dna.png'),
    imageCaption:
      'DNA-dobbelheliksen tvinnes forsiktig opp ved promotoren på ett bestemt gen inne i cellekjernen, klar til å leses av som mal.',
    summaryTitle: 'Et gen er oppskriften på ett protein – lagret trygt inne i cellekjernen',
    whatHappens:
      'Alt starter når cellen får et signal om at den trenger et bestemt protein – for eksempel insulin etter et måltid, eller hemoglobin i en umoden blodcelle. Inne i cellekjernen ligger arvestoffet DNA som en lang dobbelttrådet vindeltrapp med fire nitrogenbaser: adenin (A), tymin (T), cytosin (C) og guanin (G), der A alltid parer med T og C alltid parer med G. Transkripsjonsfaktorer fester seg til et startområde kalt promotoren rett foran genet, og tvinger de svake hydrogenbindingene mellom de to DNA-trådene til å åpne seg akkurat her!',
    keyTraits: [
      {
        title: 'Hvorfor ikke sende selve DNA-et ut av kjernen?',
        description:
          'DNA er cellens uerstattelige «originalbok» med rundt 20 000 gener. Sendes originalen ut i det travle cytoplasmaet, kan den bli skadet – derfor lager cellen heller en arbeidskopi (mRNA) av bare det ene genet!',
        icon: 'shield',
      },
      {
        title: 'Maltråd (3\' → 5\') og kodende tråd',
        description:
          'Bare den ene av de to DNA-trådene leses av for hvert gen: denne kalles maltråden (templat-tråden), mens motparten kalles den kodende tråden.',
        icon: 'dna',
      },
      {
        title: 'Genregulering avgjør hva slags celle du ser på',
        description:
          'En hjernecelle og en muskelcelle i kroppen din har nøyaktig samme DNA, men skrur på helt ulike gener ved hjelp av promotorer og transkripsjonsfaktorer!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Bibliotek-analogien i timen: Tenk på cellekjernen som hvelvet i nasjonalbiblioteket med en uerstattelig oppskriftsbok (DNA). Du får aldri låne med hele boka hjem til kjøkkenet (ribosomene), men du får ta et raskt mobilbilde (mRNA) av den ene kakeoppskriften du skal bake!',
    didYouKnow:
      'Hvis du trekker ut alt DNA-et fra én eneste mikroskopisk menneskecelle og legger trådene etter hverandre, blir tråden rundt 2 meter lang – likevel får den plass i en cellekjerne på bare 0,006 millimeter fordi den er kveilet stramt rundt histon-proteiner!',
    examples: [
      'DNA-dobbelheliks',
      'Gen',
      'Promotor (startområde)',
      'Baseparingsregelen (A–T, C–G)',
      'Maltråd',
    ],
  },

  // ==========================================
  // STEG 2: TRANSKRIPSJON (DNA -> PRE-mRNA)
  // ==========================================
  {
    id: 'prot_transcription',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'prot_dna_gene',
    stepNumber: 2,
    title: 'Transkripsjon – RNA-polymerase skriver pre-mRNA',
    shortLabel: 'Transkripsjon',
    latinName: 'RNA-polymerase II • Urasil (U) erstatter Tymin (T)',
    timeMa: 'Fase 1 • Cellekjernen',
    eraLabel: 'Omskriving fra DNA til RNA',
    x: 540,
    y: 560,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    phaseCategory: 'nucleus',
    molecularTag: 'DNA → pre-mRNA (U i stedet for T)',
    traceBadge: 'RNA-polymerase • 5\' → 3\'',
    image: evoImg('prot_step2_transcription.png'),
    imageCaption:
      'Enzymet RNA-polymerase glir langs maltråden i DNA og kobler frie RNA-nukleotider sammen til en enkelttrådet, gyllen mRNA-kjede.',
    summaryTitle: 'Enzymet RNA-polymerase leser maltråden base for base og bygger en komplementær RNA-tråd',
    whatHappens:
      'Selve kopieringen heter transkripsjon («omskriving»). Hovedrolleinnehaveren er det store enzymet RNA-polymerase, som fester seg ved promotoren og glir langs maltråden på DNA som et lokomotiv på en skinnegang. For hver base på DNA-maltråden henter enzymet inn den komplementære RNA-byggesteinen fra kjernesaften: står det G på DNA, settes C inn; står det C, settes G inn; står det T, settes A inn. Men pass på fellen: står det A på DNA-maltråden, setter RNA-polymerase inn urasil (U) – for RNA bruker basen U i stedet for tymin (T)! Bak enzymet lukker DNA-glidelåsen seg pent igjen.',
    keyTraits: [
      {
        title: 'Huskeregelen for eksamen: A i DNA gir U i mRNA!',
        description:
          'DNA-sekvensen 3\'-TAC GGA-5\' på maltråden blir omskrevet til 5\'-AUG CCU-3\' på mRNA-tråden. Finner du bokstaven U i en sekvens, vet du med én gang at du ser på RNA!',
        icon: 'dna',
      },
      {
        title: 'Tre forskjeller på DNA og RNA',
        description:
          'RNA er enkelttrådet (DNA er dobbelttrådet), har sukkeret ribose (DNA har deoksyribose), og har basen urasil U i stedet for tymin T.',
        icon: 'layers',
      },
      {
        title: 'Bygger alltid i retningen 5\' → 3\'',
        description:
          'RNA-polymerase leser DNA-maltråden i retningen 3\' til 5\' og hekter nye RNA-nukleotider på 3\'-enden med en fart på rundt 40–50 baser i sekundet!',
        icon: 'zap',
      },
    ],
    classroomTest:
      'Tavleutfordring på 20 sekunder: Hvis DNA-maltråden har baserekken TAC – CGT – TTC – ACT, hva blir mRNA-tråden? Svar: AUG – GCA – AAG – UGA!',
    didYouKnow:
      'Flere titalls RNA-polymeraser kan kjøre i kø rett etter hverandre langs det samme genet samtidig – slik kan cellen produsere hundrevis av mRNA-kopier i minuttet når det haster!',
    examples: [
      'Transkripsjon',
      'RNA-polymerase',
      'Urasil (U)',
      'Ribose vs. deoksyribose',
      'Pre-mRNA',
    ],
  },

  // ==========================================
  // STEG 3: SPLEISING OG MODNING AV mRNA
  // ==========================================
  {
    id: 'prot_splicing',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'prot_transcription',
    stepNumber: 3,
    title: 'Spleising & modning – Introner ut, eksoner sammen!',
    shortLabel: 'Spleising av mRNA',
    latinName: 'mRNA-prosessering • Spleisosom, 5\'-hette & poly-A-hale',
    timeMa: 'Fase 1 • Cellekjernen',
    eraLabel: 'Redigering og beskyttelse i kjernen',
    x: 840,
    y: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    phaseCategory: 'nucleus',
    molecularTag: 'Ekson + Ekson • 5\'-hette & Poly-A',
    traceBadge: 'Eukaryot redigering',
    image: evoImg('prot_step3_splicing.png'),
    imageCaption:
      'Spleisosomer klipper ut ikke-kodende lilla introner i løkker og skjøter de gylne kodende eksonene sammen til et ferdig modent mRNA med 5\'-hette og poly-A-hale.',
    summaryTitle: 'Råutkastet (pre-mRNA) klippes, limes og får «hjelm og støvel» før avreise',
    whatHappens:
      'Hos eukaryote organismer (dyr, planter og sopp) er den nyproduserte RNA-tråden bare et uferdig råutkast kalt pre-mRNA. Overraskende nok inneholder genet lange ikke-kodende mellomstykker kalt introner midt mellom de oppskriftsbærende bitene kalt eksoner! Molekylære «sakser» kalt spleisosomer bøyer intronene i løkker, klipper dem ut og skjøter eksonene presist sammen. Samtidig får tråden påmontert en beskyttende 5\'-hette i front og en lang poly-A-hale (hundrevis av A-baser) bakerst, slik at enzymer i cytoplasma ikke spiser opp meldingen på veien.',
    keyTraits: [
      {
        title: 'Introner = INne i kjernen • Eksoner = EXporteres ut!',
        description:
          'Et genialt husketriks: Intronene blir igjen og resirkuleres inne i cellekjernen, mens eksonene (EXit!) spleises sammen og eksporteres ut til ribosomene.',
        icon: 'sparkles',
      },
      {
        title: 'Alternativ spleising: Én oppskrift – mange ulike proteiner!',
        description:
          'Ved å kombinere eksonene på litt ulike måter kan ett og samme gen gi opphav til flere forskjellige proteiner i f.eks. muskelvev og hjernevev!',
        icon: 'cpu',
      },
      {
        title: '5\'-hette og poly-A-hale gir pass og levetid',
        description:
          '5\'-hetten fungerer som «inngangsbillett» på ribosomet, mens lengden på poly-A-halen styrer hvor lenge mRNA-molekylet overlever før det brytes ned.',
        icon: 'shield',
      },
    ],
    classroomTest:
      'Spør klassen: Mennesket har bare rundt 20 000 proteinkodende gener – knapt flere enn en liten rundorm! Hvordan kan vi likevel lage over 100 000 ulike proteiner? Svaret er alternativ spleising av eksonene!',
    didYouKnow:
      'Prokaryote bakterier har nesten ingen introner og mangler cellekjerne – hos en bakterie begynner ribosomene faktisk å oversette mRNA til protein i den ene enden mens RNA-polymerase fortsatt skriver på den andre enden!',
    examples: [
      'Introner (klippes bort)',
      'Eksoner (skjøtes sammen)',
      'Spleisosom',
      'Alternativ spleising',
      '5\'-hette & poly-A-hale',
    ],
  },

  // ==========================================
  // STEG 4: EKSPORT GJENNOM KJERNEPOREN
  // ==========================================
  {
    id: 'prot_nuclear_export',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'prot_splicing',
    stepNumber: 4,
    title: 'Ut gjennom kjerneporen – Fra arkiv til fabrikkhall',
    shortLabel: 'Kjerneporen',
    latinName: 'Porus nuclearis • Kvalitetskontroll ved kjernemembranen',
    timeMa: 'Overgang • Kjernemembran',
    eraLabel: 'Transport fra kjerne til cytoplasma',
    x: 1140,
    y: 560,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    phaseCategory: 'nuclear_pore',
    molecularTag: 'Kjerne → Cytoplasma',
    traceBadge: 'Grensekontroll • Kjernepore',
    image: evoImg('prot_step4_export.png'),
    imageCaption:
      'Det ferdig spleisede mRNA-båndet trer seg ut gjennom et åttekantet kjerneporekompleks i den doble kjernemembranen og ut i cytoplasmaet der ribosomene venter.',
    summaryTitle: 'Kun ferdig modnet og godkjent mRNA slipper gjennom dørvaktene i kjernemembranen',
    whatHappens:
      'Nå er det modne mRNA-molekylet (budbringer-RNA / messenger RNA) klart for sitt oppdrag som sendebud! Cellekjernen er omgitt av en dobbel kjernemembran med tusenvis av avanserte sluseporter kalt kjerneporer. Kjerneporene fungerer som streng grensekontroll: uferdig pre-mRNA som fortsatt har introner eller mangler 5\'-hette og poly-A-hale blir holdt igjen, mens det godkjente mRNA-et geleides aktivt gjennom poren og ut i cytoplasmaet (cytosolen) – der millioner av ribosomer står klare til å lese koden.',
    keyTraits: [
      {
        title: 'Hvorfor det heter mRNA («messenger RNA»)',
        description:
          'Bokstaven m står for messenger (budbringer): mRNA frakter den genetiske beskjeden fra DNA i kjernen ut til proteinfabrikkene i cytoplasma.',
        icon: 'compass',
      },
      {
        title: 'Streng kvalitetskontroll i kjerneporen',
        description:
          'Hver kjernepore er bygd av over 500 proteiner som sjekker eksportmerkelappene på mRNA-tråden, slik at cellen ikke bruker energi på feilklippede oppskrifter.',
        icon: 'shield',
      },
      {
        title: 'Skillet mellom transkripsjon og translasjon hos eukaryoter',
        description:
          'Kjernemembranen deler proteinsyntesen i to adskilte rom og faser: Fase 1 (transkripsjon) skjer i kjernen, mens Fase 2 (translasjon) skjer i cytoplasma!',
        icon: 'layers',
      },
    ],
    classroomTest:
      'Kobling til celletemaene: Både i «Eukaryot dyrecelle» og «Eukaryot plantecelle» så vi kjerneporene på overflaten av cellekjernen – og at den ytre kjernemembranen henger direkte sammen med ru ER fullt av ribosomer!',
    didYouKnow:
      'En aktiv menneskecelle har rundt 3 000 til 4 000 kjerneporer, og hver eneste pore kan eksportere opptil flere hundre makromolekyler i minuttet i begge retninger!',
    examples: [
      'Budbringer-RNA (mRNA)',
      'Dobbel kjernemembran',
      'Kjerneporekompleks',
      'Eksportkontroll',
      'Cytoplasma',
    ],
  },

  // ==========================================
  // STEG 5: DEN GENETISKE KODEN (KODON) OG tRNA
  // ==========================================
  {
    id: 'prot_genetic_code',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'prot_nuclear_export',
    stepNumber: 5,
    title: 'Triplettkoden & tRNA – Cellens geniale tolk',
    shortLabel: 'Kodon & tRNA',
    latinName: 'Transfer-RNA • 64 kodon koder for 20 aminosyrer',
    timeMa: 'Fase 2 • Cytoplasma',
    eraLabel: 'Oversettelsesnøkkelen klargjøres',
    x: 1480,
    y: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    phaseCategory: 'translation',
    molecularTag: '3 baser = 1 kodon = 1 aminosyre',
    traceBadge: 'tRNA • Kodon ↔ Antikodon',
    image: evoImg('prot_step5_trna.png'),
    imageCaption:
      'Tre kløverblad-/L-formede tRNA-molekyler med antikodon i bunnen og hver sin fargede aminosyre på toppen nærmer seg mRNA-trådens trebokstavskodon.',
    summaryTitle: 'Tre og tre baser på mRNA (ett kodon) oversettes av transport-RNA (tRNA) til riktig aminosyre',
    whatHappens:
      'Ute i cytoplasma skal nukleotidspråket (4 bokstaver: A, U, C, G) oversettes til proteinspråket (20 ulike aminosyrer). Hvis én base kodet for én aminosyre, hadde vi bare hatt plass til 4 aminosyrer. Med to baser (4 × 4 = 16) er det fortsatt for få. Derfor leses mRNA i grupper på TRE baser av gangen – en triplett kalt et kodon (4 × 4 × 4 = 64 kombinasjoner)! Tolken som kobler de to språkene sammen er transport-RNA (tRNA): i den ene enden bærer tRNA én bestemt aminosyre, og i den andre enden har det tre baser kalt antikodon som passer som nøkkel i lås mot kodonet på mRNA!',
    keyTraits: [
      {
        title: 'Kodon på mRNA ↔ Antikodon på tRNA',
        description:
          'Hvis kodonet på mRNA er 5\'-GGC-3\', vil kun et tRNA med det komplementære antikodonet 3\'-CCG-5\' feste seg – og det har alltid aminosyren glysin på ryggen!',
        icon: 'dna',
      },
      {
        title: 'Redundant («degenerert»), men aldri tvetydig kode',
        description:
          'Fordi det finnes 61 aminosyrekodon til bare 20 aminosyrer, har mange aminosyrer 2–6 synonyme kodon (f.eks. gir både GGU, GGC, GGA og GGG glysin). Det beskytter mot små mutasjoner!',
        icon: 'shield',
      },
      {
        title: 'Universell genetisk kode for alt liv på jorda',
        description:
          'Fra bakterier og furutrær til blåhval og menneske betyr kodonet UUU aminosyren fenylalanin – et av de aller sterkeste bevisene for felles opphav fra LUCA!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Bruk kodonsol / kodontabell! Viktig eksamenstriks: Når du slår opp i en kodonsol i biologi eller naturfag, skal du ALLTID lese bokstavene fra mRNA-kodonet (5\' → 3\'), ALDRI fra tRNA-antikodonet eller DNA!',
    didYouKnow:
      'Fordi den genetiske koden er universell, kan vi sette genet for menneskelig insulin inn i gjærceller eller E. coli-bakterier i store ståltanker – og bakteriene produserer ekte menneskeinsulin til tusenvis av diabetikere!',
    examples: [
      'Den genetiske koden',
      'Triplett / Kodon (mRNA)',
      'Antikodon (tRNA)',
      'Transport-RNA (tRNA)',
      '20 aminosyrer',
    ],
  },

  // ==========================================
  // STEG 6: START AV TRANSLASJONEN (INITIERING)
  // ==========================================
  {
    id: 'prot_initiation',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'prot_genetic_code',
    stepNumber: 6,
    title: 'Start av translasjonen – Ribosomet finner AUG',
    shortLabel: 'Startkodon AUG',
    latinName: 'Initiering • Liten + stor ribosomdel + Metionin',
    timeMa: 'Fase 2 • Ribosomet',
    eraLabel: 'Translasjonen starter ved AUG',
    x: 1780,
    y: 560,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    phaseCategory: 'translation',
    molecularTag: 'Startkodon AUG = Metionin',
    traceBadge: 'Ribosom • Leseramme låses',
    image: evoImg('prot_step6_initiation.png'),
    imageCaption:
      'Den lille og den store ribosomdelen (bygd av rRNA og proteiner) låser seg rundt mRNA-tråden ved startkodonet AUG med det første tRNA-molekylet som bærer metionin.',
    summaryTitle: 'Ribosomets to deler klikker sammen rundt startkodonet AUG og låser leserammen',
    whatHappens:
      'Nå starter selve translasjonen («oversettelsen» fra mRNA til aminosyrekjede) på et ribosom! Ribosomet består av to underenheter (en liten og en stor del) bygd av ribosomalt RNA (rRNA) og proteiner. Først binder den lille ribosomdelen seg til 5\'-hetten på mRNA og skanner framover langs tråden helt til den treffer startkodonet AUG. Akkurat der fester det første start-tRNA-et seg (med antikodon UAC) og leverer aminosyren metionin (Met). Da smekker den store ribosomdelen på plass som et lokk – og proteinfabrikken er i gang!',
    keyTraits: [
      {
        title: 'AUG gjør to jobber samtidig: «START HER» + Metionin',
        description:
          'Startkodonet AUG både forteller ribosomet nøyaktig hvor proteinet begynner, og koder for den aller første aminosyren metionin (som ofte klippes bort til slutt om den ikke trengs).',
        icon: 'zap',
      },
      {
        title: 'Setter den livsviktige leserammen («reading frame»)',
        description:
          'Når ribosomet låser seg på AUG, deles resten av mRNA inn i faste trebokstavsord. Forskyves starten med bare én base, blir hele resten av setningen uleselig (som «KAT TEN TOK MAT» → «ATT ENT OKM AT»)!',
        icon: 'eye',
      },
      {
        title: 'Tre typer RNA samarbeider i samme maskin',
        description:
          'Her møtes alle de tre hovedtypene RNA på én gang: mRNA har oppskriften, tRNA frakter aminosyrene, og rRNA utgjør selve ribosom-maskineriet!',
        icon: 'cpu',
      },
    ],
    classroomTest:
      'Spør elevene: Hvis et mRNA har 300 baser fra og med startkodonet AUG til og med stoppkodonet, hvor mange kodon er det? (100 kodon – men kun 99 aminosyrer, fordi det 100. kodonet er et stoppkodon uten aminosyre!)',
    didYouKnow:
      'Flere ribosomer kan feste seg etter hverandre på den samme mRNA-tråden som perler på en snor (et såkalt polysom) – slik kan cellen bygge titalls identiske proteinkjeder fra én eneste mRNA-kopi samtidig!',
    examples: [
      'Translasjon (initiering)',
      'Startkodon AUG',
      'Metionin (Met)',
      'Ribosomalt RNA (rRNA)',
      'Leseramme',
    ],
  },

  // ==========================================
  // STEG 7: KJEDEFORLENGELSE & PEPTIDBINDINGER
  // ==========================================
  {
    id: 'prot_elongation',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'prot_initiation',
    stepNumber: 7,
    title: 'Kjedeforlengelse – Aminosyrer kobles med peptidbindinger',
    shortLabel: 'Peptidbindinger',
    latinName: 'Elongering • A-sete, P-sete, E-sete & polypeptidkjede',
    timeMa: 'Fase 2 • Ribosomet',
    eraLabel: 'Kjeden vokser kodon for kodon',
    x: 2080,
    y: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    phaseCategory: 'translation',
    molecularTag: 'Aminosyre + Aminosyre → Polypeptid',
    traceBadge: 'Ribosom • Samlebånd',
    image: evoImg('prot_step7_elongation.png'),
    imageCaption:
      'Tverrsnitt av et arbeidende ribosom med tre kamre: nytt tRNA lander til høyre, voksende fargerik aminosyrekjede holdes i midten, og tomt tRNA forlater utgangen til venstre.',
    summaryTitle: 'Ribosomet flytter seg ett kodon av gangen og smir sterke peptidbindinger mellom aminosyrene',
    whatHappens:
      'Inne i det store ribosomet finnes tre arbeidsplasser ved siden av hverandre (A-, P- og E-setet) som fungerer som et lynraskt samlebånd: 1) Et nytt tRNA med matchende antikodon lander i ankomst-setet (A) med neste aminosyre. 2) Ribosomet katalyserer en sterk kovalent binding – en peptidbinding – som kobler hele den voksende aminosyrekjeden fra nabosetet (P) over på den nye aminosyren! 3) Ribosomet rykker nøyaktig ett kodon (tre baser) framover langs mRNA. Det tomme tRNA-et skyves ut av utgangs-setet (E for Exit) ut i cytoplasma for å hente en ny aminosyre, og et nytt kodon står ledig!',
    keyTraits: [
      {
        title: 'Peptidbindinger skaper en lang polypeptidkjede',
        description:
          'Bindingen mellom to aminosyrer kalles en peptidbinding (under avspalting av vann). Hundrevis av aminosyrer på rekke og rad kalles derfor en polypeptidkjede!',
        icon: 'layers',
      },
      {
        title: 'Ribosomet er egentlig et RNA-enzym (ribozym)!',
        description:
          'Det er selve rRNA-trådene inne i den store ribosomdelen – ikke ribosomproteinene – som utfører det kjemiske håndverket med å smi peptidbindingene!',
        icon: 'flame',
      },
      {
        title: 'Tomme tRNA gjenbrukes om og om igjen',
        description:
          'Så snart et tomt tRNA spretter ut av E-setet, kobler spesialenzymer (aminoacyl-tRNA-syntetaser) på en ny riktig aminosyre ved hjelp av energi fra ATP.',
        icon: 'activity',
      },
    ],
    classroomTest:
      'Samlebånd-huskeregel for A–P–E i ribosomet: A = Ankomst (nytt tRNA med aminosyre kommer inn), P = Polypeptid (holder den voksende perlekjeden), E = Exit (tomt tRNA takker for seg)!',
    didYouKnow:
      'Et menneskelig ribosom kobler sammen rundt 5–6 aminosyrer hvert eneste sekund – et gjennomsnittlig protein på 400 aminosyrer er ferdig bygd på litt over ett minutt!',
    examples: [
      'Elongering (kjedeforlengelse)',
      'Peptidbinding',
      'Polypeptidkjede',
      'A-, P- og E-setet',
      'Energikrevende prosess (ATP/GTP)',
    ],
  },

  // ==========================================
  // STEG 8: STOPPKODON & TERMINERING
  // ==========================================
  {
    id: 'prot_termination',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'prot_elongation',
    stepNumber: 8,
    title: 'Stoppkodon – Polypeptidkjeden klippes fri!',
    shortLabel: 'Stoppkodon',
    latinName: 'Terminering • UAA, UAG eller UGA + frigjøringsfaktor',
    timeMa: 'Fase 2 • Ribosomet',
    eraLabel: 'Translasjonen fullføres',
    x: 2380,
    y: 560,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    phaseCategory: 'translation',
    molecularTag: 'Stopp: UAA • UAG • UGA',
    traceBadge: 'Sluttsignal • Frigjøring',
    image: evoImg('prot_step8_termination.png'),
    imageCaption:
      'Ribosomet treffer et rubinrødt stoppkodon (UAA): en gyllen frigjøringsfaktor binder seg i stedet for tRNA og frigjør den ferdige polypeptidkjeden.',
    summaryTitle: 'Tre spesielle stoppkodon koder ikke for noen aminosyre – de sier «oppskriften er ferdig!»',
    whatHappens:
      'Samlebåndet ruller kodon for kodon langs mRNA helt til et av de tre stoppkodonene – UAA, UAG eller UGA – glir inn i A-setet på ribosomet. Ingen vanlige tRNA-molekyler har antikodon som passer til disse tre kodonene! I stedet binder et spesielt protein kalt en frigjøringsfaktor («release factor») seg til stoppkodonet. Frigjøringsfaktoren får ribosomet til å hekte et vannmolekyl på enden av kjeden i stedet for en ny aminosyre: da løsner den ferdige polypeptidkjeden, og ribosomets to deler slipper taket i mRNA og går fra hverandre, klare for neste oppdrag!',
    keyTraits: [
      {
        title: 'De tre stoppkodonene: UAA, UAG og UGA',
        description:
          'Av de 64 mulige kodonene koder 61 for aminosyrer (inkludert startkodonet AUG), mens de siste 3 (UAA, UAG og UGA) kun fungerer som punktum i oppskriften.',
        icon: 'zap',
      },
      {
        title: 'Hva skjer hvis en mutasjon skaper et for tidlig stoppkodon?',
        description:
          'En såkalt «nonsense-mutasjon» gjør et vanlig aminosyrekodon om til et stoppkodon midt i genet – da avbrytes byggingen for tidlig, og cellen får et uferdig, ødelagt protein.',
        icon: 'shield',
      },
      {
        title: 'mRNA kan leses flere ganger før det resirkuleres',
        description:
          'Selve mRNA-tråden blir ikke ødelagt av én runde på ribosomet; den brukes mange ganger før enzymer til slutt bryter den ned til frie nukleotider igjen.',
        icon: 'waves',
      },
    ],
    classroomTest:
      'Klassisk eksamensfelle å unngå: Stoppkodonet legger IKKE til en «siste aminosyre»! Når UAA, UAG eller UGA leses, kommer det null nye aminosyrer – kjeden klippes rett og slett løs.',
    didYouKnow:
      'Kroppens aller største protein heter titin og fungerer som en elastisk stålfjær inne i muskelcellene våre – oppskriften består av over 34 000 aminosyrer på én sammenhengende polypeptidkjede!',
    examples: [
      'Terminering',
      'Stoppkodon (UAA, UAG, UGA)',
      'Frigjøringsfaktor',
      'Frigjort polypeptidkjede',
      'Resirkulering av ribosomdeler',
    ],
  },

  // ==========================================
  // STEG 9: 3D-FOLDING & ETTERBEHANDLING (ER / GOLGI)
  // ==========================================
  {
    id: 'prot_folding',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'prot_termination',
    stepNumber: 9,
    title: '3D-folding & pakking – Formen skaper funksjonen!',
    shortLabel: '3D-folding & Golgi',
    latinName: 'Primær → Sekundær → Tertiær → Kvartær struktur',
    timeMa: 'Fase 3 • Cytosol / ER / Golgi',
    eraLabel: 'Fra rett perlekjede til presist 3D-verktøy',
    x: 2700,
    y: 520,
    cardSide: 'above',
    labelAnchor: 'top',
    accentCategory: 'microbe',
    phaseCategory: 'folding',
    molecularTag: 'Alfa-heliks & Beta-flak → 3D-form',
    traceBadge: 'Ru ER & Golgi • Modning',
    image: evoImg('prot_step9_folding.png'),
    imageCaption:
      'Den lineære aminosyrekjeden kveiler seg spontant opp i spiralformede alfa-helikser og flate beta-flak til en nøyaktig 3D-struktur ved membranene i ru ER og Golgiapparatet.',
    summaryTitle: 'Rekkefølgen av aminosyrer får kjeden til å brette seg til et nøyaktig tredimensjonalt verktøy',
    whatHappens:
      'En rett perlekjede av aminosyrer kan ikke gjøre jobben sin ennå – i biologien er det 3D-formen som gir proteinet funksjon! Blant de 20 ulike aminosyrene er noen vannelskende (hydrofile), noen vannskyende (hydrofobe), noen positivt ladde og noen negativt ladde, mens svovelholdige cysteiner kan danne sterke svovelbroer. Derfor bretter kjeden seg raskt (ofte hjulpet av «chaperon-proteiner»): først fra primærstruktur (rekkefølgen) til sekundærstruktur (alfa-heliks-spiraler og beta-flak), videre til en ferdig 3D tertiærstruktur – og ofte slår flere kjeder seg sammen til en kvartærstruktur! Proteiner som skal ut av cellen eller inn i cellemembranen bygges inn i ru ER og ferdigpakkes med adressemerkelapp i Golgiapparatet.',
    keyTraits: [
      {
        title: 'Fire strukturnivåer: Primær, sekundær, tertiær og kvartær',
        description:
          'Primær = aminosyrerekkefølgen. Sekundær = lokale spiraler/flak. Tertiær = hele kjedens 3D-form. Kvartær = flere ferdige kjeder satt sammen (f.eks. 4 kjeder i hemoglobin).',
        icon: 'layers',
      },
      {
        title: 'Frie ribosomer vs. ribosomer på ru ER',
        description:
          'Frie ribosomer i cytosol lager proteiner som skal brukes inne i selve cellen, mens ribosomer på ru ER lager proteiner som skal skilles ut (som hormoner og fordøyelsesenzymer) eller sitte i cellemembranen.',
        icon: 'compass',
      },
      {
        title: 'Denaturering: Hvorfor høy feber eller feil pH ødelegger proteiner',
        description:
          'Ved for høy temperatur eller feil pH ryker hydrogenbindingene som holder 3D-formen oppe – proteinet mister formen (denaturerer), akkurat som når flytende eggehvite stivner i stekepanna!',
        icon: 'flame',
      },
    ],
    classroomTest:
      'Papir-demonstrasjon: Et flatt A4-ark (polypeptidkjeden) kan knapt bære sin egen vekt – men bretter du det med nøyaktige bretter til et papirfly (3D-folding), får det plutselig en presis funksjon!',
    didYouKnow:
      ' I over 50 år var det å forutsi et proteins 3D-form ut fra bare aminosyrerekkefølgen et av biologiens vanskeligste mysterier – i 2024 gikk Nobelprisen i kjemi til forskerne bak AI-verktøyet AlphaFold som løste «proteinfoldingsproblemet»!',
    examples: [
      'Primær-, sekundær-, tertiær- & kvartærstruktur',
      'Alfa-heliks & beta-flak',
      'Svovelbroer & hydrogenbindinger',
      'Ru ER & Golgiapparatet',
      'Denaturering',
    ],
  },

  // ==========================================
  // STEG 10: FERDIG PROTEIN I AKSJON & MUTASJONER
  // ==========================================
  {
    id: 'prot_function',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'prot_folding',
    stepNumber: 10,
    title: 'Ferdig protein i aksjon – Fra gen til egenskap!',
    shortLabel: 'Ferdig protein',
    latinName: 'Genotype → Fenotype • Enzymer, hormoner, forsvar & mutasjoner',
    timeMa: 'Fase 3 • I og utenfor cellen',
    eraLabel: 'Målet er nådd: Kroppens arbeidsmaskiner',
    x: 3000,
    y: 550,
    cardSide: 'below',
    labelAnchor: 'bottom',
    accentCategory: 'microbe',
    phaseCategory: 'folding',
    molecularTag: 'DNA → mRNA → Protein → Egenskap',
    traceBadge: 'Mål nådd • Funksjon & mutasjon',
    image: evoImg('prot_step10_proteins.png'),
    imageCaption:
      'Ferdige funksjonelle proteiner i arbeid: hemoglobin med fire underenheter som frakter O₂, Y-formet antistoff, et aktivt enzym og kontraktile muskelfibre.',
    summaryTitle: 'Proteiner utfører nesten alt arbeidet i alt levende – og forklarer hvorfor gener gir egenskaper!',
    whatHappens:
      'Hele reisen fra gen til ferdig verktøy – kalt molekylærbiologiens sentrale dogme (DNA → mRNA → Protein) – viser hvordan arvestoffet vårt (genotypen) skaper synlige egenskaper og funksjoner i kroppen (fenotypen)! Ferdige proteiner har utallige livsviktige roller: enzymer som laktase og DNA-polymerase styrer alle kjemiske reaksjoner, transportproteiner som hemoglobin frakter O₂ i blodet, hormoner som insulin regulerer blodsukkeret, antistoffer bekjemper virus, ionekanaler styrer nervesignaler, og aktin, myosin og kollagen bygger muskler, hud og sener! Samtidig forstår vi nå nøyaktig hvordan mutasjoner i DNA påvirker kroppen.',
    keyTraits: [
      {
        title: 'Enzymer, struktur, transport, signal og immunforsvar',
        description:
          'Hårfarge (melanin-enzymer), blodtype, fordøyelse, muskelkraft og evnen til å tåle melkesukker (laktase) skyldes alle hvilke proteiner cellene dine produserer!',
        icon: 'heart',
      },
      {
        title: 'Punktmutasjon (substitusjon): Stille, endret eller stopp',
        description:
          'Byttes én base ut i DNA, kan det enten gi nøyaktig samme aminosyre (stille mutasjon), bytte ut én aminosyre (som ved sigdcelleanemi i hemoglobin), eller skape et for tidlig stoppkodon.',
        icon: 'dna',
      },
      {
        title: 'Leserammemutasjon (innsetting eller sletting av én base)',
        description:
          'Faller én base bort eller skytes inn i genet, forskyves ALLE trebokstavskodonene nedover tråden – det gir som regel et fullstendig endret og ubrukelig protein, men mutasjoner i kjønnsceller er også selve råmaterialet for evolusjon!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Sigdcelle-eksempelet som binder hele tidslinjen sammen: I genet for hemoglobin er én eneste base byttet ut (A → T i DNA, som gir GUA i stedet for GAA i mRNA). Dermed settes den vannskyende aminosyren valin inn i stedet for glutaminsyre på plass nr. 6 av 146 – og hele den røde blodcellen endrer form!',
    didYouKnow:
      'Kroppen din produserer flere hundre milliarder nye proteiner hvert eneste sekund døgnet rundt – hele livet fra unnfangelse til alderdom drives av denne ene elegante tidslinjen!',
    examples: [
      'Enzymer (f.eks. laktase, amylase)',
      'Hemoglobin & ionekanaler',
      'Insulin & reseptorer',
      'Antistoffer, kollagen & myosin',
      'Punktmutasjon vs. leserammemutasjon',
    ],
  },
];

export const PROTEIN_NODE_MAP: Record<string, ProteinTimelineNodeData> =
  Object.fromEntries(PROTEIN_NODES.map((node) => [node.id, node]));

export const PROTEIN_CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'psq1',
    number: 1,
    question:
      'Forklar hovedforskjellen mellom transkripsjon og translasjon: Hvor i en eukaryot celle skjer de to prosessene, hva er startmaterialet, og hva er sluttproduktet i hver fase?',
    contextHint:
      'Tenk på kjernemembranen som skillet mellom «arkivet» (Fase 1) og «fabrikkhallen» (Fase 2), og nevn hvilke enzymer/organeller som utfører jobben!',
    points: [
      {
        heading: 'Fase 1 – Transkripsjon (i cellekjernen)',
        detail:
          'Enzymet RNA-polymerase åpner DNA ved et gen og skriver en komplementær enkelttrådet kopi (pre-mRNA) ut fra maltråden etter regelen A→U, T→A, C→G og G→C. Deretter klippes introner ut og eksoner skjøtes sammen (spleising) før modent mRNA fraktes ut gjennom en kjernepore.',
        badge: 'DNA → mRNA',
      },
      {
        heading: 'Fase 2 – Translasjon (på ribosomer i cytoplasma / ru ER)',
        detail:
          'Ribosomet fester seg til mRNA, starter ved startkodonet AUG, og leser tre og tre baser (ett kodon av gangen). Transport-RNA (tRNA) med matchende antikodon leverer riktig aminosyre, som kobles sammen med peptidbindinger helt til et stoppkodon (UAA, UAG eller UGA) nås.',
        badge: 'mRNA → Polypeptid',
      },
      {
        heading: 'Fase 3 – Folding og ferdig funksjon',
        detail:
          'Polypeptidkjeden folder seg til en presis 3D-form (ofte ferdigbehandlet og adressert i ru ER og Golgiapparatet) slik at den blir et virksomt protein – f.eks. et enzym, hormon eller transportprotein.',
        badge: '3D-protein',
      },
    ],
    takeaway:
      'Kort oppsummert: Transkripsjon kopierer oppskriften innenfor samme «nukleotidspråk» (DNA → mRNA) inne i cellekjernen, mens translasjon oversetter til «aminosyrespråket» (mRNA → polypeptid) på ribosomene ute i cytoplasma!',
  },
  {
    id: 'psq2',
    number: 2,
    question:
      'Sammenlign DNA, mRNA, tRNA og rRNA: Hvordan er de bygd opp, og hvilke roller spiller de i proteinsyntesen?',
    contextHint:
      'Se på antall tråder, sukkertype, nitrogenbaser (T vs. U), hvor i cellen de befinner seg og hvilken oppgave hver av dem har.',
    points: [
      {
        heading: 'DNA – Det permanente hovedarkivet i cellekjernen',
        detail:
          'Dobbelttrådet spiral med sukkeret deoksyribose og basene A, T, C og G. Inneholder alle cellens gener og forlater aldri cellekjernen.',
        badge: 'Originalboka',
      },
      {
        heading: 'mRNA (budbringer-RNA) – Arbeidskopien som krysser kjerneporen',
        detail:
          'Enkelttrådet kopi av ett gen med sukkeret ribose og basene A, U, C og G. Bærer rekken av trebokstavskodon ut fra cellekjernen til ribosomene.',
        badge: 'Budbringer',
      },
      {
        heading: 'tRNA (transport-RNA) og rRNA (ribosomalt RNA) – Tolken og fabrikken',
        detail:
          'tRNA er foldet med et antikodon i bunnen og én spesifikk aminosyre i toppen, slik at riktig aminosyre kobles til riktig kodon. rRNA bygger selve ribosomet og smir peptidbindingene mellom aminosyrene.',
        badge: 'Tolk & maskin',
      },
    ],
    comparisonTable: {
      headers: ['Egenskap', 'DNA (hovedarkivet)', 'RNA (mRNA, tRNA & rRNA)'],
      rows: [
        [
          'Antall tråder & sukker',
          'Dobbelttrådet spiral med sukkeret deoksyribose',
          'Enkelttrådet med sukkeret ribose (tRNA og rRNA er foldet i 3D)',
        ],
        [
          'Nitrogenbaser',
          'Adenin (A), Tymin (T), Cytosin (C), Guanin (G)',
          'Adenin (A), Urasil (U i stedet for T!), Cytosin (C), Guanin (G)',
        ],
        [
          'Sted i eukaryot celle',
          'Fast inne i cellekjernen (+ ring-DNA i mitokondrier/kloroplaster)',
          'Lages i kjernen og fraktes ut til cytoplasma og ribosomene',
        ],
        [
          'Hovedoppgave',
          'Lagrer alle ~20 000 gener trygt fra generasjon til generasjon',
          'mRNA = budbringer (kodon), tRNA = aminosyretolk (antikodon), rRNA = selve ribosomet',
        ],
      ],
    },
    takeaway:
      'Husk trekløveret på ribosomet: mRNA har oppskriften (kodon), tRNA er leveringsbilen med antikodon og aminosyre, og rRNA er selve sveiseroboten som bygger kjeden!',
  },
  {
    id: 'psq3',
    number: 3,
    question:
      'Hvorfor har en punktmutasjon der én base byttes ut ofte langt mindre konsekvens enn en mutasjon der én base slettes eller settes inn midt i genet?',
    contextHint:
      'Bruk begrepene triplettkode (kodon), redundant genetisk kode, stille mutasjon og leserammemutasjon («frameshift»)!',
    points: [
      {
        heading: 'Substitusjon (én base byttes ut) – rammer kun ett enkelt kodon',
        detail:
          'Fordi antall baser er uendret, forblir alle kodonene før og etter mutasjonen helt riktige! Takket være redundansen i den genetiske koden (61 kodon for 20 aminosyrer) gir byttet ofte til og med nøyaktig samme aminosyre (en stille mutasjon), eller kun én endret aminosyre.',
        badge: 'Punktmutasjon',
      },
      {
        heading: 'Innsetting eller sletting (indel) – forskyver hele leserammen!',
        detail:
          'Ribosomet leser blindt tre og tre baser fra startkodonet AUG. Fjernes eller legges det til én (eller to) baser tidlig i genet, forskyves grupperingen av ALLE påfølgende kodon nedover tråden – alle aminosyrene etter mutasjonen blir feil, og det dukker nesten alltid opp et tidlig stoppkodon.',
        badge: 'Leserammemutasjon',
      },
      {
        heading: 'Skade for individet vs. drivkraft for evolusjonen',
        detail:
          'Mens de fleste leserammemutasjoner ødelegger proteinet og kan gi arvelige sykdommer, oppstår det av og til gunstige mutasjoner som gir proteinet litt nye egenskaper – og i kjønnsceller er nettopp slike mutasjoner opphavet til all genetisk variasjon på Livets Tre!',
        badge: 'Evolusjonskobling',
      },
    ],
    takeaway:
      'Å bytte ut ett bokstavtegn endrer høyst ett ord i oppskriften – men å slette ett bokstavtegn uten å flytte mellomrommene gjør hele resten av oppskriften uleselig!',
  },
];
