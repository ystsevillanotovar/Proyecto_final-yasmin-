import { execSync } from 'node:child_process'

const name = process.argv[2]

if (!name) {
  console.error('Error: Debes especificar un nombre para la migración')
  console.error('Uso: npm run migration:generate <nombre-migracion>')
  process.exit(1)
}

execSync(`npx prisma migrate dev --create-only --name ${name}`, { stdio: 'inherit' })
