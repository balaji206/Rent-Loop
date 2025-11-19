import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

/**
 * Skeleton Loader for React Native
 * Mimics the web "animate-pulse" Tailwind style.
 */
export function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E5E7EB", // Tailwind "accent" gray
  },
});
