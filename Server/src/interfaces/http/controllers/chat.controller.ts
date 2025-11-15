import type { IGetChatMessagesUseCase } from '../../../application/usecases/User/Chat/IGetChatMessagesUseCase';
import type { ISendChatMessageUseCase } from '../../../application/usecases/User/Chat/ISendChatMessageUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import type { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import type { IChatController } from './IChatController';

export class ChatController implements IChatController {
  constructor(
    private readonly getChatMessagesUseCase: IGetChatMessagesUseCase,
    private readonly sendChatMessageUseCase: ISendChatMessageUseCase
  ) {}

  async getMessages(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { roomId } = httpRequest.path as { roomId: string };

    const result = await this.getChatMessagesUseCase.execute({
      roomId,
      userId,
    });

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendMessage(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { roomId, senderRole, message } = httpRequest.body as {
      roomId: string;
      senderRole: 'rider' | 'hiker';
      message: string;
    };

    const result = await this.sendChatMessageUseCase.execute({
      roomId,
      senderRole,
      message,
      senderId: userId,
    });

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
