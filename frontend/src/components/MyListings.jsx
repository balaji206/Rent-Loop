// src/components/MyListings.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  ChevronLeft,
  Plus,
  MoreVertical,
  Edit,
  Pause,
  Trash2,
  TrendingUp,
} from "lucide-react-native";

import Badge from "./ui/badge"; // path you provided
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DropdownMenu from "./ui/dropdown-menu"; // default export
import ImageWithFallback from "./figma/ImageWithFallback";

/**
 * MyListings - Converted to React Native StyleSheet (no Tailwind strings)
 *
 * Props:
 *  - onNavigate(screen) - navigation callback used in your app
 *
 * NOTE: This file intentionally preserves the original UI/structure while
 * converting style strings into RN StyleSheet objects.
 */

export function MyListings({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("active");

  const activeListings = [
    {
      id: "1",
      name: "Sony A7III Camera",
      image:
        "https://images.unsplash.com/photo-1586437855769-01f981e0576b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjByZW50YWwlMjBwcm9kdWN0fGVufDF8fHx8MTc2MjgzOTcyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      pricePerDay: 45,
      status: "available",
      timesRented: 12,
      totalEarned: 540,
    },
    {
      id: "2",
      name: "Power Drill Set",
      image:
        "https://images.unsplash.com/photo-1593307315564-c96172dc89dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYyODA2ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      pricePerDay: 15,
      status: "rented",
      timesRented: 8,
      totalEarned: 120,
    },
  ];

  const pastListings = [
    {
      id: "3",
      name: "Camping Tent",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW50JTIwY2FtcGluZ3xlbnwxfHx8fDE3NjI4Mzk3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      pricePerDay: 20,
      status: "inactive",
      timesRented: 5,
      totalEarned: 100,
    },
  ];

  const onAddListing = () => onNavigate("add-listing");

  const dropdownItemsFor = (listing) => [
    {
      label: "Edit",
      icon: <Edit size={16} color="#374151" />,
      onPress: () => onNavigate("edit-listing", listing),
    },
    {
      label: "Pause",
      icon: <Pause size={16} color="#374151" />,
      onPress: () => console.log("Pause listing", listing.id),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} color="#DC2626" />,
      onPress: () => console.log("Delete listing", listing.id),
      destructive: true,
    },
  ];

  const statusBadgeProps = (status) => {
    if (status === "available") {
      return { variant: "secondary", style: { backgroundColor: "#D1FAE5" }, label: "Available" };
    } else if (status === "rented") {
      return { variant: "default", style: { backgroundColor: "#FEF3C7" }, label: "Currently Rented" };
    } else {
      return { variant: "secondary", style: { backgroundColor: "#F3F4F6" }, label: "Inactive" };
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => onNavigate("profile")} style={styles.headerLeft}>
            <ChevronLeft size={20} color="#374151" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Listings</Text>

          <Pressable onPress={onAddListing} style={styles.addButton}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statsRow}>
          <View style={styles.statsCell}>
            <Text style={styles.statsNumber}>{activeListings.length}</Text>
            <Text style={styles.statsLabel}>Active</Text>
          </View>

          <View style={styles.statsCell}>
            <Text style={styles.statsNumber}>20</Text>
            <Text style={styles.statsLabel}>Total Rentals</Text>
          </View>

          <View style={styles.statsCell}>
            <Text style={[styles.statsNumber, styles.earnings]}>$760</Text>
            <Text style={styles.statsLabel}>Total Earned</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabsInner}>
          <Pressable
            onPress={() => setActiveTab("active")}
            style={[styles.tabBtn, activeTab === "active" && styles.tabBtnActive]}
          >
            <Text style={styles.tabBtnText}>Active</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("past")}
            style={[styles.tabBtn, activeTab === "past" && styles.tabBtnActive]}
          >
            <Text style={styles.tabBtnText}>Past</Text>
          </Pressable>
        </View>
      </View>

      {/* Listings */}
      <ScrollView style={styles.listWrap} contentContainerStyle={{ paddingBottom: 32 }}>
        {activeTab === "active" &&
          (activeListings.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Plus size={32} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No active listings</Text>
              <Text style={styles.emptySubtitle}>Start earning by listing your unused items</Text>
              <Pressable style={styles.createBtn} onPress={onAddListing}>
                <Text style={styles.createBtnText}>Create Your First Listing</Text>
              </Pressable>
            </View>
          ) : (
            activeListings.map((listing) => {
              const badge = statusBadgeProps(listing.status);
              return (
                <View key={listing.id} style={styles.card}>
                  <ImageWithFallback src={listing.image} style={styles.cardImage} />

                  <View style={styles.cardBody}>
                    <View style={styles.cardTop}>
                      <View style={styles.titleAndBadge}>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {listing.name}
                        </Text>
                        <Badge variant={badge.variant} style={[styles.badge, badge.style]}>
                          {badge.label}
                        </Badge>
                      </View>

                      <DropdownMenu
                        trigger={<Pressable style={styles.menuTrigger}><MoreVertical size={18} color="#9CA3AF" /></Pressable>}
                        items={dropdownItemsFor(listing)}
                      />
                    </View>

                    <Text style={styles.priceText}>${listing.pricePerDay}/day</Text>

                    <View style={styles.cardFooter}>
                      <View style={styles.meta}>
                        <TrendingUp size={14} color="#374151" />
                        <Text style={styles.metaText}>{listing.timesRented} rentals</Text>
                      </View>

                      <Text style={styles.metaDot}>•</Text>

                      <Text style={styles.metaText}>${listing.totalEarned} earned</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ))}

        {activeTab === "past" &&
          (pastListings.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptySubtitle}>No past listings</Text>
            </View>
          ) : (
            pastListings.map((listing) => {
              const badge = statusBadgeProps(listing.status);
              return (
                <View key={listing.id} style={styles.card}>
                  <ImageWithFallback src={listing.image} style={[styles.cardImage, { opacity: 0.85 }]} />

                  <View style={styles.cardBody}>
                    <View style={styles.cardTop}>
                      <View style={styles.titleAndBadge}>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {listing.name}
                        </Text>
                        <Badge variant="secondary" style={[styles.badge, { backgroundColor: "#F3F4F6" }]}>
                          Inactive
                        </Badge>
                      </View>

                      <TouchableOpacity style={styles.menuTrigger}>
                        <MoreVertical size={18} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.priceText}>${listing.pricePerDay}/day</Text>

                    <View style={styles.cardFooter}>
                      <Text style={styles.metaText}>{listing.timesRented} rentals</Text>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.metaText}>${listing.totalEarned} earned</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ))}
      </ScrollView>
    </View>
  );
}

/* ---------------------- Styles ---------------------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingTop: 44,
    paddingBottom: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeft: {
    paddingRight: 12,
    paddingVertical: 6,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D9488",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    gap: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    marginLeft: 6,
  },

  stats: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsCell: {
    flex: 1,
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statsLabel: {
    color: "#6B7280",
    marginTop: 4,
  },
  earnings: {
    color: "#0D9488",
  },

  tabsWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabsInner: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    padding: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 999,
  },
  tabBtnActive: {
    backgroundColor: "#fff",
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  listWrap: {
    marginTop: 16,
    paddingHorizontal: 16,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    textAlign: "center",
  },
  createBtn: {
    backgroundColor: "#0D9488",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* Card */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    alignItems: "flex-start",
  },
  cardImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f3f4f6",
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleAndBadge: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    color: "#0D9488",
    fontWeight: "700",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  metaText: {
    marginLeft: 6,
    color: "#374151",
  },
  metaDot: {
    marginHorizontal: 8,
    color: "#9CA3AF",
  },

  menuTrigger: {
    padding: 6,
    borderRadius: 8,
  },
});
