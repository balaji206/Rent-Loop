import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Search, Plus, Star, MapPin } from "lucide-react-native";
import { ScreenEnum } from "../types/navigation";
import { mockProducts, categories } from "./mockData";

export function Home({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredProducts = mockProducts.slice(0, 3);
  const allProducts =
    selectedCategory === "all"
      ? mockProducts
      : mockProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory
        );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>RentLoop</Text>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => onNavigate(ScreenEnum.EXPLORE)}
        >
          <Search color="#9ca3af" size={20} style={styles.searchIcon} />
          <Text style={styles.searchText}>Search for rentals near you</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryButton,
                selectedCategory === category.id
                  ? styles.categoryActive
                  : styles.categoryInactive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id
                    ? styles.categoryTextActive
                    : styles.categoryTextInactive,
                ]}
              >
                {category.icon} {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}
      >
        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Rentals</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => onNavigate(ScreenEnum.PRODUCT, product)}
                style={styles.featuredCard}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.featuredImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star color="#facc15" fill="#facc15" size={14} />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                    <MapPin
                      color="#6b7280"
                      size={14}
                      style={{ marginLeft: 6 }}
                    />
                    <Text style={styles.distanceText}>
                      {product.distance} km
                    </Text>
                  </View>
                  <Text style={styles.priceText}>
                    ${product.pricePerDay}/day
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Near You</Text>
          <View style={styles.grid}>
            {allProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => onNavigate(ScreenEnum.PRODUCT, product)}
                style={styles.productCard}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star color="#facc15" fill="#facc15" size={12} />
                    <Text style={styles.ratingTextSmall}>
                      {product.rating} ({product.reviewCount})
                    </Text>
                  </View>
                  <Text style={styles.priceText}>
                    ${product.pricePerDay}/day
                  </Text>
                  <Text style={styles.distanceSmall}>
                    {product.distance} km away
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => onNavigate(ScreenEnum.ADD_LISTING)}
        style={styles.fab}
      >
        <Plus color="#fff" size={26} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0d9488",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  categoriesWrapper: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 10,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryActive: {
    backgroundColor: "#0d9488",
  },
  categoryInactive: {
    backgroundColor: "#f3f4f6",
  },
  categoryText: {
    fontWeight: "500",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#fff",
  },
  categoryTextInactive: {
    color: "#374151",
  },
  scrollArea: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingRight: 24,
  },
  featuredCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  featuredImage: {
    width: "100%",
    height: 130,
  },
  cardContent: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    color: "#374151",
    fontSize: 13,
    marginLeft: 4,
  },
  distanceText: {
    color: "#6b7280",
    fontSize: 13,
  },
  priceText: {
    color: "#0d9488",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ratingTextSmall: {
    fontSize: 12,
    color: "#4b5563",
    marginLeft: 4,
  },
  distanceSmall: {
    color: "#6b7280",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 70,
    width: 60,
    height: 60,
    backgroundColor: "#0d9488",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
