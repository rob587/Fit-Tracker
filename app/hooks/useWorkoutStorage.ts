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
};
