import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const index = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>I miei Allenamenti</Text>

      <Button title="Aggiungi workout"></Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
