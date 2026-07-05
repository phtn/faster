import { ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import { Card, CardContent, CardHeader, Text } from '../ui'

export type VSectionItem = {
  content?: ReactNode
  id: string | number
  label: string
  onPress?: () => void
  trailing?: ReactNode
  value?: string | number | boolean
}
interface VSectionProps {
  items: VSectionItem[]
  title: string
}
export const VSection = ({ title, items }: VSectionProps) => {
  return (
    <Card className='bg-transparent border-0 py-4'>
      <CardHeader className='px-0'>
        <Text type='eyebrow' className='text-foreground/55'>
          {title}
        </Text>
      </CardHeader>
      <CardContent className='gap-0 p-0 rounded-xl border border-default-hover divide-y divide-default-hover'>
        {items.map((item) => (
          <Pressable
            accessibilityRole={item.onPress ? 'button' : undefined}
            disabled={!item.onPress}
            key={item.id}
            onPress={item.onPress}
            className='min-h-12 flex-row items-center justify-between gap-3 p-3'>
            <View className='min-w-0 flex-1 gap-1'>
              <Text>{item.label}</Text>
              {item.content}
            </View>
            {item.trailing ? <View className='shrink-0'>{item.trailing}</View> : null}
          </Pressable>
        ))}
      </CardContent>
    </Card>
  )
}
// border-b border-accent last:border-b-0
export const VFlatSection = ({ title, items }: VSectionProps) => {
  return (
    <Card className='bg-transparent border-0 py-4'>
      <CardHeader className='px-0'>
        <Text type='eyebrow' className='text-foreground/55'>
          {title}
        </Text>
      </CardHeader>
      <CardContent className='gap-0 p-0 rounded-xl border border-default-hover divide-y divide-default-hover'>
        {items.map((item) => (
          <View key={item.id} className='min-h-12 flex-row items-center justify-between gap-3 p-3'>
            <View className='min-w-0 flex-1 gap-1'>
              <Text>{item.label}</Text>
            </View>
            <Text>{item.value}</Text>
          </View>
        ))}
      </CardContent>
    </Card>
  )
}
