import React from 'react';
import { BadgeCheck, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/getStatusColor';
import type { HikerMatchedDTO } from '@/types/ride';

interface HikersSectionProps {
  hikersMatched: HikerMatchedDTO[];
}

export const HikersSection: React.FC<HikersSectionProps> = ({
  hikersMatched,
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-foreground">
        Hikers ({hikersMatched.length})
      </h2>
      <div className="space-y-4">
        {hikersMatched.map((hike, index) => {
          const actualCostShared = hike.amount - hike.refundAmount;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Side - Hiker Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-lg font-bold text-primary-foreground overflow-hidden shadow-md flex-shrink-0">
                    {hike.hiker.profilePic ? (
                      <img
                        src={hike.hiker.profilePic}
                        alt={hike.hiker.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      hike.hiker.fullName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-lg text-foreground">
                        {hike.hiker.fullName}
                      </p>
                      {hike.hiker.verified && (
                        <BadgeCheck className="text-primary" size={18} />
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star
                        size={14}
                        className="text-amber-400"
                        fill="currentColor"
                        stroke="currentColor"
                      />
                      <span className="text-sm font-medium text-muted-foreground">
                        {hike.hiker.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Pickup & Dropoff */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-success mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Pickup
                          </p>
                          <p className="text-sm text-foreground">
                            {hike.pickupAddress}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-destructive mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Drop-off
                          </p>
                          <p className="text-sm text-foreground">
                            {hike.destinationAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Payment Details */}
                <div className="space-y-3 lg:min-w-[240px]">
                  <div className="flex justify-between lg:justify-end">
                    <Badge className={getStatusColor(hike.status)}>
                      {hike.status}
                    </Badge>
                  </div>

                  <div className="space-y-2.5">
                    {/* Amount Paid */}
                    <div className="flex items-center justify-between lg:justify-end gap-3">
                      <span className="text-sm text-muted-foreground">
                        Cost Shared
                      </span>
                      <span className="text-sm font-bold text-success">
                        ₹{hike.amount - hike.platformFee}
                      </span>
                    </div>
                    <div className="flex items-center justify-between lg:justify-end gap-3">
                      <span className="text-sm text-muted-foreground">
                        PlatForm Fee
                      </span>
                      <span className="text-sm font-bold text-success">
                        +₹{hike.platformFee}
                      </span>
                    </div>

                    {/* Refund */}
                    {hike.status == 'CANCELLED' ? (
                      <>
                        <div className="flex items-center justify-between lg:justify-end gap-3">
                          <span className="text-sm text-muted-foreground">
                            Refunded
                          </span>
                          <span className="text-sm font-semibold text-destructive">
                            -₹{hike.refundAmount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-3 border-t border-border pt-2">
                          <span className="text-sm font-medium text-foreground">
                            Net Cost
                          </span>
                          <span className="text-base font-bold text-success">
                            ₹{actualCostShared}
                          </span>
                        </div>
                      </>
                    ) : null}

                    {/* Completed + No Refund => Cost Shared */}
                    {hike.status === 'COMPLETED' && (
                      <div className="flex items-center justify-between lg:justify-end gap-3 border-t border-border pt-2">
                        <span className="text-sm font-medium text-foreground">
                          Amount Paid
                        </span>
                        <span className="text-base font-bold text-success">
                          ₹{hike.amount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
