import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base

class Project(Base):

    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())