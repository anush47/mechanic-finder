import ServiceCard from "@/components/cards/service";
import { ScrollView, StyleSheet, View } from "react-native";
import { SERVICE_OPTIONS } from "@/consts/consts";
import { useRouter, RelativePathString } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(SERVICE_OPTIONS).map(([key, service]) => (
          <ServiceCard
            key={key}
            title={service.title}
            description={service.description}
            imageUri={service.imageUri}
            onPress={() =>
              router.push(
                ("../services/" + service.route) as RelativePathString
              )
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 16,
  },
});
