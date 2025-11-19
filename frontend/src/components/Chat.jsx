import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import {
  ChevronLeft,
  Send,
  MapPin,
  CalendarDays,
  Camera,
} from "lucide-react-native";

import { ScreenEnum } from "../types/navigation";

export function Chat({ rental, onNavigate }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "owner",
      text: "Hi! Thanks for renting my camera. Looking forward to meeting you!",
      time: "10:30 AM",
      read: true,
    },
    {
      id: "2",
      sender: "user",
      text: "Hi! Thanks! Can we meet at Central Park main entrance?",
      time: "10:32 AM",
      read: true,
    },
    {
      id: "3",
      sender: "owner",
      text: "Yes, that works! See you tomorrow at 2 PM.",
      time: "10:35 AM",
      read: true,
    },
    {
      id: "4",
      sender: "user",
      text: "Perfect! See you then.",
      time: "10:36 AM",
      read: true,
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const owner = rental?.product?.owner || {
    id: "u1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    verified: true,
    rating: 4.9,
  };

  const product = rental?.product;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onNavigate(ScreenEnum.HOME)}
          style={styles.backButton}
        >
          <ChevronLeft color="#374151" size={24} />
        </TouchableOpacity>

        {/* NATIVE AVATAR */}
        <Image source={{ uri: owner.avatar }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.ownerName}>{owner.name}</Text>
          <Text style={styles.ownerStatus}>Active now</Text>
        </View>
      </View>

      {/* Product Thumbnail */}
      {product && (
        <View style={styles.productCard}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.pricePerDay}/day</Text>
          </View>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        style={styles.messages}
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === "user" ? styles.alignRight : styles.alignLeft,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === "user" ? styles.userBubble : styles.ownerBubble,
              ]}
            >
              <Text style={msg.sender === "user" ? styles.userText : styles.ownerText}>
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  msg.sender === "user" ? styles.userTime : styles.ownerTime,
                ]}
              >
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickActions}
        contentContainerStyle={styles.quickActionsContent}
      >
        {renderQuickAction(MapPin, "Share Location")}
        {renderQuickAction(CalendarDays, "Reschedule")}
        {renderQuickAction(Camera, "Send Photo")}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          style={styles.textInput}
          placeholderTextColor="#9ca3af"
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Send color="#fff" size={20} />
        </Pressable>
      </View>
    </View>
  );

  function renderQuickAction(Icon, label) {
    return (
      <Pressable key={label} style={styles.quickButton}>
        <Icon color="#0d9488" size={16} style={{ marginRight: 6 }} />
        <Text style={styles.quickButtonText}>{label}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  ownerName: { color: "#111827", fontWeight: "600" },
  ownerStatus: { color: "#6b7280", fontSize: 12 },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },

  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },

  productTitle: { color: "#111827", fontWeight: "500" },
  productPrice: { color: "#0d9488" },

  messages: { flex: 1, paddingHorizontal: 16 },

  messageWrapper: { marginBottom: 12 },
  alignRight: { alignItems: "flex-end" },
  alignLeft: { alignItems: "flex-start" },

  messageBubble: {
    maxWidth: "75%",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  userBubble: { backgroundColor: "#0d9488" },
  ownerBubble: { backgroundColor: "#f3f4f6" },

  userText: { color: "#fff", fontSize: 15 },
  ownerText: { color: "#111827", fontSize: 15 },

  messageTime: { fontSize: 10, marginTop: 4 },
  userTime: { color: "#a7f3d0" },
  ownerTime: { color: "#6b7280" },

  quickActions: {
  borderTopWidth: 1,
  borderTopColor: "#e5e7eb",
  backgroundColor: "#f9fafb",
  
  height: 36,     // ← Controls final height (CHANGE THIS)
  maxHeight: 36,  // ← Forces container not to stretch
  minHeight: 36,  // ← Prevents ScrollView auto-expansion
  
  paddingHorizontal: 12,
},


  quickActionsContent: {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",
  height: "100%",      // ← important to keep children inside reduced height
},

  quickButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#fff",
  },

  quickButtonText: { color: "#111827", fontSize: 13 },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    padding: 10,
  },

  textInput: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    color: "#111827",
  },

  sendButton: {
    backgroundColor: "#0d9488",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
