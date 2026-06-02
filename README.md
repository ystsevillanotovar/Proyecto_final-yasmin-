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
| Generacion de IDs | ULID |
| Seguridad | Helmet + CORS |
| Despliegue | Vercel |

## Estructura del proyecto

```
├── Backend/              API REST (arquitectura por capas)
│   ├── src/              Codigo fuente
│   │   ├── index.js              Factory de Express (middleware + rutas)
│   │   ├── db/                   Conexion a base de datos (Prisma singleton)
│   │   ├── controllers/          Capa HTTP (request/response)
│   │   ├── useCases/             Logica de negocio
│   │   ├── repositories/         Acceso a datos (Prisma queries)
│   │   ├── transformers/         Formateo de respuestas API
│   │   ├── validations/          Schemas de validacion (Zod)
│   │   ├── errors/               Errores personalizados (AppError hierarchy)
│   │   ├── middlewares/          auth, errorHandler, notFound
│   │   └── utils/                prioridad, validate
│   ├── prisma/           Schema y migraciones
│   │   ├── schema.prisma         Modelo de datos (Usuario, Juego, Categoria, Etiqueta, JuegoEtiqueta)
│   │   └── seed.js               16 categorias + 12 etiquetas predefinidas
│   ├── scripts/          Scripts de utilidad
│   │   ├── migration-generate.js Crear migraciones
│   │   └── migration-run.js      Ejecutar migraciones
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
│       ├── assets/fonts/       Fuentes custom (Karma Future, Klein Headline)
│       ├── components/         Componentes reutilizables
│       │   ├── AppHeader.vue     Navbar fija + dropdown usuario + menu mobile
│       │   ├── AppFooter.vue     Footer con navegacion 5 columnas
│       │   ├── JuegoCard.vue     Tarjeta de juego (CRT scanline, glow por prioridad)
│       │   ├── JuegoForm.vue     Formulario crear/editar (Zod)
│       │   ├── JuegoFilters.vue  Filtros (nombre, categoria, etiqueta, estado, orden)
│       │   ├── PrioridadBadge.vue Badge de prioridad (alta/media/baja)
│       │   ├── AppPagination.vue  Paginacion reutilizable
│       │   └── AppConfirm.vue    Modal de confirmacion (peligro/normal)
│       ├── composables/         Funciones composables
│       │   ├── useApi.js         Wrapper HTTP (get/post/put/patch/delete)
│       │   └── useScrollAnimation.js IntersectionObserver para scroll reveal
│       ├── directives/         Directivas custom
│       │   └── scrollReveal.js   v-scroll-reveal (up/down/left/right/scale/blur)
│       ├── layouts/            Layouts de pagina
│       │   ├── default.vue       Layout principal (Header + Footer)
│       │   └── auth.vue          Layout para login/registro
│       ├── middleware/          Middleware de navegacion
│       │   └── auth.js           Proteccion de rutas (verifica JWT)
│       ├── pages/              Paginas (rutas automaticas Nuxt 4)
│       │   ├── index.vue         Home (hero animado + carousel recomendados)
│       │   ├── login.vue         Login
│       │   ├── register.vue      Registro
│       │   ├── que-es-esto.vue   Conoce Stranger Home (explicativo)
│       │   ├── juegos/
│       │   │   ├── index.vue     Lista de juegos (filtros + paginacion)
│       │   │   ├── crear.vue     Crear juego
│       │   │   └── [id].vue      Detalle / editar / completar / eliminar
│       │   └── completados.vue   Juegos completados
│       ├── plugins/            Plugins de Nuxt
│       │   ├── 00.api.js        Cliente HTTP con interceptor JWT
│       │   ├── 0.init-session.js Restaura sesion desde cookie
│       │   └── 01.scroll-animations.js Registra directiva v-scroll-reveal
│       ├── stores/             Estado global (Pinia)
│       │   └── useSession.js     Login, registro, logout, sesion
│       └── utils/              Utilidades
│           └── prioridad.js     Calculo de prioridad, niveles y helpers
├── documentos_necesarios/  PDFs de referencia
└── README.md
```

## Modelo de datos

| Modelo | Descripcion |
|--------|-------------|
| **Usuario** | email, password (bcrypt), alias, role (user/admin), soft-delete |
| **Juego** | nombre, categoria, etiquetas (M:N), metacritic, horas, completado, fecha completado, notas, valoracion (1-5), soft-delete |
| **Categoria** | nombre, slug (16 predefinidas via seed) |
| **Etiqueta** | nombre, slug (12 predefinidas via seed) |
| **JuegoEtiqueta** | Tabla pivot (muchos a muchos entre Juego y Etiqueta) |

