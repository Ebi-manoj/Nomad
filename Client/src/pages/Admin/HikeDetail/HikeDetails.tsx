import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  FileCheck,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Banknote,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/getStatusColor';
import { formatDate } from '@/utils/dateFormater';
import { useNavigate, useParams } from 'react-router-dom';
import type { AdminHikeDetailsResDTO } from '@/types/adminHike';
import { getAdminHikeDetails } from '@/api/adminHike';
import { SectionHeader } from './SectionHeader';
import { InfoRow } from './InfoRow';
import { UserProfileCard } from './UserProfileCard';

export default function AdminHikeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<AdminHikeDetailsResDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await getAdminHikeDetails(id);
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

  if (!data) return <>Not Found</>;

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={handleBack}
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5 text-zinc-500" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">
                  Booking Details
                </h1>
                <Badge className={`${getStatusColor(data.status)}`}>
                  {data.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                ID: {data.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs text-zinc-400">Created At</p>
              <span className="flex items-center text-muted-foreground text-xs gap-1 ml-1">
                <Calendar className="w-3 h-3" />
                {formatDate(data.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (Route & Participants) - Spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <SectionHeader icon={Navigation} title="Route Information" />

              <div className="relative pl-4 border-l-2 border-zinc-100 dark:border-zinc-800 ml-2 space-y-8 my-6">
                {/* Pickup */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black ring-1 ring-zinc-200 dark:ring-zinc-700"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Pickup Point
                    </span>
                    <p className="text-base font-medium leading-tight">
                      {data.pickupAddress}
                    </p>
                  </div>
                </div>

                {/* Dropoff */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-red-200 dark:border-black"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Destination
                    </span>
                    <p className="text-base font-medium leading-tight">
                      {data.destinationAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-3 gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 mt-4">
                <div>
                  <p className="text-xs text-zinc-400 mb-0.5">Total Distance</p>
                  <p className="text-lg font-bold">
                    {data.totalDistance.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-zinc-500">
                      km
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-0.5">Seats</p>
                  <p className="text-lg font-bold">{data.seatsRequested}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-0.5">Helmet</p>
                  <p
                    className={`text-lg font-bold ${
                      data.hasHelmet ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {data.hasHelmet ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserProfileCard title="Hiker Details" user={data.user} />
              <UserProfileCard
                title="Rider Details"
                user={data.rider}
                isRider={true}
                vehicle={data.rider?.vehicle}
              />
            </div>
          </div>

          {/* RIGHT COLUMN (Financials & Booking Meta) */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <SectionHeader icon={Banknote} title="Payment Summary" />

              {data.booking ? (
                <>
                  <div className="text-center py-6 border-b border-zinc-100 dark:border-zinc-800 mb-4">
                    <p className="text-sm text-zinc-500 mb-1">Total Paid</p>
                    <p className="text-4xl font-bold tracking-tight">
                      ₹{data.booking.amount}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                        Paid via Stripe
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <InfoRow
                      label="Ride Fare"
                      value={`₹${
                        data.booking.amount - data.booking.platformFee
                      }`}
                    />
                    <InfoRow
                      label="Platform Fee"
                      value={`₹${data.booking.platformFee}`}
                    />
                    {data.booking.refundAmount ? (
                      <>
                        <InfoRow
                          label="Refund amount"
                          value={
                            <span className="text-green-400">
                              + {data.booking.refundAmount}
                            </span>
                          }
                        />
                      </>
                    ) : null}

                    <InfoRow
                      label="Payment ID"
                      value={
                        <span className="font-mono text-xs">
                          {data.payment?.stripePaymentId?.slice(0, 14)}...
                        </span>
                      }
                    />
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">
                    No payment record found
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Est. Price: ₹{data.estimatedPrice}
                  </p>
                </div>
              )}
            </div>

            {/* Booking Meta */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <SectionHeader icon={FileCheck} title="Booking Metadata" />

              <div className="space-y-1">
                <InfoRow
                  label="Booking Ref"
                  value={
                    <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                      {data.booking?.bookingNumber || 'N/A'}
                    </span>
                  }
                />
                <InfoRow
                  label="Confirmed"
                  value={data.confirmed ? 'Yes' : 'No'}
                />
                {data.booking?.rideId && (
                  <InfoRow
                    label="Ride ID"
                    value={
                      <span className="font-mono text-xs text-blue-600 hover:underline cursor-pointer">
                        #{data.booking.rideId.slice(-6)}
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
