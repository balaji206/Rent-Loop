import React from "react";
import { View, StyleSheet } from "react-native";

/**
 * ✅ React Native AspectRatio replacement for Radix UI
 * Works seamlessly with Expo, supports any ratio (e.g., 1, 16/9, 4/3)
 */
export default function AspectRatio({ ratio = 1, style, children }) {
  return (
    <View style={[styles.container, { aspectRatio: ratio }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
