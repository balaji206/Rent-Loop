import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  ChevronRight,
  Star,
  Package,
  ShoppingBag,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
} from "lucide-react-native";
import Avatar from "../components/ui/avatar";
import Badge from "../components/ui/badge";

export function Profile({ onNavigate }) {
  const menuItems = [
    { icon: Package, label: "My Listings", screen: "my-listings", color: "#0d9488" },
    { icon: ShoppingBag, label: "My Rentals", screen: "my-rentals", color: "#7c3aed" },
    { icon: Wallet, label: "Wallet", screen: "wallet", color: "#2563eb" },
  ];

  const settingsItems = [
    { icon: Settings, label: "Settings", color: "#6b7280" },
    { icon: HelpCircle, label: "Help & Support", color: "#6b7280" },
  ];

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Avatar
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            size={80}
            name="John Doe"
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>John Doe</Text>
              <Shield size={20} color="#fff" />
            </View>

            <Text style={styles.location}>San Francisco, CA</Text>

            <View style={styles.ratingRow}>
              <Star size={16} color="#facc15" fill="#facc15" />
              <Text style={styles.ratingValue}>4.9</Text>
              <Text style={styles.ratingSubtext}>(28 reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Items Listed</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Items Borrowed</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* ✅ CONTENT IS NOW SCROLLABLE */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.content}>
          
          {/* ABOUT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              Photography enthusiast and DIY lover. Happy to share my gear and
              tools with the community!
            </Text>

            <TouchableOpacity>
              <Text style={styles.editProfile}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* MAIN MENU */}
          <View style={styles.card}>
            {menuItems.map((item, i) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => onNavigate(item.screen)}
                style={[styles.menuItem, i !== menuItems.length - 1 && styles.borderBottom]}
              >
                <View style={[styles.menuIcon]}>
                  <item.icon size={20} color={item.color} />
                </View>

                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>

          {/* SETTINGS */}
          <View style={styles.card}>
            {settingsItems.map((item, i) => (
  <TouchableOpacity
    key={item.label}
    onPress={() => console.log(item.label)}   // <-- added
    style={[styles.menuItem, i !== settingsItems.length - 1 && styles.borderBottom]}
  >
    <View style={styles.menuIcon}>
      <item.icon size={20} color={item.color} />
    </View>

    <Text style={styles.menuLabel}>{item.label}</Text>
    <ChevronRight size={20} color="#9ca3af" />
  </TouchableOpacity>
))}

          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            onPress={() => onNavigate("auth")}
            style={styles.logoutCard}
          >
            <View style={styles.logoutIcon}>
              <LogOut size={20} color="#dc2626" />
            </View>

            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>RentLoop v1.0.0</Text>
            <Text style={styles.footerText}>Made with ❤️ for the sharing economy</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------------------ STYLES ------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  header: {
    backgroundColor: "#0d9488",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },

  headerRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },

  avatar: {
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  location: {
    color: "#99f6e4",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  ratingValue: { color: "white", fontWeight: "600" },
  ratingSubtext: { color: "#99f6e4" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
  },

  statValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  statLabel: {
    color: "#ccfbf1",
    fontSize: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },

  sectionTitle: { color: "#111827", fontSize: 16, marginBottom: 6 },

  aboutText: { color: "#6b7280", lineHeight: 20 },

  editProfile: { color: "#0d9488", marginTop: 6 },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  menuLabel: { flex: 1, color: "#111827", fontSize: 15 },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  logoutCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  logoutText: {
    color: "#dc2626",
    fontSize: 16,
    flex: 1,
  },

  footer: { marginTop: 32, alignItems: "center" },

  footerText: { color: "#6b7280" },
});
