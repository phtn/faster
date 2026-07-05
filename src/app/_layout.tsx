import { Stack, ThemeProvider } from 'expo-router'
import { HeroUINativeProvider } from 'heroui-native'

import { AuthProvider } from '@/ctx/auth'
import { AppThemeProvider, useAppTheme } from '@/ctx/theme-context'

function RootStack() {
  const { navigationTheme } = useAppTheme()

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          // header: (props) => null,
          headerShown: false
          // headerShadowVisible: false
          // headerTintColor: '#0f172a',
        }}>
        <Stack.Screen name='index' options={{ title: 'Index' }} />
        <Stack.Screen name='main' options={{ title: 'Main' }} />
        <Stack.Screen name='examples/index' options={{ title: 'Examples' }} />
        <Stack.Screen name='examples/[slug]' options={{ title: 'Example' }} />
        <Stack.Screen name='settings' options={{ title: 'Settings' }} />
        <Stack.Screen name='account' options={{ title: 'Account' }} />
        <Stack.Screen name='chat' options={{ title: 'Member Pass' }} />
        <Stack.Screen name='amenities' options={{ title: 'Amenities' }} />
        <Stack.Screen name='concierge' options={{ title: 'Concierge' }} />
      </Stack>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <HeroUINativeProvider>
          <RootStack />
        </HeroUINativeProvider>
      </AuthProvider>
    </AppThemeProvider>
  )
}
