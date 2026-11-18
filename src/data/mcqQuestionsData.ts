export interface McqQuestionItem {
  id: string;
  number: number;
  /** 0..9 step index in the theme so students can jump straight to the relevant visual step */
  relatedStepIndex: number;
  topicBadge: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

// ============================================================================
// TEMA 1: LIVETS TRE (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const TREE_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'tree-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Steg 1 • Livets opprinnelse (3700 ma)',
    question:
      'Hva er det sterkeste biologiske beviset for at alt nålevende liv på jorda – fra bakterier til trær og mennesker – stammer fra én felles ur-stamfar (LUCA)?',
    options: [
      'Alle levende organismer bruker samme genetiske kode (DNA/RNA), ATP og ribosomer til å bygge proteiner',
      'Alle levende organismer har en ekte cellekjerne og mitokondrier til å skaffe energi inne i cellene sine',
      'Alle levende organismer er avhengige av sollys og oksygengass (O₂) i atmosfæren for å kunne overleve',
      'Alle levende organismer er bygd opp av flere spesialiserte celler omgitt av en beskyttende cellevegg',
    ],
    correctIndex: 0,
    explanation:
      'Både bakterier, arker, sopp, planter og dyr bruker det samme genetiske alfabetet (A, T, C, G), ribosomer og ATP. Cellekjerne og flercellethet kom først milliarder av år senere!',
  },
  {
    id: 'tree-mcq-2',
    number: 2,
    relatedStepIndex: 0,
    topicBadge: 'Sidegren • Cyanobakterier',
    question:
      'Hvilken gruppe mikroorganismer begynte med oksygenproduserende fotosyntese i urhavet og endret jordas atmosfære dramatisk for over 2 milliarder år siden?',
    options: [
      'Arker som levde ved kokende hydrotermale kilder på havbunnen',
      'Cyanobakterier (blågrønnbakterier) som brukte sollys og vann',
      'Tidlige sopp og gjærceller som brøt ned mineraler i havet',
      'Encellede amøber og tøffeldyr som jaktet på andre mikrober',
    ],
    correctIndex: 1,
    explanation:
      'Cyanobakteriene produserte oksygengass (O₂) ved hjelp av sollys og vann («den store oksygenhendelsen») – og ble senere tatt opp som kloroplaster i plantenes stamfar!',
  },
  {
    id: 'tree-mcq-3',
    number: 3,
    relatedStepIndex: 1,
    topicBadge: 'Steg 2 • Eukaryoter (2000 ma)',
    question:
      'Hvordan forklarer endosymbioseteorien at de første komplekse eukaryote cellene fikk mitokondrier?',
    options: [
      'Cellen brettet sin egen stive cellevegg innover helt til det dannet seg et eget energikraftverk i midten',
      'Soppceller og grønnalger smeltet sammen på landjorda da oksygennivået i lufta ble høyt nok',
      'En arke-lignende vertscelle tok opp en oksygenbrukende bakterie som fortsatte å leve i samliv inne i cellen',
      'Virus kopierte energigener fra tidlige planter og satte dem inn i arvestoffet til de første virveldyrene',
    ],
    correctIndex: 2,
    explanation:
      'Mitokondriene var opprinnelig frittlevende bakterier som ble tatt opp uten å bli fordøyd. Derfor har mitokondrier fortsatt dobbel membran og sitt eget ringformede bakterie-DNA!',
  },
  {
    id: 'tree-mcq-4',
    number: 4,
    relatedStepIndex: 2,
    topicBadge: 'Steg 3 • Dyr (660 ma)',
    question:
      'Hvilken kombinasjon av kjennetegn gjelder for absolutt alle dyr i dyreriket (fra svamper og maneter til insekter og mennesker)?',
    options: [
      'De har indre ryggrad, et sentralt nervesystem med hjerne og puster ved hjelp av lunger eller gjeller',
      'De er flercellede organismer med fleksibel cellevegg av kitin som tar opp oppløst næring fra omgivelsene',
      'De produserer deler av sin egen næring ved fotosyntese, men kan bevege seg fritt ved hjelp av muskelvev',
      'De er flercellede eukaryoter, heterotrofe (må spise andre organismer) og mangler stiv cellevegg rundt cellene',
    ],
    correctIndex: 3,
    explanation:
      'Alle dyr er flercellede, eukaryote, heterotrofe organismer uten stiv cellevegg (i motsetning til planter med cellulosevegg og sopp med kitinvegg).',
  },
  {
    id: 'tree-mcq-5',
    number: 5,
    relatedStepIndex: 2,
    topicBadge: 'Sidegren • Leddyr & insekter',
    question:
      'Hvilken dyregruppe utgjør over halvparten av alle kjente nålevende dyrearter på jorda?',
    options: [
      'Insekter (en undergruppe av leddyrene med ytre skjelett)',
      'Beinfisker i ferskvann, kystområder og dype verdenshav',
      'Morkakedyr (særlig gnagere, flaggermus og små rovdyr)',
      'Bløtdyr (snegler, muslinger og intelligente blekkspruter)',
    ],
    correctIndex: 0,
    explanation:
      'Med over én million beskrevne arter (biller, sommerfugler, bier, maur, tovinger m.fl.) er insektene suverent jordas mest artsrike dyregruppe!',
  },
  {
    id: 'tree-mcq-6',
    number: 6,
    relatedStepIndex: 3,
    topicBadge: 'Steg 4 • Virveldyr & fisker (450 ma)',
    question:
      'Hva er en viktig anatomisk forskjell mellom bruskfisker (som hvithai og skater) og beinfisker (som torsk og laks)?',
    options: [
      'Bruskfisker mangler både hodeskalle og bevegelige kjever, mens beinfisker har kraftige kjever med tenner',
      'Bruskfisker har skjelett av brusk og mangler svømmeblære, mens beinfisker har forbeinet skjelett og oftest svømmeblære',
      'Bruskfisker må opp til overflaten for å puste luft med lunger, mens beinfisker tar opp oksygen med gjeller',
      'Bruskfisker regnes som virvelløse havdyr uten ryggrad, mens beinfisker utgjør de første ekte virveldyrene',
    ],
    correctIndex: 1,
    explanation:
      'Både bruskfisker og beinfisker er virveldyr med kjeve! Bruskfiskene har skjelett av lett, bøyelig brusk og holder seg flytende ved hjelp av en oljerik lever og bevegelse, uten svømmeblære.',
  },
  {
    id: 'tree-mcq-7',
    number: 7,
    relatedStepIndex: 4,
    topicBadge: 'Steg 5 • Tetrapoder (375 ma)',
    question:
      'Hvorfor er det 375 millioner år gamle fossilet Tiktaalik så berømt i evolusjonsbiologien?',
    options: [
      'Det er den eldste kjente fjærkledde rovdinosaurusen som kunne glidefly mellom trærne i urskogen',
      'Det er det eldste funnet av et varmblodig morkakedyr rett etter at dinosaurene døde ut på landjorda',
      'Det viser overgangsformen mellom kjøttfinnefisk i vann og de første firbeinte landvirveldyrene (tetrapodene)',
      'Det er det første kjente formennesket i Afrika som hadde både gripefot og oppreist gange på to bein',
    ],
    correctIndex: 2,
    explanation:
      'Tiktaalik hadde fiskeskjell og gjeller, men også flatt hode med bevegelig nakke, lunger og kraftige finneknokler med skulder-, albue- og håndledd som kunne løfte kroppen opp på grunna!',
  },
  {
    id: 'tree-mcq-8',
    number: 8,
    relatedStepIndex: 4,
    topicBadge: 'Sidegren • Krypdyr og fugler',
    question:
      'Hva viser moderne DNA-analyser og fossilfunn om fuglenes evolusjonære opphav?',
    options: [
      'Fugler utviklet seg fra trelevende pattedyr på samme gren av stamtreet som flaggermusene',
      'Fugler stammer fra store flyveøgler (pterosaurer) som levde helt adskilt fra dinosaurene',
      'Fugler skilte lag direkte fra amfibiene lenge før de første skjellkledde krypdyrene oppsto',
      'Fugler stammer direkte fra tobente, fjærkledde rovdinosaurer og er biologisk sett nålevende dinosaurer',
    ],
    correctIndex: 3,
    explanation:
      'Alle nålevende fugler (fra kjøttmeis til kongeørn) er direkte etterkommere av små fjærkledde theropod-dinosaurer som overlevde asteroide-nedslaget for 66 millioner år siden!',
  },
  {
    id: 'tree-mcq-9',
    number: 9,
    relatedStepIndex: 6,
    topicBadge: 'Steg 7 • Morkakedyr & hvaler (161 ma)',
    question:
      'Hvilke nålevende landdyr er de nærmeste evolusjonære slektningene til hvaler, delfiner og spekkhoggere?',
    options: [
      'Partåede klovdyr – og aller nærmest er flodhesten',
      'Seler, sjøløver og hvalrosser innenfor rovdyrgruppen',
      'Store bruskfisker som hvalhai og brugde i verdenshavene',
      'Planteetende sjøkuer, tapirer og afrikanske elefanter',
    ],
    correctIndex: 0,
    explanation:
      'Hvalene utviklet seg fra firbeinte, landlevende klovdyr for rundt 50 millioner år siden! Flodhesten er hvalenes nærmeste nålevende slektning, og store bardehvaler har fortsatt små bekkenrester gjemt inne i kroppen.',
  },
  {
    id: 'tree-mcq-10',
    number: 10,
    relatedStepIndex: 8,
    topicBadge: 'Steg 9–10 • Menneskeaper & Homo sapiens',
    question:
      'Hva kjennetegner menneskeapene (hominidene) til forskjell fra andre aper, og hvem er menneskets aller nærmeste nålevende slektning?',
    options: [
      'De har lang gripehale til klatring i trekronene, og gorillaen er vår nærmeste nålevende slektning',
      'De mangler ytre hale og har svært bevegelige skulderledd, og sjimpanse og bonobo er våre nærmeste slektninger',
      'De går alle oppreist på to bein på savannen, og orangutangen er vår nærmeste nålevende slektning',
      'De nedstammer direkte fra neandertalerne i Europa, og bavianen er vår nærmeste nålevende slektning',
    ],
    correctIndex: 1,
    explanation:
      'Alle menneskeaper mangler hale! Mennesket deler rundt 98,8 % av baseparene i DNA med sjimpanse og bonobo, som vi hadde en felles stamfar med for ca. 6–7 millioner år siden.',
  },
];

