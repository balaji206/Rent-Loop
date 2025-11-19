import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

/* FIX: Context must be defined BEFORE use */
const TabsContext = React.createContext(null);

export function Tabs({ defaultValue, children, onValueChange, style }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (val) => {
    setValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ value, setValue: handleChange }}>
      <View style={[styles.tabsContainer, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style }) {
  return <View style={[styles.tabsList, style]}>{children}</View>;
}

export function TabsTrigger({ value, children, style }) {
  const { value: activeValue, setValue } = React.useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <Pressable
      onPress={() => setValue(value)}
      style={[
        styles.tabsTrigger,
        isActive && styles.tabsTriggerActive,
        style,
      ]}
    >
      <Text
        style={[
          styles.tabsTriggerText,
          isActive && styles.tabsTriggerTextActive,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function TabsContent({ value, children, style }) {
  const { value: activeValue } = React.useContext(TabsContext);

  if (value !== activeValue) return null;

  return <View style={[styles.tabsContent, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "column",
    gap: 8,
  },
  tabsList: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 3,
    borderRadius: 12,
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  tabsTriggerActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  tabsTriggerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  tabsTriggerTextActive: {
    color: "#111827",
    fontWeight: "600",
  },
  tabsContent: {
    marginTop: 12,
  },
});
