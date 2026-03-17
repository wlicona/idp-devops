from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.organization import OrganizationCreate
from app.crud import organization as crud_organization

router = APIRouter(
    prefix="/organizations",
    tags=["organizations"]
)

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/")
def create_organization(organization: OrganizationCreate, db: Session = Depends(get_db)):

    return crud_organization.create_organization(db, organization)

@router.get("/")
def get_organizations(db: Session = Depends(get_db)):
    
    return crud_organization.organizations_list(db)