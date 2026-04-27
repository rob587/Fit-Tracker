import { AddExerciseModal } from "@/components/AddExerciseModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Card, FAB, Text } from "react-native-paper";
import { useWorkoutStorage } from "../hooks/useWorkoutStorage";

const sessionId = () => {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { sessions, loading, addExerciseToSession } = useWorkoutStorage();
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleAddExercise = async (exercise: any) => {
    if (sessionId) {
      await addExerciseToSession(sessionId, exercise);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={session.name} subtitle={session.date} />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1, backgroundColor: "#f5f5f5" }}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      >
        <Text variant="bodySmall" style={{ color: "#666", marginBottom: 16 }}>
          🏋️ {session.exercises.length} esercizi
        </Text>

        {!hasExercises ? (
          <Card
            style={{ alignItems: "center", paddingVertical: 60, marginTop: 20 }}
          >
            <Text
              variant="titleMedium"
              style={{ color: "#999", marginBottom: 10 }}
            >
              Nessun esercizio
            </Text>
            <Text variant="bodySmall" style={{ color: "#bbb" }}>
              Tocca il + per aggiungere il primo esercizio!
            </Text>
          </Card>
        ) : (
          <View>
            {session.exercises.map((exercise) => (
              <Card
                key={exercise.id}
                style={{
                  marginBottom: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                }}
              >
                <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
                  {exercise.name}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: "#666", marginTop: 4 }}
                >
                  📊 {exercise.sets.length} serie
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        onPress={() => setModalVisible(true)}
      />

      <AddExerciseModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
      />
    </>
  );
};

export default sessionId;

const styles = StyleSheet.create({});
