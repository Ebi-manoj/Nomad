import { IFareCalculator } from './IFareCalculator';

export class FareCalculator implements IFareCalculator {
  private readonly _platformFeePerc = 10;
  private readonly _minimumFare = 50;
  getFare(costPerKm: number, distanceInKm: number): number {
    const totalFare = costPerKm * distanceInKm;
    const finalFare = Math.max(totalFare, this._minimumFare);
    return Number(finalFare.toFixed(2));
  }

  getHikerAmount(
    costSharing: number,
    platformFeePerc = this._platformFeePerc
  ): {
    platformFee: number;
    totalAmount: number;
  } {
    const platformFee = Number(
      ((costSharing * platformFeePerc) / 100).toFixed(2)
    );
    const totalAmount = Number(platformFee + costSharing);
    return { platformFee, totalAmount };
  }
  getRiderEarning(
    costSharing: number,
    platformFeePerc = this._platformFeePerc
  ): {
    platformFee: number;
    totalEarning: number;
  } {
    const platformFee = Number(
      ((costSharing * platformFeePerc) / 100).toFixed(2)
    );
    const totalEarning = Number((costSharing - platformFee).toFixed(2));
    return { platformFee, totalEarning };
  }
}
