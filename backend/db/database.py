from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker, declarative_base

DATABSE_URL = "postgresql://apitacheuser:motDePasse@localhost:5432/apitache"
engine = create_engine(DATABSE_URL)

sessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
    )

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
        
Base = declarative_base()

