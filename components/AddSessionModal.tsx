import { Session } from "@/app/types";
import { useState } from "react";
import { Alert } from "react-native";

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

  return <></>;
};
