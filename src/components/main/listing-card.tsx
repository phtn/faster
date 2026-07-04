import { Image, type ImageSource } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'

import { MCIcon } from '@/components/icons'
import { Text } from '@/components/ui'

export type MainListing = {
  car: string
  carImage: ImageSource | number
  driver: string
  driverImage: ImageSource | number
  rating: string
  rate: string
  time: string
}

type MainListingCardProps = {
  compact?: boolean
  listing: MainListing
}

export function MainListingCard({ compact = false, listing }: MainListingCardProps) {
  return (
    <View className='overflow-hidden rounded-4xl bg-white'>
      <View className='flex-row items-start justify-between'>
        <View className='flex-row items-center gap-3 p-4'>
          <Image contentFit='cover' source={listing.driverImage} style={styles.driverImage} />
          <View>
            <Text className='font-semibold text-black'>{listing.driver}</Text>
            <Text type='small' className='text-[#777777] leading-4'>
              {listing.rating}
            </Text>
          </View>
        </View>
        <View className='p-4'>
          <Text className='text-2xl leading-8 text-default-hover'>{listing.rate}</Text>
        </View>
      </View>
      <View className='py-8'>
        <Image
          contentFit='contain'
          source={listing.carImage}
          style={[styles.carImage, compact ? styles.compactCarImage : undefined]}
        />
      </View>

      <View className='flex-row items-center justify-between gap-4 _rounded-tl-3xl bg-[#F0F0F0] p-4 border-t border-default-soft'>
        <View className='min-w-0 flex-1'>
          <Text className='text-lg font-semibold leading-6 text-black'>{listing.car}</Text>
          <View className='mt-2 flex-row items-center gap-1'>
            <MCIcon color='#6F6F6F' name='clock-time-four-outline' size={18} />
            <Text className='text-base text-[#6F6F6F]'>{listing.time}</Text>
          </View>
        </View>
        <Pressable className='h-12 shrink-0 items-center justify-center rounded-xl bg-[#FFC928] px-5'>
          <Text className='text-lg font-semibold text-black'>Get Insurance</Text>
        </Pressable>
      </View>
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
  }
})
