export interface ChatInterfaceProps {
  onBack: () => void;
  user: {
    name: string;
    profilePic: string;
    verified: boolean;
    rating: number;
    socketId: string;
  };
}
