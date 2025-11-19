import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Search,
  ChevronLeft,
  SlidersHorizontal,
  Star,
  MapPin,
} from "lucide-react-native";
import { mockProducts } from "./mockData";
import { ScreenEnum } from "../types/navigation";

export function Explore({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxDistance, setMaxDistance] = useState([5]);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* ✅ FIXED BACK BUTTON — It should go to HOME, not PRODUCT */}
          <TouchableOpacity onPress={() => onNavigate(ScreenEnum.HOME)}>
            <ChevronLeft color="#374151" size={26} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Explore</Text>

          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal color="#374151" size={22} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Search color="#9ca3af" size={18} style={styles.searchIcon} />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}
      >
        <Text style={styles.resultCount}>
          {filteredProducts.length} items found
        </Text>

        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            // ✅ FIXED — use ScreenEnum, not Screens
            onPress={() => onNavigate(ScreenEnum.PRODUCT, product)}
            style={styles.productCard}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>
                {product.description}
              </Text>

              <View style={styles.ratingRow}>
                <View style={styles.inlineRow}>
                  <Star color="#facc15" fill="#facc15" size={14} />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <Text style={styles.dot}>•</Text>
                <View style={styles.inlineRow}>
                  <MapPin color="#6b7280" size={14} />
                  <Text style={styles.distanceText}>{product.distance} km</Text>
                </View>
              </View>

              <Text style={styles.priceText}>${product.pricePerDay}/day</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  filterButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    padding: 8,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
  },
  scrollArea: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  resultCount: {
    color: "#6b7280",
    marginBottom: 12,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#374151",
    fontSize: 13,
    marginLeft: 4,
  },
  dot: {
    color: "#9ca3af",
    marginHorizontal: 6,
  },
  distanceText: {
    color: "#6b7280",
    fontSize: 13,
    marginLeft: 2,
  },
  priceText: {
    color: "#0d9488",
    fontWeight: "600",
    fontSize: 14,
  },
});
