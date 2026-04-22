import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const stats = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">📊 Statistiche</Text>
      <Text variant="bodySmall" style={{ marginTop: 10, color: "#999" }}>
        (da fare - FASE 10)
      </Text>
    </View>
  );
};

export default stats;

const styles = StyleSheet.create({});
