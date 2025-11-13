import { GetTaskResponseDTO } from '../../domain/dto/TaskDTO';
import { Task } from '../../domain/entities/Task';
import { User } from '../../domain/entities/User';

export function GetTasksMapper(task: Task, user: User): GetTaskResponseDTO {
  return {
    id: task.getId()!,
    hikerId: task.getHikerId(),
    location: task.getLocation(),
    taskType: task.getTaskType(),
    priority: task.getPriority(),
    status: task.getStatus(),
    address: task.getAddress(),
    user: {
      fullName: user.getFullName(),
      isVerified: user.getAadhaarVerified() && user.getLicenceVerified(),
      rating: 4.5,
      profilePic: '',
    },
  };
}
