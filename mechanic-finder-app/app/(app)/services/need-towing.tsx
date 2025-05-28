import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function NeedTowing() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Need Towing",
    });
  }, [navigation]);

  return (
    <View>
      <Text>Need Towing</Text>
      <Text>This is a placeholder page for Need Towing service.</Text>
    </View>
  );
}
