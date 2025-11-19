import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";

export default function AlertDialog({
  visible,
  title = "Confirm",
  description = "Are you sure you want to continue?",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
        {title ? <Dialog.Title style={styles.title}>{title}</Dialog.Title> : null}
        {description ? (
          <Dialog.Content>
            <Text style={styles.description}>{description}</Text>
          </Dialog.Content>
        ) : null}
        <Dialog.Actions>
          <Button textColor="#555" onPress={onCancel}>
            {cancelText}
          </Button>
          <Button mode="contained" buttonColor="#0d9488" onPress={onConfirm}>
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
});
