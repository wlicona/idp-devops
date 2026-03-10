from fastapi import APIRouter
from app.schemas.auth import LoginRequest

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest):

    print(data)
    
    return {
        "access_token": "fake-token",
        "token-type": "bearer"
    }