export type TrendString = `${'+' | '-'}${number}%`;

export interface UserStatsDTO {
  totalRides: { count: number; trend: TrendString };
  totalHikes: { count: number; trend: TrendString };
  totalKm: { distance: number; trend: TrendString };
  totalSpent: { amount: number; trend: TrendString };
  totalEarnings: { amount: number; trend: TrendString };
  safetyScore: { score: number; rating: number };
}

export interface MonthlyActivityPointDTO {
  month: string;
  rides: number;
  hikes: number;
}

export interface MonthlyEarningPointDTO {
  month: string;
  earnings: number;
}

export interface MonthlySpendingPointDTO {
  month: string;
  spent: number;
}

export interface CostComparisonDTO {
  carpool: number;
  taxi: number;
  privateVehicle: number;
  savings: number;
}

export interface TopRouteDTO {
  from: string;
  to: string;
  count: number;
  km: number;
}

export interface RecentActivityDTO {
  id: string;
  type: 'ride' | 'hike';
  from: string;
  to: string;
  date: string; // human friendly e.g. "2 hours ago"
  amount: number;
  km: number;
  rating: number;
}

export interface EnvironmentalDTO {
  co2Saved: number; // kg
  treesEquivalent: number;
  fuelSaved: number; // liters
}

export interface AchievementDTO {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserDashboardDTO {
  stats: UserStatsDTO;
  monthlyActivity: MonthlyActivityPointDTO[];
  earnings: MonthlyEarningPointDTO[];
  spending: MonthlySpendingPointDTO[];
  costComparison: CostComparisonDTO;
  topRoutes: TopRouteDTO[];
  recentActivity: RecentActivityDTO[];
  environmental: EnvironmentalDTO;
  achievements: AchievementDTO[]; // can be empty for now
}