// ============================================================================
// TEMA 2: MENNESKEKROPPENS EVOLUSJONÆRE SPOR (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const BODY_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'body-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Spor 1 • Øynene & den blinde flekken',
    question:
      'Hvorfor har menneskeøyet (og alle andre virveldyrøyne) en blind flekk på netthinnen, mens blekksprutøyet ikke har noen blind flekk?',
    options: [
      'Fordi mennesker bare har tre typer fargetapper, mens blekkspruten ser ultrafiolett lys i dyphavet',
      'Fordi nervetrådene hos virveldyr ligger foran synscellene, slik at synsnerven må krysse ut gjennom netthinnen',
      'Fordi øyelinsen hos landlevende pattedyr kaster en fast skygge midt på den gule flekken i øyet',
      'Fordi tidlige pattedyr mistet fargesynet i dinosaurenes tid og måtte bygge netthinnen opp på nytt',
    ],
    correctIndex: 1,
    explanation:
      'Virveldyrøyet og blekksprutøyet utviklet seg uavhengig av hverandre. Hos virveldyr havnet «ledningsnettet» på innsiden foran synscellene, mens hjernen vår kontinuerlig redigerer bort den blinde flekken!',
  },
  {
    id: 'body-mcq-2',
    number: 2,
    relatedStepIndex: 1,
    topicBadge: 'Spor 2 • Øreknokler & hikke',
    question:
      'Hva er den mest anerkjente evolusjonære forklaringen på at mennesker hikker?',
    options: [
      'Det er en relativt ny tilpasning hos Homo sapiens for å trene stemmebåndene til talespråk',
      'Det skyldes at en trang underkjeve med visdomstenner klemmer på vagusnerven i halsen',
      'Det er en arvet refleks fra amfibier som pumper vann over gjellene mens strupelokket stenger for lungene',
      'Det er en beskyttelsesmekanisme fra drøvtyggere for å presse luft ut av blindtarmsvedhenget',
    ],
    correctIndex: 2,
    explanation:
      'Hikke styres av en eldgammel nervekobling i hjernestammen fra dengang forfedrene våre hadde både gjeller og lunger: mellomgulvet trekker inn mens strupelokket smeller igjen!',
  },
  {
    id: 'body-mcq-3',
    number: 3,
    relatedStepIndex: 2,
    topicBadge: 'Spor 3 • Visdomstenner & kjeve',
    question:
      'Hva er hovedårsaken til at visdomstenner så ofte blir liggende fastkilt i kjeven hos moderne mennesker?',
    options: [
      'Ild, matlaging og myk kost ga oss kortere og smalere kjever, mens oppskriften på 32 tenner ble værende',
      'Moderne mennesker har utviklet fire ekstra jeksler som eldre primater og formennesker aldri hadde',
      'Oppreist gange på to bein endret vinkelen på nakken slik at overkjeven sluttet å vokse i puberteten',
      'Overgangen fra frukt til kjøtt gjorde at emaljen på jekslene ble dobbelt så bred som hos sjimpanser',
    ],
    correctIndex: 0,
    explanation:
      'Kokt og bearbeidet mat krevde langt mindre tyggekraft og frigjorde energi til hjernevekst, men kjeven krympet raskere enn tannantallet. I dag fødes opptil 35 % uten anlegg for én eller flere visdomstenner!',
  },
  {
    id: 'body-mcq-4',
    number: 4,
    relatedStepIndex: 3,
    topicBadge: 'Spor 4 • S-ryggsøyle & bekken',
    question:
      'Hva beskriver «det obstetriske dilemmaet» i menneskets evolusjon?',
    options: [
      'At vi mistet gripefoten og klatreevnen i trærne samtidig som rovdyrene på savannen ble raskere',
      'At en S-formet ryggsøyle gir god balanse ved løping, men gjør at mellomvirvelskivene slites raskt ved sitting',
      'Motsetningen mellom behovet for tykk vinterpels i nord og millioner av svettekjertler i tropisk varme',
      'Kompromisset mellom et smalt bekken for effektiv tobeint gange og en stor menneskehjerne som skal gjennom fødselskanalen',
    ],
    correctIndex: 3,
    explanation:
      'Smalt skålbekken for tobeint gange kombinert med stort hode hos fosteret førte til at menneskebarn må fødes tidligere i hjerneutviklingen og trenger langvarig omsorg.',
  },
  {
    id: 'body-mcq-5',
    number: 5,
    relatedStepIndex: 4,
    topicBadge: 'Spor 5 • Gåsehud',
    question:
      'Hvorfor trekker tusenvis av ørsmå muskler i huden seg sammen og gir oss gåsehud når vi fryser eller blir skremt?',
    options: [
      'For å presse svette ut av svetteporene slik at huden regulerer temperaturen jevnere i vind',
      'Det er en gammel pattedyrrefleks som skulle reise en tykk pels for varmeisolasjon eller for å virke større mot fiender',
      'For å stenge blodtilførselen i underhuden og sende ekstra oksygen direkte til hjernen og synet',
      'For å stimulere pigmentcellene i overhuden til å beskytte arvestoffet mot sterkt sollys på savannen',
    ],
    correctIndex: 1,
    explanation:
      'Mennesket har fortsatt nesten like mange hårsekker og små hårmuskler (arrector pili) som en sjimpanse – vi har bare byttet ut den tykke pelsen med tynne dunhår!',
  },
  {
    id: 'body-mcq-6',
    number: 6,
    relatedStepIndex: 5,
    topicBadge: 'Spor 6 • Håndledd & griperefleks',
    question:
      'Rundt 15 % av oss mangler underarmsmuskelen Palmaris longus helt, uten å merke noen forskjell i gripestyrke. Hva er dette et eksempel på?',
    options: [
      'En skadelig mutasjon som gradvis svekker presisjonsgrepet mellom tommelen og pekefingeren',
      'En helt ny muskel som oppsto etter steinalderen for å gi bedre finmotorikk ved verktøybruk',
      'Et rudimentært trekk fra trelevende primater som ikke lenger trengs etter at vi sluttet å klatre i trær',
      'En spesialisert tilpasning til kulde som kun finnes hos folkegrupper lengst nord på kloden',
    ],
    correctIndex: 2,
    explanation:
      'Hos primater som lever hele livet i trekronene har alle en kraftig Palmaris longus. Hos mennesker er den blitt overflødig og brukes ofte av kirurger som «reservedel-sene»!',
  },
  {
    id: 'body-mcq-7',
    number: 7,
    relatedStepIndex: 6,
    topicBadge: 'Spor 7 • Blindtarmen',
    question:
      'Lenge trodde man blindtarmsvedhenget bare var en ubrukelig rest fra bladspisende forfedre. Hvilken viktig oppgave mener forskere i dag at den har fått?',
    options: [
      'Den fungerer som et trygt tilfluktsrom for gode tarmbakterier og som en treningssentral for immunforsvaret',
      'Den produserer ekstra enzymer som spalter melkesukker (laktose) og stivelse hos voksne mennesker',
      'Den skiller ut hormoner til blodet som styrer metthetsfølelsen etter fiberrike og fete måltider',
      'Den nøytraliserer magesyre fra magesekken før næringsstoffene tas opp gjennom tynntarmsveggen',
    ],
    correctIndex: 0,
    explanation:
      'Dette kalles eksaptasjon (evolusjonær gjenbruk): Etter kraftige magetarminfeksjoner kan de gode bakteriene som gjemmer seg i blindtarmsvedhenget kolonisere tykktarmen på nytt!',
  },
  {
    id: 'body-mcq-8',
    number: 8,
    relatedStepIndex: 7,
    topicBadge: 'Spor 8 • Halebeinet',
    question:
      'Hvilket utsagn om halebeinet og halen hos mennesket er vitenskapelig riktig?',
    options: [
      'Menneskefosteret har aldri anlegg til hale, fordi hale-genene ble slettet da amfibiene gikk på land',
      'Kun Homo sapiens mangler hale, mens sjimpanser, gorillaer og orangutanger har kort gripehale',
      'Halebeinet ligger helt løst i korsryggen uten feste til verken sener, leddbånd eller muskulatur',
      'Menneskefosteret har tydelig haleanlegg i uke 4–8, og halebeinet fungerer i dag som viktig feste for bekkenbunnsmusklene',
    ],
    correctIndex: 3,
    explanation:
      'Alle menneskeaper mistet den ytre halen for rundt 25 millioner år siden (knyttet til en mutasjon i TBXT-genet), men halebeinet er i dag et viktig ankerfeste for musklene i bekkenbunnen!',
  },
  {
    id: 'body-mcq-9',
    number: 9,
    relatedStepIndex: 8,
    topicBadge: 'Spor 9 • Svetting & maratonkroppen',
    question:
      'Hvilke tilpasninger gjorde slekten Homo til en av dyrerikets aller råeste langdistanseløpere i sterk varme?',
    options: [
      'Tett isolerende pels mot solstråling kombinert med rask pesing i takt med hvert løpesteg',
      'Naken hud med millioner av vannbaserte svettekjertler, lang fjærende akillessene og store setemuskler',
      'Myke, flate føtter med sprikende gripetå som gir maksimalt fraspark i tørt savannegress',
      'Ekstra lange underarmer og en stiv, rett ryggsøyle som holder tyngdepunktet langt foran hoftene',
    ],
    correctIndex: 1,
    explanation:
      'Mens pelskledde pattedyr overopphetes fordi de må pese i takt med galoppsteget, svetter mennesket over hele hudoverflaten samtidig som akillessenen og fotbuen lagrer gratis fjærenergi!',
  },
  {
    id: 'body-mcq-10',
    number: 10,
    relatedStepIndex: 9,
    topicBadge: 'Spor 10 • Fotbuen & nåtidig evolusjon',
    question:
      'Hvilket av disse eksemplene viser tydelig at biologisk evolusjon ved naturlig utvalg fortsatt pågår hos mennesket i nyere tid (siste 10 000 år)?',
    options: [
      'Utviklingen av fire lemmer med fingre og tær samt lunger til å puste luft på landjorda',
      'Utviklingen av tre ulike fargetapper i øyet for å skille moden rød frukt fra grønne blader',
      'Rask spredning av laktosetoleranse i voksen alder hos husdyrfolk samt høydetilpasninger i Tibet',
      'Omdanningen av gamle kjeveknokler til de tre små øreknoklene hammeren, ambolten og stigbøylen',
    ],
    correctIndex: 2,
    explanation:
      'Evnen til å fordøye melkesukker (laktose) som voksen ble vanlig i Nord-Europa og deler av Øst-Afrika for bare ca. 7 500 år siden – et klassisk eksempel på gen-kultur-koevolusjon!',
  },
];

