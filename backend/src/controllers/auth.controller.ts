import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { verifyGoogleToken, findOrCreateUser } from '../services/auth.service'

export const googleLogin = async (req: Request, res: Response) => {
  try {
    // console.log('รับ request แล้ว')
    // console.log('body:', req.body)
    const { token } = req.body
    if (!token) {
      res.status(400).json({ message: 'Token is required' })
      return
    }

    const payload = await verifyGoogleToken(token)
    const user = await findOrCreateUser(payload)

    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.json({ token: jwtToken, user })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(401).json({ message: 'Invalid Google token' })
  }
}