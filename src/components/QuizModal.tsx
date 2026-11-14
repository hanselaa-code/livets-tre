import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  HelpCircle,
  ListChecks,
  MessageSquareText,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { McqQuestionItem } from '../data/mcqQuestionsData';
import type { ThemeConfig } from '../data/themes';

interface QuizModalProps {
  activeTheme: ThemeConfig;
  onClose: () => void;
  onJumpToStep: (stepIndex: number) => void;
}

type QuizViewMode = 'discussion' | 'mcq';

interface PreparedOption {
  text: string;
  isCorrect: boolean;
}

interface PreparedMcqQuestion extends Omit<McqQuestionItem, 'options' | 'correctIndex'> {
  preparedOptions: PreparedOption[];
  correctOptionIndex: number;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildPreparedQuestions(
  questions: McqQuestionItem[],
  attemptCount: number,
): PreparedMcqQuestion[] {
  return questions.map((q) => {
    const baseOptions: PreparedOption[] = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));

    // Keep balanced canonical order on initial classroom view (attemptCount === 0),
    // and deterministically shuffle option order on each retry so letter positions vary.
    if (attemptCount > 0) {
      let seed = hashString(`${q.id}-attempt-${attemptCount}`);
      for (let i = baseOptions.length - 1; i > 0; i--) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const j = seed % (i + 1);
        const tmp = baseOptions[i];
        baseOptions[i] = baseOptions[j];
        baseOptions[j] = tmp;
      }
    }

    const correctOptionIndex = baseOptions.findIndex((o) => o.isCorrect);

    return {
      id: q.id,
      number: q.number,
      relatedStepIndex: q.relatedStepIndex,
      topicBadge: q.topicBadge,
      question: q.question,
      explanation: q.explanation,
      preparedOptions: baseOptions,
      correctOptionIndex,
    };
  });
}

function getScoreFeedback(score: number, total: number): {
  headline: string;
  subtext: string;
  accentClass: string;
} {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.9) {
    return {
      headline: 'Strålende resultat – full kontroll!',
      subtext:
        'Du behersker både detaljene og de store sammenhengene i temaet.',
      accentClass: 'from-emerald-400 to-teal-300',
    };
  }
  if (ratio >= 0.7) {
    return {
      headline: 'Veldig bra jobbet!',
      subtext:
        'Du har solid oversikt over teorien. Se gjerne raskt over forklaringene på spørsmålene du bommet på.',
      accentClass: 'from-sky-400 to-emerald-300',
    };
  }
  if (ratio >= 0.4) {
    return {
      headline: 'Godt på vei!',
      subtext:
        'Les gjennom forklaringene under eller hopp tilbake til modellen, og prøv gjerne flervalgstesten en gang til.',
      accentClass: 'from-amber-300 to-emerald-300',
    };
  }
  return {
    headline: 'Fin gjennomkjøring!',
    subtext:
      'Bruk forklaringene under som fasit og utforsk stegene i modellen før du tester deg selv på nytt.',
    accentClass: 'from-amber-400 to-orange-300',
  };
}

