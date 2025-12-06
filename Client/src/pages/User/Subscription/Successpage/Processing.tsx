import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const ProcessingLoader = ({ attempts }: { attempts: number }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto border-4 border-muted border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Processing Your Subscription
        </h2>
        <p className="text-muted-foreground mb-6">
          This usually takes just a few seconds...
        </p>
        {attempts > 10 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <p className="text-foreground mb-2 font-medium">
                This is taking longer than expected.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Don't worry! You'll receive an email once your subscription is
                ready.
              </p>
              <Button className="w-full">Continue to Dashboard</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
