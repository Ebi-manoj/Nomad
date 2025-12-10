import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Navigation, Shield } from 'lucide-react';
import type { RouteDeviationResDTO } from '@/types/sos';
import { formatTime } from '@/utils/dateFormater';
import { useSiren } from '@/hooks/useSiren';
import { toast } from 'sonner';

interface DeviationAlertProps {
  isOpen: boolean;
  onClose: () => void;
  data: RouteDeviationResDTO;
  message: string;
  handleSos: () => void;
}

export const DeviationAlertModal: React.FC<DeviationAlertProps> = ({
  isOpen,
  onClose,
  data,
  message,
  handleSos,
}) => {
  const [countdown, setCountdown] = useState(60);
  const [sosTriggered, setSosTriggered] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { playSiren, stopSiren } = useSiren();
  //
  useEffect(() => {
    if (isOpen) {
      setCountdown(60);
      setLoading(false);
      setSosTriggered(false);
      playSiren();
    } else {
      stopSiren();
    }
    return () => {};
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (countdown == 0) handleSosManually();
  }, [countdown]);

  if (!isOpen) return null;

  const handleSafe = () => {
    setLoading(true);
    onClose();
    stopSiren();
    toast.success('Confirmed you safety');
  };
  const handleSosManually = () => {
    handleSos();
    stopSiren();
    setSosTriggered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 ring-4 ${
          sosTriggered
            ? 'ring-red-600/50 shadow-red-600/20'
            : 'ring-amber-400/50 shadow-amber-500/20'
        }`}
      >
        <div
          className={`px-5 py-4 flex-shrink-0 rounded-t-3xl transition-colors duration-500 ${
            sosTriggered
              ? 'bg-gradient-to-br from-red-600 to-red-800'
              : 'bg-gradient-to-br from-amber-400 to-orange-500'
          }`}
        >
          <div className="flex items-center gap-3 text-white">
            <div
              className={`p-2 bg-white/20 rounded-full backdrop-blur-sm ${
                !sosTriggered && 'animate-pulse'
              }`}
            >
              {sosTriggered ? (
                <div className="relative">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <AlertTriangle className="relative w-6 h-6" />
                </div>
              ) : (
                <Navigation className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-extrabold uppercase tracking-tight leading-none mb-0.5">
                {sosTriggered ? 'SOS TRIGGERED!' : 'Route Deviation'}
              </h2>
              <p className="text-[11px] font-medium text-white/90 truncate">
                {sosTriggered
                  ? 'Emergency Protocol Active'
                  : 'Rider is off course'}
              </p>
            </div>
          </div>
        </div>

        {/* --- BODY CONTENT --- */}
        <div className="p-4 space-y-3">
          {sosTriggered ? (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in duration-500">
              {/* Emergency Status Box */}
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 shadow-sm">
                <p className="text-red-700 font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  Emergency Response Activated
                </p>
                <ul className="space-y-1.5 ml-1">
                  {[
                    'Emergency services notified',
                    'Live location shared',
                    'Support team alerted',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-red-600/80 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-red-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deviation Stat */}
              <div className="text-center py-1">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Final Deviation
                </p>
                <p className="text-2xl font-mono font-bold text-slate-800">
                  {data?.deviationDistance?.toFixed(2) || '0.00'} km
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full cursor-pointer bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
              >
                <span>Close Monitor</span>
              </button>
            </div>
          ) : (
            <>
              {/* Info Card */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm text-orange-500 flex-shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-bold text-xs leading-tight">
                      {message || 'Route deviation detected'}
                    </p>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        Distance:
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-sm">
                        {data?.deviationDistance?.toFixed(2) || '0.00'} km
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="py-1">
                <div className="flex items-end justify-between px-1 mb-1">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    Auto SOS In
                  </span>
                  <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                    {formatTime(countdown)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-600 h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 60) * 100}%` }}
                  />
                </div>
              </div>

              {/* Safety Tips */}
              <div className="flex gap-2 items-start p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-snug">
                  Check surroundings. If you feel unsafe or don't recognize the
                  route, trigger SOS.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-2 pt-1">
                <button
                  disabled={loading}
                  onClick={handleSafe}
                  className="group w-full cursor-pointer bg-white border border-green-500 hover:bg-green-50 text-green-700 font-bold py-3 px-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>I am Safe</span>
                    </>
                  )}
                </button>

                <button
                  disabled={loading}
                  onClick={handleSosManually}
                  className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-3 rounded-xl shadow-md shadow-red-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>TRIGGER SOS NOW</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviationAlertModal;
