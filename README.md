# Interseguro Coding Challenge

## Descripción

Este proyecto consiste en una arquitectura basada en microservicios compuesta por:

- Una API desarrollada en Go utilizando Fiber v3
- Una API desarrollada en Node.js utilizando Express.js
- Un frontend desarrollado en React + Vite + TypeScript

La API en Go se encarga de realizar la factorización QR de matrices rectangulares y comunicarse con la API de Node.js para ejecutar operaciones adicionales sobre los datos procesados.

El proyecto incluye:

- Comunicación entre APIs vía HTTP
- Autenticación mediante JWT
- Dockerización completa de todos los servicios
- Orquestación utilizando Docker Compose

---

# Arquitectura

```text
Frontend (React)
       │
       ▼
Go API (Fiber)
       │
       ▼
Node API (Express)
```

---

# Tecnologías utilizadas

## Backend

### Go Service

- Go
- Fiber v3
- JWT Authentication

### Node Service

- Node.js
- Express.js

---

## Frontend

- React
- Vite
- TypeScript
- shadcn/ui
- TailwindCSS

---

## DevOps

- Docker
- Docker Compose

---

# Estructura del proyecto

```text
interseguro-coding-challenge/
│
├── go-service/
│
├── node-service/
│
├── web-client/
│
└── docker-compose.yml
```

---

# Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Docker
- Docker Compose
- Go (opcional para desarrollo local)
- Node.js (opcional para desarrollo local)

---

# Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/E-RI-CK/interseguro-coding-challenge.git
```

---

## 2. Ingresar al proyecto

```bash
cd interseguro-coding-challenge
```

---

# Configuración de variables de entorno

Cada servicio contiene un archivo `.env.docker`.

---

## Go Service

Ruta:

```text
go-service/.env.docker
```

Contenido:

```env
PORT=3000

JWT_SECRET=mysecretkey

WEB_CLIENT_API_URL=http://localhost:5173

NODE_SERVICE_API_URL=http://node-service:4000/api

JWT_SECRET=ndmfO562VLcZ
```

---

## Node Service

Ruta:

```text
node-service/.env.docker
```

Contenido:

```env
PORT=4000
```

---

## Frontend

Ruta:

```text
web-client/.env.docker
```

Contenido:

```env
VITE_GO_API_URL=http://localhost:3000/api
```

---

# Ejecución con Docker

## Levantar todos los servicios

Asegurar que no debe existir contenedores con los siguientes nombres:

- go-service
- node-service
- web-client

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

Abrir el navegador en el siguiente <a href="http://localhost:5173">link</a> para ver el aplicativo.

Este comando:

- Construye las imágenes Docker
- Levanta todos los contenedores
- Configura la red interna entre servicios
- Inicia el frontend y las APIs

---

# Acceso a los servicios

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Go API | http://localhost:3000 |
| Node API | http://localhost:4000 |

---


# Docker

Cada servicio contiene:

- Dockerfile
- .dockerignore

Todos los servicios son orquestados mediante:

- docker-compose.yml

---


# Ejecución en modo desarrollo (sin Docker)

## Go Service

```bash
cd go-service

go mod tidy

air
```

---

## Node Service

```bash
cd node-service

npm install

npm run dev
```

---

## Frontend

```bash
cd web-client

npm install

npm run dev
```

Abrir el navegador en el siguiente <a href="http://localhost:5173">link</a> para ver el aplicativo.

---

# Autenticación JWT

La aplicación utiliza JWT para proteger los endpoints sensibles.

---

## Login

Endpoint(go-service):

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "alex"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# Endpoint protegido

## QR Factorization (go-service)

Endpoint:

```http
POST /api/qr
```

Body:

```code
{
	"matrix": [][] float64
}
```
Ejemplo:

```code
{
	"matrix": [
		[5,9],
		[1,7]
	]
}
```

Header requerido:

```http
Authorization: Bearer JWT_TOKEN
```

## QR Matrix Statistics(node-service)

```http
POST /api/statistics
```

Body:

```code
{
  "q": [][] float64,
  "r": [][] float64
}
```
Ejemplo:

```code
{
  "q": [[1,2]],
  "r":[[6,5]]
}
```

Response:

```code
{
  matrix: [][] float64,
  statistics: {
    max:         number;
    min:         number;
    average:     number;
    sum:         number;
    is_diagonal: boolean;
  }
}
```

Ejemplo:

```code
{
	"q": {
		"matrix": [
			[
				1,
				2
			]
		],
		"statistics": {
			"max": 2,
			"min": 1,
			"average": 1.5,
			"sum": 3,
			"is_diagonal": false
		}
	},
	"r": {
		"matrix": [
			[
				6,
				5
			]
		],
		"statistics": {
			"max": 6,
			"min": 5,
			"average": 5.5,
			"sum": 11,
			"is_diagonal": false
		}
	}
}
```

---

# Flujo de autenticación

1. El usuario inicia sesión desde el frontend
2. La API de Go genera un JWT
3. El frontend almacena el token
4. Las solicitudes protegidas envían el token mediante Authorization Bearer
5. El backend valida:
   - Token válido
   - Token no expirado

---

# Funcionalidades implementadas

- Factorización QR
- Comunicación entre APIs
- Autenticación JWT
- Protección de rutas
- Validación de expiración de token
- Dockerización completa
- Frontend integrado

---

# Consideraciones técnicas

- Los contenedores se comunican mediante la red interna de Docker Compose
- En entorno Docker los servicios utilizan el nombre del servicio como hostname
- El frontend consume la API de Go mediante variables de entorno configuradas para entorno local

---

# Comandos útiles

## Reconstruir contenedores

```bash
docker compose up --build
```

---

## Detener servicios

```bash
docker compose down
```

---

## Ver logs

```bash
docker compose logs
```

---

# Autor

Desarrollado como parte del reto técnico de Interseguro.