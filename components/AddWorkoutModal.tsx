import React, { useState } from "react";

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

  const resetForm = () => {
    setEsercizio("");
    setDurata("");
    setTipo("Cardio");
    setNote("");
  };

  const handleAnnulla = () => {
    resetForm();
    onClose();
  };
};
