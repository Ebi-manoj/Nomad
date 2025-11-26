import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/utils/dateFormater';
import type { AdminSosLog } from '@/store/features/admin/sos/adminSos.d';

interface SosCardProps {
  log: AdminSosLog;
  onResolve: (id: string) => void;
}

export const SosCard = ({ log, onResolve }: SosCardProps) => {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();

  const openMap = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 1. User Info */}
          <div className="lg:col-span-3 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              {getInitials(log.initiaterDetails.fullName)}
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                {log.initiaterDetails.fullName}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                #{log.id.slice(-8)}
              </p>
            </div>
          </div>

          {/* 2. Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-slate-700 font-medium">
                {log.initiaterDetails.email}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-slate-700 font-medium">
                {log.initiaterDetails.mobile}
              </span>
            </div>
          </div>

          {/* 3. Time */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 pl-0 lg:pl-4 border-l-0 lg:border-l border-slate-100">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  Triggered
                </p>
                <p className="text-xs font-semibold text-slate-900">
                  {formatDate(log.triggeredAt)}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Actions */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-end items-stretch sm:items-center">
            <button
              onClick={() => openMap(log.location.lat, log.location.lng)}
              className="cursor-pointer group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
              <span>Map</span>
            </button>

            {log.status === 'OPEN' ? (
              <button
                onClick={() => onResolve(log.id)}
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all whitespace-nowrap shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Resolve</span>
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4" />
                <span>Done</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
