

/**
 * ✅ React Native Avatar replacement for Radix UI Avatar
 * Supports image + fallback initials or icon
 */
// src/components/ui/avatar.jsx
import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Avatar({ children, style }) {

  return <View style={[styles.container, style]}>{children}</View>;
}

export function AvatarImage({ src, style }) {
  return (
    <Image
      source={typeof src === "string" ? { uri: src } : src}
      style={[styles.image, style]}
    />
  );
}

export function AvatarFallback({ children, style }) {
  return (
    <View style={[styles.fallback, style]}>
      <Text style={styles.initials}>{children}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  fallback: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  initials: {
    fontSize: 20,
    fontWeight: "600",
  },
});
