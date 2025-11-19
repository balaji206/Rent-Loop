import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevronRight, Check } from "lucide-react-native";

/**
 * ✅ React Native Menubar Component
 * Works as a mobile-friendly replacement for Radix Menubar.
 * Includes nested submenus and checked states.
 */

export function Menubar({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export function MenubarItem({ label, onPress, disabled, checked }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && { backgroundColor: "#E5E7EB" },
        disabled && { opacity: 0.5 },
      ]}
    >
      <Text style={styles.itemText}>{label}</Text>
      {checked && <Check size={16} color="#0D9488" />}
    </Pressable>
  );
}

export function MenubarGroup({ label, children }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupLabel}>{label}</Text>
      {children}
    </View>
  );
}

export function MenubarTrigger({ label, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.triggerText}>{label}</Text>
        <ChevronRight size={16} color="#374151" />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menuContent}>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { onClose: () => setVisible(false) })
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export function MenubarSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    width: 220,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#111827",
  },
  group: {
    marginBottom: 8,
  },
  groupLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
});
