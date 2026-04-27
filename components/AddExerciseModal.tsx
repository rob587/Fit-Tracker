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
};
