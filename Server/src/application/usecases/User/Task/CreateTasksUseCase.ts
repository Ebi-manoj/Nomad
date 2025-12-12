import { RideBooking } from '../../../../domain/entities/RideBooking';
import { Task } from '../../../../domain/entities/Task';
import { TaskStatus, TaskType } from '../../../../domain/enums/Task';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { IPickupOTPService } from '../../../services/IPickupOTPService';
import { ITaskPrioritizationService } from '../../../services/ITaskPrioritizationService';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ICreateTasksUseCase } from './ICreateTaskUseCase';

export class CreateTasksUseCase implements ICreateTasksUseCase {
  constructor(
    private readonly _rideRepository: IRideRepository,
    private readonly _locationRepository: ILocationRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _pickupOTPService: IPickupOTPService,
    private readonly _taskPrioritizationService: ITaskPrioritizationService,
    private readonly _taskRepository: ITaskRepository,
    private readonly _realtimeGateway: IRealtimeGateway
  ) {}

  async execute(booking: RideBooking): Promise<void> {
    const isExist = await this._taskRepository.findByRideBookingId(
      booking.getId()!
    );

    if (isExist.length > 0) return;

    const ride = await this._rideRepository.findById(booking.getRideId());
    if (!ride) return;

    // Get current rider location
    const riderLocation = await this._locationRepository.getLocation(
      ride.getRideId()!
    );
    const currentLocation = riderLocation
      ? { lat: riderLocation.lat, lng: riderLocation.lng }
      : {
          lat: ride.getPickup().coordinates[1],
          lng: ride.getPickup().coordinates[0],
        };

    // Generate OTP for pickup
    const pickupOTP = this._pickupOTPService.generateOTP();

    // Get hike for addresses
    const hike = await this._hikeRepository.findById(booking.getHikeId());
    if (!hike) return;

    // Create pickup task
    const pickupTask = new Task({
      rideId: booking.getRideId(),
      rideBookingId: booking.getId()!,
      riderId: booking.getRiderId(),
      hikerId: booking.getHikerId(),
      taskType: TaskType.PICKUP,
      location: booking.getPickupLocation(),
      address: hike.getPickupAddress(),
      priority: 0,
      otp: pickupOTP,
      status: TaskStatus.PENDING,
    });

    // Create dropoff task
    const dropoffTask = new Task({
      rideId: booking.getRideId(),
      rideBookingId: booking.getId()!,
      riderId: booking.getRiderId(),
      hikerId: booking.getHikerId(),
      taskType: TaskType.DROPOFF,
      location: booking.getDropoffLocation(),
      address: hike.getDestinationAddress(),
      priority: 0,
      status: TaskStatus.PENDING,
    });

    // Get all existing tasks for this ride to prioritize together
    const existingTasks = await this._taskRepository.findByRideId(
      booking.getRideId()
    );
    const allTasks = [...existingTasks, pickupTask, dropoffTask];

    // Prioritize all tasks based on route
    const prioritizedTasks =
      await this._taskPrioritizationService.prioritizeTasks(
        allTasks,
        currentLocation,
        ride.getRoute()
      );

    // Update priorities and save new tasks
    const tasksToSave: Task[] = [];
    for (const task of prioritizedTasks) {
      if (!task.getId()) {
        // New task, save it
        tasksToSave.push(task);
      } else {
        // Existing task, update priority if changed
        const existingTask = existingTasks.find(
          t => t.getId() === task.getId()
        );
        if (existingTask && existingTask.getPriority() !== task.getPriority()) {
          await this._taskRepository.update(task.getId()!, task);
        }
      }
    }

    for (const task of tasksToSave) {
      await this._taskRepository.create(task);
    }

    await this._realtimeGateway.emitToRoom(
      'rider',
      booking.getRideId(),
      'ride:booking:confirmed',
      {
        bookingId: booking.getId(),
        rideId: booking.getRideId(),
        hikerId: booking.getHikerId(),
        message: 'New ride booking confirmed. Check your tasks!',
        tasksCount: prioritizedTasks.filter(
          t => t.getStatus() === TaskStatus.PENDING
        ).length,
      }
    );
  }
}
