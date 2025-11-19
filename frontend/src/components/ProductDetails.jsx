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
  Star,
  MapPin,
  Shield,
  Calendar,
  MessageCircle,
} from "lucide-react-native";

// ⭐ FIXED IMPORT PATHS
import Avatar from "../components/ui/avatar";
import Badge from "../components/ui/badge";
import ImageWithFallback from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { ScreenEnum } from "../types/navigation";


export function ProductDetails({ product, onNavigate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const reviews = [
    { id: "1", user: "John Doe", rating: 5, comment: "Great product! Owner was very friendly.", date: "2 days ago" },
    { id: "2", user: "Jane Smith", rating: 4, comment: "Good condition, would rent again.", date: "1 week ago" },
    { id: "3", user: "Mike Johnson", rating: 5, comment: "Exactly as described. Highly recommend!", date: "2 weeks ago" },
  ];

  const relatedProducts = [
    { id: "101", name: "Canon EOS R6", price: 40, image: product.image },
    { id: "102", name: "Nikon Z6 II", price: 38, image: product.image },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.HOME)}
          style={styles.backButton}
        >
          <ChevronLeft color="#374151" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          <ImageWithFallback
            src={product.images[currentImageIndex]}
            alt={product.name}
            style={styles.mainImage}
          />
          <View style={styles.carouselDots}>
            {product.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentImageIndex(index)}
                style={[
                  styles.dot,
                  index === currentImageIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              <Badge variant="secondary" style={styles.categoryBadge}>
                {product.category}
              </Badge>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>${product.pricePerDay}/day</Text>
              <Text style={styles.deposit}>Deposit: ${product.deposit}</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingItem}>
              <Star color="#facc15" fill="#facc15" size={18} />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>
                ({product.reviewCount} reviews)
              </Text>
            </View>

            <View style={styles.locationItem}>
              <MapPin color="#6b7280" size={18} />
              <Text style={styles.distance}>{product.distance} km away</Text>
            </View>
          </View>

          {/* Owner Card */}
          <View style={styles.ownerCard}>
            <Avatar
              style={{ width: 48, height: 48 }}
              source={{ uri: product.owner.avatar }}
              name={product.owner.name}
            />

            <View style={{ flex: 1 }}>
              <View style={styles.ownerNameRow}>
                <Text style={styles.ownerName}>{product.owner.name}</Text>
                {product.owner.verified && (
                  <Shield color="#0d9488" size={16} />
                )}
              </View>

              <View style={styles.ownerRatingRow}>
                <Star color="#facc15" fill="#facc15" size={14} />
                <Text style={styles.ownerRating}>
                  {product.owner.rating} rating
                </Text>
              </View>
            </View>

            <Pressable style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </Pressable>
          </View>

          {/* Tabs */}
          <Tabs defaultValue="details" style={{ marginBottom: 24 }}>
            <TabsList style={styles.tabsList}>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="details" style={styles.tabContent}>
              <Text style={styles.description}>{product.description}</Text>

              <View style={{ marginTop: 20 }}>
                <View style={styles.detailRow}>
                  <Calendar color="#0d9488" size={18} />
                  <Text style={styles.detailText}>
                    Available: {product.availability.length} dates this month
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Shield color="#0d9488" size={18} />
                  <Text style={styles.detailText}>
                    Verified owner with 4.9 rating
                  </Text>
                </View>
              </View>
            </TabsContent>

            <TabsContent value="reviews" style={styles.tabContent}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewUser}>{review.user}</Text>
                    <View style={styles.reviewStars}>
                      <Star color="#facc15" fill="#facc15" size={14} />
                      <Text style={styles.reviewRating}>{review.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </TabsContent>

            <TabsContent value="policies" style={styles.tabContent}>
              <Text style={styles.policyTitle}>Cancellation Policy</Text>
              <Text style={styles.policyText}>
                Free cancellation up to 24 hours before rental start time.
              </Text>

              <Text style={styles.policyTitle}>Return Policy</Text>
              <Text style={styles.policyText}>
                Item must be returned in the same condition.
              </Text>

              <Text style={styles.policyTitle}>Damage Policy</Text>
              <Text style={styles.policyText}>
                Any damage will be deducted from the deposit.
              </Text>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.relatedTitle}>Similar Items</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedProducts.map((item) => (
                <View key={item.id} style={styles.relatedCard}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    style={styles.relatedImage}
                  />
                  <View style={styles.relatedInfo}>
                    <Text style={styles.relatedName}>{item.name}</Text>
                    <Text style={styles.relatedPrice}>${item.price}/day</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <Pressable
          style={styles.chatButton}
          onPress={() => onNavigate(ScreenEnum.CHAT)}
        >
          <MessageCircle color="#0d9488" size={22} />
        </Pressable>

        <Pressable
          style={styles.rentButton}
          onPress={() => onNavigate(ScreenEnum.RENTAL_REQUEST, product)}
        >
          <Text style={styles.rentButtonText}>Request to Rent</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* SAME STYLES YOU POSTED—NOT MODIFIED */
  container: { flex: 1, backgroundColor: "#fff" },
  headerWrapper: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCarousel: { width: "100%", height: 300 },
  mainImage: { width: "100%", height: "100%" },
  carouselDots: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: { backgroundColor: "#fff", width: 16 },
  content: { paddingHorizontal: 24, paddingTop: 24 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productName: { fontSize: 18, fontWeight: "700", color: "#111827" },
  categoryBadge: { backgroundColor: "#ccfbf1", color: "#0d9488" },
  price: { color: "#0d9488", fontWeight: "600" },
  deposit: { color: "#6b7280" },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  ratingItem: { flexDirection: "row", alignItems: "center" },
  ratingText: { color: "#111827", marginLeft: 6 },
  reviewCount: { color: "#6b7280", marginLeft: 4 },
  locationItem: { flexDirection: "row", alignItems: "center" },
  distance: { color: "#6b7280", marginLeft: 4 },
  ownerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
  },
  ownerNameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ownerName: { color: "#111827", fontWeight: "600" },
  ownerRatingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ownerRating: { color: "#4b5563" },
  viewProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  viewProfileText: { color: "#374151", fontSize: 12 },
  tabsList: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabContent: { marginTop: 12 },
  description: { color: "#374151", lineHeight: 20 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  detailText: { color: "#374151" },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewUser: { color: "#111827", fontWeight: "500" },
  reviewStars: { flexDirection: "row", alignItems: "center" },
  reviewRating: { color: "#374151", marginLeft: 4 },
  reviewComment: { color: "#4b5563", marginBottom: 2 },
  reviewDate: { color: "#9ca3af", fontSize: 12 },
  policyTitle: {
    color: "#111827",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  policyText: { color: "#4b5563" },
  relatedTitle: {
    color: "#111827",
    fontWeight: "600",
    marginBottom: 8,
  },
  relatedCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    width: 150,
  },
  relatedImage: { width: "100%", height: 100 },
  relatedInfo: { padding: 8 },
  relatedName: { color: "#111827", fontWeight: "500" },
  relatedPrice: { color: "#0d9488" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rentButton: {
    flex: 1,
    backgroundColor: "#0d9488",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  rentButtonText: { color: "#fff", fontWeight: "600" },
});
