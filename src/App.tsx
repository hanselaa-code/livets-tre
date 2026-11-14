import { Minimize } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { HumanBodyExplorer } from './components/HumanBodyExplorer';
import { ImageLightbox } from './components/ImageLightbox';
import { InfoPanel } from './components/InfoPanel';
import { PhylogeneticTree } from './components/PhylogeneticTree';
import { QrShareModal } from './components/QrShareModal';
import { QuizModal } from './components/QuizModal';
import { TimelineDock } from './components/TimelineDock';
import { TopBar } from './components/TopBar';
import {
  parseThemeFromHash,
  THEMES,
  type ThemeId,
} from './data/themes';
import type { TreeNodeData } from './data/treeOfLifeData';

interface ThemeProgressState {
  currentStepIndex: number;
  unlockedStepIndex: number;
  selectedNodeId: string;
  showAllSteps: boolean;
}

function createInitialProgress(): Record<ThemeId, ThemeProgressState> {
  return {
    'livets-tre': {
      currentStepIndex: 0,
      unlockedStepIndex: 0,
      selectedNodeId: THEMES['livets-tre'].mainStepIds[0],
      showAllSteps: false,
    },
    'kroppens-evolusjon': {
      currentStepIndex: 0,
      unlockedStepIndex: 0,
      selectedNodeId: THEMES['kroppens-evolusjon'].mainStepIds[0],
      showAllSteps: false,
    },
  };
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
    const onHashChange = () => {
      const nextTheme = parseThemeFromHash(window.location.hash);
      setActiveThemeId(nextTheme);
      setIsQuizOpen(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectTheme = useCallback((nextThemeId: ThemeId) => {
    setActiveThemeId(nextThemeId);
    setIsQuizOpen(false);
    setLightboxNode(null);
    const targetHash =
      nextThemeId === 'livets-tre' ? '' : THEMES[nextThemeId].hash;
    try {
      const url = new URL(window.location.href);
      url.hash = targetHash;
      window.history.replaceState(null, '', url.toString());
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

    if (currentStepIndex < activeTheme.mainStepIds.length - 1) {
      jumpToStep(currentStepIndex + 1);
    } else {
      setIsQuizOpen(true);
    }
  }, [
    activeTheme.mainStepIds.length,
    currentStepIndex,
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
    if (currentStepIndex > 0) {
      jumpToStep(currentStepIndex - 1);
    }
  }, [currentStepIndex, isQrOpen, isQuizOpen, jumpToStep]);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      const target = activeTheme.nodeMap[nodeId];
      if (!target) return;
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

      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (!isQuizOpen) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
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

      {/* Main split classroom stage: Left/Top Interactive Canvas + Right Info Card */}
      <main className="flex-1 min-h-0 p-3 pb-24 sm:p-4 sm:pb-24 lg:px-6 lg:py-4 lg:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 max-w-[1920px] w-full mx-auto">
        <section
          aria-label={activeTheme.title}
          className="h-[42vh] min-h-[280px] sm:h-[50vh] lg:h-full lg:col-span-7 xl:col-span-7"
        >
          {activeThemeId === 'livets-tre' ? (
            <PhylogeneticTree
              unlockedStepIndex={unlockedStepIndex}
              showAllSteps={showAllSteps}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectNode}
            />
          ) : (
            <HumanBodyExplorer
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
            onSelectNode={handleSelectNode}
            onOpenLightbox={(node) => setLightboxNode(node)}
            onSwitchTheme={handleSelectTheme}
          />
        </section>
      </main>

      <TimelineDock
        activeTheme={activeTheme}
        currentStepIndex={currentStepIndex}
        unlockedStepIndex={unlockedStepIndex}
        showAllSteps={showAllSteps}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpToStep={jumpToStep}
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
