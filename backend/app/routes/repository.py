from fastapi import APIRouter

from app.schemas.repository import repoCreate
from app.services.github_service import create_repo_github
from app.services.gitlab_service import create_repo_gitlab
from app.services.bitbucket_service import create_repo_bitbucket

router = APIRouter()

@router.post("/repositories")
def create_repo(repo: repoCreate):

    print("Provider recibido:", repo.provider)

    if repo.provider == "github":
        return create_repo_github(repo.name, repo.description)
    
    if repo.provider == "gitlab":
        return create_repo_gitlab(repo.name, repo.description)
    
    if repo.provider == "bitbucket":
        return create_repo_bitbucket(repo.name, repo.description)
    
    return {"error: Invalid Provider"}