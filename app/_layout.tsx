import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarStyle: {
          backgroundColor: "#0f0f1a",
          borderTopWidth: 1,
          borderTopColor: "#27272a",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#0f0f1a",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Homepage",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>📊</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Impostazioni",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
};

export default _layout;
