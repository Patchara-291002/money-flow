'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SessionProvider, signOut, useSession } from 'next-auth/react'

function SessionGuard() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (session?.error === 'BackendTokenExpired') {
      signOut({ callbackUrl: '/signin' })
      return
    }

    if (status === 'unauthenticated' && pathname.startsWith('/home')) {
      router.replace('/signin')
    }
  }, [session?.error, status, pathname, router])

  return null
}

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <SessionGuard />
      {children}
    </SessionProvider>
  )
}
