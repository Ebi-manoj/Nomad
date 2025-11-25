import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactCardProps {
  name: string;
  phone: string;
  relationship: string;
}

const ContactCard = ({ name, phone, relationship }: ContactCardProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="p-6 border-2 hover:border-foreground transition-all duration-200">
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
        </div>
      </div>
    </Card>
  );
};

export default ContactCard;
