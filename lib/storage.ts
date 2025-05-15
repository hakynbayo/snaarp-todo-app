import { Task } from "@/types/task";

const TASKS_KEY = "todo-app-tasks"; // Key used to store tasks in localStorage

// Retrieves tasks from localStorage
export const getTasks = (): Task[] => {
  if (typeof window === "undefined") return []; // Return empty array if not in a browser environment
  const data = localStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : []; // Parse and return tasks, or return an empty array if no data
};

// Saves tasks to localStorage
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); // Convert tasks to JSON and store in localStorage
};
