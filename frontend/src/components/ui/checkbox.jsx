import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

/**
 * ✅ React Native Checkbox replacement for Radix UI Checkbox
 * Works perfectly in Expo / React Native
 *
 * Props:
 * - checked: boolean
 * - onChange: function
 * - disabled: boolean
 * - size: number (optional)
 * - color: string (optional)
 */

export default function Checkbox({
  checked: controlledChecked,
  onChange,
  disabled = false,
  size = 20,
  color = "#0D9488", // teal
  style,
}) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const newValue = !checked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderColor: checked ? color : "#D1D5DB", // gray-300
          backgroundColor: checked ? color : "#FFFFFF",
          opacity: disabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
        style,
      ]}
    >
      {checked && (
        <View style={styles.iconWrapper}>
          <Check size={size * 0.6} color="#FFFFFF" strokeWidth={3} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
