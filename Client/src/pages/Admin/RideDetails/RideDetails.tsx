import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CarFront,
  Clock,
  MapPin,
  Navigation,
  Users,
  Wallet,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { AdminRideDetailsResDTO } from '@/types/adminRide';
import { getAdminRideDetails } from '@/api/adminRide';
import { formatDate, formatDuration } from '@/utils/dateFormater';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/getStatusColor';
import { InfoItem, MetricCard } from './RideDetailsComponents';
import { HikersSection } from './HikersSection';

export default function AdminRideDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<AdminRideDetailsResDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await getAdminRideDetails(id);
        if (res) {
          setData(res);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!data && !loading) return <>Not Found</>;
  if (!data) return null;

  // Simple city extraction for title
  const startCity = data.startAddress.split(',')[0];
  const endCity = data.endAddress.split(',')[0];

  const rideDuration = data.completedAt
    ? formatDuration(data.createdAt, data.completedAt)
    : 'In progress';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 md:p-4">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Ride: {startCity} <span className="text-gray-400">→</span>{' '}
              {endCity}
            </h1>
            <p className="text-sm text-gray-500 font-mono">
              Ride ID: {data.rideId.slice(-8)} • Date:{' '}
              {formatDate(data.createdAt)}
            </p>
          </div>
          <button
            className="bg-black cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 self-start"
            onClick={handleBack}
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Ride Information Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Ride Information</h2>
            <Badge className={`${getStatusColor(data.status)}`}>
              {data.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <InfoItem
              label="Pickup Location"
              value={data.startAddress}
              icon={MapPin}
            />
            <InfoItem
              label="Drop-off Location"
              value={data.endAddress}
              icon={MapPin}
            />

            <InfoItem label="Duration" value={rideDuration} icon={Clock} />
            <InfoItem
              label="Distance Covered"
              value={`${data.totalDistance.toFixed(2)} km`}
              icon={Navigation}
            />

            <InfoItem
              label="Cost Share per km"
              value={`₹${data.costSharing}`}
              icon={Wallet}
            />
            <InfoItem
              label="Total Cost Shared"
              value={`₹${data.totalCostShared}`}
              icon={Wallet}
            />
            <InfoItem
              label="Platform Fee"
              value={`₹${data.platformFee}`}
              icon={Wallet}
            />

            <InfoItem label="Rider" value={data.rider.fullName} icon={Users} />
            <InfoItem
              label="Vehicle Number"
              value={data.vehicleNumber}
              icon={CarFront}
            />

            <InfoItem
              label="Vehicle Model"
              value={data.vehicleModel}
              icon={CarFront}
            />
          </div>
        </section>

        {/* Ride Metrics Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Ride Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Hikers Connected"
              value={data.hikersMatched.length}
              icon={Users}
            />
            <MetricCard
              title="Distance"
              value={`${data.totalDistance.toFixed(2)} km`}
              icon={Navigation}
            />
            <MetricCard title="Duration" value={rideDuration} icon={Clock} />
            <MetricCard
              title="Total Earnings"
              value={`₹${data.totalCostShared}`}
              icon={Wallet}
            />
          </div>
        </section>

        {/* Hikers Section */}
        <HikersSection hikersMatched={data.hikersMatched} />
      </div>
    </div>
  );
}
