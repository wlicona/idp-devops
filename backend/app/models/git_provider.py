import uuid
from sqlalchemy import Column,String
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Gitprovider(Base):
    __tablename__="git_providers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    api_url = Column(String)