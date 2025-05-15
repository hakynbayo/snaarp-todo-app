import { useState } from 'react';
import { Task } from '@/types/task';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { TaskEditForm } from '@/components/tasks/TaskEditForm';
import { TaskView } from '@/components/tasks/TaskView';
import { TaskActions } from '@/components/tasks/TaskActions';
import { Input } from '../ui/input';
import { Loading } from '../LoadingState';

export default function TaskItem({ task, isLoading }: { task: Task; isLoading?: boolean }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const updateMutation = useUpdateTask();
    const deleteMutation = useDeleteTask();

    const toggleComplete = () => {
        updateMutation.mutate({ ...task, completed: !task.completed });
    };

    const handleDelete = () => {
        deleteMutation.mutate(task.id);
    };

    const startEditing = () => {
        setIsEditing(true);
        setEditedTask(task);
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const saveChanges = () => {
        updateMutation.mutate(editedTask, {
            onSuccess: () => setIsEditing(false)
        });
    };

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    return (
        <li className="flex items-center justify-between p-3 border-y">
            <div className="px-4 flex items-center space-x-3 flex-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
                <Input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete}
                    className="h-5 w-5 rounded accent-black"
                    disabled={isEditing}
                />

                {isEditing ? (
                    <TaskEditForm
                        task={editedTask}
                        onTaskChange={setEditedTask}
                    />
                ) : (
                    <TaskView task={task} />
                )}
            </div>

            <TaskActions
                isEditing={isEditing}
                onEdit={startEditing}
                onSave={saveChanges}
                onCancel={cancelEditing}
                onDelete={handleDelete}
            />
        </li>
    );
}
