import { MCIcon, RIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useAuthSession } from '@/ctx/auth'
import { mainCategories } from '@/lib/main'
import { Image } from 'expo-image'
import { Link, Redirect, Slot, useGlobalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { User } from 'firebase/auth'
import { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

interface MainLayoutProps {
  children?: ReactNode
  user?: User
}
export default function MainLayout({ user, children }: MainLayoutProps) {
  const insets = useSafeAreaInsets()
  const { ready, user: sessionUser } = useAuthSession()
  const { category } = useGlobalSearchParams<{ category?: string }>()
  const activeCategorySlug = typeof category === 'string' ? category : undefined
  const resolvedUser = user ?? sessionUser

  if (!resolvedUser) {
    if (!ready) {
      return null
    }

    return <Redirect href='/login' />
  }

  return (
    <View className='flex-1 items-center bg-black'>
      <View className='w-full max-w-108 flex-1 overflow-hidden'>
        <ScrollView
          bounces={false}
          className='flex-1'
          contentContainerStyle={{
            paddingTop: Math.max(insets.top + 2, 20),
            paddingBottom: insets.bottom + 128
          }}
          showsVerticalScrollIndicator={false}>
          <View className='px-2'>
            <View className='mb-3 flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <Image
                  contentFit='cover'
                  source={resolvedUser.photoURL}
                  style={styles.profileImage}
                  className='rounded-4xl'
                />
                <View>
                  <Text type='header' className='font-semibold text-lg text-white/85'>
                    {resolvedUser.displayName}
                  </Text>
                  <Text className='mt-0 text-base leading-6 text-[#777777]'>
                    @{resolvedUser.email?.split('@').shift()}
                  </Text>
                </View>
              </View>

              <Link href='/account' asChild>
                <Pressable className='size-16 active:scale-95 items-center justify-center rounded-3xl'>
                  <RIcon color='#fafafa' name='settings' size={24} strokeWidth={1} />
                </Pressable>
              </Link>
            </View>

            <View className='hidden mb-5 h-15 flex-row items-center justify-between rounded-[22px] bg-white px-6'>
              <Text className='text-[19px] leading-7 text-[#777777]'>Search</Text>
              <MCIcon color='#050505' name='magnify' size={24} />
            </View>
          </View>

          <ScrollView
            className='mb-0'
            contentContainerClassName='gap-4 px-2 pt-1 pb-4'
            horizontal
            showsHorizontalScrollIndicator={false}>
            {mainCategories.map((category) => (
              <Link
                asChild
                href={{ pathname: '/main/[category]', params: { category: category.slug } }}
                key={category.slug}>
                <Pressable
                  className={[
                    'h-10 w-26 items-center justify-center rounded-xl',
                    activeCategorySlug === category.slug ? 'bg-[#FFC928]' : 'bg-white'
                  ].join(' ')}>
                  <Text className='mt-0 font-medium text-black'>{category.label}</Text>
                </Pressable>
              </Link>
            ))}
          </ScrollView>

          {children ?? <Slot />}
        </ScrollView>

        <FloatingTabs bottomInset={insets.bottom} />
      </View>
    </View>
  )
}

function FloatingTabs({ bottomInset }: { bottomInset: number }) {
  const tabs: React.ComponentProps<typeof RIcon>['name'][] = ['home', 'chat', 'grid', 'chest']

  return (
    <View className='absolute left-0 right-0 items-center px-8' style={{ bottom: Math.max(bottomInset, 16) + 6 }}>
      <View className='h-18 w-full max-w-74 flex-row items-center justify-between rounded-[28px] bg-white/90 px-4'>
        {tabs.map((tab, index) => (
          <Pressable
            className={[
              'size-12 items-center justify-center rounded-2xl',
              index === 0 ? 'bg-black' : 'bg-transparent'
            ].join(' ')}
            key={tab}>
            <RIcon color={index === 0 ? '#FFFFFF' : '#6C6C6C'} name={tab} size={24} />
          </Pressable>
        ))}
      </View>
      <View className='mt-5 h-1 w-34 rounded-full bg-black' />
    </View>
  )
}
const styles = StyleSheet.create({
  carImage: {
    height: 168,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: '100%'
  },
  compactCarImage: {
    height: 160,
    marginTop: 14
  },
  driverImage: {
    borderColor: '#E5E5E5',
    borderRadius: 24,
    borderWidth: 1,
    height: 36,
    width: 36
  },
  profileImage: {
    borderRadius: 16,
    height: 50,
    width: 50
  }
})
