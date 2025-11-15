import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatInterfaceProps {
  onBack: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { from: 'me' | 'other'; text: string }[]
  >([]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { from: 'me', text: message }]);
    setMessage('');
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
            src={'https://ui-avatars.com/api/?name='}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="font-semibold text-lg">{'userName'}</span>
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
