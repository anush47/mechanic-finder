import React from "react";
import {
  Card,
  Text,
  Button,
  Avatar,
  useTheme,
  Surface,
  Divider,
  Switch,
  Menu,
} from "react-native-paper";
import { useSession } from "../../../services/ctx";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default function ProfileScreen() {
  const { signOut, user, themeMode, setThemeMode } = useSession();
  const theme = useTheme();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const openPasswordModal = () => setPasswordModalVisible(true);
  const closePasswordModal = () => setPasswordModalVisible(false);

  const onToggleNotificationSwitch = () =>
    setIsNotificationEnabled(!isNotificationEnabled);

  const handleChangePassword = () => {
    // TODO: Implement API call to change password
    console.log("Change password API call placeholder");
    closePasswordModal();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={100}
            source={{ uri: "https://picsum.photos/1400" }}
          />
          <Text style={styles.name}>{user?.name}</Text>
        </View>

        <Surface style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Settings</Text>
          <Divider style={styles.divider} />

          <View style={styles.optionRow}>
            <Text>Notifications</Text>
            <Switch
              value={isNotificationEnabled}
              onValueChange={onToggleNotificationSwitch}
            />
          </View>

          <View style={styles.optionRow}>
            <Text>Theme</Text>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>{themeMode.toUpperCase()}</Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setThemeMode("light");
                  closeMenu();
                }}
                title="Light"
              />
              <Menu.Item
                onPress={() => {
                  setThemeMode("dark");
                  closeMenu();
                }}
                title="Dark"
              />
              <Menu.Item
                onPress={() => {
                  setThemeMode("system");
                  closeMenu();
                }}
                title="System"
              />
            </Menu>
          </View>

          <Divider style={styles.divider} />

          <Button
            mode="outlined"
            style={styles.button}
            onPress={openPasswordModal}
          >
            Change Password
          </Button>

          <Button mode="outlined" style={styles.button}>
            Help & Support
          </Button>

          <Button mode="outlined" style={styles.button}>
            Terms & Conditions
          </Button>
        </Surface>

        <Button
          mode="contained"
          style={{ backgroundColor: theme.colors.error, marginTop: 20 }}
          onPress={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </ScrollView>

      {/* Modal for Request Order */}
      <Modal
        visible={passwordModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Surface style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              label="Current Password"
              mode="outlined"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
            />

            <TextInput
              label="New Password"
              mode="outlined"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <TextInput
              label="Confirm New Password"
              mode="outlined"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              style={styles.input}
            />

            <View style={styles.modalButtonRow}>
              <Button
                mode="outlined"
                onPress={() => setPasswordModalVisible(false)}
                style={styles.modalButton}
              >
                Back
              </Button>

              <Button
                mode="contained"
                onPress={handleChangePassword}
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
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
