import type { GlossaryEntry } from './glossaryTypes';

export const GLOSSARY_CELLS_AND_MOLECULAR: Record<string, GlossaryEntry> = {
  // ============================================================================
  // EUKARYOT DYRECELLE (og felles nøkler med plantecelle)
  // ============================================================================

  // cell_membrane
  'Fosfolipid-dobbeltlag': {
    category: 'Cellemembran & transport',
    definition:
      'Grunnstrukturen i alle cellemembraner, bygget opp av to lag med fettmolekyler der de vannelskende hodene vender ut mot vann og de vannavstøtende halene peker inn mot hverandre. Dette skaper en fleksibel og selektiv barriere rundt cellen.',
  },
  'Osmose og diffusjon': {
    category: 'Cellemembran & transport',
    definition:
      'Passiv transport som ikke krever celleenergi: diffusjon er nettobevegelse av stoffer fra høy til lav konsentrasjon, mens osmose er diffusjon av vannmolekyler (H₂O) gjennom en halvgjennomtrengelig membran.',
  },
  'Natrium-kalium-pumpa (ATP)': {
    category: 'Cellemembran & transport',
    definition:
      'Et livsviktig transportprotein i cellemembranen som bruker energi fra ATP til å pumpe tre natriumioner (Na⁺) ut av cellen og to kaliumioner (K⁺) inn. Dette opprettholder spenningsforskjellen som trengs for blant annet nerveimpulser.',
  },
  'Hormonreseptorer': {
    category: 'Cellemembran & signal',
    definition:
      'Spesialiserte mottakerproteiner på eller inne i cellen som binder bestemte hormoner etter nøkkel-i-lås-prinsippet. Når et hormon fester seg til reseptoren, utløses en målrettet kjemisk respons inne i cellen.',
  },

  // cell_cytoplasm
  'Cytosol (cellevæske)': {
    category: 'Cytoplasma & stoffskifte',
    definition:
      'Den geléaktige, vannrike væsken som fyller rommet mellom cellemembranen og organellene i både dyre- og planteceller. Her flyter ioner og næringsstoffer fritt slik at tusenvis av kjemiske reaksjoner kan skje raskt.',
  },
  'Glykolyse (nedbrytning av glukose)': {
    category: 'Cytoplasma & stoffskifte',
    definition:
      'Første trinn i celleåndingen, som foregår i cytosolen uten bruk av oksygen (O₂). Ett glukosemolekyl spaltes i to pyruvatmolekyler og gir cellen en rask, liten energigevinst på netto 2 ATP.',
  },
  'Oppløste enzymer og ioner': {
    category: 'Cytoplasma & stoffskifte',
    definition:
      'Katalytiske proteiner og ladde partikler som K⁺, Mg²⁺ og Cl⁻ som er løst i cellevæsken. De styrer pH-balansen, væsketrykket og hastigheten på de biokjemiske reaksjonene i cytoplasmaet.',
  },
  'Aminosyre- og ATP-lager': {
    category: 'Cytoplasma & stoffskifte',
    definition:
      'Cellens umiddelbare arbeidslager i cytosolen av frie aminosyrer til proteinbygging og energirike ATP-molekyler til krevende celleprosesser. Lageret fylles kontinuerlig på fra næringsopptak og celleånding.',
  },

  // cell_nucleus
  '46 kromosomer (DNA)': {
    category: 'Cellekjerne & arvestoff',
    definition:
      'Den komplette samlingen av arvestoff i kjernen til en vanlig menneskecelle, fordelt på 23 kromosompar fra mor og far. Hvert kromosom består av et langt DNA-molekyl med tusenvis av gener.',
  },
  'Dobbel kjernemembran & kjerneporer': {
    category: 'Cellekjerne & arvestoff',
    definition:
      'To beskyttende fosfolipidmembraner som skiller DNA-et i cellekjernen fra cytoplasmaet. Tusenvis av regulerte kjerneporer slipper arbeidskopier av mRNA og ribosomdeler ut, og nødvendige proteiner inn.',
  },
  'Nukleolus (kjernelegeme)': {
    category: 'Cellekjerne & arvestoff',
    definition:
      'Et tett og tydelig område inne i cellekjernen der ribosomalt RNA (rRNA) produseres og settes sammen med proteiner til uferdige ribosomdeler. Disse sendes deretter ut i cytoplasmaet for å lage proteiner.',
  },
  'mRNA (arbeidskopi av gen)': {
    category: 'RNA & genetisk kode',
    definition:
      'Budbringer-RNA som lages som en midlertidig kopi av ett bestemt gen inne i cellekjernen. Molekylet frakter oppskriften trygt ut til ribosomene uten at selve DNA-originalen må forlate kjernen.',
  },

  // cell_ribosomes
  'Translasjon (mRNA → aminosyrer)': {
    category: 'Proteinsyntese',
    definition:
      'Prosessen på ribosomet der basekoden i mRNA oversettes til en bestemt rekkefølge av aminosyrer. Slik bygges polypeptidkjeder nøyaktig etter oppskriften fra DNA-et.',
  },
  'tRNA og kodon-avlesning': {
    category: 'Proteinsyntese',
    definition:
      'Samspillet der transport-RNA (tRNA) leser av tre og tre baser (et kodon) på mRNA ved hjelp av sitt komplementære antikodon. Hvert tRNA leverer dermed nøyaktig riktig aminosyre til den voksende proteinkjeden.',
  },
  'Enzymer, antistoffer og insulin': {
    category: 'Proteinfunksjon',
    definition:
      'Viktige eksempler på livsnødvendige proteiner som bygges av cellens ribosomer: enzymer styrer kjemiske reaksjoner, antistoffer bekjemper smittestoffer, og hormonet insulin regulerer blodsukkeret.',
  },
  'Ingen omsluttende membran': {
    category: 'Organell',
    definition:
      'Et særtrekk ved ribosomer som skiller dem fra andre organeller som mitokondrier og ER: de består kun av rRNA og proteiner uten lipidmembran rundt seg, og finnes derfor både i prokaryote og eukaryote celler.',
  },

  // cell_er
  'Ru ER (med ribosomer – proteiner)': {
    category: 'Organell',
    definition:
      'Et nettverk av flate membransekker tett besatt med ribosomer på utsiden. Her bygges, foldes og bearbeides proteiner som skal bygges inn i membraner eller skilles ut av cellen.',
  },
  'Glatt ER (lipider & avgiftning)': {
    category: 'Organell',
    definition:
      'Rørformet endoplasmatisk retikulum uten ribosomer som produserer fosfolipider, fettsyrer og steroidhormoner. I tillegg bryter det ned medisiner, alkohol og andre skadelige stoffer.',
  },
  'Kalsiumlager i muskelceller': {
    category: 'Organell & fysiologi',
    definition:
      'En spesialisert utgave av glatt ER (sarkoplasmatisk retikulum) som lagrer store mengder kalsiumioner (Ca²⁺). Når en nerveimpuls treffer muskelcellen, slippes Ca²⁺ lynraskt ut og utløser muskelsammentrekning.',
  },
  'Lever- og kjertelceller': {
    category: 'Celletype & spesialisering',
    definition:
      'Celletyper med ekstra mye endoplasmatisk retikulum fordi de har spesielt høy produksjon: kjertelceller har rikelig ru ER for å skille ut hormoner og fordøyelsesenzymer, mens leverceller har mye glatt ER for avgiftning.',
  },

  // cell_golgi
  'Glykoproteiner («adresselapp»)': {
    category: 'Organell & transport',
    definition:
      'Proteiner som har fått påkoblet bestemte sukkerkjeder i ru ER og Golgiapparatet. Sukkermønsteret fungerer som en molekylær adresselapp som sikrer at proteinet sendes til riktig sted i eller utenfor cellen.',
  },
  'Sortering av hormoner og slim': {
    category: 'Organell & transport',
    definition:
      'Golgiapparatets pakke- og distribusjonsoppgave der ferdige sekretproteiner og slimstoffer sorteres og pakkes inn i små membranblærer (vesikler) klare for utskillelse fra cellen.',
  },
  'Dannelse av lysosomer': {
    category: 'Organell',
    definition:
      'Golgiapparatet pakker kraftige nedbrytningsenzymer inn i egne spesialiserte membranblærer som knopper av og blir til lysosomer – cellens lukkede gjenvinningsstasjoner.',
  },
  'Oppkalt etter Camillo Golgi (Nobelpris 1906)': {
    category: 'Biologihistorie',
    definition:
      'Golgiapparatet har navn etter den italienske legen Camillo Golgi, som oppdaget organellen i nerveceller i 1898 ved hjelp av en ny sølvfargingsteknikk og fikk Nobelprisen i medisin i 1906.',
  },

  // cell_vesicles
  'Eksocytose av hormoner og nevrotransmittere': {
    category: 'Cellemembran & transport',
    definition:
      'Aktiv utskillelse der transportvesikler smelter sammen med cellemembranen og tømmer signalstoffer som insulin eller nevrotransmittere ut av cellen i store mengder på en gang.',
  },
  'Endocytose av næringsstoffer': {
    category: 'Cellemembran & transport',
    definition:
      'Aktivt opptak der cellemembranen bukter seg innover, omslutter større molekyler eller væskedråper utenfra og snører seg av som en vesikkel på innsiden av cellen.',
  },
  'Fagocytose hos hvite blodceller': {
    category: 'Immunforsvar & transport',
    definition:
      'En form for endocytose («cellespising») der spesialiserte hvite blodceller som makrofager sluker hele bakterier, virusinfiserte celler eller cellerester og bryter dem ned i lysosomer.',
  },
  'Membransammensmelting': {
    category: 'Cellemembran & transport',
    definition:
      'Prosessen der fosfolipidlaget rundt en transportvesikkel glir sømløst sammen med en målmembran, slik at innholdet leveres på riktig side og membranmateriale fornyes.',
  },

  // cell_mitochondria
  'Aerob celleånding (ATP)': {
    category: 'Energiomsetning',
    definition:
      'Nedbrytning av næringsstoffer som glukose ved hjelp av oksygen (O₂) inne i mitokondriene. Prosessen gir CO₂ og H₂O som restprodukter og utvinner store mengder brukbar energi i form av ca. 30–32 ATP per glukosemolekyl.',
  },
  'Indre membranfolder (cristae)': {
    category: 'Organell',
    definition:
      'Dype innoverfoldinger i mitokondriets indre membran som gir en enorm overflate til enzymene i elektrontransportkjeden, slik at cellen kan produsere mest mulig ATP.',
  },
  'Eget ringformet mtDNA (morsarv)': {
    category: 'Arv & evolusjon',
    definition:
      'Mitokondriene har sitt eget lille, sirkulære DNA-molekyl og egne ribosomer, uavhengig av cellekjernen. Hos mennesker og de fleste dyr arves mitokondrie-DNA nesten utelukkende fra mor via eggcellen.',
  },
  'Endosymbioseteorien': {
    category: 'Evolusjon & cellebiologi',
    definition:
      'Den vitenskapelige forklaringen på at mitokondrier og kloroplaster opprinnelig var frittlevende bakterier som ble tatt opp av en tidlig urcelle og inngikk et varig samliv til gjensidig nytte.',
  },

  // cell_lysosomes
  'Autofagi (resirkulering av organeller)': {
    category: 'Organell & vedlikehold',
    definition:
      'Cellens indre storrengjøring («selvspising») der utslitte eller skadede organeller pakkes inn i en membran og brytes ned i lysosomer, slik at aminosyrer og andre byggesteiner kan gjenbrukes.',
  },
  'Surt miljø (pH ~4,8)': {
    category: 'Organell & kjemi',
    definition:
      'Innsiden av et lysosom holdes sur ved at protonpumper pumper H⁺-ioner inn. Fordøyelsesenzymene virker kun ved lav pH, noe som beskytter resten av cellen (pH ~7,2) dersom et lysosom skulle lekke.',
  },
  'Forsvar mot bakterier': {
    category: 'Immunforsvar & vedlikehold',
    definition:
      'Lysosomer kobler seg sammen med vesikler som inneholder inntrengende bakterier eller virus og tilfører kraftige enzymer som løser opp og uskadeliggjør smittestoffene.',
  },
  'Peroksisomer og katalase (H₂O₂ → H₂O + O₂)': {
    category: 'Organell & avgiftning',
    definition:
      'Små membranorganeller som bryter ned fettsyrer og giftstoffer, noe som danner etsende hydrogenperoksid (H₂O₂). Enzymet katalase ufarliggjør straks H₂O₂ ved å spalte det til vann (H₂O) og oksygen (O₂).',
  },

  // cell_cytoskeleton
  'Mikrotubuli og aktinfilamenter': {
    category: 'Cytoskjelett & celledeling',
    definition:
      'Dynamiske proteintråder som utgjør cellens indre reisverk: hule rør av mikrotubuli fungerer som støttestag og transportskinner, mens tynne aktinfilamenter gir cellen form og evne til bevegelse.',
  },
  'Motorproteinet kinesin': {
    category: 'Cytoskjelett & transport',
    definition:
      'Et «gående» transportprotein som bruker energi fra ATP til å frakte vesikler og organeller skritt for skritt langs mikrotubuli-motorveiene inne i cellen.',
  },
  'Centrosom med to centrioler': {
    category: 'Cytoskjelett & celledeling',
    definition:
      'Organiseringssenteret for mikrotubuli i dyreceller, bygget opp rundt to sylinderformede centrioler som står vinkelrett på hverandre og styrer oppbyggingen av spindelapparatet før celledeling.',
  },
  'Spindeltråder under mitose/meiose': {
    category: 'Cytoskjelett & celledeling',
    definition:
      'Mikrotubulitråder som fester seg til kromosomene under celledeling og trekker dem presist fra hverandre, slik at dattercellene får riktig antall kromosomer.',
  },

  // ============================================================================
  // EUKARYOT PLANTECELLE
  // ============================================================================

  // plant_cell_wall
  'Cellulosemikrofibriller': {
    category: 'Plantecelle-struktur',
    definition:
      'Lange, sterke bunter av polysakkaridet cellulose som ligger på kryss og tvers i plantens cellevegg. De gir plantecellen enorm strekkstyrke og hindrer at den sprekker av vanntrykk.',
  },
  'Pektin og midtlamell': {
    category: 'Plantecelle-struktur',
    definition:
      'Midtlamellen er det tynne, geleaktige sjiktet mellom naboceller i planter, rikt på karbohydratet pektin som fungerer som et biologisk lim og holder plantevevet samlet.',
  },
  'Plasmodesmata (cellebroer)': {
    category: 'Plantecelle-struktur',
    definition:
      'Mikroskopiske kanaler foret med cellemembran som går tvers gjennom celleveggen mellom naboplanteceller, slik at vann, sukker og signalmolekyler kan strømme direkte fra celle til celle.',
  },
  'Lignin i vedvev': {
    category: 'Plantecelle-struktur',
    definition:
      'Et hardt og vannavstøtende polymerstoff (vedstoff) som avleires i celleveggene til vedrør og støttevev, og som gjør trær og stengler stive nok til å vokse høyt mot lyset.',
  },

  // plant_membrane
  'Akvaporiner (osmose)': {
    category: 'Cellemembran & transport',
    definition:
      'Spesialiserte kanalproteiner i celle- og vakuolemembranen som slipper vannmolekyler (H₂O) lynraskt ut og inn ved osmose, mens ioner og andre løste stoffer holdes tilbake.',
  },
  'Protonpumper (H⁺-ATPase)': {
    category: 'Cellemembran & transport',
    definition:
      'Transportproteiner i plantecellens membraner som bruker ATP til å pumpe hydrogenioner (H⁺) ut av cytosolen. Dette skaper en elektrokjemisk drivkraft som planten bruker til å ta opp mineraler og sukker.',
  },
  'Plasmolyse i saltvann': {
    category: 'Cellemembran & transport',
    definition:
      'Tilstanden som oppstår når en plantecelle mister vann ved osmose i et salt eller konsentrert miljø: vakuolen krymper og cellemembranen løsner fra den stive celleveggen, slik at planten visner.',
  },

  // plant_chloroplasts
  'Klorofyll i tylakoidmembraner': {
    category: 'Kloroplast & fotosyntese',
    definition:
      'De grønne fargepigmentene som sitter innebygd i kloroplastens indre tylakoidmembraner, der de fanger opp energi fra blått og rødt sollys og starter fotosyntesen.',
  },
  'Grana (myntstabler) & stroma': {
    category: 'Kloroplast & fotosyntese',
    definition:
      'Indre hoveddeler i kloroplasten: grana er tette stabler av flate tylakoidsekker som fanger sollys, mens stroma er den enzymrike væsken rundt der CO₂ bygges om til glukose.',
  },
  'Lysreaksjoner + Calvinsyklus': {
    category: 'Kloroplast & fotosyntese',
    definition:
      'De to samarbeidende fasene i fotosyntesen: lysreaksjonene spalter H₂O til O₂ og lagrer solenergi i ATP og NADPH, som Calvinsyklusen i stroma deretter bruker til å binde CO₂ til glukose.',
  },
  'Endosymbiose fra cyanobakterier': {
    category: 'Evolusjon & fotosyntese',
    definition:
      'Kloroplastenes evolusjonære opphav: for over en milliard år siden tok en eukaryot celle opp en fotosyntetiserende cyanobakterie (blågrønnalge), som utviklet seg til dagens kloroplaster med eget DNA.',
  },

  // plant_vacuole
  'Turgortrykk (saftspenning)': {
    category: 'Plantecelle-struktur',
    definition:
      'Det innvendige væsketrykket som oppstår når sentralvakuolen tar opp vann ved osmose og presser cytoplasmaet ut mot den faste celleveggen. Saftspenningen holder urteaktige planter og blader oppreiste og spenstige.',
  },
  'Tonoplast (vakuolemembran)': {
    category: 'Plantecelle-struktur',
    definition:
      'Den selektive enkeltmembranen rundt sentralvakuolen i planteceller, utstyrt med egne transportpumper og vannkanaler som nøye regulerer vanntrykk, pH og lagring av ioner.',
  },
  'Antocyaniner (fargestoffer)': {
    category: 'Plantecelle & økologi',
    definition:
      'Vannløselige røde, lilla og blå fargepigmenter lagret i sentralvakuolen som tiltrekker pollinerende insekter og frøspredere til blomster og bær, og beskytter blader mot sterkt UV-lys.',
  },
  'Nedbrytning av avfall': {
    category: 'Plantecelle & vedlikehold',
    definition:
      'Sentralvakuolen overtar lysosomenes rolle i planteceller ved å lagre og bryte ned avfallsstoffer og utslitte celledeler med sure enzymer, samt lagre bitre giftstoffer som forsvar mot planteetere.',
  },

  // plant_nucleus
  'Dobbel kjernemembran & porer': {
    category: 'Cellekjerne & arvestoff',
    definition:
      'Det doble membranhylsteret rundt plantecellens kjerne som beskytter kromosomene og bruker regulerte kjerneporer til å styre utvekslingen av mRNA og proteiner med cytoplasmaet.',
  },
  'Transkripsjon (DNA → mRNA)': {
    category: 'Genregulering & RNA',
    definition:
      'Første hovedtrinn i proteinsyntesen inne i cellekjernen, der enzymet RNA-polymerase leser av et gen i DNA og bygger en komplementær arbeidskopi av budbringer-RNA (mRNA).',
  },
  'Totipotens (stiklinger)': {
    category: 'Plantecelle & genetikk',
    definition:
      'Mange modne plantecellers unike evne til å nullstille seg og dele seg til alle celletyper i en hel, ny plante fordi de fortsatt har hele DNA-oppskriften intakt – grunnlaget for formering med stiklinger.',
  },

  // plant_cytoplasm
  'Cytoplasmastrømning (cyklose)': {
    category: 'Cytoplasma & transport',
    definition:
      'En aktiv, sirkulerende strøm av cytosol og organeller rundt den store sentralvakuolen drevet av aktin- og myosinproteiner, som fordeler næringsstoffer, O₂ og varme raskt i store planteceller.',
  },
  'Glykolyse uten oksygen': {
    category: 'Energiomsetning',
    definition:
      'Spaltingen av glukose til pyruvat i plantecellens cytosol, som gir litt rask ATP helt uten oksygen (O₂) – ekstra viktig for planterøtter i vannmettet, oksygenfattig jord.',
  },
  'Lysstyrt kloroplastbevegelse': {
    category: 'Kloroplast & tilpasning',
    definition:
      'Cytoskjelettet og cytoplasmastrømningen flytter kloroplastene etter lysforholdene: i svakt lys legger de seg flatt for å fange mest mulig sol, mens de i brennende sol søker ly langs sideveggene.',
  },

  // plant_er_ribosomes
  'Translasjon (mRNA → protein)': {
    category: 'Proteinsyntese',
    definition:
      'Prosessen der plantecellens ribosomer leser av kodonene på mRNA og kobler sammen aminosyrer til funksjonelle proteiner, som for eksempel fotosynteseenzymet RuBisCO.',
  },
  'Ru ER (proteinfolding)': {
    category: 'Organell',
    definition:
      'Endoplasmatisk retikulum med ribosomer på overflaten der nydannede planteproteiner brettes i riktig 3D-form og klargjøres for transport til vakuolen, cellemembranen eller celleveggen.',
  },
  'Glatt ER (planteoljer & voks)': {
    category: 'Organell',
    definition:
      'Membranrør uten ribosomer som produserer energirike planteoljer til frø samt fettstoffene til det vanntette vokslaget (kutikula) som hindrer at blader tørker ut.',
  },
  'Desmotubuli i plasmodesmata': {
    category: 'Plantecelle-struktur',
    definition:
      'Smale rør av endoplasmatisk retikulum som strekker seg direkte fra én plantecelle til nabocellen gjennom plasmodesmata-kanalene og knytter cellenes indre rørnettverk sammen.',
  },

  // plant_golgi
  'Diktyosomer (Golgistabler)': {
    category: 'Organell',
    definition:
      'Navnet på de mange frittstående stablene av flate Golgisekker som er spredt rundt i plantecellens cytoplasma for å ta imot, bearbeide og sende videre proteiner og karbohydrater.',
  },
  'Pektin- og hemicellulose-syntese': {
    category: 'Plantecelle-struktur',
    definition:
      'En sentral oppgave for Golgiapparatet i planter: det bygger komplekse veggkarbohydrater som pektin og hemicellulose og sender dem i vesikler ut til den voksende celleveggen.',
  },
  'Celleplaten under mitose': {
    category: 'Celledeling i planter',
    definition:
      'En skillevegg som bygges midt i en plantecelle mot slutten av celledelingen ved at Golgivesikler fulle av veggmateriale smelter sammen innenfra og ut til en ny cellevegg.',
  },
  'Eksocytose via vesikler': {
    category: 'Cellemembran & transport',
    definition:
      'Utskillelsesprosessen der membranblærer fra Golgiapparatet smelter sammen med plantens cellemembran for å levere nye veggbyggesteiner, enzymer og beskyttende voks til utsiden.',
  },

  // plant_mitochondria
  'Cristae (foldet innermembran)': {
    category: 'Organell',
    definition:
      'De tette foldene i mitokondriets indre membran som gir stor plass til enzymene som produserer ATP under aerob celleånding i både plante- og dyreceller.',
  },
  'Samarbeid med kloroplaster': {
    category: 'Energiomsetning',
    definition:
      'Det tette stoffkretsløpet inne i plantecellen: kloroplastene bruker sollys til å lage glukose og O₂, som mitokondriene deretter forbrenner til brukbar ATP-energi mens CO₂ og H₂O leveres tilbake.',
  },
  'Energi i røtter og i mørke': {
    category: 'Energiomsetning',
    definition:
      'Forklaringen på hvorfor planter er helt avhengige av mitokondrier: om natten og i underjordiske røtter uten kloroplaster kan det ikke skje fotosyntese, så alt ATP må lages ved celleånding.',
  },

  // plant_cytoskeleton
  'Mikrotubuli styrer cellulosevekst': {
    category: 'Plantecelle-struktur',
    definition:
      'Mikrotubulirør rett på innsiden av cellemembranen fungerer som ledeskinner for enzymene som spinner cellulosefibre på utsiden, og styrer dermed hvilken retning plantecellen strekker seg i.',
  },
  'Spindeltråder uten centrioler': {
    category: 'Celledeling i planter',
    definition:
      'Høyere planter mangler centrioler, men organiserer likevel presise spindeltråder av mikrotubuli direkte fra områder ved kjernemembranen når kromosomene skal fordeles under celledeling.',
  },
  'Peroksisomer & glyoksysomer': {
    category: 'Organell & stoffskifte',
    definition:
      'Spesialiserte mikrolegemer i planter: peroksisomer i bladene gjenvinner biprodukter under fotorespirasjon og spalter H₂O₂, mens glyoksysomer i spirende frø omdanner lagret fett til sukker før spiren når sollyset.',
  },
  'Plantecelle vs. dyrecelle': {
    category: 'Cellebiologi',
    definition:
      'Begge er eukaryote med kjerne og mitokondrier, men plantecellen har i tillegg stiv cellevegg av cellulose, kloroplaster for fotosyntese og stor sentralvakuole, mens dyrecellen har centrioler og fleksibel form.',
  },

  // ============================================================================
  // DNA-STRUKTUR OG REPLIKASJON
  // ============================================================================

  // dna_chromosomes
  '46 kromosomer (23 par)': {
    category: 'DNA-organisering & arv',
    definition:
      'Kromosomtallet i menneskets kroppsceller (diploide celler), der vi har arvet 23 kromosomer fra mor via eggcellen og 23 tilsvarende fra far via sædcellen.',
  },
  'Homologe kromosomer': {
    category: 'DNA-organisering & arv',
    definition:
      'Et kromosompar med samme størrelse og form – ett fra mor og ett fra far – som inneholder gener for nøyaktig de samme egenskapene på samme plass, men gjerne i ulike varianter (alleler).',
  },
  'Gen (avgrenset DNA-avsnitt)': {
    category: 'DNA-oppbygning',
    definition:
      'Et bestemt avsnitt langs et DNA-molekyl som inneholder den kjemiske oppskriften (baserekkefølgen) for å bygge ett spesifikt protein eller et funksjonelt RNA-molekyl.',
  },
  'Kromatin vs. kondenserte kromosomer': {
    category: 'DNA-organisering',
    definition:
      'Mellom celledelinger ligger DNA-trådene løst utpakket som kromatin slik at gener kan leses av, mens de rett før celledeling kveiles stramt opp til kompakte, X-formede kromosomer som tåler å flyttes.',
  },
  'Kjønnskromosomer (XX / XY)': {
    category: 'DNA-organisering & arv',
    definition:
      'Det 23. kromosomparet som avgjør biologisk kjønn hos pattedyr ved siden av de 22 parene med autosomer: genetiske kvinner har to X-kromosomer (XX), mens genetiske menn har ett X- og ett Y-kromosom (XY).',
  },

  // dna_histones
  'Histoner (spoleproteiner)': {
    category: 'DNA-pakking & epigenetikk',
    definition:
      'Positivt ladde proteiner i cellekjernen som tiltrekker seg den negativt ladde DNA-tråden og fungerer som mikroskopiske sneller, slik at to meter DNA får plass i én cellekjerne.',
  },
  'Nukleosom («perler på en snor»)': {
    category: 'DNA-pakking & epigenetikk',
    definition:
      'Grunnenheten i DNA-pakkingen, der DNA-tråden er viklet knapt to ganger rundt en kjerne av åtte histonproteiner – i elektronmikroskop ser dette ut som perler på en snor.',
  },
  'Kromatinfiber': {
    category: 'DNA-pakking & epigenetikk',
    definition:
      'Den kveilede tråden av DNA og histonproteiner som oppstår når rekken av nukleosomer pakkes videre sammen til en kompakt fiber inne i cellekjernen.',
  },
  'Åpen vs. stram pakking': {
    category: 'DNA-pakking & epigenetikk',
    definition:
      'Cellens måte å styre tilgangen til genene på: åpent kromatin (eukromatin) lar RNA-polymerase lese av aktive gener, mens stramt pakket kromatin (heterokromatin) holder ubrukte gener avskrudd.',
  },
  'Epigenetikk (av/på-merkelapper)': {
    category: 'DNA-pakking & epigenetikk',
    definition:
      'Kjemiske merkelapper (som metylgrupper på DNA eller endringer på histonene) som skrur gener av eller på uten å endre selve baserekkefølgen – derfor kan en hudcelle og en nervecelle oppføre seg ulikt med likt DNA.',
  },

  // dna_nucleotide
  'Nukleotid (byggestein)': {
    category: 'DNA-oppbygning',
    definition:
      'Den repeterende monomeren som bygger opp DNA og RNA. Hvert nukleotid består av tre deler: et femkarbonsukker, en fosfatgruppe og én nitrogenholdig base.',
  },
  'Deoksyribose (mangler ett O-atom)': {
    category: 'DNA-oppbygning',
    definition:
      'Femkarbonsukkeret i DNA, som mangler ett oksygenatom på karbon nummer 2 sammenlignet med ribose i RNA. Denne lille forskjellen gjør DNA kjemisk svært stabilt som livslangt arkiv.',
  },
  'Fosfatgruppe': {
    category: 'DNA-oppbygning',
    definition:
      'En negativt ladd gruppe av fosfor og oksygen som binder sukkermolekylene sammen langs DNA-tråden og gir hele DNA-molekylet en negativ ladning og en tydelig 5\'-ende.',
  },
  'Puriner: Adenin (A) & Guanin (G)': {
    category: 'DNA-oppbygning',
    definition:
      'De to store nitrogenbasene i DNA som er bygget opp av en dobbel karbon-nitrogenring, og som alltid danner basepar med en mindre enkeltring-base (pyrimidin) på motsatt tråd.',
  },
  'Pyrimidiner: Tymin (T) & Cytosin (C)': {
    category: 'DNA-oppbygning',
    definition:
      'De to mindre nitrogenbasene i DNA med én enkel karbon-nitrogenring. I RNA er tymin (T) byttet ut med den nært beslektede pyrimidinbasen urasil (U).',
  },

  // dna_basepairing
  'Komplementær baseparing': {
    category: 'DNA-oppbygning',
    definition:
      'Det ufravikelige prinsippet om at basene i DNA kun passer parvis sammen – A mot T og C mot G – slik at rekkefølgen på én tråd automatisk bestemmer rekkefølgen på mottråden.',
  },
  'Chargaffs regel (A = T, C = G)': {
    category: 'DNA-oppbygning',
    definition:
      'Erwin Chargaffs oppdagelse av at ethvert dobbelttrådet DNA-molekyl alltid har nøyaktig like mye adenin som tymin (A = T) og like mye cytosin som guanin (C = G) – et nøkkelspor til dobbelheliksen.',
  },
  'A = T (2 hydrogenbindinger)': {
    category: 'DNA-oppbygning',
    definition:
      'Baseparet mellom adenin og tymin holdes sammen av to svake hydrogenbindinger. A–T-rike områder i DNA krever derfor litt mindre energi å åpne når et gen eller kromosom skal leses av.',
  },
  'C ≡ G (3 hydrogenbindinger)': {
    category: 'DNA-oppbygning',
    definition:
      'Baseparet mellom cytosin og guanin bindes sammen av tre hydrogenbindinger, noe som gir ekstra termisk og kjemisk stabilitet til DNA-dobbelheliksen.',
  },
  'Purin + pyrimidin gir fast bredde': {
    category: 'DNA-oppbygning',
    definition:
      'Fordi en stor dobbelring-base (purin) alltid parer seg med en liten enkeltring-base (pyrimidin), holder DNA-stigen en helt jevn diameter på ca. 2 nanometer langs hele molekylet.',
  },

  // dna_double_helix
  'Dobbelheliks (vindeltrapp)': {
    category: 'DNA-oppbygning',
    definition:
      'DNA-molekylets tredimensjonale form der to nukleotidtråder tvinner seg rundt hverandre som en høyredreid vindeltrapp, med sukker-fosfat som gelender og nitrogenbasene som trappetrinnet i midten.',
  },
  'Sukker-fosfat-reisverk (kovalent)': {
    category: 'DNA-oppbygning',
    definition:
      'De ytre sidestolpene i DNA-stigen, der deoksyribose og fosfatgrupper holdes sammen av sterke kovalente bindinger (fosfodiesterbindinger) slik at baserekkefølgen ikke brytes i stykker.',
  },
  'Antiparallelle tråder (5\' → 3\' / 3\' → 5\')': {
    category: 'DNA-oppbygning',
    definition:
      'De to trådene i DNA-dobbelheliksen løper i motsatt kjemisk retning av hverandre – akkurat som en tofeltsvei – der den ene peker fra 5\' mot 3\' og mottråden peker fra 3\' mot 5\'.',
  },
  '5\'-fosfatende og 3\'-OH-ende': {
    category: 'DNA-oppbygning',
    definition:
      'De to ulike endene på en DNA- eller RNA-tråd, oppkalt etter karbonatomene i sukkeret: 5\'-enden bærer en fri fosfatgruppe, mens 3\'-enden har en fri hydroksylgruppe (-OH) der nye nukleotider kan kobles på.',
  },
  'Rosalind Franklin (Foto 51), Watson & Crick': {
    category: 'Biologihistorie',
    definition:
      'I 1952 tok kjemikeren Rosalind Franklin røntgenbildet «Foto 51» som avslørte DNA-ets spiralform, og i 1953 brukte James Watson og Francis Crick dette sammen med Chargaffs tall til å utlede dobbelheliksmodellen.',
  },

  // dna_semiconservative
  'DNA-replikasjon': {
    category: 'DNA-replikasjon',
    definition:
      'Den nøyaktige kopieringen av hele cellens DNA før en celledeling, slik at begge de nye dattercellene arver et komplett og identisk sett med genetisk informasjon.',
  },
  'S-fasen i cellesyklus': {
    category: 'DNA-replikasjon & cellesyklus',
    definition:
      'Syntesefasen midt i interfasen mellom to celledelinger, der cellen bruker flere timer på å kopiere alt DNA-et i alle kromosomene sine før mitose eller meiose starter.',
  },
  'Semikonservativ («halvt bevart»)': {
    category: 'DNA-replikasjon',
    definition:
      'Prinsippet for DNA-kopiering der hvert av de to nye DNA-molekylene består av én gammel originaltråd fra morcellen og én helt nybygget komplementær tråd.',
  },
  'Foreldretråd (mal) + dattertråd': {
    category: 'DNA-replikasjon',
    definition:
      'Når DNA-glidelåsen åpnes under replikasjonen, fungerer hver av de opprinnelige foreldretrådene som en presis mal (støpeform) for oppbyggingen av en ny komplementær dattertråd.',
  },
  'Meselson og Stahls eksperiment': {
    category: 'Biologihistorie & replikasjon',
    definition:
      'Det berømte forsøket fra 1958 der Matthew Meselson og Franklin Stahl merket bakterie-DNA med tungt og lett nitrogen (¹⁵N og ¹⁴N) og beviste at DNA kopieres semikonservativt.',
  },

  // dna_helicase_fork
  'Replikasjonsboble (tusenvis av startpunkter)': {
    category: 'DNA-replikasjon',
    definition:
      'Et åpent parti på et kromosom der DNA-trådene er skilt fra hverandre og kopieres i begge retninger samtidig; eukaryote kromosomer åpner tusenvis av slike bobler for å rekke å kopiere alt DNA raskt.',
  },
  'Replikasjonsgaffel (Y-krysset)': {
    category: 'DNA-replikasjon',
    definition:
      'Det Y-formede overgangspunktet i hver ende av en replikasjonsboble der den dobbelttrådede DNA-spiralen fortløpende åpnes til to enkelttråder og kopieres av replikasjonsenzymene.',
  },
  'Helikase (bryter H-bindinger)': {
    category: 'Enzym i replikasjon',
    definition:
      'Enzymet som fungerer som selve «glidelåsåpneren» i replikasjonsgaffelen ved å bryte hydrogenbindingene mellom baseparene slik at de to DNA-trådene skilles fra hverandre.',
  },
  'Topoisomerase (fjerner tvinnespenning)': {
    category: 'Enzym i replikasjon',
    definition:
      'Et hjelpeenzym som jobber rett foran replikasjonsgaffelen, der det klipper, snurrer ut og limer sammen DNA-tråden slik at molekylet ikke krøller seg i overtvinnet spenning når helikase åpner spiralen.',
  },
  'Primase & RNA-primer (startblokk)': {
    category: 'Enzym i replikasjon',
    definition:
      'Fordi DNA-polymerase ikke kan starte en ny tråd helt fra bunnen av, legger enzymet primase først ut en kort startblokk av RNA (en primer) med en fri 3\'-OH-ende som DNA-polymerasen kan bygge videre på.',
  },

  // dna_polymerase_strands
  'DNA-polymerase (bygger kun 5\' → 3\')': {
    category: 'Enzym i replikasjon',
    definition:
      'Hovedenzymet i DNA-kopieringen som leser av maltråden og kobler på nye komplementære DNA-nukleotider, men kun på den frie 3\'-OH-enden slik at den nye tråden alltid vokser i 5\' → 3\'-retning.',
  },
  'Ledende tråd (kontinuerlig)': {
    category: 'DNA-replikasjon',
    definition:
      'Den nye DNA-tråden som vokser i 5\' → 3\'-retning rett inn mot replikasjonsgaffelen etter hvert som helikase åpner DNA-et, og som derfor kan bygges i ett sammenhengende stykke.',
  },
  'Forsinket tråd (stykkevis)': {
    category: 'DNA-replikasjon',
    definition:
      'Den motsatte dattertråden som må bygges i 5\' → 3\'-retning bort fra replikasjonsgaffelen, og som derfor lages baklengs i mange korte biter etter hvert som mer av maltråden åpnes.',
  },
  'Okazaki-fragmenter': {
    category: 'DNA-replikasjon',
    definition:
      'De korte DNA-bitene (ca. 100–200 baser hos eukaryoter) som bygges stykkevis langs den forsinkede tråden, hver startet med sin egen lille RNA-primer som senere byttes ut med DNA.',
  },
  'DNA-ligase («limer» ryggraden)': {
    category: 'Enzym i replikasjon',
    definition:
      'Enzymet som fungerer som molekylært lim ved å danne den siste kovalente bindingen i sukker-fosfat-ryggraden mellom Okazaki-fragmentene, slik at den forsinkede tråden blir helt sammenhengende.',
  },

  // dna_proofreading_mutation
  'Korrekturlesing (proofreading)': {
    category: 'Mutasjon & DNA-reparasjon',
    definition:
      'DNA-polymerasens innebygde «slettetast»: enzymet sjekker hvert eneste nukleotid det nettopp satte inn, og hvis basen er feilparet, rygger det tilbake, klipper den bort og setter inn riktig base.',
  },
  'DNA-reparasjonsenzymer': {
    category: 'Mutasjon & DNA-reparasjon',
    definition:
      'Spesialiserte vaktmesterenzymer som patruljerer DNA-et døgnet rundt, oppdager skader eller feilparinger som slapp unna korrekturlesingen, klipper ut feilen og fyller inn riktige nukleotider.',
  },
  'Mutasjon (~1 per milliard baser)': {
    category: 'Mutasjon & arv',
    definition:
      'En varig endring i baserekkefølgen i DNA. Takket være korrekturlesing og reparasjonsenzymer slipper bare rundt én feil igjennom per milliard kopierte basepar.',
  },
  'Mutagener (UV, stråling, kjemikalier)': {
    category: 'Mutasjon & arv',
    definition:
      'Ytre fysiske eller kjemiske påvirkninger – som UV-stråler fra sola, radioaktiv stråling og stoffer i tobakksrøyk – som skader DNA-molekylet og øker mutasjonsraten kraftig.',
  },
  'Kroppscellemutasjon vs. kjønnscellemutasjon': {
    category: 'Mutasjon & arv',
    definition:
      'En mutasjon i en kroppscelle (f.eks. en hudcelle) rammer kun individet selv og kan i verste fall gi kreft, mens en mutasjon i kjønnsceller (egg eller sæd) kan arves videre til barna og skape evolusjon.',
  },

  // dna_division_evolution
  'Søsterkromatider (identiske kopier)': {
    category: 'Celledeling & arv',
    definition:
      'De to helt identiske DNA-trådene som utgjør et kopiert, X-formet kromosom etter S-fasen, og som holdes sammen helt til de trekkes til hver sin dattercelle under celledelingen.',
  },
  'Sentromer (festepunkt i X-formen)': {
    category: 'Celledeling & arv',
    definition:
      'Det innsnevrede midtpartiet på et kopiert kromosom der de to søsterkromatidene henger fast i hverandre, og der spindeltrådene fester seg for å trekke dem fra hverandre.',
  },
  'Mitose (vekst) & meiose (kjønnsceller)': {
    category: 'Celledeling & arv',
    definition:
      'De to formene for celledeling: mitose gir to genetisk identiske kroppsceller for vekst og sårheling, mens meiose halverer kromosomtallet og skaper genetisk unike egg- og sædceller.',
  },
  'Nye alleler (genvarianter)': {
    category: 'Mutasjon & arv',
    definition:
      'Ulike utgaver av ett og samme gen (f.eks. for brun eller blå øyenfarge) som opprinnelig har oppstått gjennom mutasjoner i DNA-sekvensen.',
  },
  'Råmaterialet for evolusjon på Livets Tre': {
    category: 'Evolusjon & genetikk',
    definition:
      'Arvelige mutasjoner er selve kilden til all ny genetisk variasjon i naturen; uten sjeldne kopieringsfeil i DNA ville naturlig utvalg ikke hatt nye egenskaper å virke på, og alt liv ville vært uendret.',
  },

  // ============================================================================
  // PROTEINSYNTESEN
  // ============================================================================

  // prot_dna_gene
  'DNA-dobbelheliks': {
    category: 'DNA-oppbygning',
    definition:
      'Den tvinnede dobbelttrådede DNA-strukturen i cellekjernen som lagrer alle genoppskriftene trygt, og som åpnes lokalt i et lite avsnitt hver gang et bestemt gen skal skrives av til mRNA.',
  },
  'Gen': {
    category: 'DNA-oppbygning & arv',
    definition:
      'En avgrenset oppskrift i DNA med en bestemt baserekkefølge som koder for hvordan cellen skal sette sammen aminosyrer til ett bestemt protein (eller lage et funksjonelt RNA-molekyl).',
  },
  'Promotor (startområde)': {
    category: 'Genregulering & RNA',
    definition:
      'En bestemt DNA-sekvens rett foran starten på et gen som fungerer som landingsplass og startskilt for enzymet RNA-polymerase, og som styrer når og hvor ofte genet skal leses av.',
  },
  'Baseparingsregelen (A–T, C–G)': {
    category: 'DNA & RNA',
    definition:
      'Grunnregelen for hvordan nukleotider kjenner hverandre igjen i DNA og under avlesning: adenin parer med tymin (eller med urasil i RNA), mens cytosin alltid parer med guanin.',
  },
  'Maltråd': {
    category: 'Genregulering & RNA',
    definition:
      'Den ene av de to DNA-trådene i et gen som RNA-polymerase faktisk leser av i 3\' → 5\'-retning for å bygge en komplementær mRNA-tråd i 5\' → 3\'-retning.',
  },

  // prot_transcription
  'Transkripsjon': {
    category: 'RNA & transkripsjon',
    definition:
      'Avskrivningsfasen inne i cellekjernen der basekoden i ett gen i DNA kopieres over til et enkelttrådet RNA-molekyl ved hjelp av enzymet RNA-polymerase.',
  },
  'RNA-polymerase': {
    category: 'RNA & transkripsjon',
    definition:
      'Hovedenzymet i transkripsjonen som binder seg til promotoren, åpner DNA-dobbelheliksen lokalt og setter sammen frie RNA-nukleotider til en pre-mRNA-tråd langs maltråden.',
  },
  'Urasil (U)': {
    category: 'RNA & genetisk kode',
    definition:
      'Nitrogenbasen som erstatter tymin (T) i alle typer RNA. Under transkripsjon og translasjon danner urasil komplementære basepar med adenin (A).',
  },
  'Ribose vs. deoksyribose': {
    category: 'RNA & DNA-kjemi',
    definition:
      'Forskjellen på sukkermolekylet i RNA og DNA: ribose i RNA har en ekstra -OH-gruppe som gjør mRNA mer fleksibelt og kortlivet som arbeidskopi, mens deoksyribose gjør DNA stabilt som permanent arkiv.',
  },
  'Pre-mRNA': {
    category: 'RNA & modning',
    definition:
      'Den umodne råkopien av RNA som lages direkte under transkripsjonen i eukaryote celler, og som fortsatt inneholder både kodende eksoner og ikke-kodende introner før spleising.',
  },

  // prot_splicing
  'Introner (klippes bort)': {
    category: 'RNA & modning',
    definition:
      'Ikke-kodende mellomavsnitt i et eukaryot gen som blir med over i pre-mRNA, men som klippes ut i cellekjernen før det ferdige mRNA-molekylet sendes til ribosomene.',
  },
  'Eksoner (skjøtes sammen)': {
    category: 'RNA & modning',
    definition:
      'De kodende delene av genet i pre-mRNA som faktisk inneholder oppskriften på selve proteinet, og som skjøtes sammen til et sammenhengende, modent mRNA etter at intronene er fjernet.',
  },
  'Spleisosom': {
    category: 'RNA & modning',
    definition:
      'Et stort molekylært «klippe-og-lime-kompleks» av proteiner og små RNA-molekyler i cellekjernen som gjenkjenner grensene til intronene, klipper dem nøyaktig ut og skjøter eksonene sammen.',
  },
  'Alternativ spleising': {
    category: 'RNA & modning',
    definition:
      'Cellens smarte måte å sette sammen eksoner i ulike kombinasjoner fra samme pre-mRNA på, slik at menneskets drøyt 20 000 gener kan gi opphav til over 100 000 ulike proteiner.',
  },
  '5\'-hette & poly-A-hale': {
    category: 'RNA & modning',
    definition:
      'Beskyttelsesendene som settes på pre-mRNA i kjernen: en modifisert guaninhette i 5\'-enden og en lang hale av adeninbaser i 3\'-enden hindrer nedbrytning og hjelper ribosomet å feste seg.',
  },

  // prot_nuclear_export
  'Budbringer-RNA (mRNA)': {
    category: 'RNA & genetisk kode',
    definition:
      'Det ferdig spleisede og beskyttede enkelttrådede RNA-molekylet som frakter den genetiske oppskriften fra DNA i cellekjernen ut til ribosomene i cytoplasmaet.',
  },
  'Dobbel kjernemembran': {
    category: 'Cellekjerne & transport',
    definition:
      'De to membranlagene som skiller transkripsjon og RNA-modning inne i eukaryote cellekjerner fra selve proteinbyggingen (translasjonen) ute i cytoplasmaet.',
  },
  'Kjerneporekompleks': {
    category: 'Cellekjerne & transport',
    definition:
      'Avanserte portvaktstrukturer av proteiner i kjernemembranen som gjenkjenner ferdig modnet mRNA med 5\'-hette og poly-A-hale og aktivt slipper det ut i cytoplasmaet.',
  },
  'Eksportkontroll': {
    category: 'Cellekjerne & transport',
    definition:
      'Kvalitetssjekken ved kjerneporene som sørger for at bare ferdig spleiset og feilfritt mRNA får forlate cellekjernen, slik at ribosomene ikke bygger defekte proteiner av umodent pre-mRNA.',
  },
  'Cytoplasma': {
    category: 'Cellebiologi',
    definition:
      'Alt innholdet i cellen innenfor cellemembranen utenom cellekjernen – både cellevæsken (cytosol) og organellene – der ribosomene venter på mRNA for å bygge proteiner.',
  },

  // prot_genetic_code
  'Den genetiske koden': {
    category: 'RNA & genetisk kode',
    definition:
      'Det universelle regelsettet – nesten helt likt hos alt liv fra bakterier til mennesker – som bestemmer hvilken av de 20 aminosyrene hvert av de 64 mulige trebokstavsordene (kodonene) i mRNA koder for.',
  },
  'Triplett / Kodon (mRNA)': {
    category: 'RNA & genetisk kode',
    definition:
      'Et «kodeord» på tre sammenhengende baser langs mRNA-tråden (f.eks. AUG eller UUU) som spesifiserer én bestemt aminosyre eller et stoppsignal under proteinsyntesen.',
  },
  'Antikodon (tRNA)': {
    category: 'RNA & genetisk kode',
    definition:
      'Trebokstavssekvensen nederst på et tRNA-molekyl som baseparer komplementært med et bestemt kodon på mRNA (f.eks. antikodon UAC mot kodon AUG), og sikrer at riktig aminosyre settes inn.',
  },
  'Transport-RNA (tRNA)': {
    category: 'RNA & genetisk kode',
    definition:
      'Små, kløverbladformede RNA-molekyler som fungerer som cellens tolker ved å bære én bestemt aminosyre i den ene enden og et tilhørende antikodon i den andre enden.',
  },
  '20 aminosyrer': {
    category: 'Proteinsyntese',
    definition:
      'De 20 ulike organiske byggesteinene som alle proteiner i levende organismer er satt sammen av; rekkefølgen og de kjemiske sidegruppene deres avgjør hvordan proteinet folder seg og virker.',
  },

  // prot_initiation
  'Translasjon (initiering)': {
    category: 'Proteinsyntese',
    definition:
      'Startfasen av proteinbyggingen i cytoplasmaet, der den lille ribosomdelen binder seg til 5\'-enden av mRNA, skanner fram til startkodonet AUG og kobler på start-tRNA og den store ribosomdelen.',
  },
  'Startkodon AUG': {
    category: 'RNA & genetisk kode',
    definition:
      'Kodonet på mRNA som markerer det nøyaktige startpunktet for nesten alle proteiner og samtidig koder for den første aminosyren, metionin.',
  },
  'Metionin (Met)': {
    category: 'Proteinsyntese',
    definition:
      'Den svovelholdige aminosyren som kodes av startkodonet AUG, og som derfor alltid settes inn aller først når ribosomet starter byggingen av en ny polypeptidkjede.',
  },
  'Ribosomalt RNA (rRNA)': {
    category: 'Proteinsyntese',
    definition:
      'RNA-molekylene som sammen med proteiner utgjør selve ribosomet; rRNA holder mRNA og tRNA på plass og fungerer også som enzymet som smir peptidbindingene mellom aminosyrene.',
  },
  'Leseramme': {
    category: 'RNA & genetisk kode',
    definition:
      'Inndelingen av mRNA-sekvensen i faste grupper på tre og tre baser fra og med startkodonet AUG; forskyves leserammen med bare én base, blir resten av aminosyreoppskriften helt forandret.',
  },

  // prot_elongation
  'Elongering (kjedeforlengelse)': {
    category: 'Proteinsyntese',
    definition:
      'Hovedfasen i translasjonen der ribosomet flytter seg ett og ett kodon langs mRNA i 5\' → 3\'-retning og hekter på nye aminosyrer til en stadig lengre polypeptidkjede.',
  },
  'Peptidbinding': {
    category: 'Proteinsyntese',
    definition:
      'Den sterke kovalente bindingen som ribosomet danner mellom karboksylgruppen på én aminosyre og aminogruppen på den neste under fraspalting av et vannmolekyl (H₂O).',
  },
  'Polypeptidkjede': {
    category: 'Proteinsyntese',
    definition:
      'En lang, ugreinet kjede av aminosyrer bundet sammen med peptidbindinger i en rekkefølge bestemt av mRNA – råformen som folder seg til et ferdig, funksjonelt protein.',
  },
  'A-, P- og E-setet': {
    category: 'Proteinsyntese',
    definition:
      'De tre arbeidsstasjonene inne i ribosomet: nytt tRNA med aminosyre ankommer A-setet, voksende proteinkjede holdes i P-setet, og det tomme tRNA-molekylet sendes ut fra E-setet (Exit).',
  },
  'Energikrevende prosess (ATP/GTP)': {
    category: 'Proteinsyntese & energi',
    definition:
      'Proteinsyntese er blant cellens mest energikrevende oppgaver: det brukes ATP for å koble hver aminosyre på sitt tRNA og energirike GTP-molekyler for hvert steg ribosomet flytter seg langs mRNA.',
  },

  // prot_termination
  'Terminering': {
    category: 'Proteinsyntese',
    definition:
      'Avslutningsfasen i translasjonen som inntreffer når ribosomet når et stoppkodon på mRNA, slik at den ferdige polypeptidkjeden klippes fri og ribosomet løsner.',
  },
  'Stoppkodon (UAA, UAG, UGA)': {
    category: 'RNA & genetisk kode',
    definition:
      'De tre kodonene i den genetiske koden som ikke koder for noen aminosyre og ikke har noe tilhørende tRNA, men som gir ribosomet beskjed om at proteinkjeden er ferdig bygget.',
  },
  'Frigjøringsfaktor': {
    category: 'Proteinsyntese',
    definition:
      'Et spesialprotein som binder seg i ribosomets A-sete når et stoppkodon dukker opp, og sørger for at et vannmolekyl spalter båndet mellom det siste tRNA-et og den ferdige polypeptidkjeden.',
  },
  'Frigjort polypeptidkjede': {
    category: 'Proteinsyntese',
    definition:
      'Den nybygde kjeden av aminosyrer i det den slipper taket fra ribosomet og straks begynner å folde seg til sin spesifikke tredimensjonale proteinform.',
  },
  'Resirkulering av ribosomdeler': {
    category: 'Proteinsyntese',
    definition:
      'Etter termineringen skiller den store og den lille ribosomdelen lag fra mRNA-tråden, slik at begge delene straks kan gjenbrukes til å lese av et nytt mRNA-molekyl.',
  },

  // prot_folding
  'Primær-, sekundær-, tertiær- & kvartærstruktur': {
    category: 'Proteinstruktur',
    definition:
      'De fire nivåene i et proteins oppbygning: aminosyrerekkefølgen (primær), lokale spiraler og flak (sekundær), hele kjedens 3D-form (tertiær) og sammensetningen av flere kjeder sammen (kvartær, f.eks. hemoglobin).',
  },
  'Alfa-heliks & beta-flak': {
    category: 'Proteinstruktur',
    definition:
      'De to vanligste mønstrene i et proteins sekundærstruktur, der regelmessige hydrogenbindinger langs ryggraden får kjeden til å kveile seg som en fjær (alfa-heliks) eller legge seg i brettede ark (beta-flak).',
  },
  'Svovelbroer & hydrogenbindinger': {
    category: 'Proteinstruktur',
    definition:
      'Bindinger mellom aminosyrenes sidegrupper som låser proteinet i riktig 3D-form: mange svake hydrogenbindinger samarbeider med sterke kovalente svovelbroer (mellom cystein-aminosyrer).',
  },
  'Ru ER & Golgiapparatet': {
    category: 'Organell & modning',
    definition:
      'Cellens ferdigstillingslinje for proteiner som skal ut av cellen eller inn i membraner: i ru ER foldes proteinkjedene, og i Golgiapparatet får de sukkermerkelapper og pakkes i transportvesikler.',
  },
  'Denaturering': {
    category: 'Proteinstruktur',
    definition:
      'Tap av et proteins 3D-form og biologiske funksjon fordi høy varme (som ved høy feber eller steking av egg) eller feil pH bryter de svake bindingene som holder strukturen sammen.',
  },

  // prot_function
  'Enzymer (f.eks. laktase, amylase)': {
    category: 'Proteinfunksjon',
    definition:
      'Biologiske katalysatorer av protein som senker aktiveringsenergien og får kjemiske reaksjoner i kroppen til å gå tusenvis av ganger raskere, som når laktase spalter melkesukker og amylase spalter stivelse.',
  },
  'Hemoglobin & ionekanaler': {
    category: 'Proteinfunksjon',
    definition:
      'Eksempler på livsviktige transportproteiner: hemoglobin i røde blodceller frakter oksygen (O₂) fra lungene ut i kroppen, mens ionekanaler sluser ladde ioner gjennom cellemembranen.',
  },
  'Insulin & reseptorer': {
    category: 'Proteinfunksjon',
    definition:
      'Signal- og mottakerproteiner som styrer kommunikasjonen i kroppen: når blodsukkeret stiger, binder proteinhormonet insulin seg til insulinreseptorer på cellene så de åpner glukosekanaler.',
  },
  'Antistoffer, kollagen & myosin': {
    category: 'Proteinfunksjon',
    definition:
      'Ulike spesialproteiner i kroppen: antistoffer angriper virus og bakterier, fiberproteinet kollagen gir styrke til hud og sener, og motorproteinet myosin skaper kraft i muskelcellene.',
  },
  'Punktmutasjon vs. leserammemutasjon': {
    category: 'Mutasjon & proteinfunksjon',
    definition:
      'En punktmutasjon bytter ut én base og endrer høyst én aminosyre (eller ingen), mens en leserammemutasjon (innsetting eller sletting av én base) forskyver alle etterfølgende kodoner og ødelegger hele proteinet.',
  },
};
