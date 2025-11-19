import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  ChevronRight,
  Package,
  Search,
  HandshakeIcon,
} from "lucide-react-native";
import { ScreenEnum } from "../types/navigation";

const slides = [
  {
    icon: Package,
    title: "List your unused items for rent",
    description:
      "Turn your unused items into income. List electronics, tools, furniture, and more.",
    color: "#ccfbf1",
    iconColor: "#0d9488",
  },
  {
    icon: Search,
    title: "Find affordable rentals nearby",
    description:
      "Browse thousands of items available for rent in your area at great prices.",
    color: "#d1fae5",
    iconColor: "#059669",
  },
  {
    icon: HandshakeIcon,
    title: "Meet safely and exchange easily",
    description:
      "Coordinate meetups, handle secure payments, and enjoy a seamless rental experience.",
    color: "#dcfce7",
    iconColor: "#16a34a",
  },
];

export function Onboarding({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onNavigate(ScreenEnum.AUTH);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: slide.color }]}>
          <Icon color={slide.iconColor} size={64} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        {/* Progress Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentSlide && styles.activeDot]}
            />
          ))}
        </View>

        {/* Next / Get Started Button */}
        <Pressable onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          </Text>
          {currentSlide < slides.length - 1 && (
            <ChevronRight color="#fff" size={20} style={{ marginLeft: 6 }} />
          )}
        </Pressable>

        {/* Skip Button */}
        {currentSlide < slides.length - 1 && (
          <TouchableOpacity
            onPress={() => onNavigate(ScreenEnum.AUTH)}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 240,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingTop: -40,
    marginTop: -20,
    marginBottom: -10,
  },
  description: {
    color: "#4b5563",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
dotsContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 24,
  marginTop: 160,
  paddingHorizontal: 18,
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#d1d5db",
  marginHorizontal: 4,
},
activeDot: {
  width: 24,
  backgroundColor: "#0d9488",
},
nextButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#0d9488",
  borderRadius: 30,
  paddingVertical: 16,
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
  // 🔽 Reduced from 32 → 16 for cleaner look
  paddingHorizontal: 16,
},

  nextButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  skipButton: {
    alignItems: "center",
    marginTop: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  skipText: {
    color: "#3c5b9aff", // visible gray
    fontSize: 16,
    fontWeight: "500",
  },
});
