import { Minimize } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { AnimalCellExplorer } from './components/AnimalCellExplorer';
import { DnaReplicationExplorer } from './components/DnaReplicationExplorer';
import {
  FullscreenClosingSlide,
  type ClosingReflectionPrompt,
  type ClosingSlideMode,
} from './components/FullscreenClosingSlide';
import { HumanBodyExplorer } from './components/HumanBodyExplorer';
import { ImageLightbox } from './components/ImageLightbox';
import { InfoPanel } from './components/InfoPanel';
import { PhylogeneticTree } from './components/PhylogeneticTree';
import { PlantCellExplorer } from './components/PlantCellExplorer';
import { ProteinSynthesisTimeline } from './components/ProteinSynthesisTimeline';
import { QrShareModal } from './components/QrShareModal';
import { QuizModal } from './components/QuizModal';
import { TimelineDock } from './components/TimelineDock';
import { TopBar } from './components/TopBar';
import {
  parseThemeFromHash,
  THEME_LIST,
  THEMES,
  type ThemeId,
} from './data/themes';
import type { TreeNodeData } from './data/treeOfLifeData';

const BIOLOGY_REFLECTION_PROMPTS: Record<ThemeId, ClosingReflectionPrompt> = {
  'livets-tre': {
    question:
      'Hvis jorda ble «restartet» for 3,8 milliarder år siden — tror du livets tre ville sett likt ut, og ville mennesker oppstått igjen?',
    hint: 'Tenk på rollen til tilfeldige mutasjoner, masseutryddelser (som dinosaurenes fall) og naturlig utvalg.',
  },
  'kroppens-evolusjon': {
    question:
      'Hvilket organsystem i menneskekroppen har flest tydelige «spor» fra vår fortid som fisk i havet?',
    hint: 'Tenk på ryggraden, gjellebuer på fosterstadiet, lemmer med 5 fingre eller svømmeblære/lunger.',
  },
  dyrecellen: {
    question:
      'Hvorfor har ikke én enkelt celle bare vokst seg kjempestor i stedet for at dyr består av billioner av bittesmå celler?',
    hint: 'Tenk på forholdet mellom overflate og volum, transport av oksygen/næring og spesialisering av celler.',
  },
  plantecellen: {
    question:
      'Hva ville skjedd med alt dyreliv på jorda i løpet av noen måneder hvis kloroplastene i plantecellene plutselig sluttet å virke?',
    hint: 'Koble fotosyntesen til både oksygenproduksjon og energien i bunnen av alle næringskjeder.',
  },
  'dna-replikasjon': {
    question:
      'DNA-polymerase gjør nesten ingen feil — men er det egentlig en fordel eller en ulempe for livet på jorda at noen ytterst få kopieringsfeil slipper gjennom?',
    hint: 'Skill mellom hva en mutasjon betyr for et enkeltindivid (f.eks. kreft) versus for en art over millioner av år (evolusjon).',
  },
  proteinsyntesen: {
    question:
      'Alle cellene i kroppen din har nøyaktig det samme DNA-et. Hvordan kan da en muskelcelle og en nervecelle lage helt ulike proteiner?',
    hint: 'Tenk på hvilke gener som skrus «på» og «av» under transkripsjonen.',
  },
};

interface ThemeProgressState {
  currentStepIndex: number;
  unlockedStepIndex: number;
  selectedNodeId: string;
  showAllSteps: boolean;
}

function createInitialProgress(): Record<ThemeId, ThemeProgressState> {
  return Object.fromEntries(
    THEME_LIST.map((t) => [
      t.id,
      {
        currentStepIndex: 0,
        unlockedStepIndex: 0,
        selectedNodeId: t.mainStepIds[0],
        showAllSteps: false,
      },
    ]),
  ) as Record<ThemeId, ThemeProgressState>;
}

