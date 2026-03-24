from sqlalchemy.orm import Session
from app.schemas.organization import OrganizationCreate
from app.models.organization import Organization

def create_organization(db: Session, organization: OrganizationCreate):
    
    db_organization = Organization(
        name = organization.name
    )

    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)

    return db_organization

def organizations_list(db: Session):
    return db.query(Organization).all()