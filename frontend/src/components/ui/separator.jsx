import React from "react";
import { View, StyleSheet } from "react-native";

/**
 * ✅ Separator (React Native)
 * A simple horizontal or vertical divider line, styled like Radix UI.
 */
export function Separator({
  orientation = "horizontal",
  style,
  color = "#E5E7EB", // Tailwind 'border' color
  thickness = StyleSheet.hairlineWidth,
  margin = 8,
  decorative = true, // for accessibility parity
  ...props
}) {
  const isVertical = orientation === "vertical";

  return (
    <View
      accessibilityRole={decorative ? "none" : "separator"}
      style={[
        styles.base,
        isVertical ? styles.vertical : styles.horizontal,
        {
          backgroundColor: color,
          height: isVertical ? "100%" : thickness,
          width: isVertical ? thickness : "100%",
          marginVertical: !isVertical ? margin / 2 : 0,
          marginHorizontal: isVertical ? margin / 2 : 0,
        },
        style,
      ]}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  base: {
    alignSelf: "stretch",
    opacity: 0.8,
  },
  horizontal: {
    width: "100%",
  },
  vertical: {
    height: "100%",
  },
});