// ============================================================================
// TEMA 3: EUKARYOT DYRECELLE (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const CELL_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'cell-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Del 1 • Cellemembranen',
    question:
      'Hvordan er fosfolipidene i cellemembranen orientert, og hvorfor?',
    options: [
      'Ett enkelt lag der de fettløselige halene peker rett ut mot vannet i blodet og vevsvæsken',
      'Et dobbeltlag der vannelskende hoder vender mot vann på begge sider, mens vannavstøtende fettsyrehaler peker inn mot midten',
      'En stiv yttervegg av sammenvevde cellulosefibre som sørger for at dyrecellen holder en fast form',
      'Et fast rutenett av kolesterol og DNA-tråder som slipper alle vannløselige ioner fritt gjennom',
    ],
    correctIndex: 1,
    explanation:
      'Fordi det er vann både inni (cytosol) og utenfor cellen, danner fosfolipidene automatisk et tett, halvgjennomtrengelig dobbeltlag der transportproteiner styrer hva som slipper inn og ut!',
  },
  {
    id: 'cell-mcq-2',
    number: 2,
    relatedStepIndex: 1,
    topicBadge: 'Del 2 • Cytoplasma & cytosol',
    question:
      'Hva kalles selve den geléaktige cellevæsken mellom cellemembranen og cellekjernen, og hvilket trinn i glukosenedbrytningen skjer her?',
    options: [
      'Cytosol – her skjer glykolysen (første trinn i spaltningen av glukose uten oksygen)',
      'Nukleolus – her fanges solenergi opp og omdannes til druesukker og oksygengass',
      'Cristae – her kopieres oppskriftene i DNA direkte over til enkelttrådet mRNA',
      'Kromatin – her sorteres ferdige hormoner og pakkes inn i små transportblærer',
    ],
    correctIndex: 0,
    explanation:
      'Cytosol er selve cellevæsken (mens cytoplasma er cytosol + alle organeller utenfor kjernen). Glykolysen spalter glukose ute i cytosol før mitokondriene overtar den aerobe delen!',
  },
  {
    id: 'cell-mcq-3',
    number: 3,
    relatedStepIndex: 2,
    topicBadge: 'Del 3 • Cellekjernen & DNA',
    question:
      'DNA-trådene forlater aldri cellekjernen når cellen skal lage et protein. Hvordan kommer oppskriften seg ut til proteinfabrikkene i cytoplasma?',
    options: [
      'Ribosomene kryper inn gjennom kjernemembranen, leser DNA-tråden og tar med genet ut',
      'Mitokondriene sender energirike enzymer inn i kjernen som frakter hele kromosomet ut i cytosol',
      'Det lages en arbeidskopi av genet som mRNA (transkripsjon), som fraktes ut gjennom en kjernepore',
      'Golgiapparatet pakker DNA-oppskriften inn i en fettholdig vesikkel og sender den ut ved eksocytose',
    ],
    correctIndex: 2,
    explanation:
      'Under transkripsjon inne i cellekjernen kopieres det aktuelle genet over til et mRNA-molekyl, som passerer ut gjennom kjerneporene mens original-DNA-et ligger trygt igjen.',
  },
  {
    id: 'cell-mcq-4',
    number: 4,
    relatedStepIndex: 3,
    topicBadge: 'Del 4 • Ribosomer',
    question:
      'Hva skjer på ribosomene under translasjonen, og hva er spesielt med oppbygningen deres?',
    options: [
      'De forbrenner fettsyrer med oksygen til ATP og er omgitt av en sterkt foldet dobbel membran',
      'De bryter ned fremmede bakterier ved lav pH og er pakket inn i en syrebestandig enkeltmembran',
      'De produserer fosfolipider til cellemembranen og består av hule rør av proteinet tubulin',
      'De leser mRNA-koden og kobler aminosyrer sammen til proteiner, og de har ingen omsluttende membran',
    ],
    correctIndex: 3,
    explanation:
      'Ribosomer består av rRNA og proteiner uten membran rundt seg. De leser mRNA tre baser av gangen (kodon) og skjøter sammen aminosyrer til ferdige proteinkjeder!',
  },
  {
    id: 'cell-mcq-5',
    number: 5,
    relatedStepIndex: 4,
    topicBadge: 'Del 5 • Ru og glatt ER',
    question:
      'Leverceller som avgifter medisiner og alkohol har ekstra mye av én type ER, mens kjertelceller som lager fordøyelsesenzymer har ekstra mye av den andre. Hvordan henger dette sammen?',
    options: [
      'Leverceller har mye glatt ER til avgiftning og lipider, mens kjertelceller har mye ru ER med ribosomer til proteinproduksjon',
      'Leverceller har mye ru ER til å lagre kalsium, mens kjertelceller har mye glatt ER til å koble sammen aminosyrer',
      'Leverceller bruker glatt ER til celleånding med oksygen, mens kjertelceller bruker ru ER til å kopiere arvestoffet DNA',
      'Både leverceller og kjertelceller mangler ER helt og bruker i stedet centrioler til å bygge og rense stoffer',
    ],
    correctIndex: 0,
    explanation:
      'Ru ER er dekket av ribosomer som lager og folder proteiner til utskillelse, mens glatt ER mangler ribosomer og tar seg av lipidproduksjon, kalsiumlagring og nedbrytning av giftstoffer!',
  },
  {
    id: 'cell-mcq-6',
    number: 6,
    relatedStepIndex: 5,
    topicBadge: 'Del 6 • Golgiapparatet',
    question:
      'Hvorfor kalles Golgiapparatet ofte for «cellens postkontor og pakkesentral»?',
    options: [
      'Fordi det beskytter kromosomene i cellekjernen og sender ut kopier når cellen skal dele seg',
      'Fordi det tar imot proteiner fra ER, fester på kjemiske «adresselapper», sorterer dem og pakker dem i vesikler',
      'Fordi det sitter ytterst i cellemembranen og pumper natrium- og kaliumioner ut og inn av cellen',
      'Fordi det lagrer overskuddsenergi som glykogen og frigjør ATP når muskelcellene trekker seg sammen',
    ],
    correctIndex: 1,
    explanation:
      'Uten sortering og kjemisk merking i Golgiapparatets flate membransekker ville ikke enzymene og hormonene havnet på riktig bestemmelsessted i eller utenfor cellen.',
  },
  {
    id: 'cell-mcq-7',
    number: 7,
    relatedStepIndex: 6,
    topicBadge: 'Del 7 • Transportvesikler',
    question:
      'Når en nervecelle slipper ut signalstoffer eller en bukspyttkjertelcelle skiller ut insulin, smelter en membranblære sammen med cellemembranen og tømmer innholdet ut. Hva kalles dette?',
    options: [
      'Passiv osmose gjennom vannkanaler',
      'Endocytose (innbukting av membranen)',
      'Eksocytose (utskillelse via blæresammensmelting)',
      'Autofagi (nedbrytning i lysosomer)',
    ],
    correctIndex: 2,
    explanation:
      'Eksocytose («eksport ut av cellen») lar cellen skille ut store molekyler som proteiner uten å lage hull i cellemembranen. Det motsatte (opptak inn i blærer) kalles endocytose!',
  },
  {
    id: 'cell-mcq-8',
    number: 8,
    relatedStepIndex: 7,
    topicBadge: 'Del 8 • Mitokondrier',
    question:
      'Hvilken kjemisk hovedprosess skjer i mitokondriene, og hvilke celler i menneskekroppen har spesielt mange av dem?',
    options: [
      'Fotosyntese (CO₂ + H₂O → glukose + O₂), med flest mitokondrier i overhudens pigmentceller',
      'Transkripsjon av DNA til mRNA, med flest mitokondrier i modne røde blodceller i blodbanen',
      'Lagring av nøytralt fett, med flest mitokondrier i underhudens hvite fettceller og bruskvev',
      'Aerob celleånding (glukose + O₂ → CO₂ + H₂O + ATP), med tusenvis i aktive muskel-, hjerte- og nerveceller',
    ],
    correctIndex: 3,
    explanation:
      'Den sterkt foldede indre membranen (cristae) i mitokondriene gir enorm overflate for å lade opp energimolekylet ATP ved hjelp av oksygen!',
  },
  {
    id: 'cell-mcq-9',
    number: 9,
    relatedStepIndex: 8,
    topicBadge: 'Del 9 • Lysosomer & peroksisomer',
    question:
      'Hva er hovedoppgaven til lysosomene i en dyrecelle, og hva kalles prosessen når de resirkulerer cellens egne utslitte organeller?',
    options: [
      'De bryter ned avfall, bakterier og utslitte celledeler ved sur pH – resirkulering av egne organeller kalles autofagi',
      'De trekker kromosomene fra hverandre under celledeling – en prosess som kalles mitose',
      'De bygger opp lange proteinkjeder ut fra mRNA i cytoplasma – en prosess som kalles translasjon',
      'De stiver av fosfolipidmembranen med kolesterolmolekyler – en prosess som kalles homeostase',
    ],
    correctIndex: 0,
    explanation:
      'Lysosomene er cellens gjenvinningsstasjon med ~40 enzymer som jobber ved sur pH (~4,8). Ved siden av dem bruker peroksisomene enzymet katalase til å ufarliggjøre hydrogenperoksid (H₂O₂)!',
  },
  {
    id: 'cell-mcq-10',
    number: 10,
    relatedStepIndex: 9,
    topicBadge: 'Del 10 • Cytoskjelett & celletyper',
    question:
      'Hvilket utsagn skiller en eukaryot dyrecelle korrekt fra en eukaryot plantecelle?',
    options: [
      'Dyrecellen har mange mitokondrier til celleånding, mens plantecellen kun har kloroplaster og mangler mitokondrier',
      'Dyrecellen mangler stiv cellevegg og kloroplaster, og får i stedet form, bevegelse og transportskinner fra et dynamisk cytoskjelett',
      'Dyrecellen har frittliggende arvestoff uten kjernehinne, mens plantecellen har sitt DNA samlet i en ekte cellekjerne',
      'Dyrecellen har en stor sentral saftvakuole og cellevegg av kitin, mens plantecellen bare har en myk cellemembran',
    ],
    correctIndex: 1,
    explanation:
      'Både dyre- og planteceller har kjerne og mitokondrier! Men dyrecellen mangler stiv cellevegg og kloroplaster, har centrioler i centrosomet og bruker cytoskjelett + motorproteiner (som kinesin) til form og transport.',
  },
];

