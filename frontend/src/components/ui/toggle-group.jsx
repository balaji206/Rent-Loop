import React, { createContext, useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

/**
 * ToggleGroup Context
 */
const ToggleGroupContext = createContext({
  value: null,
  onChange: () => {},
  type: "single", // "single" | "multiple"
  selectedValues: [],
});

/**
 * ToggleGroup Root Component
 */
export function ToggleGroup({
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  style,
}) {
  const [internalValue, setInternalValue] = useState(
    type === "single" ? defaultValue || null : defaultValue || []
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newVal) => {
    if (type === "single") {
      const nextValue = newVal === value ? null : newVal;
      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    } else {
      // For multiple toggles
      const nextValues = value.includes(newVal)
        ? value.filter((v) => v !== newVal)
        : [...value, newVal];
      if (!isControlled) setInternalValue(nextValues);
      onValueChange?.(nextValues);
    }
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        value,
        type,
        onChange: handleValueChange,
        selectedValues: Array.isArray(value) ? value : [value],
      }}
    >
      <View style={[styles.group, style]}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

/**
 * ToggleGroup Item
 */
export function ToggleGroupItem({ value, children, style }) {
  const { type, onChange, selectedValues } = useContext(ToggleGroupContext);
  const isSelected = selectedValues.includes(value);

  return (
    <Pressable
      onPress={() => onChange(value)}
      style={({ pressed }) => [
        styles.item,
        isSelected && styles.itemActive,
        pressed && styles.itemPressed,
        style,
      ]}
    >
      <Text
        style={[styles.itemText, isSelected && styles.itemTextActive]}
        numberOfLines={1}
      >
        {children}
      </Text>
    </Pressable>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F3F4F6", // muted background
  },
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#111827",
  },
  itemPressed: {
    backgroundColor: "#E5E7EB",
  },
  itemText: {
    fontSize: 14,
    color: "#6B7280",
  },
  itemTextActive: {
    color: "#111827",
    fontWeight: "600",
  },
});
