import { MainListingCard } from '@/components/main/listing-card'
import { Text } from '@/components/ui'
import { getMainCategory, mainCategoryServices } from '@/lib/main'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function MainCategoryScreen() {
  const { category: categoryParam } = useLocalSearchParams<{ category?: string }>()
  const categorySlug = typeof categoryParam === 'string' ? categoryParam : undefined
  const category = getMainCategory(categorySlug)

  if (!category) {
    return <Redirect href='/main' />
  }

  const services = mainCategoryServices[category.slug]

  return (
    <View className='gap-4 px-2 pb-6'>
      <View className='px-2'>
        {/*<Text className='text-xl font-semibold leading-8 text-white'>{category.label}</Text>*/}
        <Text className='text-base leading-6 text-white/55'>{category.description}</Text>
      </View>

      <View className='gap-6'>
        {services.map((service, index) => (
          <MainListingCard compact={index > 0} key={service.id} listing={service} />
        ))}
      </View>
    </View>
  )
}
