import { VSection } from '@/components/hyper'
import { VSectionItem } from '@/components/hyper/v-section'
import { RIcon } from '@/components/icons'
import { Button, Heading } from '@/components/ui'
import { useAuthSession } from '@/ctx/auth'
import { useAppTheme } from '@/ctx/theme-context'
import { useRouter } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-native'

export default function AccountScreen() {
  const router = useRouter()
  const { signOut } = useAuthSession()
  const { resolvedTheme, setTheme } = useAppTheme()

  const handleBackPress = useCallback(() => {
    router.back()
  }, [router])

  const handleThemeToggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()
      router.replace('/login')
    } catch (error) {
      console.warn('[account] Unable to sign out.', error)
    }
  }, [signOut, router])

  const firstSectionItems = useMemo<VSectionItem[]>(
    () => [
      {
        id: 'dark-mode',
        label: 'Dark mode',
        onPress: handleThemeToggle,
        trailing: <RIcon name={'theme'} fill='#bbb' strokeWidth={2} />
      },
      { id: 'sign-out', label: 'Sign out', onPress: handleSignOut }
    ],
    [handleSignOut, handleThemeToggle]
  )

  return (
    <ScrollView contentContainerClassName='py-10 px-2'>
      <Button tone='ghost' className='px-0' onPress={handleBackPress}>
        <RIcon name='arrow-left' strokeWidth={2} />
      </Button>
      <Heading title='Settings' description='Edit app settings and preferences.' titleClassName='font-semibold' />
      <VSection title='Preferences' items={firstSectionItems} />
    </ScrollView>
  )
}
