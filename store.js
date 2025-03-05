import { create } from 'zustand';

export const useStore = create((set) => ({
  // Storing of new exercise  in an empty array
  exercises: [],

  // Default exercise goals
  goals: {
    Swimming: 50,
    Running: 100,
    Cycling: 200,
  },

  // Adds exercise to exercise array
  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),

    //Updating goals
  updateGoals: (newGoals) =>
    set((state) => ({
      goals: { ...state.goals, ...newGoals },
    })),
}));