'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import AddTaskFormModal from './AddTaskFormModal';

interface AddTaskButtonProps {
    isOpen: boolean; // Indicates whether the dialog is open
    setIsOpen: (open: boolean) => void; // Function to toggle the dialog's open state
}

export function AddTaskButton({ isOpen, setIsOpen }: AddTaskButtonProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Button to trigger the dialog */}
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Task
                    </span>
                </Button>
            </DialogTrigger>

            {/* Dialog content */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                {/* Task form inside the dialog */}
                <AddTaskFormModal onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
