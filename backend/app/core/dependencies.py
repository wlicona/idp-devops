from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from app.routes.users import get_db
from app.models.user import User
from app.core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email = payload.get("sub")

        user = db.query(User).filter(User.email == email).first()

        if user is None:
            raise HTTPException(status_code=401)

        return user

    except JWTError:
        raise HTTPException(status_code=401)