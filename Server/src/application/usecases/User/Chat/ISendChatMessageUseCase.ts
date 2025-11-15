import type { ChatMessageDTO, SendChatMessageDTO } from '../../../../domain/dto/ChatDTO';

export interface ISendChatMessageUseCase {
  execute(data: SendChatMessageDTO): Promise<ChatMessageDTO>;
}
