import { Text as T, type TextProps } from 'react-native'

import { type ThemeColor } from '@/constants/theme'
import { useAppTheme } from '@/ctx/theme-context'
import { cn } from '@/lib/cn'

export type ThemedTextProps = TextProps & {
  className?: string
  type?:
    'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code' | 'eyebrow' | 'header'
  themeColor?: ThemeColor
}

const typeClassNames: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-[16px] leading-6 font-normal tracking-[0px]',
  title: 'text-[40px] leading-[48px] font-normal tracking-[0px]',
  small: 'text-[14px] leading-5 font-normal tracking-[0px]',
  smallBold: 'text-[14px] leading-5 font-semibold tracking-[0px]',
  subtitle: 'text-[20px] leading-[32px] font-normal tracking-[0px]',
  header: 'text-[20px] leading-[32px] font-semibold',
  link: 'text-[14px] leading-5 font-medium tracking-[0px]',
  linkPrimary: 'text-[14px] leading-5 font-semibold tracking-[0px]',
  code: 'text-[12px] leading-[18px] font-normal tracking-[0px]',
  eyebrow: 'text-[11px] leading-4 uppercase tracking-widest text-accent'
}

const themeClassNames: Partial<Record<ThemeColor, string>> = {
  text: 'text-foreground',
  textSecondary: 'text-muted',
  accent: 'text-accent',
  accentSoft: 'text-accent',
  background: 'text-background',
  backgroundElement: 'text-surface',
  backgroundSelected: 'text-default',
  border: 'text-border'
}

export function Text({ className, style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const { fontFamilies } = useAppTheme()
  const resolvedThemeColor =
    themeColor ?? (type === 'linkPrimary' ? 'accent' : type === 'eyebrow' ? 'textSecondary' : 'text')
  const prefersMediumFamily =
    type === 'smallBold' ||
    type === 'link' ||
    type === 'linkPrimary' ||
    type === 'eyebrow' ||
    className?.includes('font-medium') ||
    className?.includes('font-semibold') ||
    className?.includes('font-bold')
  const fontFamily = prefersMediumFamily ? (fontFamilies.displayMedium ?? fontFamilies.display) : fontFamilies.display

  return (
    <T
      style={[fontFamily ? { fontFamily } : undefined, style]}
      className={cn(themeClassNames[resolvedThemeColor] ?? 'text-foreground', typeClassNames[type], className)}
      {...rest}
    />
  )
}
