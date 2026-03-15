from pydantic import BaseModel

class repoCreate(BaseModel):
    name: str
    description: str
    provider: str