export function QuizModal({
  activeTheme,
  onClose,
  onJumpToStep,
}: QuizModalProps) {
  const questions = activeTheme.controlQuestions;
  const mcqRawQuestions = activeTheme.mcqQuestions;

  // Mode toggle at the top of Kontrollspørsmål
  const [mode, setMode] = useState<QuizViewMode>('discussion');

  // State for regular discussion control questions
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [revealedPoints, setRevealedPoints] = useState<Record<string, boolean>>(
    {},
  );

  // State for 10-question Multiple Choice Test
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    {},
  );
  const [showMcqSummary, setShowMcqSummary] = useState(false);

  const mcqQuestions = useMemo(
    () => buildPreparedQuestions(mcqRawQuestions, attemptCount),
    [mcqRawQuestions, attemptCount],
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

  // MCQ Computed Metrics
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = mcqQuestions.reduce((acc, q) => {
    const chosen = selectedAnswers[q.id];
    if (chosen === undefined) return acc;
    return chosen === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);
  const allMcqAnswered =
    mcqQuestions.length > 0 && answeredCount === mcqQuestions.length;

  const activeMcq = mcqQuestions[currentMcqIndex] ?? mcqQuestions[0];
  const activeChosenIndex = activeMcq
    ? selectedAnswers[activeMcq.id]
    : undefined;
  const isCurrentAnswered = activeChosenIndex !== undefined;

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleRestartMcq = () => {
    setAttemptCount((c) => c + 1);
    setSelectedAnswers({});
    setCurrentMcqIndex(0);
    setShowMcqSummary(false);
  };

  const firstUnansweredIndex = mcqQuestions.findIndex(
    (q) => selectedAnswers[q.id] === undefined,
  );

  const feedback = getScoreFeedback(correctCount, mcqQuestions.length);

  return (
    <div
      id="quiz-modal-view"
      className="fixed inset-0 z-40 oceanic-canvas overflow-y-auto custom-scrollbar animate-card-enter"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-8 space-y-6">
        {/* Top bar inside Quiz view with Mode Switcher right at the top */}
        <div className="flex flex-col gap-3.5 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              id="btn-close-quiz"
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-bold text-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{activeTheme.backFromQuizLabel}</span>
            </button>

            {mode === 'discussion' ? (
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
            ) : (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-200 font-mono-time">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Poeng: {correctCount} / {mcqQuestions.length}
                  </span>
                </div>
                <button
                  id="btn-restart-mcq-top"
                  type="button"
                  onClick={handleRestartMcq}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Start på nytt</span>
                </button>
              </div>
            )}
          </div>

          {/* Prominent Segmented Mode Toggle: Vanlige spørsmål vs. Multiple Choice (10 spm) */}
          <div
            id="quiz-mode-switcher"
            role="tablist"
            aria-label="Velg type kontrollspørsmål"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/85 border border-slate-800 shadow-inner"
          >
            <button
              id="btn-quiz-mode-discussion"
              role="tab"
              aria-selected={mode === 'discussion'}
              type="button"
              onClick={() => setMode('discussion')}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                mode === 'discussion'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.28)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <MessageSquareText className="w-4 h-4 shrink-0" />
              <span>Vanlige kontrollspørsmål</span>
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono-time font-bold ${
                  mode === 'discussion'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {questions.length} oppgaver
              </span>
            </button>

            <button
              id="btn-quiz-mode-mcq"
              role="tab"
              aria-selected={mode === 'mcq'}
              type="button"
              onClick={() => setMode('mcq')}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                mode === 'mcq'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <ListChecks className="w-4 h-4 shrink-0" />
              <span>Multiple Choice-test (MCQ)</span>
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono-time font-bold ${
                  mode === 'mcq'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                }`}
              >
                {mcqQuestions.length} spm
              </span>
            </button>
          </div>
        </div>

        {mode === 'discussion' ? (
          <>
            {/* Hero Heading - Regular Discussion Questions */}
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Klasseromsdiskusjon & Oppsummering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                {activeTheme.quizTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Diskuter spørsmålene sammen to og to eller i plenum før dere klikker frem delsvarene eller hele fasiten ett kort om gangen – eller bytt til{' '}
                <button
                  type="button"
                  onClick={() => setMode('mcq')}
                  className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4 font-bold cursor-pointer"
                >
                  Multiple Choice-testen (10 spm)
                </button>{' '}
                øverst.
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
                        const isPointOpen =
                          !!revealedPoints[`${item.id}-${idx}`];

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
          </>
        ) : (
          /* ================================================================
             MULTIPLE CHOICE (10 QUESTIONS) MODE
             ================================================================ */
          <div id="mcq-test-container" className="space-y-6 animate-card-enter">
            {/* Hero Heading - Multiple Choice */}
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ListChecks className="w-4 h-4" />
                <span>Kunnskapstest • 10 flervalgsspørsmål fra teorien</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                Multiple Choice: {activeTheme.dropdownTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Velg ett svaralternativ på hvert spørsmål. Du får umiddelbar tilbakemelding og faglig forklaring etter hvert svar.
              </p>
            </header>

            {/* 1..10 Progress Pills & Status Bar */}
            <div className="p-4 rounded-2xl glass-subtle space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-300">
                <span>
                  Besvart{' '}
                  <strong className="text-white font-mono-time">
                    {answeredCount} av {mcqQuestions.length}
                  </strong>{' '}
                  spørsmål
                </span>
                {allMcqAnswered && !showMcqSummary && (
                  <button
                    type="button"
                    onClick={() => setShowMcqSummary(true)}
                    className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-bold cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Se sluttresultat ({correctCount}/10) →</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {mcqQuestions.map((q, idx) => {
                  const chosen = selectedAnswers[q.id];
                  const isAnswered = chosen !== undefined;
                  const isCorrect =
                    isAnswered && chosen === q.correctOptionIndex;
                  const isCurrent = !showMcqSummary && idx === currentMcqIndex;

                  let pillClass =
                    'bg-slate-900/85 hover:bg-slate-800 border-slate-700 text-slate-300';
                  if (isAnswered) {
                    pillClass = isCorrect
                      ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/50 text-emerald-200'
                      : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-400/50 text-rose-200';
                  }

                  return (
                    <button
                      key={q.id}
                      id={`btn-mcq-step-${idx + 1}`}
                      type="button"
                      onClick={() => {
                        setShowMcqSummary(false);
                        setCurrentMcqIndex(idx);
                      }}
                      className={`h-10 rounded-xl border text-xs font-extrabold font-mono-time transition-all flex items-center justify-center gap-1 cursor-pointer ${pillClass} ${
                        isCurrent
                          ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-950 scale-[1.03]'
                          : ''
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isAnswered &&
                        (isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        ))}
                    </button>
                  );
                })}
              </div>
            </div>

            {showMcqSummary ? (
              /* ============================================================
                 FINAL RESULT & FULL REVIEW CARD
                 ============================================================ */
              <section
                id="mcq-summary-card"
                className="rounded-2xl glass-panel p-6 sm:p-8 space-y-6 animate-card-enter"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Sluttresultat • {activeTheme.dropdownTitle}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {feedback.headline}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                      {feedback.subtext}
                    </p>
                  </div>

                  <div className="shrink-0 p-5 rounded-2xl bg-slate-950/85 border border-slate-800 text-center min-w-[180px]">
                    <div
                      className={`text-4xl sm:text-5xl font-black font-mono-time bg-gradient-to-r ${feedback.accentClass} bg-clip-text text-transparent`}
                    >
                      {correctCount} / {mcqQuestions.length}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {Math.round((correctCount / mcqQuestions.length) * 100)} %
                      riktig
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="btn-retry-mcq"
                    type="button"
                    onClick={handleRestartMcq}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-[0_0_24px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ta testen på nytt (stokker svaralternativene)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowMcqSummary(false);
                      setCurrentMcqIndex(0);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Bla gjennom spørsmål 1–10</span>
                  </button>
                </div>

                {/* Compact Review of all 10 Questions */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
                    Oppsummering av alle 10 spørsmål
                  </h4>
                  <div className="space-y-3">
                    {mcqQuestions.map((q, idx) => {
                      const chosen = selectedAnswers[q.id];
                      const isCorrect = chosen === q.correctOptionIndex;
                      const chosenText =
                        chosen !== undefined
                          ? q.preparedOptions[chosen]?.text
                          : 'Ikke besvart';
                      const rightText =
                        q.preparedOptions[q.correctOptionIndex]?.text ?? '';

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border space-y-2 ${
                            isCorrect
                              ? 'bg-emerald-500/8 border-emerald-500/30'
                              : 'bg-rose-500/8 border-rose-500/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="text-xs font-mono-time font-bold text-slate-400">
                                  Spørsmål {idx + 1} • {q.topicBadge}
                                </span>
                                <p className="font-bold text-sm sm:text-base text-white mt-0.5">
                                  {q.question}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowMcqSummary(false);
                                setCurrentMcqIndex(idx);
                              }}
                              className="text-xs font-bold text-emerald-300 hover:text-emerald-200 shrink-0 cursor-pointer"
                            >
                              Åpne →
                            </button>
                          </div>

                          {!isCorrect && (
                            <p className="pl-7 text-xs sm:text-sm text-rose-200">
                              <strong>Ditt svar:</strong> {chosenText}
                            </p>
                          )}
                          <p className="pl-7 text-xs sm:text-sm text-emerald-200">
                            <strong>Riktig svar:</strong> {rightText}
                          </p>
                          <p className="pl-7 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : (
              /* ============================================================
                 ACTIVE SINGLE MCQ QUESTION CARD
                 ============================================================ */
              activeMcq && (
                <article
                  key={activeMcq.id}
                  id={`mcq-question-card-${activeMcq.number}`}
                  className="rounded-2xl glass-panel p-5 sm:p-7 space-y-6 animate-card-enter"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 text-xs font-bold font-mono-time">
                      Spørsmål {currentMcqIndex + 1} av {mcqQuestions.length}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-slate-300 text-xs font-semibold">
                      {activeMcq.topicBadge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-display">
                    {activeMcq.question}
                  </h3>

                  {/* 4 Option Buttons */}
                  <div className="grid grid-cols-1 gap-3">
                    {activeMcq.preparedOptions.map((opt, optIdx) => {
                      const letter = OPTION_LETTERS[optIdx] ?? 'A';
                      const isThisSelected = activeChosenIndex === optIdx;
                      const isThisCorrect = opt.isCorrect;

                      let btnStyle =
                        'bg-slate-900/65 hover:bg-slate-800/90 border-slate-700/90 hover:border-slate-500 text-slate-100';
                      let badgeStyle =
                        'bg-slate-800 border-slate-600 text-slate-200';

                      if (isCurrentAnswered) {
                        if (isThisCorrect) {
                          btnStyle =
                            'bg-emerald-500/18 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                          badgeStyle =
                            'bg-emerald-400 border-emerald-300 text-slate-950';
                        } else if (isThisSelected) {
                          btnStyle =
                            'bg-rose-500/18 border-rose-400 text-rose-100';
                          badgeStyle =
                            'bg-rose-400 border-rose-300 text-slate-950';
                        } else {
                          btnStyle =
                            'bg-slate-950/45 border-slate-800/80 text-slate-400 opacity-65';
                          badgeStyle =
                            'bg-slate-900 border-slate-800 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={letter}
                          id={`btn-mcq-option-${optIdx}`}
                          type="button"
                          disabled={isCurrentAnswered}
                          onClick={() =>
                            handleSelectOption(activeMcq.id, optIdx)
                          }
                          className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all flex items-start sm:items-center justify-between gap-3.5 ${btnStyle} ${
                            isCurrentAnswered
                              ? 'cursor-default'
                              : 'cursor-pointer'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-3.5">
                            <span
                              className={`w-8 h-8 rounded-lg border font-mono-time text-sm font-extrabold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
                            >
                              {letter}
                            </span>
                            <span className="text-sm sm:text-base font-semibold leading-snug">
                              {opt.text}
                            </span>
                          </div>

                          {isCurrentAnswered && isThisCorrect && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/25 text-emerald-200 text-xs font-bold shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                              <span className="hidden sm:inline">Riktig</span>
                            </span>
                          )}
                          {isCurrentAnswered &&
                            isThisSelected &&
                            !isThisCorrect && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/25 text-rose-200 text-xs font-bold shrink-0">
                                <XCircle className="w-4 h-4 text-rose-300" />
                                <span className="hidden sm:inline">
                                  Ditt valg
                                </span>
                              </span>
                            )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback + Explanation Box */}
                  {isCurrentAnswered && (
                    <div
                      className={`p-4 sm:p-5 rounded-xl border space-y-2.5 animate-card-enter ${
                        activeChosenIndex === activeMcq.correctOptionIndex
                          ? 'bg-emerald-500/12 border-emerald-400/35 text-emerald-100'
                          : 'bg-amber-500/10 border-amber-400/35 text-slate-100'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 font-extrabold text-sm">
                          {activeChosenIndex === activeMcq.correctOptionIndex ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-300">
                                Helt riktig!
                              </span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-amber-300" />
                              <span className="text-amber-200">
                                Ikke helt – riktig svar er{' '}
                                {OPTION_LETTERS[activeMcq.correctOptionIndex]}:
                              </span>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onJumpToStep(activeMcq.relatedStepIndex);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer"
                        >
                          <span>
                            Åpne {activeTheme.stepWord.toLowerCase()}{' '}
                            {activeMcq.relatedStepIndex + 1} i modellen
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
                        {activeMcq.explanation}
                      </p>
                    </div>
                  )}

                  {/* Prev / Next Question Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                    <button
                      id="btn-mcq-prev"
                      type="button"
                      disabled={currentMcqIndex === 0}
                      onClick={() =>
                        setCurrentMcqIndex((idx) => Math.max(0, idx - 1))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none border border-slate-700 text-sm font-bold text-slate-200 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Forrige</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {allMcqAnswered ? (
                        <button
                          id="btn-mcq-finish"
                          type="button"
                          onClick={() => setShowMcqSummary(true)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 text-sm font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                        >
                          <Trophy className="w-4 h-4" />
                          <span>
                            Se sluttresultat ({correctCount}/
                            {mcqQuestions.length})
                          </span>
                        </button>
                      ) : currentMcqIndex < mcqQuestions.length - 1 ? (
                        <button
                          id="btn-mcq-next"
                          type="button"
                          onClick={() =>
                            setCurrentMcqIndex((idx) =>
                              Math.min(mcqQuestions.length - 1, idx + 1),
                            )
                          }
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                            isCurrentAnswered
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                              : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200'
                          }`}
                        >
                          <span>Neste spørsmål</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        firstUnansweredIndex !== -1 && (
                          <button
                            id="btn-mcq-goto-unanswered"
                            type="button"
                            onClick={() =>
                              setCurrentMcqIndex(firstUnansweredIndex)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-sm font-bold transition-colors cursor-pointer"
                          >
                            <span>
                              Gå til ubesvart spørsmål (nr.{' '}
                              {firstUnansweredIndex + 1})
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}

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
