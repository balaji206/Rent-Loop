import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { Search, X } from "lucide-react-native";

/**
 * ✅ Command Palette for React Native / Expo
 * Works as a modal overlay with search + selectable command list
 */

export default function CommandPalette({
  visible,
  onClose,
  commands = [],
  title = "Command Palette",
  placeholder = "Search commands...",
  onSelect,
}) {
  const [query, setQuery] = useState("");

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <X size={22} color="#6B7280" />
            </Pressable>
          </View>

          {/* Search Input */}
          <View style={styles.searchWrapper}>
            <Search size={18} color="#6B7280" />
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              style={styles.input}
            />
          </View>

          {/* Command List */}
          <FlatList
            data={filtered}
            keyExtractor={(item, i) => `${item.label}-${i}`}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect?.(item);
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { backgroundColor: "#E0F2F1" },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  {item.icon && <item.icon size={18} color="#0D9488" />}
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
                {item.shortcut && (
                  <Text style={styles.shortcut}>{item.shortcut}</Text>
                )}
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No commands found</Text>
            }
            style={styles.list}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    marginLeft: 8,
  },
  list: {
    maxHeight: 300,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 15,
    color: "#111827",
  },
  shortcut: {
    fontSize: 12,
    color: "#6B7280",
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 12,
  },
});
