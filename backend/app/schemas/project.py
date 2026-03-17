from pydantic import BaseModel
from uuid import UUID

class ProjectCreate(BaseModel):
    name:str
    organization_id: UUID

class ProjectResponse(BaseModel):
    id: UUID
    name:str
    organization_id: UUID

    class Config:
        from_attributes:True    