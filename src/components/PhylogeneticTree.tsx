import { Focus, Maximize2, Minus, Plus, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NODE_MAP, TREE_NODES, type TreeNodeData } from '../data/treeOfLifeData';

interface PhylogeneticTreeProps {
  unlockedStepIndex: number;
  showAllSteps: boolean;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

function buildCurvePath(parent: TreeNodeData, child: TreeNodeData): string {
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;

  if (child.isMainPath && parent.isMainPath) {
    const c1x = parent.x + dx * 0.46;
    const c1y = parent.y + dy * 0.18;
    const c2x = child.x - dx * 0.44;
    const c2y = child.y - dy * 0.18;
    return `M ${parent.x} ${parent.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${child.x} ${child.y}`;
  }

  if (dy < -30) {
    const c1x = parent.x + dx * 0.16;
    const c1y = parent.y + dy * 0.62;
    const c2x = child.x - dx * 0.38;
    const c2y = child.y - dy * 0.12;
    return `M ${parent.x} ${parent.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${child.x} ${child.y}`;
  }

  const c1x = parent.x + dx * 0.52;
  const c1y = parent.y + dy * 0.14;
  const c2x = child.x - dx * 0.34;
  const c2y = child.y - dy * 0.18;
  return `M ${parent.x} ${parent.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${child.x} ${child.y}`;
}

function getCategoryColors(node: TreeNodeData) {
  if (node.isMainPath) {
    if (node.stepIndex >= 7) {
      return {
        fill: '#F59E0B',
        stroke: '#FDE68A',
        badgeBg: 'rgba(245, 158, 11, 0.18)',
        badgeBorder: 'rgba(251, 191, 36, 0.45)',
        text: '#FEF3C7',
      };
    }
    return {
      fill: '#10B981',
      stroke: '#A7F3D0',
      badgeBg: 'rgba(16, 185, 129, 0.18)',
      badgeBorder: 'rgba(52, 211, 153, 0.45)',
      text: '#ECFDF5',
    };
  }

  switch (node.accentCategory) {
    case 'plant_fungi':
      return {
        fill: '#22C55E',
        stroke: '#86EFAC',
        badgeBg: 'rgba(20, 83, 45, 0.72)',
        badgeBorder: 'rgba(74, 222, 128, 0.38)',
        text: '#DCFCE7',
      };
    case 'invertebrate':
      return {
        fill: '#06B6D4',
        stroke: '#67E8F9',
        badgeBg: 'rgba(22, 78, 99, 0.72)',
        badgeBorder: 'rgba(34, 211, 238, 0.38)',
        text: '#CFFAFE',
      };
    case 'vertebrate':
      return {
        fill: '#0EA5E9',
        stroke: '#7DD3FC',
        badgeBg: 'rgba(12, 74, 110, 0.72)',
        badgeBorder: 'rgba(56, 189, 248, 0.38)',
        text: '#E0F2FE',
      };
    case 'mammal':
      return {
        fill: '#D97706',
        stroke: '#FCD34D',
        badgeBg: 'rgba(120, 53, 15, 0.72)',
        badgeBorder: 'rgba(251, 191, 36, 0.38)',
        text: '#FEF3C7',
      };
    case 'human':
      return {
        fill: '#F59E0B',
        stroke: '#FDE68A',
        badgeBg: 'rgba(120, 53, 15, 0.75)',
        badgeBorder: 'rgba(251, 191, 36, 0.45)',
        text: '#FEF3C7',
      };
    case 'microbe':
    default:
      return {
        fill: '#14B8A6',
        stroke: '#5EEAD4',
        badgeBg: 'rgba(19, 78, 74, 0.72)',
        badgeBorder: 'rgba(45, 212, 191, 0.38)',
        text: '#CCFBF1',
      };
  }
}

export function PhylogeneticTree({
  unlockedStepIndex,
  showAllSteps,
  selectedNodeId,
  onSelectNode,
}: PhylogeneticTreeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 920, height: 680 });

  const [camera, setCamera] = useState({ x: 320, y: 1080, scale: 0.95 });
  const [cameraMode, setCameraMode] = useState<'follow' | 'overview' | 'manual'>('follow');
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    camStartX: number;
    camStartY: number;
    moved: boolean;
  } | null>(null);

  const effectiveMaxStep = showAllSteps ? 9 : unlockedStepIndex;

  // Measure container size responsively
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

  // Ancestor lineage set from LUCA to the currently selected node
  const activeAncestorIds = useMemo(() => {
    const set = new Set<string>();
    let curr: TreeNodeData | undefined = NODE_MAP[selectedNodeId];
    while (curr) {
      set.add(curr.id);
      curr = curr.parentId ? NODE_MAP[curr.parentId] : undefined;
    }
    return set;
  }, [selectedNodeId]);

  // Compute ideal camera target whenever selectedNodeId or step changes
  const computeFollowCamera = useCallback(
    (targetNodeId: string) => {
      const selected = NODE_MAP[targetNodeId] ?? TREE_NODES[0];
      const focusNodes: TreeNodeData[] = [selected];

      if (selected.parentId && NODE_MAP[selected.parentId]) {
        focusNodes.push(NODE_MAP[selected.parentId]);
      }

      if (selected.isMainPath) {
        // Also frame all side branches unlocked at this step so the student sees the split
        for (const n of TREE_NODES) {
          if (n.stepIndex === selected.stepIndex) {
            focusNodes.push(n);
          }
        }
      } else {
        // Include direct children of a clicked side branch (e.g. Protostomer -> Bløtdyr & Leddyr)
        for (const n of TREE_NODES) {
          if (n.parentId === selected.id && n.stepIndex <= effectiveMaxStep) {
            focusNodes.push(n);
          }
        }
      }

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      for (const n of focusNodes) {
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
      }

      const spanX = Math.max(380, maxX - minX + 360);
      const spanY = Math.max(320, maxY - minY + 300);

      const rawScale = Math.min(viewport.width / spanX, viewport.height / spanY);
      const clampedScale = Math.max(0.56, Math.min(1.22, rawScale));

      return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        scale: clampedScale,
      };
    },
    [effectiveMaxStep, viewport.height, viewport.width],
  );

  const computeOverviewCamera = useCallback(() => {
    const visibleNodes = TREE_NODES.filter((n) => n.stepIndex <= effectiveMaxStep);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const n of visibleNodes) {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    }

    const spanX = Math.max(600, maxX - minX + 360);
    const spanY = Math.max(500, maxY - minY + 280);
    const scale = Math.max(0.34, Math.min(0.95, Math.min(viewport.width / spanX, viewport.height / spanY)));

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      scale,
    };
  }, [effectiveMaxStep, viewport.height, viewport.width]);

  // Snap back to follow mode whenever selectedNodeId or unlockedStepIndex changes
  useEffect(() => {
    setCameraMode('follow');
  }, [selectedNodeId, unlockedStepIndex]);

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
      scale: Math.max(0.32, Math.min(2.2, prev.scale * factor)),
    }));
  };

  const visibleNodes = useMemo(
    () => TREE_NODES.filter((n) => n.stepIndex <= effectiveMaxStep),
    [effectiveMaxStep],
  );

  const lockedNodes = useMemo(
    () => TREE_NODES.filter((n) => n.stepIndex > effectiveMaxStep),
    [effectiveMaxStep],
  );

  const visibleEdges = useMemo(
    () =>
      visibleNodes
        .filter((n) => n.parentId !== null)
        .map((child) => ({
          parent: NODE_MAP[child.parentId!],
          child,
        })),
    [visibleNodes],
  );

  const lockedEdges = useMemo(
    () =>
      lockedNodes
        .filter((n) => n.parentId !== null)
        .map((child) => ({
          parent: NODE_MAP[child.parentId!],
          child,
        })),
    [lockedNodes],
  );

  const translateX = viewport.width / 2 - camera.x * camera.scale;
  const translateY = viewport.height / 2 - camera.y * camera.scale;

  return (
    <div
      ref={containerRef}
      id="phylogenetic-tree-canvas"
      className="relative w-full h-full overflow-hidden rounded-2xl glass-panel select-none"
    >
      {/* Top-left subtle legend */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex flex-wrap items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl glass-subtle text-[11px] sm:text-xs text-slate-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 shadow-[0_0_8px_rgba(16,185,129,0.85)]" />
          <span>Hovedsti</span>
        </span>
        <span className="text-slate-600">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>Sidegrener (trykk på node)</span>
        </span>
      </div>

      {/* Camera controls floating bottom-left */}
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 z-10 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-xl glass-subtle">
        <button
          id="btn-zoom-in"
          type="button"
          onClick={() => {
            setCameraMode('manual');
            setCamera((prev) => ({ ...prev, scale: Math.min(2.2, prev.scale * 1.2) }));
          }}
          title="Zoom inn"
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          id="btn-zoom-out"
          type="button"
          onClick={() => {
            setCameraMode('manual');
            setCamera((prev) => ({ ...prev, scale: Math.max(0.32, prev.scale / 1.2) }));
          }}
          title="Zoom ut"
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-700/70 mx-0.5" />
        <button
          id="btn-camera-follow"
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
          title="Sentrer kamera på aktivt steg"
        >
          <Focus className="w-3.5 h-3.5" />
          <span>Følg</span>
        </button>
        <button
          id="btn-camera-overview"
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
          title="Zoom ut til hele det synlige stamtreet"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Oversikt</span>
        </button>
      </div>

      {/* Hint bottom-right */}
      <div className="hidden sm:flex absolute bottom-3.5 right-3.5 z-10 items-center gap-1.5 px-3 py-1.5 rounded-xl glass-subtle text-[11px] text-slate-400 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Dra for å panorere • Scroll for zoom • Klikk en node</span>
      </div>

      <svg
        className={`w-full h-full touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        role="img"
        aria-label="Interaktivt evolusjonært stamtre fra LUCA (3700 ma) til Homo sapiens"
      >
        <defs>
          <linearGradient id="mainTrunkGradient" x1="250" y1="1140" x2="1845" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="58%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="glowEmeraldGold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur" />
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
          {/* Subtle geological horizon arcs in deep background */}
          {[
            { y: 1140, label: 'URHAVET • 3700 ma' },
            { y: 980, label: 'PROTEROZOIKUM • 2000 ma' },
            { y: 705, label: 'PALEOZOIKUM • 540–375 ma' },
            { y: 455, label: 'MESOZOIKUM • 252–66 ma' },
            { y: 155, label: 'KENOZOIKUM • 66 ma – NÅTID' },
          ].map((band) => (
            <g key={band.label} opacity={0.22} className="pointer-events-none">
              <line
                x1={60}
                y1={band.y}
                x2={1960}
                y2={band.y}
                stroke="rgba(148, 163, 184, 0.22)"
                strokeWidth={1}
                strokeDasharray="6 10"
              />
              <text
                x={75}
                y={band.y - 8}
                fill="#94A3B8"
                fontSize={11}
                fontWeight={600}
                letterSpacing="0.1em"
                className="font-mono-time"
              >
                {band.label}
              </text>
            </g>
          ))}

          {/* Ghost silhouette of future locked branches so classroom sees there's more ahead */}
          {lockedEdges.map(({ parent, child }) => (
            <path
              key={`locked-edge-${child.id}`}
              d={buildCurvePath(parent, child)}
              fill="none"
              stroke="rgba(148, 163, 184, 0.09)"
              strokeWidth={child.isMainPath ? 4 : 2}
              strokeDasharray="5 8"
            />
          ))}

          {lockedNodes.map((node) => (
            <circle
              key={`locked-node-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={node.isMainPath ? 9 : 5.5}
              fill="rgba(30, 41, 59, 0.6)"
              stroke="rgba(148, 163, 184, 0.16)"
              strokeWidth={1.5}
            />
          ))}

          {/* Visible unlocked edges */}
          {visibleEdges.map(({ parent, child }) => {
            const pathData = buildCurvePath(parent, child);
            const isMainTrunk = parent.isMainPath && child.isMainPath;
            const isActiveAncestry =
              activeAncestorIds.has(parent.id) && activeAncestorIds.has(child.id);
            const colors = getCategoryColors(child);

            return (
              <g key={`edge-${child.id}`}>
                {/* Ambient glow behind active ancestry or main trunk */}
                {(isMainTrunk || isActiveAncestry) && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isMainTrunk ? 'url(#mainTrunkGradient)' : colors.fill}
                    strokeWidth={isMainTrunk ? 12 : 8}
                    strokeLinecap="round"
                    opacity={isActiveAncestry ? 0.34 : 0.16}
                  />
                )}

                <path
                  d={pathData}
                  pathLength={1}
                  fill="none"
                  stroke={
                    isMainTrunk
                      ? 'url(#mainTrunkGradient)'
                      : isActiveAncestry
                        ? colors.stroke
                        : colors.fill
                  }
                  strokeWidth={isMainTrunk ? 5.5 : isActiveAncestry ? 3.8 : 2.6}
                  strokeLinecap="round"
                  opacity={isMainTrunk || isActiveAncestry ? 1 : 0.72}
                  filter={isMainTrunk ? 'url(#glowEmeraldGold)' : undefined}
                  className="animate-branch-draw"
                />
              </g>
            );
          })}

          {/* Visible unlocked nodes & classroom labels */}
          {visibleNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isAncestor = activeAncestorIds.has(node.id);
            const colors = getCategoryColors(node);
            const radius = node.isMainPath ? (isSelected ? 17 : 13.5) : isSelected ? 13 : 9.5;

            // Label offset based on node.labelAnchor
            let labelX = node.x;
            let labelY = node.y;
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';

            if (node.labelAnchor === 'top') {
              labelY = node.y - radius - 26;
            } else if (node.labelAnchor === 'bottom') {
              labelY = node.y + radius + 22;
            } else if (node.labelAnchor === 'left') {
              labelX = node.x - radius - 14;
              labelY = node.y - 4;
              textAnchor = 'end';
            } else if (node.labelAnchor === 'right') {
              labelX = node.x + radius + 14;
              labelY = node.y - 4;
              textAnchor = 'start';
            }

            return (
              <g
                key={node.id}
                id={`tree-node-${node.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragRef.current?.moved) return;
                  onSelectNode(node.id);
                }}
                className="cursor-pointer group"
              >
                {/* Invisible generous hit target for easy classroom touch/click */}
                <circle cx={node.x} cy={node.y} r={34} fill="transparent" />

                {/* Pulsing ring around currently selected node */}
                {isSelected && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 11}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={2.5}
                      className="node-pulse-ring"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 6}
                      fill="none"
                      stroke={colors.fill}
                      strokeWidth={2}
                      opacity={0.75}
                    />
                  </>
                )}

                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill={isSelected ? colors.fill : '#0F172A'}
                  stroke={isSelected ? '#FFFFFF' : isAncestor ? colors.stroke : colors.fill}
                  strokeWidth={isSelected ? 3.2 : node.isMainPath ? 3 : 2.2}
                  filter={isSelected || node.isMainPath ? 'url(#softNodeGlow)' : undefined}
                />

                {/* Step number inside main path circles */}
                {node.isMainPath && node.stepNumber && (
                  <text
                    x={node.x}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fill={isSelected ? '#08101E' : '#F8FAFC'}
                    fontSize={12.5}
                    fontWeight={800}
                    className="pointer-events-none font-display"
                  >
                    {node.stepNumber}
                  </text>
                )}

                {/* Inner dot for side branch nodes */}
                {!node.isMainPath && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 4.5 : 3.5}
                    fill={isSelected ? '#0B1120' : colors.fill}
                  />
                )}

                {/* High-contrast readable label group */}
                <g className="transition-transform duration-200 group-hover:scale-105" style={{ transformOrigin: `${labelX}px ${labelY}px` }}>
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    fill={isSelected ? '#FFFFFF' : colors.text}
                    stroke="#0B1120"
                    strokeWidth={4.5}
                    paintOrder="stroke"
                    fontSize={node.isMainPath ? 15.5 : 13.5}
                    fontWeight={node.isMainPath || isSelected ? 700 : 600}
                    className="font-display"
                  >
                    {node.shortLabel}
                  </text>
                  <text
                    x={labelX}
                    y={labelY + 17}
                    textAnchor={textAnchor}
                    fill={isSelected ? '#FCD34D' : '#94A3B8'}
                    stroke="#0B1120"
                    strokeWidth={4}
                    paintOrder="stroke"
                    fontSize={11.5}
                    fontWeight={600}
                    className="font-mono-time"
                  >
                    {node.timeMa}
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
