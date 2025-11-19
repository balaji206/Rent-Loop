import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronRight, MoreHorizontal } from "lucide-react-native";

/**
 * ✅ React Native Breadcrumb Component
 * Works perfectly in Expo & React Native
 * Props:
 * - items: Array of breadcrumb labels
 * - onPress: Function to handle navigation clicks
 */
export default function Breadcrumb({ items = [], onPress }) {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.item}>
            {!isLast ? (
              <Pressable onPress={() => onPress?.(item)} style={styles.link}>
                <Text style={styles.linkText}>{item}</Text>
              </Pressable>
            ) : (
              <Text style={styles.current}>{item}</Text>
            )}

            {!isLast && <ChevronRight size={16} color="#6B7280" style={styles.separator} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    paddingHorizontal: 2,
  },
  linkText: {
    color: "#0D9488", // teal-600
    fontSize: 14,
  },
  current: {
    color: "#111827", // gray-900
    fontWeight: "500",
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 4,
  },
});
