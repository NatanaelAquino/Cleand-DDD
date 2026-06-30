
import 'dotenv/config'

import { execSync } from 'node:child_process'
import { PrismaPg } from '@prisma/adapter-pg'
import { afterAll, beforeAll } from 'vitest';
import { PrismaClient } from '../generated/prisma';

let prisma: PrismaClient

beforeAll(async () => {
  const databaseURL = process.env.DATABASE_URL!

  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseURL }),
  })

  try {
    execSync('npx prisma migrate deploy', { 
      env: { ...process.env, DATABASE_URL: databaseURL },
      stdio: 'inherit'
    })
  } catch (error) {
    console.error('Failed to run migrations:', error)
    throw error
  }
})

afterAll(async () => {
  if (!prisma) return

  try {
    await prisma.question.deleteMany({})
    await prisma.user.deleteMany({})
  } finally {
    await prisma.$disconnect()
  }
})