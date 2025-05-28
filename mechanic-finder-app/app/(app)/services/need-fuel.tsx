import { useState, useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { FUEL_DATA } from "@/consts/consts";
import {
  TextInput,
  Button,
  Chip,
  Surface,
  Divider,
  IconButton,
  useTheme,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function NeedFuel() {
  const [step, setStep] = useState<"type" | "grade" | "amount">("type");
  const [fuelType, setFuelType] = useState<"petrol" | "diesel" | null>(null);
  const [fuelGrade, setFuelGrade] = useState<string | null>(null);
  const [liters, setLiters] = useState<string>("");
  const [lkr, setLkr] = useState<string>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState("Current Location");

  const handleFuelTypeSelect = (type: "petrol" | "diesel") => {
    setFuelType(type);
    setFuelGrade(null);
    setStep("grade");
  };

  const handleFuelGradeSelect = (grade: string) => {
    setFuelGrade(grade);
    setStep("amount");
  };

  const handleLitersChange = (value: string) => {
    setLiters(value);
    if (fuelType && fuelGrade && value) {
      const rate = FUEL_DATA[fuelType].grades.find(
        (g) => g.name === fuelGrade
      )?.rate;
      if (rate) {
        setLkr((parseFloat(value) * rate).toFixed(2));
      }
    } else {
      setLkr("");
    }
  };

  const handleLkrChange = (value: string) => {
    setLkr(value);
    if (fuelType && fuelGrade && value) {
      const rate = FUEL_DATA[fuelType].grades.find(
        (g) => g.name === fuelGrade
      )?.rate;
      if (rate) {
        setLiters((parseFloat(value) / rate).toFixed(2));
      }
    } else {
      setLiters("");
    }
  };

  const resetForm = () => {
    setStep("type");
    setFuelType(null);
    setFuelGrade(null);
    setLiters("");
    setLkr("");
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Request Fuel",
    });
  }, [navigation]);

  return (
    <View>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Surface style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>Fuel Details</Text>
            <IconButton
              icon="refresh"
              size={24}
              onPress={resetForm}
              accessibilityLabel="Reset form"
            />
          </View>
          <Divider style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fuel Type:</Text>
            <Text style={styles.summaryValue}>
              {fuelType ? FUEL_DATA[fuelType].name : "—"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Grade:</Text>
            <Text style={styles.summaryValue}>{fuelGrade || "—"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Liters:</Text>
            <Text style={styles.summaryValue}>{liters || "—"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>LKR:</Text>
            <Text style={styles.summaryValue}>{lkr || "—"}</Text>
          </View>
        </Surface>

        {step === "type" && (
          <Surface style={styles.card}>
            <Text style={styles.title}>What fuel do you need?</Text>
            <View style={styles.chipGroup}>
              {Object.entries(FUEL_DATA).map(([type, data]) => (
                <Chip
                  key={type}
                  mode={fuelType === type ? "flat" : "outlined"}
                  selected={fuelType === type}
                  onPress={() =>
                    handleFuelTypeSelect(type as "petrol" | "diesel")
                  }
                  style={styles.chip}
                >
                  {data.name}
                </Chip>
              ))}
            </View>
          </Surface>
        )}

        {step === "grade" && fuelType && (
          <Surface style={styles.card}>
            <Text style={styles.title}>
              Select {FUEL_DATA[fuelType].name} Grade
            </Text>
            <View style={styles.chipGroup}>
              {FUEL_DATA[fuelType].grades.map((grade) => (
                <Chip
                  key={grade.name}
                  mode={fuelGrade === grade.name ? "flat" : "outlined"}
                  selected={fuelGrade === grade.name}
                  onPress={() => handleFuelGradeSelect(grade.name)}
                  style={styles.chip}
                >
                  {grade.name} - LKR {grade.rate}/L
                </Chip>
              ))}
            </View>
          </Surface>
        )}

        {step === "amount" && fuelType && fuelGrade && (
          <Surface style={styles.card}>
            <Text style={styles.title}>Enter Amount for {fuelGrade}</Text>

            <TextInput
              label="Liters"
              mode="outlined"
              keyboardType="numeric"
              placeholder="0.00"
              value={liters}
              onChangeText={handleLitersChange}
              style={styles.input}
              // Remove custom colors to keep default
            />

            <TextInput
              label="LKR"
              mode="outlined"
              keyboardType="numeric"
              placeholder="0.00"
              value={lkr}
              onChangeText={handleLkrChange}
              style={styles.input}
              // Remove custom colors to keep default
            />

            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                {liters && lkr
                  ? `You need ${liters} L of ${fuelGrade} for LKR ${lkr}`
                  : "Please enter amount"}
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={() => setModalVisible(true)}
              disabled={!liters || !lkr || modalVisible}
            >
              Request Order
            </Button>
          </Surface>
        )}
      </ScrollView>

      {/* Modal for Request Order */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Surface style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Your Order</Text>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalLabel}>Fuel Type:</Text>
              <Text style={styles.modalValue}>
                {fuelType ? FUEL_DATA[fuelType].name : "—"}
              </Text>
            </View>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalLabel}>Grade:</Text>
              <Text style={styles.modalValue}>{fuelGrade || "—"}</Text>
            </View>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalLabel}>Liters:</Text>
              <Text style={styles.modalValue}>{liters || "—"}</Text>
            </View>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalLabel}>LKR:</Text>
              <Text style={styles.modalValue}>{lkr || "—"}</Text>
            </View>

            <TextInput
              label="Location"
              mode="outlined"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />

            <View style={styles.modalButtonRow}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
              >
                Back
              </Button>

              <Button
                mode="contained"
                onPress={() => {
                  setModalVisible(false);
                  alert(
                    `Order confirmed:\nFuel: ${fuelType}\nGrade: ${fuelGrade}\nLiters: ${liters}\nPrice: LKR ${lkr}\nLocation: ${location}`
                  );
                  resetForm();
                }}
                style={styles.modalButton}
              >
                Confirm
              </Button>
            </View>
          </Surface>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  divider: {
    marginVertical: 8,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  chip: {
    marginVertical: 4,
  },
  input: {
    marginVertical: 8,
  },
  summaryBox: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  summaryText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 12,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  modalSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#555",
  },
  modalValue: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
