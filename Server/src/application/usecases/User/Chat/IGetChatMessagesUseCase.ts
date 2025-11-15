import type {
  ChatMessageDTO,
  GetChatMessagesReqDTO,
} from '../../../../domain/dto/ChatDTO';

export interface IGetChatMessagesUseCase {
  execute(data: GetChatMessagesReqDTO): Promise<ChatMessageDTO[]>;
}
