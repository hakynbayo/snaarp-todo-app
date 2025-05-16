import { Input } from '@/components/ui/input';
import { Task } from '@/types/task';

export function EditTaskForm({
    task,
    onTaskChange,
}: {
    task: Task;
    onTaskChange: (updatedTask: Task) => void;
}) {
    return (
        <div className="flex-1 space-y-2 py-4">
            <Input
                value={task.title}
                onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
                className="w-full"
            />
            {task.description && (
                <Input
                    value={task.description}
                    onChange={(e) => onTaskChange({ ...task, description: e.target.value })}
                    className="w-full"
                    placeholder="Add description"
                />
            )}
        </div>
    );
}
