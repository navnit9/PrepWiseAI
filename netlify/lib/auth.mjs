import jwt from 'jsonwebtoken'

const getSecret = () =>
  Netlify.env.get('JWT_SECRET') ||
  'dev-only-insecure-fallback-secret-set-JWT_SECRET-in-netlify-env'

export function generateToken(userId) {
  return jwt.sign({ id: userId }, getSecret(), { expiresIn: '30d' })
}

export function getUserIdFromRequest(req) {
  const authHeader = req.headers.get('authorization') || ''
  if (!authHeader.startsWith('Bearer ')) return null
  try {
    const payload = jwt.verify(authHeader.slice(7), getSecret())
    return payload.id || null
  } catch {
    return null
  }
}
