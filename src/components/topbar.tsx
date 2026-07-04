import { Button, Sheet, UserMenu } from '@/components/ui'
import { Image } from 'expo-image'
import { View } from 'react-native'
import { RIcon } from './icons'

interface TopbarProps {
  photoUrl?: string | null
  text: string
}

export const Topbar = ({ photoUrl, text }: TopbarProps) => {
  return (
    <View className='relative h-18 flex-row items-center justify-between bg-background pb-0 pt-8 pr-2'>
      <View className='flex-row items-center justify-between w-24'>
        <Sheet>
          <Button tone='ghost' size='sm' className='w-12 min-h-6 px-4 self-center' onPress={undefined}>
            <RIcon name='container' size={28} strokeWidth={1} />
          </Button>
        </Sheet>
        <Image
          contentFit='contain'
          source={require('@/assets/images/logo-glow.png')}
          style={{ position: 'absolute', left: '54%', right: '0%', top: '30%', width: '64%', aspectRatio: 7 }}
        />
      </View>
      <UserMenu photoUrl={photoUrl} name={text} />
    </View>
  )
}
