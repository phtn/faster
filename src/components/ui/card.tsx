import { cn } from '@/lib/cn'
import type { PropsWithChildren, ReactNode } from 'react'
import { View, type ViewProps } from 'react-native'
import { Text } from './text'

type AppCardProps = PropsWithChildren<
  ViewProps & {
    className?: string
  }
>

type AppCardHeaderProps = PropsWithChildren<{
  className?: string
  description?: string
  descriptionClassName?: string
  eyebrow?: string
  eyebrowClassName?: string
  title?: string
  titleClassName?: string
  trailing?: ReactNode
}>

type AppCardSectionProps = PropsWithChildren<{
  className?: string
}>

export function Card({ children, className, style, ...props }: AppCardProps) {
  return (
    <View
      className={cn('overflow-hidden rounded-lg border border-secondary bg-secondary', className)}
      style={style}
      {...props}>
      {children}
    </View>
  )
}

export function CardHeader({
  children,
  className,
  description,
  descriptionClassName,
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  trailing
}: AppCardHeaderProps) {
  return (
    <View className={cn('px-4 pt-4 pb-4', className)}>
      <View className='flex-row items-start gap-4'>
        <View className='flex-1 gap-1'>
          {eyebrow ? (
            <Text type='eyebrow' className={eyebrowClassName}>
              {eyebrow}
            </Text>
          ) : null}

          {title ? <Text className={cn('text-[18px] leading-7 font-medium', titleClassName)}>{title}</Text> : null}

          {description ? (
            <Text themeColor='textSecondary' className={cn('leading-5.5', descriptionClassName)}>
              {description}
            </Text>
          ) : null}

          {children}
        </View>

        {trailing ? <View className='shrink-0 items-end'>{trailing}</View> : null}
      </View>
    </View>
  )
}

export function CardContent({ children, className }: AppCardSectionProps) {
  return <View className={cn('px-4 pb-4 gap-4', className)}>{children}</View>
}

export function CardDivider() {
  return <View className='mx-4 h-px bg-border' />
}

export function CardFooter({ children, className }: AppCardSectionProps) {
  return <View className={cn('px-4 pt-4 pb-4 gap-4', className)}>{children}</View>
}
