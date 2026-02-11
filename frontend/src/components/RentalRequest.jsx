import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { ChevronLeft, Calendar as CalendarIcon, MapPin } from "lucide-react-native";
import ImageWithFallback from "./figma/ImageWithFallback";
import Calendar from "./ui/calendar"; 
import { ScreenEnum } from "../types/navigation";
import { ScrollView } from "react-native";


export function RentalRequest({ product, onNavigate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [meetupLocation, setMeetupLocation] = useState("");

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;

    const s = new Date(startDate);
    const e = new Date(endDate);

    const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return days * product.pricePerDay;
  };

  const handleSubmit = () => {
    onNavigate(ScreenEnum.PAYMENT, product);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate(ScreenEnum.PRODUCT, product)}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rental Request</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Product Summary */}
        <View style={styles.productCard}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.priceText}>${product.pricePerDay}/day</Text>
            <Text style={styles.depositText}>Deposit: ${product.deposit}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CalendarIcon size={20} color="#0d9488" />
            <Text style={styles.sectionHeaderText}>Select Dates</Text>
          </View>

          {/* REAL CALENDARS */}
          <View style={styles.calendarGroup}>
            <View>
              <Text style={styles.label}>Start Date</Text>
              <Calendar
                mode="single"
                initialDate={startDate}
                onSelect={(dateStr) => setStartDate(dateStr)}
              />
            </View>

            <View style={{ height: 20 }} />

            <View>
              <Text style={styles.label}>End Date</Text>
              <Calendar
                mode="single"
                initialDate={endDate}
                onSelect={(dateStr) => setEndDate(dateStr)}
                markedDatesProp={
                  startDate
                    ? {
                        [startDate]: {
                          selected: true,
                          selectedColor: "#A7F3D0",
                          selectedTextColor: "#064E3B",
                        },
                      }
                    : {}
                }
              />
            </View>
          </View>
        </View>

        {/* Location Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#0d9488" />
            <Text style={styles.sectionHeaderText}>Meet-up Location</Text>
          </View>

          <View style={styles.locationCard}>
            <View style={styles.mapPlaceholder}>
              <MapPin size={32} color="#9ca3af" />
            </View>

            <TextInput
              placeholder="Enter meet-up location"
              value={meetupLocation}
              onChangeText={setMeetupLocation}
              style={styles.locationInput}
            />

            <Text style={styles.suggestionText}>
              Suggested: Central Park, Main Entrance (0.5 km away)
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Rental Summary</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.summaryText}>Price per day</Text>
            <Text style={styles.summaryText}>${product.pricePerDay}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.summaryText}>Number of days</Text>
            <Text style={styles.summaryText}>
              {startDate && endDate
                ? Math.ceil(
                    (new Date(endDate) - new Date(startDate)) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.summaryText}>Security deposit</Text>
            <Text style={styles.summaryText}>${product.deposit}</Text>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.rowBetween}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${calculateTotal()}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            ✨ <Text style={styles.infoBold}>Next step:</Text> Your request will
            be sent to the owner for approval.
          </Text>
        </View>
      </ScrollView >


      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleSubmit}
          disabled={!startDate || !endDate || !meetupLocation}
          style={[
            styles.submitButton,
            (!startDate || !endDate || !meetupLocation) && styles.disabledButton,
          ]}
        >
          <Text style={styles.submitButtonText}>Continue to Payment</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: "#111827",
    fontWeight: "600",
  },

  body: { flex: 1, paddingHorizontal: 24, paddingVertical: 24 },

  productCard: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    marginBottom: 24,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  priceText: { color: "#0d9488", marginTop: 4, fontWeight: "500" },
  depositText: { color: "#6b7280", marginTop: 2 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionHeaderText: { fontSize: 16, color: "#111827", fontWeight: "600" },

  label: { fontSize: 14, color: "#374151", marginBottom: 8 },

  calendarGroup: { gap: 16 },

  locationCard: { backgroundColor: "#f3f4f6", padding: 16, borderRadius: 20 },
  mapPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  locationInput: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
  },
  suggestionText: { marginTop: 6, color: "#6b7280" },

  summaryCard: {
    backgroundColor: "#ccfbf1",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  summaryTitle: { fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 8 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  summaryText: { color: "#374151", fontSize: 14 },

  totalDivider: {
    borderTopWidth: 1,
    borderColor: "#99f6e4",
    marginVertical: 8,
  },
  totalText: { fontSize: 16, fontWeight: "700", color: "#0f766e" },

  infoBox: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoText: { color: "#374151" },
  infoBold: { fontWeight: "700" },

  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 18,
    borderRadius: 40,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  disabledButton: { opacity: 0.5 },
});
