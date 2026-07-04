import { useRouter } from 'expo-router'
import type { User } from 'firebase/auth'
import { useMemo } from 'react'
import { Dimensions, useWindowDimensions, View } from 'react-native'

import {
  Badge,
  ThemedText,
  Button,
  Card,
  CardContent,
  CardHeader,
  SectionHeading
} from '@/components/ui'
import { RIcon } from '@/components/icons'
import { HyperCard } from '@/components/hyper'
import { ActionCard, ClubHeroVisual, EventRow, MemberPass } from '@/components/hyper/club'
import { clubActions, clubEvents, stars, type Star } from '@/lib/club'
import { cn } from '@/lib/cn'
import { Topbar } from './topbar'
import { Carousel } from './carousel'
import { Screen } from './screen'

type MemberDashboardProps = {
  errorMessage?: string | null
  onSignOut: () => void
  signingOut: boolean
  user: User
}

function getMemberName(user: User) {
  return user.displayName ?? user.email?.split('@')[0] ?? 'Member'
}

function renderStarCard(star: Star) {
  return (
    <HyperCard
      accentLine={star.category}
      badge={star.status}
      metricLabel={`Level ${star.level}`}
      metricValue={star.rate}
      summary={star.description}
      title={star.name}
    />
  )
}

export function MemberDashboard({ errorMessage, onSignOut, signingOut, user }: MemberDashboardProps) {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isWide = width >= 820
  const memberName = useMemo(() => getMemberName(user), [user])

  return (
    <Screen
      maxWidth={980}
      innerClassName='gap-2'
      stickyHeader={<Topbar photoUrl={user.photoURL} text={memberName} />}>
      <View className={cn('gap-4', isWide && 'flex-row items-stretch')}>
        <View className='flex-1 gap-4'>
          {/*<SectionHeading eyebrow='Amenities' title='Open now' titleClassName='text-[22px] leading-7' />*/}
          {isWide ? (
            <View className='flex-row flex-wrap gap-4'>
              {stars.map((star) => (
                <View key={star.name} className='flex-1 min-w-52'>
                  {renderStarCard(star)}
                </View>
              ))}
            </View>
          ) : (
            <Carousel
              gap={14}
              peek={0}
              data={stars}
              keyExtractor={(star) => star.name}
              maxItemWidth={Dimensions.get('window').width - 20}
              renderItem={({ item }) => renderStarCard(item)}
            />
          )}
        </View>

        <View className='px-1 gap-2'>
          <SectionHeading title='Join today!' titleClassName='text-lg' />
          <MemberPass memberName={'Get Full Access'} />
        </View>
        <Card className='hidden' style={isWide ? { flex: 1.2 } : undefined}>
          <CardContent className='gap-5 pt-5'>
            <ClubHeroVisual />
            <View className='gap-4'>
              <View className='flex-row flex-wrap items-center gap-2'>
                <Badge tone='ink'>Founders access</Badge>
                <Badge tone='neutral'>Reception notified</Badge>
              </View>
              <View className='gap-2'>
                <ThemedText className='text-lg leading-8 font-medium'>Tonight at the house</ThemedText>
              </View>
              <View className='flex-row flex-wrap gap-3'>
                <Button
                  size='sm'
                  tone='active'
                  leadingIcon={<RIcon color='#FFFFFF' name='grid' size={17} />}
                  onPress={() => router.push('/chat')}>
                  Open pass
                </Button>
                <Button
                  size='sm'
                  tone='secondary'
                  leadingIcon={<RIcon color='#8A8A91' name='grid' size={17} />}
                  onPress={() => router.push('/concierge')}>
                  Request help
                </Button>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      <View className='gap-4 hidden'>
        <SectionHeading
          eyebrow='Pro Member Access'
          title='Move through the club'
          titleClassName='text-[22px] leading-7'
        />
        <View className='flex-row flex-wrap gap-4'>
          {clubActions.map((action) => (
            <ActionCard key={action.label} {...action} />
          ))}
        </View>
      </View>

      <View className={cn('gap-4 hidden', isWide && 'flex-row items-start')}>
        <Card className='flex-1'>
          <CardHeader
            eyebrow='Calendar'
            title='Members calendar'
            description='Upcoming reservations and private house programming.'
          />
          <CardContent className='gap-3'>
            {clubEvents.slice(0, 2).map((event) => (
              <EventRow key={event.title} {...event} />
            ))}
          </CardContent>
        </Card>
        <View>
          <Button onPress={onSignOut}>Sign out</Button>
        </View>
      </View>
    </Screen>
  )
}
