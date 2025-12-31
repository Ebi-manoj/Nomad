import type { HikeResponseDTO } from '@/store/features/user/hike/hike';
import { motion } from 'framer-motion';
import { MapPin, Flag, Navigation, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { cancelHike as cancelHikeApi } from '@/api/hike';
import { clearHikeData } from '@/store/features/user/hike/hikeSlice';
import { toast } from 'sonner';

export function HikePanel({ hikeData }: { hikeData: HikeResponseDTO }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await cancelHikeApi(hikeData.id);
      toast.success('Hike cancelled');
      dispatch(clearHikeData());
      navigate('/hike', { replace: true });
    } catch (err) {
      toast.error('Failed to cancel hike');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: -340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -340, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed left-0 top-15 w-[340px] h-screen bg-white border-r border-slate-300 shadow-2xl z-40 overflow-y-auto"
    >
      <div className="p-5">
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <h1 className="text-xl font-bold text-slate-900">Your Hike</h1>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-slate-900 rounded-lg">
                <p className="text-xs font-bold text-white">
                  {hikeData.status}
                </p>
              </div>
              {hikeData.status === 'active' && !hikeData.confirmed && (
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="cursor-pointer px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {loading ? 'Cancelling...' : 'Cancel'}
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500">Journey details</p>
        </div>

        <div className="space-y-3 mb-5">
          <HikeCard
            icon={MapPin}
            title="Pickup Location"
            value={hikeData.pickupAddress}
          />
          <HikeCard
            icon={Flag}
            title="Destination"
            value={hikeData.destinationAddress}
          />
        </div>

        <div className="mb-3">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            Journey Details
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <HikeStat
            icon={Navigation}
            label="Distance"
            value={hikeData.totalDistance}
            unit="km"
          />
          <HikeStat
            icon={User}
            label="Seats"
            value={hikeData.seatsRequested}
            unit="requested"
          />
          <HikeStat
            icon={Shield}
            label="Helmet"
            value={hikeData.hasHelmet ? 'Yes' : 'No'}
            unit="available"
            isActive={hikeData.hasHelmet}
          />
        </div>
      </div>
    </motion.div>
  );
}

function HikeCard({ icon: Icon, title, value }: any) {
  return (
    <div className="bg-white rounded-xl p-3.5 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm">
      <div className="flex items-start gap-2.5">
        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
          <Icon size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-slate-900 font-semibold text-xs">{value}</p>
        </div>
      </div>
    </div>
  );
}

function HikeStat({ icon: Icon, label, value, unit, isActive }: any) {
  return (
    <div className="bg-white rounded-lg p-3 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isActive ? 'bg-slate-900' : 'bg-slate-300'
          }`}
        >
          <Icon size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 font-medium">{unit}</p>
    </div>
  );
}
