import { AddSessionModal } from "@/components/AddSessionModal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Card, FAB, Text } from "react-native-paper";
import { useWorkoutStorage } from "../hooks/useWorkoutStorage";

const index = () => {
  const router = useRouter();
  const { sessions, loading, addSession } = useWorkoutStorage();
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>Caricamento sessioni...</Text>
      </View>
    );
  }

  const hasSession = sessions && sessions.length > 0;

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f5f5f5" }}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      >
        {/* HEADER */}
        <Text
          variant="headlineLarge"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          I miei Allenamenti
        </Text>

        {/* LISTA SESSIONI O MESSAGGIO VUOTO */}
        {!hasSession ? (
          <Card
            style={{ alignItems: "center", paddingVertical: 60, marginTop: 20 }}
          >
            <Text
              variant="titleMedium"
              style={{ color: "#999", marginBottom: 10 }}
            >
              Nessuna sessione ancora
            </Text>
            <Text variant="bodySmall" style={{ color: "#bbb" }}>
              Tocca il + per iniziare il tuo primo allenamento!
            </Text>
          </Card>
        ) : (
          <View>
            {sessions.map((session) => (
              <Card
                key={session.id}
                style={{
                  marginBottom: 12,
                  paddingVertical: 15,
                  paddingHorizontal: 12,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/[sessionId]",
                    params: { sessionId: session.id },
                  })
                }
              >
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  {session.name}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: "#666", marginTop: 4 }}
                >
                  📅 {session.date}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: "#666", marginTop: 2 }}
                >
                  🏋️ {session.exercises.length} esercizi
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

      <AddSessionModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddSession={async (session) => {
          await addSession(session);
        }}
      />
    </>
  );
};

export default index;
