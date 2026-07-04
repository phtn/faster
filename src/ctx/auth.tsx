import type { User } from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'

type AuthContextValue = {
  ready: boolean
  signOut: () => Promise<void>
  user: User | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    let unsubscribe: (() => void) | undefined

    async function subscribeToAuthState() {
      try {
        const [{ auth }, { onAuthStateChanged }] = await Promise.all([import('@/lib/firebase'), import('firebase/auth')])

        if (!mounted) {
          return
        }

        setUser(auth.currentUser)
        unsubscribe = onAuthStateChanged(auth, (nextUser) => {
          setUser(nextUser)
          setReady(true)
        })
      } catch (error) {
        console.warn('[auth] Firebase auth failed to initialize.', error)

        if (mounted) {
          setReady(true)
        }
      }
    }

    subscribeToAuthState()

    return () => {
      mounted = false
      unsubscribe?.()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      signOut: async () => {
        const [{ auth }, { signOut }] = await Promise.all([import('@/lib/firebase'), import('firebase/auth')])

        await signOut(auth)
      },
      user
    }),
    [ready, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthSession() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthSession must be used within an AuthProvider.')
  }

  return context
}
