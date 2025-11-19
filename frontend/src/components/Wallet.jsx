import { View, Text, Pressable, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  ChevronLeft,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
} from "lucide-react-native";

export function Wallet({ onNavigate }) {
  const earnings = [
    { id: "1", item: "Sony A7III Camera", amount: 135, date: "2025-11-10", status: "completed" },
    { id: "2", item: "Power Drill Set", amount: 45, date: "2025-11-08", status: "completed" },
    { id: "3", item: "Camping Tent", amount: 60, date: "2025-11-05", status: "pending" },
  ];

  const payments = [
    { id: "1", item: "Mountain Bike", amount: -75, date: "2025-11-12", status: "completed" },
    { id: "2", item: "Bluetooth Speaker", amount: -30, date: "2025-11-09", status: "completed" },
    { id: "3", item: "PlayStation 5", amount: -105, date: "2025-11-06", status: "pending" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => onNavigate("profile")}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Wallet</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceIconRow}>
            <WalletIcon size={20} color="white" />
            <Text style={styles.balanceLabel}>Total Balance</Text>
          </View>

          <Text style={styles.balanceAmount}>$245.00</Text>

          <View style={styles.balanceActionRow}>
            <Pressable style={styles.withdrawBtn}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </Pressable>

            <Pressable style={styles.addFundsBtn}>
              <Text style={styles.addFundsText}>Add Funds</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ✅️ SCROLLABLE CONTENT */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Stats */}
        <View style={styles.statsWrapper}>
          <View style={styles.statsRow}>
            <View style={styles.statsCard}>
              <View style={styles.statsIconRow}>
                <ArrowDownRight size={20} color="#059669" />
                <Text style={styles.statsLabel}>Earnings</Text>
              </View>
              <Text style={styles.statsValue}>$240.00</Text>
              <Text style={styles.statsSub}>This month</Text>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.statsIconRow}>
                <ArrowUpRight size={20} color="#DC2626" />
                <Text style={styles.statsLabel}>Spent</Text>
              </View>
              <Text style={styles.statsValue}>$210.00</Text>
              <Text style={styles.statsSub}>This month</Text>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsWrapper}>
          {/* Earnings */}
          <Text style={styles.sectionTitle}>My Earnings</Text>
          {earnings.map((t) => (
            <View key={t.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionItem}>{t.item}</Text>
                  <Text style={styles.transactionDate}>{t.date}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.positiveAmount}>+${t.amount}</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      t.status === "completed" ? styles.badgeCompleted : styles.badgePending,
                    ]}
                  >
                    {t.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Payments */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>My Payments</Text>
          {payments.map((t) => (
            <View key={t.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionItem}>{t.item}</Text>
                  <Text style={styles.transactionDate}>{t.date}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.negativeAmount}>-${Math.abs(t.amount)}</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      t.status === "completed" ? styles.badgeCompleted : styles.badgePending,
                    ]}
                  >
                    {t.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Link Bank – Fixed Bottom */}
      <View style={styles.linkBankWrapper}>
        <Pressable style={styles.linkBankBtn}>
          <CreditCard size={20} color="#374151" style={{ marginRight: 6 }} />
          <Text style={styles.linkBankText}>Link Bank Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ---------------------- STYLES ---------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 26,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginRight: 32,
  },

  balanceCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 20,
    borderRadius: 24,
  },
  balanceIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  balanceLabel: {
    color: "#D1FAE5",
    fontSize: 14,
  },
  balanceAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 24,
  },
  balanceActionRow: {
    flexDirection: "row",
    gap: 12,
  },
  withdrawBtn: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  withdrawText: {
    color: "#0D9488",
    fontWeight: "700",
  },
  addFundsBtn: {
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addFundsText: {
    color: "white",
    fontWeight: "700",
  },

  statsWrapper: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statsCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  statsIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statsLabel: {
    color: "#6B7280",
  },
  statsValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  statsSub: {
    color: "#6B7280",
  },

  transactionsWrapper: {
    paddingHorizontal: 24,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  transactionCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 10,
  },

  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  transactionItem: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },

  transactionDate: {
    color: "#6B7280",
    marginTop: 4,
  },

  positiveAmount: {
    color: "#059669",
    fontWeight: "700",
  },

  negativeAmount: {
    color: "#DC2626",
    fontWeight: "700",
  },

  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  badgeCompleted: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
  },
  badgePending: {
    backgroundColor: "#FEF9C3",
    color: "#A16207",
  },

  linkBankWrapper: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  linkBankBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 16,
    justifyContent: "center",
    borderRadius: 30,
  },
  linkBankText: {
    fontWeight: "600",
    color: "#374151",
  },
});