Todos los IDs se generan con **ULID**. Los modelos `Usuario` y `Juego` usan **soft-delete** (campo `deleted_at`) en lugar de borrado fisico.

## Arquitectura del backend

El backend sigue una arquitectura por capas (Clean Architecture):

```
Request → Controller → UseCase → Repository → Prisma → MySQL
                      ↓
               Validation (Zod)
                      ↓
               Transformer (respuesta formateada)
```

- **Controllers**: Manejan HTTP (req/res), delegan a use cases
- **Use Cases**: Logica de negocio, validacion y coordinacion
- **Repositories**: Encapsulan queries Prisma
- **Transformers**: Formatean datos (stripping de password, calculo de prioridad, anidamiento de relaciones)
- **Errors**: Jerarquia propia — `AppError` → `ValidationError` (400), `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409)

Middleware global: `helmet` (seguridad), `cors`, `express.json`, `express-bearer-token`, error handler centralizado.

## Algoritmo de priorizacion

```
prioridad = puntuacion_metacritic / horas_dedicacion
```

Niveles:
- **ALTA** (rojo): prioridad >= 2
- **MEDIA** (naranja): prioridad >= 1
- **BAJA** (gris): prioridad < 1

Cuanto mayor sea la puntuacion en Metacritic y menor el tiempo de dedicacion, mayor prioridad tendra el juego. La app recomienda juegos no completados ordenados por este ratio.

## Configuracion del entorno de desarrollo

El entorno de desarrollo se configura como un **monorepo** con dos proyectos independientes (Backend y Frontend) que se comunican via HTTP.

**Prerrequisitos:**
- Node.js >= 24.0.0 (ambos proyectos usan ES Modules: `"type": "module"`)
- npm >= 10
- Cuenta en Aiven (MySQL 8 hospedado) para la base de datos

**Backend (`Backend/`):**
1. Copiar `.env.tpl` a `.env` y configurar: `DATABASE_URL` (conexion MySQL Aiven), `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGINS`
2. `npm install` instala las dependencias y ejecuta automaticamente `prisma generate` (via `postinstall`) para generar el cliente Prisma
3. `npx prisma migrate deploy` aplica las migraciones pendientes a la base de datos
4. `npm run seed` (opcional) carga las 16 categorias y 12 etiquetas predefinidas
5. `npm run dev` levanta el servidor con **nodemon** (auto-reload) y **dotenv** (carga de variables de entorno) en `http://localhost:3000`

**Frontend (`Frontend/`):**
1. Copiar `.env.tpl` a `.env` y configurar: `NUXT_PUBLIC_API_BASE_URL` apuntando al backend (ej: `http://localhost:3000`)
2. `npm install` instala dependencias y ejecuta `nuxt prepare` (via `postinstall`) para generar tipos
3. `npm run dev` levanta Nuxt 4 con hot-reload en `http://localhost:3001`

Ambos proyectos incluyen `.gitignore` para excluir `node_modules/`, `.env`, `.output/`, `.nuxt/` y demas archivos generados.

## Herramientas y librerias utilizadas

### Backend

| Libreria | Version | Proposito |
|----------|---------|-----------|
| **Express 5** | ^5.2.1 | Framework HTTP para la API REST |
| **Prisma** | ^6.19.3 | ORM para MySQL (schema, migraciones, queries tipadas) |
| **@prisma/client** | ^6.19.3 | Cliente generado por Prisma para acceso a datos |
| **jsonwebtoken** | ^9.0.3 | Generacion y verificacion de tokens JWT (expira en 7d por defecto) |
| **bcryptjs** | ^2.4.3 | Hashing de contrasenas (10 salt rounds, Pure JS sin dependencias nativas) |
| **zod** | ^3.22.4 | Validacion de schemas en entrada (auth, juegos) |
| **ulid** | ^2.3.0 | Generacion de identificadores unicos ordenables por tiempo |
| **helmet** | ^8.1.0 | Middleware de seguridad (headers HTTP) |
| **cors** | ^2.8.5 | Configuracion CORS para permitir requests desde el frontend |
| **express-bearer-token** | ^3.0.0 | Extraccion automatica del token del header `Authorization: Bearer` |

Herramientas de desarrollo: **nodemon** (auto-reload), **dotenv** (variables de entorno), **portless** (tunnel HTTPS local), **jest** + **supertest** (testing).

### Frontend

