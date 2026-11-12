import {
  ArrowLeft,
  Clock,
  GitBranch,
  Lightbulb,
  Maximize2,
  Sparkles,
  Tag,
} from 'lucide-react';
import {
  MAIN_STEP_IDS,
  NODE_MAP,
  TREE_NODES,
  type TreeNodeData,
} from '../data/treeOfLifeData';
import { TraitIcon } from './TraitIcon';

interface InfoPanelProps {
  node: TreeNodeData;
  currentMainStepIndex: number;
  onSelectNode: (nodeId: string) => void;
  onOpenLightbox: (node: TreeNodeData) => void;
}

export function InfoPanel({
  node,
  currentMainStepIndex,
  onSelectNode,
  onOpenLightbox,
}: InfoPanelProps) {
  const activeMainNodeId = MAIN_STEP_IDS[currentMainStepIndex];
  const activeMainNode = NODE_MAP[activeMainNodeId];

  // Relevant side branches connected to this node or unlocked at this step
  const relatedBranches = TREE_NODES.filter((candidate) => {
    if (candidate.id === node.id) return false;
    if (node.isMainPath) {
      return !candidate.isMainPath && candidate.stepIndex === node.stepIndex;
    }
    return candidate.parentId === node.id || candidate.id === node.parentId;
  });

  return (
    <aside
      key={node.id}
      id="evolution-info-panel"
      className="h-full flex flex-col rounded-2xl glass-panel overflow-hidden animate-card-enter"
    >
      {/* Scrollable content body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 lg:p-6 space-y-5">
        {/* Back to main path banner when exploring a side branch */}
        {!node.isMainPath && activeMainNode && (
          <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-400/25 text-xs">
            <div className="flex items-center gap-2 text-amber-200 font-medium">
              <GitBranch className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sidegren som splitter av fra hovedstien</span>
            </div>
            <button
              id="btn-back-to-main-path"
              type="button"
              onClick={() => onSelectNode(activeMainNode.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-100 font-semibold transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tilbake til Steg {activeMainNode.stepNumber}</span>
            </button>
          </div>
        )}

        {/* Header badges + Title + Latin name */}
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {node.isMainPath ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 text-xs font-bold tracking-wide uppercase">
                Steg {node.stepNumber} av 10 • Hovedsti
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/20 border border-sky-400/35 text-sky-200 text-xs font-bold tracking-wide uppercase">
                Sidegren
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold font-mono-time">
              <Clock className="w-3.5 h-3.5" />
              {node.timeMa}
            </span>

            <span className="text-xs text-slate-400 font-medium">
              {node.eraLabel}
            </span>
          </div>

          <div>
            <h2 className="text-2xl lg:text-[1.75rem] font-extrabold text-white leading-tight font-display">
              {node.title}
            </h2>
            <p className="text-sm lg:text-base italic text-slate-300 font-medium mt-0.5">
              {node.latinName}
            </p>
          </div>
        </header>

        {/* Hero Nano Banana 16:9 Illustration */}
        <figure className="relative group rounded-xl overflow-hidden border border-slate-700/70 bg-slate-900 shadow-lg">
          <div className="aspect-video w-full overflow-hidden bg-slate-950">
            <img
              src={node.image}
              alt={`${node.title} (${node.latinName})`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-zoom-in"
              onClick={() => onOpenLightbox(node)}
            />
          </div>
          <button
            id="btn-expand-image"
            type="button"
            onClick={() => onOpenLightbox(node)}
            title="Forstørr bilde for storskjerm"
            className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/75 hover:bg-slate-900/95 text-slate-200 text-xs font-medium border border-white/15 opacity-90 group-hover:opacity-100 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Storskjermbilde</span>
          </button>
          <figcaption className="px-3.5 py-2 bg-slate-950/85 text-xs text-slate-300 border-t border-slate-800/80 leading-relaxed">
            {node.imageCaption}
          </figcaption>
        </figure>

        {/* Hva skjer her? */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3>Hva skjer her? — {node.summaryTitle}</h3>
          </div>
          <p className="text-[15px] lg:text-base text-slate-200 leading-relaxed">
            {node.whatHappens}
          </p>
        </section>

        {/* Evolusjonære nøkkeltrekk */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Evolusjonære nøkkeltrekk
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {node.keyTraits.map((trait) => (
              <div
                key={trait.title}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/75 border border-slate-700/60 hover:border-emerald-500/35 transition-colors"
              >
                <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 shrink-0 mt-0.5">
                  <TraitIcon name={trait.icon} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm lg:text-[15px] font-bold text-white">
                    {trait.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-slate-300 mt-0.5 leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidegrener som splitter av her */}
        {relatedBranches.length > 0 && (
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>
                  {node.isMainPath
                    ? 'Sidegrener som splitter av her (klikk for å utforske)'
                    : 'Tilknyttede grener i stamtreet'}
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedBranches.map((branch) => (
                <button
                  key={branch.id}
                  id={`branch-chip-${branch.id}`}
                  type="button"
                  onClick={() => onSelectNode(branch.id)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/65 hover:border-sky-400/50 text-left transition-all cursor-pointer group"
                >
                  <img
                    src={branch.image}
                    alt={branch.title}
                    className="w-11 h-11 rounded-lg object-cover shrink-0 border border-slate-700"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs lg:text-sm font-bold text-slate-100 group-hover:text-sky-200 truncate">
                      {branch.title}
                    </div>
                    <div className="text-[11px] font-mono-time text-amber-300/90">
                      {branch.timeMa} • <span className="italic font-sans text-slate-400">{branch.latinName}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Visste du at? */}
        <section className="p-4 rounded-xl bg-gradient-to-br from-amber-500/14 via-amber-500/8 to-transparent border border-amber-400/30 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <h3>Visste du at?</h3>
          </div>
          <p className="text-sm text-amber-50/95 leading-relaxed">
            {node.didYouKnow}
          </p>
        </section>

        {/* Eksempler på arter / grupper */}
        <section className="space-y-2 pb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Tag className="w-3.5 h-3.5" />
            <h3>Eksempler på arter og grupper</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {node.examples.map((example) => (
              <span
                key={example}
                className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs lg:text-sm text-slate-200 font-medium"
              >
                {example}
              </span>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
