# Stranger Home - API REST Technical Documentation

## 1. Usuarios (`usuarios`)

| Field | Required | Type | Details |
|-------|----------|------|---------|
| id | Yes | ULID | Unique identifier, auto-generated, immutable |
| email | Yes | Text | Valid email address (unique) |
| password | Yes | Text | Encrypted password (bcrypt) |
| alias | Yes | Text | User nickname |
| role | Yes | Enum | Values: "user", "admin" |
| is_active | Yes | Boolean | Whether the account is enabled |
| created_at | Yes | Timestamp | When the record was created |
| updated_at | Yes | Timestamp | When the record was last modified |
| deleted_at | No | Timestamp | Soft-delete timestamp; null if active |

## 2. Categorias (`categorias`)

| Field | Required | Type | Details |
|-------|----------|------|---------|
| id | Yes | ULID | Unique identifier, auto-generated, immutable |
| nombre | Yes | Text | Category name (e.g., "RPG", "Shooter") |
| slug | Yes | Text | URL-friendly version (unique) |
| created_at | Yes | Timestamp | When the record was created |
| updated_at | Yes | Timestamp | When the record was last modified |

## 3. Etiquetas (`etiquetas`)

| Field | Required | Type | Details |
|-------|----------|------|---------|
| id | Yes | ULID | Unique identifier, auto-generated, immutable |
| nombre | Yes | Text | Tag label (e.g., "Solojugador", "Multijugador") |
| slug | Yes | Text | URL-friendly version (unique) |
| created_at | Yes | Timestamp | When the record was created |
| updated_at | Yes | Timestamp | When the record was last modified |

## 4. Juegos (`juegos`)

| Field | Required | Type | Details |
|-------|----------|------|---------|
| id | Yes | ULID | Unique identifier, auto-generated, immutable |
| nombre | Yes | Text | Game name |
| categoria_id | Yes | Reference (ULID) | Links to a `categorias` record |
| puntuacion_metacritic | Yes | Integer | Metacritic score (0-100) |
| horas_dedicacion | Yes | Float | Hours to complete (from HowLongToBeat) |
| completado | Yes | Boolean | Whether the game is completed |
| fecha_completado | No | Timestamp | Auto-set when marking as completed |
| notas | No | Text | Optional notes on completion |
| valoracion | No | Integer | Personal rating 1-5 (optional) |
| usuario_id | Yes | Reference (ULID) | Links to the `usuarios` record |
| created_at | Yes | Timestamp | When the record was created |
| updated_at | Yes | Timestamp | When the record was last modified |
| deleted_at | No | Timestamp | Soft-delete timestamp; null if active |

**Calculated field:** `prioridad = puntuacion_metacritic / horas_dedicacion` (exposed in responses)

## 5. JuegoEtiqueta (pivot table)

| Field | Required | Type | Details |
|-------|----------|------|---------|
| juego_id | Yes | Reference (ULID) | Links to `juegos` |
| etiqueta_id | Yes | Reference (ULID) | Links to `etiquetas` |

Composite primary key: (juego_id, etiqueta_id)

---

## API Routes

### Auth (`/auth`)

| Method | Path | Description | Who can call |
|--------|------|-------------|--------------|
| POST | `/auth/register` | Register new user | Anonymous |
| POST | `/auth/login` | Authenticate user | Anonymous |

### Juegos (`/juegos`)

| Method | Path | Description | Who can call |
|--------|------|-------------|--------------|
| GET | `/juegos` | List user's games (filters, sort, pagination, prioridad calculated) | Registered |
| GET | `/juegos/recomendados` | Get non-completed games sorted by prioridad (Metacritic/horas) | Registered |
| GET | `/juegos/:id` | Get game details | Registered (owner) |
| POST | `/juegos` | Create game | Registered |
| PUT | `/juegos/:id` | Update game | Registered (owner) |
| DELETE | `/juegos/:id` | Soft-delete game | Registered (owner) |
| PATCH | `/juegos/:id/completado` | Mark as completed + optional notas/valoracion | Registered (owner) |

### Categorias (`/categorias`)

| Method | Path | Description | Who can call |
|--------|------|-------------|--------------|
| GET | `/categorias` | List all categories | Registered |

### Etiquetas (`/etiquetas`)

| Method | Path | Description | Who can call |
|--------|------|-------------|--------------|
| GET | `/etiquetas` | List all tags | Registered |

---

## API Specification - Requests & Responses

### Standard Response Format

**Success (single object):**
```json
{
  "data": { ... }
}
```

**Success (paginated list):**
```json
{
  "data": [ ... ],
  "meta": {
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_pages": 5,
      "total_items": 50
    }
  }
}
```

**Error (400 - JSON malformed):**
```json
{ "message": "Invalid JSON in request body" }
```

**Error (400 - ZOD validation failed):**
```json
{
  "message": "Validation failed",
  "errors": [
    { "path": ["email"], "message": "Invalid email format" }
  ]
}
```

**Error (401):**
```json
{ "message": "Authentication required" }
```

**Error (403):**
```json
{ "message": "Insufficient permissions" }
```

**Error (404):**
```json
{ "message": "Resource not found" }
```

**Error (409):**
```json
{ "message": "Email already exists" }
```

**Error (500):**
```json
{ "message": "An unexpected error occurred" }
```

---

### Auth (`/auth`)

#### [POST] /auth/register

**Body:**
```json
{
  "email": "gamer@example.com",
  "alias": "ProGamer99",
  "password": "securePassword123"
}
```

