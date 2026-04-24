import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useWorkoutStorage } from "../hooks/useWorkoutStorage";

const sessionId = () => {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { sessions, loading } = useWorkoutStorage();

  // metodo find per trovare la sessione con id

  const session = sessions.find((s) => s.id === sessionId);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (!session) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleMedium" style={{ color: "#999" }}>
          Sessione non trovata
        </Text>
      </View>
    );
  }

  const hasExercises = session.exercises && session.exercises.length > 0;

  return (
    <View>
      <Text>[sessionId]</Text>
    </View>
  );
};

export default sessionId;

const styles = StyleSheet.create({});
