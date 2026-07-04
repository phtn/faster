import { ScrollView, StyleSheet, Text, View } from "react-native";

const accountRows = [
  ["Plan", "Preview"],
  ["Role", "Owner"],
  ["Devices", "2 active"],
  ["Project", "@phtn458/faster"],
] as const;

export default function AccountScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>FP</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>Faster Preview</Text>
          <Text style={styles.email}>phtn458 account</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Account details</Text>
        {accountRows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Security</Text>
        <View style={styles.securityScore}>
          <Text style={styles.score}>Good</Text>
          <Text style={styles.scoreText}>Email verified, project linked, and remote credentials enabled.</Text>
        </View>
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
  profile: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
    padding: 20,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#38bdf8",
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  avatarText: {
    color: "#082f49",
    fontSize: 20,
    fontWeight: "900",
  },
  profileText: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  email: {
    color: "#dbeafe",
    fontSize: 15,
  },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  panelTitle: {
    color: "#0f172a",
    fontSize: 19,
    fontWeight: "800",
  },
  row: {
    alignItems: "center",
    borderTopColor: "#f1f5f9",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 48,
  },
  label: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "700",
  },
  value: {
    color: "#0f172a",
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
  },
  securityScore: {
    backgroundColor: "#ecfeff",
    borderRadius: 8,
    padding: 14,
    gap: 4,
  },
  score: {
    color: "#0e7490",
    fontSize: 18,
    fontWeight: "900",
  },
  scoreText: {
    color: "#155e75",
    fontSize: 15,
    lineHeight: 21,
  },
});
