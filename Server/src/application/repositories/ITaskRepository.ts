import { Task } from '../../domain/entities/Task';
import { IBaseRepository } from './IBaseRepository';

export interface ITaskRepository extends IBaseRepository<Task> {
  findByRiderId(riderId: string, rideId?: string): Promise<Task[]>;
  findByRideBookingId(rideBookingId: string): Promise<Task[]>;
  findByRideId(rideId: string): Promise<Task[]>;
  findPendingPickupTasks(riderId: string, rideId: string): Promise<Task[]>;
  findPendingDropoffTasks(riderId: string, rideId: string): Promise<Task[]>;
  findPendingTasks(rideId: string): Promise<Task[]>;
}
