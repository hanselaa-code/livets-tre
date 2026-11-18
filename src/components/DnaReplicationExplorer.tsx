import { Dna, Focus, Maximize2, Minus, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DNA_NODE_MAP,
  DNA_NODES,
  type DnaStageCategory,
  type DnaStepNodeData,
} from '../data/dnaReplicationData';

export interface DnaReplicationExplorerProps {
  unlockedStepIndex: number;
  showAllSteps: boolean;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

const CARD_WIDTH = 248;
const CARD_HEIGHT = 204;

type BaseCode = 'A' | 'T' | 'C' | 'G';

interface BaseVisual {
  fill: string;
  bg: string;
  stroke: string;
  text: string;
}

const BASE_COLORS: Record<BaseCode, BaseVisual> = {
  A: {
    fill: '#10B981',
    bg: 'rgba(6, 78, 59, 0.92)',
    stroke: '#6EE7B7',
    text: '#ECFDF5',
  },
  T: {
    fill: '#FB7185',
    bg: 'rgba(136, 19, 55, 0.92)',
    stroke: '#FDA4AF',
    text: '#FFF1F2',
  },
  C: {
    fill: '#14B8A6',
    bg: 'rgba(19, 78, 74, 0.92)',
    stroke: '#5EEAD4',
    text: '#F0FDFA',
  },
  G: {
    fill: '#F59E0B',
    bg: 'rgba(120, 53, 15, 0.92)',
    stroke: '#FCD34D',
    text: '#FFFBEB',
  },
};

const ZONE2_LADDER_RUNGS: {
  x: number;
  top: BaseCode;
  bottom: BaseCode;
  bonds: 2 | 3;
}[] = [
  { x: 650, top: 'G', bottom: 'C', bonds: 3 },
  { x: 730, top: 'A', bottom: 'T', bonds: 2 },
  { x: 814, top: 'C', bottom: 'G', bonds: 3 },
  { x: 898, top: 'T', bottom: 'A', bonds: 2 },
  { x: 982, top: 'A', bottom: 'T', bonds: 2 },
  { x: 1066, top: 'G', bottom: 'C', bonds: 3 },
  { x: 1150, top: 'T', bottom: 'A', bonds: 2 },
  { x: 1234, top: 'C', bottom: 'G', bonds: 3 },
  { x: 1318, top: 'A', bottom: 'T', bonds: 2 },
  { x: 1402, top: 'G', bottom: 'C', bonds: 3 },
];

const HISTONE_SPOOLS = [
  { x: 386, y: 544 },
  { x: 432, y: 518 },
  { x: 478, y: 546 },
  { x: 524, y: 518 },
];

const LEADING_ARM_TICKS = [1655, 1795, 1835, 1875, 1915, 1955, 1995, 2035, 2075, 2115];

const DAUGHTER_RUNGS_X = [
  2176, 2220, 2264, 2308, 2352, 2396, 2440, 2544, 2588, 2628,
];

function getStagePalette(category: DnaStageCategory) {
  switch (category) {
    case 'packaging':
      return {
        accent: '#A78BFA',
        stroke: '#DDD6FE',
        badgeBg: 'rgba(76, 29, 149, 0.88)',
        badgeBorder: 'rgba(167, 139, 250, 0.55)',
        text: '#EDE9FE',
        stageLabel: 'Pakking',
      };
    case 'structure':
      return {
        accent: '#38BDF8',
        stroke: '#BAE6FD',
        badgeBg: 'rgba(12, 74, 110, 0.88)',
        badgeBorder: 'rgba(56, 189, 248, 0.55)',
        text: '#E0F2FE',
        stageLabel: 'DNA-struktur',
      };
    case 'fork_enzymes':
      return {
        accent: '#14B8A6',
        stroke: '#99F6E4',
        badgeBg: 'rgba(19, 78, 74, 0.88)',
        badgeBorder: 'rgba(45, 212, 191, 0.55)',
        text: '#CCFBF1',
        stageLabel: 'Replikasjon',
      };
    case 'mutation_evolution':
    default:
      return {
        accent: '#10B981',
        stroke: '#A7F3D0',
        badgeBg: 'rgba(6, 78, 59, 0.88)',
        badgeBorder: 'rgba(52, 211, 153, 0.55)',
        text: '#D1FAE5',
        stageLabel: 'Mutasjon & arv',
      };
  }
}

function buildAnchorLeaderPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): string {
  const dy = endY - startY;
  const c1x = startX;
  const c1y = startY + dy * 0.48;
  const c2x = endX;
  const c2y = endY - dy * 0.48;
  return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
}

function pentagonPoints(cx: number, cy: number, r: number, inverted = false): string {
  const dir = inverted ? -1 : 1;
  const pts: [number, number][] = [
    [cx, cy - 1.05 * r * dir],
    [cx + 0.98 * r, cy - 0.25 * r * dir],
    [cx + 0.62 * r, cy + 0.92 * r * dir],
    [cx - 0.62 * r, cy + 0.92 * r * dir],
    [cx - 0.98 * r, cy - 0.25 * r * dir],
  ];
  return pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
}

