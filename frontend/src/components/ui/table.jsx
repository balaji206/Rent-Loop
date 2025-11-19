import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/**
 * ✅ Table — React Native version
 * Works like HTML <table>, but built with Views & Text.
 */

export function Table({ children, style }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.table, style]}>{children}</View>
    </ScrollView>
  );
}

export function TableHeader({ children, style }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function TableRow({ children, style }) {
  return <View style={[styles.row, style]}>{children}</View>;
}

export function TableCell({ children, style, flex = 1 }) {
  return (
    <View style={[styles.cell, { flex }, style]}>
      <Text style={styles.cellText}>{children}</Text>
    </View>
  );
}

export function TableCaption({ children, style }) {
  return <Text style={[styles.caption, style]}>{children}</Text>;
}

export function TableFooter({ children, style }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB", // Tailwind "border"
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB", // Tailwind "muted"
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
    color: "#111827", // Tailwind "foreground"
  },
  caption: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 12,
    color: "#6B7280", // Tailwind "muted-foreground"
  },
  footer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});
