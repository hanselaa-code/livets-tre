# Livets Tre – Fra LUCA til *Homo sapiens*

🌐 **Live klasseromspresentasjon (GitHub Pages):** https://hanselaa-code.github.io/livets-tre/

En moderne, interaktiv klasseromspresentasjon bygget med **React, TypeScript, Vite og Tailwind CSS** for undervisning i naturfag (Vg1) og biologi. Applikasjonen tar elevene steg for steg gjennom 3,7 milliarder års evolusjonshistorie – fra den felles ur-stamfaren **LUCA** ved hydrotermiske kilder på havbunnen og hele veien frem til primatene og det moderne mennesket (*Homo sapiens*).

---

## Hurtigguide for lærere og elever i klasserommet

Presentasjonen er designet for å styres like sømløst som PowerPoint eller Prezi på projektor og interaktiv storskjerm:

| Tast / Handling | Funksjon |
| :--- | :--- |
| `Space` / `→` / `↓` eller **«Neste steg →»** | Går ett steg fremover langs hovedstien (og animerer ut nye forgreninger) |
| `←` / `↑` eller **«← Forrige»** | Går ett steg tilbake (eller lukker kontrollspørsmål-visningen) |
| `F` | Aktiverer / avslutter **fullskjermmodus** for storskjerm i klasserommet |
| `Q` | Åpner eller lukker **Kontrollspørsmål-modulen** |
| `Esc` | Lukker bildeforstørrer (storskjermbilde) eller kontrollspørsmål |
| **Klikk på node i treet** | Utforsk både hovedsteg og sidegrener (*Arker*, *Rødalger*, *Landplanter*, *Leddyr*, *Bruskfisker*, *Amfibier*, *Krypdyr og fugler*, *Klovdyr og hvaler*, *Rovdyr*, *Gnagere* m.fl.) |
| **Dra / Scroll i treet** | Panorer fritt rundt i stamtreet og zoom inn/ut (klikk **«Følg steg»** for å sentrere kameraet igjen) |
| **Klikk på hovedbildet** | Åpner naturillustrasjonen i fullskjerms bildeforstørrer for detaljstudier i klassen |

---

## Pedagogisk oppbygning (10 hovedsteg + sidegrener)

Hele datasettet ligger strukturert i [`src/data/treeOfLifeData.ts`](./src/data/treeOfLifeData.ts):

1. **Livets opprinnelse – LUCA (3700 ma)** — Sidegrener: *Arker* og *Eubakterier*
2. **Eukaryoter (2000 ma)** — Cellekjerne og mitokondrier. Sidegrener: *Sopp* (~1000 ma) og *Planter* (*Rødalger* 800 ma → *Landplanter* 450 ma)
3. **Dyr (660 ma)** — Flercellede, heterotrofe uten cellevegg. Sidegren: *Protostomer* (~600 ma → *Bløtdyr* og *Leddyr*)
4. **Virveldyr (450 ma)** — Ryggrad og kranium. Sidegrener: *Bruskfisker* og *Beinfisker*
5. **Tetrapoder (375 ma)** — Fire bærende lemmer og lunger opp på land (*Tiktaalik*). Sidegrener: *Amfibier* og *Krypdyr og fugler*
6. **Pattedyr (178 ma)** — Varmblodige, pels og melk. Sidegren: *Pungdyr*
7. **Morkakedyr (161 ma)** — Fosterutvikling i livmor med morkake (*placenta*). Sidegrener: *Klovdyr og hvaler*, *Hovdyr*, *Rovdyr* og *Gnagere*
8. **Primater (55 ma)** — Gripehender med negler, stereosyn og stor hjerne. Sidegren: *Halvaper og aper med hale*
9. **Menneskeaper / Hominider (~15 ma)** — Haleløse menneskeaper med frie skulderledd og sosial intelligens. Sidegren: *Orangutang, gorilla og sjimpanse*
10. **Mennesket – *Homo sapiens* (0,3 ma / 300 000 år siden)** — Oppreist tobeint gange, stor hjerne, språk og kumulativ kultur

### Kontrollspørsmål-modul (`Q`)
På slutten av fremføringen (eller via knappen **Kontrollspørsmål** i toppmenyen) finnes tre diskusjonsoppgaver der læreren kan klikke frem ett og ett stikkord eller hele fasiten i fellesskap med klassen:
1. Fellestrekk for alle dyr
2. Reproduksjonsstrategier: *r*-strategi vs. *K*-strategi (med sammenligningstabell, fordeler og ulemper)
3. Kjennetegn og evolusjonær sammenheng mellom *Virveldyr*, *Pattedyr* og *Morkakedyr*

---

## Utvikling, bygging og deling (GitHub / Google Drive)

Applikasjonen er satt opp som en ren, selvstendig statisk webapplikasjon (`base: './'` i [`vite.config.ts`](./vite.config.ts)) helt uten eksterne database- eller backend-avhengigheter.

### Kjøre lokalt under utvikling
```bash
npm install
npm run dev
```

### Bygge statisk produksjonspakke
```bash
npm run build
```
Den ferdige statiske webappen genereres i `dist/` med relative filstier (`./`), slik at den kan publiseres direkte på GitHub Pages, åpnes fra en statisk webserver eller deles via Google Drive.

---

## Prosjektstruktur

```text
├── public/
│   ├── favicon.svg
│   └── images/evolution/        # 12 naturillustrasjoner i 16:9 generert med Nano Banana
├── src/
│   ├── components/
│   │   ├── ImageLightbox.tsx    # Storskjerms bildeforstørrer
│   │   ├── InfoPanel.tsx        # Fagkort med nøkkeltrekk, sidegrener og kuriositeter
│   │   ├── PhylogeneticTree.tsx # Interaktivt SVG-stamtre med automatisk kamera og pan/zoom
│   │   ├── QuizModal.tsx        # Interaktiv kontrollspørsmål- og fasitmodul
│   │   ├── TimelineDock.tsx     # Bunnmeny med tidslinje (3700 ma -> 0,3 ma) og navigasjon
│   │   ├── TopBar.tsx           # Toppmeny med fullskjerm, hurtigtaster og modusvalg
│   │   └── TraitIcon.tsx        # Ikonbibliotek for biologiske nøkkeltrekk
│   ├── data/
│   │   └── treeOfLifeData.ts    # Komplett evolusjonsdatasett og kontrollspørsmål
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```
