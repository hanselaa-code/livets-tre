import { Check, Copy, QrCode, Smartphone, X } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import type { ThemeConfig } from '../data/themes';

export const PUBLIC_CLASSROOM_URL = 'https://hanselaa-code.github.io/livets-tre/';

interface QrShareModalProps {
  activeTheme: ThemeConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function QrShareModal({
  activeTheme,
  isOpen,
  onClose,
}: QrShareModalProps) {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const shareUrl =
    activeTheme.id === 'livets-tre'
      ? PUBLIC_CLASSROOM_URL
      : `${PUBLIC_CLASSROOM_URL}${activeTheme.hash}`;

  useEffect(() => {
    if (!isOpen) return;
    let active = true;

    QRCode.toString(shareUrl, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#0B1120',
        light: '#FFFFFF',
      },
    })
      .then((svg) => {
        if (active) setSvgMarkup(svg);
      })
      .catch(() => {
        if (active) setSvgMarkup('');
      });

    return () => {
      active = false;
    };
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      id="qr-share-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/88 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-card-enter"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full rounded-3xl glass-panel p-6 sm:p-8 text-center space-y-5 shadow-2xl"
      >
        <button
          id="btn-close-qr-modal"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Lukk QR-vindu"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5" />
            <span>Del tema: {activeTheme.dropdownTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Skann for å åpne på mobil
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-1.5">
            <Smartphone className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              Åpner direkte i «{activeTheme.dropdownTitle}» på elevenes telefon
            </span>
          </p>
        </div>

        {/* High-contrast white QR container for instant scanning from back of classroom */}
        <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80 p-4 rounded-2xl bg-white shadow-[0_0_40px_rgba(16,185,129,0.25)] flex items-center justify-center">
          {svgMarkup ? (
            <div
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          ) : (
            <span className="text-slate-600 text-sm font-medium">
              Genererer QR-kode…
            </span>
          )}
        </div>

        {/* Direct URL + Copy Button */}
        <div className="space-y-2.5">
          <div className="px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono-time text-xs sm:text-sm text-emerald-300 select-all break-all">
            {shareUrl}
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <button
              id="btn-copy-share-url"
              type="button"
              onClick={() => void handleCopy()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Lenke kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kopier lenke til Teams / Classroom</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
