import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ShowError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-4xl text-destructive">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Something Went Wrong
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't process your subscription. Please contact support.
          </p>
          <Button className="w-full">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};
