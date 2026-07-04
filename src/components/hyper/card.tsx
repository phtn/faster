import type { ComponentProps, ReactNode } from 'react'
import { View } from 'react-native'

import { Badge, Button, Card, CardContent, SocialIcon, ThemedText, type SocialNetwork } from '@/components/ui'
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
              <ThemedText type='eyebrow'>{accentLine}</ThemedText>
              <ThemedText type='linkPrimary'>&rarr;</ThemedText>
            </View>
            <View className='h-18 justify-center'>
              <ThemedText className='text-[20px] text-balance leading-6 font-normal w-full'>{title}</ThemedText>
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
