import { Card, CardContent } from '@/components/ui/card';

export const StatsCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <Card>
    <CardContent className="p-6 flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </CardContent>
  </Card>
);
