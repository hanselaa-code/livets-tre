import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { MAIN_STEP_IDS, NODE_MAP } from '../data/treeOfLifeData';

interface TimelineDockProps {
  currentStepIndex: number;
  unlockedStepIndex: number;
  showAllSteps: boolean;
  onPrev: () => void;
  onNext: () => void;
  onJumpToStep: (stepIndex: number) => void;
}

export function TimelineDock({
  currentStepIndex,
  unlockedStepIndex,
  showAllSteps,
  onPrev,
  onNext,
  onJumpToStep,
}: TimelineDockProps) {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === MAIN_STEP_IDS.length - 1;

  return (
    <footer className="z-20 px-4 lg:px-6 py-3 border-t border-slate-800/85 bg-[#090E1A]/95 backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3">
        {/* Previous button */}
        <button
          id="btn-prev-step"
          type="button"
          onClick={onPrev}
          disabled={isFirstStep}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
            isFirstStep
              ? 'bg-slate-900/40 border-slate-800/60 text-slate-600 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-100 cursor-pointer active:scale-[0.98]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Forrige</span>
        </button>

        {/* Interactive 10-step geological timeline */}
        <nav
          aria-label="Evolusjonære hovedsteg"
          className="hidden md:flex items-center gap-1 lg:gap-1.5 flex-1 justify-center overflow-x-auto py-0.5"
        >
          {MAIN_STEP_IDS.map((id, idx) => {
            const stepNode = NODE_MAP[id];
            const isCurrent = idx === currentStepIndex;
            const isUnlocked = showAllSteps || idx <= unlockedStepIndex;

            return (
              <button
                key={id}
                id={`timeline-step-${idx + 1}`}
                type="button"
                onClick={() => onJumpToStep(idx)}
                title={`Steg ${idx + 1}: ${stepNode.title} (${stepNode.timeMa})`}
                className={`group flex flex-col items-center px-2 lg:px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : isUnlocked
                      ? 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 hover:bg-slate-900/60 border-slate-800/40 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                      isCurrent
                        ? 'bg-emerald-400 text-slate-950'
                        : isUnlocked
                          ? 'bg-emerald-500/25 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold hidden xl:inline max-w-[92px] truncate">
                    {stepNode.title.split(' ')[0].replace('–', '')}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono-time mt-0.5 ${
                    isCurrent ? 'text-amber-300 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {stepNode.timeMa}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile compact step counter */}
        <div className="flex md:hidden flex-col items-center text-xs">
          <span className="font-bold text-white">
            Steg {currentStepIndex + 1} av {MAIN_STEP_IDS.length}
          </span>
          <span className="text-[11px] font-mono-time text-amber-300">
            {NODE_MAP[MAIN_STEP_IDS[currentStepIndex]].timeMa}
          </span>
        </div>

        {/* Prominent Next Step / Quiz Finale CTA */}
        <button
          id="btn-next-step"
          type="button"
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer active:scale-[0.98] ${
            isLastStep
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
              : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.35)]'
          }`}
        >
          {isLastStep ? (
            <>
              <HelpCircle className="w-4 h-4" />
              <span>Kontrollspørsmål</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Neste steg</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </footer>
  );
}
