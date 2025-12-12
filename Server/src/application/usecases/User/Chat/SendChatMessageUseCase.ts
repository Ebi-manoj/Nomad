import { ChatMessage } from '../../../../domain/entities/ChatMessage';
import {
  ChatMessageDTO,
  SendChatMessageDTO,
} from '../../../../domain/dto/ChatDTO';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { IChatMessageRepository } from '../../../repositories/IChatMessageRepository';
import { ISendChatMessageUseCase } from './ISendChatMessageUseCase';

export class SendChatMessageUseCase implements ISendChatMessageUseCase {
  constructor(
    private readonly _chatRepository: IChatMessageRepository,
    private readonly _realtimeGateway: IRealtimeGateway
  ) {}

  async execute(data: SendChatMessageDTO): Promise<ChatMessageDTO> {
    const message = new ChatMessage({
      roomId: data.roomId,
      senderId: data.senderId,
      senderRole: data.senderRole,
      message: data.message,
    });

    const saved = await this._chatRepository.create(message);

    const dto: ChatMessageDTO = {
      id: saved.getId()!,
      roomId: saved.getRoomId(),
      senderId: saved.getSenderId(),
      senderRole: saved.getSenderRole(),
      message: saved.getMessage(),
      createdAt: saved.getCreatedAt(),
    };

    await this._realtimeGateway.emitToRoom(
      'rider',
      dto.roomId,
      'chat:message',
      dto
    );

    await this._realtimeGateway.emitToRoom(
      'hiker',
      dto.roomId,
      'chat:message',
      dto
    );

    return dto;
  }
}
