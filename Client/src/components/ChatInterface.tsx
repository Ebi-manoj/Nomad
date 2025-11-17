import type { ChatInterfaceProps, ChatMessageDTO } from '@/types/chat';
import { ArrowLeft, Send, Star, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { getChatMessages, sendChatMessage } from '@/api/chat';

export default function ChatInterface({
  onBack,
  user,
  role,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { id?: string; from: 'me' | 'other'; text: string; createdAt?: string }[]
  >([]);

  const { riderSocket, hikerSocket } = useSocket();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const socket = role === 'rider' ? riderSocket : hikerSocket;
  const roomId = user.socketId;

  const handleIncoming = (m: ChatMessageDTO) => {
    if (m.roomId !== roomId) return;
    if (m.senderId === currentUserId) return;
    setMessages(prev => [
      ...prev,
      {
        id: m.id,
        from: 'other',
        text: m.message,
        createdAt: m.createdAt,
      },
    ]);
  };

  const loadChats = async () => {
    try {
      const history = await getChatMessages(roomId);
      setMessages(
        history.map(m => ({
          id: m.id,
          from: m.senderId === currentUserId ? 'me' : 'other',
          text: m.message,
          createdAt: m.createdAt,
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('chat:join', roomId);
    loadChats();
    socket.on('chat:message', handleIncoming);

    return () => {
      socket.off('chat:message', handleIncoming);
      socket.emit('chat:leave', roomId);
    };
  }, [socket, roomId, currentUserId]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessage('');

    try {
      const sent = await sendChatMessage(roomId, role, trimmed);
      setMessages(prev => [
        ...prev,
        {
          id: sent.id,
          from: 'me',
          text: sent.message,
          createdAt: sent.createdAt,
        },
      ]);
    } catch {}
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex items-center gap-3">
          <img
            src={
              user.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}`
            }
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">{user.name}</span>
              {user.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{user.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[75%] rounded-2xl shadow-sm text-sm ${
                msg.from === 'me'
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-gray-200 text-black rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BOX */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none text-sm"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-black text-white hover:bg-black/80 transition cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
