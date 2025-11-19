import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Simple Alert component for React Native
 * Supports default and destructive variants
 */
export function Alert({ variant = "default", title, description, style }) {
  return (
    <View
      style={[
        styles.alert,
        variant === "destructive" ? styles.destructive : styles.default,
        style,
      ]}
    >
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

export function AlertTitle({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function AlertDescription({ children, style }) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  alert: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  default: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  destructive: {
    backgroundColor: "#FEE2E2",
    borderColor: "#F87171",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
  },
});

export default Alert;
