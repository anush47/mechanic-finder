import { View, Text, StyleSheet } from "react-native";

export default function VehicleBrokeDown() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Broke Down</Text>
      <Text>This is a placeholder page for Vehicle Broke Down service.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
