import {
  Eye,
  EyeOff,
  HelpCircle,
  Keyboard,
  Maximize,
  Minimize,
  RotateCcw,
  TreePine,
} from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  currentStepIndex: number;
  showAllSteps: boolean;
  isQuizOpen: boolean;
  isFullscreen: boolean;
  onToggleShowAll: () => void;
  onToggleQuiz: () => void;
  onToggleFullscreen: () => void;
  onResetPresentation: () => void;
}

export function TopBar({
  currentStepIndex,
  showAllSteps,
  isQuizOpen,
  isFullscreen,
  onToggleShowAll,
  onToggleQuiz,
  onToggleFullscreen,
  onResetPresentation,
}: TopBarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6 py-3 border-b border-slate-800/80 bg-[#090E1A]/90 backdrop-blur-md">
      {/* Brand & H1 Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/25 to-amber-500/20 border border-emerald-400/35 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <TreePine className="w-5 h-5 text-emerald-300" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-white truncate font-display">
            Livets Tre – Fra LUCA til <span className="italic font-semibold text-amber-300">Homo sapiens</span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            Interaktiv klasseromspresentasjon • 3,7 milliarder års evolusjon (Vg1 Naturfag / Biologi)
          </p>
        </div>
      </div>

      {/* Right toolbar controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300">
          <span>Progresjon:</span>
          <span className="font-mono-time font-bold text-emerald-300">
            {currentStepIndex + 1} / 10
          </span>
        </div>

        {/* Toggle progressive reveal vs full tree */}
        <button
          id="btn-toggle-all-steps"
          type="button"
          onClick={onToggleShowAll}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            showAllSteps
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200'
              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
          }`}
          title="Veksle mellom stegvis fremføring og visning av hele stamtreet"
        >
          {showAllSteps ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {showAllSteps ? 'Stegvis modus' : 'Vis hele treet'}
          </span>
        </button>

        {/* Restart presentation */}
        {currentStepIndex > 0 && (
          <button
            id="btn-reset-presentation"
            type="button"
            onClick={onResetPresentation}
            title="Start fremføringen fra Steg 1 (LUCA)"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Kontrollspørsmål button */}
        <button
          id="btn-open-quiz"
          type="button"
          onClick={onToggleQuiz}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            isQuizOpen
              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-400/40 text-amber-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Kontrollspørsmål</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-black/25 font-mono-time">
            Q
          </kbd>
        </button>

        {/* Keyboard shortcuts help */}
        <div className="relative">
          <button
            id="btn-shortcuts-help"
            type="button"
            onClick={() => setShowShortcuts((prev) => !prev)}
            title="Hurtigtaster for klasserom"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {showShortcuts && (
            <div className="absolute right-0 mt-2 w-72 p-4 rounded-2xl glass-panel z-50 text-xs space-y-2.5 shadow-2xl">
              <div className="font-bold text-white text-sm flex items-center justify-between">
                <span>Klasserom-hurtigtaster</span>
                <button
                  type="button"
                  onClick={() => setShowShortcuts(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Neste hovedsteg</span>
                  <span className="font-mono-time text-emerald-300">Space / → / ↓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Forrige steg</span>
                  <span className="font-mono-time text-emerald-300">← / ↑</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fullskjerm av/på</span>
                  <span className="font-mono-time text-amber-300">F</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kontrollspørsmål</span>
                  <span className="font-mono-time text-amber-300">Q</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lukk vindu / bilde</span>
                  <span className="font-mono-time text-slate-400">Esc</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen button */}
        <button
          id="btn-toggle-fullscreen"
          type="button"
          onClick={onToggleFullscreen}
          title="Fullskjermmodus (F)"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 text-emerald-300" />
          ) : (
            <Maximize className="w-4 h-4 text-slate-300" />
          )}
          <span className="hidden xl:inline">{isFullscreen ? 'Avslutt' : 'Fullskjerm'}</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 font-mono-time">
            F
          </kbd>
        </button>
      </div>
    </header>
  );
}
