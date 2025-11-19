import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

/**
 * ✅ React Native Button replacement for Radix UI
 * Supports variant, size, and disabled states
 * Works in Expo / React Native with consistent design
 */

export default function Button({
  title,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  style,
  textStyle,
  icon,
}) {
  const variantStyle = variantStyles[variant] || variantStyles.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.default;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        sizeStyle,
        disabled && styles.disabled,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {icon && <>{icon}</>}
      <Text style={[styles.text, textColors[variant], textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
});

// 🎨 Variants
const variantStyles = {
  default: {
    backgroundColor: "#0D9488", // teal-600
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#E5E7EB", // gray-200
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#D1D5DB", // gray-300
  },
  destructive: {
    backgroundColor: "#DC2626", // red-600
    borderColor: "transparent",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
};

// 🧱 Sizes
const sizeStyles = {
  default: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
};

// 🖋 Text colors for variants
const textColors = {
  default: { color: "#FFFFFF" },
  secondary: { color: "#111827" },
  outline: { color: "#111827" },
  destructive: { color: "#FFFFFF" },
  ghost: { color: "#0D9488" },
  link: { color: "#0D9488", textDecorationLine: "underline" },
};
