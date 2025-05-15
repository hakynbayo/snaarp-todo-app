import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, saveTasks } from "@/lib/storage";

// Custom hook to handle task delete
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation function to delete a task by its ID
    mutationFn: (taskId: string) => {
      const tasks = getTasks();
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks);
      return Promise.resolve(taskId);
    },
    // Invalidate the "tasks" query to refresh the task list after deleting
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
