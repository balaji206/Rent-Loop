import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import {
  ChevronLeft,
  CreditCard,
  Wallet,
  Building,
  CheckCircle,
} from "lucide-react-native";

import ImageWithFallback from "./figma/ImageWithFallback";
import { ScreenEnum } from "../types/navigation";

/** 
 * Local Input + Label to prevent undefined import errors 
 */
const Input = (props) => (
  <TextInput
    {...props}
    style={[styles.input, props.style]}
    placeholderTextColor="#9ca3af"
  />
);

const Label = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

export function Payment({ product, onNavigate }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceFee = 5.99;
  const subtotal = product.pricePerDay * 3; // Example: 3-day rental
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate(ScreenEnum.HOME);
    }, 2000);
  };

  /** SUCCESS SCREEN */
  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconWrapper}>
          <CheckCircle color="#0d9488" size={60} />
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>
          Your rental request has been confirmed. You'll receive booking details shortly.
        </Text>

        <View style={styles.bookingCard}>
          <Text style={styles.bookingLabel}>Booking Reference</Text>
          <Text style={styles.bookingCode}>RL-{Date.now().toString().slice(-8)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.RENTAL_REQUEST, product)}
          style={styles.backButton}
        >
          <ChevronLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Product Summary */}
        <View style={styles.productSummary}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            style={styles.productImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDays}>3 days rental</Text>
            <Text style={styles.productPrice}>${subtotal}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        {renderOption("card", "Credit / Debit Card", CreditCard)}
        {renderOption("wallet", "Wallet (Balance: $245.00)", Wallet)}
        {renderOption("upi", "UPI", null, "U")}
        {renderOption("netbanking", "Net Banking", Building)}

        {/* Card Form */}
        {paymentMethod === "card" && (
          <View style={styles.cardForm}>
            <View>
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </View>
              <View style={{ flex: 1 }}>
                <Label>CVV</Label>
                <Input placeholder="123" secureTextEntry />
              </View>
            </View>

            <View>
              <Label>Cardholder Name</Label>
              <Input placeholder="John Doe" />
            </View>
          </View>
        )}

        {/* PRICE BREAKDOWN */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Price Breakdown</Text>

          <View style={styles.breakdownRow}>
            <Text>Rental (3 days × ${product.pricePerDay})</Text>
            <Text>${subtotal}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text>Service Fee</Text>
            <Text>${serviceFee}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text>Security Deposit</Text>
            <Text>${product.deposit}</Text>
          </View>

          <View style={styles.breakdownDivider} />

          <View style={styles.breakdownRowTotal}>
            <Text>Total to Pay</Text>
            <Text>${total}</Text>
          </View>

          <View style={styles.breakdownRowSub}>
            <Text>Hold Amount (Deposit)</Text>
            <Text>+${product.deposit}</Text>
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Secure Payment: Your information is encrypted. Deposits are refunded after return.
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay ${total}</Text>
        </Pressable>
      </View>
    </View>
  );

  /** Payment Option Renderer */
  function renderOption(id, label, Icon, letter) {
    const selected = paymentMethod === id;

    return (
      <TouchableOpacity
        key={id}
        onPress={() => setPaymentMethod(id)}
        style={[styles.paymentOption, selected && styles.paymentOptionActive]}
      >
        {Icon ? (
          <Icon size={22} color="#374151" />
        ) : (
          <View style={styles.upiIcon}>
            <Text style={styles.upiLetter}>{letter}</Text>
          </View>
        )}
        <Text style={styles.paymentLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /** HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },

  /** PRODUCT SUMMARY */
  productSummary: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    margin: 24,
  },
  productImage: { width: 70, height: 70, borderRadius: 12, marginRight: 12 },
  productName: { fontWeight: "600", color: "#111827" },
  productDays: { color: "#6b7280" },
  productPrice: { color: "#0d9488", fontWeight: "600", marginTop: 4 },

  /** PAYMENT OPTIONS */
  sectionTitle: {
    color: "#111827",
    fontWeight: "600",
    marginLeft: 24,
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    marginBottom: 10,
  },
  paymentOptionActive: { borderColor: "#0d9488", backgroundColor: "#f0fdfa" },
  paymentLabel: { marginLeft: 12, color: "#111827", fontSize: 14 },

  upiIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#7e22ce",
    alignItems: "center",
    justifyContent: "center",
  },
  upiLetter: { color: "#fff", fontWeight: "700" },

  /** INPUT STYLING */
  label: { color: "#374151", marginBottom: 4, fontWeight: "500" },
  input: {
    borderRadius: 10,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    padding: 12,
    marginTop: 4,
    fontSize: 14,
  },
  cardForm: { marginHorizontal: 24, marginTop: 16 },
  row: { flexDirection: "row" },

  /** BREAKDOWN CARD */
  breakdownCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    margin: 24,
  },
  breakdownTitle: { fontWeight: "600", color: "#111827", marginBottom: 8 },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  breakdownDivider: {
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    marginVertical: 8,
  },
  breakdownRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "700",
  },
  breakdownRowSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    color: "#6b7280",
  },

  securityNote: {
    backgroundColor: "#e0f2fe",
    padding: 12,
    marginHorizontal: 24,
    borderRadius: 12,
  },
  securityText: { color: "#374151", fontSize: 14 },

  /** FOOTER */
  footer: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    padding: 16,
  },
  payButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  payButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  /** SUCCESS SCREEN */
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
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
  successTitle: { color: "#111827", fontSize: 20, fontWeight: "600" },
  successSubtitle: { color: "#4b5563", textAlign: "center", marginVertical: 12 },
  bookingCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    width: "100%",
  },
  bookingLabel: { color: "#374151", marginBottom: 4 },
  bookingCode: { color: "#111827", fontWeight: "600" },
});
