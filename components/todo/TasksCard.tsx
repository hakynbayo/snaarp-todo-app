'use client';
import { useTasks } from '@/hooks/useTasks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TaskCardItems from '../shared/TaskCardItems';
import { TaskFilter as FilterType, Task } from '@/types/task';

interface TaskListCardProps {
    filter: FilterType;
    taskSummary: string;
}

// Displays a card component containing a task list and a summary of tasks.
export function TasksCard({ filter, taskSummary }: TaskListCardProps) {
    const { data: tasks, isLoading, error } = useTasks(filter);
    if (error) return <div className="p-4 text-center text-red-500">Error loading tasks</div>;

    return (
        <Card className="overflow-hidden max-w-full">
            {/* Card header with the title */}
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Your Tasks</CardTitle>
            </CardHeader>

            {/* Card content displaying the task list */}
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-200">
                    {isLoading ? (
                        // Show skeleton loaders while tasks are loading
                        Array.from({ length: 5 }).map((_, i) => (
                            <TaskCardItems key={`skeleton-${i}`} isLoading task={{} as Task} />
                        ))
                    ) : tasks?.length ? (
                        // Render the list of tasks if available
                        tasks.map((task) => <TaskCardItems key={task.id} task={task} />)
                    ) : (
                        // Show a message if no tasks are found
                        <li className="p-4 text-center text-gray-500">No tasks found</li>
                    )}
                </ul>
            </CardContent>

            {/* Card footer displaying the task summary */}
            <CardFooter className="flex flex-wrap">
                <span className="text-xs font-medium text-foreground">Tasks Summary:</span>
                <span className="text-xs pl-2 text-muted-foreground">{taskSummary}</span>
            </CardFooter>
        </Card>
    );
}
