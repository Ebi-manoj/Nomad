import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactCardProps {
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

const ContactCard = ({
  name,
  phone,
  email,
  relationship,
}: ContactCardProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="p-6 border-2 hover:border-foreground transition-all duration-200 relative group">
      <div className="flex justify-center items-center absolute top-2 right-5 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="cursor-pointer rounded-full hover:bg-gray-100 p-2">
          <Pencil size={16} className="text-blue-400" />
        </button>
        <button className="cursor-pointer rounded-full hover:bg-gray-100 p-2">
          <Trash2 size={16} className="text-red-500 cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-20 w-20 border-2 border-foreground">
          <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{relationship}</p>
        </div>

        <div className="w-full space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{phone}</span>
          </Button>
          {email && (
            <Button variant="outline" className="w-full justify-start gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{email}</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContactCard;
