import { Minimize } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ImageLightbox } from './components/ImageLightbox';
import { InfoPanel } from './components/InfoPanel';
import { PhylogeneticTree } from './components/PhylogeneticTree';
import { QrShareModal } from './components/QrShareModal';
import { QuizModal } from './components/QuizModal';
import { TimelineDock } from './components/TimelineDock';
import { TopBar } from './components/TopBar';
import { MAIN_STEP_IDS, NODE_MAP, type TreeNodeData } from './data/treeOfLifeData';

export function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [unlockedStepIndex, setUnlockedStepIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(MAIN_STEP_IDS[0]);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [lightboxNode, setLightboxNode] = useState<TreeNodeData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCinemaFallback, setIsCinemaFallback] = useState(false);

  useEffect(() => {
    window.focus();
  }, []);

  const jumpToStep = useCallback((nextIdx: number) => {
    const clamped = Math.max(0, Math.min(MAIN_STEP_IDS.length - 1, nextIdx));
    setCurrentStepIndex(clamped);
    setUnlockedStepIndex((prev) => Math.max(prev, clamped));
    setSelectedNodeId(MAIN_STEP_IDS[clamped]);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (isQuizOpen || isQrOpen) return;

    if (currentStepIndex < MAIN_STEP_IDS.length - 1) {
      jumpToStep(currentStepIndex + 1);
    } else {
      setIsQuizOpen(true);
    }
  }, [currentStepIndex, isQrOpen, isQuizOpen, jumpToStep]);

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

  const handleSelectNode = useCallback((nodeId: string) => {
    const target = NODE_MAP[nodeId];
    if (!target) return;
    setSelectedNodeId(nodeId);
    if (target.isMainPath) {
      setCurrentStepIndex(target.stepIndex);
      setUnlockedStepIndex((prev) => Math.max(prev, target.stepIndex));
    }
  }, []);

  const handleResetPresentation = useCallback(() => {
    setIsQuizOpen(false);
    setIsQrOpen(false);
    setShowAllSteps(false);
    setCurrentStepIndex(0);
    setUnlockedStepIndex(0);
    setSelectedNodeId(MAIN_STEP_IDS[0]);
  }, []);

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
  }, [handleNext, handlePrev, isCinemaFallback, isQrOpen, isQuizOpen, lightboxNode, toggleFullscreen]);

  const activeNode = NODE_MAP[selectedNodeId] ?? NODE_MAP[MAIN_STEP_IDS[0]];

  return (
    <div className="min-h-screen lg:h-screen flex flex-col oceanic-canvas text-slate-100 overflow-x-hidden lg:overflow-hidden relative">
      {!isCinemaFallback ? (
        <TopBar
          currentStepIndex={currentStepIndex}
          showAllSteps={showAllSteps}
          isQuizOpen={isQuizOpen}
          isFullscreen={isFullscreen}
          onToggleShowAll={() => setShowAllSteps((prev) => !prev)}
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

      {/* Main split classroom stage: Left/Top Interactive Tree + Right Info Card */}
      <main className="flex-1 min-h-0 p-3 pb-24 sm:p-4 sm:pb-24 lg:px-6 lg:py-4 lg:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 max-w-[1920px] w-full mx-auto">
        <section
          aria-label="Interaktivt stamtre"
          className="h-[39vh] min-h-[265px] sm:h-[48vh] lg:h-full lg:col-span-7 xl:col-span-7"
        >
          <PhylogeneticTree
            unlockedStepIndex={unlockedStepIndex}
            showAllSteps={showAllSteps}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
          />
        </section>

        <section
          aria-label="Fagkort for valgt evolusjonssteg"
          className="lg:h-full lg:col-span-5 xl:col-span-5 min-h-0"
        >
          <InfoPanel
            node={activeNode}
            currentMainStepIndex={currentStepIndex}
            onSelectNode={handleSelectNode}
            onOpenLightbox={(node) => setLightboxNode(node)}
          />
        </section>
      </main>

      <TimelineDock
        currentStepIndex={currentStepIndex}
        unlockedStepIndex={unlockedStepIndex}
        showAllSteps={showAllSteps}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpToStep={jumpToStep}
      />

      {isQuizOpen && (
        <QuizModal
          onClose={() => setIsQuizOpen(false)}
          onJumpToStep={jumpToStep}
        />
      )}

      <QrShareModal
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
