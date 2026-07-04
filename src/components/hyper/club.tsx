import { Image } from 'expo-image'
import { type Href, useRouter } from 'expo-router'
import type { PropsWithChildren, ReactNode } from 'react'
import { Pressable, View } from 'react-native'

import { IconName, RIcon } from '@/components/icons'
import { Badge, Button, Card, CardContent, CardHeader, Text } from '@/components/ui'
import { type ClubAccent } from '@/lib/club'
import { cn } from '@/lib/cn'

export type ClubIconName =
  | 'access'
  | 'amenity'
  | 'calendar'
  | 'check'
  | 'chevron'
  | 'concierge'
  | 'home'
  | 'key'
  | 'lounge'
  | 'spark'
  | 'ticket'
  | 'grid'

const accentStyles: Record<ClubAccent, { bg: string; border: string; text: string }> = {
  amber: {
    bg: 'bg-warning/15',
    border: 'border-warning/30',
    text: 'text-warning'
  },
  blue: {
    bg: 'bg-active/15',
    border: 'border-active/40',
    text: 'text-active'
  },
  green: {
    bg: 'bg-success/15',
    border: 'border-success/30',
    text: 'text-success'
  },
  rose: {
    bg: 'bg-danger/15',
    border: 'border-danger/30',
    text: 'text-danger'
  },
  slate: {
    bg: 'bg-default',
    border: 'border-border',
    text: 'text-muted'
  }
}

const accentColors: Record<ClubAccent, string> = {
  amber: '#f4bd50',
  blue: '#0091ff',
  green: '#38d48b',
  rose: '#f07178',
  slate: '#8A8A91'
}

export function getClubAccentClass(accent: ClubAccent, part: keyof (typeof accentStyles)[ClubAccent]) {
  return accentStyles[accent][part]
}

export function getClubAccentColor(accent: ClubAccent) {
  return accentColors[accent]
}

export function ClubHeroVisual({ className }: { className?: string }) {
  return (
    <View
      className={cn(
        'relative min-h-44 overflow-hidden rounded-lg border border-secondary-border bg-background',
        className
      )}>
      <Image
        className='absolute inset-0 h-full w-full opacity-80'
        contentFit='cover'
        source={require('@/assets/images/logo-glow.png')}
      />
      <View className='absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/95' />
      <Image
        contentFit='contain'
        source={require('@/assets/images/logo-glow.png')}
        style={{ position: 'absolute', left: '18%', right: '18%', top: '12%', width: '84%', aspectRatio: 1 }}
      />
    </View>
  )
}

export function MetricTile({
  accent,
  detail,
  label,
  value
}: {
  accent: ClubAccent
  detail: string
  label: string
  value: string
}) {
  return (
    <View
      className={cn('flex-1 min-w-36 rounded-lg border bg-secondary px-4 py-4', getClubAccentClass(accent, 'border'))}>
      <Text type='small' themeColor='textSecondary'>
        {label}
      </Text>
      <Text className={cn('mt-2 text-[26px] leading-8 font-medium', getClubAccentClass(accent, 'text'))}>{value}</Text>
      <Text type='small' themeColor='textSecondary' className='mt-1'>
        {detail}
      </Text>
    </View>
  )
}

export function ActionCard({
  accent,
  description,
  href,
  icon,
  label
}: {
  accent: ClubAccent
  description: string
  href: Href
  icon: IconName
  label: string
}) {
  const router = useRouter()

  return (
    <Pressable
      accessibilityRole='button'
      className='flex-1 min-w-54 active:opacity-80'
      onPress={() => router.push(href)}>
      <Card className={cn('bg-secondary', getClubAccentClass(accent, 'border'), 'border-secondary')}>
        <CardContent className='gap-4 pt-5'>
          <View
            className={cn(
              'h-11 w-11 items-center justify-center rounded-lg'
              // getClubAccentClass(accent, 'bg')
              // getClubAccentClass(accent, 'border')
            )}>
            <RIcon color={getClubAccentColor(accent)} name={icon} />
          </View>
          <View className='gap-1'>
            <View className='flex-row items-center gap-2'>
              <Text className='flex-1 text-[17px] leading-6 font-medium'>{label}</Text>
              <RIcon color='#8A8A91' name='home' size={18} />
            </View>
            <Text themeColor='textSecondary' className='leading-5'>
              {description}
            </Text>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  )
}

