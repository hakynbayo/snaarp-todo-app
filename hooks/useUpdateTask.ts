import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const tasks = getTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...updatedTask,
              updatedAt: Date.now(),
            }
          : task
      );
      saveTasks(updatedTasks);
      return updatedTask;
    },

    onMutate: async (updatedTask) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // capture the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];

      // Update to the new value
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Return a context object with the captured value
      return { previousTasks };
    },

    onError: (err, updatedTask, context) => {
      // Rollback to the previous value if mutation fails
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
