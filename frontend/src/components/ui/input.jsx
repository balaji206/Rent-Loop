import React from "react";
import { TextInput, StyleSheet } from "react-native";

/**
 * ✅ React Native Input Component
 * Works like shadcn/ui Input for mobile.
 *
 * Props:
 * - placeholder?: string
 * - value?: string
 * - onChangeText?: (text: string) => void
 * - secureTextEntry?: boolean
 * - editable?: boolean
 * - keyboardType?: 'default' | 'email-address' | 'numeric' | etc.
 * - error?: boolean
 * - style?: object
 */

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  editable = true,
  keyboardType = "default",
  error = false,
  style,
  ...props
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      secureTextEntry={secureTextEntry}
      editable={editable}
      keyboardType={keyboardType}
      style={[
        styles.input,
        error && styles.error,
        !editable && styles.disabled,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  error: {
    borderColor: "#DC2626",
  },
  disabled: {
    opacity: 0.5,
  },
});
