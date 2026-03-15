from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import user
from app.models import organization
from app.models import project
from app.models import repository
from app.models import pipeline
from app.routes import users
from app.routes import github
from app.routes import auth
from app.routes import repository

app = FastAPI(title= "DevOps IDP Platform", version="1.0")

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(github.router, prefix="/github", tags=["github"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(repository.router, prefix="/repos", tags=["repositories"])

@app.get("/")
def health():

    return {"status": "running"}