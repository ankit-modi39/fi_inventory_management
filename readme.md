# 🧾 Inventory Management System

A full-stack inventory management system using FastAPI and React, bundled through Docker and served via a single port.

## 🏗️ Architecture Overview

- **Backend**: FastAPI (Python) with secure JWT-based authentication and async PostgreSQL operations
- **Frontend**: React app served via FastAPI’s `StaticFiles` mount
- **Database**: PostgreSQL with asyncpg and SQLAlchemy
- **Deployment**: Docker Compose with a unified single-port setup (http://localhost:8080)

---

## 🚀 Quick Start

### 🔧 Prerequisites

- Docker & Docker Compose installed
- Port `8080` available

---

### 📁 1. Environment Setup

Create a `.env` file inside `backend/`:

```env
# Database Configuration
DATABASE_URL=postgresql+asyncpg://your_user_name:your_password@postgres:5432/your_db_name
POSTGRES_DB=your_db_name
POSTGRES_USER=your_user_name
POSTGRES_PASSWORD=your_password

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production-123456789
ALGORITHM=HS256
````

---

### 🛠️ 2. Build and Launch Services

```bash
cd inventory-system

# Build and start containers
docker-compose up --build

# Optional: Run in background
docker-compose up --build -d
```

---

### 🧱 3. Initialize Database

Once services are healthy (see logs):

```bash
docker-compose exec backend python init_db.py
```

Expected output:

```
Initializing database...
Database tables created successfully!
```

---

### 🌐 4. Access Application

| Service        | URL                                                        |
| -------------- | ---------------------------------------------------------- |
| 🖥️ Main UI    | [http://localhost:8080](http://localhost:8080)             |
| 🧪 API Docs    | [http://localhost:8080/docs](http://localhost:8080/docs)   |
| 🧾 ReDoc       | [http://localhost:8080/redoc](http://localhost:8080/redoc) |
| 🗄️ PostgreSQL | localhost:5432 (external)                                  |

---

## 🎯 Features

### 🔒 Backend

* ✅ JWT authentication
* ✅ RESTful API with OpenAPI docs
* ✅ Async DB with SQLAlchemy
* ✅ Pydantic-based schema validation
* ✅ Product and User CRUD
* ✅ Pagination, health checks, error handling

### 💻 Frontend

* ✅ React app with Hooks & functional components
* ✅ Responsive layout (mobile & desktop)
* ✅ Auth flow using JWT
* ✅ CRUD UI for product management
* ✅ Form validations & feedback
* ✅ Pagination, loading indicators

---

## 🧪 Testing

### 🧪 API Tests

```bash
docker-compose exec backend python test_api.py
```

Expected output:

```
✅ Health Check - PASSED
✅ User Registration - PASSED
✅ User Login - PASSED
✅ Create Product - PASSED
✅ Get Products - PASSED
✅ Get Single Product - PASSED
✅ Update Product Quantity - PASSED
✅ Delete Product - PASSED
```

### 🧍 Manual API Testing

1. Visit `http://localhost:8080/docs`
2. Register → Login → Authorize with token
3. Perform CRUD on products

---

## 📜 API Endpoints

### 🔐 Authentication

* `POST /register`
* `POST /login`

### 📦 Products

* `GET /products` — paginated
* `POST /products`
* `GET /products/{id}`
* `PUT /products/{id}/quantity`
* `DELETE /products/{id}`

### 🧾 Documentation

* `/docs` (Swagger)
* `/redoc` (ReDoc)

---

## 🛢️ PostgreSQL Access (Optional)

```bash
docker-compose exec postgres psql -U your_user_name -d your_db_name

# List tables
\dt

# Example queries
SELECT * FROM users;
SELECT * FROM products LIMIT 5;

# Exit
\q
```

---

## 📐 Database Schema

### `users` Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);
```

### `products` Table

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    image_url VARCHAR(500),
    description VARCHAR(1000),
    quantity INTEGER NOT NULL DEFAULT 0,
    price NUMERIC(10,2) NOT NULL
);
```

---

## 🐳 Docker Overview

| Service          | Port | Description               |
| ---------------- | ---- | ------------------------- |
| postgres         | 5432 | PostgreSQL database       |
| backend          | 8080 | FastAPI + Static frontend |
| frontend-builder | -    | Builds React app          |

---

### ⚙️ Docker Commands

```bash
# Logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Restart or Rebuild
docker-compose restart backend
docker-compose build --no-cache backend

# Shell Access
docker-compose exec backend /bin/bash
docker-compose exec postgres /bin/bash

# Shutdown
docker-compose down

# Full cleanup (⚠️ removes volumes and data)
docker-compose down -v
```

---

## 🧰 Tech Stack

* **FastAPI**: High-performance Python web framework
* **React**: Frontend UI with components/hooks
* **PostgreSQL**: SQL database with UUID + async support
* **Docker Compose**: Unified multi-container setup
* **JWT**: Token-based authentication
* **SQLAlchemy + asyncpg**: DB interactions
* **Bcrypt**: Password hashing
* **Uvicorn**: ASGI server
* **StaticFiles**: Serves React via FastAPI

---