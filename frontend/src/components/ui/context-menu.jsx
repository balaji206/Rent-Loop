import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MoreVertical, Check, ChevronRight } from "lucide-react-native";

/**
 * ✅ React Native Context Menu replacement
 * Works via long press or button trigger.
 *
 * Props:
 * - actions: Array<{ label: string, icon?: JSX.Element, onPress?: () => void, destructive?: boolean }>
 * - trigger?: JSX.Element (optional custom trigger)
 * - onOpenChange?: (boolean) => void
 */

export default function ContextMenu({
  actions = [],
  trigger,
  onOpenChange,
  title,
}) {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setVisible(false);
    onOpenChange?.(false);
  };

  const TriggerComponent = trigger || (
    <Pressable onPress={handleOpen} style={styles.trigger}>
      <MoreVertical size={20} color="#374151" />
    </Pressable>
  );

  return (
    <>
      {TriggerComponent}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <View style={styles.menu}>
              {title && <Text style={styles.title}>{title}</Text>}
              {actions.map((action, i) => (
                <Pressable
                  key={i}
                  style={({ pressed }) => [
                    styles.item,
                    pressed && { backgroundColor: "#E0F2F1" },
                  ]}
                  onPress={() => {
                    handleClose();
                    action.onPress?.();
                  }}
                >
                  <View style={styles.itemLeft}>
                    {action.icon || (
                      <View style={{ width: 20, alignItems: "center" }} />
                    )}
                    <Text
                      style={[
                        styles.label,
                        action.destructive && { color: "#DC2626" },
                      ]}
                    >
                      {action.label}
                    </Text>
                  </View>

                  {action.rightIcon && (
                    <View style={{ marginLeft: "auto" }}>
                      {action.rightIcon}
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
  trigger: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignSelf: "flex-start",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  menu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    width: 250,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    color: "#374151",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
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
    gap: 10,
  },
  label: {
    fontSize: 15,
    color: "#111827",
  },
});
