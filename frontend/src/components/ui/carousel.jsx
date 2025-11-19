import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

/**
 * ✅ React Native Carousel replacement for Embla Carousel
 * Works perfectly in Expo
 * - Horizontal scroll
 * - Supports Next / Previous buttons
 * - Full-width, smooth paging
 */

const { width } = Dimensions.get("window");

export default function Carousel({ data = [], renderItem, itemWidth = width, itemSpacing = 16 }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (!flatListRef.current || index < 0 || index >= data.length) return;
    flatListRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) scrollToIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Carousel list */}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <View style={[styles.item, { width: itemWidth, marginRight: itemSpacing }]}>
            {renderItem({ item, index })}
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Navigation Arrows */}
      <Pressable
        onPress={handlePrev}
        disabled={currentIndex === 0}
        style={[styles.arrowButton, styles.leftArrow, currentIndex === 0 && styles.disabled]}
      >
        <ChevronLeft size={22} color="#fff" />
      </Pressable>

      <Pressable
        onPress={handleNext}
        disabled={currentIndex === data.length - 1}
        style={[styles.arrowButton, styles.rightArrow, currentIndex === data.length - 1 && styles.disabled]}
      >
        <ChevronRight size={22} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  item: {
    borderRadius: 12,
    overflow: "hidden",
  },
  arrowButton: {
    position: "absolute",
    top: "45%",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0D9488",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    zIndex: 10,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  disabled: {
    backgroundColor: "#A7F3D0",
  },
});
