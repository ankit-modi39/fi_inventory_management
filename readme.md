# Inventory Management System

A simple REST API for managing inventory built with FastAPI and PostgreSQL.

## Features

- ✅ User registration and JWT authentication
- ✅ Product CRUD operations
- ✅ Inventory quantity management
- ✅ Automatic API documentation
- ✅ Simple, clean codebase

## Quick Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup PostgreSQL Database
```bash
# Create database
createdb inventory_db

# Or using psql
psql -c "CREATE DATABASE inventory_db;"
```

### 3. Configure Environment
Create `.env` file:
```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/inventory_db
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
```

### 4. Initialize Database
```bash
python -m app.init_db
```

### 5. Run the Application
```bash
python -m app.main
```

### 6. Test the API
- In another terminal run the following command while the main application still being active
```bash
python -m tests.test_api
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/products` | Create product | Yes |
| GET | `/products` | Get all products | Yes |
| GET | `/products/{id}` | Get single product | Yes |
| PUT | `/products/{id}/quantity` | Update quantity | Yes |
| DELETE | `/products/{id}` | Delete product | Yes |

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc

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
    price DECIMAL(10,2) NOT NULL
);
```

## Example Usage

### 1. Register User
```bash
curl -X POST "http://localhost:8080/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### 2. Login
```bash
curl -X POST "http://localhost:8080/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### 3. Create Product
```bash
curl -X POST "http://localhost:8080/products" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "type": "Electronics",
    "sku": "LAP-001",
    "description": "Gaming laptop",
    "quantity": 10,
    "price": 1299.99
  }'
```

### 4. Get Products
```bash
curl -X GET "http://localhost:8080/products" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Update Quantity
```bash
curl -X PUT "http://localhost:8080/products/PRODUCT_ID/quantity" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 25}'
```


## Tech Stack

- **FastAPI**: Modern, fast web framework
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: Python SQL toolkit and ORM
- **JWT**: Secure token-based authentication
- **Pydantic**: Data validation using Python type hints
- **Bcrypt**: Secure password hashing

---

**