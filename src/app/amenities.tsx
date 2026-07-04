import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function AmenitiesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Amenities</Text>
        <Text style={styles.title}>Availability is ready for dashboard routing.</Text>
        <Text style={styles.body}>The full amenities surface can be filled in without changing the route contract.</Text>
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
    color: '#0f766e',
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
