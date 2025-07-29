import asyncio
from app.database import engine, Base

async def init_database():
    print("Initializing database in docker...")
    
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        print("Database tables created successfully!")
        
    except Exception as e:
        print(f"Error creating tables: {e}")
        print("💡 Make sure PostgreSQL is running and database credentials are correct")
    
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(init_database())       