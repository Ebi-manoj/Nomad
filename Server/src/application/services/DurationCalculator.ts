import { IDurationCalculator } from './IDurationCalculator';

export class DurationCalculator implements IDurationCalculator {
  private readonly AVG_SPEED = 40;
  durationBetweenTwoPoints(km: number): number {
    const durationInHours = km / this.AVG_SPEED;

    const durationInMinutes = Math.round(durationInHours * 60);
    return durationInMinutes;
  }
}
