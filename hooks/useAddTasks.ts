/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/types/task";

interface AddTaskParams {
  title: string;
  description?: string;
}

// Custom hook to handle adding a new task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, AddTaskParams>({
    // Mutation function to add a new task
    mutationFn: async ({ title, description }) => {
      try {
        const tasks = getTasks(); // Fetch existing tasks
        const newTask: Task = {
          id: Date.now().toString(),
          title,
          description: description || undefined,
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        const updatedTasks = [...tasks, newTask]; // Add the new task to the list
        saveTasks(updatedTasks); // Save updated tasks
        return newTask;
      } catch (error) {
        throw new Error("Failed to add task"); // Handle errors
      }
    },
    onSuccess: (newTask) => {
      // Update the cache directly for instant UI update
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks = []) => [
        ...oldTasks,
        newTask,
      ]);

      // Invalidate queries to ensure sync with server
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error adding task:", error); // Log errors
    },
  });
};
