import {
  evoImg,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type BodyTraceCategory =
  | 'vestigial'
  | 'compromise'
  | 'exaptation'
  | 'ongoing';

export interface BodyTraceNodeData extends TreeNodeData {
  /** Exact SVG world coordinate on the central human anatomy figure */
  anchorX: number;
  anchorY: number;
  /** Whether the mind-map card sits on the left or right column around the body */
  side: 'left' | 'right';
  /** Evolutionary mechanism category for visual color-coding */
  traceType: BodyTraceCategory;
}

export const CENTRAL_HUMAN_IMAGE = evoImg('body_central_clean.png');

export const BODY_MAIN_STEP_IDS: string[] = [
  'body_eyes',
  'body_ears_hiccup',
  'body_wisdom_teeth',
  'body_spine_pelvis',
  'body_goosebumps',
  'body_wrist_grip',
  'body_appendix',
  'body_tailbone',
  'body_sweat_running',
  'body_foot_modern',
];

export const BODY_NODES: BodyTraceNodeData[] = [
  // ==========================================
  // SPOR 1: ØYNENE & DEN BLINDE FLEKKEN (~500 ma)
  // ==========================================
  {
    id: 'body_eyes',
    stepIndex: 0,
    isMainPath: true,
    parentId: null,
    stepNumber: 1,
    title: 'Øynene og den blinde flekken',
    shortLabel: 'Øynene & blind flekk',
    latinName: 'Retina & Macula caeca • Virveldyr- og primatarv',
    timeMa: '~500 ma',
    eraLabel: 'Synssansen • Fra urfisk til fruktspisende primat',
    x: 235,
    y: 160,
    anchorX: 805,
    anchorY: 163,
    side: 'left',
    labelAnchor: 'left',
    traceType: 'compromise',
    traceBadge: 'Evolusjonær «byggefeil»',
    image: evoImg('body_eyes.png'),
    imageCaption:
      'Menneskeøyet kombinerer et 500 millioner år gammelt virveldyr-design med primatenes skarpe fargesyn for røde og modne frukter.',
    summaryTitle: 'Et fantastisk kamera – men med ledningene koblet baklengs!',
    whatHappens:
      'Øyet vårt er et mesterverk, men bærer et avslørende bevis på at evolusjon alltid må bygge videre på det som allerede finnes – uten å starte med blanke ark. Hos alle virveldyr ligger nervetrådene og blodårene på fremsiden av synscellene i netthinnen, slik at lyset må passere gjennom et lag av «kabler» før det registreres. For at synsnerven skal komme seg videre inn til hjernen, må den derfor lage et hull tvers gjennom netthinnen. Dette hullet mangler synsceller og gir oss alle en blind flekk i hvert øye!',
    keyTraits: [
      {
        title: 'Den blinde flekken (omvendt netthinne)',
        description:
          'Blekkspruter utviklet kameraøye helt uavhengig av virveldyrene – og hos dem ligger nervetrådene ryddig på baksiden av netthinnen, helt uten blind flekk!',
        icon: 'eye',
      },
      {
        title: 'Trefargesyn (trikromasi) fra trekronene',
        description:
          'De fleste pattedyr (som hunder og hjort) ser dårlig forskjell på rødt og grønt. Våre primat-forfedre fikk en genduplisering som ga oss tre typer tapper – perfekt for å oppdage moden rød frukt og unge blader i grønn regnskog.',
        icon: 'sparkles',
      },
      {
        title: 'Hjernen som sanntids-redigerer',
        description:
          'Du legger aldri merke til den blinde flekken til vanlig fordi synsbarken i hjernen kontinuerlig fyller inn hullene ved å kombinere begge øyne og omgivelsene rundt.',
        icon: 'brain',
      },
    ],
    classroomTest:
      'Hold høyre tommel på strak arm foran deg, lukk venstre øye og se fast rett frem på veggen. Beveg tommelen sakte ca. 15 cm ut mot høyre – plutselig «forsvinner» hele tommeltuppen inn i den blinde flekken din!',
    didYouKnow:
      'Rød-grønn fargeblindhet rammer rundt 8 % av gutter, men under 0,5 % av jenter. Årsaken er at genene for de røde og grønne synspigmentene ligger tett sammen på X-kromosomet – akkurat der dupliseringen skjedde hos forfedrene våre for rundt 30 millioner år siden!',
    examples: [
      'Virveldyrøye (med blind flekk)',
      'Blekksprutøye (uten blind flekk)',
      'Trikromatisk fargesyn',
      'X-bundet fargeblindhet',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // SPOR 2: ØREKNOKLER, ØREMUSKLER & HIKKE (~375 ma)
  // ==========================================
  {
    id: 'body_ears_hiccup',
    stepIndex: 1,
    isMainPath: true,
    parentId: 'body_eyes',
    stepNumber: 2,
    title: 'Øremuskler, øreknokler og hikke',
    shortLabel: 'Ører & hikke-refleks',
    latinName: 'Ossicula auditus & Singultus • Fisk- og amfibiearv',
    timeMa: '~375 ma',
    eraLabel: 'Hode og hals • Arven fra gjellepustere i vann',
    x: 1415,
    y: 160,
    anchorX: 868,
    anchorY: 172,
    side: 'right',
    labelAnchor: 'right',
    traceType: 'exaptation',
    traceBadge: 'Arv fra fisk & amfibier',
    image: evoImg('body_ears_hiccup.png'),
    imageCaption:
      'Overgangen fra vann til land for 375 millioner år siden bygde om gamle gjellebuer til øreknokler – og etterlot hikke-refleksen i hjernestammen vår.',
    summaryTitle: 'Hvorfor kan noen vifte med ørene – og hvorfor hikker vi?',
    whatHappens:
      'Hodet og halsen vår er et levende arkiv fra livet i vann og på skogbunnen. De tre ørsmå øreknoklene i mellomøret vårt (hammeren, ambolten og stigbøylen) er ombygde gjellebuer og kjevebein fra urfisk og tidlige krypdyr! Rundt det ytre øret har vi også tre små øremuskler som andre pattedyr bruker til å snu øretraktene mot farer. Og enda mer overraskende: Hikke er en eldgammel motorisk refleks fra amfibier (som rumpetroll) som puster med både gjeller og lunger!',
    keyTraits: [
      {
        title: 'Fra fiskekjeve til kroppens minste knokler',
        description:
          'Fossiler viser trinn for trinn hvordan bakre kjevebein hos krypdyrlignende forfedre krympet og flyttet inn i mellomøret for å forsterke høyfrekvente lyder i luft.',
        icon: 'ear',
      },
      {
        title: 'Hikke: et ekko fra rumpetroll-pust',
        description:
          'Når vi hikker, trekker mellomgulvet pusten brått inn mens strupelokket smeller igjen («hikk!»). Hos rumpetroll gjør nøyaktig samme hjernesignal at vann pumpes over gjellene uten å renne ned i lungene.',
        icon: 'waves',
      },
      {
        title: 'Rudimentære øremuskler (Musculi auriculares)',
        description:
          'Bare 10–20 % av mennesker klarer å vifte synlig med ørene, men målinger viser at musklene våre fortsatt rykker ubevisst til når vi hører en uventet lyd fra siden!',
        icon: 'zap',
      },
    ],
    classroomTest:
      'Spør klassen: Hvem klarer å vifte med ørene uten å røre øyenbrynene? Selv hos dem som ikke får øret til å røre seg, sender hjernen fortsatt elektriske signaler til øremusklene når noen knipser uventet bak dem!',
    didYouKnow:
      'En nerve i halsen vår (nervus laryngeus recurrens), som styrer stemmebåndene, går ikke de få centimeterne rett fra hjernen til strupen – den tar en omvei ned i brystkassen, rundt hovedpulsåren ved hjertet og opp igjen! Hos fisk ga dette mening rundt gjellebuene, men hos sjiraffen har samme omvei blitt over 4,5 meter lang!',
    examples: [
      'Hammeren, ambolten og stigbøylen',
      'Rumpetroll og lungefisk',
      'Ytre øremuskler',
      'Stemmebåndsnervens omvei',
    ],
    accentCategory: 'vertebrate',
  },

  // ==========================================
  // SPOR 3: VISDOMSTENNER & KJEVEN (~2–0,01 ma)
  // ==========================================
  {
    id: 'body_wisdom_teeth',
    stepIndex: 2,
    isMainPath: true,
    parentId: 'body_ears_hiccup',
    stepNumber: 3,
    title: 'Visdomstenner og den krympede kjeven',
    shortLabel: 'Visdomstenner & kjeve',
    latinName: 'Dens serotinus • Kulturell og biologisk koevolusjon',
    timeMa: '~2–0,01 ma',
    eraLabel: 'Kranium og tenner • Ild, matlaging og jordbruk',
    x: 235,
    y: 355,
    anchorX: 804,
    anchorY: 204,
    side: 'left',
    labelAnchor: 'left',
    traceType: 'compromise',
    traceBadge: 'Mismatch med moderne kost',
    image: evoImg('body_wisdom_teeth.png'),
    imageCaption:
      'Da menneskeslekten begynte å skjære opp, knuse og varmebehandle maten over bål, trengte vi ikke lenger de enorme kjevene til forfedrene våre.',
    summaryTitle: '32 tenner presset inn i en kjeve bygget for kokt mat',
    whatHappens:
      'Tidlige formennesker måtte tygge seg gjennom rå røtter, seige blader, frø og rått kjøtt i timevis hver dag. Derfor hadde de lange, kraftige kjever med rikelig plass til tre sett store jeksler (inkludert fire visdomstenner som kom frem i 18-årsalderen når de andre tennene begynte å slites ned). Da vi temmet ilden, tok i bruk steinredskaper og senere gikk over til myk jordbruksmat, krympet kjeven vår raskere enn antall tenner – og skapte trangstilling og fastlåste visdomstenner.',
    keyTraits: [
      {
        title: 'Matlaging frigjorde energi til hjernen',
        description:
          'Varmebehandlet mat er mye lettere å tygge og fordøye. Mindre tyggemuskler og kortere tarm frigjorde enormt med kalorier til veksten av den store menneskehjernen.',
        icon: 'flame',
      },
      {
        title: 'Både arv og tyggebelastning i oppveksten',
        description:
          'Kjevebein vokser også som respons på mekanisk tygging i barndommen. Overgangen til grøt, brød og prosessert mat etter jordbruksrevolusjonen for 10 000 år siden gjorde kjevene enda smalere.',
        icon: 'bone',
      },
      {
        title: 'Evolusjon i sanntid: visdomstennene forsvinner',
        description:
          'En mutasjon som skrur av dannelsen av visdomstenner sprer seg i befolkningen: opptil 35 % av mennesker fødes i dag helt uten anlegg for én eller flere visdomstenner!',
        icon: 'dna',
      },
    ],
    classroomTest:
      'Kjenn med fingrene på tinningen rett over kinnbeinet mens du biter tennene sammen: Der kjenner du tyggemuskelen (musculus temporalis). Hos gorillaer er denne muskelen så enorm at den fester seg i en høy beinkam helt på toppen av hodeskallen!',
    didYouKnow:
      'Før moderne tannleger og antibiotika var en betent, fastkilt visdomstann i kjevebeinet faktisk livsfarlig! Derfor ga mutasjoner som fjernet visdomstennene en reell overlevelsesfordel hos unge voksne.',
    examples: [
      'Homo erectus (bruk av ild)',
      'Jordbruksrevolusjonen',
      'Medfødt mangel på visdomstenner',
      'Tyggemuskelen temporalis',
    ],
    accentCategory: 'human',
  },

  // ==========================================
  // SPOR 4: S-RYGGSØYLE & BEKKEN (~6–4 ma)
  // ==========================================
  {
    id: 'body_spine_pelvis',
    stepIndex: 3,
    isMainPath: true,
    parentId: 'body_wisdom_teeth',
    stepNumber: 4,
    title: 'S-formet ryggsøyle og skålbekken',
    shortLabel: 'S-ryggsøyle & bekken',
    latinName: 'Columna vertebralis & Pelvis • Tobeint gange',
    timeMa: '~6–4 ma',
    eraLabel: 'Skjelettet • Prisen vi betaler for å gå oppreist',
    x: 1415,
    y: 355,
    anchorX: 825,
    anchorY: 423,
    side: 'right',
    labelAnchor: 'right',
    traceType: 'compromise',
    traceBadge: 'Evolusjonært kompromiss',
    image: evoImg('body_spine_pelvis.png'),
    imageCaption:
      'Fossile fotspor i vulkansk aske (som ved Laetoli i Tanzania, 3,66 ma) viser at forfedrene våre gikk på to bein lenge før hjernen ble stor.',
    summaryTitle: 'En firebeint «hengebru» reist på høykant til en skyskraper',
    whatHappens:
      'Hos firbeinte pattedyr fungerer ryggraden som en horisontal hengebru som fordeler vekten mellom fire bein. Da forfedrene våre reiste seg på to bein for over 4 millioner år siden, måtte hele skjelettet bygges om: Ryggsøylen fikk en fjærende S-form som plasserer tyngdepunktet rett over hoftene, og bekkenet ble kort og skålformet for å bære innvollene. Dette frigjorde hendene våre – men er også hovedgrunnen til at så mange mennesker sliter med vondt i korsryggen og prolaps!',
    keyTraits: [
      {
        title: 'Fjærende S-kurve mot knusende trykk',
        description:
          'Sjimpanser har en C-formet rygg og vagger fra side til side når de går på to bein. Vår S-formede korsrygg balanserer overkroppen, men utsetter de nederste mellomvirvelskivene for enorm slitasje.',
        icon: 'bone',
      },
      {
        title: 'Skålformet bekken og balansemuskler',
        description:
          'Bekkenet vårt ble bredere og kortere enn hos menneskeapene, slik at setemusklene på sidene holder hofta stabil hver gang vi står på ett bein i steget.',
        icon: 'footprints',
      },
      {
        title: 'Det obstetriske dilemmaet (fødselskompromisset)',
        description:
          'Tobeint gange krever et relativt smalt bekken, mens mennesket samtidig utviklet en svært stor hjerne. Resultatet er at menneskebarn må fødes tidligere i utviklingen og er helt hjelpeløse det første leveåret!',
        icon: 'users',
      },
    ],
    classroomTest:
      'Prøv å gå tre skritt med helt bøyde knær og krum rygg (slik en sjimpanse må gå på to bein): Du kjenner umiddelbart hvor mye muskelkraft lårene bruker, sammenlignet med menneskets rette, pendel-lignende gange!',
    didYouKnow:
      'Hvis menneskefosteret skulle blitt i magen til hjernen var like ferdigutviklet ved fødselen som hos en nyfødt sjimpanseunge, måtte svangerskapet vart i rundt 18 til 21 måneder – og hodet ville vært umulig å føde!',
    examples: [
      'Australopithecus («Lucy», 3,2 ma)',
      'Mellomvirvelskiver og korsrygg',
      'Laetoli-fotsporene (3,66 ma)',
      'Hjelpeløse menneskespedbarn',
    ],
    accentCategory: 'human',
  },

  // ==========================================
  // SPOR 5: GÅSEHUD – PELS UTEN PELS (~178 ma)
  // ==========================================
  {
    id: 'body_goosebumps',
    stepIndex: 4,
    isMainPath: true,
    parentId: 'body_spine_pelvis',
    stepNumber: 5,
    title: 'Gåsehud – En pelsrefleks uten pels',
    shortLabel: 'Gåsehud',
    latinName: 'Musculus arrector pili • Eldgammel pattedyrarv',
    timeMa: '~178 ma',
    eraLabel: 'Huden • En frossen refleks fra pelskledde forfedre',
    x: 235,
    y: 550,
    anchorX: 692,
    anchorY: 462,
    side: 'left',
    labelAnchor: 'left',
    traceType: 'vestigial',
    traceBadge: 'Rudimentær refleks',
    image: evoImg('body_goosebumps.png'),
    imageCaption:
      'Hver eneste nupp i gåsehud skyldes en ørsmå glatt muskel som trekker i hårsekken – en 178 millioner år gammel pattedyrrefleks.',
    summaryTitle: 'Kroppen prøver fortsatt å bruse med en pels vi mistet på savannen!',
    whatHappens:
      'Når du fryser, blir skremt i en skrekkfilm eller hører musikk som gir deg frysninger, sender det autonome nervesystemet adrenalin-signaler til millioner av mikroskopiske hårmuskler i huden. Hos en ulv, katt eller sjimpanse har dette to livsviktige funksjoner: Enten løftes den tette pelsen slik at det fanges et tykt, isolerende luftlag mot kulde, eller så reiser dyret bust for å se mye større og farligere ut mot en angriper. Hos oss reiser bare tynne dunhår seg på naken hud!',
    keyTraits: [
      {
        title: 'Like mange hårsekker som en sjimpanse!',
        description:
          'Mennesket har faktisk omtrent like mange hårsekker på kroppen som en jevnstor sjimpanse – forskjellen er bare at våre kroppshår har blitt tynne, korte og nesten usynlige.',
        icon: 'layers',
      },
      {
        title: 'Termostat og skremmesignal hos pattedyr',
        description:
          'Når et pinnsvin reiser piggene eller en skremt katt skyter rygg med brusende hale, bruker de nøyaktig samme muskel- og nervekobling som gir deg gåsehud.',
        icon: 'shield',
      },
      {
        title: 'Koblet til følelsessenteret i hjernen',
        description:
          'Fordi frykt, spenning og sterke sanseinntrykk alle utløser adrenalin via hypothalamus og amygdala, får mennesker gåsehud også av musikk, film og store øyeblikk.',
        icon: 'heart',
      },
    ],
    classroomTest:
      'Se nøye på huden på underarmen din: Selv om armen ser «hårløs» ut på avstand, sitter tusenvis av ørsmå hårsekker tett i tett – hver med sin egen lille arrector pili-muskel under huden!',
    didYouKnow:
      'Nyere celleforskning fra Harvard viste en uventet grunn til at hårmusklene våre ikke har forsvunnet helt: Nervene og musklene ved hårsekkene sender også vekstsignaler til stamceller i huden som hjelper til med sårheling og hårvekst!',
    examples: [
      'Katt som reiser bust',
      'Vinterpels hos pattedyr',
      'Adrenalin- og kulderefleks',
      'Tynne vellushår på huden',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // SPOR 6: HÅNDLEDDSSENEN & GRIPEREFLEKS (~55 ma)
  // ==========================================
  {
    id: 'body_wrist_grip',
    stepIndex: 5,
    isMainPath: true,
    parentId: 'body_goosebumps',
    stepNumber: 6,
    title: 'Håndleddssenen og griperefleksen',
    shortLabel: 'Håndledd & griperefleks',
    latinName: 'Palmaris longus • Arven fra trekronene',
    timeMa: '~55 ma',
    eraLabel: 'Arm og hånd • Levende spor fra klatrende primater',
    x: 1415,
    y: 550,
    anchorX: 972,
    anchorY: 553,
    side: 'right',
    labelAnchor: 'right',
    traceType: 'vestigial',
    traceBadge: 'Test på deg selv!',
    image: evoImg('body_wrist_grip.png'),
    imageCaption:
      'Primatunger er helt avhengige av å klamre seg fast til mors pels høyt i trærne – en refleks alle nyfødte menneskebarn fortsatt fødes med.',
    summaryTitle: 'En klatremuskel som mangler hos hver sjuende elev i klasserommet!',
    whatHappens:
      'Armene og hendene våre gjemmer to av de mest konkrete sporene etter 50 millioner år som klatrende primater i trekronene. På undersiden av underarmen ligger muskelen Palmaris longus, som strammer håndflaten og gir ekstra klatregrep hos trelevende pattedyr. Fordi vi ikke lenger svinger oss fra gren til gren, fødes rundt 15 % av oss i dag helt uten denne muskelen – uten å miste noen som helst gripestyrke! Og hos nyfødte spedbarn lever klatrearven videre i den sterke griperefleksen.',
    keyTraits: [
      {
        title: 'Palmaris longus – kirurgenes «reservedel»',
        description:
          'Fordi senen ikke har noen merkbar betydning for håndstyrken vår i dag, bruker håndkirurger den ofte som transplantat når andre viktige sener i fingre eller ledd ryker!',
        icon: 'hand',
      },
      {
        title: 'Spedbarnets griperefleks (Palmar grasp reflex)',
        description:
          'Legger du en finger i hånden på et nyfødt spedbarn, lukker fingrene seg med overraskende kraft. Hos apeunger redder denne refleksen livet deres mens moren klatrer gjennom regnskogen.',
        icon: 'sprout',
      },
      {
        title: 'Presisjonsgrep med tommel mot fingertupper',
        description:
          'Mens sjimpanser har lange, buede fingre og kort tommel for å henge i grener, utviklet menneskehånden en lang, kraftig tommel som kan møte hver fingertupp med kirurgisk presisjon.',
        icon: 'cpu',
      },
    ],
    classroomTest:
      'KLASSEROMSTEST: Legg armen flatt på pulten med håndflaten opp. Press tuppen av tommelen mot tuppen av lillefingeren og vipp håndleddet litt oppover. Spretter det frem en tydelig sene midt på håndleddet? Tell hvor mange i klassen som har den på begge hender, bare én hånd – eller mangler den helt!',
    didYouKnow:
      'Hos lemurer og aper som lever hele livet oppe i trekronene, har 100 % av individene en kraftig Palmaris longus-muskel. Jo mindre tid en primatart tilbringer i trærne (som gorillaer og mennesker), desto oftere mangler muskelen!',
    examples: [
      'Palmaris longus-senen',
      'Griperefleks hos nyfødte',
      'Menneskets presisjonsgrep',
      'Trelevende primater',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // SPOR 7: BLINDTARMEN (~55 ma)
  // ==========================================
  {
    id: 'body_appendix',
    stepIndex: 6,
    isMainPath: true,
    parentId: 'body_wrist_grip',
    stepNumber: 7,
    title: 'Blindtarmen – Fra bladfordøyer til bakteriebunker',
    shortLabel: 'Blindtarmen',
    latinName: 'Appendix vermiformis • Eksaptasjon (ny funksjon)',
    timeMa: '~55 ma',
    eraLabel: 'Fordøyelse og immunforsvar • Gammel del med ny jobb',
    x: 235,
    y: 745,
    anchorX: 788,
    anchorY: 510,
    side: 'left',
    labelAnchor: 'left',
    traceType: 'exaptation',
    traceBadge: 'Gjenbrukt av evolusjonen',
    image: evoImg('body_appendix.png'),
    imageCaption:
      'Blindtarmsvedhenget er rikt på lymfevev og fungerer som et beskyttet tilfluktsrom for gode tarmbakterier.',
    summaryTitle: 'Ikke bare «ubrukelig skrot» likevel – evolusjonens smarte gjenbruk!',
    whatHappens:
      'I over hundre år ble blindtarmsvedhenget (den lille ormeformede posen nederst på høyre side av magen) brukt som skoleeksempel på et helt ubrukelig rudimentært organ fra planteetende forfedre som trengte en enorm blindtarm for å bryte ned tungfordøyelig cellulose i blader og bark. Da forfedrene våre gikk over til mer energirik kost som frukt og kjøtt, krympet blindtarmen kraftig. Men nyere forskning viser at det vesle vedhenget fikk en ny oppgave: som treningsleir for immunforsvaret og «bunker» for gode tarmbakterier!',
    keyTraits: [
      {
        title: 'Rest av planteeternes gjæringskammer',
        description:
          'Hos planteetere som hest, kanin og koala er blindtarmen et kjempestort kammer fylt med mikrober som spalter plantefiber.',
        icon: 'leaf',
      },
      {
        title: 'Trygt tilfluktsrom («Safe House») for tarmfloraen',
        description:
          'Ved alvorlig magetarminfeksjon og diaré skylles tarmen tom for bakterier. I det smale, beskyttede blindtarmsvedhenget overlever en reserve av gode bakterier som raskt kan kolonisere tarmen på nytt!',
        icon: 'shield',
      },
      {
        title: 'Hvorfor blir den så ofte betent i moderne tid?',
        description:
          'Fiberfattig kost og et superhygienisk miljø med færre parasitter kan føre til forstoppelse av den trange åpningen og et overreagerende immunforsvar – akutt blindtarmbetennelse.',
        icon: 'activity',
      },
    ],
    classroomTest:
      'Merk plasseringen på figuren i midten: Blindtarmen sitter nede på DIN høyre side av magen – som ser ut som venstre side når du ser et menneske rett forfra i anatomisk grunnstilling!',
    didYouKnow:
      'Sammenlignende studier av over 500 pattedyrarter viser at et slikt smalt blindtarmsvedheng faktisk har utviklet seg uavhengig over 30 ganger hos ulike pattedyr (blant annet hos bever, vombat og orangutang) – et sterkt tegn på at det gir en reell immunfordel i naturen!',
    examples: [
      'Tarmmikrobiomet (gode bakterier)',
      'Koala og kanin (stor blindtarm)',
      'Lymfevev i tarmveggen',
      'Eksaptasjon (funksjonsendring)',
    ],
    accentCategory: 'mammal',
  },

  // ==========================================
  // SPOR 8: HALEBEINET (~25 ma)
  // ==========================================
  {
    id: 'body_tailbone',
    stepIndex: 7,
    isMainPath: true,
    parentId: 'body_appendix',
    stepNumber: 8,
    title: 'Halebeinet – Vår usynlige hale',
    shortLabel: 'Halebeinet',
    latinName: 'Os coccygis • Arven fra da menneskeapene mistet halen',
    timeMa: '~25 ma',
    eraLabel: 'Bekkenbunnen • Et ekte haleskjelett gjemt under huden',
    x: 235,
    y: 940,
    anchorX: 825,
    anchorY: 544,
    side: 'left',
    labelAnchor: 'left',
    traceType: 'vestigial',
    traceBadge: 'Klassisk rudimentært organ',
    image: evoImg('body_tailbone.png'),
    imageCaption:
      'Nederst på korsbeinet har alle mennesker 3 til 5 sammenvokste halevirvler – den direkte skjelettresten av pattedyrhalen.',
    summaryTitle: 'Alle i dette klasserommet har hatt en ekte hale i fosterlivet!',
    whatHappens:
      'Spørsmålet «Hvorfor har vi halebein?» går rett til kjernen av evolusjonsbiologien! Nesten alle virveldyr og pattedyr har hale til balanse i trærne eller kommunikasjon. For rundt 25 millioner år siden oppsto en genetisk endring hos stamfaren til alle menneskeaper (mennesker, sjimpanser, gorillaer, orangutanger og gibboner) som skrudde av utveksten av ytre hale. Men oppskriften ligger fortsatt i DNA-et vårt: Hvert eneste menneskefoster anlegger en tydelig hale i uke 4–8, før den bygges ned til 3–5 sammenvokste halevirvler!',
    keyTraits: [
      {
        title: 'Fosterhalen i uke 5–6 av svangerskapet',
        description:
          'Hos et seks uker gammelt menneskeembryo stikker det ut en tydelig hale med 10–12 virvelanlegg! Deretter sørger programmert celledød (apoptose) for at halen trekkes tilbake før fødselen.',
        icon: 'dna',
      },
      {
        title: 'En hoppende DNA-bit (Alu-element i TBXT-genet)',
        description:
          'I 2024 fant forskere selve mekanismen: Et lite «hoppende gen» kilte seg inn i hale-genet TBXT hos forfedrene til menneskeapene for 25 millioner år siden og kortet ned halen i ett evolusjonært byks!',
        icon: 'sparkles',
      },
      {
        title: 'Ny viktig jobb som anker for bekkenbunnen',
        description:
          'Halebeinet er slett ikke ubrukelig i dag: Det fungerer som et livsviktig festepunkt for sener og muskler i bekkenbunnen som holder organene våre oppe når vi går oppreist på to bein.',
        icon: 'bone',
      },
    ],
    classroomTest:
      'Tenk over forskjellen på aper og menneskeaper: Ser du et dyr med hale (som en bavian, kapusinerape eller lemur), er det en ape/halvape. Alle menneskeaper – inkludert oss – mangler ytre hale og har halebein i stedet!',
    didYouKnow:
      'Har du noen gang falt på isen og slått halebeinet skikkelig, vet du hvor vondt det gjør når leddbåndene rundt de små halevirvlene forstues! I svært sjeldne tilfeller (rundt et hundretalls dokumenterte tilfeller i medisinsk historie) svikter tilbaketrekningen i fosterlivet slik at barn faktisk fødes med en liten, myk halerest.',
    examples: [
      '3–5 sammenvokste halevirvler',
      'Menneskefoster i uke 6',
      'TBXT-mutasjonen (25 ma)',
      'Menneskeaper uten hale',
    ],
    accentCategory: 'human',
  },

  // ==========================================
  // SPOR 9: SVETTING & MARATONKROPPEN (~2 ma)
  // ==========================================
  {
    id: 'body_sweat_running',
    stepIndex: 8,
    isMainPath: true,
    parentId: 'body_tailbone',
    stepNumber: 9,
    title: 'Svetting og maratonkroppen',
    shortLabel: 'Svetting & langløp',
    latinName: 'Glandulae sudoriferae & Tendo calcaneus • Savannetiden',
    timeMa: '~2 ma',
    eraLabel: 'Hud, sener og bein • Jordas råeste utholdenhetsløper',
    x: 1415,
    y: 745,
    anchorX: 868,
    anchorY: 713,
    side: 'right',
    labelAnchor: 'right',
    traceType: 'exaptation',
    traceBadge: 'Unik menneske-superkraft',
    image: evoImg('body_sweat_running.png'),
    imageCaption:
      'Naken hud med millioner av svettekjertler og fjærende sener gjorde Homo erectus og Homo sapiens til uovertrufne langdistanseløpere i varmen.',
    summaryTitle: 'Treg i spurt – men i 35 varmegrader løper mennesket fra en hest!',
    whatHappens:
      'Sammenlignet med geparder, ulver og antiloper virker mennesket tregt, klønete og forsvarsløst. Men fra rundt 2 millioner år siden (med Homo erectus på den åpne afrikanske savannen) utviklet menneskekroppen en helt unik evolusjonær superpakke for utholdenhetsløping i sterk varme: Vi mistet den tette pelsen, mangedoblet antallet vannbaserte svettekjertler til 2–4 millioner, fikk lange fjærende akillessener, store setemuskler (gluteus maximus) og et spesielt nakkebånd som holder hodet i ro når vi løper!',
    keyTraits: [
      {
        title: '2–4 millioner svettekjertler (vannkjøling i fart)',
        description:
          'Pelskledde rovdyr og klovdyr kjøler seg hovedsakelig ned ved å pese – men i full galopp tvinges pusten i takt med steget, slik at de overopphetes etter få kilometer i solsteiken. Mennesket kjøler hele hudoverflaten mens vi løper!',
        icon: 'wind',
      },
      {
        title: 'Akillessenen som elastisk katapult',
        description:
          'Sjimpanser har nesten ingen fri akillessene. Vår lange akillessene lagrer og frigjør opptil 35 % av bevegelsesenergien gratis som en strikk for hvert løpesteg!',
        icon: 'zap',
      },
      {
        title: 'Gluteus maximus og nakkebåndet',
        description:
          'Kroppens største muskel (setemuskelen) er relativt liten når vi bare går rolig, men fyrer for fullt for å stabilisere overkroppen når vi løper eller går i motbakke.',
        icon: 'footprints',
      },
    ],
    classroomTest:
      'Kjenn bak på din egen ankel rett over hælen: Den tykke, stramme strengen er akillessenen – en gigantisk elastisk fjær som ingen av våre nærmeste slektninger blant menneskeapene har i nærheten av samme lengde!',
    didYouKnow:
      'Ved såkalt utholdenhetsjakt (persistence hunting), dokumentert hos jegere i Kalahari-ørkenen, jager jegere en stor kudu-antilope i middagsheten i 2–4 timer helt til dyret må stoppe av overoppheting – uten at jegeren engang trenger skytevåpen!',
    examples: [
      '2–4 millioner svettekjertler',
      'Akillessenen (elastisk fjær)',
      'Gluteus maximus (løpemuskel)',
      'Homo erectus på savannen',
    ],
    accentCategory: 'human',
  },

  // ==========================================
  // SPOR 10: FOTBUEN & NÅTIDIG EVOLUSJON (~4 ma – i dag)
  // ==========================================
  {
    id: 'body_foot_modern',
    stepIndex: 9,
    isMainPath: true,
    parentId: 'body_sweat_running',
    stepNumber: 10,
    title: 'Fotbuen og evolusjon som skjer akkurat nå',
    shortLabel: 'Fotbuen & nåtidens DNA',
    latinName: 'Arcus pedis & LCT-genet • Pågående evolusjon',
    timeMa: '~4 ma – i dag',
    eraLabel: 'Føtter og gener • Fra klatrefot til evolusjon i sanntid',
    x: 1415,
    y: 940,
    anchorX: 868,
    anchorY: 969,
    side: 'right',
    labelAnchor: 'right',
    traceType: 'ongoing',
    traceBadge: 'Evolusjon pågår nå!',
    image: evoImg('body_foot_modern.png'),
    imageCaption:
      'Menneskefoten med fremoverrettet stortå og spenstig fotbue er sluttstykket på overgangen fra treklatrer til jordklodens mest utbredte art.',
    summaryTitle: 'Har evolusjonen vår stoppet? Nei – DNA-et vårt endrer seg fortsatt!',
    whatHappens:
      'Nederst på kroppen finner vi et av de tydeligste skillelinjene mellom mennesket og alle andre primater: Sjimpanser og gorillaer har flate føtter med en gripende stortå som står ut som en tommel for å gripe grener. Hos mennesket ligger stortåen på linje med de andre tærne, og 26 knokler danner en stiv, fjærende fotbue som tåler flere ganger kroppsvekten vår. Og ser vi inn i genene våre fra de siste 10 000 årene, ser vi at menneskets evolusjon på ingen måte har stoppet opp!',
    keyTraits: [
      {
        title: 'Fra gripefot i trærne til fjærende fotbue',
        description:
          'Fotbuen fungerer både som støtdemper når hælen treffer bakken og som en stiv vektstang når vi sparker fra med stortåen.',
        icon: 'footprints',
      },
      {
        title: 'Laktosetoleranse – bare 7 500 år gammelt!',
        description:
          'Opprinnelig mistet alle mennesker evnen til å bryte ned melkesukker (laktose) etter småbarnsalderen. Da folk begynte med melkefe i Europa og Øst-Afrika, ga en mutasjon ved LCT-genet stor overlevelsesfordel og spredte seg i rekordfart!',
        icon: 'dna',
      },
      {
        title: 'Fridykker-milt og høyde-gener i Tibet',
        description:
          'Bajau-folket («sjønomadene» i Sørøst-Asia) har utviklet genetisk 50 % større milt som oksygenlager for fridykking, og tibetanere har arvet et høyde-gen (EPAS1) fra utdødde Denisova-mennesker!',
        icon: 'compass',
      },
    ],
    classroomTest:
      'Prøv å plukke opp en blyant fra gulvet med tærne! Du klarer kanskje å klemme den fast, men stortåen din kan ikke bøyes inn mot fotsålen som en tommel – fordi foten din ofret klatregrepet for å bli en maratonfjær.',
    didYouKnow:
      'Forskere som analyserte DNA fra skjeletter før og etter svartedauden (1347–1353) oppdaget at bestemte varianter av immungenet ERAP2 økte kraftig på bare én generasjon fordi bærere hadde opptil 40 % høyere sjanse for å overleve pesten – men det samme genet øker i dag risikoen for autoimmune sykdommer som Crohns sykdom!',
    examples: [
      'Laktosetoleranse (LCT-genet)',
      'Bajau-folkets dykkermilt',
      'Tibetanernes EPAS1-gen',
      '26 knokler i fotbuen',
    ],
    accentCategory: 'human',
  },
];

export const BODY_NODE_MAP: Record<string, BodyTraceNodeData> = Object.fromEntries(
  BODY_NODES.map((n) => [n.id, n]),
);

export const BODY_CONTROL_QUESTIONS: ControlQuestionItem[] = [
  {
    id: 'bq1',
    number: 1,
    question:
      'Hva er et rudimentært trekk, og hvorfor har ikke evolusjonen bare fjernet spor som halebein, gåsehud og øremuskler helt?',
    contextHint:
      'Tenk på hvordan naturlig utvalg faktisk virker – har evolusjonen et mål eller et «ryddemannskap»?',
    points: [
      {
        heading: '1. Arv fra forfedre der trekket hadde en viktig oppgave',
        detail:
          'Et rudimentært organ eller en rudimentær refleks (som gåsehud, ytre øremuskler eller Palmaris longus-senen i håndleddet) er et evolusjonært «fotavtrykk» etter en struktur som var fullt funksjonell hos tidligere forfedre.',
        badge: 'Definisjon',
      },
      {
        heading: '2. Svakt seleksjonspress når et trekk er ufarlig',
        detail:
          'Naturlig utvalg fjerner raskt trekk som er skadelige eller koster svært mye energi å bygge. Men å ha små hårmuskler i huden eller øremuskler koster nesten ingenting og påvirker ikke overlevelse eller hvor mange barn man får – derfor kan slike rester henge med i millioner av år.',
        badge: 'Naturlig utvalg',
      },
      {
        heading: '3. Eksaptasjon – når gamle deler får en ny viktig jobb!',
        detail:
          'Mange organer vi før trodde var «ubrukelige rester» har blitt gjenbrukt til nye oppgaver: Halebeinet er nødvendig feste for bekkenbunnsmusklene våre når vi går på to bein, og blindtarmsvedhenget fungerer som tilfluktsrom for gode tarmbakterier og immunvev.',
        badge: 'Gjenbruk',
      },
    ],
    takeaway:
      'Rudimentære trekk er blant våre tydeligste bevis for evolusjon: De gir bare mening når vi forstår at menneskekroppen er ombygget trinn for trinn fra fisk, tidlige pattedyr og trelevende primater.',
  },
  {
    id: 'bq2',
    number: 2,
    question:
      'Å reise seg på to bein ga forfedrene våre store muligheter, men skapte også varige sårbarheter i kroppen vår. Forklar dette evolusjonære kompromisset!',
    contextHint:
      'Sammenlign fordelene ved frie hender og langløp med ryggplager og menneskefødsler.',
    points: [
      {
        heading: 'Fordelene: Frie hender, overblikk og energieffektiv forflytning',
        detail:
          'Oppreist gange sparte energi over lange avstander på savannen, reduserte hvor mye sollys som traff kroppen midt på dagen, og frigjorde hendene til å bære mat, spedbarn og lage avanserte redskaper.',
        badge: 'Fordeler',
      },
      {
        heading: 'Kostnad 1: S-ryggsøyle, knær og korsryggplager',
        detail:
          'Fordi en opprinnelig horisontal virveldyr-ryggrad ble reist loddrett, bærer korsryggen hele overkroppens vekt. Det gir høy risiko for skiveprolaps, ryggsmerter, åreknuter og slitasje i hofter, knær og føtter.',
        badge: 'Skjelettbelastning',
      },
      {
        heading: 'Kostnad 2: Det obstetriske dilemmaet (smalt bekken vs. stor hjerne)',
        detail:
          'Effektiv tobeint gange krever et smalt, skålformet bekken, samtidig som menneskehjernen tredoblet seg i størrelse. Løsningen ble at menneskebarn fødes med uferdig hjerne og myke skalleplater – helt avhengige av langvarig omsorg.',
        badge: 'Fødsel & omsorg',
      },
    ],
    comparisonTable: {
      headers: ['Egenskap', 'Evolusjonær gevinst', 'Prisen vi betaler i dag'],
      rows: [
        [
          'S-formet ryggsøyle',
          'Balanserer hodet og overkroppen rett over hoftene med lite muskelbruk',
          'Høyt trykk på nederste ryggvirvler gir ofte korsryggsmerter og prolaps',
        ],
        [
          'Kort, smalt skålbekken',
          'Bærer innvollene oppreist og gir effektivt fraspark på to bein',
          'Trang fødselskanal møter stort hode («det obstetriske dilemmaet»)',
        ],
        [
          'Stiv fotbue uten gripetå',
          'Fungerer som en energibesparende fjær ved gange og maratonløp',
          'Mistet klatregrepet i trærne; sårbar for plattfot og belastningsskader',
        ],
        [
          'Mindre kjeve & kokt mat',
          'Frigjorde energi til hjernevekst og ga plass til finstemt taleapparat',
          'Trang plass til 32 tenner gjør at visdomstenner ofte kiler seg fast',
        ],
      ],
    },
    takeaway:
      'Evolusjon skaper ikke «perfekte» maskiner, men kompromisser som er gode nok til å overleve og føre genene videre.',
  },
  {
    id: 'bq3',
    number: 3,
    question:
      'Har menneskets evolusjon stoppet opp i moderne tid, eller finnes det tydelige eksempler på evolusjon de siste 10 000 årene?',
    contextHint:
      'Tenk på kosthold (melk og korn), visdomstenner, ekstreme miljøer og smittsomme sykdommer.',
    points: [
      {
        heading: 'Laktosetoleranse – gen og kultur hånd i hånd (~7 500 år siden)',
        detail:
          'Da steinalderbønder i Europa og Øst-Afrika begynte med melkefe, ga mutasjoner som holdt laktase-enzymet aktivt i voksen alder næring og væske i nødsår. I dag tåler rundt 90 % av etniske skandinaver melk, mot et mindretall globalt.',
        badge: 'Kosthold',
      },
      {
        heading: 'Færre visdomstenner og flere spytt-enzymer for stivelse',
        detail:
          'Folkegrupper med lang historie med korn og ris har flere kopier av amylase-genet (AMY1) i spyttet, og opptil 35 % fødes nå uten anlegg for én eller flere visdomstenner.',
        badge: 'Tenner & fordøyelse',
      },
      {
        heading: 'Tilpasning til høyde, fridykking og epidemier',
        detail:
          'Tibetanere trives i over 4 000 meters høyde takket være EPAS1-genvarianten, Bajau-dykkere har genetisk forstørret milt som oksygentank, og historiske epidemier som svartedauden har endret hyppigheten av viktige immungener i befolkningen.',
        badge: 'Miljø & sykdom',
      },
    ],
    takeaway:
      'Menneskets evolusjon pågår fortsatt! Når vi endrer levemåte, kosthold og miljø, endrer vi samtidig hvilke genvarianter som spres videre.',
  },
];
