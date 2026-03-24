<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.schemas.repository import repoCreate, RepositoryBase, RepositoryResponse
from app.models.repository import Repository
from app.services.github_service import create_repo_github
from app.services.gitlab_service import create_repo_gitlab
from app.core.dependencies import get_current_user, get_db
from app.models.git_provider import provider

router = APIRouter()

@router.post("/repositories", response_model=RepositoryResponse)
def create_repo(
    repo: repoCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):

    provider = db.query(provider).filter(
        provider.name == repo.provider
    ).frist()

    if not provider:
        raise HTTPException(status_code=400, detail="Provider not found")


    #Crear en proveedor
    if repo.provider == "github":
        response = create_repo_github(repo.name, repo.description)

        repo_url = response.get("html_url")
        default_branch = response.get("default_branch", "main")

    elif repo.provider == "gitlab":
        response = create_repo_gitlab(repo.name, repo.description)

        repo_url = response.get("web_url")
        default_branch = response.get("default_branch", "main")

    else:
        raise HTTPException(status_code=400, detail="Invalid provider")
    
    if not repo_url:
        raise HTTPException(status_code=500, detail=response)

    #Si falla el proveedor
    if "id" not in response:
        raise HTTPException(status_code=500, detail=response)

    #Guardar en BD
    new_repo = Repository(
        name=repo.name,
        project_id=repo.project_id,
        git_provider_id=repo.provider,
        repo_url = repo_url,
        default_branch = default_branch
    )

    db.add(new_repo)
    db.commit()
    db.refresh(new_repo)

    return {
        "id": new_repo.id,
        "name": new_repo.name,
        "repo_url": new_repo.repo_url,
        "default_branch": default_branch,
        "provider": provider.name
    }

@router.get("/repositories", response_model=list[RepositoryResponse])
def get_repositories(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):

    repos = db.query(Repository, provider.name)\
        .join(provider)\
        .all()

    result = []

    for repo, provider_name in repos:
        result.append({
            "id": repo.id,
            "name": repo.name,
            "repo_url": repo.repo_url,
            "default_branch": repo.default_branch,
            "provider": provider_name
        })

    return result
=======
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

>>>>>>> 3ab4f045b3ad40d1dbe1fe46c229f9bab5435cd1

