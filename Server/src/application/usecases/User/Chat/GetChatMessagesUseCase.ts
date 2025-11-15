import type {
  ChatMessageDTO,
  GetChatMessagesReqDTO,
} from '../../../../domain/dto/ChatDTO';
import type { IChatMessageRepository } from '../../../repositories/IChatMessageRepository';
import type { IGetChatMessagesUseCase } from './IGetChatMessagesUseCase';

export class GetChatMessagesUseCase implements IGetChatMessagesUseCase {
  constructor(private readonly chatRepository: IChatMessageRepository) {}

  async execute(data: GetChatMessagesReqDTO): Promise<ChatMessageDTO[]> {
    const messages = await this.chatRepository.findByRoomId(data.roomId);
    return messages.map(m => ({
      id: m.getId()!,
      roomId: m.getRoomId(),
      senderId: m.getSenderId(),
      senderRole: m.getSenderRole(),
      message: m.getMessage(),
      createdAt: m.getCreatedAt(),
    }));
  }
}
