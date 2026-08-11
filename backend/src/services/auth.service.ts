import { OAuth2Client } from 'google-auth-library'
import prisma from '../lib/prisma'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const verifyGoogleToken = async (token: string) => {
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
    console.log('token received:', token?.substring(0, 20) + '...')

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) throw new Error('Invalid token')

    return payload
}

export const findOrCreateUser = async (payload: any) => {
    const user = await prisma.user.upsert({
        where: { email: payload.email },
        update: {
            name: payload.name,
            picture: payload.picture,
        },
        create: {
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        },
    })

    return user
}