export class FareCalculator {
  private readonly platformFeePerc = 10;
  getFare(costPerKm: number, distanceInKm: number): number {
    const totalFare = costPerKm * distanceInKm;
    return Number(totalFare.toFixed(2));
  }

  getHikerAmount(costSharing: number): {
    platformFee: number;
    totalAmount: number;
  } {
    const platformFee = Number(
      ((costSharing * this.platformFeePerc) / 100).toFixed(2)
    );
    const totalAmount = Number(platformFee + costSharing);
    return { platformFee, totalAmount };
  }
}
