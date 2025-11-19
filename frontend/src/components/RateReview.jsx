import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ChevronLeft, Star, CheckCircle } from "lucide-react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScreenEnum } from "../types/navigation";

export function RateReview({ rental, onNavigate }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onNavigate(ScreenEnum.MY_RENTALS);
    }, 2000);
  };

  if (submitted) {
    return (
      <View style={styles.centered}>
        <View style={styles.successIconWrapper}>
          <CheckCircle color="#0d9488" size={60} />
        </View>
        <Text style={styles.successTitle}>Thank you!</Text>
        <Text style={styles.successSubtitle}>
          Your review has been submitted successfully.
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
        <Text style={styles.headerTitle}>Rate & Review</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Product Info */}
        <View style={styles.productCard}>
          <ImageWithFallback
            src={rental.product.image}
            alt={rental.product.name}
            style={styles.productImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{rental.product.name}</Text>
            <Text style={styles.productDates}>
              {rental.startDate} - {rental.endDate}
            </Text>
          </View>
        </View>

        {/* Owner Info */}
        <View style={styles.ownerSection}>
          <Avatar style={{ width: 48, height: 48 }}>
            <AvatarImage src={rental.product.owner.avatar} />
            <AvatarFallback>{rental.product.owner.name[0]}</AvatarFallback>
          </Avatar>
          <View>
            <Text style={styles.ownerName}>{rental.product.owner.name}</Text>
            <Text style={styles.ownerSub}>Rate your experience</Text>
          </View>
        </View>

        {/* Star Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingPrompt}>How was your experience?</Text>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Star
                  color={
                    star <= rating ? "#facc15" : "#d1d5db"
                  }
                  fill={star <= rating ? "#facc15" : "none"}
                  size={42}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingFeedback}>
              {rating === 5
                ? "🎉 Excellent!"
                : rating === 4
                ? "👍 Great!"
                : rating === 3
                ? "😊 Good!"
                : rating === 2
                ? "😐 Could be better"
                : "😞 Not satisfied"}
            </Text>
          )}
        </View>

        {/* Feedback Box */}
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackLabel}>Share your feedback (optional)</Text>
          <TextInput
            placeholder="Tell us about your experience..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
            style={styles.textArea}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Quick Feedback Options */}
        <View style={styles.quickFeedbackSection}>
          <Text style={styles.quickFeedbackTitle}>Quick feedback</Text>
          <View style={styles.quickFeedbackWrap}>
            {[
              "Great condition",
              "Easy meetup",
              "Friendly owner",
              "As described",
              "Would rent again",
              "Good value",
            ].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.quickTag}
                onPress={() =>
                  setFeedback(feedback ? `${feedback}, ${option}` : option)
                }
              >
                <Text style={styles.quickTagText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Your review helps build trust and guide others in the community.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleSubmit}
          disabled={rating === 0}
          style={[styles.submitButton, rating === 0 && { opacity: 0.5 }]}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.MY_RENTALS)}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
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
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    margin: 24,
    padding: 12,
  },
  productImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  productName: { color: "#111827", fontWeight: "600" },
  productDates: { color: "#6b7280" },
  ownerSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  ownerName: { color: "#111827", fontWeight: "600" },
  ownerSub: { color: "#6b7280" },
  ratingSection: { alignItems: "center", marginBottom: 20 },
  ratingPrompt: { color: "#111827", fontWeight: "600", marginBottom: 12 },
  ratingStars: { flexDirection: "row", justifyContent: "center" },
  ratingFeedback: { color: "#6b7280", marginTop: 8 },
  feedbackSection: { paddingHorizontal: 24, marginBottom: 20 },
  feedbackLabel: { color: "#111827", fontWeight: "600", marginBottom: 8 },
  textArea: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    textAlignVertical: "top",
    minHeight: 100,
    color: "#111827",
  },
  quickFeedbackSection: { paddingHorizontal: 24, marginBottom: 20 },
  quickFeedbackTitle: { color: "#111827", fontWeight: "600", marginBottom: 8 },
  quickFeedbackWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickTag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  quickTagText: { color: "#374151", fontSize: 13 },
  infoBox: {
    backgroundColor: "#e0f2fe",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  infoText: { color: "#374151", fontSize: 14 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    padding: 16,
  },
  submitButton: {
    backgroundColor: "#0d9488",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 14,
  },
  submitButtonText: { color: "#fff", fontWeight: "600" },
  skipButton: { alignItems: "center", marginTop: 12 },
  skipButtonText: { color: "#6b7280" },
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
    marginBottom: 24,
  },
  successTitle: { fontSize: 20, fontWeight: "600", color: "#111827" },
  successSubtitle: { color: "#4b5563", textAlign: "center", marginTop: 8 },
});
