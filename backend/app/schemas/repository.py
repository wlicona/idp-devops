from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class RepositoryBase(BaseModel):
    name: str
    project_id: UUID

class repoCreate(RepositoryBase):
    description: Optional[str] = None
    provider: str

class RepositoryResponse(RepositoryBase):
    id: UUID
    provider_id: UUID
    repo_url: str
    default_branch: str

    class Config:
        from_attributes = True        