// ============================================================================
// TEMA 4: EUKARYOT PLANTECELLE (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const PLANT_CELL_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'plant-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Del 1 • Celleveggen',
    question:
      'Hvilket karbohydrat utgjør hovedarmeringen i plantecellens stive cellevegg, og hva heter de små kanalene som kobler cytoplasmaet i naboceller direkte sammen?',
    options: [
      'Cellulose er hovedarmeringen, og kanalene gjennom celleveggen kalles plasmodesmata',
      'Kitin er hovedarmeringen, og kanalene gjennom celleveggen kalles kjerneporer',
      'Glykogen er hovedarmeringen, og kanalene gjennom celleveggen kalles sentrioler',
      'Kolesterol er hovedarmeringen, og kanalene gjennom celleveggen kalles tylakoider',
    ],
    correctIndex: 0,
    explanation:
      'Plantecellens cellevegg er armert med lange bunter av cellulose (limt sammen med pektin og hemicellulose), mens plasmodesmata fungerer som mikroskopiske tunneler mellom nabocellene!',
  },
  {
    id: 'plant-mcq-2',
    number: 2,
    relatedStepIndex: 1,
    topicBadge: 'Del 2 • Cellemembranen & osmose',
    question:
      'Hva skjer på cellenivå dersom en plantecelle legges i sterkt saltvann eller tørker kraftig ut (plasmolyse)?',
    options: [
      'Celleveggen løser seg opp, mens vakuolen svulmer opp til hele cellen sprekker',
      'Vann trekkes ut av cellen ved osmose slik at cellemembranen løsner og krymper bort fra innsiden av den stive celleveggen',
      'Kloroplastene slutter å lage klorofyll og forvandles direkte til nye mitokondrier',
      'Cellemembranen blir til en ny cellevegg av vedstoff (lignin) for å stenge saltet inne',
    ],
    correctIndex: 1,
    explanation:
      'I saltvann er vannkonsentrasjonen lavere utenfor enn inni cellen. Dermed strømmer vann ut ved osmose, saftspenningen forsvinner, og cellemembranen slipper taket i celleveggen (plasmolyse)!',
  },
  {
    id: 'plant-mcq-3',
    number: 3,
    relatedStepIndex: 2,
    topicBadge: 'Del 3 • Kloroplaster & fotosyntese',
    question:
      'Hvor i kloroplasten sitter det grønne fargestoffet klorofyll, og hva er sluttproduktene av fotosyntesen?',
    options: [
      'Klorofyll sitter i mitokondrienes cristae, og sluttproduktene er karbondioksid (CO₂) og vann (H₂O)',
      'Klorofyll flyter fritt i sentralvakuolen, og sluttproduktene er aminosyrer og melkesyre',
      'Klorofyll sitter i tylakoidmembranene (stablet i grana), og sluttproduktene er druesukker (glukose, C₆H₁₂O₆) og oksygengass (O₂)',
      'Klorofyll sitter i cellekjernens kjernelegeme, og sluttproduktene er cellulose og nitrogen',
    ],
    correctIndex: 2,
    explanation:
      'I tylakoidmembranene fanger klorofyll lysenergi som spalter vann og slipper ut O₂, mens Calvinsyklusen i stroma bruker CO₂ til å bygge glukose (6 CO₂ + 6 H₂O + lys → C₆H₁₂O₆ + 6 O₂)!',
  },
  {
    id: 'plant-mcq-4',
    number: 4,
    relatedStepIndex: 3,
    topicBadge: 'Del 4 • Sentralvakuolen',
    question:
      'Hvilke viktige oppgaver har den store sentralvakuolen (saftrommet) i en utvokst plantecelle?',
    options: [
      'Den kopierer kromosomene før celledeling og sender mRNA ut i cytoplasma',
      'Den spinner cellulosetråder på utsiden av celleveggen og pumper oksygen inn i bladet',
      'Den driver aerob celleånding om natta når kloroplastene ikke får sollys',
      'Den skaper saftspenning (turgortrykk) ved osmose, lagrer vann, næring og fargestoffer, og bryter ned avfall ved lav pH',
    ],
    correctIndex: 3,
    explanation:
      'Sentralvakuolen utgjør ofte 50–90 % av plantecellens volum! Den holder urteaktige planter oppreist ved saftspenning mot celleveggen og overtar også rollen til dyrecellens lysosomer.',
  },
  {
    id: 'plant-mcq-5',
    number: 5,
    relatedStepIndex: 4,
    topicBadge: 'Del 5 • Cellekjernen & arvestoff',
    question:
      'På hvilke tre steder inne i én og samme grønne plantecelle finner vi eget arvestoff (DNA)?',
    options: [
      'I cellekjernen, i mitokondriene og i kloroplastene',
      'I celleveggen, i sentralvakuolen og i Golgiapparatet',
      'I cellemembranen, i glatt ER og i transportvesiklene',
      'Kun i kloroplastene om dagen og i cellekjernen om natta',
    ],
    correctIndex: 0,
    explanation:
      'Hovedarvestoffet ligger som lineære kromosomer i cellekjernen, mens både mitokondriene og kloroplastene har beholdt sitt eget ringformede bakterie-DNA fra endosymbiosen!',
  },
  {
    id: 'plant-mcq-6',
    number: 6,
    relatedStepIndex: 5,
    topicBadge: 'Del 6 • Cytoplasma & strømning',
    question:
      'I et lysmikroskop kan man se at kloroplastene seiler rundt i en jevn strøm inne i levende bladceller (cytoplasmastrømning). Hvorfor er dette nyttig for planten?',
    options: [
      'Det gjør at plantecellen kan løsne fra bladet og svømme fritt rundt i vann',
      'Det fordeler næringsstoffer og gasser raskt i cytosol og flytter kloroplastene til optimal posisjon etter lysstyrken',
      'Det pumper cellulose gjennom kjerneporene og rett inn i arvestoffet',
      'Det erstatter behovet for både cellemembran og transportproteiner i røttene',
    ],
    correctIndex: 1,
    explanation:
      'Motorproteiner langs aktinfilamenter driver cytoplasmastrømningen slik at stoffer fordeles effektivt rundt den store vakuolen, og slik at kloroplastene fanger mest mulig lys uten å bli solskadet!',
  },
  {
    id: 'plant-mcq-7',
    number: 7,
    relatedStepIndex: 6,
    topicBadge: 'Del 7 • Ribosomer & ER',
    question:
      'Hva er arbeidsdelingen mellom ribosomer/ru ER og glatt ER i en plantecelle?',
    options: [
      'Ru ER spalter vann med sollys, mens glatt ER lagrer blå og røde blomsterfarger',
      'Ru ER bygger stive vedrør av lignin, mens glatt ER leser av mRNA og lager enzymer',
      'Ribosomer og ru ER bygger og folder proteiner ut fra mRNA, mens glatt ER lager lipider som planteoljer til frø og voks til bladets kutikula',
      'Både ru ER og glatt ER brukes utelukkende til å pumpe vann inn i sentralvakuolen',
    ],
    correctIndex: 2,
    explanation:
      'Akkurat som i dyrecellen står ribosomene og ru ER for proteinsyntese (translasjon og folding), mens glatt ER produserer membranfett, energirike frøoljer og vannavstøtende overflatevoks!',
  },
  {
    id: 'plant-mcq-8',
    number: 8,
    relatedStepIndex: 7,
    topicBadge: 'Del 8 • Golgiapparatet & celledeling',
    question:
      'Hvilken ekstra nøkkelrolle har Golgiapparatet og vesiklene i en plantecelle sammenlignet med en dyrecelle?',
    options: [
      'De fanger opp sollys når bladet mister klorofyll om høsten',
      'De kopierer mitokondrienes ring-DNA før planten blomstrer',
      'De trekker cellemembranen sammen utenfra slik at celleveggen klippes i to',
      'De produserer pektin og hemicellulose til celleveggen og bygger en ny skillevegg (celleplate) innenfra når plantecellen deler seg',
    ],
    correctIndex: 3,
    explanation:
      'Fordi den stive celleveggen hindrer innsnøring utenfra, sender plantens Golgistabler (diktyosomer) vesikler med veggmateriale til midten av cellen der de smelter sammen til en ny celleplate!',
  },
  {
    id: 'plant-mcq-9',
    number: 9,
    relatedStepIndex: 8,
    topicBadge: 'Del 9 • Mitokondrier i planter',
    question:
      'Hvilket utsagn om mitokondrier og kloroplaster i planter er biologisk riktig?',
    options: [
      'Planteceller har mitokondrier i både grønne blader og hvite røtter, og trenger aerob celleånding døgnet rundt for å skaffe ATP til cellens arbeid',
      'Planteceller mangler mitokondrier helt fordi kloroplastene forsyner både blader og røtter direkte med ATP dag og natt',
      'Kun visne blader om høsten har mitokondrier, mens friske sommerblader bare har kloroplaster',
      'Kloroplaster finnes i alle rotceller under jorda, mens mitokondrier bare finnes i kronbladene',
    ],
    correctIndex: 0,
    explanation:
      'Kloroplastene lager glukose i sollys (kun i grønne plantedeler!), mens mitokondriene finnes i alle levende planteceller og forbrenner glukose med O₂ til brukbar ATP hele døgnet!',
  },
  {
    id: 'plant-mcq-10',
    number: 10,
    relatedStepIndex: 9,
    topicBadge: 'Del 10 • Helhet & sammenligning',
    question:
      'Hvilke tre strukturer finnes i en grønn bladcelle hos en plante, men mangler i en eukaryot dyrecelle?',
    options: [
      'Cellemembran, ribosomer og mitokondrier',
      'Cellevegg av cellulose (med plasmodesmata), kloroplaster og en stor sentralvakuole',
      'Cellekjerne med porer, ru endoplasmatisk retikulum og Golgiapparat',
      'Centrioler, fleksibel membran uten vegg og små spesialiserte lysosomer',
    ],
    correctIndex: 1,
    explanation:
      'Både plante- og dyreceller har membran, kjerne, ribosomer, ER, Golgi og mitokondrier – men kun plantecellen har cellevegg av cellulose, kloroplaster og stor sentralvakuole!',
  },
];

