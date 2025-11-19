import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Clock,
  CheckCircle,
  Navigation,
} from "lucide-react-native";
import Avatar, { AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScreenEnum } from "../types/navigation";

export function MeetUp({ rental, onNavigate }) {
  const [status, setStatus] = useState(
    rental.status === "in-use" ? "return" : "waiting"
  );

  const handleMarkReceived = () => {
    setStatus("received");
    setTimeout(() => {
      setStatus("in-use");
    }, 1500);
  };

  const handleMarkReturned = () => {
    setStatus("returned");
    setTimeout(() => {
      onNavigate(ScreenEnum.RATE_REVIEW, undefined, rental);
    }, 1500);
  };

  if (status === "received" || status === "returned") {
    return (
      <View style={styles.centered}>
        <View style={styles.successIconWrapper}>
          <CheckCircle color="#0d9488" size={60} />
        </View>
        <Text style={styles.successTitle}>
          {status === "received" ? "Item Received!" : "Item Returned!"}
        </Text>
        <Text style={styles.successMessage}>
          {status === "received"
            ? "Enjoy your rental! Remember to return it by the agreed date."
            : "Thank you for returning the item on time."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.MY_RENTALS)}
          style={styles.backButton}
        >
          <ChevronLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {status === "return" ? "Return Meetup" : "Pickup Meetup"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapCenter}>
            <MapPin color="#0d9488" size={60} />
            <Text style={styles.mapText}>Interactive map would display here</Text>
          </View>

          {/* Example markers */}
          <View style={styles.markerOne}>
            <View style={styles.markerInner} />
          </View>
          <View style={styles.markerTwo}>
            <View style={styles.markerInner} />
          </View>

          <TouchableOpacity style={styles.directionsButton}>
            <Navigation color="#0d9488" size={16} style={{ marginRight: 6 }} />
            <Text style={{ color: "#111827" }}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {/* Product Info */}
          <View style={styles.productCard}>
            <ImageWithFallback
              src={rental.product.image}
              alt={rental.product.name}
              style={styles.productImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{rental.product.name}</Text>
              <Text style={styles.productPrice}>
                ${rental.product.pricePerDay}/day
              </Text>
            </View>
          </View>

          {/* Owner Info */}
          <View style={styles.ownerCard}>
            <Avatar style={{ width: 48, height: 48 }}>
              <AvatarImage src={rental.product.owner.avatar} />
              <AvatarFallback>{rental.product.owner.name[0]}</AvatarFallback>
            </Avatar>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerName}>{rental.product.owner.name}</Text>
              <Text style={styles.ownerStatus}>
                {status === "return" ? "Waiting for item" : "On the way"}
              </Text>
            </View>
            <Pressable
              style={styles.messageButton}
              onPress={() => onNavigate(ScreenEnum.CHAT, undefined, rental)}
            >
              <Text style={styles.messageButtonText}>Message</Text>
            </Pressable>
          </View>

          {/* Meetup Details */}
          <View style={{ marginBottom: 20 }}>
            <View style={styles.detailRow}>
              <View style={styles.iconCircle}>
                <MapPin color="#0d9488" size={18} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>Location</Text>
                <Text style={styles.detailText}>{rental.meetupLocation}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconCircle}>
                <Clock color="#0d9488" size={18} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>
                  {status === "return" ? "Return Time" : "Pickup Time"}
                </Text>
                <Text style={styles.detailText}>
                  {status === "return" ? rental.endDate : rental.startDate} at 2:00 PM
                </Text>
              </View>
            </View>
          </View>

          {/* Countdown */}
          <View style={styles.countdownCard}>
            <Text style={styles.countdownLabel}>
              {status === "return" ? "Time until return" : "Time until pickup"}
            </Text>
            <Text style={styles.countdownTime}>2 hours 30 minutes</Text>
          </View>

          {/* Safety Tips */}
          <View style={styles.safetyCard}>
            <Text style={styles.safetyTitle}>Safety Tips</Text>
            <Text style={styles.safetyText}>
              • Meet in a public, well-lit location
            </Text>
            <Text style={styles.safetyText}>
              • Verify the item condition before{" "}
              {status === "return" ? "returning" : "accepting"}
            </Text>
            <Text style={styles.safetyText}>
              • Take photos of the item for your records
            </Text>
            <Text style={styles.safetyText}>
              • Report any issues immediately through chat
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        {status === "waiting" && (
          <Pressable style={styles.actionButton} onPress={handleMarkReceived}>
            <Text style={styles.actionButtonText}>Mark as Received</Text>
          </Pressable>
        )}
        {status === "in-use" && (
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>✓ Item in your possession</Text>
              <Text style={styles.infoBoxSub}>Enjoy your rental!</Text>
            </View>
            <Pressable
              style={styles.outlineButton}
              onPress={() => setStatus("return")}
            >
              <Text style={styles.outlineButtonText}>Schedule Return</Text>
            </Pressable>
          </View>
        )}
        {status === "return" && (
          <Pressable style={styles.actionButton} onPress={handleMarkReturned}>
            <Text style={styles.actionButtonText}>Mark as Returned</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  mapContainer: {
    height: 300,
    backgroundColor: "#ccfbf1",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  mapCenter: { alignItems: "center", justifyContent: "center", marginTop: 80 },
  mapText: { color: "#374151", marginTop: 8 },
  markerOne: {
    position: "absolute",
    top: 80,
    left: "35%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0d9488",
    justifyContent: "center",
    alignItems: "center",
  },
  markerTwo: {
    position: "absolute",
    bottom: 60,
    right: "35%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  markerInner: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  directionsButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  section: { paddingHorizontal: 24, paddingTop: 24 },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
  },
  productImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  productName: { color: "#111827", fontWeight: "600" },
  productPrice: { color: "#0d9488" },
  ownerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
  },
  ownerName: { color: "#111827", fontWeight: "600" },
  ownerStatus: { color: "#6b7280" },
  messageButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  messageButtonText: { color: "#111827", fontSize: 13 },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccfbf1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailTitle: { color: "#111827", fontWeight: "600" },
  detailText: { color: "#6b7280" },
  countdownCard: {
    backgroundColor: "#f0fdfa",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  countdownLabel: { color: "#374151", marginBottom: 4 },
  countdownTime: { color: "#0d9488", fontWeight: "600" },
  safetyCard: {
    backgroundColor: "#e0f2fe",
    borderRadius: 16,
    padding: 16,
  },
  safetyTitle: { color: "#111827", fontWeight: "600", marginBottom: 6 },
  safetyText: { color: "#374151", marginBottom: 2 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    padding: 16,
  },
  actionButton: {
    backgroundColor: "#0d9488",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 14,
  },
  actionButtonText: { color: "#fff", fontWeight: "600" },
  infoBox: {
    backgroundColor: "#ecfdf5",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  infoBoxText: { color: "#047857", fontWeight: "600" },
  infoBoxSub: { color: "#6b7280", fontSize: 13, marginTop: 4 },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 14,
  },
  outlineButtonText: { color: "#111827", fontWeight: "500" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  successIconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccfbf1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: { fontSize: 20, fontWeight: "600", color: "#111827" },
  successMessage: {
    color: "#4b5563",
    textAlign: "center",
    marginTop: 8,
  },
});
