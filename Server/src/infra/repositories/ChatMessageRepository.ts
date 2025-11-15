import { MongoBaseRepository } from './BaseRepository';
import type { IChatMessageRepository } from '../../application/repositories/IChatMessageRepository';
import { ChatMessage } from '../../domain/entities/ChatMessage';
import { ChatMessageModel, type IChatMessageDocument } from '../database/chatMessage.model';
import { chatMessageMapper } from '../mappers/chatMessageMapper';

export class ChatMessageRepository
  extends MongoBaseRepository<ChatMessage, IChatMessageDocument>
  implements IChatMessageRepository
{
  constructor() {
    super(ChatMessageModel, chatMessageMapper);
  }

  async findByRoomId(roomId: string): Promise<ChatMessage[]> {
    const found = await this.model
      .find({ roomId })
      .sort({ createdAt: 1 });
    return found.map(doc => this.mapper.toDomain(doc));
  }
}
