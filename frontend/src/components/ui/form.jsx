import React, { createContext, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FormProvider, Controller, useFormContext } from "react-hook-form";

/**
 * ✅ React Native Form System (replacement for Radix + React Hook Form)
 * Works seamlessly with Expo and React Native.
 *
 * Components:
 * - FormProvider (exported as Form)
 * - FormField
 * - FormItem
 * - FormLabel
 * - FormDescription
 * - FormMessage
 * - FormControl
 */

const Form = FormProvider;

const FormFieldContext = createContext({ name: "" });

export function FormField({ name, control, rules, render }) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} control={control} rules={rules} render={render} />
    </FormFieldContext.Provider>
  );
}

const FormItemContext = createContext({});

export function FormItem({ children, style }) {
  return (
    <FormItemContext.Provider value={{}}>
      <View style={[styles.item, style]}>{children}</View>
    </FormItemContext.Provider>
  );
}

export function FormLabel({ children, error, style }) {
  return (
    <Text
      style={[
        styles.label,
        error ? { color: "#DC2626" } : { color: "#111827" },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function FormDescription({ children, style }) {
  return (
    <Text style={[styles.description, style]}>{children}</Text>
  );
}

export function FormMessage({ name, style }) {
  const {
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.[name]?.message;

  if (!errorMessage) return null;

  return (
    <Text style={[styles.error, style]}>{String(errorMessage)}</Text>
  );
}

export function FormControl({ children }) {
  return <View style={styles.control}>{children}</View>;
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 4,
  },
  control: {
    marginTop: 4,
  },
});

export { Form };
