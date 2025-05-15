'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TaskList from '@/components/todoPage/TaskList';
import { TaskFilter as FilterType } from '@/types/task';

interface TaskListCardProps {
    filter: FilterType;
    taskSummary: string;
}

export function TaskListCard({ filter, taskSummary }: TaskListCardProps) {
    return (
        <Card className="overflow-hidden max-w-full">
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Your Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <TaskList filter={filter} />
            </CardContent>
            <CardFooter className="flex flex-wrap">
                <span className="text-xs font-medium text-foreground">Tasks Summary:</span>
                <span className="text-xs pl-2 text-muted-foreground">{taskSummary}</span>
            </CardFooter>
        </Card>
    );
}
