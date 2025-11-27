export interface IFareCalculator {
  getFare(costPerKm: number, distanceInKm: number): number;
  getHikerAmount(costSharing: number): {
    platformFee: number;
    totalAmount: number;
  };
  getRiderEarning(costSharing: number): {
    platformFee: number;
    totalEarning: number;
  };
}
