import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set: any) => ({
  tasks: [],
  
  addTask: (task: Task) => set((state: TaskStore) => ({
    tasks: [...state.tasks, task]
  })),
  
  updateTask: (id: string, updates: Partial<Task>) => set((state: TaskStore) => ({
    tasks: state.tasks.map((task: Task) =>
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  
  deleteTask: (id: string) => set((state: TaskStore) => ({
    tasks: state.tasks.filter((task: Task) => task.id !== id)
  })),
  
  setTasks: (tasks: Task[]) => set({ tasks })
}));

interface AuthStore {
  user: { id: string; email: string; name: string } | null;
  token: string | null;
  setUser: (user: AuthStore["user"]) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set: any) => ({
  user: null,
  token: null,
  
  setUser: (user: AuthStore["user"]) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  
  logout: () => set({ user: null, token: null })
}));

interface UIStore {
  sidebarOpen: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIStore>((set: any) => ({
  sidebarOpen: true,
  isDarkMode: false,
  
  toggleSidebar: () => set((state: UIStore) => ({
    sidebarOpen: !state.sidebarOpen
  })),
  
  toggleDarkMode: () => set((state: UIStore) => ({
    isDarkMode: !state.isDarkMode
  }))
}));
