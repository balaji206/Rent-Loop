import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

/**
 * ✅ React Native HoverCard (Touch-based)
 * Works like a hover tooltip for mobile — opens on press/hold or tap
 *
 * Props:
 * - trigger: JSX.Element (the component to press/hover)
 * - content: JSX.Element or string (content inside the card)
 * - align?: "center" | "left" | "right" (default: "center")
 * - sideOffset?: number (spacing between trigger and card)
 */

export default function HoverCard({
  trigger,
  content,
  align = "center",
  sideOffset = 8,
}) {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openCard = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const closeCard = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useEffect(() => {
    return () => fadeAnim.setValue(0); // cleanup animation
  }, []);

  const alignment =
    align === "left"
      ? { alignItems: "flex-start" }
      : align === "right"
      ? { alignItems: "flex-end" }
      : { alignItems: "center" };

  return (
    <>
      {/* Trigger */}
      <Pressable
        onPressIn={openCard}
        onPressOut={closeCard}
        style={{ alignSelf: "center" }}
      >
        {trigger}
      </Pressable>

      {/* HoverCard Content */}
      <Modal transparent visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={closeCard}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.cardContainer,
                alignment,
                { opacity: fadeAnim, marginTop: sideOffset },
              ]}
            >
              <View style={styles.card}>
                {typeof content === "string" ? (
                  <Text style={styles.text}>{content}</Text>
                ) : (
                  content
                )}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 260,
  },
  text: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 20,
  },
});
