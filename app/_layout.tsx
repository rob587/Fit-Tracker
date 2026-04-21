import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";

const _layout = () => {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
};

export default _layout;