export function DnaReplicationExplorer({
  unlockedStepIndex,
  showAllSteps,
  selectedNodeId,
  onSelectNode,
}: DnaReplicationExplorerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 960, height: 680 });
  const [camera, setCamera] = useState({ x: 340, y: 390, scale: 0.84 });
  const [cameraMode, setCameraMode] = useState<'follow' | 'overview' | 'manual'>(
    'follow',
  );
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    camStartX: number;
    camStartY: number;
    moved: boolean;
  } | null>(null);

  const effectiveMaxStep = showAllSteps ? DNA_NODES.length - 1 : unlockedStepIndex;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewport({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const computeOverviewCamera = useCallback(() => {
    const minX = 80;
    const maxX = 2710;
    const minY = 90;
    const maxY = 950;

    const spanX = maxX - minX + 100;
    const spanY = maxY - minY + 110;
    const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
    const scale = Math.max(0.22, Math.min(0.88, rawScale));

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      scale,
    };
  }, [viewport.height, viewport.width]);

  const computeFollowCamera = useCallback(
    (targetNodeId: string) => {
      const selected = DNA_NODE_MAP[targetNodeId] ?? DNA_NODES[0];
      const prevNode = DNA_NODES[Math.max(0, selected.stepIndex - 1)];
      const nextNode =
        DNA_NODES[Math.min(DNA_NODES.length - 1, selected.stepIndex + 1)];

      const cardLeft = selected.x - CARD_WIDTH / 2 - 65;
      const cardRight = selected.x + CARD_WIDTH / 2 + 65;
      const cardTop = selected.y - CARD_HEIGHT / 2 - 68;
      const cardBottom = selected.y + CARD_HEIGHT / 2 + 68;

      const neighborLeft = (selected.x + prevNode.x) / 2 - 95;
      const neighborRight = (selected.x + nextNode.x) / 2 + 95;

      const minX = Math.min(cardLeft, selected.anchorX - 185, neighborLeft);
      const maxX = Math.max(cardRight, selected.anchorX + 185, neighborRight);

      const dnaBandTop = Math.min(370, selected.anchorY - 95);
      const dnaBandBottom = Math.max(670, selected.anchorY + 95);

      const minY = Math.min(cardTop, dnaBandTop);
      const maxY = Math.max(cardBottom, dnaBandBottom);

      const spanX = Math.max(800, maxX - minX);
      const spanY = Math.max(600, maxY - minY);

      const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
      const clampedScale = Math.max(0.42, Math.min(1.04, rawScale));

      return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        scale: clampedScale,
      };
    },
    [viewport.height, viewport.width],
  );

  useEffect(() => {
    setCameraMode(showAllSteps ? 'overview' : 'follow');
  }, [selectedNodeId, unlockedStepIndex, showAllSteps]);

  useEffect(() => {
    if (cameraMode === 'follow') {
      setCamera(computeFollowCamera(selectedNodeId));
    } else if (cameraMode === 'overview') {
      setCamera(computeOverviewCamera());
    }
  }, [cameraMode, computeFollowCamera, computeOverviewCamera, selectedNodeId]);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      camStartX: camera.x,
      camStartY: camera.y,
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      drag.moved = true;
      setCameraMode('manual');
      setCamera((prev) => ({
        ...prev,
        x: drag.camStartX - dx / prev.scale,
        y: drag.camStartY - dy / prev.scale,
      }));
    }
  };

  const handlePointerUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    setCameraMode('manual');
    setCamera((prev) => ({
      ...prev,
      scale: Math.max(0.22, Math.min(2.1, prev.scale * factor)),
    }));
  };

  const selectedNode = DNA_NODE_MAP[selectedNodeId] ?? DNA_NODES[0];

  const orderedNodes = useMemo(() => {
    const locked: DnaStepNodeData[] = [];
    const unlockedNonSelected: DnaStepNodeData[] = [];
    let active: DnaStepNodeData | null = null;

    for (const node of DNA_NODES) {
      if (node.id === selectedNode.id) {
        active = node;
      } else if (node.stepIndex <= effectiveMaxStep) {
        unlockedNonSelected.push(node);
      } else {
        locked.push(node);
      }
    }

    return active
      ? [...locked, ...unlockedNonSelected, active]
      : [...locked, ...unlockedNonSelected];
  }, [effectiveMaxStep, selectedNode.id]);

  const translateX = viewport.width / 2 - camera.x * camera.scale;
  const translateY = viewport.height / 2 - camera.y * camera.scale;

  return (
    <div
      ref={containerRef}
      id="dna-replication-explorer-canvas"
      className="relative w-full h-full overflow-hidden rounded-2xl glass-panel select-none"
    >
      {/* Top-left zone legend */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl glass-subtle text-[11px] sm:text-xs text-slate-200 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 font-semibold text-violet-300">
          <Dna className="w-3.5 h-3.5 text-violet-400" />
          <span>Kromosom & histoner</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">→</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-sky-300">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
          <span>Dobbelheliks</span>
        </span>
        <span className="text-slate-600 hidden md:inline">→</span>
        <span className="hidden md:inline-flex items-center gap-1.5 font-semibold text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.85)]" />
          <span>Replikasjonsgaffel</span>
        </span>
        <span className="text-slate-600 hidden lg:inline">→</span>
        <span className="hidden lg:inline-flex items-center gap-1.5 font-semibold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Mutasjon & arv</span>
        </span>
      </div>

      {/* Top-right camera controls */}
      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1.5">
        <button
          id="btn-dna-camera-follow"
          type="button"
          onClick={() => {
            setCameraMode('follow');
            setCamera(computeFollowCamera(selectedNodeId));
          }}
          title="Følg valgt steg og se tilhørende punkt på DNA-modellen"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            cameraMode === 'follow'
              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.25)]'
              : 'glass-subtle text-slate-300 hover:text-white'
          }`}
        >
          <Focus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Følg steg</span>
        </button>

        <button
          id="btn-dna-camera-overview"
          type="button"
          onClick={() => {
            setCameraMode('overview');
            setCamera(computeOverviewCamera());
          }}
          title="Zoom ut og se hele DNA- og replikasjonsmodellen (Steg 1–10)"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            cameraMode === 'overview'
              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.25)]'
              : 'glass-subtle text-slate-300 hover:text-white'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hele DNA-modellen</span>
        </button>

        <div className="hidden md:flex items-center rounded-lg glass-subtle overflow-hidden">
          <button
            id="btn-dna-zoom-in"
            type="button"
            aria-label="Zoom inn"
            onClick={() => {
              setCameraMode('manual');
              setCamera((prev) => ({
                ...prev,
                scale: Math.min(2.1, prev.scale * 1.2),
              }));
            }}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-dna-zoom-out"
            type="button"
            aria-label="Zoom ut"
            onClick={() => {
              setCameraMode('manual');
              setCamera((prev) => ({
                ...prev,
                scale: Math.max(0.22, prev.scale / 1.2),
              }));
            }}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-l border-slate-700/60"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom-left molecular flow hint */}
      <div className="hidden sm:flex absolute bottom-3 left-3.5 z-10 items-center gap-2 px-3 py-1.5 rounded-lg glass-subtle text-[11px] text-slate-300 pointer-events-none">
        <span className="font-mono-time text-violet-300 font-semibold">
          Kromosom
        </span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-sky-300 font-semibold">
          A=T / C≡G
        </span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-teal-300 font-semibold">
          Helikase & Polymerase
        </span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-emerald-300 font-semibold">
          2 datter-DNA
        </span>
        <span className="text-slate-600 mx-1">•</span>
        <span className="text-slate-400">Dra for å panorere • Klikk på et steg</span>
      </div>

      <svg
        role="img"
        aria-label="Interaktiv modell av DNA-struktur, baseparing, replikasjonsgaffel, enzymer og semikonservativ kopiering"
        className={`w-full h-full touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <defs>
          <filter
            id="dnaGlowStrong"
            x="-45%"
            y="-45%"
            width="190%"
            height="190%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="dnaSoftGlow"
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="dnaPackagingZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="dnaStructureZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="dnaForkZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.07" />
          </linearGradient>

          <linearGradient id="dnaMutationZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0.07" />
          </linearGradient>

          <radialGradient id="dnaNucleusAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(167, 139, 250, 0.34)" />
            <stop offset="65%" stopColor="rgba(56, 189, 248, 0.12)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
          </radialGradient>

          <linearGradient id="dnaChromatidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <radialGradient id="dnaHistoneGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          <linearGradient id="dnaUpperBackboneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="72%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="dnaHelicaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          <linearGradient id="dnaPolymeraseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>

          {DNA_NODES.map((node) => {
            const cardY = node.y - CARD_HEIGHT / 2;
            return (
              <clipPath key={`clip-${node.id}`} id={`clip-dna-card-img-${node.id}`}>
                <rect
                  x={node.x - 114}
                  y={cardY + 10}
                  width={228}
                  height={104}
                  rx={11}
                />
              </clipPath>
            );
          })}
        </defs>

        <g
          style={{
            transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${camera.scale})`,
            transformOrigin: '0 0',
            transition: isDragging
              ? 'none'
              : 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* ========================================================== */}
          {/* 4 CONNECTED ZONE BACKDROPS & HEADER BANNERS                */}
          {/* ========================================================== */}
          <g className="pointer-events-none">
            {/* SONE 1 BACKDROP */}
            <rect
              x={85}
              y={46}
              width={470}
              height={948}
              rx={38}
              fill="url(#dnaPackagingZoneGrad)"
              stroke="rgba(167, 139, 250, 0.28)"
              strokeWidth={1.8}
            />
            <rect
              x={108}
              y={58}
              width={362}
              height={32}
              rx={10}
              fill="rgba(46, 16, 101, 0.78)"
              stroke="rgba(167, 139, 250, 0.45)"
              strokeWidth={1.1}
            />
            <text
              x={124}
              y={79}
              fill="#DDD6FE"
              fontSize={12}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.05em"
            >
              SONE 1 • CELLEKJERNE, KROMOSOM & HISTONER
            </text>

            {/* SONE 2 BACKDROP */}
            <rect
              x={565}
              y={46}
              width={775}
              height={948}
              rx={38}
              fill="url(#dnaStructureZoneGrad)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth={1.8}
            />
            <rect
              x={590}
              y={58}
              width={468}
              height={32}
              rx={10}
              fill="rgba(12, 74, 110, 0.78)"
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth={1.1}
            />
            <text
              x={608}
              y={79}
              fill="#BAE6FD"
              fontSize={12}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.05em"
            >
              SONE 2 • NUKLEOTIDER, BASEPAR & DOBBELHELIKS
            </text>

            {/* SONE 3 BACKDROP */}
            <rect
              x={1355}
              y={46}
              width={785}
              height={948}
              rx={38}
              fill="url(#dnaForkZoneGrad)"
              stroke="rgba(45, 212, 191, 0.28)"
              strokeWidth={1.8}
            />
            <rect
              x={1380}
              y={58}
              width={480}
              height={32}
              rx={10}
              fill="rgba(19, 78, 74, 0.8)"
              stroke="rgba(45, 212, 191, 0.45)"
              strokeWidth={1.1}
            />
            <text
              x={1398}
              y={79}
              fill="#99F6E4"
              fontSize={12}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.05em"
            >
              SONE 3 • REPLIKASJONSGAFFELEN & ENZYMER I ARBEID
            </text>

            {/* SONE 4 BACKDROP */}
            <rect
              x={2155}
              y={46}
              width={550}
              height={948}
              rx={38}
              fill="url(#dnaMutationZoneGrad)"
              stroke="rgba(52, 211, 153, 0.3)"
              strokeWidth={1.8}
            />
            <rect
              x={2180}
              y={58}
              width={456}
              height={32}
              rx={10}
              fill="rgba(6, 78, 59, 0.82)"
              stroke="rgba(52, 211, 153, 0.48)"
              strokeWidth={1.1}
            />
            <text
              x={2198}
              y={79}
              fill="#A7F3D0"
              fontSize={12}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.05em"
            >
              SONE 4 • KORREKTURLESING, MUTASJON & 2 DATTER-DNA
            </text>
          </g>

          {/* ========================================================== */}
          {/* CENTRAL INTERACTIVE DNA & REPLICATION MODEL (y = 340..700) */}
          {/* ========================================================== */}
          <g className="pointer-events-none">
            {/* ---------------------------------------------------------- */}
            {/* SONE 1: CELLEKJERNE, KROMOSOM (X) & HISTONPAKKING          */}
            {/* ---------------------------------------------------------- */}
            <g>
              {/* Nucleus ambient glow & double nuclear membrane */}
              <circle cx={235} cy={490} r={118} fill="url(#dnaNucleusAura)" />
              <circle
                cx={235}
                cy={490}
                r={100}
                fill="none"
                stroke="rgba(167, 139, 250, 0.48)"
                strokeWidth={2.2}
                strokeDasharray="10 6"
              />
              <circle
                cx={235}
                cy={490}
                r={91}
                fill="rgba(23, 18, 56, 0.68)"
                stroke="rgba(56, 189, 248, 0.42)"
                strokeWidth={1.8}
              />

              {/* Nucleus label pill above */}
              <rect
                x={136}
                y={354}
                width={198}
                height={26}
                rx={9}
                fill="rgba(46, 16, 101, 0.9)"
                stroke="rgba(167, 139, 250, 0.55)"
                strokeWidth={1.1}
              />
              <text
                x={235}
                y={371}
                textAnchor="middle"
                fill="#EDE9FE"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                CELLEKJERNE • 46 kromosomer
              </text>

              {/* Condensed X-shaped Chromosome at (235, 490) */}
              <g filter="url(#dnaSoftGlow)">
                {/* Left sister chromatid */}
                <path
                  d="M 207 434 Q 231 490 205 546"
                  fill="none"
                  stroke="url(#dnaChromatidGrad)"
                  strokeWidth={17}
                  strokeLinecap="round"
                />
                {/* Right sister chromatid */}
                <path
                  d="M 263 434 Q 239 490 265 546"
                  fill="none"
                  stroke="url(#dnaChromatidGrad)"
                  strokeWidth={17}
                  strokeLinecap="round"
                />
              </g>

              {/* Subtle chromosome G-bands */}
              <line
                x1={204}
                y1={452}
                x2={218}
                y2={455}
                stroke="rgba(30, 27, 75, 0.65)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1={252}
                y1={455}
                x2={266}
                y2={452}
                stroke="rgba(30, 27, 75, 0.65)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1={203}
                y1={526}
                x2={218}
                y2={523}
                stroke="rgba(30, 27, 75, 0.65)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1={252}
                y1={523}
                x2={267}
                y2={526}
                stroke="rgba(30, 27, 75, 0.65)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              {/* Centromere constriction ring */}
              <ellipse
                cx={235}
                cy={490}
                rx={15}
                ry={8.5}
                fill="#0F172A"
                stroke="#38BDF8"
                strokeWidth={2.4}
              />

              <text
                x={235}
                y={571}
                textAnchor="middle"
                fill="#DDD6FE"
                fontSize={10.5}
                fontWeight={700}
                fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              >
                Kromosom (X)
              </text>

              {/* Unwinding chromatin thread from chromosome -> histones -> DNA ladder */}
              <path
                d="M 266 544 C 302 562, 342 558, 386 544 C 408 536, 412 518, 432 518 C 454 518, 458 546, 478 546 C 500 546, 504 518, 524 518 C 552 518, 572 465, 605 465"
                fill="none"
                stroke="#A78BFA"
                strokeWidth={4.5}
                strokeLinecap="round"
              />
              <path
                d="M 524 518 C 554 518, 572 575, 605 575"
                fill="none"
                stroke="#F59E0B"
                strokeWidth={4}
                strokeLinecap="round"
                opacity={0.9}
              />

              {/* Golden Histone Octamer Spools (Nucleosomes) */}
              {HISTONE_SPOOLS.map((spool, idx) => (
                <g key={`histone-${idx}`} transform={`translate(${spool.x}, ${spool.y})`}>
                  <circle
                    r={16}
                    fill="url(#dnaHistoneGrad)"
                    stroke="#FEF3C7"
                    strokeWidth={1.8}
                    filter="url(#dnaSoftGlow)"
                  />
                  {/* Chromatin DNA loops wrapped twice around each histone spool */}
                  <path
                    d="M -13 -7 Q 0 -13 13 -5"
                    fill="none"
                    stroke="#DDD6FE"
                    strokeWidth={2.8}
                    strokeLinecap="round"
                  />
                  <path
                    d="M -13 5 Q 0 12 13 6"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                  />
                  <text
                    x={0}
                    y={3.5}
                    textAnchor="middle"
                    fill="#451A03"
                    fontSize={9}
                    fontWeight={900}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    H
                  </text>
                </g>
              ))}

              {/* Chromatin & Histone labels */}
              <rect
                x={365}
                y={462}
                width={180}
                height={24}
                rx={8}
                fill="rgba(30, 27, 75, 0.86)"
                stroke="rgba(167, 139, 250, 0.45)"
                strokeWidth={1}
              />
              <text
                x={455}
                y={478}
                textAnchor="middle"
                fill="#DDD6FE"
                fontSize={10.5}
                fontWeight={700}
                fontFamily="JetBrains Mono, monospace"
              >
                Kromatintråd (~2 m DNA)
              </text>

              <rect
                x={359}
                y={580}
                width={192}
                height={25}
                rx={8}
                fill="rgba(120, 53, 15, 0.86)"
                stroke="rgba(251, 191, 36, 0.5)"
                strokeWidth={1}
              />
              <text
                x={455}
                y={596}
                textAnchor="middle"
                fill="#FDE68A"
                fontSize={10.5}
                fontWeight={700}
                fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              >
                Histon-spoler (nukleosomer)
              </text>
            </g>

            {/* ---------------------------------------------------------- */}
            {/* SONE 2: DOBBELHELIKS, NUKLEOTID & ANTIPARALLELLE TRÅDER    */}
            {/* ---------------------------------------------------------- */}
            <g>
              {/* Subtle helical background waves evoking the 3D twist */}
              <path
                d="M 605 465 Q 690 575, 775 465 T 945 465 T 1115 465 T 1285 465 T 1440 500"
                fill="none"
                stroke="rgba(56, 189, 248, 0.14)"
                strokeWidth={5}
              />
              <path
                d="M 605 575 Q 690 465, 775 575 T 945 575 T 1115 575 T 1285 575 T 1440 540"
                fill="none"
                stroke="rgba(245, 158, 11, 0.14)"
                strokeWidth={5}
              />

              {/* Complementary Base-Pair Rungs (A=T with 2 H-bonds, C≡G with 3 H-bonds) */}
              {ZONE2_LADDER_RUNGS.map((rung) => {
                const topVis = BASE_COLORS[rung.top];
                const botVis = BASE_COLORS[rung.bottom];
                return (
                  <g key={`rung-${rung.x}`}>
                    {/* Covalent link from upper sugar to upper base */}
                    <line
                      x1={rung.x}
                      y1={465}
                      x2={rung.x}
                      y2={474}
                      stroke="#7DD3FC"
                      strokeWidth={2.5}
                    />
                    {/* Upper Base Block */}
                    <rect
                      x={rung.x - 13}
                      y={474}
                      width={26}
                      height={34}
                      rx={6}
                      fill={topVis.bg}
                      stroke={topVis.stroke}
                      strokeWidth={1.6}
                    />
                    <text
                      x={rung.x}
                      y={496}
                      textAnchor="middle"
                      fill={topVis.text}
                      fontSize={13}
                      fontWeight={900}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {rung.top}
                    </text>

                    {/* Hydrogen bonds between complementary bases (2 for A=T, 3 for C≡G) */}
                    {rung.bonds === 2 ? (
                      <>
                        <line
                          x1={rung.x - 4.5}
                          y1={510}
                          x2={rung.x - 4.5}
                          y2={530}
                          stroke="#FDA4AF"
                          strokeWidth={2}
                          strokeDasharray="3 2.5"
                        />
                        <line
                          x1={rung.x + 4.5}
                          y1={510}
                          x2={rung.x + 4.5}
                          y2={530}
                          stroke="#6EE7B7"
                          strokeWidth={2}
                          strokeDasharray="3 2.5"
                        />
                      </>
                    ) : (
                      <>
                        <line
                          x1={rung.x - 6.5}
                          y1={510}
                          x2={rung.x - 6.5}
                          y2={530}
                          stroke="#5EEAD4"
                          strokeWidth={1.9}
                          strokeDasharray="3 2.5"
                        />
                        <line
                          x1={rung.x}
                          y1={510}
                          x2={rung.x}
                          y2={530}
                          stroke="#FDE68A"
                          strokeWidth={1.9}
                          strokeDasharray="3 2.5"
                        />
                        <line
                          x1={rung.x + 6.5}
                          y1={510}
                          x2={rung.x + 6.5}
                          y2={530}
                          stroke="#5EEAD4"
                          strokeWidth={1.9}
                          strokeDasharray="3 2.5"
                        />
                      </>
                    )}

                    {/* Lower Base Block */}
                    <rect
                      x={rung.x - 13}
                      y={532}
                      width={26}
                      height={34}
                      rx={6}
                      fill={botVis.bg}
                      stroke={botVis.stroke}
                      strokeWidth={1.6}
                    />
                    <text
                      x={rung.x}
                      y={554}
                      textAnchor="middle"
                      fill={botVis.text}
                      fontSize={13}
                      fontWeight={900}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {rung.bottom}
                    </text>
                    {/* Covalent link from lower base to lower sugar */}
                    <line
                      x1={rung.x}
                      y1={566}
                      x2={rung.x}
                      y2={575}
                      stroke="#FCD34D"
                      strokeWidth={2.5}
                    />
                  </g>
                );
              })}

              {/* Upper 5' -> 3' Sugar-Phosphate Backbone */}
              <line
                x1={605}
                y1={465}
                x2={1440}
                y2={465}
                stroke="url(#dnaUpperBackboneGrad)"
                strokeWidth={7}
                strokeLinecap="round"
              />

              {/* Lower 3' <- 5' Antiparallel Sugar-Phosphate Backbone */}
              <line
                x1={605}
                y1={575}
                x2={1440}
                y2={575}
                stroke="#F59E0B"
                strokeWidth={7}
                strokeLinecap="round"
              />

              {/* Alternating Deoxyribose Sugars (pentagons) & Phosphate groups along backbones */}
              {ZONE2_LADDER_RUNGS.map((rung) => (
                <g key={`sugars-${rung.x}`}>
                  {/* Upper Deoxyribose pentagon (5' -> 3' upright) */}
                  <polygon
                    points={pentagonPoints(rung.x, 465, 8.5, false)}
                    fill="#0284C7"
                    stroke="#E0F2FE"
                    strokeWidth={1.3}
                  />
                  {/* Upper Phosphate group */}
                  <circle
                    cx={rung.x - 41}
                    cy={465}
                    r={5.5}
                    fill="#FBBF24"
                    stroke="#FEF3C7"
                    strokeWidth={1.1}
                  />

                  {/* Lower Deoxyribose pentagon (3' <- 5' inverted to show antiparallel orientation!) */}
                  <polygon
                    points={pentagonPoints(rung.x, 575, 8.5, true)}
                    fill="#D97706"
                    stroke="#FEF3C7"
                    strokeWidth={1.3}
                  />
                  {/* Lower Phosphate group */}
                  <circle
                    cx={rung.x + 41}
                    cy={575}
                    r={5.5}
                    fill="#38BDF8"
                    stroke="#E0F2FE"
                    strokeWidth={1.1}
                  />
                </g>
              ))}

              {/* HIGHLIGHTED SINGLE NUCLEOTIDE CALLOUT AT (730, 465) - STEP 3 ANCHOR */}
              <g>
                <rect
                  x={676}
                  y={432}
                  width={84}
                  height={80}
                  rx={14}
                  fill="rgba(14, 165, 233, 0.14)"
                  stroke="#7DD3FC"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                />
                {/* Covalent phosphodiester bond */}
                <line
                  x1={696}
                  y1={450}
                  x2={724}
                  y2={463}
                  stroke="#FEF08A"
                  strokeWidth={2.8}
                />
                {/* Highlighted Phosphate Circle (P) */}
                <circle
                  cx={694}
                  cy={449}
                  r={11.5}
                  fill="#F59E0B"
                  stroke="#FFFBEB"
                  strokeWidth={2}
                  filter="url(#dnaSoftGlow)"
                />
                <text
                  x={694}
                  y={453}
                  textAnchor="middle"
                  fill="#0F172A"
                  fontSize={11}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                >
                  P
                </text>

                {/* Highlighted Pentagon Deoxyribose Sugar (S) at (730, 465) */}
                <polygon
                  points={pentagonPoints(730, 465, 13, false)}
                  fill="#0EA5E9"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                  filter="url(#dnaSoftGlow)"
                />
                <text
                  x={730}
                  y={469}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize={10.5}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                >
                  S
                </text>

                {/* Nucleotide Callout Label Pill */}
                <rect
                  x={612}
                  y={386}
                  width={238}
                  height={26}
                  rx={8}
                  fill="rgba(12, 74, 110, 0.92)"
                  stroke="rgba(125, 211, 252, 0.6)"
                  strokeWidth={1.2}
                />
                <text
                  x={731}
                  y={403}
                  textAnchor="middle"
                  fill="#E0F2FE"
                  fontSize={10.5}
                  fontWeight={800}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Nukleotid: Fosfat(P) + Sukker(S) + Base
                </text>
              </g>

              {/* Polarity End Badges & Antiparallel Direction Arrows */}
              <rect
                x={576}
                y={452}
                width={30}
                height={24}
                rx={7}
                fill="#0284C7"
                stroke="#BAE6FD"
                strokeWidth={1.5}
              />
              <text
                x={591}
                y={468}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={12}
                fontWeight={900}
                fontFamily="JetBrains Mono, monospace"
              >
                5&apos;
              </text>

              <rect
                x={576}
                y={563}
                width={30}
                height={24}
                rx={7}
                fill="#D97706"
                stroke="#FDE68A"
                strokeWidth={1.5}
              />
              <text
                x={591}
                y={579}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={12}
                fontWeight={900}
                fontFamily="JetBrains Mono, monospace"
              >
                3&apos;
              </text>

              {/* Upper 5' -> 3' directional banner */}
              <rect
                x={905}
                y={412}
                width={360}
                height={26}
                rx={8}
                fill="rgba(15, 23, 42, 0.88)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth={1.1}
              />
              <text
                x={1085}
                y={429}
                textAnchor="middle"
                fill="#7DD3FC"
                fontSize={11.5}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                5&apos; ─────────────────► 3&apos; (Sukker-fosfat)
              </text>

              {/* Lower 3' <- 5' antiparallel directional banner */}
              <rect
                x={905}
                y={602}
                width={360}
                height={26}
                rx={8}
                fill="rgba(15, 23, 42, 0.88)"
                stroke="rgba(245, 158, 11, 0.5)"
                strokeWidth={1.1}
              />
              <text
                x={1085}
                y={619}
                textAnchor="middle"
                fill="#FCD34D"
                fontSize={11.5}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                3&apos; ◄───────────────── 5&apos; (Antiparallell)
              </text>

              {/* Base-pair hydrogen bond legend pills */}
              <rect
                x={728}
                y={644}
                width={238}
                height={26}
                rx={9}
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(251, 113, 133, 0.5)"
                strokeWidth={1.1}
              />
              <text
                x={847}
                y={661}
                textAnchor="middle"
                fill="#FECDD3"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                A = T • 2 hydrogenbindinger
              </text>

              <rect
                x={992}
                y={644}
                width={242}
                height={26}
                rx={9}
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(45, 212, 191, 0.5)"
                strokeWidth={1.1}
              />
              <text
                x={1113}
                y={661}
                textAnchor="middle"
                fill="#99F6E4"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                C ≡ G • 3 hydrogenbindinger
              </text>
            </g>

            {/* ---------------------------------------------------------- */}
            {/* SONE 3: REPLIKASJONSGAFFELEN (Y-SPLITT, HELIKASE, POL, LIG)*/}
            {/* ---------------------------------------------------------- */}
            <g>
              {/* Unzipping half-rungs just ahead of Helicase (x = 1460..1510) */}
              <g opacity={0.9}>
                <line
                  x1={1466}
                  y1={460}
                  x2={1466}
                  y2={492}
                  stroke="#FDA4AF"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <line
                  x1={1466}
                  y1={548}
                  x2={1466}
                  y2={580}
                  stroke="#6EE7B7"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <line
                  x1={1504}
                  y1={438}
                  x2={1504}
                  y2={466}
                  stroke="#5EEAD4"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <line
                  x1={1504}
                  y1={574}
                  x2={1504}
                  y2={602}
                  stroke="#FCD34D"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </g>

              {/* Diverging Upper Parental Template Strand (y: 465 -> 392) */}
              <path
                d="M 1440 465 C 1495 465, 1520 392, 1580 392 L 2160 392"
                fill="none"
                stroke="#F59E0B"
                strokeWidth={6.5}
                strokeLinecap="round"
              />

              {/* Diverging Lower Parental Template Strand (y: 575 -> 648) */}
              <path
                d="M 1440 575 C 1495 575, 1520 648, 1580 648 L 2160 648"
                fill="none"
                stroke="#F59E0B"
                strokeWidth={6.5}
                strokeLinecap="round"
              />

              {/* HELIKASE Wedge Enzyme right at Y-apex (1545, 520) - Step 7 Anchor */}
              <g>
                <path
                  d="M 1492 520 L 1578 470 Q 1598 520 1578 570 Z"
                  fill="url(#dnaHelicaseGrad)"
                  stroke="#FEF08A"
                  strokeWidth={2.5}
                  filter="url(#dnaGlowStrong)"
                />
                {/* Helicase Title Plaque positioned cleanly above (1545, 520) */}
                <rect
                  x={1476}
                  y={442}
                  width={138}
                  height={25}
                  rx={8}
                  fill="rgba(120, 53, 15, 0.95)"
                  stroke="#FDE047"
                  strokeWidth={1.4}
                />
                <text
                  x={1545}
                  y={459}
                  textAnchor="middle"
                  fill="#FEF9C3"
                  fontSize={11.5}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.06em"
                >
                  HELIKASE
                </text>

                <rect
                  x={1472}
                  y={574}
                  width={146}
                  height={22}
                  rx={7}
                  fill="rgba(15, 23, 42, 0.9)"
                  stroke="rgba(251, 191, 36, 0.55)"
                  strokeWidth={1}
                />
                <text
                  x={1545}
                  y={589}
                  textAnchor="middle"
                  fill="#FDE68A"
                  fontSize={9.5}
                  fontWeight={700}
                  fontFamily="Inter, sans-serif"
                >
                  Åpner H-bindinger
                </text>
              </g>

              {/* UPPER FORK ARM (y ≈ 410): LEDENDE TRÅD + DNA-POLYMERASE */}
              <g>
                {/* Base-pair rungs between upper parental (392) and new leading strand (428) */}
                {LEADING_ARM_TICKS.map((tx, idx) => (
                  <line
                    key={`lead-tick-${tx}`}
                    x1={tx}
                    y1={395}
                    x2={tx}
                    y2={425}
                    stroke={idx % 2 === 0 ? '#5EEAD4' : '#6EE7B7'}
                    strokeWidth={2.8}
                    strokeDasharray="4 3"
                    opacity={0.85}
                  />
                ))}

                {/* Continuous New Complementary Leading Strand (5' -> 3' into the fork) */}
                <line
                  x1={2160}
                  y1={428}
                  x2={1614}
                  y2={428}
                  stroke="#14B8A6"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                  filter="url(#dnaSoftGlow)"
                />
                {/* Synthesis arrowhead pointing continuously toward the fork */}
                <polygon
                  points="1600,428 1620,418 1620,438"
                  fill="#5EEAD4"
                />

                {/* Glowing Capsule Enzyme: DNA-polymerase on Leading Strand */}
                <rect
                  x={1652}
                  y={404}
                  width={136}
                  height={38}
                  rx={19}
                  fill="url(#dnaPolymeraseGrad)"
                  stroke="#CCFBF1"
                  strokeWidth={2.2}
                  filter="url(#dnaSoftGlow)"
                />
                <text
                  x={1720}
                  y={427}
                  textAnchor="middle"
                  fill="#042F2E"
                  fontSize={11.5}
                  fontWeight={900}
                  fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                >
                  DNA-polymerase
                </text>

                {/* Upper arm labels */}
                <text
                  x={1925}
                  y={376}
                  textAnchor="middle"
                  fill="#FDE68A"
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Gammel maltråd (3&apos; på høyre side)
                </text>

                <rect
                  x={1806}
                  y={446}
                  width={268}
                  height={26}
                  rx={8}
                  fill="rgba(19, 78, 74, 0.9)"
                  stroke="rgba(45, 212, 191, 0.55)"
                  strokeWidth={1.2}
                />
                <text
                  x={1940}
                  y={463}
                  textAnchor="middle"
                  fill="#CCFBF1"
                  fontSize={11}
                  fontWeight={800}
                  fontFamily="JetBrains Mono, monospace"
                >
                  ◄── Ledende tråd (5&apos; → 3&apos; kontinuerlig)
                </text>
              </g>

              {/* LOWER FORK ARM (y ≈ 630): FORSINKET TRÅD, OKAZAKI-FRAGMENTER & DNA-LIGASE */}
              <g>
                {/* Okazaki Fragment 3 (newest, closest to fork: RNA primer + new DNA 5'->3') */}
                {[1632, 1662, 1692, 1722].map((tx) => (
                  <line
                    key={`ok3-${tx}`}
                    x1={tx}
                    y1={615}
                    x2={tx}
                    y2={645}
                    stroke="#5EEAD4"
                    strokeWidth={2.6}
                    strokeDasharray="4 3"
                  />
                ))}
                {/* RNA primer tip */}
                <line
                  x1={1618}
                  y1={612}
                  x2={1642}
                  y2={612}
                  stroke="#FB7185"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                />
                <line
                  x1={1642}
                  y1={612}
                  x2={1736}
                  y2={612}
                  stroke="#14B8A6"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                />
                <polygon points="1748,612 1732,604 1732,620" fill="#5EEAD4" />

                {/* Okazaki Fragment 2 (middle: x = 1766..1850) */}
                {[1778, 1808, 1838].map((tx) => (
                  <line
                    key={`ok2-${tx}`}
                    x1={tx}
                    y1={615}
                    x2={tx}
                    y2={645}
                    stroke="#6EE7B7"
                    strokeWidth={2.6}
                    strokeDasharray="4 3"
                  />
                ))}
                <line
                  x1={1766}
                  y1={612}
                  x2={1850}
                  y2={612}
                  stroke="#14B8A6"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                />

                {/* Okazaki Fragment 1 (joined rightward into daughter duplex: x = 1870..2160) */}
                {[1885, 1922, 1960, 1998, 2036, 2074, 2112].map((tx) => (
                  <line
                    key={`ok1-${tx}`}
                    x1={tx}
                    y1={615}
                    x2={tx}
                    y2={645}
                    stroke="#5EEAD4"
                    strokeWidth={2.6}
                    strokeDasharray="4 3"
                  />
                ))}
                <line
                  x1={1870}
                  y1={612}
                  x2={2160}
                  y2={612}
                  stroke="#14B8A6"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                />

                {/* DNA-LIGASE Enzyme Clamp at (1860, 625) sealing Okazaki fragments - Step 8 Anchor */}
                <rect
                  x={1826}
                  y={598}
                  width={68}
                  height={38}
                  rx={14}
                  fill="rgba(245, 158, 11, 0.28)"
                  stroke="#FBBF24"
                  strokeWidth={2.4}
                  filter="url(#dnaSoftGlow)"
                />

                {/* DNA-ligase & Okazaki Labels */}
                <rect
                  x={1606}
                  y={562}
                  width={186}
                  height={25}
                  rx={8}
                  fill="rgba(19, 78, 74, 0.9)"
                  stroke="rgba(45, 212, 191, 0.55)"
                  strokeWidth={1.1}
                />
                <text
                  x={1699}
                  y={578}
                  textAnchor="middle"
                  fill="#CCFBF1"
                  fontSize={10.5}
                  fontWeight={800}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Okazaki-fragmenter ──►
                </text>

                <rect
                  x={1804}
                  y={562}
                  width={124}
                  height={25}
                  rx={8}
                  fill="rgba(120, 53, 15, 0.94)"
                  stroke="#FBBF24"
                  strokeWidth={1.3}
                />
                <text
                  x={1866}
                  y={578}
                  textAnchor="middle"
                  fill="#FEF3C7"
                  fontSize={11}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                >
                  DNA-ligase
                </text>

                <text
                  x={1930}
                  y={676}
                  textAnchor="middle"
                  fill="#FDE68A"
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Forsinket tråd • bygges stykkevis (5&apos; → 3&apos;) langs gammel tråd
                </text>
              </g>
            </g>

            {/* ---------------------------------------------------------- */}
            {/* SONE 4: KORREKTURLESING, MUTASJON & 2 DATTER-DNA           */}
            {/* ---------------------------------------------------------- */}
            <g>
              {/* Complementary rungs inside Upper & Lower Semiconservative Daughter Duplexes */}
              {DAUGHTER_RUNGS_X.map((rx, idx) => {
                const isMutationSite = rx === 2220;
                return (
                  <g key={`daughter-rung-${rx}`}>
                    {/* Upper Daughter Duplex Rung */}
                    <line
                      x1={rx}
                      y1={395}
                      x2={rx}
                      y2={425}
                      stroke={
                        isMutationSite
                          ? '#FB7185'
                          : idx % 2 === 0
                            ? '#5EEAD4'
                            : '#FDE68A'
                      }
                      strokeWidth={isMutationSite ? 4.5 : 2.8}
                      strokeDasharray={isMutationSite ? undefined : '4 3'}
                    />

                    {/* Lower Daughter Duplex Rung */}
                    <line
                      x1={rx}
                      y1={615}
                      x2={rx}
                      y2={645}
                      stroke={idx % 2 === 0 ? '#6EE7B7' : '#5EEAD4'}
                      strokeWidth={2.8}
                      strokeDasharray="4 3"
                    />
                  </g>
                );
              })}

              {/* UPPER DAUGHTER DNA MOLECULE (1 old gold strand + 1 new turquoise strand) */}
              <line
                x1={2160}
                y1={392}
                x2={2640}
                y2={392}
                stroke="#F59E0B"
                strokeWidth={6.5}
                strokeLinecap="round"
              />
              <line
                x1={2160}
                y1={428}
                x2={2640}
                y2={428}
                stroke="#14B8A6"
                strokeWidth={6.5}
                strokeLinecap="round"
              />

              {/* LOWER DAUGHTER DNA MOLECULE (1 new turquoise strand + 1 old gold strand) */}
              <line
                x1={2160}
                y1={612}
                x2={2640}
                y2={612}
                stroke="#14B8A6"
                strokeWidth={6.5}
                strokeLinecap="round"
              />
              <line
                x1={2160}
                y1={648}
                x2={2640}
                y2={648}
                stroke="#F59E0B"
                strokeWidth={6.5}
                strokeLinecap="round"
              />

              {/* End polarity tags on the 2 completed daughter molecules */}
              <text
                x={2658}
                y={396}
                fill="#FCD34D"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                3&apos;
              </text>
              <text
                x={2658}
                y={432}
                fill="#5EEAD4"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                5&apos;
              </text>
              <text
                x={2658}
                y={616}
                fill="#5EEAD4"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                3&apos;
              </text>
              <text
                x={2658}
                y={652}
                fill="#FCD34D"
                fontSize={11}
                fontWeight={800}
                fontFamily="JetBrains Mono, monospace"
              >
                5&apos;
              </text>

              {/* Semiconservative strand labels */}
              <rect
                x={2362}
                y={356}
                width={272}
                height={24}
                rx={8}
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(52, 211, 153, 0.45)"
                strokeWidth={1}
              />
              <text
                x={2498}
                y={372}
                textAnchor="middle"
                fill="#D1FAE5"
                fontSize={10.5}
                fontWeight={700}
                fontFamily="JetBrains Mono, monospace"
              >
                Datter-DNA 1: 1 gammel + 1 ny tråd
              </text>

              <rect
                x={2362}
                y={662}
                width={272}
                height={24}
                rx={8}
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(52, 211, 153, 0.45)"
                strokeWidth={1}
              />
              <text
                x={2498}
                y={678}
                textAnchor="middle"
                fill="#D1FAE5"
                fontSize={10.5}
                fontWeight={700}
                fontFamily="JetBrains Mono, monospace"
              >
                Datter-DNA 2: 1 gammel + 1 ny tråd
              </text>

              {/* PROOFREADING / POINT MUTATION MARKER AT (2220, 410) - Step 9 Anchor */}
              <g>
                <circle
                  cx={2220}
                  cy={410}
                  r={33}
                  fill="rgba(251, 113, 133, 0.14)"
                  stroke="#FB7185"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                />
                <circle
                  cx={2220}
                  cy={410}
                  r={24}
                  fill="none"
                  stroke="#F97316"
                  strokeWidth={2.2}
                  filter="url(#dnaSoftGlow)"
                />
                <rect
                  x={2160}
                  y={446}
                  width={196}
                  height={25}
                  rx={8}
                  fill="rgba(136, 19, 55, 0.92)"
                  stroke="rgba(251, 113, 133, 0.65)"
                  strokeWidth={1.2}
                />
                <text
                  x={2258}
                  y={462}
                  textAnchor="middle"
                  fill="#FFE4E6"
                  fontSize={10.5}
                  fontWeight={800}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Korrektur / Punktmutasjon
                </text>
              </g>

              {/* 2 IDENTICAL DAUGHTER DNA BRACKET AT (2500, 520) - Step 10 Anchor */}
              <g>
                {/* Luminous connecting bracket between upper (434) and lower (606) daughter duplexes */}
                <path
                  d="M 2472 436 L 2500 456 L 2500 584 L 2472 604"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dnaSoftGlow)"
                />
                <path
                  d="M 2528 436 L 2500 456 M 2528 604 L 2500 584"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <circle
                  cx={2500}
                  cy={520}
                  r={26}
                  fill="rgba(6, 78, 59, 0.55)"
                  stroke="#6EE7B7"
                  strokeWidth={2}
                />

                {/* Plaque above & below (2500, 520) so the anchor pin is unobstructed */}
                <rect
                  x={2384}
                  y={466}
                  width={232}
                  height={24}
                  rx={8}
                  fill="rgba(6, 78, 59, 0.95)"
                  stroke="rgba(52, 211, 153, 0.65)"
                  strokeWidth={1.2}
                />
                <text
                  x={2500}
                  y={482}
                  textAnchor="middle"
                  fill="#ECFDF5"
                  fontSize={10.5}
                  fontWeight={800}
                  fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                >
                  2 identiske datter-DNA
                </text>

                <rect
                  x={2376}
                  y={550}
                  width={248}
                  height={24}
                  rx={8}
                  fill="rgba(15, 23, 42, 0.94)"
                  stroke="rgba(52, 211, 153, 0.5)"
                  strokeWidth={1.1}
                />
                <text
                  x={2500}
                  y={566}
                  textAnchor="middle"
                  fill="#A7F3D0"
                  fontSize={10}
                  fontWeight={700}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Søsterkromatider → Arv & evolusjon
                </text>
              </g>
            </g>
          </g>

          {/* ========================================================== */}
          {/* STEP CARDS (1..10), LEADER LINES & MODEL ANCHOR PINS       */}
          {/* ========================================================== */}
          {orderedNodes.map((node) => {
            const isUnlocked = node.stepIndex <= effectiveMaxStep;
            const isSelected = node.id === selectedNode.id;
            const palette = getStagePalette(node.stageCategory);

            const cardX = node.x - CARD_WIDTH / 2;
            const cardY = node.y - CARD_HEIGHT / 2;

            const ghostWidth = 236;
            const ghostHeight = 64;
            const ghostX = node.x - ghostWidth / 2;
            const ghostY =
              node.cardSide === 'above'
                ? cardY + CARD_HEIGHT - ghostHeight
                : cardY;

            const leaderStartY = isUnlocked
              ? node.cardSide === 'above'
                ? cardY + CARD_HEIGHT
                : cardY
              : node.cardSide === 'above'
                ? ghostY + ghostHeight
                : ghostY;

            const leaderPath = buildAnchorLeaderPath(
              node.x,
              leaderStartY,
              node.anchorX,
              node.anchorY,
            );

            const badgeLabel = `Steg ${node.stepNumber} • ${palette.stageLabel}`;
            const badgeWidth = Math.min(212, Math.max(114, badgeLabel.length * 6.3 + 16));
            const shortTitleFontSize =
              node.shortLabel.length > 25
                ? 12.4
                : node.shortLabel.length > 21
                  ? 13.4
                  : 14.5;
            const formulaFontSize =
              node.formulaTag.length > 40
                ? 8.5
                : node.formulaTag.length > 33
                  ? 9.2
                  : 10.2;

            return (
              <g key={node.id} id={`dna-step-node-${node.id}`}>
                {/* Glowing halo behind unlocked leader curve */}
                {isUnlocked && (
                  <path
                    d={leaderPath}
                    fill="none"
                    stroke={palette.accent}
                    strokeWidth={isSelected ? 9 : 4.5}
                    strokeLinecap="round"
                    opacity={isSelected ? 0.34 : 0.12}
                    className="pointer-events-none"
                  />
                )}

                {/* Crisp leader curve from card edge to exact DNA model anchor */}
                <path
                  d={leaderPath}
                  fill="none"
                  stroke={
                    isSelected
                      ? palette.stroke
                      : isUnlocked
                        ? palette.accent
                        : 'rgba(148, 163, 184, 0.25)'
                  }
                  strokeWidth={isSelected ? 3.4 : isUnlocked ? 2.1 : 1.6}
                  strokeDasharray={isUnlocked ? undefined : '6 6'}
                  strokeLinecap="round"
                  className="pointer-events-none"
                />

                {/* Clickable Numbered Anchor Dot directly on the DNA / Fork Model */}
                <g
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragRef.current?.moved) return;
                    onSelectNode(node.id);
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.anchorX}
                    cy={node.anchorY}
                    r={26}
                    fill="transparent"
                  />

                  {isSelected && (
                    <>
                      <circle
                        cx={node.anchorX}
                        cy={node.anchorY}
                        r={26}
                        fill="none"
                        stroke={palette.stroke}
                        strokeWidth={2.5}
                        className="node-pulse-ring"
                      />
                      <circle
                        cx={node.anchorX}
                        cy={node.anchorY}
                        r={20}
                        fill="none"
                        stroke={palette.accent}
                        strokeWidth={2}
                        opacity={0.9}
                      />
                    </>
                  )}

                  <circle
                    cx={node.anchorX}
                    cy={node.anchorY}
                    r={isSelected ? 14.5 : isUnlocked ? 12 : 10}
                    fill={
                      isSelected
                        ? palette.accent
                        : isUnlocked
                          ? '#0B1120'
                          : 'rgba(15, 23, 42, 0.88)'
                    }
                    stroke={
                      isSelected
                        ? '#FFFFFF'
                        : isUnlocked
                          ? palette.stroke
                          : 'rgba(148, 163, 184, 0.45)'
                    }
                    strokeWidth={isSelected ? 3 : 2.2}
                    filter={isSelected ? 'url(#dnaGlowStrong)' : undefined}
                  />

                  <text
                    x={node.anchorX}
                    y={node.anchorY + 4.2}
                    textAnchor="middle"
                    fill={
                      isSelected
                        ? '#04111F'
                        : isUnlocked
                          ? '#F8FAFC'
                          : '#94A3B8'
                    }
                    fontSize={isSelected ? 12.5 : 11}
                    fontWeight={900}
                    fontFamily="JetBrains Mono, monospace"
                    className="pointer-events-none"
                  >
                    {node.stepNumber}
                  </text>
                </g>

                {/* Step Card (Unlocked Full Card vs. Locked Clickable Ghost Card) */}
                {isUnlocked ? (
                  <g
                    onClick={(e) => {
                      e.stopPropagation();
                      if (dragRef.current?.moved) return;
                      onSelectNode(node.id);
                    }}
                    className="cursor-pointer"
                  >
                    <rect
                      x={cardX}
                      y={cardY}
                      width={CARD_WIDTH}
                      height={CARD_HEIGHT}
                      rx={16}
                      fill={
                        isSelected
                          ? 'rgba(15, 23, 42, 0.97)'
                          : 'rgba(9, 14, 26, 0.92)'
                      }
                      stroke={isSelected ? palette.stroke : palette.badgeBorder}
                      strokeWidth={isSelected ? 2.8 : 1.5}
                      filter={isSelected ? 'url(#dnaGlowStrong)' : undefined}
                    />

                    {/* 16:9 Step Illustration Thumbnail */}
                    <image
                      href={node.image}
                      x={node.x - 114}
                      y={cardY + 10}
                      width={228}
                      height={104}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-dna-card-img-${node.id})`}
                    />
                    <rect
                      x={node.x - 114}
                      y={cardY + 10}
                      width={228}
                      height={104}
                      rx={11}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.14)"
                      strokeWidth={1}
                    />

                    {/* Stage badge overlaid on thumbnail */}
                    <rect
                      x={node.x - 106}
                      y={cardY + 17}
                      width={badgeWidth}
                      height={22}
                      rx={7}
                      fill={palette.badgeBg}
                      stroke={palette.badgeBorder}
                      strokeWidth={1}
                    />
                    <text
                      x={node.x - 106 + badgeWidth / 2}
                      y={cardY + 32}
                      textAnchor="middle"
                      fill={palette.text}
                      fontSize={9.8}
                      fontWeight={800}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {badgeLabel}
                    </text>

                    {/* Step Short Title */}
                    <text
                      x={node.x}
                      y={cardY + 137}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={shortTitleFontSize}
                      fontWeight={800}
                      fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                    >
                      {node.shortLabel}
                    </text>

                    {/* Era / Subtitle */}
                    <text
                      x={node.x}
                      y={cardY + 157}
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize={10.8}
                      fontWeight={500}
                      fontFamily="Inter, sans-serif"
                    >
                      {node.eraLabel}
                    </text>

                    {/* Formula / Molecular Tag Pill */}
                    <rect
                      x={node.x - 116}
                      y={cardY + 169}
                      width={232}
                      height={24}
                      rx={8}
                      fill="rgba(30, 41, 59, 0.92)"
                      stroke={palette.badgeBorder}
                      strokeWidth={1}
                    />
                    <text
                      x={node.x}
                      y={cardY + 184.5}
                      textAnchor="middle"
                      fill={palette.stroke}
                      fontSize={formulaFontSize}
                      fontWeight={700}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.formulaTag}
                    </text>
                  </g>
                ) : (
                  /* Locked future step ghost card (clickable to jump straight to that step) */
                  <g
                    opacity={0.64}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (dragRef.current?.moved) return;
                      onSelectNode(node.id);
                    }}
                    className="cursor-pointer"
                  >
                    <rect
                      x={ghostX}
                      y={ghostY}
                      width={ghostWidth}
                      height={ghostHeight}
                      rx={14}
                      fill="rgba(15, 23, 42, 0.78)"
                      stroke="rgba(148, 163, 184, 0.35)"
                      strokeWidth={1.3}
                      strokeDasharray="6 4"
                    />
                    <text
                      x={node.x}
                      y={ghostY + 27}
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize={node.shortLabel.length > 23 ? 10.8 : 12}
                      fontWeight={700}
                      fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                    >
                      Steg {node.stepNumber}: {node.shortLabel}
                    </text>
                    <text
                      x={node.x}
                      y={ghostY + 46}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize={10}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Neste steg / klikk for å åpne
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
