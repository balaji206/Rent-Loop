import React, { useState } from "react";
import { View, Text } from "react-native";
import { Slider } from "./Slider";

export default function ExampleSlider() {
  const [value, setValue] = useState(50);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>Value: {value}</Text>
      <Slider
        value={value}
        min={0}
        max={100}
        step={1}
        onValueChange={setValue}
      />
    </View>
  );
}
