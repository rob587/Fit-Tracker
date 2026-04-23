import { Session } from "@/app/types";
import { useState } from "react";

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
};
