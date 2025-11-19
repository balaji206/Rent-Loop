import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { GripVertical } from "lucide-react-native";

/**
 * ✅ Resizable Panel Group (React Native)
 * Allows drag-to-resize between two panels
 */
export function ResizablePanelGroup({
  direction = "horizontal", // "horizontal" | "vertical"
  left,
  right,
  top,
  bottom,
  initial = 0.5,
  style,
}) {
  const screen = Dimensions.get("window");
  const isHorizontal = direction === "horizontal";

  const [ratio, setRatio] = useState(initial);
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const total = isHorizontal ? screen.width : screen.height;
        const delta = isHorizontal
          ? gesture.dx / total
          : gesture.dy / total;
        const newRatio = Math.min(Math.max(ratio + delta, 0.1), 0.9);
        setRatio(newRatio);
      },
    })
  ).current;

  const firstFlex = ratio;
  const secondFlex = 1 - ratio;

  return (
    <View
      style={[
        styles.group,
        isHorizontal ? styles.horizontal : styles.vertical,
        style,
      ]}
    >
      <View style={{ flex: firstFlex }}>
        {direction === "horizontal" ? left : top}
      </View>

      <View
        {...panResponder.panHandlers}
        style={[
          styles.handle,
          isHorizontal ? styles.handleVertical : styles.handleHorizontal,
        ]}
      >
        <GripVertical color="#9CA3AF" size={18} />
      </View>

      <View style={{ flex: secondFlex }}>
        {direction === "horizontal" ? right : bottom}
      </View>
    </View>
  );
}
