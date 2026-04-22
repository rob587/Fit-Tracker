export interface Set {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  weightUnit: "kg";
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  createdAt: string;
}

export interface Session {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}

export type WorkoutData = Session[];
