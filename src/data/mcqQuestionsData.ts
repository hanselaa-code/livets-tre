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
