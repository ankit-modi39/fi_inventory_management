# Inventory Management System

A containerized REST API for managing inventory built with FastAPI and PostgreSQL using Docker.

## Features

- ✅ User registration and JWT authentication
- ✅ Product CRUD operations  
- ✅ Inventory quantity management
- ✅ Dockerized application with PostgreSQL
- ✅ Automated database initialization
- ✅ Development environment with hot reload
- ✅ Automatic API documentation
- ✅ Clean, scalable architecture

## Quick Setup with Docker 🐳

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### 1. Clone and Setup Project Structure
```bash
git clone 
cd inventory-system
```

### 2. Configure Environment Variables
Create `backend/.env` file:
```env
# Database Configuration
DB_HOST=postgres
POSTGRES_DB=your_db
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

# FastAPI Database Connection
DATABASE_URL=postgresql+asyncpg://your_user:your_password_123@postgres:5432/your_db

# JWT Authentication
SECRET_KEY=your-jwt-secret-key-change-this
ALGORITHM=HS256
```

### 3. Start the Application
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 4. Initialize Database Tables
```bash
# Initialize the database schema
docker-compose exec backend python init_db.py
```

### 5. Test the API
```bash
# Run the test suite
docker-compose exec backend python test_api.py
```

## Docker Services 🚀

| Service | Port | Description |
|---------|------|-------------|
| **backend** | 8080 | FastAPI application server |
| **postgres** | 5432 | PostgreSQL database |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | API health check | No |
| GET | `/health` | Service health status | No |
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/products` | Create product | Yes |
| GET | `/products` | Get all products (paginated) | Yes |
| GET | `/products/{id}` | Get single product | Yes |
| PUT | `/products/{id}/quantity` | Update quantity | Yes |
| DELETE | `/products/{id}` | Delete product | Yes |

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc
- **Health Check**: http://localhost:8080/health


### Direct Database Access:
```bash
# Access PostgreSQL directly
docker-compose exec postgres psql -U inventory_user -d inventory_db

# View tables
\dt

# Exit
\q
```

## Development Workflow 🔄

### Making Code Changes
Your code changes are automatically reflected due to volume mounting:
```bash
# Edit any file in backend/ directory
# Changes are immediately available in the container
# FastAPI auto-reloads with --reload flag
```

### Restart Services
```bash
# For environment variable changes
docker-compose restart

# For dependency changes
docker-compose up --build

# Stop all services
docker-compose down
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f backend
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);
```

### Products Table
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

## Example Usage

### 1. Register User
```bash
curl -X POST "http://localhost:8080/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

### 2. Login
```bash
curl -X POST "http://localhost:8080/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

### 3. Create Product (with Authentication)
```bash
curl -X POST "http://localhost:8080/products" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Laptop",
    "type": "Electronics", 
    "sku": "LAP-001",
    "description": "High-performance gaming laptop",
    "quantity": 10,
    "price": "1299.99"
  }'
```

### 4. Get Products (Paginated)
```bash
curl -X GET "http://localhost:8080/products?page=1&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Update Product Quantity
```bash
curl -X PUT "http://localhost:8080/products/PRODUCT_UUID/quantity" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 25}'
```




## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database with UUID support
- **Docker**: Containerization platform for consistent deployments
- **SQLAlchemy**: Python SQL toolkit and async ORM
- **JWT**: Secure token-based authentication
- **Pydantic**: Data validation using Python type hints
- **Bcrypt**: Secure password hashing
- **Uvicorn**: ASGI server with auto-reload for development

---