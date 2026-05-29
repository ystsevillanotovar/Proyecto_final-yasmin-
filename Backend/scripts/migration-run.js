import { execSync } from 'node:child_process'

execSync('npx prisma migrate deploy', { stdio: 'inherit' })

execSync('npx prisma generate', { stdio: 'inherit' })
