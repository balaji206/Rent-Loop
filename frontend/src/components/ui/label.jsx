import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * ✅ React Native Label Component
 * Works as a replacement for Radix UI <LabelPrimitive.Root>
 *
 * Props:
 * - children: string | React.ReactNode
 * - error?: boolean
 * - disabled?: boolean
 * - style?: object
 */
export function Label({ children, error = false, disabled = false, style }) {
  return (
    <Text
      style={[
        styles.label,
        disabled && styles.disabled,
        error && styles.error,
        style,
      ]}
      accessibilityRole="text"
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827", // Neutral text
    marginBottom: 4,
  },
  error: {
    color: "#DC2626", // Red for errors
  },
  disabled: {
    color: "#9CA3AF",
    opacity: 0.6,
  },
});