export function App() {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(() =>
    typeof window !== 'undefined'
      ? parseThemeFromHash(window.location.hash)
      : 'livets-tre',
  );
  const [progressByTheme, setProgressByTheme] = useState<
    Record<ThemeId, ThemeProgressState>
  >(createInitialProgress);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [lightboxNode, setLightboxNode] = useState<TreeNodeData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCinemaFallback, setIsCinemaFallback] = useState(false);
  const [closingSlide, setClosingSlide] = useState<ClosingSlideMode | null>(
    null,
  );

  const activeTheme = THEMES[activeThemeId];
  const progress = progressByTheme[activeThemeId];
  const {
    currentStepIndex,
    unlockedStepIndex,
    selectedNodeId,
    showAllSteps,
  } = progress;

  useEffect(() => {
    window.focus();
  }, []);

  // Sync browser hash & document title with active theme
  useEffect(() => {
    document.title = `${activeTheme.title} | Interaktiv Klasseromspresentasjon`;
  }, [activeTheme.title]);

  useEffect(() => {
    const syncThemeFromUrl = () => {
      const nextTheme = parseThemeFromHash(window.location.hash);
      setActiveThemeId(nextTheme);
      setClosingSlide(null);
      setIsQuizOpen(false);
      setIsQrOpen(false);
      setLightboxNode(null);
    };
    window.addEventListener('hashchange', syncThemeFromUrl);
    window.addEventListener('popstate', syncThemeFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncThemeFromUrl);
      window.removeEventListener('popstate', syncThemeFromUrl);
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      setClosingSlide(null);
    }
  }, [isFullscreen]);

  const handleSelectTheme = useCallback((nextThemeId: ThemeId) => {
    setActiveThemeId(nextThemeId);
    setClosingSlide(null);
    setIsQuizOpen(false);
    setIsQrOpen(false);
    setLightboxNode(null);
    const targetHash =
      nextThemeId === 'livets-tre' ? '' : THEMES[nextThemeId].hash;
    try {
      const url = new URL(window.location.href);
      if (url.hash !== targetHash) {
        url.hash = targetHash;
        window.history.pushState(null, '', url.toString());
      }
    } catch {
      // Ignore in restricted iframe contexts
    }
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const jumpToStep = useCallback(
    (nextIdx: number) => {
      const mainIds = activeTheme.mainStepIds;
      const clamped = Math.max(0, Math.min(mainIds.length - 1, nextIdx));
      setClosingSlide(null);
      setProgressByTheme((prev) => {
        const cur = prev[activeThemeId];
        return {
          ...prev,
          [activeThemeId]: {
            ...cur,
            currentStepIndex: clamped,
            unlockedStepIndex: Math.max(cur.unlockedStepIndex, clamped),
            selectedNodeId: mainIds[clamped],
          },
        };
      });
      if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [activeTheme.mainStepIds, activeThemeId],
  );

  const handleNext = useCallback(() => {
    if (isQuizOpen || isQrOpen) return;

    if (isFullscreen && closingSlide === 'summary') {
      setClosingSlide('questions');
      return;
    }
    if (isFullscreen && closingSlide === 'questions') {
      setIsQuizOpen(true);
      return;
    }

    if (currentStepIndex < activeTheme.mainStepIds.length - 1) {
      jumpToStep(currentStepIndex + 1);
    } else if (isFullscreen) {
      setClosingSlide('summary');
    } else {
      setIsQuizOpen(true);
    }
  }, [
    activeTheme.mainStepIds.length,
    closingSlide,
    currentStepIndex,
    isFullscreen,
    isQrOpen,
    isQuizOpen,
    jumpToStep,
  ]);

  const handlePrev = useCallback(() => {
    if (isQrOpen) {
      setIsQrOpen(false);
      return;
    }
    if (isQuizOpen) {
      setIsQuizOpen(false);
      return;
    }
    if (isFullscreen && closingSlide === 'questions') {
      setClosingSlide('summary');
      return;
    }
    if (isFullscreen && closingSlide === 'summary') {
      setClosingSlide(null);
      return;
    }
    if (currentStepIndex > 0) {
      jumpToStep(currentStepIndex - 1);
    }
  }, [
    closingSlide,
    currentStepIndex,
    isFullscreen,
    isQrOpen,
    isQuizOpen,
    jumpToStep,
  ]);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      const target = activeTheme.nodeMap[nodeId];
      if (!target) return;
      setClosingSlide(null);
      setProgressByTheme((prev) => {
        const cur = prev[activeThemeId];
        return {
          ...prev,
          [activeThemeId]: {
            ...cur,
            selectedNodeId: nodeId,
            currentStepIndex: target.isMainPath
              ? target.stepIndex
              : cur.currentStepIndex,
            unlockedStepIndex: Math.max(cur.unlockedStepIndex, target.stepIndex),
          },
        };
      });
    },
    [activeTheme.nodeMap, activeThemeId],
  );

  const handleToggleShowAll = useCallback(() => {
    setProgressByTheme((prev) => {
      const cur = prev[activeThemeId];
      return {
        ...prev,
        [activeThemeId]: {
          ...cur,
          showAllSteps: !cur.showAllSteps,
        },
      };
    });
  }, [activeThemeId]);

  const handleResetPresentation = useCallback(() => {
    setIsQuizOpen(false);
    setIsQrOpen(false);
    setClosingSlide(null);
    setProgressByTheme((prev) => ({
      ...prev,
      [activeThemeId]: {
        currentStepIndex: 0,
        unlockedStepIndex: 0,
        selectedNodeId: activeTheme.mainStepIds[0],
        showAllSteps: false,
      },
    }));
  }, [activeTheme.mainStepIds, activeThemeId]);

  const toggleFullscreen = useCallback(async () => {
    if (isCinemaFallback) {
      setIsCinemaFallback(false);
      setIsFullscreen(false);
      return;
    }
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsCinemaFallback((prev) => {
        const next = !prev;
        setIsFullscreen(next);
        return next;
      });
    }
  }, [isCinemaFallback]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Seamless classroom keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'VIDEO' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (lightboxNode) {
          setLightboxNode(null);
          return;
        }
        if (isQrOpen) {
          setIsQrOpen(false);
          return;
        }
        if (isQuizOpen) {
          setIsQuizOpen(false);
          return;
        }
        if (isCinemaFallback) {
          setIsCinemaFallback(false);
          setIsFullscreen(false);
          return;
        }
      }

      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          void toggleFullscreen();
          return;
        }
      }

      if (e.key === 'k' || e.key === 'K') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          setIsQrOpen((prev) => !prev);
          return;
        }
      }

      if (e.key === 'q' || e.key === 'Q') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          setIsQuizOpen((prev) => !prev);
          return;
        }
      }

      if (lightboxNode || isQrOpen) return;

      if (!isQuizOpen) {
        if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    handleNext,
    handlePrev,
    isCinemaFallback,
    isQrOpen,
    isQuizOpen,
    lightboxNode,
    toggleFullscreen,
  ]);

  const activeNode =
    activeTheme.nodeMap[selectedNodeId] ??
    activeTheme.nodeMap[activeTheme.mainStepIds[0]];

  return (
    <div className="min-h-screen lg:h-screen flex flex-col oceanic-canvas text-slate-100 overflow-x-hidden lg:overflow-hidden relative">
      {!isCinemaFallback ? (
        <TopBar
          activeTheme={activeTheme}
          currentStepIndex={currentStepIndex}
          showAllSteps={showAllSteps}
          isQuizOpen={isQuizOpen}
          isFullscreen={isFullscreen}
          onSelectTheme={handleSelectTheme}
          onToggleShowAll={handleToggleShowAll}
          onToggleQuiz={() => setIsQuizOpen((prev) => !prev)}
          onOpenQrModal={() => setIsQrOpen(true)}
          onToggleFullscreen={() => void toggleFullscreen()}
          onResetPresentation={handleResetPresentation}
        />
      ) : (
        <button
          id="btn-exit-cinema"
          type="button"
          onClick={() => void toggleFullscreen()}
          className="fixed top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700 text-xs font-bold text-emerald-300 shadow-lg cursor-pointer"
        >
          <Minimize className="w-3.5 h-3.5" />
          <span>Vis toppmeny (F)</span>
        </button>
      )}

      {/* Main split classroom stage: Left/Top Interactive Canvas + Right Info Card, or Fullscreen Closing Slide */}
      <main
        className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 w-full mx-auto ${
          isFullscreen
            ? 'p-2 pb-20 sm:p-2.5 sm:pb-20 lg:px-3 lg:py-2 lg:pb-2 gap-2.5'
            : 'p-3 pb-24 sm:p-4 sm:pb-24 lg:px-6 lg:py-4 lg:pb-4 gap-3.5 sm:gap-4 max-w-[1920px]'
        }`}
      >
        {isFullscreen && closingSlide ? (
          <div className="lg:col-span-12 min-h-0 h-full">
            <FullscreenClosingSlide
              mode={closingSlide}
              themeId={activeThemeId}
              themeTitle={activeTheme.title}
              themeSubtitle={activeTheme.subtitle}
              accent="emerald"
              steps={activeTheme.mainStepIds.map((id, idx) => {
                const n = activeTheme.nodeMap[id];
                return {
                  stepNumber: idx + 1,
                  title: n.title,
                  shortLabel: n.shortLabel,
                  summaryTitle: n.summaryTitle,
                  badge: n.timeMa,
                };
              })}
              keyTerms={Array.from(
                new Set(
                  activeTheme.mainStepIds.flatMap(
                    (id) => activeTheme.nodeMap[id]?.examples ?? [],
                  ),
                ),
              )}
              reviewQuestions={activeTheme.controlQuestions
                .slice(0, 3)
                .map((q) => ({
                  id: q.id,
                  question: q.question,
                  hint: q.contextHint,
                  answerPoints: q.points.map(
                    (p) => `${p.heading}: ${p.detail}`,
                  ),
                }))}
              reflectionPrompt={
                BIOLOGY_REFLECTION_PROMPTS[activeThemeId] ?? {
                  question: `Hva synes du er det mest overraskende eller viktigste ved ${activeTheme.title.toLowerCase()}, og hvordan henger det sammen med livet rundt oss i dag?`,
                }
              }
              onJumpToStep={jumpToStep}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          </div>
        ) : (
          <>
            <section
              aria-label={activeTheme.title}
              className="h-[42vh] min-h-[280px] sm:h-[50vh] lg:h-full lg:col-span-7 xl:col-span-7"
            >
              {activeThemeId === 'livets-tre' && (
                <PhylogeneticTree
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
              {activeThemeId === 'kroppens-evolusjon' && (
                <HumanBodyExplorer
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
              {activeThemeId === 'dyrecellen' && (
                <AnimalCellExplorer
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
              {activeThemeId === 'plantecellen' && (
                <PlantCellExplorer
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
              {activeThemeId === 'dna-replikasjon' && (
                <DnaReplicationExplorer
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
              {activeThemeId === 'proteinsyntesen' && (
                <ProteinSynthesisTimeline
                  unlockedStepIndex={unlockedStepIndex}
                  showAllSteps={showAllSteps}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
            </section>

            <section
              aria-label="Fagkort for valgt tema"
              className="lg:h-full lg:col-span-5 xl:col-span-5 min-h-0"
            >
              <InfoPanel
                activeTheme={activeTheme}
                node={activeNode}
                currentMainStepIndex={currentStepIndex}
                isFullscreen={isFullscreen}
                onSelectNode={handleSelectNode}
                onOpenLightbox={(node) => setLightboxNode(node)}
                onSwitchTheme={handleSelectTheme}
              />
            </section>
          </>
        )}
      </main>

      <TimelineDock
        activeTheme={activeTheme}
        currentStepIndex={currentStepIndex}
        unlockedStepIndex={unlockedStepIndex}
        showAllSteps={showAllSteps}
        isFullscreen={isFullscreen}
        closingSlide={closingSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpToStep={jumpToStep}
        onSelectClosingSlide={setClosingSlide}
      />

      {isQuizOpen && (
        <QuizModal
          key={activeThemeId}
          activeTheme={activeTheme}
          onClose={() => setIsQuizOpen(false)}
          onJumpToStep={jumpToStep}
        />
      )}

      <QrShareModal
        activeTheme={activeTheme}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      <ImageLightbox
        node={lightboxNode}
        onClose={() => setLightboxNode(null)}
      />
    </div>
  );
}

export default App;
