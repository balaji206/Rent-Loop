import React from "react";
import { View, Switch as RNSwitch, StyleSheet } from "react-native";

/**
 * Cross-platform Switch Component
 * Matches Radix-style design
 */
export function Switch({
  value,
  onValueChange,
  disabled = false,
  thumbColorOn = "#ffffff",
  thumbColorOff = "#ffffff",
  trackColorOn = "#2563EB", // Tailwind "primary"
  trackColorOff = "#d1d5db", // Tailwind "muted"
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        thumbColor={value ? thumbColorOn : thumbColorOff}
        trackColor={{
          false: trackColorOff,
          true: trackColorOn,
        }}
        ios_backgroundColor={trackColorOff}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scale: 0.9 }], // smaller for Radix-like proportions
  },
});
