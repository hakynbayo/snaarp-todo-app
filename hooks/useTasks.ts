import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/storage";
import { Task, TaskFilter } from "@/types/task";

// Custom hook to fetch and filter tasks based on the provided filter
export const useTasks = (filter: TaskFilter = "all") => {
  return useQuery<Task[]>({
    queryKey: ["tasks", filter], // Unique key for caching
    queryFn: () => {
      const tasks = getTasks(); // Fetch all tasks
      switch (filter) {
        case "active":
          return tasks.filter((task) => !task.completed); // Return only active tasks
        case "completed":
          return tasks.filter((task) => task.completed); // Return only completed tasks
        default:
          return tasks; // Return all tasks
      }
    },
  });
};
