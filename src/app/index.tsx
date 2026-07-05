import { Text } from '@/components/ui'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native'

export default function Index() {
  return (
    <ScrollView
      contentContainerClassName='gap-4 flex flex-row items-center justify-center h-screen bg-black'
      className=''>
      <Link href='/login' asChild>
        <Text className='text-white'>Enter</Text>
      </Link>
    </ScrollView>
  )
}
