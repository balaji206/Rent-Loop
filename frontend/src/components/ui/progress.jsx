import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

/**
 * ✅ React Native Progress Component
 * Matches the Radix UI style & behavior
 */
export function Progress({ value = 0, style }) {
  const progress = useRef(new Animated.Value(value)).current;

  // Smooth transition animation
  useEffect(() => {
    Animated.timing(progress, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.root, style]}>
      <Animated.View style={[styles.indicator, { width: widthInterpolated }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    height: 8, // h-2 in Tailwind
    width: "100%",
    backgroundColor: "rgba(59,130,246,0.2)", // bg-primary/20
    borderRadius: 9999, // fully rounded
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#3B82F6", // bg-primary (blue-500)
    borderRadius: 9999,
  },
});
