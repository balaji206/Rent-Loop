import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
} from "react-native";
import { X } from "lucide-react-native";

/**
 * ✅ React Native Drawer (Bottom Sheet)
 * Works seamlessly with Expo — replaces Vaul Drawer
 *
 * Props:
 * - visible: boolean
 * - onClose: () => void
 * - title?: string
 * - description?: string
 * - children?: React.ReactNode
 * - footer?: React.ReactNode
 */

export default function Drawer({
  visible,
  onClose,
  title,
  description,
  children,
  footer,
}) {
  const slideAnim = useRef(new Animated.Value(500)).current; // start below the screen
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) pan.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 120) {
          Animated.timing(slideAnim, {
            toValue: 500,
            duration: 250,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose} />

      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateY: Animated.add(slideAnim, pan) }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />

        {/* Header */}
        {(title || description) && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        )}

        {/* Content */}
        <View style={styles.body}>{children}</View>

        {/* Footer */}
        {footer && <View style={styles.footer}>{footer}</View>}

        {/* Close Button */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={20} color="#6B7280" />
        </Pressable>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  handle: {
    alignSelf: "center",
    width: 50,
    height: 5,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    marginBottom: 12,
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
  },
  body: {
    marginTop: 8,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    padding: 6,
  },
});
