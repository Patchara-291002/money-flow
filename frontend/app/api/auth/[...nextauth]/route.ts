import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log('account.id_token:', account.id_token)
        console.log('account keys:', Object.keys(account))
        token.idToken = account.id_token

        try {
          console.log('กำลังส่ง token ไป backend...')
          const res = await fetch('http://localhost:3001/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: account.id_token }),
          })

          console.log('Backend response status:', res.status)
          const data = await res.json()
          console.log('Backend response data:', data)

          token.backendToken = data.token
          token.userId = data.user?.id
        } catch (error) {
          console.error('Error calling backend:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      session.backendToken = token.backendToken as string
      session.userId = token.userId as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
