export interface RegisterUserRequestDTO {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface RegisterUserResponseDTO {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  createdAt: Date;
  updateAdt: Date;
}
