import { PrismaClient } from '@prisma/client'

const databaseUrl = process.env.DATABASE_URL

console.log('[PRISMA] DATABASE_URL exists:', !!databaseUrl)
console.log('[PRISMA] DATABASE_URL length:', databaseUrl?.length || 0)

if (databaseUrl) {
  try {
    const url = new URL(databaseUrl)
    console.log('[PRISMA] Protocol:', url.protocol)
    console.log('[PRISMA] Host:', url.hostname)
    console.log('[PRISMA] Port:', url.port)
    console.log('[PRISMA] Database:', url.pathname)
    console.log('[PRISMA] SSL param:', url.searchParams.get('ssl-mode'))
  } catch (e) {
    console.log('[PRISMA] Error parsing URL:', e.message)
  }
}

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'production'
    ? ['error', 'warn']
    : ['query', 'error', 'warn'],
})

export default prisma
