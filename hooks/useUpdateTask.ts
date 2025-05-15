import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      // Update the task in storage
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
      // Pause ongoing fetches and save the current state
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];

      // update the task list
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Return the previous state for rollback if needed
      return { previousTasks };
    },

    onError: (err, updatedTask, context) => {
      // Goback to the previous state if the update fails
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    onSettled: () => {
      // Refresh the task list after success or failure
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