| Libreria | Version | Proposito |
|----------|---------|-----------|
| **Nuxt 4** | ^4.4.6 | Meta-framework Vue con SSR, file-based routing y auto-imports |
| **Vue 3** | ^3.4.0 | Framework reactivo con Composition API |
| **Vue Router** | ^4.3.0 | Enrutamiento SPA integrado en Nuxt |
| **Pinia** | ^2.1.7 | State management global (store de sesion) |
| **@pinia/nuxt** | ^0.5.1 | Integracion Pinia con Nuxt |
| **@nuxtjs/tailwindcss** | ^6.12.0 | Integracion Tailwind CSS con Nuxt |
| **zod** | ^4.4.3 | Validacion de formularios en el cliente (login, registro, juegos) |

## Estructura y buenas practicas

El proyecto sigue principios de **Clean Architecture** y **Separation of Concerns**:

**Backend — Arquitectura por capas:**
- **Controllers** (`src/controllers/`): Unica responsabilidad — manejar request/response HTTP. Delegan toda la logica a los use cases.
- **Use Cases** (`src/useCases/`): Contienen la logica de negocio. Orquestan validaciones (Zod), repositorios y transformadores. Sin dependencia de Express.
- **Repositories** (`src/repositories/`): Encapsulan todo el acceso a datos via Prisma. Si cambia el ORM o la base de datos, solo se tocan estos archivos.
- **Transformers** (`src/transformers/`): Formatean las respuestas (eliminan campos sensibles como `password`, calculan campos derivados como `prioridad`, anidan relaciones).
- **Validations** (`src/validations/`): Schemas Zod centralizados. La misma validacion se reutiliza en backend y frontend.
- **Errors** (`src/errors/`): Jerarquia de errores personalizados que heredan de `AppError`. El error handler centralizado los convierte en respuestas HTTP consistentes.

**Frontend — Convenciones Nuxt 4:**
- **File-based routing**: La estructura de `pages/` define las rutas automaticamente.
- **Auto-imports**: Nuxt importa automaticamente componentes, composables y utilidades sin necesidad de `import`.
- **Layouts**: Separacion entre `default.vue` (con footer) y `auth.vue` (sin footer) segun el tipo de pagina.
- **Composables**: Logica reutilizable (`useApi`, `useScrollAnimation`) siguiendo el patron de Composition API de Vue 3.
- **Componentes reutilizables**: `JuegoForm` se comparte entre crear y editar. `AppConfirm` es un modal generico. `AppPagination` sirve para cualquier listado paginado.
- **Plugins con orden numerico** (`00.api.js`, `0.init-session.js`, `01.scroll-animations.js`): Garantizan que el cliente HTTP se configure antes de restaurar la sesion y registrar directivas.
- **Middleware de rutas**: `auth.js` protege las rutas privadas redirigiendo a login si no hay token.
- **Stores Pinia**: Estado global centralizado con `useSession` para gestion de autenticacion.
- **Validacion compartida**: Los formularios del frontend usan los mismos criterios que las validaciones Zod del backend (email valido, password min 8 chars, metacritic 0-100, etc.).
- **Soft-delete**: Ningun registro se borra fisicamente. Se marca con `deleted_at` para permitir recuperacion futura y auditar datos.
- **Variables de entorno**: Cada proyecto tiene su `.env.tpl` como plantilla, y `.env` (gitignored) con los valores reales.

## Requisitos

- Node.js >= 24.0.0
- npm >= 10

## Instalacion

### Backend
```bash
cd Backend
npm install
cp .env.tpl .env
# Edita .env con tus credenciales de MySQL y JWT_SECRET
npx prisma migrate deploy
npm run seed          # Opcional: carga categorias y etiquetas predefinidas
npm run dev           # Servidor en http://localhost:3000
```

Scripts disponibles:
| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor con nodemon + dotenv |
| `npm run start` | Produccion |
| `npm run build` | Genera Prisma client + migra |
| `npm run seed` | Carga categorias y etiquetas iniciales |
| `npm run prisma:studio` | GUI de base de datos |
| `npm run migration:generate <nombre>` | Crear migracion |
| `npm run migration:run` | Ejecutar migraciones pendientes |

### Frontend

```bash
cd Frontend
npm install
cp .env.tpl .env
# Edita .env y configura NUXT_PUBLIC_API_BASE_URL con la URL de tu backend
npm run dev           # Servidor en http://localhost:3001 con hot-reload
```

**Pasos para poner en marcha el frontend:**

1. **Instalar dependencias**: `npm install` dentro de la carpeta `Frontend/`
2. **Configurar variables de entorno**: Copiar `.env.tpl` a `.env` y establecer `NUXT_PUBLIC_API_BASE_URL` apuntando a la URL de tu API backend (ej: `http://localhost:3000`)
3. **Levantar el servidor de desarrollo**: `npm run dev` — Nuxt 4 levanta un servidor en `http://localhost:3001` con hot-reload
4. **Acceder** a `http://localhost:3001` para ver la aplicacion

