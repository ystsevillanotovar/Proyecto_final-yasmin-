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
├── Backend/              API REST
│   ├── src/              Codigo fuente
│   ├── prisma/           Schema y migraciones
│   ├── scripts/          Scripts de utilidad
│   └── docs/             Documentacion tecnica
├── Frontend/             Aplicacion web (Nuxt 4)
│   ├── nuxt.config.js     Configuracion Nuxt (srcDir, modules, runtimeConfig)
│   ├── tailwind.config.js Tema y colores personalizados
│   ├── vercel.json       Configuracion de despliegue
│   ├── .env.tpl          Variables de entorno
│   └── src/
│       ├── app.vue              Componente raiz
│       ├── error.vue            Pagina de error 404/500
│       ├── assets/css/         Estilos (Tailwind + custom)
│       ├── components/         Componentes reutilizables
│       │   ├── AppHeader.vue     Navbar fija + dropdown usuario
│       │   ├── AppFooter.vue     Footer con navegacion
│       │   ├── JuegoCard.vue     Tarjeta de juego
│       │   ├── JuegoForm.vue     Formulario crear/editar (Zod)
│       │   ├── JuegoFilters.vue  Filtros (nombre, categoria, etiqueta, estado, orden)
│       │   ├── PrioridadBadge.vue Badge de prioridad (alta/media/baja)
│       │   └── AppPagination.vue  Paginacion reutilizable
│       ├── composables/         Funciones composables
│       │   └── useApi.js         Wrapper HTTP (get/post/put/patch/delete)
│       ├── layouts/            Layouts de pagina
│       │   ├── default.vue       Layout principal (Header + Footer)
│       │   └── auth.vue          Layout para login/registro
│       ├── middleware/          Middleware de navegacion
│       │   └── auth.js           Proteccion de rutas (verifica JWT)
│       ├── pages/              Paginas (rutas automaticas Nuxt 4)
│       │   ├── index.vue         Home / Dashboard (recomendados)
│       │   ├── login.vue         Login
│       │   ├── register.vue      Registro
│       │   ├── juegos/
│       │   │   ├── index.vue     Lista de juegos (filtros + paginacion)
│       │   │   ├── crear.vue     Crear juego
│       │   │   └── [id].vue      Detalle / editar / completar / eliminar
│       │   └── completados.vue   Juegos completados
│       ├── plugins/            Plugins de Nuxt
│       │   ├── 00.api.js        Cliente HTTP con interceptor JWT
│       │   └── 0.init-session.js Restaura sesion desde cookie
│       ├── stores/             Estado global (Pinia)
│       │   └── useSession.js     Login, registro, logout, sesion
│       └── utils/              Utilidades
│           └── prioridad.js     Calculo de prioridad y helpers
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
# Edita .env y configura NUXT_PUBLIC_API_BASE_URL con la URL de tu backend
npm run dev
```

**Pasos para poner en marcha el frontend:**

1. **Instalar dependencias**: `npm install` dentro de la carpeta `Frontend/`
2. **Configurar variables de entorno**: Copiar `.env.tpl` a `.env` y establecer `NUXT_PUBLIC_API_BASE_URL` apuntando a la URL de tu API backend (ej: `http://localhost:3000`)
3. **Levantar el servidor de desarrollo**: `npm run dev` — Nuxt 4 levanta un servidor en `http://localhost:3001` con hot-reload
4. **Acceder** a `http://localhost:3001` para ver la aplicacion

**Estructura del frontend (Nuxt 4):**

- **SSR**: Todas las paginas de datos usan Server-Side Rendering (`useAsyncData` con `server: true`) para un FCP rapido y SEO
- **Autenticacion**: JWT en cookie segura, restaurada en SSR y client via plugins
- **Middleware auth**: Protege rutas privadas (`/juegos`, `/juegos/crear`, `/juegos/[id]`, `/completados`)
- **Validacion**: Formularios con Zod (mismo patron que el backend)
- **Componentes reutilizables**: `JuegoCard`, `JuegoForm` (compartido entre crear y editar), `JuegoFilters`, `PrioridadBadge`, `AppPagination`
- **State management**: Pinia store (`useSession`) para sesion de usuario
- **Cliente HTTP**: Plugin `00.api.js` con `$fetch.create` e interceptor JWT automatico
- **Diseño**: Dark mode inspirado en webcull.com, tipografia Inter, colores violeta/verde neón, Tailwind CSS

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
