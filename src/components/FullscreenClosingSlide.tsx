import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export type ClosingSlideMode = 'summary' | 'questions';

export interface ClosingStepSummary {
  stepNumber: number;
  title: string;
  shortLabel: string;
  summaryTitle: string;
  badge?: string;
}

export interface ClosingReviewQuestion {
  id: string;
  question: string;
  hint?: string;
  answerPoints: string[];
}

export interface ClosingReflectionPrompt {
  question: string;
  hint?: string;
}

interface FullscreenClosingSlideProps {
  mode: ClosingSlideMode;
  themeId: string;
  themeTitle: string;
  themeSubtitle?: string;
  steps: ClosingStepSummary[];
  keyTerms: string[];
  reviewQuestions: ClosingReviewQuestion[];
  reflectionPrompt: ClosingReflectionPrompt;
  accent?: 'emerald' | 'amber' | 'violet';
  onJumpToStep: (idx: number) => void;
  onOpenQuiz: () => void;
}

const ACCENT_STYLES = {
  emerald: {
    badge: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
    num: 'bg-emerald-400 text-slate-950',
    cardHover: 'hover:border-emerald-400/50',
    termPill: 'bg-emerald-500/12 border-emerald-400/30 text-emerald-100',
    answerBox: 'bg-emerald-500/10 border-emerald-400/30',
    answerIcon: 'text-emerald-300',
    cta: 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/45 text-emerald-100',
  },
  amber: {
    badge: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
    num: 'bg-amber-400 text-slate-950',
    cardHover: 'hover:border-amber-400/50',
    termPill: 'bg-sky-500/12 border-sky-400/30 text-sky-100',
    answerBox: 'bg-sky-500/10 border-sky-400/30',
    answerIcon: 'text-sky-300',
    cta: 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/45 text-amber-100',
  },
  violet: {
    badge: 'bg-violet-500/20 border-violet-400/40 text-violet-300',
    num: 'bg-violet-400 text-slate-950',
    cardHover: 'hover:border-violet-400/50',
    termPill: 'bg-violet-500/12 border-violet-400/30 text-violet-100',
    answerBox: 'bg-violet-500/10 border-violet-400/30',
    answerIcon: 'text-violet-300',
    cta: 'bg-violet-500/20 hover:bg-violet-500/30 border-violet-400/45 text-violet-100',
  },
};

