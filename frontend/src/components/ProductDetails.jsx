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

import Avatar from "../components/ui/avatar";
import Badge from "../components/ui/badge";
import ImageWithFallback from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { ScreenEnum } from "../types/navigation";

export function ProductDetails({ product = {}, onNavigate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ⛑ Normalize backend product → UI-safe product
  const normalizedProduct = {
    ...product,

    images: product.imageUrl
      ? [product.imageUrl]
      : ["https://picsum.photos/400"],

    rating: product.rating ?? 4.5,
    reviewCount: product.reviewCount ?? 12,
    distance: product.distance ?? 2,

    availability: product.availability ?? [],

    owner: product.owner ?? {
      name: "Verified Owner",
      avatar: "https://i.pravatar.cc/150",
      rating: 4.9,
      verified: true,
    },
  };

  // Safety guard
  if (!normalizedProduct.name) {
    return (
      <View style={styles.center}>
        <Text>No product data</Text>
      </View>
    );
  }

  const reviews = [
    { id: "1", user: "John Doe", rating: 5, comment: "Great product!", date: "2 days ago" },
    { id: "2", user: "Jane Smith", rating: 4, comment: "Would rent again.", date: "1 week ago" },
  ];

  const relatedProducts = [
    {
      id: "101",
      name: "Canon EOS R6",
      price: 40,
      image: normalizedProduct.images[0],
    },
    {
      id: "102",
      name: "Nikon Z6 II",
      price: 38,
      image: normalizedProduct.images[0],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.EXPLORE)}
          style={styles.backButton}
        >
          <ChevronLeft color="#374151" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image */}
        <View style={styles.imageCarousel}>
          <ImageWithFallback
            src={normalizedProduct.images[currentImageIndex]}
            alt={normalizedProduct.name}
            style={styles.mainImage}
          />

          <View style={styles.carouselDots}>
            {normalizedProduct.images.map((_, index) => (
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

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.productName}>{normalizedProduct.name}</Text>
              <Badge variant="secondary" style={styles.categoryBadge}>
                {normalizedProduct.category}
              </Badge>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>
                ${normalizedProduct.pricePerDay}/day
              </Text>
              <Text style={styles.deposit}>
                Deposit: ${normalizedProduct.deposit}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingItem}>
              <Star color="#facc15" fill="#facc15" size={18} />
              <Text style={styles.ratingText}>{normalizedProduct.rating}</Text>
              <Text style={styles.reviewCount}>
                ({normalizedProduct.reviewCount} reviews)
              </Text>
            </View>

            <View style={styles.locationItem}>
              <MapPin color="#6b7280" size={18} />
              <Text style={styles.distance}>
                {normalizedProduct.distance} km away
              </Text>
            </View>
          </View>

          {/* Owner */}
          <View style={styles.ownerCard}>
            <Avatar
              style={{ width: 48, height: 48 }}
              source={{ uri: normalizedProduct.owner.avatar }}
              name={normalizedProduct.owner.name}
            />

            <View style={{ flex: 1 }}>
              <View style={styles.ownerNameRow}>
                <Text style={styles.ownerName}>
                  {normalizedProduct.owner.name}
                </Text>
                {normalizedProduct.owner.verified && (
                  <Shield color="#0d9488" size={16} />
                )}
              </View>

              <View style={styles.ownerRatingRow}>
                <Star color="#facc15" fill="#facc15" size={14} />
                <Text style={styles.ownerRating}>
                  {normalizedProduct.owner.rating} rating
                </Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <Tabs defaultValue="details">
            <TabsList style={styles.tabsList}>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Text style={styles.description}>
                {normalizedProduct.description}
              </Text>

              <View style={styles.detailRow}>
                <Calendar color="#0d9488" size={18} />
                <Text style={styles.detailText}>
                  Availability: {normalizedProduct.availability || "Flexible"}
                </Text>
              </View>
            </TabsContent>

            <TabsContent value="reviews">
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text>{review.comment}</Text>
                </View>
              ))}
            </TabsContent>
          </Tabs>

          {/* Similar */}
          <Text style={styles.relatedTitle}>Similar Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relatedProducts.map((item) => (
              <View key={item.id} style={styles.relatedCard}>
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  style={styles.relatedImage}
                />
                <Text style={styles.relatedName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom */}
      <View style={styles.footer}>
        <Pressable style={styles.chatButton}>
          <MessageCircle color="#0d9488" size={22} />
        </Pressable>

        <Pressable
          style={styles.rentButton}
          onPress={() => onNavigate(ScreenEnum.RENTAL_REQUEST, normalizedProduct)}
        >
          <Text style={styles.rentButtonText}>Request to Rent</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerWrapper: { position: "absolute", top: 40, left: 24, zIndex: 10 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCarousel: { height: 300 },
  mainImage: { width: "100%", height: "100%" },
  carouselDots: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: { width: 6, height: 6, backgroundColor: "#ddd", margin: 4 },
  dotActive: { width: 16, backgroundColor: "#fff" },
  content: { padding: 20 },
  productName: { fontSize: 20, fontWeight: "700" },
  categoryBadge: { marginTop: 6 },
  price: { color: "#0d9488", fontWeight: "600" },
  deposit: { color: "#6b7280" },
  ratingContainer: { flexDirection: "row", justifyContent: "space-between" },
  ownerCard: { flexDirection: "row", marginVertical: 16 },
  tabsList: { flexDirection: "row", justifyContent: "space-around" },
  description: { marginVertical: 10 },
  footer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rentButton: {
    flex: 1,
    backgroundColor: "#0d9488",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  rentButtonText: { color: "#fff", fontWeight: "600" },
});
