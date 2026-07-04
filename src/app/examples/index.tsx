import { Text } from '@/components/ui'
import { Link } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

const examples = [
  {
    slug: 'focus-flow',
    title: 'Focus flow',
    label: 'Planning',
    description: 'A compact route for choosing one priority and clearing the next action.',
    status: 'Ready'
  },
  {
    slug: 'quick-check',
    title: 'Quick check',
    label: 'Review',
    description: 'A scan-friendly route for checking progress before moving on.',
    status: 'Live'
  },
  {
    slug: 'handoff',
    title: 'Handoff',
    label: 'Team',
    description: 'A route for packaging context, blockers, and ownership in one pass.',
    status: 'Draft'
  }
] as const

export default function ExamplesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Routes</Text>
        <Text style={styles.title}>Reusable paths for the app&apos;s core screens.</Text>
        <Text style={styles.description}>
          These examples give Faster a real navigation surface while the product model firms up.
        </Text>
      </View>

      <View style={styles.list}>
        {examples.map((example) => (
          <Link key={example.slug} href={`/examples/${example.slug}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.label}>{example.label}</Text>
                <Text style={styles.status}>{example.status}</Text>
              </View>
              <Text style={styles.cardTitle}>{example.title}</Text>
              <Text style={styles.cardDescription}>{example.description}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 18
  },
  header: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    gap: 8
  },
  kicker: {
    color: '#2563eb',
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
  description: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 136,
    padding: 18,
    gap: 8
  },
  cardTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  status: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 21,
    fontWeight: '800'
  },
  cardDescription: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22
  }
})
