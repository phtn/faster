import { useState } from 'react'
import { useWindowDimensions } from 'react-native'

export const useWindow = () => {
  const { width, height } = useWindowDimensions()
  const [isWide] = useState(width >= 860)
  const isPortrait = height > width
  const isLandscape = width > height
  return { width, height, isPortrait, isLandscape, isWide }
}
