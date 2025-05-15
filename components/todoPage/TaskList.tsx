import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';
import { Task, TaskFilter } from '@/types/task';

export default function TaskList({ filter }: { filter: TaskFilter }) {
    const { data: tasks, isLoading, error } = useTasks(filter);

    if (error) return <div className="p-4 text-center text-red-500">Error loading tasks</div>;

    return (
        <ul className="divide-y divide-gray-200">
            {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TaskItem key={`skeleton-${i}`} isLoading task={{} as Task} />
                ))
            ) : tasks?.length ? (
                tasks.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
                <li className="p-4 text-center text-gray-500">No tasks found</li>
            )}
        </ul>
    );
}
