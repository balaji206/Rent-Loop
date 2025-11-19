import { View, Text, Image, Pressable, TextInput } from "react-native";
import React from "react";

export const PrintName = (props) => {
  return (
    <View>
      <Text style={{ fontWeight: props.priority ? "bold" : "normal" }}>
        {props.name}
      </Text>
    </View>
  );
};

export const ShowUser = (props) => {
  return <PrintName name="Ned" />;
};

let username = "Cersei";
export const ShowStoredUser = (props) => {
  return <PrintName name={username} priority />;
};

import { useState } from "react";

export const CounterExample = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    <View>
      <Text>You clicked {count} times</Text>
      <TouchableOpacity onPress={handleClick}>Click me</TouchableOpacity>
    </View>
  );
};
