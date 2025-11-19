import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * ✅ React Native Badge replacement for Radix UI Badge
 * Works perfectly in Expo and supports multiple variants (default, secondary, destructive, outline)
 */
export default function Badge({
  children,
  variant = "default",
  style,
}) {
  const variantStyle = styles[variant] || styles.default;

  return (
    <View style={[styles.base, variantStyle, style]}>
      <Text style={[styles.text, variantTextColors[variant]]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  default: {
    backgroundColor: "#0D9488", // teal-600
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#E5E7EB", // gray-200
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: "#DC2626", // red-600
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#9CA3AF", // gray-400
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

const variantTextColors = {
  default: { color: "#FFFFFF" },
  secondary: { color: "#1F2937" }, // gray-800
  destructive: { color: "#FFFFFF" },
  outline: { color: "#1F2937" },
};
