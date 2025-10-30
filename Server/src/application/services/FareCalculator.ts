export class FareCalculator {
  getFare(costPerKm: number, distanceInKm: number): number {
    const totalFare = costPerKm * distanceInKm;
    return Number(totalFare.toFixed(2));
  }
}
