const env = (name: string) => process.env[name] ?? ''
const firstEnv = (...names: string[]) => names.map(env).find(Boolean) ?? ''

type GoogleServicesJson = {
  client?: {
    oauth_client?: {
      client_id?: string
      client_type?: number
    }[]
  }[]
}

const googleServicesConfig = (() => {
  try {
    return require('../../../google-services.json') as GoogleServicesJson
  } catch {
    return null
  }
})()

const googleServicesWebClientId =
  googleServicesConfig?.client?.[0]?.oauth_client?.find((client) => client.client_type === 3)?.client_id ?? ''

const firebaseWebConfig = {
  apiKey: firstEnv('EXPO_PUBLIC_FIREBASE_WEB_API_KEY', 'EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY'),
  authDomain: env('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: env('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: env('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: env('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: firstEnv('EXPO_PUBLIC_FIREBASE_WEB_APP_ID', 'EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID'),
  measurementId: env('EXPO_PUBLIC_FIREBASE_WEB_MEASUREMENT_ID')
} as const

const projectId = env('EXPO_PUBLIC_FIREBASE_PROJECT_ID')
const storageBucket = env('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET')
const messagingSenderId = env('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID')
const authDomain = env('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN')

// This app uses the Firebase JavaScript SDK in React Native. Prefer a Firebase
// Web app config, but allow Android env values for local Android dev builds.
export const firebaseConfig = firebaseWebConfig

export const googleAuthConfig = {
  androidClientId: env('EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID'),
  iosClientId: env('EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'),
  webClientId: firstEnv('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID') || googleServicesWebClientId
} as const

export const firebaseProjectConfig = {
  authDomain,
  messagingSenderId,
  packageName: env('EXPO_PUBLIC_ANDROID_PACKAGE_NAME'),
  projectId,
  storageBucket
} as const
