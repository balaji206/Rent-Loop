import React, { useState, useRef } from "react";
import { View, Pressable, Text, Animated, StyleSheet } from "react-native";
import { ChevronDown } from "lucide-react-native";

/**
 * ✅ React Native Collapsible replacement for Radix UI Collapsible
 * Works with smooth height animation
 *
 * Props:
 * - title: Header text or element
 * - children: Collapsible content
 * - defaultOpen: Boolean
 * - duration: Animation duration (ms)
 * - style: Optional container style
 */

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
  duration = 250,
  style,
  headerStyle,
  contentStyle,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const animation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
    setOpen(!open);
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <Pressable onPress={toggle} style={[styles.header, headerStyle]}>
        {typeof title === "string" ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          title
        )}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronDown size={20} color="#374151" />
        </Animated.View>
      </Pressable>

      {/* Animated content */}
      <Animated.View
        style={[
          styles.contentContainer,
          contentStyle,
          {
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 9999], // expand to auto height
            }),
            opacity: animation,
            overflow: "hidden",
          },
        ]}
      >
        <View style={styles.innerContent}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  contentContainer: {
    backgroundColor: "#F9FAFB",
  },
  innerContent: {
    padding: 16,
  },
});