// ============================================================================
// TEMA 5: PROTEINSYNTESEN (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const PROTEIN_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'prot-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Steg 1 • DNA-genet åpnes i kjernen',
    question:
      'Hvorfor frakter ikke en eukaryot celle selve DNA-molekylet ut til ribosomene i cytoplasma når den skal lage et protein?',
    options: [
      'Fordi DNA er cellens uerstattelige «originalbok» med alle ~20 000 gener, og beskyttes trygt inne i cellekjernen mens kun arbeidskopier (mRNA) sendes ut',
      'Fordi ribosomene bare finnes inne i mitokondriene og kloroplastene og ikke ute i cytoplasma',
      'Fordi DNA-tråden bare inneholder tre ulike nitrogenbaser og mangler oppskriften på aminosyrer',
      'Fordi cellemembranen bryter ned DNA dersom genet åpner seg ved promotoren',
    ],
    correctIndex: 0,
    explanation:
      'DNA blir alltid værende trygt beskyttet inne i cellekjernen – cellen lager i stedet mange kortlivede mRNA-arbeidskopier av akkurat det ene genet det er bruk for!',
  },
  {
    id: 'prot-mcq-2',
    number: 2,
    relatedStepIndex: 1,
    topicBadge: 'Steg 2 • Transkripsjon (DNA → pre-mRNA)',
    question:
      'Hvis maltråden i DNA har baserekkefølgen 3\'-TAC GGT CAA-5\', hvilken komplementær mRNA-sekvens vil enzymet RNA-polymerase bygge?',
    options: [
      '5\'-ATG CCA GTT-3\'',
      '5\'-AUG CCA GUU-3\'',
      '5\'-UAC GGU CAA-3\'',
      '5\'-TUG CCU GAA-3\'',
    ],
    correctIndex: 1,
    explanation:
      'Under transkripsjonen parer T i DNA med A i RNA, C med G, G med C – og A i DNA parer med urasil (U) i RNA, siden RNA aldri inneholder tymin (T)! Derfor gir TAC GGT CAA → AUG CCA GUU.',
  },
  {
    id: 'prot-mcq-3',
    number: 3,
    relatedStepIndex: 2,
    topicBadge: 'Steg 3 • Spleising og modning av mRNA',
    question:
      'Hva skjer under spleisingen av pre-mRNA inne i cellekjernen hos eukaryote organismer?',
    options: [
      'Aminosyrene klippes fra hverandre og pakkes inn i små transportvesikler fra Golgiapparatet',
      'De to DNA-trådene limes permanent sammen slik at genet aldri kan leses flere ganger',
      'Ikke-kodende introner klippes bort, mens de kodende eksonene skjøtes sammen til modent mRNA med 5\'-hette og poly-A-hale',
      'Ribosomene klipper bort alle urasil-basene (U) og bytter dem ut med tymin (T)',
    ],
    correctIndex: 2,
    explanation:
      'Huskeregelen: Introner blir INne i kjernen (klippes bort av spleisosomer), mens eksonene skjøtes sammen og EXporteres ut som ferdig mRNA! Alternativ spleising gjør at ett gen kan gi flere ulike proteiner.',
  },
  {
    id: 'prot-mcq-4',
    number: 4,
    relatedStepIndex: 3,
    topicBadge: 'Steg 4 • Eksport gjennom kjerneporen',
    question:
      'Hvilken struktur må det ferdig modnede mRNA-molekylet passere gjennom for å komme seg fra cellekjernen ut til ribosomene i cytoplasma?',
    options: [
      'Plasmodesmata-kanalene ytterst i celleveggen av cellulose',
      'Ionepumpene i den ytre cellemembranen',
      'Foldene (cristae) på den indre mitokondriemembranen',
      'En kjernepore (kjerneporekompleks) i den doble kjernemembranen',
    ],
    correctIndex: 3,
    explanation:
      'Den doble kjernemembranen har tusenvis av kjerneporer som sjekker at mRNA-tråden er ferdig spleiset og utstyrt med 5\'-hette og poly-A-hale før den slipper ut i cytoplasma!',
  },
  {
    id: 'prot-mcq-5',
    number: 5,
    relatedStepIndex: 4,
    topicBadge: 'Steg 5 • Kodon og tRNA',
    question:
      'Hvorfor består den genetiske koden på mRNA av grupper på nettopp TRE baser av gangen (triplettkodon), og hvilken rolle har tRNA?',
    options: [
      'Tre baser gir 4 × 4 × 4 = 64 kombinasjoner – nok til å kode for alle de 20 aminosyrene + stoppsignaler – og tRNA tolker koden ved hjelp av antikodon i den ene enden og riktig aminosyre i den andre',
      'Tre baser gir nøyaktig 12 kombinasjoner, og tRNA bygger selve cellekjernen rundt mRNA-tråden',
      'Tre baser trengs for å lage sukkeret deoksyribose, og tRNA klipper bort introner inne i kjernen',
      'Hver enkelt base koder for tre ulike proteiner samtidig, og tRNA fungerer som energikilde i stedet for ATP',
    ],
    correctIndex: 0,
    explanation:
      'Én base (4 muligheter) eller to baser (4 × 4 = 16 muligheter) er for få til 20 aminosyrer. Tre baser gir 64 kodon (61 for aminosyrer + 3 stoppkodon), og tRNA kobler riktig aminosyre til riktig kodon!',
  },
  {
    id: 'prot-mcq-6',
    number: 6,
    relatedStepIndex: 5,
    topicBadge: 'Steg 6 • Start av translasjonen',
    question:
      'Hvilket kodon på mRNA fungerer som startkodon når ribosomet starter translasjonen, og hvilken første aminosyre setter det inn?',
    options: [
      'UAA – som setter inn aminosyren glysin',
      'AUG – som setter inn aminosyren metionin og fastsetter leserammen',
      'TAC – som setter inn tymin på ribosomet',
      'GGG – som klipper løs den ferdige proteinkjeden',
    ],
    correctIndex: 1,
    explanation:
      'Startkodonet AUG gjør to viktige jobber samtidig: det koder for aminosyren metionin (Met) og låser leserammen slik at ribosomet leser tre og tre baser riktig herfra!',
  },
  {
    id: 'prot-mcq-7',
    number: 7,
    relatedStepIndex: 6,
    topicBadge: 'Steg 7 • Kjedeforlengelse på ribosomet',
    question:
      'Hva kalles den sterke kjemiske bindingen som ribosomet kobler sammen mellom hver aminosyre i den voksende kjeden?',
    options: [
      'Svak hydrogenbinding mellom nitrogenbaser',
      'Osmotisk binding gjennom en halvgjennomtrengelig membran',
      'Peptidbinding – som kjeder aminosyrene sammen til en lang polypeptidkjede',
      'Esterbinding mellom fettsyrer og glyserol',
    ],
    correctIndex: 2,
    explanation:
      'Ribosomet (ved hjelp av rRNA) smir kovalente peptidbindinger mellom aminosyrene etter hvert som nye tRNA ankommer – derfor kalles den voksende perlekjeden en polypeptidkjede!',
  },
  {
    id: 'prot-mcq-8',
    number: 8,
    relatedStepIndex: 7,
    topicBadge: 'Steg 8 • Stoppkodon (UAA, UAG, UGA)',
    question:
      'Hva skjer når ribosomet kommer fram til et stoppkodon (UAA, UAG eller UGA) på mRNA-tråden?',
    options: [
      'Et spesielt tRNA setter inn en siste «stopp-aminosyre» før kjeden sendes tilbake inn i cellekjernen',
      'RNA-polymerase starter umiddelbart å kopiere proteinet tilbake til nytt DNA',
      'Mitokondriet sluker hele ribosomet for å utvinne ATP fra mRNA-tråden',
      'Ingen tRNA passer til stoppkodonet; i stedet binder en frigjøringsfaktor seg, klipper løs den ferdige polypeptidkjeden, og ribosomdelene går fra hverandre',
    ],
    correctIndex: 3,
    explanation:
      'Stoppkodonene UAA, UAG og UGA koder IKKE for noen aminosyre! En frigjøringsfaktor («release factor») sørger for at polypeptidkjeden frigjøres fra ribosomet.',
  },
  {
    id: 'prot-mcq-9',
    number: 9,
    relatedStepIndex: 8,
    topicBadge: 'Steg 9 • 3D-folding, ER & Golgi',
    question:
      'Hvorfor må polypeptidkjeden foldes til en bestemt tredimensjonal form (og ofte ferdigbehandles i ru ER og Golgiapparatet) før proteinet virker?',
    options: [
      'Fordi det er den nøyaktige 3D-formen som gjør at proteinet passer til oppgaven sin (f.eks. det aktive setet i et enzym), og proteiner som skal ut av cellen må pakkes og adresseres i ru ER og Golgi',
      'Fordi bare helt rette, ufoldede aminosyrekjeder kan frakte oksygen i blodet',
      'Fordi folding endrer rekkefølgen på genene inne i cellekjernens DNA',
      'Fordi Golgiapparatet bytter ut alle aminosyrene med glukose og cellulose',
    ],
    correctIndex: 0,
    explanation:
      'I proteiner gir form funksjon! Tiltrekning og frastøting mellom de 20 ulike aminosyrene får kjeden til å brette seg i alfa-helikser og beta-flak til et presist 3D-verktøy (som ødelegges ved denaturering).',
  },
  {
    id: 'prot-mcq-10',
    number: 10,
    relatedStepIndex: 9,
    topicBadge: 'Steg 10 • Funksjon & mutasjoner',
    question:
      'Hvorfor gir sletting eller innsetting av én enkelt base tidlig i et gen som regel mye mer dramatiske følger for proteinet enn utbytting av én base?',
    options: [
      'Fordi sletting av én base stopper all produksjon av ATP i mitokondriene i hele kroppen',
      'Fordi sletting eller innsetting av én base forskyver hele leserammen («frameshift»), slik at absolutt alle trebokstavskodon etter mutasjonen endres',
      'Fordi utbytting av én base alltid sletter hele kromosomet inne i cellekjernen',
      'Fordi ribosomet bare klarer å lese gener med et partall antall baser',
    ],
    correctIndex: 1,
    explanation:
      'Ved substitusjon (utbytting av én base) endres høyst ett eneste kodon (og gir ofte samme aminosyre pga. redundant kode). Ved sletting/innsetting av én base forskyves trebokstavsgrupperingen for hele resten av genet!',
  },
];

