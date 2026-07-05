import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'
import { Image } from 'expo-image'
import * as WebBrowser from 'expo-web-browser'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { AuthScreen } from '@/components/auth'
import { Button, Card, CardContent, CardHeader, Text } from '@/components/ui'
import { useAuthSession } from '@/ctx/auth'
import { auth } from '@/lib/firebase/client'
import { googleAuthConfig } from '@/lib/firebase/config'
import MainIndex from './main'
import MainLayout from './main/_layout'

WebBrowser.maybeCompleteAuthSession()

type NativeGoogleSignInModule = typeof import('@react-native-google-signin/google-signin')

export default function HomeScreen() {
  const { ready, user } = useAuthSession()
  const [busy, setBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isExpoGoNative = Platform.OS !== 'web' && Constants.executionEnvironment === 'storeClient'
  const shouldLoadNativeGoogleSignIn = Platform.OS !== 'web' && !isExpoGoNative
  const [nativeGoogleSignInModule, setNativeGoogleSignInModule] = useState<NativeGoogleSignInModule | null>(null)
  const [nativeGoogleSignInChecked, setNativeGoogleSignInChecked] = useState(!shouldLoadNativeGoogleSignIn)
  const needsNativeRebuild = shouldLoadNativeGoogleSignIn && nativeGoogleSignInChecked && !nativeGoogleSignInModule
  const usesNativeGoogleSignIn = shouldLoadNativeGoogleSignIn && Boolean(nativeGoogleSignInModule)
  const hasNativeWebClientId = Boolean(googleAuthConfig.webClientId)

  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: googleAuthConfig.androidClientId,
    iosClientId: googleAuthConfig.iosClientId,
    selectAccount: true,
    webClientId: googleAuthConfig.webClientId
  })

  const exchangeGoogleToken = useCallback(async (idToken?: string | null) => {
    if (!idToken) {
      throw new Error('Google did not return an ID token.')
    }

    const credential = GoogleAuthProvider.credential(idToken)
    await signInWithCredential(auth, credential)
    setErrorMessage(null)
  }, [])

  useEffect(() => {
    if (!shouldLoadNativeGoogleSignIn) {
      return
    }

    let mounted = true

    void import('@react-native-google-signin/google-signin')
      .then((module) => {
        if (mounted) {
          setNativeGoogleSignInModule(module)
        }
      })
      .catch(() => {
        if (mounted) {
          setNativeGoogleSignInModule(null)
        }
      })
      .finally(() => {
        if (mounted) {
          setNativeGoogleSignInChecked(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [shouldLoadNativeGoogleSignIn])

  useEffect(() => {
    if (!usesNativeGoogleSignIn) {
      return
    }

    nativeGoogleSignInModule?.GoogleSignin.configure({
      iosClientId: googleAuthConfig.iosClientId || undefined,
      webClientId: googleAuthConfig.webClientId || undefined
    })
  }, [nativeGoogleSignInModule, usesNativeGoogleSignIn])

  const googleStatusMessage = useMemo(() => {
    if (isExpoGoNative) {
      return 'Google sign-in requires a development build on Android and iOS.'
    }

    if (needsNativeRebuild) {
      return 'This build does not include native Google Sign-In yet. Rebuild and reinstall Android.'
    }

    if (Platform.OS !== 'web' && !nativeGoogleSignInChecked) {
      return 'Preparing Google sign-in.'
    }

    if (usesNativeGoogleSignIn && !hasNativeWebClientId) {
      return 'Missing a Google web client ID. Firebase needs it to return an ID token.'
    }

    if (!ready) {
      return 'Restoring your session...'
    }

    if (busy) {
      return 'Waiting for Google to finish the sign-in flow.'
    }

    if (usesNativeGoogleSignIn || request) {
      return ''
    }

    return 'Preparing Google sign-in.'
  }, [
    busy,
    hasNativeWebClientId,
    isExpoGoNative,
    nativeGoogleSignInChecked,
    needsNativeRebuild,
    ready,
    request,
    usesNativeGoogleSignIn
  ])

  const isGoogleButtonDisabled =
    !ready ||
    busy ||
    isExpoGoNative ||
    (Platform.OS !== 'web' && !nativeGoogleSignInChecked) ||
    needsNativeRebuild ||
    (usesNativeGoogleSignIn && !hasNativeWebClientId) ||
    (Platform.OS === 'web' && !request)

  const handleContinueWithGoogle = useCallback(async () => {
    setBusy(true)
    setErrorMessage(null)

    try {
      if (usesNativeGoogleSignIn) {
        const googleSignIn = nativeGoogleSignInModule

        if (!googleSignIn) {
          throw new Error('Native Google Sign-In is not available in this build.')
        }

        if (!hasNativeWebClientId) {
          throw new Error('Missing Google web client ID.')
        }

        await googleSignIn.GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

        const nativeResponse = await googleSignIn.GoogleSignin.signIn()

        if (!googleSignIn.isSuccessResponse(nativeResponse)) {
          return
        }

        await exchangeGoogleToken(nativeResponse.data.idToken)
        return
      }

      const result = await promptAsync()

      if (result.type === 'success') {
        await exchangeGoogleToken(result.params.id_token ?? result.authentication?.idToken)
        return
      }

      if (result.type === 'error') {
        setErrorMessage(result.error?.message ?? 'Unable to start Google sign-in.')
      }
    } catch (error) {
      let message = error instanceof Error ? error.message : 'Unable to start Google sign-in.'

      const googleSignIn = nativeGoogleSignInModule

      if (googleSignIn?.isErrorWithCode(error)) {
        switch (error.code) {
          case googleSignIn.statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            message = 'Google Play Services is unavailable or needs an update on this device.'
            break
          case googleSignIn.statusCodes.IN_PROGRESS:
            message = 'Google sign-in is already in progress.'
            break
          case googleSignIn.statusCodes.SIGN_IN_CANCELLED:
            message = ''
            break
        }
      }

      setErrorMessage(message || null)
    } finally {
      setBusy(false)
    }
  }, [exchangeGoogleToken, hasNativeWebClientId, nativeGoogleSignInModule, promptAsync, usesNativeGoogleSignIn])

  if (user) {
    return (
      <MainLayout user={user}>
        <MainIndex />
      </MainLayout>
    )
  }

  return (
    <AuthScreen innerClassName='gap-6 bg-black' keyboardShouldPersistTaps='handled' maxWidth={520} className='bg-black'>
      <View className='relative h-full overflow-hidden rounded-lg bg-black'>
        <Image
          className='h-full'
          contentFit='cover'
          source={require('@/assets/images/logo-glow.png')}
          style={{ width: '100%', aspectRatio: 0.69 }}
        />
      </View>

      <Card className='absolute bottom-0 border-0 bg-transparent p-6 w-full'>
        <CardHeader eyebrow='' title='FastInsure Technologies' description='' titleClassName='text-white' />
        <CardContent className='gap-4'>
          <Button
            fullWidth
            tone='primary'
            className='border-none'
            isDisabled={isGoogleButtonDisabled}
            leadingIcon={<GoogleMark />}
            onPress={() => void handleContinueWithGoogle()}>
            {busy ? 'Connecting...' : 'Continue with Google'}
          </Button>

          <View className='min-h-36'>
            {googleStatusMessage ? (
              <Text themeColor='textSecondary' className='text-[14px] text-balance text-center leading-5 opacity-50'>
                {googleStatusMessage}
              </Text>
            ) : null}

            {errorMessage ? <Text className='text-[14px] leading-5 text-danger'>{errorMessage}</Text> : null}
          </View>
        </CardContent>
      </Card>
    </AuthScreen>
  )
}

function GoogleMark() {
  return (
    <Svg fill='none' height={18} viewBox='0 0 20 20' width={18}>
      <Path
        d='M18.16 10.22c0-.67-.06-1.31-.17-1.93H10v3.65h4.56a3.9 3.9 0 0 1-1.69 2.56v2.13h2.74c1.61-1.48 2.55-3.66 2.55-6.41Z'
        fill='#4285F4'
        // fill='#FFFFFF'
      />
      <Path
        d='M10 18.5c2.29 0 4.21-.76 5.61-2.06l-2.74-2.13c-.76.51-1.73.82-2.87.82-2.21 0-4.09-1.49-4.76-3.5H2.41v2.2A8.48 8.48 0 0 0 10 18.5Z'
        fill='#34A853'
        // fill='#FFFFFF'
      />
      <Path
        d='M5.24 11.63A5.1 5.1 0 0 1 4.98 10c0-.57.1-1.11.26-1.63V6.17H2.41A8.5 8.5 0 0 0 1.5 10c0 1.37.33 2.66.91 3.83l2.83-2.2Z'
        fill='#FBBC04'
        // fill='#FFFFFF'
      />
      <Path
        d='M10 4.88c1.24 0 2.36.43 3.24 1.27l2.43-2.43C14.21 2.36 12.29 1.5 10 1.5A8.48 8.48 0 0 0 2.41 6.17l2.83 2.2c.67-2.01 2.55-3.49 4.76-3.49Z'
        fill='#EA4335'
        // fill='#FFFFFF'
      />
    </Svg>
  )
}
