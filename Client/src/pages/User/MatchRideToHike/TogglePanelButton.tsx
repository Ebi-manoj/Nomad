import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TogglePanelButton({ showHikePanel, setShowHikePanel }: any) {
  return (
    <button
      onClick={() => setShowHikePanel(!showHikePanel)}
      className={`fixed top-1/2 -translate-y-1/2 z-50 bg-slate-900 cursor-pointer text-white p-2.5 rounded-r-lg shadow-xl hover:bg-slate-800 transition-all duration-300 ${
        showHikePanel ? 'left-[340px]' : 'left-0'
      }`}
    >
      {showHikePanel ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}
