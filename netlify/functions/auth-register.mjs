import { getStore } from '@netlify/blobs'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { generateToken } from '../lib/auth.mjs'

export default async (req) => {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, email, password } = body || {}
  if (!name || !email || !password) {
    return Response.json(
      { message: 'Name, email, and password are required' },
      { status: 400 }
    )
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const users = getStore('users')
  const emailIndex = getStore({ name: 'users-by-email', consistency: 'strong' })

  const existingId = await emailIndex.get(normalizedEmail, { type: 'text' })
  if (existingId) {
    return Response.json({ message: 'User already exists' }, { status: 400 })
  }

  const id = randomUUID()
  const hashed = await bcrypt.hash(password, 10)

  await users.setJSON(id, {
    _id: id,
    name,
    email: normalizedEmail,
    password: hashed,
    createdAt: new Date().toISOString(),
  })
  await emailIndex.set(normalizedEmail, id)

  return Response.json(
    {
      _id: id,
      name,
      email: normalizedEmail,
      token: generateToken(id),
    },
    { status: 201 }
  )
}

export const config = {
  path: '/api/auth/register',
  method: 'POST',
}
