import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

/**
 * Toggle (React Native version)
 * Supports "variant" and "size" just like Radix UI.
 */

export function Toggle({
  value,
  defaultValue = false,
  onValueChange,
  children,
  variant = "default", // "default" | "outline"
  size = "default", // "sm" | "default" | "lg"
  disabled = false,
  style,
  ...props
}) {
  const [isOn, setIsOn] = useState(defaultValue);

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    setIsOn(next);
    onValueChange?.(next);
  };

  const active = value !== undefined ? value : isOn;

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        active && styles.active,
        active && variantStyles[`${variant}Active`],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          active && styles.textActive,
          disabled && styles.textDisabled,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 0,
    minWidth: 36,
    backgroundColor: "transparent",
    transition: "all 0.2s",
  },
  text: {
    color: "#374151", // muted-foreground
    fontSize: 14,
    fontWeight: "500",
  },
  textActive: {
    color: "#111827", // accent-foreground
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  active: {
    backgroundColor: "#E0E7FF", // accent background
  },
  textDisabled: {
    color: "#9CA3AF",
  },
});

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: "transparent",
  },
  defaultActive: {
    backgroundColor: "#E0E7FF",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "transparent",
  },
  outlineActive: {
    borderColor: "#6366F1",
    backgroundColor: "#EEF2FF",
  },
});

const sizeStyles = StyleSheet.create({
  sm: { height: 32, paddingHorizontal: 6, minWidth: 32 },
  default: { height: 36, paddingHorizontal: 8, minWidth: 36 },
  lg: { height: 40, paddingHorizontal: 10, minWidth: 40 },
});
