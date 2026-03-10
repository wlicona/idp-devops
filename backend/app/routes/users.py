from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.user import UserCreate
from app.crud import user as crud_user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    return crud_user.create_user(db, user)

@router.get("/")
def get_users(db: Session = Depends(get_db)):

    return crud_user.list_users(db)