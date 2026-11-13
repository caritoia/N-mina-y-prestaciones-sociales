import React, { useEffect } from 'react';
import { X, PlayCircle } from 'lucide-react';

interface ManualVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualVideoModal: React.FC<ManualVideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-video-title"
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#00324D] border-b border-white/10">
          <div className="flex items-center gap-2.5 text-white">
            <PlayCircle className="w-5 h-5 text-[#39A900] shrink-0" />
            <div>
              <h2 id="manual-video-title" className="text-sm sm:text-base font-bold leading-tight">
                Manual del Usuario — Nómina y Salarios Colombia 2026
              </h2>
              <p className="text-[11px] text-slate-300">
                Guía visual del laboratorio interactivo SENA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar video manual del usuario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-black">
          <video
            src="/assets/aistudio/2026__5_48_p.m._6735ceaa.mp4"
            controls
            autoPlay
            playsInline
            className="w-full aspect-video max-h-[75vh]"
          >
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>
      </div>
    </div>
  );
};
