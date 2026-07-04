import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

const preferences = [
  { label: "Daily check-in", enabled: true },
  { label: "Priority reminders", enabled: true },
  { label: "Share diagnostics", enabled: false },
] as const;

const settingsGroups = [
  {
    title: "Workspace",
    rows: ["Default route: Focus flow", "Week starts: Monday", "Theme: System"],
  },
  {
    title: "Data",
    rows: ["Sync: Enabled", "Offline cache: 7 days", "Export format: CSV"],
  },
] as const;

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Settings</Text>
        <Text style={styles.title}>Control how Faster behaves.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Preferences</Text>
        {preferences.map((preference) => (
          <View key={preference.label} style={styles.toggleRow}>
            <Text style={styles.rowText}>{preference.label}</Text>
            <Switch value={preference.enabled} />
          </View>
        ))}
      </View>

      {settingsGroups.map((group) => (
        <View key={group.title} style={styles.panel}>
          <Text style={styles.panelTitle}>{group.title}</Text>
          {group.rows.map((row) => (
            <View key={row} style={styles.infoRow}>
              <Text style={styles.rowText}>{row}</Text>
            </View>
          ))}
        </View>
      ))}
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
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    gap: 8,
  },
  kicker: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 33,
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
  toggleRow: {
    alignItems: "center",
    borderTopColor: "#f1f5f9",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 54,
  },
  infoRow: {
    borderTopColor: "#f1f5f9",
    borderTopWidth: 1,
    justifyContent: "center",
    minHeight: 46,
  },
  rowText: {
    color: "#334155",
    flex: 1,
    fontSize: 16,
  },
});
