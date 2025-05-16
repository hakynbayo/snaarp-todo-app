"use client";
import { useState } from 'react';
import { Task } from '@/types/task';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { TaskDetails } from '@/components/shared/TaskDetails';
import { TaskActionButtons } from '@/components/shared/TaskActionButtons';
import { Input } from '../ui/input';
import { Loading } from '../LoadingState';
import { motion, AnimatePresence } from 'framer-motion';
import { EditTaskForm } from '../todo/EditTaskForm';

export default function TaskCardItems({ task, isLoading }: { task: Task; isLoading?: boolean }) {
    // State variables for managing task actions and transitions
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Hooks for updating and deleting tasks
    const updateMutation = useUpdateTask();
    const deleteMutation = useDeleteTask();

    // Toggles the completion status of the task
    const toggleComplete = () => {
        updateMutation.mutate({ ...task, completed: !task.completed });
    };

    // Starts the editing process for the task
    const startEditing = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsEditing(true);
            setEditedTask(task);
            setIsTransitioning(false);
        }, 300);
    };

    // Handles task deletion with a delay
    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            deleteMutation.mutate(task.id);
        }, 1000);
    };

    // Cancels the editing process
    const cancelEditing = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsEditing(false);
            setIsTransitioning(false);
        }, 300);
    };

    // Saves changes made to the task
    const saveChanges = () => {
        setIsTransitioning(true);
        updateMutation.mutate(editedTask, {
            onSuccess: () => {
                setTimeout(() => {
                    setIsEditing(false);
                    setIsTransitioning(false);
                }, 300);
            }
        });
    };

    // Displays a loading state if the component is in a loading state
    if (isLoading) {
        return <Loading />;
    }

    return (
        <AnimatePresence>
            {!isDeleting && (
                <motion.li
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: {
                            duration: 1,
                            ease: "easeInOut"
                        }
                    }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-y"
                >
                    {/* Task content container */}
                    <div className="px-4 flex items-center space-x-3 flex-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
                        {/* Checkbox for toggling task completion */}
                        <Input
                            type="checkbox"
                            checked={task.completed}
                            onChange={toggleComplete}
                            className="h-5 w-5 rounded accent-black"
                            disabled={isEditing || isTransitioning}
                        />

                        {/* Animate presence for switching between edit and view modes */}
                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.div
                                    key="edit-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex-1"
                                >
                                    {/* Task edit form */}
                                    <EditTaskForm
                                        task={editedTask}
                                        onTaskChange={setEditedTask}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="task-details"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex-1"
                                >
                                    {/* Display for tasks title, description and status */}
                                    <TaskDetails task={task} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Task actions (edit, save, cancel, delete) buttons */}
                    <motion.div
                        className='flex justify-end sm:items-center'
                        animate={{
                            opacity: isTransitioning ? 0.7 : 1,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <TaskActionButtons
                            isEditing={isEditing}
                            onEdit={startEditing}
                            onSave={saveChanges}
                            onCancel={cancelEditing}
                            onDelete={handleDelete}
                            disabled={isTransitioning}
                        />
                    </motion.div>
                </motion.li>
            )}
        </AnimatePresence>
    );
}
