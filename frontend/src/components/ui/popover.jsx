import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

/**
 * ✅ Popover Component (React Native)
 * A native-friendly version of Radix Popover.
 */

export function Popover({ children }) {
  return <View style={styles.container}>{children}</View>;
}

export function PopoverTrigger({ children, onOpen }) {
  return (
    <Pressable onPress={onOpen} style={styles.trigger}>
      {children}
    </Pressable>
  );
}

export function PopoverContent({ visible, onClose, children, width = 280 }) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.content, { width }]}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export function PopoverAnchor({ children }) {
  // In web Radix this is used for positioning.
  // In RN, it just acts as a wrapper for consistent structure.
  return <View>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  trigger: {
    padding: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
});
