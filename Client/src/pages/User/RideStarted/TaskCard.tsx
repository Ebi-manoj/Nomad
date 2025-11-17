import { useState } from 'react';
import {
  MapPin,
  MapPinOff,
  Clock,
  User,
  CheckCircle,
  Package,
  TrendingUp,
  Star,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Task } from '@/types/task';
import { useRideRoute } from '@/context/RiderHikesRoutesContext';

interface TaskCardProps {
  task: Task;
  displayPriority: number;
  onComplete: (taskId: string, otp?: string) => void;
}

export function TaskCard({ task, displayPriority, onComplete }: TaskCardProps) {
  const [otpInput, setOtpInput] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      if (task.taskType === 'PICKUP') {
        onComplete(task.id, otpInput);
      } else {
        onComplete(task.id);
      }
    } finally {
      setIsCompleting(false);
    }
  };
  const { showRoute } = useRideRoute();
  const handleShowLocation = () => {
    const [lng, lat] = task.location.coordinates;
    const route = {
      pickup: task.taskType == 'PICKUP' ? { lat, lng } : undefined,
      dropoff: task.taskType == 'DROPOFF' ? { lat, lng } : undefined,
    };
    showRoute(route, '');
  };

  const getPriorityStyles = (priority: number) => {
    if (priority === 1)
      return {
        bg: 'bg-gradient-to-br from-red-50 to-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        badge: 'bg-red-500',
        ring: 'ring-2 ring-red-200',
      };
    if (priority === 2)
      return {
        bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-300',
        badge: 'bg-amber-500',
        ring: 'ring-2 ring-amber-200',
      };
    return {
      bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      badge: 'bg-slate-500',
      ring: 'ring-1 ring-slate-200',
    };
  };

  const priorityStyles = getPriorityStyles(displayPriority);
  const isPickup = task.taskType === 'PICKUP';

  return (
    <Card
      className={`border-2 ${priorityStyles.border} ${priorityStyles.ring} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
    >
      <CardContent className="p-0">
        {/* Priority Banner */}
        <div
          className={`${priorityStyles.bg} px-4 py-2 flex items-center justify-between border-b-2 ${priorityStyles.border}`}
        >
          <div className="flex items-center gap-2">
            {isPickup ? (
              <div className="p-1.5 bg-green-500 rounded-lg shadow-sm">
                <Package className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="p-1.5 bg-blue-500 rounded-lg shadow-sm">
                <MapPinOff className="w-4 h-4 text-white" />
              </div>
            )}
            <span
              className={`font-bold text-sm ${priorityStyles.text} uppercase tracking-wide`}
            >
              {task.taskType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`${priorityStyles.badge} text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1`}
            >
              <TrendingUp className="w-3 h-3" />
              Priority {displayPriority}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                {task.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 shadow-md">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {task.user.fullName}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {task.user.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 flex-1 leading-relaxed">
                {task.address}
              </p>
            </div>
            <Button
              onClick={handleShowLocation}
              variant="outline"
              size="sm"
              className="w-full mt-2 bg-white hover:bg-gray-50 border-gray-300 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 mr-2" />
              View on Map
            </Button>
          </div>

          {/* ETA */}
          {task.estimatedTime && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium">ETA: {task.estimatedTime}</span>
            </div>
          )}

          {/* Action Section */}
          {task.status === 'PENDING' && (
            <div className="pt-3 border-t border-gray-200">
              {isPickup && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter OTP from Hiker
                    </label>
                    <Input
                      type="text"
                      placeholder="******"
                      value={otpInput}
                      onChange={e =>
                        setOtpInput(e.target.value.replace(/\D/g, ''))
                      }
                      maxLength={6}
                      className="text-center text-2xl font-bold tracking-widest border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                  <Button
                    onClick={handleComplete}
                    disabled={otpInput.length !== 6 || isCompleting}
                    className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isCompleting ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Pickup
                      </>
                    )}
                  </Button>
                </div>
              )}

              {!isPickup && (
                <>
                  <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-3 flex  gap-2 items-center mb-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertTriangle className="text-red-300" size={16} />
                    </div>
                    <p className="text-sm font-medium text-amber-800 leading-relaxed">
                      Make sure Hiker is marked as{' '}
                      <span className="font-bold">Dropped Off</span> first
                    </p>
                  </div>
                  <Button
                    onClick={handleComplete}
                    disabled={isCompleting}
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {isCompleting ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Dropoff
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          {task.status === 'COMPLETED' && (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold py-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5" />
                Task Completed
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
