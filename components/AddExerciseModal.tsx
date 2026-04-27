import { Exercise } from "@/app/types";
import React, { useState } from "react";
import { Alert } from "react-native";

interface AddExerciseModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddExercise: (exercise: Exercise) => Promise<void>;
}

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  isVisible,
  onClose,
  onAddExercise,
}) => {
  const [nomeEsercizio, setNomeEsercizio] = useState("");

  const validaForm = (): boolean => {
    if (!nomeEsercizio.trim()) {
      Alert.alert("Errore", "Inserisci un nome per l'esercizio");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setNomeEsercizio("");
  };

  const handleSave = async () => {
    if (!validaForm) return;

    try {
      const nuovoEsercizio: Exercise = {
        id: Date.now().toString(),
        name: nomeEsercizio,
        sets: [],
        createdAt: new Date().toISOString(),
      };
      await onAddExercise(nuovoEsercizio);
      Alert.alert("Successo", `Esercizio "${nomeEsercizio}" aggiunto!`);
      resetForm();
      onClose();
    } catch (error) {
      Alert.alert("Errore", "Errore nel salvare l'esercizio");
      console.error("Error saving exercise:", error);
    }
  };

  const handleAnnulla = () => {
    resetForm();
    onClose();
  };
};
