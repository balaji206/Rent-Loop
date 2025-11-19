import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  ChevronLeft,
  CheckCircle,
  DollarSign,
  MessageCircle,
  AlertCircle,
} from "lucide-react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScreenEnum } from "../types/navigation";   // ✅ FIXED IMPORT

interface NotificationsProps {
  onNavigate: (screen: ScreenEnum, product?: any, rental?: any) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const notifications = [
    {
      id: "1",
      type: "rental",
      icon: CheckCircle,
      title: "Rental Approved",
      message: "Sarah approved your request for Sony A7III Camera",
      time: "5 minutes ago",
      read: false,
      color: "#059669",
    },
    {
      id: "2",
      type: "payment",
      icon: DollarSign,
      title: "Payment Received",
      message: "You received $45 for Power Drill rental",
      time: "2 hours ago",
      read: false,
      color: "#0D9488",
    },
    {
      id: "3",
      type: "chat",
      icon: MessageCircle,
      title: "New Message",
      message: "Mike sent you a message about the bike",
      time: "1 day ago",
      read: true,
      color: "#2563EB",
    },
    {
      id: "4",
      type: "system",
      icon: AlertCircle,
      title: "Return Reminder",
      message: "Your rental ends tomorrow. Schedule return meetup",
      time: "1 day ago",
      read: true,
      color: "#EA580C",
    },
    {
      id: "5",
      type: "rental",
      icon: CheckCircle,
      title: "Rental Completed",
      message: "Camping Tent rental completed. Rate your experience",
      time: "2 days ago",
      read: true,
      color: "#059669",
    },
  ];

  const rentalNotifications = notifications.filter((n) => n.type === "rental");
  const paymentNotifications = notifications.filter((n) => n.type === "payment");
  const systemNotifications = notifications.filter(
    (n) => n.type === "system" || n.type === "chat"
  );

  const NotificationItem = ({ notification }) => {
    const Icon = notification.icon;

    // Dummy rental passed to Chat screen
    const rentalForChat = {
      id: "r1",
      product: {
        name: "Sony A7III",
        pricePerDay: 40,
        owner: {
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        image: "https://via.placeholder.com/150",
      },
    };

    return (
      <TouchableOpacity
        onPress={() => {
          if (notification.type === "chat") {
            // Navigate to Chat WITH rental
            onNavigate(ScreenEnum.CHAT, null, rentalForChat);
          }
        }}
        style={[
          styles.notificationContainer,
          notification.read ? styles.bgWhite : styles.bgTealLight,
        ]}
      >
        <View style={styles.notificationRow}>
          <View style={styles.iconCircle}>
            <Icon size={22} color={notification.color} />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>{notification.title}</Text>

              {!notification.read && <View style={styles.unreadDot} />}
            </View>

            <Text style={styles.messageText}>{notification.message}</Text>
            <Text style={styles.timeText}>{notification.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <Tabs defaultValue="all" style={{ flex: 1 }}>
          <View style={styles.tabsHeader}>
            <TabsList style={styles.tabsList}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="rentals">Rentals</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </View>

          {/* ALL */}
          <TabsContent value="all">
            <View style={styles.listContainer}>
              {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </View>
          </TabsContent>

          {/* RENTALS */}
          <TabsContent value="rentals">
            <View style={styles.listContainer}>
              {rentalNotifications.length > 0 ? (
                rentalNotifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              ) : (
                <View style={styles.emptyBlock}>
                  <Text style={styles.emptyText}>No rental notifications</Text>
                </View>
              )}
            </View>
          </TabsContent>

          {/* PAYMENTS */}
          <TabsContent value="payments">
            <View style={styles.listContainer}>
              {paymentNotifications.length > 0 ? (
                paymentNotifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              ) : (
                <View style={styles.emptyBlock}>
                  <Text style={styles.emptyText}>No payment notifications</Text>
                </View>
              )}
            </View>
          </TabsContent>

          {/* SYSTEM */}
          <TabsContent value="system">
            <View style={styles.listContainer}>
              {systemNotifications.length > 0 ? (
                systemNotifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              ) : (
                <View style={styles.emptyBlock}>
                  <Text style={styles.emptyText}>No system notifications</Text>
                </View>
              )}
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingBottom: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  markReadText: {
    color: "#0D9488",
    fontWeight: "600",
  },
  tabsWrapper: {
    flex: 1,
  },
  tabsHeader: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabsList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    backgroundColor: "white",
  },
  emptyBlock: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
  },
  notificationContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  bgWhite: {
    backgroundColor: "white",
  },
  bgTealLight: {
    backgroundColor: "#F0FDFA",
  },
  notificationRow: {
    flexDirection: "row",
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#0D9488",
    marginTop: 6,
  },
  messageText: {
    color: "#4B5563",
    marginTop: 4,
  },
  timeText: {
    color: "#9CA3AF",
    marginTop: 2,
  },
});

export default Notifications;
