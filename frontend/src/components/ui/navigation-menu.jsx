import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

/**
 * ✅ React Native Navigation Menu
 * Mimics Radix NavigationMenu behavior using Modal dropdowns.
 */

export function NavigationMenu({ children, style }) {
  return <View style={[styles.menuContainer, style]}>{children}</View>;
}

export function NavigationMenuItem({ title, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && { backgroundColor: "#E5E7EB" },
        ]}
      >
        <Text style={styles.triggerText}>{title}</Text>
        <ChevronDown size={14} color="#374151" />
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <ScrollView>{children}</ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export function NavigationMenuLink({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={({ pressed }) => [
        styles.link,
        pressed && { backgroundColor: "#F3F4F6" },
      ]}
    >
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  triggerText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    width: 220,
    elevation: 6,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  linkText: {
    fontSize: 14,
    color: "#111827",
  },
});
