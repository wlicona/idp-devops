from fastapi import FastAPI

from app.database import Base, engine
from app.models import user
from app.models import organization
from app.models import project
from app.models import repository
from app.models import pipeline
from app.routers import users

app = FastAPI(title= "DevOps IDP Platform", version="1.0")

Base.metadata.create_all(bind=engine)

app.include_router(users.router)

@app.get("/")
def health():

    return {"status": "running"}