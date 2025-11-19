import React, { useState } from "react";
import { View, Pressable, StyleSheet, Animated } from "react-native";
import { Circle } from "lucide-react-native";

/**
 * ✅ RadioGroup (React Native)
 * Matches the Radix UI style and structure
 */

export function RadioGroup({
  value,
  onValueChange,
  items = [],
  style,
  direction = "vertical",
}) {
  return (
    <View
      style={[
        styles.group,
        direction === "horizontal" && { flexDirection: "row" },
        style,
      ]}
    >
      {items.map((item) => (
        <RadioGroupItem
          key={item.value}
          label={item.label}
          selected={value === item.value}
          onPress={() => onValueChange(item.value)}
        />
      ))}
    </View>
  );
}

export function RadioGroupItem({ label, selected, onPress }) {
  const scale = new Animated.Value(selected ? 1 : 0);

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.outerCircle}>
        <Animated.View
          style={[
            styles.innerCircle,
            { transform: [{ scale }] },
            selected && { backgroundColor: "#3B82F6" },
          ]}
        />
      </View>
      <Animated.Text style={styles.label}>{label}</Animated.Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  group: {
    gap: 12,
    alignItems: "flex-start",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB", // border-input
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 15,
    color: "#111827", // text-foreground
  },
});