// ============================================================================
// TEMA 6: DNA-STRUKTUR OG REPLIKASJON (10 FLERVALGSSPØRSMÅL)
// ============================================================================
export const DNA_MCQ_QUESTIONS: McqQuestionItem[] = [
  {
    id: 'dna-mcq-1',
    number: 1,
    relatedStepIndex: 0,
    topicBadge: 'Steg 1 • Cellekjernen & kromosomene',
    question:
      'Hvordan er arvestoffet organisert i en vanlig menneskelig kroppscelle, og hva menes med et gen?',
    options: [
      'Cellen har 23 enkeltstående kromosomer uten par, og hvert kromosom utgjør ett eneste stort gen',
      'Cellen har 46 kromosomer fordelt på 23 homologe par (ett sett fra mor og ett fra far), og et gen er et avgrenset avsnitt langs DNA-tråden med oppskrift på et protein eller funksjonelt RNA',
      'Bare hjerneceller og muskelceller har 46 kromosomer, mens hudceller kun beholder de genene de bruker til daglig',
      'Kromosomene ligger alltid pakket som tette X-figurer hele døgnet slik at genene er lette å lese',
    ],
    correctIndex: 1,
    explanation:
      'Alle vanlige kroppsceller inneholder de samme 46 kromosomene (23 par). Til vanlig ligger DNA-et løst utrullet som kromatin så genene kan leses, og kondenseres først til tette kromosomer rett før celledeling!',
  },
  {
    id: 'dna-mcq-2',
    number: 2,
    relatedStepIndex: 1,
    topicBadge: 'Steg 2 • Histoner & epigenetikk',
    question:
      'Hvilke to viktige oppgaver løser histon-proteinene når 2 meter DNA pakkes til nukleosomer og kromatin inne i cellekjernen?',
    options: [
      'Histonene klipper bort alle ubrukte gener og frakter dem ut gjennom kjerneporene til nedbrytning',
      'Histonene bytter ut tymin (T) med urasil (U) hver gang cellen trenger ekstra energi i form av ATP',
      'Histonene sveiser sammen de to DNA-trådene med kovalente bindinger slik at trådene aldri kan åpnes',
      'De positivt ladde histonene spoler opp det negativt ladde DNA-et uten floker, og styrer via stram eller åpen pakking hvilke gener cellen kan lese (epigenetikk)',
    ],
    correctIndex: 3,
    explanation:
      'Nukleosomer («perler på en snor» av DNA rundt histoner) gir enorm plassbesparelse og fungerer samtidig som epigenetiske av/på-brytere: åpent kromatin kan leses av RNA-polymerase, mens tettpakket kromatin skrur genene av!',
  },
  {
    id: 'dna-mcq-3',
    number: 3,
    relatedStepIndex: 2,
    topicBadge: 'Steg 3 • Nukleotidets tre deler',
    question:
      'Hvilke tre kjemiske deler er hvert enkelt nukleotid i DNA bygd opp av – og hvorfor heter sukkeret akkurat DEOKSY-ribose?',
    options: [
      'En fosfatgruppe, femkarbonsukkeret deoksyribose (som mangler ett oksygenatom sammenlignet med ribose i RNA, noe som gjør DNA mer stabilt) og én av nitrogenbasene A, T, C eller G',
      'En aminogruppe, en karboksylgruppe og en variabel sidekjede (R-gruppe) med svovelbindinger',
      'Tre fettsyrer, ett glyserolmolekyl og én av nitrogenbasene A, U, C eller G',
      'En glukosering, to peptidbindinger og et positivt ladd histon-protein i midten',
    ],
    correctIndex: 0,
    explanation:
      'Hvert DNA-nukleotid består av fosfat + deoksyribose + base (A, T, C eller G). Fraværet av ett oksygenatom på karbon 2\' i deoksyribose gjør DNA langt mer kjemisk stabilt enn RNA – perfekt som livslangt arkiv!',
  },
  {
    id: 'dna-mcq-4',
    number: 4,
    relatedStepIndex: 3,
    topicBadge: 'Steg 4 • Chargaffs regel & H-bindinger',
    question:
      'En prøve med dobbelttrådet DNA inneholder 18 % guanin (G). Hvor mange prosent adenin (A) inneholder prøven ifølge baseparingsregelen, og hvorfor?',
    options: [
      '18 % adenin, fordi alle de fire nitrogenbasene alltid forekommer i nøyaktig lik mengde i DNA',
      '64 % adenin, fordi G bare utgjør halvparten av pyrimidinene i dobbelheliksen',
      '32 % adenin, fordi G alltid parer med C (18 % G + 18 % C = 36 %), og de resterende 64 % fordeles likt mellom A (32 %) og T (32 %)',
      '41 % adenin, fordi C–G har tre hydrogenbindinger mens A–T bare har to',
    ],
    correctIndex: 2,
    explanation:
      'Etter Chargaffs regel parer alltid G med C (3 hydrogenbindinger) og A med T (2 hydrogenbindinger). 18 % G gir 18 % C = 36 % til sammen. Da gjenstår 100 % − 36 % = 64 %, som deles likt på A og T → 32 % adenin!',
  },
  {
    id: 'dna-mcq-5',
    number: 5,
    relatedStepIndex: 4,
    topicBadge: 'Steg 5 • Dobbelheliksen & antiparallelle tråder',
    question:
      'Hva menes med at de to trådene i DNA-dobbelheliksen er antiparallelle, og hvilke bindinger holder reisverket sammen sammenlignet med trinnene i midten?',
    options: [
      'Begge trådene går i retning 5\' → 3\' samme vei, med svake hydrogenbindinger ytterst i vangene og kovalente bindinger i midten',
      'Den ene tråden går i retning 5\' → 3\' mens den andre løper motsatt vei (3\' → 5\'), med sterke kovalente sukker-fosfat-bindinger ytterst og svake hydrogenbindinger mellom baseparene innerst',
      'Den ene tråden består bare av sukker og fosfat, mens den andre tråden bare består av sammenkjedede nitrogenbaser',
      'De to trådene snurrer i hver sin retning uten å røre hverandre før cellen skal dele seg i mitosen',
    ],
    correctIndex: 1,
    explanation:
      'De ytre vangene holdes sammen av sterke kovalente fosfodiesterbindinger så baserekkefølgen aldri ryker, mens trinnene i midten har hydrogenbindinger som kan åpnes som en glidelås. Trådene ligger opp-ned mot hverandre: 5\' → 3\' mot 3\' → 5\'!',
  },
  {
    id: 'dna-mcq-6',
    number: 6,
    relatedStepIndex: 5,
    topicBadge: 'Steg 6 • Semikonservativ replikasjon',
    question:
      'Hvorfor sier vi at DNA-replikasjonen i S-fasen før celledeling er semikonservativ («halvt bevarende»)?',
    options: [
      'Fordi begge de opprinnelige trådene fungerer som mal, slik at hvert av de to nye DNA-molekylene består av én gammel «foreldretråd» og én nylaget komplementær tråd',
      'Fordi bare halvparten av de 46 kromosomene kopieres før hver vanlig celledeling (mitose)',
      'Fordi det ene nye DNA-molekylet beholder begge de to gamle trådene, mens det andre består av to helt nylagede tråder',
      'Fordi annenhver nitrogenbase langs tråden byttes ut med urasil (U) under kopieringen',
    ],
    correctIndex: 0,
    explanation:
      'Som Meselson og Stahl beviste i 1958, skilles de to foreldretrådene ad og brukes som støpeform (mal) for hver sin nye tråd – dermed får begge dattermolekylene nøyaktig én gammel og én ny tråd!',
  },
  {
    id: 'dna-mcq-7',
    number: 7,
    relatedStepIndex: 6,
    topicBadge: 'Steg 7 • Replikasjonsgaffel & helikase',
    question:
      'Hvilken oppgave har enzymet helikase i replikasjonsgaffelen, og hvorfor starter DNA-kopieringen ved tusenvis av replikasjonsbobler samtidig hos mennesket?',
    options: [
      'Helikase limer sammen ferdige DNA-biter, og boblene oppstår kun når DNA skades av UV-stråling',
      'Helikase oversetter mRNA til aminosyrer, og boblene frakter proteiner ut gjennom kjernemembranen',
      'Helikase tvinner DNA strammere rundt histonene slik at celledelingen bruker minst mulig ATP',
      'Helikase åpner DNA-dobbelheliksen ved å bryte hydrogenbindingene mellom baseparene som en glidelås, og tusenvis av samtidige startbobler gjør at alle 6 milliarder basepar rekker å kopieres på få timer',
    ],
    correctIndex: 3,
    explanation:
      'Helikase kløyver hydrogenbindingene i Y-krysset (replikasjonsgaffelen), topoisomerase fjerner snurrespenning foran gaffelen, og primase legger en kort RNA-primer slik at kopieringen kommer raskt i gang over hele kromosomet samtidig!',
  },
  {
    id: 'dna-mcq-8',
    number: 8,
    relatedStepIndex: 7,
    topicBadge: 'Steg 8 • DNA-polymerase & Okazaki-fragmenter',
    question:
      'Hvorfor må den «forsinkede tråden» (lagging strand) bygges baklengs i små Okazaki-fragmenter som deretter sveises sammen av enzymet DNA-ligase?',
    options: [
      'Fordi den forsinkede tråden mangler fosfatgrupper og må låne sukker fra nabokromosomet',
      'Fordi helikase bare klarer å åpne én base i minuttet på den nederste av de to DNA-trådene',
      'Fordi DNA-polymerase KUN kan bygge ny tråd i retningen 5\' → 3\', og på den antiparallelle maltråden som peker motsatt vei av gaffelbevegelsen må den derfor sy stykkevis bakover ut fra gaffelen',
      'Fordi Okazaki-fragmentene skal klippes ut som introner før DNA sendes ut til ribosomene',
    ],
    correctIndex: 2,
    explanation:
      'Siden DNA-polymerase bare kan hekte nukleotider på 3\'-enden (bygger kun 5\' → 3\'), bygges den ledende tråden sammenhengende inn i gaffelen, mens den forsinkede tråden må sys i korte Okazaki-fragmenter før DNA-ligase limer skjøtene sammen!',
  },
  {
    id: 'dna-mcq-9',
    number: 9,
    relatedStepIndex: 8,
    topicBadge: 'Steg 9 • Korrekturlesing & mutasjoner',
    question:
      'Hva avgjør om en nyoppstått mutasjon i DNA kan gå i arv til neste generasjon barn?',
    options: [
      'Mutasjonen går kun i arv dersom den oppstår i kjønnsceller (egg- eller sædceller / deres forstadier); mutasjoner i vanlige kroppsceller som hud- eller lungeceller dør ut med individet',
      'Alle mutasjoner som skjer i hudceller pga. sollys (UV-stråling) går automatisk videre til barna',
      'Bare mutasjoner som skyldes kjemikalier går i arv, mens spontane kopieringsfeil aldri kan arves',
      'Mutasjoner kan bare arves dersom DNA-polymerase slutter helt å drive korrekturlesing i alle celler',
    ],
    correctIndex: 0,
    explanation:
      'DNA-polymerase og reparasjonsenzymer retter ~99,9 % av alle kopieringsfeil (~1 feil per milliard baser). Skjer en varig mutasjon i en kroppscelle, rammer den kun individet selv – kun mutasjoner i kjønnsceller føres videre til avkommet!',
  },
  {
    id: 'dna-mcq-10',
    number: 10,
    relatedStepIndex: 9,
    topicBadge: 'Steg 10 • Søsterkromatider & evolusjon',
    question:
      'Hva kalles de to identiske DNA-kopiene som henger sammen i sentromeren rett etter replikasjonen, og hvorfor er sjeldne mutasjoner i kjønnsceller avgjørende for «Livets Tre»?',
    options: [
      'De kalles antikodon, og mutasjoner hindrer at naturlig utvalg kan virke på en populasjon',
      'De kalles ribosomer, og mutasjoner gjør at alle individer i en art får 100 % likt arvestoff',
      'De kalles søsterkromatider (klare til å fordeles ved celledeling), og sjeldne arvelige mutasjoner skaper nye genvarianter (alleler) som utgjør selve råmaterialet for naturlig utvalg og evolusjon',
      'De kalles introner, og mutasjoner brukes kun til å reparere ødelagte mitokondrier etter celledeling',
    ],
    correctIndex: 2,
    explanation:
      'Etter S-fasen består hvert kromosom av to identiske søsterkromatider festet i sentromeren. Og mens presis kopiering bevarer artens oppskrifter, skaper sjeldne kjønnscellemutasjoner de nye allelene som driver evolusjonen videre!',
  },
];
