import type { ComponentProps, ReactNode } from 'react'
import { View } from 'react-native'

import { Badge, Button, Card, CardContent, SocialIcon, Text, type SocialNetwork } from '@/components/ui'
import { cn } from '@/lib/cn'

type HyperCardProps = {
  accentLine?: string
  avatar?: ReactNode
  badge?: string
  className?: string
  ctaLabel?: string
  handle?: string
  initials?: string
  metricLabel: string
  metricValue: string
  network?: SocialNetwork
  onPress?: ComponentProps<typeof Button>['onPress']
  summary?: string
  title: string
}

export function HyperCard({
  accentLine = 'Advance Your Expertise',
  avatar,
  badge,
  className,
  ctaLabel = 'Join us',
  handle,
  initials,
  metricLabel,
  metricValue,
  network = 'telegram',
  onPress,
  summary,
  title
}: HyperCardProps) {
  return (
    <Card className={className}>
      <CardContent className='p-4'>
        <View className='gap-5'>
          <View className='flex-1 gap-1'>
            <View className='flex-row items-center justify-between'>
              <Text type='eyebrow'>{accentLine}</Text>
              <Text type='linkPrimary'>&rarr;</Text>
            </View>
            <View className='h-18 justify-center'>
              <Text className='text-[20px] text-balance leading-6 font-normal w-full'>{title}</Text>
            </View>
            {badge ? <Badge tone='neutral'>{badge}</Badge> : null}
          </View>

          <View className={cn(' gap-4 pb-0.5')}>
            <Button
              fullWidth
              leadingIcon={<SocialIcon color='#0091ff' network={network} size={14} />}
              onPress={onPress}
              size='md'>
              {ctaLabel}
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

interface StatusCardProps {
  detail: string
  owner: string
  status: string
  title: string
}
export const StatusCard = ({ detail, status, title }: StatusCardProps) => {
  return (
    <View className='rounded-lg bg-background px-4 py-4'>
      <View className='flex-row items-start justify-between gap-3'>
        <View className='flex-1 gap-1'>
          <Text className='font-medium'>{title}</Text>
          <Text type='small' themeColor='textSecondary'>
            {detail}
          </Text>
        </View>
        <Badge tone='neutral'>{status}</Badge>
      </View>
    </View>
  )
}
