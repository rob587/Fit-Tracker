import { Exercise } from "@/app/types";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Modal, Text, TextInput } from "react-native-paper";

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

  return (
    <Modal visible={isVisible} onDismiss={handleAnnulla}>
      <View
        style={{
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
          Aggiungi Esercizio
        </Text>

        <TextInput
          label="Nome Esercizio"
          placeholder="Es. Panca Piana, Trazioni, Squat..."
          value={nomeEsercizio}
          onChangeText={setNomeEsercizio}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button mode="outlined" onPress={handleAnnulla} style={{ flex: 1 }}>
            Annulla
          </Button>

          <Button mode="contained" onPress={handleSave} style={{ flex: 1 }}>
            Salva
          </Button>
        </View>
      </View>
    </Modal>
  );
};
