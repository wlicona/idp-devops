from fastapi import APIRouter
from app.services.github_service import create_repo

router = APIRouter()

@router.post("/create-repo")
def create_repository(name: str, description: str = ""):

    repo = create_repo(name, description)

    return repo