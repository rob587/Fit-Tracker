import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useWorkoutStorage } from "../hooks/useWorkoutStorage";

const sessionId = () => {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { sessions, loading } = useWorkoutStorage();

  // metodo find per trovare la sessione con id

  const sessionFinder = sessions.find((s) => s.id === sessionId);

  return (
    <View>
      <Text>[sessionId]</Text>
    </View>
  );
};

export default sessionId;

const styles = StyleSheet.create({});
