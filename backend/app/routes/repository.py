from fastapi import APIRouter, Depends

from app.schemas.repository import repoCreate
from app.services.github_service import create_repo_github
from app.services.gitlab_service import create_repo_gitlab
from app.services.bitbucket_service import create_repo_bitbucket
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/repositories")
def create_repo(repo: repoCreate, user= Depends(get_current_user)):


    if repo.provider == "github":
        return create_repo_github(repo.name, repo.description)
    
    if repo.provider == "gitlab":
        return create_repo_gitlab(repo.name, repo.description)
    
    if repo.provider == "bitbucket":
        return create_repo_bitbucket(repo.name, repo.description)
    
    return {"error: Invalid Provider"}


