import { PressableFeedback, type PressableFeedbackProps } from 'heroui-native'
import type { PropsWithChildren, ReactNode } from 'react'
import { View } from 'react-native'

import { cn } from '@/lib/cn'
import { Text } from './text'

type Tone = 'primary' | 'secondary' | 'tertiary' | 'quarternary' | 'ghost' | 'active'
type AppButtonSize = 'sm' | 'md' | 'lg'

type AppButtonProps = PropsWithChildren<
  Omit<PressableFeedbackProps, 'children'> & {
    className?: string
    fullWidth?: boolean
    labelClassName?: string
    leadingIcon?: ReactNode
    size?: AppButtonSize
    tone?: Tone
    trailingIcon?: ReactNode
  }
>

export function Button({
  accessibilityRole = 'button',
  children,
  className,
  fullWidth = false,
  isDisabled = false,
  labelClassName,
  leadingIcon,
  size = 'md',
  tone = 'primary',
  trailingIcon,
  ...props
}: AppButtonProps) {
  return (
    <PressableFeedback
      accessibilityRole={accessibilityRole}
      animation={{ scale: { value: 0.96 } }}
      className={cn(
        'self-start flex-row items-center justify-center gap-3',
        size === 'sm' && 'min-h-9 px-5 rounded-sm',
        size === 'md' && 'min-h-11 px-8 rounded-lg',
        size === 'lg' && 'min-h-14 px-12 rounded-[11px]',
        tone === 'primary' && 'border-foreground bg-foreground',
        tone === 'secondary' && 'border-secondary bg-secondary',
        tone === 'tertiary' && 'border-foreground/10 bg-foreground/20',
        tone === 'quarternary' && 'border-foreground/2 bg-foreground/5',
        tone === 'ghost' && 'border-transparent bg-transparent',
        tone === 'active' && 'bg-active border-active text-white',
        fullWidth && 'self-stretch',
        isDisabled && 'opacity-50',
        className
      )}
      isDisabled={isDisabled}
      {...props}>
      {leadingIcon ? <View className='items-center justify-center -ml-1.5'>{leadingIcon}</View> : null}

      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          className={cn(
            'font-semibold tracking-normal',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-[15px] leading-5',
            size === 'lg' && 'text-[16px] leading-5.5',
            tone === 'primary' && 'text-background',
            tone === 'active' && 'text-white',
            // 'tracking-normal',
            labelClassName
          )}>
          {children}
        </Text>
      ) : (
        children
      )}

      {trailingIcon ? <View className='items-center justify-center -mr-1.5'>{trailingIcon}</View> : null}
    </PressableFeedback>
  )
}
