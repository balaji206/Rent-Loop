import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { X } from "lucide-react-native";

const { height, width } = Dimensions.get("window");

export function Sheet({
  visible,
  onClose,
  side = "right",
  children,
  title,
  description,
  style,
  backgroundColor = "#FFFFFF",
}) {
  const slideAnim = useRef(new Animated.Value(getInitialPosition(side))).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : getInitialPosition(side),
      useNativeDriver: true,
    }).start();
  }, [visible, side]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          getSheetPosition(side, slideAnim),
          { backgroundColor },
          style,
        ]}
      >
        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={18} color="#6B7280" />
        </Pressable>

        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}

/** Helper to determine direction */
function getInitialPosition(side) {
  switch (side) {
    case "top":
      return -height;
    case "bottom":
      return height;
    case "left":
      return -width;
    case "right":
    default:
      return width;
  }
}

/** Compute transform style based on direction */
function getSheetPosition(side, animatedValue) {
  switch (side) {
    case "top":
      return {
        top: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: animatedValue }],
      };
    case "bottom":
      return {
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: animatedValue }],
      };
    case "left":
      return {
        top: 0,
        bottom: 0,
        left: 0,
        transform: [{ translateX: animatedValue }],
      };
    case "right":
    default:
      return {
        top: 0,
        bottom: 0,
        right: 0,
        transform: [{ translateX: animatedValue }],
      };
  }
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    position: "absolute",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    paddingTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
  },
});
