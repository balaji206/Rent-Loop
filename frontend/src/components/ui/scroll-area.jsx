import React, { useRef, useState } from "react";
import { View, ScrollView, Animated, StyleSheet, Dimensions } from "react-native";

/**
 * ✅ ScrollArea (React Native)
 * A Radix-like scroll container with a custom scrollbar indicator
 */
export function ScrollArea({ children, style, scrollStyle }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  const scrollIndicatorSize = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - containerHeight, 1)],
    outputRange: [0, 1],
  });

  const scrollIndicatorPosition = Animated.multiply(
    scrollY,
    containerHeight / contentHeight
  );

  return (
    <View
      style={[
        styles.root,
        style,
      ]}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, scrollStyle]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {children}
      </ScrollView>

      {/* Custom Scrollbar */}
      {contentHeight > containerHeight && (
        <Animated.View
          style={[
            styles.scrollbar,
            {
              height: (containerHeight * containerHeight) / contentHeight,
              transform: [{ translateY: scrollIndicatorPosition }],
            },
          ]}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    position: "relative",
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 12,
  },
  scrollbar: {
    position: "absolute",
    right: 2,
    width: 4,
    borderRadius: 4,
    backgroundColor: "#CBD5E1", // border color similar to Radix border
  },
});
