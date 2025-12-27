export interface ChangePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordUseCase {
  execute(data: ChangePasswordRequest): Promise<{ message: string }>;
}
