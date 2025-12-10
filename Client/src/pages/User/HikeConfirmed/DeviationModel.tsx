import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Navigation, Shield } from 'lucide-react';

import type { RouteDeviationResDTO } from '@/types/sos';
import { formatTime, timeFormater } from '@/utils/dateFormater';

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
  const [countdown, setCountdown] = useState(300); // 5 minutes = 300 seconds
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  useEffect(() => {
    if (isOpen && !isAcknowledged && !sosTriggered) {
      setCountdown(300);
    } else {
    }
    return () => {};
  }, [isOpen, isAcknowledged, sosTriggered]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
        <div
          className={`relative w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 ${
            sosTriggered
              ? 'ring-4 ring-red-500/50 shadow-red-500/20'
              : 'ring-4 ring-amber-400/50 shadow-amber-500/20'
          }`}
        >
          <div
            className={`px-5 py-4 flex-shrink-0 rounded-t-3xl transition-colors duration-300 ${
              sosTriggered
                ? 'bg-gradient-to-br from-red-600 to-red-700'
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
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-200 opacity-75"></span>
                    <AlertTriangle className="relative w-6 h-6" />
                  </div>
                ) : (
                  <Navigation className="w-6 h-6" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-extrabold uppercase tracking-tight leading-none mb-0.5">
                  {sosTriggered ? 'SOS Triggered' : 'Route Deviation'}
                </h2>
                <p className="text-[11px] font-medium text-white/90 truncate">
                  {sosTriggered
                    ? 'Emergency Protocol Active'
                    : 'Rider is off course'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
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

            {/* 2. Countdown Timer: Compact */}
            <div className="py-1">
              <div className="flex items-end justify-between px-1 mb-1">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                  Auto SOS In
                </span>
                <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                  {formatTime ? formatTime(countdown) : countdown}
                </span>
              </div>

              {/* Progress Bar (Thinner h-2) */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-red-500 to-pink-600 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 300) * 100}%` }}
                />
              </div>
            </div>

            {/* 3. Safety Tips: Compact text */}
            <div className="flex gap-2 items-start p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-snug">
                Check surroundings. If you feel unsafe or don't recognize the
                route, trigger SOS.
              </p>
            </div>

            {/* 4. Action Buttons: Compact Height */}
            <div className="grid gap-2 pt-1">
              <button
                disabled={loading}
                className="group w-full bg-white border border-green-500 hover:bg-green-50 text-green-700 font-bold py-3 px-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-3 rounded-xl shadow-md shadow-red-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviationAlertModal;
