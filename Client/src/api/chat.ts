import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { ChatMessageDTO } from '@/types/chat';

const GET_CHAT_MESSAGES_API = (roomId: string) => `/chat/${roomId}`;
const SEND_CHAT_MESSAGE_API = '/chat';

export async function getChatMessages(roomId: string) {
  const res = await axiosInstance.get<ApiResponse<ChatMessageDTO[]>>(
    GET_CHAT_MESSAGES_API(roomId)
  );
  return res.data.data;
}

export async function sendChatMessage(
  roomId: string,
  senderRole: 'rider' | 'hiker',
  message: string
) {
  const res = await axiosInstance.post<ApiResponse<ChatMessageDTO>>(
    SEND_CHAT_MESSAGE_API,
    {
      roomId,
      senderRole,
      message,
    }
  );
  return res.data.data;
}
