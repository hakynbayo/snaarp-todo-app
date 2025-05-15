import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/storage";
import { Task, TaskFilter } from "@/types/task";

export const useTasks = (filter: TaskFilter = "all") => {
  return useQuery<Task[]>({
    queryKey: ["tasks", filter],
    queryFn: () => {
      const tasks = getTasks();
      switch (filter) {
        case "active":
          return tasks.filter((task) => !task.completed);
        case "completed":
          return tasks.filter((task) => task.completed);
        default:
          return tasks;
      }
    },
  });
};
