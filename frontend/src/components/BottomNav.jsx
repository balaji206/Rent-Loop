import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Compass, PlusCircle, MessageCircle, User } from "lucide-react-native";
import { ScreenEnum } from "../types/navigation";

export function BottomNav({ currentScreen, onNavigate }) {
  const navItems = [
    { screen: ScreenEnum.HOME, icon: Home, label: "Home" },
    { screen: ScreenEnum.EXPLORE, icon: Compass, label: "Explore" },
    { screen: ScreenEnum.MY_RENTALS, icon: PlusCircle, label: "Rentals" },
    { screen: ScreenEnum.NOTIFICATIONS, icon: MessageCircle, label: "Chat" },
    { screen: ScreenEnum.PROFILE, icon: User, label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        {navItems.map(({ screen, icon: Icon, label }) => {
          const isActive = currentScreen === screen;
          return (
            <TouchableOpacity
              key={screen}
              onPress={() => onNavigate(screen)}
              activeOpacity={0.8}
              style={styles.navItem}
            >
              <Icon
                size={24}
                color={isActive ? "#0D9488" : "#9CA3AF"} // teal-600 : gray-400
              />
              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", // gray-200
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 15, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#9CA3AF", // gray-400
    marginTop: 2,
  },
  activeLabel: {
    color: "#0D9488", // teal-600
    fontWeight: "600",
  },
});
