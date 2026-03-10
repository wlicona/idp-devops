from fastapi import FastAPI

from app.database import Base, engine
from app.models import user
from app.models import organization
from app.models import project
from app.models import repository
from app.models import pipeline
from app.routes import users
from app.routes import github

app = FastAPI(title= "DevOps IDP Platform", version="1.0")


Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(github.router, prefix="/github")

@app.get("/")
def health():

    return {"status": "running"}