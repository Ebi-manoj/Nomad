export interface ChatInterfaceProps {
  onBack: () => void;
  role: 'rider' | 'hiker';
  user: {
    name: string;
    profilePic: string;
    verified: boolean;
    rating: number;
    socketId: string;
  };
}
export interface ChatMessageDTO {
  id: string;
  roomId: string;
  senderId: string;
  senderRole: 'rider' | 'hiker';
  message: string;
  createdAt: string;
}
