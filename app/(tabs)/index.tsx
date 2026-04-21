import { AddWorkoutModal } from "@/components/AddWorkoutModal";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, FAB, Text } from "react-native-paper";

const index = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f5f5f5" }}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
          I miei Allenamenti
        </Text>

        <Card style={{ alignItems: "center", paddingVertical: 50 }}>
          <Text variant="titleMedium" style={{ color: "#999", marginTop: 10 }}>
            Nessun allenamento ancora
          </Text>
          <Text variant="bodySmall" style={{ color: "#bbb", marginTop: 5 }}>
            Inizia il tuo primo allenamento!
          </Text>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        onPress={() => setModalVisible(true)}
      />

      <AddWorkoutModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
