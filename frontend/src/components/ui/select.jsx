import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ChevronDown, ChevronUp, Check } from "lucide-react-native";

/**
 * ✅ Select (React Native)
 * Fully functional replacement for Radix Select
 */
export function Select({
  items = [],
  placeholder = "Select an option",
  value,
  onValueChange,
  style,
  label,
  disabled,
}) {
  const [open, setOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === value);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        disabled={disabled}
        onPress={() => !disabled && setOpen(true)}
        style={[
          styles.trigger,
          disabled && styles.disabled,
        ]}
      >
        <Text
          style={[
            styles.valueText,
            !selectedItem && styles.placeholderText,
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <ChevronDown size={16} color="#6B7280" />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setOpen(false)}
        />
        <View style={styles.dropdown}>
          <View style={styles.dropdownHeader}>
            <Text style={styles.dropdownLabel}>{label || "Select"}</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <ChevronUp size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const selected = item.value === value;
              return (
                <Pressable
                  onPress={() => {
                    onValueChange(item.value);
                    setOpen(false);
                  }}
                  style={[
                    styles.item,
                    selected && styles.itemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.itemText,
                      selected && styles.itemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {selected && <Check size={16} color="#3B82F6" />}
                </Pressable>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
  },
  disabled: {
    opacity: 0.5,
  },
  valueText: {
    fontSize: 15,
    color: "#111827",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    position: "absolute",
    top: "30%",
    left: "5%",
    right: "5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    maxHeight: "50%",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dropdownLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  itemSelected: {
    backgroundColor: "#EFF6FF",
  },
  itemText: {
    fontSize: 15,
    color: "#111827",
  },
  itemTextSelected: {
    color: "#1D4ED8",
    fontWeight: "500",
  },
});
