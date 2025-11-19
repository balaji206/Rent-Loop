import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { X } from "lucide-react-native";


export default function Dialog({
  visible,
  onClose,
  title,
  description,
  children,
  footer,
}) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        style={[styles.overlay, { opacity: fadeAnim }]}
      >
        <View style={styles.content}>
          {/* Close button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={20} color="#6B7280" />
          </Pressable>

          {/* Header */}
          {(title || description) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
            </View>
          )}

          {/* Main Content */}
          <View style={styles.body}>{children}</View>

          {/* Footer */}
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    padding: 6,
  },
  header: {
    marginBottom: 12,
    alignItems: "flex-start",
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
});