export function AmenityCard({
  description,
  floor,
  hours,
  name,
  status,
  tone
}: {
  description: string
  floor: string
  hours: string
  name: string
  status: string
  tone: ClubAccent
}) {
  return (
    <Card className={cn('flex-1 min-w-64 bg-secondary', getClubAccentClass(tone, 'border'), 'border-secondary')}>
      <CardHeader eyebrow={floor} title={name} trailing={<Badge tone='neutral'>{status}</Badge>} />
      <CardContent className='gap-4'>
        <Text themeColor='textSecondary' className='leading-5'>
          {description}
        </Text>
        <View className='flex-row items-center justify-between rounded-lg border border-border bg-background px-4 py-3'>
          <Text type='small' themeColor='textSecondary'>
            Hours
          </Text>
          <Text type='smallBold'>{hours}</Text>
        </View>
      </CardContent>
    </Card>
  )
}

export function EventRow({
  accent,
  date,
  host,
  location,
  title
}: {
  accent: ClubAccent
  date: string
  host: string
  location: string
  title: string
}) {
  return (
    <View className='flex-row gap-4 rounded-lg border border-border bg-background px-4 py-4'>
      <View
        className={cn(
          'h-11 w-11 items-center justify-center rounded-lg border',
          getClubAccentClass(accent, 'bg'),
          getClubAccentClass(accent, 'border')
        )}>
        <RIcon color={getClubAccentColor(accent)} name='grid' />
      </View>
      <View className='flex-1 gap-1'>
        <Text className='font-medium'>{title}</Text>
        <Text type='small' themeColor='textSecondary'>
          {date} - {location}
        </Text>
        <Text type='small' themeColor='textSecondary'>
          {host}
        </Text>
      </View>
    </View>
  )
}

export function MemberPass({ memberName, status = 'Access clear' }: { memberName: string; status?: string }) {
  return (
    <View className='overflow-hidden rounded-lg bg-foreground'>
      <View className='relative min-h-fit p-3'>
        <View className='absolute -right-24 -top-16 h-44 w-44 rounded-full bg-pink-400/5' />
        <View className='absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-indigo-400/20' />
        <View className='relative gap-7'>
          <View className='flex-row items-start justify-between gap-4'>
            <View className='gap-0'>
              <Text
                style={{ letterSpacing: 1.5 }}
                className='text-[10px] leading-4 font-normal uppercase text-background/80 tracking-wider px-1'>
                Founder Series
              </Text>
              <Text className='font-semibold text-background text-xl'>{memberName}</Text>
            </View>
            <View className='h-10 w-10 items-center justify-center'>
              <RIcon color='#5856D6' name='grid' />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const qrPattern = [
  [1, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1]
]

export function AccessPattern() {
  return (
    <View className='self-center rounded-lg border border-border bg-background p-3'>
      <View className='gap-1'>
        {qrPattern.map((row, rowIndex) => (
          <View className='flex-row gap-1' key={`row-${rowIndex}`}>
            {row.map((filled, columnIndex) => (
              <View
                className={cn('h-3 w-3 rounded-xs', filled ? 'bg-foreground' : 'bg-default')}
                key={`cell-${rowIndex}-${columnIndex}`}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

export function StepRow({ children, complete = true }: PropsWithChildren<{ complete?: boolean }>) {
  return (
    <View className='flex-row items-center gap-3'>
      <View
        className={cn(
          'h-6 w-6 items-center justify-center rounded-full',
          complete ? 'bg-success-soft-hover' : 'bg-default'
        )}>
        <RIcon color={complete ? '#38d48b' : '#8A8A91'} name='home' size={15} strokeWidth={2} />
      </View>
      <Text className='flex-1'>{children}</Text>
    </View>
  )
}

export function DetailCard({
  children,
  icon,
  title,
  trailing
}: PropsWithChildren<{
  icon: ClubIconName
  title: string
  trailing?: ReactNode
}>) {
  return (
    <Card>
      <CardHeader
        title={title}
        trailing={
          trailing ?? (
            <View className='h-10 w-10 items-center justify-center rounded-lg bg-default'>
              <RIcon color='#8A8A91' name={'home'} />
            </View>
          )
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function QuickReserveButton({ children }: PropsWithChildren) {
  return (
    <Button fullWidth tone='secondary'>
      {children}
    </Button>
  )
}
