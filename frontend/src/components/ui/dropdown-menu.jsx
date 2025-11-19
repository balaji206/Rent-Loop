import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MoreVertical, Check, ChevronRight } from "lucide-react-native";

/**
 * ✅ React Native Dropdown Menu replacement for Radix UI
 * Works seamlessly with Expo / React Native
 *
 * Props:
 * - trigger: JSX.Element (Pressable or Icon to open the menu)
 * - items: Array<{ label: string, icon?: JSX.Element, onPress?: () => void, destructive?: boolean }>
 * - position?: 'bottom' | 'top' | 'left' | 'right'
 */

export default function DropdownMenu({ trigger, items, position = "bottom" }) {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const TriggerComponent = trigger || (
    <Pressable onPress={handleOpen} style={styles.defaultTrigger}>
      <MoreVertical size={20} color="#374151" />
    </Pressable>
  );

  return (
    <>
      {/* Trigger */}
      <Pressable onPress={handleOpen}>{TriggerComponent}</Pressable>

      {/* Dropdown Menu */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <View style={[styles.menu, styles[position]]}>
              {items.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    handleClose();
                    item.onPress?.();
                  }}
                  style={({ pressed }) => [
                    styles.item,
                    pressed && { backgroundColor: "#E0F2F1" },
                  ]}
                >
                  <View style={styles.itemLeft}>
                    {item.icon || <View style={{ width: 20 }} />}
                    <Text
                      style={[
                        styles.label,
                        item.destructive && { color: "#DC2626" },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {item.rightIcon && (
                    <View style={{ marginLeft: "auto" }}>
                      {item.rightIcon}
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  defaultTrigger: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  menu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    width: 220,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bottom: {
    marginTop: 300,
  },
  top: {
    marginBottom: 300,
  },
  left: {
    alignSelf: "flex-start",
    marginLeft: 40,
  },
  right: {
    alignSelf: "flex-end",
    marginRight: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 15,
    color: "#111827",
  },
});
