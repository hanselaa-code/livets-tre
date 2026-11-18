import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dna,
  FlaskConical,
  GitBranch,
  Leaf,
  Lightbulb,
  Maximize2,
  Microscope,
  PersonStanding,
  Sparkles,
  Tag,
  TreePine,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { lookupGlossaryEntry } from '../data/glossaryData';
import type { ThemeConfig, ThemeId } from '../data/themes';
import type { TreeNodeData } from '../data/treeOfLifeData';
import { NodeVideoPlayer } from './NodeVideoPlayer';
import { TraitIcon } from './TraitIcon';

interface InfoPanelProps {
  activeTheme: ThemeConfig;
  node: TreeNodeData;
  currentMainStepIndex: number;
  onSelectNode: (nodeId: string) => void;
  onOpenLightbox: (node: TreeNodeData) => void;
  onSwitchTheme: (themeId: ThemeId) => void;
}

export function InfoPanel({
  activeTheme,
  node,
  currentMainStepIndex,
  onSelectNode,
  onOpenLightbox,
  onSwitchTheme,
}: InfoPanelProps) {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number | null>(
    null,
  );
  const glossaryCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedExampleIndex === null) return;
    const frame = requestAnimationFrame(() => {
      glossaryCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedExampleIndex]);

  const activeMainNodeId = activeTheme.mainStepIds[currentMainStepIndex];
  const activeMainNode = activeTheme.nodeMap[activeMainNodeId];

  // Relevant side branches connected to this node (used in Livets Tre)
  const relatedBranches = activeTheme.allNodes.filter((candidate) => {
    if (candidate.id === node.id) return false;
    if (node.isMainPath) {
      return !candidate.isMainPath && candidate.stepIndex === node.stepIndex;
    }
    return candidate.parentId === node.id || candidate.id === node.parentId;
  });

  const isTreeTheme = activeTheme.id === 'livets-tre';

  return (
    <aside
      key={node.id}
      id="evolution-info-panel"
      className="h-full flex flex-col rounded-2xl glass-panel overflow-hidden animate-card-enter"
    >
      {/* Scrollable content body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 lg:p-6 space-y-5">
        {/* Back to main path banner when exploring a side branch in Livets Tre */}
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
                {activeTheme.stepWord} {node.stepNumber} av{' '}
                {activeTheme.mainStepIds.length}
                {isTreeTheme ? ' • Hovedsti' : ''}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/20 border border-sky-400/35 text-sky-200 text-xs font-bold tracking-wide uppercase">
                Sidegren
              </span>
            )}

            {node.traceBadge && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/15 border border-sky-400/35 text-sky-200 text-xs font-bold">
                {node.traceBadge}
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

        {/* Hero Nano Banana 16:9 Illustration (or click-to-play Video over the Illustration) */}
        {node.videoUrl ? (
          <NodeVideoPlayer
            node={node}
            videoUrl={node.videoUrl}
            onOpenLightbox={onOpenLightbox}
          />
        ) : (
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
        )}

        {/* Main pedagogical summary */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3>
              {activeTheme.summaryHeadingPrefix} — {node.summaryTitle}
            </h3>
          </div>
          <p className="text-[15px] lg:text-base text-slate-200 leading-relaxed">
            {node.whatHappens}
          </p>
        </section>

        {/* Optional hands-on classroom test / memory hook */}
        {node.classroomTest && (
          <section className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-400/35 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <FlaskConical className="w-4 h-4 text-emerald-400 shrink-0" />
              <h3>{activeTheme.classroomBoxHeading}</h3>
            </div>
            <p className="text-sm text-emerald-50/95 leading-relaxed">
              {node.classroomTest}
            </p>
          </section>
        )}

        {/* Key biological traits / mechanisms */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {activeTheme.traitsHeading}
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

        {/* Sidegrener som splitter av her (Livets Tre) */}
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
                      {branch.timeMa} •{' '}
                      <span className="italic font-sans text-slate-400">
                        {branch.latinName}
                      </span>
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

        {/* Bridge button from Eukaryoter / Dyr in Livets Tre directly to Eukaryot dyrecelle */}
        {(node.id === 'eukaryotes' || node.id === 'animals') &&
          activeTheme.id === 'livets-tre' && (
            <button
              id="btn-bridge-to-animal-cell"
              type="button"
              onClick={() => onSwitchTheme('dyrecellen')}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-500/20 via-sky-500/15 to-emerald-500/15 hover:from-teal-500/30 hover:to-emerald-500/25 border border-teal-400/45 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
                  <Microscope className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Dypdykk i mikroskopet
                  </div>
                  <div className="text-sm font-extrabold text-white font-display">
                    Utforsk temaet «Eukaryot dyrecelle» og alle organellene
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        {/* Bridge button from Eukaryoter / Planter / Cyanobakterier in Livets Tre (or from Dyrecellen) directly to Eukaryot plantecelle */}
        {(((node.id === 'eukaryotes' ||
          node.id === 'cyanobacteria' ||
          node.id === 'land_plants' ||
          node.id === 'conifers' ||
          node.id === 'flowering_plants') &&
          activeTheme.id === 'livets-tre') ||
          ((node.id === 'cell_membrane' || node.id === 'cell_cytoskeleton') &&
            activeTheme.id === 'dyrecellen')) && (
          <button
            id="btn-bridge-to-plant-cell"
            type="button"
            onClick={() => onSwitchTheme('plantecellen')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-lime-500/15 to-teal-500/15 hover:from-emerald-500/30 hover:to-lime-500/25 border border-emerald-400/45 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {activeTheme.id === 'dyrecellen'
                    ? 'Sammenlign celletyper'
                    : 'Dypdykk i plantecellen'}
                </div>
                <div className="text-sm font-extrabold text-white font-display">
                  Utforsk temaet «Eukaryot plantecelle» (cellevegg, kloroplaster & vakuole)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Bridge button from Plantecellen back to Eukaryot dyrecelle for direct classroom comparison */}
        {(node.id === 'plant_cell_wall' || node.id === 'plant_cytoskeleton') &&
          activeTheme.id === 'plantecellen' && (
            <button
              id="btn-bridge-plant-to-animal-cell"
              type="button"
              onClick={() => onSwitchTheme('dyrecellen')}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-500/20 via-sky-500/15 to-emerald-500/15 hover:from-teal-500/30 hover:to-emerald-500/25 border border-teal-400/45 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
                  <Microscope className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Sammenlign celletyper
                  </div>
                  <div className="text-sm font-extrabold text-white font-display">
                    Bytt til «Eukaryot dyrecelle» for å sammenligne
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        {/* Bridge button from Cellekjernen or Steg 1 i Proteinsyntesen directly to DNA-struktur og replikasjon */}
        {((node.id === 'cell_nucleus' && activeTheme.id === 'dyrecellen') ||
          (node.id === 'plant_nucleus' && activeTheme.id === 'plantecellen') ||
          (node.id === 'prot_dna_gene' &&
            activeTheme.id === 'proteinsyntesen')) && (
          <button
            id="btn-bridge-to-dna-replication"
            type="button"
            onClick={() => onSwitchTheme('dna-replikasjon')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-500/15 to-emerald-500/15 hover:from-indigo-500/30 hover:to-emerald-500/25 border border-sky-400/45 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400/20 border border-sky-300/40 flex items-center justify-center shrink-0">
                <Dna className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  {activeTheme.id === 'proteinsyntesen'
                    ? 'Forstå selve DNA-molekylet først'
                    : 'Zoom helt inn på arvestoffet'}
                </div>
                <div className="text-sm font-extrabold text-white font-display">
                  Utforsk «DNA-struktur og replikasjon» (nukleotider, A–T/C–G & kopiering)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-300 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Bridge button from Cellekjernen / Ribosomer / ER / Golgi / DNA-replikasjon (or LUCA) directly to Proteinsyntesen */}
        {(((node.id === 'cell_nucleus' ||
          node.id === 'cell_ribosomes' ||
          node.id === 'cell_er' ||
          node.id === 'cell_golgi') &&
          activeTheme.id === 'dyrecellen') ||
          ((node.id === 'plant_nucleus' ||
            node.id === 'plant_er_ribosomes' ||
            node.id === 'plant_golgi') &&
            activeTheme.id === 'plantecellen') ||
          ((node.id === 'dna_double_helix' ||
            node.id === 'dna_division_evolution') &&
            activeTheme.id === 'dna-replikasjon') ||
          (node.id === 'luca' && activeTheme.id === 'livets-tre')) && (
          <button
            id="btn-bridge-to-protein-synthesis"
            type="button"
            onClick={() => onSwitchTheme('proteinsyntesen')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-sky-500/20 via-teal-500/15 to-amber-500/15 hover:from-sky-500/30 hover:to-amber-500/25 border border-teal-400/45 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Fra oppskrift til ferdig protein
                </div>
                <div className="text-sm font-extrabold text-white font-display">
                  Åpne tidslinjen «Proteinsyntesen» (DNA → mRNA → Protein)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Bridge button from Mutasjoner / Evolusjon i DNA-replikasjon directly to Livets Tre */}
        {(node.id === 'dna_proofreading_mutation' ||
          node.id === 'dna_division_evolution') &&
          activeTheme.id === 'dna-replikasjon' && (
            <button
              id="btn-bridge-dna-to-tree-of-life"
              type="button"
              onClick={() => onSwitchTheme('livets-tre')}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-amber-500/15 to-teal-500/15 hover:from-emerald-500/30 hover:to-amber-500/25 border border-emerald-400/45 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center shrink-0">
                  <TreePine className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Direkte bro til evolusjon
                  </div>
                  <div className="text-sm font-extrabold text-white font-display">
                    Se hvordan mutasjoner over milliarder av år skapte «Livets Tre»
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        {/* Bridge button from Proteinsyntesen or DNA-kromosomer back to Eukaryot dyrecelle */}
        {(((node.id === 'prot_nuclear_export' || node.id === 'prot_folding') &&
          activeTheme.id === 'proteinsyntesen') ||
          (node.id === 'dna_chromosomes' &&
            activeTheme.id === 'dna-replikasjon')) && (
          <button
            id="btn-bridge-protein-to-cell"
            type="button"
            onClick={() => onSwitchTheme('dyrecellen')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-500/20 via-sky-500/15 to-emerald-500/15 hover:from-teal-500/30 hover:to-emerald-500/25 border border-teal-400/45 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
                <Microscope className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Se hvor i cellen dette ligger
                </div>
                <div className="text-sm font-extrabold text-white font-display">
                  Utforsk cellekjernen og organellene i «Eukaryot dyrecelle»
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Bridge button from Homo sapiens in Livets Tre directly to Menneskekroppens evolusjonære spor */}
        {node.id === 'homo_sapiens' && activeTheme.id === 'livets-tre' && (
          <button
            id="btn-bridge-to-human-body"
            type="button"
            onClick={() => onSwitchTheme('kroppens-evolusjon')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-amber-500/15 hover:from-emerald-500/30 hover:to-amber-500/25 border border-emerald-400/45 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center shrink-0">
                <PersonStanding className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Neste tema i menyen
                </div>
                <div className="text-sm font-extrabold text-white font-display">
                  Utforsk menneskekroppens evolusjonære spor
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Eksempler / nøkkelbegreper med innebygd klikkbar ordbok */}
        <section className="space-y-2.5 pb-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Tag className="w-3.5 h-3.5" />
              <h3>{activeTheme.examplesHeading}</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300/90">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trykk på et begrep for forklaring</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {node.examples.map((example, idx) => {
              const isSelected = selectedExampleIndex === idx;
              return (
                <button
                  key={example}
                  type="button"
                  aria-expanded={isSelected}
                  onClick={() =>
                    setSelectedExampleIndex((prev) =>
                      prev === idx ? null : idx,
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs lg:text-sm font-medium text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/22 border-emerald-400 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.22)]'
                      : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-400/55 text-slate-200 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      isSelected ? 'bg-emerald-300' : 'bg-emerald-400/55'
                    }`}
                  />
                  <span>{example}</span>
                </button>
              );
            })}
          </div>

          {selectedExampleIndex !== null &&
            node.examples[selectedExampleIndex] !== undefined && (() => {
              const activeTerm = node.examples[selectedExampleIndex];
              const entry = lookupGlossaryEntry(
                activeTerm,
                activeTheme.dropdownTitle,
              );
              const totalTerms = node.examples.length;

              return (
                <div
                  ref={glossaryCardRef}
                  id="glossary-definition-card"
                  role="region"
                  aria-label={`Ordbokforklaring for ${activeTerm}`}
                  className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/16 via-sky-500/10 to-slate-900/90 border border-emerald-400/45 shadow-lg space-y-2 animate-card-enter"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/35 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                        <BookOpen className="w-3 h-3 text-emerald-300" />
                        <span>Ordbok</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-[10px] font-semibold text-sky-200">
                        {entry.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {totalTerms > 1 && (
                        <>
                          <button
                            type="button"
                            title="Forrige begrep"
                            onClick={() =>
                              setSelectedExampleIndex(
                                (selectedExampleIndex - 1 + totalTerms) %
                                  totalTerms,
                              )
                            }
                            className="p-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-1 text-[10px] font-mono-time text-slate-400">
                            {selectedExampleIndex + 1}/{totalTerms}
                          </span>
                          <button
                            type="button"
                            title="Neste begrep"
                            onClick={() =>
                              setSelectedExampleIndex(
                                (selectedExampleIndex + 1) % totalTerms,
                              )
                            }
                            className="p-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        title="Lukk forklaring"
                        aria-label="Lukk ordbokforklaring"
                        onClick={() => setSelectedExampleIndex(null)}
                        className="p-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer ml-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm lg:text-base font-extrabold text-white font-display leading-snug">
                    {activeTerm}
                  </h4>

                  <p className="text-xs lg:text-sm text-slate-100/95 leading-relaxed">
                    {entry.definition}
                  </p>
                </div>
              );
            })()}
        </section>
      </div>
    </aside>
  );
}
