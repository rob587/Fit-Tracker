import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">⚙️ Impostazioni</Text>
      <Text variant="bodySmall" style={{ marginTop: 10, color: "#999" }}>
        (da fare)
      </Text>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({});
