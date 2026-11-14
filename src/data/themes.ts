import {
  CELL_CONTROL_QUESTIONS,
  CELL_MAIN_STEP_IDS,
  CELL_NODE_MAP,
  CELL_NODES,
} from './animalCellData';
import {
  BODY_CONTROL_QUESTIONS,
  BODY_MAIN_STEP_IDS,
  BODY_NODE_MAP,
  BODY_NODES,
} from './humanBodyData';
import {
  CONTROL_QUESTIONS,
  MAIN_STEP_IDS,
  NODE_MAP,
  TREE_NODES,
  type ControlQuestionItem,
  type TreeNodeData,
} from './treeOfLifeData';

export type ThemeId = 'livets-tre' | 'kroppens-evolusjon' | 'dyrecellen';

export interface ThemeConfig {
  id: ThemeId;
  hash: string;
  title: string;
  dropdownTitle: string;
  dropdownBadge: string;
  dropdownDescription: string;
  subtitle: string;
  stepWord: string;
  showAllLabel: string;
  progressiveLabel: string;
  quizTitle: string;
  backFromQuizLabel: string;
  summaryHeadingPrefix: string;
  traitsHeading: string;
  classroomBoxHeading: string;
  examplesHeading: string;
  mainStepIds: string[];
  allNodes: TreeNodeData[];
  nodeMap: Record<string, TreeNodeData>;
  controlQuestions: ControlQuestionItem[];
  quizShortcuts: { label: string; idx: number }[];
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'livets-tre': {
    id: 'livets-tre',
    hash: '#livets-tre',
    title: 'Livets Tre – Fra LUCA til Homo sapiens',
    dropdownTitle: 'Livets Tre',
    dropdownBadge: 'Stamtre • 3700 ma → nåtid',
    dropdownDescription:
      'Interaktivt stamtre med 46 grener og over 200 arter fra livets opprinnelse i urhavet til mennesket.',
    subtitle:
      'Interaktiv klasseromspresentasjon • 3,7 milliarder års evolusjon (Vg1 Naturfag / Biologi)',
    stepWord: 'Steg',
    showAllLabel: 'Vis hele treet',
    progressiveLabel: 'Stegvis modus',
    quizTitle: 'Kontrollspørsmål: Livets utvikling',
    backFromQuizLabel: 'Tilbake til Livets Tre',
    summaryHeadingPrefix: 'Hva skjer her?',
    traitsHeading: 'Evolusjonære nøkkeltrekk',
    classroomBoxHeading: 'Prøv selv i klasserommet!',
    examplesHeading: 'Eksempler på arter og grupper',
    mainStepIds: MAIN_STEP_IDS,
    allNodes: TREE_NODES,
    nodeMap: NODE_MAP,
    controlQuestions: CONTROL_QUESTIONS,
    quizShortcuts: [
      { label: 'Steg 2: Eukaryoter (2000 ma)', idx: 1 },
      { label: 'Steg 3: Dyr (660 ma)', idx: 2 },
      { label: 'Steg 4: Virveldyr (450 ma)', idx: 3 },
      { label: 'Steg 6: Pattedyr (178 ma)', idx: 5 },
      { label: 'Steg 10: Homo sapiens', idx: 9 },
    ],
  },
  'kroppens-evolusjon': {
    id: 'kroppens-evolusjon',
    hash: '#kroppens-evolusjon',
    title: 'Menneskekroppens evolusjonære spor',
    dropdownTitle: 'Menneskekroppens evolusjonære spor',
    dropdownBadge: 'Tankekart • Kroppen i midten',
    dropdownDescription:
      'Utforsk halebein, gåsehud, blindtarm, visdomstenner, hikke og S-ryggsøyle på vår egen kropp.',
    subtitle:
      'Interaktivt anatomisk tankekart • Levende spor fra 500 millioner års evolusjon i din egen kropp',
    stepWord: 'Spor',
    showAllLabel: 'Vis alle spor',
    progressiveLabel: 'Stegvis modus',
    quizTitle: 'Kontrollspørsmål: Menneskekroppens evolusjonære spor',
    backFromQuizLabel: 'Tilbake til menneskekroppen',
    summaryHeadingPrefix: 'Hvorfor har vi dette?',
    traitsHeading: 'Evolusjonære mekanismer og spor',
    classroomBoxHeading: 'Prøv selv i klasserommet!',
    examplesHeading: 'Eksempler og evolusjonære paralleller',
    mainStepIds: BODY_MAIN_STEP_IDS,
    allNodes: BODY_NODES,
    nodeMap: BODY_NODE_MAP,
    controlQuestions: BODY_CONTROL_QUESTIONS,
    quizShortcuts: [
      { label: 'Spor 1: Øynene & blind flekk', idx: 0 },
      { label: 'Spor 3: Visdomstenner', idx: 2 },
      { label: 'Spor 4: S-ryggsøyle & bekken', idx: 3 },
      { label: 'Spor 7: Blindtarmen', idx: 6 },
      { label: 'Spor 8: Halebeinet', idx: 7 },
      { label: 'Spor 10: Fotbuen & nåtid', idx: 9 },
    ],
  },
  dyrecellen: {
    id: 'dyrecellen',
    hash: '#dyrecellen',
    title: 'Eukaryot dyrecelle – Oppbygning og organeller',
    dropdownTitle: 'Eukaryot dyrecelle',
    dropdownBadge: 'Cellemodell • Cellemembran & organeller',
    dropdownDescription:
      '3D-snitt av en dyrecelle i midten – fra cellemembranen inn til cellekjerne, ribosomer, ER, Golgi og mitokondrier.',
    subtitle:
      'Interaktiv cellemodell • Fra cellemembranen gjennom alle organellene og deres funksjon',
    stepWord: 'Del',
    showAllLabel: 'Vis alle organeller',
    progressiveLabel: 'Stegvis modus',
    quizTitle: 'Kontrollspørsmål: Eukaryot dyrecelle',
    backFromQuizLabel: 'Tilbake til dyrecellen',
    summaryHeadingPrefix: 'Oppgave i cellen',
    traitsHeading: 'Oppbygning og nøkkelfunksjoner',
    classroomBoxHeading: 'Husketriks & kobling i timen',
    examplesHeading: 'Nøkkelbegreper å kunne',
    mainStepIds: CELL_MAIN_STEP_IDS,
    allNodes: CELL_NODES,
    nodeMap: CELL_NODE_MAP,
    controlQuestions: CELL_CONTROL_QUESTIONS,
    quizShortcuts: [
      { label: 'Del 1: Cellemembranen', idx: 0 },
      { label: 'Del 3: Cellekjernen (DNA)', idx: 2 },
      { label: 'Del 4: Ribosomer', idx: 3 },
      { label: 'Del 5: Ru & glatt ER', idx: 4 },
      { label: 'Del 6: Golgiapparatet', idx: 5 },
      { label: 'Del 8: Mitokondrier (ATP)', idx: 7 },
    ],
  },
};

export const THEME_LIST: ThemeConfig[] = [
  THEMES['livets-tre'],
  THEMES['kroppens-evolusjon'],
  THEMES.dyrecellen,
];

export function parseThemeFromHash(hash: string): ThemeId {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (clean === 'kroppens-evolusjon' || clean === 'kroppen') {
    return 'kroppens-evolusjon';
  }
  if (
    clean === 'dyrecellen' ||
    clean === 'dyrecelle' ||
    clean === 'eukaryot-dyrecelle'
  ) {
    return 'dyrecellen';
  }
  return 'livets-tre';
}
