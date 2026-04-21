import React, { useState } from "react";
import { Alert } from "react-native";

interface AddWorkoutModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [esercizio, setEsercizio] = useState("");
  const [durata, setDurata] = useState("");
  const [tipo, setTipo] = useState("Cardio"); // default value
  const [note, setNote] = useState("");

  const validaForm = () => {
    if (!esercizio.trim()) {
      Alert.alert("Errore", "inserisci un esercizio");
      return false;
    }

    if (!durata.trim() || parseInt(durata) <= 0) {
      Alert.alert("Errore", "La durata deve essere maggiore di 0");
      return false;
    }

    if (!tipo) {
      Alert.alert("Errore", "Seleziona un tipo di allenamento");
      return false;
    }

    return true;
  };
  //   funzione di reset
  const resetForm = () => {
    setEsercizio("");
    setDurata("");
    setTipo("Cardio");
    setNote("");
  };

  // funzione annulla
  const handleAnnulla = () => {
    resetForm();
    onClose();
  };
};
