import { withAuth } from 'next-auth/middleware'
import { isJwtExpired } from '@/lib/jwt'

export default withAuth({
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized: ({ token }) =>
      !!token && !isJwtExpired(token.backendToken as string | undefined),
  },
})

export const config = {
  matcher: ['/home/:path*'],
}
