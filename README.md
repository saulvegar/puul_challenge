# 📘 Puul Challenge

Este proyecto es una API construida con **NestJS**, **TypeORM** y **PostgreSQL**, que gestiona usuarios, tareas y reportes de analítica. Incluye endpoints con filtros avanzados, relaciones entre entidades y estadísticas agregadas.

## 🚀 Requisitos previos

Asegúrate de tener instalado:

- **NodeJS v18+ o v20+**
- **NPM o Yarn**
- **Docker**
- **TablePlus o PGAdmin** (opcional pero recomendado)

## ⚙️ Configuración del entorno

### 2. Instalar dependencias
```zsh
npm install
```

### 3. Crear archivo `.env`
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=puul_user
DB_PASSWORD=puul_password
DB_NAME=puul_challenge
DB_SYNCHRONIZE=true
DB_LOGGING=true
```

### 4. Ejecutar docker-compose up
```zsh
  docker compose up
```

### 5. Ejecutar servidor
```zsh
npm run start
```

## 🐘 TablePlus
Configura un servidor:
- Host: localhost
- Port: 5432
- User: puul_user
- Password: puul_password

## 📡 Endpoints

### 👤 Usuarios

**Crear usuario**
```
POST /users
```
```json
{
  "name": "Saul",
  "email": "saul@example.com",
  "role": "admin"
}
```

**Listar usuarios**
```
GET /users?name=...&email=...&role=admin
```

Devuelve:
- `completedTasks`
- `totalCost`

### 📝 Tasks

**Crear task**
```
POST /tasks
```
```json
{
  "title": "New Task",
  "description": "Description here",
  "estimatedHours": 5,
  "dueDate": "2025-01-20",
  "status": "active",
  "assignedUsers": [1, 2],
  "cost": 300
}
```

**Listar tasks**
```
GET /tasks?title=...&dueDate=...&assignedUser=1&email=...
```

**Actualizar task**
```
PATCH /tasks/:id
```

**Eliminar task**
```
DELETE /tasks/:id
```

### 📊 Analítica
```
GET /tasks/analytics/general
```

Incluye:
- tareas activas
- tareas completadas
- costo acumulado
- horas estimadas totales

## 🧪 Insomnia
Incluye archivo:
```
puul_challenge_collection.yml
```

## 📄 Scripts
```zsh
npm run format
npm run build
npm run start:prod
```
