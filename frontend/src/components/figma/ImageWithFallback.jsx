import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export default function ImageWithFallback({ source, style, ...rest }) {
  const [didError, setDidError] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={
          didError
            ? { uri: ERROR_IMG_SRC }
            : typeof source === "string"
            ? { uri: source }
            : source
        }
        style={[styles.image, style]}
        onError={() => setDidError(true)}
        resizeMode="contain"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6", // similar to bg-gray-100
  },
  image: {
    width: 100,
    height: 100,
  },
});
