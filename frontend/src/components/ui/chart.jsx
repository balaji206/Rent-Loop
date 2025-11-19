import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Circle, G, Line } from "react-native-svg";
import * as scale from "d3-scale";

/**
 * ✅ Universal Chart Container for React Native
 * Works perfectly in Expo with Line, Bar, and Pie charts
 */

export function ChartContainer({ title, description, children, style }) {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={{ marginTop: 12 }}>{children}</View>
    </View>
  );
}

/**
 * 📊 Line Chart Component
 * Props:
 * - data: array of numbers
 * - color: string
 * - labels: optional X-axis labels
 */
export function ChartLine({ data, color = "#0D9488", labels }) {
  const contentInset = { top: 20, bottom: 20 };
  const size = Dimensions.get("window").width - 60;

  return (
    <View style={{ height: 200, flexDirection: "row" }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{ fontSize: 10, fill: "#6B7280" }}
        numberOfTicks={6}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ height: 200, width: size }}
          data={data}
          svg={{ stroke: color, strokeWidth: 3 }}
          contentInset={contentInset}
        >
          <Grid />
        </LineChart>
        {labels && (
          <XAxis
            style={{ marginHorizontal: -10, height: 20 }}
            data={data}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: "#6B7280" }}
            scale={scale.scaleBand}
          />
        )}
      </View>
    </View>
  );
}

/**
 * 📈 Bar Chart Component
 */
export function ChartBar({ data, color = "#0D9488", labels }) {
  return (
    <View style={{ height: 200, padding: 8 }}>
      <BarChart
        style={{ flex: 1 }}
        data={data}
        svg={{ fill: color }}
        contentInset={{ top: 20, bottom: 20 }}
        spacingInner={0.3}
        gridMin={0}
      >
        <Grid />
      </BarChart>
      {labels && (
        <XAxis
          style={{ marginTop: 10 }}
          data={data}
          formatLabel={(value, index) => labels[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "#6B7280" }}
          scale={scale.scaleBand}
        />
      )}
    </View>
  );
}

/**
 * 🥧 Pie Chart Component
 */
export function ChartPie({ data }) {
  const pieData = data
    .filter((value) => value.value > 0)
    .map((value, index) => ({
      value: value.value,
      svg: {
        fill: value.color || ["#0D9488", "#34D399", "#F59E0B", "#3B82F6"][index % 4],
      },
      key: `pie-${index}`,
    }));

  return (
    <PieChart
      style={{ height: 200 }}
      data={pieData}
      innerRadius={40}
      padAngle={0.05}
    />
  );
}

/**
 * 📊 Legend Component
 */
export function ChartLegend({ items = [] }) {
  return (
    <View style={styles.legendContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * ✨ Tooltip Overlay Example (for Line Chart)
 */
export function ChartTooltip({ x, y, data, color = "#0D9488" }) {
  return (
    <G>
      {data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={color}
          fill="white"
        />
      ))}
    </G>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#374151",
  },
});
