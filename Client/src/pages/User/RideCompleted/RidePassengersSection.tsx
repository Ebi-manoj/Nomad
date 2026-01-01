import type { GetRideDetailsResDTO } from '@/types/ride';
import { formatDate, formatDuration } from '@/utils/dateFormater';
import { Users, Navigation, Clock, Star } from 'lucide-react';

interface RidePassengersSectionProps {
  hikersMatched: GetRideDetailsResDTO['hikersMatched'];
  grossCollected: number;
  onRateClick: (
    bookingId: string,
    hikerUserId: string,
    hikerName: string
  ) => void;
}

export const RidePassengersSection = ({
  hikersMatched,
  grossCollected,
  onRateClick,
}: RidePassengersSectionProps) => {
  return (
    <div className="border-t pt-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Your Passengers
            </h3>
            <p className="text-xs text-muted-foreground">
              {hikersMatched.length} people rode with you
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total collected</p>
          <p className="text-lg font-bold text-green-600">
            ₹{grossCollected.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {hikersMatched.map(booking => (
          <div
            key={booking.bookingId}
            className="flex items-center gap-4 p-4 border rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {booking.hiker.profilePic}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">
                  {booking.hiker.fullName}
                </h4>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    booking.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {booking.pickupAddress} → {booking.destinationAddress}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                  <Navigation className="w-3 h-3 text-amber-500" />
                  <span className="font-medium">
                    {booking.totalDistance.toFixed(2)} km
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                  <Users className="w-3 h-3 text-indigo-500" />
                  <span className="font-medium">
                    {booking.seatsBooked} Seat
                    {booking.seatsBooked > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                  <Clock className="w-3 h-3 text-rose-600" />
                  {booking.status === 'COMPLETED' && (
                    <p className="text-xs text-muted-foreground">
                      Duration:{' '}
                      {formatDuration(booking.createdAt, booking.completedAt!)}
                    </p>
                  )}
                  {booking.status === 'CANCELLED' && (
                    <p className="text-xs text-muted-foreground">
                      CancelledAt:{' '}
                      {booking.cancelledAt && formatDate(booking.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="font-bold text-green-600 text-lg">
                ₹{(booking.amount - booking.refundAmount).toFixed(2)}
              </p>
              {booking.status === 'COMPLETED' && (
                <button
                  type="button"
                  className="cursor-pointer mt-2 inline-flex items-center justify-center rounded-full border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!!booking.review}
                  onClick={() =>
                    onRateClick(
                      booking.bookingId,
                      booking.hiker.userId,
                      booking.hiker.fullName
                    )
                  }
                >
                  {!!booking.review ? (
                    'Rated'
                  ) : (
                    <span className="flex items-center gap-1">
                      Rate <Star className="w-3 h-3" />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
