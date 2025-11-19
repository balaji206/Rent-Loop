// components/Auth.js

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react-native";

/* --------------------------------------------------------
   MOCK API
---------------------------------------------------------*/
const mockAuthApiCall = (isLogin, email, password, phone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!email || !password || (!isLogin && !phone)) {
        resolve({ success: false, message: "Please fill all required fields." });
        return;
      }

      if (email === "test@rentloop.com" && password === "password") {
        resolve({ success: true, message: "Sign In successful!" });
      } else if (!isLogin && email.includes("@") && password.length >= 6) {
        resolve({ success: true, message: "Account created successfully!" });
      } else {
        resolve({
          success: false,
          message: isLogin
            ? "Invalid credentials. Try test@rentloop.com / password"
            : "Registration failed. Check email format or password length.",
        });
      }
    }, 1200);
  });
};

/* --------------------------------------------------------
   MESSAGE BAR
---------------------------------------------------------*/
const MessageBar = ({ message }) => {
  if (!message) return null;

  let box = [styles.messageBox];
  let text = [styles.messageText];

  if (message.type === "success") {
    box.push(styles.successBox);
    text.push(styles.successText);
  } else if (message.type === "error") {
    box.push(styles.errorBox);
    text.push(styles.errorText);
  }

  return (
    <View style={box}>
      <Text style={text}>{message.text}</Text>
    </View>
  );
};

/* --------------------------------------------------------
   MAIN AUTH COMPONENT
---------------------------------------------------------*/
export default function Auth({ onAuthSuccess, onNavigate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("test@rentloop.com");
  const [password, setPassword] = useState("password");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useMemo(() => {
    setEmail(isLogin ? "test@rentloop.com" : "");
    setPassword(isLogin ? "password" : "");
    setPhone("");
    setMessage(null);
  }, [isLogin]);

  /* --------------------------------------------------------
     SUBMIT
  ---------------------------------------------------------*/
const handleSubmit = async () => {
  if (isLoading) return;

  setMessage(null);
  setIsLoading(true);

  const result = await mockAuthApiCall(isLogin, email, password, phone);

  if (result.success) {
    setMessage({ type: "success", text: result.message });

    setTimeout(() => {
      onAuthSuccess(); // ← FIXED!
    }, 400);
  } else {
    setMessage({ type: "error", text: result.message });
  }

  setIsLoading(false);
};


  /* --------------------------------------------------------
     UI
  ---------------------------------------------------------*/
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>RentLoop</Text>

        <Text style={styles.title}>
          {isLogin ? "Welcome back!" : "Create account"}
        </Text>

        <Text style={styles.subtitle}>
          {isLogin
            ? "Sign in to continue renting and lending"
            : "Join the sharing economy today"}
        </Text>

        <MessageBar message={message} />

        {/* EMAIL */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#9ca3af" />
            <TextInput
              placeholder="you@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              editable={!isLoading}
              style={styles.input}
            />
          </View>
        </View>

        {/* PHONE (SIGN-UP ONLY) */}
        {!isLogin && (
          <View style={styles.field}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#9ca3af" />
              <TextInput
                placeholder="+1 555 000 0000"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!isLoading}
                style={styles.input}
              />
            </View>
          </View>
        )}

        {/* PASSWORD */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Lock size={20} color="#9ca3af" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff size={20} color="#4b5563" />
              ) : (
                <Eye size={20} color="#4b5563" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? "Sign In" : "Create Account"}
            </Text>
          )}
        </TouchableOpacity>

        {/* SWITCH LOGIN/SIGNUP */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchLink}>
              {isLogin ? "Sign up" : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* --------------------------------------------------------
   STYLES
---------------------------------------------------------*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: "#0d9488",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0d9488",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  switchText: {
    fontSize: 15,
    color: "#6b7280",
  },
  switchLink: {
    fontSize: 15,
    color: "#0d9488",
    marginLeft: 6,
    fontWeight: "700",
  },
  messageBox: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 6,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  successBox: {
    backgroundColor: "#D1FAE5",
    borderLeftColor: "#10B981",
  },
  successText: {
    color: "#065F46",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderLeftColor: "#EF4444",
  },
  errorText: {
    color: "#991B1B",
  },
});
