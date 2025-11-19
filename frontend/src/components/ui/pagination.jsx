import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react-native";

/**
 * ✅ React Native Pagination Component
 * Replaces the Radix Pagination with native-friendly components
 */

export function Pagination({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export function PaginationContent({ children, style }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function PaginationItem({ children, style }) {
  return <View style={[styles.item, style]}>{children}</View>;
}

export function PaginationLink({ label, onPress, isActive = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.link,
        isActive && styles.linkActive,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text
        style={[
          styles.linkText,
          isActive && { color: "#111827", fontWeight: "600" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function PaginationPrevious({ onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.link, { flexDirection: "row" }]}>
      <ChevronLeft size={18} color="#374151" />
      <Text style={styles.arrowText}>Previous</Text>
    </Pressable>
  );
}

export function PaginationNext({ onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.link, { flexDirection: "row" }]}>
      <Text style={styles.arrowText}>Next</Text>
      <ChevronRight size={18} color="#374151" />
    </Pressable>
  );
}

export function PaginationEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <MoreHorizontal size={18} color="#6B7280" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  item: {
    marginHorizontal: 2,
  },
  link: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  linkActive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },
  linkText: {
    color: "#374151",
    fontSize: 14,
  },
  arrowText: {
    fontSize: 14,
    color: "#111827",
    marginHorizontal: 6,
  },
  ellipsis: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
