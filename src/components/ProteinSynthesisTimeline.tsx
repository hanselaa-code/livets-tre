import { Dna, Focus, Maximize2, Minus, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PROTEIN_NODE_MAP,
  PROTEIN_NODES,
  type ProteinPhaseCategory,
  type ProteinTimelineNodeData,
} from '../data/proteinSynthesisData';

interface ProteinSynthesisTimelineProps {
  unlockedStepIndex: number;
  showAllSteps: boolean;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

function getPhasePalette(phase: ProteinPhaseCategory) {
  switch (phase) {
    case 'nucleus':
      return {
        accent: '#38BDF8',
        stroke: '#BAE6FD',
        badgeBg: 'rgba(12, 74, 110, 0.85)',
        badgeBorder: 'rgba(56, 189, 248, 0.5)',
        text: '#E0F2FE',
        phaseLabel: 'Cellekjernen',
      };
    case 'nuclear_pore':
      return {
        accent: '#F59E0B',
        stroke: '#FDE68A',
        badgeBg: 'rgba(120, 53, 15, 0.85)',
        badgeBorder: 'rgba(251, 191, 36, 0.55)',
        text: '#FEF3C7',
        phaseLabel: 'Kjernepore',
      };
    case 'translation':
      return {
        accent: '#14B8A6',
        stroke: '#99F6E4',
        badgeBg: 'rgba(19, 78, 74, 0.85)',
        badgeBorder: 'rgba(45, 212, 191, 0.5)',
        text: '#CCFBF1',
        phaseLabel: 'Ribosom',
      };
    case 'folding':
    default:
      return {
        accent: '#10B981',
        stroke: '#A7F3D0',
        badgeBg: 'rgba(6, 78, 59, 0.85)',
        badgeBorder: 'rgba(52, 211, 153, 0.55)',
        text: '#D1FAE5',
        phaseLabel: '3D-protein',
      };
  }
}

function buildSegmentPath(a: ProteinTimelineNodeData, b: ProteinTimelineNodeData): string {
  const dx = b.x - a.x;
  const c1x = a.x + dx * 0.45;
  const c2x = b.x - dx * 0.45;
  return `M ${a.x} ${a.y} C ${c1x} ${a.y}, ${c2x} ${b.y}, ${b.x} ${b.y}`;
}

const CODON_RIBBON_BLOCKS: { x: number; bases: string; role: string; color: string }[] = [
  { x: 1455, bases: "5'-hette", role: 'Inngang', color: '#10B981' },
  { x: 1595, bases: 'AUG', role: 'Start (Met)', color: '#34D399' },
  { x: 1735, bases: 'GGC', role: 'Glysin', color: '#38BDF8' },
  { x: 1875, bases: 'UAC', role: 'Tyrosin', color: '#2DD4BF' },
  { x: 2015, bases: 'AAG', role: 'Lysin', color: '#FBBF24' },
  { x: 2155, bases: 'GUU', role: 'Valin', color: '#A78BFA' },
  { x: 2295, bases: 'UAA', role: 'STOPP', color: '#FB7185' },
  { x: 2435, bases: "Poly-A 3'", role: 'Hale', color: '#F59E0B' },
];

export function ProteinSynthesisTimeline({
  unlockedStepIndex,
  showAllSteps,
  selectedNodeId,
  onSelectNode,
}: ProteinSynthesisTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 960, height: 680 });
  const [camera, setCamera] = useState({ x: 390, y: 470, scale: 0.88 });
  const [cameraMode, setCameraMode] = useState<'follow' | 'overview' | 'manual'>('follow');
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    camStartX: number;
    camStartY: number;
    moved: boolean;
  } | null>(null);

  const effectiveMaxStep = showAllSteps ? PROTEIN_NODES.length - 1 : unlockedStepIndex;

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

  const computeFollowCamera = useCallback(
    (targetNodeId: string) => {
      const selected = PROTEIN_NODE_MAP[targetNodeId] ?? PROTEIN_NODES[0];
      const prevNode = PROTEIN_NODES[Math.max(0, selected.stepIndex - 1)];
      const nextNode =
        PROTEIN_NODES[Math.min(PROTEIN_NODES.length - 1, selected.stepIndex + 1)];

      const minX = Math.min(selected.x - 210, prevNode.x - 130);
      const maxX = Math.max(selected.x + 210, nextNode.x + 130);

      const spanX = Math.max(820, maxX - minX + 120);
      const spanY = 760;

      const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
      const clampedScale = Math.max(0.52, Math.min(1.06, rawScale));

      const focusCenterX = selected.x * 0.62 + ((prevNode.x + nextNode.x) / 2) * 0.38;
      const focusCenterY = selected.cardSide === 'above' ? 485 : 555;

      return {
        x: focusCenterX,
        y: focusCenterY,
        scale: clampedScale,
      };
    },
    [viewport.height, viewport.width],
  );

  const computeOverviewCamera = useCallback(() => {
    const minX = 70;
    const maxX = 3170;
    const spanX = maxX - minX + 110;
    const spanY = 860;
    const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
    const scale = Math.max(0.24, Math.min(0.85, rawScale));

    return {
      x: (minX + maxX) / 2,
      y: 525,
      scale,
    };
  }, [viewport.height, viewport.width]);

  useEffect(() => {
    if (showAllSteps) {
      setCameraMode('overview');
    } else {
      setCameraMode('follow');
    }
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

  const segments = useMemo(() => {
    const list: {
      from: ProteinTimelineNodeData;
      to: ProteinTimelineNodeData;
      path: string;
      unlocked: boolean;
    }[] = [];
    for (let i = 0; i < PROTEIN_NODES.length - 1; i += 1) {
      const from = PROTEIN_NODES[i];
      const to = PROTEIN_NODES[i + 1];
      list.push({
        from,
        to,
        path: buildSegmentPath(from, to),
        unlocked: to.stepIndex <= effectiveMaxStep,
      });
    }
    return list;
  }, [effectiveMaxStep]);

  const selectedNode = PROTEIN_NODE_MAP[selectedNodeId] ?? PROTEIN_NODES[0];
  const translateX = viewport.width / 2 - camera.x * camera.scale;
  const translateY = viewport.height / 2 - camera.y * camera.scale;

  return (
    <div
      ref={containerRef}
      id="protein-synthesis-timeline-canvas"
      className="relative w-full h-full overflow-hidden rounded-2xl glass-panel select-none"
    >
      {/* Top-left phase legend */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl glass-subtle text-[11px] sm:text-xs text-slate-200 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 font-semibold text-sky-300">
          <Dna className="w-3.5 h-3.5 text-sky-400" />
          <span>1–4: Cellekjernen</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">→</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.85)]" />
          <span>5–8: Ribosom</span>
        </span>
        <span className="text-slate-600 hidden md:inline">→</span>
        <span className="hidden md:inline-flex items-center gap-1.5 font-semibold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>9–10: 3D-protein</span>
        </span>
      </div>

      {/* Top-right camera controls */}
      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1.5">
        <button
          id="btn-prot-camera-follow"
          type="button"
          onClick={() => setCameraMode('follow')}
          title="Følg aktivt steg langs tidslinjen"
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
          id="btn-prot-camera-overview"
          type="button"
          onClick={() => setCameraMode('overview')}
          title="Zoom ut og se hele tidslinjen (Steg 1–10)"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            cameraMode === 'overview'
              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.25)]'
              : 'glass-subtle text-slate-300 hover:text-white'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hele tidslinjen</span>
        </button>

        <div className="hidden md:flex items-center rounded-lg glass-subtle overflow-hidden">
          <button
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

      {/* Bottom-left central dogma flow hint */}
      <div className="hidden sm:flex absolute bottom-3 left-3.5 z-10 items-center gap-2 px-3 py-1.5 rounded-lg glass-subtle text-[11px] text-slate-300 pointer-events-none">
        <span className="font-mono-time text-sky-300 font-semibold">DNA</span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-amber-300 font-semibold">mRNA</span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-teal-300 font-semibold">Polypeptid</span>
        <span className="text-slate-500">→</span>
        <span className="font-mono-time text-emerald-300 font-semibold">3D-protein</span>
        <span className="text-slate-600 mx-1">•</span>
        <span className="text-slate-400">Dra for å panorere • Klikk på et steg</span>
      </div>

      <svg
        role="img"
        aria-label="Interaktiv tidslinje for proteinsyntesen fra DNA i cellekjernen til ferdig protein"
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
          <filter id="protGlowStrong" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="nucleusZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="cytoplasmZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="foldingZoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="timelineSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#FBBF24" />
            <stop offset="72%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          {PROTEIN_NODES.map((node) => {
            const cardY = node.cardSide === 'above' ? node.y - 294 : node.y + 84;
            return (
              <clipPath key={`clip-${node.id}`} id={`clip-card-img-${node.id}`}>
                <rect
                  x={node.x - 118}
                  y={cardY + 10}
                  width={236}
                  height={110}
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
          {/* CELLULAR ZONE BACKDROPS ALONG THE TIMELINE                 */}
          {/* ========================================================== */}

          {/* ZONE 1: CELLEKJERNEN (STEG 1-4) */}
          <g>
            <rect
              x={75}
              y={120}
              width={1210}
              height={830}
              rx={42}
              fill="url(#nucleusZoneGrad)"
              stroke="rgba(56, 189, 248, 0.32)"
              strokeWidth={2}
            />
            <rect
              x={105}
              y={144}
              width={430}
              height={42}
              rx={12}
              fill="rgba(12, 74, 110, 0.72)"
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth={1.2}
            />
            <text
              x={124}
              y={170}
              fill="#BAE6FD"
              fontSize={13.5}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.06em"
            >
              FASE 1 • INNE I CELLEKJERNEN (TRANSKRIPSJON)
            </text>

            {/* Decorative subtle DNA double-helix background ribbon in Zone 1 */}
            <path
              d="M 120 540 Q 240 490, 360 540 T 600 540 T 840 540 T 1080 540"
              fill="none"
              stroke="rgba(56, 189, 248, 0.14)"
              strokeWidth={3}
            />
            <path
              d="M 120 540 Q 240 590, 360 540 T 600 540 T 840 540 T 1080 540"
              fill="none"
              stroke="rgba(125, 211, 252, 0.11)"
              strokeWidth={3}
            />
          </g>

          {/* NUCLEAR MEMBRANE + GLOWING NUCLEAR PORE GATEWAY AT x = 1300 */}
          <g>
            {/* Upper double nuclear membrane wall */}
            <line
              x1={1292}
              y1={132}
              x2={1292}
              y2={492}
              stroke="rgba(251, 191, 36, 0.55)"
              strokeWidth={4}
              strokeDasharray="10 5"
            />
            <line
              x1={1308}
              y1={132}
              x2={1308}
              y2={492}
              stroke="rgba(251, 191, 36, 0.55)"
              strokeWidth={4}
              strokeDasharray="10 5"
            />

            {/* Lower double nuclear membrane wall */}
            <line
              x1={1292}
              y1={588}
              x2={1292}
              y2={940}
              stroke="rgba(251, 191, 36, 0.55)"
              strokeWidth={4}
              strokeDasharray="10 5"
            />
            <line
              x1={1308}
              y1={588}
              x2={1308}
              y2={940}
              stroke="rgba(251, 191, 36, 0.55)"
              strokeWidth={4}
              strokeDasharray="10 5"
            />

            {/* Glowing nuclear pore ring where mRNA passes out at y = 540 */}
            <ellipse
              cx={1300}
              cy={540}
              rx={24}
              ry={48}
              fill="rgba(245, 158, 11, 0.14)"
              stroke="#FBBF24"
              strokeWidth={2.6}
              filter="url(#protGlowStrong)"
            />
            <rect
              x={1216}
              y={452}
              width={168}
              height={26}
              rx={8}
              fill="rgba(120, 53, 15, 0.9)"
              stroke="rgba(251, 191, 36, 0.6)"
              strokeWidth={1.1}
            />
            <text
              x={1300}
              y={469}
              textAnchor="middle"
              fill="#FDE68A"
              fontSize={11}
              fontWeight={800}
              fontFamily="JetBrains Mono, monospace"
            >
              KJERNEPORE →
            </text>
          </g>

          {/* ZONE 2: CYTOPLASMA & RIBOSOMET (STEG 5-8) */}
          <g>
            <rect
              x={1325}
              y={120}
              width={1205}
              height={830}
              rx={42}
              fill="url(#cytoplasmZoneGrad)"
              stroke="rgba(45, 212, 191, 0.30)"
              strokeWidth={2}
            />
            <rect
              x={1355}
              y={144}
              width={460}
              height={42}
              rx={12}
              fill="rgba(19, 78, 74, 0.78)"
              stroke="rgba(45, 212, 191, 0.48)"
              strokeWidth={1.2}
            />
            <text
              x={1375}
              y={170}
              fill="#99F6E4"
              fontSize={13.5}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.06em"
            >
              FASE 2 • CYTOPLASMA & RIBOSOM (TRANSLASJON)
            </text>

            {/* Visual mRNA codon strip along Zone 2 */}
            <g opacity={effectiveMaxStep >= 4 ? 0.96 : 0.35}>
              <line
                x1={1405}
                y1={906}
                x2={2490}
                y2={906}
                stroke="rgba(251, 191, 36, 0.45)"
                strokeWidth={3}
              />
              {CODON_RIBBON_BLOCKS.map((codon) => (
                <g key={codon.bases} transform={`translate(${codon.x}, 886)`}>
                  <rect
                    x={-48}
                    y={0}
                    width={96}
                    height={38}
                    rx={9}
                    fill="rgba(15, 23, 42, 0.92)"
                    stroke={codon.color}
                    strokeWidth={1.3}
                  />
                  <text
                    x={0}
                    y={16}
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize={11.5}
                    fontWeight={800}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {codon.bases}
                  </text>
                  <text
                    x={0}
                    y={30}
                    textAnchor="middle"
                    fill={codon.color}
                    fontSize={9.5}
                    fontWeight={700}
                    fontFamily="Inter, sans-serif"
                  >
                    {codon.role}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* ZONE 3: FOLDING, ER / GOLGI & FERDIG PROTEIN (STEG 9-10) */}
          <g>
            <rect
              x={2555}
              y={120}
              width={610}
              height={830}
              rx={42}
              fill="url(#foldingZoneGrad)"
              stroke="rgba(52, 211, 153, 0.35)"
              strokeWidth={2}
            />
            <rect
              x={2585}
              y={144}
              width={450}
              height={42}
              rx={12}
              fill="rgba(6, 78, 59, 0.8)"
              stroke="rgba(52, 211, 153, 0.5)"
              strokeWidth={1.2}
            />
            <text
              x={2605}
              y={170}
              fill="#A7F3D0"
              fontSize={13.5}
              fontWeight={800}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              letterSpacing="0.06em"
            >
              FASE 3 • 3D-FOLDING, GOLGI & FERDIG PROTEIN
            </text>
          </g>

          {/* ========================================================== */}
          {/* TIMELINE SPINE SEGMENTS (LOCKED GHOST + UNLOCKED GLOWING)  */}
          {/* ========================================================== */}
          {segments.map((seg) => (
            <g key={`${seg.from.id}-${seg.to.id}`}>
              {/* Subtle base track */}
              <path
                d={seg.path}
                fill="none"
                stroke="rgba(148, 163, 184, 0.22)"
                strokeWidth={8}
                strokeLinecap="round"
              />

              {seg.unlocked ? (
                <>
                  <path
                    d={seg.path}
                    fill="none"
                    stroke="url(#timelineSpineGrad)"
                    strokeWidth={12}
                    strokeOpacity={0.25}
                    strokeLinecap="round"
                  />
                  <path
                    d={seg.path}
                    fill="none"
                    stroke="url(#timelineSpineGrad)"
                    strokeWidth={5}
                    strokeLinecap="round"
                  />
                  {/* Midpoint directional chevron pill */}
                  <g
                    transform={`translate(${(seg.from.x + seg.to.x) / 2}, ${
                      (seg.from.y + seg.to.y) / 2
                    })`}
                  >
                    <circle
                      r={11}
                      fill="#0F172A"
                      stroke="rgba(148, 163, 184, 0.45)"
                      strokeWidth={1.2}
                    />
                    <path
                      d="M -3 -4 L 3 0 L -3 4"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </>
              ) : (
                <path
                  d={seg.path}
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.35)"
                  strokeWidth={2.5}
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}

          {/* ========================================================== */}
          {/* TIMELINE STATIONS (1..10) & MILESTONE CARDS                */}
          {/* ========================================================== */}
          {PROTEIN_NODES.map((node) => {
            const isUnlocked = node.stepIndex <= effectiveMaxStep;
            const isSelected = node.id === selectedNode.id;
            const palette = getPhasePalette(node.phaseCategory);

            const cardWidth = 256;
            const cardHeight = 210;
            const cardX = node.x - cardWidth / 2;
            const cardY = node.cardSide === 'above' ? node.y - 294 : node.y + 84;
            const stemY1 = node.cardSide === 'above' ? node.y - 24 : node.y + 24;
            const stemY2 =
              node.cardSide === 'above' ? cardY + cardHeight : cardY;

            return (
              <g
                key={node.id}
                id={`timeline-node-${node.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragRef.current?.moved) return;
                  onSelectNode(node.id);
                }}
                className="cursor-pointer"
              >
                {/* Vertical connector stem between timeline station and milestone card */}
                <line
                  x1={node.x}
                  y1={stemY1}
                  x2={node.x}
                  y2={stemY2}
                  stroke={
                    isSelected
                      ? palette.stroke
                      : isUnlocked
                        ? palette.accent
                        : 'rgba(148, 163, 184, 0.3)'
                  }
                  strokeWidth={isSelected ? 3.2 : 2}
                  strokeDasharray={isUnlocked ? undefined : '5 5'}
                />

                {/* Pulse halo around currently selected station */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={32}
                    fill="none"
                    stroke={palette.accent}
                    strokeWidth={2.5}
                    className="node-pulse-ring"
                  />
                )}

                {/* Station circle on the timeline spine */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 24 : 20}
                  fill={
                    isUnlocked ? palette.accent : 'rgba(15, 23, 42, 0.92)'
                  }
                  stroke={
                    isSelected
                      ? '#FFFFFF'
                      : isUnlocked
                        ? palette.stroke
                        : 'rgba(148, 163, 184, 0.45)'
                  }
                  strokeWidth={isSelected ? 3.5 : 2.2}
                  filter={isSelected ? 'url(#protGlowStrong)' : undefined}
                />

                {/* Step number inside station circle */}
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={isUnlocked ? '#04111F' : '#94A3B8'}
                  fontSize={isSelected ? 15 : 13.5}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.stepNumber}
                </text>

                {/* Milestone card */}
                {isUnlocked ? (
                  <g>
                    <rect
                      x={cardX}
                      y={cardY}
                      width={cardWidth}
                      height={cardHeight}
                      rx={16}
                      fill={
                        isSelected
                          ? 'rgba(15, 23, 42, 0.97)'
                          : 'rgba(9, 14, 26, 0.92)'
                      }
                      stroke={isSelected ? palette.stroke : palette.badgeBorder}
                      strokeWidth={isSelected ? 2.8 : 1.5}
                      filter={isSelected ? 'url(#protGlowStrong)' : undefined}
                    />

                    {/* 16:9 Step Illustration Thumbnail inside card */}
                    <image
                      href={node.image}
                      x={node.x - 118}
                      y={cardY + 10}
                      width={236}
                      height={110}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-card-img-${node.id})`}
                    />
                    <rect
                      x={node.x - 118}
                      y={cardY + 10}
                      width={236}
                      height={110}
                      rx={11}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.14)"
                      strokeWidth={1}
                    />

                    {/* Top-left phase badge overlaid on thumbnail */}
                    <rect
                      x={node.x - 110}
                      y={cardY + 18}
                      width={108}
                      height={22}
                      rx={7}
                      fill={palette.badgeBg}
                      stroke={palette.badgeBorder}
                      strokeWidth={1}
                    />
                    <text
                      x={node.x - 56}
                      y={cardY + 33}
                      textAnchor="middle"
                      fill={palette.text}
                      fontSize={10}
                      fontWeight={800}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Steg {node.stepNumber} • {palette.phaseLabel}
                    </text>

                    {/* Step Short Title */}
                    <text
                      x={node.x}
                      y={cardY + 145}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={15}
                      fontWeight={800}
                      fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                    >
                      {node.shortLabel}
                    </text>

                    {/* Era / subtitle */}
                    <text
                      x={node.x}
                      y={cardY + 165}
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize={11.5}
                      fontWeight={500}
                      fontFamily="Inter, sans-serif"
                    >
                      {node.eraLabel}
                    </text>

                    {/* Molecular summary pill */}
                    <rect
                      x={node.x - 114}
                      y={cardY + 176}
                      width={228}
                      height={24}
                      rx={8}
                      fill="rgba(30, 41, 59, 0.9)"
                      stroke={palette.badgeBorder}
                      strokeWidth={1}
                    />
                    <text
                      x={node.x}
                      y={cardY + 192}
                      textAnchor="middle"
                      fill={palette.stroke}
                      fontSize={10.5}
                      fontWeight={700}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.molecularTag}
                    </text>
                  </g>
                ) : (
                  /* Locked future step ghost card (still clickable to jump straight to that step) */
                  <g opacity={0.62}>
                    <rect
                      x={node.x - 106}
                      y={
                        node.cardSide === 'above'
                          ? node.y - 148
                          : node.y + 84
                      }
                      width={212}
                      height={64}
                      rx={14}
                      fill="rgba(15, 23, 42, 0.78)"
                      stroke="rgba(148, 163, 184, 0.35)"
                      strokeWidth={1.3}
                      strokeDasharray="6 4"
                    />
                    <text
                      x={node.x}
                      y={
                        (node.cardSide === 'above'
                          ? node.y - 148
                          : node.y + 84) + 27
                      }
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize={12.5}
                      fontWeight={700}
                      fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                    >
                      Steg {node.stepNumber}: {node.shortLabel}
                    </text>
                    <text
                      x={node.x}
                      y={
                        (node.cardSide === 'above'
                          ? node.y - 148
                          : node.y + 84) + 46
                      }
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize={10.5}
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
