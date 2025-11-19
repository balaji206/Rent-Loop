import React from "react";
import { TextInput, StyleSheet } from "react-native";

/**
 * React Native Textarea (multiline input)
 * Equivalent to your Radix textarea with Tailwind-style classes.
 */

export function Textarea({
  style,
  value,
  onChangeText,
  placeholder,
  editable = true,
  numberOfLines = 4,
  ...props
}) {
  return (
    <TextInput
      multiline
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      placeholderTextColor="#9CA3AF" // Tailwind "text-muted-foreground"
      style={[styles.textarea, !editable && styles.disabled, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 100,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Tailwind "border-input"
    backgroundColor: "#FFFFFF", // Tailwind "bg-input-background"
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827", // Tailwind "text-foreground"
    textAlignVertical: "top",
  },
  disabled: {
    opacity: 0.5,
  },
});
