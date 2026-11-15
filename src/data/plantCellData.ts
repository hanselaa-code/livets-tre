import {
  evoImg,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type PlantCellRoleCategory =
  | 'wall_vacuole'
  | 'photosynthesis_energy'
  | 'protein_factory'
  | 'structure';

export interface PlantCellNodeData extends TreeNodeData {
  /** Exact SVG world coordinate on the central 3D plant cell cutaway */
  anchorX: number;
  anchorY: number;
  /** Left or right mind-map column around the central cell */
  side: 'left' | 'right';
  /** Functional role category for visual color-coding */
  roleCategory: PlantCellRoleCategory;
}

export const CENTRAL_PLANT_CELL_IMAGE = evoImg('plant_central_clean.png');

export const PLANT_CELL_MAIN_STEP_IDS: string[] = [
  'plant_cell_wall',
  'plant_membrane',
  'plant_chloroplasts',
  'plant_vacuole',
  'plant_nucleus',
  'plant_cytoplasm',
  'plant_er_ribosomes',
  'plant_golgi',
  'plant_mitochondria',
  'plant_cytoskeleton',
];

export const PLANT_CELL_NODES: PlantCellNodeData[] = [
  // ==========================================
  // DEL 1: CELLEVEGGEN (MED PLASMODESMATA)
  // ==========================================
  {
    id: 'plant_cell_wall',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Celleveggen – Plantecellens rustning av cellulose',
    shortLabel: 'Celleveggen',
    latinName: 'Paries cellularis • Cellulose, pektin & plasmodesmata',
    timeMa: '0,1–10 µm tykk',
    eraLabel: 'Ytre støtte, form og beskyttelse',
    x: 235,
    y: 160,
    anchorX: 605,
    anchorY: 312,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'wall_vacuole',
    traceBadge: 'Stiv vegg & celletunneler',
    image: evoImg('plant_cell_wall.png'),
    imageCaption:
      'Krysslagte bunter av cellulosemikrofibriller limt sammen med pektin og hemicellulose – gjennomhullet av lysende plasmodesmata-kanaler mellom nabocellene.',
    summaryTitle: 'Gir planten fast form, hindrer at cellen sprekker og lar trær vokse hundre meter til værs',
    whatHappens:
      'Ytterst rundt plantecellen – utenpå selve cellemembranen – ligger en sterk, porøs cellevegg som dyreceller helt mangler! Hovedarmeringen består av lange kjeder med glukose kalt cellulose, tvunnet sammen som stålkabler i armeringsbetong. Mellom nabocellene ligger et klebrig lag av pektin (midtlamellen) som limer plantecellene sammen til fast plantevev. Likevel er ikke cellene isolert i hver sin boks: tusenvis av mikroskopiske tunneler kalt plasmodesmata går tvers gjennom veggen og kobler cytoplasmaet i nabocellene direkte sammen!',
    keyTraits: [
      {
        title: 'Cellulose-armering som tåler enormt indre vanntrykk',
        description:
          'Når plantecellen suger inn vann ved osmose, holder celleveggen imot slik at cellen blir knallhard og spenstig i stedet for å sprekke som en dyrecelle ville gjort i rent vann!',
        icon: 'shield',
      },
      {
        title: 'Plasmodesmata – plantenes hemmelige fiberkabler',
        description:
          'Små cytoplasma-broer tvers gjennom celleveggen lar vann, sukker, ioner og til og med signalmolekyler strømme direkte fra celle til celle gjennom hele planten.',
        icon: 'waves',
      },
      {
        title: 'Fra myk primærvegg til vedstoff (lignin) i trestammer',
        description:
          'Unge vekstceller har en tøyelig primærvegg, mens vedceller i trær forsterker veggen med lignin – stoffet som gjør treverk hardt og lar gran og sequoia trosse tyngdekraften.',
        icon: 'layers',
      },
    ],
    classroomTest:
      'Kjøkkenkobling i timen: Pektinet som limer plantecellene sammen i midtlamellen er akkurat det samme stoffet vi bruker på kjøkkenet for å få syltetøy til å stivne – og cellulosefibrene er kostfiberen i grovbrød og grønnsaker!',
    didYouKnow:
      'Cellulose er det vanligste organiske stoffet på hele jordkloden! Mennesker mangler enzymet cellulase til å spalte bindingene i cellulose, mens kuer, elg og termitter har millioner av spesialbakterier i magen som gjør jobben for dem.',
    examples: [
      'Cellulosemikrofibriller',
      'Pektin og midtlamell',
      'Plasmodesmata (cellebroer)',
      'Lignin i vedvev',
    ],
    accentCategory: 'plant_fungi',
  },

  // ==========================================
  // DEL 2: CELLEMEMBRANEN
  // ==========================================
  {
    id: 'plant_membrane',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'plant_cell_wall',
    stepNumber: 2,
    title: 'Cellemembranen – Den selektive dørvakten innenfor veggen',
    shortLabel: 'Cellemembranen',
    latinName: 'Membrana plasmatica • Halvgjennomtrengelig dobbeltlag',
    timeMa: '~7–8 nm tykk',
    eraLabel: 'Selektiv transport, osmose og signaler',
    x: 1415,
    y: 160,
    anchorX: 1055,
    anchorY: 368,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'wall_vacuole',
    traceBadge: 'Dørvakt innenfor veggen',
    image: evoImg('plant_membrane.png'),
    imageCaption:
      'Rett på innsiden av den grønne celluloseveggen ligger plantecellens gylne fosfolipid-membran med vannkanaler (akvaporiner) og protonpumper.',
    summaryTitle: 'Celleveggen slipper nesten alt vann og salt gjennom – det er cellemembranen som bestemmer!',
    whatHappens:
      'Mange glemmer at planteceller har BÅDE cellevegg og cellemembran! Mens den grove celleveggen fungerer som en åpen kurv som vann og oppløste salter siver fritt gjennom, ligger den tynne, fleksible cellemembranen presset tett mot innsiden av veggen. Akkurat som i dyrecellen består den av et dobbeltlag av fosfolipider med transportproteiner som strengt kontrollerer hvilke mineralioner (som nitrat, kalium og fosfat) og sukkerstoffer som får passere ut og inn.',
    keyTraits: [
      {
        title: 'Osmose og vannkanaler (akvaporiner)',
        description:
          'Vann strømmer raskt inn gjennom spesialiserte vannkanaler mot den høyere salt- og sukkerkonsentrasjonen inne i cellen og presser cellemembranen ut mot celleveggen.',
        icon: 'waves',
      },
      {
        title: 'Protonpumper (H⁺-ATPase) driver næringsopptaket i røttene',
        description:
          'Mens dyreceller bruker natrium-kalium-pumpa, bruker planteceller ATP til å pumpe hydrogenioner (H⁺) ut gjennom cellemembranen for å trekke viktige mineraler fra jorda inn i cellen!',
        icon: 'zap',
      },
      {
        title: 'Plasmolyse – når membranen slipper taket i celleveggen',
        description:
          'Hvis planten vannes med saltvann eller tørker helt ut, trekkes vann ut av cellen. Da krymper cellemembranen bort fra den stive celleveggen (plasmolyse), og planten visner!',
        icon: 'shield',
      },
    ],
    classroomTest:
      'Klassisk mikroskopforsøk: Legger du et tynt flak av rødløk i saltvann under mikroskopet, ser du tydelig hvordan den lilla cellemembranen og vakuolen trekker seg sammen til en ball midt inne i den firkantede, gjennomsiktige celleveggen!',
    didYouKnow:
      'Det er nettopp derfor veisalting om vinteren kan svi brune kanter på trær og busker langs veien: det salte smeltevannet i jorda trekker vann UT gjennom rotcellenes cellemembraner ved osmose!',
    examples: [
      'Fosfolipid-dobbeltlag',
      'Akvaporiner (osmose)',
      'Protonpumper (H⁺-ATPase)',
      'Plasmolyse i saltvann',
    ],
    accentCategory: 'origin',
  },

  // ==========================================
  // DEL 3: KLOROPLASTER (FOTOSYNTESE)
  // ==========================================
  {
    id: 'plant_chloroplasts',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'plant_membrane',
    stepNumber: 3,
    title: 'Kloroplaster – Solcellefabrikkene som fanger sollys',
    shortLabel: 'Kloroplaster',
    latinName: 'Chloroplastus • Tylakoider, grana, stroma & klorofyll',
    timeMa: 'Fotosyntese',
    eraLabel: '6 CO₂ + 6 H₂O + lysenergi → C₆H₁₂O₆ + 6 O₂',
    x: 235,
    y: 345,
    anchorX: 646,
    anchorY: 392,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'photosynthesis_energy',
    traceBadge: 'Fotosyntese & O₂-fabrikk',
    image: evoImg('plant_chloroplasts.png'),
    imageCaption:
      'Tverrsnitt av en kloroplast med dobbel yttermembran, myntstabler av grønne tylakoidmembraner (grana), omkringliggende væske (stroma) og eget ringformet DNA.',
    summaryTitle: 'Bygger druesukker av luft og vann ved hjelp av sollys – og produserer oksygenet vi puster!',
    whatHappens:
      'Kloroplastene er plantecellens grønne superkraft og grunnen til at planter er autotrofe (selvforsynte med energirik næring). En grønn bladcelle kan inneholde 20 til 100 kloroplaster! Ytterst har kloroplasten dobbel membran. Innvendig ligger flate membransekker kalt tylakoider stablet oppå hverandre som myntstabler (grana), omgitt av en enzymrik væske kalt stroma. I tylakoidmembranene sitter fargestoffet klorofyll som absorberer blått og rødt sollys og reflekterer det grønne lyset tilbake til øynene våre.',
    keyTraits: [
      {
        title: 'Lysreaksjonene i tylakoidene: Spalter vann og slipper ut O₂',
        description:
          'Solenergien fanges av klorofyll, spalter vannmolekyler (H₂O), frigjør oksygengass (O₂) til atmosfæren og lader opp energibærerne ATP og NADPH.',
        icon: 'sparkles',
      },
      {
        title: 'Calvinsyklusen (de lysuavhengige reaksjonene) i stroma',
        description:
          'Ute i stroma bruker enzymet RuBisCO energien fra ATP og NADPH til å koble sammen karbondioksid (CO₂) fra lufta til energirikt druesukker (glukose, C₆H₁₂O₆)!',
        icon: 'leaf',
      },
      {
        title: 'Opprinnelig frittlevende cyanobakterier (endosymbiose)',
        description:
          'Akkurat som mitokondriene har kloroplastene sitt eget lille ringformede bakterie-DNA, egne ribosomer og deler seg selvstendig inne i plantecellen!',
        icon: 'dna',
      },
    ],
    classroomTest:
      'Viktig sjekkpunkt i naturfag/biologi: Har ALLE planteceller kloroplaster? Nei! Rotceller nede i mørk jord (som løk og gulrot) får ikke sollys og mangler grønne kloroplaster – de får sukker fraktet ned fra bladene via silrørene!',
    didYouKnow:
      'Enzymet RuBisCO inne i kloroplastenes stroma er det aller vanligste proteinet på jorda – det finnes omtrent 5 kilo rent RuBisCO-protein i naturen for hvert eneste menneske på kloden!',
    examples: [
      'Klorofyll i tylakoidmembraner',
      'Grana (myntstabler) & stroma',
      'Lysreaksjoner + Calvinsyklus',
      'Endosymbiose fra cyanobakterier',
    ],
    accentCategory: 'plant_fungi',
  },

  // ==========================================
  // DEL 4: SENTRALVAKUOLEN (SAFTROMMET)
  // ==========================================
  {
    id: 'plant_vacuole',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'plant_chloroplasts',
    stepNumber: 4,
    title: 'Sentralvakuolen – Vannlageret som gir saftspenning',
    shortLabel: 'Sentralvakuolen',
    latinName: 'Vacuola centralis & Tonoplast • Turgortrykk',
    timeMa: '50–90 % av volumet',
    eraLabel: 'Saftspenning, lagring og nedbrytning',
    x: 1415,
    y: 345,
    anchorX: 935,
    anchorY: 395,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'wall_vacuole',
    traceBadge: 'Saftspenning & gjenvinning',
    image: evoImg('plant_vacuole.png'),
    imageCaption:
      'Den enorme sentralvakuolen omgitt av sin egen membran (tonoplasten) presser cytoplasma og organeller ut mot celleveggen og skaper saftspenning.',
    summaryTitle: 'Fungerer samtidig som hydraulisk skjelett, spiskammer, fargepalett og gjenvinningsstasjon!',
    whatHappens:
      'I en utvokst plantecelle opptar én stor, væskefylt blære – sentralvakuolen (saftrommet) – ofte mellom 50 og 90 prosent av hele cellens volum! Den er omgitt av sin egen selektive membran kalt tonoplasten. Ved å pumpe salter, sukker og organiske syrer inn i vakuolen sørger cellen for at vann strømmer etter ved osmose. Dermed blåses vakuolen opp som en slange inne i et sykkeldekk og presser mot celleveggen. Dette indre vanntrykket kalles saftspenning (turgortrykk) og holder urteaktige planter strake uten skjelett!',
    keyTraits: [
      {
        title: 'Saftspenning (turgortrykk) og rask celledrevet vekst',
        description:
          'Når du glemmer å vanne en potteplante, faller trykket i vakuolene og bladene henger slapt. Vanner du den, fylles vakuolene opp og planten retter seg opp igjen på kort tid!',
        icon: 'waves',
      },
      {
        title: 'Overfyller rollen som dyrecellens lysosomer!',
        description:
          'Sentralvakuolen har sur pH og inneholder nedbrytende enzymer som resirkulerer utslitte proteiner og organeller – akkurat slik lysosomene gjør i dyrecellen.',
        icon: 'flame',
      },
      {
        title: 'Blomsterfarger og kjemisk forsvar mot planteetere',
        description:
          'Vakuolen lagrer vannløselige fargestoffer (antocyaniner) i blåbær, rødkål og kronblader, men også bitre eller giftige forsvarsstoffer (som koffein og garvesyre) som skremmer insekter!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Smart byggetriks: Fordi plantecellen fyller midten med billig vann i vakuolen i stedet for dyr, proteinrik cytosol, kan planten vokse seg stor og bre ut store solfangende blader med minimalt energiforbruk!',
    didYouKnow:
      'Vanntrykket inne i en spent plantecelle (turgortrykket) er ofte mellom 5 og 10 bar – det er mer enn dobbelt så høyt trykk som i et vanlig bildekk!',
    examples: [
      'Turgortrykk (saftspenning)',
      'Tonoplast (vakuolemembran)',
      'Antocyaniner (fargestoffer)',
      'Nedbrytning av avfall',
    ],
    accentCategory: 'origin',
  },

  // ==========================================
  // DEL 5: CELLEKJERNEN & DNA
  // ==========================================
  {
    id: 'plant_nucleus',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'plant_vacuole',
    stepNumber: 5,
    title: 'Cellekjernen – Kommandosentralen med plantens DNA',
    shortLabel: 'Cellekjernen (DNA)',
    latinName: 'Nucleus • Kjernemembran, kromatin & nukleolus',
    timeMa: '~5–10 µm',
    eraLabel: 'Arvestoff, genregulering og mRNA',
    x: 235,
    y: 535,
    anchorX: 748,
    anchorY: 468,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'protein_factory',
    traceBadge: 'Arvestoff & transkripsjon',
    image: evoImg('plant_nucleus.png'),
    imageCaption:
      'Plantecellens cellekjerne med dobbel kjernemembran, kjerneporer, lysende kjernelegeme (nukleolus) og en gyllen mRNA-tråd på vei ut i cytoplasma.',
    summaryTitle: 'Styrer alt fra fotosynteseenzymer til blomstring, høstfarger og kuldetilpasning',
    whatHappens:
      'Fordi plantecellen er en eukaryot celle («ekte kjerne»), ligger arvestoffet trygt beskyttet inne i en dobbel kjernemembran med tusenvis av regulerte kjerneporer. Inne i kjernen ligger lineære DNA-molekyler kveilet opp som kromatin, sammen med kjernelegemet (nukleolus) som produserer ribosomdeler. Når planten merker dagslys, tørke eller insektangrep, slås bestemte gener på i kjernen, kopieres til mRNA (transkripsjon) og sendes ut gjennom kjerneporene til ribosomene.',
    keyTraits: [
      {
        title: 'Tre ulike genomer i én og samme plantecelle!',
        description:
          'En grønn plantecelle har faktisk DNA på tre steder: hovedarvestoffet i cellekjernen, pluss egne små ring-DNA i både mitokondriene og kloroplastene!',
        icon: 'dna',
      },
      {
        title: 'Totipotens – én enkelt plantecelle kan bli en hel ny plante',
        description:
          'I motsetning til voksne dyreceller beholder mange vanlige planteceller evnen til å skru på alle genene i kjernen på nytt, slik at en avklippet stikling kan danne helt nye røtter, stengel og blader!',
        icon: 'sprout',
      },
      {
        title: 'Transkripsjon (DNA → mRNA) og ribosombygging i nukleolus',
        description:
          'Originaloppskriftene i DNA forlater aldri kjernen; kun arbeidskopier i form av mRNA sendes ut gjennom kjerneporene.',
        icon: 'cpu',
      },
    ],
    classroomTest:
      'Tenk over dette når du tar en stikling av en grønnplante hjemme: Alle genene for å bygge røtter fantes allerede inne i blad- og stengelcellenes cellekjerner – de trengte bare et hormonsignal for å vekkes!',
    didYouKnow:
      'Mange planter har langt større og mer komplekse genomer enn mennesket! Vanlig brødhvete har rundt 16 milliarder basepar i cellekjernen sin – over fem ganger så mye DNA som i en menneskecelle!',
    examples: [
      'Dobbel kjernemembran & porer',
      'Transkripsjon (DNA → mRNA)',
      'Nukleolus (kjernelegeme)',
      'Totipotens (stiklinger)',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // DEL 6: CYTOPLASMA & CYTOPLASMASTRØMNING
  // ==========================================
  {
    id: 'plant_cytoplasm',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'plant_nucleus',
    stepNumber: 6,
    title: 'Cytoplasma & cytosol – Levende strøm rundt vakuolen',
    shortLabel: 'Cytoplasma',
    latinName: 'Cytoplasma, Cytosol & Cyklose (strømning)',
    timeMa: 'Aktiv strømning',
    eraLabel: 'Stoffskifte, glykolyse og organellbevegelse',
    x: 1415,
    y: 535,
    anchorX: 1032,
    anchorY: 495,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'wall_vacuole',
    traceBadge: 'Cytosol & cytoplasmastrøm',
    image: evoImg('plant_cytoplasm.png'),
    imageCaption:
      'Kloroplaster og vesikler glir i en rask, sirkulerende strøm (cytoplasmastrømning) gjennom den tynne sonen med cytosol rundt sentralvakuolen.',
    summaryTitle: 'En travel biokjemisk elv som flytter kloroplastene etter lyset!',
    whatHappens:
      'Fordi sentralvakuolen fyller midten av plantecellen, ligger mesteparten av cellevæsken (cytosol) og organellene samlet i et aktivt belte mellom vakuolen og cellemembranen. Her foregår glykolysen, sukkeromdanning (blant annet bygging av sukrose som sendes ut i resten av planten) og et fascinerende fenomen du kan se direkte i lysmikroskopet: cytoplasmastrømning (cyklose), der hele cellevæsken og kloroplastene sirkulerer rundt som på et rullebånd!',
    keyTraits: [
      {
        title: 'Cytoplasmastrømning (cyklose) fordeler lys og næring',
        description:
          'Motorproteiner langs aktintråder rører kontinuerlig rundt i cytosol slik at næringsstoffer, O₂ og CO₂ fordeles lynraskt i selv store planteceller.',
        icon: 'activity',
      },
      {
        title: 'Kloroplastene flytter seg etter solstyrken!',
        description:
          'I svakt lys sprer kloroplastene seg flatt ut langs oversiden av cellen for å fange mest mulig lys. I brennende middagssol gjemmer de seg langs sideveggene på høykant så de ikke får «solskader»!',
        icon: 'compass',
      },
      {
        title: 'Glykolyse og sukrose-verksted i cytosol',
        description:
          'I cytosol spaltes glukose i glykolysen, og her kobles glukose og fruktose sammen til vanlig rørsukker (sukrose) for transport i plantens silrør.',
        icon: 'flame',
      },
    ],
    classroomTest:
      'Mikroskoptips til klasserommet: Legger dere et tynt blad av vasspest (Elodea) i litt lunkent vann og lyser på det i mikroskopet, ser dere med egne øyne hvordan de grønne kloroplastene seiler i kø rundt og rundt inne i hver celle!',
    didYouKnow:
      'I store algeceller kan cytoplasmastrømningen nå hastigheter på opptil 50–100 mikrometer i sekundet – i mikroskopisk målestokk tilsvarer det en motorvei i full fart!',
    examples: [
      'Cytosol (cellevæske)',
      'Cytoplasmastrømning (cyklose)',
      'Glykolyse uten oksygen',
      'Lysstyrt kloroplastbevegelse',
    ],
    accentCategory: 'microbe',
  },

  // ==========================================
  // DEL 7: RIBOSOMER & ENDOPLASMATISK RETIKULUM
  // ==========================================
  {
    id: 'plant_er_ribosomes',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'plant_cytoplasm',
    stepNumber: 7,
    title: 'Ribosomer & ER – Proteinfabrikk og rørnettverk',
    shortLabel: 'Ribosomer & ER',
    latinName: 'Ribosoma & Reticulum endoplasmaticum',
    timeMa: 'Ru & glatt ER',
    eraLabel: 'Translasjon (mRNA → protein) og planteoljer',
    x: 235,
    y: 725,
    anchorX: 775,
    anchorY: 572,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'protein_factory',
    traceBadge: 'Proteiner & vokslag',
    image: evoImg('plant_er_ribosomes.png'),
    imageCaption:
      'Blått ru ER besatt med ribosomer som folder nye proteiner, side om side med gyllent glatt ER som produserer planteoljer og voksmolekyler.',
    summaryTitle: 'Oversetter mRNA til enzymer og lager fettstoffer til frø og vanntett bladoverflate',
    whatHappens:
      'Rundt cellekjernen brer endoplasmatisk retikulum (ER) seg ut som et sammenhengende labyrintnettverk av membraner. På utsiden av ru ER (og fritt i cytosol) sitter millioner av små ribosomer som leser av mRNA-oppskriftene og skjøter sammen aminosyrer til proteinkjeder (translasjon). Glatt ER mangler ribosomer og produserer membranlipider, energirike planteoljer (som raps- og solsikkeolje i frø) samt vannavstøtende voks til bladenes ytterhud (kutikula)!',
    keyTraits: [
      {
        title: 'Ribosomer både i cytosol/ER, mitokondrier og kloroplaster',
        description:
          'Frie ribosomer lager proteiner til cellens eget indre, mens ribosomer på ru ER lager proteiner som skal til vakuolen, cellemembranen eller ut i celleveggen.',
        icon: 'cpu',
      },
      {
        title: 'Glatt ER lager planteoljer og bladets voksbeskyttelse',
        description:
          'Uten vokslaget (kutikula) som bygges av lipider fra glatt ER i overhudscellene, ville grønne blader tørket ut i sola på få timer!',
        icon: 'layers',
      },
      {
        title: 'ER-rør går tvers gjennom celleveggen til nabocellen!',
        description:
          'Tynne grener av ER (kalt desmotubuli) strekker seg faktisk gjennom plasmodesmata-kanalene i celleveggen og binder nabocellenes ER-nettverk fysisk sammen.',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Husketriks: Ru ER er «nuppete» av ribosomer og lager PROTEINER, mens glatt ER er «glatt» og lager FETTSTOFFER (oljer, membranlipider og voks) – nøyaktig samme arbeidsdeling som i dyrecellen!',
    didYouKnow:
      'Når et frø av solsikke, raps eller avokado modnes, jobber glatt ER på høygir for å pakke tusenvis av små oljedråper inn i frøcellene – den mest plass- og vektbesparende måten en plante kan gi spirende frø nistepakke på!',
    examples: [
      'Translasjon (mRNA → protein)',
      'Ru ER (proteinfolding)',
      'Glatt ER (planteoljer & voks)',
      'Desmotubuli i plasmodesmata',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // DEL 8: GOLGIAPPARATET & VESIKLER
  // ==========================================
  {
    id: 'plant_golgi',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'plant_er_ribosomes',
    stepNumber: 8,
    title: 'Golgiapparatet & vesikler – Pakkesentral og veggbygger',
    shortLabel: 'Golgi & vesikler',
    latinName: 'Apparatus Golgianus (Diktyosomer) & Vesiculae',
    timeMa: 'Hundrevis av stabler',
    eraLabel: 'Sortering, pektinproduksjon og celleplate',
    x: 1415,
    y: 725,
    anchorX: 985,
    anchorY: 552,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'protein_factory',
    traceBadge: 'Postkontor & veggfabrikk',
    image: evoImg('plant_golgi.png'),
    imageCaption:
      'Stabler av flate Golgisekker snører av lysende transportvesikler lastet med pektin og proteiner på vei ut for å forsterke celleveggen.',
    summaryTitle: 'Sorterer proteiner OG produserer byggematerialer til plantens cellevegg!',
    whatHappens:
      'Mens en dyrecelle ofte har ett stort sammenhengende Golgiapparat nær kjernen, har en plantecelle gjerne flere hundre mindre, frittliggende Golgistabler (ofte kalt diktyosomer) som glir rundt i cytoplasma! De tar imot proteiner og lipider fra ER, setter på kjemiske adresselapper og pakker dem i transportvesikler. I tillegg har plantens Golgiapparat en livsviktig ekstrajobb som dyreceller aldri gjør: Det er selve fabrikken som bygger de komplekse sukkerkjedene pektin og hemicellulose til celleveggen!',
    keyTraits: [
      {
        title: 'Fabrikk for pektin og hemicellulose til celleveggen',
        description:
          'Mens selve cellulosetrådene spinnes ute i cellemembranen, lages alt «limet» og nettverket rundt (pektin og hemicellulose) inne i Golgiapparatet og fraktes ut via eksocytose!',
        icon: 'layers',
      },
      {
        title: 'Bygger en helt ny skillevegg (celleplaten) ved celledeling!',
        description:
          'En stiv plantecelle kan ikke snøre seg av på midten slik en myk dyrecelle gjør. I stedet sender Golgi tusenvis av vesikler inn til midten av cellen der de smelter sammen til en ny celleplate mellom dattercellene!',
        icon: 'compass',
      },
      {
        title: 'Sortering til vakuole vs. cellemembran',
        description:
          'Golgi skiller nøye mellom fordøyelsesenzymer som skal inn til sentralvakuolen, og byggesteiner som skal tømmes ut på utsiden av cellemembranen.',
        icon: 'zap',
      },
    ],
    classroomTest:
      'Forskjell på celledeling hos dyr og planter: Dyrecellen «knyter igjen en snor» fra utsiden og inn, mens plantecellen bygger en «murvegg» (celleplaten) fra innsiden og ut ved hjelp av Golgivesikler!',
    didYouKnow:
      'I rasktvoksende rotspisser (som i en spirende bønne eller løkrot) kan én enkelt plantecelle ha opptil 400 Golgistabler i sving samtidig for å rekke å bygge nye cellevegger!',
    examples: [
      'Diktyosomer (Golgistabler)',
      'Pektin- og hemicellulose-syntese',
      'Celleplaten under mitose',
      'Eksocytose via vesikler',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // DEL 9: MITOKONDRIER (CELLEÅNDING DØGNET RUNDT!)
  // ==========================================
  {
    id: 'plant_mitochondria',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'plant_golgi',
    stepNumber: 9,
    title: 'Mitokondrier – Ja, planteceller har OGSÅ mitokondrier!',
    shortLabel: 'Mitokondrier (ATP)',
    latinName: 'Mitochondrion • Aerob celleånding hele døgnet',
    timeMa: 'ATP dag & natt',
    eraLabel: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP',
    x: 235,
    y: 915,
    anchorX: 696,
    anchorY: 640,
    side: 'left',
    labelAnchor: 'left',
    roleCategory: 'photosynthesis_energy',
    traceBadge: 'Celleånding dag og natt!',
    image: evoImg('plant_mitochondria.png'),
    imageCaption:
      'Perfekt samspill i plantecellen: Den grønne kloroplasten bygger druesukker av sollys, mens det gylne mitokondriet forbrenner sukker med O₂ til brukbar ATP-energi!',
    summaryTitle: 'Knuser den vanligste biologimyten: Kloroplaster lager maten, men mitokondriene gjør den om til ATP!',
    whatHappens:
      'Den desidert vanligste feilen på naturfag- og biologiprøver er å tro at «dyreceller har mitokondrier, mens planteceller har kloroplaster i stedet». Det er feil – planteceller har BEGGE deler! ATP-molekylene som lages inne i kloroplastene brukes nemlig opp der inne til å bygge glukose. For at resten av plantecellen skal få ATP til å bygge proteiner, pumpe næring i røttene og vokse – og for at hele planten skal overleve om natta, om vinteren og under jorda – må mitokondriene drive aerob celleånding døgnet rundt!',
    keyTraits: [
      {
        title: 'Perfekt kretsløp inne i samme celle i dagslys',
        description:
          'Om dagen lager kloroplasten glukose og O₂ som mitokondriene kan bruke direkte i celleåndingen, mens mitokondriene slipper ut CO₂ og H₂O som kloroplasten gjenbruker i fotosyntesen!',
        icon: 'flame',
      },
      {
        title: 'Livreddende om natta og i røtter uten lys',
        description:
          'Når sola går ned stopper fotosyntesen helt opp, og rotceller ser aldri dagslys. Da lever alle plantens celler utelukkende av sukkerlager som forbrennes i mitokondriene!',
        icon: 'zap',
      },
      {
        title: 'Dobbel membran, cristae og eget bakterie-DNA',
        description:
          'Mitokondriene i en bjørk eller løvetann er bygd opp på nøyaktig samme måte som i muskelcellene dine – arvet fra den felles eukaryote stamfaren for ~2 milliarder år siden.',
        icon: 'dna',
      },
    ],
    classroomTest:
      ' Spørsmål å stille klassen: Puster planter inn oksygen om natta? JA! I sollys produserer grønne planter langt mer O₂ i kloroplastene enn de bruker i mitokondriene (overskudd til oss!), men i stupmørke tar planten opp O₂ og skiller ut CO₂ akkurat som oss!',
    didYouKnow:
      'Enkelte blomsterplanter, som skjermplanten kjempekonvall-slektningen Amorphophallus og myrkongle-slektninger (kappeplanter), kan skru mitokondriene sine så kraftig opp at blomsten varmes opp til over 35 °C midt i vårkulda for å smelte snø og spre lukt til pollinerende insekter!',
    examples: [
      'Aerob celleånding (ATP)',
      'Cristae (foldet innermembran)',
      'Samarbeid med kloroplaster',
      'Energi i røtter og i mørke',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // DEL 10: PEROKSISOMER, CYTOSKJELETT & SAMMENLIGNING
  // ==========================================
  {
    id: 'plant_cytoskeleton',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'plant_mitochondria',
    stepNumber: 10,
    title: 'Peroksisomer & cytoskjelett – Og plantecelle vs. dyrecelle',
    shortLabel: 'Cytoskjelett & syntese',
    latinName: 'Cytoskeleton & Peroxisoma • Uten centrioler',
    timeMa: 'Helhet & sammenligning',
    eraLabel: 'Cellulosespor, fotorespirasjon og celletyper',
    x: 1415,
    y: 915,
    anchorX: 1018,
    anchorY: 618,
    side: 'right',
    labelAnchor: 'right',
    roleCategory: 'structure',
    traceBadge: 'Stillas, rensing & oppsummering',
    image: evoImg('plant_cytoskeleton.png'),
    imageCaption:
      'Lysende mikrotubuli-skinner på innsiden av cellemembranen styrer retningen på nye cellulosetråder, mens gylne peroksisomer jobber tett sammen med grønne kloroplaster.',
    summaryTitle: 'Styrer hvilken vei planten vokser, hjelper kloroplastene og oppsummerer forskjellen på plante og dyr!',
    whatHappens:
      'Selv med stiv cellevegg trenger plantecellen et indre cytoskjelett av mikrotubuli og aktinfilamenter! Mikrotubuli ligger som styreskinner rett under cellemembranen og leder enzymene som spinner cellulosetråder i celleveggen – og bestemmer dermed om cellen strekker seg oppover som en stengel eller utover som et blad. Samtidig har planteceller spesialiserte peroksisomer som samarbeider tett med kloroplastene i sterkt lys og gjør frøolje om til sukker når et frø spirer i mørk jord!',
    keyTraits: [
      {
        title: 'Deler seg helt uten centrioler!',
        description:
          'I motsetning til dyreceller mangler blomsterplanter centrioler i centrosomet, men bygger likevel presise spindeltråder av mikrotubuli når kromosomene trekkes fra hverandre under mitose.',
        icon: 'dna',
      },
      {
        title: 'Peroksisomer og glyoksysomer: Ufarliggjør H₂O₂ og vekker frø',
        description:
          'Blad-peroksisomer tar seg av biprodukter fra fotosyntesen og spalter giftig hydrogenperoksid (H₂O₂), mens frø-peroksisomer (glyoksysomer) omdanner lagret fett til sukker før frøplanten får grønne blader!',
        icon: 'shield',
      },
      {
        title: 'Tre ting plantecellen har som dyrecellen mangler',
        description:
          'Husk trekløveret: 1) Stiv cellevegg av cellulose med plasmodesmata, 2) Kloroplaster for fotosyntese og 3) Stor sentralvakuole som gir saftspenning!',
        icon: 'sparkles',
      },
    ],
    classroomTest:
      'Eksamenstips på 10 sekunder: Spør sensor om forskjellen på plante- og dyrecelle, nevn ALLTID både det de har felles (kjerne, membran, ribosomer, ER, Golgi, mitokondrier) OG plantecellens tre særpreg (cellevegg, kloroplaster, stor vakuole)!',
    didYouKnow:
      'Dyreceller kan ikke gjøre fettsyrer om til nytt druesukker (glukose), men spirende plantefrø klarer nettopp dette kunststykket inne i spesialiserte peroksisomer (glyoksysomer) slik at solsikkefrøet kan vokse gjennom mørk jord før det treffer sollys!',
    examples: [
      'Mikrotubuli styrer cellulosevekst',
      'Spindeltråder uten centrioler',
      'Peroksisomer & glyoksysomer',
      'Plantecelle vs. dyrecelle',
    ],
    accentCategory: 'human',
  },
];

export const PLANT_CELL_NODE_MAP: Record<string, PlantCellNodeData> =
  Object.fromEntries(PLANT_CELL_NODES.map((n) => [n.id, n]));

export const PLANT_CELL_CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'pcq1',
    number: 1,
    question:
      'Forklar samspillet mellom kloroplaster og mitokondrier i en grønn plantecelle – både midt på dagen i solskinn og midt på natta!',
    contextHint:
      'Se på råstoffene og produktene i fotosyntesen opp mot råstoffene og produktene i aerob celleånding.',
    points: [
      {
        heading: '1. Kloroplastene (fotosyntese kun når det er lys)',
        detail:
          'I sollys fanger klorofyll i tylakoidene lysenergi og bygger druesukker og oksygen ut fra vann og karbondioksid: 6 CO₂ + 6 H₂O + lysenergi → C₆H₁₂O₆ + 6 O₂. Dette lagrer solenergien som kjemisk energi i glukose.',
        badge: 'Kloroplast',
      },
      {
        heading: '2. Mitokondriene (aerob celleånding hele døgnet!)',
        detail:
          'For at plantecellen skal få brukbar ATP til aktiv transport, vekst og proteinsyntese, bryter mitokondriene ned glukose med oksygen: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP – både dag og natt, og i rotceller under jorda.',
        badge: 'Mitokondrie',
      },
      {
        heading: '3. Netto gassutveksling dag vs. natt',
        detail:
          'I godt dagslys går fotosyntesen mye raskere enn celleåndingen, så planten tar opp netto CO₂ og gir fra seg et stort overskudd av O₂. Om natta står fotosyntesen stille, så da forbruker planten O₂ og slipper ut CO₂!',
        badge: 'Dag vs. natt',
      },
    ],
    takeaway:
      'Kloroplastene og mitokondriene utgjør et biologisk kretsløp inne i én og samme plantecelle: kloroplasten fanger solenergi i sukker, og mitokondriet veksler sukkeret inn i ATP-energi!',
  },
  {
    id: 'pcq2',
    number: 2,
    question:
      'Hvordan klarer en urteaktig plante (f.eks. en tulipan eller basilikumplante) å stå oppreist uten bein eller vedstamme, og hva skjer på cellenivå når den visner?',
    contextHint:
      'Kombiner sentralvakuolen, cellemembranen (osmose) og den stive celleveggen av cellulose!',
    points: [
      {
        heading: 'Osmose fyller sentralvakuolen med vann',
        detail:
          'Plantecellen pumper ioner og løste stoffer gjennom cellemembranen og tonoplasten inn i sentralvakuolen. Fordi salt- og sukkerkonsentrasjonen blir høyere inni vakuolen enn utenfor, strømmer vann inn ved osmose.',
        badge: 'Osmose',
      },
      {
        heading: 'Saftspenning (turgortrykk) mot celleveggen',
        detail:
          'Den svulmende vakuolen presser cytoplasma og cellemembranen hardt ut mot den sterke celleveggen av cellulose. Celleveggen holder imot slik at cellen blir stiv og spenstig (høyt turgortrykk) uten å sprekke.',
        badge: 'Turgortrykk',
      },
      {
        heading: 'Tørke eller saltvann fører til tap av trykk og plasmolyse',
        detail:
          'Mangler planten vann (eller utsettes for salt jord), siver vann ut av vakuolen. Da faller saftspenningen, cellemembranen løsner fra innsiden av celleveggen (plasmolyse), og stilk og blader faller slapt sammen.',
        badge: 'Plasmolyse',
      },
    ],
    takeaway:
      'Saftspenning er et samarbeid mellom TO deler: Sentralvakuolen og cellemembranen skaper selve vanntrykket ved osmose, mens celleveggen av cellulose gir motholdet!',
  },
  {
    id: 'pcq3',
    number: 3,
    question:
      'Sammenlign en eukaryot plantecelle og en eukaryot dyrecelle: Hva har de felles fordi de begge er eukaryote, og hva skiller dem?',
    contextHint:
      'Tenk både på felles organeller, ytre avgrensning, energiopptak (autotrof vs. heterotrof) og hvordan cellene deler seg.',
    points: [
      {
        heading: 'Felles eukaryot grunnpakke',
        detail:
          'Begge har cellemembran av fosfolipider, ekte cellekjerne med DNA, cytosol, ribosomer, ru og glatt ER, Golgiapparat, transportvesikler, peroksisomer, cytoskjelett og mitokondrier!',
        badge: 'Likheter',
      },
      {
        heading: 'Unikt for plantecellen (autotrof byggherre)',
        detail:
          'Plantecellen har stiv cellevegg av cellulose med plasmodesmata-kanaler, grønne kloroplaster som driver fotosyntese, og en stor sentralvakuole som gir saftspenning og overtar lysosomenes nedbrytningsrolle.',
        badge: 'Plantecelle',
      },
      {
        heading: 'Unikt for dyrecellen (heterotrof og bevegelig)',
        detail:
          'Dyrecellen mangler cellevegg (kan endre form fritt og danne muskel- og nervevev), er heterotrof uten kloroplaster, har spesialiserte lysosomer og bruker centrioler ved celledeling samt innsnøring i stedet for celleplate.',
        badge: 'Dyrecelle',
      },
    ],
    comparisonTable: {
      headers: ['Egenskap / Struktur', 'Eukaryot plantecelle', 'Eukaryot dyrecelle'],
      rows: [
        [
          'Ytre avgrensning',
          'Stiv cellevegg (cellulose) UTENPÅ cellemembranen',
          'Kun fleksibel cellemembran (ingen cellevegg)',
        ],
        [
          'Næringsstrategi',
          'Autotrof – lager glukose ved fotosyntese i kloroplaster',
          'Heterotrof – må ta opp ferdig organisk næring (ingen kloroplaster)',
        ],
        [
          'Mitokondrier (ATP)',
          'Ja – driver celleånding dag og natt!',
          'Ja – driver celleånding hele tiden!',
        ],
        [
          'Vakuole vs. lysosomer',
          'Stor sentralvakuole (50–90 % av volumet, saftspenning & nedbrytning)',
          'Ingen stor sentralvakuole; har små spesialiserte lysosomer',
        ],
        [
          'Kontakt & celledeling',
          'Plasmodesmata gjennom veggen; bygger celleplate fra Golgi (uten centrioler)',
          'Direkte membranforbindelser; snører seg av på midten (har centrioler)',
        ],
      ],
    },
    takeaway:
      'Både planter og dyr tilhører den eukaryote grenen på Livets Tre – forskjellene i cellene deres speiler to geniale livsstrategier: å stå rolig og høste sollys vs. å bevege seg fritt og spise andre organismer!',
  },
];
