import { MCIcon, RIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { Image } from 'expo-image'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import driverJaneImage from '../../assets/images/main/driver-jane.webp'
import driverJeromeImage from '../../assets/images/main/driver-jerome.webp'
import porscheImage from '../../assets/images/main/porsche-taycan.webp'
import profileImage from '../../assets/images/main/profile.webp'

type Category = {
  icon: React.ComponentProps<typeof MCIcon>['name']
  label: string
}

type Listing = {
  car: string
  carImage: number
  driver: string
  driverImage: number
  rating: string
  rate: string
  time: string
}

const categories: Category[] = [
  { icon: 'cell-phone', label: 'Mobile' },
  { icon: 'motorbike', label: 'Auto' },
  { icon: 'car-side', label: 'Travel' },
  { icon: 'map-marker-distance', label: 'PA' }
]

const listings: Listing[] = [
  {
    car: 'Porsche Taycan',
    carImage: porscheImage,
    driver: 'Jerome Bell',
    driverImage: driverJeromeImage,
    rating: '95% Smooth Ride',
    rate: '$25/h',
    time: '25mins'
  },
  {
    car: 'Tesla Model 3',
    carImage: porscheImage,
    driver: 'Jane Cooper',
    driverImage: driverJaneImage,
    rating: '87% Smooth Ride',
    rate: '$23/h',
    time: '18mins'
  }
]

const surfaceShadow = {
  boxShadow: '0 16px 24px rgba(201, 198, 190, 0.18)',
  elevation: 5
}

export default function MainScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View className='flex-1 items-center'>
      <View className='w-full max-w-108 flex-1 overflow-hidden'>
        <ScrollView
          bounces={false}
          className='flex-1'
          contentContainerStyle={{
            paddingTop: Math.max(insets.top + 2, 20),
            paddingBottom: insets.bottom + 128
          }}
          showsVerticalScrollIndicator={false}>
          <View className='px-4'>
            <View className='mb-4 flex-row items-center justify-between'>
              <View className='flex-row items-center gap-4'>
                <Image contentFit='cover' source={profileImage} style={styles.profileImage} />
                <View>
                  <Text type='header' className='font-semibold'>
                    Welcome!
                  </Text>
                  <Text className='mt-0 text-base leading-6 text-[#777777]'>Select Your Car</Text>
                </View>
              </View>

              <Pressable className='size-16 items-center justify-center rounded-3xl'>
                <RIcon color='#fafafa' name='bell' size={24} strokeWidth={2} />
              </Pressable>
            </View>

            <View
              className='hidden mb-5 h-15 flex-row items-center justify-between rounded-[22px] bg-white px-6'
              style={surfaceShadow}>
              <Text className='text-[19px] leading-7 text-[#777777]'>Search</Text>
              <MCIcon color='#050505' name='magnify' size={24} />
            </View>
          </View>

          <ScrollView
            className='mb-0'
            contentContainerClassName='gap-4 px-4 pt-1 pb-6'
            horizontal
            showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Pressable className='h-10 w-26 items-center justify-center rounded-xl bg-white' key={category.label}>
                {/*<MCIcon color='#050505' name={category.icon} size={24} />*/}
                <Text className='mt-0 font-medium text-black'>{category.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View className='gap-6 px-4'>
            {listings.map((listing, index) => (
              <ListingCard compact={index === 1} key={listing.driver} listing={listing} />
            ))}
          </View>
        </ScrollView>

        <FloatingTabs bottomInset={insets.bottom} />
      </View>
    </View>
  )
}

function ListingCard({ compact = false, listing }: { compact?: boolean; listing: Listing }) {
  return (
    <View className='overflow-hidden rounded-3xl bg-white'>
      <View className='flex-row items-start justify-between'>
        <View className='flex-row items-center gap-3 p-2'>
          <Image contentFit='cover' source={listing.driverImage} style={styles.driverImage} />
          <View>
            <Text className='font-semibold text-black'>{listing.driver}</Text>
            <Text type='small' className='text-[#777777] leading-4'>
              {listing.rating}
            </Text>
          </View>
        </View>
        <View className='rounded-l-full bg-[#F2F2F2] px-5 py-2'>
          <Text className='text-[25px] font-semibold leading-8 text-black'>{listing.rate}</Text>
        </View>
      </View>

      <Image
        contentFit='contain'
        source={listing.carImage}
        style={[styles.carImage, compact ? styles.compactCarImage : undefined]}
      />

      <View className='flex-row items-center justify-between gap-3 rounded-tl-3xl bg-[#F3F3F3] p-4'>
        <View className='min-w-0 flex-1'>
          <Text className='text-lg font-semibold leading-6 text-black'>{listing.car}</Text>
          <View className='mt-2 flex-row items-center gap-2'>
            <MCIcon color='#6F6F6F' name='clock-time-four-outline' size={19} />
            <Text className='text-base text-[#6F6F6F]'>{listing.time}</Text>
          </View>
        </View>
        <Pressable className='h-12 shrink-0 items-center justify-center rounded-xl bg-[#FFC928] px-5'>
          <Text className='text-lg font-semibold text-black'>Book Now</Text>
        </Pressable>
      </View>
    </View>
  )
}

function FloatingTabs({ bottomInset }: { bottomInset: number }) {
  const tabs: React.ComponentProps<typeof MCIcon>['name'][] = [
    'home-outline',
    'calendar-month-outline',
    'message-text-outline',
    'account-outline'
  ]

  return (
    <View className='absolute left-0 right-0 items-center px-8' style={{ bottom: Math.max(bottomInset, 16) + 6 }}>
      <View className='h-20 w-full max-w-74 flex-row items-center justify-between rounded-[28px] bg-white/90 px-4'>
        {tabs.map((tab, index) => (
          <Pressable
            className={[
              'size-12 items-center justify-center rounded-2xl',
              index === 0 ? 'bg-black' : 'bg-transparent'
            ].join(' ')}
            key={tab}>
            <MCIcon color={index === 0 ? '#FFFFFF' : '#6C6C6C'} name={tab} size={24} />
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
    borderRadius: 22,
    height: 62,
    width: 62
  }
})
