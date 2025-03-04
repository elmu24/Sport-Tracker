import { create } from 'zustand';

export const useStore = create((set) => ({
  exercises: [],
  goals: {
    Swimming: 50,
    Running: 100,
    Cycling: 200,
  },
  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),
  updateGoals: (newGoals) =>
    set((state) => ({
      goals: { ...state.goals, ...newGoals },
    })),
}));