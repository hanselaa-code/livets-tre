import { X } from 'lucide-react';
import type { TreeNodeData } from '../data/treeOfLifeData';

interface ImageLightboxProps {
  node: TreeNodeData | null;
  onClose: () => void;
}

export function ImageLightbox({ node, onClose }: ImageLightboxProps) {
  if (!node) return null;

  return (
    <div
      id="image-lightbox-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-card-enter cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl cursor-default"
      >
        <button
          id="btn-close-lightbox"
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold border border-white/15 cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Lukk (Esc)</span>
        </button>

        <img
          src={node.image}
          alt={node.title}
          className="w-full max-h-[78vh] object-contain bg-slate-950"
        />

        <div className="p-4 sm:p-5 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold text-white font-display">
                {node.title}
              </span>
              <span className="text-xs font-mono-time px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {node.timeMa}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {node.imageCaption}
            </p>
          </div>
          <span className="text-xs italic text-slate-400 shrink-0">
            {node.latinName}
          </span>
        </div>
      </div>
    </div>
  );
}
