'use client';

import { useState } from 'react';
import { TaskFilter as FilterType } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskButton } from '@/components/todoPage/AddTaskButton';
import { TaskListCard } from '@/components/todoPage/TaskListCard';
import { TaskFilter } from '@/components/todoPage/TaskFilter';

export default function TodoPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [isOpen, setIsOpen] = useState(false);
  const { data: tasks = [] } = useTasks();

  // Calculate task summary
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  const taskSummary = `${activeCount} active, ${completedCount} completed`;

  return (
    <main className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Todo App</h1>

      <div className="flex gap-4 items-center justify-between">
        {/* Add Task Modal */}
        <AddTaskButton isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Filter Select */}
        <TaskFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* Task List in Card */}
      <TaskListCard filter={filter} taskSummary={taskSummary} />


    </main>
  );
}
