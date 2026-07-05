import { VFlatSection } from '@/components/hyper/v-section'
import { MainListingCard } from '@/components/main/listing-card'
import { Text } from '@/components/ui'
import { getMainCategory, mainCategoryServices } from '@/lib/main'
import {
  brand,
  designName,
  deviceName,
  deviceType,
  deviceYearClass,
  manufacturer,
  modelId,
  modelName,
  osInternalBuildId,
  osName,
  platformApiLevel,
  productName,
  supportedCpuArchitectures,
  totalMemory
} from 'expo-device'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function MainCategoryScreen() {
  const { category: categoryParam } = useLocalSearchParams<{ category?: string }>()
  const categorySlug = typeof categoryParam === 'string' ? categoryParam : undefined
  const category = getMainCategory(categorySlug)

  const device_info = [
    { id: 'brand', label: 'brand', value: brand },
    { id: 'manufacturer', label: 'manufacturer', value: manufacturer },
    { id: 'modelName', label: 'modelName', value: modelName },
    { id: 'productName', label: 'productName', value: productName },
    { id: 'designName', label: 'designName', value: designName },
    { id: 'deviceType', label: 'deviceType', value: deviceType },
    { id: 'modelId', label: 'modelId', value: modelId },
    { id: 'deviceName', label: 'deviceName', value: deviceName },
    { id: 'totalMemory', label: 'totalMemory', value: totalMemory },
    { id: 'osName', label: 'osName', value: osName },
    { id: 'osInternalBuildId', label: 'osInternalBuildId', value: osInternalBuildId },
    { id: 'deviceYearClass', label: 'deviceYearClass', value: deviceYearClass },
    { id: 'platformApiLevel', label: 'platformApiLevel', value: platformApiLevel },
    { id: 'supportedCpuArchitectures', label: 'supportedCpuArchitectures', value: supportedCpuArchitectures }
  ]

  if (!category) {
    return <Redirect href='/main' />
  }

  const services = mainCategoryServices[category.slug]

  return (
    <View className='gap-4 px-2 pb-6'>
      <View className='px-2'>
        <Text className='text-base leading-6 text-white/55'>{category.description}</Text>
      </View>

      <View className='gap-6'>
        {services.map((service, index) => (
          <MainListingCard compact={index > 0} key={service.id} listing={service} />
        ))}
      </View>
      {categorySlug === 'mobile' && <VFlatSection title='Device Info' items={device_info} />}
    </View>
  )
}
