import type { ReqCancelBookingResDTO } from '@/types/hike';
export const RefundModel = ({
  refundData,
}: {
  refundData: ReqCancelBookingResDTO;
}) => {
  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <p className="text-[11px] text-gray-500 tracking-wide">
            Estimated Rider Arrival
          </p>
          <p className="font-semibold text-sm sm:text-base mt-1">
            {refundData.durationToPickup.toFixed(2)} mins
          </p>
        </div>

        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <p className="text-[11px] text-gray-500 tracking-wide">
            Distance to Pickup
          </p>
          <p className="font-semibold text-sm sm:text-base mt-1">
            {refundData.distanceRiderAway.toFixed(2)} km
          </p>
        </div>

        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <p className="text-[11px] text-gray-500 tracking-wide">Rider Delay</p>
          <p
            className={`font-semibold  text-sm sm:text-base mt-1 ${
              refundData.isRiderDelay ? 'text-red-500' : 'text-green-400'
            }`}
          >
            {refundData.isRiderDelay ? 'Delayed' : 'On Time'}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] text-gray-500 tracking-wide">
            Refund Amount
          </p>
          <p className="font-semibold text-blue-600 text-lg sm:text-xl mt-1">
            ₹ {refundData.refundAmount}
          </p>
        </div>
      </div>

      {/* Rules Section */}
      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-600">Refund Rules</p>

        <ul className="text-[11px] sm:text-xs text-gray-500 list-disc pl-5 mt-1 space-y-1">
          <li>If rider is late more than 10mins→ Full refund</li>
          <li>If rider is more than 5 km away → 50% refund</li>
          <li>If rider is within 5 km → No refund</li>
        </ul>
      </div>
    </div>
  );
};
