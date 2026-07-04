import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function ConciergeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Concierge</Text>
        <Text style={styles.title}>Requests now have a valid app route.</Text>
        <Text style={styles.body}>This placeholder keeps Expo Router typed links and native builds aligned.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
    paddingBottom: 40
  },
  header: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 20
  },
  kicker: {
    color: '#b45309',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 33
  },
  body: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22
  }
})
