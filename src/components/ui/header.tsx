import type { ReactNode } from 'react'
import { View } from 'react-native'

import { cn } from '@/lib/cn'
import { Text } from './text'

type SectionHeadingProps = {
  align?: 'left' | 'center'
  className?: string
  description?: string
  descriptionClassName?: string
  eyebrow?: string
  title: string
  titleClassName?: string
  trailing?: ReactNode
}

export function SectionHeading({
  align = 'left',
  className,
  description,
  descriptionClassName,
  eyebrow,
  title,
  titleClassName,
  trailing
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <View className={cn('gap-1', centered && 'items-center', className)}>
      {eyebrow ? (
        <Text type='eyebrow' className={cn(centered && 'text-center')}>
          {eyebrow}
        </Text>
      ) : null}

      <Text type='header' className={cn(centered && 'text-center', titleClassName)}>
        {title}
      </Text>

      {description ? (
        <Text
          type='small'
          themeColor='textSecondary'
          className={cn('max-w-160', centered && 'text-center', descriptionClassName)}>
          {description}
        </Text>
      ) : null}

      {trailing ? <View className={cn(centered && 'items-center', 'mt-2')}>{trailing}</View> : null}
    </View>
  )
}
