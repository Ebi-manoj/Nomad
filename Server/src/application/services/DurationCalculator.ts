export class DurationCalculator {
  private readonly AVG_SPEED = 40;
  durationBetweenTwoPoints(km: number): number {
    const durationInHours = km / this.AVG_SPEED;

    const durationInMinutes = Math.round(durationInHours * 60);
    return durationInMinutes;
  }
}
