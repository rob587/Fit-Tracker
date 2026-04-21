import React, { useState } from "react";
import { Alert } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

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

  //   funzione di salvataggio

  const handleSave = () => {
    if (!validaForm()) return;

    const workout = {
      id: Date.now(),
      esercizio,
      durata: parseInt(durata),
      tipo,
      note,
      data: new Date().toLocaleDateString("it-IT"),
    };

    console.log("Workout salvato:", workout);
    Alert.alert("Successo", `Allenamento "${esercizio}" aggiunto!`);

    resetForm();
    onClose();
  };

  // funzione annulla
  const handleAnnulla = () => {
    resetForm();
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={handleAnnulla}
        contentContainerStyle={{
          backgroundColor: "white",
          margin: 20,
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text
          variant="headlineSmall"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Aggiungi Allenamento
        </Text>
      </Modal>
    </Portal>
  );
};
