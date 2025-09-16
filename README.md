 

# 🧩 RECADED: Angular SSR + Spring Boot + PostgreSQL

Este proyecto combina un frontend Angular con renderizado del lado del servidor (SSR), un backend en Spring Boot, y una base de datos PostgreSQL.
Puedes ejecutarlo fácilmente usando Docker o de forma local.

---

## 🚀 Requisitos

### Para ejecución local:
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Java 17+
- Maven o Gradle
- PostgreSQL corriendo en `localhost:5432`

### Para ejecución con Docker:
- Docker
- Docker Compose

---

## 📦 Estructura del proyecto

```
.
├── backend/           # Spring Boot backend
├── frontend/          # Angular SSR frontend
├── docker-compose.yml
└── README.md
```

---

## 🐳 Ejecución con Docker

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Construye y levanta los contenedores

```bash
docker-compose up --build
```

Esto iniciará:
- PostgreSQL en `localhost:5432`
- Spring Boot en `localhost:8080`
- Angular SSR en `localhost:4200`

### 3. Accede a la aplicación

```bash
http://localhost:4200
```

---

## 🖥️ Ejecución local sin Docker

### 1. Base de datos

Asegúrate de tener PostgreSQL corriendo localmente con:

- Base de datos: `appdb`
- Usuario: `appuser`
- Contraseña: `secret`

Puedes crearla manualmente o usar Docker solo para la base de datos:

```bash
docker run --name local-db -e POSTGRES_DB=appdb -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:15
```

### 2. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Asegúrate de que `application.properties` apunte a:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/appdb
spring.datasource.username=appuser
spring.datasource.password=secret
```

### 3. Frontend (Angular SSR)

```bash
cd frontend
npm install
npm run build:ssr
npm run serve:ssr
```

Esto levantará el SSR en `http://localhost:4200`.

---

## 🔧 Notas técnicas

- El frontend hace llamadas directas a `http://localhost:8080/api/users`, evitando el uso de proxy.
- El SSR precarga los datos desde el backend en el servidor.
- El backend está preparado para recibir peticiones desde el frontend y conectarse a PostgreSQL.

---

## 🧪 Troubleshooting

- Si ves errores `404` en `/api/users`, asegúrate de que el backend esté corriendo y accesible en `localhost:8080`.
- Si los estilos no se cargan, verifica que `APP_BASE_HREF` esté configurado como `'/'` en `server.ts`.
- Si usas WSL o Docker Desktop en Windows, asegúrate de que los puertos estén libres y accesibles.

---



