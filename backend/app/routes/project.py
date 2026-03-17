from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate
from app.core.dependencies import get_current_user
from app.core.dependencies import get_db

router = APIRouter()

@router.post("/projects")
def create_project(
    project: ProjectCreate, db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    
    new_project = Project(
        name = project.name,
        organization_id = project.organization_id
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project

@router.get("/projects")
def list_projects(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    
    projects = db.query(Project).all()

    return projects