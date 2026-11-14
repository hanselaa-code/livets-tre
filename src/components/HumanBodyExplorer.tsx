import { Focus, Maximize2, Minus, Plus, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BODY_NODE_MAP,
  BODY_NODES,
  CENTRAL_HUMAN_IMAGE,
  type BodyTraceNodeData,
} from '../data/humanBodyData';

interface HumanBodyExplorerProps {
  unlockedStepIndex: number;
  showAllSteps: boolean;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

const CARD_W = 336;
const CARD_H = 92;

function getTraceColors(node: BodyTraceNodeData) {
  switch (node.traceType) {
    case 'vestigial':
      return {
        fill: '#F59E0B',
        stroke: '#FDE68A',
        cardBorder: 'rgba(251, 191, 36, 0.48)',
        badgeBg: 'rgba(245, 158, 11, 0.18)',
        badgeText: '#FDE68A',
      };
    case 'compromise':
      return {
        fill: '#38BDF8',
        stroke: '#BAE6FD',
        cardBorder: 'rgba(56, 189, 248, 0.45)',
        badgeBg: 'rgba(14, 165, 233, 0.18)',
        badgeText: '#BAE6FD',
      };
    case 'ongoing':
      return {
        fill: '#2DD4BF',
        stroke: '#99F6E4',
        cardBorder: 'rgba(45, 212, 191, 0.48)',
        badgeBg: 'rgba(20, 184, 166, 0.2)',
        badgeText: '#99F6E4',
      };
    case 'exaptation':
    default:
      return {
        fill: '#10B981',
        stroke: '#A7F3D0',
        cardBorder: 'rgba(52, 211, 153, 0.48)',
        badgeBg: 'rgba(16, 185, 129, 0.18)',
        badgeText: '#A7F3D0',
      };
  }
}

function buildLeaderPath(node: BodyTraceNodeData): string {
  // Connect from anatomical hotspot (anchorX, anchorY) to inner edge of the mind-map card
  const targetX =
    node.side === 'left' ? node.x + CARD_W / 2 : node.x - CARD_W / 2;
  const targetY = node.y;
  const dx = targetX - node.anchorX;

  const c1x = node.anchorX + dx * 0.42;
  const c1y = node.anchorY;
  const c2x = targetX - dx * 0.36;
  const c2y = targetY;

  return `M ${node.anchorX} ${node.anchorY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${targetX} ${targetY}`;
}

export function HumanBodyExplorer({
  unlockedStepIndex,
  showAllSteps,
  selectedNodeId,
  onSelectNode,
}: HumanBodyExplorerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 920, height: 680 });
  const [camera, setCamera] = useState({ x: 825, y: 540, scale: 0.58 });
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

  const effectiveMaxStep = showAllSteps ? 9 : unlockedStepIndex;

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
    const worldW = 1660;
    const worldH = 1120;
    const scale = Math.max(
      0.24,
      Math.min(0.95, Math.min(viewport.width / worldW, viewport.height / worldH)),
    );
    return {
      x: 825,
      y: 545,
      scale,
    };
  }, [viewport.height, viewport.width]);

  const computeFollowCamera = useCallback(
    (targetNodeId: string) => {
      if (showAllSteps) {
        return computeOverviewCamera();
      }
      const selected = BODY_NODE_MAP[targetNodeId] ?? BODY_NODES[0];

      // Frame both the mind-map card AND the central human body segment around the hotspot
      const cardLeft = selected.x - CARD_W / 2 - 45;
      const cardRight = selected.x + CARD_W / 2 + 45;
      const bodyLeft = 650;
      const bodyRight = 1000;

      const minX = Math.min(cardLeft, bodyLeft, selected.anchorX - 90);
      const maxX = Math.max(cardRight, bodyRight, selected.anchorX + 90);
      const minY = Math.min(selected.y - 120, selected.anchorY - 160);
      const maxY = Math.max(selected.y + 120, selected.anchorY + 160);

      const spanX = Math.max(760, maxX - minX);
      const spanY = Math.max(540, maxY - minY);

      const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
      const clampedScale = Math.max(0.36, Math.min(1.02, rawScale));

      return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        scale: clampedScale,
      };
    },
    [computeOverviewCamera, showAllSteps, viewport.height, viewport.width],
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
      scale: Math.max(0.22, Math.min(2.0, prev.scale * factor)),
    }));
  };

  const unlockedNodes = useMemo(
    () => BODY_NODES.filter((n) => n.stepIndex <= effectiveMaxStep),
    [effectiveMaxStep],
  );

  const lockedNodes = useMemo(
    () => BODY_NODES.filter((n) => n.stepIndex > effectiveMaxStep),
    [effectiveMaxStep],
  );

  const translateX = viewport.width / 2 - camera.x * camera.scale;
  const translateY = viewport.height / 2 - camera.y * camera.scale;

  return (
    <div
      ref={containerRef}
      id="human-body-explorer-canvas"
      className="relative w-full h-full overflow-hidden rounded-2xl glass-panel select-none"
    >
      {/* Top-left legend for evolutionary trace categories */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-wrap items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl glass-subtle text-[11px] sm:text-xs text-slate-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Rudimentært spor</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Gjenbrukt / tilpasning</span>
        </span>
        <span className="text-slate-600 hidden md:inline">•</span>
        <span className="hidden md:inline-flex items-center gap-1.5 font-medium text-sky-300">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>Kompromiss</span>
        </span>
      </div>

      {/* Camera controls floating bottom-left */}
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 z-10 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-xl glass-subtle">
        <button
          id="btn-body-zoom-in"
          type="button"
          onClick={() => {
            setCameraMode('manual');
            setCamera((prev) => ({
              ...prev,
              scale: Math.min(2.0, prev.scale * 1.2),
            }));
          }}
          title="Zoom inn"
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          id="btn-body-zoom-out"
          type="button"
          onClick={() => {
            setCameraMode('manual');
            setCamera((prev) => ({
              ...prev,
              scale: Math.max(0.22, prev.scale / 1.2),
            }));
          }}
          title="Zoom ut"
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-700/70 mx-0.5" />
        <button
          id="btn-body-camera-follow"
          type="button"
          onClick={() => {
            setCameraMode('follow');
            setCamera(computeFollowCamera(selectedNodeId));
          }}
          className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            cameraMode === 'follow'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
          title="Fokuser på valgt kroppsdel"
        >
          <Focus className="w-3.5 h-3.5" />
          <span>Følg</span>
        </button>
        <button
          id="btn-body-camera-overview"
          type="button"
          onClick={() => {
            setCameraMode('overview');
            setCamera(computeOverviewCamera());
          }}
          className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            cameraMode === 'overview'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
          title="Vis hele menneskekroppen og tankekartet"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Hele kroppen</span>
        </button>
      </div>

      {/* Hint bottom-right */}
      <div className="hidden sm:flex absolute bottom-3.5 right-3.5 z-10 items-center gap-1.5 px-3 py-1.5 rounded-xl glass-subtle text-[11px] text-slate-400 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Klikk på et punkt på kroppen eller et kort rundt</span>
      </div>

      <svg
        className={`w-full h-full touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        role="img"
        aria-label="Interaktivt tankekart over menneskekroppens evolusjonære spor"
      >
        <defs>
          <radialGradient id="centralBodyAura" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.16)" />
            <stop offset="55%" stopColor="rgba(245, 158, 11, 0.06)" />
            <stop offset="100%" stopColor="rgba(11, 17, 32, 0)" />
          </radialGradient>

          <filter id="bodySoftGlow" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          style={{
            transform: `translate(${translateX}px, ${translateY}px) scale(${camera.scale})`,
            transformOrigin: '0 0',
            transition: isDragging
              ? 'none'
              : 'transform 680ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Ambient Vitruvian evolutionary rings around the central human */}
          <g className="pointer-events-none">
            <ellipse
              cx={825}
              cy={535}
              rx={350}
              ry={495}
              fill="url(#centralBodyAura)"
            />
            <circle
              cx={825}
              cy={535}
              r={450}
              fill="none"
              stroke="rgba(16, 185, 129, 0.14)"
              strokeWidth={1.5}
              strokeDasharray="6 12"
            />
            <circle
              cx={825}
              cy={535}
              r={335}
              fill="none"
              stroke="rgba(245, 158, 11, 0.12)"
              strokeWidth={1.2}
              strokeDasharray="3 9"
            />
            <text
              x={825}
              y={54}
              textAnchor="middle"
              fill="rgba(148, 163, 184, 0.55)"
              fontSize={12}
              fontWeight={700}
              letterSpacing="0.16em"
              className="font-mono-time"
            >
              HOMO SAPIENS • ET LEVENDE EVOLUSJONSMUSEUM
            </text>
          </g>

          {/* Central Nano Banana Bioluminescent Human Anatomy Figure */}
          <image
            href={CENTRAL_HUMAN_IMAGE}
            x={435}
            y={20}
            width={780}
            height={1040}
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none"
          />

          {/* Ghost leader lines & clickable anatomical beacons for not-yet-unlocked traces */}
          {lockedNodes.map((node) => (
            <g key={`locked-trace-${node.id}`}>
              <path
                d={buildLeaderPath(node)}
                fill="none"
                stroke="rgba(148, 163, 184, 0.08)"
                strokeWidth={1.8}
                strokeDasharray="5 8"
                className="pointer-events-none"
              />

              {/* Subtle ghost card placeholder */}
              <rect
                x={node.x - CARD_W / 2}
                y={node.y - CARD_H / 2}
                width={CARD_W}
                height={CARD_H}
                rx={16}
                fill="rgba(15, 23, 42, 0.32)"
                stroke="rgba(148, 163, 184, 0.1)"
                strokeWidth={1.2}
                strokeDasharray="5 7"
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragRef.current?.moved) return;
                  onSelectNode(node.id);
                }}
                className="cursor-pointer hover:stroke-emerald-400/40 transition-colors"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="rgba(148, 163, 184, 0.35)"
                fontSize={12.5}
                fontWeight={600}
                className="pointer-events-none font-mono-time"
              >
                Spor {node.stepNumber} • Klikk eller trykk Neste
              </text>

              {/* Clickable dim anatomical dot directly on the body */}
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
                  r={22}
                  fill="transparent"
                />
                <circle
                  cx={node.anchorX}
                  cy={node.anchorY}
                  r={9}
                  fill="rgba(15, 23, 42, 0.85)"
                  stroke="rgba(148, 163, 184, 0.45)"
                  strokeWidth={2}
                />
                <text
                  x={node.anchorX}
                  y={node.anchorY + 3.5}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize={10}
                  fontWeight={800}
                  className="pointer-events-none font-display"
                >
                  {node.stepNumber}
                </text>
              </g>
            </g>
          ))}

          {/* Unlocked Mind-Map Leader Curves, Anatomical Hotspots & Topic Cards */}
          {unlockedNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const colors = getTraceColors(node);
            const pathData = buildLeaderPath(node);
            const cardLeft = node.x - CARD_W / 2;
            const cardTop = node.y - CARD_H / 2;

            return (
              <g key={node.id} id={`body-trace-${node.id}`}>
                {/* Ambient glow under active leader curve */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={colors.fill}
                  strokeWidth={isSelected ? 10 : 5}
                  strokeLinecap="round"
                  opacity={isSelected ? 0.32 : 0.1}
                  className="pointer-events-none"
                />

                {/* Crisp animated leader curve */}
                <path
                  d={pathData}
                  pathLength={1}
                  fill="none"
                  stroke={isSelected ? colors.stroke : colors.fill}
                  strokeWidth={isSelected ? 3.6 : 2.2}
                  strokeLinecap="round"
                  opacity={isSelected ? 1 : 0.72}
                  className="animate-branch-draw pointer-events-none"
                />

                {/* Anatomical hotspot pin on the central human body */}
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
                    r={28}
                    fill="transparent"
                  />
                  {isSelected && (
                    <>
                      <circle
                        cx={node.anchorX}
                        cy={node.anchorY}
                        r={23}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth={2.5}
                        className="node-pulse-ring"
                      />
                      <circle
                        cx={node.anchorX}
                        cy={node.anchorY}
                        r={18}
                        fill="none"
                        stroke={colors.fill}
                        strokeWidth={2}
                        opacity={0.85}
                      />
                    </>
                  )}
                  <circle
                    cx={node.anchorX}
                    cy={node.anchorY}
                    r={isSelected ? 13.5 : 10.5}
                    fill={isSelected ? colors.fill : '#0B1120'}
                    stroke={isSelected ? '#FFFFFF' : colors.stroke}
                    strokeWidth={isSelected ? 3 : 2.4}
                    filter="url(#bodySoftGlow)"
                  />
                  <text
                    x={node.anchorX}
                    y={node.anchorY + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#08101E' : '#F8FAFC'}
                    fontSize={11.5}
                    fontWeight={800}
                    className="pointer-events-none font-display"
                  >
                    {node.stepNumber}
                  </text>
                </g>

                {/* Mind-Map Node Card on Left or Right */}
                <g
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragRef.current?.moved) return;
                    onSelectNode(node.id);
                  }}
                  className="cursor-pointer group"
                >
                  {isSelected && (
                    <rect
                      x={cardLeft - 4}
                      y={cardTop - 4}
                      width={CARD_W + 8}
                      height={CARD_H + 8}
                      rx={20}
                      fill="none"
                      stroke={colors.fill}
                      strokeWidth={2.2}
                      opacity={0.55}
                      filter="url(#bodySoftGlow)"
                    />
                  )}

                  <rect
                    x={cardLeft}
                    y={cardTop}
                    width={CARD_W}
                    height={CARD_H}
                    rx={16}
                    fill={
                      isSelected
                        ? 'rgba(17, 29, 52, 0.96)'
                        : 'rgba(12, 20, 36, 0.90)'
                    }
                    stroke={isSelected ? colors.stroke : colors.cardBorder}
                    strokeWidth={isSelected ? 2.6 : 1.5}
                  />

                  {/* Step Number Circle inside Mind-Map Card */}
                  <circle
                    cx={cardLeft + 30}
                    cy={node.y}
                    r={16}
                    fill={isSelected ? colors.fill : colors.badgeBg}
                    stroke={isSelected ? '#FFFFFF' : colors.cardBorder}
                    strokeWidth={1.6}
                  />
                  <text
                    x={cardLeft + 30}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fill={isSelected ? '#08101E' : colors.badgeText}
                    fontSize={13}
                    fontWeight={800}
                    className="pointer-events-none font-display"
                  >
                    {node.stepNumber}
                  </text>

                  {/* Card Title */}
                  <text
                    x={cardLeft + 56}
                    y={cardTop + 33}
                    fill="#FFFFFF"
                    fontSize={15.5}
                    fontWeight={800}
                    className="pointer-events-none font-display"
                  >
                    {node.shortLabel}
                  </text>

                  {/* Time origin + Trace category badge */}
                  <text
                    x={cardLeft + 56}
                    y={cardTop + 56}
                    fill="#FCD34D"
                    fontSize={12}
                    fontWeight={700}
                    className="pointer-events-none font-mono-time"
                  >
                    {node.timeMa}
                  </text>

                  <text
                    x={cardLeft + 56}
                    y={cardTop + 75}
                    fill={colors.badgeText}
                    fontSize={11.5}
                    fontWeight={600}
                    className="pointer-events-none"
                  >
                    {node.traceBadge}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
