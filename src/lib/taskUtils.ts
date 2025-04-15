
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompletedTask {
  recipeId: string;
  taskIndex: number;
  completedAt: number;
}

export interface RecipeTasksStore {
  completedTasks: CompletedTask[];
  points: number;
  addCompletedTask: (recipeId: string, taskIndex: number) => void;
  removeCompletedTask: (recipeId: string, taskIndex: number) => void;
  isTaskCompleted: (recipeId: string, taskIndex: number) => boolean;
  getCompletedTasksCount: (recipeId: string) => number;
}

export const useRecipeTasks = create<RecipeTasksStore>()(
  persist(
    (set, get) => ({
      completedTasks: [],
      points: 0,
      
      addCompletedTask: (recipeId: string, taskIndex: number) => {
        const isAlreadyCompleted = get().isTaskCompleted(recipeId, taskIndex);
        
        if (!isAlreadyCompleted) {
          set((state) => ({
            completedTasks: [...state.completedTasks, {
              recipeId,
              taskIndex,
              completedAt: Date.now()
            }],
            points: state.points + 10 // Award 10 points per completed task
          }));
        }
      },
      
      removeCompletedTask: (recipeId: string, taskIndex: number) => {
        set((state) => ({
          completedTasks: state.completedTasks.filter(
            task => !(task.recipeId === recipeId && task.taskIndex === taskIndex)
          ),
          points: Math.max(0, state.points - 10) // Remove 10 points, but don't go below 0
        }));
      },
      
      isTaskCompleted: (recipeId: string, taskIndex: number) => {
        return get().completedTasks.some(
          task => task.recipeId === recipeId && task.taskIndex === taskIndex
        );
      },
      
      getCompletedTasksCount: (recipeId: string) => {
        return get().completedTasks.filter(task => task.recipeId === recipeId).length;
      }
    }),
    {
      name: 'recipe-tasks-storage'
    }
  )
);
