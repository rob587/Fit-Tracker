import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Session } from "../types";

const STORAGE_KEY = "workouts_data";

export const useWorkoutStorage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // carica le sessioni dall'asyncstorage

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

  //   salvataggio delle sessioni

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

  //   aggiunge una nuova sessione

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

  //   aggiorna una sessione esistente

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

  //   cancella una sessione

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
};
