import { Card, Text, useTheme } from "react-native-paper";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = 100;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.4; // 80% of screen width

export default function ServiceCard({
  title,
  description,
  imageUri,
  onPress,
}: {
  title?: string;
  description?: string;
  imageUri?: string;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const cardBgColor = theme.colors.background;

  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: cardBgColor }]}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={[cardBgColor, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}
            style={styles.gradientOverlay}
          />

          <View style={styles.textContainer}>
            <Text
              variant="titleLarge"
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
  },
  contentContainer: {
    height: CARD_HEIGHT,
    position: "relative",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
  },
  textContainer: {
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 16,
    position: "relative",
    zIndex: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
    paddingRight: 4,
  },
  description: {
    fontSize: 12,
    textAlign: "left",
  },
});
