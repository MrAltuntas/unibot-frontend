'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import useMutateApi from '@/Hooks/useMutateApi'
import { usePathname, useRouter } from 'next/navigation'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  setUserData: (user: User) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const [checkAccessToken, accessTokenLoading] = useMutateApi({
    apiPath: `/sessions/checkAccessToken`,
    method: 'POST',
  })

  const [refreshTokenApi, refreshTokenLoading] = useMutateApi({
    apiPath: '/sessions/refresh',
    header: { 'x-refresh': getCookie('refreshToken') },
  })

  const checkAuthorize = async () => {
    if (hasCookie('refreshToken') && hasCookie('accessToken')) {
      checkAccessToken({}).then(async (isAuth: any, count = 1) => {
        if (!isAuth.error) {
          const userData = {
            ...isAuth.data.user,
            id: isAuth.data.user._id,
            isAuthenticated: true,
          }
          setUser(userData)
        } else {
          if (count < 2) {
            deleteCookie('accessToken')

            const refreshResponse = await refreshTokenApi({})
            if (refreshResponse.error !== null) {
              return pathname === 'dashboard' && router.push('/')
            }
            const userData = {
              ...refreshResponse.data.user,
              id: isAuth.data.user._id,
              isAuthenticated: true,
            }
            setUser(userData)

            return setCookie('accessToken', refreshResponse.data.accessToken)
          }
          pathname === 'dashboard' && router.push('/')
        }
      })
    } else {
      pathname === 'dashboard' && router.push('/')
    }
  }
  useEffect(() => {
    checkAuthorize()
  }, [pathname])

  const setUserData = (user: User) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserData,
        isLoading: accessTokenLoading || refreshTokenLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
