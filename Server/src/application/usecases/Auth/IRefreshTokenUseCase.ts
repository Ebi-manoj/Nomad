import {
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from '../../../domain/dto/authDTO';

export interface IRefreshTokenUseCase {
  execute(data: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO>;
}
