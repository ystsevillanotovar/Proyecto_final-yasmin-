import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  console.log('Seeding categorias...')

  const categorias = [
    { nombre: 'Accion', slug: slugify('Accion') },
    { nombre: 'Aventura', slug: slugify('Aventura') },
    { nombre: 'RPG', slug: 'rpg' },
    { nombre: 'Disparos (FPS/TPS)', slug: 'disparos-fps-tps' },
    { nombre: 'Plataformas', slug: 'plataformas' },
    { nombre: 'Estrategia', slug: 'estrategia' },
    { nombre: 'Terror / Horror', slug: 'terror-horror' },
    { nombre: 'Deportes', slug: 'deportes' },
    { nombre: 'Carreras', slug: 'carreras' },
    { nombre: 'Puzzle', slug: 'puzzle' },
    { nombre: 'Mundo Abierto', slug: 'mundo-abierto' },
    { nombre: 'Indie', slug: 'indie' },
    { nombre: 'Simulacion', slug: 'simulacion' },
    { nombre: 'Lucha (Fighting)', slug: 'lucha-fighting' },
    { nombre: 'Supervivencia', slug: 'supervivencia' },
    { nombre: 'Otros', slug: 'otros' },
  ]

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { slug: cat.slug },
      update: { nombre: cat.nombre },
      create: { id: ulid(), nombre: cat.nombre, slug: cat.slug },
    })
    console.log(`  Categoria: ${cat.nombre}`)
  }

  console.log('Seeding etiquetas...')

  const etiquetas = [
    { nombre: 'Singleplayer', slug: 'singleplayer' },
    { nombre: 'Multijugador', slug: 'multijugador' },
    { nombre: 'Co-op', slug: 'co-op' },
    { nombre: 'Story Rich', slug: 'story-rich' },
    { nombre: 'Roguelike', slug: 'roguelike' },
    { nombre: 'Metroidvania', slug: 'metroidvania' },
    { nombre: 'Sandbox', slug: 'sandbox' },
    { nombre: 'Replayable', slug: 'replayable' },
    { nombre: 'Relaxing', slug: 'relaxing' },
    { nombre: 'Competitivo', slug: 'competitivo' },
    { nombre: 'Retro', slug: 'retro' },
    { nombre: 'Early Access', slug: 'early-access' },
  ]

  for (const etq of etiquetas) {
    await prisma.etiqueta.upsert({
      where: { slug: etq.slug },
      update: { nombre: etq.nombre },
      create: { id: ulid(), nombre: etq.nombre, slug: etq.slug },
    })
    console.log(`  Etiqueta: ${etq.nombre}`)
  }

  console.log('Seed completado!')
}

main()
  .catch((e) => {
    console.error('Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
