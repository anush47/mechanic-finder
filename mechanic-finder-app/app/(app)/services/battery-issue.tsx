import { View, Text, StyleSheet } from "react-native";

export default function BatteryIssue() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Issue</Text>
      <Text>This is a placeholder page for Battery Issue service.</Text>
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
