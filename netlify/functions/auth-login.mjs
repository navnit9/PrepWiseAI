import { getStore } from '@netlify/blobs'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/auth.mjs'

export default async (req) => {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { email, password } = body || {}
  if (!email || !password) {
    return Response.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const users = getStore('users')
  const emailIndex = getStore({ name: 'users-by-email', consistency: 'strong' })

  const userId = await emailIndex.get(normalizedEmail, { type: 'text' })
  if (!userId) {
    return Response.json({ message: 'Invalid email or password' }, { status: 401 })
  }

  const user = await users.get(userId, { type: 'json' })
  if (!user) {
    return Response.json({ message: 'Invalid email or password' }, { status: 401 })
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return Response.json({ message: 'Invalid email or password' }, { status: 401 })
  }

  return Response.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
}

export const config = {
  path: '/api/auth/login',
  method: 'POST',
}