| Status | Body |
|--------|------|
| **201** | `{ "data": { "id": "01ARZ...", "email": "gamer@example.com", "alias": "ProGamer99", "role": "user", "token": "jwt_token", "created_at": "2026-05-29T10:30:00Z" } }` |
| **400** | `{ "message": "Invalid JSON in request body" }` |
| **400** | `{ "message": "Validation failed", "errors": [...] }` |
| **409** | `{ "message": "Email already exists" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [POST] /auth/login

**Body:**
```json
{
  "email": "gamer@example.com",
  "password": "securePassword123"
}
```

| Status | Body |
|--------|------|
| **200** | `{ "data": { "token": "jwt_token" } }` |
| **400** | `{ "message": "Validation failed", "errors": [...] }` |
| **401** | `{ "message": "Invalid credentials" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

---

### Juegos (`/juegos`)

#### [GET] /juegos

**Auth:** Required (Bearer token)
**Query:** `?page=1&per_page=10&nombre=zelda&categoria_id=xxx&etiqueta_id=xxx&completado=false&sort_by=prioridad&sort_order=desc`

| Status | Body |
|--------|------|
| **200** | `{ "data": [{ "id": "01ARZ...", "nombre": "Zelda BOTW", "categoria": { "id": "...", "nombre": "Aventura", "slug": "aventura" }, "etiquetas": [...], "puntuacion_metacritic": 97, "horas_dedicacion": 50, "completado": false, "prioridad": 1.94, ... }], "meta": { "pagination": { ... } } }` |
| **401** | `{ "message": "Authentication required" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [GET] /juegos/recomendados

**Auth:** Required (Bearer token)

| Status | Body |
|--------|------|
| **200** | `{ "data": [{ "id": "...", "nombre": "...", "prioridad": 17.5, ... }] }` — Non-completed games sorted by prioridad DESC |
| **401** | `{ "message": "Authentication required" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [GET] /juegos/:id

**Auth:** Required (owner)

| Status | Body |
|--------|------|
| **200** | `{ "data": { "id": "01ARZ...", "nombre": "Zelda BOTW", "categoria": {...}, "etiquetas": [...], "puntuacion_metacritic": 97, "horas_dedicacion": 50, "completado": false, "notas": null, "valoracion": null, "prioridad": 1.94, ... } }` |
| **401** | `{ "message": "Authentication required" }` |
| **404** | `{ "message": "Juego not found" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [POST] /juegos

**Auth:** Required
**Body:**
```json
{
  "nombre": "Elden Ring",
  "categoria_id": "01ARZ...",
  "puntuacion_metacritic": 96,
  "horas_dedicacion": 55,
  "etiqueta_ids": ["01ARZ...", "01ARZ..."]
}
```

| Status | Body |
|--------|------|
| **201** | `{ "data": { "id": "01ARZ...", "nombre": "Elden Ring", ... } }` |
| **400** | `{ "message": "Validation failed", "errors": [...] }` |
| **401** | `{ "message": "Authentication required" }` |
| **404** | `{ "message": "Categoria not found" }` or `{ "message": "One or more etiquetas not found" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [PUT] /juegos/:id

**Auth:** Required (owner)
**Body:** Same fields as create (all optional)

| Status | Body |
|--------|------|
| **200** | `{ "data": { "id": "01ARZ...", "nombre": "Updated Game", ... } }` |
| **400** | `{ "message": "Validation failed", "errors": [...] }` |
| **401** | `{ "message": "Authentication required" }` |
| **404** | `{ "message": "Juego not found" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [DELETE] /juegos/:id

**Auth:** Required (owner) — soft-delete

| Status | Body |
|--------|------|
| **200** | `{ "data": { "id": "01ARZ..." } }` |
| **401** | `{ "message": "Authentication required" }` |
| **404** | `{ "message": "Juego not found" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

#### [PATCH] /juegos/:id/completado

**Auth:** Required (owner)
**Body:**
```json
{
  "notas": "Juego increible, 10/10",
  "valoracion": 5
}
```

| Status | Body |
|--------|------|
| **200** | `{ "data": { "id": "...", "completado": true, "fecha_completado": "2026-05-29T...", "notas": "...", "valoracion": 5, ... } }` |
| **400** | `{ "message": "Validation failed", "errors": [...] }` |
| **401** | `{ "message": "Authentication required" }` |
| **404** | `{ "message": "Juego not found" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

---

### Categorias (`/categorias`)

#### [GET] /categorias

**Auth:** Required

| Status | Body |
|--------|------|
| **200** | `{ "data": [{ "id": "01ARZ...", "nombre": "RPG", "slug": "rpg" }] }` |
| **401** | `{ "message": "Authentication required" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

---

### Etiquetas (`/etiquetas`)

#### [GET] /etiquetas

**Auth:** Required

| Status | Body |
|--------|------|
| **200** | `{ "data": [{ "id": "01ARZ...", "nombre": "Solojugador", "slug": "solojugador" }] }` |
| **401** | `{ "message": "Authentication required" }` |
| **500** | `{ "message": "An unexpected error occurred" }` |

---

## Notes

- **Soft-delete**: All deletions are logical. A `deleted_at` field is set instead of removing the record physically.
- **Prioridad**: Calculated as `puntuacion_metacritic / horas_dedicacion`, exposed as `prioridad` field (rounded to 2 decimals) in all game responses.
- **Ownership**: Users can only see, edit, and delete their own games.
- **Visibility rules**: Registered users see only their own games. Admin role is reserved for future features.
