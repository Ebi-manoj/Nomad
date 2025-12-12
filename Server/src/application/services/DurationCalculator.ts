import { IDurationCalculator } from './IDurationCalculator';

export class DurationCalculator implements IDurationCalculator {
  private readonly _AVG_SPEED = 40;
  durationBetweenTwoPoints(km: number): number {
    const durationInHours = km / this._AVG_SPEED;

    const durationInMinutes = Math.round(durationInHours * 60);
    return durationInMinutes;
  }
}
