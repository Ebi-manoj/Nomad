export interface IFareCalculator {
  getFare(costPerKm: number, distanceInKm: number): number;
  getHikerAmount(costSharing: number, platformFeePerc?: number): {
    platformFee: number;
    totalAmount: number;
  };
  getRiderEarning(costSharing: number, platformFeePerc?: number): {
    platformFee: number;
    totalEarning: number;
  };
}