export function FullscreenClosingSlide({
  mode,
  themeId,
  themeTitle,
  themeSubtitle,
  steps,
  keyTerms,
  reviewQuestions,
  reflectionPrompt,
  accent = 'emerald',
  onJumpToStep,
  onOpenQuiz,
}: FullscreenClosingSlideProps) {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [showReflectionHint, setShowReflectionHint] = useState(false);

  useEffect(() => {
    setRevealedIds({});
    setShowReflectionHint(false);
  }, [themeId, mode]);

  const s = ACCENT_STYLES[accent];
  const allRevealed =
    reviewQuestions.length > 0 &&
    reviewQuestions.every((q) => Boolean(revealedIds[q.id]));

  const toggleQuestion = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllAnswers = () => {
    if (allRevealed) {
      setRevealedIds({});
    } else {
      const next: Record<string, boolean> = {};
      for (const q of reviewQuestions) next[q.id] = true;
      setRevealedIds(next);
    }
  };

  if (mode === 'summary') {
    const gridCols =
      steps.length >= 9
        ? 'grid-cols-2 lg:grid-cols-5'
        : steps.length >= 7
          ? 'grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-2 lg:grid-cols-3';

    return (
      <section
        id="fullscreen-summary-slide"
        aria-label="Kort oppsummering"
        className="h-full w-full flex flex-col justify-between gap-3 p-4 lg:p-6 rounded-2xl glass-panel border border-slate-700/75 overflow-y-auto custom-scrollbar animate-card-enter"
      >
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-xs font-bold uppercase tracking-wider ${s.badge}`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                Kort oppsummering
              </span>
              <span className="text-xs text-slate-400">
                {steps.length} hovedpunkter — klikk på et kort for å gå tilbake
              </span>
            </div>
            <h2 className="text-[clamp(1.25rem,2.8vh,2rem)] font-extrabold text-white font-display leading-tight">
              {themeTitle}
            </h2>
            {themeSubtitle && (
              <p className="text-[clamp(0.8rem,1.5vh,0.95rem)] text-slate-300">
                {themeSubtitle}
              </p>
            )}
          </div>
        </header>

        {/* Numbered step summary grid */}
        <div className={`my-auto grid ${gridCols} gap-2.5 lg:gap-3`}>
          {steps.map((step, idx) => (
            <button
              key={`${step.stepNumber}-${step.title}`}
              type="button"
              onClick={() => onJumpToStep(idx)}
              className={`group flex flex-col justify-start text-left p-3 lg:p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/70 ${s.cardHover} hover:bg-slate-800/85 transition-all cursor-pointer`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 ${s.num}`}
                >
                  {step.stepNumber}
                </span>
                {step.badge && (
                  <span className="text-[10px] font-mono-time text-slate-400 truncate">
                    {step.badge}
                  </span>
                )}
              </div>
              <h3 className="text-[clamp(0.85rem,1.75vh,1.05rem)] font-bold text-white leading-snug line-clamp-2">
                {step.shortLabel || step.title}
              </h3>
              <p className="text-[clamp(0.75rem,1.45vh,0.88rem)] text-slate-300 mt-1 leading-snug line-clamp-3">
                {step.summaryTitle}
              </p>
            </button>
          ))}
        </div>

        {/* Key terms footer strip */}
        {keyTerms.length > 0 && (
          <footer className="shrink-0 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mr-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-300" />
              Nøkkelbegreper:
            </span>
            {keyTerms.slice(0, 14).map((term) => (
              <span
                key={term}
                className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${s.termPill}`}
              >
                {term}
              </span>
            ))}
          </footer>
        )}
      </section>
    );
  }

  return (
    <section
      id="fullscreen-questions-slide"
      aria-label="Spørsmål og fundering"
      className="h-full w-full flex flex-col gap-3 p-4 lg:p-6 rounded-2xl glass-panel border border-slate-700/75 overflow-y-auto custom-scrollbar animate-card-enter"
    >
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-xs font-bold uppercase tracking-wider ${s.badge}`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Spørsmål &amp; fundering
            </span>
            <span className="text-xs text-slate-400">
              Klikk på et oppsummeringsspørsmål for å vise stikkord / fasit
            </span>
          </div>
          <h2 className="text-[clamp(1.25rem,2.7vh,1.9rem)] font-extrabold text-white font-display leading-tight">
            {themeTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {reviewQuestions.length > 0 && (
            <button
              type="button"
              onClick={toggleAllAnswers}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/80 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              {allRevealed ? 'Skjul fasit' : 'Vis alle fasiter'}
            </button>
          )}
          <button
            type="button"
            onClick={onOpenQuiz}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${s.cta}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Åpne full quiz (Q)</span>
          </button>
        </div>
      </header>

      {/* Body: Left Review Questions + Right Open Reflection */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: 2-3 Short Review Questions */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-2.5 min-h-0">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className={`w-4 h-4 ${s.answerIcon}`} />
            <span>Oppsummeringsspørsmål (repeter kjernen)</span>
          </div>

          <div className="flex flex-col gap-2.5 overflow-y-auto custom-scrollbar pr-0.5">
            {reviewQuestions.map((q, idx) => {
              const isOpen = Boolean(revealedIds[q.id]);
              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-slate-900/85 border border-slate-700/75 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(q.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-3 p-3.5 text-left hover:bg-slate-800/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${s.num}`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-[clamp(0.9rem,1.85vh,1.1rem)] font-bold text-white leading-snug">
                        {q.question}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300 shrink-0">
                      <span>{isOpen ? 'Skjul' : 'Fasit'}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className={`px-4 pb-3.5 pt-2.5 border-t border-slate-800/90 space-y-1.5 ${s.answerBox}`}
                    >
                      <ul className="space-y-1">
                        {q.answerPoints.map((pt, ptIdx) => (
                          <li
                            key={`${q.id}-${ptIdx}`}
                            className="flex items-start gap-2 text-[clamp(0.8rem,1.55vh,0.95rem)] text-slate-100 leading-snug"
                          >
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${s.num}`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Open Reflection Prompt ("Tenk-par-del") */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="h-full flex flex-col justify-between p-5 lg:p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-slate-900/90 border border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.12)]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-extrabold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Tenk – Par – Del</span>
              </div>

              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300/85">
                Åpent funderingsspørsmål
              </div>

              <p className="text-[clamp(1.05rem,2.3vh,1.45rem)] font-extrabold text-white font-display leading-snug">
                «{reflectionPrompt.question}»
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-amber-400/20 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-100/85">
                <span className="px-2 py-0.5 rounded-md bg-slate-950/60 border border-amber-400/25 font-semibold">
                  1 min: Tenk selv
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950/60 border border-amber-400/25 font-semibold">
                  2 min: Diskuter med sidemann
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950/60 border border-amber-400/25 font-semibold">
                  Del i klassen
                </span>
              </div>

              {reflectionPrompt.hint && (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowReflectionHint((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>
                      {showReflectionHint
                        ? 'Skjul samtalestarter'
                        : 'Vis samtalestarter / hint'}
                    </span>
                  </button>
                  {showReflectionHint && (
                    <p className="mt-1.5 text-xs lg:text-sm text-amber-50/90 leading-relaxed bg-slate-950/55 border border-amber-400/25 rounded-xl p-3">
                      {reflectionPrompt.hint}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
