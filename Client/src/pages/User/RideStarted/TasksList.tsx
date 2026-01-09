import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { TaskCard } from './TaskCard';
import type { Task } from '@/types/task';
import { Package } from 'lucide-react';

interface TasksListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string, otp?: string) => Promise<void>;
}

export function TasksList({ tasks, onCompleteTask }: TasksListProps) {
  // Sort tasks: pending first (by priority), then completed
  const pendingTasks = tasks
    .filter(t => t.status === 'PENDING')
    .sort((a, b) => b.priority - a.priority);

  const completedTasks = tasks
    .filter(t => t.status === 'COMPLETED')
    .sort((a, b) => b.priority - a.priority);

  const sortedTasks = [...pendingTasks, ...completedTasks];

  const highestPriorityTask = pendingTasks[0];

  return (
    <Card className="h-full border border-gray-200 flex flex-col overflow-hidden w-full">
      <CardContent className="p-0 flex flex-col h-full overflow-hidden">
        {/* Header Section */}
        <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xl text-gray-900">Active Tasks</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-300 shadow-sm">
                  {pendingTasks.length} pending
                </span>
              </div>
            </div>

            {highestPriorityTask && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Next Priority
                  </span>
                </div>
                <p className="text-sm font-medium">
                  {highestPriorityTask.taskType.toUpperCase()} -{' '}
                  {highestPriorityTask.user.fullName}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Tasks List */}
        <div className="flex-1 overflow-hidden bg-white">
          <ScrollArea className="h-full w-full">
            <div className="p-4 space-y-4">
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task, index) => {
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      displayPriority={index + 1}
                      onComplete={onCompleteTask}
                    />
                  );
                })
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No active tasks</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Tasks will appear here when assigned
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
