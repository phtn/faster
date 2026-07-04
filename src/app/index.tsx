import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const routeCards = [
  {
    href: "/examples",
    label: "Examples",
    title: "Try common flows",
    description: "Open focused routes for planning, activity, and review.",
    mark: "EX",
  },
  {
    href: "/settings",
    label: "Settings",
    title: "Tune the app",
    description: "Manage notifications, display preferences, and data controls.",
    mark: "ST",
  },
  {
    href: "/account",
    label: "Account",
    title: "Review profile",
    description: "Check membership, plan status, devices, and account actions.",
    mark: "AC",
  },
] as const;

const metrics = [
  { label: "Active routes", value: "4" },
  { label: "Today", value: "82%" },
  { label: "Streak", value: "12d" },
] as const;

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View>
          <Text style={styles.eyebrow}>Today</Text>
          <Text style={styles.title}>Move faster without losing the thread.</Text>
        </View>
        <Text style={styles.heroText}>
          Faster keeps the important routes close: examples for app flows, settings for control,
          and account for identity and billing.
        </Text>
      </View>

      <View style={styles.metrics}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metric}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Routes</Text>
        <Text style={styles.sectionMeta}>Main navigation</Text>
      </View>

      <View style={styles.cardList}>
        {routeCards.map((card) => (
          <Link key={card.href} href={card.href} asChild>
            <Pressable style={styles.routeCard}>
              <View style={styles.routeMark}>
                <Text style={styles.routeMarkText}>{card.mark}</Text>
              </View>
              <View style={styles.routeBody}>
                <Text style={styles.routeLabel}>{card.label}</Text>
                <Text style={styles.routeTitle}>{card.title}</Text>
                <Text style={styles.routeDescription}>{card.description}</Text>
              </View>
              <Text style={styles.routeArrow}>{">"}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  hero: {
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 22,
    gap: 18,
  },
  eyebrow: {
    color: "#93c5fd",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 39,
    marginTop: 8,
  },
  heroText: {
    color: "#dbeafe",
    fontSize: 16,
    lineHeight: 23,
  },
  metrics: {
    flexDirection: "row",
    gap: 10,
  },
  metric: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    minHeight: 82,
    justifyContent: "center",
  },
  metricValue: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
  },
  metricLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    textTransform: "uppercase",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
  },
  sectionMeta: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },
  cardList: {
    gap: 12,
  },
  routeCard: {
    minHeight: 126,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    padding: 16,
  },
  routeMark: {
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  routeMarkText: {
    color: "#075985",
    fontSize: 13,
    fontWeight: "900",
  },
  routeBody: {
    flex: 1,
    gap: 3,
  },
  routeLabel: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  routeTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
  routeDescription: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  routeArrow: {
    color: "#94a3b8",
    fontSize: 32,
    fontWeight: "300",
  },
});
