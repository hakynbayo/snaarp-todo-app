'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import TaskForm from '@/components/tasks/TaskForm';

interface AddTaskButtonProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function AddTaskButton({ isOpen, setIsOpen }: AddTaskButtonProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Task
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <TaskForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
