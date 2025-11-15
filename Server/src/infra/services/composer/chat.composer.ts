import { GetChatMessagesUseCase } from '../../../application/usecases/User/Chat/GetChatMessagesUseCase';
import { SendChatMessageUseCase } from '../../../application/usecases/User/Chat/SendChatMessageUseCase';
import type { IChatController } from '../../../interfaces/http/controllers/IChatController';
import { ChatController } from '../../../interfaces/http/controllers/chat.controller';
import { SocketServer } from '../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../providers/SocketRealtimeGateway';
import { ChatMessageRepository } from '../../repositories/ChatMessageRepository';


export function chatComposer(): IChatController {
  const chatRepository = new ChatMessageRepository();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);

  const getChatMessagesUseCase = new GetChatMessagesUseCase(chatRepository);
  const sendChatMessageUseCase = new SendChatMessageUseCase(
    chatRepository,
    realtimeGateway
  );

  return new ChatController(getChatMessagesUseCase, sendChatMessageUseCase);
}
