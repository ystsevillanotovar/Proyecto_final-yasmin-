# Stranger Home

Aplicacion para gamers que te ayuda a gestionar tu biblioteca de videojuegos, priorizar que jugar y registrar tus completados.

## Stack Tecnologico

| Componente | Tecnologia |
|---|---|
| Backend | Node.js + Express 5 + Prisma (MySQL) |
| Base de Datos | MySQL 8 (Aiven) |
| Frontend | Nuxt 4 + Vue 3 + Tailwind CSS + Pinia |
| Autenticacion | JWT + bcrypt |
| Validacion | Zod (backend + frontend) |
| Despliegue | Vercel |

## Estructura del proyecto

```
├── Backend/          API REST
│   ├── src/          Codigo fuente
│   ├── prisma/       Schema y migraciones
│   ├── scripts/      Scripts de utilidad
│   └── docs/         Documentacion tecnica
├── Frontend/         Aplicacion web SPA
├── documentos_necesarios/  PDFs de referencia
└── README.md
```

## Algoritmo de priorizacion

```
prioridad = puntuacion_metacritic / horas_dedicacion
```

Cuanto mayor sea la puntuacion en Metacritic y menor el tiempo de dedicacion, mayor prioridad tendra el juego. La app recomienda juegos no completados ordenados por este ratio.

## Requisitos

- Node.js >= 24.0.0
- npm >= 10

## Instalacion

### Backend
```bash
cd Backend
npm install
cp .env.tpl .env
npx prisma migrate deploy
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
cp .env.tpl .env
npm run dev
```

## Endpoints principales

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/auth/register` | Registro |
| POST | `/auth/login` | Login |
| GET | `/juegos` | Listar juegos (filtros, orden, paginacion) |
| GET | `/juegos/recomendados` | Juegos recomendados por prioridad |
| POST | `/juegos` | Crear juego |
| PUT | `/juegos/:id` | Editar juego |
| DELETE | `/juegos/:id` | Eliminar juego |
| PATCH | `/juegos/:id/completado` | Marcar como completado |
| GET | `/categorias` | Listar categorias |
| GET | `/etiquetas` | Listar etiquetas |

## Documentacion completa

Consulta `Backend/docs/tech-doc.md` para el detalle completo de rutas, requests y responses.

## Autor

Yasmin Sevillano
