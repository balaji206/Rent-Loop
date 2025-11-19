import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { PanelLeft, X } from "lucide-react-native";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.7;

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

const SidebarContext = React.createContext(null);
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}

export function SidebarLayout({ children, sidebar, side = "left" }) {
  const { open } = useSidebar();
  const translateX = useRef(new Animated.Value(side === "left" ? -SIDEBAR_WIDTH : SIDEBAR_WIDTH)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: open ? 0 : side === "left" ? -SIDEBAR_WIDTH : SIDEBAR_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [open]);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }],
            [side]: 0,
          },
        ]}
      >
        {sidebar}
      </Animated.View>

      {/* Overlay when open */}
      {open && (
        <Pressable
          style={styles.overlay}
          onPress={() => {
            const { toggleSidebar } = useSidebar();
            toggleSidebar();
          }}
        />
      )}

      {/* Main content */}
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>{children}</View>
    </View>
  );
}

export function SidebarHeader({ title, style }) {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

export function SidebarContent({ children }) {
  return <View style={styles.content}>{children}</View>;
}

export function SidebarFooter({ children }) {
  return <View style={styles.footer}>{children}</View>;
}

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity style={styles.trigger} onPress={toggleSidebar}>
      <PanelLeft size={20} color="#374151" />
    </TouchableOpacity>
  );
}

export function SidebarCloseButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
      <X size={18} color="#6B7280" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 10,
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  trigger: {
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 10,
    padding: 8,
  },
});
