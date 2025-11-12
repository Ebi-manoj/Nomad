import { Types } from 'mongoose';
import { Task } from '../../domain/entities/Task';
import { IMapper } from '../mappers/IMapper';
import { ITaskDocument } from '../database/Task.model';

export const taskMapper: IMapper<Task, ITaskDocument> = {
  toPersistence(domain: Task): Partial<ITaskDocument> {
    return {
      rideId: new Types.ObjectId(domain.getRideId()),
      rideBookingId: new Types.ObjectId(domain.getRideBookingId()),
      riderId: new Types.ObjectId(domain.getRiderId()),
      hikerId: new Types.ObjectId(domain.getHikerId()),
      taskType: domain.getTaskType(),
      location: domain.getLocation(),
      address: domain.getAddress(),
      priority: domain.getPriority(),
      otp: domain.getOtp(),
      status: domain.getStatus(),
      completedAt: domain.getCompletedAt(),
    };
  },

  toDomain(persistence: ITaskDocument): Task {
    return new Task({
      id: persistence._id?.toString(),
      rideId: persistence.rideId.toString(),
      rideBookingId: persistence.rideBookingId.toString(),
      riderId: persistence.riderId.toString(),
      hikerId: persistence.hikerId.toString(),
      taskType: persistence.taskType,
      location: persistence.location,
      address: persistence.address,
      priority: persistence.priority,
      otp: persistence.otp,
      status: persistence.status,
      completedAt: persistence.completedAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  },
};
