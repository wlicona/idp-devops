from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.routes.users import get_db
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    print("PASSWORD RECIBIDO:", user.password)

    db_user = db.query(User).filter(User.email == user.email).first()

    print("HASH EN BD:", db_user.password_hash)

    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    if not verify_password(user.password, db_user.password_hash):
        
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({
        "sub": db_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}