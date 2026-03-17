from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.dependencies import get_db
from app.models.organization import Organization
from app.models.project import Project
from app.models.repository import Repository
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("/metrics")
def get_metrics(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    
    total_orgs = db.query(Organization).count()
    total_projects = db.query(Project).count()
    total_repositories = db.query(Repository).count()

    #Repositorios por proveedor

    repos_by_provider = db.query(
        Repository.git_provider_id,
        func.count(Repository.id)
    ).group_by(Repository.git_provider_id).all()

    return {
        "organizations": total_orgs,
        "projects": total_projects,
        "repositories": total_repositories,
        "repos_by_provider": repos_by_provider
    }