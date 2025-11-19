import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

/**
 * ✅ React Native Calendar replacement for web-based DayPicker
 * Supports:
 *  - Single date selection
 *  - Range selection (optional)
 *  - Theming and icons
 *  - Works in Expo and React Native
 */

export default function Calendar({
  mode = "single", // "single" or "range"
  initialDate,
  onSelect,
  markedDatesProp,
}) {
  const [selected, setSelected] = useState(initialDate || null);
  const [range, setRange] = useState({ start: null, end: null });

  const handleDayPress = (day) => {
    if (mode === "single") {
      setSelected(day.dateString);
      onSelect?.(day.dateString);
    } else if (mode === "range") {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: day.dateString, end: null });
      } else {
        const start = new Date(range.start);
        const end = new Date(day.dateString);
        if (end < start) {
          setRange({ start: day.dateString, end: range.start });
        } else {
          setRange({ start: range.start, end: day.dateString });
        }
        onSelect?.({ start: range.start, end: day.dateString });
      }
    }
  };

  // Marked dates logic for UI feedback
  const markedDates =
    mode === "single"
      ? {
          [selected]: {
            selected: true,
            selectedColor: "#0D9488",
          },
        }
      : generateRangeMarkers(range);

  return (
    <View style={styles.container}>
      <RNCalendar
        theme={{
          arrowColor: "#0D9488",
          todayTextColor: "#0D9488",
          selectedDayBackgroundColor: "#0D9488",
          selectedDayTextColor: "#fff",
          textMonthFontWeight: "600",
        }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <ChevronLeft size={18} color="#0D9488" />
          ) : (
            <ChevronRight size={18} color="#0D9488" />
          )
        }
        markedDates={{ ...markedDates, ...markedDatesProp }}
        onDayPress={handleDayPress}
        enableSwipeMonths
      />
    </View>
  );
}

// Helper for range marking
function generateRangeMarkers(range) {
  if (!range.start) return {};
  const marked = {
    [range.start]: { startingDay: true, color: "#0D9488", textColor: "#fff" },
  };

  if (range.end) {
    let current = new Date(range.start);
    const end = new Date(range.end);
    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];
      marked[dateStr] = {
        color: "#99F6E4",
        textColor: "#0F766E",
      };
      current.setDate(current.getDate() + 1);
    }
    marked[range.end] = { endingDay: true, color: "#0D9488", textColor: "#fff" };
  }

  return marked;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
});
