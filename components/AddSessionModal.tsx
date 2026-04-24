// components/AddSessionModal.tsx
import { Session } from "@/app/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, Platform, View } from "react-native";
import { Button, Modal, Text, TextInput } from "react-native-paper";

interface AddSessionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddSession: (session: Session) => Promise<void>;
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({
  isVisible,
  onClose,
  onAddSession,
}) => {
  const [nomeSessione, setNomeSessione] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validaForm = (): boolean => {
    if (!nomeSessione.trim()) {
      Alert.alert("Errore", "Inserisci un nome per la sessione");
      return false;
    }

    if (!selectedDate) {
      Alert.alert("Errore", "Seleziona una data");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setNomeSessione("");
    setSelectedDate(new Date());
  };

  const handleSalva = async () => {
    if (!validaForm()) return;

    try {
      const nuovaSessione: Session = {
        id: Date.now().toString(),
        name: nomeSessione,
        date: formatDate(selectedDate),
        exercises: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onAddSession(nuovaSessione);
      Alert.alert("Successo", `Sessione "${nomeSessione}" creata!`);
      resetForm();
      onClose();
    } catch (error) {
      Alert.alert("Errore", "Errore nel salvare la sessione");
      console.error("Error saving session:", error);
    }
  };

  const handleAnnulla = () => {
    resetForm();
    onClose();
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <Modal visible={isVisible} onDismiss={handleAnnulla}>
        <View
          style={{
            backgroundColor: "white",
            margin: 20,
            padding: 20,
            borderRadius: 12,
          }}
        >
          {/* TITOLO */}
          <Text
            variant="headlineSmall"
            style={{ marginBottom: 20, fontWeight: "bold" }}
          >
            Aggiungi Sessione
          </Text>

          {/* INPUT NOME SESSIONE */}
          <TextInput
            label="Nome Sessione"
            placeholder="Es. Upper Body Monday"
            value={nomeSessione}
            onChangeText={setNomeSessione}
            mode="outlined"
            style={{ marginBottom: 15 }}
          />

          {/* DATE PICKER BUTTON */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ marginBottom: 8, fontWeight: "600" }}>
              Data Sessione
            </Text>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={{ marginBottom: 10 }}
            >
              📅 {formatDate(selectedDate)}
            </Button>
          </View>

          {/* DATE PICKER */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              textColor="#000"
            />
          )}

          {/* BOTTONI */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button mode="outlined" onPress={handleAnnulla} style={{ flex: 1 }}>
              Annulla
            </Button>

            <Button mode="contained" onPress={handleSalva} style={{ flex: 1 }}>
              Salva
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};
