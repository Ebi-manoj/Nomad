import { ChatMessage } from '../../domain/entities/ChatMessage';
import { IBaseRepository } from './IBaseRepository';

export interface IChatMessageRepository
  extends IBaseRepository<ChatMessage> {
  findByRoomId(roomId: string): Promise<ChatMessage[]>;
}
