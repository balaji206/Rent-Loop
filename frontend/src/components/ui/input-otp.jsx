import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Minus } from "lucide-react-native";

/**
 * ✅ React Native OTP Input
 * Props:
 * - length: number (default 6)
 * - onChange: (value: string) => void
 * - value: string
 * - disabled?: boolean
 * - separator?: boolean
 */

export default function InputOTP({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  separator = false,
}) {
  const inputs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleChange = (text, index) => {
    const newValue = value.split("");
    newValue[index] = text.slice(-1);
    const finalValue = newValue.join("");
    onChange(finalValue);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, disabled && { opacity: 0.5 }]}>
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <Pressable
            onPress={() => inputs.current[index]?.focus()}
            style={[
              styles.slot,
              focusedIndex === index && styles.activeSlot,
              value[index] && styles.filledSlot,
            ]}
          >
            <TextInput
              ref={(el) => (inputs.current[index] = el)}
              value={value[index] || ""}
              onChangeText={(t) => handleChange(t, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              editable={!disabled}
              style={styles.input}
            />
          </Pressable>

          {separator && index === Math.floor(length / 2) - 1 && (
            <View style={styles.separator}>
              <Minus size={16} color="#6B7280" />
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  slot: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  activeSlot: {
    borderColor: "#0D9488",
    borderWidth: 2,
  },
  filledSlot: {
    borderColor: "#0D9488",
  },
  input: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    width: "100%",
  },
  separator: {
    marginHorizontal: 8,
  },
});
