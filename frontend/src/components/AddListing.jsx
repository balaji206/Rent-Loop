import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

//Backend imports

import {createProduct} from '../api/productApi';
import {ScreenEnum} from '../types/navigation'
// ICON IMPORTS 
import ChevronLeft from "lucide-react-native/dist/esm/icons/chevron-left";
import Upload from "lucide-react-native/dist/esm/icons/upload";
import X from "lucide-react-native/dist/esm/icons/x";
import MapPin from "lucide-react-native/dist/esm/icons/map-pin";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Alert } from "react-native";


console.log("📌 ICON CHECK START");
console.log("ChevronLeft:", ChevronLeft);
console.log("Upload:", Upload);
console.log("X:", X);
console.log("MapPin:", MapPin);
console.log("📌 ICON CHECK END");

export default function AddListing({ onNavigate }) {
  const [location, setLocation] = useState(null);
const [locationText, setLocationText] = useState("Not set");
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricePerDay: "",
    deposit: "",
    availability: "",
  });

  const categories = [
    "Electronics",
    "Camera Gear",
    "Tools",
    "Vehicles",
    "Sports",
    "Fashion",
    "Furniture",
  ];

  const availabilityOptions = [
    "Available All Days",
    "Weekdays Only",
    "Weekends Only",
    "Custom Availability",
  ];

 const handlesubmit = async () => {
  try {
    const product = {
      name: formData.title,
      description: formData.description,
      category: formData.category,
      availability: formData.availability, // ✅ REQUIRED
      deposit: Number(formData.deposit),
      pricePerDay: Number(formData.pricePerDay),
      imageUrl: images[0] || "https://picsum.photos/200",
    };

    console.log("📤 SENDING PRODUCT:", product);

    await createProduct(product);
    onNavigate(ScreenEnum.EXPLORE);
  } catch (error) {
    console.error("❌ Failed to create Product", error);
  }
};

  const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location access is required");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const address = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    const place = address[0];
    const readableLocation = `${place.city || ""}, ${place.region || ""}`;

    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    setLocationText(readableLocation);
  } catch (error) {
    console.error("❌ Location error:", error);
    Alert.alert("Error", "Failed to get location");
  }
};



  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else handlesubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onNavigate?.("home");
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickFromGallery = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Permission required", "Gallery access is needed");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 6 - images.length,
    quality: 0.8,
  });

  if (!result.canceled) {
    const newImages = result.assets.map((asset) => asset.uri);
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  }
};

const pickFromCamera = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Permission required", "Camera access is needed");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.8,
  });

  if (!result.canceled) {
    setImages((prev) => [...prev, result.assets[0].uri].slice(0, 6));
  }
};

const openImageOptions = () => {
  Alert.alert("Add Photo", "Choose source", [
    { text: "Camera", onPress: pickFromCamera },
    { text: "Gallery", onPress: pickFromGallery },
    { text: "Cancel", style: "cancel" },
  ]);
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.heading}>Upload Photos</Text>
            <Text style={styles.subtext}>Add at least 3 clear photos of your item</Text>

            <View style={styles.photoGrid}>
              {images.map((img, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image source={{ uri: img }} style={styles.photo} />
                  <TouchableOpacity
                    onPress={() => setImages(images.filter((_, i) => i !== index))}
                    style={styles.removeBtn}
                  >
                    <X color="#fff" size={16} />
                  </TouchableOpacity>
                </View>
              ))}

              {images.length < 6 && (
                <TouchableOpacity style={styles.addPhoto} onPress={openImageOptions}>

                  <Upload color="#999" size={32} />
                  <Text style={{ color: "#666", marginTop: 4 }}>Add photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.photoCount}>{images.length}/6 photos uploaded</Text>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.heading}>Basic Information</Text>
            <Text style={styles.subtext}>Tell us about your item</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Item Title</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Sony A7III Camera"
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Describe your item, its condition..."
                value={formData.description}
                multiline
                onChangeText={(text) => handleChange("description", text)}
              />
            </View>
          </View>
        );

      // ✅ UPDATED STEP 3 (Category Selection)
      case 3:
        return (
          <View>
            <Text style={styles.heading}>Category</Text>
            <Text style={styles.subtext}>Select a category</Text>

            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionBox,
                  formData.category === cat && styles.optionSelected,
                ]}
                onPress={() => handleChange("category", cat)}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.category === cat && styles.optionTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.heading}>Pricing</Text>
            <Text style={styles.subtext}>Set your rental price and deposit</Text>

            <Text style={styles.label}>Price per Day ($)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.pricePerDay}
              onChangeText={(text) => handleChange("pricePerDay", text)}
            />

            <Text style={styles.label}>Security Deposit ($)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.deposit}
              onChangeText={(text) => handleChange("deposit", text)}
            />
          </View>
        );

      // ✅ UPDATED STEP 5 (Availability Selection)
      case 5:
        return (
          <View>
            <Text style={styles.heading}>Availability</Text>
            <Text style={styles.subtext}>Choose availability</Text>

            {availabilityOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionBox,
                  formData.availability === option && styles.optionSelected,
                ]}
                onPress={() => handleChange("availability", option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.availability === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 6:
        return (
          <View>
            <Text style={styles.heading}>Meet-up Location</Text>
            <Text style={styles.subtext}>Set meet-up radius</Text>

            <View style={styles.mapBox}>
  <MapPin color="#0d9488" size={32} />
  <Text style={styles.hint}>{locationText}</Text>

  <TouchableOpacity onPress={getCurrentLocation} style={{ marginTop: 10 }}>
    <Text style={{ color: "#0d9488", fontWeight: "600" }}>
      Use Current Location
    </Text>
  </TouchableOpacity>
</View>

          </View>
        );

      default:
        return <Text>Step {step}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Listing</Text>
        <Text style={styles.subHeader}>Step {step} of 6</Text>
      </View>

      <ScrollView style={styles.scrollArea}>{renderStep()}</ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {step === 6 ? "Publish Listing" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#111" },
  subHeader: { color: "#777" },
  scrollArea: { flex: 1, padding: 20 },
  heading: { fontSize: 18, fontWeight: "600", color: "#111", marginBottom: 4 },
  subtext: { color: "#666", marginBottom: 16 },
  fieldGroup: { marginTop: 10 },
  label: { fontSize: 14, color: "#333", marginTop: 10 },
  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  photoWrapper: { position: "relative", width: 100, height: 100 },
  photo: { width: "100%", height: "100%", borderRadius: 10 },
  removeBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 4,
  },
  addPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  photoCount: { textAlign: "center", color: "#777", marginTop: 10 },

  // Category & Availability Styles
  optionBox: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    marginVertical: 6,
  },
  optionSelected: {
    backgroundColor: "#0d9488",
  },
  optionText: {
    color: "#333",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#fff",
  },

  mapBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 20,
    backgroundColor: "#fff",
  },
  nextBtn: {
    backgroundColor: "#0d9488",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },
  nextBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  hint: { color: "#666", marginTop: 6 },
});
