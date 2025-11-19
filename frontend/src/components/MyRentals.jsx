import { View, Text, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { MessageCircle, Star } from "lucide-react-native";
import { useState } from "react";
import Badge from "./ui/badge";
import { mockRentals } from "./mockData";
import ImageWithFallback from "./figma/ImageWithFallback";

export function MyRentals({ onNavigate }) {
  const [tab, setTab] = useState("active");

  const activeRentals = mockRentals.filter(
    (r) => r.status === "in-use" || r.status === "approved"
  );
  const pastRentals = mockRentals.filter((r) => r.status === "completed");

  const getStatusBadge = (status) => {
    const config = {
      requested: { label: "Requested", style: styles.badgeBlue },
      approved: { label: "Approved", style: styles.badgeGreen },
      "in-use": { label: "In Use", style: styles.badgePurple },
      returned: { label: "Returned", style: styles.badgeGray },
      completed: { label: "Completed", style: styles.badgeGray },
    };
    return config[status] || config.completed;
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Rentals</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setTab("active")}
          style={[styles.tabButton, tab === "active" && styles.tabButtonActive]}
        >
          <Text style={styles.tabText}>Active</Text>
        </Pressable>

        <Pressable
          onPress={() => setTab("past")}
          style={[styles.tabButton, tab === "past" && styles.tabButtonActive]}
        >
          <Text style={styles.tabText}>Past</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.listContainer}>
        
        {/* Active Rentals */}
        {tab === "active" && (
          <>
            {activeRentals.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIconCircle}>
                  <MessageCircle size={45} color="#999" />
                </View>
                <Text style={styles.emptyTitle}>No active rentals</Text>
                <Text style={styles.emptyText}>
                  Browse items and start renting!
                </Text>

                <Pressable
                  onPress={() => onNavigate("explore")}
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreButtonText}>Explore Items</Text>
                </Pressable>
              </View>
            ) : (
              activeRentals.map((rental) => {
                const badge = getStatusBadge(rental.status);

                return (
                  <View key={rental.id} style={styles.card}>
                    <ImageWithFallback
                      src={rental.product.image}
                      style={styles.cardImage}
                    />

                    <View style={styles.cardContent}>
                      <View style={styles.cardTopRow}>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {rental.product.name}
                        </Text>

                        <View style={[styles.badgeBase, badge.style]}>
                          <Text style={styles.badgeText}>{badge.label}</Text>
                        </View>
                      </View>

                      <Text style={styles.dateText}>
                        {rental.startDate} - {rental.endDate}
                      </Text>

                      <Text style={styles.priceText}>
                        ${rental.totalPrice} total
                      </Text>

                      <View style={styles.buttonRow}>
                        <Pressable
                          onPress={() => onNavigate("product", rental.product)}
                          style={styles.outlineButton}
                        >
                          <Text style={styles.outlineButtonText}>View Details</Text>
                        </Pressable>

                        <Pressable
                          onPress={() => onNavigate("chat", undefined, rental)}
                          style={styles.outlineButton}
                        >
                          <MessageCircle size={18} color="#444" style={{ marginRight: 4 }} />
                          <Text style={styles.outlineButtonText}>Chat</Text>
                        </Pressable>

                        {rental.status === "in-use" && (
                          <Pressable
                            onPress={() =>
                              onNavigate("meetup", undefined, rental)
                            }
                            style={styles.primaryButton}
                          >
                            <Text style={styles.primaryButtonText}>Return</Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </>
        )}

        {/* Past Rentals */}
        {tab === "past" && (
          <>
            {pastRentals.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No past rentals yet</Text>
              </View>
            ) : (
              pastRentals.map((rental) => {
                const badge = getStatusBadge(rental.status);

                return (
                  <View key={rental.id} style={styles.card}>
                    <ImageWithFallback
                      src={rental.product.image}
                      style={styles.cardImage}
                    />

                    <View style={styles.cardContent}>
                      <View style={styles.cardTopRow}>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {rental.product.name}
                        </Text>

                        <View style={[styles.badgeBase, badge.style]}>
                          <Text style={styles.badgeText}>{badge.label}</Text>
                        </View>
                      </View>

                      <Text style={styles.dateText}>
                        {rental.startDate} - {rental.endDate}
                      </Text>

                      <Text style={styles.priceGrayText}>
                        ${rental.totalPrice} total
                      </Text>

                      <View style={styles.buttonRow}>
                        <Pressable
                          onPress={() => onNavigate("product", rental.product)}
                          style={styles.outlineButton}
                        >
                          <Text style={styles.outlineButtonText}>View Details</Text>
                        </Pressable>

                        <Pressable
                          onPress={() =>
                            onNavigate("rate-review", undefined, rental)
                          }
                          style={styles.outlineButton}
                        >
                          <Star size={18} color="#444" style={{ marginRight: 4 }} />
                          <Text style={styles.outlineButtonText}>Rate</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </>
        )}

      </ScrollView>
    </View>
  );
}

/* -------------------------- STYLES -------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 24,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    marginHorizontal: 24,
    marginTop: 20,
    padding: 4,
    borderRadius: 50,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
  },

  tabButtonActive: {
    backgroundColor: "white",
    elevation: 2,
  },

  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },

  listContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  emptyText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },

  exploreButton: {
    backgroundColor: "#0D9488",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },

  exploreButtonText: {
    color: "white",
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },

  cardImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },

  dateText: {
    color: "#6B7280",
    marginBottom: 4,
  },

  priceText: {
    color: "#0D9488",
    fontWeight: "700",
    marginBottom: 10,
  },

  priceGrayText: {
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  outlineButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    flexDirection: "row",
    alignItems: "center",
  },

  outlineButtonText: {
    color: "#111",
  },

  primaryButton: {
    backgroundColor: "#0D9488",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
  },

  primaryButtonText: {
    color: "white",
    fontWeight: "600",
  },

  /* BADGE STYLES */
  badgeBase: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  badgeBlue: { backgroundColor: "#DBEAFE", color: "#1D4ED8" },
  badgeGreen: { backgroundColor: "#D1FAE5", color: "#047857" },
  badgePurple: { backgroundColor: "#EDE9FE", color: "#6D28D9" },
  badgeGray: { backgroundColor: "#F3F4F6", color: "#4B5563" },
});
