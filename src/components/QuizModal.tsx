import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import type { ThemeConfig } from '../data/themes';

interface QuizModalProps {
  activeTheme: ThemeConfig;
  onClose: () => void;
  onJumpToStep: (stepIndex: number) => void;
}

export function QuizModal({
  activeTheme,
  onClose,
  onJumpToStep,
}: QuizModalProps) {
  const questions = activeTheme.controlQuestions;
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [revealedPoints, setRevealedPoints] = useState<Record<string, boolean>>(
    {},
  );

  const toggleCard = (cardId: string, pointCount: number) => {
    const nextState = !revealedCards[cardId];
    setRevealedCards((prev) => ({ ...prev, [cardId]: nextState }));
    const updatedPoints: Record<string, boolean> = { ...revealedPoints };
    for (let i = 0; i < pointCount; i++) {
      updatedPoints[`${cardId}-${i}`] = nextState;
    }
    setRevealedPoints(updatedPoints);
  };

  const toggleSinglePoint = (
    cardId: string,
    pointIdx: number,
    totalPoints: number,
  ) => {
    const key = `${cardId}-${pointIdx}`;
    const nextVal = !revealedPoints[key];
    const nextPoints = { ...revealedPoints, [key]: nextVal };
    setRevealedPoints(nextPoints);

    const allOpen = Array.from({ length: totalPoints }).every(
      (_, idx) => nextPoints[`${cardId}-${idx}`],
    );
    setRevealedCards((prev) => ({ ...prev, [cardId]: allOpen }));
  };

  const revealAll = () => {
    const allCards: Record<string, boolean> = {};
    const allPts: Record<string, boolean> = {};
    for (const q of questions) {
      allCards[q.id] = true;
      q.points.forEach((_, idx) => {
        allPts[`${q.id}-${idx}`] = true;
      });
    }
    setRevealedCards(allCards);
    setRevealedPoints(allPts);
  };

  const hideAll = () => {
    setRevealedCards({});
    setRevealedPoints({});
  };

  return (
    <div
      id="quiz-modal-view"
      className="fixed inset-0 z-40 oceanic-canvas overflow-y-auto custom-scrollbar animate-card-enter"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-6">
        {/* Top bar inside Quiz view */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <button
            id="btn-close-quiz"
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-bold text-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{activeTheme.backFromQuizLabel}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-reveal-all-answers"
              type="button"
              onClick={revealAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/35 text-xs font-bold text-emerald-200 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vis alle fasiter</span>
            </button>
            <button
              id="btn-hide-all-answers"
              type="button"
              onClick={hideAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Skjul alle</span>
            </button>
          </div>
        </div>

        {/* Hero Heading */}
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Klasseromsdiskusjon & Oppsummering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
            {activeTheme.quizTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Diskuter spørsmålene sammen to og to eller i plenum før dere klikker frem delsvarene eller hele fasiten ett kort om gangen.
          </p>
        </header>

        {/* Question Cards */}
        <div className="space-y-6">
          {questions.map((item) => {
            const isCardRevealed = !!revealedCards[item.id];

            return (
              <article
                key={item.id}
                id={`question-card-${item.number}`}
                className="rounded-2xl glass-panel p-5 sm:p-7 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-400/35 text-amber-300 text-xs font-bold font-mono-time">
                      Spørsmål {item.number} av {questions.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-display">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      💡 Tips til diskusjonen: {item.contextHint}
                    </p>
                  </div>

                  <button
                    id={`btn-toggle-answer-${item.number}`}
                    type="button"
                    onClick={() => toggleCard(item.id, item.points.length)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shrink-0 transition-all cursor-pointer ${
                      isCardRevealed
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    {isCardRevealed ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Skjul fasit</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Vis hele fasiten</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Clickable step-by-step sub-points */}
                <div className="grid grid-cols-1 gap-2.5">
                  {item.points.map((pt, idx) => {
                    const isPointOpen = !!revealedPoints[`${item.id}-${idx}`];

                    return (
                      <button
                        key={pt.heading}
                        type="button"
                        onClick={() =>
                          toggleSinglePoint(item.id, idx, item.points.length)
                        }
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isPointOpen
                            ? 'bg-slate-900/90 border-emerald-500/40'
                            : 'bg-slate-900/45 hover:bg-slate-900/75 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2
                              className={`w-5 h-5 shrink-0 transition-colors ${
                                isPointOpen
                                  ? 'text-emerald-400'
                                  : 'text-slate-600'
                              }`}
                            />
                            <span className="font-bold text-sm sm:text-base text-white">
                              {isPointOpen
                                ? pt.heading
                                : `Klikk for å vise punkt ${idx + 1}`}
                            </span>
                            {pt.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-semibold">
                                {pt.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-emerald-300 shrink-0">
                            {isPointOpen ? 'Skjul' : 'Vis →'}
                          </span>
                        </div>

                        {isPointOpen && (
                          <p className="mt-2.5 pl-7 text-sm sm:text-[15px] text-slate-200 leading-relaxed animate-card-enter">
                            {pt.detail}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Optional comparison table */}
                {isCardRevealed && item.comparisonTable && (
                  <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-950/70 animate-card-enter">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-200">
                          {item.comparisonTable.headers.map((h) => (
                            <th key={h} className="px-4 py-3 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {item.comparisonTable.rows.map((row) => (
                          <tr key={row[0]} className="hover:bg-slate-900/40">
                            <td className="px-4 py-2.5 font-semibold text-slate-300">
                              {row[0]}
                            </td>
                            <td className="px-4 py-2.5 text-sky-200">
                              {row[1]}
                            </td>
                            <td className="px-4 py-2.5 text-amber-200">
                              {row[2]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Summary takeaway box */}
                {isCardRevealed && (
                  <div className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-500/12 border border-emerald-400/30 text-sm text-emerald-100 animate-card-enter">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="font-medium leading-relaxed">
                      {item.takeaway}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Quick jump back to relevant steps */}
        <div className="p-5 rounded-2xl glass-subtle flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-slate-300 font-medium">
            Vil dere hoppe rett tilbake til et bestemt steg?
          </span>
          <div className="flex flex-wrap gap-2">
            {activeTheme.quizShortcuts.map((shortcut) => (
              <button
                key={shortcut.label}
                type="button"
                onClick={() => {
                  onJumpToStep(shortcut.idx);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-emerald-300 transition-colors cursor-pointer"
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
