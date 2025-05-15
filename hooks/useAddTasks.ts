import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/types/task";

interface AddTaskParams {
  title: string;
  description?: string;
}

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, AddTaskParams>({
    mutationFn: async ({ title, description }) => {
      try {
        const tasks = getTasks();
        const newTask: Task = {
          id: Date.now().toString(),
          title,
          description: description || undefined,
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        const updatedTasks = [...tasks, newTask];
        saveTasks(updatedTasks);
        return newTask;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error("Failed to add task");
      }
    },
    onSuccess: (newTask) => {
      // Update the cache directly for instant UI update
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks = []) => [
        ...oldTasks,
        newTask,
      ]);

      // Invalidate queries to ensure sync with server if needed
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
