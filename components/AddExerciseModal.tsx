import { Exercise } from "@/app/types";
import React, { useState } from "react";

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
};
