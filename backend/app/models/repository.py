import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Repository(Base):

    __tablename__ = "repositories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name = Column(String)
    repo_url = Column(String)

    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"))
    git_provider_id = Column(UUID(as_uuid=True), ForeignKey("git_providers.id"))