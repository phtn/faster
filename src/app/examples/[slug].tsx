import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const exampleDetails = {
  "focus-flow": {
    title: "Focus flow",
    summary: "Choose the top priority, identify friction, and define the next useful move.",
    steps: ["Pick one outcome", "Name the blocker", "Commit to a 15 minute action"],
  },
  "quick-check": {
    title: "Quick check",
    summary: "Review current progress and decide whether to continue, adjust, or pause.",
    steps: ["Scan progress", "Compare against intent", "Select the next route"],
  },
  handoff: {
    title: "Handoff",
    summary: "Package the current state so another person can continue without guessing.",
    steps: ["Capture context", "List open decisions", "Assign one owner"],
  },
} as const;

type ExampleSlug = keyof typeof exampleDetails;

function isExampleSlug(slug: string): slug is ExampleSlug {
  return slug in exampleDetails;
}

export default function ExampleDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const detail = isExampleSlug(slug) ? exampleDetails[slug] : undefined;

  if (!detail) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Example not found</Text>
        <Text style={styles.emptyText}>This route does not match one of the available examples.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Example</Text>
        <Text style={styles.title}>{detail.title}</Text>
        <Text style={styles.summary}>{detail.summary}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Route steps</Text>
        {detail.steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 22,
    gap: 10,
  },
  kicker: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
  },
  summary: {
    color: "#dbeafe",
    fontSize: 16,
    lineHeight: 23,
  },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  panelTitle: {
    color: "#0f172a",
    fontSize: 20,
    fontWeight: "800",
  },
  step: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 46,
  },
  stepNumber: {
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  stepNumberText: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "900",
  },
  stepText: {
    color: "#334155",
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
});