**Estructura del frontend (Nuxt 4):**

- **SSR**: Todas las paginas de datos usan Server-Side Rendering (`useAsyncData` con `server: true`) para un FCP rapido y SEO
- **Autenticacion**: JWT en cookie segura (`jwt_session`, 30 dias), restaurada en SSR y client via plugins
- **Middleware auth**: Protege rutas privadas (`/juegos`, `/juegos/crear`, `/juegos/[id]`, `/completados`)
- **Validacion**: Formularios con Zod (mismo patron que el backend)
- **Componentes reutilizables**: `JuegoCard`, `JuegoForm` (compartido entre crear y editar), `JuegoFilters`, `AppConfirm`, `PrioridadBadge`, `AppPagination`
- **State management**: Pinia store (`useSession`) para sesion de usuario
- **Cliente HTTP**: Plugin `00.api.js` con `$fetch.create` e interceptor JWT automatico
- **Directiva custom**: `v-scroll-reveal` con IntersectionObserver (soporta direcciones, delay, speed)
- **Paginas**: Home (hero + carousel recomendados), `/que-es-esto` (explicativo), lista, crear, detalle, editar, completados, login, registro
- **Responsive**: Mobile-first con breakpoints sm/md/lg, hamburger menu, grids adaptativos
- **Animaciones**: Scroll-reveal, CRT scanline en cards, glow neón, spark particles, shimmer gold

## Diseño y tema visual

- **Tema**: Dark mode permanente inspirado en Stranger Things
- **Paleta**: Negros profundos, rojos (#E74C3C), naranjas (#FF8C42), dorados (#FFC857), texto cálido (#FDF0E2)
- **Fuentes custom**: Karma Future (titulos, stats), Klein Headline Bold Oblique (tarjetas de juego)
- **Fuentes web**: Inter (body), Playfair Display (display)
- **Efectos**: Glassmorphism, CRT scanline overlay, neon glow, spark particles
- **Responsive**: Mobile-first, breakpoints 640/768/1024px

## Rutas de la SPA

| Ruta | Pagina | Autenticacion |
|------|--------|:---:|
| `/` | Home (hero + recomendados) | No |
| `/login` | Login | No |
| `/register` | Registro | No |
| `/que-es-esto` | Conoce Stranger Home | No |
| `/juegos` | Lista de juegos | Si |
| `/juegos/crear` | Crear juego | Si |
| `/juegos/:id` | Detalle / editar / completar / eliminar | Si |
| `/completados` | Juegos completados | Si |

## Endpoints principales

| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|:---:|
| POST | `/auth/register` | Registro (alias, email, password min 8) | No |
| POST | `/auth/login` | Login (devuelve JWT, 7d expiracion) | No |
| GET | `/status` | Health check (valida token) | Si |
| GET | `/juegos` | Listar juegos (filtros, orden, paginacion) | Si |
| GET | `/juegos/recomendados` | Juegos no completados por prioridad | Si |
| GET | `/juegos/:id` | Detalle de un juego | Si |
| POST | `/juegos` | Crear juego | Si |
| PUT | `/juegos/:id` | Editar juego | Si |
| DELETE | `/juegos/:id` | Eliminar juego (soft-delete) | Si |
| PATCH | `/juegos/:id/completado` | Marcar/desmarcar como completado | Si |
| GET | `/categorias` | Listar categorias (16 predefinidas) | Si |
| GET | `/etiquetas` | Listar etiquetas (12 predefinidas) | Si |

**Filtros disponibles en `GET /juegos`:** `nombre`, `categoria_id`, `etiqueta_id`, `completado`, `sort_by` (prioridad/puntuacion/horas/nombre/created_at), `sort_order` (asc/desc), `page`, `per_page`.

## Ejemplos de uso (cURL)

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"alias":"gamer1","email":"gamer@test.com","password":"12345678"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gamer@test.com","password":"12345678"}'

# Crear juego (con token)
curl -X POST http://localhost:3000/juegos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"nombre":"Elden Ring","categoria_id":"<ID>","puntuacion_metacritic":96,"horas_dedicacion":50,"etiqueta_ids":["<ID>"]}'

# Listar juegos ordenados por prioridad
curl http://localhost:3000/juegos?sort_by=prioridad&sort_order=desc \
  -H "Authorization: Bearer <TOKEN>"

# Marcar como completado
curl -X PATCH http://localhost:3000/juegos/<ID>/completado \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"completado":true,"notas":"Juego increible","valoracion":5}'
```

## Documentacion completa

Consulta `Backend/docs/tech-doc.md` para el detalle completo de rutas, requests y responses.

## Autor

Yasmin Sevillano Tovar 
