// hooks/useWorkoutStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Exercise, Session, WorkoutSet } from "../types";

const STORAGE_KEY = "workouts_data";

export const useWorkoutStorage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * CARICA tutte le sessioni da AsyncStorage
   * Si chiama automaticamente all'avvio
   */
  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        const parsedSessions: Session[] = JSON.parse(data);
        setSessions(parsedSessions);
      } else {
        setSessions([]);
      }
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento sessioni");
      console.error("Error loading sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * SALVA tutte le sessioni in AsyncStorage
   */
  const saveSessions = useCallback(async (data: Session[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSessions(data);
      setError(null);
    } catch (err) {
      setError("Errore nel salvataggio sessioni");
      console.error("Error saving sessions:", err);
    }
  }, []);

  /**
   * AGGIUNGE una nuova sessione
   */
  const addSession = useCallback(
    async (session: Session) => {
      try {
        const updatedSessions = [...sessions, session];
        await saveSessions(updatedSessions);
        return session;
      } catch (err) {
        setError("Errore nel aggiungere sessione");
        console.error("Error adding session:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * AGGIORNA una sessione esistente
   */
  const updateSession = useCallback(
    async (sessionId: string, updatedSession: Session) => {
      try {
        const updatedSessions = sessions.map((s) =>
          s.id === sessionId ? updatedSession : s,
        );
        await saveSessions(updatedSessions);
        return updatedSession;
      } catch (err) {
        setError("Errore nel aggiornare sessione");
        console.error("Error updating session:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * CANCELLA una sessione
   */
  const deleteSession = useCallback(
    async (sessionId: string) => {
      try {
        const updatedSessions = sessions.filter((s) => s.id !== sessionId);
        await saveSessions(updatedSessions);
        return true;
      } catch (err) {
        setError("Errore nel cancellare sessione");
        console.error("Error deleting session:", err);
        return false;
      }
    },
    [sessions, saveSessions],
  );

  /**
   * AGGIUNGE un esercizio a una sessione
   */
  const addExerciseToSession = useCallback(
    async (sessionId: string, exercise: Exercise) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: [...session.exercises, exercise],
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return exercise;
      } catch (err) {
        setError("Errore nel aggiungere esercizio");
        console.error("Error adding exercise:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * AGGIORNA un esercizio in una sessione
   */
  const updateExercise = useCallback(
    async (
      sessionId: string,
      exerciseId: string,
      updatedExercise: Exercise,
    ) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: session.exercises.map((ex) =>
                ex.id === exerciseId ? updatedExercise : ex,
              ),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return updatedExercise;
      } catch (err) {
        setError("Errore nel aggiornare esercizio");
        console.error("Error updating exercise:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * CANCELLA un esercizio da una sessione
   */
  const deleteExercise = useCallback(
    async (sessionId: string, exerciseId: string) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: session.exercises.filter((ex) => ex.id !== exerciseId),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return true;
      } catch (err) {
        setError("Errore nel cancellare esercizio");
        console.error("Error deleting exercise:", err);
        return false;
      }
    },
    [sessions, saveSessions],
  );

  /**
   * AGGIUNGE una serie a un esercizio
   */
  const addSetToExercise = useCallback(
    async (sessionId: string, exerciseId: string, set: WorkoutSet) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: session.exercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                  return {
                    ...exercise,
                    sets: [...exercise.sets, set],
                  };
                }
                return exercise;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return set;
      } catch (err) {
        setError("Errore nel aggiungere serie");
        console.error("Error adding set:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * AGGIORNA una serie
   */
  const updateSet = useCallback(
    async (
      sessionId: string,
      exerciseId: string,
      setId: string,
      updatedSet: WorkoutSet,
    ) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: session.exercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                  return {
                    ...exercise,
                    sets: exercise.sets.map((s) =>
                      s.id === setId ? updatedSet : s,
                    ),
                  };
                }
                return exercise;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return updatedSet;
      } catch (err) {
        setError("Errore nel aggiornare serie");
        console.error("Error updating set:", err);
      }
    },
    [sessions, saveSessions],
  );

  /**
   * CANCELLA una serie
   */
  const deleteSet = useCallback(
    async (sessionId: string, exerciseId: string, setId: string) => {
      try {
        const updatedSessions = sessions.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              exercises: session.exercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                  return {
                    ...exercise,
                    sets: exercise.sets.filter((s) => s.id !== setId),
                  };
                }
                return exercise;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        });
        await saveSessions(updatedSessions);
        return true;
      } catch (err) {
        setError("Errore nel cancellare serie");
        console.error("Error deleting set:", err);
        return false;
      }
    },
    [sessions, saveSessions],
  );

  /**
   * Carica le sessioni al primo render
   */
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    // State
    sessions,
    loading,
    error,

    // Operazioni Sessioni
    addSession,
    updateSession,
    deleteSession,
    loadSessions,

    // Operazioni Esercizi
    addExerciseToSession,
    updateExercise,
    deleteExercise,

    // Operazioni Serie
    addSetToExercise,
    updateSet,
    deleteSet,
  };
};
