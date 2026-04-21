import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  SegmentedButtons,
  Text,
} from "react-native-paper";

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

        <TextInput
          placeholder="Es. Corsa, Flessioni..."
          value={esercizio}
          onChangeText={setEsercizio}
          style={{ marginBottom: 15 }}
        />

        <TextInput
          placeholder="30"
          value={durata}
          onChangeText={setDurata}
          keyboardType="numeric"
          style={{ marginBottom: 15 }}
        />

        <Text
          variant="bodyMedium"
          style={{ marginBottom: 10, fontWeight: "600" }}
        >
          Tipo Allenamento
        </Text>
        <SegmentedButtons
          value={tipo}
          onValueChange={setTipo}
          buttons={[
            { value: "Cardio", label: "Cardio" },
            { value: "Strength", label: "Strength" },
          ]}
          style={{ marginBottom: 15 }}
        />

        {/* INPUT NOTE */}
        <TextInput
          placeholder="Note facoltative..."
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={3}
          style={{ marginBottom: 20 }}
        />

        {/* BOTTONI */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button mode="outlined" onPress={handleAnnulla} style={{ flex: 1 }}>
            Annulla
          </Button>

          <Button mode="contained" onPress={handleSave} style={{ flex: 1 }}>
            Salva
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
