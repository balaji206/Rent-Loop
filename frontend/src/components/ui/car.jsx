import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * ✅ React Native Card Component
 * Fully replaces the Radix UI + Tailwind version
 * Works in Expo / React Native
 */

export function Card({ style, children }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardHeader({ style, children }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({ style, children }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardDescription({ style, children }) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

export function CardContent({ style, children }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({ style, children }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function CardAction({ style, children }) {
  return <View style={[styles.action, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827", // gray-900
  },
  description: {
    fontSize: 14,
    color: "#6B7280", // gray-500
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  action: {
    alignSelf: "flex-end",
  },
});
