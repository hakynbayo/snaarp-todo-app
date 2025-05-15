'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTask } from '@/hooks/useAddTasks';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus } from 'lucide-react';
import * as z from 'zod';
import { useState } from 'react'; // Added imports

const formSchema = z.object({
    title: z.string()
        .min(1, { message: 'Title is required' })
        .max(100, { message: 'Title must be less than 100 characters' }),
    description: z.string()
        .max(500, { message: 'Description must be less than 500 characters' })
        .optional(),
});

type TaskFormProps = {
    onSuccess?: () => void;
    className?: string;
};

export default function TaskForm({ onSuccess, className }: TaskFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const addMutation = useAddTask();
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for delay

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        // Add 3-second delay before submitting
        setTimeout(() => {
            addMutation.mutate({
                title: values.title,
                description: values.description || undefined,
            }, {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                }
            });
        }, 3000);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`space-y-4 ${className}`}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter task title..."
                                    {...field}
                                    disabled={addMutation.isPending || isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add details about your task..."
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                    disabled={addMutation.isPending || isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={addMutation.isPending || isSubmitting}
                        className="gap-2"
                    >
                        {addMutation.isPending || isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isSubmitting ? 'Adding Task...' : 'Adding Task...'}
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                Add Task
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
